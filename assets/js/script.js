document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("myCarousel");
    let currentIndex = 0;
    let intervalId; // Variable pour stocker l'ID de l'intervalle

    function showItem(index) {
        const translateValue = -index * 20; // 20% per item
        carousel.style.transform = `translateX(${translateValue}%)`;
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % 5; // Assuming 5 items
        showItem(currentIndex);
        resetInterval();
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + 5) % 5; // Assuming 5 items
        showItem(currentIndex);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextItem, 3000);
    }

    intervalId = setInterval(nextItem, 3000); // Auto advance every 3 seconds

    // Ajouter des gestionnaires d'événements pour les boutons
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");

    nextButton.addEventListener("click", function () {
        nextItem();
    });

    prevButton.addEventListener("click", function () {
        prevItem();
    });
});


$(document).ready(function () {
    function moveToSelected(element) {

        if (element == "next") {
            var selected = $(".selected").next();
        } else if (element == "prev") {
            var selected = $(".selected").prev();
        } else {
            var selected = element;
        }

        var next = $(selected).next();
        var prev = $(selected).prev();
        var prevSecond = $(prev).prev();
        var nextSecond = $(next).next();

        $(selected).removeClass().addClass("selected");

        $(prev).removeClass().addClass("prev");
        $(next).removeClass().addClass("next");

        $(nextSecond).removeClass().addClass("nextRightSecond");
        $(prevSecond).removeClass().addClass("prevLeftSecond");

        $(nextSecond).nextAll().removeClass().addClass('hideRight');
        $(prevSecond).prevAll().removeClass().addClass('hideLeft');

    }

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                moveToSelected('prev');
                break;

            case 39: // right
                moveToSelected('next');
                break;

            default: return;
        }
        e.preventDefault();
    });

    $('#carousel div').click(function () {
        moveToSelected($(this));
    });

    $('#prev').click(function () {
        moveToSelected('prev');
    });

    $('#next').click(function () {
        moveToSelected('next');
    });


    // Gestionnaire d'événements
    $('.projet_carousel-link').on('click', function (e) {
        // Si la div parente n'a pas la classe "selected", annule le comportement par défaut du clic
        if (!$(this).parent().hasClass('selected')) {
            e.preventDefault();
        }
    });

});