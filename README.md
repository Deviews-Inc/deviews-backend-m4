# Deviews Api

Essa é a API da Deviews

## **Endpoints**

A API tem um total de 5 endpoints, sendo em volta principalmente do usuário - podendo cadastrar seu perfil, fazer login, fazer posts e dar like em outros posts.

O url base da API é https://deviews.herokuapp.com/

## Rotas que não precisam de autenticação

<h2 align = "center">Cadastro</h2>

Esse endpoint tem como propósito o cadastro de um novo usuário, sendo necessário tais campos: name, username, email, password, bio, techs e profile_picture.

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Beto",
  "username": "Devbeto",
  "email": "beto@mail.com",
  "password": "beto123",
  "bio": "Eu sou um cacto dev!",
  "techs": ["Javascript", "React"],
  "profile_picture": "beto.jpg"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "data": {
    "id": "620cb148-5ec2-11ed-9b6a-0242ac120002",
    "name": "Beto",
    "username": "Devbeto",
    "email": "beto@mail.com",
    "password": "beto123",
    "bio": "Eu sou um cacto dev!",
    "techs": ["Javascript", "React"],
    "profile_picture": "beto.jpg",
    "isActive": true
  }
}
```

### **Possíveis erros:**

<br>

| Código do Erro | Descrição                    |
| -------------- | ---------------------------- |
| 409 Conflict   | Email already registered.    |
| 409 Conflict   | Username already registered. |

<h2 align = "center">Login</h2>

Endpoint para a realização de login de usuário.

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "beto@mail.com",
  "password": "beto123"
}
```

`POST /login - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNWM2NzEyLWRlY2EtNGI1MS1hYjE0LWJiMWU3ZDNmZDZmYyIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2Njc1OTU2NjgsImV4cCI6MTY2NzY4MjA2OCwic3ViIjoiMGM1YzY3MTItZGVjYS00YjUxLWFiMTQtYmIxZTdkM2ZkNmZjIn0.qkNfvZJYgk0dbQT9zCf07zHsKfbA_XVNLsntaF5j5mg"
}
```

### Possíveis erros:

<br>

| Código do Erro | Descrição                  |
| -------------- | -------------------------- |
| 403 Forbidden  | Invalid email or password. |
| 403 Forbidden  | Invalid email or password. |

<h2 align = "center">Todas as tecnologias</h2>

`GET /techs - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /techs - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "18cc4b8b-cc32-4665-9e06-f54ee5fdf0a7",
      "tech_name": "typescript"
    }
  ]
}
```

### Possíveis erros:

```json
Nenhum, máximo que pode acontecer é retornar uma lista vazia
```

## Rotas que precisam de autenticação

<br>

<h2 align = "center">Todos os usuários</h2>

`GET /users - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /users - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "88201de1-f0b6-4072-bfed-06448c114c26",
      "name": "condessa",
      "username": "condessa",
      "email": "condessa@user.com",
      "bio": "Just a Belgian Shepperd dev",
      "techs": ["Typescript", "Vue"],
      "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg",
      "isActive": true
    },
    {
      "id": "620cb148-5ec2-11ed-9b6a-0242ac120002",
      "name": "beto",
      "username": "beto",
      "email": "beto@user.com",
      "bio": "Eu sou um cacto dev!",
      "techs": ["Javascript", "React"],
      "profile_picture": "beto.jpg",
      "isActive": true
    }
  ]
}
```

### Possíveis erros:

```json
Nenhum, máximo que pode acontecer é retornar uma lista vazia
```

<h2 align = "center">Apenas um usuário</h2>

`GET /users/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /users/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": {
    "id": "620cb148-5ec2-11ed-9b6a-0242ac120002",
    "name": "beto",
    "username": "beto",
    "email": "beto@user.com",
    "bio": "Eu sou um cacto dev!",
    "techs": ["Javascript", "React"],
    "profile_picture": "beto.jpg",
    "isActive": true
  }
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | User not found. |

<h2 align = "center">Criação de posts</h2>

é opcional

`POST /posts - FORMATO DE REQUISIÇÃO`

```json
{
  "content": "oi família",
  "image": "image.jpg"
}
```

`POST /posts - FORMATO DE RESPOSTA - STATUS 201`

```json
{
  "data": {
    "id": "aaea167e-3568-41d8-8bd5-6f1f2c69ab7c",
    "content": "oi família",
    "image": null,
    "createdAt": "2022-11-07T18:25:04.959Z",
    "user": {
      "id": "88201de1-f0b6-4072-bfed-06448c114c26",
      "name": "condessa",
      "username": "condessa",
      "email": "condessa@user.com",
      "bio": "Just a Belgian Shepperd dev",
      "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg",
      "isActive": true
    },
    "fire_posts": [],
    "comments": []
  }
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | User not found. |

<h2 align ="center"> Todos os posts </h2>

`GET /posts - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /posts - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "8c401d8b-78fa-4c76-bf3d-28fa71051690",
      "content": "o condado ainda não o liberou",
      "image": null,
      "createdAt": "2022-11-05T14:26:33.511Z",
      "user": {
        "id": "88201de1-f0b6-4072-bfed-06448c114c26",
        "name": "condessa",
        "username": "condessa",
        "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg"
      },
      "fire_posts": [
        {
          "id": "4e52bfeb-5eba-4650-a43e-d80d7fb65177",
          "user": {
            "id": "88201de1-f0b6-4072-bfed-06448c114c26"
          }
        }
      ],
      "comments": []
    },
    {
      "id": "aaea167e-3568-41d8-8bd5-6f1f2c69ab7c",
      "content": "assim que o exercito recuou lutando para cruzar o Danúbio, com Potiômkin cobrindo a retaguarda sendo o ultimo a atravessar.",
      "image": null,
      "createdAt": "2022-11-07T18:25:04.959Z",
      "user": {
        "id": "88201de1-f0b6-4072-bfed-06448c114c26",
        "name": "condessa",
        "username": "condessa",
        "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg"
      },
      "fire_posts": [],
      "comments": []
    }
  ]
}
```

### Possíveis erros:

```json
Nenhum, máximo que pode acontecer é retornar uma lista vazia
```

<h2 align = "center"> Apenas um post </h2>

`GET /posts/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /posts/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    [
      {
        "id": "aaea167e-3568-41d8-8bd5-6f1f2c69ab7c",
        "content": "assim que o exercito recuou lutando para cruzar o Danúbio, com Potiômkin cobrindo a retaguarda sendo o ultimo a atravessar.",
        "image": null,
        "createdAt": "2022-11-07T18:25:04.959Z",
        "user": {
          "id": "88201de1-f0b6-4072-bfed-06448c114c26",
          "name": "condessa",
          "username": "condessa",
          "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg"
        },
        "fire_posts": [],
        "comments": []
      }
    ]
  ]
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

<h2 align = "center"> Lista posts de um usuário </h2>

`GET /posts/user/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /posts/user/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "8c401d8b-78fa-4c76-bf3d-28fa71051690",
      "content": "post #11",
      "image": null,
      "createdAt": "2022-11-05T14:26:33.511Z",
      "fire_posts": [
        {
          "id": "4e52bfeb-5eba-4650-a43e-d80d7fb65177"
        }
      ],
      "comments": []
    },
    {
      "id": "aaea167e-3568-41d8-8bd5-6f1f2c69ab7c",
      "content": "oi familiassss",
      "image": null,
      "createdAt": "2022-11-07T18:25:04.959Z",
      "fire_posts": [],
      "comments": []
    }
  ]
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | User not found. |

<h2 align = "center"> Editar um post </h2>

`PATCH /posts/:id - FORMATO DE REQUISIÇÃO`

```json
{
  "content": "post alterado",
  "image": "123.jpg"
}
```

`PATCH /posts/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": {
    "id": "aaea167e-3568-41d8-8bd5-6f1f2c69ab7c",
    "content": "post alterado",
    "image": null,
    "createdAt": "2022-11-07T18:25:04.959Z",
    "fire_posts": [],
    "comments": []
  }
}
```

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

`DELETE /posts/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`DELETE /posts/:id - FORMATO DE RESPOSTA - STATUS 204`

```json
No body returned for response
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

<h2 align = "center">Criar comentários</h2>

`POST /comments/:id_post - FORMATO DE REQUISIÇÃO`

```json
{
  "content": "comentario 1243"
}
```

`POST /comments/:id_post - FORMATO DE RESPOSTA - STATUS 201`

```json
{
  "data": {
    "content": "comentario 1243",
    "user": {
      "id": "88201de1-f0b6-4072-bfed-06448c114c26",
      "name": "condessa",
      "username": "condessa",
      "email": "condessa@user.com",
      "bio": "Just a Belgian Shepperd dev",
      "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg",
      "isActive": true
    },
    "post": {
      "id": "8c401d8b-78fa-4c76-bf3d-28fa71051690",
      "content": "post #11",
      "image": null,
      "createdAt": "2022-11-05T14:26:33.511Z",
      "fire_posts": [
        {
          "id": "4e52bfeb-5eba-4650-a43e-d80d7fb65177"
        }
      ],
      "comments": []
    },
    "id": "70f142bb-9ebb-4b80-98c1-177e6350299c",
    "createdAt": "2022-11-07T19:17:59.276Z"
  }
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

<h2 align = "center">Editar comentário</h2>

`PATCH /comments/:id - FORMATO DE REQUISIÇÃO`

```json
{
  "content": "comentário editado"
}
```

`PATCH /comments/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": {
    "id": "70f142bb-9ebb-4b80-98c1-177e6350299c",
    "content": "opa",
    "createdAt": "2022-11-07T19:17:59.276Z"
  }
}
```

### Possíveis erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not found  | Comment not found. |

`DELETE /comments/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`DELETE /comments/:id - FORMATO DE RESPOSTA - STATUS 204`

```json
No body returned for response
```

### Possíveis erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not found  | Comment not found. |

<h2 align ="center">Fire/desfire posts</h2>

`POST /fires/posts/:id_post`

```json
Vazio
```

`POST /fires/posts/:id_post - FORMATO DE REPOSTA - STATUS 200`

Caso o fire ainda não exista nesse post é retornado:

```json
{
  "message": "fire"
}
```

Caso o fire já exista nesse post o mesmo é removido, sendo o seguinte retorno:

```json
{
  "message": "desfire"
}
```

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

<h2 align ="center">Fire/desfire comentários</h2>

`POST /fires/comments/:id_comment`

```json
Vazio
```

`POST /fires/comments/:id_comment - FORMATO DE REPOSTA - STATUS 200`

Caso o fire ainda não exista nesse comentário é retornado:

```json
{
  "message": "fire"
}
```

Caso o fire já exista nesse comentário o mesmo é removido, sendo o seguinte retorno:

```json
{
  "message": "desfire"
}
```

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |
