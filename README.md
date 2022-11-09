# Deviews Api

Este é o backend da aplicação Deviews! O objetivo dessa aplicação é permitir que o usuário cadastrado possa se conectar com outras pessoas desenvolvedoras da comunidade, compartilhando conhecimento e dividindo experiências. 

## **Endpoints**

A API tem um total de 6 endpoints, sendo em volta principalmente do usuário - possibilitando cadastrar seu perfil, fazer login e criar posts, interagindo com outros usuários através de comentários e fires.

O url base da API é https://deviews.herokuapp.com/

## Índice:

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users](#12-listar-todos-os-usuários)
  - [GET - /users/:id](#13-apenas-um-usuário)
  - [PATCH - /users/:id](#14-update-de-usuário)
  - [DELETE - /users/:id](#15-delete-user)
- [Login](#2-login)
- [Techs](#3-techs)
  - [GET - /techs](#31-listar-todas-as-techs)
- [Posts](#4-posts)
  - [POST - /posts](#41-criação-de-posts)
  - [GET - /posts](#42-listar-todos-os-posts)
  - [GET - /posts/:id](#43-apenas-um-post)
  - [GET - /posts/user/:id](#44-posts-de-um-usuário)
  - [PATCH - /posts/:id](#45-update-posts)
  - [DELETE - /posts/:id](#46-delete-posts)
- [Comentários](#5-comentários)
  - [POST - /commments/:id_post](#51-criação-de-comentário)
  - [PATCH - /comments/:id](#52-update-comentário)
  - [DELETE - /comments/:id](#53-delete-comentário)
- [Fires](#6-fires)
  - [POST - fires/post/:id](#61-fire/desfire-posts)
  - [POST - fires/comments/:id](#62-fire/desfire-comentários)

# Rotas que não precisam de autenticação

### 1.1. **Criação de Usuário**

Esse endpoint tem como propósito o cadastro de um novo usuário, sendo necessário tais campos: name, username, email, password, bio, techs (sendo o id da tech a ser cadastrada) e profile_picture.

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Beto",
  "username": "Devbeto",
  "email": "beto@mail.com",
  "password": "beto123",
  "bio": "Eu sou um cacto dev!",
  "techs": [
    "18cc4b8b-cc32-4665-9e06-f54ee5fdf0a7",
    "4eab9344-0d96-46a9-9122-03d0f0a6b9ba"
  ],
  "profile_picture": "beto.jpg"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "data": [
    {
      "id": "40f7489b-4095-49bf-9b6e-ffb4262d22fe",
      "name": "Beto",
      "username": "Devbeto",
      "email": "beto@mail.com",
      "bio": "Eu sou um cacto dev!",
      "profile_picture": "beto.jpg",
      "isActive": true,
      "usersTechs": [
        {
          "id": "2ef59f81-2fa2-4d36-a294-4d821db1c038",
          "techs": {
            "id": "18cc4b8b-cc32-4665-9e06-f54ee5fdf0a7",
            "tech_name": "typescript"
          }
        },
        {
          "id": "d92a78fa-5f71-11ed-9b6a-0242ac120002",
          "techs": {
            "id": "4eab9344-0d96-46a9-9122-03d0f0a6b9ba",
            "tech_name": "React"
          }
        }
      ]
    }
  ]
}
```

### **Possíveis erros:**

<br>

| Código do Erro | Descrição                    |
| -------------- | ---------------------------- |
| 409 Conflict   | Email already registered.    |
| 409 Conflict   | Username already registered. |
| 404 Not found  | Tech not found.              |

---

### 2. **Login**

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

---

### 3.1. **Listar todas as techs**

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
    },
    {
      "id": "4eab9344-0d96-46a9-9122-03d0f0a6b9ba",
      "tech_name": "React"
    }
  ]
}
```

### Possíveis erros:

```json
Nenhum, máximo que pode acontecer é retornar uma lista vazia
```

# Rotas que precisam de autenticação

## 1. **Users**

### 1.2. **Listar todos os usuários**

`GET /users - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /users - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "3551f2e2-1940-44a5-80f7-8b1490a23ba9",
      "name": "robertinho",
      "username": "robertinho",
      "email": "robertinho@user.com",
      "bio": "oia o pai de pato",
      "profile_picture": "pato.jpg",
      "isActive": true
    },
    {
      "id": "348a5b92-34d1-4636-9047-bb043bc52cdf",
      "name": "beto",
      "username": "beto",
      "email": "beto@user.com",
      "bio": "oia o pai de cacto",
      "profile_picture": "cacto.jpg",
      "isActive": true
    }
  ]
}
```

### Possíveis erros:

```json
Nenhum, máximo que pode acontecer é retornar uma lista vazia
```

---

### 1.3. **Apenas um usuário**

`GET /users/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /users/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "88201de1-f0b6-4072-bfed-06448c114c26",
      "name": "condessa",
      "username": "condessa",
      "email": "condessa@user.com",
      "bio": "Just a Belgian Shepperd dev",
      "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg",
      "isActive": true,
      "usersTechs": [
        {
          "id": "6b65a112-2085-4525-86dc-48879a0961b4",
          "techs": {
            "id": "18cc4b8b-cc32-4665-9e06-f54ee5fdf0a7",
            "tech_name": "typescript"
          }
        }
      ]
    }
  ]
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | User not found. |

---

### 1.4. **Update de usuário**

`PATCH - /users/:id - FORMATO DE REQUISIÇÃO`

```json
{
  "name": "fulano",
  "username": "fulano",
  "profile_picture": "fulano.jpg"
}
```

`PATCH - /users/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "40f7489b-4095-49bf-9b6e-ffb4262d22fe",
      "name": "fulano",
      "username": "fulano",
      "email": "fulano@user.com",
      "bio": "amo pão",
      "profile_picture": "fulano.jpg",
      "isActive": true,
      "usersTechs": [
        {
          "id": "2ef59f81-2fa2-4d36-a294-4d821db1c038",
          "techs": {
            "id": "18cc4b8b-cc32-4665-9e06-f54ee5fdf0a7",
            "tech_name": "typescript"
          }
        }
      ]
    }
  ]
}
```

### Possíveis erros:

| Código do Erro     | Descrição                          |
| ------------------ | ---------------------------------- |
| 404 Not found      | User not found.                    |
| 406 Not acceptable | Tech already exists for this user. |
| 404 Not found      | Tech not found.                    |

---

### 1.5. **Delete user**

`DELETE - /users/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`DELETE - /users/:id - FORMATO DE RESPOSTA - STATUS 204`
No body returned for response

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | User not found. |

---

### 4. **Posts**

### 4.1. **Criação de posts**

Para este endpoint é possível inserir tanto a imagem quanto o conteúdo, sendo obrigatório ao menos um deles.

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

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 404 Not found  | User not found.           |
| 403 Forbidden  | Cannot make an empty post |

---

### 4.2. **Listar todos os posts**

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

---

### 4.3. **Apenas um post**

`GET /posts/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`GET /posts/:id - FORMATO DE RESPOSTA - STATUS 200`

```json
{
  "data": [
    {
      "id": "8c401d8b-78fa-4c76-bf3d-28fa71051690",
      "content": "post #11",
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
          "id": "2c278b25-dec7-46a0-a69f-7ac4f67d8ae0",
          "user": {
            "id": "88201de1-f0b6-4072-bfed-06448c114c26"
          }
        }
      ],
      "comments": [
        {
          "id": "70f142bb-9ebb-4b80-98c1-177e6350299c",
          "content": "opa",
          "createdAt": "2022-11-07T19:17:59.276Z",
          "user": {
            "id": "88201de1-f0b6-4072-bfed-06448c114c26",
            "name": "condessa",
            "username": "condessa",
            "profile_picture": "https://i.pinimg.com/originals/d6/ed/b5/d6edb5184680cf427624dcc6cacf01f5.jpg"
          },
          "fires": [
            {
              "id": "dcc22ca8-9317-4d5b-b2a0-1f6390a14a8e",
              "user": {
                "id": "88201de1-f0b6-4072-bfed-06448c114c26"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Possíveis erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

---

### 4.4. **Posts de um usuário**

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

---

### 4.5. **Update posts**

Para este endpoint é possível acrescentar ou editar tanto a imagem quanto o conteúdo.

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
    "image": "123.jpg",
    "createdAt": "2022-11-07T18:25:04.959Z",
    "fire_posts": [],
    "comments": []
  }
}
```

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not found    | Post not found.                    |
| 401 Unauthorized | You're not the owner of this post. |
| 400 Bad request  | This field cannot be updated.      |

---

### 4.6. **Delete posts**

`DELETE /posts/:id - FORMATO DE REQUISIÇÃO`

```json
Vazio
```

`DELETE /posts/:id - FORMATO DE RESPOSTA - STATUS 204`

```json
No body returned for response
```

### Possíveis erros:

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not found    | Post not found.                    |
| 401 Unauthorized | You're not the owner of this post. |

---

### 5 **Comentários**

### 5.1. **Criação de comentário**

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
    "id": "5a8098be-8cf6-4e60-befd-ab4f89195879",
    "content": "que dia lindo",
    "createdAt": "2022-11-08T14:48:38.118Z"
  }
}
```

### Possíveis erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 404 Not found  | Post not found.           |
| 409 Conflict   | This post already exists. |

---

### 5.2. **Update comentário**

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

| Código do Erro   | Descrição                          |
| ---------------- | ---------------------------------- |
| 404 Not found    | Comment not found.                 |
| 401 Unauthorized | Cannot update this value.          |
| 401 Unauthorized | You're not the owner of this post. |

---

### 5.3. **Delete comentário**

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

---

### 6. **Fires**

### 6.1 **Fire/desfire posts**

Este endpoint permite dar um like (fire) em um post.

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

---

### 6.2. **Fire/desfire comentários**

Este endpoint permite dar um like (fire) em um comentário.

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
