import sql from 'mssql';
import { databaseConfig, microserviceUrl } from '../config/appConfig.js';
import axios from "axios";

const customResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        data,
        success: statusCode === 200 || statusCode === 201,
        statusCode,
        message
    });
}

const isEmpty = (field) => {
    if (typeof field === 'object') {
        try {
            return Object.keys(field).length === 0
        } catch (err) {
            return true
        }
    }
    if (field instanceof Array) {
        return field.length === 0
    }
    return field === undefined || field === null || field === '' || field === 0
}

const createOrEditResource = async (method, client) => {
    const pool = await sql.connect(databaseConfig);
    const insertClient = await pool.request()
        .input('tipoidentificacion', sql.TYPES.NVarChar(8), client.identificationType)
        .input('nro_identificacion', sql.TYPES.NVarChar(20), client.identificationNumber)
        .input('nombre', sql.TYPES.NVarChar(1000), client.name)
        .input('genero', sql.TYPES.NVarChar(1000), client.gender)
        .execute(method);
    return insertClient.recordset;
}

const consultMicroServiceSearchClient = async (idNumber) => {
    try {
        const response = await axios.get(`${ microserviceUrl }search?identificationNumber=${idNumber}`);
        if (response.data && response.data.statusCode === 200) return response.data.data;
        else return [];
    } catch (e) {
        console.log('Error: ', e);
        return [];
    }
}

export {
    customResponse,
    isEmpty,
    createOrEditResource,
    consultMicroServiceSearchClient
}
