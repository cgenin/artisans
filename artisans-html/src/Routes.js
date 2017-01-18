import Home from './components/pages/Home';
import RequiredKnowledge from './components/pages/get-started/RequiredKnowledge';
import Themes from './components/pages/customization/Themes';


export default {
    index: {
        path: '/',
        component: Home
    },
    home: {
        path: 'home',
        component: Home,
        fullpath: '/home'
    },
    search: {
        path: 'search',
        component: RequiredKnowledge,
        fullpath: '/search'
    },
    results: {
        path: 'results',
        component: Themes, fullpath: '/results'
    }

}