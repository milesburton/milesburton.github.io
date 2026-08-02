---
layout: ../../layouts/Layout.astro
title: Engineering
date: 2012-03-10T12:56:35Z
---

# Engineering

<span class="wiki-section-badge">Section</span>

<p class="wiki-date">Earliest known revision <time datetime="2012-03-10T12:56:35Z">10 Mar 2012</time></p>

## Contents

* [1 Introduction](#introduction)
* [2 Hardware & Software](#hardware--software)
* [3 Misc Open Source Projects](#misc-open-source-projects)
* [4 Evolving as a Developer](#evolving-as-a-developer)
* [5 Security](#security)
* [6 Science - Something a little different](#science---something-a-little-different)
* [7 Misc](#misc)
* [8 To All Open Source Developers](#to-all-open-source-developers)
* [9 Folding@Home](#foldinghome)
  * [10 Live Statistics](#live-statistics)
  * [11 History](#history)

## Introduction
Welcome to my little area dedicated to various projects and libraries I've been working on. Note this isn't an exhaustive list by any standard...

![GameOfLife](/wiki-media/GameOfLife.JPG)

## Hardware & Software
[Android Development](/wiki/android_development/)

[Arduino](/wiki/arduino/) - Various Arduino related hacks, tweaks and software

[EEE 701 Touchscreen Modification](/wiki/eee_701_touchscreen_modification/) - My voyage into EEE 701 hacking (Bluetooth, Touchscreen, SD)

[Toshiba Libretto 50CT](/wiki/toshiba_libretto_50ct/) - Retro computing with the Libretto 50CT mini-laptop

[2D Positioning - Trilateration in JavaScript](/wiki/2d_positioning_trilateration_in_javascript/) - Finally, a simple way to position from Cartesian coordinates!

[The London Tube Routing API](/wiki/the_london_tube_routing_api/) - Need I say more?

[Sky Box RS232 Connector](/wiki/sky_box_rs232_connector/) - I've been investigating that curious little port on the back of a Sky box. Check out the fruit of my (and others) labour - with code!

[Postcode Geocoding web-service](/wiki/postcode_geocoding_web_service/) - Simple service to convert a postcode into a Latitude & longitude (spherical coordinate system)

[London Tube Geocoding web-service](/wiki/london_tube_geocoding_web_service/) - Another simple device designed to geocode a tube station name into a Latitude & Longitude

[Transport APIs](/wiki/transport_apis/) - A collection of documents and APIs for getting around the UK

Remote Control Pan & Tilt Webcam - A funky and best of all, cheap project to remote control a webcam!

[O2 Joggler Hacks](/wiki/o2_joggler_hacks/)

[My Kit](/wiki/my_kit/) - Misc pics of my own kit

[Online Regex Match Tool - Build up a new string based on matched groups](/wiki/online_regex_match_tool_build_up_a_new_string_based_on_matched_groups/)

[Restore DD-WRT NAT Loopback](/wiki/restore_dd_wrt_nat_loopback/)

## Misc Open Source Projects
Ultimate Web Bundle Spring MVC3 Groovy Spock Gradle Java

## Evolving as a Developer
[My Developer Reading List](/wiki/my_developer_reading_list/) - Take a different perspective on development and the business world

[Agile Software Development](/wiki/agile_software_development/)

[Continuous Integration](/wiki/continuous_integration/)

[Another view on OOP](http://www.geocities.com/tablizer/)

## Security
[Excellent Stack Overflow Guide](http://www.corelan.be:8800//2009/07/19/exploit-writing-tutorial-part-1-stack-based-overflows/)

## Science - Something a little different
[The art of resonance](http://www.intuitor.com/resonance/) - A very enlightening and interesting read
## Misc
[Xbox Classic Controller Driver - XBCD for 64bit](/wiki/xbox_classic_controller_driver_xbcd_for_64bit/)
[WinHistory](http://www.winhistory.de) - History of Windows, great read (German... don't mention the...)

## To All Open Source Developers
*"Write your code as if the person who has to maintain it is a violent psycho, who knows where you live."*

... The next person to write a graphics library without a single comment will meet a sticky end!

Please read [Coding Horror](http://www.codinghorror.com/blog/archives/000710.html)

## Folding@Home
### Live Statistics
My Folding@Home Statistics. It's an ongoing "learning" project to help me better understanding working with massive datasets (in excess of 10gb with only 30 days data). Lots of parallelism, partitioning and general OLAP goodness. Normalisation, move along please - Take the rule book with you.

Blueridge is now offline - Primary "Stable". The Blueridge edition is technically quite old (2+ years) but it's slow and reliable. Provides a good reference and only uses a couple of gig. Interesting set of technologies including Web-services, partial page caching, sql data caching etc. Makes heavy use of multilayer caching (presentation>data) to good effect. This is currently the 6th major iteration of the statistics.

<s>[Codename Razer Statistics - Alaska] - Dedicated Test box. Far newer (ongoing development since BlueRidge), all the changes are on the DAL and data layer. Extremely impressive speed increases whilst exponentially increasing the dataset scope (800+ minutes down to 5~ whilst adding 100K users [and growing]). At the moment this 'stable' test environment only uses a single physical box - Need to do some data mining on usage patterns before we scale out (initial tests over 3 boxes actually slowed things down due to the latency and poor data separate). A great little project which really opens my eyes to the trade-offs you need to make in data intensive systems.</s>

### History
The first edition of the statistics was created nearly 10-15 years ago (probably more). It was the result of a really keen interest in learning these new fangled dynamic web technologies (Pre-Ajax, Pre-standards :P) and getting to grips with MySQL. 

Version one was originally build on what would now be known as a LAMP setup. It was originally developed before I had any training so it was a beautiful mix of hacky coding and nieve practices. The original update script was based in PHP as the database was (for the time) quite large and terribly slow (shared free hosting). It could only manage about 10 users per batch so as a result I created a simple meta-refresh which would iterate through 700 users hosted in a dodgy VB or C++ programme. Thankfully those days are long gone, processing 489,859 active users takes a lot less time than those 700!
