const db = require('../db');

const Project = {
    findAll: async () => {
        try {
            const result = await db.query('SELECT * FROM projects ORDER BY id DESC');
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error("Erreur lors de la récupération du projet :", error);
            throw error;
        }
    },

    create: async (projectData) => {
        try {
            const { title, description, image_url, technologies } = projectData;
            const query = `
                INSERT INTO projects (title, description, image_url, technologies)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;

            const values = [title, description, image_url, technologies];
            const result = await db.query(query, values);

            return result.rows[0];
        } catch (error) {
            console.error("Erreur lors de la création du projet :", error);
            throw error;
        }
    },

    deleteById: async (id) => {
        try {
            await db.query('DELETE FROM projects WHERE id = $1', [id]);
            return { message: "Projet supprimé" };
        } catch (error) {
            console.error("Erreur lors de la suppression du projet :", error);
            throw error;
        }
    }
};

module.exports = Project;