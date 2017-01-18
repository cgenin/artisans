import Home from './components/pages/Home';
import RequiredKnowledge from './components/pages/search';
import Results from './components/pages/results';


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
        component: Results, fullpath: '/results'
    }

}