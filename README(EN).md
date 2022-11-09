# Deviews Api

This is the backend of the Deviews application! The goal of this application is to allow the registered user to connect with other developers in the community, sharing knowledge and experiences.

## **Endpoints**

This API has 6 endpoints, being mainly about the user - allowing for register, login and creation of posts, interaction with other users through comments and fires.
The url of the API is https://deviews.herokuapp.com/

## Summary:

- [Users](#1-users)
  - [POST - /users](#11-user-creation)
  - [GET - /users](#12-list-all-users)
  - [GET - /users/:id](#13-list-one-user)
  - [PATCH - /users/:id](#14-update-user)
  - [DELETE - /users/:id](#15-delete-user)
- [Login](#2-login)
- [Techs](#3-techs)
  - [GET - /techs](#31-list-all-techs)
- [Posts](#4-posts)
  - [POST - /posts](#41-post-creation)
  - [GET - /posts](#42-list-all-posts)
  - [GET - /posts/:id](#43-list-one-post)
  - [GET - /posts/user/:id](#44-posts-of-a-specific-user)
  - [PATCH - /posts/:id](#45-update-posts)
  - [DELETE - /posts/:id](#46-delete-posts)
- [Comments](#5-comments)
  - [POST - /commments/:id_post](#51-comment-creation)
  - [PATCH - /comments/:id](#52-update-comments)
  - [DELETE - /comments/:id](#53-delete-comment)
- [Fires](#6-fires)
  - [POST - fires/post/:id](#61-fire/desfire-posts)
  - [POST - fires/comments/:id](#62-fire/desfire-comment)

# Routes that don't need authentication

### 1.1. **User creation**

This endpoint has a purpose of registering a new user, with the needed fields: name, username, email, password, bio, techs (the id of the registered tech) and profile_picture.

`POST /users - REQUISITION FORMAT`

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

In case it all worked correctly, the answer will be:

`POST /users - ANSWER FORMAT - STATUS 201`

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

### **Possible errors:**

<br>

| Error Code     | Description                  |
| -------------- | ---------------------------- |
| 409 Conflict   | Email already registered.    |
| 409 Conflict   | Username already registered. |
| 404 Not found  | Tech not found.              |

---

### 2. **Login**

Endpoint for user login.

`POST /login - REQUISITION FORMAT`

```json
{
  "email": "beto@mail.com",
  "password": "beto123"
}
```

`POST /login - ANSWER FORMAT - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNWM2NzEyLWRlY2EtNGI1MS1hYjE0LWJiMWU3ZDNmZDZmYyIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2Njc1OTU2NjgsImV4cCI6MTY2NzY4MjA2OCwic3ViIjoiMGM1YzY3MTItZGVjYS00YjUxLWFiMTQtYmIxZTdkM2ZkNmZjIn0.qkNfvZJYgk0dbQT9zCf07zHsKfbA_XVNLsntaF5j5mg"
}
```

### Possible errors:

<br>

| Error Code     | Description                |
| -------------- | -------------------------- |
| 403 Forbidden  | Invalid email or password. |
| 403 Forbidden  | Invalid email or password. |

---

### 3.1. **List all techs**

`GET /techs - REQUISITION FORMAT`

```json
Empty
```

`GET /techs - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

```json
None or an empty array.
```

# Routes that need authentication

## 1. **Users**

### 1.2. **List all users**

`GET /users - REQUISITION FORMAT`

```json
Empty
```

`GET /users - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

```json
None or empty array.
```

---

### 1.3. **list one user**

`GET /users/:id - REQUISITION FORMAT`

```json
Empty
```

`GET /users/:id - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

| Error Code     | Description     |
| -------------- | --------------- |
| 404 Not found  | User not found. |

---

### 1.4. **Update user**

`PATCH - /users/:id - REQUISITION FORMAT`

```json
{
  "name": "fulano",
  "username": "fulano",
  "profile_picture": "fulano.jpg"
}
```

`PATCH - /users/:id - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

| Error Code         | Description                        |
| ------------------ | ---------------------------------- |
| 404 Not found      | User not found.                    |
| 406 Not acceptable | Tech already exists for this user. |
| 404 Not found      | Tech not found.                    |

---

### 1.5. **Delete user**

`DELETE - /users/:id - REQUISITION FORMAT`

```json
Empty
```

`DELETE - /users/:id - ANSWER FORMAT - STATUS 204`
No body returned for response

### Possíveis erros:

| Error Code     | Description     |
| -------------- | --------------- |
| 404 Not found  | User not found. |

---

### 4. **Posts**

### 4.1. **Post creation**

On this endpoint it is possible to insert image as well as content, the user being obligated to use at least one of those options.

`POST /posts - REQUISITION FORMAT`

```json
{
  "content": "oi família",
  "image": "image.jpg"
}
```

`POST /posts - ANSWER FORMAT - STATUS 201`

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

### Possible errors:

| Error Code     | Description               |
| -------------- | ------------------------- |
| 404 Not found  | User not found.           |
| 403 Forbidden  | Cannot make an empty post |

---

### 4.2. **List all posts**

`GET /posts - REQUISITION FORMAT`

```json
Empty
```

`GET /posts - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

```json
None or empty array.
```

---

### 4.3. **List one post**

`GET /posts/:id - REQUISITION FORMAT`

```json
Empty
```

`GET /posts/:id - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

| Error Code     | Description     |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

---

### 4.4. **Posts of a specific user**

`GET /posts/user/:id - REQUISITION FORMAT`

```json
Empty
```

`GET /posts/user/:id - ANSWER FORMAT - STATUS 200`

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

### Possible errors:

| Error Code     | Description     |
| -------------- | --------------- |
| 404 Not found  | User not found. |

---

### 4.5. **Update posts**

On this endpoint it is possible to add or edit the image as well as the content of a post.

`PATCH /posts/:id - REQUISITION FORMAT`

```json
{
  "content": "post alterado",
  "image": "123.jpg"
}
```

`PATCH /posts/:id - ANSWER FORMAT - STATUS 200`

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

| Error Code       | Description                        |
| ---------------- | ---------------------------------- |
| 404 Not found    | Post not found.                    |
| 401 Unauthorized | You're not the owner of this post. |
| 400 Bad request  | This field cannot be updated.      |

---

### 4.6. **Delete posts**

`DELETE /posts/:id - REQUISITION FORMAT`

```json
Empty
```

`DELETE /posts/:id - ANSWER FORMAT - STATUS 204`

```json
No body returned for response
```

### Possíveis erros:

| Error Code       | Description                        |
| ---------------- | ---------------------------------- |
| 404 Not found    | Post not found.                    |
| 401 Unauthorized | You're not the owner of this post. |

---

### 5 **Comments**

### 5.1. **Comment creation**

`POST /comments/:id_post - REQUISITION FORMAT`

```json
{
  "content": "comentario 1243"
}
```

`POST /comments/:id_post - ANSWER FORMAT - STATUS 201`

```json
{
  "data": {
    "id": "5a8098be-8cf6-4e60-befd-ab4f89195879",
    "content": "que dia lindo",
    "createdAt": "2022-11-08T14:48:38.118Z"
  }
}
```

### Possible errors:

| Error Code       | Description             |
| -------------- | ------------------------- |
| 404 Not found  | Post not found.           |
| 409 Conflict   | This post already exists. |

---

### 5.2. **Update comment**

`PATCH /comments/:id - REQUISITION FORMAT`

```json
{
  "content": "comentário editado"
}
```

`PATCH /comments/:id - ANSWER FORMAT - STATUS 200`

```json
{
  "data": {
    "id": "70f142bb-9ebb-4b80-98c1-177e6350299c",
    "content": "opa",
    "createdAt": "2022-11-07T19:17:59.276Z"
  }
}
```

### Possible errors:

| Error Code       | Description                        |
| ---------------- | ---------------------------------- |
| 404 Not found    | Comment not found.                 |
| 401 Unauthorized | Cannot update this value.          |
| 401 Unauthorized | You're not the owner of this post. |

---

### 5.3. **Delete comment**

`DELETE /comments/:id - REQUISITION FORMAT`

```json
Empty
```

`DELETE /comments/:id - ANSWER FORMAT - STATUS 204`

```json
No body returned for response
```

### Possíveis erros:

| Error Code     | Description        |
| -------------- | ------------------ |
| 404 Not found  | Comment not found. |

---

### 6. **Fires**

### 6.1 **Fire/desfire posts**

This endpoint allows for a user to "like" (fire) a post.

`POST /fires/posts/:id_post - REQUISITION FORMAT`

```json
Empty
```

`POST /fires/posts/:id_post - ANSWER FORMAT - STATUS 200`

In case of not previously existing fire by this user on the post:

```json
{
  "message": "fire"
}
```

Otherwise, the existing fire is removed and it is returned:

```json
{
  "message": "desfire"
}
```

| Error Code     | Description     |
| -------------- | --------------- |
| 404 Not found  | Post not found. |

---

### 6.2. **Fire/desfire comment**

This endpoint allows for a user to "like" (fire) a comment.

`POST /fires/comments/:id_comment - REQUISITION FORMAT`

```json
Empty
```

`POST /fires/comments/:id_comment - ANSWER FORMAT - STATUS 200`

In case of not previously existing fire by this user on the comment:

```json
{
  "message": "fire"
}
```

Otherwise, the existing fire is removed and it is returned:

```json
{
  "message": "desfire"
}
```

| Error Code     | Description     |
| -------------- | --------------- |
| 404 Not found  | Post not found. |
