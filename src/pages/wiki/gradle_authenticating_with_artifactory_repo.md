---
layout: ../../layouts/Layout.astro
title: Gradle Authenticating with Artifactory Repo
date: 2012-01-14T21:30:57Z
---

# Gradle Authenticating with Artifactory Repo

<p class="wiki-date">Earliest known revision <time datetime="2012-01-14T21:30:57Z">14 Jan 2012</time></p>


I've noticed the original method appears to be broken in Gradle 1.0m7. You can use the following instead:

<pre>
repositories {
 mavenCentral()
 
 maven {
  credentials {
   username "username" 
          password "password" 
  }

  url "http://your.url/artifactory/repo"
 
 }
}
</code>
