renderHeader("matchups");
renderFooter();

const weekSelect = document.getElementById("week-select");
let headToHeadGames = [];

for (let i = 1; i <= 14; i++)
{
	weekSelect.insertAdjacentHTML("beforeend", `<option value="${i}">Week ${i}</option>`);
}

async function getCurrentWeek()
{
	try
	{
		const state = await fetch("https://api.sleeper.app/v1/state/nfl").then(response => response.json());
		return state.week || 1;
	}
	catch
	{
		return 1;
	}
}

async function loadMatchups(week)
{
	const container = document.getElementById("full-matchup-container");
	container.innerHTML = "<p>Loading matchups...</p>";

	try
	{
		const leagueId = SITE_CONFIG.leagueId;

		const [users, rosters, matchups] = await Promise.all([
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).then(response => response.json()),
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`).then(response => response.json())
		]);

		await loadHeadToHeadHistory(users, rosters, week);
		displayMatchups(users, rosters, matchups, week);
	}
	catch (error)
	{
		container.innerHTML = '<div class="placeholder"><strong>Could not load Sleeper matchups.</strong><br>Check the league ID in site-data.js.</div>';
	}
}

function displayMatchups(users, rosters, matchups, week)
{
	const groups = {};

	matchups.forEach(matchup =>
	{
		if (!groups[matchup.matchup_id]) groups[matchup.matchup_id] = [];
		groups[matchup.matchup_id].push(matchup);
	});

	let matchupIds = Object.keys(groups).filter(id => groups[id].length === 2);

	if (week >= 5)
	{
		matchupIds.sort((a, b) => combinedWins(groups[b], rosters) - combinedWins(groups[a], rosters));
	}

	document.getElementById("full-matchup-container").innerHTML = matchupIds.map((id, index) =>
	{
		const sides = groups[id].map(matchup =>
		{
			const roster = rosters.find(item => item.roster_id === matchup.roster_id);
			const user = users.find(item => item.user_id === roster.owner_id);

			return {
				name: teamNameForUser(user),
				points: matchup.points || 0
			};
		});

		return `
			<article class="full-matchup-card">
				<h3 class="matchup-week">${week >= 5 && index === 0 ? "MATCHUP OF THE WEEK" : "WEEK " + week}</h3>
				<div class="full-matchup-content">
					<div class="full-matchup-team">
						<img src="${getTeamImage(sides[0].name)}" alt="">
						<h3>${escapeHTML(sides[0].name)}</h3>
						<p class="score">${sides[0].points.toFixed(2)}</p>
					</div>
					<div class="matchup-vs">
						<span>VS</span>
						${headToHeadRecord(sides[0].name, sides[1].name)}
					</div>
					<div class="full-matchup-team">
						<img src="${getTeamImage(sides[1].name)}" alt="">
						<h3>${escapeHTML(sides[1].name)}</h3>
						<p class="score">${sides[1].points.toFixed(2)}</p>
					</div>
				</div>
			</article>
		`;
	}).join("");
}

function combinedWins(group, rosters)
{
	return group.reduce((sum, matchup) =>
	{
		const roster = rosters.find(item => item.roster_id === matchup.roster_id);
		return sum + (roster?.settings?.wins || 0);
	}, 0);
}

function headToHeadRecord(first, second)
{
	const games = headToHeadGames.filter(game =>
		(game.teamOne === first && game.teamTwo === second) ||
		(game.teamOne === second && game.teamTwo === first)
	);

	let firstWins = 0;
	let secondWins = 0;
	let ties = 0;

	games.forEach(game =>
	{
		const firstScore = game.teamOne === first ? game.scoreOne : game.scoreTwo;
		const secondScore = game.teamOne === second ? game.scoreOne : game.scoreTwo;

		if (firstScore > secondScore) firstWins++;
		else if (secondScore > firstScore) secondWins++;
		else ties++;
	});

	if (games.length === 0)
	{
		return '<small class="matchup-h2h">H2H: First Meeting</small>';
	}

	const tieText = ties > 0 ? `-${ties}` : "";

	return `<small class="matchup-h2h">H2H: ${firstWins}-${secondWins}${tieText}</small>`;
}

async function loadHeadToHeadHistory(users, rosters, selectedWeek)
{
	const leagueId = SITE_CONFIG.leagueId;
	const rosterNames = {};

	rosters.forEach(roster =>
	{
		const user = users.find(item => item.user_id === roster.owner_id);
		rosterNames[roster.roster_id] = teamNameForUser(user);
	});

	headToHeadGames = [];

	const previousWeeks = Math.max(selectedWeek - 1, 0);
	const requests = [];

	for (let week = 1; week <= previousWeeks; week++)
	{
		requests.push(
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`)
				.then(response => response.json())
		);
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
}

weekSelect.addEventListener("change", () => loadMatchups(Number(weekSelect.value)));

getCurrentWeek().then(week =>
{
	weekSelect.value = Math.min(week, 14);
	loadMatchups(Math.min(week, 14));
});

