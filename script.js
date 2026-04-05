let addresses = [];
let map;
let routeLines = [];
let colorIndex = 0;
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F9A800", "#8E44AD"];

function addAddress() {
    const addressDiv = document.createElement('div');
    addressDiv.classList.add('address-input');
    
    const inputAddress = document.createElement('input');
    inputAddress.type = "text";
    inputAddress.placeholder = "Enter Address";

    const inputPostalCode = document.createElement('input');
    inputPostalCode.type = "text";
    inputPostalCode.placeholder = "Enter Postal Code";
    
    addressDiv.appendChild(inputAddress);
    addressDiv.appendChild(inputPostalCode);

    document.getElementById('addresses').appendChild(addressDiv);
}

function calculateRoute() {
    const addressInputs = document.querySelectorAll('.address-input');
    addresses = [];
    
    addressInputs.forEach(inputDiv => {
        const address = inputDiv.querySelector('input[type="text"]').value;
        const postalCode = inputDiv.querySelector('input[type="text"]:nth-child(2)').value;
        addresses.push({ address, postalCode });
    });

    if (addresses.length < 2) {
        alert("Please enter at least two addresses.");
        return;
    }

    map = L.map('map').setView([51.505, -0.09], 13); // Initialize map with default view
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add markers and calculate route
    const waypoints = [];
    addresses.forEach((item, index) => {
        const geocoder = new OpenCage.Geocoder('YOUR_API_KEY'); // Replace with your API key
        geocoder.geocode(`${item.address}, ${item.postalCode}`).then(result => {
            if (result.status.code === 200) {
                const { lat, lng } = result.results[0].geometry;
                const marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup(`<b>${item.address}</b><br>${item.postalCode}`).openPopup();
                
                waypoints.push(L.latLng(lat, lng));

                if (index === addresses.length - 1) {
                    createRoute(waypoints);
                }
            } else {
                alert('Error geocoding address: ' + item.address);
            }
        });
    });
}

function createRoute(waypoints) {
    const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        lineOptions: {
            styles: [{ color: colors[colorIndex++ % colors.length], weight: 4 }]
        }
    }).addTo(map);

    // Draw route
    routingControl.on('routesfound', function(event) {
        const routes = event.routes;
        routes.forEach((route, index) => {
            routeLines.push(route);
        });
    });
}
