module.exports = {
  dev: function (data) {
    return {
      'index.html': [
        '<html>',
          '<head>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
      title: 'AncestorCloud',
      favicon: '/assets/icons/favicon.ico',
      gaId: ''
    }

    return {
      'index.html': [
        '<html>',
          '<head>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<title>' + config.title + '</title>',
            '<link rel="icon" href="' + config.favicon + '" type="image/x-icon" />',
            '<link href="/' + data.css + '" rel="stylesheet" type="text/css" />',

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
