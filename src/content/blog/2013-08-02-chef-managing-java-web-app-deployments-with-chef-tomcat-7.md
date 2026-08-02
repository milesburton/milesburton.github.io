---
title: "Managing Java Web App deployments with Chef & Tomcat 7"
date: 2013-08-02
slug: "chef-managing-java-web-app-deployments-with-chef-tomcat-7"
categories: ["HOWTO"]
tags: ["DevOps", "Coding"]
excerpt: "Automating deployments still seems to be a sore point for those of us not using ‘Cloud’ vendors. Whilst JRebel are valiantly trying to improve the situation with tools like LiveRebel it still leaves a worrying majority of devops writing custom tools. Most production Java-Wap arch"
---
<p>Automating deployments still seems to be a sore point for those of us not using &#8216;Cloud&#8217; vendors. Whilst JRebel are valiantly trying to improve the situation with tools like <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDIQFjAA&amp;url=http%3A%2F%2Fzeroturnaround.com%2Fsoftware%2Fliverebel%2F&amp;ei=rZb7Ub2SD4GJ0AX_3YCACw&amp;usg=AFQjCNGRJ63D5mTU76O61TTnASyClGu17w&amp;sig2=t02xXfmtfbV-rPum_u1vbg&amp;bvm=bv.50165853,d.d2k">LiveRebel</a> it still leaves a worrying majority of devops writing custom tools.</p>
<p>Most production Java-Wap architectures include a number of nodes running Apache &amp; Tomcat or similar. Typically the deployment process is:</p>
<ol>
<li>Wapp node is taken off-line by shutting down the application server (often including a grace period whilst sessions are closed)</li>
<li>A WAR is copied to the webapps directory</li>
<li>Application server is restarted</li>
</ol>
<p>This process is repeated sequentially for each node.</p>
<p>My aim with is to describe how to make this process standardised and repeatable. We&#8217;ll start by creating a limited &#8216;deployment&#8217; user which has permission to replace a WAR file and restart Tomcat. I&#8217;ll assume you&#8217;re either using<a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CFEQFjAA&amp;url=http%3A%2F%2Fwww.opscode.com%2Fhosted-chef%2F&amp;ei=qe33UYfpJ-Sr0AXut4CoDQ&amp;usg=AFQjCNGpOnVefJ_bs-mCbWjytQvYLUHpKA&amp;sig2=5-CypLbkX-TC4mFK6uay-w&amp;bvm=bv.49967636,d.d2k"> Hosted Chef</a> or have your own Chef server implementation. If you go the Hosted route see my previous blog on <a href="/blog/the-secret-wish-to-be-devops/">getting started</a></p>
<p>Chef has three great community cookbooks which can help</p>
<ul>
<li><a style="font-style:normal;" href="https://github.com/opscode-cookbooks/users">https://github.com/opscode-cookbooks/users</a> # Creates a deployment user and provides permission to the Tomcat web application directory</li>
<li><a style="font-style:normal;" href="https://github.com/opscode-cookbooks/tomcat">https://github.com/opscode-cookbooks/tomcat</a> # Scripted installation of Tomcat 7</li>
<li><a style="font-style:normal;" href="https://github.com/opscode-cookbooks/sudo">https://github.com/opscode-cookbooks/sudo</a> # Configures the <strong>sudoers</strong> file which provides the <strong>deploy</strong> with tomcat restart permissions</li>
</ul>
<p>It&#8217;s worth having a poke around the various files to see what they do. Check out each in recipes and templates. Most cookbooks are accompanied by a good readme.MD file which explains how to use it &#8211; that said more often than not there&#8217;s additional functionality that you&#8217;d only notice by digging into the code.</p>
<h2>Step one &#8211; Installing the cookbooks</h2>
<p>Nice and simple, simply clone each repo into your ~/chef-repo/cookbooks folder and issue a <strong>knife cookbook upload &#8211;all</strong>. Hopefully you&#8217;ll have all the required dependencies (if not, just add each and repeat this step).</p>
<p>(you&#8217;ll probably need <a href="http://community.opscode.com/cookbooks/java">java</a>)</p>
<h2>Step two &#8211; Creating your <strong>users</strong> databag</h2>
<p>The users cookbook takes advantage of a databag (basically a json array of objects). We can create the databag using the following command.</p>
<pre class="brush: jscript; title: ; notranslate" title="">knife data bag create users
knife data bag create users deploy</pre>
<h2>Step three &#8211; Configuring your <strong>deploy</strong> user</h2>
<p>In step two a directory in chef-repo/data_bags/users will have been created. Within you&#8217;ll find a deploy.json file which should be fairly bare, only one reference to an id of <strong>deploy</strong>. To allow us to automatically authenticate using SSH you&#8217;ll need to setup an <a href="http://bernhardhaeussner.de/odd/json-escape/">encoded</a> version of your SSH <a href="http://www.linuxproblem.org/art_9.html">public key</a>. Paste this encoded public key under <strong>ssh_keys</strong>.</p>
<pre class="brush: jscript; title: ; notranslate" title=""> {
&quot;id&quot;: &quot;deploy&quot;,
&quot;groups&quot;: [
&quot;tomcat7&quot;
],
&quot;shell&quot;: &quot;/bin/bash&quot;,
&quot;ssh_keys&quot;: [
&quot;&amp;lt;snip&amp;gt;&quot;
]
}
</pre>
<p>I&#8217;m assuming you are using Ubuntu or another debian based Linux distribution, if you don&#8217;t make sure you find the appropriate group for the Tomcat7 user.</p>
<p>Once you&#8217;ve updated the file you can perform a <strong>knife upload .</strong></p>
<h2>Step four: Adding a sudo::deploy recipe</h2>
<p>Now we have a user we&#8217;ll have to add an extra recipe to inform the sudo LWRP to create our sudo permissions</p>
<p>Within chef-repo/cookbooks/sudo/recipes (or create your own cookbook which is preferred) add the following .rb file</p>
<pre class="brush: jscript; title: ; notranslate" title="">
include_recipe &quot;sudo&quot;
sudo 'tomcat' do
user &quot;%deploy&quot; # or a username
runas 'root' # or 'app_user:tomcat'
nopasswd true
commands ['/etc/init.d/tomcat7 restart', '/etc/init.d/tomcat7 stop', '/etc/init.d/tomcat7 start']
end
</pre>
<h2>Step five: Configuring a Role</h2>
<p>Next up we want to create a role to represent a Tomcat7 installation on your server with the appropriate configuration.</p>
<p>Within ~/chef-repo/roles create a file called tomcat7.json and enter</p>
<pre class="brush: jscript; title: ; notranslate" title="">{
   &quot;name&quot;:&quot;tomcat7&quot;,
   &quot;description&quot;:&quot;&quot;,
   &quot;json_class&quot;:&quot;Chef::Role&quot;,
   &quot;default_attributes&quot;:{
      &quot;tomcat&quot;:{
         &quot;base_version&quot;:7,
         &quot;java_options&quot;:&quot;-Djava.awt.headless=true -Dfile.encoding=UTF-8 -server -Xms1536m -Xmx1536m -XX:NewSize=256m -XX:MaxNewSize=256m -XX:PermSize=256m -XX:MaxPermSize=512m -XX:+DisableExplicitGC&quot;
      },
      {&quot;authorization&quot;:{
&quot;sudo&quot;:{
         &quot;include_sudoers_d&quot;:true
      }
}
   },
   &quot;override_attributes&quot;:{

   },
   &quot;chef_type&quot;:&quot;role&quot;,
   &quot;run_list&quot;:[
      &quot;recipe[tomcat]&quot;
   ],
   &quot;env_run_lists&quot;:{

   }
}</pre>
<p>I&#8217;ll draw your eye to the <strong>tomcat</strong> attribute under the <strong>default_attributes</strong> object. This lets you customize your application. In our case we&#8217;ve selected tomcat 7 and added some sane Java options.</p>
<p>The <strong>sudo</strong> attribute <strong>include_sudoers_d</strong> informs the sudo LWRP to create a new entry in the /etc/sudoers.d directory for each user we create (see step four) </p>
<h2>Step six: Converge and test</h2>
<p>That&#8217;s our deployment user configured and tomcat setup. We can now <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDEQFjAA&amp;url=http%3A%2F%2Fdocs.opscode.com%2Fessentials_nodes_chef_run.html&amp;ei=D4_7Ue2vNeiO7AbmvoGoBQ&amp;usg=AFQjCNGZ_o0TxZ2xsC2Kxc5eNXeF1aKsFw&amp;sig2=Hes29BrK6RUwippfSlBYog&amp;bvm=bv.50165853,d.ZGU">converge</a> the test node.</p>
<p>First up, make sure everything is uploaded to the chef-master</p>
<pre class="brush: jscript; title: ; notranslate" title="">
cd chef-repo/
knife upload .
</pre>
<p>On the target node we can run <strong>sudo chef-client</strong>. That will run the installation scripts which we configured earlier.</p>
<p>Let&#8217;s try it out. On your client box, Jenkins for example, try running <strong>ssh deploy@subdomain.example.com</strong>. You should automatically authenticate using your client&#8217;s public key. Once you&#8217;re logged in, lets try and restart Tomcat</p>
<pre class="brush: jscript; title: ; notranslate" title="">
sudo /etc/init.d/tomcat7 restart
</pre>
<p>&#8230;Next up, check you can write to the $TOMCAT_HOME/webapps directory (in Ubuntu that&#8217;s /var/lib/tomcat7/webapps). </p>
<pre class="brush: jscript; title: ; notranslate" title="">
cd /var/lib/tomcat7/webapps 
touch test
</pre>
<p>If you see no permission problems you&#8217;re off to the races! Watch out for the next guide for managing deployments.</p>

