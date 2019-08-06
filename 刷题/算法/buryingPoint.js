(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = global || self, factory(global['JOYWEB-TRACKER'] = {}));
}(this, function (exports) { 'use strict';

  /*eslint-disable*/
  var MTA_CONFIG = {
    app_id: "",
    event_id: "",
    api_base: "https://pingtas.qq.com/pingd",
    prefix: "_mta_",
    version: "1.3.5",
    stat_share_app: !1,
    stat_pull_down_fresh: !1,
    stat_reach_bottom: !1
  };
  function getNetworkType(a) {
    wx.getNetworkType({
      success: function success(b) {
        a(b.networkType);
      }
    });
  }
  function getSystemInfo() {
    var a = wx.getSystemInfoSync();
    return {
      adt: encodeURIComponent(a.model),
      scl: a.pixelRatio,
      scr: a.windowWidth + "x" + a.windowHeight,
      lg: a.language,
      fl: a.version,
      jv: encodeURIComponent(a.system),
      tz: encodeURIComponent(a.platform)
    };
  }
  function getUID() {
    try {
      return wx.getStorageSync(MTA_CONFIG.prefix + "auid");
    } catch (a) {}
  }
  function setUID() {
    try {
      var a = getRandom();
      wx.setStorageSync(MTA_CONFIG.prefix + "auid", a);
      return a;
    } catch (b) {}
  }
  function getSID() {
    try {
      return wx.getStorageSync(MTA_CONFIG.prefix + "ssid");
    } catch (a) {}
  }
  function setSID() {
    try {
      var a = "s" + getRandom();
      wx.setStorageSync(MTA_CONFIG.prefix + "ssid", a);
      return a;
    } catch (b) {}
  }
  function getRandom(a) {
    for (var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; 1 < c; c--) {
      var d = Math.floor(10 * Math.random()),
        e = b[d];
      b[d] = b[c - 1];
      b[c - 1] = e;
    }
    for (c = d = 0; 5 > c; c++) {
      d = 10 * d + b[c];
    }return (a || "") + (d + "" + +new Date());
  }
  function getPagePath() {
    try {
      var a = getCurrentPages(),
        b = "/";
      0 < a.length && (b = a.pop().__route__);
      return b;
    } catch (c) {
      console.log("get current page path error:" + c);
    }
  }
  function getMainInfo() {
    var a = {
      dm: "wechat.apps.xx",
      url: getPagePath(),
      pvi: "",
      si: "",
      ty: 0
    };
    a.pvi = function () {
      var b = getUID();
      b || (b = setUID(), a.ty = 1);
      return b;
    }();
    a.si = function () {
      var a = getSID();
      a || (a = setSID());
      return a;
    }();
    return a;
  }
  function getBasicInfo() {
    var a = getSystemInfo();
    getNetworkType(function (a) {
      try {
        wx.setStorageSync(MTA_CONFIG.prefix + "ntdata", a);
      } catch (c) {}
    });
    a.ct = wx.getStorageSync(MTA_CONFIG.prefix + "ntdata") || "4g";
    return a;
  }
  function getExtentInfo() {
    var a = MTA.Data.userInfo;
    var b = [],
      c;
    for (c in a) {
      a.hasOwnProperty(c) && b.push(c + "=" + a[c]);
    }a = b.join(";");
    return {
      r2: MTA_CONFIG.app_id,
      r4: "wx",
      ext: "v=" + MTA_CONFIG.version + (null !== a && "" !== a ? ";ui=" + encodeURIComponent(a) : "")
    };
  }
  var MTA = {
    App: {
      init: function init(a) {
        "appID" in a && (MTA_CONFIG.app_id = a.appID);
        "eventID" in a && (MTA_CONFIG.event_id = a.eventID);
        "statShareApp" in a && (MTA_CONFIG.stat_share_app = a.statShareApp);
        "statPullDownFresh" in a && (MTA_CONFIG.stat_pull_down_fresh = a.statPullDownFresh);
        "statReachBottom" in a && (MTA_CONFIG.stat_reach_bottom = a.statReachBottom);
        setSID();
        "lauchOpts" in a && (MTA.Data.lanchInfo = a.lauchOpts, MTA.Data.lanchInfo.landing = 1);
      }
    },
    Page: {
      init: function init() {
        var a = getCurrentPages()[getCurrentPages().length - 1];
        a.onShow && !function () {
          var b = a.onShow;
          a.onShow = function () {
            MTA.Page.stat();
            b.apply(this, arguments);
          };
        }();
        MTA_CONFIG.stat_pull_down_fresh && a.onPullDownRefresh && !function () {
          var b = a.onPullDownRefresh;
          a.onPullDownRefresh = function () {
            MTA.Event.stat(MTA_CONFIG.prefix + "pulldownfresh", {
              url: a.__route__
            });
            b.apply(this, arguments);
          };
        }();
        MTA_CONFIG.stat_reach_bottom && a.onReachBottom && !function () {
          var b = a.onReachBottom;
          a.onReachBottom = function () {
            MTA.Event.stat(MTA_CONFIG.prefix + "reachbottom", {
              url: a.__route__
            });
            b.apply(this, arguments);
          };
        }();
        MTA_CONFIG.stat_share_app && a.onShareAppMessage && !function () {
          var b = a.onShareAppMessage;
          a.onShareAppMessage = function () {
            MTA.Event.stat(MTA_CONFIG.prefix + "shareapp", {
              url: a.__route__
            });
            return b.apply(this, arguments);
          };
        }();
      },
      stat: function stat() {
        if ("" != MTA_CONFIG.app_id) {
          var a = [],
            b = getExtentInfo(),
            c = [getMainInfo(), b, getBasicInfo()];
          MTA.Data.lanchInfo && (c.push({
            ht: MTA.Data.lanchInfo.scene,
            rdm: "/",
            rurl: MTA.Data.lanchInfo.path
          }), MTA.Data.lanchInfo.query && MTA.Data.lanchInfo.query._mta_ref_id && c.push({
            rarg: MTA.Data.lanchInfo.query._mta_ref_id
          }), 1 == MTA.Data.lanchInfo.landing && (b.ext += ";lp=1", MTA.Data.lanchInfo.landing = 0));
          c.push({
            rand: +new Date()
          });
          b = 0;
          for (var d = c.length; b < d; b++) {
            for (var e in c[b]) {
              c[b].hasOwnProperty(e) && a.push(e + "=" + ("undefined" == typeof c[b][e] ? "" : c[b][e]));
            }
          }wx.request({
            url: MTA_CONFIG.api_base + "?" + a.join("&").toLowerCase()
          });
        }
      }
    },
    Event: {
      stat: function stat(a, b) {
        if ("" != MTA_CONFIG.event_id) {
          var c = [],
            d = getMainInfo(),
            e = getExtentInfo();
          d.dm = "wxapps.click";
          d.url = a;
          e.r2 = MTA_CONFIG.event_id;
          var f = "undefined" === typeof b ? {} : b;
          var k = [],
            g;
          for (g in f) {
            f.hasOwnProperty(g) && k.push(encodeURIComponent(g) + "=" + encodeURIComponent(f[g]));
          }f = k.join(";");
          e.r5 = f;
          f = 0;
          d = [d, e, getBasicInfo(), {
            rand: +new Date()
          }];
          for (e = d.length; f < e; f++) {
            for (var h in d[f]) {
              d[f].hasOwnProperty(h) && c.push(h + "=" + ("undefined" == typeof d[f][h] ? "" : d[f][h]));
            }
          }wx.request({
            url: MTA_CONFIG.api_base + "?" + c.join("&").toLowerCase()
          });
        }
      }
    },
    Data: {
      userInfo: null,
      lanchInfo: null
    }
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  /**
   * @ Dsec: utilities
   * @ Author: lizhiyang1
   * @ Date: 2019/2/28
   */

  var moduleName = '@weus/joyweb-tracker';

  var clientSide = typeof window !== 'undefined';
  var isString = function isString(obj) {
    return typeof obj === 'string';
  };
  var isTrueEmpty = function isTrueEmpty(obj) {
    return obj === undefined || obj === null || obj === '';
  };

  /**
   * 控制台打印错误信息
   * @param  {Error} error
   * @returns undefined
   */
  var errorLog = function errorLog(error) {
    var message = isString(error) ? error : error.message;
    console.error(moduleName + '\uFF1A' + message);
  };

  /**
   * @ Dsec: 一个简单的队列
   * @ Author: lizhiyang1
   * @ Date: 2019/7/10
   */

  var Queue = function () {
    function Queue() {
      classCallCheck(this, Queue);

      this.count = 0; // 队列的大小
      this.lowestCount = 0; // 队列的第一个元素
      this.items = {}; // 使用对象存储一个队列
    }

    /**
     * 将元素添加到队列
     * @element {String|Number|Object} 要添加的元素
     */


    createClass(Queue, [{
      key: 'enqueue',
      value: function enqueue(element) {
        this.items[this.count] = element;
        this.count++;
      }

      /**
       * 将元素从队列移除
       * @returns {String|Number|Object} 移除的元素
       */

    }, {
      key: 'dequeue',
      value: function dequeue() {
        if (this.isEmpty()) {
          return undefined;
        }
        var result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
      }

      /**
       * 清空队列
       * @returns {Undefined}
       */

    }, {
      key: 'clear',
      value: function clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
      }

      /**
       * 判断队列是否为空
       * @returns {Boolean} 队列是否为空
       */

    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        return this.count - this.lowestCount === 0;
      }
    }]);
    return Queue;
  }();

  /**
   * @ Dsec: 小程序埋点统计
   * @ Author: lizhiyang1
   * @ Date: 2019/3/31
   */

  var Tracker = function () {
    function Tracker() {
      classCallCheck(this, Tracker);

      this.init = false; // 是否已初始化配置
      this.enable = true; // 默认可以报送
    }

    createClass(Tracker, [{
      key: 'config',
      value: function config(cfg) {
        // 验证重复配置
        if (this.init) {
          var error = new Error('不能重复初始化埋点脚本!');
          errorLog(error);
          return error;
        }

        // 验证参数格式

        var _ref = cfg || {},
          enable = _ref.enable,
          options = objectWithoutProperties(_ref, ['enable']);

        // 报送配置


        if (enable === false) {
          this.enable = false;
          return;
        }

        // 插入埋点代码
        this.init = true;
        MTA.App.init(options);
      }
    }, {
      key: 'page',
      value: function page() {
        if (this.enable) {
          MTA.Page.stat();
        }
      }
    }, {
      key: 'event',
      value: function event(payload) {
        var _ref2 = payload || {},
          name = _ref2.name,
          param = _ref2.param;

        if (this.enable) {
          MTA.Event.stat(name, param);
        }
      }
    }]);
    return Tracker;
  }();

  var tracker = new Tracker();

  /**
   * @ Dsec: utilities
   * @ Author: lizhiyang1
   * @ Date: 2019/2/28
   */

    // 在页面中插入埋点脚本
  var insertScript = function insertScript(src) {
      var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments[2];

      var script = document.createElement('script');
      var target = document.getElementsByTagName('script')[0];
      script.src = src;
      Object.keys(attr).forEach(function (key) {
        script.setAttribute(key.toLowerCase(), attr[key]);
      });
      target.parentNode.insertBefore(script, target);
      script.onload = function () {
        if (cb) {
          cb();
        }
      };
    };

  /**
   * @ Dsec: 腾讯云分析
   * @ Author: lizhiyang1
   * @ Date: 2019/2/28
   */

  var MTA$1 = function () {
    function MTA() {
      classCallCheck(this, MTA);
    }

    createClass(MTA, null, [{
      key: 'init',
      value: function init(_ref, cb) {
        var sid = _ref.sid,
          cid = _ref.cid;

        insertScript('//pingjs.qq.com/h5/stats.js?v2.0.4', {
          name: 'MTAH5',
          sid: sid,
          cid: cid
        }, function () {
          if (cb) {
            cb();
          }
        });
      }
    }, {
      key: 'page',
      value: function page() {
        if (window.MtaH5) {
          window.MtaH5.pgv();
        }
      }
    }, {
      key: 'event',
      value: function event(eid, param) {
        if (window.MtaH5) {
          window.MtaH5.clickStat(eid, param);
        }
      }
    }]);
    return MTA;
  }();

  /**
   * @ Dsec: 金科BDC
   * @ Author: lizhiyang1
   * @ Date: 2019/2/28
   */

  var BDC = function () {
    function BDC() {
      classCallCheck(this, BDC);
    }

    createClass(BDC, null, [{
      key: 'init',
      value: function init(_ref, cb) {
        var appId = _ref.appId,
          appKey = _ref.appKey,
          uuid = _ref.uuid;

        insertScript('//bdc.jd.com/dist/track.min.js', {
          name: 'MTK',
          appId: appId,
          appKey: appKey,
          uuid: uuid
        }, function () {
          if (cb) {
            cb();
          }
        });
      }
    }, {
      key: 'page',
      value: function page() {
        if (window.MTK) {
          window.MTK.amendment();
        }
      }
    }, {
      key: 'event',
      value: function event(eid, param) {
        if (window.MTK) {
          window.MTK.clickStat(eid, param);
        }
      }
    }]);
    return BDC;
  }();

  /**
   * @ Dsec: 金融奇点
   * @ Author: lizhiyang1
   * @ Date: 2019/3/2
   * @ Document: https://cf.jd.com/pages/viewpage.action?pageId=143941206
   */

  var QiDian = function () {
    function QiDian() {
      classCallCheck(this, QiDian);
    }

    createClass(QiDian, null, [{
      key: 'init',

      // Todo uuid
      value: function init(_ref, cb) {
        var moduleName = _ref.moduleName;

        window._qd = window._qd || {};
        window._qd.module = moduleName;
        insertScript('//jrclick.jd.com/qidian.js', {}, function () {
          if (cb) {
            cb();
          }
        });
      }
    }, {
      key: 'page',
      value: function page(url, to) {
        if (window.__qd__) {
          window.__qd__.page(url, to);
        }
      }
    }, {
      key: 'event',
      value: function event(eid, param) {
        if (window.__qd__) {
          window.__qd__.event(eid, param);
        }
      }
    }]);
    return QiDian;
  }();

  /**
   * @ Dsec: 埋点统计
   * @ Author: lizhiyang1
   * @ Date: 2019/2/27
   */

  var observe = Symbol('observe');
  var makeUp = Symbol('make_up');

  var Tracker$1 = function () {
    function Tracker() {
      classCallCheck(this, Tracker);

      this.init = false; // 是否已初始化配置
      this.debug = true; // debug 模式，可以在控制台打印错误日志
      this.enable = true; // 默认开启报送
      this.scriptOnload = false; // 是否已加载完埋点脚本
      this.eventQueue = new Queue(); // 一个事件队列，防止脚本没初始化时调用event方法导致数据不准
    }

    /**
     * [私有方法] 监听埋点脚本插入状态
     */


    createClass(Tracker, [{
      key: observe,
      value: function value(obj) {
        var _this = this;

        var keys = Object.keys(obj);
        keys.forEach(function (item) {
          var val = obj[item];
          Object.defineProperty(obj, item, {
            get: function get() {
              return val;
            },
            set: function set(newVal) {
              val = newVal;
              var loadedCount = keys.filter(function (key) {
                return obj[key];
              });
              // 所有的属性都变为true，则全部加载完成
              if (loadedCount.length === keys.length) {
                _this.scriptOnload = true;
                _this[makeUp]();
              }
            }
          });
        });
      }

      /**
       * [私有方法] 补埋点
       */

    }, {
      key: makeUp,
      value: function value() {
        var eventQueue = this.eventQueue;

        while (!eventQueue.isEmpty()) {
          var item = eventQueue.dequeue();
          this.event(item);
        }
      }

      /**
       * 埋点配置，只能调用一次
       * @param {Object}  cfg - 埋点配置，详见README.md
       * @param {String}  cfg.module - 奇点应用的模块名
       * @param {Boolean} [cfg.debug = true] - 是否开启调试
       * @param {Boolean} [cfg.enable = true] - 是否开启上报
       * @param {Object}  [cfg.MTA] - MTA的配置
       * @param {String}  [cfg.MTA.sid] - MTA sid
       * @param {String}  [cfg.MTA.cid] - MTA cid
       * @param {Object}  [cfg.BDC] - BDC的配置
       * @param {String}  [cfg.BDC.appId] - BDC的应用id
       * @param {String}  [cfg.BDC.appKey] - BDC的应用key
       * @param {String}  [cfg.uuid] - 标记用户的唯一id, 目前只有BDC支持
       * @returns {undefined|Error|String}
       */

    }, {
      key: 'config',
      value: function config(cfg) {
        // 验证浏览器端环境
        if (!clientSide) {
          return;
        }

        var _ref = cfg || {},
          debug = _ref.debug,
          enable = _ref.enable,
          uuid = _ref.uuid,
          MTA = _ref.MTA,
          BDC$1 = _ref.BDC,
          moduleName = _ref.module;

        // 验证重复配置


        if (this.init) {
          var error = new Error('不能重复初始化埋点脚本!');
          if (this.debug) {
            errorLog(error);
          }
          return error;
        }

        // 是否启动调试
        if (debug === false) {
          this.debug = false;
        }

        // 是否关闭报送
        if (enable === false) {
          this.enable = false;
        }

        if (isTrueEmpty(moduleName)) {
          var _error = new Error('config() 方法入参校验不通过，需包含 module 属性');
          if (this.debug) {
            errorLog(_error);
          }
          return _error;
        }

        // 标记初始化
        this.init = true;

        // 监听脚本加载状态
        var scriptLoadStatus = { qiDian: false };
        if (MTA) {
          scriptLoadStatus.mta = false;
        }
        if (BDC$1) {
          scriptLoadStatus.bdc = false;
        }
        this[observe](scriptLoadStatus);

        // 插入埋点代码
        QiDian.init({
          moduleName: moduleName,
          uuid: uuid
        }, function () {
          scriptLoadStatus.qiDian = true;
        });

        // 腾讯云分析配置
        if (MTA) {
          var sid = MTA.sid,
            cid = MTA.cid;

          if (isTrueEmpty(sid) || isTrueEmpty(cid)) {
            var _error2 = new Error('MTA 配置错误，需包含 sid 和 cid 属性');
            if (this.debug) {
              errorLog(_error2);
            }
            return _error2;
          }

          // 插入MTA埋点代码
          MTA$1.init({ sid: sid, cid: cid }, function () {
            scriptLoadStatus.mta = true;
          });
        }

        // BDC配置
        if (BDC$1) {
          var appId = BDC$1.appId,
            appKey = BDC$1.appKey;

          if (isTrueEmpty(appId) || isTrueEmpty(appKey)) {
            var _error3 = new Error('BDC 配置错误，需包含 appId 和 appKey 属性');
            if (this.debug) {
              errorLog(_error3);
            }
            return _error3;
          }

          // 插入BDC埋点代码
          BDC.init({ appId: appId, appKey: appKey, uuid: uuid }, function () {
            scriptLoadStatus.bdc = true;
          });
        }
      }

      /**
       * 报送PV
       * @param  {String} url - 页面的地址
       * @param  {String} [to]  - 通常可不传，如果有则表示页面的地址，第一个参数为跳转前的地址
       * @return {undefined|Error}
       */

    }, {
      key: 'page',
      value: function page(url, to) {
        // 验证浏览器端环境
        if (!clientSide) {
          return;
        }

        // 验证参数
        if (isTrueEmpty(url)) {
          var error = new Error('page() 方法入参不能为空，需传入跳转后的页面地址');
          if (this.debug) {
            errorLog(error);
          }
          return error;
        }

        // 因为平台方法中有对应的判断逻辑，所以这里不再根据配置判断报送的平台
        if (this.enable) {
          QiDian.page(url, to); // 奇点
          MTA$1.page(); // MTA
          BDC.page(); // BDC
        }
      }

      /**
       * 报送事件
       * @param  {Object} payload - 事件描述对象
       * @param  {String} payload.name - 事件名称
       * @param  {String} [payload.desc] - 事件描述，会根据描述生成埋点文档
       * @param  {Object} [payload.param] - 事件参数
       * @return {undefined|Error}
       */

    }, {
      key: 'event',
      value: function event(payload) {
        // 验证浏览器端环境
        if (!clientSide) {
          return;
        }

        // 验证参数格式

        var _ref2 = payload || {},
          name = _ref2.name,
          param = _ref2.param;

        if (isTrueEmpty(name)) {
          var error = new Error('event() 方法入参校验不通过，需包含 name 属性');
          if (this.debug) {
            errorLog(error);
          }
          return error;
        }

        if (!/^[\dA-Za-z_]*$/.test(name)) {
          var _error4 = new Error('event() 方法入参校验不通过，name 属性只允许英文数字下划线');
          if (this.debug) {
            errorLog(_error4);
          }
          return _error4;
        }

        if (param && Object.prototype.toString.call(param) !== '[object Object]') {
          var _error5 = new Error('event() 方法入参校验不通过，param 属性只允许 Object {key: value} 类型');
          if (this.debug) {
            errorLog(_error5);
          }
          return _error5;
        }

        if (this.enable) {
          // 未初始化，先存到事件队列中
          if (!this.scriptOnload) {
            this.eventQueue.enqueue({
              name: name,
              param: param
            });
            return;
          }

          // 已始化，上报事件
          QiDian.event(name, param); // 奇点
          MTA$1.event(name, param); // MTA
          BDC.event(name, param); // BDC
        }
      }
    }]);
    return Tracker;
  }();

  var tracker$1 = new Tracker$1();

  exports.miniProgramTracker = tracker;
  exports.default = tracker$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
