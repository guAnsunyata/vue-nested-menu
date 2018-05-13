<template>
	<div class="Menu">

        <MenuBurger :handleBurgerClicked="clickBurger" />

        <MenuShadow :isActive="isActive" :handleShadowClicked="clickShadow" />

	    <div class="Menu__panel-wrapper"
            :class="{'isActive': isActive}"
            :style="[style_wrapperStyle, isActive ? style_wrapperActiveStyle : {}]"
        >

	        <!-- prev -->
            <MenuPanel
                :list="content_prevItem"
                :functionalityStyle="style_panelStyle"
                :positionStyle="panel_prevPositionStyle"
                :isTranslating="isTranslating"
                :transitionStyle="style_transitionStyle"
                :showHeaderArrow="prevItemHasParent"
            />

	        <!-- staging -->
            <MenuPanel
                :list="content_currentItem"
                :functionalityStyle="style_panelStyle"
                :positionStyle="panel_stagingPositionStyle"
                :isTranslating="isTranslating"
                :transitionStyle="style_transitionStyle"
                :showHeaderArrow="currentItemHasParent"
                :handleHeaderClicked="clickPrevItem"
                :handleItemClicked="clickNextItem"
            />

            <!-- next -->
            <MenuPanel
                :list="content_nextItem"
                :functionalityStyle="style_panelStyle"
                :positionStyle="panel_nextPositionStyle"
                :isTranslating="isTranslating"
                :transitionStyle="style_transitionStyle"
                :showHeaderArrow="true"
            />
	    </div>
	</div>
</template>

<script>
import demoData from './demo-data.js';

import functionalityStyle from './mixins/functionalityStyle.mixin';
import panelControl from './mixins/panelControl.mixin';
import contentControl from './mixins/contentControl.mixin';

import RightArrowIcon from './icons/RightArrowIcon.vue';
import LeftArrowIcon from './icons/LeftArrowIcon.vue';
import MenuBurger from './components/MenuBurger.vue';
import MenuShadow from './components/MenuShadow.vue';
import MenuPanel from './components/MenuPanel.vue';

export default {
    mixins: [
        functionalityStyle,
        panelControl,
        contentControl,
    ],
    components: {
        RightArrowIcon,
        LeftArrowIcon,
        MenuBurger,
        MenuShadow,
        MenuPanel,
    },
    props: {
        panelWidth: {
            type: Number,
            default: 300,
        },
        menuOpenSpeed: {
            type: Number,
            default: 350,
        },
        menuSwitchSpeed: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            data: demoData,
            isActive: false,
            isTranslating: false,
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
            }, this.menuSwitchSpeed);
        },
        homingAfterTranslatingBack() {
            setTimeout(() => {
                this.setTranslating(false);

                // homing
                this.panel_homingPosition();
                this.content_homingItemAfterBack();
            }, this.menuSwitchSpeed);
        },

        // utils
        setTranslating(status) {
            this.isTranslating = status;
        },
    },
};
</script>
