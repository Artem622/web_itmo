import { io } from 'socket.io-client';
import apiConf from "@/api/api.conf";

// URL, по которому запущен ваш сервер Socket.IO
const socket = io(apiConf.host);

export default socket;