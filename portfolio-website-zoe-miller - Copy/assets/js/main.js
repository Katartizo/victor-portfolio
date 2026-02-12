/* ================================================================= */
/* 🚀 MAIN JAVASCRIPT - ROBUST VERSION 🚀                            */
/* ================================================================= */

/*=============== SHOW MENU (Mobile Toggle) ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU ON LINK CLICK ===============*/
const navLink = document.querySelectorAll('.nav-link');
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 50 
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
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*=============== SERVICES & TESTIMONIALS SWIPERS ===============*/
/* We initialize these immediately as Swiper usually loads fast */
let servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,
    grabCursor: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
    },
});

let testimonialSwiper = new Swiper(".testimonials-swiper", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2, spaceBetween: 48 },
    },
});

/*=============== RESUME ACCORDION ===============*/
const resumeHeaders = document.querySelectorAll('.resume-header');
resumeHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        const item = header.parentNode;
        const content = item.querySelector('.resume-content');
        if (item.classList.contains('accordion-open')) {
            item.classList.remove('accordion-open');
            content.style.height = '0px';
        } else {
            document.querySelectorAll('.resume-item').forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
                    otherItem.classList.remove('accordion-open');
                    otherItem.querySelector('.resume-content').style.height = '0px';
                }
            });
            item.classList.add('accordion-open');
            content.style.height = content.scrollHeight + 'px';
        }
    });
});

/* ================================================================= */
/* 🛠️ SAFETY WRAPPER: WAITS FOR PAGE TO LOAD BEFORE FILTERING 🛠️ */
/* ================================================================= */
window.addEventListener('load', function() {
    
    /* --- 1. PORTFOLIO FILTER (MixItUp) --- */
    // We check if the container exists AND if MixItUp is loaded
    const containerEl = document.querySelector('.work-container');
    
    if (containerEl && typeof mixitup !== 'undefined') {
        let mixer = mixitup(containerEl, {
            selectors: {
                target: '.mix' // This matches your HTML class="card mix ..."
            },
            animation: {
                duration: 300
            }
        });
    } else {
        console.warn('MixItUp not loaded or Container not found.');
    }

    /* --- 2. PORTFOLIO ACTIVE LINK (Green Line) --- */
    const linkWork = document.querySelectorAll('.work-item');
    function activeWork(){
        linkWork.forEach(l => l.classList.remove('active-work'));
        this.classList.add('active-work');
    }
    linkWork.forEach(l => l.addEventListener('click', activeWork));
});





/*=============== EMAIL JS (With Button Feedback) ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactSubject = document.getElementById('contact-subject'),
      contactMessage = document.getElementById('contact-message'),
      message = document.getElementById('message'),
      contactBtn = document.querySelector('.contact-button'); // Select the button

const sendEmail = (e) => {
    e.preventDefault();

    // 1. Check Inputs
    const inputs = [contactName, contactEmail, contactSubject, contactMessage];
    let hasError = false;

    inputs.forEach(input => {
        if(input.value.trim() === ''){
            hasError = true;
            input.classList.add('input-error'); 
            if(!input.dataset.tempPlaceholder) input.dataset.tempPlaceholder = input.placeholder;
            input.placeholder = "Don't leave empty space"; 
        } else {
             input.classList.remove('input-error');
             if(input.dataset.tempPlaceholder) input.placeholder = input.dataset.tempPlaceholder;
        }
    });

    if(hasError){
        // Remove error styles after 3 seconds
        setTimeout(() => {
            inputs.forEach(input => {
                input.classList.remove('input-error');
                if(input.dataset.tempPlaceholder) input.placeholder = input.dataset.tempPlaceholder;
            });
        }, 3000);
    } else {
        // 2. Change Button to "Sending..."
        const originalText = contactBtn.innerText;
        contactBtn.innerText = 'Sending...';

        // 3. Send Email
        // YOUR SPECIFIC KEYS
        emailjs.sendForm('service_fq0mpjm', 'template_hnvn4u7', '#contact-form', 'ELFrx7vVcXdL9U6os')
            .then(() => {
                // SUCCESS: Change Button to "Sent" + Checkmark
                contactBtn.innerHTML = 'Sent <i class="ri-check-line"></i>';
                
                // Show small message below (optional backup)
                message.textContent = 'Message sent successfully ✅';
                message.style.color = 'green';
                
                // Reset form
                contactForm.reset();

                // Reset Button after 5 seconds
                setTimeout(() => { 
                    message.textContent = '';
                    contactBtn.innerText = 'Send Message'; // Back to original
                }, 5000);
                
            }, (error) => {
                // ERROR
                message.textContent = 'Message not sent (service error) ❌';
                message.style.color = 'red';
                contactBtn.innerText = 'Send Message'; // Reset button immediately
                console.log('FAILED...', error);
            });
    }
}

if(contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}



/*=============== DARK THEME TOGGLE ===============*/
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

if(themeButton){
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}



/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)