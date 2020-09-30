
import { defineComponent } from 'vue';
import { noop } from '../../helpers';

export default defineComponent(props => () => {
    if (props.rightRender) return props.rightRender;
    return (<div class="layout-left-user">
        <div class="layout-left-user-logout">
            <Icon onClick={props.logout || noop} type="md-log-out" size="28" />
        </div>
    </div>);
});
