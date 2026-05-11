import { Hono } from 'hono';

import { createCaregiver } from '../Controllers/caregiverControllers/createCaregiver';
import { getCaregiver } from '../Controllers/caregiverControllers/getCaregiver';
import { getAllCaregivers } from '../Controllers/caregiverControllers/getAllCaregivers';
import { updateCaregiver } from '../Controllers/caregiverControllers/updateCaregiver';
import { deleteCaregiver } from '../Controllers/caregiverControllers/deleteCaregiver';

const caregiverRoutes = new Hono();

caregiverRoutes.post('/', createCaregiver);
caregiverRoutes.get('/', getAllCaregivers);
caregiverRoutes.get('/:id', getCaregiver);
caregiverRoutes.put('/:id', updateCaregiver);
caregiverRoutes.delete('/:id', deleteCaregiver);

export default caregiverRoutes;