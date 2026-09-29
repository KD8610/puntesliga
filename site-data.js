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
  { rank: 1, team: "Titsburgh Feelers", note: "Need I say more? Feeling all the competition without consent." },
  { rank: 2, team: "San Diego Chuggers", note: "Much like the rest of the list, injuries are causing issues on this roster, especially Malik Nabers with the shoulder injury. Cameron Dicker is also a question mark at the kicker position, but for now we have them chugging away at #2." },
  { rank: 3, team: "Boston Tea Bags", note: "Loving the starting lineup, however the bench depth is looking slightly concerning however they are absolutely balling out in the starting lineup." },
  { rank: 4, team: "Seattle Swingers", note: "JSN and Drew \"Cock\" Lock letting it swing all over the place. The TE stack of Tyler Warren and George Kittle is looking like an unbelievable decision. Potentially the only concern is that LA Chargers offense and if they can turn it around." },
  { rank: 5, team: "New York Jets", note: "With Josh Allen leading the charge with a 40 ball, the only rough spot on the roster is at kicker? If that's the biggest concern the season might not be over? (Potentially some bias from John...?)" },
  { rank: 6, team: "Washington Commandos", note: "Looking at the QB position, they are going to need to pull something out of nowhere because injuries are going to absolutely demolish this squad." },
  { rank: 7, team: "Washington Foreskins", note: "Lots of consistency on this team, however looking at the depth, any injuries may cause this team's downfall." },
  { rank: 8, team: "Green Bay Gamblers", note: "Falling quickly, the Gamblers are going to need to pick up the pace after losing to the Oilers in historic fashion. Looking like a must win in week 3 to salvage the season." },
  { rank: 9, team: "Hollywood Oilers", note: "Despite the win, they do not have the ability among their starting lineup to perform week to week just yet. Give it a few years and they might break the top 5." },
  { rank: 10, team: "Denver BrownCocks", note: "Starting Matthew Golden at WR1 will never result in a positive, Jonathan Taylor and Lamar Jackson are their only hope."}
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
  { title: "The J&J Show - Episode 4", author: "Jim and John", date: "September 23, 2026", url: "https://www.youtube.com/watch?v=w7p0FTEkNck", description: "Week 2 Review, Power Rankings, Week 3 Preview" },
  { title: "The J&J Show - Episode 3", author: "Jim and John", date: "September 16, 2026", url: "https://www.youtube.com/watch?v=siO4KZdvxcY&t=223s", description: "Week 1 Review, Power Rankings, Outlook on Week 2" }
];
