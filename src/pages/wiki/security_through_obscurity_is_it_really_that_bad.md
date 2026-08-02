---
layout: ../../layouts/Layout.astro
title: Security Through Obscurity - Is it really that bad?
date: 2009-05-02T23:59:24Z
---

# Security Through Obscurity - Is it really that bad?

<p class="wiki-date">Earliest known revision <time datetime="2009-05-02T23:59:24Z">2 May 2009</time></p>

## Contents

  * [1 Introductions](#introductions)
  * [2 What is successful security?](#what-is-successful-security)
  * [3 Proponents](#proponents)
  * [4 Summary](#summary)
  * [5 Appendix](#appendix)

### Introductions
Recently I put forward an argument for [Security Through Obscurity](http://en.wikipedia.org/wiki/Security_through_obscurity), and, in response, I recieved quite a *passionate* reply and that got me thinking. Many security proponents (generalisation!) are quick to shoot down [obfuscation](http://en.wikipedia.org/wiki/Obfuscation) as a valid addition to your security arsenal, and, in some instances, I'd agree. 

To really understand security at any level, my belief is, you need to see [both](http://www.milw0rm.org) [sides](http://nanog.org) [of](http://www.defcon.org) the [firewall](http://www.governmentsecurity.org).  Do I pretend to be an expert? No, I'm just a developer with an interest in security. 

Obfuscation & obsecurity slows your opponent, you've just made your entry points a lot less visible. Anyone who's dabbled in a game of Poker, consider how it is played, every player is dealt a card. The game progresses through the liberal use of subterfuge, coercion and misdirection, you have no idea what hand the others are playing, you continually adjust your demeanor to support your position. 

### What is successful security?
Ever since I really took an interest in security systems few people have really defined what the goal of a *security system* is. Okay, sure I'm being vague. Let's narrow down and pick an easy one, [Firewalls](http://en.wikipedia.org/wiki/Firewall_(networking)). 

Yup, I'm pretty sure the first line of that page suggests that a Firewall is a preventative measure, " a [hindrance](http://www.thefreedictionary.com/hindrance), any obstruction that impedes or is burdensome". Firewalls are designed to slow an intruder, not stop. With that in mind, let's continue...

### Proponents
**The Hacker/Infiltrator**
However you investigate your target, you're keeping a low profile, you want to look like everyone else. If the administrator notices you rolling up with a thousand node botnet or walk into the server room with a MetallicA t-shirt on he WILL batten down the hatches - He'd be stupid not to.

**The Administrator/Guardian**
It's your job to present your perimeter as a 70 foot lead wall. Your network should look indestructible, your software, infallible. Take a peice of software, sure, it's not going to stop someone determined (cough, [WGA](http://en.wikipedia.org/wiki/Windows_Genuine_Advantage)) but it WILL slow them down, if not entirely deter them. 

Send someone down a rabbit hole long enough, they'll go after something more fruitful - and let's be honest, there's enough people out there who care a lot less than YOU.

### Summary
So let me sum up this little brain-dump, security-though-obsecurity works, but then again so should human common-sense.

**Would you rely on a single security paradigm? Should you rely on obscurity alone?**

A lighter look on StO
http://www.geekherocomic.com/2009/04/30/writing-secure-software/

### Appendix
[Enigma](http://en.wikipedia.org/wiki/Enigma_machine) - You could argue Engima machines, through the use of encyption, is yet another form of successful obscurity.

Java/C# (Virtual Machine interpreted languages) - You can't really Obfuscate Java, an expierenced developer can simply reverse engineer the byte-code/Intermediary language

Javascript - Have you ever had the unfortunate expierence of decoding a "crunched" [javascript](http://tk2.stj.s-msn.com/br/hp/11/en-us/js/ascode_1.js) file? I have, it's not fun. Thank god for [FireBug](http://www.google.co.uk/url?sa=t&source=web&ct=res&cd=1&url=https%3A%2F%2Faddons.mozilla.org%2Ffirefox%2Faddon%2F1843&ei=jhPWSeqmLZKsjAfL0_nqDg&usg=AFQjCNFeeiIXBngB6nyWDODclEE-XJPNfQ&sig2=9Pps3cVVLMnYcLykjF4emg)
