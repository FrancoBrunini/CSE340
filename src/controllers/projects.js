import { getAllProjects, getProjectDetails, getUpcomingProjects, createProject} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};
const showNewProjectForm = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Add New Project';
        
        res.render('new-project', { 
            title, 
            organizations 
        });
    } catch (error) {
        next(error);
    }
};
const processNewProjectForm = async (req, res) => {
    const { title, description, location, date, organizationId } = req.body;

    try {
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const [project, categories] = await Promise.all([
            getProjectDetails(projectId),
            getCategoriesByProjectId(projectId)
        ]);

        if (!project) {
            const err = new Error('Service project not found');
            err.status = 404;
            return next(err);
        }

        const title = project.title;

        res.render('project', { title, project, categories });
    } catch (error) {
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage, processNewProjectForm, showNewProjectForm };