(function(){"use strict";var e={3310:function(e,n,t){var s=t(5130),i=t(6768),r=(t(4114),t(4232)),o=t(144);const u={class:"movie-list"},c={class:"audio-type"},a={class:"title-left"},l={class:"censorship"},p=["src"],f={key:0},h={key:0},v=["src"],m=["src"],d={key:1},g=["src"],w={key:1},b=["src"],k={class:"audio-times"};var y={__name:"MovieList",setup(e){const n="/showtimes/",t=(0,o.KR)(null);(0,i.sV)((async()=>{try{const e=await fetch("/showtimes/json/0725-BoxOffice.json");t.value=await e.json()}catch(e){console.error("Error fetching the data: ",e)}}));const s=(0,i.EW)((()=>{const e={},n=new Date;return t.value&&t.value.BoxOffice?(t.value.BoxOffice.forEach((t=>{const s=E(t.time);if(s>n){const n=`${D(t.audio)}-${t.movie}-${t.censorship}-${t.exhibition}`;e[n]||(e[n]={audioType:D(t.audio),title:t.movie,censorship:t.censorship,exhibition:t.exhibition,vip:t.vip,sessions:[]}),e[n].sessions.push({time:t.time,places:t.places})}})),Object.values(e)):[]}));function y(e){switch(e){case"S":return"vip-premiere";case"H":return"hybrid-premiere";case"N":return"regular-movie";default:return"regular-movie"}}function _(e){switch(e){case"1":return"/showtimes//censure/1.png";case"2":return"/showtimes//censure/2.png";case"3":return"/showtimes//censure/3.png";case"4":return"/showtimes//censure/4.png";case"5":return"/showtimes//censure/5.png";case"6":return"/showtimes//censure/6.png";case"13":return"/showtimes//censure/13.png";case"14":return"/showtimes//censure/14.png";case"15":return"/showtimes//censure/15.png";case"16":return"/showtimes//censure/16.png";case"17":return"/showtimes//censure/17.png";case"18":return"/showtimes//censure/18.png";default:return""}}function x(e,n){const t=new Date,s=E(n),i=(s-t)/6e4;if("L"===e)return"session-sold-out";if(i>0&&i<=15)return"session-starting-soon";switch(e){case"M":return"session-available";case"P":return"session-few";default:return""}}function D(e){switch(e){case"D":return"DUB";case"L":return"LEG";case"V":return"ORI";default:return"Unknown"}}function C(e){switch(e){case"NO":return"/showtimes//session/2D_Black_.png";case"3D":return"/showtimes//session/3D_Black_.png";case"XD":return"/showtimes//session/XD_Black_.png";case"X3":return{threeD:"/showtimes//session/3D_Black_.png",xD:"/showtimes//session/XD_Black_.png"};default:return""}}function E(e){if(!e)return console.error("Invalid time string:",e),null;const n=e.split("h");if(2!==n.length)return console.error("Time string is not properly formatted:",e),null;const t=parseInt(n[0],10),s=parseInt(n[1],10);if(isNaN(t)||isNaN(s))return console.error("Time parts are not numbers:",n),null;const i=new Date;return i.setHours(t,s,0,0),i}function O(e){const n=E(e);return n?n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}):"Invalid time"}return(e,t)=>((0,i.uX)(),(0,i.CE)("div",u,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.value,(e=>((0,i.uX)(),(0,i.CE)("div",{class:(0,r.C4)(["movie-item",y(e.vip)]),key:`${e.title}-${e.audioType}`},[(0,i.Lk)("div",{class:(0,r.C4)(["movie-title",{"premiere-title":"S"===e.vip}])},[(0,i.Lk)("span",c,(0,r.v_)(e.audioType),1),(0,i.Lk)("span",a,(0,r.v_)(e.title),1),(0,i.Lk)("span",l,[(0,i.Lk)("img",{class:"censorship-img",src:_(e.censorship),alt:"censorship"},null,8,p)])],2),(0,i.Lk)("div",{class:(0,r.C4)(["exhibition-type",{"premiere-exhibition":"S"===e.vip}])},["S"!==e.vip?((0,i.uX)(),(0,i.CE)("div",f,["object"===typeof C(e.exhibition)?((0,i.uX)(),(0,i.CE)("div",h,[(0,i.Lk)("img",{src:C(e.exhibition).threeD,alt:"3D exhibition-type"},null,8,v),(0,i.Lk)("img",{src:C(e.exhibition).xD,alt:"XD exhibition-type"},null,8,m)])):((0,i.uX)(),(0,i.CE)("div",d,[(0,i.Lk)("img",{src:C(e.exhibition),alt:"exhibition-type"},null,8,g)]))])):((0,i.uX)(),(0,i.CE)("div",w,["S"===e.vip?((0,i.uX)(),(0,i.CE)("img",{key:0,src:`${(0,o.R1)(n)}session/VP_Black_.png`,alt:"vips Image"},null,8,b)):(0,i.Q3)("",!0)]))],2),(0,i.Lk)("div",k,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.sessions,(e=>((0,i.uX)(),(0,i.CE)("span",{key:e.time,class:(0,r.C4)([x(e.places,e.time),"time"])},(0,r.v_)(O(e.time)),3)))),128))])],2)))),128))]))}},_=t(1241);const x=(0,_.A)(y,[["__scopeId","data-v-16d8391f"]]);var D=x;const C={id:"app"};var E={__name:"App",setup(e){return(e,n)=>((0,i.uX)(),(0,i.CE)("div",C,[(0,i.bF)(D),n[0]||(n[0]=(0,i.Lk)("footer",null,null,-1))]))}};const O=E;var L=O;(0,s.Ef)(L).mount("#app")}},n={};function t(s){var i=n[s];if(void 0!==i)return i.exports;var r=n[s]={exports:{}};return e[s].call(r.exports,r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,s,i,r){if(!s){var o=1/0;for(l=0;l<e.length;l++){s=e[l][0],i=e[l][1],r=e[l][2];for(var u=!0,c=0;c<s.length;c++)(!1&r||o>=r)&&Object.keys(t.O).every((function(e){return t.O[e](s[c])}))?s.splice(c--,1):(u=!1,r<o&&(o=r));if(u){e.splice(l--,1);var a=i();void 0!==a&&(n=a)}}return n}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[s,i,r]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var s in n)t.o(n,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:n[s]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={524:0};t.O.j=function(n){return 0===e[n]};var n=function(n,s){var i,r,o=s[0],u=s[1],c=s[2],a=0;if(o.some((function(n){return 0!==e[n]}))){for(i in u)t.o(u,i)&&(t.m[i]=u[i]);if(c)var l=c(t)}for(n&&n(s);a<o.length;a++)r=o[a],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(l)},s=self["webpackChunkshowtimes"]=self["webpackChunkshowtimes"]||[];s.forEach(n.bind(null,0)),s.push=n.bind(null,s.push.bind(s))}();var s=t.O(void 0,[504],(function(){return t(3310)}));s=t.O(s)})();
//# sourceMappingURL=app.9cb63152.js.map