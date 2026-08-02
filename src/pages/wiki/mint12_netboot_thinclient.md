---
layout: ../../layouts/Layout.astro
title: Mint12-Netboot-Thinclient
---

# Mint12-Netboot-Thinclient

## Contents

* [1 Introduction](#introduction)
* [2 Prerequisites](#prerequisites)
* [3 Server: Synchronising users](#server-synchronising-users)
* [4 Server: Installing packages](#server-installing-packages)
* [5 Server: Preparing your NFS-server](#server-preparing-your-nfs-server)
* [6 Server: Configuring TFTP](#server-configuring-tftp)
* [7 Client: Preparing your client](#client-preparing-your-client)
* [8 Client: Making your client netboot ready](#client-making-your-client-netboot-ready)
* [9 Client: Create your RAM Disk Loader and kernel](#client-create-your-ram-disk-loader-and-kernel)
* [10 Client: Tell Mint not to use DHCP](#client-tell-mint-not-to-use-dhcp)
* [11 Client: Setup your file system for remote mounting](#client-setup-your-file-system-for-remote-mounting)
* [12 Client: Copying your operating system to the server](#client-copying-your-operating-system-to-the-server)
* [13 Server: Adding boot images to your TFTP server](#server-adding-boot-images-to-your-tftp-server)
* [14 Server: Setup your PXEConfig](#server-setup-your-pxeconfig)
* [15 Server: Configuring your DNSMasq Server](#server-configuring-your-dnsmasq-server)
* [16 Client: Reboot your machine!](#client-reboot-your-machine)
* [17 References](#references)

## Introduction
This guide is based upon the [Ubuntu ThinClient guide](https://help.ubuntu.com/community/ThinClientHowto). If you would like to setup a fully fledged diskless Mint 12 installation then this guide may be for you.

<videoflash>rQzNuUkRuH4</videoflash>

## Prerequisites
- Server running TFTP and NFS-server ([Ubuntu 11.10 X64](http://www.ubuntu.com/download/server/download) is a good choice)
- Appropriate DNS server - DDWRT comes with DNSMasq, this works well.
- Virtualbox - Used to setup our client
- [Mint 12](http://www.linuxmint.com/download.php)

## Server: Synchronising users
Before you begin we need to setup your diskless users. On your server machine (the one that will run NFS-server). Take note of the user and group ID. If you need to create additional users Ubuntu server has the ever useful "useradd" command.

<pre class="brush:bash">
root@Redwood:~# id miles
uid=**1000**(miles) gid=**1000**(miles) groups=**1000**(miles),4(adm),20(dialout),24(cdrom),46(plugdev),109(sambashare),112(lpadmin),113(admin)
</pre>

## Server: Installing packages
We need two core services, [TFTP](http://en.wikipedia.org/wiki/Trivial_File_Transfer_Protocol) and [NFS-server](http://en.wikipedia.org/wiki/Network_File_System_(protocol)). TFTP will provide the boot files needed by your PXE adapter to startup Linux whilst NFS will handle the heavy lifting of the operating system.

<pre class="brush:bash">
sudo apt-get -y install tftpd-hpa syslinux nfs-kernel-server initramfs-tools
</pre>

## Server: Preparing your NFS-server
<pre class="brush:bash">
sudo mkdir /nfsroot # create a location for your remote clients files
</pre>

Expose your nfsroot folder to your clients
<pre class="brush:bash">
vi /etc/exports

1. /etc/exports: the access control list for filesystems which may be exported
1. to NFS clients.  See exports(5).
1. 
1. Example for NFSv2 and NFSv3:
1. /srv/homes       hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
1. 
1. Example for NFSv4:
1. /srv/nfs4        gss/krb5i(rw,sync,fsid=0,crossmnt,no_subtree_check)
1. /srv/nfs4/homes  gss/krb5i(rw,sync,no_subtree_check)
1. 

/nfsroot             **192.168.1.0/24**(rw,no_root_squash,async)
</pre>

Note, my local IP range is 192.168.1.0/24 (aka 192.168.1.1-192.168.1.255). Change your to your local range. Alternatively use a wildcard. Be warned about **no_root_squash**. You are allowing remote users to write files as *root* on your system which is an excellent way to gain access to your server! Future updates to this guide will work around this flaw.

It is also worth noting that NFS can allow you to share certain folders depending on IP address or user so once again you can give different machines different workspaces to play with - very handy!

<pre class="brush:bash">
1. Lets make the export available to our clients
sudo exportfs -rv
</pre>

## Server: Configuring TFTP
Under Ubuntu 11.10 server the TFTP package sets-up a default configuration. We need to reconfigure this file so TFTP runs as a daemon and points at the correct location. 

<pre class="brush:bash">
sudo vi /etc/default/tftpd-hpa
RUN_DAEMON="yes" # Run in background
TFTP_USERNAME="tftp" # Autoconfigured by the package as tftp
TFTP_DIRECTORY="/var/lib/tftpboot" # the location of the tftpboot root
TFTP_ADDRESS="192.168.1.180:69" # your servers IP address
TFTP_OPTIONS="--secure" # Any additional options. Secure will stop clients adding additional files to your tftp server
</pre>

## Client: Preparing your client
[Setup a standard Mint 12 environment](/wiki/mint12_classic_mode/). You may take this opportunity to install any additional applications or custom configurations. Be sure to add the same user(s) you did in the previous step. As before find out the user and group id of each remote user.

<pre class="brush:bash">
root@thinclient:~# id miles
uid=**1001**(miles) gid=**1001**(miles) groups=1001(miles),4(adm),20(dialout),24(cdrom),46(plugdev),109(sambashare),112(lpadmin),113(admin)
</pre>

As you can see there is a mismatch. My user ID is 1001 on the remote client and the group ID is also 1001. You need to synchronise the setup with the server.

- Log out of your user
- **Login as root** *(The rest of this guide assumes you are now running as root)*
- For each remote user enter the following

<pre class="brush:bash">
1. You should now be logged in as root. Your subject user must be logged out of all sessions
usermod -u 1000 miles # where miles is your USER name
groupmod -g 1000 miles # where miles is your GROUP name
id miles # double check this took effect (see above)
</pre>

## Client: Making your client netboot ready
**Warning: This will nuke your client install unless you revert changes after you are finished**

Editing your RAM file system configuration

<pre class="brush:bash">
sudo vi /etc/initramfs-tools/initramfs.conf
1. Find the following section and change it to match

1. 
1. BOOT: [ local | nfs ]
1. 
1. local - Boot off of local media (harddrive, USB stick).
1. 
1. nfs - Boot using an NFS drive as the root of the drive.
1. 

BOOT=nfs

1. Also change the following:

1. 
1. MODULES: [ most | netboot | dep | list ]
1. 
1. most - Add all framebuffer, acpi, filesystem, and harddrive drivers.
1. 
1. dep - Try and guess which modules to load.
1. 
1. netboot - Add the base modules, network modules, but skip block devices.
1. 
1. list - Only include modules from the 'additional modules' list
1. 

MODULES=netboot
</pre>

## Client: Create your RAM Disk Loader and kernel
<pre class="brush:bash">
mkinitramfs -o /root/initrd.img-`uname -r`
cp /boot/vmlinuz-`uname -r`  /root
</pre>

## Client: Tell Mint not to use DHCP
<pre class="brush:bash">
apt-get remove network-manager
vi /etc/network/interfaces

1. Modify it to look as follows

1. This file describes the network interfaces available on your system
1. and how to activate them. For more information, see interfaces(5).

1. The loopback network interface
auto lo
iface lo inet loopback

1. The primary network interface, commented out for NFS root
1. auto eth0
1. iface eth0 inet dhcp
iface eth0 inet manual
</pre>

## Client: Setup your file system for remote mounting
<pre class="brush:bash">
vi /etc/fstab

1. /etc/fstab: static file system information.
1. 
1. <file system> <mount point>   <type>  <options>       <dump>  <pass>
proc            /proc           proc    defaults        0       0
/dev/nfs       /               nfs    defaults          1       1
none            /tmp            tmpfs   defaults        0       0
none            /var/run        tmpfs   defaults        0       0
none            /var/lock       tmpfs   defaults        0       0
none            /var/tmp        tmpfs   defaults        0       0
</pre>

## Client: Copying your operating system to the server
<pre class="brush:bash">
mount -t nfs -o nolock,nfsvers=3 192.168.1.180:/nfsroot /mnt
cp -ax /. /mnt/.
cp -ax /dev/. /mnt/dev/.
</pre>

## Server: Adding boot images to your TFTP server
<pre class="brush:bash">
cp /nfsroot/root/mkinitramfs* /var/lib/tftpboot/
cp /nfsroot/root/vmlinuz* /var/lib/tftpboot/
</pre>

## Server: Setup your PXEConfig
<pre class="brush:bash">
sudo mkdir -p /var/lib/tftpboot/pxelinux.cfg # Will contain the PXE boot configuration information
sudo cp /usr/lib/syslinux/pxelinux.0 /var/lib/tftpboot/ # The PXE Linux bootloader
</pre>

Setup your netboot menu. Using the DEFAULT option as shown below will cause your netbooted machine to automatically boot straight into linux. There's nothing stopping you from switching it to a manual process. This file has lots of interesting options such as which IP can boot which bootfile - you could setup an entire suite of machines to boot different OS'. You can also have multiple options within this file, this is useful if you want to use net-install distributions (ie: installing Mint 12 to a local disk via PXE).

<pre class="brush:bash">
sudo vi /var/lib/tftpboot/pxelinux.cfg/default
LABEL mint12
DEFAULT vmlinuz-3.0.0-12-generic root=/dev/nfs initrd=initrd.img-3.0.0-12-generic nfsroot=192.168.1.180:/nfsroot,rw ip=dhcp rw
1. vmlinuz** and initrd.img** should carry the same name as the step above. Your client kernel version may differ from mine so run the uname -r command on your client to find out what yours will is.
</pre>

Now lets assign permissions to your TFTP folder
<pre class="brush:bash">
chmod -R 444 /var/lib/tftpboot # Allow read for all users
</pre>

Now reboot your TFTP server
<pre class="brush:bash">
sudo restart tftp-hpa
</pre>

## Server: Configuring your DNSMasq Server
Add the following to your DNSMaq options.

<pre class="brush:bash">
dhcp-boot=pxelinux.0,nfs,192.168.1.180
</pre>

If you are using DD-WRT login to your router. Click services. Under the heading DNSMasq make sure it is enabled. Paste the above into the "Additional DNSMasq Options" section. Within "Basic Setup" under the "Setup" tab make sure your router is using DNSMasq for DHCP and it is the authoritative server on your network (ie: the only DHCP server on your network). Apply settings.

## Client: Reboot your machine!
Make sure your client machine (not VirtualBox as it doesn't seem to netboot correct at the time of writing) is set to network boot (PXE). Sometimes you may need to explicity select your network interface to boot.

If it was successful your adapter should attempt to lease an IP from DNSMasq then download the netboot information from your TFTP server. When that is complete Linux should take over and continue to boot via your NFS mount. Enjoy.

## References
- https://help.ubuntu.com/community/DisklessUbuntuHowto
