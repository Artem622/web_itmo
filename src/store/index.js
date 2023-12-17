import {createStore} from 'vuex'

const store = createStore({
    state: {
        theme: "light",
        r: 2,
    },

    getters:{
        getTheme(state){
            return state.theme
        },

        getRadius(state){
            return state.r
        }
    },

    mutations: {
        setTheme(state){
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            console.log(state, "state")
        },

        setRadius(state, radius){
            state.r = radius
            console.log("radius change", state.r)
        }
    },

    actions: {

    },
})
export default store
