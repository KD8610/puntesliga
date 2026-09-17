const dailyPuntPosts = [

	{
		title: "The Daily Punt - Issue #2",
		author: "Julius Oiler",
		date: "August 27, 2026",

		type: "pdf",

		file: "media/daily-punt-2.pdf",

		cover: "media/daily-punt-2-cover.jpg",

		description: "The Daily Punt's post-draft analysis."
	},

	{
		title: "The Daily Punt - Issue #1",
		author: "Julius Oiler",
		date: "August 20, 2026",

		type: "pdf",

		file: "media/daily-punt-1.pdf",

		cover: "media/daily-punt-1-cover.jpg",

		description: "The inaugural edition of The Daily Punt."
	}
];


const jjShowPosts = [

	{
		title: "The J&J Show - Episode 2",
		author: "John and Jim",
		date: "August 24, 2026",
		type: "mp4",
		file: "media/jj-show-2.mp4",
		description: "John and Jim's post draft review, season preview, and Power Rankings."
	},
	
	{
		title: "The J&J Show - Episode 1",
		author: "John and Jim",
		date: "August 19, 2026",
		type: "mp4",
		file: "media/jj-show-1.mp4",
		description: "John and Jims mid-draft analysis."
	}

];


function displayMedia(posts, containerID)
{
	const container =
		document.getElementById(containerID);

	container.innerHTML = "";


	for (let post of posts)
	{
		const article =
			document.createElement("article");

		article.className = "media-card";


		let media;


		if (post.type === "pdf")
		{
		media = `
			<div class="daily-punt-preview">

			<img src="${post.cover}"
				 alt="${post.title}"
				 class="daily-punt-cover">

			<a href="${post.file}"
			   target="_blank"
			   class="read-punt-button">

				Read The Daily Punt

			</a>

		</div>
	`;
}

		else if (post.type === "mp4")
		{
			media = `
				<video class="media-video" controls>

					<source src="${post.file}"
							type="video/mp4">

					Your browser does not support this video.

				</video>
			`;
		}

		article.innerHTML = `

			<div class="media-content">

				<h3>
					${post.title}
				</h3>

				<p class="media-author">
					By ${post.author} | ${post.date}
				</p>

				<p>
					${post.description}
				</p>

				${media}

			</div>

		`;


		container.appendChild(article);
	}
}


displayMedia(
	dailyPuntPosts,
	"daily-punt-container"
);


displayMedia(
	jjShowPosts,
	"jj-show-container"
);