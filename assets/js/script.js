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

  function startRace() {
    let startPosition = -150;
    let zombieOffset = -40; // The zombie always starts slightly behind

    // Set initial positions
    guy.style.left = `${startPosition}px`;
    zombie.style.left = `${startPosition + zombieOffset}px`;

    // Make characters visible
    guy.style.opacity = "1";
    zombie.style.opacity = "1";

    let guyDuration = 5000; // Guy takes 5s to cross the screen
    let zombieDuration = 5500; // Zombie takes 5.5s (slightly slower)

    // Animate the Guy
    guy.animate([{ left: `${startPosition}px` }, { left: "100vw" }], {
      duration: guyDuration,
      easing: "linear",
      fill: "forwards",
    });

    // Animate the Zombie (slight delay so it's always behind)
    setTimeout(() => {
      zombie.animate(
        [{ left: `${startPosition + zombieOffset}px` }, { left: "100vw" }],
        {
          duration: zombieDuration,
          easing: "linear",
          fill: "forwards",
        }
      );
    }, 200);

    // Store the next appearance time in sessionStorage
    let nextRaceIn = Math.random() * 20000 + 15000; // Between 15 and 20 seconds
    sessionStorage.setItem("nextRaceTime", Date.now() + nextRaceIn);

    // Schedule the next race
    setTimeout(startRace, nextRaceIn);
  }

  // Check if a race was already scheduled before the page reload
  let nextRaceTime = sessionStorage.getItem("nextRaceTime");

  if (nextRaceTime) {
    let now = Date.now();
    if (now < nextRaceTime) {
      // If the stored time is still in the future, wait before starting the next race
      setTimeout(startRace, nextRaceTime - now);
    } else {
      startRace(); // Otherwise, start immediately
    }
  } else {
    startRace(); // No previous race data, start immediately
  }
});
