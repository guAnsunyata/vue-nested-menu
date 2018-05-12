<template>
	<div class="Nav">
	    <div @click="clickBurger" class="Nav__burger">
	        <MenuIcon />
	    </div>

        <Shadow :isActive="isActive" :handleShadowClicked="clickShadow"></Shadow>

	    <div class="Nav__panel-wrapper" :class="{'isActive': isActive}">

	        <!-- prev -->
	        <div class="Nav__panel"
                :class="[prevPositionClass, {'translating': isTranslating }]"
	            ref="prev"
	        >
	            <div v-if="prevItem.title" class="Nav__header"> <span v-show="prevItemHasParent" class="arrow">
	                	<LeftArrowIcon />
	                </span>
	                {{ prevItem.title }}
	            </div>

	            <ul class="Nav__list">
	                <li v-for="item in prevItem.children"
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
	            :class="[stagingPositionClass, {'translating': isTranslating }]"
	            ref="staging"
	        >
	            <div v-if="currentItem.title" @click="clickItemBack()" class="Nav__header">
	                <span v-show="currentItemHasParent" class="arrow">
	                	<LeftArrowIcon />
	                </span>
	                {{ currentItem.title }}
	            </div>

	            <ul class="Nav__list">
	                <li v-for="item in currentItem.children"
	                    @click="clickItem(item)"
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
                :class="[nextPositionClass, {'translating': isTranslating }]"
	            ref="next"
	        >
	            <div v-if="nextItem" class="Nav__header">
	                <span class="arrow">
	                	<LeftArrowIcon />
	                </span>
	                {{ nextItem.title }}
	            </div>

	            <ul class="Nav__list">
	                <li v-for="item in nextItem.children"
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

export default {
    components: {
        MenuIcon,
        RightArrowIcon,
        LeftArrowIcon,
        Shadow,
    },
    data() {
        return {
            data: demoData,
            isActive: false,

            // config
            panelWidth: 300,
            isTranslating: false,

            // menu state
            prevItem: {},
            currentItem: {},
            nextItem: {},
            parentStack: [],

            // panel position control
            prevPositionClass: 'prev',
            stagingPositionClass: 'staging',
            nextPositionClass: 'next',
        };
    },
    mounted() {
        this.currentItem = this.data;
    },
    computed: {
        currentItemHasParent() {
            return this.parentStack.length >= 1;
        },
        prevItemHasParent() {
            return this.parentStack.length >= 2;
        },
    },
    methods: {
    	clickBurger() {
    		this.isActive = !this.isActive;
    	},
        clickShadow() {
            this.isActive = false;
        },
        clickItem(targetItem) {

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
        // slide menu
        clickItemBack() {

            if (this.isTranslating || !this.currentItemHasParent) {
                return;
            }

            this.slideToPrev();
        },

        // handle panel and item
        slideToNext(targetItem) {

            // set target item as content of next panel
            this.setNextItem(targetItem);

            // switch animation on
            this.setTranslating(true);

            // activate panel sliding with animation after `.translating` class has updated to panel dom.
            this.$nextTick(() => {
                this.slidePanelNext();
            });

            // reset panel position
            this.homingAfterTranslatingNext();
        },
        slideToPrev() {

            // set prev item which is the parent of the current item.
            this.setPrevItem();

            // switch animation on
            this.setTranslating(true);

            // activate panel sliding with animation after `.translating` class has updated to panel dom.
            this.$nextTick(() => {
                this.slidePanelBack();
            });

            // reset panel position
            this.homingAfterTranslatingBack();
        },
        homingAfterTranslatingNext() {
            setTimeout(() => {

                // switch off transition state of panel
                this.setTranslating(false);

                // push current to parent stack
                this.pushCurrentToParentStack();

                // homing
                this.homingPanelPosition(); // reset panel position just like the beginning.
                this.homingItemAfterNext(); // change item between these panels to meet updated panel position.
            }, 300);
        },
        homingAfterTranslatingBack() {
            setTimeout(() => {
                this.setTranslating(false);

                // homing
                this.homingPanelPosition();
                this.homingItemAfterBack();
            }, 300);
        },

        // menu content controls
        setNextItem(targetItem) {
            this.nextItem = targetItem;
        },
        setPrevItem() {
            this.prevItem = this.parentStack[this.parentStack.length - 1]; // the prev content is the parent of the current item.
        },
        homingItemAfterNext() { // reset item after panel homing
            this.prevItem = this.currentItem;
            this.currentItem = this.nextItem;
            this.nextItem = [];
        },
        homingItemAfterBack() {
            this.parentStack.pop(); // update parent stack
            this.currentItem = this.prevItem;
            this.nextItem = [];
        },
        pushCurrentToParentStack(item) {
            const parent = this.currentItem;
            this.parentStack.push(parent);
        },

        // panel position controls
        slidePanelNext() {
            this.stagingPositionClass = 'prev';
            this.nextPositionClass = 'staging';
        },
        slidePanelBack() {
            this.stagingPositionClass = 'next';
            this.prevPositionClass = 'staging';
        },
        homingPanelPosition() {
            this.prevPositionClass = 'prev';
            this.nextPositionClass = 'next';
            this.stagingPositionClass = 'staging';
        },

        // utils
        setTranslating(status) {
            this.isTranslating = status;
        },
    },
};
</script>

<style lang="scss" scoped>

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

$panel-width: 300px;

.Nav__panel-wrapper {
    overflow: hidden;
    width: $panel-width;
    position: absolute;
    top: 0;
    left: -$panel-width;
    z-index: 99999;
    height: 100vh;
    transition: left .35s;

    &.isActive {
        left: 0;
    }
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