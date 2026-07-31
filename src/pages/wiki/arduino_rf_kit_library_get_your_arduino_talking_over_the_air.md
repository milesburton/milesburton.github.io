---
layout: ../../layouts/Layout.astro
title: Arduino RF Kit Library - Get your Arduino talking over the air
---

# Arduino RF Kit Library - Get your Arduino talking over the air

**UPDATE:** I've recently released the HyperCom library which sits upon VirtualWire. Check out this HyperCom Packet Library *(not yet migrated)*

## Introduction

Hey Guys,

First up, this isn't my library. It was developed by Mike McCauley, I believe he is still partially active with development.

The original "VirtualWire" library has a few compatibility issues with the latest version of the Arduino IDE. After some hunting I found the fix and thought it would be wise to share my findings.

[VirtualWire 1.3](http://download.milesburton.com/Arduino/VirtualWire/VirtualWire.rar)

[Documentation for 1.3](http://download.milesburton.com/Arduino/VirtualWire/VirtualWire.pdf)

This library works great with the Seeedstudio RF kits [315 Mhz](http://www.seeedstudio.com/depot/315mhz-rf-link-kit-p-76.html?zenid=018acaf067a10d6fa5f4ebcc711ee267) [433 Mhz](http://www.seeedstudio.com/depot/433mhz-rf-link-kit-p-127.html?zenid=018acaf067a10d6fa5f4ebcc711ee267)

Like most other libraries, drop VirtualWire (Above) into the hardware\libraries directory and fire up the example sketches per the documentation.

I can vouge for the 433Mhz version as it is now sitting on my desk chatting away. The document above explains what you need to do to get up and running. Unlike stock libraries, VirtualWire provides some basic error handling and syncronising. It produces a simple "packet" (which supposidly follows the 'VirtualWire' standard) that produces a pretty clean wireless communicate between two devices.

Great stuff, let me know how you get on ;) -Miles
