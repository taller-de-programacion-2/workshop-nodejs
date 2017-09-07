# workshop-nodejs

Repositorio para workshop de NodeJS + heroku

API para validación utilizando motor de reglas.

### Pre requisitos

- Contar con npm o docker.

```
$ npm -v
```


```
$ docker -v
```

### Instalación

#### Instalación mediante npm

```
$ cd app/ && npm install
```

#### Instalación mediante docker

```
$ docker build -t <image-name> .
```

### Ejecución

#### Ejecución mediante npm

```
$ cd app/ && npm start
```
ó

```
$ cd app/ && node index.js
```

#### Ejecución mediante docker


```
$ docker run -p 49160:8080 -d <image-name>
```

