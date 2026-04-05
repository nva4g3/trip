let map;
let waypoints = [];

function addAddress() {
    const addressList = document.getElementById('address-list');
    const newInputDiv = document.createElement('div');
    newInputDiv.classList.add('address-input');
    newInputDiv.innerHTML = `
        <input type="text" placeholder="Enter Address">
        <input type="text" placeholder="Enter Postal Code">
    `;
    addressList.appendChild(newInputDiv);
}

function calculateRoute() {
    const addressInputs = document.querySelectorAll('.address-input');
    const addresses = [];
    
    addressInputs.forEach(inputDiv => {
        const address = inputDiv.querySelector('input[type="text"]').value;
        const postalCode = inputDiv.querySelector('input[type="text"]:nth-child(2)').value;
        addresses.push({ address, postalCode });
    });

    if (addresses.length < 2) {
        alert("Please enter at least two addresses.");
        return;
    }

    // Initialize the map if it's not initialized
    if (!map) {
        map = L.map('map').setView([51.505, -0.09], 13);  // You can adjust the initial coordinates
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }

    // Reset the waypoints array
    waypoints = [];

    addresses.forEach((item, index) => {
        const geocoder = new OpenCage.Geocoder('YOUR_API_KEY');  // Replace with your OpenCage API Key
        geocoder.geocode(`${item.address}, ${item.postalCode}`).then(result => {
            if (result.status.code === 200) {
                const { lat, lng } = result.results[0].geometry;
                const marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup(`<b>${item.address}</b><br>${item.postalCode}`).openPopup();
                
                waypoints.push(L.latLng(lat, lng));

                // Once all addresses are geocoded, create the route
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
    // Make sure the directions are created only if waypoints exist
    if (waypoints.length > 1) {
        const routeControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true
        }).addTo(map);
    }
}
