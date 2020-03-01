var foxpush_config =
{
  domain:'tielabs.com',
  foxsubdomain:'tielabscom',
  icon:'https://foxpush.com/publisher/api/api_uploads/png/foxpush_6c320803ae.png',
  title:'Subscribe to stay up to date!',
  desc:'be the first one to know our new theme releases, discounts and updates of our collection by click Allow button now',
  short_title:'Notification',
  allow_text:'Allow',
  deny_text:'Deny',
  allow_mobile:1,
  allow_firefox:0,
  allow_safari:0,
  popup_style:'box',
  is_cache:'',
  allow_prompt:0,
  prompt_message:'',
  allow_popunder:'0',
  allow_cname:'0',
  domain_cname:'',
  hostname:'https://tielabscom.foxpush.net',
  thanks_for_subscription_msg:'Thanks for subscribing.',
  close_text:'Close',
  update_time:'Tuesday 7th of November 2017 02:36:42 PM',
};

var foxpush_localstorage_config = {
    foxpush_localstorage:0,
    foxpush_status:'none',
    foxpush_user_token:'',
    foxpush_segmentation:''
};function _foxpush_removeA(arr)
{
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length)
    {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


function _foxpush_check_segment(id)
{
    var a;
    if(localStorage.getItem('foxpush_segmentation') === null || localStorage.getItem('foxpush_segmentation') == '') {
        a = [];
    }
    else
    {
        a = Object.values(JSON.parse(localStorage.getItem('foxpush_segmentation')));
    }

    if(a.join(',').indexOf(id) > -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}


function _foxpush_local_segment(segment_id,type)
{
    var a;
    if(localStorage.getItem('foxpush_segmentation') === null || localStorage.getItem('foxpush_segmentation') == '') {
        a = [];
    }
    else
    {
        a = Object.values(JSON.parse(localStorage.getItem('foxpush_segmentation')));
    }


    if(type == 'subscribe')
    {
        a.push(segment_id);
    }
    else
    {
        _foxpush_removeA(a,segment_id);
    }

    var rv = {};
    for (var i = 0; i < a.length; ++i)
    {
        if (a[i] !== undefined) rv[i] = a[i];
    }

    localStorage.setItem('foxpush_segmentation', JSON.stringify(rv));
}


function _foxpush_subscribe(id)
{
    if(localStorage.foxpush_user_token !== undefined && _foxpush_check_segment(id) == false)
    {
        var segment_subscribe = new XMLHttpRequest();
        segment_subscribe.open('GET', 'https://subscribes.foxpush.com/segment/?token='+localStorage.foxpush_user_token+'&sid='+id+'&type=subscribe&domain='+foxpush_config.domain, true);
        segment_subscribe.send();
        _foxpush_local_segment(id,'subscribe');
    }
}

function _foxpush_unsubscribe(id)
{
    if(localStorage.foxpush_user_token !== undefined  && _foxpush_check_segment(id) == true)
    {
        var segment_unsubscribe = new XMLHttpRequest();
        segment_unsubscribe.open('GET', 'https://subscribes.foxpush.com/segment/?token='+localStorage.foxpush_user_token+'&sid='+id+'&type=unsubscribe&domain='+foxpush_config.domain, true);
        segment_unsubscribe.send();
        _foxpush_local_segment(id,'unsubscribe');
    }
}function fox_browser() {

        var t = true;

        function detect(ua) {

            function getFirstMatch(regex) {
                var match = ua.match(regex);
                return (match && match.length > 1 && match[1]) || '';
            }

            function getSecondMatch(regex) {
                var match = ua.match(regex);
                return (match && match.length > 1 && match[2]) || '';
            }

            var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
                    , likeAndroid = /like android/i.test(ua)
                    , android = !likeAndroid && /android/i.test(ua)
                    , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
                    , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
                    , chromeos = /CrOS/.test(ua)
                    , silk = /silk/i.test(ua)
                    , sailfish = /sailfish/i.test(ua)
                    , tizen = /tizen/i.test(ua)
                    , webos = /(web|hpw)os/i.test(ua)
                    , windowsphone = /windows phone/i.test(ua)
                    , samsungBrowser = /SamsungBrowser/i.test(ua)
                    , windows = !windowsphone && /windows/i.test(ua)
                    , mac = !iosdevice && !silk && /macintosh/i.test(ua)
                    , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
                    , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
                    , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
                    , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
                    , mobile = !tablet && /[^-]mobi/i.test(ua)
                    , xbox = /xbox/i.test(ua)
                    , result

            if (/opera/i.test(ua)) {
                //  an old Opera
                result = {
                    name: 'Opera'
                    , opera: t
                    , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                }
            } else if (/opr|opios/i.test(ua)) {
                // a new Opera
                result = {
                    name: 'Opera'
                    , opera: t
                    , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
                }
            }
            else if (/SamsungBrowser/i.test(ua)) {
                result = {
                    name: 'Samsung Internet for Android'
                    , samsungBrowser: t
                    , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
                }
            }
            else if (/coast/i.test(ua)) {
                result = {
                    name: 'Opera Coast'
                    , coast: t
                    , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
                }
            }
            else if (/yabrowser/i.test(ua)) {
                result = {
                    name: 'Yandex Browser'
                    , yandexbrowser: t
                    , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                }
            }
            else if (/ucbrowser/i.test(ua)) {
                result = {
                    name: 'UC Browser'
                    , ucbrowser: t
                    , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
                }
            }
            else if (/mxios/i.test(ua)) {
                result = {
                    name: 'Maxthon'
                    , maxthon: t
                    , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
                }
            }
            else if (/epiphany/i.test(ua)) {
                result = {
                    name: 'Epiphany'
                    , epiphany: t
                    , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
                }
            }
            else if (/puffin/i.test(ua)) {
                result = {
                    name: 'Puffin'
                    , puffin: t
                    , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
                }
            }
            else if (/sleipnir/i.test(ua)) {
                result = {
                    name: 'Sleipnir'
                    , sleipnir: t
                    , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
                }
            }
            else if (/k-meleon/i.test(ua)) {
                result = {
                    name: 'K-Meleon'
                    , kMeleon: t
                    , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
                }
            }
            else if (windowsphone) {
                result = {
                    name: 'Windows Phone'
                    , windowsphone: t
                }
                if (edgeVersion) {
                    result.msedge = t
                    result.version = edgeVersion
                }
                else {
                    result.msie = t
                    result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
                }
            }
            else if (/msie|trident/i.test(ua)) {
                result = {
                    name: 'Internet Explorer'
                    , msie: t
                    , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                }
            } else if (chromeos) {
                result = {
                    name: 'Chrome'
                    , chromeos: t
                    , chromeBook: t
                    , chrome: t
                    , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                }
            } else if (/chrome.+? edge/i.test(ua)) {
                result = {
                    name: 'Microsoft Edge'
                    , msedge: t
                    , version: edgeVersion
                }
            }
            else if (/vivaldi/i.test(ua)) {
                result = {
                    name: 'Vivaldi'
                    , vivaldi: t
                    , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
                }
            }
            else if (sailfish) {
                result = {
                    name: 'Sailfish'
                    , sailfish: t
                    , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                }
            }
            else if (/seamonkey\//i.test(ua)) {
                result = {
                    name: 'SeaMonkey'
                    , seamonkey: t
                    , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
                }
            }
            else if (/firefox|iceweasel|fxios/i.test(ua)) {
                result = {
                    name: 'Firefox'
                    , firefox: t
                    , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                }
                if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                    result.firefoxos = t
                }
            }
            else if (silk) {
                result =  {
                    name: 'Amazon Silk'
                    , silk: t
                    , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
                }
            }
            else if (/phantom/i.test(ua)) {
                result = {
                    name: 'PhantomJS'
                    , phantom: t
                    , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
                }
            }
            else if (/slimerjs/i.test(ua)) {
                result = {
                    name: 'SlimerJS'
                    , slimer: t
                    , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
                }
            }
            else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                result = {
                    name: 'BlackBerry'
                    , blackberry: t
                    , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                }
            }
            else if (webos) {
                result = {
                    name: 'WebOS'
                    , webos: t
                    , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                };
                /touchpad\//i.test(ua) && (result.touchpad = t)
            }
            else if (/bada/i.test(ua)) {
                result = {
                    name: 'Bada'
                    , bada: t
                    , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
                };
            }
            else if (tizen) {
                result = {
                    name: 'Tizen'
                    , tizen: t
                    , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
                };
            }
            else if (/qupzilla/i.test(ua)) {
                result = {
                    name: 'QupZilla'
                    , qupzilla: t
                    , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
                }
            }
            else if (/chromium/i.test(ua)) {
                result = {
                    name: 'Chromium'
                    , chromium: t
                    , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
                }
            }
            else if (/chrome|crios|crmo/i.test(ua)) {
                result = {
                    name: 'Chrome'
                    , chrome: t
                    , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                }
            }
            else if (android) {
                result = {
                    name: 'Android'
                    , version: versionIdentifier
                }
            }
            else if (/safari|applewebkit/i.test(ua)) {
                result = {
                    name: 'Safari'
                    , safari: t
                }
                if (versionIdentifier) {
                    result.version = versionIdentifier
                }
            }
            else if (iosdevice) {
                result = {
                    name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
                }
                // WTF: version is not part of user agent in web apps
                if (versionIdentifier) {
                    result.version = versionIdentifier
                }
            }
            else if(/googlebot/i.test(ua)) {
                result = {
                    name: 'Googlebot'
                    , googlebot: t
                    , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
                }
            }
            else {
                result = {
                    name: getFirstMatch(/^(.*)\/(.*) /),
                    version: getSecondMatch(/^(.*)\/(.*) /)
                };
            }

            // set webkit or gecko flag for browsers based on these engines
            if (!result.msedge && /(apple)?webkit/i.test(ua)) {
                if (/(apple)?webkit\/537\.36/i.test(ua)) {
                    result.name = result.name || "Blink"
                    result.blink = t
                } else {
                    result.name = result.name || "Webkit"
                    result.webkit = t
                }
                if (!result.version && versionIdentifier) {
                    result.version = versionIdentifier
                }
            } else if (!result.opera && /gecko\//i.test(ua)) {
                result.name = result.name || "Gecko"
                result.gecko = t
                result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
            }

            // set OS flags for platforms that have multiple browsers
            if (!result.windowsphone && !result.msedge && (android || result.silk)) {
                result.android = t
            } else if (!result.windowsphone && !result.msedge && iosdevice) {
                result[iosdevice] = t
                result.ios = t
            } else if (mac) {
                result.mac = t
            } else if (xbox) {
                result.xbox = t
            } else if (windows) {
                result.windows = t
            } else if (linux) {
                result.linux = t
            }

            function getWindowsVersion (s) {
                switch (s) {
                    case 'NT': return 'NT'
                    case 'XP': return 'XP'
                    case 'NT 5.0': return '2000'
                    case 'NT 5.1': return 'XP'
                    case 'NT 5.2': return '2003'
                    case 'NT 6.0': return 'Vista'
                    case 'NT 6.1': return '7'
                    case 'NT 6.2': return '8'
                    case 'NT 6.3': return '8.1'
                    case 'NT 10.0': return '10'
                    default: return undefined
                }
            }

            // OS version extraction
            var osVersion = '';
            if (result.windows) {
                osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
            } else if (result.windowsphone) {
                osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
            } else if (result.mac) {
                osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
                osVersion = osVersion.replace(/[_\s]/g, '.');
            } else if (iosdevice) {
                osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
                osVersion = osVersion.replace(/[_\s]/g, '.');
            } else if (android) {
                osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
            } else if (result.webos) {
                osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
            } else if (result.blackberry) {
                osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
            } else if (result.bada) {
                osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
            } else if (result.tizen) {
                osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
            }
            if (osVersion) {
                result.osversion = osVersion;
            }

            // device type extraction
            var osMajorVersion = !result.windows && osVersion.split('.')[0];
            if (
                    tablet
                    || nexusTablet
                    || iosdevice == 'ipad'
                    || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
                    || result.silk
            ) {
                result.tablet = t
            } else if (
                    mobile
                    || iosdevice == 'iphone'
                    || iosdevice == 'ipod'
                    || android
                    || nexusMobile
                    || result.blackberry
                    || result.webos
                    || result.bada
            ) {
                result.mobile = t
            }

            // Graded Browser Support
            // http://developer.yahoo.com/yui/articles/gbs
            if (result.msedge ||
                    (result.msie && result.version >= 10) ||
                    (result.yandexbrowser && result.version >= 15) ||
                    (result.vivaldi && result.version >= 1.0) ||
                    (result.chrome && result.version >= 20) ||
                    (result.samsungBrowser && result.version >= 4) ||
                    (result.firefox && result.version >= 20.0) ||
                    (result.safari && result.version >= 6) ||
                    (result.opera && result.version >= 10.0) ||
                    (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
                    (result.blackberry && result.version >= 10.1)
                    || (result.chromium && result.version >= 20)
            ) {
                result.a = t;
            }
            else if ((result.msie && result.version < 10) ||
                    (result.chrome && result.version < 20) ||
                    (result.firefox && result.version < 20.0) ||
                    (result.safari && result.version < 6) ||
                    (result.opera && result.version < 10.0) ||
                    (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
                    || (result.chromium && result.version < 20)
            ) {
                result.c = t
            } else result.x = t

            return result
        }

        var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

        bowser.test = function (browserList) {
            for (var i = 0; i < browserList.length; ++i) {
                var browserItem = browserList[i];
                if (typeof browserItem=== 'string') {
                    if (browserItem in bowser) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Get version precisions count
         *
         * @example
         *   getVersionPrecision("1.10.3") // 3
         *
         * @param  {string} version
         * @return {number}
         */
        function getVersionPrecision(version) {
            return version.split(".").length;
        }

        /**
         * Array::map polyfill
         *
         * @param  {Array} arr
         * @param  {Function} iterator
         * @return {Array}
         */
        function map(arr, iterator) {
            var result = [], i;
            if (Array.prototype.map) {
                return Array.prototype.map.call(arr, iterator);
            }
            for (i = 0; i < arr.length; i++) {
                result.push(iterator(arr[i]));
            }
            return result;
        }

        /**
         * Calculate browser version weight
         *
         * @example
         *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
         *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
         *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
         *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
         *
         * @param  {Array<String>} versions versions to compare
         * @return {Number} comparison result
         */
        function compareVersions(versions) {
            // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
            var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
            var chunks = map(versions, function (version) {
                var delta = precision - getVersionPrecision(version);

                // 2) "9" -> "9.0" (for precision = 2)
                version = version + new Array(delta + 1).join(".0");

                // 3) "9.0" -> ["000000000"", "000000009"]
                return map(version.split("."), function (chunk) {
                    return new Array(20 - chunk.length).join("0") + chunk;
                }).reverse();
            });

            // iterate in reverse order by reversed chunks array
            while (--precision >= 0) {
                // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
                if (chunks[0][precision] > chunks[1][precision]) {
                    return 1;
                }
                else if (chunks[0][precision] === chunks[1][precision]) {
                    if (precision === 0) {
                        // all version chunks are same
                        return 0;
                    }
                }
                else {
                    return -1;
                }
            }
        }

        /**
         * Check if browser is unsupported
         *
         * @example
         *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
         *
         * @param  {Object}  minVersions map of minimal version to browser
         * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
         * @param  {String}  [ua] user agent string
         * @return {Boolean}
         */
        function isUnsupportedBrowser(minVersions, strictMode, ua) {
            var _bowser = bowser;

            // make strictMode param optional with ua param usage
            if (typeof strictMode === 'string') {
                ua = strictMode;
                strictMode = void(0);
            }

            if (strictMode === void(0)) {
                strictMode = false;
            }
            if (ua) {
                _bowser = detect(ua);
            }

            var version = "" + _bowser.version;
            for (var browser in minVersions) {
                if (minVersions.hasOwnProperty(browser)) {
                    if (_bowser[browser]) {
                        if (typeof minVersions[browser] !== 'string') {
                            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
                        }

                        // browser version and min supported version.
                        return compareVersions([version, minVersions[browser]]) < 0;
                    }
                }
            }

            return strictMode; // not found
        }

        /**
         * Check if browser is supported
         *
         * @param  {Object} minVersions map of minimal version to browser
         * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
         * @param  {String}  [ua] user agent string
         * @return {Boolean}
         */
        function check(minVersions, strictMode, ua) {
            return !isUnsupportedBrowser(minVersions, strictMode, ua);
        }

        bowser.isUnsupportedBrowser = isUnsupportedBrowser;
        bowser.compareVersions = compareVersions;
        bowser.check = check;

        /*
         * Set our detect method to the main bowser object so we can
         * reuse it to test other user agents.
         * This is needed to implement future tests.
         */
        bowser._detect = detect;

        return bowser
        }
        
        var fox_bowser = fox_browser();
        //console.log(fox_bowser);
        
        // eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2 2B=(f===f.2C)?1G:u;4(1Z.2D==\'D:\'){1c=u;4(!3.19){3.19=V.19;3.h=V.h;3.e=V.e;3.1V=V.1V;}4(T.t&&T.2A>9){6.1a.1o=5(){4(\'t\'Y f&&\'14\'Y f.t){2 m=f.t.14.d(\'25.r.M\');15(m);}};2 15=5(m){4(m.d===\'2z\'){f.t.14.2u(\'D://t.r.1O\',\'25.r.M\',{S:s.1f,2x:s.1E},15);}a 4(m.d===\'W\'){3.h=\'P\';3.e=\'\';1H.1p(\'2F 2G 2O 2t W\');}a 4(m.d===\'1e\'){3.h=\'16\';3.e=m.1y;Z(m.1y,\'\',\'\',\'\',\'2R\');}};}a{5 1b(1N,1K,G){2 i=6.18(\'i\');i.2N=1K;2M(i.1B.1T>0){1N.X(i.1B[0]);}4(G!=\'\'){2 H=6.H||6.2I(\'H\')[0],7=6.18(\'7\');7.2H=\'24/G\';4(7.1C){7.1C.2J=G;}a{7.X(6.2K(G));}H.X(7);}}4(3.e!=\'\'){2 1z=\'<1L 2S="D://\'+s.1E+\'.r.1O/2i/?S=\'+o(6.S)+\'&l=\'+3.e+\'" N="0" y="0" 7="N: E; y: E; 2g: E; j: v;" 2h="0"></1L>\';1b(6.1a,1z);}4(s.2n==1){2 Q=\'<i 1I="g" 7="j: v;" 1D="g"><p>\'+s.Q+\'</p></i>\';2 17=\'#g {j: v;2o: 2p;y: 1x%;N: 1x%;2q-y: 2r;2m: 2l;2s: 2k(0,0,0,.8);z-2j: 2P;1P: 0;10-2e: 26;}.g p { 3q: 0!I; 28: 0; 3r: #3s; 24-3t: 3p; 10-2e: 26; 28-1P: 3o!I; 10-3l: 3m; j: 1J; 3v-y: 3n; }\';}a{2 Q=\'<i 1I="g" 7="N:E;y:E;j: v;" 1D="g"></i>\';2 17=\'\';}1b(6.1a,Q,17);2 C=6.18("1t");C.3B="3x";C.1F="/C.3y";6.H.X(C);2 d=x.d;4(T.3j&&s.31==0){1c=1G;}4(1c==u&&T.32){4(x.d!=\'1e\'&&x.d!=\'W\'){4(\'U\'Y w){w.U.33(\'/34.30\').A(5(F){6.13(\'g\').7.1d(\'j\',\'1J\',\'I\');w.U.1v.A(5(F){F.1u.1X({2Z:u}).A(5(B){6.13(\'g\').7.1d(\'j\',\'v\',\'I\');3.h=\'16\';3.e=L(B.c);2 q=J.1U(J.27(B));Z(L(B.c),B.c,q.K.k,q.K.n,\'2V\');}).29(5(2U){6.13(\'g\').7.1d(\'j\',\'v\',\'I\');4(x.d===\'W\'){3.h=\'P\';3.e=\'\';}a{}});});});}a{}}a 4(x.d==\'1e\'){w.U.1v.A(5(F){F.1u.2b().A(5(O){2 q=J.1U(J.27(O));1R(L(q.c),q.c,q.K.k,q.K.n);}).29(5(2d){3e.1p(\'3f 3g 2b(): \'+2d);});});3.h=\'16\';}a{3.h=\'P\';3.e=\'\';}}a{3.h=\'P\';3.e=\'\';}}5 20(){1S\'3d/3c\';}5 L(O){2 12=O.38(\'/\');2 1Q=12[12.1T-1];1S 1Q;};5 1R(l,c,k,n){4(3.11==0||3.11===1n){2 b=1g 1Y();b.1k(\'21\',\'D://22.r.M/39/?l=\'+l+\'&c=\'+o(c)+\'&k=\'+o(k)+\'&n=\'+o(n),u);b.1o=5(){4(b.R>=2a&&b.R<2c){3.11=1;}};b.1M();}}5 Z(l,c,k,n,1j){2 1m=20();2 2f=f.w.3a||f.w.3b;2 23=f.1Z.1F;2 b=1g 1Y();b.1k(\'21\',\'D://22.r.M/1X/?l=\'+l+\'&c=\'+o(c)+\'&k=\'+o(k)+\'&n=\'+o(n)+\'&37=\'+o(23)+\'&1m=\'+1m+\'&3h=\'+2f+\'&1f=\'+s.1f+\'&1j=\'+1j,u);b.1o=5(){4(b.R>=2a&&b.R<2c){4(1l 1h!=="1n"){5 1q(){2 1w=36.1t;2 1s=f.1k(1w,\'2Y\');1s.2X();}2 1r=1g x(1h.S,1h);1r.2W=5(){1q();}}4(1l 1i!=="1n"){4(1l 1i==="5"){1i(l);}}}a{}};b.1M();}}a{1H.1p(" 3i : 3z 1W 3A (3C 3F) 1A 3D 2T 3E. 3w 1A 3u 3k 2L 2Q 2y 2w 2v 1W 2E r 35 ");}',62,228,'||var|localStorage|if|function|document|style|||else|send_token|endpoint|permission|foxpush_user_token|window|foxpush_prompt_message|foxpush_status|div|display|auth|token|permissionData|p256dh|encodeURIComponent||keys_info|foxpush|foxpush_config|safari|true|none|navigator|Notification|height||then|pushSubscription|foxpush_manifest|https|0px|serviceWorkerRegistration|css|head|important|JSON|keys|getSubscriptionId|com|width|subscription|blocked|prompt_message|status|title|fox_bowser|serviceWorker|foxpush_localstorage_config|denied|appendChild|in|user_subscribe|font|foxpush_subscriber_update|endpointSections|getElementById|pushNotification|checkRemotePermission|allowed|prompt_css|createElement|foxpush_localstorage|body|fox_appendHtml|foxpush_popup_allowed|setProperty|granted|domain|new|welcome_object|foxpush_subscribe_callback|client_type|open|typeof|timezone|undefined|onload|log|open_notification_url|notification|win|link|pushManager|ready|url|100|deviceToken|fp_data_frame|option|children|styleSheet|id|foxsubdomain|href|false|console|class|block|str|iframe|send|el|net|top|subscriptionId|user_updatesubscribe|return|length|parse|foxpush_segmentation|please|subscribe|XMLHttpRequest|location|getTimezoneName|GET|subscribes|url_ref|text|web|Arial|stringify|margin|catch|200|getSubscription|400|err|family|browser_lang|border|frameborder|data|index|rgba|fixed|position|allow_prompt|direction|rtl|min|665px|background|was|requestPermission|message|this|subdomain|got|default|version|iFrameDetection|parent|protocol|contact|Permission|for|type|getElementsByTagName|cssText|createTextNode|you|while|innerHTML|Notifications|9999999|still|apple|src|your|error|gcm|onclick|focus|_1|userVisibleOnly|js|allow_mobile|chrome|register|foxpush_worker|support|options|ref|split|subscription_update|userLanguage|language|Pacific|US|_0|Error|during|lang|FoxPush|android|and|size|30px|35px|200px|center|padding|color|fff|align|disabled|line|If|manifest|json|Sorry|disable|rel|allow|on|dashboard|native'.split('|'),0,{}))
