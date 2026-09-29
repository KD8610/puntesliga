renderHeader("transactions");
renderFooter();

let allTransactions = [];
let transactionContext = null;

function transactionPlayerName(playerId, players)
{
	const player = players[playerId];

	if (!player)
	{
		return playerId;
	}

	return player.full_name || `${player.first_name || ""} ${player.last_name || ""}`.trim() || playerId;
}

function transactionPickText(pick)
{
	const season = pick.season || "Future";
	const round = Number(pick.round) || 0;
	const suffix = round === 1 ? "st" : round === 2 ? "nd" : round === 3 ? "rd" : "th";

	return `${season} ${round}${suffix} Round Pick`;
}

function transactionTeamName(rosterId, rosters, users)
{
	const roster = rosters.find(r => r.roster_id === Number(rosterId));
	const user = roster ? users.find(u => u.user_id === roster.owner_id) : null;

	return user ? teamNameForUser(user) : `Roster ${rosterId}`;
}

function transactionLabel(type)
{
	if (type === "trade") return "Trade";
	if (type === "waiver") return "Waiver";
	if (type === "free_agent") return "Add / Drop";
	return "Transaction";
}

function transactionClass(type)
{
	if (type === "trade") return "trade";
	if (type === "waiver") return "waiver";
	if (type === "free_agent") return "free-agent";
	return "announcement";
}

function buildTransactionTeams(transaction, rosters, users, players)
{
	const rosterIds = new Set(transaction.roster_ids || []);

	Object.values(transaction.adds || {}).forEach(rosterId => rosterIds.add(rosterId));
	Object.values(transaction.drops || {}).forEach(rosterId => rosterIds.add(rosterId));
	(transaction.draft_picks || []).forEach(pick => rosterIds.add(pick.owner_id));

	return Array.from(rosterIds).map(rosterId =>
	{
		const added = [];
		const dropped = [];

		Object.entries(transaction.adds || {}).forEach(([playerId, destinationRoster]) =>
		{
			if (Number(destinationRoster) === Number(rosterId))
			{
				added.push(transactionPlayerName(playerId, players));
			}
		});

		Object.entries(transaction.drops || {}).forEach(([playerId, sourceRoster]) =>
		{
			if (Number(sourceRoster) === Number(rosterId))
			{
				dropped.push(transactionPlayerName(playerId, players));
			}
		});

		(transaction.draft_picks || []).forEach(pick =>
		{
			if (Number(pick.owner_id) === Number(rosterId))
			{
				added.push(transactionPickText(pick));
			}
		});

		return {
			team: transactionTeamName(rosterId, rosters, users),
			added,
			dropped
		};
	}).filter(team => team.added.length > 0 || team.dropped.length > 0);
}

function transactionDate(transaction)
{
	if (!transaction.status_updated)
	{
		return "Date unavailable";
	}

	return new Date(transaction.status_updated).toLocaleDateString("en-CA", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}

function buildTransactionCard(transaction, rosters, users, players, compact = false)
{
	const teams = buildTransactionTeams(transaction, rosters, users, players);

	return `
		<article class="transaction-card ${compact ? "compact-transaction" : ""}">
			<div class="trade-card-heading">
				<span class="news-type ${transactionClass(transaction.type)}">${transactionLabel(transaction.type)}</span>
				<span class="news-date">${escapeHTML(transactionDate(transaction))}</span>
			</div>

			<div class="transaction-teams">
				${teams.map(team => `
					<div class="transaction-team">
						<img src="${getTeamImage(team.team)}" alt="${escapeHTML(team.team)} logo">
						<div>
							<h3>${escapeHTML(team.team)}</h3>
							${team.added.length ? `<p><strong>Added:</strong> ${team.added.map(escapeHTML).join(", ")}</p>` : ""}
							${team.dropped.length ? `<p><strong>Dropped:</strong> ${team.dropped.map(escapeHTML).join(", ")}</p>` : ""}
						</div>
					</div>
				`).join("")}
			</div>
		</article>
	`;
}

function displayTransactions(filter = "all")
{
	const container = document.getElementById("transactions-container");
	const { rosters, users, players } = transactionContext;
	const filtered = filter === "all" ? allTransactions : allTransactions.filter(t => t.type === filter);

	if (filtered.length === 0)
	{
		container.innerHTML = `<div class="placeholder">No completed transactions were found for this selection.</div>`;
		return;
	}

	container.innerHTML = filtered.map(transaction => buildTransactionCard(transaction, rosters, users, players)).join("");
}

async function loadTransactions()
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
		const requests = [];

		for (let week = 1; week <= currentWeek; week++)
		{
			requests.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/transactions/${week}`).then(response => response.json()));
		}

		const weeklyTransactions = await Promise.all(requests);

		allTransactions = weeklyTransactions.flat().filter(transaction =>
			["trade", "waiver", "free_agent"].includes(transaction.type) && transaction.status === "complete"
		);

		allTransactions.sort((a, b) => (b.status_updated || 0) - (a.status_updated || 0));
		transactionContext = { rosters, users, players };
		displayTransactions();
	}
	catch (error)
	{
		document.getElementById("transactions-container").innerHTML = `
			<div class="placeholder">
				<strong>Could not load Sleeper transactions.</strong><br>
				Check your internet connection and league ID.
			</div>
		`;
	}
}

document.querySelectorAll(".filter-button").forEach(button =>
{
	button.addEventListener("click", () =>
	{
		document.querySelectorAll(".filter-button").forEach(item => item.classList.remove("active"));
		button.classList.add("active");
		displayTransactions(button.dataset.filter);
	});
});

loadTransactions();
