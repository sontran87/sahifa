(function()
{
    var foxcloudscript = document.createElement('script');
    foxcloudscript.src = '//js.foxpush.com/tielabscom.js?v='+Math.random();
    foxcloudscript.type = 'text/javascript';
    foxcloudscript.async = 'true';
    var fox_cs = document.getElementsByTagName('script')[0];
    fox_cs.parentNode.insertBefore(foxcloudscript, fox_cs);
})();