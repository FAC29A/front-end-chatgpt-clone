const form = document.querySelector('form');


const display             = document.getElementById('search-item');
const previousChatBtn     = document.querySelector(".previous-chat-btn");
const previousChat        = document.querySelector(".previous-chat");
const previousChatTitle   = document.querySelector(".previous-chat-title");
const systemResponseTitle = document.querySelector(".system-response");


let isPreviousChatVisible = true;
let conversation = [];

const API_URL = 'https://api.openai.com/v1/chat/completions';



function getSearchItem(event){
    event.preventDefault(); 

    const APIKEY        = document.getElementById("API-KEY").value;
    const searchContent = document.getElementById('search').value;
    
    addCurrentMessageToConversation("user", searchContent)
   
    const requestOptions = generateRequestOptions(APIKEY);

    getFetch(API_URL, requestOptions);  
    
}


function addCurrentMessageToConversation(roleType, contentType) {
    conversation.push({ role: roleType, content: contentType });
}



function generateRequestOptions(APIKEY) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APIKEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-1106",
            messages: conversation,
            max_tokens: 200
        })
    };
}



async function getFetch(endPoint, requestOptions) {
    fetch(endPoint, requestOptions)
        .then((response) => {
            if (!response.ok) {
                const error = new Error(response.statusText);
                throw error;
            }
            return response.json();
        }).then(async (data) => {
            handleData(data);
        })
        .catch(error => console.log('Error:', error));
};


function handleData(data) {
    const botMessage = data.choices[0].message.content;
    addCurrentMessageToConversation("system", botMessage )
    updateUIMessage(botMessage);
   
}

// Update the UI message for the user
function updateUIMessage(message) {

    if (message) {
        systemResponseTitle.style.display = "block";
        display.textContent = message; 
        getChatHistory(conversation);
    } else {
        systemResponseTitle.style.display = "none";
    }
}


/**
 * Creates a new chat history element and appends it to the chat history container.
 * 
 * @param {string} role - The role of the message (e.g., "user" or "system").
 * @param {string} message - The content of the message.
 */
function createHistoryElement(role, message) {
    const chatHistory = document.querySelector(".previous-chat"); // Chat history container
    const previousMessage = document.createElement("div");        // Create a new div for the message
    const pRoleTag = document.createElement("p");                 // Create a paragraph element for the role
    const pMessageTag = document.createElement("p");              // Create a paragraph element for the message
   
    // Set class names for styling
    pRoleTag.className = "role";
    pMessageTag.className = "content";
    previousMessage.className = "previous-msg";

    // Set text content for role and message
    pRoleTag.textContent = `Role: ${role}`;
    pMessageTag.textContent = message;
   
    // additional styling for system messages based on conversation length
    if (role === "system" && conversation.length % 2 === 0) {
        previousMessage.classList.add("system-right");
    }

    // Append role and message paragraphs to the message container
    previousMessage.appendChild(pRoleTag);
    previousMessage.appendChild(pMessageTag);

    // Append the message container to the chat history
    chatHistory.appendChild(previousMessage);
}


function getChatHistory(conversation) {
    conversation.forEach(chat => {
     createHistoryElement(chat.role, chat.content)
    }    
    
 )
//  conversation = [];
};




function preiousChatButton() {
    previousChatBtn.addEventListener("click", handleButtonClick);
}


function handleButtonClick(event) {

    event.preventDefault()
    
    if (isPreviousChatVisible) {
        previousChat.style.display      = "block";
        previousChatBtn.textContent     = "Close";
        previousChatTitle.style.display = "block";
    } else {
        previousChat.style.display      = "none";
        previousChatBtn.textContent     = "View chat history";
        previousChatTitle.style.display = "none";
    }

    isPreviousChatVisible = !isPreviousChatVisible;
}



preiousChatButton();
form.addEventListener('submit', getSearchItem);