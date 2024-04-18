import { computePosition } from "@floating-ui/dom";

const FORM = document.forms[0];
const INPUT = FORM.contactEmail;
const INPUT_MESSAGE = document.querySelector(".contact__email-message");

computePosition(INPUT, INPUT_MESSAGE, { placement: "top" }).then(({ x, y }) => {
    Object.assign(INPUT_MESSAGE.style, {
        left: `${x}px`,
        top: `${y}px`,
    });
});

FORM.addEventListener("submit", (e) => {
    if (validateEmail()) {
        submitForm();
        INPUT.value = "";
        validateEmail();
    }
    e.preventDefault();
});

INPUT.addEventListener("input", () => {
    validateEmail();
});

function validateEmail() {
    const emailValue = INPUT.value;
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    INPUT.classList.remove("_valid");
    INPUT.classList.remove("_invalid");
    INPUT_MESSAGE.style.visibility = "hidden";

    if (!emailValue.length) {
        return false;
    }

    if (emailPattern.test(emailValue)) {
        INPUT.classList.add("_valid");

        return true;
    } else {
        INPUT.classList.add("_invalid");
        INPUT_MESSAGE.style.visibility = "visible";

        return false;
    }
}

async function submitForm() {
    const emailValue = INPUT.value;

    try {
        const response = await fetch("https://formspree.io/f/moqgkgpk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contactEmail: emailValue }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Success:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}
