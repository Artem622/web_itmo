import {createStore} from 'vuex'

const store = createStore({
    state: {
        theme: "light",
        r: 2,
        y: null,
        x: null,
        token: null,
        dots: [
            { column1: '0.5', column2: '1', column3: '1,34', column4: 'true', column5: '12323234124' },
            { column1: '0.5', column2: '1', column3: '1,34', column4: 'true', column5: '12323234124' },
            { column1: '0.5', column2: '1', column3: '1,34', column4: 'true', column5: '12323234124' },
            { column1: '0.5', column2: '1', column3: '1,34', column4: 'true', column5: '12323234124' },
        ],
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
        },

        getDots(state){
            return state.dots
        },

        getToken(state){
            return state.token
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
        },

        setToken(state, token){
            state.token = token
            console.log('token is set')
        }
    },

    actions: {

    },
})
export default store
