import { saveData, loadData } from "../utils/readWriteJson.js";

const pathAEventsJson = './data/events.json'

async function getAllEvents() {
    const data = await loadData(pathAEventsJson);
    return data;
}


async function addEvent(eventName, ticketsAvailable, createdBy) {
    const events = await loadData(pathAEventsJson);
    const i = events.findIndex(event => event.eventName === eventName);
    if (!(i === -1)) {
        throw new Error('eventName already exists');
    }
    const event = {
        eventName,
        ticketsAvailable,
        createdBy
    };
    events.push(event)
    await saveData(pathAEventsJson, events);
    return {message: "Event created successfully"};
}



async function updateTicketsAvailable(eventName, amount) {
    const events = await loadData(pathAEventsJson);

    const i = events.findIndex(event => event.eventName === eventName);

    const newObj = {
        ...events[i],
        ticketsAvailable: events[i].ticketsAvailable - amount

    }
    events[i] = newObj;
    await saveData(pathAEventsJson, events);
}



export { getAllEvents, addEvent, updateTicketsAvailable};