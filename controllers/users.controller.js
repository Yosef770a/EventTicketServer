import {
    addUser, buyTickets, purchaseSummary
} from '../services/users.service.js'



const register = async (req, res) => {
    try {
        if (!(req.body.username && req.body.password)) {
            return res.status(400).json({ error: { message: 'Missing required username or password', code: 400 } })
        }
        res.status(201).json(
            await addUser(
                req.body.username,
                req.body.password,
            ));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


const buy = async (req, res) => {
    try {
        if (!(req.body.quantity && req.body.eventName && req.body.quantity)) {
            return res.status(400).json({ error: { message: 'Missing required parameters', code: 400 } })
        }
        if (typeof req.body.quantity !== "number") {
            return res.status(400).json({ error: { message: 'quantity must be a number', code: 400 } })
        }
        res.json(await buyTickets(
            req.body.username,
            req.body.eventName,
            req.body.quantity,
        ));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


const getSummary = async (req, res) => {
    try {
        res.json(await purchaseSummary(req.params.username));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


export default { register, buy, getSummary }