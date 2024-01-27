const form = document.querySelector('form');
const display = document.getElementById('search-item');
//const submit = document.getElementById('submit');

function getSearchItem(event){
    event.preventDefault(); 

    const APIKEY = document.getElementById("API-KEY").value;
    const searchContent = document.getElementById('search').value;

    console.log(APIKEY);
    console.log(searchContent);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APIKEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-1106",
            messages: [{"role": "user", "content" : searchContent}], 
            max_tokens: 50
        })
    };
    
    getFetch('https://api.openai.com/v1/chat/completions', requestOptions);  
}

form.addEventListener('submit', getSearchItem);

function getFetch(endPoint, requestOptions) {
    fetch(endPoint, requestOptions)
        .then((response) => {
            if (!response.ok) {
                const error = new Error(response.statusText);
                throw error;
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            display.textContent = JSON.stringify(data, null, 2); // Displaying the response
        })
        .catch(error => console.log('Error:', error));
};
// const APIKEY = document.getElementById('API-KEY').value;
// const APIKEY = "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"
// const model = "gpt-3.5-turbo-1106"; // Replace with your desired model, e.g., 'davinci', 'curie', etc.
// const openAiEndpoint = `https://api.openai.com/v1/engines/${model}/completions`;

// const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${APIKEY}` // Replace with your actual API key
//     },
//     body: JSON.stringify({
//         prompt: "Your prompt here",
//         max_tokens: 50
//         // ... other parameters as needed
//     })
// };

// fetch(openAiEndpoint, requestOptions)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
