import Home from './components/pages/Home';
import RequiredKnowledge from './components/pages/search';
import Rechercher from './components/pages/search/step0/Rechercher';
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
        fullpath: '/search',
        step0:{
            path: 'step0',
            component: Rechercher,
            fullpath: '/search/step0',
        }
    },
    results: {
        path: 'results',
        component: Results, fullpath: '/results'
    }

}