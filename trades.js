renderHeader("trades");
renderFooter();

function playerName(playerId, players)
{
	const player = players[playerId];

	if (!player)
	{
		return playerId;
	}

	return player.full_name || `${player.first_name || ""} ${player.last_name || ""}`.trim() || playerId;
}

function pickText(pick)
{
	const season = pick.season || "Future";
	const round = pick.round || "?";
	const suffix = round === 1 ? "st" : round === 2 ? "nd" : round === 3 ? "rd" : "th";

	return `${season} ${round}${suffix} Round Pick`;
}

function teamNameForRoster(rosterId, rosters, users)
{
	const roster = rosters.find(r => r.roster_id === Number(rosterId));
	const user = roster ? users.find(u => u.user_id === roster.owner_id) : null;

	return user ? teamNameForUser(user) : `Roster ${rosterId}`;
}

function buildTradeSides(transaction, rosters, users, players)
{
	const rosterIds = new Set(transaction.roster_ids || []);

	Object.keys(transaction.adds || {}).forEach(playerId => rosterIds.add(transaction.adds[playerId]));
	(transaction.draft_picks || []).forEach(pick => rosterIds.add(pick.owner_id));

	return Array.from(rosterIds).map(rosterId =>
	{
		const received = [];

		Object.entries(transaction.adds || {}).forEach(([playerId, destinationRoster]) =>
		{
			if (Number(destinationRoster) === Number(rosterId))
			{
				received.push(playerName(playerId, players));
			}
		});

		(transaction.draft_picks || []).forEach(pick =>
		{
			if (Number(pick.owner_id) === Number(rosterId))
			{
				received.push(pickText(pick));
			}
		});

		return {
			team: teamNameForRoster(rosterId, rosters, users),
			received: received
		};
	}).filter(side => side.received.length > 0);
}

function displayTrades(trades, rosters, users, players)
{
	const container = document.getElementById("trades-container");

	if (trades.length === 0)
	{
		container.innerHTML = `<div class="placeholder">No completed trades were found for this season.</div>`;
		return;
	}

	container.innerHTML = trades.map(transaction =>
	{
		const sides = buildTradeSides(transaction, rosters, users, players);
		const date = transaction.status_updated ? new Date(transaction.status_updated).toLocaleDateString("en-CA", {
			year: "numeric",
			month: "long",
			day: "numeric"
		}) : "Date unavailable";

		return `
			<article class="trade-card">
				<div class="trade-card-heading">
					<span class="news-type trade">Trade</span>
					<span class="news-date">${escapeHTML(date)}</span>
				</div>

				<div class="trade-sides">
					${sides.map(side => `
						<div class="trade-side">
							<img src="${getTeamImage(side.team)}" alt="${escapeHTML(side.team)} logo">
							<h3>${escapeHTML(side.team)}</h3>
							<p class="trade-receives">Receives</p>
							<ul>
								${side.received.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
							</ul>
						</div>
					`).join("")}
				</div>
			</article>
		`;
	}).join("");
}

async function loadTrades()
{
	try
	{
		const leagueId = SITE_CONFIG.leagueId;

		const [state, users, rosters, players] = await Promise.all([
			fetch("https://api.sleeper.app/v1/state/nfl").then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).then(response => response.json()),
			fetch("https://api.sleeper.app/v1/players/nfl").then(response => response.json())
		]);

		const currentWeek = Math.max(Number(state.week) || 1, 1);
		const weekRequests = [];

		for (let week = 1; week <= currentWeek; week++)
		{
			weekRequests.push(
				fetch(`https://api.sleeper.app/v1/league/${leagueId}/transactions/${week}`).then(response => response.json())
			);
		}

		const weeklyTransactions = await Promise.all(weekRequests);
		const trades = weeklyTransactions.flat().filter(transaction =>
			transaction.type === "trade" && transaction.status === "complete"
		);

		trades.sort((a, b) => (b.status_updated || 0) - (a.status_updated || 0));

		displayTrades(trades, rosters, users, players);
	}
	catch (error)
	{
		document.getElementById("trades-container").innerHTML = `
			<div class="placeholder">
				<strong>Could not load Sleeper trades.</strong><br>
				Check your internet connection and league ID.
			</div>
		`;
	}
}

loadTrades();
