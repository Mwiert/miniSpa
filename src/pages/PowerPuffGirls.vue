<template>
    <div class="button-c">
        <UIButton className="flight" text="Flight Button" :isSpinnerActive="false" :isDisabled="false" />
        <UIButton className="hotel" text="Hotel Button" :isSpinnerActive="false" :isDisabled="false" />
        <UIButton className="reisetech-btn" text="Default Button" :isSpinnerActive="false" :isDisabled="false" />
        <UIButton className="flight outline" text="Flight outline" :isSpinnerActive="false" :isDisabled="false" />
        <UIButton className="hotel outline" text="Hotel outline" :isSpinnerActive="false" :isDisabled="false" />
        </div>
</template>

<script lang="ts">
import UIButton from '../components/UIButton.vue'
export default {
    name: 'PowerPuffGirls',
    components: {
        UIButton,
    },
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
    .button-c{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
