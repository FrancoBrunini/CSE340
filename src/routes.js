import express from 'express';
import {processUnvolunteer, processVolunteer} from './controllers/volunteerr.js';
import { showHomePage } from './controllers/index.js';
import { 
    showUserRegistrationForm, 
    processUserRegistrationForm, 
    showLoginForm, 
    processLoginForm, 
    processLogout, 
    showDashboardPage, 
    requireLogin, 
    requireRole 
} from './controllers/users.js';
import {showProjectVolunteersPage,
    processAdminAddVolunteer,
    processAdminRemoveVolunteer} from './controllers/volunteerr.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import { 
    showProjectsPage, 
    showProjectDetailsPage, 
    showNewProjectForm, 
    processNewProjectForm, 
    showEditProjectForm, 
    processEditProjectForm, 
    projectValidation 
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();


router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/test-error', testErrorPage);

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboardPage);


router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

router.post('/project/:projectId/volunteer', requireLogin, processVolunteer);
router.post('/project/:projectId/unvolunteer', requireLogin, processUnvolunteer);


router.get('/admin/project/:id/volunteers', requireRole('admin'), showProjectVolunteersPage);

router.post('/admin/project/volunteers/add', requireRole('admin'), processAdminAddVolunteer);
router.post('/project/:projectId/volunteers/remove/:userId', requireRole('admin'), processAdminRemoveVolunteer);
router.post('/admin/project/:projectId/volunteers/remove/:userId', requireRole('admin'), processAdminRemoveVolunteer);
export default router;