
export class Config {
    // Our address
    public static BASE = 'http://localhost:5001/oidc-demo-460e0/us-central1';

    // The address of our frontend
    public static FRONTEND = 'http://localhost:5000';

    // Which IDP to use. It must support dynamic discovery via .well-known/openid-configuration
    public static IDP = 'https://idp.staging.plusintegrity.com';
    public static CLIENT_ID = 'ABC';
    public static CLIENT_SECRET = 'DEF';
}