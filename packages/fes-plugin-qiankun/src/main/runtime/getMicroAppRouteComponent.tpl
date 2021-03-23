import { MicroApp } from './MicroApp';

export function getMicroAppRouteComponent({
  appName,
  base,
  masterHistoryType,
  routeProps
}) {

  return <MicroApp base={base} masterHistoryType={masterHistoryType} name={appName} {...routeProps} />;
}
