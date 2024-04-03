'use strict'
const container = document.querySelector(".card-container")
const apiurl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const input = document.querySelector(".input")
const btn = document.querySelector(".btn")
const dictionary = async function(word) {
    try {
        const response = await fetch(apiurl + word)
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const [data] = await response.json()

        const { word: wordName, meanings } = data;

        meanings.forEach(meaning => {
            const { partOfSpeech, definitions } = meaning;
            const card = document.createElement("div");
            card.className = "cardcontainer";

            definitions.forEach(definition => {
                const { definition: meaning, example } = definition;
                const content = `
                    <div class="one">
                        <h3 class="word">${wordName}</h3>
                        <button class="sound"><i class="fa-solid fa-volume-off"></i></button>
                    </div>
                    <div class="two">
                        <p class="meaning">${meaning}</p>
                        <p class="example">${example || 'No example available'}</p>
                    </div>
                `;
                card.innerHTML = content;
                container.appendChild(card);
            });
        });

    } catch (err) {
        console.log('Something went wrong', err);
    }
}


btn.addEventListener("click", function(){
    
const searchword = input.value.trim()
container.innerHTML = ''
if(searchword !== '')
dictionary(searchword)
input.value = ""
})



