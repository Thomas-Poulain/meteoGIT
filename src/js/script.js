    $(function(){              

        $(".search-location").on('submit', function(e){
            e.preventDefault();

            var searchForm = $('.search-location');
            var requestData = $('.form-control').val();
            var cityName = $('.city-name p');
            var cardBody = $('.card-body');
            var timeImage = $('.card-img-top');
            var cardInfo = $('.back-card');

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast",
                method: "get",
                data: {q: requestData, appid: "ee07e2bf337034f905cde0bdedae3db8", lang:"fr", units:"metric", cnt:"5"},
                dataType: "json",
                success: function(city){
                    var icon = city.list[0].weather[0].icon;    
                    var iconSrc = "http://openweathermap.org/img/wn/" + icon+ "@2x.png"
                    cityName.text(city.city.name);
                    cardBody.html(`
                        <div class="card-mid row">
                            <div class="col-8 text-center temp">
                                <span>` +city.list[0].main.temp+ `&deg;C</span>
                            </div>
                            <div class="col-4 condition-temp">
                                <p class="condition">`+city.list[0].weather[0].description+`</p>
                                <p class="high">`+city.list[0].main.temp_max+`&deg;C</p>
                                <p class="low">`+city.list[0].main.temp_min+`&deg;C</p>
                            </div>
                        </div>
                    
                        <div class="icon-container card shadow mx-auto">
                            <img src="`+iconSrc+`" alt="" />
                        </div>
                        <div class="card-bottom px-5 py-4 row">
                            <div class="col text-center">
                                <p>`+city.list[0].main.feels_like+`&deg;C</p>
                                <span>Ressentis</span>
                            </div>
                            <div class="col text-center">
                                <p>`+city.list[0].main.humidity+`</p>
                                <span>Humidité</span>
                            </div>
                        </div`
                    );

                    
                    var isDayTime = (iconP) => {
                        if (iconP.search('d') != -1) {
                            return true 
                        } else { 
                            return false 
                        }
                    };
                    

                    if (isDayTime(icon)) {
                        console.log('day');
                        timeImage.attr('src', 'src/img/day_image.svg');
                        cityName.removeClass('text-white');    
                        cityName.addClass('text-black');
                    
                    } else {
                        console.log('night');
                        timeImage.attr('src', 'src/img/night_image.svg');
                        cityName.removeClass('text-black');
                        cityName.addClass('text-white');
                    }
                    
                    searchForm.trigger("reset");
                    $(".card").removeClass('d-none');           
                }
            });
        })
    }); 

