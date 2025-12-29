const db = require('../db');

const Message = {
    create: async (messageData) => {
        const { name, email, subject, content } = messageData;
        const query = `
        INSERT INTO messages (name, email, subject, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
        const values = [name, email, subject, content];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    findAll: async () => {
        const result = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
        return result.rows;
    },

    delete: async (id) => {
        await db.query('DELETE FROM messages WHERE id = $1', [id]);
        return { message: "Message supprimé avec succès" };
    }
};

module.exports = Message;