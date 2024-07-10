<template>
    <div class="ui-date-range-picker-c">   
        <button @click="toggleCalendar()" class="button">fdsjfdshnsfj</button>
    </div>
</template>

<script>

export default {
    name: 'UIDateRangePicker',
    data() {
        return {
            closeCalendar: false
        }
    },
    methods: {
        toggleCalendar(){
            this.closeCalendar = !this.closeCalendar
            console.log(this.closeCalendar)
            this.$emit('closeCalendar', this.closeCalendar)
        }
    }
}
</script>

<style lang="scss" scoped>

.ui-date-picker-c {
    padding: 410px;
}

</style>


