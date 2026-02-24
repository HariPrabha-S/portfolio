document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const roles = ['Data Analyst', 'Machine Learning Engineer', 'Problem Solver', 'Web Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Sticky Navbar and Scroll Progress
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Project Details Data
    const projectData = {
        'leave-tracking': {
            title: 'Smart Leave Tracking System',
            description: 'A comprehensive system designed to automate the undergraduate leave application process. It features a tripartite interface for students, faculty, and administration. Key capabilities include real-time status tracking, automated notification emails, and analytical dashboards for attendance monitoring.',
            tech: ['Python', 'PHP', 'MySQL', 'JavaScript']
        },
        'asset-management': {
            title: 'Asset Management System',
            description: 'An efficient organizational tool for tracking physical and digital assets. This system allows for easy assignment, maintenance scheduling, and lifecycle tracking of company equipment, reducing loss and optimizing asset utilization.',
            tech: ['PHP', 'SQL', 'Bootstrap', 'Web Development']
        },
        'weather-ai': {
            title: 'Quantum-AI Weather Prediction Model',
            description: '[Proposed Solution] A conceptual research project exploring the intersection of Quantum Computing principles and Deep Learning for meteorological forecasting. The model aims to handle large-scale probabilistic data for predicting extreme weather events with higher confidence intervals.',
            tech: ['Python', 'TensorFlow', 'Data Science', 'Quantum Computing']
        },
        'feedback-system': {
            title: 'Faculty Feedback & Performance Appraisal',
            description: 'A streamlined academic tool developed to collect and analyze student feedback. The frontend focuses on user experience to ensure high participation rates, while the backend generates performance reports for institutional growth.',
            tech: ['HTML/CSS', 'JavaScript', 'Firebase', 'Data Visualization']
        },
        'whatsguard': {
            title: 'WhatsGuard',
            description: '[Proposed Solution] A cybersecurity solution proposal focusing on protecting users from digital payment scams via instant messaging. The system uses AI to analyze suspicious links and communication patterns in real-time to prevent financial fraud.',
            tech: ['AI', 'Cybersecurity', 'NLP', 'Problem Solving']
        }
    };

    // Modal Handling
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];

            modalBody.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <div class="tech-tags">
                    ${data.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
