PUNTESLIGA WEBSITE - QUICK EDIT GUIDE
=====================================

START HERE
----------
The website is plain HTML + CSS + JavaScript. No build tools are required.
The most important file for your own weekly content is:

    site-data.js

Search that file for the text:

    REPLACE_ME

Every REPLACE_ME item is intentionally waiting for your own text, team, date, score, or link.

WHAT TO EDIT
------------
1. League/social links:
   site-data.js -> SITE_CONFIG.links

2. News / weekly recaps:
   site-data.js -> LEAGUE_NEWS

3. Power rankings:
   site-data.js -> POWER_RANKINGS

4. Weekly awards:
   site-data.js -> WEEKLY_AWARDS

5. League records:
   site-data.js -> LEAGUE_RECORDS

6. Daily Punt issues:
   site-data.js -> DAILY_PUNT_POSTS
   Put PDFs/covers in the media folder and update the paths.

7. Video links:
   site-data.js -> VIDEO_POSTS
   Replace REPLACE_ME_VIDEO_LINK with the real URL.

8. Owner biographies:
   owners.js -> owners array

9. Team logos:
   site-data.js -> TEAM_IMAGES
   Image files are stored in /images.

AUTOMATIC - GENERALLY DO NOT EDIT
---------------------------------
- Matchup scores: Sleeper API
- Current week: Sleeper API
- Standings: Sleeper API
- PF / PA: Sleeper API
- Homepage league leaders: Sleeper API
- Matchup of the Week ordering from Week 5: calculated from combined wins

PICK'EM REMOVAL
---------------
The Pick'em feature has been completely removed from the active website:
- No owner selector
- No pick buttons
- No pick percentages
- No Supabase library
- No Supabase URL/key
- No database calls

DESIGN
------
The site now uses a black/dark background throughout. The extra header images were removed from every page. Only the Puntesliga logo remains.

FILES / PAGES
-------------
index.html       Home
matchups.html    Live matchups
standings.html   Live standings
owners.html      Owner profiles
news.html        League news / recaps
rankings.html    Power rankings
records.html     League records
media.html       Daily Punt / videos

DEPLOYING
---------
You can upload this folder to the same GitHub repository you already use for the site. Because it is static HTML/CSS/JS, GitHub Pages can host it directly.
