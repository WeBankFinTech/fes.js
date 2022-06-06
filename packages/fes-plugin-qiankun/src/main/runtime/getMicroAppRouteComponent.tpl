import { MicroApp } from './MicroApp';

export function getMicroAppRouteComponent({
  key,
  appName,
  entry,
  base,
  masterHistoryType,
  routeProps
}) {

  return <MicroApp key={key} base={base} masterHistoryType={masterHistoryType} name={appName} entry={entry} {...routeProps} />;
}
