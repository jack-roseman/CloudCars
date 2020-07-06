const url = window.location.origin;

function loadContent() {
    var vehiclesDisplay = document.getElementById("vehicles")
    var xhttp1 = new XMLHttpRequest()
    xhttp1.responseType = 'json'
    xhttp1.open("GET", `${url}/vehicles`, true)
    xhttp1.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var vehicles = this.response.vehicles
        if (vehicles.length == 0) {
          vehiclesDisplay.innerHTML = "<b>No vehicles in databse</b>"
        } else {
          vehiclesDisplay.innerHTML = ""
          vehicles.forEach((vehicle) => {
            var addr = vehicle.lastKnownAddress
            const loc = addr.number == "unknown" ? "unknown" : `${addr.number} ${addr.street}, ${addr.city} ${addr.state} ${addr.zip}`
            vehiclesDisplay.innerHTML +=   `<b>ID</b>: ${vehicle._id} <br />
                                            <b>OWNER</b>: ${vehicle.owner} <br />
                                            <b>MAKE</b>: ${vehicle.make} <br />
                                            <b>MODEL</b>: ${vehicle.model} <br />
                                            <b>YEAR</b>: ${vehicle.year} <br />
                                            <b>STATUS</b>: ${vehicle.sanitaryStatus}<br />
                                            <b>LAST LOCATION</b>: ${loc} <br />
                                            <b>LAST INTERIOR IMAGE</b>: ${vehicle.lastImageSent} <br />
                                            <b>LAST CLEANING DATE</b>: ${vehicle.dateOfLastCleaning == undefined ? "unknown" : vehicle.dateOfLastCleaning} <br />
                                            <b>NUMBER OF TIMES SERVICED</b>: ${vehicle.numTimesServiced} <br />
                                            <b>DATE JOINED</b>: ${vehicle.dateJoined.toString()} <br />
                                            <br />`;
          });
        }
      }
    }
    xhttp1.send();

    var partnersDisplay = document.getElementById("partners")
    var xhttp2 = new XMLHttpRequest()
    xhttp2.responseType = 'json'
    xhttp2.open("GET", `${url}/partners`, true)
    xhttp2.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var partners = this.response.partners
        if (partners.length == 0) {
          partnersDisplay.innerHTML = "<b>No partners in database</b>"
        } else {
          partnersDisplay.innerHTML = ""
          partners.forEach((partner) => {
            console.log(partner)
            var addr = partner.address
            const loc = addr.number == "unknown" ? "unknown" : `${addr.number} ${addr.street}, ${addr.city} ${addr.state} ${addr.zip}`
            partnersDisplay.innerHTML +=   `<b>ID</b>: ${partner._id} <br />
                                            <b>NAME</b>: ${partner.name} <br />
                                            <b>LOCATION</b>: ${loc} <br />
                                            <b>SERVICES</b>: ${partner.services.toString()} <br />
                                            <b>EMPLOYEES</b>: ${partner.numberOfEmployees} <br />
                                            <b>NUMBER OF SERVICINGS</b>: ${partner.numberOfServicings} <br />
                                            <b>DATE JOINED</b>: ${partner.dateJoined.toString()} <br />
                                            <br />`;
          });
        }
      }
    }
    xhttp2.send();
}

function registerVehicle() {
    var json = {
        owner: document.getElementById("owner").value,
        make: document.getElementById("make").value,
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${url}/vehicles/register`, false);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(json));
}

function registerPartner() {
  var services = []
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked")
  for (var i = 0; i < checkboxes.length; i++) {
    services.push(checkboxes[i].value)
  }
  var json = {
      name: document.getElementById("partnerName").value,
      number: document.getElementById("streetNumber").value,
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      services: services
  }
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `${url}/partners/register`, false);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(json));
}

function toggleVehicles() {
    var toggleButton = document.getElementById("toggleShowVehiclesBtn")
    var vehiclesDisplay = document.getElementById("vehicles")
    if (!vehiclesDisplay.hidden) {
        toggleButton.value = "Show Vehicles"
        vehiclesDisplay.hidden = true
    } else if (vehiclesDisplay.hidden) {
        toggleButton.value = "Hide Vehicles"
        vehiclesDisplay.hidden = false
    }
}

function togglePartners() {
  var toggleButton = document.getElementById("toggleShowPartnersBtn")
  var partnersDisplay = document.getElementById("partners")
  if (!partnersDisplay.hidden) {
      toggleButton.value = "Show Vehicles"
      partnersDisplay.hidden = true
  } else if (partnersDisplay.hidden) {
      toggleButton.value = "Hide Vehicles"
      partnersDisplay.hidden = false
  }
}