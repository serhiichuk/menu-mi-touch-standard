# vue-clm-helper-mi-touch

**Status: beta** 

**:baby_chick: Vue plugin for Vue CLI plugin [CLM Helper](https://github.com/serhiichuk/vue-cli-plugin-clm-helper)**

**Extend Vuex Store and include basic components for MI Touch Presentations**

## Table of contents

- [Usage](#usage)
- [Store Extending](#store-extending)
- [Registered components](#registered-components)
  - [mt-menu](#mt-menu)
    - [props](#props-(mt-menu))
  - [mt-popup](#mt-popup)
    - [props](#props-(mt-popup))

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

Plugin register components [mt-menu](#mt-menu) and [mt-popup](#mt-popup) globally.

For using components, just [include](#usage) it in template.

### mt-menu

**MI Touch menu component with basic functional and styles.**

Basically, you don't need pass any props, it automatic find `current slide`, `main slide`, `current flow` and `popup text data`.

But, in some cases you can pass following props:

#### Props (mt-menu)
Prop | Type | Default | Description
  --- | --- | --- |---
  mainSlide | Object | First slide in [structure](#https://github.com/serhiichuk/vue-cli-plugin-clm-helper#structure) | Object with following keys: `id`, `path`, `name`.
  currentSlide | Object | `this.$store.state.currentSlide` | Object with following keys: `id`, `path`, `name`.
  slides | Array | - | Filtered slides from current flow name, will rendering in top list in menu. 
  flows | Array | - | Filtered slides from each first slide in each flow, will rendering in bottom list in menu. 

### mt-popup 

#### Props (mt-popup)