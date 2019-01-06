import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Panel from './components/Panel';
import Upload from './components/Upload';
import Edit from './components/Edit';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },

        {
            path: '/about',
            name: 'About',
            component: About
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
            path: '/upload',
            name: 'Upload',
            component: Upload
        },

        {
            path: '/edit/:imageId',
            name: 'Edit',
            props: true,
            component: Edit
        }

    ]
});
