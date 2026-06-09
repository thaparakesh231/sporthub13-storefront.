/**
 * SportHub13 Store Engine System Script
 * Powers both the automated storefront slider shelf and the customisable blueprint template.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // MODULE 1: PRODUCT SLIDER AUTO-PLAY & HOVER STOP ENGINE
    // ==========================================================================
    const track = document.getElementById("productTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const sliderWindow = document.querySelector(".slider-window");
    
    let currentSlideIndex = 0;
    let storeAutoPlayTimer = null;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function updateSliderPosition() {
        const cardElement = document.querySelector(".product-card");
        if (!cardElement) return;
        
        const cardWidth = cardElement.getBoundingClientRect().width;
        const gapValue = 20; // 20px spacing gap declared in style.css row configurations
        
        const shiftAmount = currentSlideIndex * (cardWidth + gapValue);
        track.style.transform = `translateX(-${shiftAmount}px)`;
    }

    function slideNext() {
        const totalCards = document.querySelectorAll(".product-card").length;
        const maxIndex = totalCards - getVisibleCardsCount();

        if (currentSlideIndex < maxIndex) {
            currentSlideIndex++;
        } else {
            currentSlideIndex = 0; // Wraps smoothly around to initial entry item
        }
        updateSliderPosition();
    }

    function slidePrev() {
        const totalCards = document.querySelectorAll(".product-card").length;
        const maxIndex = totalCards - getVisibleCardsCount();
        
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
        } else {
            currentSlideIndex = maxIndex; // Wraps straight to end position tracking
        }
        updateSliderPosition();
    }

    // Interval Management Loop
    function startStoreAutoPlay() {
        storeAutoPlayTimer = setInterval(slideNext, 3000); // Transitions slider position loop every 3 seconds
    }

    function stopStoreAutoPlay() {
        if (storeAutoPlayTimer) clearInterval(storeAutoPlayTimer);
    }

    // Direct Interaction Controls
    nextBtn.addEventListener("click", () => {
        slideNext();
    });

    prevBtn.addEventListener("click", () => {
        slidePrev();
    });

    // Touch Stop & Mouse Hover Protection Hooks
    sliderWindow.addEventListener("mouseenter", stopStoreAutoPlay);
    sliderWindow.addEventListener("mouseleave", startStoreAutoPlay);

    window.addEventListener("resize", () => {
        currentSlideIndex = 0;
        updateSliderPosition();
    });

    // Fire off store slider engine timeline
    startStoreAutoPlay();


    // ==========================================================================
    // MODULE 2: CUSTOM CREATOR LAB INTERACTIVE REAL-TIME HOVER CONTROLS
    // ==========================================================================
    const inputName = document.getElementById("inputName");
    const inputNumber = document.getElementById("inputNumber");
    const previewName = document.getElementById("previewName");
    const previewNumber = document.getElementById("previewNumber");
    
    const customizerJersey = document.getElementById("jerseyCustomizerTarget");
    const previewPanelZone = document.querySelector(".preview-panel");
    const bagBtn = document.getElementById("bagBtn");

    let labTimerLoop = null;

    // Real-Time Input String Type Listeners
    inputName.addEventListener("input", (e) => {
        const text = e.target.value.trim();
        previewName.innerText = text !== "" ? text : "PLAYER";
    });

    inputNumber.addEventListener("input", (e) => {
        const num = e.target.value;
        previewNumber.innerText = num !== "" ? num : "13";
    });

    // Color Swatches Layout Matrix Loop
    const slideColors = ["#111111", "#1AA845", "#e60000", "#0052cc", "#ffaa00"];
    let currentColorIndex = 0;

    function advanceJerseyColor() {
        currentColorIndex++;
        if (currentColorIndex >= slideColors.length) {
            currentColorIndex = 0;
        }
        customizerJersey.style.setProperty('--jersey-color', slideColors[currentColorIndex]);
    }

    function startLabTimer() {
        labTimerLoop = setInterval(advanceJerseyColor, 2500);
    }

    function stopLabTimer() {
        if (labTimerLoop) clearInterval(labTimerLoop);
    }

    // Lab Pause Mechanics
    previewPanelZone.addEventListener("mouseenter", stopLabTimer);
    previewPanelZone.addEventListener("mouseleave", startLabTimer);

    // Initialise design engine loop parameters
    startLabTimer();

    // Submission Confirmation Box
    bagBtn.addEventListener("click", () => {
        alert(`Design Saved!\nCustom blank jersey uniform variant styled under layout text specs ("${previewName.innerText}" #${previewNumber.innerText}) has updated cart lists.`);
    });
});