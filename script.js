// Mobile navigation toggle and automatic footer year.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a visitor selects a link.
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearElement = document.querySelector('#current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* Services tabs */

const serviceTabs = document.querySelectorAll(".service-tab");

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedPanelId = tab.getAttribute("aria-controls");

    serviceTabs.forEach((otherTab) => {
      const isSelected = otherTab === tab;

      otherTab.classList.toggle("active", isSelected);
      otherTab.setAttribute("aria-selected", String(isSelected));
      otherTab.tabIndex = isSelected ? 0 : -1;

      const panelId = otherTab.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      if (panel) {
        panel.hidden = !isSelected;
      }
    });

    const selectedPanel = document.getElementById(selectedPanelId);

    if (selectedPanel) {
      selectedPanel.hidden = false;
    }
  });

  /* Allow keyboard users to switch tabs with arrow keys. */
  tab.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();

      const tabs = Array.from(serviceTabs);
      const currentIndex = tabs.indexOf(tab);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + tabs.length) % tabs.length;

      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  });
});

//Gallery category filters
const galleryTabs = document.querySelectorAll(".gallery-tab");
const galleryCards = document.querySelectorAll(".gallery-card");

galleryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedCategory = tab.dataset.filter;

    galleryTabs.forEach((otherTab) => {
      const isSelected = otherTab === tab;

      otherTab.classList.toggle("active", isSelected);
      otherTab.setAttribute("aria-pressed", String(isSelected));
    });

    galleryCards.forEach((card) => {
      const matchesCategory =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matchesCategory;
    });
  });
});


/* BOETTCHER & SONS AUTOMATIC GALLERY */

const galleryGrid = document.querySelector("#gallery-grid");

if (galleryGrid) {
    // Each folder uses a numbered JPG filename.
    const galleryCategories = [
        {
            folder: "building",
            prefix: "b",
            count: 55,
            category: "buildings",
            label: "Building"
        },
        {
            folder: "custom",
            prefix: "c",
            count: 37,
            category: "custom",
            label: "Custom Work"
        },
        {
            folder: "fabrication",
            prefix: "f",
            count: 51,
            category: "fabrication",
            label: "Fabrication"
        },
        {
            folder: "handrail",
            prefix: "h",
            count: 64,
            category: "handrails",
            label: "Handrail"
        },
        {
            folder: "repairs",
            prefix: "r",
            count: 26,
            category: "repair",
            label: "Repair"
        }
    ];

    const galleryImages = [];

    // Generate an image entry for every numbered photo.
    galleryCategories.forEach((group) => {
        for (let number = 1; number <= group.count; number++) {
            galleryImages.push({
                src: `assets/squoosh/${group.folder}/${group.prefix}${number}.jpg`,
                category: group.category,
                title: `${group.label} Project ${number}`
            });
        }
    });

    // Build the gallery cards.
    const galleryFragment = document.createDocumentFragment();

    galleryImages.forEach((photo) => {
        const card = document.createElement("article");
        card.className = "gallery-card";
        card.dataset.category = photo.category;

        const image = document.createElement("img");
        image.className = "gallery-image";
        image.src = photo.src;
        image.alt = photo.title;
        image.loading = "lazy";
        image.width = 1200;
        image.height = 900;
        image.decoding = "async";

        // Hide a card if its image file does not exist.
        image.addEventListener("error", () => {
            card.remove();
        }, { once: true });

        const content = document.createElement("div");
        content.className = "gallery-card-content";

        const heading = document.createElement("h3");
        heading.textContent = photo.title;

        content.appendChild(heading);
        card.appendChild(image);
        card.appendChild(content);

        galleryFragment.appendChild(card);
    });

    galleryGrid.appendChild(galleryFragment);

    // Filter gallery cards by category.
    const galleryTabs = document.querySelectorAll(".gallery-tab");

    galleryTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const selectedFilter = tab.dataset.filter;

            galleryTabs.forEach((button) => {
                const isActive = button === tab;

                button.classList.toggle("active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

            galleryGrid.querySelectorAll(".gallery-card").forEach((card) => {
                const matchesFilter =
                    selectedFilter === "all" ||
                    card.dataset.category === selectedFilter;

                card.hidden = !matchesFilter;
            });
        });
    });
} 

