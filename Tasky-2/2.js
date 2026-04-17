const form = document.getElementById("searchForm");
const input = document.getElementById("query");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = input.value;

  fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
});