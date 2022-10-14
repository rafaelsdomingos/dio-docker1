"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_respository_1 = __importDefault(require("../repositories/user.respository"));
const usersRoute = (0, express_1.Router)();
usersRoute.post('/users', async (request, response, next) => {
    const newUser = request.body;
    const uuid = await user_respository_1.default.create(newUser);
    response.status(201).send(uuid);
});
usersRoute.get('/users', async (request, response, next) => {
    const users = await user_respository_1.default.findAllUsers();
    response.status(200).json(users);
});
usersRoute.get('/users/:uuid', async (request, response, next) => {
    const uuid = request.params.uuid;
    const user = await user_respository_1.default.findById(uuid);
    response.status(200).send(user);
});
usersRoute.put('/users/:uuid', async (request, response, next) => {
    const uuid = request.params.uuid;
    const modifiedUser = request.body;
    modifiedUser.uuid = uuid;
    await user_respository_1.default.update(modifiedUser);
    response.status(200).send();
});
usersRoute.delete('/users/:uuid', async (request, response, next) => {
    const uuid = request.params.uuid;
    await user_respository_1.default.remove(uuid);
    response.sendStatus(200);
});
exports.default = usersRoute;
