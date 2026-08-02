---
layout: ../../layouts/Layout.astro
title: NZBAirWebService
---

# NZBAirWebService

<p class="wiki-date">Earliest known revision <time datetime="2012-04-14T15:12:22Z">14 Apr 2012</time></p>

## Contents

* [1 NZBAirWebService Version 3](#nzbairwebservice-version-3)
* [2 Intended Audience](#intended-audience)
* [3 Purpose](#purpose)
* [4 Supported Providers](#supported-providers)
* [5 Primary End Point](#primary-end-point)
* [6 Authentication](#authentication)
* [7 Security/Logging](#securitylogging)
* [8 Supported actions](#supported-actions)
  * [9 /providers/{providerId}](#providersproviderid)
* [10 Notes](#notes)
* [11 Responses](#responses)
  * [12 UsenetPostResult](#usenetpostresult)
  * [13 UsenetPost](#usenetpost)

## NZBAirWebService Version 3
See [NZB Air Web Service - Release 3](/wiki/nzb_air_web_service_release_3/)

## Intended Audience
NZBAir developers. Please note the NZBAir service is not intended for use outside of the NZBAir products. If you would like to use the service please drop me a line.

## Purpose
The NZBAir Web Service is designed to aggregate and normalise a number of Usenet search engines. It does not store any data nor provide any indexing services. It allows an NZBAir client (desktop, Android or iOS) to consume a feed with the minimal amount of complexity. The web-service is based around speed and efficiency.
 
## Supported Providers
- Newszbin (id="newzbinProvider")
- NZBMatrix (id="nzbmatrixProvider")
- NZBIndex (id="nzbindexProvider")
- NZBSu (id="nzbsuProvider")

NB: All communications between NZBAir and the provider are carried out over SSL. Slight performance penalty (mitigated through caching) but much more secure. 

## Primary End Point
http://api.nzbair.com (SSL Supported and recommended)

## Authentication
The API at this point in time is unauthenticated (excluding providers). Soon it will employ a registration process depending on load.

## Security/Logging
NZBAir does not record users specifically* (see above). However tracking is used to assure the service is only used by the intended audience. Intrusion or DOS redirection is filtered and recorded.

## Supported actions
### /providers/{providerId}
- /browse/{offset}/{limit} returns UsenetPostResult
- /search/{term}/{offset}/{limit} returns UsenetPostResult
- /{beanId}/detail/{postId} returns UsenetPost
- /bookmarks/{offset}/{limit} returns UsenetPostResult
- /bookmarks/add/{postId} returns boolean (success)
- /bookmarks/remove/{postId} returns boolean (success)
- /download/{postId} returns String (xml)
- /capabilities returns Capability (which of the above methods are supported) - TBC will include sorting options and refinements later
- TBC: /categories

All actions also support provider specific arguments which should be passed through the query string. Common arguments are username, password & apiKey.

## Notes
- All actions are cached generically (any user specific data is stripped before caching).
- Cache time is around 5 minutes

## Responses
### UsenetPostResult
<pre class="brush:javascript">
{
  "posts": [
    {
      "id": "1061240",
      "title": "The.Bad.Girls.Club.S07E10.Truces.Tirades.and.Tiaras.PDTV-XviD",
      "filesize": 470810624,
      "categoryText": "TV: Divx/Xvid",
      "categoryId": "6",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317836162,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061240\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061239",
      "title": "Gruen.Planet.S04E10.WS.PDTV.XviD-TASTETV",
      "filesize": 265289728,
      "categoryText": "TV: Divx/Xvid",
      "categoryId": "6",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317835555,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061239\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061238",
      "title": "David.Letterman.2011.10.04.Hugh.Jackman.720p.HDTV.x264-BAJSKORV",
      "filesize": 2147483648,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317835460,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061238\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061237",
      "title": "David.Letterman.2011.10.03.Brian.Williams.720p.HDTV.x264-BAJSKORV",
      "filesize": 1073741824,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317835090,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061237\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061236",
      "title": "The.Hamster.Wheel.S01E01.WS.PDTV.XviD-W4F",
      "filesize": 281018368,
      "categoryText": "TV: Divx/Xvid",
      "categoryId": "6",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317834945,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061236\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061235",
      "title": "The.Vampire.Diaries.S01E22.[FR].[EN.DD5.1].iNTERNAL.720p.WEB.DL.H264-M0uSe",
      "filesize": 1073741824,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317834582,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061235\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061234",
      "title": "Nikita.S01.EXTRAS.720p.Bluray.x264-CtrlHD",
      "filesize": 3221225472,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317833512,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061234\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "1592154"
      },
      "groups": [
        "alt.binaries.hdtv"
      ],
      "images": []
    },
    {
      "id": "1061233",
      "title": "David.Letterman.2011.09.29.Samuel.L.Jackson.720p.HDTV.x264-BAJSKORV",
      "filesize": 1073741824,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317833268,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061233\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061232",
      "title": "The.Daily.Show.2011.10.04.Michael.Lewis.720p.HDTV.x264-TLA",
      "filesize": 544210944,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317832948,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061232\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061231",
      "title": "Ringer.S01E04.720p.WEB.DL.DD5.1.H.264-KiNGS",
      "filesize": 2147483648,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317832831,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061231\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.hdtv"
      ],
      "images": []
    },
    {
      "id": "1061230",
      "title": "National.Geographic.Generals.At.War.The.Battle.Of.Singapore.720p.HDTV.x264-NGCHD",
      "filesize": 1073741824,
      "categoryText": "Documentaries: HD",
      "categoryId": "53",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317832677,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061230\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061229",
      "title": "Body.of.Proof.S02E03.720p.WEB.DL.DD5.1.H.264-NFHD",
      "filesize": 2147483648,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317832486,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061229\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.hdtv"
      ],
      "images": []
    },
    {
      "id": "1061228",
      "title": "Unforgettable.S01E03.720p.WEB.DL.DD5.1.H.264-ViPER",
      "filesize": 2147483648,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317832323,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061228\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.hdtv"
      ],
      "images": []
    },
    {
      "id": "1061227",
      "title": "Buck.65.Square.2002-FTD",
      "filesize": 101711872,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831898,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061227\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061226",
      "title": "Buck.65.Wicked.And.Weird.VLS.2003-KrbZ",
      "filesize": 17825792,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831898,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061226\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061225",
      "title": "Buck.65.463.Advance.EP.2004-JCE",
      "filesize": 29360128,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831898,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061225\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061224",
      "title": "Buck.65.Dirtbike.2008.FTD-INT",
      "filesize": 269484032,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831897,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061224\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061223",
      "title": "Samantha.James.Rise.WEB.2007-eMF",
      "filesize": 167772160,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831897,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061223\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061222",
      "title": "Buck.65.Cretin.Hip.Hop.Vol..1.Mixed.By.Skratch.Bastid.Bootleg.CDR.2007-FTD",
      "filesize": 57671680,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831897,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061222\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061221",
      "title": "Buck.65.Situation.Instrumentals.2007-FTD",
      "filesize": 71303168,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831897,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061221\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061220",
      "title": "Infected.Mushroom.Vicious.Delicious.2007-FWYH",
      "filesize": 133169152,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831897,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061220\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061219",
      "title": "Buck.65.Heck.2007-FTD",
      "filesize": 58720256,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831897,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061219\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061218",
      "title": "Buck.65.Devils.Eyes.CDS.2006-uF",
      "filesize": 18874368,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831896,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061218\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061217",
      "title": "Buck.65.Situation.2007-404",
      "filesize": 74448896,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831896,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061217\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061216",
      "title": "Buck.65.Man.Overboard.(Canadian.Edition).2001-OMR",
      "filesize": 120586240,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831896,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061216\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061215",
      "title": "Buck.65.Game.Tight.(CD.Reissue).1994-CMS",
      "filesize": 73400320,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831895,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061215\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061214",
      "title": "Josh.Todd.You.Made.Me.2003-GOB",
      "filesize": 84934656,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831895,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061214\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.sounds.mp3.complete_cd"
      ],
      "images": []
    },
    {
      "id": "1061213",
      "title": "The.Biggest.Loser.S12E03.HDTV.XviD-FQM",
      "filesize": 800063488,
      "categoryText": "TV: Divx/Xvid",
      "categoryId": "6",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831516,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061213\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061212",
      "title": "King.Kong.2005.EXTENDED.720p.BluRay.x264-SiNNERS",
      "filesize": 10737418240,
      "categoryText": "Movies: HD (x264)",
      "categoryId": "42",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831345,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061212\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "0360717"
      },
      "groups": [
        "alt.binaries.hdtv.x264"
      ],
      "images": []
    },
    {
      "id": "1061211",
      "title": "Ben.Hur.1959.720p.BluRay.DD5.1.x264-EbP",
      "filesize": 11811160064,
      "categoryText": "Movies: HD (x264)",
      "categoryId": "42",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317831152,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061211\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "0052618"
      },
      "groups": [
        "alt.binaries.hdtv.x264"
      ],
      "images": []
    },
    {
      "id": "1061210",
      "title": "Doug.Stanhope.Oslo.Burning.The.Bridge.To.Nowhere.2011.DVDRip.XviD-JETSET",
      "filesize": 812646400,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317829339,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061210\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx"
      ],
      "images": []
    },
    {
      "id": "1061209",
      "title": "Punished.2011.DVDRip.XviD-CoWRY",
      "filesize": 838860800,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317829295,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061209\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx"
      ],
      "images": []
    },
    {
      "id": "1061208",
      "title": "Red.State.LIMITED.DVDRip.XviD-TWiZTED",
      "filesize": 821035008,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317829271,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061208\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx"
      ],
      "images": []
    },
    {
      "id": "1061207",
      "title": "NBA.2K12-RELOADED",
      "filesize": 8589934592,
      "categoryText": "Games: PC",
      "categoryId": "10",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317828931,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061207\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.games"
      ],
      "images": []
    },
    {
      "id": "1061206",
      "title": "The.Big.Bang.Theory.S04E12.Die.Bushose.GERMAN.DUBBED.DL.1080p.BluRay.x.264-TVP",
      "filesize": 2147483648,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317827525,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061206\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061205",
      "title": "Shameless.UK.S08E20.HDTV.XviD-TLA",
      "filesize": 648019968,
      "categoryText": "TV: Divx/Xvid",
      "categoryId": "6",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317825113,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061205\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061204",
      "title": "We.Were.Promised.Jetpacks.In.The.Pit.of.the-Stomach",
      "filesize": 110100480,
      "categoryText": "Music: MP3 Albums",
      "categoryId": "22",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317825074,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061204\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.illuminaten"
      ],
      "images": []
    },
    {
      "id": "1061203",
      "title": "CSI.S11.NTSC.DVDR-JFKDVD",
      "filesize": 30064771072,
      "categoryText": "TV: DVD",
      "categoryId": "5",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317823598,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061203\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "0247082"
      },
      "groups": [
        "alt.binaries.dvdr"
      ],
      "images": []
    },
    {
      "id": "1061202",
      "title": "Ron.and.Fez.Oct.4-2011",
      "filesize": 51380224,
      "categoryText": "Other: Radio",
      "categoryId": "26",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317823345,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061202\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.opie-and-anthony"
      ],
      "images": []
    },
    {
      "id": "1061201",
      "title": "Soccer.Mom.FRENCH.DVDRiP-XViD",
      "filesize": 836763648,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317823328,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061201\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "1059980"
      },
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061200",
      "title": "Vilaine.(2007).French-Dvdrip",
      "filesize": 838860800,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317823235,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061200\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061199",
      "title": "Opie.and.Anthony.Oct.4-2011",
      "filesize": 118489088,
      "categoryText": "Other: Radio",
      "categoryId": "26",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317823220,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061199\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.opie-and-anthony"
      ],
      "images": []
    },
    {
      "id": "1061198",
      "title": "Afterwards.(2008).Dvdrip-French",
      "filesize": 837812224,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317823073,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061198\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "0940580"
      },
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061197",
      "title": "Rochester,.le.dernier.des.libertins.(2004).Dvdrip-French",
      "filesize": 839909376,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822918,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061197\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061196",
      "title": "Juste.Pour.Rire.2011.Gala.Laurent.Paquin.FRENCH-XVID",
      "filesize": 2147483648,
      "categoryText": "TV: Divx/Xvid",
      "categoryId": "6",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822783,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061196\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061195",
      "title": "Craig.Ferguson.2011.10.04.720p.HDTV.x264-ORENJI",
      "filesize": 947912704,
      "categoryText": "TV: HD",
      "categoryId": "41",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822671,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061195\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.multimedia"
      ],
      "images": []
    },
    {
      "id": "1061194",
      "title": "Trackerman.2007.DVDRIP.VOSTFR-XviD",
      "filesize": 770703360,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822668,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061194\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {},
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061193",
      "title": "London.to.Brighton.(2006).Dvdrip.Xvid-French",
      "filesize": 837812224,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822516,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061193\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "0490166"
      },
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061192",
      "title": "The.High.Cost.Of.Living.2010.FRENCH.DVDRIP-XVID",
      "filesize": 849346560,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822429,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061192\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "1479388"
      },
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    },
    {
      "id": "1061191",
      "title": "Contagion.2011.TS.FRENCH.MD.REPACK-XViD",
      "filesize": 836763648,
      "categoryText": "Movies: Divx/Xvid",
      "categoryId": "2",
      "provider": "nzbmatrix",
      "unixTimeAdded": 1317822353,
      "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1061191\\u0026username\\u003dasdsad\\u0026apikey\\u003dasdasd\\u0026scenename\\u003d1",
      "metadata": {
        "imdb": "1598778"
      },
      "groups": [
        "alt.binaries.movies.divx.french"
      ],
      "images": []
    }
  ],
  "offset": 0,
  "limit": 50,
  "totalresults": 50
})
</pre>

### UsenetPost
<pre class="brush:javascript">
{
  "id": "1059770",
  "title": "Leslie West   Unusual Suspects",
  "filesize": 121582387,
  "categoryText": "Music - MP3 Albums",
  "unixTimeAdded": 1317673778,
  "nzbDownloadUrl": "https://nzbmatrix.com/api-nzb-download.php?id\\u003d1059770\\u0026username\\u003dxabre6000\\u0026apikey\\u003dfe0d5ded9d7044957d2fb788c7eb1002\\u0026scenename\\u003d1",
  "metadata": {
    "Uploaded": "2011-10-03 6:43:21",
    "Hits": "0",
    "Parts": "315",
    "Region": "NA",
    "Subject": "Leslie_West-Unusual_Suspects-IMPORT-2011-MDMp3   \\u0026quot\\u0026#5900-leslie_west-unusual_suspects-import-2011-inside-mdmp3.jpg\\u0026quot\\u0026#59 - 2,43 MB - yEnc (1/7)",
    "Language": "NA",
    "Has NFO": "",
    "Comments #": "0",
    "url": "http://www.cduniverse.com/productinfo.asp?pid\\u003d8572801"
  },
  "groups": [
    "alt.binaries.sounds.mp3.blues"
  ],
  "images": [
    "http://img571.imageshack.us/img571/1355/8572801.jpg"
  ]
}
</pre>
