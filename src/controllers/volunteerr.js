import { 
    addVolunteer, 
    removeVolunteer, 
    isUserVolunteered, 
    getProjectsByVolunteer,
    getVolunteersByProjectId, 
    adminAddVolunteerToProject, 
    adminRemoveVolunteerFromProject
} from '../models/volunteer.js';
import { getAllUser } from '../models/users.js';
import {showDashboardPage} from './users.js';

const processVolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id || req.params.projectId; 
        const userId = req.session.user.user_id; 

        await addVolunteer(projectId, userId);
        req.flash('info', 'Successfully registered as a volunteer!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const processUnvolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id || req.params.projectId;
        const userId = req.session.user.user_id;

        await removeVolunteer(projectId, userId);
        req.flash('info', 'You have been removed as a volunteer from the project.');
        
        const redirectTo = req.get('Referrer') || '/dashboard';
        res.redirect(redirectTo);
    } catch (error) {
        next(error);
    }
};

const showProjectVolunteersPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        
        const volunteers = await getVolunteersByProjectId(projectId);
        const allUsers = await getAllUser();

        res.render('admin/project-volunteers', {
            title: 'Manage Project Volunteers',
            projectId,
            volunteers,
            allUsers
        });
    } catch (error) {
        next(error);
    }
};

const processAdminAddVolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id || req.body.projectId;
        const userId = req.body.userId;

        await adminAddVolunteerToProject(userId, projectId);

        req.flash('success', 'User successfully added to project.');
        res.redirect('/dashboard'); 
    } catch (error) {
        next(error);
    }
};

const processAdminRemoveVolunteer = async (req, res, next) => {
    try {
        const { projectId, userId } = req.params;

        await adminRemoveVolunteerFromProject(userId, projectId);

        req.flash('success', 'User removed from project.');
        res.redirect('/dashboard'); 
    } catch (error) {
        next(error);
    }
};

export {
    processVolunteer,
    processUnvolunteer,
    showProjectVolunteersPage,
    processAdminAddVolunteer,
    processAdminRemoveVolunteer
};