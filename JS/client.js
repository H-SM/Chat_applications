// const socket = io({transports: ['websocket', 'polling', 'flashsocket']});
const socket = io("http://localhost:8000", {transports: ['websocket', 'polling', 'flashsocket']});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector(".container")

const name = prompt("Enter your name to Join");
socket.emit('new-user-joined', name);
var audio = new Audio('discord-notification.mp3');
//LISTERNER OVER THE SEND BUTTON
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value= '';
});

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    audio.play();
}


socket.on('user-joined', name =>{
    append(`${name} joined the Chat`,'right')
});

socket.on('receive', data =>{
    append(`${data.name} : ${data.message} `,'left');
});

socket.on('left', name =>{
    append(`${name} left the Chat`,'left');
});


