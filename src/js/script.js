function getPrevision(){

    $(document).ready(function(){              
        var requestData = $("#city").val();
        var meteoDuJour = $("#meteoDuJour");
        meteoDuJour.html("");
        var infoMeteo = $("#infoMeteo");
        infoMeteo.html("");
        var plusDeDetail = $("#plusDeDetail");
        plusDeDetail.html("");

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast",
            method: "get",
            data: {q: requestData, appid: "ee07e2bf337034f905cde0bdedae3db8", lang:"fr", units:"metric", cnt:"5"},
            dataType: "json",
            success: function(city){    
                //Parcours des enfants
                    meteoDuJour.html("<p>" + " Météo du jour - " + city.list[0].weather[0].description + ' <img src="http://openweathermap.org/img/wn/' +  city.list[0].weather[0].icon + '.png"' +  'alt="Weather icon">')
                

                    infoMeteo.html("<p> Nom de la ville: " + city.name + " - " + city.city.country + "</p>"
                        + "<p> Température: " + city.list[0].main.temp + "°C     Ressentis: " +city.list[0].main.feels_like + "°C </p>"
                        + "<p> Pression: " + city.list[0].main.pressure+"Pa </p>"
                        + "<p> Taux d'humidité: " + city.list[0].main.humidity + "% </p>"
                        + '<img id="dots" src = "src/img/three-small-dots.png" alt ="logo afficher plus">');
                    
                    plusDeDetail.hide();
                    plusDeDetail.html("<p>Longitude: " + city.city.coord.lon + "°      Latitude: " + city.city.coord.lat + "° </p>"
                        + "<p> Température minimale: " + city.list[0].main.temp_min + "°C     Température maximale: " + city.list[0].main.temp_max + "°C </p>"
                        + "<p> Vitesse du vent: " + city.list[0].wind.speed + "kts    Orientation du vent: " + city.list[0].wind.deg + '°     Rafales: ' +city.list[0].wind.gust + "kts </p>");
                    
                    $("#dots").click( function() {
                        plusDeDetail.toggle();
                    });
                    
                
            }
        });
    }); 
};

