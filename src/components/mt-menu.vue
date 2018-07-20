<template>
  <section class="mt-menu" v-show="isVisibleMenu">
    <!-- Home btn -->
    <div class="btn-main-slide" @click="navigateTo(_mainSlide.id)">
      <icon-home/>
    </div>

    <div class="nav-links">
      <!-- Slides Links -->
      <swiper :options="swiperOption" ref="swiperSlides" class="slides">
        <swiper-slide v-for="sl in _slides" :key="sl.id"
                      :class="{active: isCurrentSlide(sl.id)}">
          <div v-html="sl.name" @click="navigateTo(sl.id)"></div>
        </swiper-slide>
      </swiper>

      <!-- Flow Links -->
      <swiper :options="swiperOption" ref="swiperFlows" class="flows">
        <swiper-slide v-for="sl in _flows" :key="sl.id"
                      :class="{active: isCurrentFlow(sl.id)}">
          <div v-html="sl.flowName || sl.name" @click="navigateTo(sl.id)"></div>
        </swiper-slide>
      </swiper>
    </div>


    <!-- Popup buttons section -->
    <div class="functional-buttons">

      <div class="btn-references"
           :class="getPopupBtnClasses('references')"
           @click="popupOpen('references')">
        <icon-references/>
      </div>

      <div class="btn-research-design"
           :class="getPopupBtnClasses('research-design')"
           @click="popupOpen('research-design')"
      >
        <icon-research-design/>
      </div>

      <div class="btn-instructions"
           :class="{active: activePopup === 'instructions'}"
           @click="_btnInstrCb"
      >
        <icon-instructions/>
      </div>

      <div class="btn-faq"
           :class="{active: currentFlow === 'faq'}"
           @click="_btnFaqCb"
      >
        <icon-faq/>
      </div>

      <logo-sanofi class="logo-sanofi"/>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import iconHome from '../assets/home.svg'
  import iconReferences from '../assets/references.svg'
  import iconResearchDesign from '../assets/research-design.svg'
  import iconInstructions from '../assets/instructions.svg'
  import iconFaq from '../assets/faq.svg'
  import logoSanofi from '../assets/logo-sanofi.svg'

  export default {
    name: "mt-menu",
    props: {
      mainSlide: {
        type: Object,
      },
      currentSlide: {
        type: Object,
      },
      slides: {
        type: Array,
      },
      flows: {
        type: Array
      },

      btnInstrCb: {
        type: Function,
      },

      btnFaqCb: {
        type: Function,
      },

      slidesToActiveAutoTransform: {
        type: Number,
        default: 6
      },
      flowsToActiveAutoTransform: {
        type: Number,
        default: 4
      },
    },

    components: {
      swiper,
      swiperSlide,
      iconHome,
      iconReferences,
      iconResearchDesign,
      iconInstructions,
      iconFaq,
      logoSanofi
    },

    data() {
      return {
        swiperOption: {
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 0,
          slidesOffsetAfter: 50,
          roundLengths: true,
          threshold: 50
        },
        instructions: false
      }
    },

    computed: {
      structure() {
        return this.$store.getters.structure
      },

      // Props default values start's from '_'
      _mainSlide() {
        return this.mainSlide || this.structure[0]
      },

      _currentSlide() {
        return this.currentSlide || this.$store.state.currentSlide
      },

      currentFlow() {
        return this._currentSlide.id.replace('slide-', '').split('_')[0];
      },

      _flows() {
        return this.flows || this.structure.filter(sl => /\d_1$/.test(sl.id));
      },

      _slides() {
        return this.slides || this.structure.filter(sl => {
          const regex = new RegExp(`slide-${this.currentFlow}`);
          return regex.test(sl.id)
        })
      },

      _btnInstrCb() {
        return this.btnInstrCb || (() => this.popupOpen('instructions'))
      },

      _btnFaqCb() {
        return this.btnFaqCb || (() => this.navigateTo('slide-faq'))
      },

      // Swiper instances
      swiperSlides() {
        return this.$refs.swiperSlides.swiper
      },

      swiperFlows() {
        return this.$refs.swiperFlows.swiper
      },

      // Popup
      activePopup() {
        return this.$store.state['mi-touch'].activePopup
      },

      popupData() {
        try {
          return this.$store.state.currentData.popup
        } catch (e) {
          console.error(`Not find "popup" key in current data:\n${e}`);
        }
      },

      isVisibleMenu() {
        return this.currentFlow !== 'main' && (this._currentSlide !== this._mainSlide)
      }
    },

    watch: {
      _currentSlide() {
        // Auto transform to active slide position, call after ready '_currentSlide'
        this.setSlidesActivePosition();
        this.setFlowsActivePosition();
      }
    },

    methods: {
      setSlidesActivePosition() {
        if (this.slidesToActiveAutoTransform === 0) {
          return this.swiperSlides.detachEvents();
        }

        if (this._slides.length >= this.slidesToActiveAutoTransform) {
          const currentSlideIndex = () => {
            let result = 0;
            this._slides.forEach((sl, index) => {
              if (this._currentSlide.id === sl.id) result = index
            });

            return result;
          };

          this.swiperSlides.slideTo(currentSlideIndex());
        }
      },

      setFlowsActivePosition() {
        if (this.flowsToActiveAutoTransform === 0) {
          return this.swiperFlows.detachEvents();
        }

        if (this._flows.length >= this.flowsToActiveAutoTransform) {
          const currentFlowIndex = () => {
            let result = 0;
            this._flows.forEach((sl, index) => {
              const regex = new RegExp(`^slide-${this.currentFlow}`);
              if (regex.test(sl.id)) result = index
            });

            return result;
          };

          this.swiperFlows.slideTo(currentFlowIndex());
        }
      },

      isCurrentSlide(id) {
        return id === this._currentSlide.id
      },
      isCurrentFlow(id) {
        return id.match(new RegExp(`slide-${this.currentFlow}`))
      },

      getPopupBtnClasses(btn) {
        return {
          active: this.activePopup === btn,
          disabled: !(this.popupData[btn] && Object.keys(this.popupData[btn]).length)
        }
      },

      popupOpen(popup) {
        this.$store.commit('mi-touch/POPUP_SHOW', popup);
      }
    },

    mounted() {
      [ // Set dataPreventTap="true" to following selectors:
        '.btn-main-slide',
        '.swiper-wrapper > *',
        '.functional-buttons > *'
      ].forEach(selector => {
        Array.from(document.querySelectorAll(selector))
          .forEach(el => el.setAttribute('data-prevent-tap', 'true'))
      })
    }
  }
</script>

<style lang="scss" scoped>

  /*** Menu ***/
  $menu_height: 60px;
  $menu_icons_color: #fff;

  //menu slide links (top menu)
  $menu_links_slide_height: 20px;
  $menu_links_slide_font_size: 12px;

  // menu flow links (bottom menu)
  $menu_links_flow_height: 40px;
  $menu_links_flow_font_size: 14px;

  .mt-menu {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;

    height: $menu_height;
    width: 100%;

    font-family: sans-serif;

    > * {
      height: 100%;

      font-family: 'Diaria Sans Pro', sans-serif;
    }

    &:before, &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
    }

    &:before {
      height: $menu_links_slide_height;
      top: 0;
      background-color: lightslategray;
    }

    &:after {
      bottom: 0;
      height: $menu_links_flow_height;
      background-color: lightblue;
    }
  }

  .btn-main-slide {
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 85px;

    background: cadetblue;
    border-top-right-radius: 2.5em;

    /deep/ svg {
      width: 30px;
      height: auto;

      fill: none;
      stroke: $menu_icons_color;

      transition: transform 0.1s cubic-bezier(0.04, -0.85, 0.92, 1.92);

      &:active {
        transform: scale(0.8);
      }
    }
  }

  .nav-links {
    position: absolute;
    left: 85px;
    right: 350px;
    width: auto;

    > * {
      display: block;
    }

    .swiper-wrapper {
      height: 100%;

      display: flex;
      align-items: center;

      .swiper-slide {
        margin: 0;
        width: auto;

        display: flex;
        align-items: center;
        justify-content: center;

        > * {
          padding: 0 20px;
          width: 100%;
          line-height: 1;
          text-align: center;

          border-right: solid 1px;
          border-color: inherit;
        }

        &:last-child {
          > * {
            border-color: transparent;
          }
        }
      }
    }

    .slides {
      height: $menu_links_slide_height;

      .swiper-slide {

        > * {
          font-size: $menu_links_slide_font_size;
        }

        // Active for slides
        &:active, &.active {
          > * {
            text-shadow: 1px 0px 0px black;
          }
        }
      }

    }

    .flows {
      height: $menu_links_flow_height;

      .swiper-slide {
        margin-top: $menu_links_slide_height/2;
        height: $menu_links_slide_height;

        > * {
          font-size: $menu_links_flow_font_size;
        }

        // Active for flows
        &:active, &.active {
          > * {
            text-shadow: 1px 0px 0px black;
          }
        }
      }

    }
  }

  // Menu right section
  .functional-buttons {
    padding-left: 20px;
    position: absolute;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 2;

    border-top-left-radius: 2.5em;
    background: cadetblue;

    .logo-sanofi {
      width: 136px;
      margin: 0 25px;
    }

    .disabled {
      opacity: .5;
      pointer-events: none;
    }

    // references, research-design and other button in right section
    > * {
      margin: 0 5px;
      width: 35px;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: transform 0.1s cubic-bezier(0.04, -0.85, 0.92, 1.92);

      &.active, &:active {
        transform: scale(0.8);
      }

      /deep/ svg {
        fill: none;
        stroke: $menu_icons_color;
      }
    }
  }

</style>
