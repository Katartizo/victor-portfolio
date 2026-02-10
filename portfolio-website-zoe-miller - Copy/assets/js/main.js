/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ON CLICK ===============*/
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if(sectionsClass){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            }else{
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SERVICES SWIPER ===============*/
let servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
    },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
if(typeof mixitup !== 'undefined' && document.querySelector('.work-container')){
    let mixerPortfolio = mixitup('.work-container', {
        selectors: { target: '.card' },
        animation: { duration: 300 }
    });
}

/* Link Active Work */
const linkWork = document.querySelectorAll('.work-item')
function activeWork(){
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l=> l.addEventListener('click', activeWork))

/*=============== TESTIMONIALS SWIPER ===============*/
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

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('message')

const sendEmail = (e) => {
    e.preventDefault()
    // Check if EmailJS is loaded
    if(typeof emailjs === 'undefined') {
        console.error("EmailJS not loaded");
        return;
    }
    
    // REPLACE these IDs with your actual EmailJS keys!
    emailjs.sendForm('service_fq0mpjm', 'template_hnvn4u7', '#contact-form', 'ELFrx7vVcXdL9U6os')
        .then(() => {
            contactMessage.textContent = 'Message sent successfully ✅'
            contactMessage.style.color = 'green'
            setTimeout(() => { contactMessage.textContent = '' }, 5000)
            contactForm.reset()
        }, () => {
            contactMessage.textContent = 'Message not sent (service error) ❌'
            contactMessage.style.color = 'red'
        })
}
if(contactForm) contactForm.addEventListener('submit', sendEmail)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-toggle')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

if(themeButton){
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}



/* ================================================== */
/* 🚀 RESUME ACCORDION FIX (Paste at Bottom of JS) 🚀 */
/* ================================================== */

const resumeHeaders = document.querySelectorAll('.resume-header');

resumeHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        const item = header.parentNode;
        const content = item.querySelector('.resume-content');

        // Check if this item is already open
        if (item.classList.contains('accordion-open')) {
            // If open, close it
            item.classList.remove('accordion-open');
            content.style.height = '0px';
        } else {
            // If closed, open it (and close others)
            
            // 1. Close all other items first
            document.querySelectorAll('.resume-item').forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
                    otherItem.classList.remove('accordion-open');
                    otherItem.querySelector('.resume-content').style.height = '0px';
                }
            });

            // 2. Open the clicked item
            item.classList.add('accordion-open');
            content.style.height = content.scrollHeight + 'px';
        }
    });
});