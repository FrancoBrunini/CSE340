import { 
    addVolunteer, 
    removeVolunteer, 
    isUserVolunteered, 
    getProjectsByVolunteer 
} from '../models/volunteer.js';

const processVolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
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
        const projectId = req.params.projectId;
        const userId = req.session.user.user_id;

        await removeVolunteer(projectId, userId);
        req.flash('info', 'You have been removed as a volunteer from the project.');
        
        const redirectTo = req.get('Referrer') || '/dashboard';
        res.redirect(redirectTo);
    } catch (error) {
        next(error);
    }
};

export {
    processVolunteer,
    processUnvolunteer
};