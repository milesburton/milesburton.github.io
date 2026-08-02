---
layout: ../../layouts/Layout.astro
title: Installing ESXi on Lenovo M80Q ThinkCentre Gen3
date: 2023-10-29T15:17:51Z
---

# Installing ESXi on Lenovo M80Q ThinkCentre Gen3

<p class="wiki-date">Earliest known revision <time datetime="2023-10-29T15:17:51Z">29 Oct 2023</time></p>


![ThinkCentre M80q Gen 3](/wiki-media/ThinkCentre_M80q_Gen_3.png)
DRAFT

After many years of excellent service it was time to retire my Dell PowerEdge T20, I was considering what would be the best solution. Do I want to go down the 1/2U PowerEdge route (R230? maybe), or get another midi-tower? That's when the Lenovo M80Q ThinkCentre came on my radar. It seems like Lenovo have been trying to gain more market share using particularly aggressive pricing, in fact so much so I picked up a few other machines. Now the M80Q could be seen as a bit of an odd choice for a server, it's a micro-pc similar to the Intel NUCs; a tiny nonstandard low power box with limited storage expansion unlike the T20. However counterintuitively in a home 'lab' where space and indeed energy is limited this dinky box may very well be ideal.

What's quite curious about the M80Q is it packs quite the punch in my configuration. With an Intel i7-12700T ([4.70GHz Turbo frequency](https://ark.intel.com/content/www/us/en/ark/products/134596/intel-core-i712700t-processor-25m-cache-up-to-4-70-ghz.html)), dual ethernet (1x 2.5G, 1x 1G), Wi-Fi 6E, two Gen 4 M.2 slots, one 2.5" SSD and the capacity to install up to 64GB DDR 5 (with that sweet sweet EEC). All of this (excluding SSDs and memory) clocks in at **£600**.

**So can it run VMWare ESXi 8? Yes with a *but... I suppose we need a tl;dr***

- ESXi 8 does not *yet* support Intel's efficiency cores. Whilst I've not tried it, you can disable the cores in the bios. If you don't you'll get a kernel exception which we'll attempt to address below.
- For some reason VMWare decided to drop support for certain Realtek ethernet controllers. You can instead use the onboard Intel controller and later pass through the Realtek device using open source modules

| Component | Spec | Notes |
| --- | --- | --- |
| [Lenovo M80Q ThinkCentre](https://www.lenovo.com/gb/en/p/desktops/thinkcentre/m-series-tiny/thinkcentre-m80q-gen-3-tiny-(intel)) | All stock bar the upgrades below |  |
| Processor (Factory upgrade) | Intel i7 12700T.  8 Performance cores @ 3.6ghz. 4 Efficiency cores @ 3.4Ghz |  |
| Ethernet (Factory upgrade) | Realtek 8125BGGS 2.5G | Not natively supported by ESXi |
| WIFI (Factory update) | Intel Wi-Fi 62 & Bluetooth 5.1 | Not natively supported by ESXi |
| Memory (Aftermarket Upgrade) | Corsair Vengeance DDR5 SODIMM 64GB (2x32GB) |  |
| M.2 Gen 3 SSD (Aftermarket Upgrade) | Netac NV7000 2TB | [The Heatsink has to be removed](https://www.youtube.com/watch?v=pMbwPwEmuzA). The software RAID is garbage and nearly bricked the machine |

##### Before you begin
- You'll need the following hardware
  - USB Keyboard
  - USB Thumb drive
  - Full sized HDMI or Display Port monitor (or suitable cable/adapter)
  - Ethernet cable and a suitable DHCP server/router
- [Download Etcher](https://etcher.balena.io/) (We'll use this to burn the VMWare ISO to the drive)
- [Register with VMWare](https://customerconnect.vmware.com/account-registration)
- [Download VMware vSphere 8](https://customerconnect.vmware.com/downloads/details?downloadGroup=ESXI80U2&productId=1345&rPId=112093) (note disable your ad blockers etc)

##### Reference sources
1. https://williamlam.com/2023/01/video-of-esxi-install-workaround-for-fatal-cpu-mismatch-on-feature-for-intel-12th-gen-cpus-and-newer.html
1. https://github.com/itiligent/ESXi-Custom-ISO
