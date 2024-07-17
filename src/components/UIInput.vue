<template>

    <div class = "ui-input-c">
        <input
        type="type"
        placeholder="placeholder"
        id="id"
        label="label"
        maxlength="maxLength"
        minlength="minLength"
        :value="value"
        />

    </div>

</template>

<script lang="ts">

export default {
    name: 'UIInput',
    components: {

    },
    props: {
        type: {
            type: Object,
            defult: String
        },
        placeholder: {
            type: String ,
            default: 'Enter...'
        },
        id: {
            type: String,
            default: 'id'
        },
        label: {
            type: String,
            default: 'Input Button'
        },
        maxLength: {
            type: Number,
            default: 50
        },
        minLength: {
            type: Number,
            default: 8
        },
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{
            
        }
    }
}
</script>

<style>
.ui-input-c {
    width: 100px;
    height: 48px;
    border: 0.5rem;
    border-radius: 20%;
    border-color: darkblue;
}



</style>