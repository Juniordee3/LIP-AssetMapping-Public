// importing the sass stylesheet for bundling
import "./../sass/styles.scss";

// leaflet imports
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";

// api config
import { CATEGORIES } from "./apiConfig";

// leaflet map and marker objects
let map;
let markers = [];

let iconColor;
let myIcon;

/* ----------------------------- EVENT LISTENERS ---------------------------- */

document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll(".categoryBox");
    let lastSelected = document.getElementById("newcomerServices"); // Store the last selected box

    // set default category
    const DEFAULT_CATEGORY = "NEWCOMER_SERVICES_ENDPOINTS";
    const DEFAULT_BOX = document.querySelector(`[data-category="${DEFAULT_CATEGORY}"]`);

    // highlight default category
    if (DEFAULT_BOX) {
        DEFAULT_BOX.classList.add("selectedBox");
    }

    // set the icon color for the default category
    iconColor = "yellow";

    // set the icon for the default category
    myIcon = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    boxes.forEach(box => {
        box.addEventListener("click", function(e) {
            // If there's a last selected box, toggle its 'selected' class off
            if (lastSelected) {
                lastSelected.classList.remove("selectedBox");
            }
            
            // Toggle the current box's 'selected' state and update lastSelected
            this.classList.toggle("selectedBox");
            lastSelected = this.classList.contains("selectedBox") ? this : null;
            selectCategory(e);
        });
    });
    // get the endpoints for the selected category
    if (CATEGORIES[DEFAULT_CATEGORY]) {
        CATEGORIES[DEFAULT_CATEGORY].forEach(service => {
            fetchAndProcessJSON(service.url, service.extractor, handleData, handleError);
        });
    } else {
        console.error("Category not found");
    }
    // generate checkboxes
    generateCheckboxes();
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
            let marker = L.marker([place.latitude, place.longitude], {icon: myIcon}).addTo(map);

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

// when category box is clicked
function selectCategory(e) {
    // remove previous markers
    removeMarkers();

    // get the selected category
    const CATEGORY = e.target.getAttribute("data-category");

    // get the icon color for the selected category
    iconColor = e.target.getAttribute("data-color");
    // update the icon
    myIcon = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // get the endpoints for the selected category
    if (CATEGORIES[CATEGORY]) {
        CATEGORIES[CATEGORY].forEach(service => {
            fetchAndProcessJSON(service.url, service.extractor, handleData, handleError);
        });
    } else {
        console.error("Category not found");
    }
}

function generateCheckboxes() {
    const container = document.getElementById("filter-container"); // Ensure this container exists in your HTML
    CATEGORIES.NEWCOMER_SERVICES_ENDPOINTS.forEach(endpoint => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = endpoint.url; // Using the URL as a unique ID
        checkbox.checked = true; // Default to checked
        checkbox.onchange = () => toggleMarkers(checkbox.checked, endpoint.url);

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = endpoint.name;

        container.appendChild(checkbox);
        container.appendChild(label);
    });
}

function toggleMarkers(checked, url) {
    if (checked) {
        markers[url].forEach(marker => marker.addTo(map));
    } else {
        markers[url].forEach(marker => marker.remove());
    }
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