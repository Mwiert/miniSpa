<template>
    <div class="resitech-checkbox-c" :class="[after ? 'after' : 'before', disabled ? 'disabled' : '']" :id="checkboxId"
        :name="name" @click="handleClick">
        <div v-if="!checkboxChecked" class="checkbox" :class="checkboxClassName"></div>
        <div v-else class="checkbox--checked" :class="checkboxClassName">
            <SvgIcon :name="'tick'" :size="'s'" class="icon" />
        </div>
        <div class="label">{{ checkboxLabel }}</div>
    </div>
</template>

<script>
export default {
    name: 'UICheckBox',
    props: {
        className: {
            type: String,
            default: ''
        },
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
            this.checkboxChecked = !this.checkboxChecked
            this.$emit('takeCheckedInfo', this.checkboxChecked);

        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/main.scss";
$flight-color: #5CB7F9;
$flight-color-filter: invert(68%) sepia(10%) saturate(4826%) hue-rotate(182deg) brightness(99%) contrast(94%);
$hotel-color-filter: invert(66%) sepia(84%) saturate(4705%) hue-rotate(353deg) brightness(101%) contrast(106%);

.resitech-checkbox-c {
    justify-content: center;
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

                .icon {
                    filter: $hotel-color-filter;
                }
            }

            &.flight {
                border: 2px solid $flight-color;

                .icon {
                    filter: $flight-color-filter;
                }
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
        pointer-events: none;
        opacity: 0.6;

    }

}
</style>
