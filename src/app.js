import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const server = app.listen(8080, ()=>console.log("UP! 8080:"));
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.use('/', viewsRouter);

const messages = [];

io.on ('connection', socket => {
    console.log('Client connected');

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages)
    });

    socket.on ('auth', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
});