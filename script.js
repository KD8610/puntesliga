renderHeader("home");
renderFooter();

function renderHomeContent()
{
	document.getElementById("home-news").innerHTML = LEAGUE_NEWS.slice(0, 3).map(news => `
		<article class="news-card">
			<div class="news-heading">
				<span class="news-type ${news.type.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}">${escapeHTML(news.type)}</span>
				<span class="news-date">${escapeHTML(news.date)}</span>
			</div>
			<h3>${escapeHTML(news.title)}</h3>
			<p>${escapeHTML(news.summary)}</p>
		</article>
	`).join("");

	document.getElementById("home-awards").innerHTML = WEEKLY_AWARDS.map(award => `
		<article class="award-card">
			<h3>${escapeHTML(award.title)}</h3>
			<p class="record-value">${escapeHTML(award.winner)}</p>
			<p class="muted">${escapeHTML(award.description)}</p>
		</article>
	`).join("");
}

function homePlayerName(playerId, players)
{
	const player = players[playerId] || {};
	return player.full_name || `${player.first_name || ""} ${player.last_name || ""}`.trim() || playerId;
}

function homeTeamName(rosterId, rosters, users)
{
	const roster = rosters.find(item => item.roster_id === Number(rosterId));
	const user = roster ? users.find(item => item.user_id === roster.owner_id) : null;
	return user ? teamNameForUser(user) : `Roster ${rosterId}`;
}

function homeTransactionSummary(transaction, rosters, users, players)
{
	const additions = Object.entries(transaction.adds || {});
	const drops = Object.entries(transaction.drops || {});
	const teams = new Set([...(transaction.roster_ids || []), ...Object.values(transaction.adds || {}), ...Object.values(transaction.drops || {})]);
	const teamNames = Array.from(teams).map(id => homeTeamName(id, rosters, users));

	if (transaction.type === "trade")
	{
		return teamNames.join(" ↔ ") || "Completed trade";
	}

	if (additions.length)
	{
		const [playerId, rosterId] = additions[0];
		return `${homeTeamName(rosterId, rosters, users)} added ${homePlayerName(playerId, players)}`;
	}

	if (drops.length)
	{
		const [playerId, rosterId] = drops[0];
		return `${homeTeamName(rosterId, rosters, users)} dropped ${homePlayerName(playerId, players)}`;
	}

	return "Completed transaction";
}

function displayHomeTransactions(transactions, rosters, users, players)
{
	const container = document.getElementById("home-transactions");

	if (!transactions.length)
	{
		container.innerHTML = `<div class="placeholder">No completed transactions found.</div>`;
		return;
	}

	container.innerHTML = transactions.slice(0, 3).map(transaction =>
	{
		const label = transaction.type === "trade" ? "Trade" : transaction.type === "waiver" ? "Waiver" : "Add / Drop";
		const cssClass = transaction.type === "trade" ? "trade" : transaction.type === "waiver" ? "waiver" : "free-agent";
		const date = transaction.status_updated ? new Date(transaction.status_updated).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }) : "";

		return `
			<article class="news-card home-transaction-card">
				<div class="news-heading">
					<span class="news-type ${cssClass}">${label}</span>
					<span class="news-date">${escapeHTML(date)}</span>
				</div>
				<h3>${escapeHTML(homeTransactionSummary(transaction, rosters, users, players))}</h3>
			</article>
		`;
	}).join("");
}

async function loadHome()
{
	try
	{
		const id = SITE_CONFIG.leagueId;

		const [state, users, rosters, players] = await Promise.all([
			fetch("https://api.sleeper.app/v1/state/nfl").then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${id}/users`).then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${id}/rosters`).then(response => response.json()),
			fetch("https://api.sleeper.app/v1/players/nfl").then(response => response.json())
		]);

		const week = Math.max(Number(state.week) || 1, 1);
		const matchups = await fetch(`https://api.sleeper.app/v1/league/${id}/matchups/${week}`).then(response => response.json());
		const transactionRequests = [];

		for (let currentWeek = 1; currentWeek <= week; currentWeek++)
		{
			transactionRequests.push(fetch(`https://api.sleeper.app/v1/league/${id}/transactions/${currentWeek}`).then(response => response.json()));
		}

		const weeklyTransactions = await Promise.all(transactionRequests);
		const transactions = weeklyTransactions.flat().filter(transaction =>
			["trade", "waiver", "free_agent"].includes(transaction.type) && transaction.status === "complete"
		);

		transactions.sort((a, b) => (b.status_updated || 0) - (a.status_updated || 0));

		displayHomeMatchups(users, rosters, matchups);
		displayLeaders(users, rosters);
		displayHomeTransactions(transactions, rosters, users, players);
	}
	catch (error)
	{
		document.getElementById("matchup-container").innerHTML = `<div class="placeholder"><strong>Sleeper data unavailable.</strong><br>Check your internet connection or league ID in site-data.js.</div>`;
	}
}

function displayHomeMatchups(users, rosters, matchups)
{
	const groups = {};
	matchups.forEach(matchup => (groups[matchup.matchup_id] ??= []).push(matchup));

	document.getElementById("matchup-container").innerHTML = Object.values(groups).filter(group => group.length === 2).map(group =>
	{
		const sides = group.map(matchup =>
		{
			const roster = rosters.find(item => item.roster_id === matchup.roster_id);
			const user = users.find(item => item.user_id === roster.owner_id);
			return { name: teamNameForUser(user), points: matchup.points || 0 };
		});

		return `
			<article class="matchup-card">
				<div class="matchup-team left-team">
					<img src="${getTeamImage(sides[0].name)}" alt="">
					<div><h3>${escapeHTML(sides[0].name)}</h3><p class="live-score">${sides[0].points.toFixed(2)}</p></div>
				</div>
				<div class="vs">VS</div>
				<div class="matchup-team right-team">
					<div><h3>${escapeHTML(sides[1].name)}</h3><p class="live-score">${sides[1].points.toFixed(2)}</p></div>
					<img src="${getTeamImage(sides[1].name)}" alt="">
				</div>
			</article>
		`;
	}).join("");
}

function displayLeaders(users, rosters)
{
	const sortedWins = [...rosters].sort((a, b) => {
    // First, compare number of wins
    const winDifference = (b.settings.wins || 0) - (a.settings.wins || 0);

    if (winDifference !== 0)
    {
        return winDifference;
    }

    // If wins are tied, use Points For as the tiebreaker
    const aPoints =
        (a.settings.fpts || 0) +
        (a.settings.fpts_decimal || 0) / 100;

    const bPoints =
        (b.settings.fpts || 0) +
        (b.settings.fpts_decimal || 0) / 100;

    return bPoints - aPoints;
});
	const sortedPF = [...rosters].sort((a, b) => (b.settings.fpts || 0) + (b.settings.fpts_decimal || 0) / 100 - ((a.settings.fpts || 0) + (a.settings.fpts_decimal || 0) / 100));
	const name = roster => teamNameForUser(users.find(user => user.user_id === roster.owner_id));

	document.getElementById("leader-container").innerHTML = `
		<div class="stat"><span>Best Record</span><strong>${escapeHTML(name(sortedWins[0]))}</strong></div>
		<div class="stat"><span>Most Points</span><strong>${escapeHTML(name(sortedPF[0]))}</strong></div>
		<div class="stat"><span>Teams</span><strong>${rosters.length}</strong></div>
		<div class="stat"><span>Season</span><strong>${SITE_CONFIG.season}</strong></div>
	`;
}

renderHomeContent();
loadHome();
setInterval(loadHome, 30000);
