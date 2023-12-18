<template>
    <HeaderComp/>
    <PopupComp :is-visible="isPopupVisible" :popup-text="popupText" @closed="clearPopupText"></PopupComp>
    <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': isLightTheme }">
        <div class="container">
            <div class="form">
                <div class="input-wrapper">
                    <div class="inputs_block">
                        <div class="block">
                            <label class="label">Login</label>
                            <input class="input-text" type="text" v-model="login">
                        </div>
                        <div class="block">
                            <label class="label">Password</label>
                            <div class="wrap-pass">
                                <div class="input-form-wrapper">
                                    <input class="input-pass" :type="showPassword ? 'text' : 'password'" v-model="pass">
                                    <img src="@/assets/icons8-eyes-30.png" class="eye-icon" @click='show'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="cool-btn" @click="logIn">Войти</button>
                    <p class="logUp"  @click.prevent='logUp'>Нет аккаунта?</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import router from "@/router";
// import {createModel} from "@/api/createModel";
import axios from "axios";
import PopupComp from "@/components/Popup.vue";
import apiConf from "@/api/api.conf";

export default {
    name: 'LoginView',
    components: {
        PopupComp,
        HeaderComp
    },
    data() {
        return {
            login: null,
            pass: null,
            showPassword: false,
            isDarkTheme: false,
            isLightTheme: false,
            isPopupVisible: false,
            popupText: ''
        }
    },


    methods:{
        logIn(){
            const url = `${apiConf.host}/login`
            const data = {
                login: this.login,
                password: this.pass
            }

            if (this.login != null && this.pass != null) {
                try {
                    axios.post(url, data).then(response => {
                        localStorage.setItem('token', response.data)
                        this.$store.commit('setToken', localStorage.getItem('token'))
                        // Обработка успешного выполнения запроса
                        console.log('Успешный ответ от сервера:', response.data);
                        router.push('/main');
                        this.getAndSetToken()

                    }).catch(error => {

                        // Обработка ошибок при выполнении запроса
                        if (error.response) {
                            // Запрос выполнен, но сервер вернул код ошибки
                            console.error('Ошибка от сервера:', error.response.status, error.response.data);

                            if (error.response.status === 404) {
                                // Обработка ошибки 404
                                this.openPopupSomebody()
                                console.error('Страница не найдена');
                            } else if (error.response.status === 500) {

                                this.openPopupNotApproved()
                                console.error('Внутренняя ошибка сервера');
                            }
                        } else if (error.request) {
                            // Запрос был сделан, но нет ответа
                            this.openPopupSomebody()
                            console.error('Запрос не получил ответ');

                        } else {
                            // Ошибка при настройке запроса
                            this.openPopupSomebody()
                            console.error('Ошибка настройки запроса:', error.message);
                        }
                    });
                } catch (error) {
                    // Обработка ошибок, которые не связаны с выполнением запроса
                    console.error('Произошла неожиданная ошибка:', error);
                    this.openPopupSomebody()
                }
            } else {
                this.openPopup();
            }
        },

        logUp(){
            console.log('зарегистрироваться')
            router.push('/logUp')
        },

        openPopup() {
            this.popupText = 'Поля не могут быть пустыми';
            this.isPopupVisible = true;
        },

        openPopupNotApproved(){
            this.popupText = 'Неверное имя пользователя или пароль';
            this.isPopupVisible = true;
        },

        openPopupSomebody(){
            this.popupText = 'Что-то пошло не так, попробуйте снова';
            this.isPopupVisible = true;
        },

        clearPopupText() {
            this.isPopupVisible = false;
        },

        show(){
            this.showPassword = !this.showPassword
        },

        applyTheme() {
            this.isDarkTheme = this.$store.getters.getTheme === 'dark'
            this.isLightTheme = this.$store.getters.getTheme === 'light'
        },

        getAndSetToken(){
            let token = localStorage.getItem('token')
            console.log(token)
        },
        checkToken(){
            if(localStorage.getItem('token') != null){
                router.push('/main')
            }
        }
    },
    created() {
        this.checkToken()
        this.$store.subscribe(() => {
            this.applyTheme()
        }, "setTheme")
        this.applyTheme()
    }
}
</script>


<style scoped>
/* Стили для светлой темы */
.light-theme {
    *{
        padding: 0;
        margin: 0;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: -webkit-linear-gradient(44deg, #00f900, #4e35bc,#00bd00);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #00f900, #4e35bc,#00bd00);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50vw;
        height: 50vh;
        background-color: #1fc00d;
        border-radius: 16px;
        min-width: 300px;
        box-shadow: rgba(255, 55, 166, 0.45) 0 20px 50px 10px;
        border: 2px solid #e13092;
    }

    .inputs_block {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .input-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wrap-pass {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }

    .block{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .label{
        font-family: monospace;
        color: #000000;
        font-size: 2.5vh;
        margin-bottom: .3rem;
        text-align: center;
        width: 100%;
        font-weight: 600;
    }

    .input-text{
        min-width: 150px;
        width: 20vw;
        height: 3vh;
        border-radius: 10px;
        border: none;
        font-family: monospace;
        font-size: 2vh;
        text-align: center;
        padding: .3vw;
    }

    .input-pass{
        min-width: 150px;
        width: 20vw;
        height: 3vh;
        border-radius: 10px;
        border: none;
        font-family: monospace;
        font-size: 2vh;
        padding: .3vw;
        text-align: center;
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
    .eye-icon {
        position: absolute;
        left: auto;
        width: 20px;
        padding-right: 0.5rem;
        cursor: pointer;
    }
    .input-form-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .logUp{
        cursor: pointer;
        font-family: monospace;
        font-size: 2vh;
        color: #000000;
        margin-bottom: 1rem;
    }

    .img{
        min-width: 30px;
        width: 10%;
        height: auto;
    }


}
/* Стили для темной темы */
.dark-theme {
    *{
        padding: 0;
        margin: 0;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: -webkit-linear-gradient(44deg, #690791, #837411, #510569);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #690791, #837411, #510569);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50vw;
        height: 50vh;
        background-color: #460b79;
        border-radius: 16px;
        min-width: 300px;
        box-shadow: rgba(255, 213, 0, 0.2) 0 20px 50px 10px;
        border: 2px solid #ffd500;
    }

    .inputs_block {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .input-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wrap-pass {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }

    .block{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .label{
        font-family: monospace;
        color: #e5e5e5;
        font-size: 2.5vh;
        margin-bottom: .3rem;
        text-align: center;
        width: 100%;
        font-weight: 600;
    }

    .input-text{
        min-width: 150px;
        width: 20vw;
        height: 3vh;
        border-radius: 10px;
        border: none;
        font-family: monospace;
        font-size: 2vh;
        text-align: center;
        padding: .3vw;
    }

    .input-pass{
        min-width: 150px;
        width: 20vw;
        height: 3vh;
        border-radius: 10px;
        border: none;
        font-family: monospace;
        font-size: 2vh;
        padding: .3vw;
        text-align: center;
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
    .eye-icon {
        position: absolute;
        left: auto;
        width: 20px;
        padding-right: 0.5rem;
        cursor: pointer;
    }
    .input-form-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
    .logUp{
        cursor: pointer;
        font-family: monospace;
        font-size: 2vh;
        color: #ffd500;
        margin-bottom: 1rem;
    }

    .img{
        min-width: 30px;
        width: 10%;
        height: auto;
    }

}
</style>