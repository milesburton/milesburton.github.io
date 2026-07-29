---
title: "API Rate Limited with Redis"
date: 2013-04-23
slug: "api-rate-limited-with-redis"
categories: ["Interesting Links","Thoughts"]
tags: []
excerpt: "API Rate Limited with Redis Once an API matures to a point that your users are clambering to access it’s facilities rate limiting tends to take quite a hike in importance.  Rate limiting is a deceptively complex problem. Traditionally if you need to rate limit you are serving mor"
---
<p><a href="http://chris6f.com/rate-limiting-with-redis" title="API Rate Limited with Redis">API Rate Limited with Redis</a></p>
<p>Once an API matures to a point that your users are clambering to access it&#8217;s facilities rate limiting tends to take quite a hike in importance. </p>
<p>Rate limiting is a deceptively complex problem. Traditionally if you need to rate limit you are serving more requests than is sustainable which means a simple log file or even SQL database wont cut it &#8211; that&#8217;s where Redis comes in.</p>
<p>When you consider rate limiting request granularity surfaces a lot of interesting and valuable business and security data. Chris describes a solution whereby you can build a highly scalable rate limiting solution &#8211; well worth a read. </p>

