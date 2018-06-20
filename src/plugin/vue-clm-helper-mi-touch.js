import MtMenu from '@/components/mt-menu'
import MtPopup from '@/components/mt-popup'

const VueClmHelperMiTouch = {};

VueClmHelperMiTouch.install = function (Vue, store, options) {

  if (!store) {
    throw new Error(`Please provide vuex store: "Vue.use(MiTouchPlugin, store)";`);
  }

  const state = {
    activePopup: ''
  };

  const mutations = {
    POPUP_SHOW(state, popupName) {
      state.activePopup = popupName;
    },

    POPUP_HIDE(state) {
      state.activePopup = ''
    }
  };

  store.registerModule('mi-touch', {
    namespaced: true,
    state,
    mutations
  });

  Vue.component(MtMenu.name, MtMenu);
  Vue.component(MtPopup.name, MtPopup);

};

export default VueClmHelperMiTouch;
