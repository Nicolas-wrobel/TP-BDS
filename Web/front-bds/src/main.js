import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (to.path !== '/login' && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });  

app.use(router);
app.mount('#app');
