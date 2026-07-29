---
title: "MongoDB bulk loading via command line"
date: 2013-03-18
slug: "mongodb-bulk-loading-via-command-line"
categories: ["HOWTO"]
tags: ["Adobe CQ","MongoDB"]
excerpt: "Here’s a really useful command that I use to bulk load JSON documents into Mongo.  find . -iname “*.json” | xargs –verbose -i mongoimport -u USERNAME –password PASSWORD –db DATABASE –journal –collection COLLECTION –file {} I need to crunch 3.5 million image metadata files so I’ll"
---
<p>Here&#8217;s a really useful command that I use to bulk load JSON documents into Mongo. </p>
<p>find . -iname &#8220;*.json&#8221; | xargs &#8211;verbose -i mongoimport -u USERNAME &#8211;password PASSWORD &#8211;db DATABASE &#8211;journal &#8211;collection COLLECTION &#8211;file {}</p>
<p>I need to crunch 3.5 million image metadata files so I&#8217;ll look to optimize this. At the moment it takes a couple of hours on my VPS to import 50k docs.</p>
<p>One thought I had would be to whip up a quick Groovy script to pull as many of the JSON docs (each around 2k) to the BSON limit of 16meg. That should cut down the amount of HTTP traffic. </p>
<p>3.5 million docs at around 2k each is approximately 6gig. </p>

