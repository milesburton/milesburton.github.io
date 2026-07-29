---
title: "Checking out multiple git repositories"
date: 2013-05-11
slug: "checking-out-multiple-git-repositories"
categories: ["HOWTO"]
tags: ["git"]
excerpt: "Here’s a good one liner: mkdir -p checkout cd checkout find ../repositories/ -maxdepth 1 -type d -print | xargs -I {} git clone {} checkout/{}"
---
<p>Here&#8217;s a good one liner:</p>
<blockquote>
<p>mkdir -p checkout</p>
<p>cd checkout</p>
<p>find ../repositories/ -maxdepth 1 -type d -print | xargs -I {} git clone {} checkout/{}</p>
</blockquote>

