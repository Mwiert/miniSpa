<template>
    <div class="menu-dropdown-c">
        <slot :childClick="childClick"></slot>
    </div>
</template>

<script>
    export default {
        name: "MenuDropdown",
        methods: {
            childClick() {
                window.alert('child click')
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>