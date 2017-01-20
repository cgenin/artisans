import Home from './components/pages/Home';
import RequiredKnowledge from './components/pages/search';
import Rechercher from './components/pages/search/step0/Rechercher';
import SelectionRechercher from './components/pages/search/step1/SelectionRechercher';
import OuSuisJe from './components/pages/search/step2/OuSuisJe';
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
    step0: {
      path: 'step0',
      component: Rechercher,
      fullpath: '/search/step0',
    },
    step1: {
      path: 'step1/:search',
      component: SelectionRechercher,
      fullpath: (s) => `/search/step1/${s}`,
    },
    step2: {
      path: 'step2/:id',
      component: OuSuisJe,
      fullpath: (s) => `/search/step2/${s}`,
    }
  },
  results: {
    path: 'results',
    component: Results, fullpath: '/results'
  }

}