"use strict";
var TYPE_ARRAY = "[object Array]",
  TYPE_OBJECT = "[object Object]",
  _typeOf = function (e) {
    return Object.prototype.toString.call(e);
  },
  _deepClone = function (e) {
    return JSON.parse(JSON.stringify(e));
  },
  diff = function (e, t) {
    var n = 0 < arguments.length && void 0 !== e ? e : {},
      o = 1 < arguments.length && void 0 !== t ? t : {},
      r = {};
    return updateDiff(n, o, "", r), nullDiff(n, o, "", r), r;
  },
  updateDiff = function r(e, t, n, o) {
    var a = 0 < arguments.length && void 0 !== e ? e : {},
      i = 1 < arguments.length && void 0 !== t ? t : {},
      s = 2 < arguments.length && void 0 !== n ? n : "",
      l = 3 < arguments.length && void 0 !== o ? o : {};
    if (
      _typeOf(a) !== TYPE_ARRAY ||
      ((_typeOf(i) !== TYPE_ARRAY || a.length === i.length) &&
        _typeOf(i) === TYPE_ARRAY)
    )
      return (
        Object.entries(a).forEach(function (e) {
          var t = e[0],
            n = e[1],
            o = "" === s ? t : s + "." + t;
          _typeOf(a) === TYPE_ARRAY && (o = "" === s ? t : s + "[" + t + "]"),
            i.hasOwnProperty(t)
              ? (_typeOf(i[t]) === TYPE_OBJECT &&
                  _typeOf(a[t]) === TYPE_OBJECT) ||
                (_typeOf(i[t]) === TYPE_ARRAY && _typeOf(a[t]) === TYPE_ARRAY)
                ? r(a[t], i[t], o, l)
                : i[t] !== a[t] && (l[o] = n)
              : (l[o] = n);
        }),
        l
      );
    l[s] = a;
  },
  nullDiff = function o(e, t, n, r) {
    var a = 0 < arguments.length && void 0 !== e ? e : {},
      i = 1 < arguments.length && void 0 !== t ? t : {},
      s = 2 < arguments.length && void 0 !== n ? n : "",
      l = 3 < arguments.length && void 0 !== r ? r : {};
    if (
      _typeOf(a) !== TYPE_ARRAY ||
      ((_typeOf(i) !== TYPE_ARRAY || a.length === i.length) &&
        _typeOf(i) === TYPE_ARRAY)
    )
      return (
        Object.entries(i).forEach(function (e) {
          var t = e[0],
            n = "" === s ? t : s + "." + t;
          _typeOf(a) === TYPE_ARRAY && (n = "" === s ? t : s + "[" + t + "]"),
            a.hasOwnProperty(t)
              ? ((_typeOf(i[t]) === TYPE_OBJECT &&
                  _typeOf(a[t]) === TYPE_OBJECT) ||
                  (_typeOf(i[t]) === TYPE_ARRAY &&
                    _typeOf(a[t]) === TYPE_ARRAY)) &&
                o(a[t], i[t], n, l)
              : (l[n] = null);
        }),
        l
      );
  },
  name = "wxministore",
  version = "1.3.0",
  description = "小程序全局状态管理工具",
  main = "./lib/store.js",
  repository = {
    type: "git",
    url: "git+https://github.com/xiaoyao96/wxMiniStore",
  },
  scripts = {
    start: "rollup -c -w",
    build: "rollup -c",
    test: "mocha --require babel-core/register ./test/diff.test.js",
  },
  files = ["lib"],
  keywords = ["store", "wxstore", "wxministore"],
  author = "Leisure",
  license = "MIT",
  bugs = { url: "https://github.com/xiaoyao96/wxMiniStore/issues" },
  homepage = "https://github.com/xiaoyao96/wxMiniStore#readme",
  devDependencies = {
    "@rollup/plugin-json": "^4.0.0",
    "babel-core": "^6.26.3",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    chai: "^4.2.0",
    mocha: "^6.2.2",
    rollup: "^1.27.5",
    "rollup-plugin-babel": "^3.0.7",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-uglify": "^6.0.3",
  },
  pkg = {
    name: name,
    version: version,
    description: description,
    main: main,
    repository: repository,
    scripts: scripts,
    files: files,
    keywords: keywords,
    author: author,
    license: license,
    bugs: bugs,
    homepage: homepage,
    devDependencies: devDependencies,
  },
  _typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        },
  classCallCheck = function (e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  },
  createClass = (function () {
    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    return function (e, t, n) {
      return t && o(e.prototype, t), n && o(e, n), e;
    };
  })(),
  _extends =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
      }
      return e;
    },
  toConsumableArray = function (e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
      return n;
    }
    return Array.from(e);
  };
Object.keys ||
  (Object.keys = (function () {
    var r = Object.prototype.hasOwnProperty,
      a = !{ toString: null }.propertyIsEnumerable("toString"),
      i = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor",
      ],
      s = i.length;
    return function (e) {
      if (
        ("object" !== (void 0 === e ? "undefined" : _typeof(e)) &&
          "function" != typeof e) ||
        null === e
      )
        throw new TypeError("Object.keys called on non-object");
      var t = [];
      for (var n in e) r.call(e, n) && t.push(n);
      if (a) for (var o = 0; o < s; o++) r.call(e, i[o]) && t.push(i[o]);
      return t;
    };
  })()),
  Object.entries ||
    (Object.entries = function (e) {
      for (var t = Object.keys(e), n = t.length, o = new Array(n); n--; )
        o[n] = [t[n], e[t[n]]];
      return o;
    });
var Version = pkg.version;
console.log("当前wxministore版本：" + Version);
var Store = (function () {
    function O(e) {
      classCallCheck(this, O),
        (this.version = Version),
        (this.$state = {}),
        (this.$r = []);
      var t = e.openPart,
        n = void 0 !== t && t,
        u = e.behavior,
        o = e.methods,
        f = void 0 === o ? {} : o,
        r = e.pageLisener,
        a = void 0 === r ? {} : r,
        i = e.pageListener,
        s = e.nonWritable,
        l = void 0 !== s && s,
        c = e.debug,
        p = void 0 === c || c,
        i = i || a;
      (this.debug = p),
        (this.$state = {}),
        _typeOf(e.state) === TYPE_OBJECT && (this.$state = _deepClone(e.state)),
        (this.$r = []);
      function h(e, t) {
        var n = 1 < arguments.length && void 0 !== t ? t : {};
        e.$store = {};
        var o = n.useProp;
        n.hasOwnProperty("useProp") &&
          ((o && "string" == typeof o) || _typeOf(o) === TYPE_ARRAY
            ? (e.$store.useProp = [].concat(o))
            : (e.$store.useProp = [])),
          (e.$store.useStore = v(n)),
          v(n) &&
            (d.$r.push(e),
            e.$store.useProp
              ? e.setData({
                  $state: _filterKey(
                    d.$state,
                    e.$store.useProp,
                    function (e, t) {
                      return e === t;
                    }
                  ),
                })
              : e.setData({ $state: d.$state }));
      }
      function y(t) {
        var e = d.$r.findIndex(function (e) {
          return e === t;
        });
        -1 < e && d.$r.splice(e, 1);
      }
      this.$openPart = n;
      var d = this,
        g = [
          "data",
          "onLoad",
          "onShow",
          "onReady",
          "onHide",
          "onUnload",
          "onPullDownRefresh",
          "onReachBottom",
          "onShareAppMessage",
          "onPageScroll",
          "onTabItemTap",
        ],
        v = function (e) {
          return (
            (!0 === n &&
              !0 ===
                (0 < arguments.length && void 0 !== e ? e : {}).useStore) ||
            !n
          );
        },
        b = Page,
        m = Component;
      if (
        ((App.Page = function () {
          for (
            var e = arguments.length, t = Array(1 < e ? e - 1 : 0), n = 1;
            n < e;
            n++
          )
            t[n - 1] = arguments[n];
          var o =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          v(o) && (o.data = _extends({}, o.data || {}, { $state: d.$state })),
            Object.keys(f).forEach(function (t) {
              "function" != typeof f[t] ||
                g.some(function (e) {
                  return e === t;
                }) ||
                (o[t] = f[t]);
            });
          var r = o.onLoad;
          o.onLoad = function () {
            h(this, o), r && r.apply(this, arguments);
          };
          var a = o.onUnload;
          (o.onUnload = function () {
            y(this), a && a.apply(this, arguments);
          }),
            Object.keys(i).forEach(function (t) {
              var e;
              "function" == typeof i[t] &&
                g.some(function (e) {
                  return e === t;
                }) &&
                ((e = o[t]),
                (o[t] = function () {
                  i[t].apply(this, arguments), e && e.apply(this, arguments);
                }));
            }),
            b.apply(void 0, [o].concat(t));
        }),
        !l)
      )
        try {
          Page = App.Page;
        } catch (e) {}
      if (
        ((App.Component = function () {
          for (
            var e = arguments.length, t = Array(1 < e ? e - 1 : 0), n = 1;
            n < e;
            n++
          )
            t[n - 1] = arguments[n];
          var o =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          v(o) && (o.data = _extends({}, o.data || {}, { $state: d.$state })),
            Object.keys(f).forEach(function (t) {
              "function" != typeof f[t] ||
                g.some(function (e) {
                  return e === t;
                }) ||
                (o.methods || (o.methods = {}), (o.methods[t] = f[t]));
            }),
            u &&
              (o.behaviors = [u].concat(toConsumableArray(o.behaviors || [])));
          function r() {
            h(this, o), l && l.apply(this, arguments);
          }
          function a() {
            y(this), c && c.apply(this, arguments);
          }
          var i = o.lifetimes,
            s = void 0 === i ? {} : i,
            l = s.attached || o.attached,
            c = s.detached || o.detached;
          _typeOf(o.lifetimes) === TYPE_OBJECT
            ? ((o.lifetimes.attached = r), (o.lifetimes.detached = a))
            : ((o.attached = r), (o.detached = a)),
            m.apply(void 0, [o].concat(t));
        }),
        !l)
      )
        try {
          Component = App.Component;
        } catch (e) {}
    }
    return (
      createClass(O, [
        {
          key: "setState",
          value: function (e, t) {
            var n = 1 < arguments.length && void 0 !== t ? t : function () {};
            if (_typeOf(e) !== TYPE_OBJECT)
              throw new Error("setState的第一个参数须为object!");
            // this.debug && console.time && console.time("setState");
            this.debug;
            var o,
              r,
              a,
              i,
              s = this.$state,
              l = setData(e, s);
            (this.$state = l),
              0 < this.$r.length
                ? ((o = diff(l, s)),
                  //  this.debug &&
                  //      console.log("DIFF设置的值：", _deepClone(o)),

                  this.debug,
                  // this.debug,
                  0 < (r = Object.keys(o)).length
                    ? ((a = {}),
                      r.forEach(function (e) {
                        a["$state." + e] = o[e];
                      }),
                      (i = this.$r.map(function (t) {
                        if (t.$store.hasOwnProperty("useProp")) {
                          var n = _filterKey(
                            a,
                            t.$store.useProp,
                            function (e, t) {
                              return (
                                e === "$state." + t ||
                                !!e.match(
                                  new RegExp("^[$]state." + t + "[.|[]", "g")
                                )
                              );
                            }
                          );
                          return 0 < Object.keys(n).length
                            ? new Promise(function (e) {
                                t.setData(n, e);
                              })
                            : Promise.resolve();
                        }
                        return new Promise(function (e) {
                          t.setData(a, e);
                        });
                      })),
                      Promise.all(i).then(n))
                    : n())
                : n(),
              this.debug;
            // this.debug && console.timeEnd && console.timeEnd("setState");
          },
        },
        {
          key: "getState",
          value: function () {
            return _deepClone(this.$state);
          },
        },
        {
          key: "clearState",
          value: function (e) {
            var t = 0 < arguments.length && void 0 !== e ? e : function () {};
            this.debug && console.time && console.time("clearState");
            var n;
            (this.$state = {}),
              0 < this.$r.length
                ? ((n = this.$r.map(function (t) {
                    var n = { $state: {} };
                    return new Promise(function (e) {
                      t.setData(n, e);
                    });
                  })),
                  Promise.all(n).then(t))
                : t(),
              this.debug && console.timeEnd && console.timeEnd("clearState");
          },
        },
      ]),
      O
    );
  })(),
  _filterKey = function (t, e, n) {
    var o = 1 < arguments.length && void 0 !== e ? e : [],
      r = n,
      a = {};
    return (
      Object.keys(t)
        .filter(function (t) {
          return o.some(function (e) {
            return r(t, e);
          });
        })
        .forEach(function (e) {
          a[e] = t[e];
        }),
      a
    );
  },
  setData = function (e, t) {
    var n = _deepClone(t),
      o = _deepClone(e);
    return (
      Object.keys(o).forEach(function (e) {
        dataHandler(e, o[e], n);
      }),
      n
    );
  },
  dataHandler = function (e, t, n) {
    for (var o = pathHandler(e), r = n, a = 0; a < o.length - 1; a++)
      keyToData(o[a], o[a + 1], r), (r = r[o[a]]);
    r[o[o.length - 1]] = t;
  },
  pathHandler = function (e) {
    for (var t = "", n = [], o = 0, r = e.length; o < r; o++) {
      if ("[" === e[0]) throw new Error("key值不能以[]开头");
      e[o].match(/\.|\[/g) && (cleanAndPush(t, n), (t = "")), (t += e[o]);
    }
    return cleanAndPush(t, n), n;
  },
  cleanAndPush = function (e, t) {
    var n = cleanKey(e);
    "" !== n && t.push(n);
  },
  keyToData = function (e, t, n) {
    var o;
    "" !== e &&
      ((o = _typeOf(n[e])),
      "number" == typeof t && o !== TYPE_ARRAY
        ? (n[e] = [])
        : "string" == typeof t && o !== TYPE_OBJECT && (n[e] = {}));
  },
  cleanKey = function (e) {
    if (e.match(/\[\S+\]/g)) {
      var t = e.replace(/\[|\]/g, "");
      if (Number.isNaN(parseInt(t))) throw new Error("[]中必须为数字");
      return +t;
    }
    return e.replace(/\[|\.|\]| /g, "");
  };
module.exports = Store;
//# sourceMappingURL=store.js.map
