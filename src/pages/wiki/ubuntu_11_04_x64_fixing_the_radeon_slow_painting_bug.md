---
layout: ../../layouts/Layout.astro
title: Ubuntu 11.04 x64 - Fixing the Radeon slow painting bug
---

# Ubuntu 11.04 x64 - Fixing the Radeon slow painting bug

<p class="wiki-date">Earliest known revision <time datetime="2011-08-29T12:13:01Z">29 Aug 2011</time></p>


If you have a Radeon HD 6990 (Caymen derivative) and use Ubuntu 11.04 (or 10.04) you've probably noticed your interface is shockingly slow. This problem has been hounding me for ages but there is a 'fix'. It appears to be related to the proprietary driver not activating correctly.

Before we continue there's two derivatives of this issue. One is caused by a refresh sync - Tear Free, vertical refresh and Sync to VBlack. Give this fix a try first [Check here](http://askubuntu.com/questions/41586/ubuntu-11-04-radeon-4850-performance-problems-and-graphic-problems)   

That probably didn't work ;). To fix this problem I entirely purged the system of the fglrx. Give your system a reboot to make sure any changes have taken. 

Follow this guide: http://wiki.cchtml.com/index.php/Ubuntu_Maverick_Installation_Guide 

Be sure to initialise the xorg config file (and associates) using the atitool as described. This was the sticking point for me.

Overall, it worked. not perfect but until Canonical and AMD sort the issue out this works.

-Miles
