<template>
    <div class="input-box-c">
        <span class="label"> {{ label }} </span>

        <div class="input-wrapper">
            <input 
                :type="type" 
                :placeholder="placeholder" 
                :id="id" 
                :label="label" 
                :maxLength="maxLength"
                :minLength="minLength" 
                :disabled="disabled" 
                v-model="inputValue"
                @input="handleInput"
                />

            <button v-if="inputValue" class="clear-btn" @click="clearInput">
                
                <SvgIcon class="clear-btn" :icon="'x'" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue';



export default {

    name: 'UIInput',
    data(){
        return{
         inputValue:this.value
        };
    },
    props: {
        type: {
            type: String,
            default: 'text'
        },

        placeholder: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        maxLength: {
            type: Number,
            default: null,

        },
        minLength: {
            type: Number,
            default: null,
        },

        value: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {

        updateValue(newValue: String) {
            this.$emit('update:value', newValue);
        },
        handleInput(){
            this.updateValue(this.inputValue);
        },
        clearInput(){
            this.inputValue="";
            this.updateValue("");

        }

    },
    
    

}
</script>


<style lang="scss" scoped> 
@import '@/assets/css/main.scss';


.input-box-c{
display:flex;
flex-direction: column;



.label{
    font-size: 0.5rem;
    font-weight: 200;
    margin-bottom: 0rem;
    color: grey;

}

.input-wrapper{
    display: flex;
    align-items: center;
    position: relative;

    .clear-btn{
       
    position : absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor:pointer;
    width: 12px;
    height: 12px;
    padding: 0;
    // transition: transform 0.3s ease, background 0.3s ease;

    // &:hover {
    //     //  width: 14px;
    //     // height: 14px;

    //     //  transform: scale(1.001);

    //     background: $accent-primary-color;
    //     border-radius: 50%;
       
    //     .icon {
    //       filter: brightness(100) invert(1); // Icon color filter on hover
    //     }

    // }  
    

     
}
}





}

</style>
