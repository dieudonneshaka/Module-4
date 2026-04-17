const form = document.getElementById("routeForm");
const input = document.getElementById("address");
const timeText = document.getElementById("time");

const school = { lat: 60.224, lon: 24.758 };

const map = L.map("map").setView([60.224, 24.758], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let routeControl;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const address = input.value;

  fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${address}&size=1`)
    .then(res => res.json())
    .then(data => {
      const coords = data.features[0].geometry.coordinates;

      const startLatLng = L.latLng(coords[1], coords[0]);
      const endLatLng = L.latLng(school.lat, school.lon);

      if (routeControl) {
        map.removeControl(routeControl);
      }

      routeControl = L.Routing.control({
        waypoints: [startLatLng, endLatLng]
      }).addTo(map);

      return fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `
            {
              plan(
                fromPlace: "${startLatLng.lat},${startLatLng.lng}",
                toPlace: "${endLatLng.lat},${endLatLng.lng}",
                numItineraries: 1
              ) {
                itineraries {
                  startTime
                  endTime
                }
              }
            }
          `
        })
      });
    })
    .then(res => res.json())
    .then(data => {
      const itinerary = data.data.plan.itineraries[0];

      const start = new Date(itinerary.startTime).toLocaleTimeString();
      const end = new Date(itinerary.endTime).toLocaleTimeString();

      timeText.textContent = `Departure: ${start} - Arrival: ${end}`;
    })
    .catch(err => {
      console.error(err);
    });
});