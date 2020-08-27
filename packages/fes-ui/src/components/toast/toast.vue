<template>
    <div class="ui-toast-parent">
        <div :class="'ui-toast-' + type" class="ui-toast">
            <Icon v-if="getType" :type="getType" />
            <span>{{message}}</span>
        </div>
    </div>
</template>
<script>
import Icon from '../icon';

export default {
    name: 'Toast',
    components: {
        Icon
    },
    props: {
        message: {
            type: [String, Number],
            default: undefined
        },
        type: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            icons: {
                info: 'md-information-circle',
                warn: 'md-alert',
                error: 'md-close-circle',
                success: 'md-checkmark-circle'
            }
        };
    },
    computed: {
        getType() {
            if (this.type) {
                return this.icons[this.type];
            }
            return '';
        }
    }
};
</script>
