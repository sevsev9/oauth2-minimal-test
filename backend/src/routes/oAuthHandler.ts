import {Provider} from "oidc-provider";

const clients = [{
  client_id: 'test_implicit_app',
  grant_types: ['implicit'],
  response_types: ['id_token'],
  redirect_uris: ['https://testapp/signin-oidc'],
  token_endpoint_auth_method: 'none'
}];
const oidc = new Provider(`https://localhost:${process.env.PORT}`);

export function initProvider() {
  return new Promise(((resolve, reject) => {
    //@ts-ignore
    oidc.initialize(clients).then( () => {resolve(oidc)} ).catch(reject)
  }));
}