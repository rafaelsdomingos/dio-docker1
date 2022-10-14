"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class UserRepository {
    async create(user) {
        const query = `
            INSERT INTO application_user (
                username, 
                password
            )
            VALUES ($1, crypt($2, 'xptokey'))
            RETURNING uuid
        `;
        const values = [user.username, user.password];
        const { rows } = await db_1.default.query(query, values);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async findAllUsers() {
        const query = `SELECT uuid, username FROM application_user`;
        const { rows } = await db_1.default.query(query);
        return rows || [];
    }
    async findById(uuid) {
        const query = `SELECT uuid, username FROM application_user WHERE uuid = $1`;
        const values = [uuid];
        const { rows } = await db_1.default.query(query, values);
        const [user] = rows;
        return user;
    }
    async update(user) {
        const query = `
            UPDATE application_user
            SET
                username = $1, 
                password = crypt($2, 'xptokey')
            WHERE uuid = $3
        `;
        const values = [user.username, user.username, user.uuid];
        await db_1.default.query(query, values);
    }
    async remove(uuid) {
        const query = `DELETE FROM application_user WHERE uuid = $1`;
        const values = [uuid];
        await db_1.default.query(query, values);
    }
}
exports.default = new UserRepository();
