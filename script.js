const leagueID = "1392596316068007936";

async function loadMatchups()
{
	const stateResponse = await fetch("https://api.sleeper.app/v1/state/nfl");
	
	const state = await stateResponse.json();
	
	const currentWeek = state.week;
	
	console.log("Current Week: ", currentWeek);
	
	const userResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueID}/users`);
	
	const users = await userResponse.json();
	
	const rostersResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueID}/rosters`);
	
	const rosters = await rostersResponse.json();
	
	const matchupResponse = await fetch(`https://api.sleeper.app/v1/league/${leagueID}/matchups/${currentWeek}`);
	
	const matchups = await matchupResponse.json();
	
	console.log("Users: ", users);
	console.log("Rosters: ", rosters);
	console.log("Matchups: ", matchups);
	
	displayMatchups(users, rosters, matchups, currentWeek);
	displayLeagueLeaders(users, rosters, matchups);
}
loadMatchups();

setInterval(function()
{
	loadMatchups();
}, 30000);

const leagueNews = [
	{
		title: "Justin Jefferson Trade Request?",
		date: "September 3, 2026",
		type: "Breaking",
		message: `In stunning news, Justin Jefferson has requested a trade with the front office<br>
		of the Green Bay Gamblers. Sources say this is due to Kyler Murray still being his quarterback.`
	},
	
	{
		title: "New Daily Punt",
		date: "August 27, 2026",
		type: "Media",
		message: "Issue #2 of The Daily Punt is now available."
	},
	
	{
		title: "New J&J Episode",
		date: "August 24, 2026",
		type: "Media",
		message: "John and Jims post draft review, season preview, and more is now available."
	},
	
	{
		title: "Boutte on the Move",
		date: "August 24, 2026",
		type: "Trade",
		message: `The Hollywood Oilers aquire Houston Texans WR Kayshon Boutte from the New York Jets<br> 
		in exchange for Miami Dolphins RB Chris Bell and a 2027 3rd Round Pick.`
	}
];


function getTeamImage(teamName)
{
	teamName = teamName.trim();
	
	const teamImages = {
		"Green Bay Gamblers": "images/green-bay-gamblers.jpeg",
		"Boston Tea Bags": "images/boston-teabags.jpeg",
		"Washington Commandos": "images/washington-commandos.jpeg",
		"New York Jets": "images/new-york-jets.jpeg",
		"Hollywood Oilers": "images/hollywood-oilers.jpeg",
		"Denver BrownCocks": "images/denver-browncocks.jpeg",
		"San Diego Chuggers": "images/san-diego-chuggers.jpeg",
		"Washington Foreskins": "images/washington-foreskins.jpeg",
		"Seattle Swingers": "images/seattle-swingers.jpeg",
		"Titsburgh Feelers": "images/titsburgh-feelers.jpeg"
	};

	return teamImages[teamName];
}


function displayMatchups(users, rosters, matchups, currentWeek)
{
	const container = document.getElementById("matchup-container");

	container.innerHTML = "";

	const matchupGroups = {};

	for (let matchup of matchups)
	{
		if (!matchupGroups[matchup.matchup_id])
		{
			matchupGroups[matchup.matchup_id] = [];
		}

		matchupGroups[matchup.matchup_id].push(matchup);
	}


	for (let matchupID in matchupGroups)
	{
		const teams = matchupGroups[matchupID];

		if (teams.length !== 2)
		{
			continue;
		}


		const team1 = teams[0];
		const team2 = teams[1];


		const roster1 = rosters.find(
			roster => roster.roster_id === team1.roster_id
		);

		const roster2 = rosters.find(
			roster => roster.roster_id === team2.roster_id
		);


		const user1 = users.find(
			user => user.user_id === roster1.owner_id
		);

		const user2 = users.find(
			user => user.user_id === roster2.owner_id
		);


		let team1Name = user1.display_name;
		let team2Name = user2.display_name;

		if (user1.metadata && user1.metadata.team_name)
		{
			team1Name = user1.metadata.team_name;
		}

		if (user2.metadata && user2.metadata.team_name)
		{
			team2Name = user2.metadata.team_name;
		}

		team1Name = team1Name.trim();
		team2Name = team2Name.trim();

		let team1Projection = 0;
		let team2Projection = 0;
	
		if (projections[currentWeek])
		{
			team1Projection = projections[currentWeek][team1Name] || 0;
			team2Projection = projections[currentWeek][team2Name] || 0;
		}
		
		let team1ProjectionClass = "";
		let team2ProjectionClass = "";

		if (team1Projection > team2Projection)
		{
			team1ProjectionClass = "winner";
			team2ProjectionClass = "loser";
		}
		else if (team2Projection > team1Projection)
		{
			team2ProjectionClass = "winner";
			team1ProjectionClass = "loser";
		}	
		
		let team1ScoreClass = "";
		let team2ScoreClass = "";

		if (team1.points > team2.points)
		{
			team1ScoreClass = "winner";
			team2ScoreClass = "loser";
		}
		else if (team2.points > team1.points)
		{
			team2ScoreClass = "winner";
			team1ScoreClass = "loser";
		}

		const card = document.createElement("div");

		card.className = "matchup-card";


		card.innerHTML = `
		<div class="matchup-team left-team">

			<img src="${getTeamImage(team1Name)}" alt="${team1Name} logo">

			<div>
				<h3>${team1Name}</h3>

				<p class="live-score ${team1ScoreClass}">
					${team1.points.toFixed(2)} pts
				</p>

				<p class="projection ${team1ProjectionClass}">
					Projected: ${team1Projection.toFixed(2)}
				</p>
			</div>

		</div>

		<div class="vs">
			VS
		</div>

		<div class="matchup-team right-team">

			<div>
				<h3>${team2Name}</h3>

				<p class="live-score ${team2ScoreClass}">
					${team2.points.toFixed(2)} pts
				</p>

				<p class="projection ${team2ProjectionClass}">
					Projected: ${team2Projection.toFixed(2)}
				</p>
			</div>

			<img src="${getTeamImage(team2Name)}" alt="${team2Name} logo">

		</div>
`	;
	
	container.appendChild(card);
	}
}

function displayLeagueLeaders(users, rosters, matchups)
{
	let bestRecordRoster = rosters[0];
	let mostPointsRoster = rosters[0];
	let mostPointsAgainstRoster = rosters[0];
	let highestWeeklyMatchup = matchups[0];


	for (let roster of rosters)
	{
		const rosterWins = roster.settings.wins || 0;
		const bestWins = bestRecordRoster.settings.wins || 0;

		const rosterPoints =
			(roster.settings.fpts || 0) +
			(roster.settings.fpts_decimal || 0) / 100;

		const bestPoints =
			(bestRecordRoster.settings.fpts || 0) +
			(bestRecordRoster.settings.fpts_decimal || 0) / 100;


		if (rosterWins > bestWins)
		{
			bestRecordRoster = roster;
		}
		else if (rosterWins === bestWins && rosterPoints > bestPoints)
		{
			bestRecordRoster = roster;
		}


		const currentMostPoints =
			(mostPointsRoster.settings.fpts || 0) +
			(mostPointsRoster.settings.fpts_decimal || 0) / 100;


		if (rosterPoints > currentMostPoints)
		{
			mostPointsRoster = roster;
		}


		const rosterPointsAgainst =
			(roster.settings.fpts_against || 0) +
			(roster.settings.fpts_against_decimal || 0) / 100;

		const currentMostPointsAgainst =
			(mostPointsAgainstRoster.settings.fpts_against || 0) +
			(mostPointsAgainstRoster.settings.fpts_against_decimal || 0) / 100;


		if (rosterPointsAgainst > currentMostPointsAgainst)
		{
			mostPointsAgainstRoster = roster;
		}
	}


	for (let matchup of matchups)
	{
		if (matchup.points > highestWeeklyMatchup.points)
		{
			highestWeeklyMatchup = matchup;
		}
	}


	const bestRecordUser = users.find(
		function(user)
		{
			return user.user_id === bestRecordRoster.owner_id;
		}
	);


	const mostPointsUser = users.find(
		function(user)
		{
			return user.user_id === mostPointsRoster.owner_id;
		}
	);


	const mostPointsAgainstUser = users.find(
		function(user)
		{
			return user.user_id === mostPointsAgainstRoster.owner_id;
		}
	);


	const highestWeeklyRoster = rosters.find(
		function(roster)
		{
			return roster.roster_id === highestWeeklyMatchup.roster_id;
		}
	);


	const highestWeeklyUser = users.find(
		function(user)
		{
			return user.user_id === highestWeeklyRoster.owner_id;
		}
	);


	let bestRecordName = bestRecordUser.display_name;
	let mostPointsName = mostPointsUser.display_name;
	let mostPointsAgainstName = mostPointsAgainstUser.display_name;
	let highestWeeklyName = highestWeeklyUser.display_name;


	if (bestRecordUser.metadata && bestRecordUser.metadata.team_name)
	{
		bestRecordName = bestRecordUser.metadata.team_name;
	}


	if (mostPointsUser.metadata && mostPointsUser.metadata.team_name)
	{
		mostPointsName = mostPointsUser.metadata.team_name;
	}


	if (mostPointsAgainstUser.metadata && mostPointsAgainstUser.metadata.team_name)
	{
		mostPointsAgainstName = mostPointsAgainstUser.metadata.team_name;
	}


	if (highestWeeklyUser.metadata && highestWeeklyUser.metadata.team_name)
	{
		highestWeeklyName = highestWeeklyUser.metadata.team_name;
	}


	const bestRecord = document.getElementById("best-record");
	const mostPoints = document.getElementById("most-points");
	const mostPointsAgainst = document.getElementById("most-points-against");
	const highestWeekly = document.getElementById("highest-weekly-score");


	const mostPointsTotal =
		(mostPointsRoster.settings.fpts || 0) +
		(mostPointsRoster.settings.fpts_decimal || 0) / 100;


	const mostPointsAgainstTotal =
		(mostPointsAgainstRoster.settings.fpts_against || 0) +
		(mostPointsAgainstRoster.settings.fpts_against_decimal || 0) / 100;


	bestRecord.innerHTML =
		bestRecordName +
		"<br>" +
		bestRecordRoster.settings.wins +
		"-" +
		bestRecordRoster.settings.losses;


	mostPoints.innerHTML =
		mostPointsName +
		"<br>" +
		mostPointsTotal.toFixed(2) +
		" pts";


	mostPointsAgainst.innerHTML =
		mostPointsAgainstName +
		"<br>" +
		mostPointsAgainstTotal.toFixed(2) +
		" pts";


	highestWeekly.innerHTML =
		highestWeeklyName +
		"<br>" +
		highestWeeklyMatchup.points.toFixed(2) +
		" pts";
}


function displayLeagueNews()
{
	const container = document.getElementById("league-news-container");

	container.innerHTML = "";

	for (let news of leagueNews)
	{
		const article = document.createElement("article");

		article.className = "news-card";

		article.innerHTML = `
			<div class="news-heading">

				<span class="news-type ${news.type.toLowerCase().replace(" ", "-")}">
					${news.type}
				</span>

				<span class="news-date">
					${news.date}
				</span>

			</div>

			<h3>${news.title}</h3>

			<p>${news.message}</p>
		`;

		container.appendChild(article);
	}
}

displayLeagueNews();