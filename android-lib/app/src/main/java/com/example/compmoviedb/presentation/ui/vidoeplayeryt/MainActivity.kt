package com.example.compmoviedb.presentation.ui.vidoeplayeryt

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.arknox.youtube.YouTubePlayerListener
import com.arknox.youtube.YouTubePlayerView

class MainActivity : AppCompatActivity() {

    private lateinit var youtubePlayerView: YouTubePlayerView
    private lateinit var videoInput: EditText
    private lateinit var loadButton: Button
    private lateinit var statusText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        initViews()
        setupListeners()
        setupBackPressHandler()
    }

    private fun initViews() {
        youtubePlayerView = findViewById(R.id.youtubePlayerView)
        videoInput = findViewById(R.id.videoInput)
        loadButton = findViewById(R.id.loadButton)
        statusText = findViewById(R.id.statusText)

        // Add listener for player events
        youtubePlayerView.addListener(object : YouTubePlayerListener {
            override fun onReady(videoId: String) {
                runOnUiThread {
                    statusText.text = "Playing: $videoId"
                }
            }

            override fun onError(message: String) {
                runOnUiThread {
                    statusText.text = "Error: $message"
                    Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFullscreenChange(isFullscreen: Boolean) {
                runOnUiThread {
                    if (isFullscreen) {
                        statusText.text = "Fullscreen"
                    }
                }
            }
        })
    }

    private fun setupListeners() {
        loadButton.setOnClickListener {
            val input = videoInput.text.toString().trim()
            if (input.isNotEmpty()) {
                youtubePlayerView.loadVideo(input)
                statusText.text = "Loading..."
            } else {
                Toast.makeText(this, "Please enter a video URL or ID", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setupBackPressHandler() {
        // Handle back press for fullscreen exit
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (youtubePlayerView.isInFullscreen()) {
                    youtubePlayerView.exitFullscreen()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }

    override fun onPause() {
        super.onPause()
        // Pause video when app goes to background
        if (::youtubePlayerView.isInitialized) {
            youtubePlayerView.pause()
        }
    }

    override fun onDestroy() {
        if (::youtubePlayerView.isInitialized) {
            youtubePlayerView.release()
        }
        super.onDestroy()
    }
}