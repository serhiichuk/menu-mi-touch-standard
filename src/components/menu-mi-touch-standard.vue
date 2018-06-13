<template>
    <section id="menu-mi-touch">
        <!-- Home btn -->
        <div class="navigation-link btn-main-slide" @touchend="navigateTo(mainSlide.id)">

            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 29 31.2" xml:space="preserve">
				<polyline points="0.4,15.1 14.4,0.7 28.7,14.6 	"/>
				<rect x="8.7" y="15.1" width="11.1" height="15.6"/>
				<polyline points="26.4,12.4 26.4,30.7 2.5,30.7 2.5,12.9"/>
			</svg>

        </div>

        <!-- Slides Links -->
        <div class="top-wrapper">
            <swiper :options="swiperOption" class="slides">
                <swiper-slide v-for="(sl, i) in structure" v-html="sl.id + '--' + i * 100" :key="sl.id"/>
            </swiper>
        </div>

        <!-- Flow Links -->
        <div class="bottom-wrapper">
            <swiper :options="swiperOption" class="flow">
                <swiper-slide v-for="sl in structure" v-html="sl.id" :key="sl.id"/>
            </swiper>
        </div>

        <!-- Popup buttons section -->
        <div class="menu-right-section">

            <!--  Refferences button -->
            <div class="popup-link references"
                 data-prevent-tap="true">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px" width="34px" height="34px"
                    viewBox="0 0 34 34"
                    xml:space="preserve">

                    <g class="menu-icon-svg references-svg">
                        <circle cx="16.75" cy="16.75" r="16.25"/>
                        <polygon points="20.75,8.125 9.375,8.125 9.375,25.375 24.125,25.375
                            24.125,11.5"/>
                        <polyline points="20.75,8.125 20.75,11.75 24.125,11.75"/>
                        <line x1="12.25" y1="22.75" x2="21.25" y2="22.75"/>
                        <line x1="12.25" y1="18.75" x2="21.25" y2="18.75"/>
                        <line x1="12.25" y1="14.75" x2="21.25" y2="14.75"/>
                        <line x1="12.25" y1="10.75" x2="21.25" y2="10.75"/>
                    </g>
                </svg>
            </div>


            <!--  Research design button -->
            <div class="popup-link research-design"
                 data-prevent-tap="true">
                <svg
                     xmlns="http://www.w3.org/2000/svg"
                     x="0px" y="0px" width="34px" height="34px"
                     viewBox="0 0 34 34"
                     xml:space="preserve">

                    <g class="menu-icon-svg research-design">
                        <circle cx="16.75" cy="16.75" r="16.25"/>
                        <polygon points="26.25,24.782 16.75,24.782
                            7.25,24.782 7.25,9.407 16.75,9.407 26.25,9.407"/>
                        <line x1="16.75" y1="9.407" x2="16.75" y2="24.782"/>
                        <polygon points="12.936,13.75 11.436,14.75
                            9.936,13.75 9.936,9.583 12.936,9.583"/>
                    </g>
                </svg>
            </div>

            <!--  Instruction button -->
            <div class="instructions"
                 data-prevent-tap="true">
                <svg
                     xmlns="http://www.w3.org/2000/svg"
                     x="0px" y="0px" width="34px" height="34px"
                     viewBox="0 0 34 34"
                     xml:space="preserve">

                    <g class="menu-icon-svg instruction-svg">
                        <circle cx="16.75" cy="16.75" r="16.25"/>
                        <rect x="9.375" y="7.896" width="14.75" height="17.708"/>
                        <line x1="12.25" y1="22.688" x2="21.25" y2="22.688"/>
                        <line x1="12.25" y1="19.688" x2="21.25" y2="19.688"/>
                        <line x1="12.25" y1="16.688" x2="21.25" y2="16.688"/>
                        <line x1="14.5" y1="12.188" x2="19" y2="12.188"/>
                        <line x1="16.75" y1="14.563" x2="16.75" y2="10.063"/>
                    </g>
                </svg>
            </div>

            <!-- FAQ button -->
            <div id="FAQ-btn"
                 data-prevent-tap="true">
                <svg
                     xmlns="http://www.w3.org/2000/svg"
                     x="0px" y="0px" width="34px" height="34px"
                     viewBox="0 0 34 34"
                     xml:space="preserve">

                    <g class="menu-icon-svg">
                        <circle cx="16.75" cy="16.75" r="16.25"/>
                        <path clip-path="url(#SVGID_2_)" fill="#FFFFFF" d="M12.069,13.929c0-0.768,0.109-1.469,0.326-2.1
                            c0.218-0.632,0.541-1.169,0.969-1.612c0.428-0.443,0.947-0.788,1.557-1.034c0.61-0.247,1.306-0.37,2.091-0.37
                            c0.609,0,1.179,0.09,1.709,0.272c0.53,0.181,0.998,0.446,1.404,0.795c0.407,0.348,0.726,0.769,0.958,1.262
                            c0.233,0.494,0.348,1.06,0.348,1.698c0,0.814-0.177,1.503-0.533,2.07c-0.356,0.565-0.809,1.11-1.361,1.633
                            c-0.45,0.45-0.809,0.801-1.078,1.055c-0.268,0.254-0.467,0.505-0.598,0.752c-0.131,0.246-0.218,0.548-0.262,0.904
                            c-0.043,0.355-0.072,0.867-0.087,1.535H16.14c-0.014-0.668,0.022-1.227,0.109-1.677s0.229-0.856,0.425-1.22
                            c0.196-0.362,0.457-0.711,0.784-1.045s0.722-0.711,1.186-1.132c0.407-0.377,0.745-0.798,1.013-1.263
                            c0.269-0.464,0.403-0.98,0.403-1.546c0-0.436-0.084-0.834-0.251-1.197c-0.167-0.364-0.392-0.671-0.674-0.926
                            c-0.284-0.254-0.614-0.453-0.991-0.599c-0.378-0.144-0.777-0.218-1.198-0.218c-0.58,0-1.096,0.102-1.546,0.305
                            c-0.45,0.204-0.82,0.484-1.11,0.839c-0.291,0.355-0.508,0.772-0.653,1.252c-0.145,0.478-0.211,1.002-0.197,1.567H12.069z
                             M15.923,22.379h1.829v2.308h-1.829V22.379z"/>
                    </g>
                </svg>
            </div>

        </div>

    </section>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "menu-mi-touch-standard",
        props: {
            structure: {
                type: Array,
                default() {
                    return this.$store.getters.structure
                }
            },
            mainSlide: {
                type: Object,
                default() {
                    return this.$store.getters.structure[0]
                }
            },
            currentSlide: {
                type: Object,
                default() {
                    return this.$store.state.currentSlide
                }
            }
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    spaceBetween: 0,
                    threshold: 50
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        mounted() {
            this.$nextTick(() => {
                document.querySelectorAll('.swiper-container').forEach(el => {
                    console.log(el);
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    /*** Menu ***/
    $menu_height: 60px;
    $menu_icons_color: #fff;
    $menu_border_radius: 35px;
    $menu_home_bg: #7d7d7d;
    $menu_right_section_bg: #7d7d7d;

    //menu slide links (top menu)
    $menu_links_slide_height: 20px;
    $menu_links_slide_bg_color: #b7c1c6;
    $menu_links_slide_border_color: #444445;

    $menu_links_slide_font_size: 12px;
    $menu_links_slide_color: #8f8f8f;

    $menu_links_slide_font_active: 'DiariaSansPro-Medium', sans-serif;
    $menu_links_slide_color_active: #484848;

    // menu flow links (bottom menu)
    $menu_links_flow_height: 40px;
    $menu_links_flow_bg_color: #dbe1e4;
    $menu_links_flow_border_color: #6b7171;

    $menu_links_flow_font_size: 14px;
    $menu_links_flow_color: #8f8f8f;

    $menu_links_flow_font_active: 'DiariaSansPro-Medium', sans-serif;
    $menu_links_flow_color_active: #3f4444;

    #menu-mi-touch {
        position: absolute;
        bottom: 0;
        left: 0;

        height: $menu_height;
        width: 100%;
    }

    .btn-main-slide {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 85px;
        height: $menu_height;

        background: $menu_home_bg;
        border-top-right-radius: $menu_border_radius;

        svg {
            width: 30px;
            height: auto;

            fill: none;
            stroke: #fff;

            transition: transform 0.1s cubic-bezier(0.04, -0.85, 0.92, 1.92);

            &:active {
                transform: scale(0.8);
            }
        }
    }

    .top-wrapper, .bottom-wrapper {
        position: absolute;
        left: 0;

        width: 100%;
    }

    .top-wrapper {
        height: $menu_links_slide_height;
        top: 0;
        background-color: $menu_links_slide_bg_color;
        //box-shadow: 0 5px 10px -8px rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .bottom-wrapper {
        height: $menu_links_flow_height;
        top: $menu_links_slide_height;
        background-color: $menu_links_flow_bg_color;
    }

    .slides, .flow {
        height: 100%;
        width: 900px;

        position: absolute;
        top: 0;
        left: 60px;

        overflow: hidden;

        .swiper-wrapper {
            height: 100%;
            width: 500%;

            display: flex;
            align-items: center;
            will-change: thansform;

            .swiper-slide {
                padding: 0 20px;
                margin: 0;
                width: auto;

                line-height: 1;

                &:first-child {
                    margin-left: 40px;
                }
                &:last-child {
                    border: none;
                    margin-right: 65px;
                }
            }
        }
    }

    .slides {
        .swiper-wrapper {
            .swiper-slide {
                font-size: $menu_links_slide_font_size;
                color: $menu_links_slide_color;
                border-right: solid 1px $menu_links_slide_border_color;

                // Active for slides
                &:active, &.active {
                    font-family: $menu_links_slide_font_active;
                    color: $menu_links_slide_color_active;
                }

            }
        }
    }

    .flow {
        height: $menu_links_flow_height / 2;
        top: $menu_links_flow_height / 4;

        .swiper-wrapper {
            .swiper-slide {
                font-size: $menu_links_flow_font_size;
                color: $menu_links_flow_color;
                border-right: solid 1px $menu_links_flow_border_color;

                // Active for flows
                &:active, &.active {
                    font-family: $menu_links_flow_font_active;
                    color: $menu_links_flow_color_active;
                }
            }
        }
    }

    // Menu right section
    .menu-right-section {
        height: 100%;
        padding-left: 20px;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        top: 0;
        right: 0;
        z-index: 2;
        position: absolute;

        border-top-left-radius: $menu_border_radius;
        background: $menu_right_section_bg;

        &:after {
            content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAAeCAYAAAD3hVYMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1NDdEMzU1NkYxODExRTg4OUE3RkEzMzI2REU1RkI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1NDdEMzU2NkYxODExRTg4OUE3RkEzMzI2REU1RkI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU0N0QzNTM2RjE4MTFFODg5QTdGQTMzMjZERTVGQjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU0N0QzNTQ2RjE4MTFFODg5QTdGQTMzMjZERTVGQjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7QsS+wAAAHX0lEQVR42uyb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');
            margin: 0 30px;
        }

        .disabled {
            opacity: .5;
            pointer-events: none;
        }

        // references, research-design and other button in right section
        div {
            margin: auto 5px;
            width: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: transform 0.1s cubic-bezier(0.04, -0.85, 0.92, 1.92);

            &.active, &:active {
                transform: scale(0.8);
            }

            svg {
                fill: none;
                stroke: #fff;
            }
        }
    }

</style>
