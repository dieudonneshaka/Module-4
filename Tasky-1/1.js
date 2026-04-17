const form = document.getElementById("searchForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const query = document.getElementById("query").value;

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
});