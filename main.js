let currentSpeed = 1.0;
let isEnabled = true;


function showNotification (text) {
    let notification = document.getElementById('speed-notification');

    if (!notification) {
        notification = document.createElement('div');

        notification.id = 'speed-notification';
        notification.style.cssText = `
        position: fixed;
        z-index: 9999;
        top: 20px;
        left: 50%;
        color: white;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        transform: translateX(-50%);
        transition: opacity 0.2s;
        `;

        document.body.appendChild(notification);
    }

    notification.textContent = text;
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
    }, 1500);
}


function changeSpeed (speed) {
    speed = Math.max(0.1, Math.min(speed, 15.0));
    currentSpeed = speed;

    document.querySelectorAll('video').forEach(
        video => {
            video.playbackRate = currentSpeed;
        }
    );

    showNotification(`Speed - ${currentSpeed.toFixed(1)}x`);
}


function main () {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F8') {
            e.preventDefault();
            isEnabled = !isEnabled;

            if (!isEnabled) {
                showNotification(`Speed changer OFF`);
            } else {
                showNotification(`Speed changer ON`);
            }
        }

        if (!isEnabled) {
            return;
        }

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.code) {
            case 'ShiftRight':
                changeSpeed(1.0);
                break;
            
            case 'ControlRight':
                changeSpeed(2.0);
                break;
            
            case 'Backspace':
                changeSpeed(15.0);
                break;

            case 'BracketRight':
                changeSpeed(currentSpeed + 0.25);
                break;
            
            case 'BracketLeft':
                changeSpeed(currentSpeed - 0.25);
                break;
        }
    });

    const observer = new MutationObserver(() => {
        document.querySelectorAll('video').forEach(
            video => {
                if (video.playbackRate != currentSpeed) {
                    video.playbackRate = currentSpeed;
                }
            }
        );
    });

    observer.observe(document.body, {childList: true, subtree: true});
}


main();