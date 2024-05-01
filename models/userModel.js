const { promisePool } = require("../database.js");

const userModel = {
    findOne: async (email) => {
        try {
            const [rows, fields] = await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);
        } catch (err) {
            console.log(err);
        }
    },
    findByID: async (id) => {
        try {
            const [rows, fields] = await promisePool.query("SELECT * FROM users WHERE id = ?", [id]);
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = { userModel };