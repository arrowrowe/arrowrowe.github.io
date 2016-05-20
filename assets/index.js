(function () {

  'use strict';

  var optionDisqus = window.optionDisqus = {
    path: '',
    title: ''
  };
  var initDisqus = window.initDisqus = function () {
    ('DISQUS' in window) && DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = 'arrowrowe.github.io/#!' + optionDisqus.path;
        this.page.url = window.location.href;
        this.page.title = optionDisqus.title;
      }
    });
  };

  var matchAll = function (pattern, src) {
    var match = null;
    var matches = [];
    while (match = pattern.exec(src)) {
      matches.push(match);
    }
    return matches;
  };
  const identity = function (x) { return x; };

  var scriptLoaders = {
    mathjax: {
      step: 0,
      load: function () {
        if (this.step === 0) {
          this.step = 1;
          return new Promise(function (resolve) {
            $.getScript("https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML", resolve);
          });
        }
      },
      render: function () {
        if (this.step === 1) {
          this.step = 2;
          MathJax.Hub.Config({
            tex2jax: {
              inlineMath: [['($','$)']],
              displayMath: [['[$','$]']]
            },
          });
        } else {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
      }
    }
  };


  marked.setOptions({
    highlight: function (code, lang, callback) {
      Rainbow.color(code, lang, function (highlighted_code) {
        callback(null, highlighted_code);
      });
    }
  });
  var router = new VueRouter();
  router.map({
    '/blog/*article': {
      component: {
        template: '<article v-html="$parent.content"></article>'
      }
    }
  });
  router.redirect({'*': '/home'});
  router.alias({
    '/:nav': '/blog/general/:nav'
  });
  router.afterEach(function (transition) {
    $.get(transition.to.path.substr(1) + '.md', function (raw) {

      var scripts = matchAll(/^ *<!-- *script: *(.+?) *-->$/mig, raw).map(function (match) {
        return scriptLoaders[match[1].toLowerCase()];
      }).filter(identity);

      Promise.all([
        new Promise(function (resolve, reject) {
          marked(raw, function (err, content) {
            if (err) {
              reject(err);
              return;
            }
            router.app.content = content;
            Vue.nextTick(resolve);
          });
        })
      ].concat(scripts.map(function (script) {
        return script.load();
      })))
        .then(function () {
          console.log('scripts loaded');
          optionDisqus.path = transition.to.path;
          optionDisqus.title = $('h1').text();
          document.title = optionDisqus.title + ' | arrowrowe';
          initDisqus();
          return Promise.all(scripts.map(function (script) {
            return script.render();
          }));
        })
        .then(function () {
          console.log('scripts rendered');
        })
        .catch(function (err) {
          console.warn(err);
        });

    });
  });
  router.start(Vue.extend({
    data: function () {
      return {
        navItems: [
          {caption: 'Home', path: '/home'},
          {caption: 'About', path: '/about'},
          {caption: 'Archive', path: '/archive'},
          {caption: 'Tags', path: '/tags'},
          {caption: 'Links', path: '/links'}
        ],
        content: ''
      };
    }
  }), '.wrap');

})();
