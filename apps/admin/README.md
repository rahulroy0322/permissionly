# admin panel of permissionly

---

## How to use

local development 

## setup locally

```bash
pnpm i
```

## Run

test the app locally

### using pnpm (prefered)

```bash
pnpm dev --filter admin
```

### using docker (prefer only in once in development)

here onwords run in root of the project

#### build image

```bash
docker build --rm -t admin -f Dockerfile.admin .
```

```bash
docker run --rm -it admin 
```


## prod

```bash
docker build --rm -t admin -f Dockerfile.admin .
```

```bash
docker run --rm -it -p 80:80 -p 443:443 -e DOMAIN=<your.domain> admin
```