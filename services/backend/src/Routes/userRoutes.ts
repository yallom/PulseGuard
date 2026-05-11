import { Hono } from 'hono';

import { createUser } from '../Controllers/userControllers/createUser';
import { getUser } from '../Controllers/userControllers/getUser';
import { getAllUsers } from '../Controllers/userControllers/getAllUsers';
import { updateUser } from '../Controllers/userControllers/updateUser';
import { deleteUser } from '../Controllers/userControllers/deleteUser';

const userRoutes = new Hono();

userRoutes.post('/', createUser);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;