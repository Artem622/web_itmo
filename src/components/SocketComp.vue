<template>
    <div>
        <p>Socket Status: {{ socketStatus }}</p>
    </div>
</template>

<script>


import socket from "@/api/socket";

export default {
    name: "SocketComp",
    data() {
        return {
            socketStatus: 'Disconnected',
        };
    },
    mounted() {
        // Подписка на событие 'connect'
        socket.on('connect', () => {
            this.sendDataToSocket()
            this.socketStatus = 'Connected';
        });

        // Подписка на событие 'disconnect'
        socket.on('disconnect', () => {
            this.socketStatus = 'Disconnected';
        });
    },
    methods: {
        sendDataToSocket() {
            // Отправка данных на сервер сокетов
            socket.emit('sendToServer', { token: localStorage.getItem('token') })
        },
    }
};
</script>
