<template>
    <HeaderComp/>
    <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': isLightTheme }">
            <div class="container">
                <GraphComp ref="GraphComp"/>
                <div class="controllers">
                    <div class="input-x">
                        <label class="text" for="dropdownX">Выберите значение x:</label>
                        <select id="dropdownX"  v-model="selectedValueX">
                            <option class="text" v-for="value in dropdownValuesX" :key="value" :value="value">{{ value }}</option>
                        </select>
                    </div>
                    <div class="input-y">
                        <p class="text">Выберите значение y:</p>
                        <input class="inp" v-model="selectedValueY">
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
                            <td class="table-d">{{ item.column1 }}</td>
                            <td class="table-d">{{ item.column2 }}</td>
                            <td class="table-d">{{ item.column3 }}</td>
                            <td class="table-d">{{ item.column4 }}</td>
                            <td class="table-d">{{ item.column5 }}</td>
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

export default {
    name: 'LoginView',
    components: {
        HeaderComp,
        GraphComp
    },
    data(){
        return{
            dropdownValuesX: ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'],
            selectedValueX: 2,
            dropdownValuesR: ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'],
            selectedValueR: -1,
            selectedValueY: 2,
            isDarkTheme: false,
            isLightTheme: false,
            tableData: [
                { column1: '0.5', column2: '1', column3: '1,34', column4: 'true', column5: '12323234124' },
                { column1: '0.5', column2: '1', column3: '1,34', column4: 'true', column5: '12323234124' },
            ]
        }
    },
    methods:{
        toMain(){
            console.log('на главную')
            router.push('/main')
        },


        applyTheme() {
            this.isDarkTheme = this.$store.getters.getTheme === 'dark'
            this.isLightTheme = this.$store.getters.getTheme === 'light'
        },

        changeR(){
            this.$store.commit("setRadius", this.selectedValueR)
            this.$refs.GraphComp.drawGraph()
            console.log(this.selectedValueR)
        },

        check(){
            this.$store.commit("setRadius", this.selectedValueR)
        }
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