---
layout: ../../layouts/Layout.astro
title: Restore DD-WRT NAT Loopback
date: 2011-01-28T20:48:40Z
---

# Restore DD-WRT NAT Loopback

<p class="wiki-date">Earliest known revision <time datetime="2011-01-28T20:48:40Z">28 Jan 2011</time></p>


iptables -t nat -I POSTROUTING -o br0 -s 192.168.1.0/24 -d 192.168.1.0/24 -j MASQUERADE

/\\ Run within management > run command > save firewall script
