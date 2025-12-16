/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

/* Menu show - hidden */
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('animate-toggle');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
/* FIXED: We changed '.nav-work' to '.nav-link' so the menu actually closes */
const navLinks = document.querySelectorAll('.nav-link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    // Remove the show-menu class when a link is clicked
    if(navMenu) navMenu.classList.remove('show-menu');
    if(navToggle) navToggle.classList.remove('animate-toggle');
}
navLinks.forEach((n) => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    if(!header) return;

    (window.scrollY || window.pageYOffset) >= 20 
    ? header.classList.add('bg-header') 
    : header.classList.remove('bg-header');
};
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id');
        
        /* FIXED: Added quotes to prevent errors */
        const sectionClass = document.querySelector('.nav-menu a[href*="' + sectionId + '"]');

        if(sectionClass) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionClass.classList.add('active-link');
            } else {
                sectionClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*=============== SERVICES SWIPER ===============*/
var servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1208: { slidesPerView: 3 },
    },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixer = mixitup('.work-container', {
    selectors: { target: '.mix' },
    animation: { duration: 300 },
});

/* Active work */
const linkWork = document.querySelectorAll('.work-item');
function activeWork() {
    linkWork.forEach((a) => a.classList.remove('active-work'));
    this.classList.add('active-work');
}
linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*=============== RESUME (CRASH-PROOF) ===============*/
const accordionItems = document.querySelectorAll('.resume-item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.resume-header');
    const content = item.querySelector('.resume-content');
    const icon = item.querySelector('.resume-icon i');

    if(header && content && icon) {
        header.addEventListener('click', () => {
            const isOpen = item.classList.toggle('accordion-open');

            content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
            icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

            accordionItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
                    otherItem.querySelector('.resume-content').style.height = '0';
                    otherItem.querySelector('.resume-icon i').className = 'ri-add-line';
                    otherItem.classList.remove('accordion-open'); 
                }
            });
        });
    }
});

/*=============== TESTIMONIALS SWIPER (FIXED) ===============*/
var testimonialsSwiper = new Swiper('.testimonials-swiper', {
    spaceBetween: 32,
    grabCursor: true,
    
    /* CRITICAL FIX: Forces 1 big card on mobile */
    slidesPerView: 1, 

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1208: { slidesPerView: 3 },
    },
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form'),
    message = document.getElementById('message');

/* Note: Assuming emailjs is loaded in your HTML */
const sendEmail = (e) => {
    e.preventDefault();
    
    // Simple validation
    if(contactForm.checkValidity()) {
         // You need to replace 'YOUR_SERVICE_ID', etc. with your real IDs if they differ
        emailjs.sendForm('service_va8dh2w', 'template_fnquuhg', '#contact-form')
        .then(() => {
            message.textContent = 'Message sent ✔';
            message.classList.add('color-first');
            setTimeout(() => { message.textContent = ''; }, 5000);
            contactForm.reset();
        }, () => {
            message.textContent = 'OOPS! SOMETHING WENT WRONG...';
            message.classList.add('color-red');
        });
    } else {
        message.textContent = 'Write all the input fields';
        message.classList.add('color-red');
        setTimeout(() => { message.textContent = ''; }, 3000); 
    }
};
if(contactForm) contactForm.addEventListener('submit', sendEmail);

/*=============== THEME TOGGLE ===============*/
const themeButton = document.getElementById('theme-toggle');
if(themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeButton.classList.toggle('ri-sun-line');
    });
}