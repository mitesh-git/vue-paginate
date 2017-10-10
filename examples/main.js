import Vue from 'vue'
import App from './App'
import VuePaginate from 'vue-paignate-api'

Vue.use(VuePaginate)

new Vue({
  el: '#app',
  render: h => h(App)
})