const form = document.querySelector('form');
const display = document.getElementById('search-item');

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
            display.textContent = JSON.stringify(data.choices[0].message.content, null, 2); // Displaying the response
        })
        .catch(error => console.log('Error:', error));
};
