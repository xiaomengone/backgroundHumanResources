(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cb75ae6"],{"29c4":function(e,r,t){},6014:function(e,r,t){"use strict";t("29c4")},"9ed6":function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e._self._c;return r("div",{staticClass:"login-container"},[r("div",{staticClass:"logo"}),r("div",{staticClass:"form"},[r("h1",[e._v("登录")]),r("el-card",[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px","hide-required-asterisk":!0}},[r("el-form-item",{attrs:{label:"手机号",prop:"userPhone"}},[r("el-input",{attrs:{placeholder:"请输入手机号",autocomplete:"off"},model:{value:e.ruleForm.userPhone,callback:function(r){e.$set(e.ruleForm,"userPhone",r)},expression:"ruleForm.userPhone"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"userPassword"}},[r("el-input",{attrs:{placeholder:"密码","show-password":"",type:"password",autocomplete:"off"},model:{value:e.ruleForm.userPassword,callback:function(r){e.$set(e.ruleForm,"userPassword",r)},expression:"ruleForm.userPassword"}})],1),r("el-form-item",[r("el-checkbox",{model:{value:e.checked,callback:function(r){e.checked=r},expression:"checked"}},[e._v("用户平台使用协议")])],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("登录")]),r("el-button",{on:{click:function(r){return e.resetForm()}}},[e._v("重置")])],1)],1)],1)],1)])},o=[],u=t("c7eb"),n=t("1da1"),a=t("5530"),l=(t("14d9"),t("2f62")),c=(t("bc3a"),t("b775")),i={name:"Login",data:function(){return{checked:!0,ruleForm:{userPhone:"13800000002",userPassword:"hm#qd@23!"},rules:{userPhone:[{required:!0,message:"手机号不能为空",trigger:"blur"},{pattern:/^1[34578]\d{9}$/,message:"请填写正确的手机号码",trigger:"blur"}],userPassword:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:6,max:16,message:"密码的长度在6-16位之间",trigger:"blur"}]}}},methods:Object(a["a"])(Object(a["a"])({},Object(l["b"])("user",["userLogin"])),{},{submitForm:function(e){var r,t=this;this.$refs[e].validate((function(e){return(r=r||Object(n["a"])(Object(u["a"])().mark((function e(r){return Object(u["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}if(!t.checked){e.next=7;break}return e.next=4,t.userLogin(t.ruleForm);case 4:t.$router.push("/"),e.next=8;break;case 7:t.$message.error("请勾选用户协议");case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}))},resetForm:function(e){this.ruleForm.userPhone="",this.ruleForm.userPassword="",this.checked=!1},text:function(){Object(c["a"])({url:"/sys/login",method:"POST",data:{mobile:"13912345678",password:"1234567"}}).then((function(e){console.log("res",e)}))}}),beforeDestroy:function(){this.resetForm("ruleForm")}},m=i,d=(t("6014"),t("2877")),h=Object(d["a"])(m,s,o,!1,null,null,null);r["default"]=h.exports}}]);