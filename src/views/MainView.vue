<template>
    <HeaderComp/>
    <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': isLightTheme }">
        <div class="wrap">
            <div class="content">
                <div class="clock">
                    <p class="text">текущая дата и время</p>
                    <p class="text">{{ currentDateTime }}</p>
                </div>
                <div class="button-container">
                    <button class="cool-btn" @click="showGraph">Перейти к графику</button>
                    <button class="cool-btn" @click="logOut">Выйти</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import router from "@/router";
export default {
    name: 'LoginView',
    components: {
        HeaderComp
    },
    data() {
        return {
            currentDateTime: new Date().toLocaleString(),
            isDarkTheme: false,
            isLightTheme: false
        };
    },

    mounted() {
        setInterval(() => {
            this.currentDateTime = new Date().toLocaleString();
            this.checkToken()
        }, 1000);
        setInterval(() => {
            this.checkToken()
        }, 1);
    },

    methods:{
        showGraph(){
            console.log("show graph")
            router.push('/graph')
        },

        logOut(){
            localStorage.removeItem('token')
            router.push('/')
        },

        applyTheme() {
            this.isDarkTheme = this.$store.getters.getTheme === 'dark'
            this.isLightTheme = this.$store.getters.getTheme === 'light'
        },

        checkToken() {
            // Проверка наличия токена в локальном хранилище
            const authToken = localStorage.getItem('token');

            if (!authToken) {
                // Вызов метода при отсутствии токена
                this.logOut()
            }
        }
    },

    created() {
        this.$store.subscribe(() => {
            this.applyTheme()
        }, "setTheme")
        this.applyTheme()
    },

}
</script>

<style scoped>

/* Стили для светлой темы */
.light-theme {
    .wrap{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: -webkit-linear-gradient(44deg, #00f900, #4e35bc,#00bd00);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #00f900, #4e35bc,#00bd00);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: #1fc00d;
        width: 60vw;
        height: 60vh;
        border-radius: 16px;
        min-width: 300px;
        box-shadow: rgba(255, 55, 166, 0.45) 0 20px 50px 10px;
        border: 2px solid #e13092;
    }

    .button-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .cool-btn{
        min-width: 150px;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: #e13092;
        font-family: monospace;
        font-size: 2vh;
        color: black;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        cursor: pointer;
        padding: 0.5rem;
        transform: scale(1);
        transition: all .15s ease-in-out;
        border: none;
    }

    .cool-btn:hover{
        transform: scale(1.1);
    }

    .clock{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .text{
        font-family: monospace;
        color: black;
        font-size: 2em;
        font-weight: 600;
    }
}

/* Стили для темной темы */
.dark-theme {
    .wrap{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: -webkit-linear-gradient(44deg, #690791, #837411, #510569);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #690791, #837411, #510569);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 60vw;
        height: 60vh;
        background-color: #460b79;
        border-radius: 16px;
        min-width: 300px;
        box-shadow: rgba(255, 213, 0, 0.2) 0 20px 50px 10px;
        border: 2px solid #ffd500;
    }

    .button-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .cool-btn{
        min-width: 150px;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: #ffd500;
        font-family: monospace;
        font-size: 2vh;
        color: black;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        cursor: pointer;
        padding: 0.5rem;
        transform: scale(1);
        transition: all .15s ease-in-out;
        border: none;
    }

    .cool-btn:hover{
        transform: scale(1.1);
    }

    .clock{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .text{
        font-family: monospace;
        color: #ffffff;
        font-size: 2em;
        font-weight: 600;
    }
}
</style>