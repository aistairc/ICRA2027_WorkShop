function markActiveNavigationLink() {
    const currentUrl = new URL(window.location.href);
    document.querySelectorAll(".main-nav a").forEach(link => {
        const linkUrl = new URL(link.href);
        if (
            linkUrl.pathname === currentUrl.pathname &&
            linkUrl.hash === currentUrl.hash
        ) {
            link.classList.add("active");
        }
    });
}

function initializeNavigationMenus() {
    document.querySelectorAll(".header-inner").forEach(header => {
        const button = header.querySelector(".nav-toggle");
        const nav = header.querySelector(".main-nav");
        if (!button || !nav || button.dataset.initialized === "true") {
            return;
        }

        button.dataset.initialized = "true";
        const compactLayout = window.matchMedia("(max-width: 980px)");

        function setMenuOpen(isOpen) {
            button.setAttribute("aria-expanded", String(isOpen));
            nav.classList.toggle("is-open", isOpen);
        }

        button.addEventListener("click", () => {
            setMenuOpen(button.getAttribute("aria-expanded") !== "true");
        });

        nav.addEventListener("click", event => {
            if (compactLayout.matches && event.target.closest("a")) {
                setMenuOpen(false);
            }
        });

        compactLayout.addEventListener("change", () => {
            setMenuOpen(false);
        });
    });
}

function initializeBackToTopButton() {
    if (document.querySelector(".back-to-top")) {
        return;
    }

    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.textContent = "Back to top";
    button.setAttribute("aria-label", "Back to top");
    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.append(button);

    function updateBackToTopVisibility() {
        button.classList.toggle("is-visible", window.scrollY > 200);
    }

    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
}

document.addEventListener("DOMContentLoaded", markActiveNavigationLink);
document.addEventListener("componentsLoaded", markActiveNavigationLink);
document.addEventListener("DOMContentLoaded", initializeNavigationMenus);
document.addEventListener("componentsLoaded", initializeNavigationMenus);
document.addEventListener("DOMContentLoaded", initializeBackToTopButton);