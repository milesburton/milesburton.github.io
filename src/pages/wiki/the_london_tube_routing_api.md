---
layout: ../../layouts/Layout.astro
title: The London Tube Routing API
---

# The London Tube Routing API

<p class="wiki-date">Earliest known revision <time datetime="2010-04-04T16:56:15Z">4 Apr 2010</time></p>

## Contents

* [1 The London Tube Routing API & RSS Feed - Alpha](#the-london-tube-routing-api--rss-feed---alpha)
* [2 The Web-service](#the-web-service)
* [3 The Tube RSS Feed](#the-tube-rss-feed)
  * [4 Drilling down](#drilling-down)
  * [5 Customising the formatting](#customising-the-formatting)

## The London Tube Routing API & RSS Feed - Alpha
The London Tube API pulls data directly from TFL to provide a rich interface which you can use to display real-time data on your application.

## The Web-service
http://services.mnetcs.com/tube/TubeService.asmx - Please use the descriptors for an explanation.

http://services.mnetcs.com/tube/ - Test harness (HTML form to play with)

## The Tube RSS Feed
The RSS feed is available here: http://services.mnetcs.com/tube/rss.aspx

It is fairly simple to use. You have two founding parameters

- from - The Station/Postcode you are departing from
- to - the Station/Postcode you are destined for

for example: http://services.mnetcs.com/tube/rss.aspx?to=Aldgate%20East&from=Syon%20Lane. You are leaving from Aldgate East tube station heading towards Syon Lane train staiton.

This example will return a simple list (up to four) departure times from the time of request. 

### Drilling down
This may be expanded using the following arguments
- details - This will pull additional data from TFL including which stations you will change at.
- fetchSingle - Only queries TFL for the "best" journey. Faster than querying all routes. (NB. requires details flag)

Example:
Details flag: http://services.mnetcs.com/tube/rss.aspx?to=Aldgate%20East&from=Syon%20Lane&details=true
Details flag with single journey: http://services.mnetcs.com/tube/rss.aspx?to=Aldgate%20East&from=Syon%20Lane&details=true&fetchSingle=true

### Customising the formatting
You may also customise the title string by using the "titleFormat" paramter. This uses a simple find and replace algorithm based on the following key value pairs.
- due - The time the train is due to arrive (in minutes)
- duration - How long the journey will take
- departing - Which station/postcode you are departing from
- arriving - Which station/postcode you will arrive at
- time - The time (GMT) you will depart

Please note these are case sensitive. 

If you'd like to change how the details pane is formatted you can use four additional parameters
- bodyFormat - Formats how the entire body should be displayed
- itemFormat - Defines how each "station" is displayed
- delimiter - Defines what seperates each station
- finalDelimiter - Defines the final delimiter that seperates the last two stations (if applicable)

The parameter bodyFormat uses the following tokens:
- {stations} - Represents the output of all "itemFormat"s

itemFormat uses:
- duration - How long the journey will take
- departing - Which station/postcode you are departing from
- arriving - Which station/postcode you will arrive at
- time - The time (GMT) you will depart

delimiter & finalDelimiter employ no tokens. 

For example...
- The body format default is: "Calling at {stations}"
- Item format is: {station}
- delimiter is: ", " (ignore quotes)
- finalDelimiter: " and " (ignore quotes)

#### Examples
Departing Syon Lane. Arriving: Aldgate East. Station Details: yes. Title format: yes
http://services.mnetcs.com/tube/rss.aspx?to=Aldgate%20East&from=Syon%20Lane&details=true&titleFormat=Train%20is%20due%20in%20{due}%20minutes%20and%20will%20take%20{duration}%20minutes.%20You%20will%20leave%20from%20{departing}%20and%20arrive%20at%20{arriving}

Departing Syon Lane. Arriving: Aldgate East. Station Details: no. Title format: yes
http://services.mnetcs.com/tube/rss.aspx?to=Aldgate%20East&from=Syon%20Lane&titleFormat=Train%20is%20due%20in%20{due}%20minutes%20and%20will%20take%20{duration}%20minutes.%20You%20will%20leave%20from%20{departing}%20and%20arrive%20at%20{arriving}

= Comments =
Please note this is purely an example service and shout not be used in any production scenario. This service was built for an underdevelopment prototype and has been extended for use with simple hobby LCDs Transport_for_London_API_and_the_LCD_Smartie

This service is slow as it must interface with the TFL network. To reduce the delay heaving caching is used; as a result you may notice slight timing inaccuracies.
