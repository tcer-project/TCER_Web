/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')
 
 /*=============== SHOW DROPDOWN MENU ===============*/
 const dropdownItems = document.querySelectorAll('.dropdown__item')
 
 // 1. Select each dropdown item
 dropdownItems.forEach((item) =>{
     const dropdownButton = item.querySelector('.dropdown__button') 
 
     // 2. Select each button click
     dropdownButton.addEventListener('click', () =>{
         // 7. Select the current show-dropdown class
         const showDropdown = document.querySelector('.show-dropdown')
         
         // 5. Call the toggleItem function
         toggleItem(item)
 
         // 8. Remove the show-dropdown class from other items
         if(showDropdown && showDropdown!== item){
             toggleItem(showDropdown)
         }
     })
 })
 
 // 3. Create a function to display the dropdown
 const toggleItem = (item) =>{
     // 3.1. Select each dropdown content
     const dropdownContainer = item.querySelector('.dropdown__container')
 
     // 6. If the same item contains the show-dropdown class, remove
     if(item.classList.contains('show-dropdown')){
         dropdownContainer.removeAttribute('style')
         item.classList.remove('show-dropdown')
     } else{
         // 4. Add the maximum height to the dropdown content and add the show-dropdown class
         dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
         item.classList.add('show-dropdown')
     }
 }
 
 /*=============== DELETE DROPDOWN STYLES ===============*/
 const mediaQuery = matchMedia('(min-width: 1118px)'),
       dropdownContainer = document.querySelectorAll('.dropdown__container')
 
 // Function to remove dropdown styles in mobile mode when browser resizes
 const removeStyle = () =>{
     // Validate if the media query reaches 1118px
     if(mediaQuery.matches){
         // Remove the dropdown container height style
         dropdownContainer.forEach((e) =>{
             e.removeAttribute('style')
         })
 
         // Remove the show-dropdown class from dropdown item
         dropdownItems.forEach((e) =>{
             e.classList.remove('show-dropdown')
         })
     }
 }
 
 addEventListener('resize', removeStyle)

 const wrapper = document.querySelector(".wrapper");
 const carousel = document.querySelector(".carousel");
 const firstCardWidth = carousel.querySelector(".card").offsetWidth;
 const arrowBtns = document.querySelectorAll(".wrapper i");
 const carouselChildrens = [...carousel.children];
 let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
 // Get the number of cards that can fit in the carousel at once
 let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
 // Insert copies of the last few cards to beginning of carousel for infinite scrolling
 carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
 });
 // Insert copies of the first few cards to end of carousel for infinite scrolling
 carouselChildrens.slice(0, cardPerView).forEach(card => {
     carousel.insertAdjacentHTML("beforeend", card.outerHTML);
 });
 // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
 carousel.classList.add("no-transition");
 carousel.scrollLeft = carousel.offsetWidth;
 carousel.classList.remove("no-transition");
 // Add event listeners for the arrow buttons to scroll the carousel left and right
 arrowBtns.forEach(btn => {
     btn.addEventListener("click", () => {
         carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
     });
 });
 const dragStart = (e) => {
     isDragging = true;
     carousel.classList.add("dragging");
     // Records the initial cursor and scroll position of the carousel
     startX = e.pageX;
     startScrollLeft = carousel.scrollLeft;
 }
 const dragging = (e) => {
     if(!isDragging) return; // if isDragging is false return from here
     // Updates the scroll position of the carousel based on the cursor movement
     carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
 }
 const dragStop = () => {
     isDragging = false;
     carousel.classList.remove("dragging");
 }
 const infiniteScroll = () => {
     // If the carousel is at the beginning, scroll to the end
     if(carousel.scrollLeft === 0) {
         carousel.classList.add("no-transition");
         carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
         carousel.classList.remove("no-transition");
     }
     // If the carousel is at the end, scroll to the beginning
     else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
         carousel.classList.add("no-transition");
         carousel.scrollLeft = carousel.offsetWidth;
         carousel.classList.remove("no-transition");
     }
     // Clear existing timeout & start autoplay if mouse is not hovering over carousel
     clearTimeout(timeoutId);
     if(!wrapper.matches(":hover")) autoPlay();
 }
 const autoPlay = () => {
     if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
     // Autoplay the carousel after every 2500 ms
     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
 }
 autoPlay();
 carousel.addEventListener("mousedown", dragStart);
 carousel.addEventListener("mousemove", dragging);
 document.addEventListener("mouseup", dragStop);
 carousel.addEventListener("scroll", infiniteScroll);
 wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
 wrapper.addEventListener("mouseleave", autoPlay);
 