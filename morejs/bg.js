document.addEventListener('DOMContentLoaded', function() {
    const spaceBg = document.querySelector('.space-bg');
    
    if (!spaceBg) {
        console.warn('Element with class "space-bg" not found');
        return;
    }
    
    const config = {
        zoomScale: 1.1,
        moveIntensity: 20,
        smoothness: 0.1
    };
    
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    spaceBg.style.transform = `scale(${config.zoomScale})`;
    spaceBg.style.transition = 'none';
    
    function handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const normalizedX = (mouseX / viewportWidth) * 2 - 1;
        const normalizedY = (mouseY / viewportHeight) * 2 - 1;
        
        targetX = normalizedX * config.moveIntensity;
        targetY = normalizedY * config.moveIntensity;
    }
    
    function animate() {
        currentX += (targetX - currentX) * config.smoothness;
        currentY += (targetY - currentY) * config.smoothness;
        
        spaceBg.style.transform = `scale(${config.zoomScale}) translate(${currentX}px, ${currentY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    
    document.addEventListener('mouseleave', function() {
        targetX = 0;
        targetY = 0;
    });
    
    animate();
    
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    });
    
    document.addEventListener('touchend', function() {
        targetX = 0;
        targetY = 0;
    });
});

function updateParallaxConfig(newConfig) {
    Object.assign(config, newConfig);
}

let isPaused = false;
function toggleParallaxEffect() {
    isPaused = !isPaused;
    if (isPaused) {
        document.removeEventListener('mousemove', handleMouseMove);
    } else {
        document.addEventListener('mousemove', handleMouseMove);
    }
}
