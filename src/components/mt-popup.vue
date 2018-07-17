<template>
  <section class="mt-popup" :class="{active: activePopup}" @click="popupAction">
    <transition :name="animation">

      <!-- Instructions Popup -->
      <section v-if="activePopup === 'instructions'"
               :class="{'popup-instructions': true, 'no-slot-content': !hasInstructionsSlot}">
        <div class="btn-popup-hide" @click="popupClose" v-if="hasInstructionsSlot"></div>
        <slot name="instructions" v-if="hasInstructionsSlot"/>

        <pdf-popup v-else :instr-path="instrPath"/>
      </section>

      <!-- Other Popups -->
      <json-to-html v-else-if="activePopup" :json="_dataPopup" :rootClassName="`popup-${activePopup}`">
        <div class="btn-popup-hide" @click="popupClose"></div>

        <slot :name="activePopup"/>
      </json-to-html>

    </transition>
  </section>
</template>

<script>
  import JsonToHtml from 'vue-json-to-html'
  import PdfPopup from './pdf-popup'

  export default {
    name: "mt-popup",
    components: {
      JsonToHtml,
      PdfPopup,
    },
    props: {
      dataPopup: {
        type: Object,
      },
      animation: {
        type: String,
        default: 'fade',
      },
      instrPath: {
        type: String,
        default: 'media/pdf/instruction.pdf',
      },
    },
    data() {
      return {
        popupPosition: {
          references: {
            isCalculated: false,
            right: '',
          },
          'research-design': {
            isCalculated: false,
            right: '',
          },
          'instructions': {
            isCalculated: false,
            right: '',
          },
        },
      }
    },
    computed: {
      activePopup() {
        return this.$store.state['mi-touch'].activePopup
      },
      _dataPopup() {
        return this.dataPopup || this.$store.state.currentData.popup[this.activePopup] || {}
      },
      hasInstructionsSlot() {
        return !!this.$slots['instructions']
      },
    },

    methods: {
      popupClose() {
        this.$store.commit('mi-touch/POPUP_HIDE')
      },

      // Close popup when click without popup content
      popupAction(e) {
        let el = e.target;

        // Polyfill for IE:
        if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
        if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
          while (el) {
            if (el.matches(selector)) return el;
            el = el.parentElement;
          }
        };

        if (!el.closest('.mt-popup > *')) this.popupClose();
      },
    },

    watch: {
      activePopup(popup) {
        if (popup === 'references' || popup === 'research-design' || popup === 'instructions') {
          let { isCalculated, right } = this.popupPosition[popup];

          if (!this.popupPosition[popup].isCalculated) {
            const btnElRect = document.querySelector(`.mt-menu .btn-${popup}`).getBoundingClientRect();
            const appWidth = document.getElementById('app').offsetWidth;
            const popupOffsetRight = appWidth - btnElRect.left - btnElRect.width / 2 + 'px';

            this.popupPosition[popup].isCalculated = true;
            this.popupPosition[popup].right = popupOffsetRight;
          }

          this.$nextTick(() => {
            document.querySelector(`.mt-popup .popup-${popup}`).setAttribute('style', `right: ${this.popupPosition[popup].right}`);
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

  .mt-popup {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;

    width: 100%;
    height: 100%;

    visibility: hidden;
    background-color: rgba(17, 29, 48, 0.0);
    transition: background-color .5s, visibility .5s;

    &.active {
      visibility: visible;
      background-color: rgba(17, 29, 48, 0.6);
    }

    * {
      box-sizing: border-box;
      font-family: 'Diaria Sans Pro', sans-serif;
    }
  }

  .popup-references, .popup-research-design, .popup-instructions {
    position: absolute;
    bottom: 80px;

    background-color: #fff;

    &:after {
      content: '';
      position: absolute;
      bottom: -15px;
      right: 0;

      border-style: solid;
      border-width: 16px 0 0 16px;
      border-color: #fff transparent transparent transparent;
    }

    .btn-popup-hide {
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 2;

      width: 20px;
      height: 20px;

      &:before, &:after {
        content: '';

        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -.75px;
        margin-top: -30%;
        transform-origin: center;
        width: 1.5px;
        height: 60%;
        background-color: #000;
        border-radius: 1.5px;
      }

      &:before {
        transform: rotate(-45deg);
      }

      &:after {
        transform: rotate(45deg);
      }

      &:active {
        opacity: .5;
      }
    }
  }

  .popup-references {
    width: 320px;
    min-height: 440px;
    max-height: 520px;

    padding: 32px;
    display: flex;
    flex-flow: column;
  }

  .popup-research-design, .popup-instructions {
    min-height: 440px;
    max-height: 520px;
    min-width: 530px;

    padding: 28px;
  }

  .popup-instructions.no-slot-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: auto;
    background-color: transparent;

    width: 100%;
    height: 100%;
  }

</style>
