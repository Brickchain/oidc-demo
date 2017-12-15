import * as functions from 'firebase-functions'
const cors = require('cors')({origin: true});

import { Issuer } from 'openid-client';

import { Config } from './config';

let client: any;

export let startOauth = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        getClient()
            .then(() => {
                let url = client.authorizationUrl({
                    redirect_uri: `${Config.BASE}/oauthCallback`,
                    scope: 'openid name push',
                    state: 'abc',
                  });
                res.status(200).send({ url: url });
            })
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    })
})

export let oauthCallback = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        getClient()
            .then(() => client.authorizationCallback(`${Config.BASE}/oauthCallback`, req.query, { state: 'abc' })
                .then(tokenSet => {
                    console.log('received and validated tokens %j', tokenSet);
                    console.log('validated id_token claims %j', tokenSet.claims);

                    res.redirect(307, `${Config.FRONTEND}/?data=${tokenSet.id_token}`)
                })
            )
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    })
})

function getClient(): Promise<any> {
    if (client == undefined || client == null) {
        return Issuer.discover(Config.IDP)
            .then(integrityIssuer => {
                console.log('Discovered issuer %s', integrityIssuer.issuer);
                return new integrityIssuer.Client({
                    client_id: Config.CLIENT_ID,
                    client_secret: Config.CLIENT_SECRET
                })
            })
            .then(c => client = c);
    } else {
        return Promise.resolve()
    }
}