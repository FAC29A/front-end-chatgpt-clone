const form = document.querySelector('form');
const APIKEY = document.getElementById('API-KEY').textContent;
const searchContent = document.getElementById('search').textContent;
const display = document.getElementById('search-item');

function getSearchItem(){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APIKEY}` 
        },
        body: JSON.stringify({
            prompt: searchContent, 
            model: 'gpt-3.5-turbo-1106', 
            max_tokens: 50
        })
    };

    getFetch(`https://api.openai.com/v1/engines/gpt-3.5-turbo-1106/completions/${requestOptions}`); 
}


form.addEventListener('click', getSearchItem);


function getFetch(endPoint, requestOptions) {
    
    fetch(endPoint, requestOptions)
        .then((response) => {
            if (!response.ok) {
                const error = new Error(response.status);
                throw error;
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            // display.textContent = data;
        })
        .catch(error => console.log(error)) 
};