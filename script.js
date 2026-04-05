<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roundtrip Route Planner</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Roundtrip Route Planner</h2>
    <p>Enter addresses and their zip codes below. We will organize the shortest route to make a round trip.</p>

    <div id="addresses"></div>

    <button id="addAddressBtn">Add Address</button>
    <button id="finishBtn" style="display:none;">Finish</button>

    <div id="map"></div>

    <script src="script.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap"></script>
</body>
</html>
