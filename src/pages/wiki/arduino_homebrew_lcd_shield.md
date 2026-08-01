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

*[image: PC2004.JPG]*

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

*[image: HBL ICL7660Circuit thumb.jpg]*

*[image: HBLCD front thumb.jpg]*

*[image: HBLCD back thumb.jpg]*

*[image: HBLCD LCDfront thumb.jpg]*

*[image: HBLCD LCDback thumb.jpg]*

*[image: HBLCD ArduinoStackProfile thumb.jpg]*

*[image: HBLCD Stacked thumb.jpg]*

*[image: HBLCD StackProfile thumb.jpg]*

## Reflection & mistakes

I should have really anticipated different LCDs, despite following the Hitachi standard, require a slightly different interface library. The PC2004 would only play ball with quite an old version of the 4Bit LCD library. For your convenience you may pickup the library here: [http://download.milesburton.com/Arduino/LCD4Bit.zip](http://download.milesburton.com/Arduino/LCD4Bit.zip)

## Thoughts for the future

Turns out this shield isn't quite as cheap as I'd have liked. You'll find 'commercial' varients only a little more expensive though you dont gain the valuable experience of developing your own kit and toying with C++ ;)

## Datasheets

[ICL7660](http://download.milesburton.com/Arduino/HomeBrewLCDShield/docs/ICL7660DataSheet.pdf) - Datasheet for the ICL IC

[PC2004](http://download.milesburton.com/Arduino/HomeBrewLCDShield/docs/PC2004DataSheet.pdf) - Datasheet for the PC2004

## Alternatives

Though a 16x2 LCD, [NuElectronics](http://www.nuelectronics.com/estore/index.php?main_page=product_info&cPath=1&products_id=2&zenid=5bd7b612cd63aff8f273cf57187540cf) have taken the pain and prepared a pre-built kit. There's quite a few recommendations for this product and is a good direction to take if you'd like to dedicate your time elsewhere.
