const form = document.getElementById("searchForm");
const input = document.getElementById("query");
const results = document.getElementById("results");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value;

  fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
    .then(response => response.json())
    .then(data => {
      results.innerHTML = '';

      data.forEach(item => {
        const show = item.show;

        const article = document.createElement("article");

        const title = document.createElement("h2");
        title.textContent = show.name;

        const link = document.createElement("a");
        link.href = show.url;
        link.textContent = "View details";
        link.target = "_blank";

        const img = document.createElement("img");

        if (show.image && show.image.medium) {
          img.src = show.image.medium;
        } else {
          img.src = "https://placehold.co/210x295?text=Not%20Found";
        }

        img.alt = show.name;

        const summary = document.createElement("div");
        summary.innerHTML = show.summary;

        article.appendChild(title);
        article.appendChild(link);
        article.appendChild(img);
        article.appendChild(summary);

        results.appendChild(article);
      });
    });
});