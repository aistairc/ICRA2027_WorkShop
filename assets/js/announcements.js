document.querySelectorAll(".announcements").forEach(section => {
    const cards = Array.from(section.querySelectorAll(".announcement-card"));
    const previousButton = section.querySelector("[data-announcement-previous]");
    const nextButton = section.querySelector("[data-announcement-next]");
    const position = section.querySelector("[data-announcement-position]");
    let currentIndex = 0;

    function showAnnouncement(index) {
        currentIndex = (index + cards.length) % cards.length;
        cards.forEach((card, cardIndex) => {
            card.hidden = cardIndex !== currentIndex;
        });
        position.textContent = `Announcement ${currentIndex + 1} of ${cards.length}`;
    }

    previousButton.addEventListener("click", () => {
        showAnnouncement(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showAnnouncement(currentIndex + 1);
    });

    showAnnouncement(currentIndex);

    if (cards.length > 1) {
        window.setInterval(() => {
            showAnnouncement(currentIndex + 1);
        }, 15000);
    }
});
