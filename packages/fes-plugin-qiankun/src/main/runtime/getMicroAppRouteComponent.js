// eslint-disable-next-line import/extensions
import { MicroApp } from './MicroApp';

export function getMicroAppRouteComponent({ key, appName, base, masterHistoryType, routeProps }) {
    return <MicroApp key={key} base={base} masterHistoryType={masterHistoryType} name={appName} {...routeProps} />;
}
