<template>
    <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': isLightTheme }">
        <div class="wrapper">
            <img :src="require('@/assets/' + srcSwitch)" class="dark-light" alt="dark-light" @click="changeTheme">
            <img src="@/assets/logo_itmo.svg" v-if="isLightTheme" class="img-h" alt="logo"/>
            <img src="@/assets/logo_itmo_belyy.png" v-if="isDarkTheme" class="img-h" alt="logo"/>
            <p class="text">Kotenkov Artem Alekseevich</p>
            <p class="text">P3222</p>
            <p class="text">66432</p>
        </div>
    </div>
</template>

<script>
import "@/assets/logo_itmo_belyy.png";

export default {
    name: 'HeaderComp',
    data: () => ({
        src: null,
        srcSwitch: null,
        theme: "light",
        isDarkTheme: false,
        isLightTheme: false
    }),
    computed: {

    },
    methods: {
        setDark() {
            this.src = "logo_itmo_belyy.png";
            this.srcSwitch = "light.png"

        },
        setLight() {
            this.src = "logo_itmo.svg";
            this.srcSwitch = "dark.png"
        },
        loadCss() {
            console.log(this.isDarkTheme, this.isLightTheme)
            if (this.isDarkTheme) {
                this.setDark();
            } else if (this.isLightTheme) {
                this.setLight();
            }
        },
        applyTheme() {
            this.isDarkTheme = this.$store.getters.getTheme === 'dark'
            this.isLightTheme = this.$store.getters.getTheme === 'light'
        },
        changeTheme() {
            this.$store.commit("setTheme")
            this.applyTheme()
        },


    },
    created() {
        this.theme = this.$store.getters.getTheme;
        this.applyTheme()
        this.loadCss();
    },

};
</script>

<style scoped>
/* Стили для светлой темы */
.light-theme {
    *{
        margin: 0;
        padding: 0;
    }
    .wrapper{
        width: 90vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 5%;
        padding-right: 5%;
        background: -webkit-linear-gradient(44deg, #ff40ff,#00f600);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #ff40ff,#00f600);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .img-h{
        width: 15vw;
        height: auto;
    }

    .text{
        font-family: monospace;
        color: black;
        font-size: 1.5em;
    }

    .dark-light{
        width: 3vw;
        height: auto;
        cursor: pointer;
    }

}

/* Стили для темной темы */
.dark-theme {
    *{
        margin: 0;
        padding: 0;
    }
    .wrapper{
        width: 90vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 5%;
        padding-right: 5%;
        background: -webkit-linear-gradient(17deg, #343232,#666100,#606060);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(17deg, #343232,#666100,#606060);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .img-h{
        width: 15vw;
        height: auto;
    }

    .text{
        font-family: monospace;
        color: #ffffff;
        font-size: 1.5em;
    }

    .dark-light{
        width: 3vw;
        height: auto;
        background-color: white;
        border-radius: 10px;
        cursor: pointer;
    }

}
</style>
