import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT 
            P.project_id,
            P.title,
            P.description,
            P.location,
            P.date,
            O.name AS organization_name
        FROM PROJECTS P
        INNER JOIN ORGANIZATION O
            ON P.organization_id = O.organization_id;
    `;

    const result = await db.query(query);
    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO projects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM PROJECTS
        WHERE organization_id = $1
        ORDER BY date;
    `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            P.project_id,
            P.title,
            P.description,
            P.date,
            P.location,
            P.organization_id,
            O.name AS organization_name
        FROM PROJECTS P
        INNER JOIN ORGANIZATION O
            ON P.organization_id = O.organization_id
        WHERE P.date >= CURRENT_DATE
        ORDER BY P.date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT 
            P.project_id,
            P.title,
            P.description,
            P.date,
            P.location,
            P.organization_id,
            O.name AS organization_name
        FROM PROJECTS P
        INNER JOIN ORGANIZATION O
            ON P.organization_id = O.organization_id
        WHERE P.project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

export { createProject, getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };