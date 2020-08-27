import Vue from 'vue';
import zoom from './zoom.vue';
import * as util from '../../utils/util.js';

function create(parent, zoomOption) {
    const zoomComponent = new Vue({
        name: 'ZoomContainer',
        components: {
            zoom
        },
        data() {
            const defaultOption = {
                show: true,
                src: undefined,
                minWidth: undefined,
                maxWidth: undefined
            };
            return util.merge(defaultOption, zoomOption || {});
        },
        created() {
            this.$on('on-close', this.close);
        },
        beforeDestroy() {
            this.$off('on-close');
        },
        methods: {
            close() {
                this.show = false;
            }
        },
        render(h) {
            return h('zoom', {
                style: {
                    display: !this.show ? 'none' : 'block'
                },
                props: {
                    src: this.src,
                    minWidth: this.minWidth,
                    maxWidth: this.maxWidth
                }
            });
        }
    });
    const component = zoomComponent.$mount();
    document.body.appendChild(component.$el);
    return zoomComponent;
}

function trigger() {
    if (!this.component) {
        this.component = create(this, this.option);
    } else {
        this.component.show = true;
    }
}

const cache = {};
export default {
    inserted(el, binding) {
        const self = cache[el] = {};
        if (util.typeOf(binding.value) == 'object') {
            self.option = binding.value;
        } else {
            self.option = {
                src: el.src
            };
        }
        el.addEventListener('click', trigger.bind(self), false);
    },
    unbind(el) {
        const self = cache[el];
        el.removeEventListener('click', trigger.bind(self));
    }
};
