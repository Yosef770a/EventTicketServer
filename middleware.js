import { getAllUsers } from './services/users.service.js';

export default async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const users = await getAllUsers();
    const verifi = users.find(
        user => user.username === username && user.password === password
    );

    if (!verifi) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};