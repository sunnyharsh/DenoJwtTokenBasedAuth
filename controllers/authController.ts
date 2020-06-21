import {
  makeJwt,
  setExpiration,
  Jose,
  Payload
} from "https://deno.land/x/djwt/create.ts";

const user = { id: 1, email: "sunny@gmail.com", password: "12345" };

const key = "some-rendom-secret-key";
const header: Jose = {
  alg: "HS256",
  typ: "JWT"
};
const authLogin = async ({
  request,
  response
}: {
  request: any;
  response: any;
}) => {
  const { value } = await request.body();
  if (user.email === value.email && user.password === value.password) {
    const payload: Payload = {
      iss: user.email,
      exp: setExpiration(new Date().getTime() + 60000)
    };
    const jwt = makeJwt({ key, header, payload });
    if (jwt) {
      response.status = 200;
      response.cookie = jwt;
      response.body = {
        id: user.id,
        username: user.email,
        jwt
      };
    } else {
      response.status = 500;
      response.body = {
        msg: "Internal server error"
      };
    }
    return;
  }
  response.status = 404;
  response.body = {
    msg: "username and password invalid"
  };
};
const home = async ({ request, response }: { request: any; response: any }) => {
  response.status = 200;
  response.body = {
    msg: "in home"
  };
};
export { authLogin, home };
