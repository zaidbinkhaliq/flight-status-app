const flightForm = document.getElementById('flight-form');
const flightNumberInput = document.getElementById('flight-number');
const submitBtn = document.getElementById('submit-btn');
const flightStatusDiv = document.getElementById('flight-status');

// AviationStack API endpoint and API key
const apiEndpoint = ' https://api.aviationstack.com/v1/flights';
const apiKey = 'Your Key'; // Replace with your actual API key

flightForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const flightNumber = flightNumberInput.value.trim();

    if (flightNumber) {
        fetch(`${apiEndpoint}?flight_iata=${flightNumber}&access_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.data && data.data.length > 0) {
                    const flightStatus = data.data[0];

                    const statusHtml = `
                        <h2>Flight Status:</h2>
                        <p>Airline: ${flightStatus.airline.name}</p>
                        <p>Flight Number: ${flightStatus.flight.iata}</p>
                        <p>Departure Airport: ${flightStatus.departure.airport}</p>
                        <p>Arrival Airport: ${flightStatus.arrival.airport}</p>
                        <p>Status: ${flightStatus.flight_status}</p>
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
