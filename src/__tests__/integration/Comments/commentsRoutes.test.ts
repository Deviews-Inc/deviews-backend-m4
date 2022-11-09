import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedComment,
  mockedCommentDelete,
  mockedCommentPatch,
  mockedCommentUpdate,
} from "../../mocks/Comments";
import { mockedPost } from "../../mocks/Posts";
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

  test("POST /comments -  Must be able to create a comment", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const toComment = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const response = await request(app)
      .post(`/comments/${toComment.body.data.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedComment);
    expect(response.status).toBe(201);
    expect(response.body.data.content).toEqual(
      "Às vezes as coisas têm que mudar."
    );
  });

  test("POST /comments:id - Should not be able to comment without authentication", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const toComment = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const response = await request(app).post(
      `/comments/${toComment.body.data.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /comment:id - Must not be able to comment non-existing posts", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/comments/notExistentId")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /comment:id -  Must be able to patch a post", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const toPost = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const toComment = await request(app)
      .post(`/comments/${toPost.body.data.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedCommentPatch);

    const response = await request(app)
      .patch(`/comments/${toComment.body.data.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedCommentUpdate);
    expect(response.status).toBe(200);
    expect(response.body.data.content).toEqual(
      "Esta é minha família, eu a encontrei."
    );
  });

  test("PATCH /comments:id - Should not be able patch to comment without authentication", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const toComment = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const response = await request(app).patch(
      `/comments/${toComment.body.data.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /comment:id - Must not be able patch comment non-existing", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .patch("/comments/notExistentId")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /comment -  Must be able to patch a post", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const toPost = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const toComment = await request(app)
      .post(`/comments/${toPost.body.data.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedCommentDelete);

    const response = await request(app)
      .delete(`/comments/${toComment.body.data.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /comments:id - Should not be able delete to comment without authentication", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const toComment = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedPost);

    const response = await request(app).delete(
      `/comments/${toComment.body.data.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /comment:id - Must not be able delete comment non-existing", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete("/comments/notExistentId")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

});
