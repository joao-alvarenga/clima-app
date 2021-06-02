const form = document.querySelector(".wrapper form");
const input = document.querySelector(".wrapper input");
const msg = document.querySelector(".wrapper .msg");
const list = document.querySelector(".cidade-section .cidades");
/* API Key Provedor do API https://openweathermap.org/ */
const apiKey = "f6dcd8282da08edcc2032d01e33e35c1";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    // consultar se já tem uma cidade
    const listItems = list.querySelectorAll(".cidade-section .city");
    const listItemsArray = Array.from(listItems); 

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            
            if (inputVal.includes(",")) {

                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                    .querySelector(".cidade-nome span")
                    .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".cidade-nome").dataset.name.toLowerCase(); 
                }
            } else { 
                content = el.querySelector(".cidade-nome span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
        
        if (filteredArray.length > 0) {
            msg.textContent = `Você já sabe a previsão para ${
                filteredArray[0].querySelector(".cidade-nome span").textContent
              }, ou então seja mais específico colacando o codigo do país também.`;
              form.reset();
              input.focus();
              return;
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())         
    .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            weather[0]["icon"]
        }.svg`; 

        const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="cidade-nome" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="cidade-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="cidade-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "Por favor coloque uma cidade valida";
      });
        
     msg.textContent = "";
     form.reset();
     input.focus();
    });
