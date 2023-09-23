import { consultMicroServiceSearchClient, createOrEditResource } from '../commons/response.js';
import sql from 'mssql';
import { databaseConfig } from '../config/appConfig.js';
const clientService = {};

clientService.addClientInformation = async (client) => {
    try {
        const info = await consultMicroServiceSearchClient(client.identificationNumber);
        if (info.length > 0) {
            return new Error('El usuario ya se encuentra registrado');
        }
        return await createOrEditResource('Add_client', client);
    } catch (e) {
        console.log('Error: ', e);
        return new Error;
    }
}

clientService.updateClientInformation = async (idNumber, client) => {
    try {
        const info = await consultMicroServiceSearchClient(idNumber);
        if (info.length > 0) {
            const clientResponse = info[0];
            const dataToSend = {
                name: client.name ? client.name : clientResponse.nombre,
                identificationNumber: idNumber,
                identificationType: client.identificationType ? client.identificationType : clientResponse.tipoidentificacion,
                gender: client.gender ? client.gender : clientResponse.genero
            }
            return await createOrEditResource('Edit_client', dataToSend)
        } else {
            return new Error('not found');
        }
    } catch (e) {
        console.log('Error: ', e);
        return new Error;
    }
}

clientService.deleteUserInformation = async (idNumber) => {
    try {
        const client = await consultMicroServiceSearchClient(idNumber);
        if (client.length > 0) {
            const pool = await sql.connect(databaseConfig);
            const deleteClient = pool.request()
                .input('nro_identificacion', idNumber)
                .execute('Delete_client');
            return deleteClient.recordset;
        } else {
            return new Error('not found');
        }
    } catch (e) {
        console.log('Error: ', e);
        return new Error;
    }
}

export default clientService;
