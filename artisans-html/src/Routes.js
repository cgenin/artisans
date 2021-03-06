const home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/home/Home').default)
  }, 'Home')
};


const search = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/search').default)
  }, 'Search')
};

const rechercher = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/search/step0/Rechercher').default)
  }, 'Rechercher')
};

const selectionRechercher = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/search/step1/SelectionRechercher').default)
  }, 'SelectionRechercher')
};

const ouSuisJe = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/search/step2/OuSuisJe').default)
  }, 'OuSuisJe')
};


const recapitulatif = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/search/step3/Recapitulatif').default)
  }, 'Recapitulatif')
};

const results = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/results').default)
  }, 'Results')
};


const notinitliazedyet = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/results/NotInitliazedYet').default)
  }, 'NotInitliazedYet')
};

const list = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/results/List').default)
  }, 'List')
};

const map = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/results/Map').default)
  }, 'List')
};

const detail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/pages/results/Detail/index').default)
  }, 'Detail')
};

export default {
  index: {
    path: '/',
    component: home
  },
  home: {
    path: 'home',
    component: home,
    fullpath: '/home'
  },
  search: {
    path: 'search',
    component: search,
    fullpath: '/search',
    step0: {
      path: 'step0',
      component: rechercher,
      fullpath: '/search/step0',
    },
    step1: {
      path: 'step1/:search',
      component: selectionRechercher,
      fullpath: (s) => `/search/step1/${s}`,
    },
    step2: {
      path: 'step2/:id',
      component: ouSuisJe,
      fullpath: (s) => `/search/step2/${s}`,
    },
    step3: {
      path: 'step3/:id/:lat/:lon',
      component: recapitulatif,
      fullpath: (s, lat, lon) => `/search/step3/${s}/${lat}/${lon}`,
    }

  },
  results: {
    path: 'results',
    component: results,
    fullpath: '/results',

    notiniatilized: {
      path: 'notinitliazedyet',
      component: notinitliazedyet,
      fullpath: '/results/notinitliazedyet',
    },

    list: {
      path: 'list/:id/:lat/:lon/:codepostal',
      component: list,
      fullpath: (s, lat, lon, codepostal) => `/results/list/${s}/${lat}/${lon}/${codepostal}`,
    },
    map: {
      path: 'map/:id/:lat/:lon/:codepostal',
      component: map,
      fullpath: (s, lat, lon, codepostal) => `/results/map/${s}/${lat}/${lon}/${codepostal}`,
    },

    detail: {
      path: 'detail/:id/:lat/:lon/:codepostal/:index',
      component: detail,
      fullpath: (s, lat, lon, codepostal, index) => `/results/detail/${s}/${lat}/${lon}/${codepostal}/${index}`,
    },
  }

}