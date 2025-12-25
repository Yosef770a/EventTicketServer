import { existsSync } from "fs";
import { writeFile, readFile } from "fs/promises";


export async function loadData(path) {
    if (!existsSync(path)) await writeFile(path, "[]", "utf8");
    try {
        return JSON.parse(await readFile(path, "utf8"));
    } catch (e) {
            await writeFile(path, "[]", "utf8");
            return [];
    }
}


export async function saveData(path,data) {
  await writeFile(path, JSON.stringify(data, null, 2), "utf8");
}


