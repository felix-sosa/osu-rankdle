//Function to get player profile link from google sheet and display once guess has been submitted
const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNzxWLOwyQsZP0Acll26QlKH8KlENvFc7eVosEbKB_A6jbXPh0GHlOoVeg2baAG8JOVr7AsqeqhS6M/pub?output=csv';

async function fetchData() {
    try {
        const response = await fetch(googleSheetURL);
        const csvData = await response.text();

        // Parse CSV data into an array of objects
        const rows = csvData.split('\n');
        const headers = rows[0].split(',');
        const jsonData = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            const rowData = {};
            for (let j = 0; j < headers.length; j++) {
                rowData[headers[j]] = row[j];
            }
            jsonData.push(rowData);
        }

        const url = jsonData[0].Profile; // Replace with your actual URL
        const linkText = "Profile"; // Replace with the text you want for the link

        const linkElement = document.createElement("a");
        linkElement.href = url;
        linkElement.textContent = linkText;
        linkElement.target = "_blank"; // Open in a new tab

        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML = ''; // Clear the existing content
        resultsElement.appendChild(linkElement);


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Call the function on page load
    myFunction();
  });

//Function to deal with getting user input
function submitFunc(){
    //Display result text
    const text = document.getElementById("results");
    text.style.display = "block";
}