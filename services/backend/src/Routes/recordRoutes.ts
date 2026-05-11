import { Hono } from 'hono';

import { createRecord } from '../Controllers/recordControllers/createRecord';
import { getRecord } from '../Controllers/recordControllers/getRecord';
import { getAllRecords } from '../Controllers/recordControllers/getAllRecords';
import { updateRecord } from '../Controllers/recordControllers/updateRecord';
import { deleteRecord } from '../Controllers/recordControllers/deleteRecord';

const recordRoutes = new Hono();

recordRoutes.post('/', createRecord);
recordRoutes.get('/', getAllRecords);
recordRoutes.get('/:id', getRecord);
recordRoutes.put('/:id', updateRecord);
recordRoutes.delete('/:id', deleteRecord);

export default recordRoutes;