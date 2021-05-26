import { createRouter } from "./routes";

export function onAppCreated({ app, routes }) {
    const router = createRouter(routes);
    app.use(router);
}
