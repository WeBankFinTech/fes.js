import { MicroApp } from './MicroApp';

export function getMicroAppRouteComponent({
  key,
  appName,
  cacheName,
  base,
  masterHistoryType,
  routeProps
}) {

  return <MicroApp key={key} base={base} masterHistoryType={masterHistoryType} name={appName} cacheName={cacheName} {...routeProps} />;
}
