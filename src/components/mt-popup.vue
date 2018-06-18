<template>
  <section class="mt-popup" :class="{active: activePopup}" @click="popupAction">
    <transition :name="animation">

      <section v-if="activePopup === 'instructions'" class="PDF-section">
        <div class="close-PDF-section" @click="popupClose"></div>
        <div class="PDF-container">
          <object :data="instrPath" type="application/pdf"></object>
        </div>
      </section>

      <json-to-html v-else-if="activePopup" :json="_dataPopup" :rootClassName="`popup-${activePopup}`">
        <div class="btn-popup-hide" @click="popupClose"></div>
        <slot/>
      </json-to-html>

    </transition>
  </section>
</template>

<script>
  import JsonToHtml from 'vue-json-to-html'

  export default {
    name: "mt-popup",
    components: {
      JsonToHtml
    },
    props: {
      dataPopup: {
        type: Object,
      },
      animation: {
        type: String,
        default: 'fade'
      },
      instrPath: {
        type: String,
        default: 'media/pdf/instruction.pdf'
      }
    },
    data() {
      return {
        popupPosition: {
          references: {
            isCalculated: false,
            right: ''
          },
          'research-design': {
            isCalculated: false,
            right: ''
          }
        }
      }
    },
    computed: {
      currentSlide() {
        return this.$store.state.currentSlide
      },
      activePopup() {
        return this.$store.state['mi-touch'].activePopup
      },
      _dataPopup() {
        return this.dataPopup || this.$store.state.currentData.popup[this.activePopup] || {}
      }
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
      }
    },

    watch: {
      activePopup(popup) {
        if (popup === 'references' || popup === 'research-design') {
          let {isCalculated, right} = this.popupPosition[popup];

          if (!this.popupPosition[popup].isCalculated) {
            const btnElRect = document.querySelector(`.mt-menu .btn-${popup}`).getBoundingClientRect();
            const appWidth = document.getElementById('app').offsetWidth;
            const popupOffsetRight = appWidth - btnElRect.x - btnElRect.width / 2 + 'px';

            this.popupPosition[popup].isCalculated = true;
            this.popupPosition[popup].right = popupOffsetRight;
          }

          this.$nextTick(() => {
            document.querySelector(`.mt-popup .popup-${popup}`).style.right = this.popupPosition[popup].right;
          })
        }
      }
    }
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

    > * {
      position: absolute;
      bottom: 80px;

      background-color: #fff;
    }
  }

  .popup-references {
    width: 250px;
    min-height: 440px;
    max-height: 520px;

    padding: 32px;
    display: flex;
    flex-flow: column;

    .popup-close, &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .PDF-section {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;
    z-index: 15;

    background-color: #525659;

    .PDF-container {
      position: absolute;
      top: 0;
      left: 8%;
      right: 8%;
      height: 100%;

      > * {
        width: 100%;
        height: 100%;
      }
    }

    .close-PDF-section {
      width: 40px;
      height: 40px;

      position: absolute;
      right: 30px;
      top: 40px;
      z-index: 100;

      background-color: rgba(#000, .5);

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
        background-color: #fff;
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

</style>
