var support = 'Riadh';
const chatBox = document.getElementById('chatbox');
const typing  = document.getElementById('typing');

const chats = [];

const initialSuggestions = ['Call Customer Care','Purchase Product','Make Enquiry','Report a Case','Send Us an Email'];

var suggest = document.getElementById('suggestionBox');

for (let i = 0; i < initialSuggestions.length; i++) {
    const sugg = initialSuggestions[i];

    suggest.innerHTML += `<div class="suggestion">${sugg}</div>`;
}

const suggestionArray = [
    {
        suggest: 'Call Customer Care',
        action: '<a href="tel:+123456798">Call +123546789</a> to reach our Customer Care line',
        showInput: false,
    },
    {
        suggest: 'Purchase Product',
        action: 
        `<ol>
            <li>Buy Product 1</li>
            <li>Buy Product 2</li>
            <li>Buy Product 3</li>
            <li>Buy Product 4</li>
            <li>Buy Product 5</li>
        </ol>`,
        showInput: false,
    },
    {
        suggest: 'Make Enquiry',
        action: 'To make enquiries, contact us via email at mail@domain.com',
        showInput: false,
    },
    {
        suggest: 'Report a Case',
        action: 'To report a case, call the police',
        showInput: false,
    },
    {
        suggest: 'Send Us an Email',
        action: '<a href="mailto:mail@domain.com">Click to send us an email</a>',
        showInput: false,
    },
];


const supportName = document.querySelectorAll('.support-name');

for (let i = 0; i < supportName.length; i++) {
    const name = supportName[i];

    name.innerHTML = support;
}


const suggestionAction = (reply) => {
    suggestionArray.filter((index) => {
        if(index.suggest==reply){
            var response = document.createElement('div');
            response.setAttribute('class','talk-bubble support-chat');
            response.innerHTML = index.action;

            chatBox.appendChild(response);
            // chats.push(response)
        }
    })
}


const download = () => {

    document.getElementById('download').addEventListener('click',()=>{
      // Create text document — only saves 1st link in text doc
      var textDoc = document.createElement('a');

      console.log(chats)

      // textDoc.href = 'data:attachment/text,' + encodeURI(linksArray.join('\n'));
      textDoc.href = 'data:attachment/text,' + encodeURI(chats.toString());
      textDoc.target = '_blank';
      textDoc.download = 'chats.txt';
      textDoc.click();
    })

}

// CREATE SUGGESTION ELEMENT
var createSuggestion = (chatBox,suggestionArr) => {
    if(chatBox && (typeof chatBox.appendChild !== undefined)) {

        var suggestionContainer = document.createElement('div');
        suggestionContainer.setAttribute('class', 'suggestion-container' );

        for (let i = 0, suggest = suggestionArr; i < suggest.length; i++) {                    
            var suggestion = suggest[i];
            
            var suggestionBadge = document.createElement('div');
            suggestionBadge.setAttribute('class', 'suggestion' );
            suggestionBadge.setAttribute('data-response', suggestion );
            // createResponse();                  
            
            suggestionBadge.innerHTML = suggestion;
            suggestionContainer.appendChild(suggestionBadge);
        }
        
        chatBox.appendChild(suggestionContainer);
    }
};        

//load chats created
const loadChats = () => {

    for (let i = 0; i < chats.length; i++) {
        const chat = chats[i];

        if(chat.type==='support'){
            if(chat.container==='bubble'){
                chatBox.innerHTML += `<div class="talk-bubble support-chat">${chat.response}</div>`;
            } 
            if(chat.container==='suggestion') {
                createSuggestion(chatBox,chat.suggestions);
            }
        } else {
            document.getElementById('chatbox').innerHTML += `<div class="talk-bubble user-chat">${chat.response}</div>`;
        }
        
    }
}

//activated response
const activateResponse = () => {       
    var suggestions = document.querySelectorAll('.suggestion');

    for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i];
        
        suggestion.addEventListener('click',()=>{
            var message = suggestion.getAttribute('data-response');            
            
            var response = document.createElement('div');
            response.setAttribute('class','talk-bubble user-chat');
            response.innerHTML = message;
            scrollToBottom();
            if(chatBox.appendChild(response)) {
                setTimeout(() => {
                        typing.style.display = 'block';
                    setTimeout(() => {
                        typing.style.display = 'none';
                        suggestionAction(message);
                        scrollToBottom();
                    }, 1500);
                }, 800);                
            }
        });
    }
}

const scrollToBottom = () => {
    // var objDiv = document.getElementById("your_div");
    // objDiv.scrollTop = objDiv.scrollHeight;
    setTimeout(() => {
        var objDiv = document.getElementById('chatbox');
        objDiv.scrollTop = objDiv.scrollHeight
    }, 10)
}


(function(){
    download();
    
    document.getElementById('startform').addEventListener('submit',(event)=>{
        event.preventDefault();
        // var data = this;
        var btn = document.getElementById('startbtn');
        var data = Object.fromEntries(new FormData(event.target));

        var name = data.name;
        var email = data.email;
        
        localStorage.setItem('data',data);
        btn.setAttribute('disabled',true);
        btn.innerHTML = 'Starting chat...';
        
        setTimeout(() => {
            document.getElementById('intro').style.display = 'none';                    
            document.getElementById('chat').style.display = 'block';

            chats.push({ type: 'support', container:'bubble', response: `Hi, ${name}! What would you like to do?`});
            chats.push({ type: 'support', container:'suggestion', suggestions: initialSuggestions });
            scrollToBottom();

            loadChats();

            activateResponse();

            document.getElementById('startbtn').innerHTML = 'Start Chat';
            btn.removeAttribute('disabled');
        }, 500);
        
    });
    
})();
