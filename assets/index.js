(function () {

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

  Vue.filter('marked', marked);
  var router = new VueRouter();
  router.map({
    '/blog/*article': {
      component: {
        template: '<article v-html="$parent.content | marked"></article>'
      }
    }
  });
  router.redirect({'*': '/home'});
  router.alias({
    '/:nav': '/blog/general/:nav'
  });
  router.afterEach(function (transition) {
    $.get(transition.to.path.substr(1) + '.md', function (content) {
      router.app.content = content;
      Vue.nextTick(function () {
        optionDisqus.path = transition.to.path;
        optionDisqus.title = $('h1').text();
        document.title = optionDisqus.title + ' | arrowrowe';
        initDisqus();
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
