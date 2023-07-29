const socket = io();

// Swal.fire({
//     title: 'Saludos',
//     text: 'Mensaje inicial',
//     icon: 'success'
// });

let user;
const chatbox = document.getElementById('chatBox');

// Swal.fire({
//     title: 'Welcome retro chater! 👾 ',
//     input: 'text',
//     inputPlaceholder: "Enter you name...",
//     inputValidator: (value)=>{
//         return !(value) && "Field required"
//     },
//     allowOutsideClick: false,
//     allowEscapeKey: false,
//     toast: true
// }).then (res =>{
//     user= res.value;
//     socket.emit('auth', user);
// });

chatbox.addEventListener( 'keyup', event => {
    if( event.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user, message: chatbox.value});
            chatbox.value = '';
        }
    }
});

const button = document.getElementById('send');
button.addEventListener('click', () => {
    if (chatbox.value.trim().length > 0) {
        socket.emit('message', { user, message: chatbox.value });
        chatbox.value = '';
    }
});

socket.on('messageLogs', data => {
    let log = document.getElementById ('messageLogs');
    let messages = '';
    data.forEach (message => {
        messages +=  `👾 ${message.user} : ${message.message}<br/>`
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

