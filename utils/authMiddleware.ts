import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
const authmiidleware = async (ctx: Context, next: any) => {
  const headers: Headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  if (!authorization) {
    ctx.response.status = 401;
    ctx.response.body = {
      msg: "set the auth header"
    };
    return;
  }
  const jwt = authorization.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    ctx.response.body = {
      msg: "token is missing"
    };
    return;
  }
  const isValid = await validateJwt(jwt, "some-rendom-secret-key");
  if (isValid.isValid) {
    await next();
    return;
  }
  ctx.response.status = 401;
  ctx.response.body = { msg: "invalid jwt token" };
};

export default authmiidleware;
