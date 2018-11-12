/**
 * Created by cp on 2017/9/19.
 */
var secretSeed = "123456789012345678901234";
var APP_KEY_SEED = "terjoycht2014!@#";
var sessionKey = "68497025";
var APP_TYPE = "20";
var APP_VERSION = "388";
var APP_IVERSION = "2";
var sessionId = "9acf28b81c0521d763bf11603a11c15d";
//import {nctUrl} from '../config'
import $ from 'jquery'

//var CryptoJS = require('crypto-js');
//require('@/assets/js/jquery.cookie');

function produce3DesKey(key) {
  if (key == undefined || key == null || key == '')
    return secretSeed;
  if (key.length >= 24) {
    return key.substr(0, 24);
  }
  return key + secretSeed.substr(key.length);
}

function produceSessionKey(key) {
  return CryptoJS.MD5(APP_KEY_SEED + key).toString().toUpperCase();
}

/**
 * 用3des加密，结果采用base64编码返回
 * @param key
 * @param plainText
 * @returns {*}
 */
function encryptWith3DesAndEncodeBase64(key, plainText) {
  if (key == null || key == '' || plainText == null || plainText == '') {
    return '';
  }
  var ckey = produce3DesKey(key);
  var result = CryptoJS.TripleDES.encrypt(plainText, CryptoJS.enc.Utf8.parse(ckey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return result.toString();
}

/**
 * 进行base64解码
 * @param bs64
 * @returns {*}
 */
function decodeBase64(bs64) {
  var decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(bs64));
  return decoded;
}

/**
 * 进行base64编码
 * @param
 * @returns {*}
 */
function encodeBase64(str) {
  var encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
  return encoded;
}

/**
 * 进行3des解密，解密之前，会将密文进行base64解码
 * @param key
 * @param cryptedBs64
 * @returns {*}
 */
function decodeBase64AndDecryptWith3Des(key, cryptedBs64) {
  if (key == null || key == '' || cryptedBs64 == null || cryptedBs64 == '') {
    return '';
  }
  var ckey = produce3DesKey(key);
  var result = CryptoJS.TripleDES.decrypt(
    cryptedBs64, CryptoJS.enc.Utf8.parse(ckey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  return result.toString(CryptoJS.enc.Utf8)
}

/**
 * 对服务端返回的secretKey进行解密，目前通过与服务端交互实现
 * @param secretKey
 */
function decryptSecretKey(tjid, sessionkey, secretKey, succcessfunc, failfunc) {
  var crypted = encryptWith3DesAndEncodeBase64(sessionkey, secretKey);
  $.ajax({
    type: "get",
    url: nctUrl + "/gen/unc",
    data: {
      tjid: tjid,
      crypted: crypted
    },
    dataType: "json",
    success: function (obj) {
      succcessfunc(obj);
    },
    error: function (xhr, info) {
      failfunc(info);
    }
  });
}

/**
 * 发送请求到服务端，进行秘钥的产生，产生的秘钥包括RSA密钥对，和进行秘钥交换通讯的会话秘钥
 * @param tjid
 * @param successfunc
 * @param errorfunc
 */
function generateKey(tjid, successfunc, errorfunc) {
  $.ajax({
    type: "get",
    url: nctUrl + "/gen/key",
    data: {
      "tjid": tjid
    },
    dataType: "json",
    success: function (obj) {

      successfunc(obj);
    },
    error: function (req, info) {

      errorfunc(info);
    }
  });
}

/***
 * 根据给出的数据产生签名
 * @param sessionid
 * @param timestamp
 * @param random
 * @param crypted 加密之后的请求参数
 * @returns {string}
 */
function produceSign(sessionid, timestamp, random, crypted) {
  var arr = new Array();
  arr.push("sessionid=" + sessionid);
  arr.push("apptype=" + APP_TYPE);
  arr.push("iversion=" + APP_IVERSION);
  arr.push("versioncode=" + APP_VERSION);
  if (crypted != "")
    arr.push("data=" + crypted);
  arr.push("timestamp=" + timestamp);
  arr.push("random=" + random);
  arr.push("secretkey=" + produceSessionKey($.cookie("sessionKey")));
  arr.sort();

  var signString = "[" + arr.join() + "]";
  return CryptoJS.MD5(signString).toString().toUpperCase();
}

function failfunc(info) {
  alert(info);
}

/**
 * 添加公共的头部信息
 */
function addHeaders(xhr) {
  xhr.setRequestHeader("apptype", APP_TYPE);
  xhr.setRequestHeader("iversion", APP_IVERSION);
  xhr.setRequestHeader("versioncode", APP_VERSION);
}
export function yshlogin(username, pass, resultfunc) {
  $.ajax({
    //url:  "api/bgm5/person2",
    //url:"http://localhost:8080/guihua/selectbuild",
    url:  "http://localhost:8080/bgm5/person3",
    type: "post",
    data: {"username": username, "userpass": pass},
    dataType: "json",
    //beforeSend: function (xhr) {
    // addHeaders(xhr);
    //},
    error: function(error) {//function (xhr, info) {
      //resultfunc(false, info);
      alert(error);
    },
    success: function (data,status) {
      //alert(this.memberId+","+this.password1);
      var  mtext=data[0].age+","+data[0].id+","+data[0].name;//xhr.responseText;
      mtext+="\n"+data[1].age+","+data[1].id+","+data[1].name;
      alert("成功执行了：\n"+mtext+","+status);
      //将数据共享中vuex中，然后循环读取
      var i=0;
      var nLen=data.length;
      mtext="";
      for (i=0;i<nLen;i++){
        mtext+="\n"+data[i].id+"_"+data[i].age+"_"+data[i].name;
      }
      alert("循环获取的数据:\n"+mtext);
    }
  });
}
export function yshloginPost(username, pass, resultfunc) {
  $.ajax({
    //url:  "api/bgm5/person2",
    url:  "http://localhost:8080/bgm5/person2",
    type: "post",
    data: {"username": username, "userpass": pass},
    dataType: "json",
    //beforeSend: function (xhr) {
    // addHeaders(xhr);
    //},
    error: function(error) {//function (xhr, info) {
      //resultfunc(false, info);
      alert(error);
    },
    success: function (data,status) {
      var  mtext=data.age+","+data.id+","+data.name;//xhr.responseText;
      alert("成功执行了："+mtext+","+status);
    }
  });
}

export function yshloginGet(username, pass, resultfunc) {
  //alert(username+","+pass);
  $.ajax({
    //url:  "api/bgm5/person/"+username,
    url:  "http://localhost:8080/bgm5/person/"+username,
    type: "get",
    data: {},//"personId": 8899451
    dataType: "json",
    //beforeSend: function (xhr) {
    // addHeaders(xhr);
    //},
    error: function (xhr) {
      alert(xhr.errmessages);
    },
    success: function (data,status) {
      //resultfunc(true, info,obj.data);
      //resultfunc(true, info);
      //var plainObj = JSON.parse(xhr.responseText);
      //alert(xhr.plainObj);
        var  mtext=data.age+","+data.id+","+data.name;//xhr.responseText;
      alert("成功执行了："+mtext+","+status);
    }
  });
}
/***
 * 执行登录
 * @param obj
 * @param username
 * @param pass
 */
function dologin(obj, username, pass, resultfunc) {

  if (obj.code == 1) {
    var sessionkey = obj.data.ss;
    $.ajax({
      url: nctUrl + "/login",
      type: "post",
      data: {"username": username, "userpass": pass, "publickey": obj.data.ps},
      dataType: "json",
      beforeSend: function (xhr) {
        addHeaders(xhr);
      },
      error: function (xhr, info) {

        resultfunc(false, info);
      },
      success: function (obj) {
        if (obj.code == 1) {
          var secretkey = obj.data.secretkey;
          var cryptedInfo = obj.data.info;
          decryptSecretKey(username, sessionkey, secretkey, function (retObj) {
            if (retObj.code == 1) {
              sessionKey = decodeBase64AndDecryptWith3Des(sessionkey, retObj.data);
              var decoded = decodeBase64(cryptedInfo);
              var plainInfo = decodeBase64AndDecryptWith3Des(produceSessionKey(sessionKey), decoded);
              var plainObj = JSON.parse(plainInfo);
              sessionId = plainObj.sessionid;
              $.cookie("sessionKey", sessionKey);
              $.cookie("sessionId", sessionId);
              // $("#content1").val("sessionid:" + sessionId + "  sessionKey:" + sessionKey);
              resultfunc(true, "登录成功！", plainInfo);
            } else {
              resultfunc(false, retObj.msg);
            }
          }, function (info) {
            resultfunc(false, info);
          });
        } else {

          resultfunc(false, obj.msg);
        }
      }
    });
  } else {
    resultfunc(false, obj.msg);
  }
}

/**
 * 登录函数
 * @param username 会员号
 * @param pass 密码
 */
export function login(username, pass, resultfunc) {
  generateKey(username,
    function (obj) {
      dologin(obj, username, pass, resultfunc);
    },
    function (info) {
      resultfunc(false, info);
    });
}

/**
 * 产生随机数，整型
 * @param Min 最小值
 * @param Max 最大值
 * @returns {*}
 */
function randomNumber(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/***
 * 产生随机字符串
 * @param length
 * @returns {string}
 */
function raondomString(length) {
  var res = "";
  for (var i = 0; i < length; i++) {
    var id = Math.ceil(Math.random() * 9);
    res += chars[id];
  }
  return res;
}

/**
 * 发送请求到服务端
 * @param url
 * @param params
 * @param successfunc
 * @param failfunc
 */
export function sendRequest(url, params, successfunc, failfunc,$this) {

  var crypted = "";
  var pstr = JSON.stringify(params);
  var sessionKey = $.cookie("sessionKey");
  var sessionId = $.cookie("sessionId");
  if (pstr != "{}") {
    crypted = encodeBase64(encryptWith3DesAndEncodeBase64(produceSessionKey(sessionKey), pstr));
  }
  $.ajax({
    url: url,
    type: "post",
    data: crypted,
    dataType: "json",
    contentType: "application/json",
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    beforeSend: function (xhr) {
      addHeaders(xhr);

      //发送业务请求时，需要进行签名
      var timestamp = parseInt(new Date().getTime() / 1000);
      var random = randomString(8);

      var sign = produceSign(sessionId, timestamp, random, crypted);
      xhr.setRequestHeader("sessionid", sessionId);
      xhr.setRequestHeader("timestamp", timestamp);
      xhr.setRequestHeader("random", random);
      xhr.setRequestHeader("sign", sign);
    },
    error: function (xhr, info) {
      failfunc(info);
      $this.$Message.error({
        content:info,
        duration:3,
        closable:true
      })
    },
    success: function (obj) {

      if (obj.code == 1) {
        var data = obj.data;
        if (data) {
          var decoded = decodeBase64(data);
          var plainText = decodeBase64AndDecryptWith3Des(produceSessionKey(sessionKey), decoded);
          var plainObj = JSON.parse(plainText);
          successfunc(plainObj);
        } else {
          successfunc(obj);
        }
      } else {
        failfunc(obj);
        $this.$Message.error({
          content:obj.msg,
          duration:3,
          closable:true
        })
      }
    }
  });
}
export function sendRequest2(url, params, successfunc, failfunc,$this) {

  var crypted = "";
  var pstr = JSON.stringify(params);
  var sessionKey = $.cookie("sessionKey");
  var sessionId = $.cookie("sessionId");
  if (pstr != "{}") {
    crypted = encodeBase64(encryptWith3DesAndEncodeBase64(produceSessionKey(sessionKey), pstr));
  }
  $.ajax({
    url: url,
    async:false,
    type: "post",
    data: crypted,
    dataType: "json",
    contentType: "application/json",
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    beforeSend: function (xhr) {
      addHeaders(xhr);

      //发送业务请求时，需要进行签名
      var timestamp = parseInt(new Date().getTime() / 1000);
      var random = randomString(8);

      var sign = produceSign(sessionId, timestamp, random, crypted);
      xhr.setRequestHeader("sessionid", sessionId);
      xhr.setRequestHeader("timestamp", timestamp);
      xhr.setRequestHeader("random", random);
      xhr.setRequestHeader("sign", sign);
    },
    error: function (xhr, info) {
      failfunc(info);
      $this.$Message.error({
        content:info,
        duration:3,
        closable:true
      })
    },
    success: function (obj) {

      if (obj.code == 1) {
        var data = obj.data;
        if (data) {
          var decoded = decodeBase64(data);
          var plainText = decodeBase64AndDecryptWith3Des(produceSessionKey(sessionKey), decoded);
          var plainObj = JSON.parse(plainText);
          successfunc(plainObj);
        } else {
          successfunc(obj);
        }
      } else {
        failfunc(obj);
        $this.$Message.error({
          content:obj.msg,
          duration:3,
          closable:true
        })
      }
    }
  });
}
function balance() {
  sendRequest(nctUrl + "/tb/balance", {}, function (obj) {
    // $("#content2").val(obj);
  }, failfunc);
}

/***
 * 产生随机字符串
 * @param length
 * @returns {string}
 */
function randomString(length) {
  var res = "";
  for (var i = 0; i < length; i++) {
    var id = Math.ceil(Math.random() * 9);
    res += chars[id];
  }
  return res;
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

function isdate(str) {
  var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var r = str.match(reg);
  if (r == null)
    return false;
  var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
  return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] &&
    d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  var value;
  $.each(a, function () {
    value = this.value;
    if (isdate(value)) {
      value = Date.parse(new Date(value));
    }
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(value || '');
    } else {
      o[this.name] = value || '';
    }
  });
  return o;
};

