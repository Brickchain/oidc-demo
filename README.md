# oidc-demo <a href="https://travis-ci.org/Brickchain/oidc-demo"><img src="https://travis-ci.org/Brickchain/oidc-demo.svg?branch=master"></a>
Simple demo of our OAuth2/OpenID Connect provider<br>
Try the demo: <a href="https://oidc-demo-fd28c.firebaseapp.com">https://oidc-demo-fd28c.firebaseapp.com</a>
<br>
This repository contains a simple frontend that first displays a button that will start the authentication flow towards the IDP.<br>
When the login is completed it will display the content of the name scope and a button that uses the push_endpoint (claim received from the push scope) to send a push message to the logged in users device.

## Frontend
The relevant bits of code for the frontend are located in frontend/src/app/show/show.component.ts.<br>
The startOauth() function starts the oauth flow by doing an API call to the backend (one of the functions described below) and redirecting to the URL returned.<br>
If we have an ?data= query parameter set when the page loads we will try to parse it as an OAuth IDToken.

## Functions
Relevant code is in functions/src/index.ts.<br>
We're using the openid-client package to talk to the IDP. The getClient() function shows how we use the OpenID Dynamic Discovery feature to get all the IDPs endpoints and settings.<br>
The startOauth handler builds the authorization URL that we will send back to the frontend to start the OAuth flow.<br>
The oauthCallback handler receives the callback from the IDP and does the token exchange.
