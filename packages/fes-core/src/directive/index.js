// TODO runtime 实例和具体功能解耦
/*eslint-disable */
import app from '../instance/app';

/**
 * 常用的指令
 */
export const permission = {
    bind(el, binding) {
        const dispaly = el.style.display;
        const setDispaly = () => {
            const urls = app.getAllowPage() || [];
            if (urls.indexOf(binding.value) === -1) {
                el.style.display = 'none';
            } else {
                el.style.display = dispaly;
            }
        };
        setDispaly();
        app.FesUtil.event.on('fes_allowPage_change', setDispaly);
    }
};
