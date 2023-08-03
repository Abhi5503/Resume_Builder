const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST endpoint to generate the PDF
app.post('/generate-pdf', (req, res) => {
    const resumeData = req.body;

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set appropriate headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    // Pipe the PDF to the response stream
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(20).text('Resume', { align: 'center' });
    doc.fontSize(14).text(`Name: ${resumeData.name}`);
    doc.fontSize(14).text(`Email: ${resumeData.email}`);
    // Add more fields as needed based on your resume form

    // Finalize the PDF and end the response
    doc.end();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
