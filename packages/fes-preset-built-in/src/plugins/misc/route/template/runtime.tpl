import { createRouter } from "./routes";

export function onAppCreated({ app }) {
    const router = createRouter();
    app.use(router);
}
