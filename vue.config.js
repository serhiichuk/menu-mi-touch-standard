module.exports = {
  productionSourceMap: false,

  css: {
    extract: false
  },

  chainWebpack: config => {
    // Replace SVG loader
    const svgRule = config.module.rule('svg');
    svgRule
      .uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
};
