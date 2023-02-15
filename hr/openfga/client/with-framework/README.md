# Node with Framework

[Integrate Within a Framework](https://openfga.dev/docs/getting-started/framework)

## Setup OpenFGA

- OpenFGA: [server](../../server/README.md)
- SDK Client: [node](../node/README.md)

## Setup Framework

```bash
yarn add fastify fastify-plugin fastify-jwt
```

## Run App

### First App: no auth

- [first_app.js](first_app.js)

```bash
node first_app.js
```

**OK 200**:

```bash
curl -i http://localhost:8888/read/helloworld

{"read":"helloworld"}
```

<details>
  <summary>Client & Server logs</summary>

#### client log

```http
curl -i http://localhost:8888/read/helloworld

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
content-length: 21
Date: Wed, 15 Feb 2023 12:41:38 GMT
Connection: keep-alive
Keep-Alive: timeout=72

{"read":"helloworld"}
```

#### server log

```json
{"level":30,"time":1676464896372,"pid":25159,"hostname":"reeves","msg":"Server listening at http://0.0.0.0:8888"}
{"level":30,"time":1676464898208,"pid":25159,"hostname":"reeves","reqId":"req-1","req":{"method":"GET","url":"/read/helloworld","hostname":"localhost:8888","remoteAddress":"127.0.0.1","remotePort":33298},"msg":"incoming request"}
{"level":30,"time":1676464898211,"pid":25159,"hostname":"reeves","reqId":"req-1","res":{"statusCode":200},"responseTime":2.190203000092879,"msg":"request completed"}
```

</details>

![](images/first_app.png)

### Second App

- [second_app.js](second_app.js)
- [jwt-authenticate.js](jwt-authenticate.js)
- [route-read-auth.js](route-read-auth.js)

```bash
node second_app.js
```

**Wrong** JWT token + Right Secret:

<details>
  <summary>Create a JWT token </summary>

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload), 
  "supersecret"
)
```

```bash
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zbgd5BNF1cqQ_prCEqIvBTjSxMS8bDLnJAE_wE-0Cxg'
```

</details>

**OK 200**:

```bash
curl -i -H "Authorization: Bearer ${TOKEN}" http://localhost:8888/read/helloworld

{"read":"helloworld"}
```

<details>
  <summary>Client & Server logs</summary>

##### client log

```http
curl -i -H "Authorization: Bearer ${TOKEN}" http://localhost:8888/read/helloworld

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
content-length: 21
Date: Wed, 15 Feb 2023 13:03:44 GMT
Connection: keep-alive
Keep-Alive: timeout=72

{"read":"helloworld"}
```

##### server log

```json
{"level":30,"time":1676466466415,"pid":31604,"hostname":"reeves","msg":"Server listening at http://0.0.0.0:8888"}
{"level":30,"time":1676466469558,"pid":31604,"hostname":"reeves","reqId":"req-1","req":{"method":"GET","url":"/read/helloworld","hostname":"localhost:8888","remoteAddress":"127.0.0.1","remotePort":40602},"msg":"incoming request"}
{"level":30,"time":1676466469561,"pid":31604,"hostname":"reeves","reqId":"req-1","res":{"statusCode":200},"responseTime":3.1909950003027916,"msg":"request completed"}
```

</details>

![](images/second_app.png)

### Final App

- [app.js](app.js)
- [jwt-authenticate.js](jwt-authenticate.js)
- [preauthorize.js](preauthorize.js)
- [authorize.js](authorize.js)
- [route-read.js](route-read.js)

```bash
node app.js
```

#### False Relationship

Right JWT token + Right Secret + **Wrong** **object**:

```json
{
    "user": "user:anne",
    "relation": "reader",
    "object": "document:helloworld"
}
```

**Unauthorized 401**:

```bash
curl -i -H "Authorization: Bearer ${TOKEN}" http://localhost:8888/read/helloworld

HTTP/1.1 401 Unauthorized
```

<details>
  <summary>Create a JWT token</summary>

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
{
    "user": "user:anne",
    "relation": "reader",
    "object": "document:helloworld"
}
```

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload), 
  "supersecret"
)
```

```bash
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjphbm5lIiwicmVsYXRpb24iOiJyZWFkZXIiLCJvYmplY3QiOiJkb2N1bWVudDpoZWxsb3dvcmxkIn0.huIYd52LmZKxgEXQjjsGHkgT36dkYTpdWK74BFaebu0'
```

</details>

<details>
  <summary>Client & Server logs</summary>

##### client log

```http
curl -i -H "Authorization: Bearer ${TOKEN}" http://localhost:8888/read/helloworld

HTTP/1.1 401 Unauthorized
content-type: text/plain; charset=utf-8
content-length: 17
Date: Wed, 15 Feb 2023 13:28:20 GMT
Connection: keep-alive
Keep-Alive: timeout=72

Not authenticated
```

##### server log

```json
{"level":30,"time":1676467690785,"pid":44207,"hostname":"reeves","msg":"Server listening at http://0.0.0.0:8888"}
{"level":30,"time":1676467700378,"pid":44207,"hostname":"reeves","reqId":"req-1","req":{"method":"GET","url":"/read/Z","hostname":"localhost:8888","remoteAddress":"127.0.0.1","remotePort":44632},"msg":"incoming request"}
{
  user: 'user:anne',
  relation: 'reader',
  object: 'document:helloworld'
}
{"level":30,"time":1676467700413,"pid":44207,"hostname":"reeves","reqId":"req-1","res":{"statusCode":401},"responseTime":34.25501700025052,"msg":"request completed"}
```

</details>

![unauthorized](images/unauthorized.png)

#### True Relationship

Right JWT token + Right Secret + **TRUE** **object**:

```json
{
    "user": "user:anne",
    "relation": "reader",
    "object": "document:Z"
}
```

```bash
curl -i -H "Authorization: Bearer ${TOKEN}" http://localhost:8888/read/Z

HTTP/1.1 200 OK

{"read":"Z"}
```

<details>
  <summary>Create a JWT token</summary>

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
{
    "user": "user:anne",
    "relation": "reader",
    "object": "document:Z"
}
```

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload), 
  "supersecret"
)
```

```bash
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjphbm5lIiwicmVsYXRpb24iOiJyZWFkZXIiLCJvYmplY3QiOiJkb2N1bWVudDpaIn0.7ZzSnPt7lVWMDA6VIsZc2XHH4p3GLMBUT6ns3XxAHQQ'
```

</details>

<details>
  <summary>Client & Server logs</summary>

##### client log

```bash
curl -i -H "Authorization: Bearer ${TOKEN}" http://localhost:8888/read/Z

HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
content-length: 12
Date: Wed, 15 Feb 2023 13:22:05 GMT
Connection: keep-alive
Keep-Alive: timeout=72

{"read":"Z"}
```

##### server log

```json
{"level":30,"time":1676467594937,"pid":43584,"hostname":"reeves","msg":"Server listening at http://0.0.0.0:8888"}
{"level":30,"time":1676467603434,"pid":43584,"hostname":"reeves","reqId":"req-1","req":{"method":"GET","url":"/read/Z","hostname":"localhost:8888","remoteAddress":"127.0.0.1","remotePort":41780},"msg":"incoming request"}
{ user: 'user:anne', relation: 'reader', object: 'document:Z' }
{"level":30,"time":1676467603466,"pid":43584,"hostname":"reeves","reqId":"req-1","res":{"statusCode":200},"responseTime":31.264205999672413,"msg":"request completed"}
```

</details>

![ok](images/ok.png)
