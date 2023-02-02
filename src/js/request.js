const key = 'ee07e2bf337034f905cde0bdedae3db8';

// const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=vannes&appid=ee07e2bf337034f905cde0bdedae3db8';

const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/forecast'
    const query = `?q=${city}&appid=${key}&lang=fr&units=metric&cnt=5`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;

}
