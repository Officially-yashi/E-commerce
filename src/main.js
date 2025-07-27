import Vue from 'vue'
import App from './App.vue'
import './tailwind.css';
import router from './router';
import store from './store';
import { Carousel, Slide } from 'vue-carousel';


Vue.config.productionTip = false
Vue.component('Carousel', Carousel);
Vue.component('Slide', Slide);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
