import ClientController from '../controllers/ClientController.js';

const clientRoutes = (app) => {
    app.use('/api/v1/client', ClientController);
}

export default clientRoutes;
