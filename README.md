# workshop-nodejs

Repositorio para workshop de NodeJS + heroku

## Step 3

API para validación utilizando motor de reglas.

### Pre requisitos

- Contar con yarn o docker.

```
$ yarn -v
```


```
$ docker -v
```

### Instalación

#### Instalación mediante npm

```
$ yarn install
```

#### Instalación mediante docker

```
$ docker build -t <image-name> .
```

### Ejecución

#### Ejecución mediante `yarn`

```
$ yarn start:dev
```
ó

```
$ yarn build
$ yarn start
```

#### Ejecución mediante docker

```
$ docker run -p 49160:8080 -d <image-name>
```
