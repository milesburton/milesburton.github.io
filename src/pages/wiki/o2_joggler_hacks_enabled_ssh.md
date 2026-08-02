---
layout: ../../layouts/Layout.astro
title: O2 Joggler Hacks - Enabled SSH
date: 2010-04-14T20:20:37Z
---

# O2 Joggler Hacks - Enabled SSH

<p class="wiki-date">Earliest known revision <time datetime="2010-04-14T20:20:37Z">14 Apr 2010</time></p>

## Contents

* [1 Introduction](#introduction)
  * [2 Shell script](#shell-script)
* [3 Ref](#ref)

## Introduction
The following script will setup SSH on your joggler. Please refer to the Joggler wiki as you will need to comment out the if, then, else statement

### Shell script
<pre class="brush:cpp">
1. !/bin/sh
ln -s /openpeak/tango/common_libs/libgssapi_krb5.so.2 /lib/ 
sed -i 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config
sed -i '17i /usr/sbin/sshd' /etc/init.d/boot.d/S56boot.daemons
</pre>

Don't forget to set your "passwd".

[Check out the original file here](http://london.mnetcs.com:82/etc/init.d/boot.d/S56boot.daemons)

## Ref
See [JogglerWiki](http://www.jogglerwiki.info/index.php?title=Ssh)
