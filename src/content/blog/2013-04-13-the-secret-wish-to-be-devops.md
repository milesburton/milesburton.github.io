---
title: "Automatic VM provisioning with Chef and ESXi – “The secret wish to be devops”"
date: 2013-04-13
slug: "the-secret-wish-to-be-devops"
categories: ["Devops","HOWTO"]
tags: ["Chef","Devops","ESXi","SecretlyLovesOps"]
excerpt: "Good evening all, Developers are always in a never ending battle with Ops. We’re desperate to get our software out and they want to make sure we wont screw anything up. It’s a match made in hell. Just a few years ago ‘The Cloud’ was the answer. We’ve have an entire platform that "
---
<p>Good evening all,</p>
<p>Developers are always in a never ending battle with Ops. We&#8217;re desperate to get our software out and they want to make sure we wont screw anything up. It&#8217;s a match made in hell.</p>
<p>Just a few years ago &#8216;The Cloud&#8217; was the answer. We&#8217;ve have an entire platform that I can deploy to at any time I want, they scale, they report &#8211; perfect. Alas, we&#8217;re not quiet there yet &#8211; at least not in price.  Historically firing up a new instance of Tomcat or maybe an MongoDB often takes hours of my time. I need to install Ubuntu or Centos, install the patches and assuming nothing goes wrong install Mongo &#8211; oh then configure it. That&#8217;s at least 2-3 hours up the spout.</p>
<p>So ranting aside. let&#8217;s put our devops hat on!</p>
<p>Chef from <a href="http://opscode.com/">Opscode</a> has really excited me. Unlike <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDIQFjAA&amp;url=https%3A%2F%2Fpuppetlabs.com%2F&amp;ei=eJ1pUdDsO-Or0AWNzoHQAQ&amp;usg=AFQjCNGp40OZSQAqIC4rT_R2c84yKpn3vQ&amp;sig2=n9wravYHoANy-oSl-sL7yQ&amp;bvm=bv.45175338,d.d2k">Puppet</a> I can keep my dev hat well and truly on. I can have the flexibility of dedicated hardware and still enjoy the one click nature of &#8216;The Cloud&#8217;.  With Chef you can install and configure almost anything &#8211; including the operating system &#8211; with a simple remote shell command.</p>
<h1>Managing ESXi 5.1 with Chef</h1>
<p>The aim of this guide is to automatically provision and manage an ESXi virtual machine with Chef.</p>
<h3>What are we going to do?</h3>
<ul>
<li>Configure an ESXi 5.1</li>
<li>Install your Chef workstation</li>
<li>Setup an Ubuntu Server virtual machine template</li>
<li>Configure Chef to provision and setup your virtual machines</li>
</ul>
<h3>What you&#8217;ll need:</h3>
<ul>
<li><span style="line-height:14px;"><a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=2&amp;cad=rja&amp;ved=0CD0QFjAB&amp;url=https%3A%2F%2Fwww.vmware.com%2Fgo%2Fgetesxi%2F&amp;ei=XVZqUfjeHqre7AbdrIDYAw&amp;usg=AFQjCNHBrjOyvlZeYDC1V2Y9kFbxuIp9sg&amp;sig2=iwBRP0oHSj05aFb6nLeU_A&amp;bvm=bv.45175338,d.d2k">VMWare ESXi</a> 5.1 (4.x will work)</span></li>
<li>[<a href="http://www.opscode.com/hosted-chef/">Hosted</a>] Chef Server &#8211; Opscode provide a totally managed Chef Server &#8211; lets use that to get started</li>
<li><a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=2&amp;cad=rja&amp;ved=0CD0QFjAB&amp;url=https%3A%2F%2Fwww.vmware.com%2Fgo%2Fgetesxi%2F&amp;ei=XVZqUfjeHqre7AbdrIDYAw&amp;usg=AFQjCNHBrjOyvlZeYDC1V2Y9kFbxuIp9sg&amp;sig2=iwBRP0oHSj05aFb6nLeU_A&amp;bvm=bv.45175338,d.d2k">Ubuntu 12.10</a> installation with VMWare tools</li>
<li>External IP address for your node  &#8211; one which is accessible to your workstation <em>and</em> the Chef server</li>
</ul>
<h2>Step one: Prerequisites</h2>
<p>I&#8217;d you&#8217;d like a little reminder, lets kick off from zero. Chef can be confusing for beginners but it has a LOT of power once you get your head around the basics. Let&#8217;s assume you&#8217;ve started from nothing.</p>
<ul>
<li>Download your VSphere Client for ESXi</li>
<li>Sign up for a<a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;sqi=2&amp;ved=0CEsQFjAA&amp;url=http%3A%2F%2Fwww.opscode.com%2Fhosted-chef%2F&amp;ei=06FpUe3hMOqL0AWJw4GgDA&amp;usg=AFQjCNGpOnVefJ_bs-mCbWjytQvYLUHpKA&amp;sig2=pzfo3PuZFRE27D-LR51Vkw&amp;bvm=bv.45175338,d.d2k"> Hosted Chef Server </a>(the path of least resistance) or alternatively self hosted</li>
<li><a href="http://docs.opscode.com/install_workstation.html">Install your workstation</a></li>
<li>Grab your private keys. You&#8217;ll need your <a href="https://manage.opscode.com/organizations">organisation</a> and <a href="https://www.opscode.com/account/password">user</a> pem files. Install these to ~/chef-repo/.chef</li>
<li>Fetch your <a href="https://manage.opscode.com/organizations">knife.rb</a> file from the organisations page</li>
<li>Register for a free <a href="https://bitbucket.org/">Bitbucket</a> git repository &#8211; you&#8217;ll want to backup your repo as we go</li>
</ul>
<p>Chef has a couple of concepts worth remembering. Keep in mind the following jargon:</p>
<ul>
<li>Node &#8211; a Chef client which we intend to automatically provision</li>
<li>Recipe &#8211; a set of instructions and file templates that perform some sort of task. For example, setting up an IP address on a node</li>
<li>Cookbook &#8211; one or more recipes</li>
<li>Databag &#8211; A customizable set of data which is passed to a cookbook. For example, an IP address</li>
<li>Knife &#8211; the command line tool which executes our actions</li>
<li>Run list &#8211; a set of cookbooks to be applied to a node</li>
</ul>
<h2>Step two: Setup your workstation</h2>
<p>Before we can really get going we need to setup a copy of the Chef repository. This is typically a git clone of the OpsCode repository that we customise. Rather than recant their tutorial run through <a href="http://docs.opscode.com/install_workstation.html">these steps</a></p>
<h3>Add the Chef bootstraps</h3>
<p>To correctly bootstrap Ubuntu Server we need to grab the <a href="https://github.com/agoddard/chef-bootstraps/tree/master/ubuntu">appropriate erb</a>. At the time of writing <strong>ubuntu12.04-19-gems.erb</strong> is the latest version.</p>
<p>Grab the latest file and pop it in your bootstrap directory</p>
<pre>mkdir -p /home/`whoami`/.chef/bootstrap
cd /home/`whoami`/.chef/bootstrap
curl "https://raw.github.com/agoddard/chef-bootstraps/master/ubuntu/ubuntu12.04-19-gems.erb" &gt; ubuntu12.04-19-gems.erb</pre>
<h3>Add ESXi support</h3>
<p><a href="https://github.com/rubiojr/knife-esx">Sergio Rubio</a> wrote a great cookbook which will allow us to remotely provision ESXi virtual machines. You can grab the cookbook using gem:</p>
<pre>gem install knife-esx</pre>
<p>You&#8217;ll need to configure your ESX root credentials* in the ~/chef-repo/.chef/knife.rb file. It will need two additional lines:</p>
<pre>knife[:esx_host] = "esx"
knife[:esx_username] = "root"
knife[:esx_password] = "somepassword"</pre>
<p><em>* alternatively you can specify the credentials at the command line</em></p>
<p><strong>Setup node IP addresses</strong></p>
<p>If you&#8217;re like me renting a cheap dedicated ESXi box is great for testing but managing IP addresses is a real pain. Chef can once again help us by using the <a href="https://github.com/harryyeh/chef-ipaddress.git">chef-ipaddress</a> cookbook. It creates a template of the /etc/network/interfaces file and automatically restarts the interface so your VM becomes accessible via the new IP.</p>
<p>Install the IPAddress plugin:</p>
<pre>cd ~/chef-repo/cookbooks
git clone https://github.com/harryyeh/chef-ipaddress.git
knife create data bag servers server1.json</pre>
<p>In the last command we created a brand new configuration file for our first node. Each node you would like to manage will need an associated configuration file &#8211; feel free to run this command as mange times as you like</p>
<p>Lets download our new data bags and configure the first node:</p>
<pre>knife download .
cd ~/chef-repo/data_bags/servers</pre>
<p>Each node should have an associated JSON file of the same name (server1 in our example). You can use the following template (update your IP accordingly)</p>
<pre>{
    "id": "server1",
    "interfaces": [
        {
                    "name":"eth0",
                "address": "192.168.1.2",
                "netmask": "255.255.255.255",
                "gateway": "192.168.1.1",
                "dns-nameservers": "8.8.8.8",
                "dns-search": "test-domain.com"

        }
    ]
}</pre>
<h3>Pushing changes back to the Chef server</h3>
<p>Once we&#8217;re done, run the <em>&#8220;knife upload .&#8221;</em> command. This will upload all your local files to the Chef server</p>
<h3>Create a backup</h3>
<p>At this stage it is worth syncronising your copy of the chef repository to Bitbucket. You can do this by running the following commands:</p>
<pre>git remote add bitbucket ssh://git@bitbucket.org/YOURUSER/chef-repo.git
git push -u bitbucket --all</pre>
<p>When you&#8217;re working with Git it&#8217;s worth using <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=2&amp;cad=rja&amp;ved=0CD4QFjAB&amp;url=http%3A%2F%2Fnvie.com%2Fposts%2Fa-successful-git-branching-model%2F&amp;ei=8l9qUfaPGaOU0AXX6IG4DA&amp;usg=AFQjCNH68KTaWel1fFjUm47lmyerfmixeA&amp;sig2=OVJYDsA03Djco5THGj07jw&amp;bvm=bv.45175338,d.d2k">Gitflow</a> to keep a track of your changes over time</p>
<h2>Step three: Configure OS template</h2>
<p><a href="http://partnerweb.vmware.com/GOSIG/Ubuntu_12_10.html">Install</a> an Ubuntu 12.04 or 12.10 server virtual machine using the name <em>ubuntu-12.10-x64_template</em>. Don&#8217;t worry to much about the RAM or VCPUs as we&#8217;ll reconfigure that later. Architecture is important, x64 should be your default.</p>
<ul>
<li><a href="http://www.ubuntu.com/start-download?distro=server&amp;bits=64&amp;release=lts">Grab Ubuntu Server x64 12.10</a></li>
<li>Enable SSH on your <a href="http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&amp;cmd=displayKC&amp;externalId=2004746">ESXi server</a></li>
<li><span style="line-height:14px;">Setup a provisioner custom user. I will assume you used </span><em><a style="line-height:14px;" href="http://www.howtogeek.com/howto/ubuntu/add-a-user-on-ubuntu-server/">provision</a></em><span style="line-height:14px;"><br />
</span></li>
<li>Configure sudo to allow <em>provision</em> to run <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDEQFjAA&amp;url=http%3A%2F%2Fwww.ducea.com%2F2006%2F06%2F18%2Flinux-tips-password-usage-in-sudo-passwd-nopasswd%2F&amp;ei=ubdpUfHpH8PB0QWnn4GICw&amp;usg=AFQjCNFaT8FRM5lZjEa4q1tW0XROTRT-mA&amp;sig2=n_HgHi7iv7Zxdr84QDydFQ">super user commands</a>*</li>
<li>Install <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=2&amp;cad=rja&amp;ved=0CDkQFjAB&amp;url=http%3A%2F%2Fkb.vmware.com%2Fkb%2F1022525&amp;ei=W7hpUc3zE6Wq0QXnz4CABQ&amp;usg=AFQjCNG4RysONZ-Mw85-t4Nv8SsQenTz_A&amp;sig2=oDKFl8wiTZG1kB5YzgtHTA&amp;bvm=bv.45175338,d.d2k">VMWare tools</a></li>
<li>Configure a temporary IP, Gateway, DNS Server and Netmask &#8211; usually configured via <em>/etc/network/interfaces</em></li>
<li>Copy your <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDEQFjAA&amp;url=http%3A%2F%2Fwww.linuxproblem.org%2Fart_9.html&amp;ei=1LhpUcSNLIjE0QWU54HYCg&amp;usg=AFQjCNGcgcrwT1Xh52Yp1qZ5wGbyXDE0Qg&amp;sig2=2Rbi3VsgVRHCHbTYN8L_2g&amp;bvm=bv.45175338,d.d2k">public SSH</a> key to the provision users authorised keys file so we can automatically log in later</li>
</ul>
<p>Shutdown your OS template once you have finished.</p>
<p><em>*NB: I recommend you setup a <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDUQFjAA&amp;url=http%3A%2F%2Fdocs.opscode.com%2Fessentials_cookbook_recipes.html&amp;ei=-LdpUeyEIIa50QXctYD4Aw&amp;usg=AFQjCNF9ijuW4azplXksC-PBAqg1-_rhUg&amp;sig2=eir2soJwXC0GqjlqieCb2A&amp;bvm=bv.45175338,d.d2k">recipe</a> to remove this ability later as this can be a potential security hole if not used wisely</em></p>
<h2><strong>Step four: Prepare your ESXi host</strong></h2>
<p><a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDwQFjAA&amp;url=https%3A%2F%2Fgithub.com%2Frubiojr%2Fknife-esx&amp;ei=GlpqUYeLDYmX0AW6s4CIAg&amp;usg=AFQjCNHOpXkRrOU8MfKrBqR31AVbbYBGEw&amp;sig2=Aw7iVkODFFVriNdrNV8gNw&amp;bvm=bv.45175338,d.d2k">Knife ESXi </a>requires you to setup the following directory on your ESXi server. Make sure you&#8217;ve enabled <a href="https://www.google.co.uk/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=2&amp;cad=rja&amp;ved=0CDgQFjAB&amp;url=http%3A%2F%2Fkb.vmware.com%2Fkb%2F2004746&amp;ei=qVpqUaK1J4b60gXs6IHICg&amp;usg=AFQjCNHwSdYYJe78mkQfvfgILcwSXZDgrw&amp;sig2=LxUZZMFPsr5L7bUQerd1vw&amp;bvm=bv.45175338,d.d2k">SSH access to ESXi 5</a></p>
<pre>ssh root@esxi
mkdir -p /vmfs/volumes/datastore1/esx-gem/templates</pre>
<p>Copy your virtual disk images into your templates directory</p>
<pre>vmkfstools -i /vmfs/volumes/datastore1/ubuntu-12.10-x64_template/*.vmdk –diskformat thin /vmfs/volumes/datastore1/esx-gem/templates/ubuntu-12.10-x64_template.vmdk   # should copy two files, disk metadata and the disk image (denoted by -flat)</pre>
<p>Check Knife ESXi can see your new template</p>
<pre>miles@chef:~/chef-repo$ knife esx template list
Connecting to ESX host esx...
+---------------------------+
| DISK_TEMPLATES |
+---------------------------+
| ubuntu-12.10-x64_template.vmdk |
+---------------------------+</pre>
<h2>Step five: Bootstrap your VM</h2>
<p>Now we&#8217;re onto the fun bit. Bootstrapping your first node. The following command will clone your Ubuntu template and setup a new virtual machine &#8216;server1&#8217; with 2GiB RAM. Once the VM is provisioned knife will bootstrap the node making it available for automatic configuration.</p>
<pre>knife esx vm create --vm-name server1 --use-template ubuntu-12.10-x64_template --verbose true --distro ubuntu12.04-19-gems --vm-memory 2048 -x provision -i ~/.ssh/id_rsa</pre>
<h2>Security Considerations</h2>
<p>Before we call it a day we need to battle harden our new system. Security will be covered in a different article however I&#8217;ll leave the following links as an exercise for the reader:</p>
<ul>
<li><a href="http://yurisk.info/2011/04/05/two-tips-to-secure-ssh-access-from-specific-ips-to-specific-users-in-checkpoint-or-any-linux/">Securing SSH with access via a certain IP</a></li>
<li><a href="https://help.ubuntu.com/10.04/serverguide/automatic-updates.html">Ubuntu automatic updates </a></li>
<li><a href="http://rocky.eld.leidenuniv.nl/">Arno&#8217;s firewall script</a></li>
</ul>
<p>Everything can be managed through Chef so it&#8217;s worth checking out if there is a cookbook already available</p>

