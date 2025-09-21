import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';  // Tailwind CSS

import routes from './components/router/index'; // your existing router setup

createApp(App).use(routes).mount('#app');
