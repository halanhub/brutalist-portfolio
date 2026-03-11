const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/assets/Hampus-lang-CV (3).pdf');
pdf(dataBuffer).then(function(data) {
    console.log("PDF TEXT START");
    console.log(data.text);
    console.log("PDF TEXT END");
}).catch(err => console.error(err));
