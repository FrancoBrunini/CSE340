import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';

        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error);
    }
};
const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations    

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    
    req.flash('success', 'Organization added successfully!');
    
    res.redirect(`/organization/${organizationId}`);
};

const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organization = await getOrganizationDetails(organizationId); 
        const projects = await getProjectsByOrganizationId(organizationId);

        if (!organization) {
            const err = new Error('Organization not found');
            err.status = 404;
            return next(err);
        }

        const title = 'Organization Details';

        res.render('organization', { 
            title, 
            organization, 
            projects
        });
    } catch (error) {
        next(error);
    }
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };