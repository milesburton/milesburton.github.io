---
layout: ../../layouts/Layout.astro
title: O2 Joggler Hacks - Booting with NFS
date: 2012-03-11T23:33:59Z
---

# O2 Joggler Hacks - Booting with NFS

<p class="wiki-date">Earliest known revision <time datetime="2012-03-11T23:33:59Z">11 Mar 2012</time></p>

## Contents

* [1 Prerequisites](#prerequisites)
* [2 Agenda](#agenda)
  * [3 Fetch and mount base image](#fetch-and-mount-base-image)
  * [4 Prepare initrd image](#prepare-initrd-image)
  * [5 Configure Grub](#configure-grub)

= Introduction = 
The Joggler is an excellent piece of kit but one of the major drawbacks of the device is the extremely poor IO. Using USB sticks or the internal MMC is painful at best and unusable at worst. All is not lost however. OpenPeak were kind enough to stick a juicy 1GigE Ethernet adapter onboard which means if you have a NFS server which a fast disk you can gain significantly faster IO at the cost of latency.

<videoflash>syPy2INs7qc</videoflash>

- This is a work in progress

= Getting Started =
## Prerequisites
- Wired Ethernet
- Reasonably fast NFS server (a box running Ubuntu!)
- Joggler specific Linux distribution

## Agenda
- Download base image - Ubuntu 11.10 is a good choice
- Burn image to USB stick and boot as normal
- Remove network-manager
- Remove old fstab entries
- Create a user which is also on your NFS server
- Take an image of the Linux partition
- On the server mount partition in an appropriate place. I used /nfsroot
- Setup NFS-Server
- Modify grub.cfg to point at your server
- Boot joggler with Ethernet attached

### Fetch and mount base image
<pre class="brush:bash">
wget http://download.milesburton.com/Joggler/ubuntu_11.10-v1.2-ext4.img.gz
sfdisk -l -uS ubuntu.img 
1. take note of partition one size. Should look something like:

1. Device Boot    Start       End   #sectors  Id  System
1. ubuntu.img1   *      2048    126975     124928   e  W95 FAT16 (LBA)
1. ubuntu.img2        126976    626687     499712  82  Linux swap / Solaris
1. ubuntu.img3        626688   7800831    7174144  83  Linux
1. ubuntu.img4             0         -          0   0  Empty

mkdir /tmp/jogglerboot
sudo mount -oloop,offset=1048576 ubuntu.img /tmp/jogglerboot
cd /tmp/jogglerboot
</pre>

### Prepare initrd image
Prepare scratch folder
<pre class="brush:bash">
mkdir -p /tmp/joggler/image
cp /tmp/jogglerboot/initrd.img-3.2.4joggler1 .
mv initrd.img-3.2.4joggler1 initrd.img-3.2.4joggler1.gz
gunzip initrd.img-3.2.4joggler1.gz
cpio -id < ../initrd.img-3.2
</pre>

Package up initrd image
<pre class="brush:bash">
cd /tmp/joggler/image
find . | cpio --create --format='newc' > ../initrd.img-3.2 && cd .. 
gzip initrd.img-3.2 && mv initrd.img-3.2.gz initrd.img-3.2.4joggler1 && date
</pre>

### Configure Grub
<pre class="brush:bash">
set timeout=2
menuentry "Netboot" {
    linux /vmlinuz-3.2.4joggler1 root=/dev/nfs boot=nfs nfsroot=192.168.1.180:/nfsroot ro quiet splash
    initrd /initrd.img-3.2.4joggler1
}
</pre>

= Misc Useful commands =
- Configuring the onboard Ethernet card with a real MAC
<pre class="brush:bash">
ifconfig eth0 hw ether DE:AD:BE:EF:CA:FE 
ifconfig eth0 192.168.1.5 netmask 255.255.255.0 up

1. build new initrd image
cd images && find . | cpio --create --format='newc' > ../initrd.img-3.2 && cd .. && gzip initrd.img-3.2 && mv initrd.img-3.2.gz initrd.img-3.2.4joggler1 && date
</pre>

= Previously failed attempts =
- PXe using EFI. Tried gPXe but it doesn't support the appropriate EFI (Lack of Linux16 module) TBC
- Grub does not support PXE booting over EFI

= References =
- http://www.thegeekstuff.com/2009/07/how-to-view-modify-and-recreate-initrd-img/
- http://www.ibm.com/developerworks/linux/library/l-initrd/index.html
- http://lists.busybox.net/pipermail/busybox/2005-May/014474.html
- http://www.jogglerwiki.com/forum/download/file.php?id=200&sid=47fb89103c8c851f2b90c01d3e2e719c
- http://phaq.phunsites.net/2012/02/05/mount-a-dd-disk-image-with-partition-table-inside/
- http://lists.samba.org/archive/linux/2005-April/013444.html
- http://joggler.exotica.org.uk/ubuntu/
