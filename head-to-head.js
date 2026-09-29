renderHeader("head-to-head");
renderFooter();

let headToHeadTeams = [];
let headToHeadGames = [];

function displayHeadToHead()
{
	const first = document.getElementById("team-one").value;
	const second = document.getElementById("team-two").value;
	const container = document.getElementById("head-to-head-results");

	if (first === second)
	{
		container.innerHTML = `<div class="placeholder">Choose two different teams.</div>`;
		return;
	}

	const games = headToHeadGames.filter(game =>
		(game.teamOne === first && game.teamTwo === second) ||
		(game.teamOne === second && game.teamTwo === first)
	);

	let firstWins = 0;
	let secondWins = 0;
	let ties = 0;
	let firstPoints = 0;
	let secondPoints = 0;

	games.forEach(game =>
	{
		const firstScore = game.teamOne === first ? game.scoreOne : game.scoreTwo;
		const secondScore = game.teamOne === second ? game.scoreOne : game.scoreTwo;

		firstPoints += firstScore;
		secondPoints += secondScore;

		if (firstScore > secondScore) firstWins++;
		else if (secondScore > firstScore) secondWins++;
		else ties++;
	});

	container.innerHTML = `
		<div class="head-to-head-summary">
			<div class="h2h-team">
				<img src="${getTeamImage(first)}" alt="${escapeHTML(first)} logo">
				<h3>${escapeHTML(first)}</h3>
				<strong>${firstWins}</strong>
				<span>Wins</span>
			</div>

			<div class="h2h-middle">
				<p>${games.length} Meeting${games.length === 1 ? "" : "s"}</p>
				<p>${ties} Tie${ties === 1 ? "" : "s"}</p>
				<p>${firstPoints.toFixed(2)} - ${secondPoints.toFixed(2)} Total Points</p>
			</div>

			<div class="h2h-team">
				<img src="${getTeamImage(second)}" alt="${escapeHTML(second)} logo">
				<h3>${escapeHTML(second)}</h3>
				<strong>${secondWins}</strong>
				<span>Wins</span>
			</div>
		</div>

		<h2>Meetings</h2>
		<div class="h2h-games">
			${games.length ? games.slice().reverse().map(game =>
			{
				const firstScore = game.teamOne === first ? game.scoreOne : game.scoreTwo;
				const secondScore = game.teamOne === second ? game.scoreOne : game.scoreTwo;

				return `
					<div class="h2h-game">
						<span>Week ${game.week}</span>
						<strong>${escapeHTML(first)} ${firstScore.toFixed(2)} - ${secondScore.toFixed(2)} ${escapeHTML(second)}</strong>
					</div>
				`;
			}).join("") : `<div class="placeholder">These teams have not completed a matchup against each other this season.</div>`}
		</div>
	`;
}

async function loadHeadToHead()
{
	try
	{
		const leagueId = SITE_CONFIG.leagueId;

		const [state, users, rosters] = await Promise.all([
			fetch("https://api.sleeper.app/v1/state/nfl").then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).then(response => response.json())
		]);

		const rosterNames = {};

		rosters.forEach(roster =>
		{
			const user = users.find(item => item.user_id === roster.owner_id);
			rosterNames[roster.roster_id] = teamNameForUser(user);
		});

		headToHeadTeams = Object.values(rosterNames).sort();
		const completedWeeks = Math.max((Number(state.week) || 1) - 1, 0);
		const requests = [];

		for (let week = 1; week <= completedWeeks; week++)
		{
			requests.push(fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`).then(response => response.json()));
		}

		const weeks = await Promise.all(requests);

		weeks.forEach((matchups, index) =>
		{
			const groups = {};

			matchups.forEach(matchup =>
			{
				if (!groups[matchup.matchup_id]) groups[matchup.matchup_id] = [];
				groups[matchup.matchup_id].push(matchup);
			});

			Object.values(groups).filter(group => group.length === 2).forEach(group =>
			{
				headToHeadGames.push({
					week: index + 1,
					teamOne: rosterNames[group[0].roster_id],
					teamTwo: rosterNames[group[1].roster_id],
					scoreOne: Number(group[0].points) || 0,
					scoreTwo: Number(group[1].points) || 0
				});
			});
		});

		const firstSelect = document.getElementById("team-one");
		const secondSelect = document.getElementById("team-two");
		const options = headToHeadTeams.map(team => `<option value="${escapeHTML(team)}">${escapeHTML(team)}</option>`).join("");

		firstSelect.innerHTML = options;
		secondSelect.innerHTML = options;

		if (headToHeadTeams.length > 1) secondSelect.selectedIndex = 1;

		displayHeadToHead();
	}
	catch (error)
	{
		document.getElementById("head-to-head-results").innerHTML = `<div class="placeholder">Could not load head-to-head data from Sleeper.</div>`;
	}
}

document.getElementById("compare-button").addEventListener("click", displayHeadToHead);
loadHeadToHead();
