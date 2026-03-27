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
                let maxTitleWidth = 0;
                sliderNavItems.forEach(item => {
                    const title = item.querySelector('.episodeTitle');
                    if (title) maxTitleWidth = Math.max(maxTitleWidth, title.offsetWidth);
                });
                sliderNavItems.forEach(item => {
                    const currentWidth = item.offsetWidth;
                    item.style.width = `${Math.max(currentWidth - 32, maxTitleWidth)}px`;
                });
            }, 0);
        });
        return currentHeight;
    }

    function initSliderNav() {
        const originalHeight = setInitialHeight();

        function calcHeight() {
            let maxHeight = 0;
            sliderNavItems.forEach(item => {
                const itemHeight = item.offsetHeight;
                if (itemHeight > maxHeight) {
                    maxHeight = itemHeight;
                }
            });
            return maxHeight;
        }

        function toggle() {
            setTimeout(() => {
                isMouseOver = false;
            }, 100);
        }
        toggle();

        sliderNavBar.addEventListener('mouseenter', function() {
            if (isMouseOver == false){
                sliderDescription.forEach(desc => {
                    desc.style.display = 'block';
                });
                const height = calcHeight();
                sliderNavBar.style.height = height + 16 + "px";
            }
        });

        sliderNavBar.addEventListener('mouseleave', function() {
            isMouseOver = false;
            sliderNavBar.style.height = originalHeight + "px";
        });

        sliderNavItems.forEach(item => {
            item.addEventListener('click', function(event) {
                const scrollPosition = sliderNavBar.scrollLeft;
                sessionStorage.setItem('sliderNavScrollPosition', scrollPosition);
            });
        });

        const storedScrollPosition = sessionStorage.getItem('sliderNavScrollPosition');
        if (storedScrollPosition) {
            sliderNavBar.scrollLeft = storedScrollPosition;
            sessionStorage.removeItem('sliderNavScrollPosition');
        }
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initSliderNav);
    } else {
        window.addEventListener('load', initSliderNav);
    }
});
