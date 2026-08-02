---
layout: ../../layouts/Layout.astro
title: Gradle Authenticating with Artifactory Repo
---

# Gradle Authenticating with Artifactory Repo


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
