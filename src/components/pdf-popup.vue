<template>
  <div class="PDF-section">
    <div class="close-PDF-section" @click="_closePdf"></div>

    <div class="PDF-container">
      <object :data="instrPath" type="application/pdf" width="100%" height="100%"></object>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pdf-popup",
    props: {
      instrPath: {
        type: String,
        required: true,
        validator: (value) => {
          return /\.pdf$/.test(value)
        },
      },
      closePdf: {
        type: Function,
      },
    },
    methods: {
      _closePdf() {
        if (this.closePdf) {
          this.closePdf();
        } else {
          this.$store.commit('mi-touch/POPUP_HIDE')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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
      margin: 0 auto;
      width: 80%;
      height: 100%;
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
