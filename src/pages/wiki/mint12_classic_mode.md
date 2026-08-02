---
layout: ../../layouts/Layout.astro
title: Mint12-Classic-Mode
date: 2012-01-07T21:21:08Z
---

# Mint12-Classic-Mode

<p class="wiki-date">Earliest known revision <time datetime="2012-01-07T21:21:08Z">7 Jan 2012</time></p>

## Contents

* [1 tl;dr; One time install script](#tldr-one-time-install-script)
* [2 Getting started](#getting-started)
* [3 Install ATI or Nvidia drivers](#install-ati-or-nvidia-drivers)
* [4 Change Mint 12 auto login to classic mode](#change-mint-12-auto-login-to-classic-mode)
* [5 Setup Nvidia Drivers](#setup-nvidia-drivers)
* [6 Install Compiz](#install-compiz)
* [7 Setup Compiz to start at boot](#setup-compiz-to-start-at-boot)
* [8 Tools](#tools)
* [9 Dev](#dev)
* [10 Grails](#grails)
* [11 Icons](#icons)
* [12 ~/.bashrc](#bashrc)
* [13 /etc/environment](#etcenvironment)
* [14 Misc Comments](#misc-comments)
* [15 Installing Mint 12 on iMac MacOSX](#installing-mint-12-on-imac-macosx)
* [16 References](#references)

## tl;dr; One time install script
See Talk:Mint12-Classic-Mode This is a work in progress

## Getting started
- Use a standard install
- Do not select auto-login (see auto-login config later)
- Watch out for proprietary graphics drivers

<pre class="brush:bash">
sudo apt-get update
sudo apt-get upgrade
</pre>

## Install ATI or Nvidia drivers
<pre class="brush:bash:>
wget http://www2.ati.com/drivers/linux/ati-driver-installer-11-12-x86.x86_64.run
sudo chmod +x ati-driver-installer-11-12-x86.x86_64.run
sudo ./ati-driver-installer-11-12-x86.x86_64.run
</pre>

## Change Mint 12 auto login to classic mode
<pre class="brush:bash">
sudo vi /etc/lightdm/lightdm.conf 
</pre>

Replace the user-session line with: user-session=gnome-classic

## [Setup Nvidia Drivers](http://www.howtoforge.com/enabling-compiz-on-linux-mint-12-gnome-12)
To use 3D effects on an NVIDIA graphics card, we need the proprietary NVIDIA driver which we can install from the Additional Drivers tool. The Additional Drivers tool can be started from Applications > System Tools > System Settings > Additional Drivers.

Reboot to install driver then jump into a terminal:
<pre class="brush:bash">
sudo vi /etc/X11/xorg.conf
1. add Driver  "nvidia"
</pre>

## Install Compiz
<pre class="brush:bash">
sudo apt-get install compiz compiz-plugins compiz-plugins-main python-compizconfig compizconfig-settings-manager compiz-plugins-extra
sudo reboot
</pre>

- Be sure to add "Window decorations" if you lose the title bars

## Setup Compiz to start at boot
<pre class="brush:bash">
1. compiz --replace
</pre>

## Tools
<pre class="brush:bash">
sudo apt-get install openssh-server
ssh-keygen -t rsa
sudo apt-get install libcurl3
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb
sudo apt-get install gnome-panel # restores panels
sudo apt-get install gnome-tweak-tool
sudo apt-get install gconf-editor
</pre>

## Dev
<pre class="brush:bash">
cd ~
mkdir -p dev/tools
cd dev/tools

1. install tomcat 7
wget http://mirrors.ukfast.co.uk/sites/ftp.apache.org/tomcat/tomcat-7/v7.0.23/bin/apache-tomcat-7.0.23.tar.gz
tar xvf apache-tomcat-7.0.23.tar.gz

1. install gradle
wget http://repo.gradle.org/gradle/distributions/gradle-1.0-milestone-6-all.zip
unzip xvf gradle-1.0-milestone-6-all.zip
rm gradle-1.0-milestone-6-all.zip
ln -s gradle-1.0-milestone-6-all gradle-latest

</pre>

<pre class="brush:bash">
1. Java
sudo add-apt-repository ppa:ferramroberto/java
sudo apt-get update
sudo apt-get install sun-java6-jre sun-java6-bin sun-java6-jdk

1. git
sudo apt-get install git-core
git config –global user.name “`who`”
git config –global user.email “`who`@home”
git config –list

1. Intellj
cd ~/dev/tools
wget http://download-ln.jetbrains.com/idea/ideaIU-11.tar.gz
tar xvf ideaIU-11.tar.gz
rm ideaIU-11.tar.gz
ln -s  ideaIU-11 idea

1. eclipse
sudo apt-get install eclipse

1. Android
1. Add this plugin: https://dl-ssl.google.com/android/eclipse/

1. load ui
cd /tmp/
wget http://downloads.sourceforge.net/project/loadui/1.5/loadUI-1_5_0.sh?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Floadui%2Ffiles%2F&ts=1324147707&use_mirror=netcologne #may need to gain a new token
sudo chmod +x loadUI-1_5_0.sh
sudo ./loadUI-1_5_0.sh
rm loadUI-1_5_0.sh

1. soap ui
wget http://downloads.sourceforge.net/project/soapui/soapui/4.0.1/soapui-4.0.1-linux-bin.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fsoapui%2Ffiles%2F&ts=1324147885&use_mirror=ignum
sudo chmod +x loadUI-1_5_0.sh
sudo ./loadUI-1_5_0.sh
rm loadUI-1_5_0.sh
</pre>

## Grails
<pre class="brush:bash">
sudo add-apt-repository ppa:groovy-dev/grails
sudo apt-get update
1. sudo apt-get install grails

1. to add grails 2.0.0
sudo apt-get install grails-2.0.0

1. switch between versions
1. sudo update-alternatives --config grails
</pre>

## Icons
Intellj - /bin/sh -c "/home/miles/dev/tools/idea/bin/idea.sh"

## ~/.bashrc
<pre class="brush:bash">
1. export PATH=${PATH}:/home/miles/android-sdk-linux_x86/platform-tools # tbc
export EDITOR=vi
export JDK_HOME=/usr/lib/jvm/java-6-sun/
export GRADLE_HOME=/home/miles/dev/tools/gradle-latest
export PATH=${GRADLE_HOME}/bin:${PATH}
</pre>

## /etc/environment
<pre class="brush:bash">
JAVA_HOME=/usr/lib/jvm/java-6-sun
</pre>

## Misc Comments
- To add items to the gnome panel use *both* alt keys combined with the right mouse button

## Installing Mint 12 on iMac MacOSX
Burn the standard Mint 12 ISO to a DVD or CD-RW. Do *NOT* use a USB stick. Do *NOT* install proprietary GFX drivers. 

## References
- http://www.omgubuntu.co.uk/2011/12/how-to-make-ubuntu-11-10-look-and-feel-like-gnome-2/
- http://www.howtoforge.com/enabling-compiz-on-linux-mint-12-gnome-12
