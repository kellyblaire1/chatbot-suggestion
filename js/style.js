const support = 'Kelly';
const supportAvatarChar = support.charAt(0);
const chatBox = document.getElementById('chatbox');
const typings  = document.getElementsByClassName('typing');
const suggestionBox = document.getElementById('suggestionBox');
const supportAvatar = document.getElementById('support-avatar');


supportAvatar.innerText = supportAvatarChar;

var currentMsg = 0;

const conversation = [
    {
        message: 'Hi, how are you doing?',
        suggestion: ['Hello!','Hi!','Hey!','What\'s up?','Hi there!'],
        reply: 'I\'m very happy to talk to you',
    },
    {
        message: 'How are you?',
        suggestion: ["I'm fine. Thanks!","I'm good. Thanks!","I feel happy. Thanks!","All good. Thanks!","Very well. Thank you!"],
        reply: 'Nice',
    },
    {
        message: 'How old are you?',
        suggestion: ["I'm less than 15","I'm more than 15","I'm less than 20","I am more than 20"],
        reply: 'Nice',
    },
];


const supportName = document.querySelectorAll('.support-name');

for (let i = 0; i < supportName.length; i++) {
    const name = supportName[i];

    name.innerHTML = support;
}

const setAvatarBackgroundColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#ABC';
    for (var i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    console.log('color',color)
    supportAvatar.style.backgroundColor = color;
    // supportAvatar.style.display = 'none';
}


const addTyping = () => {
    var dotsCount = 0;
    var maxDots = 3;
    var div = document.createElement('div');
    div.setAttribute('class','talk-bubble support-chat typing');
    div.style.width = `26%`;
    div.innerHTML = `Typing.`;

    var addDots = setInterval(() => {
        if(dotsCount < maxDots){
            div.innerHTML += `.`;
            
            dotsCount++
        } else {
            dotsCount = 1;
            div.innerHTML = 'Typing.';
            addDots;
        }

    }, 2000);

    if(currentMsg < conversation.length ) {
        setTimeout(() => {
            chatBox.appendChild(div);
            scrollToBottom();        
        }, 2000);
    }    
    
}

const hideTyping = () => {
    for (let i = 0; i < typings.length; i++) {
        const typing = typings[i];
        
        typing.remove();
        // setTimeout(() => {
        // }, 3000);
    }
}

const suggest = () => {
    console.log('cm',currentMsg)
    var suggestion = conversation[currentMsg].suggestion;

    suggestionBox.innerHTML = '';
    
    for (let i = 0; i < suggestion.length; i++) {
        const suggest = suggestion[i];
        var elm = document.createElement('div');
        elm.setAttribute('class','suggestion');
        elm.setAttribute('data-response',suggest);
        
        elm.innerHTML = suggest;        
        suggestionBox.appendChild(elm);
    }
}

const scrollToBottom = () => {
    setTimeout(() => {
        var objDiv = document.getElementById('chatbox');
        objDiv.scrollTop = objDiv.scrollHeight
    }, 10)
}

//activate response
const activateResponse = () => {       
    var suggestions = document.getElementsByClassName('suggestion');

    for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i];
        
        suggestion.addEventListener('click',()=>{
            var message = suggestion.getAttribute('data-response');            
            
            var response = document.createElement('div');
            response.setAttribute('class','talk-bubble user-chat');
            response.innerHTML = message;
            scrollToBottom();
            if(chatBox.appendChild(response)) {
                scrollToBottom();
                addReply();
            }
        });
    }
}

const addMessage = () => {
    addTyping();
    
    var elm = document.createElement('div');
    elm.setAttribute('class','talk-bubble support-chat');
    elm.innerHTML = conversation[currentMsg].message;

    setTimeout(() => {
        chatBox.appendChild(elm);
        hideTyping();   
        suggest();
        activateResponse();
        scrollToBottom();
    }, 3000);
}

const addReply = () => {
    addTyping();
    
    var elm = document.createElement('div');
    elm.setAttribute('class','talk-bubble support-chat');
    elm.innerHTML = conversation[currentMsg].reply;

    setTimeout(() => {        
        chatBox.appendChild(elm);
        hideTyping();
        currentMsg++;
        addMessage();
        console.log(currentMsg)
        scrollToBottom();
        suggestionBox.innerHTML = '';
    }, 3000);
}



(function(){

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

            setAvatarBackgroundColor();
            addMessage();

            document.getElementById('startbtn').innerHTML = 'Start Chat';
            btn.removeAttribute('disabled');
        }, 1000);
        
    });

    document.getElementById('back').addEventListener('click',()=>{
        if(confirm('This chat session will be cleared when you go back. Are you sure you want to go back?')){
            document.getElementById('intro').style.display = 'block';                    
            document.getElementById('chat').style.display = 'none';
            setTimeout(() => {
                localStorage.removeItem('data');
                currentMsg = 0;
                chatBox.innerHTML = '';
                suggestionBox.innerHTML = '';         
            }, 300);
        }
        
    })
})();
