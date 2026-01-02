document.addEventListener('DOMContentLoaded', function() {
    const curlbtn = document.getElementById('curl-btn');
    
    if (curlbtn) {
        const curlTxt = curlbtn.textContent;
        
        curlbtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            navigator.clipboard.writeText(`curl ${window.location.href}`)
                .then(() => {
                    this.textContent = "Copied !";
                    setTimeout(() => {
                        this.textContent = curlTxt;
                    }, 5000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    this.textContent = "Failed to copy";
                    setTimeout(() => {
                        this.textContent = curlTxt;
                    }, 2000);
                });
        });
    }
});