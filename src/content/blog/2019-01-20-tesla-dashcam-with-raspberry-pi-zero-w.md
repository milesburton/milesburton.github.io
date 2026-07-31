---
title: "Tesla Dashcam with Raspberry Pi Zero W"
date: 2019-01-20
slug: "tesla-dashcam-with-raspberry-pi-zero-w"
categories: ["Renewables","Tesla"]
tags: ["Raspberry Pi","Tesla"]
excerpt: "As of late 2018 Tesla released V9 which among a number of improvements included dash cam functionality. This works by placing a suitably sized USB drive in one of the available USB ports at the front of the vehicle (Model S). One drawback of this system, not uncommon in dash cams"
featuredImage: "/blog-media/2019/01/unnamed.jpg"
---
<p>As of late 2018 Tesla released V9 which among a number of improvements included dash cam functionality. This works by placing a suitably sized USB drive in one of the available USB ports at the front of the vehicle (Model S).</p>
<p>One drawback of this system, not uncommon in dash cams, there&#8217;s no easy way to push this video to the &#8216;cloud&#8217; &#8211; nor any capability to view in near real-time. This project aims to make this possible.</p>
<p>Using a couple of tricks I&#8217;ve learned through tinkering with various single board computers, it is possible emulate a USB drive on the fly. In essence we are going emulate a USB drive, and periodically store the data on the SDHC. Once we have the video we can do what ever we&#8217;d like &#8211; maybe live stream, upload to your favourite cloud provider or simply backup the files when you return home.</p>
<h2>Current capabilities</h2>
<ul>
<li>[Backup] Storage of Tesla Cam videos</li>
<li>[Dropbox] Upload videos to Dropbox when a internet connection is available</li>
<li>[Remote] Basic Mobile App (Web UI) which lets you view videos on your phone, download videos and ability to enable/disable services at will. Available on port 3000 on the IP address of your Pi</li>
<li>[Security] Services now run as the pi user and all super user commands are whitelisted</li>
<li>[Housekeeping] System will delete old videos when remaining storage space falls below 20%</li>
</ul>
<h2><a id="user-content-hardware-requirements" class="anchor" href="https://github.com/milesburton/teslacam/tree/feature/add-remote-control#hardware-requirements" aria-hidden="true"></a>Hardware Requirements</h2>
<ol>
<li>2017 (AP 2.5) or beyond Tesla</li>
<li>Raspberry Pi Zero W (only this model is supported)</li>
<li>A wireless access point within reasonable distance of the Pi (mobile phone, home router etc)</li>
<li>A sufficiently large SDHC card &#8211; Class 10 or better, at least 16Gig, ideally the largest you can buy.</li>
<li>High quality short USB A to USB Micro cable &#8211; Anker is quite decent</li>
<li>Optional, a case to house the Raspberry Pi &#8211; anything with ventilation would be fine</li>
</ol>
<h2><a id="user-content-software-requirements" class="anchor" href="https://github.com/milesburton/teslacam/tree/feature/add-remote-control#software-requirements" aria-hidden="true"></a>Software Requirements</h2>
<ol>
<li>2018-11-13-raspbian-stretch-lite or later</li>
<li>Etcher to write the disk image to the SDHC card (dd, win32diskimager etc etc will also work)</li>
<li>daemontools package</li>
<li>NodeJS 10.x for Arm v6</li>
<li>OTG Mode enabled in the boot configuration</li>
<li><a href="https://github.com/andreafabrizi/Dropbox-Uploader">Dropbox uploader</a></li>
</ol>
<h2><a id="user-content-instructions-detail-to-come" class="anchor" href="https://github.com/milesburton/teslacam/tree/feature/add-remote-control#instructions-detail-to-come" aria-hidden="true"></a>Instructions (Detail to come)</h2>
<ol>
<li><a href="https://www.raspberrypi.org/downloads/raspbian/" rel="nofollow">Download</a> and burn the latest &#8220;lite&#8221; Raspbian to a suitable SDHC card using <a href="https://www.balena.io/etcher/" rel="nofollow">Etcher</a> (or equivalent)</li>
<li>Modify the /boot partition to <a href="https://gist.github.com/gbaman/50b6cca61dd1c3f88f41">enable USB OTG</a> We need to enable g_mass_storage and dw2.</li>
<li>Add your <a href="https://www.raspberrypi-spy.co.uk/2017/04/manually-setting-up-pi-wifi-using-wpa_supplicant-conf/" rel="nofollow">WIFI configuration details</a> (consider adding several, including a portable hotspot such as your phone)</li>
<li>Install daemontools. Follow <a href="https://isotope11.com/blog/manage-your-services-with-daemontools" rel="nofollow">these steps</a> up until &#8220;Making Services&#8221;</li>
<li>Install <a href="https://nodejs.org/en/download/" rel="nofollow">Nodejs for Linux Arm V6</a>. Gunzip this to /opt/node, symlink to /usr/bin</li>
<li>As root (sudo su)</li>
</ol>
<ul>
<li>Clone <a href="https://github.com/andreafabrizi/Dropbox-Uploader">Dropbox-Uploader</a> (if you want dropbox upload capability). Be sure to follow the instructions including creating a &#8216;TeslaCam&#8217; app on the dropbox portal</li>
<li>Clone this repository to /root/teslacam</li>
<li>Create the services sym links as follows cd /etc/service ln -s /root/teslacam/services/* .</li>
</ul>
<ol start="7">
<li>Plug the Pi Zero W into the Tesla media USB ports (the front ports). Make sure you use the data port on the Pi, google if you are unsure.</li>
<li>Reboot, once the automatic configuration completes (circa 20 minutes) the car should detect the Pi as a USB drive.</li>
</ol>
<h1><a id="user-content-research--notes" class="anchor" href="https://github.com/milesburton/teslacam/tree/feature/add-remote-control#research--notes" aria-hidden="true"></a>Research &amp; notes</h1>
<ul>
<li>Tesla V9 Dashcam records up to one hour, in a circular buffer type fashion split into one minute increments</li>
<li>One hour of footage uses approximately 1.8GiB of storage (over and above any emergency recordings)</li>
<li>Each one minute increment of video is around 28MiB</li>
<li>Emergency recordings are 10 minutes at most</li>
<li>Copying 27 minutes (around 800MiB of data) of footage from a disk image to the ext4 file system takes approximately 4.2 minutes. SDHC class 10</li>
<li>Time to unmount, repair and copy ~30 minutes of footage is around 4 minutes. In this test the file system wasn&#8217;t corrupt.</li>
<li>The Dash cam and USB ports only operate in the following situations
<ul>
<li>The car is powered on by unlocking the vehicle</li>
<li>Climate control is left on when you leave the car</li>
<li>It would appear as of V9 the USB ports are powered whilst charging (TBC). May not apply if you use range mode.</li>
</ul>
</li>
<li>Climate control will only run for 3 hours &#8211; and is a rather wasteful from an energy perspective. This means the dashcam is not suitable for 24hr recording, a &#8216;normal&#8217; dash cam is better suited if you have this requirement.</li>
<li>The Tesla Dash cam tends to be vastly clearer than a interior camera, particularly at night &#8211; very easy to make out number plates.</li>
<li>FAT32, the file system supported by Tesla, cannot be mounted twice without corruption</li>
<li>The car will cut off power to the USB ports without warning, this can cause corruption of video files and any file systems which can not tolerate power loss. This is a tricky issue as there are number of caches (software and hardware) that need to be flushed before power is removed.</li>
<li>Lipo batteries are not advised within the cabin, temperatures of over 60c have been reported in summer.</li>
</ul>
<h2><a id="user-content-approach" class="anchor" href="https://github.com/milesburton/teslacam/tree/feature/add-remote-control#approach" aria-hidden="true"></a>Approach</h2>
<p>Primarily there is a trade-off between lost video vs accessibility (our ability to do something useful with the captured footage). To download the Tesla Dash cam video we need to temporarily stop the recording, as Dash cam records in 1 minute increments we are likely to lose at least this much video &#8211; possibly more, possibly less depending on timing.</p>
<p>The second concern is we have no signal for when the car will be powered down &#8211; ie, you&#8217;ve parked up for the day &#8211; the longer we allow the car to record, the higher the possibility that video will be &#8220;trapped&#8221; in the vehicle till you next power up.</p>
<p>Finally to enable capabilities such as near-real-time monitoring or streaming that video must be transferred to the Pi as quickly as possible. The longer the car records, the longer it takes to transfer &#8211; and so on.</p>
<p>To mitigate the issue we need to pick a comfortable number of minutes, say between 10-30 minutes. To add to the fun, we must minimise the duration the car is not recording &#8211; to this end we need to switch out our emulated USB drives as quickly as possible which can be done by using two (or more) images swapped over whilst the video files are transferred across.</p>
<p>With all this in mind, logically speaking the following steps need to be followed</p>
<ul>
<li>When the Pi powers up
<ul>
<li>Create or mount two disk images</li>
<li>Scan disk images for errors, and repair</li>
<li>If images contain any videos copy them to the Pi</li>
<li>Unmount both images from the PI</li>
</ul>
</li>
<li>In a loop pick one disk image
<ul>
<li>Mount the image allowing the vehicle to begin recording</li>
<li>Wait 30 minutes to accumulate video</li>
<li>Unmount the image from the car</li>
<li>Mount the second Image for the car to record</li>
<li>Scan and fix any errors on the first image</li>
<li>Mount the first image on the Pi</li>
<li>Move all video onto the Pi</li>
<li>Unmount the first image on the Pi</li>
</ul>
</li>
</ul>
<h2><a href="https://github.com/milesburton/teslacam">Grab the code from Github</a></h2>

