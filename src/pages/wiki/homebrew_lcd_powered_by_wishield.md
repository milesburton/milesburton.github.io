---
layout: ../../layouts/Layout.astro
title: Homebrew LCD Powered By WiShield
date: 2009-11-15T15:46:56Z
---

# Homebrew LCD Powered By WiShield

<p class="wiki-date">Earliest known revision <time datetime="2009-11-15T15:46:56Z">15 Nov 2009</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 What's the aim of the WiShield Powered LCD?](#whats-the-aim-of-the-wishield-powered-lcd)
* [3 How does version 1 work?](#how-does-version-1-work)
* [4 = Pin settings](#-pin-settings)
* [5 Media](#media)
  * [6 Battery Powered](#battery-powered)
* [7 Try it yourself](#try-it-yourself)
* [8 Code](#code)

## Introduction
The WiShield is an interesting piece of hardware, not unlike many other Arduino Shields it opens up a realm of possibilities so vast it's hard to settle on even one. I secured one of the first WiShields and I am ashamed to say, it's been sitting in a antistatic bag almost all it's life - I just couldn't think of an idea [grand enough](http://www.tv.com/malcolm-in-the-middle/lois-battles-jamie/episode/367277/recap.html?tag=episode_recap;recap).

![LCDPoweredByWiShield 1](/wiki-media/LCDPoweredByWiShield_1.JPG)

One of my first ideas, admittedly not up to my usual cunning [*cough*] was to build a entirely wireless LCD (similar to [LCD Shield Goes Wireless 433Mhz](/wiki/lcd_shield_goes_wireless_433mhz/)). After quickly discovering the WiShield shared several pins with the LCD4Bit library I abandoned my plan in favour of other ideas. Luckily I decided enough was enough, lets get that spare 4x20 LCD up and running! 

I took a slightly different approach to my second homebrew LCD shield after it quickly came apparent that an LCD mounted directly on top of an Arduino is bloody useless - You only end up awkwardly leaning it against some unfortunate. Instead my latest version not only selected a different set of interface pins (which didn't conflict with the WiShield) but allowed the LCD module to breakaway and be mounted how ever I pleased.

## What's the aim of the WiShield Powered LCD?
Quite simply to 'internet enable' a display. I wanted to be able to display messages without my computer being on. The concept is pretty simple yet it has that geek factor we all fight for.

## How does version 1 work?
It's actually quite simple, [the WiShield uses pins 2 (interrupt) and 9-13 to communicate with the Arduino](http://asynclabs.com/forums/viewtopic.php?f=15&t=41&p=657#p657). This means the LCD4bit library must interface on any other pins - personally I used 3-8 and analogue pin 5 (aka, Digital 16).

A user visits my web-page and is presented with an entry point where they may enter text on demand. When a user enters a message an [AJAX](http://en.wikipedia.org/wiki/Ajax_%28programming%29) request is sent to the Arduino (via the WiShield), a forward slash ('/') is the line pragma. The character in the URL is iterated over until no characters are left, each time a character is found it is written directly to the LCD.

To reduce the amount of data the [Arduino](/wiki/arduino/) had to process I decided to use a cheeky Javascript trick to save some memory. When the user accesses the Arduino hosted page it responds with a skeleton page with a embedded link to a script sitting on a web-server. This script contains all the HTML and any other paraphernalia required to load the page - a nifty way of saving space ;)

## = Pin settings
RS Arduino Digital 4
RW Arduino Analog 4 (aka Digital 16 on AtMega 8/168/328 or 59 on Arduino Mega)
Enable Arduino Digital Pin 3
DB 0-4 Arduino Digital 5-8

These pins will work fine with the WiShield. Bare in mind you can also use a shift register to get that number down to 3 pins! You could also tie RW to ground or VCC (depending on your LCD) to save a pin!

## Media
![LCDPoweredByWiShield2](/wiki-media/LCDPoweredByWiShield2.JPG)
![LCDPoweredByWiShield4](/wiki-media/LCDPoweredByWiShield4.JPG)
![LCDPoweredByWiShield3](/wiki-media/LCDPoweredByWiShield3.JPG)

[Quick Video](http://download.milesburton.com/Arduino/WiServer/HomebrewLCD_Powered_By_WiShield.avi)

### Battery Powered
![LCDPoweredByWiShield5](/wiki-media/LCDPoweredByWiShield5.JPG) ![LCDPoweredByWiShield6](/wiki-media/LCDPoweredByWiShield6.JPG) ![LCDPoweredByWiShield7](/wiki-media/LCDPoweredByWiShield7.JPG)

## Try it yourself
http://london.mnetcs.com:81/

## Code
http://download.milesburton.com/Arduino/WiServer/WiServer.pde - TBC
