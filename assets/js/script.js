document.addEventListener("DOMContentLoaded", function () {
  function moveToSelected(element) {
    let selected;
    if (element === "next") {
      selected = $(".selected").next();
      if (!selected.length) {
        // if there is no other elements, go back to the first
        selected = $("#carousel div").first();
      }
    } else if (element === "prev") {
      selected = $(".selected").prev();
      if (!selected.length) {
        // if there is no other elements, go back to the last
        selected = $("#carousel div").last();
      }
    } else {
      selected = element;
    }

    const next = $(selected).next();
    const prev = $(selected).prev();
    const prevSecond = $(prev).prev();
    const nextSecond = $(next).next();

    $(selected).removeClass().addClass("selected");

    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");

    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");

    $(nextSecond).nextAll().removeClass().addClass("hideRight");
    $(prevSecond).prevAll().removeClass().addClass("hideLeft");
  }

  $(document).keydown(function (e) {
    switch (e.which) {
      case 37: // left
        moveToSelected("prev");
        break;

      case 39: // right
        moveToSelected("next");
        break;

      default:
        return;
    }
    e.preventDefault();
  });

  $("#carousel div").click(function () {
    moveToSelected($(this));
  });

  $("#prev").click(function () {
    moveToSelected("prev");
  });

  $("#next").click(function () {
    moveToSelected("next");
  });

  // Event handler
  $(".projet_carousel-link").on("click", function (e) {
    if (!$(this).parent().hasClass("selected")) {
      e.preventDefault();
    }
  });

  // Initialize active filters
  const activeFilters = new Set();

  // Add event listeners to filter buttons
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      if (filter === "all") {
        // Clear all other filters
        activeFilters.clear();
        document
          .querySelectorAll(".filter-button")
          .forEach((btn) => btn.classList.remove("active"));
      } else {
        // Toggle the filter
        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
        } else {
          activeFilters.add(filter);
        }
      }

      // Manage active button styles
      if (filter === "all") {
        button.classList.add("active");
      } else {
        button.classList.toggle("active", activeFilters.has(filter));
        document
          .querySelector('.filter-button[data-filter="all"]')
          .classList.remove("active");
      }

      // Apply filters to projects
      document.querySelectorAll(".projet").forEach((project) => {
        const projectClasses = Array.from(project.classList);
        const matches = Array.from(activeFilters).every((filter) =>
          projectClasses.includes(filter)
        );

        if (activeFilters.size === 0 || matches) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
    });
  });

  // Run animations, gifs
  const guy = document.querySelector(".guy");
  const zombie = document.querySelector(".zombie");

  function runCharacters() {
    let startPosition = -150;

    // Define speed and start position
    guy.style.left = `${startPosition}px`;
    zombie.style.left = `${startPosition}px`;

    guy.style.opacity = "1";
    zombie.style.opacity = "1";

    // Anime Guy
    guy.animate([{ left: `${startPosition}px` }, { left: "100vw" }], {
      duration: 4000,
      easing: "linear",
    });

    // Anime Zombie
    setTimeout(() => {
      zombie.animate([{ left: `${startPosition - 40}px` }, { left: "100vw" }], {
        duration: 4500,
        easing: "linear",
      });
    }, 200);

    setTimeout(runCharacters, Math.random() * 20000 + 15000);
  }

  runCharacters();
});
