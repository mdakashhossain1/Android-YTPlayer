let player;

// Extract YouTube Video ID from various formats
function extractVideoId(input) {
    input = input.trim();

    // Already a video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
        return input;
    }

    // Extract from various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
    ];

    for (let pattern of patterns) {
        const match = input.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

// Initialize Plyr player
function loadVideo(videoId) {
    // Update title
    const titleElem = document.getElementById('videoTitle');
    if (titleElem) titleElem.textContent = `▶️ Now Playing: ${videoId}`;

    // Update the data attribute
    const playerElement = document.getElementById('player');
    if (!playerElement) {
        console.log('Player element not found');
        return;
    }
    playerElement.setAttribute('data-plyr-embed-id', videoId);

    // Destroy existing player if any
    if (player) {
        player.destroy();
    }

    // Create new Plyr instance with PRESTO PLAYER "YouTube Optimized" preset
    // Configurations synced with git.txt (Official defaults)
    player = new Plyr('#player', {
        iconUrl: 'plyr.svg',
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions', // Added per git.txt
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],
        settings: ['captions', 'quality', 'speed', 'loop'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
        quality: {
            default: 720,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
        },
        fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: false
        },
        keyboard: { focused: true, global: false },
        clickToPlay: true,
        hideControls: true,
        resetOnEnd: false, // Explicit per git.txt
        disableContextMenu: true, // "Hide it" (branding protection)
        autopause: true, // Per git.txt

        // PRESTO PLAYER YouTube Optimized Settings
        youtube: {
            noCookie: true,           // Privacy-enhanced
            rel: 0,                   // No related videos
            showinfo: 0,              // Hide title
            iv_load_policy: 3,        // Hide annotations
            modestbranding: 1,        // Hide logo
            disablekb: 1,
            playsinline: 1,
            controls: 0,              // HIDE YouTube native controls
            fs: 0,
            cc_load_policy: 0,
            hl: 'en',
            origin: window.location.origin
        },
        // Tooltips
        tooltips: {
            controls: true,
            seek: true
        }
    });

    // BRANDING REMOVAL: Opacity Toggle Logic
    // This hides the YouTube iframe completely when not playing

    // TIGHTLY COUPLED OPACITY LOGIC for Branding Removal
    function toggleYoutubeOpacity(visible) {
        const iframe = document.querySelector('.plyr__video-embed iframe, .plyr__video-wrapper iframe');
        if (iframe) {
            // Faster transition for play (to show video quickly), slower for pause (to hide branding gracefully)
            iframe.style.transition = visible ? 'opacity 0.2s ease-in' : 'opacity 0.1s ease-out';
            iframe.style.opacity = visible ? '1' : '0';
        }
    }

    player.on('ready', event => {
        toggleYoutubeOpacity(false); // Start hidden
        console.log('✅ Player ready - Hiding YouTube branding');
        // Notify Android
        if (typeof Android !== 'undefined') {
            Android.onPlayerEvent('ready', JSON.stringify({ videoId: videoId }));
        }
    });

    player.on('playing', event => {
        toggleYoutubeOpacity(true); // Show immediately when playing
        // Double check to ensure it shows if state change missed
        requestAnimationFrame(() => toggleYoutubeOpacity(true));
        // Notify Android
        if (typeof Android !== 'undefined') {
            Android.onPlayerEvent('playing', JSON.stringify({ videoId: videoId }));
        }
    });

    player.on('pause', event => {
        toggleYoutubeOpacity(false); // Hide immediately on pause
        // Notify Android
        if (typeof Android !== 'undefined') {
            Android.onPlayerEvent('paused', JSON.stringify({ videoId: videoId }));
        }
    });

    player.on('ended', event => {
        toggleYoutubeOpacity(false); // Hide on end
        // Notify Android
        if (typeof Android !== 'undefined') {
            Android.onPlayerEvent('ended', JSON.stringify({ videoId: videoId }));
        }
    });

    // Safety check: specific to seeking, sometimes branding can flash
    player.on('seeking', event => {
        // Optionally hide during seek if it causes flashes, or keep visible
        // Keeping visible for smoother UX during scrub, but could hide if needed
    });

    player.on('error', event => {
        if (typeof Android !== 'undefined') {
            Android.onPlayerEvent('error', JSON.stringify({ message: 'Player error' }));
        }
    });

    console.log(`✅ Loaded video: ${videoId}`);
    console.log(`🔗 YouTube URL: https://www.youtube.com/watch?v=${videoId}`);
}

// Change player color
function changePlayerColor(color) {
    document.documentElement.style.setProperty('--plyr-color-main', color);
    console.log(`🎨 Player color changed to: ${color}`);
}

// Make functions globally available
window.loadVideo = loadVideo;
window.changePlayerColor = changePlayerColor;
