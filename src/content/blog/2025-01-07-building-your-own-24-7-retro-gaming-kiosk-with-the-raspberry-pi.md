---
title: "Building Your Own 24/7 Retro Gaming Kiosk with the Raspberry Pi"
date: 2025-01-07
slug: "building-your-own-24-7-retro-gaming-kiosk-with-the-raspberry-pi"
categories: ["HOWTO"]
tags: ["docker","gaming","Linux","Raspberry Pi","technology"]
excerpt: "Want to bring some retro gaming magic to your desk? Check out what we’re building: Pretty cool, right? This compact arcade cabinet automatically cycles through classic games, creating a mesmerising display that’s perfect for any workspace. If you’ve seen my previous work on Tiny "
featuredImage: "/blog-media/2025/01/img_1339.jpg"
---

<h1 class="wp-block-heading"></h1>



<p class="wp-block-paragraph">Want to bring some retro gaming magic to your desk? Check out what we&#8217;re building:</p>



<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/gaa_9ESaXzo?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<p class="wp-block-paragraph">Pretty cool, right? This compact arcade cabinet automatically cycles through classic games, creating a mesmerising display that&#8217;s perfect for any workspace. If you&#8217;ve seen my previous work on <a href="/blog/tiny-arcade-24-7-attract-mode-mod/" target="_blank" rel="noopener noreferrer">Tiny Arcade 24/7 attract mode mods</a> or watched <a href="https://www.youtube.com/watch?v=eoQTKEbdS-4" target="_blank" rel="noopener noreferrer">the demonstration video</a>, you&#8217;ll know I love making compact gaming devices that bring arcade magic to any desk. This project builds on that foundation, scaling things up whilst maintaining the same captivating attract-mode spirit.</p>



<p class="wp-block-paragraph">In this guide, I&#8217;ll show you how to build your own desktop arcade kiosk that cycles through your favourite retro games automatically. The best part? It&#8217;s completely self-running – just power it up and watch the magic happen!</p>



<h2 class="wp-block-heading">What We&#8217;re Building</h2>



<p class="wp-block-paragraph">We&#8217;ll create a desk-friendly arcade system that:</p>



<ul class="wp-block-list">
<li>Automatically cycles through different games every few minutes</li>



<li>Boots up without any manual intervention</li>



<li>Recovers automatically after power losses or crashes</li>



<li>Uses a compact display perfect for desktop viewing</li>



<li>Can be expanded into a full mini cabinet</li>
</ul>



<p class="wp-block-paragraph">This project is perfect for weekend tinkerers and provides an excellent introduction to both RetroPie and Linux system administration.</p>



<h2 class="wp-block-heading">Getting Your Gear Together</h2>



<h3 class="wp-block-heading">Essential Components</h3>



<ul class="wp-block-list">
<li><strong>The Brain</strong>: Raspberry Pi 3 Model B+ or newer
<ul class="wp-block-list">
<li><em>Pro tip</em>: The Raspberry Pi 5 offers significantly better emulation performance, especially for more demanding systems like N64 or PlayStation.</li>



<li><em>Budget tip</em>: A Pi Zero 2 W can handle most 16-bit games perfectly if you&#8217;re looking to save money.</li>
</ul>
</li>



<li><strong>The Display</strong>: 3.5&#8243; TFT Touch Screen with Case
<ul class="wp-block-list">
<li>Look for IPS panels for better viewing angles</li>



<li>Make sure to check screen resolution – higher is better for text readability</li>



<li>Verify Pi model compatibility before purchasing</li>
</ul>
</li>



<li><strong>Storage</strong>: 64 GiB SDHC Card
<ul class="wp-block-list">
<li>Recommended brands: Samsung EVO, SanDisk Ultra, Kingston Canvas</li>



<li>Avoid unknown brands – a failing SD card means rebuilding your system</li>
</ul>
</li>



<li><strong>Development Tools</strong>:
<ul class="wp-block-list">
<li>SDHC card reader for initial setup</li>



<li>USB keyboard for configuration</li>



<li>Reliable 5V power supply (minimum 2.5A recommended)</li>
</ul>
</li>
</ul>



<h3 class="wp-block-heading">Optional but Recommended</h3>



<ul class="wp-block-list">
<li>Small 5V cooling fan (particularly important for enclosed builds)</li>



<li>GPIO-based power button for clean shutdowns</li>



<li>USB game controller for testing</li>



<li>Micro-HDMI adapter (for troubleshooting)</li>
</ul>



<h2 class="wp-block-heading">Setting Up Your System</h2>



<h3 class="wp-block-heading">1. Preparing RetroPie</h3>



<p class="wp-block-paragraph">First, download RetroPie&#8217;s image from <a href="https://retropie.org.uk/" target="_blank" rel="noopener noreferrer">the official RetroPie website</a>. Use <a href="https://www.raspberrypi.com/software/" target="_blank" rel="noopener noreferrer">Raspberry Pi Imager</a> or <a href="https://www.balena.io/etcher/" target="_blank" rel="noopener noreferrer">balenaEtcher</a> – the Imager includes helpful options like:</p>



<ul class="wp-block-list">
<li>Pre-configuring WiFi</li>



<li>Setting up SSH</li>



<li>Changing default passwords</li>
</ul>



<p class="wp-block-paragraph"><em>Security Note: Always change the default password (<code>raspberry</code>) immediately after first boot!</em></p>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: bash; title: ; notranslate" title="">
# Update system and install required packages
sudo apt-get update
sudo apt-get install nodejs npm linux-cpupower # We'll need NodeJS for the rom changer, and linux-cpupower to switch the kernel to a more power friendly mode
</pre></div>


<h3 class="wp-block-heading">2. Display Configuration</h3>



<p class="wp-block-paragraph">The trickiest part of this build is often getting your display working correctly. Here&#8217;s our battle-tested approach:</p>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: bash; title: ; notranslate" title="">
# Clone the display drivers
git clone https://github.com/waveshare/LCD-show.git
cd LCD-show

# Before running this, verify it matches your screen model!
sudo ./LCD35B-show
</pre></div>


<p class="wp-block-paragraph">If you prefer manual configuration, you&#8217;ll need to edit your <code>/boot/config.txt</code>. Here&#8217;s a typical configuration:</p>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: bash; title: ; notranslate" title="">
&#91;all]
hdmi_force_hotplug=1
arm_freq=300
dtparam=i2c_arm=on
dtparam=spi=on
enable_uart=1
dtoverlay=waveshare35a:rotate=270,speed=30000000,fps=30
hdmi_group=2
hdmi_mode=1
hdmi_mode=87
hdmi_cvt 640 480 60 6 0 0 0
hdmi_drive=2
</pre></div>


<p class="wp-block-paragraph"><em>Troubleshooting Tip: If your screen shows nothing or displays strange patterns, don’t panic! You can always reconnect via HDMI to fix things.</em></p>



<h3 class="wp-block-heading">3. Power Optimisation</h3>



<p class="wp-block-paragraph">Since we&#8217;re building a 24/7 system, let&#8217;s make it energy-efficient:</p>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: bash; title: ; notranslate" title="">
# Configure the kernel to use a more power friendly mode
sudo cpupower frequency-set -g powersave

# Monitor temperature (good for testing)
vcgencmd measure_temp
</pre></div>


<h2 class="wp-block-heading">Creating the Auto-Cycling Game System</h2>



<p class="wp-block-paragraph">Here&#8217;s where the magic happens. We&#8217;ll create a Node.js script that automatically switches games:</p>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: jscript; title: ; notranslate" title="">
#!/usr/bin/nodejs
const fs = require('fs');
const childProcess = require('child_process');

// Edit this array with the ROM filenames you want to cycle through
const roms = &#91;
    "SonicTheHedgehog.bin",
    "StreetsOfRage2.bin",
    "GoldenAxe.bin"
];

// Add variety with random selection
const randomIndex = Math.floor(Math.random() * roms.length);
const selectedGame = roms&#91;randomIndex];

// Path to the Mega Drive (Genesis) core in RetroArch
const launchCommand = `/opt/retropie/emulators/retroarch/bin/retroarch \
    -L /opt/retropie/libretrocores/lr-picodrive/picodrive_libretro.so \
    --config /opt/retropie/configs/megadrive/retroarch.cfg \
    "/home/pi/RetroPie/roms/megadrive/${selectedGame}" \
    --appendconfig /dev/shm/retroarch.cfg`;

// Gracefully handle game switching
childProcess.exec('killall retroarch');
childProcess.exec(launchCommand);
</pre></div>


<p class="wp-block-paragraph">Save this script as <code>changeRoms.js</code> in your home directory (<code>/home/pi/</code>).</p>



<h3 class="wp-block-heading">Making the Script Executable</h3>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: bash; title: ; notranslate" title="">
# Make the script executable
chmod +x /home/pi/changeRoms.js
</pre></div>


<h3 class="wp-block-heading">Setting Up Auto-rotation</h3>


<div class="wp-block-syntaxhighlighter-code wp-block-code"><pre class="brush: bash; title: ; notranslate" title="">
# Add cron job to run every 10 minutes
(crontab -l 2&gt;/dev/null; echo &quot;*/10 * * * * /usr/bin/nodejs /home/pi/changeRoms.js&quot;) | crontab -
</pre></div>


<h2 class="wp-block-heading">Taking It Further</h2>



<h3 class="wp-block-heading">Cabinet Design Considerations</h3>



<p class="wp-block-paragraph">If you&#8217;re planning to build an enclosure:</p>



<ol class="wp-block-list">
<li><strong>Ventilation is Critical</strong>
<ul class="wp-block-list">
<li>Add ventilation holes near the Pi</li>



<li>Consider a small fan for enclosed spaces</li>



<li>Monitor temperatures during extended use</li>
</ul>
</li>



<li><strong>Power Management</strong>
<ul class="wp-block-list">
<li>Include an accessible power switch</li>



<li>Consider a UPS for clean shutdowns</li>



<li>Use a quality power supply</li>
</ul>
</li>



<li><strong>Future Expansion</strong>
<ul class="wp-block-list">
<li>Leave space for additional buttons</li>



<li>Plan for possible screen upgrades</li>



<li>Consider cable management early</li>
</ul>
</li>
</ol>



<h3 class="wp-block-heading">Advanced Features to Explore</h3>



<ul class="wp-block-list">
<li>Add an attract mode with game previews</li>



<li>Implement a web interface for remote control</li>



<li>Create custom boot screens</li>



<li>Add LED lighting effects</li>



<li>Integrate with home automation systems</li>
</ul>



<h2 class="wp-block-heading">Troubleshooting Common Issues</h2>



<ol class="wp-block-list">
<li><strong>Screen Shows Nothing</strong>
<ul class="wp-block-list">
<li>Verify power supply capacity</li>



<li>Double-check display driver installation</li>



<li>Try booting with HDMI first</li>
</ul>
</li>



<li><strong>System Crashes</strong>
<ul class="wp-block-list">
<li>Monitor CPU temperature</li>



<li>Check power supply stability</li>



<li>Verify ROM compatibility</li>
</ul>
</li>



<li><strong>Games Run Slowly</strong>
<ul class="wp-block-list">
<li>Adjust emulator settings</li>



<li>Consider overclocking (with caution)</li>



<li>Verify you&#8217;re using appropriate emulators for your Pi model</li>
</ul>
</li>
</ol>



<h2 class="wp-block-heading">Resources and Community</h2>



<ul class="wp-block-list">
<li><a href="https://retropie.org.uk/docs/" target="_blank" rel="noopener noreferrer">RetroPie Documentation</a></li>



<li><a href="https://www.raspberrypi.org/documentation/" target="_blank" rel="noopener noreferrer">Raspberry Pi Documentation</a></li>



<li><a href="https://github.com/waveshare/LCD-show" target="_blank" rel="noopener noreferrer">Waveshare LCD-show GitHub</a></li>



<li><a href="https://itch.io/c/2410968/sega-homebrew" target="_blank" rel="noopener noreferrer">itch.io Sega Homebrew Collection</a></li>



<li>Join the RetroPie forums</li>



<li>Check out r/RetroPie on Reddit</li>
</ul>



<h2 class="wp-block-heading">Remote Access Tools</h2>



<p class="wp-block-paragraph">For Windows users:</p>



<ul class="wp-block-list">
<li><a href="https://winscp.net/" target="_blank" rel="noopener noreferrer">WinSCP</a> for file transfers</li>



<li><a href="https://www.putty.org/" target="_blank" rel="noopener noreferrer">PuTTY</a> for SSH access</li>
</ul>



<h2 class="wp-block-heading">Conclusion</h2>



<p class="wp-block-paragraph">Building a Raspberry Pi arcade kiosk is more than just a fun project – it&#8217;s an excellent way to learn about Linux, emulation, and hardware integration. Whether you&#8217;re building it as a desk accessory or as a stepping stone to larger projects, the skills you&#8217;ll develop are valuable for any maker or developer.</p>



<p class="wp-block-paragraph">Much like my previous Tiny Arcade projects, this build demonstrates how we can create engaging, self-running gaming displays that bring life to any workspace. The principles remain the same – create something that&#8217;s both functional and fascinating to watch.</p>



<p class="wp-block-paragraph">Remember to respect copyright laws when obtaining ROMs, and consider supporting game developers by purchasing their modern releases when available.</p>



<p class="wp-block-paragraph">Share your builds, modifications, and questions in the comments below. Happy building!</p>



<hr class="wp-block-separator has-alpha-channel-opacity" />



<p class="wp-block-paragraph"><em>Note: This guide assumes basic familiarity with Linux commands and SSH. If you&#8217;re new to these concepts, consider checking out our beginner&#8217;s guide to Linux command line first.</em></p>

