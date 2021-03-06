import Vue from 'vue';
import App from './App.vue';
import home from './components/admin/home.vue';
import welcome from './components/admin/welcome.vue';
import login from './components/admin/auth/login.vue';
import register from './components/admin/auth/register.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
import auth from './admin_auth.js';

Vue.use(VueAxios, axios);

const routes = [
    {
        name: 'admin_welcome',
        path: '/admin',
        component: welcome
    },
    {
        name: 'admin_home',
        path: '/admin/home',
        secure: true,
        component: home
    },
    {
        name: 'admin_login',
        path: '/admin/login',
        component: login
    },
    {
        name: 'admin_register',
        path: '/admin/register',
        component: register
    }
];

export default axios;
export var router = new VueRouter({ mode: 'history', routes: routes});
router.beforeEach((to, from, next) => {
    // Look at all routes
    router.options.routes.forEach((route) => {
        // If this is the current route and it's secure
        if (to.matched[0].path === route.path && route.secure) {
            // Verify that the user isn't logged in
            auth.me();
            if (!auth.user.authenticated) {
                return next('/admin/login');
            }
        }
    });
    // Proceed as normal
    next();
});
new Vue(Vue.util.extend({ router }, App)).$mount('#admin_app');