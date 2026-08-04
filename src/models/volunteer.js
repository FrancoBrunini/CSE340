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

const adminAddVolunteerToProject = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING
        RETURNING *;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows[0];
};

const adminRemoveVolunteerFromProject = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE user_id = $1 AND project_id = $2
        RETURNING *;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows[0];
};

const getProjectsByUserId = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.date, o.name AS organization_name
        FROM projects p
        INNER JOIN project_volunteers pv ON p.project_id = pv.project_id
        LEFT JOIN organization o ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.date ASC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

const getVolunteersByProjectId = async (projectId) => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name, pv.created_at AS joined_at
        FROM users u
        INNER JOIN project_volunteers pv ON u.user_id = pv.user_id
        LEFT JOIN roles r ON u.role_id = r.role_id
        WHERE pv.project_id = $1
        ORDER BY u.name ASC;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

export {
    addVolunteer,
    removeVolunteer,
    isUserVolunteered,
    getProjectsByVolunteer, 
    adminAddVolunteerToProject,
    adminRemoveVolunteerFromProject,
    getProjectsByUserId,
    getVolunteersByProjectId
};