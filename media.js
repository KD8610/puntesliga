renderHeader("media");
renderFooter();

/* ============================================================
   J&J SHOW DISPLAY CODE
   You normally DO NOT need to edit this file.

   To add/change an episode, edit VIDEO_POSTS in site-data.js.
   This code automatically:
   1. Gets the YouTube video ID from your link.
   2. Displays the video's YouTube thumbnail.
   3. Adds a button that opens the video on YouTube.
   ============================================================ */

function getYouTubeVideoID(url)
{
	if (!url || url.startsWith("REPLACE_ME"))
	{
		return "";
	}

	if (url.includes("youtu.be/"))
	{
		return url.split("youtu.be/")[1].split(/[?&]/)[0];
	}

	if (url.includes("youtube.com/watch"))
	{
		return new URL(url).searchParams.get("v") || "";
	}

	if (url.includes("youtube.com/embed/"))
	{
		return url.split("youtube.com/embed/")[1].split(/[?&]/)[0];
	}

	return "";
}


function displayDailyPunt()
{
	const container = document.getElementById("daily-punt-container");

	container.innerHTML = DAILY_PUNT_POSTS.map(post => `
		<article class="media-card">
			<img class="daily-punt-cover"
				src="${post.cover}"
				alt="${escapeHTML(post.title)}">

			<div>
				<h3>${escapeHTML(post.title)}</h3>
				<p class="media-author">
					By ${escapeHTML(post.author)} · ${escapeHTML(post.date)}
				</p>
				<p>${escapeHTML(post.description)}</p>
				<a class="button" href="${post.file}" target="_blank">
					Read The Daily Punt
				</a>
			</div>
		</article>
	`).join("");
}


function displayVideos()
{
	const container = document.getElementById("video-container");

	container.innerHTML = VIDEO_POSTS.map(post =>
	{
		const videoID = getYouTubeVideoID(post.url);

		let thumbnail;

		if (videoID)
		{
			thumbnail = `
				<a class="youtube-thumbnail-link"
					href="${post.url}"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Watch ${escapeHTML(post.title)} on YouTube">

					<img class="youtube-thumbnail"
						src="https://i.ytimg.com/vi/${videoID}/hqdefault.jpg"
						alt="Thumbnail for ${escapeHTML(post.title)}">

					<span class="youtube-play-button">▶</span>
				</a>
			`;
		}
		else
		{
			thumbnail = `
				<div class="media-placeholder">
					<strong>ADD YOUTUBE LINK IN site-data.js</strong>
				</div>
			`;
		}

		return `
			<article class="media-card">
				${thumbnail}

				<div>
					<h3>${escapeHTML(post.title)}</h3>
					<p class="media-author">
						By ${escapeHTML(post.author)} · ${escapeHTML(post.date)}
					</p>
					<p>${escapeHTML(post.description)}</p>

					${videoID ? `
						<a class="button"
							href="${post.url}"
							target="_blank"
							rel="noopener noreferrer">
							Watch on YouTube
						</a>
					` : `
						<p class="muted">Add the episode's YouTube link in site-data.js.</p>
					`}
				</div>
			</article>
		`;
	}).join("");
}


displayDailyPunt();
displayVideos();
