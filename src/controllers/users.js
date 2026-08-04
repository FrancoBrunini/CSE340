
import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUser} from '../models/users.js';
import { getProjectsByVolunteer } from '../models/volunteer.js';
import { getAllProjects } from '../models/projects.js';
import { 
   
    getVolunteersByProjectId
  
} from '../models/volunteer.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userId = await createUser(name, email, passwordHash);

        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

return res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};



const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        next();
    };
};

const showDashboardPage = async (req, res, next) => {
    try {
        const user = req.session.user;

        const volunteeredProjects = await getProjectsByVolunteer(user.user_id);

        let allUsers = [];
        let allProjects = [];

        if (user.role === 'admin' || user.role_name === 'admin') {
            allUsers = await getAllUser();
            
            const projectsData = await getAllProjects();

            allProjects = await Promise.all(
                projectsData.map(async (project) => {
                    const volunteers = await getVolunteersByProjectId(project.project_id); 
                    return {
                        ...project,
                        volunteers: volunteers || []
                    };
                })
            );
        }

        res.render('dashboard', {
            title: 'User Dashboard',
            user,
            volunteeredProjects,
            allUsers,
            allProjects
        });
    } catch (error) {
        next(error);
    }
};

export { requireRole,showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboardPage };