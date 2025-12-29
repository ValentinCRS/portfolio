const db = require('../db');

const Skill = {
    findAll: async () => {
        const result = await db.query('SELECT * FROM skills ORDER BY category, name');
        return result.rows;
    },

    create: async (name, category) => {
        const query = `
        INSERT INTO skills (name, category)
        VALUES (?, ?)
        RETURNING *`;
        const result = await db.query(query, [name, category]);
        return result.rows[0];
    }
};

module.exports = Skill;