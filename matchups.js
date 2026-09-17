const leagueID = "1392596316068007936";

const supabaseURL = "https://miyldaqsdixjacgezhst.supabase.co"
const supabaseKey = "sb_publishable_fCWhkSn9pwB-Jr4osM7hhw_QowBV3b1"

const database = supabase.createClient(supabaseURL, supabaseKey);

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



async function loadMatchups(week)
{
	const userResponse = await fetch(
		`https://api.sleeper.app/v1/league/${leagueID}/users`
	);

	const users = await userResponse.json();


	const rostersResponse = await fetch(
		`https://api.sleeper.app/v1/league/${leagueID}/rosters`
	);

	const rosters = await rostersResponse.json();


	const matchupResponse = await fetch(
		`https://api.sleeper.app/v1/league/${leagueID}/matchups/${week}`
	);

	const matchups = await matchupResponse.json();


	await displayMatchups(users, rosters, matchups, week);
}



async function displayMatchups(users, rosters, matchups, week)
{
	const container =
		document.getElementById("full-matchup-container");

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


	const matchupIDs = Object.keys(matchupGroups);


	if (week >= 5)
	{
	matchupIDs.sort(function(a, b)
	{
		const teamsA = matchupGroups[a];
		const teamsB = matchupGroups[b];


		const rosterA1 = rosters.find(function(roster)
		{
			return roster.roster_id === teamsA[0].roster_id;
		});


		const rosterA2 = rosters.find(function(roster)
		{
			return roster.roster_id === teamsA[1].roster_id;
		});


		const rosterB1 = rosters.find(function(roster)
		{
			return roster.roster_id === teamsB[0].roster_id;
		});


		const rosterB2 = rosters.find(function(roster)
		{
			return roster.roster_id === teamsB[1].roster_id;
		});


		const winsA =
			(rosterA1.settings.wins || 0) +
			(rosterA2.settings.wins || 0);


		const winsB =
			(rosterB1.settings.wins || 0) +
			(rosterB2.settings.wins || 0);


		return winsB - winsA;
	});
	}



	for (let matchupID of matchupIDs)
	{
		const teams = matchupGroups[matchupID];


		if (teams.length !== 2)
		{
			continue;
		}


		const team1 = teams[0];
		const team2 = teams[1];


		const roster1 = rosters.find(function(roster)
		{
			return roster.roster_id === team1.roster_id;
		});


		const roster2 = rosters.find(function(roster)
		{
			return roster.roster_id === team2.roster_id;
		});


		const user1 = users.find(function(user)
		{
			return user.user_id === roster1.owner_id;
		});


		const user2 = users.find(function(user)
		{
			return user.user_id === roster2.owner_id;
		});


		let team1Name = user1.display_name;
		let team2Name = user2.display_name;


		if (user1.metadata && user1.metadata.team_name)
		{
			team1Name = user1.metadata.team_name.trim();
		}


		if (user2.metadata && user2.metadata.team_name)
		{
			team2Name = user2.metadata.team_name.trim();
		}


		const card = document.createElement("div");

		card.className = "full-matchup-card";
		card.dataset.matchup = matchupID;


		const isMatchupOfWeek =
			week >= 5 && matchupID === matchupIDs[0];


		card.innerHTML = `

			<h3 class="matchup-week">
				${isMatchupOfWeek ? "MATCHUP OF THE WEEK" : "Week " + week}
			</h3>


			<div class="full-matchup-content">


				<div class="full-matchup-team">

					<img src="${getTeamImage(team1Name)}"
						 alt="${team1Name} logo">

					<h3>${team1Name}</h3>

					<p class="score">
						${team1.points.toFixed(2)}
					</p>
					<button class="pick-button" onclick="selectPick(this, '${team1Name}')"> Pick ${team1Name}</button>
					
					<p class="pick-percent team1-percent">0%</p>

				</div>


				<div class="matchup-vs">

					VS

				</div>


				<div class="full-matchup-team">

					<img src="${getTeamImage(team2Name)}"
						 alt="${team2Name} logo">

					<h3>${team2Name}</h3>

					<p class="score">
						${team2.points.toFixed(2)}
					</p>
					<button class="pick-button" onclick="selectPick(this, '${team2Name}')">Pick ${team2Name}</button>

					<p class="pick-percent team2-percent">0%</p>

				</div>


			</div>

		`;


		container.appendChild(card);
	}
	await loadPickPercentages(week);

	loadOwnerPicks();
}



const weekSelect =
	document.getElementById("week-select");


loadMatchups(1);


weekSelect.addEventListener("change", async function()
{
	const selectedWeek = Number(weekSelect.value);

	await loadMatchups(selectedWeek);

	loadOwnerPicks();
});

async function selectPick(button, teamName)
{
	const ownerSelect = document.getElementById("owner-select");
	const ownerName = ownerSelect.value;

	if (ownerName === "")
	{
		alert("Please select your name first.");
		return;
	}


	const matchupCard =
		button.closest(".full-matchup-card");

	const matchupID =
		Number(matchupCard.dataset.matchup);

	const week =
		Number(document.getElementById("week-select").value);


	// Check if this button is already selected
	if (button.classList.contains("selected"))
	{
		const response = await database
			.from("picks")
			.delete()
			.eq("owner_name", ownerName)
			.eq("week", week)
			.eq("matchup_id", matchupID);


		if (response.error)
		{
			console.log("Error removing pick:", response.error);
			return;
		}


		button.classList.remove("selected");

		console.log("Pick removed:", teamName);

		loadPickPercentages(week);

		return;
	}


	// Get both buttons from this matchup
	const buttons =
		matchupCard.querySelectorAll(".pick-button");


	// Remove previous visual selection
	for (let currentButton of buttons)
	{
		currentButton.classList.remove("selected");
	}


	// Select the new team
	button.classList.add("selected");


	// Save or update the pick
	const response = await database
		.from("picks")
		.upsert(
			{
				owner_name: ownerName,
				week: week,
				matchup_id: matchupID,
				picked_team: teamName
			},
			{
				onConflict: "owner_name,week,matchup_id"
			}
		);


	if (response.error)
	{
		console.log("Error saving pick:", response.error);

		// Undo the visual selection if saving failed
		button.classList.remove("selected");
	}
	else
	{
		console.log("Pick saved:", teamName);

		loadPickPercentages(week);
	}
}

async function loadPickPercentages(week)
{
	const response = await database
		.from("picks")
		.select("*")
		.eq("week", week);

	if (response.error)
	{
		console.log("Error loading picks:", response.error);
		return;
	}

	const picks = response.data;

	const matchupCards =
		document.querySelectorAll(".full-matchup-card");


	for (let card of matchupCards)
	{
		const matchupID = Number(card.dataset.matchup);

		const matchupPicks = picks.filter(function(pick)
		{
			return pick.matchup_id === matchupID;
		});


		const buttons =
			card.querySelectorAll(".pick-button");


		if (buttons.length !== 2)
		{
			continue;
		}


		const team1Name =
			buttons[0].textContent.replace("Pick ", "").trim();

		const team2Name =
			buttons[1].textContent.replace("Pick ", "").trim();


		let team1Picks = 0;
		let team2Picks = 0;


		for (let pick of matchupPicks)
		{
			if (pick.picked_team === team1Name)
			{
				team1Picks++;
			}

			if (pick.picked_team === team2Name)
			{
				team2Picks++;
			}
		}


		const totalPicks =
			team1Picks + team2Picks;


		let team1Percent = 0;
		let team2Percent = 0;


		if (totalPicks > 0)
		{
			team1Percent =
				Math.round((team1Picks / totalPicks) * 100);

			team2Percent =
				Math.round((team2Picks / totalPicks) * 100);
		}


		card.querySelector(".team1-percent").textContent =
			team1Percent + "%";

		card.querySelector(".team2-percent").textContent =
			team2Percent + "%";
	}
}

async function loadOwnerPicks()
{
	const ownerSelect = document.getElementById("owner-select");

	const ownerName = ownerSelect.value;

	if (ownerName === "")
	{
		return;
	}


	const week = Number(
		document.getElementById("week-select").value
	);


	const response = await database
		.from("picks")
		.select("*")
		.eq("owner_name", ownerName)
		.eq("week", week);


	if (response.error)
	{
		console.log("Error loading owner picks:", response.error);
		return;
	}


	const picks = response.data;


	const matchupCards =
		document.querySelectorAll(".full-matchup-card");


	for (let card of matchupCards)
	{
		const buttons =
			card.querySelectorAll(".pick-button");


		for (let button of buttons)
		{
			button.classList.remove("selected");
		}


		const matchupID =
			Number(card.dataset.matchup);


		const savedPick = picks.find(function(pick)
		{
			return pick.matchup_id === matchupID;
		});


		if (!savedPick)
		{
			continue;
		}


		for (let button of buttons)
		{
			const teamName =
				button.textContent.replace("Pick ", "").trim();


			if (teamName === savedPick.picked_team)
			{
				button.classList.add("selected");
			}
		}
	}
}

const ownerSelect =
	document.getElementById("owner-select");


ownerSelect.addEventListener("change", function()
{
	loadOwnerPicks();
});