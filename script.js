/* =========================================================
   AMELAK MACHINERY - MAIN SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.getElementById('menuToggle');

    const navLinks =
        document.getElementById('navLinks');


    if (menuToggle && navLinks) {

        menuToggle.addEventListener('click', () => {

            navLinks.classList.toggle('active');

            const isOpen =
                navLinks.classList.contains('active');


            menuToggle.textContent =
                isOpen ? '✕' : '☰';


            menuToggle.setAttribute(
                'aria-label',
                isOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
            );


            menuToggle.setAttribute(
                'aria-expanded',
                isOpen
            );

        });


        /* Close menu when navigation link is clicked */

        navLinks
            .querySelectorAll('a')
            .forEach(link => {

                link.addEventListener('click', () => {

                    navLinks.classList.remove('active');

                    menuToggle.textContent = '☰';

                    menuToggle.setAttribute(
                        'aria-label',
                        'Open navigation menu'
                    );

                    menuToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                });

            });


        /* Close menu when clicking outside */

        document.addEventListener('click', (e) => {

            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {

                navLinks.classList.remove('active');

                menuToggle.textContent = '☰';

                menuToggle.setAttribute(
                    'aria-label',
                    'Open navigation menu'
                );

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener('click', function (e) {

                const targetId =
                    this.getAttribute('href');


                if (
                    !targetId ||
                    targetId === '#'
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    e.preventDefault();

                    const headerOffset = 80;

                    const elementPosition =
                        target.getBoundingClientRect().top;

                    const offsetPosition =
                        elementPosition +
                        window.pageYOffset -
                        headerOffset;


                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                }

            });

        });


    /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll('.counter');

    let counted = false;


    function animateCounters() {

        counters.forEach(counter => {

            const target =
                parseInt(
                    counter.getAttribute('data-target'),
                    10
                );


            if (
                isNaN(target) ||
                target <= 0
            ) {
                return;
            }


            const duration = 2000;

            const step =
                target / (duration / 16);

            let current = 0;


            const updateCounter = () => {

                current += step;


                if (current < target) {

                    counter.textContent =
                        Math.floor(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target;

                }

            };


            updateCounter();

        });

    }


    const statsSection =
        document.querySelector('.stats');


    if (statsSection) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !counted
                        ) {

                            counted = true;

                            animateCounters();

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        observer.observe(statsSection);

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll('.reveal');


    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                'active'
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15,
                    rootMargin:
                        '0px 0px -50px 0px'
                }
            );


        revealElements.forEach(el => {

            revealObserver.observe(el);

        });

    }


    /* =====================================================
       CONTACT FORM - WEB3FORMS
       ===================================================== */

    const contactForm =
        document.getElementById('contactForm');

    const formMessage =
        document.getElementById('formMessage');


    if (contactForm) {

        const submitBtn =
            contactForm.querySelector(
                'button[type="submit"]'
            );


        contactForm.addEventListener(
            'submit',
            async (e) => {

                e.preventDefault();


                /* ===============================
                   GET FORM DATA
                   =============================== */

                const formData =
                    new FormData(contactForm);


                /* ===============================
                   WEB3FORMS ACCESS KEY
                   =============================== */

                formData.append(
                    'access_key',
                    '4199f10f-c02f-4354-91bd-36116ecfbbc5'
                );


                /* ===============================
                   EMAIL SETTINGS
                   =============================== */

                formData.append(
                    'from_name',
                    'Amelak Machinery Website'
                );


                formData.append(
                    'replyto',
                    document.getElementById(
                        'email'
                    ).value
                );


                /* ===============================
                   SAVE BUTTON TEXT
                   =============================== */

                const originalText =
                    submitBtn
                        ? submitBtn.textContent
                        : 'Send Message';


                /* ===============================
                   SENDING STATE
                   =============================== */

                if (submitBtn) {

                    submitBtn.textContent =
                        'Sending...';

                    submitBtn.disabled = true;

                }


                if (formMessage) {

                    formMessage.textContent =
                        'Sending your message...';

                    formMessage.className =
                        'form-message';

                }


                try {

                    /* ===============================
                       SEND TO WEB3FORMS
                       =============================== */

                    const response =
                        await fetch(
                            'https://api.web3forms.com/submit',
                            {
                                method: 'POST',
                                body: formData
                            }
                        );


                    /* ===============================
                       GET RESPONSE
                       =============================== */

                    const data =
                        await response.json();


                    /* ===============================
                       SUCCESS
                       =============================== */

                    if (
                        response.ok &&
                        data.success
                    ) {

                        if (formMessage) {

                            formMessage.textContent =
                                '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';

                            formMessage.className =
                                'form-message success';

                        }


                        /* Clear form */

                        contactForm.reset();


                    } else {

                        /* ===============================
                           WEB3FORMS ERROR
                           =============================== */

                        const errorMessage =
                            data.message ||
                            'Unable to send your message. Please try again.';


                        if (formMessage) {

                            formMessage.textContent =
                                '❌ ' + errorMessage;

                            formMessage.className =
                                'form-message error';

                        }

                    }


                } catch (error) {

                    /* ===============================
                       NETWORK ERROR
                       =============================== */

                    console.error(
                        'Web3Forms error:',
                        error
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            '❌ Something went wrong. Please check your internet connection and try again.';

                        formMessage.className =
                            'form-message error';

                    }

                } finally {

                    /* ===============================
                       RESTORE BUTTON
                       =============================== */

                    if (submitBtn) {

                        submitBtn.textContent =
                            originalText;

                        submitBtn.disabled = false;

                    }

                }

            }
        );

    }


    /* =====================================================
       WHATSAPP BUTTON
       ===================================================== */

    const whatsappButton =
        document.getElementById(
            'whatsappButton'
        );


    if (whatsappButton) {

        whatsappButton.addEventListener(
            'click',
            () => {

                const phone =
                    '251921845754';


                const message =
                    encodeURIComponent(
                        'Hello Amelak Machinery! I would like to know more about your agricultural machines.'
                    );


                const url =
                    `https://wa.me/${phone}?text=${message}`;


                window.open(
                    url,
                    '_blank',
                    'noopener,noreferrer'
                );

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearSpan =
        document.getElementById('year');


    if (yearSpan) {

        yearSpan.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HEADER SHADOW ON SCROLL
       ===================================================== */

    const header =
        document.querySelector('.header');


    if (header) {

        const updateHeader =
            () => {

                if (
                    window.scrollY > 50
                ) {

                    header.style.boxShadow =
                        '0 5px 30px rgba(0, 0, 0, 0.1)';

                } else {

                    header.style.boxShadow =
                        '0 2px 20px rgba(0, 0, 0, 0.06)';

                }

            };


        window.addEventListener(
            'scroll',
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

    }


    /* =====================================================
       PRODUCT IMAGE FALLBACK
       ===================================================== */

    document
        .querySelectorAll(
            '.product-image img'
        )
        .forEach(img => {

            img.addEventListener(
                'error',
                function () {

                    this.style.display =
                        'none';


                    const parent =
                        this.parentElement;


                    if (
                        parent &&
                        !parent.querySelector(
                            '.fallback-icon'
                        )
                    ) {

                        const div =
                            document.createElement(
                                'div'
                            );


                        div.className =
                            'fallback-icon';


                        div.style.cssText =
                            `
                            font-size:4rem;
                            color:#2e7d32;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            height:100%;
                            `;


                        const alt =
                            this.alt || '';


                        if (
                            alt.includes('Maize')
                        ) {

                            div.textContent =
                                '🌽';

                        } else if (
                            alt.includes('Chopping')
                        ) {

                            div.textContent =
                                '🔪';

                        } else {

                            div.textContent =
                                '⚙️';

                        }


                        parent.appendChild(div);

                    }

                }
            );

        });


    /* =====================================================
       WEBSITE LOADED
       ===================================================== */

    console.log(
        '✅ Amelak Machinery website loaded successfully.'
    );

});