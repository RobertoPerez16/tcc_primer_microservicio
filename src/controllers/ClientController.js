import { customResponse, isEmpty } from '../commons/response.js';
import { Router } from 'express';
import ClientService from '../services/clientService.js';
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { name, identificationType, identificationNumber, gender } = req.body;
        console.log('body:', req.body);
        if (isEmpty(name)) {
            return customResponse(res, 400, null, 'missing field or fields');
        }

        if (isEmpty(identificationType)) {
            return customResponse(res, 400, null, 'missing field or fields');
        }

        if (isEmpty(identificationNumber)) {
            return customResponse(res, 400, null, 'missing field or fields');
        }

        if (isEmpty(gender)) {
            return customResponse(res, 400, null, 'missing field or fields');
        }

        const client = {
            name,
            identificationType,
            identificationNumber,
            gender
        }
        const databaseResult = await ClientService.addClientInformation(client);
        if (databaseResult instanceof Error) return customResponse(res, 400, null, databaseResult.message);
        return customResponse(res, 200, client, 'Client created');

    } catch (e) {
        console.log('Error: ', e);
        return customResponse(res, 500, null, 'Internal server error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, identificationType, gender } = req.body;
        const { id } = req.params;
        console.log('body:', req.body);
        if (!id) return customResponse(res, 400, null, 'missing field or fields');
        const dataClient = {
            name,
            identificationType,
            gender
        }
        const client = await ClientService.updateClientInformation(id, dataClient);
        if (client instanceof Error) return customResponse(res, 400, null, client.message);
        return customResponse(res, 200, client, 'client updated!');

    } catch (e) {
        console.log('Error: ', e);
        return customResponse(res, 500, null, 'Internal server error');
    }
});

router.delete('/:id', async (req, res) => {
   try {
       const { id } = req.params;
       const client = await ClientService.deleteUserInformation(id);
       if (client instanceof Error) return customResponse(res, 400, null, client.message);
       return customResponse(res, 200, client, 'client deleted!');
   } catch (e) {
       console.log('Error: ', e);
       return customResponse(res, 500, null, 'Internal server error');
   }
});

export default router;



