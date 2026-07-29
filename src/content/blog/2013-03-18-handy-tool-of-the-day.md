---
title: "Handy tool of the day"
date: 2013-03-18
slug: "handy-tool-of-the-day"
categories: ["Interesting Links"]
tags: ["GNU Parallel"]
excerpt: "As you’ve probably noticed I’m working on a ton of big data queries at the moment and a lot of it requires munging of millions of tiny files. Thankfully I have some very powerful servers to hand (32 cores, 192gig ram etc) so it stands to reason I farm as much of this work out [&h"
---
<p>As you&#8217;ve probably noticed I&#8217;m working on a ton of big data queries at the moment and a lot of it requires munging of millions of tiny files.</p>
<p>Thankfully I have some very powerful servers to hand (32 cores, 192gig ram etc) so it stands to reason I farm as much of this work out as possible.</p>
<p>GNU Parallel has been a really useful tool. Take my earlier post, 1000 xml files and a slow parser. Why not farm them out?</p>
<p>find . -type f -print | parallel &#8216;xpath -q -e &#8220;//DUPEDREREFERENCE/text()&#8221; {} &gt;&gt; output.paths&#8217;</p>
<p>This command finds each file in a directory and prints. Parallel then executes <em>n </em>processes of xpath each of which cat to output.paths.</p>
<p>Works nicely 🙂</p>
<p>See: <a href="http://www.gnu.org/software/parallel/man.html">http://www.gnu.org/software/parallel/man.html</a></p>

