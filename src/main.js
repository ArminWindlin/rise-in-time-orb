import Vue from 'vue';
import HomePage from './components/HomePage';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import '../reset.css';
import '../general.css';
import '../images.css';
import treasureTable from './components/treasureTable';
import battleBoard from './components/battleBoard';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.prototype.$url1 = 'https://backend-dot-riseintime.appspot.com';
// Vue.prototype.$url1 = 'http://localhost:3000';

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: HomePage},
        {path: '/articles/treasure-rewards', component: treasureTable},
        {path: '/articles/battle-board', component: battleBoard},
        // {path: '/articles/faq', component: FAQ},
        // {path: '/wiki', component: HomePage},
        // {path: '/articles/:id', component: ArticlePage},
    ],
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

