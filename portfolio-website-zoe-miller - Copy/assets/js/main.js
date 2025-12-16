/*=============== MENU ===============*/
const navMenu  = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle');

/* Menu show - hidden */
navToggle.addEventListener('click', ( ) => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('animate-toggle');
});

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


/*=============== EMAIL JS & VALIDATION (FIXED) ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactSubject = document.getElementById('contact-subject'), /* Matches HTML ID now */
      contactMessage = document.getElementById('contact-message'),
      message = document.getElementById('message');

const sendEmail = (e) => {
    e.preventDefault();

    // 1. Check if any field is empty
    if(contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactMessage.value === ''){
        
        // Add color (red)
        message.classList.remove('color-blue');
        message.classList.add('color-red');

        // Show text
        message.textContent = 'Write all the input fields 📩';

        // Remove message after 3 seconds
        setTimeout(() => {
            message.textContent = '';
        }, 3000);
    } else {
        // 2. If fields are full, Send Email
        // 👇👇 PASTE YOUR PUBLIC KEY HERE 👇👇
        emailjs.sendForm('service_va8dh2w', 'template_fnquuhg', '#contact-form', 'YOUR_PUBLIC_KEY_HERE')
            .then(() => {
                // Show success message
                message.classList.add('color-blue');
                message.textContent = 'Message sent ✅';

                // Remove message after 5 seconds
                setTimeout(() => {
                    message.textContent = '';
                }, 5000);

                // Clear input fields
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