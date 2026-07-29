---
title: "Pulling all IDs from Autonomy IDOL"
date: 2013-03-12
slug: "working-with-autonomy"
categories: ["HOWTO"]
tags: ["Autonomy"]
excerpt: "Here are WGSN we work with Adobe CQ 5. Our database is a modest 8tb which makes running queries against the [suspect] JCR implementation quite slow. Recently we rolled out Autonomy so we can perform complex searches against our data without impacting CQ. One of these recent quest"
---
<p>Here are WGSN we work with <a class="zem_slink" title="Adobe Systems" href="http://www.adobe.com/" target="_blank" rel="homepage" rel="nofollow">Adobe</a> CQ 5. Our database is a modest 8tb which makes running queries against the [suspect] JCR implementation quite slow. Recently we rolled out Autonomy so we can perform complex searches against our data without impacting CQ. One of these recent questions was, how can I fetch all CQ paths without walking the tree? Well lets perform a little &#8216;hack&#8217; against Autonomy.</p>
<p>We use the Reference field as our unique ID in Autonomy. This is surfaced as DREREFERENCE (or cleaned as de-duplicated as DUPDREREFERENCE), we can use a few command line tools to fetch us this data.</p>
<p>First, identify roughly how many documents we have in our database:</p>
<ul>
<li>curl &#8220;<a href="http://x.x.x.x:16554/action=query&#038;totalresults=true&#038;#8221" rel="nofollow">http://x.x.x.x:16554/action=query&#038;totalresults=true&#038;#8221</a>; | xpath -q -e &#8220;//*[local-name()=&#8217;totaldbsecs&#8217;]/text()&#8221;</li>
</ul>
<p>Where autonomy is your DAH and 16554 represents your query port. It&#8217;s worth noting that if you&#8217;re actively ingesting into Autonomy you may need to adjust the number of documents queried as you go&#8230;</p>
<p>Prepare an appropriate Autn query to pull back as many records as you can</p>
<ul>
<li>curl &#8220;<a href="http://10.102.74.5:16554/action=query&amp;PrintFields=DUPEDREREFERENCE&amp;TotalResults=true&amp;maxresults=1">http://autonomy:16554/action=query&amp;PrintFields=DUPEDREREFERENCE&amp;TotalResults=true&amp;maxresults=1</a>0000&amp;predict=false&#8221;</li>
</ul>
<p>You can paginate through the doccount which we retrieved earlier (or alternatively re-parse the query) using <em>start</em> and <em>maxresults. </em>maxresults can supposedly be hiked to anything you like (with 1,000,000 being the recommended max) but this often causes the engines to blow up. See man pages <a href="http://10.102.74.6:16554/action=LOADDOC&amp;file=wwhelp/wwhimpl/js/html/wwhelp.htm">http://autonomy:16554/action=LOADDOC&amp;file=wwhelp/wwhimpl/js/html/wwhelp.htm</a></p>
<p>To save you a bit of time I wrote a rather quick and dirty tool to pull out each query xml as described above. <a href="https://github.com/milesburton/autonomy-crawler">https://github.com/milesburton/autonomy-crawler</a> it is used as follows:</p>
<ul>
<li>../tools/autonomy-crawler &#8211;dah x.x.x.x &#8211;dahport 16554&#8211;outputdir reports</li>
</ul>
<p>The result of these query can be pipped to</p>
<ul>
<li>xpath -q -e &#8216;//DUPEDREREFERENCE/text()&#8217;</li>
</ul>
<p>This will rip out all the DUPEDREREFERENCE (aka paths). Be warned xpath command line tool is perl based and is sadly very slow and isn&#8217;t multithreaded. I may produce a SAX parser later. Till then I&#8217;d suggest you process each query result separately.</p>
<p>[Ninja edit]</p>
<p>Turns out you can use predict=false to get an accurate totalhits count for a specific query (though it&#8217;s slower). Total docs should be accurate regardless</p>

