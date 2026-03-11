import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('cv_extracted.txt', pdfParser.getRawTextContent());
    console.log("Extraction complete.");
});

pdfParser.loadPDF('public/assets/Hampus-lang-CV (3).pdf');
