function getTeamImage(teamName) {
  return TEAM_IMAGES[(teamName || "").trim()] || "images/logo.jpeg";
}

function teamNameForUser(user) {
  if (!user) return "Unknown Team";
  return (user.metadata && user.metadata.team_name ? user.metadata.team_name : user.display_name).trim();
}

function navHTML(active) {
  const links = [
    ["home", "index.html", "Home"], ["matchups", "matchups.html", "Matchups"],
    ["standings", "standings.html", "Standings"], ["owners", "owners.html", "Owners"],
    ["transactions", "transactions.html", "Transactions"],
    ["news", "news.html", "News"], ["rankings", "rankings.html", "Power Rankings"],
    ["records", "records.html", "Records"], ["media", "media.html", "Media"]
  ];
  return links.map(([key, href, label]) => `<a class="${active === key ? "active" : ""}" href="${href}">${label}</a>`).join("");
}

function renderHeader(active) {
  const header = document.querySelector("header");
  if (!header) return;
  header.innerHTML = `
    <a class="brand" href="index.html"><img src="images/logo.jpeg" alt="Puntesliga logo" class="league-logo"></a>
    <p>${SITE_CONFIG.tagline}</p>
    <nav>${navHTML(active)}</nav>`;
}

function renderFooter() {
  const footer = document.querySelector("footer");
  if (footer) footer.innerHTML = `<p>© ${SITE_CONFIG.season} Puntesliga · ${SITE_CONFIG.tagline}</p>`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}


function enablePageTransitions()
{
	document.body.classList.add("page-ready");

	document.querySelectorAll('a[href]').forEach(link =>
	{
		const href = link.getAttribute("href");

		if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || link.target === "_blank")
		{
			return;
		}

		link.addEventListener("click", event =>
		{
			if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

			event.preventDefault();
			document.body.classList.remove("page-ready");
			document.body.classList.add("page-leaving");

			setTimeout(() =>
			{
				window.location.href = href;
			}, 180);
		});
	});
}

requestAnimationFrame(enablePageTransitions);
