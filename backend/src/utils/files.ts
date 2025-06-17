import * as fs from 'fs';

export async function readFile(path: string): Promise<string> {
    try {
        const content = await fs.promises.readFile(path, 'utf-8');
        return content;
    } catch (error) {
        throw new Error(`Error al leer el archivo: ${error}`);
    }
}