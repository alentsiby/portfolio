/* ========== CIRCUIT NETWORK CANVAS ========== */
class CircuitNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.pulses = [];
        this.particles = [];
        this.mouse = { x: -9999, y: -9999 };
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.time = 0;
        this.scrollY = 0;
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    init() {
        this.nodes = [];
        this.connections = [];
        this.pulses = [];
        this.particles = [];

        // Create nodes in semi-grid pattern
        const spacing = this.width < 600 ? 130 : 105;
        for (let x = -spacing; x < this.width + spacing; x += spacing) {
            for (let y = -spacing; y < this.height + spacing; y += spacing) {
                if (Math.random() > 0.3) {
                    this.nodes.push({
                        x: x + (Math.random() - 0.5) * spacing * 0.6,
                        y: y + (Math.random() - 0.5) * spacing * 0.6,
                        r: 1 + Math.random() * 1.8,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.006 + Math.random() * 0.012,
                        alpha: 0.12 + Math.random() * 0.28
                    });
                }
            }
        }

        // Create connections between nearby nodes
        const maxDist = this.width < 600 ? 140 : 155;
        for (let i = 0; i < this.nodes.length; i++) {
            let count = 0;
            for (let j = i + 1; j < this.nodes.length && count < 3; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < maxDist && Math.random() > 0.45) {
                    this.connections.push({ a: i, b: j, alpha: 0.03 + Math.random() * 0.05 });
                    count++;
                    // Energy pulse on some connections
                    if (Math.random() > 0.6) {
                        this.pulses.push({
                            conn: this.connections.length - 1,
                            t: Math.random(),
                            speed: 0.0015 + Math.random() * 0.003,
                            size: 1.5 + Math.random() * 1.5,
                            hue: Math.random() > 0.65 ? 270 : 190
                        });
                    }
                }
            }
        }

        // Ambient particles (antigravity — float upward)
        const particleCount = this.width < 600 ? 25 : 45;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: -0.15 - Math.random() * 0.35,
                size: 0.5 + Math.random() * 1.2,
                alpha: 0.08 + Math.random() * 0.2,
                hue: 190 + Math.random() * 80
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => { this.resize(); this.init(); });
        window.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
        window.addEventListener('scroll', () => { this.scrollY = window.scrollY; });
    }

    drawNode(node) {
        const ctx = this.ctx;
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 200);
        const pulse = Math.sin(this.time * node.speed + node.phase) * 0.3 + 0.7;
        const alpha = (node.alpha + proximity * 0.5) * pulse;
        const r = node.r + proximity * 2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 100%, 60%, ${alpha})`;
        ctx.fill();

        if (proximity > 0.3) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(190, 100%, 60%, ${proximity * 0.12})`;
            ctx.fill();
        }
    }

    drawConnections() {
        const ctx = this.ctx;
        for (const conn of this.connections) {
            const a = this.nodes[conn.a];
            const b = this.nodes[conn.b];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 180, 220, ${conn.alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
        }
    }

    drawPulses() {
        const ctx = this.ctx;
        for (const pulse of this.pulses) {
            const conn = this.connections[pulse.conn];
            const a = this.nodes[conn.a];
            const b = this.nodes[conn.b];
            const x = a.x + (b.x - a.x) * pulse.t;
            const y = a.y + (b.y - a.y) * pulse.t;

            ctx.beginPath();
            ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${pulse.hue}, 100%, 65%, 0.8)`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(x, y, pulse.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${pulse.hue}, 100%, 65%, 0.08)`;
            ctx.fill();

            pulse.t += pulse.speed;
            if (pulse.t > 1) pulse.t = 0;
        }
    }

    drawParticles() {
        const ctx = this.ctx;
        for (const p of this.particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.y < -10) { p.y = this.height + 10; p.x = Math.random() * this.width; }
            if (p.x < -10) p.x = this.width + 10;
            if (p.x > this.width + 10) p.x = -10;
        }
    }

    animate() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // Fade effect based on scroll — reduce canvas intensity as user scrolls
        const fade = Math.max(0, 1 - this.scrollY / (this.height * 0.8));
        ctx.globalAlpha = fade;

        this.drawConnections();
        this.drawPulses();
        for (const node of this.nodes) this.drawNode(node);
        this.drawParticles();

        ctx.globalAlpha = 1;
        this.time++;
        requestAnimationFrame(() => this.animate());
    }
}

/* ========== NAVIGATION ========== */
function initNav() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const allLinks = links.querySelectorAll('.nav-link');

    // Scroll state
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    // Close on link click
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });

    // Active section tracking
    const sections = document.querySelectorAll('.section, .hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                allLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(sec => observer.observe(sec));
}

/* ========== REVEAL ON SCROLL ========== */
function initReveals() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.reveal');
                let index = Array.from(siblings).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

/* ========== STAT COUNTER ========== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);
                const tick = () => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + '+';
                    } else {
                        el.textContent = Math.floor(current);
                        requestAnimationFrame(tick);
                    }
                };
                tick();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* ========== TERMINAL TYPING ========== */
function initTerminal() {
    const el = document.getElementById('terminal-typing');
    if (!el) return;
    const commands = [
        'echo "Let\'s build something."',
        'ssh connect@ecse-lab',
        'ping smart-home.local',
        'cat skills.log | grep IoT',
    ];
    let cmdIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const cmd = commands[cmdIndex];
        if (!deleting) {
            el.textContent = cmd.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex >= cmd.length) {
                setTimeout(() => { deleting = true; type(); }, 2000);
                return;
            }
            setTimeout(type, 60 + Math.random() * 40);
        } else {
            el.textContent = cmd.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                deleting = false;
                charIndex = 0;
                cmdIndex = (cmdIndex + 1) % commands.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 30);
        }
    }

    // Start when visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(type, 600);
            observer.disconnect();
        }
    });
    observer.observe(el);
}

/* ========== SMOOTH SCROLL FOR CTA ========== */
function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (canvas) new CircuitNetwork(canvas);
    initNav();
    initReveals();
    initCounters();
    initTerminal();
    initSmoothLinks();
});
