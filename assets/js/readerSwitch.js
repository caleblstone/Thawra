document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('#readerNav > div');
    const contentSections = document.querySelectorAll('#readerContent > div');

    // Function to hide all content sections
    function hideAllSections() {
        contentSections.forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
    }

    // Function to show the corresponding content section
    function showSection(target) {
        hideAllSections(); // First hide all sections
        const sectionToShow = document.getElementById(target);
        if (sectionToShow) {
            sectionToShow.style.display = 'block'; // Show the target section
        }
    }

    // Function to remove active class from all nav items
    function removeActiveClass() {
        navItems.forEach(item => {
            item.classList.remove('active'); // Remove active class
        });
    }

    // Add click event listeners to each nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target'); // Get the target from data attribute
            showSection(target); // Show the corresponding section
            removeActiveClass(); // Remove active class from all items
            this.classList.add('active'); // Add active class to the clicked item
        });
    });

    // Optionally, hide all sections initially except the first one
    hideAllSections();
    if (contentSections.length > 0) {
        contentSections[0].style.display = 'block'; // Show the first section by default
        navItems[0].classList.add('active'); // Set the first nav item as active
    }

});