const flightForm = document.getElementById('flight-form');
const flightNumberInput = document.getElementById('flight-number');
const submitBtn = document.getElementById('submit-btn');
const flightStatusDiv = document.getElementById('flight-status');

// Aviation Edge API endpoint and API key
const apiEndpoint = 'https://aviation-edge.com/v2/public/flights';
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

flightForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const flightNumber = flightNumberInput.value.trim();

    if (flightNumber) {
        fetch(`${apiEndpoint}?flightNumber=${flightNumber}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const flightStatus = data[0];

                if (flightStatus) {
                    const statusHtml = `
                        <h2>Flight Status:</h2>
                        <p>Airline: ${flightStatus.airline}</p>
                        <p>Flight Number: ${flightStatus.flightNumber}</p>
                        <p>Departure Airport: ${flightStatus.departureAirport}</p>
                        <p>Arrival Airport: ${flightStatus.arrivalAirport}</p>
                        <p>Status: ${flightStatus.status}</p>
                    `;

                    flightStatusDiv.innerHTML = statusHtml;
                } else {
                    flightStatusDiv.innerHTML = '<p>Flight not found.</p>';
                }
            })
            .catch((error) => {
                console.error(error);
                flightStatusDiv.innerHTML = '<p>Error fetching flight status.</p>';
            });
    } else {
        flightStatusDiv.innerHTML = '<p>Please enter a flight number.</p>';
    }
});