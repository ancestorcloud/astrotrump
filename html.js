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
            '<link href="/' + data.css + '" rel="stylesheet" type="text/css" />',
            '<link href="http://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">',

            '<script>!function(m,i,k,e,y){m.GoogleAnalyticsObject=k;m[k]||(m[k]=function(){' +
            '(m[k].q=m[k].q||[]).push(arguments)});m[k].l=+new Date;e=i.createElement("script");' +
            'y=i.scripts[0];e.src="//www.google-analytics.com/analytics.js";' +
            'y.parentNode.insertBefore(e,y)}(window,document,"ga");' +

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
