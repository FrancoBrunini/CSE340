import db from './db.js';

const addVolunteer = async (projectId, userId) => {
    const query = `
        INSERT INTO project_volunteers (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING;
    `;
    await db.query(query, [projectId, userId]);
};

const removeVolunteer = async (projectId, userId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE project_id = $1 AND user_id = $2;
    `;
    await db.query(query, [projectId, userId]);
};

const isUserVolunteered = async (projectId, userId) => {
    const query = `
        SELECT 1 FROM project_volunteers
        WHERE project_id = $1 AND user_id = $2;
    `;
    const result = await db.query(query, [projectId, userId]);
    return result.rowCount > 0;
};

const getProjectsByVolunteer = async (userId) => {
    const query = `
        SELECT p.* 
        FROM projects p
        JOIN project_volunteers pv ON p.project_id = pv.project_id
        WHERE pv.user_id = $1
        ORDER BY p.project_id ASC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    isUserVolunteered,
    getProjectsByVolunteer
};