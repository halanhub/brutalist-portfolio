const fs = require('fs');
let pdf;
try {
  pdf = require('pdf-parse');
} catch (e) {
  console.error("Failed to require", e);
}

const pdfFunc = typeof pdf === 'function' ? pdf : (pdf.default || Object.values(pdf).find(f => typeof f === 'function'));

let dataBuffer = fs.readFileSync('public/assets/Hampus-lang-CV (3).pdf');
pdfFunc(dataBuffer).then(function(data) {
    console.log("PDF TEXT START");
    console.log(data.text);
    console.log("PDF TEXT END");
}).catch(err => console.error(err));
