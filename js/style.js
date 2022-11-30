const support = 'Kelly';
const supportAvatarChar = support.charAt(0);
const chatBox = document.getElementById('chatbox');
const typings  = document.getElementsByClassName('typing');
const suggestionBox = document.getElementById('suggestionBox');
const supportAvatar = document.getElementById('support-avatar');
const status = document.getElementById('status');

const loader = '<div class="text-center d-flex justify-content-center align-content-center w-100"><img src="./img/timer.gif" class="img-fluid" width="50" alt="Loading..."></div>';


// supportAvatar.innerText = supportAvatarChar;

var currentMsg = 0;

// var user = localStorage.getItem('user')
// user = JSON.parse(user);

const conversation = [
    {
        message: 'Hi, how are you doing?',
        suggestion: ['Hello! &#128075;','Hi! &#128075;','Hey! &#128075;','What\'s up? &#128077;','Hi there! &#128075;'],
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

    supportAvatar.style.backgroundColor = color;
}


const addTyping = () => {
    var dotsCount = 0;
    var maxDots = 3;
    var div = document.createElement('div');
    div.setAttribute('class','talk-bubble support-chat typing');
    div.style.width = `26%`;
    div.innerHTML = `Typing.`;

    suggestionBox.innerHTML = loader;

    var addDots = setInterval(() => {
        if(dotsCount < maxDots){
            div.innerHTML += `.`;
            
            dotsCount++
        } else {
            dotsCount = 1;
            div.innerHTML = 'Typing.';
            addDots;
        }

    }, 500);

    if(currentMsg < conversation.length ) {
        setTimeout(() => {
            status.innerHTML = '<i>Typing...</i>';
            clearInterval(addDots)
            chatBox.appendChild(div);
            scrollToBottom();        
        }, 2000);
    } else {
        suggestionBox.innerHTML = '';
    }
    
}

const hideTyping = () => {
    
    status.innerHTML = 'Online';
    for (let i = 0; i < typings.length; i++) {
        const typing = typings[i];
        
        typing.remove();
    }
}

const suggest = () => {
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
                status.innerHTML = 'Online';
                suggestionBox.innerHTML = loader;
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
        scrollToBottom();
        suggestionBox.innerHTML = loader;
    }, 3000);
}



(function(){
    const startBtn = document.getElementById('startbtn');
    document.getElementById('useremail').addEventListener('input',(event)=>{
        var email = event.target.value;

        if(email.length >= 3){
            startBtn.removeAttribute('disabled');
        } else {
            startBtn.setAttribute('disabled',true);
        }
    })

    document.getElementById('startform').addEventListener('submit',(event)=>{
        event.preventDefault();
        // var data = this;
        // var btn = document.getElementById('startbtn');
        var data = Object.fromEntries(new FormData(event.target));

        var name = data.name;
        var email = data.email;
        
        localStorage.setItem('user',data);
        startBtn.setAttribute('disabled',true);
        startBtn.innerHTML = 'Starting chat...';
        
        setTimeout(() => {
            document.getElementById('intro').style.display = 'none';                    
            document.getElementById('chat').style.display = 'block';

            setAvatarBackgroundColor();
            addMessage();

            startBtn.innerHTML = 'Start Chat';
            startBtn.removeAttribute('disabled');
        }, 1000);
        
    });

    document.getElementById('back').addEventListener('click',()=>{
        if(confirm('This chat session will be cleared when you go back. Are you sure you want to go back?')){
            document.getElementById('intro').style.display = 'block';                    
            document.getElementById('chat').style.display = 'none';
            setTimeout(() => {
                localStorage.removeItem('user');
                currentMsg = 0;
                chatBox.innerHTML = '';
                suggestionBox.innerHTML = loader;         
            }, 300);
        }
        
    })
})();
