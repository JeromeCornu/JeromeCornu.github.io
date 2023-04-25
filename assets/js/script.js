document.addEventListener("DOMContentLoaded", function () {
  // Get all the buttons that represent the pages
  const pageButtons = document.querySelectorAll(".page-button");

  // Loop through the buttons and add an event listener to each one
  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the active-page-button class from all buttons
      pageButtons.forEach((btn) => {
        btn.classList.remove("active-page-button");
      });

      // Add the active-page-button class to the clicked button
      button.classList.add("active-page-button");
    });
  });
});
