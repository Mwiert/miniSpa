<template>
    <div class="resitech-checkbox-c" :class="[after ? 'after' : 'before', disabled ? 'disabled' : '']" :id="checkboxId"
        :name="name" @click="handleClick">
        <div v-if="!checkboxChecked" class="checkbox" :class="checkboxClassName"></div>
        <div v-else class="checkbox--checked" :class="checkboxClassName">
            <SvgIcon :size="'s'" class="icon" />
        </div>
        <div class="label">{{ checkboxLabel }}</div>
    </div>
</template>

<script>
export default {
    name: 'UICheckBox',
    props: {
        className: String,
        id: String,
        label: String,
        after: {
            type: Boolean,
            default: false
        },
        name: String,
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            checkboxClassName: this.className,
            checkboxLabel: this.label,
            checkboxId: this.id,
            checkboxChecked: this.checked,
            checkboxName: this.name
        };
    },
    methods: {
        handleClick() {
            if (!this.disabled) {
                this.checkboxChecked = !this.checkboxChecked
                this.$emit('takeCheckedInfo', this.checkboxChecked);
            }


        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/main.scss";
$flight-color: #5CB7F9;

.resitech-checkbox-c {
    display: flex;
    align-items: center;
    user-select: none;
    margin-bottom: 8px;
    cursor: pointer;

    &.before {
        flex-direction: row;
    }

    &.after {
        flex-direction: row-reverse;

        .checkbox {
            margin-right: 0;
            margin-left: 8px;

            &--checked {
                margin-right: 0;
                margin-left: 8px;
            }
        }
    }

    .checkbox {
        width: 20px;
        height: 20px;
        border: 2px solid #CACACA;
        margin-right: 8px;
        transition: background-color 0.2s;


        &--checked {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            transition: background-color 0.2s;
            position: relative;

            &.hotel {
                border: 2px solid $secondary-color;
            }

            &.flight {
                border: 2px solid $flight-color;
                filter: invert(65%) sepia(91%) saturate(3419%) hue-rotate(185deg) brightness(96%) contrast(97%);
            }

            .icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 0;
            }
        }
    }

    .label {
        color: #363636;
        font-size: 16px;
    }

    &.disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

}
</style>
