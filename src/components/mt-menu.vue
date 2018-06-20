<template>
  <section class="mt-menu">
    <!-- Home btn -->
    <div class="btn-main-slide" @click="navigateTo(_mainSlide.id)" v-html="icons.home"></div>

    <div class="nav-links">
      <!-- Slides Links -->
      <swiper :options="swiperOption" ref="swiperSlides" class="slides">
        <swiper-slide v-for="sl in _slides" :key="sl.id"
                      :class="{active: isCurrentSlide(sl.id)}">
          <div v-html="sl.id" @click="navigateTo(sl.id)"></div>
        </swiper-slide>
      </swiper>

      <!-- Flow Links -->
      <swiper :options="swiperOption" ref="swiperFlows" class="flows">
        <swiper-slide v-for="sl in _flows" :key="sl.id"
                      :class="{active: isCurrentFlow(sl.id)}">
          <div v-html="sl.name" @click="navigateTo(sl.id)"></div>
        </swiper-slide>
      </swiper>
    </div>


    <!-- Popup buttons section -->
    <div class="functional-buttons">

      <div class="btn-references"
           :class="getPopupBtnClasses('references')"
           v-html="icons.references"
           @click="popupOpen('references')"
      ></div>

      <div class="btn-research-design"
           :class="getPopupBtnClasses('research-design')"
           v-html="icons['research-design']"
           @click="popupOpen('research-design')"
      ></div>

      <div class="btn-instructions"
           v-html="icons.instructions"
           :class="{active: activePopup === 'instructions'}"
           @click="_btnInstrCb"
      ></div>

      <div class="btn-faq"
           v-html="icons.faq"
           :class="{active: currentFlow === 'faq'}"
           @click="_btnFaqCb"
      ></div>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import icons from '@/components/svg-icons'

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
      }
    },

    components: {
      swiper,
      swiperSlide
    },

    data() {
      return {
        icons,
        swiperOption: {
          slidesPerView: 'auto',
          paginationClickable: true,
          spaceBetween: 0,
          slidesOffsetAfter: 50,
          roundLengths: true
        },
        instructions: false
      }
    },

    computed: {
      structure() {
        return this.$store.getters.structure
      },

      // Props defaults start from '_'
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

      activePopup() {
        return this.$store.state['mi-touch'].activePopup
      },

      popupData() {
        try {
          return this.$store.state.currentData.popup
        } catch (e) {
          console.error(e);
        }
      }
    },

    watch: {
      _currentSlide() {
        const currentSlideIndex = () => {
          let result;
          this._slides.forEach((sl, index) => {
            if (this._currentSlide.id === sl.id) result = index
          });

          return result;
        };

        this.swiperSlides.slideTo(currentSlideIndex());
      }
    }
    ,

    methods: {
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
      },
    },

    mounted() {
      [
        '.btn-main-slide',
        '.swiper-wrapper > *',
        '.functional-buttons > *'
      ].forEach(selector => document.querySelectorAll(selector)
        .forEach(el => el.setAttribute('data-prevent-tap', 'true')))
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

    &:after {
      content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAAeCAYAAAD3hVYMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1NDdEMzU1NkYxODExRTg4OUE3RkEzMzI2REU1RkI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1NDdEMzU2NkYxODExRTg4OUE3RkEzMzI2REU1RkI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU0N0QzNTM2RjE4MTFFODg5QTdGQTMzMjZERTVGQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU0N0QzNTQ2RjE4MTFFODg5QTdGQTMzMjZERTVGQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7QsS+wAAAHX0lEQVR42uyb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');
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
