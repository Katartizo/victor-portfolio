/*=============== SHOW MENU (Your Original Logic) ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show - hidden */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('animate-toggle');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        if (navToggle) navToggle.classList.remove('animate-toggle');
    });
}

/*=============== REMOVE MENU MOBILE ON CLICK ===============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
    if (navToggle) navToggle.classList.remove('animate-toggle');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the bg-header class
    this.scrollY >= 50 
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

/*=============== SERVICES SWIPER ===============*/
let servicesSwiper = new Swiper('.services-swiper', {
    spaceBetween: 32,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
    },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
/* Safety check: ensure mixitup is loaded and container exists */
if (typeof mixitup !== 'undefined' && document.querySelector('.work-container')) {
    let mixerPortfolio = mixitup('.work-container', {
        selectors: {
            target: '.card'
        },
        animation: {
            duration: 300
        }
    });
}

/* Link Active Work */
const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
    linkWork.forEach((l) => l.classList.remove('active-work'));
    this.classList.add('active-work');
}
linkWork.forEach((l) => l.addEventListener('click', activeWork));

/*=============== RESUME ACCORDION ===============*/
const resumeHeaders = document.querySelectorAll('.resume-header');

resumeHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        const item = header.parentNode;
        const content = item.querySelector('.resume-content');

        // Toggle the open class
        if (item.classList.contains('accordion-open')) {
            item.classList.remove('accordion-open');
            content.style.height = '0px';
        } else {
            // Optional: Close others when opening one
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
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});
/*=============== EMAIL JS (WITH CUSTOM VALIDATION) ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactSubject = document.getElementById('contact-subject'),
      contactMessage = document.getElementById('contact-message'),
      message = document.getElementById('message');

const sendEmail = (e) => {
    e.preventDefault();

    // 1. Create a list of the inputs we need to check
    const inputs = [contactName, contactEmail, contactSubject, contactMessage];
    let hasError = false;

    // 2. Check each input
    inputs.forEach(input => {
        // If the input exists but is empty
        if(input && input.value.trim() === ''){
            hasError = true;
            input.classList.add('input-error'); // Adds red border (from CSS)
            input.placeholder = 'Write all the input fields'; // Shows custom message inside
        } else {
            // Remove error if they fixed it
            if(input) {
                input.classList.remove('input-error');
                input.placeholder = ''; 
            }
        }
    });

    if(hasError){
        // 3. Remove the error style after 3 seconds
        setTimeout(() => {
            inputs.forEach(input => {
                if(input) {
                    input.classList.remove('input-error');
                    input.placeholder = ''; 
                }
            });
        }, 3000);
    } else {
        // 4. If NO errors, Send Email
        // PASTE YOUR KEYS HERE!
        emailjs.sendForm('service_fq0mpjm', 'template_hnvn4u7', '#contact-form', 'ELFrx7vVcXdL9U6os')
            .then(() => {
                message.textContent = 'Message sent successfully ✅';
                message.style.color = 'green';
                
                setTimeout(() => { message.textContent = '' }, 5000);
                contactForm.reset();
            }, () => {
                message.textContent = 'Message not sent (service error) ❌';
                message.style.color = 'red';
            });
    }
}

if(contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// We validate if the user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}


/* ========================================= */
/* 🔴 ERROR STYLES (For Empty Fields) 🔴     */
/* ========================================= */

/* 1. Turns the border RED */
.input-error {
  border: 2px solid hsl(5, 69%, 51%) !important; /* Red Color */
}

/* 2. Turns the placeholder text RED */
.input-error::placeholder {
  color: hsl(5, 69%, 51%) !important;
  font-weight: bold;
}