    $(function(){              

        $(".search-location").on('submit', function(e){
            e.preventDefault();

            var searchForm = $('.search-location');
            var requestData = $('#searchCity').val();
            var cityName = $('.city-name p');
            var cardBody = $('.cardList');
            var timeImage = $('.card-img-top');
            var cardInfo = $('.back-card');
            var cards = "";
            var fontCol = "";
            var srcImg = "";
            var nbDays = $('#numberDay').val()*9;
            const date = new Date();
            console.log(nbDays)
            console.log(date.getHours());
            if(nbDays == 0){
                nbDays = 24 - date.getHours() - 3; 
            }
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast",
                method: "get",
                data: {q: requestData, appid: "ee07e2bf337034f905cde0bdedae3db8", lang:"fr", units:"metric", cnt:nbDays},
                dataType: "json",
                success: function(city){
                    for (let index = 0; index < nbDays; index = index + 2) {
                        var icon = city.list[index].weather[0].icon;
                        var date = city.list[index].dt_txt.slice(5,11);
                        var heure = city.list[index].dt_txt.slice(11,16);
                            
                        var isDayTime = (iconP) => {
                            if (iconP.search('d') != -1) {
                                return true 
                            } else { 
                                return false 
                            }
                        };
                        
    
                        if (isDayTime(icon)) {
                            console.log('day');
                            srcImg = 'src/img/day_image.svg';    
                            fontCol = 'text-black';
                        
                        } else {
                            console.log('night');
                            srcImg = 'src/img/night_image.svg';
                            fontCol = 'text-white';
                        }       
                        
                        
                        
                        var iconSrc = "http://openweathermap.org/img/wn/" + icon+ "@2x.png"
                        cityName.text(city.city.name);                     
                        cards += `
                        <div class="card rounded my-3 shadow-lg back-card imBlue_da_ba_dee_da_ba_daa">
                            <div class="card-top text-center `+fontCol+`">
                                <div class="city-name">
                                    <h2>`+ city.city.name+`</h2>
                                    <p> le ` + date + `</p>
                                    <p> à ` + heure + `</p>
                                </div>
                                <img src="`+srcImg+`" alt="" class="card-img-top time" />
                        </div>
        
                            <div class="card-body">
                                <div class="card-mid row">
                                    <div class="col-6 text-center temp">
                                        <h1>` +city.list[index].main.temp+ `°C</h1>
                                    </div>
                                    <div class="col-6 condition-temp">
                                        <p class="condition">`+city.list[index].weather[0].description+`</p>
                                        <p class="high">max `+city.list[index].main.temp_max+`°C</p>
                                        <p class="low">min `+city.list[index].main.temp_min+`°C</p>
                                    </div>
                                </div>
                            
                                <div class="icon-container card shadow mx-auto">
                                    <img src="`+iconSrc+`" alt="" />
                                </div>
                                <div class="card-bottom px-8 py-4 row">
                                    <div class="col text-center">
                                        <h1>`+city.list[index].main.feels_like+`°C</h1>
                                        <span>Ressentis</span>
                                    </div>
                                    <div class="col text-center">
                                        <h1>`+city.list[index].main.humidity+`%</h1>
                                        <span>Humidité</span>    
                                    </div>
                                </div>
                                <div class="text-center">
                                    <img src = "src/img/three-small-dots.png" alt ="logo afficher plus" onclick="showHide()" class="img-center">
                                </div>           
                            </div>
                        </div>`
                    }   
                    
                    cardBody.html(cards);  
                    searchForm.trigger("reset");


                    /*
                    + '<img src = "src/img/three-small-dots.png" alt ="logo afficher plus" onclick="showHide()">';


                     document.getElementById("plusDeDetail").innerHTML = "<p>" + "Longitude: " + data['coord']['lon']+"°      Latitude: " + data['coord']['lat'] + "° </p>"
                    + "<p>" + "Vitesse du vent: " + data['wind']['speed'] + "kts    Orientation du vent: " + data['wind']['deg']+'°     Rafales: ' +data['wind']['gust'] + "kts " + "</p>";
                


                    function showHide() {
                        if (document.getElementById("plusDeDetail").style.display == 'none'){
                            document.getElementById("plusDeDetail").style.display = 'flex';
                        }else{
                            document.getElementById("plusDeDetail").style.display = 'none';
                        }
                    }

                    */


                }
            });
        })
    }); 

