import App from './App.vue';

export default {
    install(Vue, options) {
        Vue.component('vue-nested-menu', App);
    },
};
