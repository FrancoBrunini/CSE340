import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT 
            category_id, 
            name 
        FROM CATEGORY
        WHERE category_id = $1;
    `;
    
    const result = await db.query(query, [categoryId]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT 
            C.category_id, 
            C.name
        FROM CATEGORY C
        INNER JOIN PROJECT_CATEGORY PC 
            ON C.category_id = PC.category_id
        WHERE PC.project_id = $1
        ORDER BY C.name ASC;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
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
        INNER JOIN PROJECT_CATEGORY PC 
            ON P.project_id = PC.project_id
        INNER JOIN ORGANIZATION O 
            ON P.organization_id = O.organization_id
        WHERE PC.category_id = $1
        ORDER BY P.date ASC;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

export { 
    getAllCategories, 
    getCategoryById, 
    getCategoriesByProjectId, 
    getProjectsByCategoryId 
};