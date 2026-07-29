---
title: "Dependency Management and bleeding implementation detail"
date: 2013-04-30
slug: "dependency-management-and-bleeding-implementation-detail"
categories: ["Craftsmanship","Thoughts"]
tags: ["Grab","Grapes","Maven"]
excerpt: "Back in the old days managing dependencies whether DLLs, .SO or JARs has always been painful. Since the introduction of dependency management tools like Maven we took a major step forward and yet it has always left me feeling a little uneasy. When I fire up a mature project I’m o"
---
<p>Back in the old days managing dependencies whether DLLs, .SO or JARs has always been painful. Since the introduction of dependency management tools like Maven we took a major step forward and yet it has always left me feeling a little uneasy.</p>
<p>When I fire up a mature project I&#8217;m often overloaded with tens of dependencies and no obvious relation to the dependants  My concern is prescriptive dependency management is a form implementation detail and I find myself wondering if they should be treated somewhat like imports, a source file level declaration.<br />
<a href="http://groovy.codehaus.org/Grapes+and+grab()">Grapes</a> takes a unique approach to this problem by using annotations directly on your class.</p>
<blockquote>
<pre> <code>@Grab</code>('commons-lang#commons-lang;2.4')</pre>
</blockquote>
<p>Following a Gradle format this lets us move one step closer to encapsulating those dependency details.</p>
<p>While this is a great approach I&#8217;d love to see how we avoid dependency inversion violations and hide cross-cutting-concerns. I look forward to seeing what the community cooks up.</p>

