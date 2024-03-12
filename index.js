// website vistor counter lambda functions and api

const counterURL = 'https://scpkrzygr9.execute-api.us-east-1.amazonaws.com/dev';

// Use the fetch API to get data from the URL
fetch(counterURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
    })
    .then(record_count => {
        // Assuming 'data' is the object and it has a property named 'value' that we want to display
        const value = record_count;

        // Get the HTML element by its ID and set its content to the value we got from the API
        document.getElementById('site-counter').textContent = value;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        document.getElementById('site-counter').textContent = 'Failed to load data';
    });