import { getAllProjects, getProjectDetails, getUpcomingProjects} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    // 1. Usa la función con el límite de 5
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    
    // 2. Título actualizado a 'Upcoming Service Projects'
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        // Fetch project details and categories concurrently
        const [project, categories] = await Promise.all([
            getProjectDetails(projectId),
            getCategoriesByProjectId(projectId)
        ]);

        // If the project doesn't exist, pass a 404 error to the error handler
        if (!project) {
            const err = new Error('Service project not found');
            err.status = 404;
            return next(err);
        }

        const title = project.title;

        // Render the view with project data and its categories
        res.render('project', { title, project, categories });
    } catch (error) {
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage };