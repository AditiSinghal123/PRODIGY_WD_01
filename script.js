
/* =====================================
   GRITGORE — INTERACTIVE FEATURES
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close the mobile menu with Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Footer year
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Current date in the daily tracker
  const dateElement = document.getElementById("currentDate");

  dateElement.textContent = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(new Date()).toUpperCase();

  // Reveal elements as they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // Active navigation link based on the visible section
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;

        navLinks.forEach(link => {
          const isActive =
            link.getAttribute("href") === `#${sectionId}`;

          link.classList.toggle("active", isActive);
        });
      });
    }, {
      rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // Daily progress tracker
  const taskChecks = document.querySelectorAll(".task-check");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const progressPercent = document.getElementById("progressPercent");
  const encouragement = document.getElementById("encouragement");
  const resetButton = document.getElementById("resetTasks");

  const totalTasks = taskChecks.length;

  function updateProgress() {
    const completed = [...taskChecks].filter(
      checkbox => checkbox.checked
    ).length;

    const percentage = totalTasks
      ? Math.round((completed / totalTasks) * 100)
      : 0;

    progressFill.style.width = `${percentage}%`;
    progressText.textContent =
      `${completed} of ${totalTasks} completed`;
    progressPercent.textContent = `${percentage}%`;

    if (percentage === 100) {
      encouragement.textContent =
        "Amazing! You showed up for yourself today.";
    } else if (percentage >= 50) {
      encouragement.textContent =
        "You're building momentum. Keep going!";
    } else if (completed > 0) {
      encouragement.textContent =
        "Every small win counts. Keep it up!";
    } else {
      encouragement.textContent =
        "Your next step starts here.";
    }
  }

  taskChecks.forEach(checkbox => {
    checkbox.addEventListener("change", updateProgress);
  });

  resetButton.addEventListener("click", () => {
    taskChecks.forEach(checkbox => {
      checkbox.checked = false;
    });

    updateProgress();
  });

  // Demo signup form
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const formMessage = document.getElementById("formMessage");

  signupForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!emailInput.validity.valid) {
      emailInput.reportValidity();
      return;
    }

    formMessage.textContent =
      "Thanks for your interest! This is a demo — your email was not sent or saved.";
    formMessage.classList.add("success");

    signupForm.reset();
  });

  // Recalculate progress on initial load
  updateProgress();
});
