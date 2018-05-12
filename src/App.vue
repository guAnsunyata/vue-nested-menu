<template>
	<div class="Nav">
	    <div @click="clickBurger" class="Nav__burger">
	        <MenuIcon />
	    </div>

        <Shadow :isActive="isActive" :handleShadowClicked="clickShadow"></Shadow>

	    <div class="Nav__panel-wrapper"
            :class="{'isActive': isActive}"
            :style="[wrapperStyle, isActive ? wrapperActiveStyle : {}]"
        >

	        <!-- prev -->
	        <div class="Nav__panel"
                :class="{'translating': isTranslating }"
                :style="[panelStyle, panel_prevPositionStyle]"
	            ref="prev"
	        >
	            <div v-if="content_prevItem.title" class="Nav__header"> <span v-show="prevItemHasParent" class="arrow">
	                	<LeftArrowIcon />
	                </span>
	                {{ content_prevItem.title }}
	            </div>

	            <ul class="Nav__list">
	                <li v-for="item in content_prevItem.children"
	                    class="Nav__item"
	                >
	                    <div class="text">{{ item.title }}</div>
	                    <span v-show="item.children.length > 0" class="arrow">
	                    	<RightArrowIcon />
	                    </span>
	                </li>
	            </ul>
	        </div>

	        <!-- staging -->
	        <div class="Nav__panel"
	            :class="{'translating': isTranslating }"
                :style="[panelStyle, panel_stagingPositionStyle]"
	            ref="staging"
	        >
	            <div v-if="content_currentItem.title" @click="clickPrevItem()" class="Nav__header">
	                <span v-show="currentItemHasParent" class="arrow">
	                	<LeftArrowIcon />
	                </span>
	                {{ content_currentItem.title }}
	            </div>

	            <ul class="Nav__list">
	                <li v-for="item in content_currentItem.children"
	                    @click="clickNextItem(item)"
	                    class="Nav__item"
	                >
	                    <div class="text">{{ item.title }}</div>
	                    <span v-show="item.children.length > 0" class="arrow">
	                    	<RightArrowIcon />
	                    </span>
	                </li>
	            </ul>
	        </div>

	        <!-- next -->
	        <div class="Nav__panel"
                :class="{'translating': isTranslating }"
                :style="[panelStyle, panel_nextPositionStyle]"
	            ref="next"
	        >
	            <div v-if="content_nextItem" class="Nav__header">
	                <span class="arrow">
	                	<LeftArrowIcon />
	                </span>
	                {{ content_nextItem.title }}
	            </div>

	            <ul class="Nav__list">
	                <li v-for="item in content_nextItem.children"
	                    class="Nav__item"
	                >
	                    <div class="text">{{ item.title }}</div>
	                    <span v-show="item.children.length > 0" class="arrow">
	                    	<RightArrowIcon />
	                    </span>
	                </li>
	            </ul>
	        </div>

	    </div>
	</div>
</template>

<script>
import demoData from './demo-data.js';

import MenuIcon from './icons/MenuIcon';
import RightArrowIcon from './icons/RightArrowIcon';
import LeftArrowIcon from './icons/LeftArrowIcon';
import Shadow from './components/Shadow';

import panelControl from './mixins/panelControl';
import contentControl from './mixins/contentControl';

// user config
const PANEL_WIDTH = 300;
const SLIDE_DURATION = 3500;

const transitionSecond = `.${SLIDE_DURATION / 100}s`;

const wrapperStyle = {
    width: `${PANEL_WIDTH}px`,
    position: `absolute`,
    top: 0,
    left: `-${PANEL_WIDTH}px`,
    zIndex: 99999,
    height: `100vh`,
    overflow: `hidden`,
    transition: `left ${transitionSecond}`,
};

const wrapperActiveStyle = {
    left: 0,
};

const panelStyle = {
    position: `absolute`,
    top: 0,
    zIndex: 99999,
    height: `100vh`,
    width: `${PANEL_WIDTH}px`,
    backgroundColor: `#fff`,
};

export default {
    mixins: [
        panelControl,
        contentControl,
    ],
    components: {
        MenuIcon,
        RightArrowIcon,
        LeftArrowIcon,
        Shadow,
    },
    props: {
        panelWidth: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            data: demoData,
            isActive: false,

            // @temp config
            isTranslating: false,

            // @TODO dynacmic width from props
            // style
            wrapperStyle,
            wrapperActiveStyle,
            panelStyle,
        };
    },
    mounted() {
        this.content_currentItem = this.data;
    },
    computed: {
        currentItemHasParent() {
            return this.content_parentStack.length >= 1;
        },
        prevItemHasParent() {
            return this.content_parentStack.length >= 2;
        },
    },
    methods: {
    	clickBurger() {
    		this.isActive = !this.isActive;
    	},
        clickShadow() {
            this.isActive = false;
        },
        clickNextItem(targetItem) {

            if (this.isTranslating) {
                return;
            }

            // go to link
            if (targetItem.children.length <= 0) {
                // ...
                return;
            }

            this.slideToNext(targetItem);
        },
        clickPrevItem() {

            if (this.isTranslating || !this.currentItemHasParent) {
                return;
            }

            this.slideToPrev();
        },

        /*
         * main part of core
         * definite of how to handle panel sliding and item updating
         */
        slideToNext(targetItem) {

            // set target item as content of next panel
            this.content_setNextItem(targetItem);

            // switch animation on
            this.setTranslating(true);

            // activate panel sliding with animation after `.translating` class has updated to panel dom.
            this.$nextTick(() => {
                this.panel_slideNext();
            });

            // reset panel position
            this.homingAfterTranslatingNext();
        },
        slideToPrev() {

            // set prev item which is the parent of the current item.
            this.content_setPrevItem();

            // switch animation on
            this.setTranslating(true);

            // activate panel sliding with animation after `.translating` class has updated to panel dom.
            this.$nextTick(() => {
                this.panel_slideBack();
            });

            // reset panel position
            this.homingAfterTranslatingBack();
        },

        // handle homing after slide animation end
        homingAfterTranslatingNext() {
            setTimeout(() => {

                // switch off transition state of panel
                this.setTranslating(false);

                // push current to parent stack
                this.content_pushCurrentToParentStack();

                // homing
                this.panel_homingPosition(); // reset panel position just like the beginning.
                this.content_homingItemAfterNext(); // change item between these panels to meet updated panel position.
            }, 300);
        },
        homingAfterTranslatingBack() {
            setTimeout(() => {
                this.setTranslating(false);

                // homing
                this.panel_homingPosition();
                this.content_homingItemAfterBack();
            }, 300);
        },

        // utils
        setTranslating(status) {
            this.isTranslating = status;
        },
    },
};
</script>

<style lang="scss" scoped>

// functionality css

$panel-width: 300px;

.Nav__panel-wrapper {
    // overflow: hidden;
    // width: $panel-width;
    // position: absolute;
    // top: 0;
    // left: -$panel-width;
    // z-index: 99999;
    // height: 100vh;
    // transition: left .35s;

    // &.isActive {
    //     left: 0;
    // }
}

.Nav__panel {
    position: absolute;
    top: 0;
    z-index: 99999;
    height: 100vh;
    width: $panel-width;
    background-color: #fff;

    &.staging {
        left: 0;
    }

    &.prev {
        left: -$panel-width;
    }

    &.next {
        left: $panel-width;
    }

    &.translating {
        transition: left .3s;
    }
}

ul, li {
    padding: 0;
    margin: 0;
}

.Nav__burger {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.Nav__header {
    display: flex;
    align-items: center;
    padding-left: 35px;
    height: 50px;
    color: #fff;
    font-size: 16px;
    background-color: #232f3e;
    cursor: pointer;

    .arrow {
        padding-top: 2px;
        fill: #fff;
        margin-right: 10px;
        width: 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
}

.Nav__list {
    list-style: none;
    padding-bottom: 2px;

    .separator {
        border-bottom: 1px solid #d5dbdb;
        padding: 2px 0 0 0;
        margin: 0;
    }
}

.Nav__item {
    padding-left: 35px;
    height: 45px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .arrow {
        padding-top: 2px;
        padding-left: 15px;
        display: flex;
        align-items: center;
        width: 10px;
        height: 100%;
    }
}
</style>
