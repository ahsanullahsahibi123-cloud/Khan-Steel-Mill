// LOADING SCREEN

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("done");
  }, 450);
});

// MOBILE NAVIGATION

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(open));
});

// CLOSE MENU AFTER CLICKING A LINK

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
  });
});

// SCROLL REVEAL ANIMATION

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// ANIMATED STATISTICS COUNTER

const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;

      const target = Number(element.dataset.count);

      const start = performance.now();

      const duration = 1500;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);

        element.textContent = Math.floor(
          target * (1 - Math.pow(1 - progress, 3)),
        ).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);

      observer.unobserve(element);
    });
  },
  {
    threshold: 0.6,
  },
);

document.querySelectorAll("[data-count]").forEach((element) => {
  countObserver.observe(element);
});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent = new Date().getFullYear();
