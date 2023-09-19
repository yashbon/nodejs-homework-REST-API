const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const { DB_HOST } = process.env;

const loginData = {
    email: "email@email.eml",
    password: "email@email.eml",
};

describe("Test Login Controller", () => {
    beforeAll(async () => {
        await mongoose.connect(DB_HOST);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test("відповідь: статус-код 200", async () => {
        const res = await request(app).post("/users/login").send(loginData);
        // console.log(res.status);
        expect(res.status).toBe(200);
    });

    test("у відповіді: токен", async () => {
        const res = await request(app).post("/users/login").send(loginData);
        // console.log(res.body.token);
        expect(res.body.token).toBeDefined();
    });

    test("у відповіді: об'єкт user з 2 полями email и subscription з типом даних String", async () => {
        const res = await request(app).post("/users/login").send(loginData);
        const user = res.body.user;
        // console.log(user);
        expect(user).toBeDefined();
        expect(typeof user.email).toBe("string");
        expect(typeof user.subscription).toBe("string");
    });
});
