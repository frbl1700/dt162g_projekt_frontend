import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Panel from './components/Panel';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },

        {
            path: '/signin',
            name: 'Login',
            component: Login
        },

        {
            path: '/register',
            name: 'Register',
            component: Register
        },

        {
            path: '/panel',
            name: 'Panel',
            component: Panel
        },

        {
            path: '/about',
            name: 'About',
            component: About
        }
    ]
});