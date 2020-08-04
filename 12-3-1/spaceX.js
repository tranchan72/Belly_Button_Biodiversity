// Define URL to the SpaceX
const url = "https://api.spacexdata.com/v2/launchpads";

// Call to SpaceX’s API, retrieves the data, and prints it to the browser console
d3.json(url).then(receivedData => console.log(receivedData));

// To retrieve the full_name of the Vandenberg Air Force Base
d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

// To access the latitude of the Vandenberg Airforce Base
d3.json(url).then(spaceXResults => console.log(spaceXResults[0].location.latitude));