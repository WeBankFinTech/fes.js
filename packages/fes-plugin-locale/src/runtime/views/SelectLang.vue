<template>
    <FTooltip v-model="isOpened" popperClass="lang-popper" mode="popover">
        <div class="lang-icon">
            <LanguageOutlined />
        </div>
        <template #content>
            <FScrollbar height="274" class="lang-container">
                <div
                    v-for="item in configs"
                    :key="item.lang"
                    :class="[
                        'lang-option',
                        item.lang === locale && 'is-selected'
                    ]"
                    @click="handleSelect(item)"
                >
                    <span>{{item.icon}}</span>
                    <span>{{item.label}}</span>
                </div>
            </FScrollbar>
        </template>
    </FTooltip>
</template>

<script>
import { FTooltip, FScrollbar } from '@fesjs/fes-design';
import { LanguageOutlined } from '@fesjs/fes-design/icon';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import langUConfigMap from '../langUConfigMap';
import { locale as _locale } from '../core';

export default {
    components: {
        FTooltip,
        FScrollbar,
        LanguageOutlined
    },
    setup() {
        const { messages, locale } = useI18n();
        const configs = computed(() => {
            const arr = [];
            Object.keys(messages.value)
                .sort()
                .forEach((item) => {
                    arr.push(langUConfigMap[item] || {});
                });
            return arr;
        });
        const isOpened = ref(false);
        const handleSelect = ({ lang }) => {
            locale.value = lang;
            isOpened.value = false;
            _locale.setLocale({ locale: lang });
        };
        return {
            handleSelect,
            locale,
            configs,
            isOpened
        };
    }
};
</script>
<style>
.fes-tooltip.fes-tooltip-popover.lang-popper {
    padding: 0;
}
</style>
<style lang="less" scoped>

.lang-icon {
    display: flex;
    align-items: center;
    margin: 0 8px;
    padding: 0 4px;
    cursor: pointer;
}
.lang-container {
    width: 180px;
    background: #ffffff;
    .lang-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;
        padding: 0 8px;
        color: #0f1222;
        line-height: 32px;
        background: #ffffff;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.9, 0, 0.3, 0.7);
        &:hover,
        &.is-selected {
            color: #5384ff;
            background: #f5f8ff;
        }
    }
}
</style>
