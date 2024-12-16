const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registerMsg = document.getElementById('register-msg');
const loginMsg = document.getElementById('login-msg');
const loginSection = document.getElementById('login-section');

// Mock database
let users = {};

// Password validation function
function validatePassword(password) {
    const lengthRule = password.length >= 8;
    const upperCaseRule = /[A-Z]/.test(password);
    const lowerCaseRule = /[a-z]/.test(password);
    const numberRule = /\d/.test(password);
    const specialCharRule = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const spaceRule = !/\s/.test(password);

    return lengthRule && upperCaseRule && lowerCaseRule && numberRule && specialCharRule && spaceRule;
}

// Registration form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (!validatePassword(password)) {
        registerMsg.textContent = 'Password does not meet the requirements.';
        return;
    }

    if (password !== confirmPassword) {
        registerMsg.textContent = 'Passwords do not match.';
        return;
    }

    if (users[username]) {
        registerMsg.textContent = 'Username is already taken.';
        return;
    }

    users[username] = password;
    registerMsg.style.color = 'green';
    registerMsg.textContent = 'Registration successful! Please log in.';
    
    // Switch to login section
    loginSection.classList.remove('hidden');
    registerForm.reset();
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username] === password) {
        loginMsg.style.color = 'green';
        loginMsg.textContent = 'Login successful!';
    } else {
        loginMsg.style.color = 'red';
        loginMsg.textContent = 'Invalid username or password.';
    }
});