<template>
    <HeaderComp/>
    <PopupComp :is-visible="isPopupVisible" :popup-text="popupText" @closed="clearPopupText"></PopupComp>
    <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': isLightTheme }">
            <div class="container">
                <GraphComp ref="GraphComp"/>
                <div class="controllers">
                    <div class="input-x">
                        <label class="text" for="dropdownX">Выберите значение x:</label>
                        <select id="dropdownX" v-model="selectedValueX">
                            <option class="text" v-for="value in dropdownValuesX" :key="value" :value="value">{{ value }}</option>
                        </select>
                    </div>
                    <div class="input-y">
                        <p class="text">Выберите значение y:</p>
                        <input class="inp" @change="changeY" v-model="expression">
                    </div>
                    <div class="input-r">
                        <label class="text" for="dropdownR">Выберите значение r:</label>
                        <select  id="dropdownR" v-model="selectedValueR" @change="changeR" >
                            <option v-for="value in dropdownValuesR" :key="value" :value="value">{{ value }}</option>
                        </select>
                    </div>
                    <div class="button-control">
                        <button class="cool-btn" @click="check">Проверить</button>
                        <button class="cool-btn" @click="toMain">На главную</button>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th class="table-head">X</th>
                            <th class="table-head">Y</th>
                            <th class="table-head">R</th>
                            <th class="table-head">Результат</th>
                            <th class="table-head">Время</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="table-row" v-for="(item, index) in tableData" :key="index">
                            <td class="table-d">{{ item.x }}</td>
                            <td class="table-d">{{ item.y }}</td>
                            <td class="table-d">{{ item.r }}</td>
                            <td class="table-d">{{ item.isHit }}</td>
                            <td class="table-d">{{ item.date }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import GraphComp from "@/components/GraphComp.vue";
import router from "@/router";
import PopupComp from "@/components/Popup.vue";
import apiConf from "@/api/api.conf";
import axios from "axios";


export default {
    name: 'LoginView',
    components: {
        PopupComp,
        HeaderComp,
        GraphComp
    },
    data(){
        return{
            dropdownValuesX: ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'],
            selectedValueX: 2,
            dropdownValuesR: ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'],
            selectedValueR: 2,
            selectedValueY: 2,
            expression: 2,
            isPopupVisible: false,
            popupText: '',
            isDarkTheme: false,
            isLightTheme: false,
            tableData: [

            ]
        }
    },
    methods:{
        toMain(){
            console.log('на главную')
            router.push('/main')
            this.openPopup()
        },


        applyTheme() {
            this.isDarkTheme = this.$store.getters.getTheme === 'dark'
            this.isLightTheme = this.$store.getters.getTheme === 'light'
        },

        changeR(){
            this.$store.commit("setRadius", this.selectedValueR)
            this.$refs.GraphComp.drawGraph()
            console.log(this.selectedValueR)
            this.getDotsFromBack().then(()=>{
                this.tableData = this.$store.getters.getDots
                console.log(this.$store.getters.getDots)
                console.log(this.tableData)
            })
        },

        check(){

            if(-3 <= this.selectedValueY && this.selectedValueY <= 3){
                console.log(this.selectedValueY)
                this.$store.commit("setX", this.selectedValueX)
                this.$store.commit("setY",  this.selectedValueY)
                console.log(this.$store.getters.getX, this.$store.getters.getY)
                this.$refs.GraphComp.drawPointFromForm()
            }else {
                this.openPopup()
                this.expression = null
            }

        },

        isValidExpression() {
            const validExpressionRegex = /^[\d+\-*/().]|Math\.[a-z]+\([^\\)]*\)|[+\-*/]$/;
            console.log('норм')
            console.log( validExpressionRegex.test(this.expression))
            return validExpressionRegex.test(this.expression);
        },


        openPopup() {
            this.popupText = 'Значение Y должно быть от -3 до 3';
            this.isPopupVisible = true;
        },

        openPopupMath() {
            this.popupText = 'Не надо вводить некорректные математические выражения';
            this.isPopupVisible = true;
        },

        clearPopupText() {
            this.isPopupVisible = false;
        },

        changeY(){
            this.expression = this.expression.replace(/(\d+),(\d+)(?![^\\(]*\))/g, '$1.$2')
            console.log(this.selectedValueY)
            if (this.isValidExpression()){
                try {
                    eval(this.expression)
                    this.selectedValueY = eval(this.expression)
                    console.log(this.selectedValueY)
                } catch (er){
                    console.log(er)
                    this.expression = null
                }
            }else{
                this.openPopupMath()
                this.expression = null
            }
        },

        logOut(){
            localStorage.removeItem('token')
            router.push('/')
        },

        checkToken() {
            // Проверка наличия токена в локальном хранилище
            const authToken = localStorage.getItem('token');

            if (!authToken) {
                // Вызов метода при отсутствии токена
                this.logOut()
            }
        },

        // async setUserId(){
        //     const url = `${apiConf.host}/find`
        //     const data = {
        //         token: localStorage.getItem('token')
        //     }
        //     try {
        //         axios.post(url, data).then(response => {
        //                     // Обработка успешного выполнения запроса
        //                     console.log('Успешный ответ от сервера:', response.data);
        //                     this.$store.commit('setUserId', response.data)
        //                 })
        //                 .catch(error => {
        //                     // Обработка ошибки
        //                     console.error('Ошибка при выполнении запроса:', error);
        //
        //                 });
        //     } catch (error) {
        //         // Обработка ошибок, возникающих до отправки запроса
        //         console.error('Ошибка:', error);
        //     }
        // },

        setUserId() {
            const url = `${apiConf.host}/find`;
            const data = {
                token: localStorage.getItem('token')
            };

            return new Promise((resolve, reject) => {
                try {
                    axios.post(url, data)
                            .then(response => {
                                console.log('Успешный ответ от сервера:', response.data);
                                this.$store.commit('setUserId', response.data);
                                resolve();
                            })
                            .catch(error => {
                                console.error('Ошибка при выполнении запроса:', error);
                                reject(error);
                            });
                } catch (error) {
                    console.error('Ошибка:', error);
                    reject(error);
                }
            });
        },

        getDotsFromBack() {
            const userId = this.$store.getters.getUserId;
            const url = `${apiConf.host}/cords/getAll`;
            const data = { user_id: userId };

            return axios.post(url, data)
                    .then(response => {
                        console.log('Успешный ответ от сервера:', response.data);
                        this.$store.commit('setDots', response.data)
                    })
                    .catch(error => {
                        console.error('Ошибка при выполнении запроса:', error);
                    });
        },


        initializeData() {
            this.setUserId()
                    .then(() => {
                        return this.getDotsFromBack();
                    })
                    .then(() => {
                        this.tableData = this.$store.getters.getDots;
                    })
                    .catch(error => {
                        console.error('Ошибка при выполнении запроса:', error);
                    });
        },
    },
    created() {
        this.applyTheme();
        this.initializeData();
        this.$store.subscribe(() => {
            this.applyTheme();
        }, "setTheme");
    },

    mounted() {
        setInterval(() => {
            this.checkToken()
        }, 1);
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

    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: auto;
        min-width: 380px;
        background: -webkit-linear-gradient(44deg, #00f900, #4e35bc,#00bd00);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #00f900, #4e35bc,#00bd00);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding-top: 5vh;
    }

    .controllers{
        display: flex;
        flex-direction: column;
        height: auto;
        gap: 1rem;
        margin-top: 2vh;
        margin-bottom: 10vh;
    }

    .input-x{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .input-r{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .input-y{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .text{
        font-family: monospace;
        color: black;
        font-size: 2em;
        font-weight: 600;
    }

    .inp{
        border-radius: 10px;
        font-size: 2vh;
        font-family: monospace;
        border: none;
        color: black;
        padding-left: .5rem;
        font-weight: 600;
    }

    .cool-btn{
        min-width: 150px;
        width: 100%;
        height: 50%;
        border-radius: 10px;
        background-color: #e13092;
        font-family: monospace;
        font-size: 2vh;
        color: black;
        font-weight: 600;
        margin-top: 1rem;
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

    .button-control{
        margin-left: 2rem;
        margin-right: 2rem;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }

    .table {
        padding-left: .3rem;
    }

    .table-head {
        font-family: monospace;
        color: black;
        font-size: 1.7em;
        font-weight: 600;
        padding: 1%;
    }

    .table-row {

    }

    .table-d {
        font-family: monospace;
        color: black;
        font-size: 1.3em;

    }
}

/* Стили для темной темы */
.dark-theme {
    *{
        padding: 0;
        margin: 0;
    }


    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100vw;
        height: auto;
        min-width: 380px;
        background: -webkit-linear-gradient(44deg, #690791, #837411, #510569);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #690791, #837411, #510569);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding-top: 5vh;
    }

    .controllers{
        display: flex;
        flex-direction: column;
        height: auto;
        gap: 1rem;
        margin-top: 2vh;
        margin-bottom: 10vh;

    }

    .input-x{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .input-r{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .input-y{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .text{
        font-family: monospace;
        color: #ffffff;
        font-size: 2em;
        font-weight: 600;
    }

    .inp{
        border-radius: 10px;
        font-size: 2vh;
        font-family: monospace;
        border: none;
        color: black;
        padding-left: .5rem;
        font-weight: 600;
    }

    .cool-btn{
        min-width: 150px;
        width: 100%;
        height: 50%;
        border-radius: 10px;
        background-color: #ffd500;
        font-family: monospace;
        font-size: 2vh;
        color: black;
        font-weight: 600;
        margin-top: 1rem;
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

    .button-control{
        margin-left: 2rem;
        margin-right: 2rem;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }


    .table {
        padding-left: .3rem;
    }

    .table-head {
        font-family: monospace;
        color: white;
        font-size: 1.7em;
        font-weight: 600;
        padding: 1%;
    }

    .table-row {

    }

    .table-d {
        font-family: monospace;
        color: white;
        font-size: 1.3em;

    }
}

</style>