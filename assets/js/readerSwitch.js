document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('#readerNav > div');
    const contentSections = document.querySelectorAll('#readerContent > div');

    function hideAllSections() {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
    }

    function showSection(target) {
        hideAllSections();
        const sectionToShow = document.getElementById(target);
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }
    }

    function removeActiveClass() {
        navItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            showSection(target);
            removeActiveClass();
            this.classList.add('active');
        });
    });

    hideAllSections();
    if (contentSections.length > 0) {
        contentSections[0].style.display = 'block';
        navItems[0].classList.add('active');
    }
});
