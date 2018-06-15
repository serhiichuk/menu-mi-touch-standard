import MtMenu from '@/components/mt-menu'
import MtPopup from '@/components/mt-popup'

const VueClmHelperMiTouch = {};

VueClmHelperMiTouch.install = function (Vue, options) {
  Vue.component(MtMenu.name, MtMenu);

};

export default VueClmHelperMiTouch;
