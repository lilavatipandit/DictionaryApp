
  document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('form');
    let resultdiv = document.querySelector('.result');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        getWordInfo(form.elements[0].value);
    });

    const getWordInfo = async (word) => {
       try {
        
    
          resultdiv.innerHTML= " Feching Data....."
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data =  await response.json();
        let definitions =data[0].meanings[0].definitions[0];
        resultdiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p class></p>
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p> <strong>Meaning:</strong>${definitions.definition=== undefined ? " Not found " :
        definitions.definition}</p>
        <p> <strong>Example:</strong>${definitions.example=== undefined ? " Not found " :
        definitions.example}</p>
        <p><strong>Antonyms:</strong></p>
        ` ;
         
        // Fetching Antonyms
         if(definitions.antonyms.length === 0){
         resultdiv.innerHTML +=`<span>Not Found</span>`;
         }
         else{
            for(let  i = 0 ; i <definitions.antonyms.length; i++){
                resultdiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
         }

         //  adding read more 
         resultdiv.innerHTML += `<div><a href ="${data[0].sourceUrls}" target="-blank">Read More<a/></div>`;

        } 
        catch (error) {
          resultdiv.innerHTML =`<p> Sorry the word could not find</p>`
        }

        
        console.log(data);
    }
});
