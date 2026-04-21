document.addEventListener('DOMContentLoaded', function() {
    const heroTextContent = document.querySelector('.hero-text-content');
    if (heroTextContent) {}
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in');
    const observerOptions = {root: null,
        rootMargin: '0px',
        threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animationClass = el.classList.contains('animate-fade-in-up') ? 'animate-fade-in-up' :
                                       el.classList.contains('animate-fade-in-down') ? 'animate-fade-in-down' :
                                       el.classList.contains('animate-fade-in-left') ? 'animate-fade-in-left' :
                                       el.classList.contains('animate-fade-in-right') ? 'animate-fade-in-right' :
                                       'animate-fade-in'; 
                const delayClass = el.dataset.delay || 'delay-1';
                el.style.animation = `${animationClass.replace('animate-','').replace(' ','')} ${el.style.animationDuration || '0.8s'} ease-out ${el.style.animationTimingFunction || 'forwards'} ${el.dataset.animationDelay || '0s'}`;
                el.style.opacity = '1';
                el.style.transform = 'translate(0)'; 
                observer.unobserve(el);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        if (el.classList.contains('animate-fade-in-up')) el.style.transform = 'translateY(30px)';
        if (el.classList.contains('animate-fade-in-down')) el.style.transform = 'translateY(-20px)';
        if (el.classList.contains('animate-fade-in-left')) el.style.transform = 'translateX(-30px)';
        if (el.classList.contains('animate-fade-in-right')) el.style.transform = 'translateX(30px)';
        const animationClass = el.classList.contains('animate-fade-in-up') ? 'animate-fade-in-up' :
                               el.classList.contains('animate-fade-in-down') ? 'animate-fade-in-down' :
                               el.classList.contains('animate-fade-in-left') ? 'animate-fade-in-left' :
                               el.classList.contains('animate-fade-in-right') ? 'animate-fade-in-right' :
                               'animate-fade-in';
        const delay = el.dataset.delay || 'delay-1';
        el.classList.add(animationClass, delay);
        observer.observe(el);
    });
    const nav = document.querySelector('.main-nav ul');
    const headerContainer = document.querySelector('.site-header .container');
    const menuButton = document.querySelector('.menu-toggle');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuButton.classList.remove('active');
                }
            });
        });
    }
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            if (!headerContainer.contains(menuButton)) {
                headerContainer.insertBefore(menuButton, nav);
            }
        } else {
            if (headerContainer.contains(menuButton)) {
                headerContainer.removeChild(menuButton);
            }
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuButton.classList.remove('active');
            }
        }
    });
    if (window.innerWidth <= 768) {
        if (!headerContainer.contains(menuButton)) {
            headerContainer.insertBefore(menuButton, nav);
        }
    } else {
        if (headerContainer.contains(menuButton)) {
            headerContainer.removeChild(menuButton);
        }
    }
   
});
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});


const texts = [
    "Bring Your Story to Life.",
    "Publish with Confidence.",
    "Turn Your Ideas into a Book.",
    "Become a Published Author."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typed-text");
    if (!el) return;

    let currentText = texts[textIndex];

    if (!isDeleting) {
        el.innerHTML = currentText.substring(0, charIndex++);
        
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // pause before deleting
            return;
        }

    } else {
        el.innerHTML = currentText.substring(0, charIndex--);

        if (charIndex === 0) {
            isDeleting = false;
            textIndex++;

            if (textIndex >= texts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 70);
}

document.addEventListener("DOMContentLoaded", typeEffect);
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  document.getElementById("progress-bar").style.width = (scroll / height) * 100 + "%";
});

    const text = "Bring Your Story to Life.";
let index = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typed-text");
    if (!el) return;

    if (!isDeleting) {
        el.textContent = text.substring(0, index++);
        if (index > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // pause before deleting
            return;
        }
    } else {
        el.textContent = text.substring(0, index--);
        if (index === 0) {
            isDeleting = false;
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 70);
}

document.addEventListener("DOMContentLoaded", typeEffect);
    
let index = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typed-text");

    if (!el) return;

    if (!isDeleting) {
        el.textContent = text.substring(0, index++);
        if (index > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        el.textContent = text.substring(0, index--);
        if (index === 0) {
            isDeleting = false;
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 70);
}

typeEffect();

console.log("JS WORKING");        
