<template>
	<div class="Nav">
	    <div @click="clickBurger" class="Nav__burger">
	        <MenuIcon />
	    </div>

        <Shadow :isActive="isActive" :handleShadowClicked="clickShadow"></Shadow>

	    <div class="Nav__panel-wrapper" :class="{'isActive': isActive}">

	        <!-- prev -->
	        <div class="Nav__panel prev"
	            :class="{'translating': isTranslating}"
	            ref="prev"
	        >
	            <div v-if="prevItem.title" class="Nav__header">
	                <span v-show="prevItemHasParent" class="arrow">
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
	            :class="{'translating': isTranslating}"
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
	        <div class="Nav__panel next"
	            :class="{'translating': isTranslating}"
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

            // menu state
            prevItem: {},
            currentItem: {},
            nextItem: {},

            parentStack: [],

            // config
            panelWidth: 300,
            isTranslating: false,
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
    	// burger
    	clickBurger() {
    		this.isActive = !this.isActive;
    	},
        clickShadow() {
            this.isActive = false;
        },

    	// slide menu
        clickItem(targetItem) {

            // go to link
            if (targetItem.children.length <= 0) {
                // ...
                return;
            }

            if (this.isTranslating) {
                return;
            }

            // change data
            this.nextItem = targetItem;

            // animate
            this.setTranslating(true);

            this.$nextTick(() => {

                this.slideNext();

                setTimeout(() => {
                    this.setTranslating(false);

                    // push current to parent stack
                    const parent = this.currentItem;
                    this.parentStack.push(parent);

                    // reset
                    this.prevItem = this.currentItem;
                    this.currentItem = this.nextItem;
                    this.nextItem = [];
                    this.resetPosition();
                }, 300);
            });
        },
        clickItemBack() {

            if (this.isTranslating || !this.currentItemHasParent) {
                return;
            }

            // change data
            this.prevItem = this.parentStack[this.parentStack.length - 1];
            // animate
            this.setTranslating(true);

            this.$nextTick(() => {

                this.slideBack();

                setTimeout(() => {
                    this.setTranslating(false);

                    // reset
                    this.parentStack.pop(); //
                    this.currentItem = this.prevItem;
                    this.nextItem = [];
                    this.resetPosition();
                }, 300);
            });
        },

        // next & back
        slideNext() {
            const stagingElemnt = this.$refs.staging;
            Object.assign(stagingElemnt.style, {
                left: `-${this.panelWidth}px`,
            });

            const nextElement = this.$refs.next;
            Object.assign(nextElement.style, {
                left: `0px`,
            });
        },
        slideBack() {
            const stagingElemnt = this.$refs.staging;
            Object.assign(stagingElemnt.style, {
                left: `${this.panelWidth}px`,
            });

            const prevElement = this.$refs.prev;
            Object.assign(prevElement.style, {
                left: `0px`,
            });
        },
        resetPosition() {
            const stagingElemnt = this.$refs.staging;
            Object.assign(stagingElemnt.style, {
                left: `0px`,
            });

            const nextElement = this.$refs.next;
            Object.assign(nextElement.style, {
                left: `${this.panelWidth}px`,
            });

            const prevElement = this.$refs.prev;
            Object.assign(prevElement.style, {
                left: `-${this.panelWidth}px`,
            });
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
    left: 0;
    z-index: 99999;
    height: 100vh;
    width: $panel-width;
    background-color: #fff;

    &.translating {
        transition: left .3s;
    }

    &.prev {
        left: -$panel-width;
    }

    &.next {
        left: $panel-width;
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
