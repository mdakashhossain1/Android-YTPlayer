<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Player - No Controls (Plyr)</title>
    
    <!-- Plyr CSS from Local -->
    <link rel="stylesheet" href="plyr.css" />
    
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🎬 YouTube Player - No Controls (Local Plyr)</h1>
            <p>Using Local Plyr.io Library to hide YouTube branding and controls</p>
        </div>

        <!-- Video Input -->
        <div class="input-section">
            <h2>📹 Load Your YouTube Video</h2>
            <form id="videoForm">
                <div class="input-group">
                    <input 
                        type="text" 
                        id="videoInput" 
                        placeholder="Paste YouTube URL or Video ID (e.g., dQw4w9WgXcQ)"
                        value="Ya7UV7MbAsU"
                    >
                    <button type="submit" class="btn">Load Video</button>
                </div>
            </form>
            <p style="color: #666; margin-top: 10px;">
                💡 Tip: Plyr.io provides custom controls that replace YouTube's interface
            </p>
        </div>

        <!-- Info Box - Presto Player YouTube Optimized Settings -->
        <div class="info-box">
            <h4>✨ Presto Player "YouTube Optimized" Features Active:</h4>
            <ul>
                <li><code>controls: 0</code> - Hides ALL YouTube native controls</li>
                <li><code>modestbranding: 1</code> - Removes YouTube logo</li>
                <li><code>showinfo: 0</code> - Hides video title and uploader info</li>
                <li><code>rel: 0</code> - No related videos at end</li>
                <li><code>iv_load_policy: 3</code> - Hides annotations</li>
                <li><code>fs: 0</code> - Uses Plyr's fullscreen instead of YouTube's</li>
                <li><code>noCookie: true</code> - Privacy-enhanced mode (youtube-nocookie.com)</li>
                <li><code>disablekb: 1</code> - Keyboard shortcuts disabled for Presto-style control</li>
                <li>CSS overlays hide remaining YouTube branding elements</li>
            </ul>
        </div>

        <!-- Video Player with Custom Overlay Container -->
        <div class="player-wrapper">
            <h2 class="player-title" id="videoTitle">▶️ Now Playing</h2>
            
            <!-- Native Plyr container -->
            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="Ya7UV7MbAsU"></div>
        </div>

        <!-- Features Grid -->
        <div class="features">
            <div class="feature-card">
                <h3>🚫 No YouTube Branding</h3>
                <p>Plyr replaces YouTube's interface with custom controls. No logo, no channel info, no share button.</p>
            </div>
            <div class="feature-card">
                <h3>🎨 Custom Controls</h3>
                <p>Clean, modern player controls with customizable colors and layout.</p>
            </div>
            <div class="feature-card">
                <h3>🔒 Privacy First</h3>
                <p>Uses youtube-nocookie.com domain to prevent tracking and enhance user privacy.</p>
            </div>
            <div class="feature-card">
                <h3>⚡ Lightweight</h3>
                <p>Plyr is a lightweight library that loads quickly from CDN with minimal overhead.</p>
            </div>
        </div>

        <!-- Console Commands -->
        <div class="console-box">
            <h4>💻 JavaScript Console Commands:</h4>
            <pre>
// Load different video
loadVideo('dQw4w9WgXcQ')

// Play video
player.play()

// Pause video
player.pause()

// Change volume (0-1)
player.volume = 0.5

// Jump to time (seconds)
player.currentTime = 30

// Toggle fullscreen
player.fullscreen.toggle()

// Change player color
changePlayerColor('#ff6b6b')  // Red
changePlayerColor('#4ade80')  // Green
changePlayerColor('#a855f7')  // Purple
            </pre>
        </div>

        <!-- Technical Details -->
        <div class="info-box" style="margin-top: 30px;">
            <h4>🔧 How It Works:</h4>
            <ul>
                <li>Loads local Plyr library</li>
                <li>Creates custom video player wrapper around YouTube iframe</li>
                <li>Intercepts YouTube API calls and events</li>
                <li>Replaces YouTube UI with custom Plyr controls</li>
                <li>Blocks YouTube branding elements</li>
                <li>Provides clean, professional video player experience</li>
            </ul>
        </div>
    </div>

    <!-- Plyr JavaScript from Local -->
    <script src="plyr.js"></script>

    <script src="script.js"></script>
</body>
</html>
