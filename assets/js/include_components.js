async function loadComponent(elementId, path) {
    const element = document.getElementById(elementId);
    if (!element) {
        return;
    }

    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    element.innerHTML = await response.text();
}

async function loadComponents() {
    await Promise.all([
        loadComponent("header", "assets/components/header.html"),
        loadComponent("footer", "assets/components/footer.html")
    ]);

    const lastUpdated = document.getElementById("lastUpdated");
    if (lastUpdated) {
        const date = new Date(document.lastModified);
        lastUpdated.textContent = `Last updated: ${date.toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" }
        )}`;
    }

    document.dispatchEvent(new Event("componentsLoaded"));
}

loadComponents().catch(error => {
    console.error("Unable to load page components:", error);
});