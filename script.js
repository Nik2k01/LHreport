document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const landingSection = document.getElementById('landing-section');
    const rescheduleSection = document.getElementById('reschedule-section');
    const mainHeader = document.querySelector('.main-header');

    const btnReschedule = document.getElementById('btn-reschedule');
    const backButtons = document.querySelectorAll('.btn-back');

    // Thank You Page Elements
    const thankyouSection = document.getElementById('thankyou-section');
    const btnHome = document.getElementById('btn-home');

    // Navigation Logic
    function showSection(sectionToShow) {
        // Hide all
        landingSection.classList.add('hidden');
        rescheduleSection.classList.add('hidden');
        thankyouSection.classList.add('hidden');

        // Hide header on form views, show on landing
        if (sectionToShow === landingSection) {
            mainHeader.classList.remove('hidden');
        } else {
            mainHeader.classList.remove('hidden');
        }

        // Show target
        sectionToShow.classList.remove('hidden');

        // Re-trigger animations
        const animatedElements = sectionToShow.querySelectorAll('.slide-up, .fade-in');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null;
        });
    }

    function showLanding() {
        showSection(landingSection);
    }

    // Event Listeners
    btnReschedule.addEventListener('click', () => {
        showSection(rescheduleSection);
    });

    backButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showLanding();
        });
    });

    btnHome.addEventListener('click', () => {
        showLanding();
    });

    // Form Submissions
    document.getElementById('form-reschedule').addEventListener('submit', (e) => {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Google Forms Action URL
        const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf2_-oxjupMblR_2yOunYZkkGPpKLyicq52Wy7S83S-Fne7Gg/formResponse';

        const formData = new FormData(form);

        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Use no-cors to bypass CORS policy since we just want to send data
        })
            .then(() => {
                // Assume success if no network error
                showSection(thankyouSection);
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });

});
