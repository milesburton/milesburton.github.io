---
title: "Pulling out node paths from CQ using the jcr-query-tool"
date: 2013-03-21
slug: "pulling-out-node-paths-from-cq-using-the-jcr-query-tool"
categories: ["HOWTO"]
tags: ["Adobe CQ","CQ5.3","CQ5.5","JCR","RMI"]
excerpt: "Here’s another little tool I’ve been spiking. The idea is simple, query the JCR (CQ5.3 or  CQ5.5), pull a bunch of content out in a reliable manner. Unfortunately the inbuilt queryBuilder servlet is very slow and generally unreliable (try exporting data for a week then have it ex"
---
<p>Here&#8217;s another little tool I&#8217;ve been spiking. The idea is simple, query the JCR (CQ5.3 or  CQ5.5), pull a bunch of content out in a reliable manner. Unfortunately the inbuilt queryBuilder servlet is very slow and generally unreliable (try exporting data for a week then have it explode).</p>
<p>Right first up the tool: https://github.com/milesburton/jcr-query-tool (note this is a very simple, no tests spike&#8230; I&#8217;ll rewrite it soon enough with full TDD as I know it works against CQ)</p>
<p>The command:</p>
<p>../tools/jcr-query-tool &#8211;crx <a href="http://yourinstance:7503/crx/server" rel="nofollow">http://yourinstance:7503/crx/server</a> &#8211;password somepassword &#8211;xpath &#8220;/jcr:root/content//element(*,CQ:Page)&#8221; &#8211;outputfile allCqPages.path</p>
<p>This (if the repository doesn&#8217;t cause any issues) will produce a new line delimited list of paths which you can use to pull content and do other fun things.</p>

