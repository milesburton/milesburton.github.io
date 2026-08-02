---
title: "Address-Point, PAF and importing large datasets into CouchDB"
date: 2014-03-30
slug: "address-point-paf-and-importing-large-datasets-into-couchdb"
categories: ["HOWTO","Thoughts"]
tags: ["Databases", "Coding", "Life"]
excerpt: "Recently I’ve been going through the rather painful process of buying a house. During my search I was amazed there was so little easily accessible information on Council Tax Bands, neighbours property values etc. Everything which was available was unconnected, sparse and time con"
---
<p>Recently I&#8217;ve been going through the rather painful process of buying a house. During my search I was amazed there was so little easily accessible information on Council Tax Bands, neighbours property values etc. Everything which was available was unconnected, sparse and time consuming to combine.</p>
<p>This had me thinking, the government has come on leaps and bounds by releasing <a href="http://data.gov.uk/k">open data</a>. Why not take advantage of all this free data and build a basic prototype to determine what Council Tax band you should be in.</p>
<p>I envisaged a simple web page which accepted your Postcode and house number. The page would respond with a map of your Postcode sector and all the properties within that sector. The map would show a heat map of the council tax bands. You would then be able to select a nearby property to view the property statistics (detached, size etc).</p>
<p>To build a little proof of concept I need the following information:</p>
<ul>
<li>Postcode sector information &#8211; We want to build a nice little boundary on our property search</li>
<li>Address-point data &#8211; What are the addresses of the houses near by?</li>
<li>Council tax band calculator &#8211; What should your CT band be?</li>
</ul>
<p>My first step was to source postal code sector data (boundaries of your particular postcode) and address-point data. Annoyingly Royal Mail still retain the copyright and license of the <a href="http://en.wikipedia.org/wiki/Postcode_Address_File‎">Postcode-Address-File</a>. None the less with a little ingenuity I found a work-around.</p>
<p>The Land Registry has been kind enough to produce a <a href="http://www.landregistry.gov.uk/market-trend-data/public-data/price-paid-data">huge list of residential properties sold in the UK</a>. This is listed in a helpful, if undocumented CSV. Thankfully with a little digging I was able <a href="http://www.landregistry.gov.uk/public/information/public-data/price-paid-faq#m18">identify each column</a>. </p>
<p>Using a bunch of GNU-tools we can crunch most of this data without hitting a database. Firstly I want to get all the unique addresses from the price-paid dataset. At the time of writing there&#8217;s about 30 million entries, not a huge amount but still enough to be a bit of a pain to process.</p>
<pre class="brush: bash; title: ; notranslate" title="">
curl http://publicdata.landregistry.gov.uk/market-trend-data/price-paid-data/a/pp-complete.csv &amp;gt; pp-complete.csv # Download the latest price-paid data
cut -d”,” -f4,5,8,9,10,11,12,13,14 pp-complete.csv &amp;gt; addresses.csv # Rewrite the file so we only get the address information
# 4 = Postcode
# 5 = Property Type
# 8 = PAON
# 9 = SAON
# 10 = Street
# 11 = Locality
# 12 = Town
# 13 = District
# 14 = County
sort addresses.csv | uniq &amp;gt; addresses-unique.csv # De-duplicate addresses so we have a single list of addresses
wc -l addresses-unique.csv # Count the total number of addresses. Should be roughly &amp;gt;= 13,511,724 
iconv -f utf-8 -t utf-8 -c addresses-unique.csv &amp;gt; addresses-unique-clean.csv # Remove any non UTF-8 characters
</pre>
<p>Okay now we&#8217;ve got a list of roughly 14 million unique addresses. Just a reminder, some of these addresses will probably be invalid. For example, a house may have been broken into flats. Unfortunately we cannot account for this in our prototype but it should be sufficient to get us going.</p>
<p>Let&#8217;s take advantage of CouchDB and import our new address data. Before we can begin we need to convert our CSV into JSON.  Groovy has a nice quick approach to crunching these files. </p>
<p>The following Groovy script will read each line of the CSV, extract each column and build up a basic JSON object. This JSON object will be saved to an individual file.</p>
<pre class="brush: groovy; title: ; notranslate" title="">
#!/usr/bin/groovy

import groovy.json.JsonOutput;
import java.util.UUID

new File(&quot;addresses-unique.csv&quot;).splitEachLine(&quot;,&quot;) { def cols -&amp;gt;
        
    Map j = [
            postcode: cols[0],
            propertyType:cols[1],
            paon:cols[2],
            saon:cols[3],
            street:cols[4],
            locality:cols[5],
            city:cols[6],
            localAuthority:cols[7],
            county:cols[8],
        ]
        
     new File(&quot;json/&quot; + UUID.randomUUID().toString()) &amp;lt;&amp;lt; JsonOutput.prettyPrint(JsonOutput.toJson(j))
}
</pre>
<p>Now the groovy script has crunched the CSV file into a huge set of JSON documents we want to upload to CouchDB. Luckily my work with MongoDB can provide <a href="/blog/optimizing-huge-mongodb-imports/">some hints</a>.</p>
<p>With such a larger number of files it will take a considerable amount of time to import. Using GNU Parallel and CURL we can PUT to the CouchDB REST API. As I previously identified you can combine a number of documents into an array and PUT the entire collection, I will leave that to the reader.</p>
<pre class="brush: bash; title: ; notranslate" title="">
# This assumes you have an empty addresses database in Couch which is password protected. Be sure to update the credentails and host below
find json -type f -print | parallel 'curl -T {} -u USERNAME:PASSWORD -H &quot;Content-Type: application/json&quot; -X PUT http://localhost:5984/addresses/'
# Find each individual file within the JSON folder
# Pipe to Parallel which will CURL each individual JSON element to MongoDB
</pre>
<p>Great, we have a collection full of unique addresses which we can build upon later. Keep an eye out for future posts.</p>

