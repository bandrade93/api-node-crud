import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

import User from '../models/User';

import { getRepository } from 'typeorm';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    const  usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(users);
});

usersRouter.get('/viewUnique/:id', async (request, response) => {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    return response.json(user);
});


usersRouter.delete("/delete/:id", (request, response) => {
    const { id } = request.params;

    const  usersRepository = getRepository(User);

    return response.status(204).json(usersRepository.delete(id));

});

usersRouter.put("/update/:id", async (request, response) => {
    const { id } = request.params;

    const { name, email, telefone } = request.body;

    const  usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);
    const result = usersRepository.merge(user, { name, email, telefone });
    usersRepository.save(result);

    return response.json(result);

});

usersRouter.post('/create', async (request, response) => {
  try {
    const { name, email, telefone } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
        name,
        email,
        telefone,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
