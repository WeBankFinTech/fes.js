import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import Counter from '@/components/Counter.vue';

describe('Counter.vue', () => {
    it('increments count when button is clicked', async () => {
        const wrapper = shallowMount(Counter);
        wrapper.find('button').trigger('click');
        await Vue.nextTick();
        expect(wrapper.find('div').text()).contains('1');
    });
});
