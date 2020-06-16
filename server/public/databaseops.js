
function loadContent() {
    var vehiclesDisplay = document.getElementById("vehicles")
    var xhttp = new XMLHttpRequest()
    xhttp.responseType = 'json'
    xhttp.open("GET", "http://localhost:3000/vehicles", true)
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var vehicles = xhttp.response.vehicles
        vehicles.forEach(function(vehicle) {
            vehiclesDisplay.innerHTML +=   `ID: ${vehicle._id} <br />
                                            PROVIDER: ${vehicle.provider} <br />
                                            MAKE: ${vehicle.make} <br />
                                            MODEL: ${vehicle.model} <br />
                                            YEAR: ${vehicle.year} <br />
                                            STATUS: ${vehicle.sanitaryStatus}<br />
                                            LAST ADDRESS: ${vehicle.lastKnownAddress} <br />
                                            LAST IMAGE: ${vehicle.lastImageSent} <br />
                                            <br />`;
        });
      }
    }
    xhttp.send();
  }

function registerVehicle() {
    var json = {
        provider: document.getElementById("provider").value,
        make: document.getElementById("make").value,
        model: document.getElementById("model").value,
        year: document.getElementById("year").value
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/vehicles/register", false);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(json));
}


function toggleVehicles() {
    var toggleButton = document.getElementById("toggleBtn")
    var vehiclesDisplay = document.getElementById("vehicles")
    if (!vehiclesDisplay.hidden) {
        toggleButton.value = "Show Vehicles"
        vehiclesDisplay.hidden = true
    } else if (vehiclesDisplay.hidden) {
        toggleButton.value = "Hide Vehicles"
        vehiclesDisplay.hidden = false
    }
}