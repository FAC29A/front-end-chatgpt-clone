const form = document.querySelector('form');
const display = document.getElementById('search-item');
let conversation = [];

function getSearchItem(event){
    event.preventDefault(); 

    const APIKEY = document.getElementById("API-KEY").value;
    const searchContent = document.getElementById('search').value;
    // Add user message to the conversation
    conversation.push({ role: "user", content: searchContent });
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
            messages: conversation,
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
            const botMessage = data.choices[0].message.content;
            conversation.push({ role: "system", content: botMessage });
            display.textContent = botMessage; 
        })
        .catch(error => console.log('Error:', error));
};
