---
layout: ../../layouts/Layout.astro
title: O2 Joggler Hacks - Enabling SCP Server
---

# O2 Joggler Hacks - Enabling SCP Server

<p class="wiki-date">Earliest known revision <time datetime="2010-12-12T19:26:47Z">12 Dec 2010</time></p>

## Contents

* [1 Introduction](#introduction)
  * [2 Prerequisites](#prerequisites)
  * [3 Script](#script)

## Introduction
The following script must be run from the Joggler. It's intended to download and install the appropriate files to enable SCP. If you are using a Windows client, grab WinSCP. Work very well.

### Prerequisites
- You need to install [SSH](/wiki/o2_joggler_hacks_enabling_scp_server/) first.

- You will need a web connection (It'll download the required files from my server)

### Script
<pre class="brush:cpp">
cd /tmp

wget http://london.mnetcs.com/joggler/installSCP.sh

chmod +x installSCP.sh

./installSCP.sh

rm installSCP.sh

Enjoy
</pre>
