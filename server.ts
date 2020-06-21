import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router/router.ts";

const port: number = 5000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`server start on ${port}`);
