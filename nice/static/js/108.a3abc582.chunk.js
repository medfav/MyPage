(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{757:function(t,n,e){!function(t){"use strict";t.defineMode("troff",function(){var t={};function n(n,e){return(e.tokens[0]||function(n){if(n.eatSpace())return null;var e=n.sol(),r=n.next();if("\\"===r)return n.match("fB")||n.match("fR")||n.match("fI")||n.match("u")||n.match("d")||n.match("%")||n.match("&")?"string":n.match("m[")?(n.skipTo("]"),n.next(),"string"):n.match("s+")||n.match("s-")?(n.eatWhile(/[\d-]/),"string"):n.match("(")||n.match("*(")?(n.eatWhile(/[\w-]/),"string"):"string";if(e&&("."===r||"'"===r)&&n.eat("\\")&&n.eat('"'))return n.skipToEnd(),"comment";if(e&&"."===r){if(n.match("B ")||n.match("I ")||n.match("R "))return"attribute";if(n.match("TH ")||n.match("SH ")||n.match("SS ")||n.match("HP "))return n.skipToEnd(),"quote";if(n.match(/[A-Z]/)&&n.match(/[A-Z]/)||n.match(/[a-z]/)&&n.match(/[a-z]/))return"attribute"}n.eatWhile(/[\w-]/);var a=n.current();return t.hasOwnProperty(a)?t[a]:null})(n,e)}return{startState:function(){return{tokens:[]}},token:function(t,e){return n(t,e)}}}),t.defineMIME("text/troff","troff"),t.defineMIME("text/x-troff","troff"),t.defineMIME("application/x-troff","troff")}(e(33))}}]);
//# sourceMappingURL=108.a3abc582.chunk.js.map