
const contentControl = {

    // menu content control
    data() {
        return {
            content_prevItem: {},
            content_currentItem: {},
            content_nextItem: {},
            content_parentStack: [],
        };
    },

    // menu content s
    methods: {
        content_setNextItem(targetItem) {
            this.content_nextItem = targetItem;
        },
        content_setPrevItem() {
            this.content_prevItem = this.content_parentStack[this.content_parentStack.length - 1]; // the prev content is the parent of the current item.
        },
        content_homingItemAfterNext() { // reset item after panel homing
            this.content_prevItem = this.content_currentItem;
            this.content_currentItem = this.content_nextItem;
            this.content_nextItem = {};
        },
        content_homingItemAfterBack() {
            this.content_parentStack.pop(); // update parent stack
            this.content_currentItem = this.content_prevItem;
            this.content_nextItem = {};
        },
        content_pushCurrentToParentStack(item) {
            const parent = this.content_currentItem;
            this.content_parentStack.push(parent);
        },
    },
};

export default contentControl;
