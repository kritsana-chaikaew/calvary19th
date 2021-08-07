# calvary19th

## contribute

### vscode extension

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### migrate mock database

```console
node migration/initialize.js
```

### dockerize

```console
docker build -t client .
docker volume create data
docker run --name calvary19th -p 0.0.0.0:3000:3000 --mount source=data,target=/usr/src/data client
```

### docker push

```console
image tag client:latest kritsanachai/calvary19th:latest
docker image push kritsanachai/calvary19th
```
