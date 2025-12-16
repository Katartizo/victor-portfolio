/*=============== MENU ===============*/
const navMenu  = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle');

/*=============== SHOW MENU (Mobile) ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'); // We added this

/* Show Menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/* Hide Menu (Close with X) */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navwork = document.querySelectorAll('.nav-work');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');

   navMenu.classList.remove('show-menu');
    navToggle.classList.remove('animate-toggle');
}

navwork.forEach((a) => a.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/

const scrollHeader = () => {
    const header = document.getElementById('header');

    window.scrollY >= 20 
    ? header.classList.add('bg-header') 
    : header.classList.remove('bg-header');
};

window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current)  => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id'),
        sectionClass = document.querySelector('.nav-menu a[href*' +  sectionId + ']');


        if(scrollY > sectionTop && scrollY  <=  sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);


/*=============== SERVICES SWIPER ===============*/
var servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,

    pagination: {
        el: '.swiper-pagination',
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1208: {
            slidesPerView: 3,
        },
    },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixer =  mixitup('.work-container', {
    selectors: {
        target: '.mix',
    },
    animation: {
        duration: 300,
    },
});

/* Active work */
const linkWork = document.querySelectorAll('.work-item');
function activeWork() {
    linkWork.forEach((a) => {
        a.classList.remove('active-work');
    });
    this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*=============== RESUME ===============*/
const accordionItems = document.querySelectorAll('.resume-item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.resume-header'),
    content = item.querySelector('.resume-content'),
    icon = item.querySelector('.resume-icon i');

    header.addEventListener('click', () => {
        const isOpen = item.classList.toggle('accordion-open');

        content.style.height =  isOpen ? content.scrollHeight + 'px' : '0';
        icon.className = isOpen ?  'ri-subtract-line' : 'ri-add-line';

        accordionItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
                otherItem.querySelector('.resume-content').style.height = '0';
                otherItem.querySelector('.resume-icon i').className = 'ri-add-line';
                otherItem.classList.remove('accordion-open'); 
            }
        });
    });
});


/*=============== TESTIMONIALS SWIPER ===============*/
var testimonialsSwiper = new Swiper('.testimonials-swiper', {
    spaceBetween: 32,

    pagination: {
        el: '.swiper-pagination',
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1208: {
            slidesPerView: 3,
        },
    },
});


/*=============== EMAIL JS (ERROR INSIDE INPUTS) ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactSubject = document.getElementById('contact-subject'),
      contactMessage = document.getElementById('contact-message'),
      message = document.getElementById('message');

const sendEmail = (e) => {
    e.preventDefault();

    // 1. Create a list of your inputs
    const inputs = [contactName, contactEmail, contactSubject, contactMessage];
    let hasError = false;

    // 2. Check each input. If empty, turn it RED and show message INSIDE.
    inputs.forEach(input => {
        if(input.value === ''){
            hasError = true;
            input.classList.add('input-error'); // Turns border red (from CSS)
            input.placeholder = 'Write all the input fields'; // Shows message inside
        }
    });

    if(hasError){
        // 3. Remove the red error after 3 seconds
        setTimeout(() => {
            inputs.forEach(input => {
                input.classList.remove('input-error');
                input.placeholder = ''; // Clear the message
            });
        }, 3000);
    } else {
        // 4. If no errors, Send Email
        // 👇👇 PASTE YOUR KEYS HERE 👇👇
        emailjs.sendForm('service_fq0mpjm', 'template_hnvn4u7', '#contact-form', 'ELFrx7vVcXdL9U6os')
            .then(() => {
                message.textContent = 'Message sent successfully ✅';
                message.style.color = 'green';
                setTimeout(() => { message.textContent = '' }, 5000);
                contactForm.reset();
            }, (error) => {
                alert('OPs! SOMETHING WENT WRONG...', error);
            });
    }
}
if(contactForm) contactForm.addEventListener('submit', sendEmail);



/*=============== STYLE SWITCHER ===============*/

/* Switcher show */

/* Switcher hidden */

/*=============== THEME COLORS ===============*/

/*=============== LIGHT/DARK MODE ===============*/
const themeButton = document.getElementById('theme-toggle');

themeButton.addEventListener('click',  () => {
    document.body.classList.toggle('dark-theme');
    themeButton.classList.toggle('ri-sun-line');
});