import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedPost, mockedPostUpdate } from "../../mocks/Posts";
import { mockedUser, mockedUserLogin } from "../../mocks/Users";

describe("/posts", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /posts -  Must be able to create a post", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("content");
    expect(response.body.data).toHaveProperty("image");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("fire_posts");
    expect(response.body.data).toHaveProperty("comments");
    expect(response.body.data.content).toEqual("ohana quer dizer família");
    expect(response.body.data.image).toEqual(
      "https://img.elo7.com.br/product/original/2960643/stitch-e-angel-poster-a5-nerd.jpg"
    );
    expect(response.status).toBe(201);
  });

  test("POST /posts - Should not be able to post posts without authentication", async () => {
    const response = await request(app).post("/posts");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /posts -  Must be able to list posts", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });

  test("GET /posts - Should not be able to list posts without authentication", async () => {
    const response = await request(app).get("/posts");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /posts:id - Must be able to list one post", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const postTobeList = await request(app)
      .get(`/posts`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/posts/${postTobeList.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[0].content).toEqual("ohana quer dizer família");
    expect(response.body.data[0].image).toEqual(
      "https://img.elo7.com.br/product/original/2960643/stitch-e-angel-poster-a5-nerd.jpg"
    );
  });

  test("GET /posts:id - Must not be able to list non-existing posts", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/posts/notExistentId")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /posts/:id - Must be able to soft delete post", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const postTobeDelete = await request(app)
      .get(`/posts`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/posts/${postTobeDelete.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /posts:id - Must not be able to delete non-existing posts", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete("/posts/notExistentId")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /posts/user:id - Must be able to list all posts from user", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const userTobeList = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get(`/posts/user/${userTobeList.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
  });

  test("GET /posts/user:id - Should not be able to list user with invalid id", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get(`/posts/user/notExistentId`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /posts:id - Must be able to list all posts from user", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const postTobeUpdate = await request(app)
      .get(`/posts`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/posts/${postTobeUpdate.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPostUpdate);

    expect(response.status).toBe(200);
    expect(response.body.data.content).toEqual(
      "Até que enfim as coisas vão bem."
    );
    expect(response.body.data.image).toEqual(
      "https://cdn.mensagenscomamor.com/content/images/m000471351.png?v=2&w=1080&h=1080"
    );
  });

  test("PATCH /posts:id - Must not be able to patch non-existing posts", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .patch("/posts/notExistentId")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
