import { 
    getAllCategories, 
    getCategoryById, 
    getProjectsByCategoryId 
} from '../models/categories.js';

// Controller function for the main categories list page
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';

        res.render('categories', { title, categories });
    } catch (error) {
        next(error);
    }
}; 

const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const [category, projects] = await Promise.all([
            getCategoryById(categoryId),
            getProjectsByCategoryId(categoryId)
        ]);

        if (!category) {
            const err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }

        const title = `${category.name} Projects`;

        res.render('category', { title, category, projects });
    } catch (error) {
        next(error);
    }
};

// Export controller functions
export { showCategoriesPage, showCategoryDetailsPage };