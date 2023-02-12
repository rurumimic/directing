# OpenFGA Server

[Setup OpenFGA Server](https://openfga.dev/docs/getting-started/setup-openfga)

## Configuring The Server

sample: [config.yaml](src/server/config.yaml)

```bash
vi /etc/openfga/config.yaml
vi $HOME/.openfga/config.yaml
vi ./config.yaml
```

## Run Server

### with Docker

```bash
docker run --rm --name openfga -p 8080:8080 -p 8081:8081 -p 3000:3000 openfga/openfga run
```

```bash
2023-02-12T12:46:44.783Z INFO 🧪 experimental features enabled: []
2023-02-12T12:46:44.783Z INFO using 'memory' storage engine
2023-02-12T12:46:44.783Z WARN authentication is disabled
2023-02-12T12:46:44.784Z WARN grpc TLS is disabled, serving connections using insecure plaintext
2023-02-12T12:46:44.784Z INFO 🚀 starting openfga service... {"version": "v0.3.4", "date": "2023-02-03T19:57:57Z", "commit": "4fed525fb64087ec1360cce1ff6f7067ccfe19af", "go-version": "go1.18.10"}
2023-02-12T12:46:44.784Z INFO grpc server listening on '0.0.0.0:8081'...
2023-02-12T12:46:44.785Z INFO HTTP server listening on '0.0.0.0:8080'...
2023-02-12T12:46:44.785Z INFO 🛝 starting openfga playground on http://localhost:3000/playground
2023-02-12T12:47:12.066Z INFO grpc_complete {"method": "/openfga.v1.OpenFGAService/ListStores", "took": 0.000018269}
^C2023-02-12T12:48:27.922Z INFO attempting to shutdown gracefully
2023-02-12T12:48:27.922Z INFO shutdown the openfga playground server
2023-02-12T12:48:27.925Z INFO server exited. goodbye 👋
```

### with Docker Compose

sample: [docker-compose.yml](src/docker-compose.yml)

```bash
docker compose up -d
docker compose down -v
```

Open: [localhost:3000/playground](http://localhost:3000/playground)

### Health Check

```bash
curl -X GET localhost:8080/healthz

{"status":"SERVING"}
```
