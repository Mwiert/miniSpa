<template>
    <div class="ui-date-range-picker-c"> 
        {{ selectedDate }}  
        <div class="button" @click="toggleCalendar">{{ closeCalendar ? "Aç" : selectedDate }}</div>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';

export default {
    name: 'UIDateRangePicker',
    props: {
        selectedDate: { type: String, default: dayjs().format('YYYY-MM-DD') },
    },
    data() {
        return {
            closeCalendar: false
        };
    },
    methods: {
        toggleCalendar() {
            this.closeCalendar = !this.closeCalendar;
            this.$emit('closeCalendar', this.closeCalendar);
        },
    }
};
</script>

<style lang="scss" scoped>
.ui-date-range-picker-c {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: center;
    text-align: center;
    padding: 1rem;

    .button {
        border: 1px solid black;
        background: #f1f1f1;
        color: black !important;
        width: 100px;
        color: white;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin-right: 9rem;
        padding: 10px;
        cursor: pointer;
        border-radius: 12px;
    }
}
</style>
