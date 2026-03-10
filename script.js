const header = document.querySelector("header");
const home = document.querySelector("#home");

window.addEventListener("scroll", () => {

    const homeBottom = home.offsetHeight;

    if (window.scrollY < homeBottom - 80) {
        header.classList.remove("scrolled");
    } 
    else {
        header.classList.add("scrolled");
    }

});

const filterButtons = document.querySelectorAll('.portfolio-filters button');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        filterButtons.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

    });
});
const cards = document.querySelectorAll('.cards');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        cards.forEach(card => {

            const category = card.getAttribute('data-category');

            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

        });
    });
});
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

const navMenu = document.getElementById("nav-menu"); 

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", async function(e) {
        e.preventDefault(); 

        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const message = form.querySelector("#description");

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert("Please fill in all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            alert("Please enter a valid email.");
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
  
                const oldMessage = form.querySelector(".success-message");
                if (oldMessage) oldMessage.remove();

                let successMessage = document.createElement("div");
                successMessage.textContent = "Thank you! Your message has been sent.";
                successMessage.classList.add("success-message");

                successMessage.style.color = "orange";
                successMessage.style.textAlign = "center";
                successMessage.style.marginTop = "15px";
                successMessage.style.fontWeight = "bold";
                successMessage.style.transition = "all 0.3s ease";

                form.querySelector("button[type='submit']").after(successMessage);

                form.reset();

                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                alert("Oops! Something went wrong.");
            }
        } catch (error) {
            alert("Oops! Could not send the message.");
        }
    });
});
