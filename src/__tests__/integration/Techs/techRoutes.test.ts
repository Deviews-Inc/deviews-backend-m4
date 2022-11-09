import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedTech, mockedTechUpdate } from "../../mocks/Techs";

describe("/techs", () => {
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

  test("POST /techs - Must be able to create a tech", async () => {
    const response = await request(app).post("/techs").send(mockedTech);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("tech_name");
  });

  test("POST /techs - Should not be able to create a tech that already exists", async () => {
    const response = await request(app).post("/techs").send(mockedTech);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /techs - Must be able to list techs", async () => {
    const response = await request(app).get("/techs");

    expect(response.body.data).toHaveLength(1);
  });

  test("PATCH /techs - Should be able to update tech", async () => {
    const techTobeUpdateRequest = await request(app).get("/techs");
    const response = await request(app)
      .patch(`/techs/${techTobeUpdateRequest.body.data[0].id}`)
      .send(mockedTechUpdate);

    expect(response.body.data.tech_name).toEqual("Node.js");
  });

  test("DELETE /techs/:id - Must be able to soft delete tech", async () => {
    const techTobeDeleteRequest = await request(app).get("/techs");
    const response = await request(app).delete(
      `/techs/${techTobeDeleteRequest.body.data[0].id}`
    );
    const findTech = await request(app).get("/techs");

    expect(response.status).toBe(204);
    expect(findTech.body.data).toHaveLength(0);
  });

  test("DELETE /techs/:id - Must be able to soft delete tech", async () => {
    const response = await request(app).delete(
      `/techs/13970660-5dbe-423a-9a9d-5c23b37943cf`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
