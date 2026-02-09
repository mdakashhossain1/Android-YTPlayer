# 🎬 Android YouTube Player Library

[![](https://jitpack.io/v/mdakashhossain1/Android-YTPlayer.svg)](https://jitpack.io/#mdakashhossain1/Android-YTPlayer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Android](https://img.shields.io/badge/Platform-Android-green.svg)](https://developer.android.com)
[![API](https://img.shields.io/badge/API-21%2B-brightgreen.svg?style=flat)](https://android-arsenal.com/api?level=21)

A professional Android YouTube player library powered by **Plyr.js**, offering complete branding removal, custom controls, and privacy-enhanced playback. Perfect for apps that need a clean, branded YouTube viewing experience.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🚫 **Zero Branding** | Completely removes YouTube logo, title, channel info, and related videos |
| 🎨 **Custom UI** | Beautiful Plyr.js controls with customizable colors and themes |
| 📱 **Smart Fullscreen** | Automatic landscape orientation with immersive fullscreen mode |
| 🔒 **Privacy First** | Uses `youtube-nocookie.com` for enhanced user privacy |
| ⚡ **Lightweight** | WebView-based implementation with minimal overhead |
| 🎯 **Easy Integration** | Simple API with comprehensive event listeners |
| 🌐 **Web Version** | Includes standalone HTML/JS player for web projects |

---

## 📦 Installation

### Method 1: JitPack (Recommended)

Add JitPack repository to your **`settings.gradle`** (or root `build.gradle`):

```gradle
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

Add the dependency to your app's **`build.gradle`**:

```gradle
dependencies {
    implementation 'com.github.mdakashhossain1:Android-YTPlayer:v1.2.1'
    implementation 'androidx.webkit:webkit:1.12.1' // Required
}
```

### Method 2: Local Module

1. Clone or download the `youtubeplayer` module
2. Add to `settings.gradle`:
   ```gradle
   include ':youtubeplayer'
   ```
3. Add dependency in app's `build.gradle`:
   ```gradle
   implementation project(':youtubeplayer')
   ```

---

## 🚀 Quick Start

### 1. Add to Layout

```xml
<com.arknox.youtube.YouTubePlayerView
    android:id="@+id/youtubePlayerView"
    android:layout_width="match_parent"
    android:layout_height="250dp"
    android:background="#000000" />
```

### 2. Configure AndroidManifest.xml

> **⚠️ Important:** Add `android:configChanges` to prevent video reload on orientation changes

```xml
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
    android:hardwareAccelerated="true">
</activity>
```

### 3. Initialize in Activity

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var youtubePlayer: YouTubePlayerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        youtubePlayer = findViewById(R.id.youtubePlayerView)

        // Load video by ID or URL
        youtubePlayer.loadVideo("dQw4w9WgXcQ")

        // Add event listeners
        youtubePlayer.addListener(object : YouTubePlayerListener {
            override fun onReady(videoId: String) {
                Log.d("Player", "Ready: $videoId")
            }

            override fun onPlaying(videoId: String) {
                Log.d("Player", "Playing: $videoId")
            }

            override fun onPaused(videoId: String) {
                Log.d("Player", "Paused: $videoId")
            }

            override fun onEnded(videoId: String) {
                Log.d("Player", "Ended: $videoId")
            }

            override fun onFullscreenChange(isFullscreen: Boolean) {
                Log.d("Player", "Fullscreen: $isFullscreen")
            }

            override fun onError(message: String) {
                Log.e("Player", "Error: $message")
            }
        })
    }

    // Handle back button in fullscreen
    override fun onBackPressed() {
        if (youtubePlayer.isInFullscreen()) {
            youtubePlayer.exitFullscreen()
        } else {
            super.onBackPressed()
        }
    }

    // Lifecycle management
    override fun onPause() {
        super.onPause()
        youtubePlayer.pause()
    }

    override fun onDestroy() {
        youtubePlayer.release()
        super.onDestroy()
    }
}
```

---

## 📖 API Reference

### YouTubePlayerView Methods

| Method | Description |
|--------|-------------|
| `loadVideo(videoIdOrUrl: String)` | Load a YouTube video by ID or full URL |
| `play()` | Start video playback |
| `pause()` | Pause video playback |
| `toggleFullscreen()` | Toggle fullscreen mode |
| `exitFullscreen(): Boolean` | Exit fullscreen (returns true if was fullscreen) |
| `isInFullscreen(): Boolean` | Check if currently in fullscreen |
| `addListener(listener)` | Add event listener |
| `removeListener(listener)` | Remove event listener |
| `release()` | Clean up resources (call in `onDestroy()`) |

### YouTubePlayerListener Events

```kotlin
interface YouTubePlayerListener {
    fun onReady(videoId: String)              // Player initialized
    fun onPlaying(videoId: String)            // Video started playing
    fun onPaused(videoId: String)             // Video paused
    fun onEnded(videoId: String)              // Video ended
    fun onFullscreenChange(isFullscreen: Boolean) // Fullscreen toggled
    fun onError(message: String)              // Error occurred
}
```

---

## 🌐 Web Library

The repository includes a standalone **web version** for HTML/PHP/JavaScript projects.

### Installation

Copy these files from `web-lib/` to your project:
- `plyr.js` & `plyr.css` - Core Plyr library
- `script.js` & `style.css` - Custom player logic
- `plyr.svg` - Player icons

### Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="plyr.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="player-wrapper">
        <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="dQw4w9WgXcQ"></div>
    </div>

    <script src="plyr.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### JavaScript API

```javascript
// Load different video
loadVideo('VIDEO_ID');

// Customize player color
changePlayerColor('#ff6b6b');

// Access Plyr instance
player.play();
player.pause();
player.volume = 0.5;
player.currentTime = 30;
```

---

## 📸 Screenshots

<div align="center">

| Main Screen | Video Loaded | Fullscreen |
|-------------|--------------|------------|
| ![Screen 1](screenshots/screenshot_app_1.png) | ![Screen 2](screenshots/screenshot_app_2.png) | ![Screen 3](screenshots/screenshot_app_3.png) |

| Controls | Settings | Player UI |
|----------|----------|-----------|
| ![Screen 4](screenshots/screenshot_app_4.png) | ![Screen 5](screenshots/screenshot_app_5.png) | ![Main](screenshots/app-screen-shoot.png) |

</div>

---

## 🔧 Technical Details

### How It Works

1. **WebView + Plyr.js**: Uses Android WebView to load a custom HTML page with Plyr.js
2. **Asset Loader**: Serves local assets via `https://appassets.androidplatform.net` for YouTube API compatibility
3. **JavaScript Bridge**: Bidirectional communication between Kotlin and JavaScript
4. **Custom Chrome Client**: Handles fullscreen events and orientation changes
5. **Privacy Mode**: All requests go through `youtube-nocookie.com`

### Plyr.js Configuration

The player uses **Presto Player "YouTube Optimized"** preset:

- `controls: 0` - Hides all YouTube native controls
- `modestbranding: 1` - Removes YouTube logo
- `rel: 0` - No related videos
- `showinfo: 0` - Hides video title
- `iv_load_policy: 3` - Hides annotations
- `noCookie: true` - Privacy-enhanced mode

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Arknox Technology

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- [Plyr.js](https://plyr.io/) - Beautiful HTML5 video player
- [JitPack](https://jitpack.io/) - Easy Android library distribution
- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) - Video playback

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/mdakashhossain1/Android-YTPlayer/issues)
- **Email**: support@arknox.com
- **Website**: [arknox.com](https://arknox.com)

---

<div align="center">

**Made with ❤️ by Arknox Technology**

⭐ Star this repo if you find it useful!

</div>
