const owners = [
	{
		name: "Kyle",
		team: "Green Bay Gamblers",
		description: `Kyle has been a fan of the Green Bay Packers since 2009, after devastating 51-45 Wild Card loss to the Cardinals<br><br>
		He looks forward to two championships coming to TitleTown during the 2026/2027 Football Season!<br><br>
		Fun Fact: Kyle made a brief appearance on the Packers @ Seahawks Monday Night Football postgame interview with Xavier Mckinney.`
	},

	{
		name: "Nils",
		team: "Boston Tea Bags",
		description: `As a racist, Nils chose to become a police officer in order to take full advantage of his racial proficency.<br><br>
		In his spare time, Nils became 6'6" and along with growing in height, he grew his hatred for periods.<br><br>
		Nils does not have the utmost confidence in his quarterback squad, however seems proud of the rest of his team. Could this cause some unrest in the QB room?`
	},

	{
		name: "Kye",
		team: "Washington Commandos",
		description: `Kye was raised on Broncos memorabilia from his father, however, wisely chose the Seahawks after watching SuperBowl XL.<br><br>
		From the Legion of Boom highs to the goal line interception lows, he is a Seahawks fan to the fullest extent.<br><br>
		Fun Fact: Played HS football and watched the Saskatchewan Roughriders all throughout his childhood.`
	},

	{
		name: "Ruben",
		team: "New York Jets",
		description: `Ruben, the owner of the New York Jets, is an athlete like none other. He is a weapon on the basketball court and in the pub after a scrimmage.<br><br>
		As a first time fantasy owner and a new football fan, he is absolutely buzzing for an opportunity to prove himself amongst his peers and put his name on the league.<br><br>
		Fun Facts: Big dog guy with his little pup Luna, and he is addicted to social media.`
	},

	{
		name: "Julian",
		team: "Hollywood Oilers",
		description: `Julian, the bandwagon Patriots fan, and the owner of the Oilers, became a fan of the Pats due to Eddlenut.<br><br>
		He also mentioned that their logo was "tuff", however refrained from mentioning the fact that the Patriots coincidentally went 12-4 that year.<br><br>
		Julian seems VERY confident in his squad, perhaps too confident with Drake "The Schedule" Maye leading the charge? We will see...`
	},

	{
		name: "Michi",
		team: "Denver BrownCocks",
		description: `Michi, the 19 year old phenom with D1 aspirations prior to his devastating arm injury, is the owner of the Denver BrownCocks.<br><br>
		He became a football fan after his brother returned from overseas and enlightened him to what is the Denver Broncos.<br><br>
		Ever since, he's been a Broncos fanatic and may be the biggest supporter of Drew "Horse Cock" Lock in the Northern Hemisphere.`
	},

	{
		name: "Ben",
		team: "San Diego Chuggers",
		description: `Ben’s football fandom begun at the age of 5 when he watched his first Chargers game and saw the legendary trio of Philip Rivers, Ladainian Tomlinson, and Antonio Gates. From then on, football became an integral part of his life and he pursued his passion as he got older.<br><br>
		After the Chargers relocated to LA, he saw an opportunity to bring a new franchise to San Diego, giving the fans everything that was taken away from them.<br><br>
		Welcoming… the San Diego Chuggers!`
	},

	{
		name: "David",
		team: "Washington Foreskins",
		description: `David is the proud owner of all Foreskins leaguewide.<br><br>
		Whether you are a fan, player, or even a passerby. David will own your foreskin.<br><br>
		The foreskins fans are hardcore. When it comes to ball, they never hide or cut back. Go Foreskins!`
	},

	{
		name: "Josh",
		team: "Seattle Swingers",
		description: `Josh is a diehard Chargers fan, with his favourite player of all time being Ladainian Tomlinson.<br><br>
		He also likes fantasy, he’s new.<br><br>
		This paragraph did not use AI.`
	},

	{
		name: "Andy",
		team: "Titsburgh Feelers",
		description: `Andy has been a Broncos fan since 2013, where Peyton Manning played out of his goddamn mind and the Broncos got absolutely cooked in the Super Bowl.<br><br>
		Andy's favorite all time player is prime Von Miller and since he began playing fantasy football in 2017, he has watched RedZone every Sunday.<br><br>
		Fun fact: Andy was at the broncos game when Bo Nix threw his first career NFL touchdown against the New york Jets with Aaron Rodgers. The game was dogshit.`
	}
];


function getTeamImage(teamName)
{
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


function displayOwners()
{
	const container =
		document.getElementById("owners-container");


	for (let i = 0; i < owners.length; i++)
	{
		const owner = owners[i];

		const card = document.createElement("div");

		card.className = "owner-profile";

		card.innerHTML = `

			<div class="owner-logo">

				<img src="${getTeamImage(owner.team)}"
				alt="${owner.team} logo">

			</div>


			<div class="owner-text">

				<h3>${owner.name}</h3>

				<h4>${owner.team}</h4>

				<p>
					${owner.description}
				</p>

			</div>

		`;


		container.appendChild(card);
	}
}


displayOwners();