
      // Mobile menu toggle

      const mobileToggle = document.querySelector(".mobile-menu-toggle");

      const navMenu = document.querySelector(".nav-menu");

      mobileToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        mobileToggle.classList.toggle("active");

        if (mobileToggle.classList.contains("active")) {

          mobileToggle.querySelectorAll("span")[0].style.transform =

            "rotate(45deg) translate(5px, 5px)";

          mobileToggle.querySelectorAll("span")[1].style.opacity = "0";

          mobileToggle.querySelectorAll("span")[2].style.transform =

            "rotate(-45deg) translate(7px, -7px)";

        } else {

          mobileToggle.querySelectorAll("span")[0].style.transform = "none";

          mobileToggle.querySelectorAll("span")[1].style.opacity = "1";

          mobileToggle.querySelectorAll("span")[2].style.transform = "none";

        }

      });
 
      // Modal functionality

      const modal = document.getElementById("contactModal");

      const closeBtn = document.querySelector(".modal-close");
 
      function openModal() {

        modal.style.display = "flex";

      }
 
      function closeModal() {

        modal.style.display = "none";

      }
 
      // Event listener to open modal

      document

        .querySelector(".cta-section .btn-primary")

        .addEventListener("click", (e) => {

          e.preventDefault(); // Prevent default link behavior

          openModal();

        });
 
      // Event listeners to close modal

      closeBtn.addEventListener("click", closeModal);

      window.addEventListener("click", (e) => {

        if (e.target === modal) {

          closeModal();

        }

      });
 
      // Image error handling

      document.querySelectorAll("img").forEach((img) => {

        img.onerror = () => {

          img.src = "images/placeholder.jpg";

        };

      });