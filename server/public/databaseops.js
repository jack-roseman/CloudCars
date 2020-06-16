function registerVehicle() {
    console.log("Registering Vehicle")
    var p = document.getElementById("p1")
    p.innerText = "";
    const provider = document.getElementById("provider").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;

    if (provider.length == 0 || make.length == 0 || model.length == 0 || year.length == 0) {
        p.innerText = "Please enter all of the information.";
    } else {
        var url = `http://localhost:3000/vehicles/register/${provider}/${make}/${model}/${year}`;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.send(); 
    }
}