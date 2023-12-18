import {createStore} from 'vuex'

const store = createStore({
    state: {
        theme: "light",
        r: 2,
        y: null,
        x: null
    },

    getters:{
        getTheme(state){
            return state.theme
        },

        getRadius(state){
            return state.r
        },

        getX(state){
            return state.x
        },

        getY(state){
            return state.y
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
        },

        setX(state, x){
            state.x = x
            console.log('set in x store', state.x)
        },

        setY(state, y){
            state.y = y
            console.log('set in y store', state.y)
        }
    },

    actions: {

    },
})
export default store
