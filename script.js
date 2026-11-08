/**
 * NMSA-UG Website Interactivity Script
 * Handles: Navigation, Registration Modal, Photo Lightbox, and News Alerts
 */

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();
  initRegistrationModal();
  initPhotoLightbox();
  initNewsInteraction();
});

/**
 * 1. SMOOTH SCROLLING FOR NAVIGATION LINKS
 */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll("header nav a, .btn[href^='#']");
  
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      
      // Only handle internal links
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerOffset = document.querySelector("header").offsetHeight;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

/**
 * 2. REGISTRATION MODAL CONTROLLER
 * Dynamically builds and controls a registration popup form
 */
function initRegistrationModal() {
  // Find all "Register Now" or "Join Us" buttons that don't go to WhatsApp
  const registerButtons = document.querySelectorAll(".btn[href='#'], a[href='#membership']");
  
  // Create Modal HTML Structure programmatically
  const modal = document.createElement("div");
  modal.id = "regModal";
  modal.style.cssText = `
    display: none; position: fixed; z-index: 2000; left: 0; top: 0;
    width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.6);
    align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;
  `;

  modal.innerHTML = `
    <div style="background: #fff; padding: 30px; border-radius: 12px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
      <span id="closeModal" style="position: absolute; right: 20px; top: 15px; font-size: 28px; font-weight: bold; cursor: pointer; color: #aaa;">&times;</span>
      <h3 style="color: #1a6b3c; margin-bottom: 15px; text-align: center;">NMSA-UG Membership Registration</h3>
      <form id="associationForm">
        <label style="display:block; margin-bottom:5px; font-weight:bold;">Full Name</label>
        <input type="text" placeholder="Enter full name" required style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:6px;">
        
        <label style="display:block; margin-bottom:5px; font-weight:bold;">University / Institution</label>
        <input type="text" placeholder="e.g. KIU, Makerere, KU" required style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:6px;">
        
        <label style="display:block; margin-bottom:5px; font-weight:bold;">WhatsApp Number</label>
        <input type="tel" placeholder="e.g. +256..." required style="width:100%; padding:10px; margin-bottom:20px; border:1px solid #ddd; border-radius:6px;">
        
        <button type="submit" style="background:#1a6b3c; color:#fff; width:100%; padding:12px; border:none; border-radius:25px; font-weight:bold; cursor:pointer;">Submit Application</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // Hook alternative action button behaviors to launch this structural container
  const regTrigger = document.querySelector("a[href*='Register Now']");
  if(regTrigger) {
    regTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  function openModal() {
    modal.style.display = "flex";
    setTimeout(() => modal.style.opacity = "1", 10);
  }

  function closeModalWindow() {
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
  }

  modal.querySelector("#closeModal").addEventListener("click", closeModalWindow);
  window.addEventListener("click", (e) => { if (e.target === modal) closeModalWindow(); });

  // Handle Form Submission
  document.getElementById("associationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for applying! Please proceed to join the WhatsApp group to complete your verification with the general secretary.");
    closeModalWindow();
    this.reset();
  });
}

/**
 * 3. IMAGE GALLERY LIGHTBOX
 * Expands gallery images on tap
 */
function initPhotoLightbox() {
  const galleryImages = document.querySelectorAll(".gallery img");
  
  const lightbox = document.createElement("div");
  lightbox.style.cssText = `
    display: none; position: fixed; z-index: 3000; left: 0; top: 0;
    width: 100%; height: 100%; background: rgba(0,0,0,0.9);
    align-items: center; justify-content: center; cursor: pointer;
  `;
  const lightboxImg = document.createElement("img");
  lightboxImg.style.cssText = "max-width: 90%; max-height: 85%; border-radius: 8px; box-shadow: 0 0 20px rgba(255,255,255,0.2);";
  
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  galleryImages.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

/**
 * 4. DYNAMIC NEWS ALERT HANDLER
 */
function initNewsInteraction() {
  const readMoreBtns = document.querySelectorAll("#news .card a");
  
  readMoreBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const title = this.parentElement.querySelector("h3").innerText;
      alert(`"${title}" - Detailed article updates are being compiled by the Publicity Secretary and will roll out shortly.`);
    });
  });
}
