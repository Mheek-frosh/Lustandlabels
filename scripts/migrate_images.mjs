import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../src/data/products.js');
const PUBLIC_DIR = path.join(__dirname, '../public/images/products');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

async function downloadImage(url, filepath) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
        console.log(`Downloaded: ${filepath}`);
        return true;
    } catch (error) {
        console.error(`Failed to download ${url}: ${error.message}`);
        return false;
    }
}

async function migrate() {
    const content = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const lines = content.split('\n');
    let newContent = [];
    let currentId = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for ID
        const idMatch = line.match(/id:\s*(\d+)/);
        if (idMatch) {
            currentId = idMatch[1];
        }

        // Check for Image
        const imageMatch = line.match(/image:\s*"(https?:\/\/[^"]+)"/);
        if (imageMatch && currentId) {
            const url = imageMatch[1];
            const ext = '.jpg'; // Assuming jpg for unsplash or enforcing it
            const filename = `${currentId}${ext}`;
            const localPath = `/images/products/${filename}`;
            const fullPath = path.join(PUBLIC_DIR, filename);

            // Download
            await downloadImage(url, fullPath);

            // Indentation
            const indent = line.substring(0, line.indexOf('image:'));

            // Replace line
            newContent.push(`${indent}image: "${localPath}",`);
            newContent.push(`${indent}originalImage: "${url}",`); // Preserve original for WhatsApp
        } else {
            newContent.push(line);
        }
    }

    fs.writeFileSync(PRODUCTS_FILE, newContent.join('\n'));
    console.log('Migration complete!');
}

migrate();
