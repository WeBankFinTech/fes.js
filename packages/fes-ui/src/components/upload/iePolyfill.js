import toast from '../toast';
import { isIEVersion } from '../../utils/util';

export default {
    mounted() {
        this.computedIEStyle();
    },
    methods: {
        computedIEStyle() {
            const ele = this.$slots.default
                && this.$slots.default[0]
                && this.$slots.default[0].elm;
            if (ele && this.isIE(9)) {
                this.$nextTick(() => {
                    this.$refs.input.style.width = `${ele.clientWidth}px`;
                    this.$refs.input.style.height = `${ele.clientHeight}px`;
                });
            }
        },
        isIE(ver) {
            return isIEVersion(ver);
        },
        iePost() {
            let form = document.createElement('form');
            let iframe = document.createElement('iframe');
            let input = this.$refs.input;

            const filenames = input.value.split('.');
            const lastName = filenames[filenames.length - 1];
            if (Array.isArray(this.accept)) {
                if (this.accept.indexOf(lastName) == -1) {
                    toast.error(
                        `文件[${
                            input.value
                        }]格式不正确，只能上传后缀为${
                            JSON.stringify(this.accept)
                        }的文件`
                    );
                    this.$refs.input.value = '';
                    this.$emit('on-fail', this.$refs.input);
                    return;
                }
            }

            input.name = this.param;
            form.style.display = 'none';
            iframe.name = `vueUploadFile${Date.now()}`;

            form.action = this.url;
            form.method = 'post';
            form.target = iframe.name;
            form.enctype = 'multipart/form-data';
            form.encoding = 'multipart/form-data';

            this.$refs.input.parentNode.insertBefore(form, this.$refs.input);
            form.appendChild(input);
            form.appendChild(iframe);

            iframe.addEventListener('load', () => {
                try {
                    const iframeNodes = iframe.contentDocument.all;
                    const rstMap = {};
                    const rst = {
                        result: {}
                    };
                    for (let i = 0; i < iframeNodes.length; i++) {
                        rstMap[iframeNodes[i].nodeName.toLowerCase()] = iframeNodes[i];
                    }
                    if (rstMap.result) {
                        Object.keys(rstMap).forEach((key) => {
                            rst.result[key] = rstMap[key].textContent;
                        });
                        this.$emit('on-success', this.$refs.input, rst);
                    } else if (rstMap.title) {
                        toast.error(rstMap.title.textContent);
                        this.$emit('on-fail', this.$refs.input, rst);
                    } else {
                        toast.error(
                            'IE获取url失败，请重新登录重新或改用chrome浏览器'
                        );
                        this.$emit('on-fail', this.$refs.input, rst);
                    }
                } catch (e) {
                    this.$emit('on-fail', this.$refs.input);
                    toast.error('IE上传失败，请改用其他浏览器');
                    throw e;
                }
                this.$refs.input.parentNode.parentNode.appendChild(input);
                this.$refs.input.parentNode.removeChild(form);

                input = null;
                form = null;
                iframe = null;
                this.$refs.input.value = '';
            });
            form.submit();
        }
    }
};
