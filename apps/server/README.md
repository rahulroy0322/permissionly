# server of permissionly

---

## How to use

local development 

```bash
cp apps/server/.env.sample apps/server/.env
```

then add your details


## setup locally

```bash
pnpm i
```

## Run

test the server locally

### using pnpm (prefered)

```bash
pnpm dev --filter server
```

### using docker (prefer only in once in development)

here onwords run in root of the project

build iamge


```bash
docker build --rm -t server -f Dockerfile.server .
```

```bash
docker run --rm -it --env-file apps/server/.env server 
```