/* eslint-disable */
import { io } from 'socket.io-client';
import apiConf from "@/api/api.conf";

class SocketUtil {
    socket;
    constructor() {
      this.socket = io(apiConf.host);
      // Подписка на событие 'connect'
      this.socket.on('connect', () => {
        this.sendToServer()
        console.log("connected")
      });
  
      // Подписка на событие 'disconnect'
      this.socket.on('disconnect', () => {
        sessionStorage.removeItem("token")
        window.location = "/"
      });
      
    }
    
    sendToServer() {
      this.socket.emit("sendToServer", { token: sessionStorage.getItem("token") })
    }
};

export default new SocketUtil()