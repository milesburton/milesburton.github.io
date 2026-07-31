---
layout: ../../layouts/Layout.astro
title: 2D Positioning - Trilateration in JavaScript
---

# 2D Positioning - Trilateration in JavaScript

*Migrated from the old MediaWiki install. Images referenced in the original article were not recovered during migration and are marked below.*

## Introduction

As a part of my Dissertation I investigated how to ascertain your position through WiFi access points (See GeoSpark: Research and Implementation of a Prototype Wi-Fi Positioning System *(not yet migrated)*) one aspect which I spent countless months trying to solve was how to obtain an accurate position from several access points. One such method was Trilateration; sadly I wasn't able to get a working implementation on time. My background has always been very technically focussed but for some reason I never really clicked with high-level Mathematics (despite my father who spent several years tutoring at Brighton University\[?\]) and I struggled with some of the complex equations required to obtain a position in a 3D space \[for example\].

Not one to be beaten I decided to up the odds and take positioning to the real-world through simple artificial intelligence. One of the most common methods of obtaining a position is either through Triangulation or Trilateration. I wont go into any detail as there's plenty of write-ups around (including mine, above) but Trilateration is the core component found in GPS receivers.

Unlike Triangulation, Trilateration calculates the unknown position by taking the distance to three \[or more\] known positions and extrapolating the intersection. The distance from an unknown position to a known position becomes the radius of a sphere, combined with a further two more reference points you can clearly see the intersection.

## The Demo

The aim of this demo (hopefully the first of several) is to create three random reference positions and a fourth 'unknown'. I've chosen JavaScript as my platform of choice mainly because it's trivial to view the source and hopefully others wont need to go through the same pain I did to get a demo working.

So without further ado I present the HTML 5 Trilateration demo in JavaScript. [http://download.milesburton.com/Trilateration/](http://download.milesburton.com/Trilateration/) \*

* Please note, it's still a work in progress. The positioning appears to be slightly out.

## Further Reading

\[[Euclidean Distance & Pythagoras](http://mathsfirst.massey.ac.nz/Algebra/PythagorasTheorem/pythapp.htm)\]

\[[Robotics & Trilateration](http://embedded.olin.edu/ultrasonic/howitworks.php)\]

\[[HTML 5 Review](http://diveintohtml5.org/canvas.html#divingin)\]
