document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const socialIcons = document.querySelector('.social-icons');
    const body = document.body;

    if (hamburger && navLinks && socialIcons) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            socialIcons.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                socialIcons.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    const modal = document.getElementById("previewModal");
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains('close')) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    const websiteCards = document.querySelectorAll('.project-card.website-card');
    websiteCards.forEach(card => {
        card.addEventListener('click', () => {
            // Extract URL from onclick attribute
            const url = card.getAttribute('onclick').match(/'(https?:\/\/[^']+)'/)[1];
            openModal('url', url);
        });
    });
});

/**
 * Opens the generic modal with either an image or a website URL (in an iframe).
 * @param {string} type - 'image' or 'url'.
 * @param {string} content - The image src or the website URL.
 */
function openModal(type, content) {
  const modal = document.getElementById("previewModal");
  const modalImage = document.getElementById("modalImage");
  const modalIframe = document.getElementById("modalIframe");
  const modalContentWrapper = document.querySelector('.modal-content-wrapper');

  if (modal && modalImage && modalIframe && modalContentWrapper) {
    // Reset previous content
    modalImage.style.display = "none";
    modalIframe.style.display = "none";
    modalImage.src = "";
    modalIframe.src = "about:blank";

    if (type === 'image') {
      modalImage.src = content;
      modalImage.style.display = "block";
      modalContentWrapper.classList.remove('iframe-active');
    } else if (type === 'url') {
      modalIframe.src = content;
      modalIframe.style.display = "block";
      modalContentWrapper.classList.add('iframe-active');
    }

    modal.style.display = "flex";
    document.body.classList.add('no-scroll');
  }
}

function closeModal() {
  const modal = document.getElementById("previewModal");
  const modalImage = document.getElementById("modalImage");
  const modalIframe = document.getElementById("modalIframe");
  const modalContentWrapper = document.querySelector('.modal-content-wrapper');

  if (modal) {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');

    if (modalImage) {
        modalImage.src = "";
    }
    if (modalIframe) {
        modalIframe.src = "about:blank";
    }
    if (modalContentWrapper) {
        modalContentWrapper.classList.remove('iframe-active');
    }
  }
}