<template>
    <transition name="vmenu-fade">
        <div v-if="isActive" @click="handleShadowClicked" class="vmenu-shadow"></div>
    </transition>
</template>

<script>

export default {
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
        handleShadowClicked: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped>

.vmenu-shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    opacity: 0.5;
    z-index: 99997;
}

.vmenu-fade-enter-active, .vmenu-fade-leave-active {
    transition: opacity .5s;
}

.vmenu-fade-enter, .vmenu-fade-leave-to {
    opacity: 0;
}
</style>
