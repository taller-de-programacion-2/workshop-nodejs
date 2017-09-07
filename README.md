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


### Endpoints

GET /api/rules - Retorna las reglas que se encuentran disponibles
POST /api/rules - Se da de alta una nueva regla
_args_
```
{
  "rule": "{\"priority\" : 1,\"on\" : true, \"condition\":function (R) {\n    R.when(this && (this.transactionTotal > 800));\n  },\"consequence\":function (R) {\n    this.result = false;\n    R.stop();\n  }}"
}
```
POST /api/rules - Se ejecutan las reglas para los datos ingresados
```
{
  "userIP": "27.3.4.5",
  "name": "user4",
  "application": "MOB2",
  "userLoggedIn": true,
  "transactionTotal": 600,
  "cardType": "Credit Card"
}
```
