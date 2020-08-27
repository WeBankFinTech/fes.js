/* !
 * fes-ui v0.1.0
 * (c) 2016 harrywan
 * Released under the MIT License.
 */
import Layout from './components/layout';
import Icon from './components/icon';
import WbButton from './components/button';
import TabCom from './components/tab-com';
import Table from './components/data-table';
import Carousel from './components/carousel';
import DatePicker, { Calendar } from './components/date-picker';
import Loading from './components/loading';
import Message from './components/message';
import Modal from './components/modal';
import WbSwitch from './components/switch';
import Toast from './components/toast';
import Tree from './components/tree';
import Upload from './components/upload';
import Zoom from './components/zoom';
import StepCom from './components/step-com';
import Tooltip from './components/tooltip';
import Pagination from './components/pagination';
import WbInput from './components/input';
import SelectCom from './components/select';
import RadioCom from './components/radio-com';
import CheckboxCom from './components/checkbox-com';
import FormCom from './components/form';
import MenuCom from './components/menu';
import Panel from './components/panel';
import Affix from './components/affix';
import BackTop from './components/back-top';
import ProcessCircle from './components/process-circle';
import DropdownCom from './components/dropdown-com';
import Draggable from './components/draggable';
import Contextmenu from './components/contextmenu';
import SplitCom from './components/split-com';
import TimePicker from './components/time-picker';
import Collapse, { CollapsePanel } from './components/collapse';
import i18n from './i18n';

const UiWebank = {
    Row: Layout.Row,
    Cell: Layout.Cell,
    Icon,
    WbButton,
    Tabs: TabCom.Tabs,
    Tab: TabCom.Tab,
    Carousel,
    WbTable: Table.WbTable,
    TreeTable: Table.TreeTable,
    Column: Table.Column,
    WbInputDatePicker: DatePicker,
    DatePicker: Calendar,
    Loading,
    Modal,
    WbSwitch,
    Tree,
    Zoom,
    Steps: StepCom.Steps,
    Step: StepCom.Step,
    Tooltip,
    Pagination,
    WbInput,
    WbSelect: SelectCom.WbSelect,
    WbOption: SelectCom.WbOption,
    OptionGroup: SelectCom.OptionGroup,
    Radio: RadioCom.Radio,
    RadioGroup: RadioCom.RadioGroup,
    Checkbox: CheckboxCom.Checkbox,
    CheckboxGroup: CheckboxCom.CheckboxGroup,
    WbForm: FormCom.WbForm,
    FormItem: FormCom.FormItem,
    Panel,
    WbMenu: MenuCom.WbMenu,
    WbMenuItem: MenuCom.WbMenuItem,
    WbSubMenu: MenuCom.WbSubMenu,
    WbMenuGroup: MenuCom.WbMenuGroup,
    RouteMenu: MenuCom.RouteMenu,
    Upload,
    Affix,
    BackTop,
    ProcessCircle,
    Dropdown: DropdownCom.Dropdown,
    DropdownMenu: DropdownCom.DropdownMenu,
    Draggable,
    Contextmenu,
    Split: SplitCom.Split,
    SplitItem: SplitCom.SplitItem,
    TimePicker,
    Collapse,
    CollapsePanel
};

const install = function (Vue, opts = {}) {
    i18n.setLocale(opts.locale);
    i18n.setHandler(opts.handle);

    Object.keys(UiWebank).forEach((key) => {
        Vue.component(key, UiWebank[key]);
    });
    Vue.directive('Zoom', Zoom._directive);
    Vue.directive('Tooltip', Tooltip._directive);
    Vue.prototype.$Message = window.Message = Message;
    Vue.prototype.$Toast = window.Toast = Toast;
    Vue.mixin({
        created() {
            if (this.$root) {
                Message.root = this.$root;
                Toast.root = this.$root;
            }
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
// webpack2 之后不允许混用impiort和module.exports https://github.com/webpack/webpack/issues/4039
export default Object.assign(UiWebank, {
    install,
    version: '2.3.6',
    i18n
}); // eslint-disable-line no-undef
