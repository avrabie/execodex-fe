const LOGIN_URL = `/oauth2/authorization/gateway-rest-api`;

export function LoginButton() {
  return (
    <a href={LOGIN_URL}>
      Login
    </a>
  );
}
