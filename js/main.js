// setTimeout(function () {
//     $('.loader-wrapper').fadeToggle();
// }, 2700);

function validateForm() {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var messageInput = document.getElementById("message");

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var messageError = document.getElementById("messageError");

    var isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";

    if (nameInput.value.trim() === "") {
      nameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter your name.`;
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      emailError.innerHTML = "Please enter your email.";
      isValid = false;
    } else {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid email address.`;
        isValid = false;
      }
    }

    var phonePattern = /^(\+27|0)[0-9]{9,10}$/; // South African phone number pattern
    if (phoneInput.value.trim() === "") {
      phoneError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter your phone number.`;
      isValid = false;
    } else if (!phonePattern.test(phoneInput.value.trim())) {
      phoneError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid South African phone number.`;
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      messageError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter your message.`;
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

    const form = document.getElementById('contactForm');
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
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert('Oops! There was a problem submitting your form');
          }
        });
      }
    }).catch(error => {
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
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }


// Review Functionality
const REVIEWS = [
  {
      id: 6,
      name: 'Ethan',
      // role: 'Entrepreneur',
      avatar: 'img/reviews/img2.png',
      review: `The web development service from DesignX was exceptional. The final product was visually appealing and highly functional. Excellent attention to detail.`,
  },
  {
      id: 0,
      name: 'Bob',
      role: 'Architect',
      avatar: 'img/reviews/img1.png',
      review: `Working with DesignX was a delight. They created a fantastic logo for my company, showcasing remarkable creativity and professionalism`,
  },
  {
      id: 2,
      name: 'Charlie',
      role: 'DevOps Engineer',
      avatar: 'img/reviews/img3.png',
      review: `Thanks to the seamless web hosting service, our site runs smoothly and efficiently. DesignX has proven to be reliable and effective.`,
  },
  {
      id: 3,
      name: 'Diana',
      role: 'Product Manager',
      avatar: 'img/reviews/img4.png',
      review: `From eye-catching ads to stunning posters, DesignX's graphic design skills are superb. They played a crucial role in our successful ad campaign.`,
  },
  {
      id: 13,
      name: 'William',
      role: 'Software Engineer',
      avatar: 'img/reviews/img6.png',
      review: `I received many compliments on the business cards from DesignX. The quality and creativity were outstanding. Will definitely use their services again.`,
  },
  {
      id: 4,
      name: 'Fiona',
      role: 'Marketing Specialist',
      avatar: 'img/reviews/img5.png',
      review: `DesignX turned our outdated website into a modern, user-friendly platform. Their web development skills are second to none. Highly recommended.`,
  },
  {
      id: 10,
      name: 'George',
      role: 'Software Developer',
      avatar: 'img/reviews/img7.png',
      review: `The event invitations designed by DesignX were elegant and perfectly aligned with our theme. Their work is exceptional and delivered on time.`,
  },
  {
      id: 11,
      name: 'Hannah',
      role: 'Graphic Designer',
      avatar: 'img/reviews/img8.png',
      review: `Our startup's branding package was spot-on, thanks to DesignX. Everything was cohesive and professional, demonstrating their dedication to quality.`,
  },
  {
      id: 5,
      name: 'Ian',
      role: 'CTO',
      avatar: 'img/reviews/img9.png',
      review: `From flyers to posters, DesignX consistently delivers creative and impactful designs. Their graphic design services are truly outstanding.`,
  },
];

// Common vars
let currentCard;

// Add reviews to DOM
function renderReviews() {
  const tplCard = document.querySelector("#tpl-card");
  const listCards = document.querySelector("#list-cards");

  const bgColorClasses = [
      'bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4', 
      'bg-color-5', 'bg-color-6', 'bg-color-7', 'bg-color-8', 'bg-color-9'
  ];

  REVIEWS.forEach((r, idx) => {
      const clone = tplCard.content.cloneNode(true);
      clone.querySelector("blockquote").innerText = `"${r.review}"`;
      clone.querySelector("[review-name]").innerText = r.name;
      // clone.querySelector("[review-role]").innerText = r.role;
      clone.querySelector("[review-img]").src = r.avatar;

      // Assign background color
      clone.querySelector("blockquote").classList.add(bgColorClasses[idx % bgColorClasses.length]);

      if (idx === 0) {
          // Remove translate on first card
          clone.querySelector("div").classList.remove("opacity-0")
          clone.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full")
          clone.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]")
          currentCard = clone.querySelector("div");
      }
      listCards.append(clone)
  });
}

// SLIDER
function sliderInit() {
  // Add reviews to DOM
  renderReviews()

  let currentIndex = 0;
  const slider = document.querySelector("#slider");
  const slides = slider.querySelectorAll(".cards");
  const totalSlides = REVIEWS.length;
  const sliderButtons = document.querySelectorAll("[data-slide]");

  sliderButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
          sliderButtons[0].classList.add("translate-x-20")
          sliderButtons[1].classList.add("-translate-x-20")

          // Slide out old current card
          currentCard.querySelector("blockquote").classList.add("scale-0", "before:-translate-y-full")
          currentCard.querySelector(".details").classList.add("scale-0", "translate-y-[150px]")

          // Move currentIndex forwards or backwards
          if (btn.getAttribute("data-slide") === "prev") {
              currentIndex = (totalSlides + currentIndex - 1) % totalSlides;
          } else {
              currentIndex = (totalSlides + currentIndex + 1) % totalSlides;
          }

          // Slide in new current card
          setTimeout(() => {
              currentCard = slides[currentIndex];
              currentCard.classList.remove("opacity-0")
              currentCard.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full")
              currentCard.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");

              sliderButtons[0].classList.remove("translate-x-20")
              sliderButtons[1].classList.remove("-translate-x-20")
          }, 500)
      })
  });
}

sliderInit();

// End of Review Functionality





let btnWebOne = document.getElementById('btnweb_one');
let btnWebTwo = document.getElementById("btnweb_two");
let btnWebThree = document.getElementById("btnweb_three");
let btnWebFour = document.getElementById("btnweb_four");
let btnWebFive = document.getElementById("btnweb_five");
let btnWebSix = document.getElementById("btnweb_six");
let btnConvoBot = document.getElementById("ConvoBot-button");

btnWebOne.addEventListener('click', function(){
  window.open('https://nails-and-beauty.netlify.app/', 'blank')
})

btnWebTwo.addEventListener('click', function(){
  window.open('https://indico-construction-solutions.netlify.app', 'blank')
})

btnWebThree.addEventListener('click', function(){
  window.open('https://bmw-drivebavaria-official.netlify.app/', 'blank')
})

btnWebFour.addEventListener('click', function(){
    window.open('https://www.webfolio.co.za/', 'blank')
  })

btnWebFive.addEventListener('click', function(){
    window.open('https://designx-signup-and-login-system.onrender.com', 'blank')
  })

btnWebSix.addEventListener('click', function(){
    window.open('https://dark-angel-tattoos.netlify.app/', 'blank')
  })

btnConvoBot.addEventListener("click", function(){
  window.location.href = 'https://convobot-chatbot-5reans3i2-rahuldawpersads-projects.vercel.app/'
})

/*=============== SHOW MENU ===============*/
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/* Close menu when a nav link is clicked */
const navLinks = document.querySelectorAll('.nav__link')

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
})
// const navMenu = document.getElementById('nav-menu'),
//       navToggle = document.getElementById('nav-toggle'),
//       navClose = document.getElementById('nav-close')

/* Menu show */
// navToggle.addEventListener('click', () =>{
//    navMenu.classList.add('show-menu')
// })

/* Menu hidden */
// navClose.addEventListener('click', () =>{
//    navMenu.classList.remove('show-menu')
// })

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);

