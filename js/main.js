// Remove any commented-out code if not needed
// setTimeout(function () {
//     $('.loader-wrapper').fadeToggle();
// }, 2700);

// Form Validation and Submission
const form = document.getElementById('contactForm');
const nameInput = form.querySelector("#name");
const emailInput = form.querySelector("#email");
const phoneInput = form.querySelector("#phone");
const messageInput = form.querySelector("#message");

const nameError = form.querySelector("#nameError");
const emailError = form.querySelector("#emailError");
const phoneError = form.querySelector("#phoneError");
const messageError = form.querySelector("#messageError");

function validateForm() {
    let isValid = true;

    // Helper function to check input and set error messages
    const trimValue = (input, errorField, message) => {
        if (input.value.trim() === "") {
            errorField.innerHTML = message;
            isValid = false;
        } else {
            errorField.innerHTML = ""; // Clear previous error
        }
    };

    trimValue(nameInput, nameError, `<i class="fa-solid fa-circle-exclamation"></i> Please enter your name.`);
    trimValue(emailInput, emailError, `<i class="fa-solid fa-circle-exclamation"></i> Please enter your email.`);
    trimValue(phoneInput, phoneError, `<i class="fa-solid fa-circle-exclamation"></i> Please enter your phone number.`);
    trimValue(messageInput, messageError, `<i class="fa-solid fa-circle-exclamation"></i> Please enter your message.`);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid email address.`;
        isValid = false;
    }

    if (!/^(\+27|0)[0-9]{9,10}$/.test(phoneInput.value.trim())) {
        phoneError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid South African phone number.`;
        isValid = false;
    }

    return isValid;
}

function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) {
        return false;
    }

    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        document.getElementById('recaptchaError').innerHTML = `<i class="fa-solid fa-bug"></i> Please complete the reCAPTCHA.`;
        return false;
    }

    const formData = new FormData(form);
    formData.append('g-recaptcha-response', recaptchaResponse);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            grecaptcha.reset();
            showModal();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    alert(data.errors.map(error => error.message).join(", "));
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            });
        }
    }).catch(() => {
        alert('Oops! There was a problem submitting your form');
    });

    return false;
}

function showModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Review Functionality
const REVIEWS = [
    { id: 6, name: 'Ethan', avatar: 'img/reviews/img2.png', review: `The web development service from DesignX was exceptional. The final product was visually appealing and highly functional. Excellent attention to detail.` },
    { id: 0, name: 'Bob', role: 'Architect', avatar: 'img/reviews/img1.png', review: `Working with DesignX was a delight. They created a fantastic logo for my company, showcasing remarkable creativity and professionalism` },
    { id: 2, name: 'Charlie', role: 'DevOps Engineer', avatar: 'img/reviews/img3.png', review: `Thanks to the seamless web hosting service, our site runs smoothly and efficiently. DesignX has proven to be reliable and effective.` },
    { id: 3, name: 'Diana', role: 'Product Manager', avatar: 'img/reviews/img4.png', review: `From eye-catching ads to stunning posters, DesignX's graphic design skills are superb. They played a crucial role in our successful ad campaign.` },
    { id: 13, name: 'William', role: 'Software Engineer', avatar: 'img/reviews/img6.png', review: `I received many compliments on the business cards from DesignX. The quality and creativity were outstanding. Will definitely use their services again.` },
    { id: 4, name: 'Fiona', role: 'Marketing Specialist', avatar: 'img/reviews/img5.png', review: `DesignX turned our outdated website into a modern, user-friendly platform. Their web development skills are second to none. Highly recommended.` },
    { id: 10, name: 'George', role: 'Software Developer', avatar: 'img/reviews/img7.png', review: `The event invitations designed by DesignX were elegant and perfectly aligned with our theme. Their work is exceptional and delivered on time.` },
    { id: 11, name: 'Hannah', role: 'Graphic Designer', avatar: 'img/reviews/img8.png', review: `Our startup's branding package was spot-on, thanks to DesignX. Everything was cohesive and professional, demonstrating their dedication to quality.` },
    { id: 5, name: 'Ian', role: 'CTO', avatar: 'img/reviews/img9.png', review: `From flyers to posters, DesignX consistently delivers creative and impactful designs. Their graphic design services are truly outstanding.` },
];

let currentCard;

// Add reviews to DOM
function renderReviews() {
    const tplCard = document.querySelector("#tpl-card");
    const listCards = document.querySelector("#list-cards");
    const fragment = document.createDocumentFragment();

    const bgColorClasses = [
        'bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4',
        'bg-color-5', 'bg-color-6', 'bg-color-7', 'bg-color-8', 'bg-color-9'
    ];

    REVIEWS.forEach((r, idx) => {
        const clone = tplCard.content.cloneNode(true);
        clone.querySelector("blockquote").innerText = `"${r.review}"`;
        clone.querySelector("[review-name]").innerText = r.name;
        clone.querySelector("[review-img]").src = r.avatar;
        clone.querySelector("blockquote").classList.add(bgColorClasses[idx % bgColorClasses.length]);

        if (idx === 0) {
            const cardDiv = clone.querySelector("div");
            cardDiv.classList.remove("opacity-0");
            clone.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full");
            clone.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");
            currentCard = cardDiv;
        }
        fragment.appendChild(clone);
    });

    listCards.appendChild(fragment);
}

// SLIDER
function sliderInit() {
    renderReviews();

    let currentIndex = 0;
    const slider = document.querySelector("#slider");
    const slides = slider.querySelectorAll(".cards");
    const totalSlides = REVIEWS.length;
    const sliderButtons = document.querySelectorAll("[data-slide]");

    sliderButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            sliderButtons[0].classList.add("translate-x-20");
            sliderButtons[1].classList.add("-translate-x-20");

            // Slide out old current card
            currentCard.querySelector("blockquote").classList.add("scale-0", "before:-translate-y-full");
            currentCard.querySelector(".details").classList.add("scale-0", "translate-y-[150px]");

            // Move currentIndex forwards or backwards
            if (btn.getAttribute("data-slide") === "prev") {
                currentIndex = (totalSlides + currentIndex - 1) % totalSlides;
            } else {
                currentIndex = (totalSlides + currentIndex + 1) % totalSlides;
            }

            // Slide in new current card
            setTimeout(() => {
                currentCard = slides[currentIndex];
                currentCard.classList.remove("opacity-0");
                currentCard.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full");
                currentCard.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");

                sliderButtons[0].classList.remove("translate-x-20");
                sliderButtons[1].classList.remove("-translate-x-20");
            }, 500);
        });
    });
}

sliderInit();

// External links and navigation
const btns = [
    { id: 'btnweb_one', url: 'https://nails-and-beauty.netlify.app/' },
    { id: 'btnweb_two', url: 'https://indico-construction-solutions.netlify.app' },
    { id: 'btnweb_three', url: 'https://bmw-drivebavaria-official.netlify.app/' },
    { id: 'btnweb_four', url: 'https://www.webfolio.co.za/' },
    { id: 'btnweb_five', url: 'https://designx-signup-and-login-system.onrender.com' },
    { id: 'btnweb_six', url: 'https://dark-angel-tattoos.netlify.app/' },
];

btns.forEach(btn => {
    document.getElementById(btn.id).addEventListener('click', () => {
        window.open(btn.url, '_blank');
    });
});

document.getElementById("ConvoBot-button").addEventListener("click", () => {
    window.location.href = 'https://convobot-chatbot.vercel.app';
});

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Sticky Navbar and Back-to-Top Button
$(window).scroll(debounce(function () {
    if ($(this).scrollTop() > 300) {
        $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
    } else {
        $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
    }

    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
}));
