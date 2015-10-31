重启
===

完全重写了一遍这个博客...

原先用改造过的 [Foundation](http://foundation.zurb.com/) 和自己折腾的前端路由, 没有静态资源管理;
现在样式直接用 Sass 从零写,
用了 [Vue.js](vuejs.org) 和 [Vue-Router](https://github.com/vuejs/vue-router),
用 [Tam](https://github.com/arrowrowe/tam) 和 [TamHTML](https://github.com/arrowrowe/tam-html) 来管理静态资源. (说得好像有多少资源一样......)

现在总共只有三个文件,
- [index.html](https://github.com/arrowrowe/arrowrowe.github.io/blob/dev/src/index.html),
- [index.js](https://github.com/arrowrowe/arrowrowe.github.io/blob/dev/assets/index.js),
- [index.scss](https://github.com/arrowrowe/arrowrowe.github.io/blob/dev/assets/index.scss).

原先的文章都清零了,
~~Disqus 的评论也没加,~~ 重新加了 Disqus,
暂时先这样了......

2015.10.31
