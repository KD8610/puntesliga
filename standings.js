const leagueID = "1392596316068007936";

let standingsData = [];

async function loadStandings()
{
	const userResponse = await fetch(
		`https://api.sleeper.app/v1/league/${leagueID}/users`
	);

	const users = await userResponse.json();


	const rostersResponse = await fetch(
		`https://api.sleeper.app/v1/league/${leagueID}/rosters`
	);

	const rosters = await rostersResponse.json();


	for (let roster of rosters)
	{
		const user = users.find(
			user => user.user_id === roster.owner_id
		);

		let teamName = user.display_name;

		if (user.metadata && user.metadata.team_name)
		{
			teamName = user.metadata.team_name.trim();
		}


		standingsData.push({
			name: teamName,
			wins: roster.settings.wins || 0,
			losses: roster.settings.losses || 0,

		pf:
			(roster.settings.fpts || 0) +
			(roster.settings.fpts_decimal || 0) / 100,

		pa:
			(roster.settings.fpts_against || 0) +
			(roster.settings.fpts_against_decimal || 0) / 100
		});
	}


	displayStandings(standingsData);
}


function displayStandings(data)
{
	const body = document.getElementById("standings-body");

	body.innerHTML = "";


	for (let team of data)
	{
		const row = document.createElement("tr");

		row.innerHTML = `
			<td>${team.name}</td>
			<td>${team.wins}</td>
			<td>${team.losses}</td>
			<td>${team.pf.toFixed(2)}</td>
			<td>${team.pa.toFixed(2)}</td>
		`;

		body.appendChild(row);
	}
}
loadStandings();


const headings = document.querySelectorAll("th");

let ascending = true;


for (let heading of headings)
{
	heading.addEventListener("click", function()
	{
		const column = heading.dataset.column;

		standingsData.sort(function(a, b)
		{
			if (column === "name")
			{
				if (ascending)
				return a.name.localeCompare(b.name);

			return b.name.localeCompare(a.name);
		}


		if (ascending)
			return a[column] - b[column];

		return b[column] - a[column];
		});


		ascending = !ascending;

		displayStandings(standingsData);
	});
}