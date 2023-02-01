function getPrevision(){
    console.log("UwU");

    $(document).ready(function(){      
        console.log("fghjkl");
        
        var requestData = $("#city").val();
        var resultElement = $("#meteoDuJour");
        resultElement.html("");
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            method: "get",
            data: {q: requestData, appid: "ee07e2bf337034f905cde0bdedae3db8", lang:"fr", units:"metric"},
            dataType: "json",
            success: function(response){
                //Parcours des enfants

               if(response.message != null){
                    resultElement.html(response.message);
                }
                else{
                    resultElement.html(response.weather[0].main)
                }
                /*
                console.log($(data));
                $('#meteoDuJour').show();
                $('#meteoDuJour').append(" : </br> ") + data[0].main;
                */
            }
        });
    }); 
}

/* 

    if(window.XMLHttpRequest)
        xhr = new XMLHttpRequest();
    else {
        alert("Votre navigateur n'est pas supporté, essayez avec un autre navigateur (Chrome, Firefox, etc..)");
        return;
    }

        var url = new URL("https://api.openweathermap.org/data/2.5/weather?q=vannes&appid=ee07e2bf337034f905cde0bdedae3db8&lang=fr&units=metric");
        url.searchParams.set('q', document.getElementById("city").value);
        xhr.open("GET", url, true);
        xhr.send(null);
        
        xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200){
                var doc = xhr.response;
                data = JSON.parse(doc);
                document.getElementById("hidden").style.visibility = 'visible';
                document.getElementById("meteoDuJour").innerHTML = "<p>" + " Météo du jour - " + data['weather']['0']['description'] + ' <img src="http://openweathermap.org/img/wn/' +  data['weather'][0]['icon'] + '.png"' +  'alt="Weather icon">';
                document.getElementById("infoMetshoeo").innerHTML = "<p>" + "Nom de la ville: " + data['name']+" - " + data['sys']['country'] + "</p>"
                    + "<p>" + "Température: " + data['main']['temp'] + "°C     Ressentis: " +data['main']['feels_like']+"°C" + "</p>"
                    + "<p>" + "Pression: " + data['main']['pressure']+"Pa" +'</p>'
                    + '<img src = "src/img/three-small-dots.png" alt ="logo afficher plus" onclick="showHide()">';
                    

                document.getElementById("plusDeDetail").innerHTML = "<p>" + "Longitude: " + data['coord']['lon']+"°      Latitude: " + data['coord']['lat'] + "° </p>"
                    + "<p>" + "Température minimale: " + data['main']['temp_min'] + "°C     Température maximale: " +data['main']['temp_max']+"°C" + "</p>"
                    + "<p>" + "Taux d'humidité: " + data['main']['humidity']+"%" +'</p>'
                    + "<p>" + "Vitesse du vent: " + data['wind']['speed'] + "kts    Orientation du vent: " + data['wind']['deg']+'°     Rafales: ' +data['wind']['gust'] + "kts " + "</p>";
                
            }
            else{
                document.getElementById("infoMeteo").innerHTML = "<p>" + "Cette ville n'existe pas ou n'est pas prise en charge." +"</p>";
            }
        }
    }
}

*/

function showHide() {
    if (document.getElementById("plusDeDetail").style.display == 'none'){
        document.getElementById("plusDeDetail").style.display = 'flex';
    }else{
        document.getElementById("plusDeDetail").style.display = 'none';
    }
}

