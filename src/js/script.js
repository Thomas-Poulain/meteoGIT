    $(function(){              

        $(".valide").on('submit', function(e){
            e.preventDefault();

            var searchForm = $('.search-location');
            var requestData = $('#searchCity').val();
            var cityName = $('.city-name p');
            var cardBody = $('.cardList');
            var cards = "";
            var fontCol = "";
            var srcImg = "";
            const date = new Date();
            var nbDays = ($('#numberDay').val()-1)*8;
            nbDays =(parseInt(nbDays) + (23 - date.getHours())%3);
            

            
            console.log("test" + nbDays)
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast",
                method: "get",
                data: {q: requestData, appid: "ee07e2bf337034f905cde0bdedae3db8", lang:"fr", units:"metric", cnt:nbDays},
                dataType: "json",
                success: function(city){
                    console.log(nbDays)
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
                            srcImg = 'src/img/day_image.svg';    
                            fontCol = 'text-black';
                        
                        } else {
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
                                    <div class="col-6 condition-temp text-center">
                                        <h5 class="condition">`+city.list[index].weather[0].description+`</h5>
                                        <h5 class="high">max `+city.list[index].main.temp_max+`°C</h5>
                                        <h5 class="low">min `+city.list[index].main.temp_min+`°C</h5>
                                    </div>
                                </div>
                            
                                <div class="icon-container card shadow mx-auto">
                                    <img src="`+iconSrc+`" alt="" />
                                </div>
                                <div class="card-bottom px-8 py-4 row">
                                    <div class="col text-center">
                                        <h1>`+city.list[index].main.feels_like+`°C</h1>
                                        <h5>Ressentis</h5>
                                    </div>
                                    <div class="col text-center">
                                        <h1>`+city.list[index].main.humidity+`%</h1>
                                        <h5>Humidité</h5>    
                                    </div>
                                </div>
                                <div class="text-center">
                                    <img src = "src/img/three-small-dots.png" alt ="logo afficher plus" onclick="showHide()" class="dots img-center">
                                </div>
                                <br>
                                <div class="plusDeDetail">
                                    <div class="ligne1">
                                        <div class="col text-center">
                                            <h3>`+city.city.coord.lon+`°</h3>
                                            <span>Longitude</span>
                                        </div>
                                        <div class="col text-center">
                                            <h3>`+city.city.coord.lat+`°</h3>
                                            <span>Latitude</span>    
                                        </div>
                                    </div>
                                    <div class="ligne2">
                                        <div class="col text-center">
                                            <h3>`+city.list[index].wind.speed+`kts</h3>
                                            <span>Vitesse du vent</span>
                                        </div>
                                        <div class="col text-center">
                                            <h3>`+city.list[index].wind.deg+`°</h3>
                                            <span>Orientation du vent</span>    
                                        </div>
                                        <div class="col text-center">
                                            <h3>`+city.list[index].wind.gust+`kts</h3>
                                            <span>Rafales</span>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    }   
                    
                    cardBody.html(cards);  
                    searchForm.trigger("reset");

                }
            });
        })
    }); 

    function showHide() {
        if ($('.plusDeDetail').css("display") == "none"){
            $('.plusDeDetail').css("display", "flex");
        }else{
            $('.plusDeDetail').css("display", "none");
        }
    }

