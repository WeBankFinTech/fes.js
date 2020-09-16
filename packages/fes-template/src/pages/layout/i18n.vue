<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>
            {{$t('i18n.internationalization')}}<a target="_blank" href="https://kazupon.github.io/vue-i18n">
                vue-i18n
            </a>{{$t('i18n.achieve')}}
            <Wb-select v-model="locale" @on-change="change" class="select">
                <wb-option value="zh-cn">
                    zh-cn
                </wb-option>
                <wb-option value="en">
                    en
                </wb-option>
            </Wb-select>
        </p>

        <h2>{{$t('i18n.ui')}}</h2>
        <Date-picker :value="value" />
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    FesData() {
        const local = this.FesApp.i18n.locale;
        return {
            locale: local,
            value: +new Date()
        };
    },
    FesReady() {
        // do something
    },
    methods: {
        change() {
            this.FesApp.setLocale(this.locale);
        }
    }
};
</script>
<style>
    .select{
        width: 200px;
    }
    .article ul{
        padding: 0;
    }
</style>
