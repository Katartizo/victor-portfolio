/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav-link')
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
/* This logic makes the filter buttons work */
let mixerPortfolio = mixitup('.work-container', {
    selectors: {
        target: '.card'
    },
    animation: {
        duration: 300
    }
});

/* Link Active Work Button */
const linkWork = document.querySelectorAll('.work-item')
function activeWork(){
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l=> l.addEventListener('click', activeWork))

/*=============== SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonials-swiper", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2, spaceBetween: 48 },
    },
});

let servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,
    grabCursor: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
    },
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('message')

const sendEmail = (e) => {
    e.preventDefault()
    // Replace with your actual IDs
    emailjs.sendForm('service_fq0mpjm', 'template_hnvn4u7', '#contact-form', 'ELFrx7vVcXdL9U6os')
        .then(() => {
            contactMessage.textContent = 'Message sent successfully ✅'
            setTimeout(() => { contactMessage.textContent = '' }, 5000)
            contactForm.reset()
        }, () => {
            contactMessage.textContent = 'Message not sent (service error) ❌'
        })
}
if(contactForm) contactForm.addEventListener('submit', sendEmail)