---
layout: ../../layouts/Layout.astro
title: Restore DD-WRT NAT Loopback
---

# Restore DD-WRT NAT Loopback


iptables -t nat -I POSTROUTING -o br0 -s 192.168.1.0/24 -d 192.168.1.0/24 -j MASQUERADE

/\\ Run within management > run command > save firewall script
