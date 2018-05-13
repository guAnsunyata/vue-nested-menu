<template>
    <div>
        <Menu :list="list" />
    </div>
</template>

<script>
import Menu from 'vue-nested-menu/vue-nested-menu.vue';

export default {
    components: {
        Menu,
    },
    data() {
        return {
            list: [
                // ...
            ],
        };
    },
};
</script>
