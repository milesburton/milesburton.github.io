---
layout: ../../layouts/Layout.astro
title: DD-WRT Web-services
---

# DD-WRT Web-services

## Contents

* [1 Request](#request)
* [2 Response](#response)
* [3 Request](#request)
* [4 Response](#response)
* [5 Status Wireless](#status-wireless)
* [6 Request](#request)
* [7 Response](#response)
* [8 Request](#request)
* [9 Response (varies)](#response-varies)

= Status Internet =
- Type:

## Request
- End point: http://192.168.1.1/Status_Internet.live.asp
- Verb: GET
- Required headers: Authorization

## Response
- Response type: text/html
- Probably JSON

<pre>
{wan_shortproto::dhcp}
{wan_status::Error&nbsp;&nbsp;<input type="button" value="" onclick="connect(this.form, '_dhcp')" />}
{wan_uptime::1 day, 20:46:40}
{wan_ipaddr::90.100.100.00}
{wan_netmask::255.255.252.0}
{wan_gateway::90.100.100.00}
{wan_dns0::8.8.8.8}
{wan_dns1::192.168.1.1}
{wan_dns2::194.168.4.100}
{dhcp_remaining::5 days 03:13:10}
{ttraff_in::29716}
{ttraff_out::5784}
{uptime:: 15:12:16 up 8 days, 18:55, load average: 0.03, 0.08, 0.02}
{ipinfo::&nbsp;IP: 90.100.100.00}
</pre>

= Status LAN =
- Type:

## Request
- End-point: http://192.168.1.1/Status_Lan.live.asp
- Required Headers: Authorization
- Verb: GET

## Response
- Content-Type: text/html
- Probably JSON

<pre>
{lan_mac::00:00:00:00:00:00}
{lan_ip::192.168.1.1}
{lan_ip_prefix::192.168.1.}
{lan_netmask::255.255.255.0}
{lan_gateway::192.168.1.1}
{lan_dns::8.8.8.8}
{lan_proto::dhcp}
{dhcp_daemon::DNSMasq}
{dhcp_start::100}
{dhcp_num::50}
{dhcp_lease_time::30}
{dhcp_leases:: 'Yosemite','192.168.1.00','00:00:00:00:00:00','0 days 00:30:00','101','joggler','00','00:00:00:00:00:00','0 days 00:30:00','135'}
{pptp_leases::}
{pppoe_leases::}
{arp_table:: '*','192.168.1.112','00:00:80:00:00:00','2','joggler','192.168.1.0','00:00:00:00:0000','0','Yosemite','192.168.00.00','00:00:00:00:00:00','86'}
{uptime:: 15:15:11 up 8 days, 18:58, load average: 0.01, 0.06, 0.02}
{ipinfo::&nbsp;IP: 90.100.100.00}
</pre>

## Status Wireless
- Type:

## Request
- End-point: http://192.168.1.1/Status_Wireless.live.asp
- Verb: GET
- Required headers: Authorization

## Response
- Response type: text/html
- Probably JSON

<pre>
{wl_mac::00:00:00:00:00:00}
{wl_ssid::TEST}
{wl_channel::5 (2432 MHz)}
{wl_radio::Radio is On}
{wl_xmit::60 mW}
{wl_rate::300 Mb/s}
{wl_ack::}
{active_wireless::'00:00:00:00:00:00','ra0','8 days,  19:02:12','243.0','1.0','-60','-95','35','416'}
{active_wds::}
{packet_info::SWRXgoodPacket=14252467;SWRXerrorPacket=0;SWTXgoodPacket=11212841;SWTXerrorPacket=0;}
{uptime:: 15:19:25 up 8 days, 19:02, load average: 0.02, 0.04, 0.01}
{ipinfo::&nbsp;IP: 00.00.00.00}

</pre>

= Status Internet =
- Type: Dynamic

## Request
- End point: http://192.168.1.1/fetchif.cgi?{interface name} (example: http://192.168.1.1/fetchif.cgi?vlan2)
- Verb: GET
- Required headers: Authorization

## Response (varies)
- Response type: text/html
- Probably TSV
- I think it's in this format: {adapter}:{total in}\ {total out}

<pre>
Sun Mar  4 15:22:25 UTC 2012
 vlan2:1413254257 25783195    0    0    0     0          0         1 1770535535 17228473    0    0    0     0       0          0
</pre>
