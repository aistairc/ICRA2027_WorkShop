document.querySelectorAll(".supporter-carousel").forEach(carousel => {
    const track = carousel.querySelector("[data-supporter-track]");
    const previousButton = carousel.querySelector("[data-supporter-previous]");
    const nextButton = carousel.querySelector("[data-supporter-next]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rotationTimer;

    function rotate(direction) {
        const logos = Array.from(track.children);
        const positions = new Map(logos.map(logo => [logo, logo.getBoundingClientRect()]));

        if (direction > 0) {
            track.append(logos[0]);
        } else {
            track.prepend(logos[logos.length - 1]);
        }

        Array.from(track.children).forEach(logo => {
            const previous = positions.get(logo);
            const current = logo.getBoundingClientRect();
            logo.style.transition = "none";
            logo.style.transform = `translate(${previous.left - current.left}px, ${previous.top - current.top}px)`;
        });

        track.offsetHeight;
        Array.from(track.children).forEach(logo => {
            logo.style.transition = "";
            logo.style.transform = "";
        });
    }

    function startRotation() {
        if (!rotationTimer && !reducedMotion.matches) {
            rotationTimer = window.setInterval(() => rotate(1), 4000);
        }
    }

    function stopRotation() {
        window.clearInterval(rotationTimer);
        rotationTimer = undefined;
    }

    previousButton.addEventListener("click", () => rotate(-1));
    nextButton.addEventListener("click", () => rotate(1));
    carousel.addEventListener("mouseenter", stopRotation);
    carousel.addEventListener("mouseleave", startRotation);
    carousel.addEventListener("focusin", stopRotation);
    carousel.addEventListener("focusout", event => {
        if (!carousel.contains(event.relatedTarget)) {
            startRotation();
        }
    });
    reducedMotion.addEventListener("change", () => {
        if (reducedMotion.matches) {
            stopRotation();
        } else {
            startRotation();
        }
    });

    startRotation();
});
