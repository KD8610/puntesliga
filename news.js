renderHeader("news");
renderFooter();


function newsTypeClass(type)
{
	return type
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}


function displayNews()
{
	const container =
		document.getElementById("news-container");

	container.innerHTML = LEAGUE_NEWS.map(news => `

		<article class="news-card">

			<div class="news-heading">

				<span class="news-type ${newsTypeClass(news.type)}">
					${escapeHTML(news.type)}
				</span>

				<span class="news-date">
					${escapeHTML(news.date)}
				</span>

			</div>

			<h2 class="news-title">
				${escapeHTML(news.title)}
			</h2>

			<p>
				<strong>${escapeHTML(news.summary)}</strong>
			</p>

			<p>${escapeHTML(news.body)}</p>

		</article>

	`).join("");
}


displayNews();
