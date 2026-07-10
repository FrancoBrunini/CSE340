import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT 
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.date,
            organization.name AS organization_name
        FROM projects
        INNER JOIN organization
            ON projects.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };