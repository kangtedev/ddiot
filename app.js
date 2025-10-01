const API_URL = 'https://your-netlify-function.netlify.app/.netlify/functions/led';

const ledStatus = document.getElementById('ledStatus');
const toggleBtn = document.getElementById('toggleBtn');
const messageDiv = document.getElementById('message');

// Fetch current LED state
async function getLedState() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        updateUI(data.led);
    } catch (error) {
        showMessage('Error fetching LED state', 'error');
    }
}

// Toggle LED
async function toggleLed() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'toggle' })
        });
        
        const data = await response.json();
        updateUI(data.led);
        showMessage('LED toggled successfully!', 'success');
    } catch (error) {
        showMessage('Error toggling LED', 'error');
    }
}

// Update UI
function updateUI(state) {
    if (state === 'on') {
        ledStatus.textContent = 'ON';
        ledStatus.className = 'led-indicator on';
    } else {
        ledStatus.textContent = 'OFF';
        ledStatus.className = 'led-indicator off';
    }
}

// Show message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 3000);
}

// Event listener
toggleBtn.addEventListener('click', toggleLed);

// Load initial state
getLedState();