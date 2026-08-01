---
layout: ../../layouts/Layout.astro
title: Arduino Homebrew LCD Shield
---

# Arduino Homebrew LCD Shield

## Contents

* [1 Introduction](#introduction)

  * [1.1 Stats](#stats)
* [2 Getting started](#getting-started)
* [3 Reflection & mistakes](#reflection--mistakes)
* [4 Thoughts for the future](#thoughts-for-the-future)
* [5 Datasheets](#datasheets)
* [6 Alternatives](#alternatives)

## Introduction

After hunting around I couldn't find an LCD shield for the Arduino which fit the bill. After a somewhat sticky start, my second version of this shield works great! Read on if you'd like some pointers developing your own version.

<span class="image-placeholder" title="PC2004.JPG"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

[Check out the video](http://download.milesburton.com/Arduino/HomeBrewLCDShield/HBLCD_Smartie.mp4)

### Stats

**Time to build:** ~3 hours (!)

**Cost:** £7~

You can pickup an LCD from: [MnetHardware 20x4](http://www.mnethardware.co.uk/displays/character-lcds/20x4-blue-backlit-lcd-with-hd44780-controller)

## Getting started

**Hardware**

£4 [PC2004 4x20](http://cgi.ebay.co.uk/ws/eBayISAPI.dll?ViewItem&ssPageName=STRK:MEWNX:IT&item=220415003523) - Hitachi HD44780 compatible LCD

£1 Standard Vero 'prototype' board 7\*9cm

£2-3 [ICL7660](http://www.maxim-ic.com/quick_view2.cfm/qv_pk/1017/t/al) - (If you are building to scale, Maxim provide a free sample service!)

[Pin headers](http://cgi.ebay.co.uk/ws/eBayISAPI.dll?ViewItem&ssPageName=STRK:MEWNX:IT&item=120340379213) - You'll only need a few

[Female pin headers](http://cgi.ebay.co.uk/ws/eBayISAPI.dll?ViewItem&ssPageName=STRK:MEWNX:IT&item=250420720663)

Various hookup wire. 22AWG ~.6mm solid core wire

**Building**

The PC2004 requires a negative power supply. If you find your LCD only works when you ground the contrast pin chances are your module is designed for versatility. The negative voltages stabilizes the screen in eratic temperature conditions.

Pete Willard provided the following schematic to produce the negative voltage.

<span class="image-placeholder" title="HBL ICL7660Circuit thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD front thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD back thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD LCDfront thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD LCDback thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD ArduinoStackProfile thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD Stacked thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

<span class="image-placeholder" title="HBLCD StackProfile thumb.jpg"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5-9 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Image not yet available</span>

## Reflection & mistakes

I should have really anticipated different LCDs, despite following the Hitachi standard, require a slightly different interface library. The PC2004 would only play ball with quite an old version of the 4Bit LCD library. For your convenience you may pickup the library here: [http://download.milesburton.com/Arduino/LCD4Bit.zip](http://download.milesburton.com/Arduino/LCD4Bit.zip)

## Thoughts for the future

Turns out this shield isn't quite as cheap as I'd have liked. You'll find 'commercial' varients only a little more expensive though you dont gain the valuable experience of developing your own kit and toying with C++ ;)

## Datasheets

[ICL7660](http://download.milesburton.com/Arduino/HomeBrewLCDShield/docs/ICL7660DataSheet.pdf) - Datasheet for the ICL IC

[PC2004](http://download.milesburton.com/Arduino/HomeBrewLCDShield/docs/PC2004DataSheet.pdf) - Datasheet for the PC2004

## Alternatives

Though a 16x2 LCD, [NuElectronics](http://www.nuelectronics.com/estore/index.php?main_page=product_info&cPath=1&products_id=2&zenid=5bd7b612cd63aff8f273cf57187540cf) have taken the pain and prepared a pre-built kit. There's quite a few recommendations for this product and is a good direction to take if you'd like to dedicate your time elsewhere.
