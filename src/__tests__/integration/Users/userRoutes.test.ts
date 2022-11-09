import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedNewUser,
  mockedUser,
  mockedUserLogin,
  mockedUserUpdate,
} from "../../mocks/Users";
import { mockedTech } from "../../mocks/Techs";

describe("/users", () => {
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

  test("POST /users - Must be able to create a user", async () => {
    const createTech = await request(app).post("/techs").send(mockedTech);
    mockedUser.techs.push(`${createTech.body.data.id}`);
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body.data[0]).toHaveProperty("id");
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("username");
    expect(response.body.data[0]).toHaveProperty("email");
    expect(response.body.data[0]).toHaveProperty("bio");
    expect(response.body.data[0]).toHaveProperty("profile_picture");
    expect(response.body.data[0]).toHaveProperty("isActive");
    expect(response.body.data[0]).toHaveProperty("usersTechs");
    expect(response.body.data[0]).not.toHaveProperty("password");

    expect(response.body.data[0].name).toEqual("Stitch");
    expect(response.body.data[0].username).toEqual("stitch");
    expect(response.body.data[0].email).toEqual("stitch@user.com");
    expect(response.body.data[0].bio).toEqual("Stitch dev");
    expect(response.body.data[0].profile_picture).toEqual(
      "https://i.pinimg.com/originals/2f/e1/ba/2fe1ba81feb387b9653e72a1fee11104.png"
    );
    expect(response.body.data[0].isActive).toEqual(true);
    expect(response.body.data[0].usersTechs).toHaveLength(1);
    expect(response.body.data[0].usersTechs[0].techs.tech_name).toEqual(
      "React"
    );
  });

  test("POST /users - Should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /users - Must be able to list users", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body.data).toHaveLength(1);
  });

  test("GET /users - Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update user without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const userTobeUpdate = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    const response = await request(app)
      .patch(`/users/${userTobeUpdate.body.data[0].id}`)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update user with invalid id", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedUserUpdate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update isActive field value", async () => {
    const newValues = { isActive: false };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userTobeUpdate = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userTobeUpdate.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should not be able to update id field value", async () => {
    const newValues = { id: false };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userTobeUpdate = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userTobeUpdate.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users/:id - Should be able to update user", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userTobeUpdate = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .patch(`/users/${userTobeUpdate.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(mockedUserUpdate);

    const userUpdated = await request(app)
      .get(`/users/${userTobeUpdate.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(userUpdated.body.data[0].name).toEqual("Stitch 2");
    expect(userUpdated.body.data[0]).not.toHaveProperty("password");
  });

  test("DELETE /users/:id - Should not be able to delete user without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userTobeDelete = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${userTobeDelete.body.data[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id - Must be able to soft delete user", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const userTobeDelete = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${userTobeDelete.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const findUser = await request(app)
      .get(`/users/${userTobeDelete.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body.data[0].isActive).toBe(false);
  });

  test("DELETE - Should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE - Shouldn't be able to delete the user if you don't own the account", async () => {
    const newUser = await request(app).post("/users").send(mockedNewUser);
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/users/${newUser.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
