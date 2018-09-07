import MtMenu from '@/components/mt-menu'
import MtPopup from '@/components/mt-popup'
import PdfPopup from '@/components/pdf-popup'

const VueClmHelperMiTouch = {
  install(Vue, store, options) {
    if (!store) {
      throw new Error(`Please provide vuex store: "Vue.use(MiTouchPlugin, store)";`);
    }

    const state = {
      activePopup: '',
    };

    const mutations = {
      POPUP_SHOW(state, popupName) {
        state.activePopup = popupName;
      },

      POPUP_HIDE(state) {
        state.activePopup = ''
      },
    };

    Vue.mixin({
      methods: {
        $navigateTo: this.$navigateTo || this.navigateTo,
        $openPdfIos: this.$openPdfIos || this.openPdfIos,
      }
    });

    store.registerModule('mi-touch', {
      namespaced: true,
      state,
      mutations,
    });

    Vue.component(MtMenu.name, MtMenu);
    Vue.component(MtPopup.name, MtPopup);
    Vue.component(PdfPopup.name, PdfPopup);
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueClmHelperMiTouch)
}

export default VueClmHelperMiTouch;
