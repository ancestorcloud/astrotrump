module.exports = {
  dev: function (data) {
    return {
      'index.html': [
        '<html>',
          '<head>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<link href="http://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">',
          '</head>',
          '<body>',
            '<div id="app"></div>',
            '<script src="/' + data.main + '"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  },

  prod: function (data) {
    var config = {
      title: 'Cousin Trump',
      favicon: '/assets/icons/favicon.ico',
      gaId: 'UA-47141819-6'
    }

    return {
      'index.html': [
        '<html>',
          '<head>',
            '<script>' +
              '(function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a);' +
              'c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0];' +
              'c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)};' +
              '_.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)})' +
              '(window,document,"script","56c35a2a3f17c6945c000be5");' +
            '</script>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<title>' + config.title + '</title>',
            '<link rel="icon" href="' + config.favicon + '" type="image/x-icon" />',
            '<link rel="image_src" href="/images/are_you_related_trump.jpg" / >',
            '<link href="/' + data.css + '" rel="stylesheet" type="text/css" />',
            '<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">',
            '<script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){' +
            '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' +
            'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' +
            '})(window,document,"script","//www.google-analytics.com/analytics.js","ga");' +

            'ga("create", "' + config.gaId + '", "auto");</script>',
          '</head>',
          '<body>',
            '<div id="app"></div>',
            '<script src="/' + data.main + '"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  }
}
