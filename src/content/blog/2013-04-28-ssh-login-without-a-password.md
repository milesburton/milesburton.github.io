---
title: "SSH Login without a password"
date: 2013-04-28
slug: "ssh-login-without-a-password"
categories: ["HOWTO"]
tags: ["Networking", "DevOps"]
excerpt: "This has been bugging me for a while. Here’s a quick one liner to push your public key to a remote server so you can use key based authentication cat .ssh/id_rsa.pub | ssh YOURSERVER ‘mkdir -p ~/.ssh && cat &gt;&gt; ~/.ssh/authorized_keys’     via SSH login without password."
---
<p>This has been bugging me for a while. Here&#8217;s a quick one liner to push your public key to a remote server so you can use key based authentication</p>
<p>cat .ssh/id_rsa.pub | ssh YOURSERVER &#8216;mkdir -p ~/.ssh &amp;&amp; cat &gt;&gt; ~/.ssh/authorized_keys&#8217;</p>
<p> </p>
<p> </p>
<p>via <a href="http://www.linuxproblem.org/art_9.html">SSH login without password</a>.</p>

