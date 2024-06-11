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

