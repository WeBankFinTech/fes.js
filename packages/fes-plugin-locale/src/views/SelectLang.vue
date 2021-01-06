<template>
    <a-dropdown>
        <div class="lang-icon"><GlobalOutlined /></div>
        <template #overlay>
            <a-menu :selectedKeys="selectedKeys" @click="handleClick">
                <a-menu-item
                    v-for="(item) in configs"
                    :key="item.lang"
                    class="lang-item"
                >
                    <span class="lang-item-icon">{{item.icon}}</span>
                    <span class="lang-item-label">{{item.label}}</span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script>
import Dropdown from 'ant-design-vue/lib/dropdown';
import Menu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/lib/dropdown/style';
import 'ant-design-vue/lib/menu/style';
import { GlobalOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler';
import { reactive, computed } from 'vue';
import langUConfigMap from '../langUConfigMap';

export default {
    components: {
        [Dropdown.name]: Dropdown,
        [Menu.name]: Menu,
        [Menu.Item.name]: Menu.Item,
        GlobalOutlined
    },
    setup() {
        const { availableLocales, locale } = useI18n();
        const selectedKeys = computed(() => [locale.value]);
        const configs = reactive([]);
        availableLocales.forEach((item) => {
            configs.push(langUConfigMap[item] || {});
        });
        const handleClick = ({ key }) => {
            locale.value = key;
        };
        return {
            handleClick,
            selectedKeys,
            configs
        };
    }
};
</script>

<style lang="less">
.lang-icon {
    margin: 0 8px;
    padding: 0 4px;
    cursor: pointer;
}
.lang-item {
    display: flex;
    align-items: center;
    .lang-item-label {
        margin-left: 8px;
    }
}
</style>
