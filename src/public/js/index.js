const socket = io();

Swal.fire({
    title: 'Saludos',
    text: 'Mensaje inicial',
    icon: 'success'
});

let user;
const chatbox = document.getElementById('chatBox');

Swal.fire({
    title: 'Log In',
    input: 'text',
    text: 'Enter your name',
    inputValidator: (value)=>{
        return !(value) && "Field required"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then (res =>{
    user= res.value;
    socket.emit('auth', user);
});

chatbox.addEventListener( 'keyup', event => {
    if( event.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user, message: chatbox.value});
            chatbox.value = '';
        }
    }
});

socket.on('messageLogs', data => {
    let log = document.getElementById ('messageLogs');
    let messages = '';
    data.forEach (message => {
        messages +=  `${message.user} says: ${message.message}<br/>`
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} joins the chat`,
        icon: 'success'
    });
});