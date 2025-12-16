/*=============== MENU SHOW/HIDE ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== TESTIMONIAL SWIPER (1 CARD MOBILE) ===============*/
let swiperTestimonial = new Swiper(".testimonials-swiper", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    slidesPerView: 1, /* FORCE 1 CARD ON MOBILE */
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 48,
      },
    },
});

/*=============== RESUME ACCORDION (CRASH PROOF) ===============*/
const accordionItems = document.querySelectorAll('.resume-item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.resume-header');
    
    // Safety check
    if(header) {
        header.addEventListener('click', () => {
            const openItem = document.querySelector('.accordion-open');
            toggleItem(item);
            if(openItem && openItem!== item){
                toggleItem(openItem);
            }
        });
    }
});

const toggleItem = (item) =>{
    const content = item.querySelector('.resume-content');
    if(item.classList.contains('accordion-open')){
        content.removeAttribute('style');
        item.classList.remove('accordion-open');
    }else{
        content.style.height = content.scrollHeight + 'px';
        item.classList.add('accordion-open');
    }
}

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('message');

const sendEmail = (e) => {
    e.preventDefault();
    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_va8dh2w', 'template_fnquuhg', '#contact-form', 'YOUR_PUBLIC_KEY')
    .then(() => {
        contactMessage.textContent = 'Message sent successfully ✅';
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
        contactForm.reset();
    }, () => {
        contactMessage.textContent = 'Message not sent (service error) ❌';
    });
}
if(contactForm) contactForm.addEventListener('submit', sendEmail);