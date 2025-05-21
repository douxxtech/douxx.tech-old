document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdownContent = document.getElementById('dropdown-' + dropdownId);
            
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                if (dropdown.id !== 'dropdown-' + dropdownId) {
                    dropdown.classList.remove('show');
                }
            });
            
            document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });
            
            dropdownContent.classList.toggle('show');
            this.classList.toggle('active');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });
    
    const jsFunctionButtons = document.querySelectorAll('.js-function');
    
    jsFunctionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const functionName = this.getAttribute('data-function');
            
            if (typeof window[functionName] === 'function') {
                window[functionName]();
            } else {
                console.error(`Function ${functionName} is not defined`);
            }
        });
    });
});