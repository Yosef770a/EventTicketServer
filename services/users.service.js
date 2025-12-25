import { saveData, loadData } from "../utils/readWriteJson.js";
import { getAllEvents, updateTicketsAvailable } from "./events.service.js";
import { addReceipts, getAllReceipts } from "./receipts.service.js";


const pathUsersJson = './data/users.json'


async function getAllUsers() {
    const data = await loadData(pathUsersJson);
    return data;
}

async function addUser(username, password) {
    const users = await loadData(pathUsersJson);
    const index = users.findIndex(user => user.username === username);

    if (!(index === -1)) {
        throw new Error('Username already exists');
    }
    const newUser = {
        username,
        password
    }
    users.push(newUser)
    await saveData(pathUsersJson, users);
    return {message: "User registered successfully"};
}




async function buyTickets(username, eventName, quantity) {
    let events = await getAllEvents();
    const eventI = events.findIndex(event => event.eventName.toLowerCase() === eventName.toLowerCase())
    if (events[eventI].ticketsAvailable < quantity) {
        throw new Error('There are not enough tickets in stock');
    }
    await addReceipts(username, eventName, quantity)
    await updateTicketsAvailable(eventName, quantity)
    return { message: "Tickets purchased successfully"}

}



async function purchaseSummary(username) {
    let receipts = await getAllReceipts();
    
    const arrayReceipts = receipts.filter(receipt => receipt.username === username);
    
    if (arrayReceipts.length === 0) {
        return {
            totalTicketsBought: 0,
            events: [],
            averageTicketsPerEvent: 0
        };
    }
    
    const totalTicketsBought = arrayReceipts.reduce((sum, receipt) => sum + receipt.ticketsBought, 0);
    
    const events = []
    arrayReceipts.forEach(receipt => events.push(receipt.eventName));
    const setEvents = new Set(events);
    const averageTicketsPerEvent = totalTicketsBought / setEvents.size;
    return {
        totalTicketsBought,
        events: [...setEvents],
        averageTicketsPerEvent
    };
    };



export { getAllUsers, addUser, buyTickets, purchaseSummary };
