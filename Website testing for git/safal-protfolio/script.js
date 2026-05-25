document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect Logic
    const textElement = document.querySelector('.typing-text');
    const textToType = "I build modern, fast and responsive websites";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            textElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after a small delay
    setTimeout(typeWriter, 500);

    // Smooth reveal effect on scroll (Optional Bonus Feature)
    const cards = document.querySelectorAll('.glass-card');
    
    const revealCards = () => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if(cardTop < window.innerHeight - 50) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for scroll reveal
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealCards);
    revealCards(); // Trigger once on load
});


/// Status check and clear URL
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');

if (status) {
    if (status === 'success') {
        Swal.fire({
            title: 'Message Sent!',
            text: 'I will contact you soon.',
            icon: 'success',
            background: '#0a192f',
            color: '#00ffff',
            confirmButtonColor: '#00ffff'
        });
    } else if (status === 'error') {
        Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong.',
            icon: 'error',
            background: '#0a192f',
            color: '#ff4b2b',
            confirmButtonColor: '#ff4b2b'
        });
    }
    // Isse URL se status hat jayega, refresh karne par dubara nahi dikhega
    window.history.replaceState({}, document.title, window.location.pathname);
}


// Preloader logic with 1-second force-hide
function hideLoader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide-preloader');
    }
}

// 1. Agar page jaldi load ho jaye toh bhi 1 sec wait karega
window.addEventListener('load', () => {
    setTimeout(hideLoader, 1000); 
});

// 2. Backup: Agar page load hone me deri kare, toh bhi 1.5 sec baad hata dega
setTimeout(hideLoader, 1500);


window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // 1.2 seconds ka delay taaki user animation dekh sake
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hide-preloader');
        }
    }, 1200);
});


const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Redirect hone se rokta hai
        
        const btn = document.getElementById('submitBtn');
        const formData = new FormData(this);
        
        btn.innerHTML = "Sending...";
        btn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success Popup
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Details successfully received by Safallya.',
                    icon: 'success',
                    background: '#0a192f',
                    color: '#00ffff',
                    confirmButtonColor: '#00ffff'
                });
                contactForm.reset();
            } else {
                // Error Popup
                Swal.fire({
                    title: 'Oops!',
                    text: json.message || 'Something went wrong.',
                    icon: 'error',
                    background: '#0a192f',
                    color: '#ff4b2b'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Network Error!',
                text: 'Please check your internet connection.',
                icon: 'error',
                background: '#0a192f',
                color: '#ff4b2b'
            });
        })
        .finally(() => {
            btn.innerHTML = "Send Message";
            btn.disabled = false;
        });
    });
}