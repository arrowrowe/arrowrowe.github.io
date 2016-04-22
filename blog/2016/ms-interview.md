微软 2016 年 4 月笔试报告
===

> 原题出处见 [微软2016校园招聘4月在线笔试](http://hihocoder.com/contest/mstest2016april1/problems) ([hihoCoder](http://hihocoder.com/)).

> 相关代码和测试用例见仓库 [arrowrowe/ms-2016-april-hiho](https://github.com/arrowrowe/ms-2016-april-hiho).

## A. Font Size

> [Font Size](http://hihocoder.com/contest/mstest2016april1/problem/1). 通过率 59% = 2613 / 4358.
> 源码在 [这里](https://github.com/arrowrowe/ms-2016-april-hiho/blob/master/a-font-size/app.py).

直接遍历也可以 AC, 还是~~象征性地~~二分了一下...

## B. 403 Forbidden

> [403 Forbidden](http://hihocoder.com/contest/mstest2016april1/problem/2), 通过率 9% = 220 / 2382.
> 源码在 [这里](https://github.com/arrowrowe/ms-2016-april-hiho/blob/master/b-403-forbidden/app.py).

写出来没有难度, 直接比较字符串各种玩 Python 语法糖可以写得很漂亮, 然后只拿了 20 分, 其余点都超时了... 改为逐位 xor 以后提到了 40 分, 详见源码.

~~所以到底怎么满分啊 orz...~~

## C. Demo Day

> [Demo Day](http://hihocoder.com/contest/mstest2016april1/problem/3), 通过率 26% = 428 / 1602.
> 源码在 [这里](https://github.com/arrowrowe/ms-2016-april-hiho/blob/master/c-demo-day/app.py).

直接动态规划, 求要经过给定点所需翻转的最小格数. 要考虑从上或从左来, 从上来时又要考虑从上一直下来还是原本从左的拐了一下下来, 从左来时也类似.

考虑某格 A 和它上方的 T, 左方的 L, 按 0 和 1 处理布朗值, 伪代码:
```
从上到 A = 是否需要翻转 A + min(从上到 T, 从左到 T + 是否需要翻转 T 的右方即 A 的右上方)
从左到 A = 是否需要翻转 A + min(从左到 L, 从上到 L + 是否需要翻转 L 的下方即 A 的左下方)
到 A = min(从上到 A, 从左到 A)
```

再考虑边界 (叙述上或左边界时均不考虑初始点),
- 到初始点 (左上角) 直接定义为 1 或 0, 仅取决于是否需要翻转它自己.
- 从上到上边界点和从左到左边界点定义为正无穷. (计算时按总格数即可.)
- 从左到上边界点仅需叠加是否需要翻转它自己.
- 从上到左边界第一点 (即第二行第一列) 需考虑是否需要翻转它的右上方 (即第一行第二列).
- 从上到左边界其余点仅需叠加是否需要翻转它自己.

然后定义二维数组 `pack` 描述 `pack(i, j) = {从上到点 (i, j), 从左到点 (i, j)}` 跑一遍就好了.

## D. Building in Sandbox

> [Building in Sandbox](http://hihocoder.com/contest/mstest2016april1/problem/4), 通过率 5% = 24 / 458.
> 源码在 [这里](https://github.com/arrowrowe/ms-2016-april-hiho/blob/master/d-building-in-sandbox/app.py).

参考了 [可以从哪些思路做微软2017实习生笔试题最后一题？ - 夏洋的回答](https://www.zhihu.com/question/42406890/answer/94388263), 这里复述一下:
- 第一遍直接把方块都摆好, 整个世界由方块和未标记的死块组成.
- 从顶做一次 floodfill, 把与顶部连通的死块改为活块.
- 然后倒过来检查, 一个个拆掉.
  - 检查六个邻居里有无方块.
  - 检查六个邻居里有无活块.
  - 检查出问题就直接报错结束, 无误就拆掉 (改为死块), 然后从这点出发做一次 floodfill.
- 全部无误就通过了.

有些细节可以稍微处理下, 比如:
- 可以多遍历一遍方块列表以先获得世界规格.
- 检查有无方块邻居时, 自己高度为 1 也可以.
- 检查有无活块邻居时, 自己达到最高高度也可以.
- 第 1 块 (倒过来遍历时是最后 1 块) 只需检查高度是否为 1, 不用拆. (实际上前 7 块拆了之后都不需要做 floodfill, 前 6 块只需检查有无方块邻居, 不过这里浪费一点儿似乎影响也不大.)

## 小结

A 题送分, B 题做起来简单拿高分难, C 题慢慢分析, D 题当时完全不会 - -...
