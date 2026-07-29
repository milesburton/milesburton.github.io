---
title: "Optimizing ‘huge’ MongoDB imports"
date: 2013-03-28
slug: "optimizing-huge-mongodb-imports"
categories: ["HOWTO"]
tags: []
excerpt: "MongoDB is great for churning through a ton of files and importing into a collection and it never hurts to give it a little helping hand. In my earlier posts I mentioned working with 3-10 million tiny 1-2k JSON objects. Even with GNUParallel it isn’t overly efficient to let loose"
---
<p>MongoDB is great for churning through a ton of files and importing into a collection and it never hurts to give it a little helping hand.</p>
<p>In my earlier posts I mentioned working with 3-10 million tiny 1-2k JSON objects. Even with GNUParallel it isn&#8217;t overly efficient to let loose on all those files; all that HTTP traffic overhead will still slow you down.</p>
<p>Thankfully I have another little trick I&#8217;ve been <a href="https://github.com/milesburton/json-merger">experimenting</a> with. If we can merge all of those little 1-2k files to the BSON limit of 16meg we can drastically reduce the number of import requests required. The <a href="http://docs.mongodb.org/manual/reference/mongoimport/">mongoimport</a> tool supports the &#8211;jsonArray switch so simply enough, we grab each file and dump it into a JSON array!</p>
<p>The <em>json-merge</em>r takes two paramters, <em>inputdir</em> and <em>outputdir. </em>Drop all your JSON documents (oh and don&#8217;t forget the &#8216;_id&#8217; field should be unique!) into your source directory and run:</p>
<p>./json-merger &#8211;inputdir source &#8211;outputdir mergedjson</p>
<p>Once this is complete you can let mongoimport loose on it</p>
<p>find <em>mergedjson/*</em> -type f -print | parallel &#8216;mongoimport -db <em>local</em> -collection <em>yourcollection</em> &#8211;jsonArray -file {}&#8217;</p>
<p>This has taken down import times from a day to minutes</p>

