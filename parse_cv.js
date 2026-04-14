const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('MukromKaruniaAzza_CV_GamesInstitut2026.pdf');
pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('cv_parsed.txt', data.text);
    console.log('CV parsed successfully.');
}).catch(function(error) {
    console.error('Error parsing CV:', error);
});

let portfolioBuffer = fs.readFileSync('MukromKaruniaAzza_Portfolio_GamesInstitut2026.pdf');
pdf(portfolioBuffer).then(function(data) {
    fs.writeFileSync('portfolio_parsed.txt', data.text);
    console.log('Portfolio parsed successfully.');
}).catch(function(error) {
    console.error('Error parsing Portfolio:', error);
});
