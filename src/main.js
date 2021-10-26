import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './components/App.vue'
import Weather from './components/Weather.vue'
import WeatherInfo from './components/WeatherInfo.vue'
import WeatherDetail from './components/WeatherDetail.vue'

const routes = [
    {path: '/', component: Weather},
    {path: '/weather-info/:cityName', component: WeatherInfo,props:true},
    {path: '/weather-detail', component: WeatherDetail},
]

const router = new VueRouter({
    mode: "history",
    routes
})

Vue.use(VueAxios, axios)
Vue.use(VueRouter)


new Vue({
   render: h => h(App),
   el: '#app',
   router
})