import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'materialize-css/dist/js/materialize.min'

Vue.filter('formatDate', (val) => {
    if (!val) return

    const date = new Date(val);
    let day = `${date.getDate()}`,
        month = `${(date.getMonth() + 1)}`,
        year = `${date.getFullYear()}`;

    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;

    return [day, month, year].join('.');
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
