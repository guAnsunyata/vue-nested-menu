<template>
    <div @click="handleBurgerClicked" class="Menu__burger">
        <MenuIcon />
    </div>
</template>

<script>
import MenuIcon from '../icons/MenuIcon';

export default {
    components: {
        MenuIcon,
    },
    props: {
        handleBurgerClicked: {
            type: Function,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>

.Menu__burger {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>
