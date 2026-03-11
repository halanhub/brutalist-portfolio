import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

let dataBuffer = fs.readFileSync('public/assets/Hampus-lang-CV (3).pdf');
pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => console.error(err));
