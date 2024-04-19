// importing the sass stylesheet for bundling
import "./../sass/styles.scss";

// leaflet imports
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";

// api config
import { API_ENDPOINTS, EXTRACTORS } from "./apiConfig";

// leaflet map and marker objects
let map;
let markers = [];

/* ----------------------------- EVENT LISTENERS ---------------------------- */
document.getElementById("slctCategory").addEventListener("change", function() {
    const selectedEndpoint = this.value;
    const URL = API_ENDPOINTS[selectedEndpoint];
    const EXTRACTOR = EXTRACTORS[selectedEndpoint];
    removeMarkers();
    fetchAndProcessJSON(URL, EXTRACTOR, handleData, handleError);
});
  


/* ----------------------------- EVENT HANDLERS ----------------------------- */
function fetchAndProcessJSON(url, extractorFunction, callback, errorCallback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => callback(extractorFunction(json)))
        .catch(error => errorCallback(error));
}
  
function handleData(data) {
    // create markers and place on map
    data.forEach(place => {
        if (place.latitude && place.longitude) {
            let marker = L.marker([place.latitude, place.longitude]).addTo(map);

            // add marker to markers array
            markers.push(marker);

            // dynamically create tooltip content, excluding latitude and longitude, and adjusting case
            let tooltipContent = "<div class=\"g-tooltip\">";
            for (const [key, value] of Object.entries(place)) {
                // Skip latitude and longitude
                if (key !== "latitude" && key !== "longitude" && value && value.trim() !== "") {
                    let displayValue = value;
                    // Check if the value is all uppercase and not a URL
                    if (typeof value === "string" && value === value.toUpperCase() && !value.startsWith("http")) {
                        // Convert to title case if all letters are uppercase
                        displayValue = toTitleCase(value);
                    }
                    // Capitalize the first letter of each key for display and replace underscores with spaces
                    let displayKey = toTitleCase(key.replace(/_/g, " "));
                    tooltipContent += `<strong>${displayKey}:</strong> ${displayValue}<br>`;
                }
            }
            tooltipContent += "</div>";

            // bind the tooltip to the marker
            marker.bindTooltip(tooltipContent);
        }
    });
}

  
function handleError(error) {
    // Handle any errors
}

/* -------------------------------- FUNCTIONS ------------------------------- */
function removeMarkers() {
    // removing previous markers
    markers.forEach(marker => marker.remove());

    // reset markers array
    markers = [];
}

// Utility function to convert a string to title case
function toTitleCase(str) {
    return str.toLowerCase().split(" ").map(word => {
        return (word.charAt(0).toUpperCase() + word.slice(1)).replace(/_/g, " ");
    }).join(" ");
}

// --------------------------------------------------------- main method
function main() {
    // initializing the leaflet map
    map = L.map("map").setView([45.0, -63.5], 8);
    // setup the map provider
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 12,
        attribution: "<div>&copy; OpenStreetMap</div>"
    }).addTo(map);
}

main();