---
layout: ../../layouts/Layout.astro
title: Pogoplug Pro - Installing Tomcat 6
date: 2012-03-12T08:34:12Z
---

# Pogoplug Pro - Installing Tomcat 6

<p class="wiki-date">Earliest known revision <time datetime="2012-03-12T08:34:12Z">12 Mar 2012</time></p>

## Contents

* [1 Prerequisites](#prerequisites)
* [2 Setup Swap File](#setup-swap-file)
* [3 Installing from manual packages](#installing-from-manual-packages)
  * [4 Oracle Java Embedded 7](#oracle-java-embedded-7)
  * [5 Installing Tomcat 6](#installing-tomcat-6)
* [6 Start Tomcat](#start-tomcat)

= Introduction =
This guide will walk you through the process of installing Tomcat 6 on the Pogoplug. Checkout [My Pogoplug](http://pogo.milesburton.com/)

## Prerequisites
- Arch Linux: http://archlinuxarm.org/platforms/armv6/pogoplug-provideov3
- Java SE for Embedded 7u2 (ARM5 version): http://www.oracle.com/technetwork/java/embedded/downloads/javase/index.html (ejre-7u2-fcs-b13-linux-arm-sflt-headless-22_nov_2011.tar.gz)
- Tomcat Embedded: (Arch package, tomcat6)

## Setup Swap File
Realistically Java will likely use more ram than the Pogo has available. Even with smaller apps the likelyhood it'll expand over the 128Meg limit of the Pogoplug Pro is almost a certainty. To give us a little breathing room we can create a swap file. It may be worth adding this to the internal NAND for speed.
 
<pre class="brush:bash">
1. Create swap file image with DD
dd if=/dev/zero of=/swapfile.img bs=1M count=512 #for a 1GB swapfile, use count=1024
1. Mark it was swap
mkswap /swapfile.img
1. Turn it on
swapon /swapfile.img
1. Modify file system table to include swap partition on boot
vi /etc/fstab
1. Add the entry
</pre>

## Installing from manual packages
### Oracle Java Embedded 7
Oracle had released a Java Runtime Environment for Arm (publicly) which has been designed for embedded devices such as the Pogoplug. Lets grab this and setup our environment.

<pre class="brush:bash">
cd /tmp
1. wget ejre-7u2-fcs-b13-linux-arm-sflt-headless-22_nov_2011.tar.gz # Please download a copy of this file (Oracle wont let me rehost)
tar xvf ejre-7u2-fcs-b13-linux-arm-sflt-headless-22_nov_2011.tar.gz
rm xvf ejre-7u2-fcs-b13-linux-arm-sflt-headless-22_nov_2011.tar.gz
mv ejre1.7.0_02 /usr/lib/java
</pre>

Lets setup our environment file:
<pre class="brush:bash">
vi /etc/environment
1. Add the line: JAVA_HOME=/usr/lib/java
1. And Path: PATH="$PATH:/usr/lib/java/bin"
source /etc/environment
java -version # Should respond with java version "1.7.0_02"
</pre>

### Installing Tomcat 6
Tomcat is are Servlet container of the day. Tomcat 6 supports the Servlet 2.5 API which makes it a great match for Spring (yeah it works!)

<pre class="brush:bash">
cd /
1. Fetch tomcat core
wget http://download.milesburton.com/Pogoplug/tomcat6-6.0.33-4-any.pkg.tar.xz
tar xvf tomcat6-6.0.33-4-any.pkg.tar.xz # Should prepare all your directories
rm tomcat6-6.0.33-4-any.pkg.tar.xz

1. Fetch servlet API
wget http://download.milesburton.com/Pogoplug/java-servlet2.5-tomcat-6.0.33-4-any.pkg.tar.xz
tar xvf java-servlet2.5-tomcat-6.0.33-4-any.pkg.tar.xz
rm java-servlet2.5-tomcat-6.0.33-4-any.pkg.tar.xz

1. Add JSP support
wget http://download.milesburton.com/Pogoplug/java-jsp2.1-tomcat-6.0.33-4-any.pkg.tar.xz
tar xvf java-jsp2.1-tomcat-6.0.33-4-any.pkg.tar.xz
rm java-jsp2.1-tomcat-6.0.33-4-any.pkg.tar.xz
</pre>

You may also want to configure users for the Tomcat manager. 
<pre class="brush:bash">
cd /usr/share/tomcat6/conf
vi tomcat-users.xml # scroll the the bottom
</pre>

As a start try editing your tomcat-users element so it looks as follows

<pre class="brush:xml">
<tomcat-users>
<!--
  NOTE:  By default, no user is included in the "manager-gui" role required
  to operate the "/manager/html" web application.  If you wish to use this app,
  you must define such a user - the username and password are arbitrary.
-->
  <role rolename="tomcat"/>
  <user username="tomcat" password="tomcat" roles="tomcat,manager"/>
</tomcat-users>
</pre>

## Start Tomcat
<pre class="brush:bash">
cd /usr/share/tomcat6/bin/
./catalina.sh start
cd ../logs
tail -f -n 999 catalina.out
</pre>

Fire up your browser and navigate to your Pogo Plug home page, for example: http://192.168.0.150:8080

= Useful Paths =
<pre class="brush:bash">
/usr/share/tomcat6/
/usr/lib/java/
</pre>

= References =
- Linux Package Search: http://pkgs.org/archlinux/archlinux-extra-i686
- Arch linux: http://archlinuxarm.org/
- See https://wiki.archlinux.org/index.php/Tomcat for extra information
