import DefaultTheme from 'vitepress/theme'
import HomeContent from './components/HomeContent.vue'
import './custom.css';

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component('HomeContent', HomeContent);
    }
}