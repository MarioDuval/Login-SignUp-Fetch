// import fetch from 'node-fetch'



function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        fetch_login();

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        fetch_register();

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


async function fetch_login() {
    // username":"spyder@dominio.es", "password":"man$Super1"

    const user = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    // const form = {
    //     user: document.getElementById("user").value,
    //     password: document.getElementById("pass").value,
    // };

    // console.log(form)
    const response = await fetch('http://localhost:3011/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: password
            // username: form.user.value,
            // password: form.password.value,
        }),
    });

    const data = await response.json();

    console.log(data);
}

async function fetch_register() {
    // username":"spyder@dominio.es", "password":"man$Super1"

    const user = document.getElementById("signupUsername").value;
    const password = document.getElementById("passReg").value;
    const email = document.getElementById("mail").value;
    console.log(user, password, email)

    const response = await fetch('http://localhost:3011/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: password,
            email: email
        }),
    });

    const data = await response.json();

    console.log(data);
}