# vue-clm-helper-mi-touch

**Status: beta** 

**:baby_chick: Vue plugin for Vue CLI plugin [CLM Helper](https://github.com/serhiichuk/vue-cli-plugin-clm-helper)**

**Extend Vuex Store and include basic components for MI Touch Presentations**

## Table of contents

- [Usage](#usage)
- [Store Extending](#store-extending)
- [Registered components](#registered-components)
  - [mt-menu](#mt-menu)
  - [mt-popup](#mt-popup)
  - [pdf-popup](#pdf-popup)

## Usage
Install component to your project:
```
yarn add vue-clm-helper-mi-touch
```

Import and include to Vue Instance installed plugin:
```
// main.js
...
import MtPlugin from 'vue-clm-helper-mi-touch'

Vue.use(MtPlugin, store) // store is required
```

Use plugin in components (App.vue or [slide-component](https://github.com/serhiichuk/vue-cli-plugin-clm-helper#slide-component)):
```
<template>
  <div id="app">
    ...
    <mt-menu/>    
    <mt-popup/> 
  </div>
</template>
```

## Store Extending

This plugin is extending Vuex store.

```
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
```

Doing mutations:

```
  methods: {
    ...
    popupOpen(popupName) {
      this.$store.commit('mi-touch/POPUP_SHOW', popupName);
    },
    
    popupClose() {
      this.$store.commit('mi-touch/POPUP_HIDE')
    }
  }
```


## Registered components

Plugin register components `mt-menu`, `mt-popup` and `pdf-popup` globally.

For using components, just [include](#usage) it in template.

MI Touch components have basic functional and styles.

Basically, you don't need pass any props, it automatic find `current slide`, `main slide`, `current flow` and `popup text data`.

But, in some cases you can pass following props:

### mt-menu

Prop | Type | Default | Description
  --- | --- | --- |---
  mainSlide | Object | `this.structure[0]` | First slide in [structure](#https://github.com/serhiichuk/vue-cli-plugin-clm-helper#structure). Must have following keys: `id`, `path`, `name`.
  currentSlide | Object | `this.$store.state.currentSlide` | Object with following keys: `id`, `path`, `name`.
  slides | Array | ``this.structure.filter(sl => new RegExp(`slide-${this.currentFlow}`).test(sl.id))`` | Filtered slides from current flow name, will rendering in top list in menu. 
  flows | Array | `this.structure.filter(sl => /\d_1$/.test(sl.id));` | Filtered slides from each first slide in each flow, will rendering in bottom list in menu. 
  btnInstrCb | Function | `() => this.popupOpen('instructions')` | Callback for `Instructions button` 
  btnFaqCb | Function | `() => this.navigateTo(<first slide-faq>)` | Callback for `FAQ button` 
  slidesToActiveAutoTransform | Number | `6` | If `slidesToActiveAutoTransform` >= `slides.length` then current slide list item will be moved to left side.
  flowsToActiveAutoTransform | Number | `6` | If `flowsToActiveAutoTransform` >= `flows.length` then current slide list item will be moved to left side.
  
  **:info: For deactivate necessary swiper, please set `slidesToActiveAutoTransform` or `flowsToActiveAutoTransform` to `0`.**

```
// Now slides and flows will not be a swipable.
<mt-menu :slidesToActiveAutoTransform="0" :flowsToActiveAutoTransform="0"/>
```

### mt-popup

Prop | Type | Default | Description
  --- | --- | --- |---
  dataPopup | Object | `this.$store.state.currentData.popup[this.activePopup]` | Object with text data. Popup DOM three will render with [vue-json-to-html](#https://github.com/serhiichuk/vue-json-to-html) 
  animation | String | `'fade'` | Name for [transition wrapper component](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components). Don't forget to describe custom transition classes
  instrPath | String | `'media/pdf/instruction.pdf'` | Path to `pdf` file which will open after click on `Instruction Button`, file must contain in `public/${instrPath}`

### pdf-popup

**:warning: Show `pdf-popup` only with `v-if` directive.**

Prop | Type | Default | Description
  --- | --- | --- |---
instrPath | String | `undefined` | Path to `pdf` file which must have `.pdf` end of string.
closePdf | Function | `() => {this.$store.commit('mi-touch/POPUP_HIDE')}` | Callback for close button in `<pdf-popup/>`. 

Example: Using custom instructions popup.

```
// App.vue
<template>
  <div id="app" :class="[currentSlide.id, clmName]" v-touch:swipe="swipeHandler">
    ...
    <mt-menu v-show="true"/>
    <mt-popup>
      <template slot="instructions">
        <button @touchend="openPdf('media/pdf/pdf-1.pdf')">Show PDF 1</button>
        <button @touchend="openPdf('media/pdf/pdf-2.pdf')">Show PDF 2</button>
      </template>
    </mt-popup>

    <transition name="fade">
      <pdf-popup v-if="activePdf" class="pdf-popup" :instr-path="activePdf" :closePdf="closePdf"/>
    </transition>
    ...
  </div>
</template>


<script>
  export default {
    ...
    data: () => ({
      activePdf: '',
    }),
    methods: {
      openPdf(pdf) {
        this.activePdf = pdf;
      },
      closePdf() {
        this.activePdf = '';
      }
    },
  }
</script>
```

Also tou can use [named slots](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) to pass some HTML to necessary popup:

Slot content bellow will be added to actual popup block:
```
<mt-popup>
  <template slot="references">
    <h1>Here might be a references title</h1>
  </template>
</mt-popup>
```

```
<mt-popup>
  <template slot="research-design">
    <h1>Here might be a research design title</h1>
  </template>
</mt-popup>
```

```
<mt-popup>
 <template slot="instructions">
   <button @touchend="openPdf('media/pdf/pdf-1.pdf')">Show PDF 1</button>
   <button @touchend="openPdf('media/pdf/pdf-2.pdf')">Show PDF 2</button>
 </template>
</mt-popup>
```

