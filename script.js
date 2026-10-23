
gsap.registerPlugin(ScrollTrigger);

// ---- B1: DARK MODE TOGGLE ----
const darkModeBtn = document.querySelector("#darkModeToggle");
if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });
}

// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----
// "back.out" gives a punchy hero entrance, "power2.out" feels smooth for UI text, and "power1.out" gives a gentle reveal for cards.
const introTl = gsap.timeline({
    defaults: {
        duration: 0.7,
        ease: "power2.out"
    }
});

introTl
    .from(".hero-badge", {
        y: -30,
        opacity: 0,
        ease: "back.out(1.7)"
    })
    .from(".hero-title", {
        y: 40,
        opacity: 0,
        ease: "power2.out"
    }, "-=0.4")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        ease: "power2.out"
    }, "-=0.5")
    .from(".hero-buttons", {
        y: 20,
        opacity: 0,
        ease: "power2.out"
    }, "-=0.4")
    .from(".hero-card", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        ease: "power1.out"
    }, "-=0.3");

// ---- D3: CLICK INTERACTION ----
const replayBtn = document.querySelector("#replayBtn");
if (replayBtn) {
    replayBtn.addEventListener("click", () => {
        introTl.restart();
    });
}

// ---- E1, E2, E3: SCROLL REVEALS, LINKED EFFECTS & REDUCED MOTION ----
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
    // E1: Individual Scroll Reveals
    const revealElements = gsap.utils.toArray(".reveal");
    revealElements.forEach((element) => {
        gsap.from(element, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // E2: Scroll-Linked Scrub Progress Bar
    gsap.fromTo("#progressBar", 
        { scaleX: 0, transformOrigin: "left center" },
        {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        }
    );
});