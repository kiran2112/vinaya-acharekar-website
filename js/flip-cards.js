/**
 * Simple modal expansion functionality
 */
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing enhanced modal cards');
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
    
    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalOverlay.appendChild(modalContent);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '×';
    modalContent.appendChild(closeButton);
    
    // Get all "More Information" buttons
    const moreInfoButtons = document.querySelectorAll('.flip-card-front .flip-button');
    console.log(`Found ${moreInfoButtons.length} more info buttons`);
    
    // Add click handlers to more info buttons
    moreInfoButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the parent card
        const card = this.closest('.flip-card');
        if (!card) return;
        
        // Find the title from front side
        const frontTitle = card.querySelector('.project-title h3')?.textContent || 'Project Details';
        
        // Create heading if not present in back content
        let heading = document.createElement('h3');
        heading.textContent = frontTitle;
        
        // Find the back content and clone it
        const backContent = card.querySelector('.flip-card-back').cloneNode(true);
        
        // Ensure back content is visible
        backContent.style.display = 'block';
        backContent.style.position = 'static';
        backContent.style.transform = 'none';
        backContent.style.opacity = '1';
        
        // Clear previous content and add new content
        modalContent.innerHTML = '';
        modalContent.appendChild(closeButton);
        
        // Add heading only if there isn't one already
        if (!backContent.querySelector('h3')) {
            modalContent.appendChild(heading);
        }
        
        modalContent.appendChild(backContent);
        
        console.log('Modal content populated with:', backContent);
        
        // Show the modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close modal when clicking close button
    closeButton.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay background
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
    
    // Function to close modal
    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Get all "Back to Summary" buttons that might be created in the modal
    document.addEventListener('click', function(e) {
      if (e.target.closest('.flip-button') && 
          e.target.closest('.modal-content')) {
        e.preventDefault();
        closeModal();
      }
    });
  });
})();
