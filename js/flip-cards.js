/**
 * Simple, direct card flip functionality
 */
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing flip cards');
    
    // Get all front flip buttons (More Information)
    const frontButtons = document.querySelectorAll('.flip-card-front .flip-button');
    console.log(`Found ${frontButtons.length} front buttons`);
    
    // Get all back flip buttons (Back to Summary)  
    const backButtons = document.querySelectorAll('.flip-card-back .flip-button');
    console.log(`Found ${backButtons.length} back buttons`);
    
    // Add click handlers to front buttons
    frontButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.flip-card');
        if (card) {
          card.classList.add('flipped');
          console.log('Card flipped to back');
        }
      });
    });
    
    // Add click handlers to back buttons
    backButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.flip-card');
        if (card) {
          card.classList.remove('flipped');
          console.log('Card flipped to front');
        }
      });
    });
    
    // Debug any structural issues
    const allCards = document.querySelectorAll('.flip-card');
    allCards.forEach((card, index) => {
      const frontButton = card.querySelector('.flip-card-front .flip-button');
      const backButton = card.querySelector('.flip-card-back .flip-button');
      
      if (!frontButton) console.warn(`Card ${index + 1} missing front button`);
      if (!backButton) console.warn(`Card ${index + 1} missing back button`);
    });
  });
})();
