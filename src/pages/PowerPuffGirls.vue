<template>
    <div>
        <UIButton className="flight" text="Flight Button" :isSpinnerActive="false" :isDisabled="false" />
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
