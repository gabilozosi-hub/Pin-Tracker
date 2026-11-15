// RESET IF YOU WANT TO TEST AGAIN
// localStorage.clear();

let savedName = localStorage.getItem("trackerName");
let savedAvatar = localStorage.getItem("trackerAvatar");

if(!savedName){

    savedName = prompt("Who are we tracking today?");

    let choice = prompt(
        "Choose Avatar\n\n1 = Boy 👦\n2 = Girl 👧"
    );

    if(choice === "2"){
        savedAvatar = "👧";
    }else{
        savedAvatar = "👦";
    }

    localStorage.setItem(
        "trackerName",
        savedName
    );

    localStorage.setItem(
        "trackerAvatar",
        savedAvatar
    );

}

document.getElementById("personName").innerHTML =
savedName || "Family Member";

document.getElementById("avatar").innerHTML =
savedAvatar || "👦";

function startTracking(){

    document.getElementById("status").innerHTML =
    "Finding Location...";

    navigator.geolocation.watchPosition(

        function(position){

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const acc = position.coords.accuracy;

            document.getElementById("map").src =
            `https://maps.google.com/maps?q=${lat},${lng}&z=18&output=embed`;

            document.getElementById("lastSeen").innerHTML =
            new Date().toLocaleTimeString();

            if(acc > 100){

                document.getElementById("accuracy").innerHTML =
                "Weak";

                document.getElementById("safeStatus").innerHTML =
                "Searching...";

                document.getElementById("status").innerHTML =
                "⚠ Weak GPS Signal";

            }else{

                document.getElementById("accuracy").innerHTML =
                "Good";

                document.getElementById("safeStatus").innerHTML =
                "Safe ✅";

                document.getElementById("status").innerHTML =
                "📍 Tracking Active";

            }

        },

        function(){

            document.getElementById("status").innerHTML =
            "Location Permission Denied ❌";

        },

        {
            enableHighAccuracy:true,
            timeout:15000,
            maximumAge:0
        }

    );
}