function clearDOM(elem) {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
}

function createElement(htmlString) {
    let template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}

const form = document.querySelector(".top-banner form");

const apiKey = "509d70ea7b21004fe0d04e24b640b033" //change this with your api key, get it at https://home.openweathermap.org/users/sign_up

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputVal = document.querySelector("input").value;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`);
    let data = await response.json();
    document.querySelector("input").value = ""
    console.log(data)

    let cities = document.querySelector('#cities');

    if (cities.lastElementChild.childElementCount < 3) {
        cities.lastElementChild.appendChild(createElement(
            `<div class="col-3 city m-3">
                <div class="name">
                    ${data.name}, ${data.sys.country}
                </div>
                <div class="temp">
                    ${data.main.temp}°C
                </div>
                <div class="weather">
                    ${data.weather[0].main}
                </div>
            </div>`
        ))
    } else {
        cities.appendChild(createElement(
            `<div class="row d-flex justify-content-center">
                <div class="col-3 city m-3">
                    <div class="name">
                        ${data.name}, ${data.sys.country}
                    </div>
                    <div class="temp">
                        ${data.main.temp}°C
                    </div>
                    <div class="weather">
                        ${data.weather[0].main}
                    </div>
                </div>
             </div>`
        ))
    }
});