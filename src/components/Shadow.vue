<template>
    <transition name="fade">
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

<style>

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

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
