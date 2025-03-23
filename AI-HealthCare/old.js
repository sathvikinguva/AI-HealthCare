// Load Particles.js
particlesJS.load('particles-js', 'particles.json', function () {
    console.log('Particles.js loaded!');
});

// Disable scrolling on login page
document.body.style.overflow = 'hidden';

// Show welcome page for 3 seconds, then proceed to login page
function showWelcomePage() {
    const welcomePage = document.getElementById('welcome-page');
    const loginPage = document.getElementById('login-page');

    // Show welcome page
    welcomePage.style.display = 'flex';

    // Hide welcome page and show login page after 3 seconds
    setTimeout(() => {
        welcomePage.style.display = 'none'; // Hide welcome page
        loginPage.style.display = 'flex'; // Show login page
        document.body.style.overflow = 'auto'; // Enable scrolling after welcome page
    }, 3000); // 3 seconds
}

// Call the function when the page loads
window.onload = showWelcomePage;

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        // Hide login page
        document.getElementById('login-page').style.display = 'none';

        // Show welcome page
        const welcomePage = document.getElementById('welcome-page');
        welcomePage.style.display = 'flex';

        // Hide welcome page and show main app after 3 seconds
        setTimeout(() => {
            welcomePage.style.display = 'none'; // Hide welcome page
            document.getElementById('app').style.display = 'block'; // Show main app
            document.body.style.overflow = 'auto'; // Enable scrolling for the main app
        }, 3000); // 3 seconds
    } else {
        alert('Please enter username and password.');
    }
}

// Tab Switching
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Health Scheme Eligibility
function toggleSchemeDetails(show) {
    const schemeDetails = document.getElementById('scheme-details');
    const bookConsultationBtn = document.getElementById('book-consultation-btn');
    schemeDetails.style.display = show ? 'block' : 'none';
    bookConsultationBtn.style.display = 'block'; // Show button after selecting scheme option
}

// Book Consultation
function bookConsultation() {
    const isEligible = document.querySelector('input[name="scheme-eligibility"]:checked').value === 'yes';
    if (isEligible) {
        const schemeName = document.getElementById('scheme-name').value;
        const schemeCardNumber = document.getElementById('scheme-card-number').value;
        if (!schemeName || !schemeCardNumber) {
            alert('Please fill in all scheme details.');
            return;
        }
        alert(`Consultation booked under ${schemeName} (Card Number: ${schemeCardNumber}).`);
    } else {
        alert('Consultation booked without a health scheme.');
    }
}

// Show Doctors List
function showDoctors() {
    const isEligible = document.querySelector('input[name="scheme-eligibility"]:checked').value === 'yes';
    if (isEligible) {
        const schemeName = document.getElementById('scheme-name').value;
        const schemeCardNumber = document.getElementById('scheme-card-number').value;
        if (!schemeName || !schemeCardNumber) {
            alert('Please fill in all scheme details.');
            return;
        }
    }
    document.getElementById('doctor-list').style.display = 'block';
}

// Book Doctor
function bookDoctor(doctorName) {
    const isEligible = document.querySelector('input[name="scheme-eligibility"]:checked').value === 'yes';
    if (isEligible) {
        const schemeName = document.getElementById('scheme-name').value;
        const schemeCardNumber = document.getElementById('scheme-card-number').value;
        alert(`Booking consultation with ${doctorName} under ${schemeName} (Card Number: ${schemeCardNumber}).`);
    } else {
        alert(`Booking consultation with ${doctorName} without a health scheme.`);
    }
}

// Handle Delivery/Pickup Selection
function selectOption(option, pharmacyName) {
    if (option === 'delivery') {
        alert(`You selected delivery from ${pharmacyName}.`);
    } else if (option === 'pickup') {
        alert(`You selected pickup from ${pharmacyName}.`);
    }
}