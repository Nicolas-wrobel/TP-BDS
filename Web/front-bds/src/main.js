import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/', component: HomePage },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = false;
    if (to.path !== '/login' && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });
  

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
