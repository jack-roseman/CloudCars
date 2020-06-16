
function loadContent() {
    var vehiclesDisplay = document.getElementById("vehicles")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/vehicles", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var myArr = JSON.parse(this.responseText);
        var count = 1;
        myArr.forEach(function(vehicle) {
            console.log(vehicle)
            vehiclesDisplay.innerHTML += `  ID: ${vehicle._id} <br />
                                            PROVIDER: ${vehicle.provider} <br />
                                            MAKE: ${vehicle.make} <br />
                                            MODEL: ${vehicle.model} <br />
                                            YEAR: ${vehicle.year} <br />
                                            STATUS: ${vehicle.sanitaryStatus}<br />
                                            LAST ADDRESS: ${vehicle.lastKnownAddress} <br />
                                            LAST IMAGE: ${vehicle.lastImageSent} <br />
                                            <br />`;
            count ++;
        });
      }
    }
    xhttp.send();
  }

function registerVehicle() {
    const provider = document.getElementById("provider").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;

    var url = `http://localhost:3000/vehicles/register/${provider}/${make}/${model}/${year}`;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.send(); 
}