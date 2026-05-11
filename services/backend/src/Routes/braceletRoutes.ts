import { Hono } from 'hono';

import { createBracelet } from '../Controllers/braceletControllers/createBracelet';
import { getBracelet } from '../Controllers/braceletControllers/getBracelet';
import { getAllBracelets } from '../Controllers/braceletControllers/getAllBracelets';
import { updateBracelet } from '../Controllers/braceletControllers/updateBracelet';
import { deleteBracelet } from '../Controllers/braceletControllers/deleteBracelet';

const braceletRoutes = new Hono();

braceletRoutes.post('/', createBracelet);
braceletRoutes.get('/', getAllBracelets);
braceletRoutes.get('/:id', getBracelet);
braceletRoutes.put('/:id', updateBracelet);
braceletRoutes.delete('/:id', deleteBracelet);

export default braceletRoutes;