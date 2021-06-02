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
    const listItems = list.querySelectorAll(".cidade-section .cidades");
    const listItemsArray = Array.from(listItems); 

    if (listItemsArray.lenght > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";            
        })
    }
    })
