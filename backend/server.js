import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, '../frontend/dist');

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const ROOM = 'group';

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('joinRoom', async (userName) => {
        console.log(`${userName} is joining the group.`);

        await socket.join(ROOM);

        // broadcast(send msg to everyone except itself)
        socket.to(ROOM).emit('roomNotice', userName);
    });

    socket.on('chatMessage', (msg) => {
        socket.to(ROOM).emit('chatMessage', msg);
    });

    socket.on('typing', (userName) => {
        socket.to(ROOM).emit('typing', userName);
    });

    socket.on('stopTyping', (userName) => {
        socket.to(ROOM).emit('stopTyping', userName);
    });
});

// Serve frontend static build
app.use(express.static(frontendDist));

// SPA fallback for GET requests (excluding socket.io)
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/socket.io')) {
        return res.sendFile(path.join(frontendDist, 'index.html'));
    }
    next();
});

const PORT = process.env.PORT || 4600;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

