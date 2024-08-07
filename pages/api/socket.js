import { Server } from 'socket.io';

export default function handler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        return res.socket.server.io = io;
    }
    return res.end();
}
