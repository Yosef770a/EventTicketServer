import { addEvent } from "../services/events.service.js";



const creatEvent = async (req, res) => {
    try {
         if (typeof req.body.ticketsForSale !== "number") {
            return res.status(400).json({ error: { message: 'ticketsForSale must be a number', code: 400 } })
        }
        res.status(201).json(
            await addEvent(
                req.body.eventName,
                req.body.ticketsForSale,
                req.body.username
            ));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default { creatEvent }