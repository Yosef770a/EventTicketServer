import { saveData, loadData } from "../utils/readWriteJson.js";

const pathAReceiptsJson = './data/receipts.json'


async function getAllReceipts() {
    const data = await loadData(pathAReceiptsJson);
    return data;
}

async function addReceipts(username, eventName, ticketsBought) {
    const receipts = await loadData(pathAReceiptsJson);
    const receipt = {
        username,
        eventName,
        ticketsBought
    };
    receipts.push(receipt)
    await saveData(pathAReceiptsJson, receipts);
}

export {getAllReceipts, addReceipts}