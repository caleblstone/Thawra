document.addEventListener('DOMContentLoaded', function() {
    const sliderNavBar = document.getElementById('sliderNavBar');
    const sliderNavItems = document.querySelectorAll('.sliderNavItem');
    const sliderDescription = document.querySelectorAll('.description');
    let isMouseOver = true;
    let trigger = false;

    function setInitialHeight() {
        const currentHeight = sliderNavBar.offsetHeight; 
        sliderNavBar.style.height = `${currentHeight}px`; 
        requestAnimationFrame(() => {
            setTimeout(() => {
                sliderNavItems.forEach(item => {
                    const currentWidth = item.offsetWidth;
                    item.style.width = `${currentWidth - 32 }px`;
                });
            }, 0);
        });
        return currentHeight;
    }
    const originalHeight = setInitialHeight();

    function calcHeight() {
        let maxHeight = 0; // Initialize maxHeight

        sliderNavItems.forEach(item => {
            const itemHeight = item.offsetHeight; // Get the height of the current sliderNavItem
            if (itemHeight > maxHeight) {
                maxHeight = itemHeight; // Update maxHeight if the current item is taller
            }
        });
        return maxHeight;
    }

    function toggle() {
        setTimeout(() => {
            isMouseOver = false;
            console.log(isMouseOver);
        }, 100);
    }
    toggle();



    sliderNavBar.addEventListener('mouseenter', function() {
        if (isMouseOver == false){
            console.log('not hovered');
            
            sliderDescription.forEach(desc => {
                desc.style.display = 'block';
            });
            const height = calcHeight(); 
            sliderNavBar.style.height = height + 16 + "px"; // Adjust for padding if needed    
        }
    });



    

    sliderNavBar.addEventListener('mouseleave', function() {
        isMouseOver = false;
        sliderNavBar.style.height = originalHeight + "px"; // Reset to initial height
    });

    // Handle click events on sliderNavItems
    sliderNavItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Store the current scroll position in sessionStorage
            const scrollPosition = sliderNavBar.scrollLeft; // Use scrollLeft for horizontal scroll
            sessionStorage.setItem('sliderNavScrollPosition', scrollPosition);

            // Allow the default behavior to reload the page
            // You can also navigate to a new URL if needed
        });
    });

    // Restore scroll position after the page reloads
    const storedScrollPosition = sessionStorage.getItem('sliderNavScrollPosition');
    if (storedScrollPosition) {
        sliderNavBar.scrollLeft = storedScrollPosition; // Restore the scroll position
        sessionStorage.removeItem('sliderNavScrollPosition'); // Clear the stored value
    }
});