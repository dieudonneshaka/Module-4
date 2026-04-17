const form = document.getElementById("searchForm");
const input = document.getElementById("query");
const results = document.getElementById("results");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value;

  fetch(`https://api.chucknorris.io/jokes/search?query=${value}`)
    .then(response => response.json())
    .then(data => {
      results.innerHTML = "";

      data.result.forEach(jokeItem => {
        const article = document.createElement("article");

        const p = document.createElement("p");
        p.textContent = jokeItem.value;

        article.appendChild(p);
        results.appendChild(article);
      });
    })
    .catch(error => {
      console.error(error);
    });
});