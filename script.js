const fs = require('fs');
const path = require('path');

// Function to convert CSV to HTML
function convertCSVtoHTML(csvFilePath, htmlFilePath) {
    // Read the CSV file
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading CSV file ${csvFilePath}:`, err);
            return;
        }

        // Split the CSV data by newlines
        const rows = data.split('\n');

        // Start building the HTML content
        let htmlContent = `<!DOCTYPE html>
<html>
<head>
<title>CSV to HTML</title>
<link rel="icon" href="../public/favicon.ico">
</head>
<body>
<table border="1">\n`;

        // Iterate through each row and create table rows
        rows.forEach((row, rowIndex) => {
            htmlContent += '<tr>';
            // Split row data by commas
            const columns = row.split(',');
            columns.forEach((column, columnIndex) => {
                // Use different tag for header row
                const tag = (rowIndex === 0) ? 'th' : 'td';
                htmlContent += `<${tag}>${column}</${tag}>`;
            });
            htmlContent += '</tr>\n';
        });

        // Close the HTML content
        htmlContent += `</table>
</body>
</html>`;

        // Write the HTML content to file
        fs.writeFile(htmlFilePath, htmlContent, (err) => {
            if (err) {
                console.error(`Error writing HTML file ${htmlFilePath}:`, err);
                return;
            }
            console.log(`HTML file ${htmlFilePath} successfully created!`);
        });
    });
}

// Function to convert all CSV files in a directory to HTML
function convertAllCSVsToHTML(folderPath) {
    // Read the directory
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Filter CSV files
        const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');

        // Create the HTML conversion folder if it doesn't exist
        const htmlConversionFolder = path.join(folderPath, '..', 'html_conversion');
        if (!fs.existsSync(htmlConversionFolder)) {
            fs.mkdirSync(htmlConversionFolder);
        }

        // Convert each CSV file to HTML
        csvFiles.forEach(csvFile => {
            const csvFilePath = path.join(folderPath, csvFile);
            const htmlFileName = path.basename(csvFile, '.csv') + '.html';
            const htmlFilePath = path.join(htmlConversionFolder, htmlFileName);
            convertCSVtoHTML(csvFilePath, htmlFilePath);
        });
    });
}

// Usage example: Replace './place_cvs_file_here' with the folder path containing your CSV files
const folderPath = './place_cvs_file_here';
convertAllCSVsToHTML(folderPath);
