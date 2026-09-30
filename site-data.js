/* ============================================================
   PUNTESLIGA - EDIT THIS FILE FOR YOUR OWN CONTENT
   ============================================================
   Search for: REPLACE_ME
   Anything marked REPLACE_ME is intended for you to update.
   The Sleeper league ID below is already set to your current league.
   ============================================================ */

const SITE_CONFIG = {
  leagueId: "1392596316068007936",
  leagueName: "Puntesliga",
  tagline: "Four Canadians, Six Germans, Ten Owners, One Champion",
  season: 2026,

  // REPLACE_ME: Put your social / league links here. Leave as "#" until ready.
  links: {
    sleeper: "https://sleeper.com/i/zE9wmGwbRJ55X",
    instagram: "https://www.instagram.com/puntesliga/",
    youtube: "https://www.youtube.com/@jimandjohnshow-h3h"
	}
};

const TEAM_IMAGES = {
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

/* ============================================================
   EDIT HERE: NEWS POSTS
   ============================================================
   Add/edit news stories in LEAGUE_NEWS below.
   Newest story should be first.

   NEWS HEADER OPTIONS (type):
   "Breaking"     - red
   "League News"  - blue
   "Media"        - purple
   "Trade"        - orange
   "Weekly Recap" - green
   "Announcement" - grey

   Example: type: "Breaking",
   ============================================================ */
const LEAGUE_NEWS = [
	{
		type: "Announcements",
		date: "September 29, 2026",
		title: "Shough SZN coming to an end?",
		summary: "Tyler Shough on the trade block after Week 3 of the innagural Puntesliga season.",
		body: "With the potential movement of Tyler Shough, it brings into question the seriousness of the Gamblers front office. Is this for real? Or are they just trying to stir the pot."
	},
	{
		type: "Media",
		date: "September 23, 2026",
		title: "J&J Episode 4",
		summary: "Jim and John fondle with a soundboard?",
		body: "Jim and John review Week 2 of Puntesliga's inaugural season and look ahead towards Week 3, and the Playoffs."
	},
	{
		type: "Trade",
		date: "September 22, 2026",
		title: "Chugging it all?!",
		summary: "San Diego Chuggers go all in!",
		body: "In stunning news, the San Diego Chuggers ship Garrett Wilson to the Washington Foreskins along with a 2027 Second Round Pick in exchange for Dalton Kincaid."
	},
	{
		type: "Trade",
		date: "September 19, 2026",
		title: "Lateral Moves?",
		summary: "Tame trade between the Swingers and Gamblers",
		body: "The Seattle Swingers are sending Travis Etienne, 2027 Third and Fourth Round Picks in exchange for KC Concepcion and a 2027 Second Round Pick."
	}
];

// REPLACE_ME every week. Rank 1 should be first.
const POWER_RANKINGS = [
  { rank: 1, team: "Seattle Swingers", note: "Joshua William Newel is letting his nuts swing all over the competition. JSN and Derrick Henry have been balling out throughout the season, if the rest of the squad can wake up (especially that Chargers offense), this may be the championship favourite." },
  { rank: 2, team: "Titsburgh Feelers", note: "Not even Bijan Robinson could save this squad in a hard fought match against our #1 ranked team. Our analysts are wondering whether or not the Feelers have a fraud tag a quarter of the way through the season." },
  { rank: 3, team: "Washington Commandos", note: "K9 has been and will be the backbone of the Commandos for years to come. The Super Bowl MVP has come through in the clutch and is putting up performances week in and week out. Geno Smith put his nuts on the table and went full Commando." },
  { rank: 4, team: "Boston Tea Bags", note: "Opposite to the Oilers, the running back position has struggled for the Tea Bags as of late. If Saquon Barkley can perform to his ability, this team will wake up quick." },
  { rank: 5, team: "Hollywood Oilers", note: "The running back position carried this team this week and with a couple time travelers in Davante Adams and Travis Kelce, they might be making a championship argument? (Drake Maye is still on the team)" },
  { rank: 6, team: "Washington Foreskins", note: "The Foreskins notable performance from Garrett Wilson brought them over the top of the Chuggers after that blockbuster trade in the week prior. This was a full team effort from them, however Jalen Hurts may cause problems for their championship equity." },
  { rank: 7, team: "Green Bay Gamblers", note: "After a much needed first win on the season, the Gamblers are facing massive injuries up and down the roster. If Drake London can maintain his massive performance they may be able to survive the starters missing a week or two." },
  { rank: 8, team: "San Diego Chuggers", note: "The Wide Reciever core struggled in Week 3, and considering the Chuggers drafted to have a stud Recieving core we are concerned with their consistency moving forward. Jahmyr Gibbs and De'Andre Swift are the only bright spots on this squad coming out of Week 3." },
  { rank: 9, team: "New York Jets", note: "Devon Achane's massive torn ACL will cause a ripple effect throughout this squad. We aren't sure where the points will come from outside of Josh Allen and are afraid the team won't be able to perform moving forward." },
  { rank: 10, team: "Denver BrownCocks", note: "Removing Kyle Pitts can only do so much when you replace him with Khalil Shakir. Not sure if there is any hope saving this team with it's current front office moves."}
];

// REPLACE_ME each week.
const WEEKLY_AWARDS = [
  { title: "Owner of the Week", winner: "Newelster", description: "Going up against the top of the table provided the Swingers with an opportunity to prove themselves, and they did just that." },
  { title: "Player of the Week", winner: "Bijan Robinson", description: "If 200 APY and 2 Touchdowns don't win you this award, I'm not sure what else will." },
  { title: "Fraud of the Week", winner: "Hollywood Oilers", description: "Scored the 3rd lowest points on the week and still squeezed out a win... Any given Sunday." }
];

// REPLACE_ME: Add all-time / season records as they happen.
const LEAGUE_RECORDS = [
  { record: "Highest Weekly Score", holder: "Titsburgh Feelers", value: "184.12pts", date: "Week 1, 2026" },
  { record: "Lowest Weekly Score", holder: "Hollywood Oilers", value: "97.72pts", date: "Week 1, 2026" },
  { record: "Longest Win Streak", holder: "Seattle Swingers", value: "Two Games", date: "Week 2-3, 2026" }
];

// Existing media. To add a link, replace # with the URL.
const DAILY_PUNT_POSTS = [
  { title: "The Daily Punt - Issue #3", author: "Julius Oiler", date: "September 4, 2026", file: "media/daily-punt-3.pdf", cover: "media/daily-punt-3-cover.png", description: "Season preview, trades, training camp hits."},
  { title: "The Daily Punt - Issue #2", author: "Julius Oiler", date: "August 27, 2026", file: "media/daily-punt-2.pdf", cover: "media/daily-punt-2-cover.jpg", description: "The Daily Punt's post-draft analysis." },
  { title: "The Daily Punt - Issue #1", author: "Julius Oiler", date: "August 20, 2026", file: "media/daily-punt-1.pdf", cover: "media/daily-punt-1-cover.jpg", description: "The inaugural edition of The Daily Punt."}
];

/* ============================================================
   EDIT HERE: J&J SHOW EPISODES
   ============================================================
   This is the ONLY section you need to edit for J&J Show videos.

   For each episode, change:
   - title       = episode title
   - date        = episode date
   - url         = full YouTube watch link
   - description = text shown beside the thumbnail

   IMPORTANT: You do NOT need to add a thumbnail image yourself.
   The website automatically gets the thumbnail from YouTube.

   To add a new episode, copy one entire { ... } line and put the
   newest episode at the TOP of the list.
   ============================================================ */
const VIDEO_POSTS = [
  { title: "The J&J Show - Episode 5", author: "Jim and John", date: "September 29, 2026", url: "https://www.youtube.com/watch?v=MUH5WayOPBE", description: "Week 3 Review, Anonymous caller's fortnite hypothetical? Power Rankings and what you need to know for Week 4" },
  { title: "The J&J Show - Episode 4", author: "Jim and John", date: "September 23, 2026", url: "https://www.youtube.com/watch?v=w7p0FTEkNck", description: "Week 2 Review, Power Rankings, Week 3 Preview" },
  { title: "The J&J Show - Episode 3", author: "Jim and John", date: "September 16, 2026", url: "https://www.youtube.com/watch?v=siO4KZdvxcY&t=223s", description: "Week 1 Review, Power Rankings, Outlook on Week 2" }
];
