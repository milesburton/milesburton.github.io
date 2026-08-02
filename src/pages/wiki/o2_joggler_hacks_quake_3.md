---
layout: ../../layouts/Layout.astro
title: O2 Joggler Hacks - Quake 3
---

# O2 Joggler Hacks - Quake 3

## Contents

* [1 Quake 3 on the O2 Joggler](#quake-3-on-the-o2-joggler)
* [2 Media](#media)
* [3 Performance](#performance)
* [4 How To](#how-to)
* [5 References](#references)

## Quake 3 on the O2 Joggler
The O2 Joggler has proven an exceptional piece of equipment for the price. Literally nothing I've seen in years can compare with hardware inside this unsuspecting little device. Finally, like all great hacking platforms it's time Quake 3 was fired up. Back in the day (and let's be honest, it wasn't that long ago), Quake 3 made hardware cry yet today we see everything from [cell](http://code.google.com/p/kwaak3/) [phones](http://www.vidoemo.com/yvideo.php?i=Yk8tNHNIcWuRpNFBIbXc&nokia-n95-running-quake-3-time-demo=) to [satnavs](http://www.youtube.com/watch?v=qxf4oTaxPv8) running a port. Wouldn't it be a shame if the Joggler missed out?

## Media
<videoflash>PfkgxVV91g0</videoflash>

<videoflash>gQFC6sx7-ys</videoflash>

## Performance
The Quake 3 performance is basically spot on. If you were brave enough you could probably quite happily play! It could potentially make an interesting spectator bot. As this is Quake 3 games which also use the same engine should be fine (RTCW, COD etc).

## How To
Thankfully running Quake 3 on the Joggler isn't anything special, the ground work has already been done by some excellent hackers in the Joggler community. Thanks to them we have a working copy of [Ubuntu](http://www.joggler.info/forum/viewtopic.php?f=33&t=356) (which I have mirrored [here](http://atl.mnetcs.com/Joggler/)) which provides our operating system.

To replicate this, err, hack. Download the Quake 3 Linux demo from <https://archive.org/details/QuakeIiiArenaDemo> (About 50 meg).

When you're in Ubuntu, open up a **root shell** and do the following

<pre class="brush:cpp">
1. !/bin/sh
cd ~
wget ftp://ftp.idsoftware.com/idstuff/quake3/linux/linuxq3ademo-1.11-6.x86.gz.sh
tail -n +165 linuxq3ademo-1.11-6.x86.gz.sh | gzip -cd | tar xf -
cd setup.data
bash ./setup.sh
1. Insert what ever it wants
1. It'll probably fail on one of the setup files (iirc, the one which makes desktop icons), don't worry not overly important
cd /usr/local/games/q3demo/demoq3
vi autoexec.cfg
</pre>

Press i then paste the following data into the autoexec.cfg file:

<pre class="brush:cpp">
seta r_customwidth 800
seta r_customheight 480
seta r_mode -1
vid_restart
</pre>

(The purpose of the above data is to force Quake 3 to use the appropriate resolution)

Finally you're ready to fire up Quake III!

<pre class="brush:cpp">
./usr/local/games/q3demo/q3demo
</pre>

You'll notice there isn't any sound, that's because you need the OpenAL library. To do that run:

<pre class="brush:cpp">
sudo apt-get install libopenal1
</pre>

## References
[Ubuntu Forums](http://swiss.ubuntuforums.org/showthread.php?t=855222)
