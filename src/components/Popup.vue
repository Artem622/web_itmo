<!-- Popup.vue -->
<template>
    <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': isLightTheme }">
        <div class="popup" v-if="isVisible">
            <div class="popup-content">
                <p class="popup-text">{{ popupText }}</p>
                <button class="cool-btn" @click="closePopup">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupComp",
    data() {
        return {
            isDarkTheme: false,
            isLightTheme: false
        }
    },
    props: {
        isVisible: Boolean,
        popupText: String,
    },
    methods: {
        closePopup() {
            this.$emit('closed'); // Эмитируем событие только здесь
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
};
</script>

<style scoped>
/* Стили для светлой темы */
.light-theme {
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9;
    }

    .popup-content {
        background: -webkit-linear-gradient(136deg, #78ccb7,#00acff,#ff40ff);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(136deg, #78ccb7,#00acff,#ff40ff);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding: 1rem;
        border-radius: 8px;
        text-align: center;

    }

    .popup-text{
        font-family: monospace;
        font-size: 1.7em;
        color: black;
        font-weight: 600
    }

    .cool-btn{
        min-width: 100px;
        width: 80%;
        height: 50%;
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
}

/* Стили для темной темы */
.dark-theme {
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9;
    }

    .popup-text{
        font-family: monospace;
        font-size: 1.7em;
        color: white;
        font-weight: 600;
    }

    .popup-content {
        background: -webkit-linear-gradient(44deg, #000000,#c4bc00,#b51a00);/* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(44deg, #000000,#c4bc00,#b51a00);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding: 20px;
        border-radius: 8px;
        text-align: center;
    }

    .cool-btn{
        min-width: 100px;
        width: 80%;
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
}
</style>
