<template>
    <HeaderComp/>
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
                    <button class="cool-btn">Войти</button>
                    <p class="logUp"  @click.prevent='logUp'>Нет аккаунта?</p>
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
            login: null,
            pass: null,
            showPassword: false,
            isDarkTheme: false,
            isLightTheme: false
        }
    },


    methods:{
        logIn(){
            console.log('войти')
        },

        logUp(){
            console.log('зарегистрироваться')
            router.push('/logUp')
        },

        show(){
            this.showPassword = !this.showPassword
        },


        applyTheme() {
            this.isDarkTheme = this.$store.getters.getTheme === 'dark'
            this.isLightTheme = this.$store.getters.getTheme === 'light'
        },
    },
    created() {
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