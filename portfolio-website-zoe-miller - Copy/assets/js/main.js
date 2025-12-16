/*=============== SHOW MENU (Mobile) ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu');
    });
}

/*=============== REMOVE MENU ON LINK CLICK ===============*/
const navLinks = document.querySelectorAll('.nav-link');
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

if(themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

/*=============== SWIPER TESTIMONIALS ===============*/
let swiperTestimonial = new Swiper(".testimonials-swiper", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    slidesPerView: 1, /* Default 1 card for mobile */
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 2, spaceBetween: 48 },
    },
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      message = document.getElementById('message');

const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_va8dh2w', 'template_fnquuhg', '#contact-form')
    .then(() => {
        message.textContent = 'Message sent successfully ✅';
        setTimeout(() => { message.textContent = '' }, 5000);
        contactForm.reset();
    }, () => {
        message.textContent = 'Error sending message ❌';
    });
}
if(contactForm) contactForm.addEventListener('submit', sendEmail);