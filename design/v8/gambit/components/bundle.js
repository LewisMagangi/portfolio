/* @ds-bundle: {"format":4,"namespace":"Gambit","components":[{"name":"Button"},{"name":"Tag"},{"name":"StatusPill"},{"name":"SectionLabel"},{"name":"ProjectCard"},{"name":"CertCard"},{"name":"TimelineItem"},{"name":"StatBlock"},{"name":"ThemeToggle"},{"name":"Icon"},{"name":"SiteNav"},{"name":"AdminSidebar"},{"name":"PageHeader"},{"name":"StatusBadge"},{"name":"Switch"},{"name":"DataTable"},{"name":"Field"},{"name":"ListEditor"},{"name":"FileDrop"},{"name":"ConfirmDialog"},{"name":"Toast"},{"name":"EmptyState"},{"name":"Timeline"},{"name":"BrowserFrame"},{"name":"PhoneFrame"},{"name":"RevealObserver"},{"name":"CarouselControls"},{"name":"DeviceMockup"},{"name":"Shader"},{"name":"ChessBoard"},{"name":"Accordion"},{"name":"CaseStudyCard"},{"name":"AwardCard"},{"name":"ReferenceCard"},{"name":"SiteFooter"},{"name":"BookingWidget"},{"name":"LiveView"},{"name":"VideoEmbed"},{"name":"CertificateCarousel"},{"name":"ServiceList"},{"name":"PricingTiers"},{"name":"ChallengeBoard"},{"name":"Bookshelf"},{"name":"TaglineReveal"},{"name":"SplitWords"},{"name":"StoryRail"},{"name":"Battery"},{"name":"CourseStory"},{"name":"GameTheatre"},{"name":"Cursor"},{"name":"TaskView"},{"name":"AccessRequest"},{"name":"AccessQueue"},{"name":"AccessViewer"},{"name":"ArticleToc"}]} */
/* GSAP 3.12.5 (gsap.com, standard no-charge license): core only, used for smoothing and choreography. No ScrollTrigger pinning, no smooth-scroll engine. */
/*!
 * GSAP 3.12.5
 * https://gsap.com
 * 
 * @license Copyright 2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function P(t){return(i=yt(t,ot))&&ze}function Q(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function R(t,e){return!e&&console.warn(t)}function S(t,e){return t&&(ot[t]=e)&&i&&(i[t]=e)||ot}function T(){return 0}function ea(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=gt.length;r--&&!gt[r].targetTest(i););e=gt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Vt(t[r],e)))||t.splice(r,1);return t}function fa(t){return t._gsap||ea(Mt(t))[0]._gsap}function ga(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ha(t,e){return(t=t.split(",")).forEach(e)||t}function ia(t){return Math.round(1e5*t)/1e5||0}function ja(t){return Math.round(1e7*t)/1e7||0}function ka(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function la(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function ma(){var t,e,r=dt.length,i=dt.slice(0);for(ct={},t=dt.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function na(t,e,r,i){dt.length&&!L&&ma(),t.render(e,r,i||L&&e<0&&(t._initted||t._startAt)),dt.length&&!L&&ma()}function oa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(at).length<2?e:r(t)?t.trim():t}function pa(t){return t}function qa(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ta(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?ta(t[r]||(t[r]={}),e[r]):e[r]);return t}function ua(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function va(t){var e=t.parent||I,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}(Z(t.keyframes)):qa;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function xa(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function ya(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function za(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0}function Aa(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Ca(t,e,r,i){return t._startAt&&(L?t._startAt.revert(ht):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Ea(t){return t._repeat?Tt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ga(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ha(t){return t._end=ja(t._start+(t._tDur/Math.abs(t._ts||t._rts||X)||0))}function Ia(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=ja(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ha(t),r._dirty||Aa(r,t)),t}function Ja(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Ga(t.rawTime(),e),(!e._dur||Ot(0,e.totalDuration(),r)-e._tTime>X)&&e.render(r,!0)),Aa(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-X}}function Ka(e,r,i,n){return r.parent&&za(r),r._start=ja((t(i)?i:i||e!==I?xt(e,i,r):e._time)+r._delay),r._end=ja(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),xa(e,r,"_first","_last",e._sort?"_start":0),bt(r)||(e._recent=r),n||Ja(e,r),e._ts<0&&Ia(e,e._tTime),e}function La(t,e){return(ot.ScrollTrigger||Q("scrollTrigger",e))&&ot.ScrollTrigger.create(e,t)}function Ma(t,e,r,i,n){return Qt(t,e,n),t._initted?!r&&t._pt&&!L&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==Rt.frame?(dt.push(t),t._lazy=[n,i],1):void 0:1}function Ra(t,e,r,i){var n=t._repeat,a=ja(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:ja(a*(n+1)+t._rDelay*n):a,0<s&&!i&&Ia(t,t._tTime=t._tDur*s),t.parent&&Ha(t),r||Aa(t.parent,t),t}function Sa(t){return t instanceof Xt?Aa(t):Ra(t,t._dur)}function Va(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new $t(r[0],u,r[1+o])}function Wa(t,e){return t||0===t?e(t):e}function Ya(t,e){return r(t)&&(e=st.exec(t))?e[1]:""}function _a(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function cb(r){return r=Mt(r)[0]||R("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Mt(t,e.querySelectorAll?e:e===r?R("Invalid scope")||a.createElement("div"):r)}}function db(t){return t.sort(function(){return.5-Math.random()})}function eb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=jt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,d=(r||p).length,c=y[d];if(!c){if(!(f="auto"===p.grid?0:(p.grid||[1,U])[1])){for(h=-U;h<(h=r[f++].getBoundingClientRect().left)&&f<d;);f<d&&f--}for(c=y[d]=[],i=T?Math.min(f,d)*w-.5:m%f,n=f===U?0:T?d*x/f-.5:m/f|0,l=U,u=h=0;u<d;u++)a=u%f-i,s=n-(u/f|0),c[u]=o=b?Math.abs("y"===b?s:a):K(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&db(c),c.max=h-l,c.min=l,c.v=d=(parseFloat(p.amount)||parseFloat(p.each)*(d<f?d-1:b?"y"===b?d/f:f:Math.max(f,d/f))||0)*("edges"===m?-1:1),c.b=d<0?g-d:g,c.u=Ya(p.amount||p.each)||0,_=_&&d<0?Yt(_):_}return d=(c[t]-c.min)/c.max||0,ja(c.b+(_?_(d):d)*c.v)+c.u}}function fb(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=ja(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:Ya(e))}}function gb(h,e){var l,f,r=Z(h);return!r&&v(h)&&(l=r=h.radius||U,h.values?(h=Mt(h.values),(f=!t(h[0]))&&(l*=l)):h=fb(h.increment)),Wa(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=U,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+Ya(e)}:fb(h))}function hb(t,e,r,i){return Wa(Z(t)?!e:!0===r?!!(r=0):!i,function(){return Z(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function lb(e,r,t){return Wa(t,function(t){return e[~~r(t)]})}function ob(t){for(var e,r,i,n,a=0,s="";~(e=t.indexOf("random(",a));)i=t.indexOf(")",e),n="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(n?at:tt),s+=t.substr(a,e-a)+hb(n?r:+r[0],n?0:+r[1],+r[2]||1e-5),a=i+1;return s+t.substr(a,t.length-a)}function rb(t,e,r){var i,n,a,s=t.labels,o=U;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function tb(t){return za(t),t.scrollTrigger&&t.scrollTrigger.kill(!!L),t.progress()<1&&Ct(t,"onInterrupt"),t}function wb(t){if(t)if(t=!t.name&&t.default||t,x()||t.headless){var e=t.name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:T,render:he,add:Wt,kill:ce,modifier:fe,rawVars:0},a={targetTest:0,get:0,getSetter:ne,aliases:{},register:0};if(Ft(),t!==i){if(pt[e])return;qa(i,qa(ua(t,n),a)),yt(i.prototype,yt(n,ua(t,a))),pt[i.prop=e]=i,t.targetTest&&(gt.push(i),ft[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}S(e,i),t.register&&t.register(ze,i,_e)}else At.push(t)}function zb(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*St+.5|0}function Ab(e,r,i){var n,a,s,o,u,h,l,f,d,c,p=e?t(e)?[e>>16,e>>8&St,e&St]:0:zt.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),zt[e])p=zt[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&St,p&St,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&St,e&St]}else if("hsl"===e.substr(0,3))if(p=c=e.match(tt),r){if(~e.indexOf("="))return p=e.match(et),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=zb(o+1/3,n,a),p[1]=zb(o,n,a),p[2]=zb(o-1/3,n,a);else p=e.match(tt)||zt.transparent;p=p.map(Number)}return r&&!c&&(n=p[0]/St,a=p[1]/St,s=p[2]/St,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(d=l-f,u=.5<h?d/(2-l-f):d/(l+f),o=l===n?(a-s)/d+(a<s?6:0):l===a?(s-n)/d+2:(n-a)/d+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Bb(t){var r=[],i=[],n=-1;return t.split(Et).forEach(function(t){var e=t.match(rt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Cb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Et),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Ab(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Bb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Et,"1").split(rt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Et)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Fb(t){var e,r=t.join(" ");if(Et.lastIndex=0,Et.test(r))return e=Dt.test(r),t[1]=Cb(t[1],e),t[0]=Cb(t[0],e,Bb(t[1])),!0}function Ob(t){var e=(t+"").split("("),r=Lt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Bt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(oa)):Lt._CE&&It.test(t)?Lt._CE("",t):r}function Qb(t,e){for(var r,i=t._first;i;)i instanceof Xt?Qb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?Qb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Sb(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ha(t,function(t){for(var e in Lt[t]=ot[t]=a,Lt[n=t.toLowerCase()]=r,a)Lt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Lt[t+"."+e]=a[e]}),a}function Tb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Ub(r,t,e){function Jm(t){return 1===t?1:i*Math.pow(2,-10*t)*H((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/N*(Math.asin(1/i)||0),s="out"===r?Jm:"in"===r?function(t){return 1-Jm(1-t)}:Tb(Jm);return n=N/n,s.config=function(t,e){return Ub(r,t,e)},s}function Vb(e,r){function Rm(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Rm:"in"===e?function(t){return 1-Rm(1-t)}:Tb(Rm);return t.config=function(t){return Vb(e,t)},t}var F,L,l,I,h,n,a,i,o,f,d,c,p,_,m,g,b,O,k,M,C,A,z,E,D,B,Y,j,q={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},V={duration:.5,overwrite:!1,delay:0},U=1e8,X=1/U,N=2*Math.PI,G=N/4,W=0,K=Math.sqrt,J=Math.cos,H=Math.sin,$="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},Z=Array.isArray,tt=/(?:-?\.?\d|\.)+/gi,et=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,rt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,it=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,nt=/[+-]=-?[.\d]+/,at=/[^,'"\[\]\s]+/gi,st=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ot={},ut={suppressEvents:!0,isStart:!0,kill:!1},ht={suppressEvents:!0,kill:!1},lt={suppressEvents:!0},ft={},dt=[],ct={},pt={},_t={},mt=30,gt=[],vt="",yt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},Tt=function _animationCycle(t,e){var r=Math.floor(t/=e);return t&&r===t?r-1:r},bt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},wt={_start:0,endTime:T,totalDuration:T},xt=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||wt,h=t.duration()>=U?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*(Z(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Ot=function _clamp(t,e,r){return r<t?t:e<r?e:r},kt=[].slice,Mt=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&Ft()?Z(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||_a(t,1)?i.push.apply(i,Mt(t)):i.push(t)})||i}(t,i):_a(t)?kt.call(t,0):t?[t]:[]:kt.call((e||a).querySelectorAll(t),0)},Pt=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Wa(n,function(t){return r+((t-e)/a*s||0)})},Ct=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&dt.length&&ma(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},At=[],St=255,zt={aqua:[0,St,St],lime:[0,St,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,St],navy:[0,0,128],white:[St,St,St],olive:[128,128,0],yellow:[St,St,0],orange:[St,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[St,0,0],pink:[St,192,203],cyan:[0,St,St],transparent:[St,St,St,0]},Et=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in zt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Dt=/hsl[a]?\(/,Rt=(k=Date.now,M=500,C=33,A=k(),z=A,D=E=1e3/240,g={time:0,frame:0,tick:function tick(){yl(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ot.gsap=ze,(h.gsapVersions||(h.gsapVersions=[])).push(ze.version),P(i||h.GreenSockGlobals||!h.gsap&&h||{}),At.forEach(wb)),m="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,p&&g.sleep(),_=m||function(t){return setTimeout(t,D-1e3*g.time+1|0)},c=1,yl(2))},sleep:function sleep(){(m?cancelAnimationFrame:clearTimeout)(p),c=0,_=T},lagSmoothing:function lagSmoothing(t,e){M=t||1/0,C=Math.min(e||33,M)},fps:function fps(t){E=1e3/(t||240),D=1e3*g.time+E},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),B[e?"unshift":"push"](a),Ft(),a},remove:function remove(t,e){~(e=B.indexOf(t))&&B.splice(e,1)&&e<=O&&O--},_listeners:B=[]}),Ft=function _wake(){return!c&&Rt.wake()},Lt={},It=/^[\d.\-M][\d.\-,\s]/,Bt=/["']/g,Yt=function _invertEase(e){return function(t){return 1-e(1-t)}},jt=function _parseEase(t,e){return t&&(s(t)?t:Lt[t]||Ob(t))||e};function yl(t){var e,r,i,n,a=k()-z,s=!0===t;if((M<a||a<0)&&(A+=a-C),(0<(e=(i=(z+=a)-A)-D)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,D+=e+(E<=e?4:E-e),r=1),s||(p=_(yl)),r)for(O=0;O<B.length;O++)B[O](i,b,n,t)}function gn(t){return t<j?Y*t*t:t<.7272727272727273?Y*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?Y*(t-=2.25/2.75)*t+.9375:Y*Math.pow(t-2.625/2.75,2)+.984375}ha("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Sb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Lt.Linear.easeNone=Lt.none=Lt.Linear.easeIn,Sb("Elastic",Ub("in"),Ub("out"),Ub()),Y=7.5625,j=1/2.75,Sb("Bounce",function(t){return 1-gn(1-t)},gn),Sb("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),Sb("Circ",function(t){return-(K(1-t*t)-1)}),Sb("Sine",function(t){return 1===t?1:1-J(t*G)}),Sb("Back",Vb("in"),Vb("out"),Vb()),Lt.SteppedEase=Lt.steps=ot.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Ot(0,.99999999,t)|0)+n)*r}}},V.ease=Lt["quad.out"],ha("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return vt+=t+","+t+"Params,"});var qt,Vt=function GSCache(t,e){this.id=W++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ga,this.set=e?e.getSetter:ne},Ut=((qt=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},qt.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},qt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ra(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},qt.totalTime=function totalTime(t,e){if(Ft(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ia(this,t),!r._dp||r.parent||Ja(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Ka(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===X||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),na(this,t,e)),this},qt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Ea(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},qt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):0<this.rawTime()?1:0},qt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Ea(this),e):this.duration()?Math.min(1,this._time/this._dur):0<this.rawTime()?1:0},qt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?Tt(this._tTime,r)+1:1},qt.timeScale=function timeScale(t,e){if(!arguments.length)return this._rts===-X?0:this._rts;if(this._rts===t)return this;var r=this.parent&&this._ts?Ga(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-X?0:this._rts,this.totalTime(Ot(-Math.abs(this._delay),this._tDur,r),!1!==e),Ha(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},qt.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ft(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==X&&(this._tTime-=X)))),this):this._ps},qt.startTime=function startTime(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Ka(e,this,t-this._delay),this}return this._start},qt.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},qt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ga(e.rawTime(t),this):this._tTime:this._tTime},qt.revert=function revert(t){void 0===t&&(t=lt);var e=L;return L=t,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),L=e,this},qt.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(Math.abs(e._ts)||1),e=e._dp;return!this.parent&&this._sat?this._sat.globalTime(t):r},qt.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Sa(this)):-2===this._repeat?1/0:this._repeat},qt.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Sa(this),e?this.time(e):this}return this._rDelay},qt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},qt.seek=function seek(t,e){return this.totalTime(xt(this,t),w(e))},qt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e))},qt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},qt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},qt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},qt.resume=function resume(){return this.paused(!1)},qt.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-X:0)),this):this._rts<0},qt.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-X,this},qt.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-X))},qt.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},qt.then=function then(t){var i=this;return new Promise(function(e){function Co(){var t=i.then;i.then=null,s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:pa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Co():i._prom=Co})},qt.kill=function kill(){tb(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ra(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),c||Rt.wake()}qa(Ut.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-X,_prom:0,_ps:!1,_rts:1});var Xt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),I&&Ka(t.parent||I,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&La(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Va(0,arguments,this),this},e.from=function from(t,e,r){return Va(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Va(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,va(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new $t(t,e,xt(this,r),1),this},e.call=function call(t,e,r){return Ka(this,$t.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new $t(t,r,xt(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,va(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,va(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:ja(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==I&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(c=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=ja(v%o),v===m?(s=this._repeat,i=g):((s=~~(v/o))&&s===v/o&&(i=g,s--),g<i&&(i=g)),d=Tt(this._tTime,o),!_&&this._tTime&&d!==s&&this._tTime-d*o-this._dur<=0&&(d=s),c&&1&s&&(i=g-i,p=1),s!==d&&!this._lock){var T=c&&1&d,b=T===(c&&1&s);if(s<d&&(T=!T),_=T?0:v%g?g:v,this._lock=1,this.render(_||(p?0:ja(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&Ct(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;Qb(this,p)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,ja(_),ja(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&i&&!e&&!s&&(Ct(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-X);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||L&&(n._initted||n._startAt)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-X:X);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-X)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ha(this),this.render(t,e,r);this._onUpdate&&!e&&Ct(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||za(this,1),e||t<0&&!_||!v&&!_&&m||(Ct(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=xt(this,i,e)),!(e instanceof Ut)){if(Z(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=$t.delayedCall(0,e)}return this!==e?Ka(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-U);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof $t?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(ya(this,t),t===this._recent&&(this._recent=this._last),Aa(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ja(Rt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=xt(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=$t.delayedCall(0,e||T,r);return i.data="isPause",this._hasPause=1,Ka(this,i,xt(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=xt(this,t);e;)e._start===t&&"isPause"===e.data&&za(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Nt!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Mt(e),s=this._first,o=t(r);s;)s instanceof $t?la(s._targets,a)&&(o?(!Nt||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=xt(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=$t.to(i,qa({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||X,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Ra(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,qa({startAt:{time:xt(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),rb(this,xt(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),rb(this,xt(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+X)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var i,n=this._first,a=this.labels;n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Aa(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Aa(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=U;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Ka(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=r/a._ts,a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Ra(a,a===I&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(I._ts&&(na(I,Ga(t,I)),f=Rt.frame),Rt.frame>=mt){mt+=q.autoSleep||120;var e=I._first;if((!e||!e._ts)&&q.autoSleep&&Rt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Rt.sleep()}}},Timeline}(Ut);qa(Xt.prototype,{_lock:0,_hasPause:0,_forcing:0});function ac(t,e,i,n,a,o){var u,h,l,f;if(pt[t]&&!1!==(u=new pt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Kt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||Z(t)||$(t))return r(t)?Kt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Kt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new _e(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==d))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function gc(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if(Z(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Nt,Gt,Wt=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var d,c=t[e],p="get"!==i?i:s(c)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():c,_=s(c)?l?re:te:Zt;if(r(n)&&(~n.indexOf("random(")&&(n=ob(n)),"="===n.charAt(1)&&(!(d=ka(p,n)+(Ya(p)||0))&&0!==d||(n=d))),!f||p!==n||Gt)return isNaN(p*n)||""===n?(c||e in t||Q(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,d,c,p,_=new _e(this._pt,t,e,0,1,ue,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(c=~(i+="").indexOf("random("))&&(i=ob(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(it)||[];o=it.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(d=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:d,c:"="===l.charAt(1)?ka(d,l)-d:parseFloat(l)-d,m:h&&h<4?Math.round:0},m=it.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(nt.test(i)||c)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||q.stringFilter,l)):(d=new _e(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof c?se:ae,0,_),l&&(d.fp=l),u&&d.modifier(u,this,t),this._pt=d)},Qt=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.runBackwards,O=m.yoyoEase,k=m.keyframes,M=m.autoRevert,P=t._dur,C=t._startAt,A=t._targets,S=t.parent,z=S&&"nested"===S.data?S.vars.targets:A,E="auto"===t._overwrite&&!F,D=t.timeline;if(!D||k&&g||(g="none"),t._ease=jt(g,V.ease),t._yEase=O?Yt(jt(!0===O?g:O,V.ease)):0,O&&t._yoyo&&!t._repeat&&(O=t._yEase,t._yEase=t._ease,t._ease=O),t._from=!D&&!!m.runBackwards,!D||k&&!m.stagger){if(p=(l=A[0]?fa(A[0]).harness:0)&&m[l.prop],i=ua(m,ft),C&&(C._zTime<0&&C.progress(1),e<0&&x&&y&&!M?C.render(-1,!0):C.revert(x&&P?ht:ut),C._lazy=0),v){if(za(t._startAt=$t.set(A,qa({data:"isStart",overwrite:!1,parent:S,immediateRender:!0,lazy:!C&&w(T),startAt:null,delay:0,onUpdate:b&&function(){return Ct(t,"onUpdate")},stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L||!y&&!M)&&t._startAt.revert(ht),y&&P&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(x&&P&&!C)if(e&&(y=!1),a=qa({overwrite:!1,data:"isFromStart",lazy:y&&!C&&w(T),immediateRender:y,stagger:0,parent:S},i),p&&(a[l.prop]=p),za(t._startAt=$t.set(A,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(L?t._startAt.revert(ht):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,X,X);for(t._pt=t._ptCache=0,T=P&&w(T)||T&&!P,n=0;n<A.length;n++){if(h=(o=A[n])._gsap||ea(A)[n]._gsap,t._ptLookup[n]=d={},ct[h.id]&&dt.length&&ma(),c=z===A?n:z.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,c,z)&&(t._pt=s=new _e(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){d[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)pt[a]&&(f=ac(a,i,t,c,o,z))?f.priority&&(u=1):d[a]=s=Wt.call(t,o,a,"get",i[a],c,z,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),E&&t._pt&&(Nt=t,I.killTweensOf(o,d,t.globalTime(e)),_=!t.parent,Nt=0),t._pt&&T&&(ct[h.id]=1)}u&&pe(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,k&&e<=0&&D.render(U,!0,!0)},Kt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?ob(t):t},Jt=vt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Ht={};ha(Jt+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Ht[t]=1});var $t=function(D){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,d,c,p=(a=D.call(this,n?r:va(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,T=p.stagger,b=p.overwrite,x=p.keyframes,O=p.defaults,k=p.scrollTrigger,M=p.yoyoEase,P=r.parent||I,C=(Z(e)||$(e)?t(e[0]):"length"in r)?[e]:Mt(e);if(a._targets=C.length?ea(C):R("GSAP target "+e+" not found. https://gsap.com",!q.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=b,x||T||y(_)||y(m)){if(r=a.vars,(s=a.timeline=new Xt({data:"nested",defaults:O||{},targets:P&&"nested"===P.data?P.vars.targets:C})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,T||y(_)||y(m)){if(h=C.length,d=T&&eb(T),v(T))for(l in T)~Jt.indexOf(l)&&((c=c||{})[l]=T[l]);for(o=0;o<h;o++)(u=ua(r,Ht)).stagger=0,M&&(u.yoyoEase=M),c&&yt(u,c),f=C[o],u.duration=+Kt(_,_assertThisInitialized(a),o,f,C),u.delay=(+Kt(m,_assertThisInitialized(a),o,f,C)||0)-a._delay,!T&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,d?d(o,f,C):0),s._ease=Lt.none;s.duration()?_=m=0:a.timeline=0}else if(x){va(qa(s.vars.defaults,{ease:"none"})),s._ease=jt(x.ease||r.ease||"none");var A,S,z,E=0;if(Z(x))x.forEach(function(t){return s.to(C,t,">")}),s.duration();else{for(l in u={},x)"ease"===l||"easeEach"===l||gc(l,x[l],u,x.easeEach);for(l in u)for(A=u[l].sort(function(t,e){return t.t-e.t}),o=E=0;o<A.length;o++)(z={ease:(S=A[o]).e,duration:(S.t-(o?A[o-1].t:0))/100*_})[l]=S.v,s.to(C,z,E),E+=z.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==b||F||(Nt=_assertThisInitialized(a),I.killTweensOf(C),Nt=0),Ka(P,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!x&&a._start===ja(P._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==P.data)&&(a._tTime=-X,a.render(Math.max(0,-m)||0)),k&&La(_assertThisInitialized(a),k),a}_inheritsLoose(Tween,D);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d=this._time,c=this._tDur,p=this._dur,_=t<0,m=c-X<t&&!_?c:t<X?0:t;if(p){if(m!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=_){if(i=m,l=this.timeline,this._repeat){if(s=p+this._rDelay,this._repeat<-1&&_)return this.totalTime(100*s+t,e,r);if(i=ja(m%s),m===c?(a=this._repeat,i=p):((a=~~(m/s))&&a===ja(m/s)&&(i=p,a--),p<i&&(i=p)),(u=this._yoyo&&1&a)&&(f=this._yEase,i=p-i),o=Tt(this._tTime,s),i===d&&!r&&this._initted&&a===o)return this._tTime=m,this;a!==o&&(l&&this._yEase&&Qb(l,u),this.vars.repeatRefresh&&!u&&!this._lock&&this._time!==s&&this._initted&&(this._lock=r=1,this.render(ja(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Ma(this,_?t:i,r,e,m))return this._tTime=0,this;if(!(d===this._time||r&&this.vars.repeatRefresh&&a!==o))return this;if(p!==this._dur)return this.render(t,e,r)}if(this._tTime=m,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/p),this._from&&(this.ratio=h=1-h),i&&!d&&!e&&!a&&(Ct(this,"onStart"),this._tTime!==m))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(_&&Ca(this,t,0,r),Ct(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&Ct(this,"onRepeat"),m!==this._tDur&&m||this._tTime!==m||(_&&!this._onUpdate&&Ca(this,t,0,!0),!t&&p||!(m===this._tDur&&0<this._ts||!m&&this._ts<0)||za(this,1),e||_&&!d||!(m||d||u)||(Ct(this,m===c?"onComplete":"onReverseComplete",!0),!this._prom||m<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!bt(t))||(t._ts<0||t._dp._ts<0)&&!bt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Ot(0,t._tDur,e),a=Tt(l,h),t._yoyo&&1&a&&(u=1-u),a!==Tt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||L||i||t._zTime===X||!e&&t._zTime){if(!t._initted&&Ma(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?X:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Ca(t,e,0,!0),t._onUpdate&&!r&&Ct(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&Ct(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&za(t,1),r||L||(Ct(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),D.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i,n){c||Rt.wake(),this._ts||this.play();var a,s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Qt(this,s),a=this._ease(s/this._dur),function _updatePropTweens(t,e,r,i,n,a,s,o){var u,h,l,f,d=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!d)for(d=t._ptCache[e]=[],l=t._ptLookup,f=t._targets.length;f--;){if((u=l[f][e])&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Gt=1,t.vars[e]="+=0",Qt(t,s),Gt=0,o?R(e+" not eligible for reset"):1;d.push(u)}for(f=d.length;f--;)(u=(h=d[f])._pt||h).s=!i&&0!==i||n?u.s+(i||0)+a*u.c:i,u.c=r-u.s,h.e&&(h.e=ia(r)+Ya(h.e)),h.b&&(h.b=u.s+Ya(h.b))}(this,t,e,r,i,a,s,n)?this.resetTo(t,e,r,i,1):(Ia(this,0),this.parent||xa(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?tb(this):this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Nt&&!0!==Nt.vars.overwrite)._first||tb(this),this.parent&&i!==this.timeline.totalDuration()&&Ra(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,d=t?Mt(t):f,c=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,d))return"all"===e&&(this._pt=0),tb(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ha(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?fa(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=yt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~d.indexOf(f[l]))for(u in a=c[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||ya(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&tb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Va(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Va(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return I.killTweensOf(t,e,r)},Tween}(Ut);qa($t.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ha("staggerTo,staggerFrom,staggerFromTo",function(r){$t[r]=function(){var t=new Xt,e=kt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function oc(t,e,r){return t.setAttribute(e,r)}function wc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var Zt=function _setterPlain(t,e,r){return t[e]=r},te=function _setterFunc(t,e,r){return t[e](r)},re=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},ne=function _getSetter(t,e){return s(t[e])?te:u(t[e])&&t.setAttribute?oc:Zt},ae=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},se=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},ue=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},he=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},fe=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},ce=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?ya(this,i,"_pt"):i.dep||(e=1),i=r;return!e},pe=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},_e=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=wc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||ae,this.d=s||this,this.set=o||Zt,this.pr=u||0,(this._next=t)&&(t._prev=this)}ha(vt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return ft[t]=1}),ot.TweenMax=ot.TweenLite=$t,ot.TimelineLite=ot.TimelineMax=Xt,I=new Xt({sortChildren:!1,defaults:V,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),q.stringFilter=Fb;function Ec(t){return(ye[t]||Te).map(function(t){return t()})}function Fc(){var t=Date.now(),o=[];2<t-Oe&&(Ec("matchMediaInit"),ge.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Ec("matchMediaRevert"),o.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Oe=t,Ec("matchMedia"))}var me,ge=[],ye={},Te=[],Oe=0,Me=0,Pe=((me=Context.prototype).add=function add(t,i,n){function Gw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=cb(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Gw,t===s?Gw(a,function(t){return a.add(null,t)}):t?a[t]=Gw:Gw},me.ignore=function ignore(t){var e=l;l=null,t(this),l=e},me.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof $t&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},me.clear=function clear(){this._r.length=this.data.length=0},me.kill=function kill(i,t){var n=this;if(i?function(){for(var t,e=n.getTweens(),r=n.data.length;r--;)"isFlip"===(t=n.data[r]).data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return e.splice(e.indexOf(t),1)}));for(e.map(function(t){return{g:t._dur||t._delay||t._sat&&!t._sat.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(t){return t.t.revert(i)}),r=n.data.length;r--;)(t=n.data[r])instanceof Xt?"nested"!==t.data&&(t.scrollTrigger&&t.scrollTrigger.revert(),t.kill()):t instanceof $t||!t.revert||t.revert(i);n._r.forEach(function(t){return t(i,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),t)for(var e=ge.length;e--;)ge[e].id===this.id&&ge.splice(e,1)},me.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&cb(e),this.data=[],this._r=[],this.isReverted=!1,this.id=Me++,t&&this.add(t)}var Ce,Ae=((Ce=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new Pe(0,r||this.scope),o=s.conditions={};for(n in l&&!s.selector&&(s.selector=l.selector),this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(ge.indexOf(s)<0&&ge.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Fc):i.addEventListener("change",Fc));return a&&e(s,function(t){return s.add(null,t)}),this},Ce.revert=function revert(t){this.kill(t||{})},Ce.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t,l&&l.data.push(this)}var Se={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return wb(t)})},timeline:function timeline(t){return new Xt(t)},getTweensOf:function getTweensOf(t,e){return I.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Mt(i)[0]);var a=fa(i||{}).get,s=e?pa:oa;return"native"===e&&(e=""),i?t?s((pt[t]&&pt[t].get||a)(i,t,e,n)):function(t,e,r){return s((pt[t]&&pt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Mt(r)).length){var n=r.map(function(t){return ze.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=pt[e],o=fa(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;d._pt=0,e.init(r,i?t+i:t,d,0,[r]),e.render(1,e),d._pt&&he(1,d)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function $x(t,e,r){return n.resetTo(i,t,e,r)}var r,n=ze.to(t,yt(((r={})[i]="+=0.1",r.paused=!0,r),e||{}));return $x.tween=n,$x},isTweening:function isTweening(t){return 0<I.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=jt(t.ease,V.ease)),ta(V,t||{})},config:function config(t){return ta(q,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!pt[t]&&!ot[t]&&R(i+" effect requires "+t+" plugin.")}),_t[i]=function(t,e,r){return n(Mt(t),qa(e||{},a),r)},r&&(Xt.prototype[i]=function(t,e,r){return this.add(_t[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){Lt[t]=jt(e)},parseEase:function parseEase(t,e){return arguments.length?jt(t,e):Lt},getById:function getById(t){return I.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Xt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),I.remove(n),n._dp=0,n._time=n._tTime=I._time,r=I._first;r;)i=r._next,!e&&!r._dur&&r instanceof $t&&r.vars.onComplete===r._targets[0]||Ka(n,r,r._start-r._delay),r=i;return Ka(I,n,0),n},context:function context(t,e){return t?new Pe(t,e):l},matchMedia:function matchMedia(t){return new Ae(t)},matchMediaRefresh:function matchMediaRefresh(){return ge.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Fc()},addEventListener:function addEventListener(t,e){var r=ye[t]||(ye[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=ye[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return Z(e)?lb(e,wrap(0,e.length),t):Wa(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return Z(e)?lb(e,wrapYoyo(0,e.length-1),t):Wa(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:eb,random:hb,snap:gb,normalize:function normalize(t,e,r){return Pt(t,e,0,1,r)},getUnit:Ya,clamp:function clamp(e,r,t){return Wa(t,function(t){return Ot(e,r,t)})},splitColor:Ab,toArray:Mt,selector:cb,mapRange:Pt,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Ya(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),d={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if(Z(e)&&!Z(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=yt(Z(e)?[]:{},e));if(!u){for(s in i)Wt.call(d,e,s,"get",i[s]);a=function func(t){return he(t,d)||(f?e.p:e)}}}return Wa(t,a)},shuffle:db},install:P,effects:_t,ticker:Rt,updateRoot:Xt.updateRoot,plugins:pt,globalTimeline:I,core:{PropTween:_e,globals:S,Tween:$t,Timeline:Xt,Animation:Ut,getCache:fa,_removeLinkedListItem:ya,reverting:function reverting(){return L},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return F=t}}};ha("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return Se[t]=$t[t]}),Rt.add(Xt.updateRoot),d=Se.to({},{duration:0});function Jc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Lc(t,a){return{name:t,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ha(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Jc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var ze=Se.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)L?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Lc("roundProps",fb),Lc("modifiers"),Lc("snap",gb))||Se;$t.version=Xt.version=ze.version="3.12.5",o=1,x()&&Ft();function vd(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function wd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function xd(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function yd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function zd(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Ad(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Bd(t,e,r){return t.style[e]=r}function Cd(t,e,r){return t.style.setProperty(e,r)}function Dd(t,e,r){return t._gsap[e]=r}function Ed(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Fd(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Gd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Jd(t,e){var r=this,i=this.target,n=i.style,a=i._gsap;if(t in ar&&n){if(this.tfm=this.tfm||{},"transform"===t)return dr.transform.split(",").forEach(function(t){return Jd.call(r,t,e)});if(~(t=dr[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=yr(i,t)}):this.tfm[t]=a.x?a[t]:yr(i,t),t===pr&&(this.tfm.zOrigin=a.zOrigin),0<=this.props.indexOf(cr))return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(pr,e,"")),t=cr}(n||e)&&this.props.push(t,e,n[t])}function Kd(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Ld(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(hr,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=Be())&&t.isStart||n[cr]||(Kd(n),a.zOrigin&&n[pr]&&(n[pr]+=" "+a.zOrigin+"px",a.zOrigin=0,a.renderTransform()),a.uncache=1)}}function Md(t,e){var r={target:t,props:[],revert:Ld,save:Jd};return t._gsap||ze.core.getCache(t),e&&e.split(",").forEach(function(t){return r.save(t)}),r}function Od(t,e){var r=De.createElementNS?De.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):De.createElement(t);return r&&r.style?r:De.createElement(t)}function Pd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(hr,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Pd(t,mr(e)||e,1)||""}function Sd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(Ee=window,De=Ee.document,Re=De.documentElement,Le=Od("div")||{style:{}},Od("div"),cr=mr(cr),pr=cr+"Origin",Le.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ye=!!mr("perspective"),Be=ze.core.reverting,Fe=1)}function Td(t){var e,r=Od("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,n=this.nextSibling,a=this.style.cssText;if(Re.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=Td}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i&&(n?i.insertBefore(this,n):i.appendChild(this)),Re.removeChild(r),this.style.cssText=a,e}function Ud(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Vd(e){var r;try{r=e.getBBox()}catch(t){r=Td.call(e,!0)}return r&&(r.width||r.height)||e.getBBox===Td||(r=Td.call(e,!0)),!r||r.width||r.x||r.y?r:{x:+Ud(e,["x","cx","x1"])||0,y:+Ud(e,["y","cy","y1"])||0,width:0,height:0}}function Wd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Vd(t))}function Xd(t,e){if(e){var r,i=t.style;e in ar&&e!==pr&&(e=cr),i.removeProperty?("ms"!==(r=e.substr(0,2))&&"webkit"!==e.substr(0,6)||(e="-"+e),i.removeProperty("--"===r?e:e.replace(hr,"-$1").toLowerCase())):i.removeAttribute(e)}}function Yd(t,e,r,i,n,a){var s=new _e(t._pt,e,r,0,1,a?Ad:zd);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function _d(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=Le.style,f=lr.test(e),d="svg"===t.tagName.toLowerCase(),c=(d?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;if(i===h||!u||gr[i]||gr[h])return u;if("px"===h||p||(u=_d(t,e,r,"px")),o=t.getCTM&&Wd(t),(_||"%"===h)&&(ar[e]||~e.indexOf("adius")))return n=o?t.getBBox()[f?"width":"height"]:t[c],ia(_?u/n*100:u/100*n);if(l[f?"width":"height"]=100+(p?h:i),a=~e.indexOf("adius")||"em"===i&&t.appendChild&&!d?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==De&&a.appendChild||(a=De.body),(s=a._gsap)&&_&&s.width&&f&&s.time===Rt.time&&!s.uncache)return ia(u/s.width*100);if(!_||"height"!==e&&"width"!==e)!_&&"%"!==h||vr[Pd(a,"display")]||(l.position=Pd(t,"position")),a===t&&(l.position="static"),a.appendChild(Le),n=Le[c],a.removeChild(Le),l.position="absolute";else{var m=t.style[e];t.style[e]=100+i,n=t[c],m?t.style[e]=m:Xd(t,e)}return f&&_&&((s=fa(a)).time=Rt.time,s.width=a[c]),ia(p?n*u/100:n&&u?100/n*u:0)}function be(t,e,r,i){if(!r||"none"===r){var n=mr(e,t,1),a=n&&Pd(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Pd(t,"borderTopColor"))}var s,o,u,h,l,f,d,c,p,_,m,g=new _e(this._pt,t.style,e,0,1,ue),v=0,y=0;if(g.b=r,g.e=i,r+="","auto"===(i+="")&&(f=t.style[e],t.style[e]=i,i=Pd(t,e)||i,f?t.style[e]=f:Xd(t,e)),Fb(s=[r,i]),i=s[1],u=(r=s[0]).match(rt)||[],(i.match(rt)||[]).length){for(;o=rt.exec(i);)d=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),d!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===d.charAt(1)&&(d=ka(h,d)+m),c=parseFloat(d),_=d.substr((c+"").length),v=rt.lastIndex-_.length,_||(_=_||q.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=_d(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:c-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?Ad:zd;return nt.test(i)&&(g.e=0),this._pt=g}function de(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=Tr[r]||r,e[1]=Tr[i]||i,e.join(" ")}function ee(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],ar[r]&&(i=1,r="transformOrigin"===r?pr:cr),Xd(a,r);i&&(Xd(a,cr),u&&(u.svg&&a.removeAttribute("transform"),Or(a,1),u.uncache=1,Kd(s)))}}function ie(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function je(t){var e=Pd(t,cr);return ie(e)?wr:e.substr(7).match(et).map(ia)}function ke(t,e){var r,i,n,a,s=t._gsap||fa(t),o=t.style,u=je(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?wr:u:(u!==wr||t.offsetParent||t===Re||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,i=t.nextElementSibling,Re.appendChild(t)),u=je(t),n?o.display=n:Xd(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):Re.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function le(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||ke(t,!0),f=h.xOrigin||0,d=h.yOrigin||0,c=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==wr&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Vd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-d,h.xOffset=c+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[pr]="0px 0px",a&&(Yd(a,h,"xOrigin",f,w),Yd(a,h,"yOrigin",d,x),Yd(a,h,"xOffset",c,h.xOffset),Yd(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function oe(t,e,r){var i=Ya(e);return ia(parseFloat(e)+parseFloat(_d(t,"x",r+"px",i)))+i}function ve(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?sr:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new _e(t._pt,e,i,n,l,wd),o.e=f,o.u="deg",t._props.push(i),o}function we(t,e){for(var r in e)t[r]=e[r];return t}function xe(t,e,r){var i,n,a,s,o,u,h,l=we({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[cr]=e,i=Or(r,1),Xd(r,cr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[cr],f[cr]=e,i=Or(r,1),f[cr]=a),ar)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=Ya(a)!==(h=Ya(s))?_d(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new _e(t._pt,i,n,o,u-o,vd),t._pt.u=h||0,t._props.push(n));we(i,l)}var Ee,De,Re,Fe,Le,Ie,Be,Ye,qe=Lt.Power0,Ve=Lt.Power1,Ue=Lt.Power2,Xe=Lt.Power3,Ne=Lt.Power4,Ge=Lt.Linear,We=Lt.Quad,Qe=Lt.Cubic,Ke=Lt.Quart,Je=Lt.Quint,He=Lt.Strong,$e=Lt.Elastic,Ze=Lt.Back,tr=Lt.SteppedEase,er=Lt.Bounce,rr=Lt.Sine,ir=Lt.Expo,nr=Lt.Circ,ar={},sr=180/Math.PI,or=Math.PI/180,ur=Math.atan2,hr=/([A-Z])/g,lr=/(left|right|width|margin|padding|x)/i,fr=/[\s,\(]\S/,dr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},cr="transform",pr=cr+"Origin",_r="O,Moz,ms,Ms,Webkit".split(","),mr=function _checkPropPrefix(t,e,r){var i=(e||Le).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(_r[n]+t in i););return n<0?null:(3===n?"ms":0<=n?_r[n]:"")+t},gr={deg:1,rad:1,turn:1},vr={grid:1,flex:1},yr=function _get(t,e,r,i){var n;return Fe||Sd(),e in dr&&"transform"!==e&&~(e=dr[e]).indexOf(",")&&(e=e.split(",")[0]),ar[e]&&"transform"!==e?(n=Or(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:kr(Pd(t,pr))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=br[e]&&br[e](t,e,r)||Pd(t,e)||ga(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?_d(t,e,n,r)+r:n},Tr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},br={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new _e(t._pt,e,r,0,0,ee);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},wr=[1,0,0,1,0,0],xr={},Or=function _parseTransform(t,e){var r=t._gsap||new Vt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w,x,O,k,M,P,C,A,S,z,E,D,R,F=t.style,L=r.scaleX<0,I="deg",B=getComputedStyle(t),Y=Pd(t,pr)||"0";return i=n=a=u=h=l=f=d=c=0,s=o=1,r.svg=!(!t.getCTM||!Wd(t)),B.translate&&("none"===B.translate&&"none"===B.scale&&"none"===B.rotate||(F[cr]=("none"!==B.translate?"translate3d("+(B.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==B.rotate?"rotate("+B.rotate+") ":"")+("none"!==B.scale?"scale("+B.scale.split(" ").join(",")+") ":"")+("none"!==B[cr]?B[cr]:"")),F.scale=F.rotate=F.translate="none"),m=ke(t,r.svg),r.svg&&(M=r.uncache?(P=t.getBBox(),Y=r.xOrigin-P.x+"px "+(r.yOrigin-P.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),le(t,M||Y,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==wr&&(T=m[0],b=m[1],w=m[2],x=m[3],i=O=m[4],n=k=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?ur(b,T)*sr:0,(f=w||x?ur(w,x)*sr+u:0)&&(o*=Math.abs(Math.cos(f*or))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(R=m[6],E=m[7],A=m[8],S=m[9],z=m[10],D=m[11],i=m[12],n=m[13],a=m[14],h=(g=ur(R,z))*sr,g&&(M=O*(v=Math.cos(-g))+A*(y=Math.sin(-g)),P=k*v+S*y,C=R*v+z*y,A=O*-y+A*v,S=k*-y+S*v,z=R*-y+z*v,D=E*-y+D*v,O=M,k=P,R=C),l=(g=ur(-w,z))*sr,g&&(v=Math.cos(-g),D=x*(y=Math.sin(-g))+D*v,T=M=T*v-A*y,b=P=b*v-S*y,w=C=w*v-z*y),u=(g=ur(b,T))*sr,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),P=O*v+k*y,b=b*v-T*y,k=k*v-O*y,T=M,O=P),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ia(Math.sqrt(T*T+b*b+w*w)),o=ia(Math.sqrt(k*k+R*R)),g=ur(O,k),f=2e-4<Math.abs(g)?g*sr:0,c=D?1/(D<0?-D:D):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!ie(Pd(t,cr)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(L?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ia(s),r.scaleY=ia(o),r.rotation=ia(u)+I,r.rotationX=ia(h)+I,r.rotationY=ia(l)+I,r.skewX=f+I,r.skewY=d+I,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(Y.split(" ")[2])||!e&&r.zOrigin||0)&&(F[pr]=kr(Y)),r.xOffset=r.yOffset=0,r.force3D=q.force3D,r.renderTransform=r.svg?zr:Ye?Sr:Mr,r.uncache=0,r},kr=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Mr=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Sr(t,e)},Pr="0deg",Cr="0px",Ar=") ",Sr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,d=r.skewY,c=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Pr||h!==Pr)){var b,w=parseFloat(h)*or,x=Math.sin(w),O=Math.cos(w);w=parseFloat(l)*or,b=Math.cos(w),a=oe(g,a,x*b*-v),s=oe(g,s,-Math.sin(w)*-v),o=oe(g,o,O*b*-v+v)}_!==Cr&&(y+="perspective("+_+Ar),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Cr&&s===Cr&&o===Cr||(y+=o!==Cr||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Ar),u!==Pr&&(y+="rotate("+u+Ar),h!==Pr&&(y+="rotateY("+h+Ar),l!==Pr&&(y+="rotateX("+l+Ar),f===Pr&&d===Pr||(y+="skew("+f+", "+d+Ar),1===c&&1===p||(y+="scale("+c+", "+p+Ar),g.style[cr]=y||"translate(0, 0)"},zr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,d=o.rotation,c=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),O=parseFloat(f);d=parseFloat(d),c=parseFloat(c),(p=parseFloat(p))&&(c+=p=parseFloat(p),d+=p),d||c?(d*=or,c*=or,r=Math.cos(d)*_,i=Math.sin(d)*_,n=Math.sin(d-c)*-m,a=Math.cos(d-c)*m,c&&(p*=or,s=Math.tan(c-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ia(r),i=ia(i),n=ia(n),a=ia(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||O&&!~(f+"").indexOf("px"))&&(x=_d(g,"x",l,"px"),O=_d(g,"y",f,"px")),(v||y||T||b)&&(x=ia(x+v-(v*r+y*n)+T),O=ia(O+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ia(x+u/100*s.width),O=ia(O+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+O+")",g.setAttribute("transform",s),w&&(g.style[cr]=s)};ha("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});br[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return yr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Er,Dr,Rr,Fr={name:"css",register:Sd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w=this._props,x=t.style,O=i.vars.startAt;for(d in Fe||Sd(),this.styles=this.styles||Md(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==d&&(o=e[d],!pt[d]||!ac(d,e,i,n,t,a)))if(l=typeof o,f=br[d],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=ob(o)),f)f(this,t,d,o,i)&&(T=1);else if("--"===d.substr(0,2))s=(getComputedStyle(t).getPropertyValue(d)+"").trim(),o+="",Et.lastIndex=0,Et.test(s)||(c=Ya(s),p=Ya(o)),p?c!==p&&(s=_d(t,d,s,p)+p):c&&(o+=c),this.add(x,"setProperty",s,o,n,a,0,0,d),w.push(d),b.push(d,0,x[d]);else if("undefined"!==l){if(O&&d in O?(s="function"==typeof O[d]?O[d].call(i,n,t,a):O[d],r(s)&&~s.indexOf("random(")&&(s=ob(s)),Ya(s+"")||"auto"===s||(s+=q.units[d]||Ya(yr(t,d))||""),"="===(s+"").charAt(1)&&(s=yr(t,d))):s=yr(t,d),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),d in dr&&("autoAlpha"===d&&(1===h&&"hidden"===yr(t,"visibility")&&u&&(h=0),b.push("visibility",0,x.visibility),Yd(this,x,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==d&&"transform"!==d&&~(d=dr[d]).indexOf(",")&&(d=d.split(",")[0])),m=d in ar)if(this.styles.save(d),g||((v=t._gsap).renderTransform&&!e.parseTransform||Or(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new _e(this._pt,x,cr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===d)this._pt=new _e(this._pt,v,"scaleY",v.scaleY,(_?ka(v.scaleY,_+u):u)-v.scaleY||0,vd),this._pt.u=0,w.push("scaleY",d),d+="X";else{if("transformOrigin"===d){b.push(pr,0,x[pr]),o=de(o),v.svg?le(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&Yd(this,v,"zOrigin",v.zOrigin,p),Yd(this,x,d,kr(s),kr(o)));continue}if("svgOrigin"===d){le(t,o,1,y,0,this);continue}if(d in xr){ve(this,v,d,h,_?ka(h,_+o):o);continue}if("smoothOrigin"===d){Yd(this,v,"smooth",v.smooth,o);continue}if("force3D"===d){v[d]=o;continue}if("transform"===d){xe(this,o,t);continue}}else d in x||(d=mr(d)||d);if(m||(u||0===u)&&(h||0===h)&&!fr.test(o)&&d in x)u=u||0,(c=(s+"").substr((h+"").length))!==(p=Ya(o)||(d in q.units?q.units[d]:c))&&(h=_d(t,d,s,p)),this._pt=new _e(this._pt,m?v:x,d,h,(_?ka(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==d||!1===e.autoRound?vd:yd),this._pt.u=p||0,c!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=xd);else if(d in x)be.call(this,t,d,s,_?_+o:o);else if(d in t)this.add(t,d,s||t[d],_?_+o:o,n,a);else if("parseTransform"!==d){Q(d,o);continue}m||(d in x?b.push(d,0,x[d]):b.push(d,1,s||t[d])),w.push(d)}T&&pe(this)},render:function render(t,e){if(e.tween._time||!Be())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:yr,aliases:dr,getSetter:function getSetter(t,e,r){var i=dr[e];return i&&i.indexOf(",")<0&&(e=i),e in ar&&e!==pr&&(t._gsap.x||yr(t,"x"))?r&&Ie===r?"scale"===e?Ed:Dd:(Ie=r||{})&&("scale"===e?Fd:Gd):t.style&&!u(t.style[e])?Bd:~e.indexOf("-")?Cd:ne(t,e)},core:{_removeProperty:Xd,_getMatrix:ke}};ze.utils.checkPrefix=mr,ze.core.getStyleSaver=Md,Rr=ha((Er="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Dr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){ar[t]=1}),ha(Dr,function(t){q.units[t]="deg",xr[t]=1}),dr[Rr[13]]=Er+","+Dr,ha("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");dr[e[1]]=Rr[e[0]]}),ha("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){q.units[t]="px"}),ze.registerPlugin(Fr);var Lr=ze.registerPlugin(Fr)||ze,Ir=Lr.core.Tween;e.Back=Ze,e.Bounce=er,e.CSSPlugin=Fr,e.Circ=nr,e.Cubic=Qe,e.Elastic=$e,e.Expo=ir,e.Linear=Ge,e.Power0=qe,e.Power1=Ve,e.Power2=Ue,e.Power3=Xe,e.Power4=Ne,e.Quad=We,e.Quart=Ke,e.Quint=Je,e.Sine=rr,e.SteppedEase=tr,e.Strong=He,e.TimelineLite=Xt,e.TimelineMax=Xt,e.TweenLite=$t,e.TweenMax=Ir,e.default=Lr,e.gsap=Lr;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


/* Paper shaders (@paper-design/shaders-react 0.0.81, MIT) — Dithering only, React from window.React */
(()=>{var ce=Object.create;var T=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var he=Object.getOwnPropertyNames;var ue=Object.getPrototypeOf,fe=Object.prototype.hasOwnProperty;var me=(t,e,i)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var X=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(i){throw e=0,i}};var de=(t,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of he(e))!fe.call(t,l)&&l!==i&&T(t,l,{get:()=>e[l],enumerable:!(r=pe(e,l))||r.enumerable});return t};var z=(t,e,i)=>(i=t!=null?ce(ue(t)):{},de(e||!t||!t.__esModule?T(i,"default",{value:t,enumerable:!0}):i,t));var n=(t,e,i)=>me(t,typeof e!="symbol"?e+"":e,i);var V=X((ze,k)=>{k.exports=window.React});var C=X((Xe,re)=>{var ie=window.React;function te(t,e,i){var r=Object.assign({},e);return i!==void 0&&(r.key=i),ie.createElement(t,r)}re.exports={jsx:te,jsxs:te,Fragment:ie.Fragment}});var g=z(V(),1);var Y=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;var $=1920*1080*4,B=class{constructor(e,i,r,l,o=0,s=0,a=2,p=$,h=[]){n(this,"parentElement");n(this,"canvasElement");n(this,"gl");n(this,"program",null);n(this,"uniformLocations",{});n(this,"fragmentShader");n(this,"rafId",null);n(this,"lastRenderTime",0);n(this,"currentFrame",0);n(this,"speed",0);n(this,"currentSpeed",0);n(this,"providedUniforms");n(this,"mipmaps",[]);n(this,"hasBeenDisposed",!1);n(this,"resolutionChanged",!0);n(this,"textures",new Map);n(this,"minPixelRatio");n(this,"maxPixelCount");n(this,"isSafari",ve());n(this,"uniformCache",{});n(this,"textureUnitMap",new Map);n(this,"ownerDocument");n(this,"initProgram",()=>{let e=ge(this.gl,Y,this.fragmentShader);e&&(this.program=e)});n(this,"setupPositionAttribute",()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});n(this,"setupUniforms",()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([i,r])=>{if(e[i]=this.gl.getUniformLocation(this.program,i),r instanceof HTMLImageElement){let l=`${i}AspectRatio`;e[l]=this.gl.getUniformLocation(this.program,l)}}),this.uniformLocations=e});n(this,"renderScale",1);n(this,"parentWidth",0);n(this,"parentHeight",0);n(this,"parentDevicePixelWidth",0);n(this,"parentDevicePixelHeight",0);n(this,"devicePixelsSupported",!1);n(this,"intersectionObserver",null);n(this,"isInViewport",!0);n(this,"resizeObserver",null);n(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{var i;if(e!=null&&e.borderBoxSize[0]){let r=(i=e.devicePixelContentBoxSize)==null?void 0:i[0];r!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=r.inlineSize,this.parentDevicePixelHeight=r.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});n(this,"setupIntersectionObserver",()=>{let e=this.ownerDocument.defaultView;e!=null&&e.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([i])=>{var r;this.isInViewport=(r=i==null?void 0:i.isIntersecting)!=null?r:!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))});n(this,"handleVisualViewportChange",()=>{var e;(e=this.resizeObserver)==null||e.disconnect(),this.setupResizeObserver()});n(this,"handleResize",()=>{var u;let e=0,i=0,r=Math.max(1,window.devicePixelRatio),l=(u=visualViewport==null?void 0:visualViewport.scale)!=null?u:1;if(this.devicePixelsSupported){let c=Math.max(1,this.minPixelRatio/r);e=this.parentDevicePixelWidth*c*l,i=this.parentDevicePixelHeight*c*l}else{let c=Math.max(r,this.minPixelRatio)*l;if(this.isSafari){let x=_e(this.ownerDocument);c*=Math.max(1,x)}e=Math.round(this.parentWidth)*c,i=Math.round(this.parentHeight)*c}let o=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*i),s=Math.min(1,o),a=Math.round(e*s),p=Math.round(i*s),h=a/Math.round(this.parentWidth);(this.canvasElement.width!==a||this.canvasElement.height!==p||this.renderScale!==h)&&(this.renderScale=h,this.canvasElement.width=a,this.canvasElement.height=p,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});n(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let i=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=i*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});n(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});n(this,"setTextureUniform",(e,i)=>{if(!i.complete||i.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let r=this.textures.get(e);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let l=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+l);let o=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let s=this.gl.getError();if(s!==this.gl.NO_ERROR||o===null){console.error("Paper Shaders: WebGL error when uploading texture:",s);return}this.textures.set(e,o);let a=this.uniformLocations[e];if(a){this.gl.uniform1i(a,l);let p=`${e}AspectRatio`,h=this.uniformLocations[p];if(h){let u=i.naturalWidth/i.naturalHeight;this.gl.uniform1f(h,u)}}});n(this,"areUniformValuesEqual",(e,i)=>e===i?!0:Array.isArray(e)&&Array.isArray(i)&&e.length===i.length?e.every((r,l)=>this.areUniformValuesEqual(r,i[l])):!1);n(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([i,r])=>{let l=r;if(r instanceof HTMLImageElement&&(l=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[i],l))return;this.uniformCache[i]=l;let o=this.uniformLocations[i];if(!o){console.warn(`Uniform location for ${i} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(i,r);else if(Array.isArray(r)){let s=null,a=null;if(r[0]!==void 0&&Array.isArray(r[0])){let p=r[0].length;if(r.every(h=>h.length===p))s=r.flat(),a=p;else{console.warn(`All child arrays must be the same length for ${i}`);return}}else s=r,a=s.length;switch(a){case 2:this.gl.uniform2fv(o,s);break;case 3:this.gl.uniform3fv(o,s);break;case 4:this.gl.uniform4fv(o,s);break;case 9:this.gl.uniformMatrix3fv(o,!1,s);break;case 16:this.gl.uniformMatrix4fv(o,!1,s);break;default:console.warn(`Unsupported uniform array length: ${a}`)}}else typeof r=="number"?this.gl.uniform1f(o,r):typeof r=="boolean"?this.gl.uniform1i(o,r?1:0):console.warn(`Unsupported uniform type for ${i}: ${typeof r}`)})});n(this,"getCurrentFrame",()=>this.currentFrame);n(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});n(this,"setSpeed",(e=1)=>{this.speed=e,this.updateCurrentSpeed()});n(this,"updateCurrentSpeed",()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)});n(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});n(this,"setMaxPixelCount",(e=$)=>{this.maxPixelCount=e,this.handleResize()});n(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});n(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});n(this,"handleDocumentVisibilityChange",()=>{this.updateCurrentSpeed()});n(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if((e==null?void 0:e.nodeType)===1)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let x=this.ownerDocument.createElement("style");x.innerHTML=xe,x.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(x)}let u=this.ownerDocument.createElement("canvas");this.canvasElement=u,this.parentElement.prepend(u),this.fragmentShader=i,this.providedUniforms=r,this.mipmaps=h,this.currentFrame=s,this.minPixelRatio=a,this.maxPixelCount=p;let c=u.getContext("webgl2",l);if(!c)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=c,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(o),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function q(t,e,i){let r=t.createShader(e);return r?(t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function ge(t,e,i){let r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),l=r?r.precision:null;l&&l<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let o=q(t,t.VERTEX_SHADER,e),s=q(t,t.FRAGMENT_SHADER,i);if(!o||!s)return null;let a=t.createProgram();return a?(t.attachShader(a,o),t.attachShader(a,s),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?(t.detachShader(a,o),t.detachShader(a,s),t.deleteShader(o),t.deleteShader(s),a):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(a)),t.deleteProgram(a),t.deleteShader(o),t.deleteShader(s),null)):null}var xe=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function ve(){let t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function _e(t){var a,p;let e=(a=visualViewport==null?void 0:visualViewport.scale)!=null?a:1,i=(p=visualViewport==null?void 0:visualViewport.width)!=null?p:window.innerWidth,r=window.innerWidth-t.documentElement.clientWidth,l=e*i+r,o=outerWidth/l,s=Math.round(100*o);return s%5===0?s/100:s===33?1/3:s===67?2/3:s===133?4/3:o}var y={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},P={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},O={none:0,contain:1,cover:2};var K=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`;var Z=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,Q=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var J=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;var D=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${J}
${K}
${Z}
${Q}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,I={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},W={random:1,"2x2":2,"4x4":3,"8x8":4};function E(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:R;if(typeof t!="string")return R;let e,i,r,l=1;if(t.startsWith("#"))[e,i,r,l]=Se(t);else if(t.startsWith("rgb")){let o=be(t);if(o===null)return R;[e,i,r,l]=o}else if(t.startsWith("hsl")){let o=Re(t);if(o===null)return R;[e,i,r,l]=Ue(o)}else return console.error("Unsupported color format",t),R;return[M(e,0,1),M(i,0,1),M(r,0,1),M(l,0,1)]}function Se(t){if(t=t.replace(/^#/,""),(t.length===3||t.length===4)&&(t=t.split("").map(o=>o+o).join("")),t.length===6&&(t=t+"ff"),!/^[0-9a-f]{8}$/i.test(t))return console.warn("Invalid hex color"),R;let e=parseInt(t.slice(0,2),16)/255,i=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255,l=parseInt(t.slice(6,8),16)/255;return[e,i,r,l]}function be(t){var i,r,l;let e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt((i=e[1])!=null?i:"0")/255,parseInt((r=e[2])!=null?r:"0")/255,parseInt((l=e[3])!=null?l:"0")/255,e[4]===void 0?1:parseFloat(e[4])]:null}function Re(t){var i,r,l;let e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt((i=e[1])!=null?i:"0"),parseInt((r=e[2])!=null?r:"0"),parseInt((l=e[3])!=null?l:"0"),e[4]===void 0?1:parseFloat(e[4])]:null}function Ue(t){let[e,i,r,l]=t,o=e/360,s=i/100,a=r/100,p,h,u;if(i===0)p=h=u=a;else{let c=(v,b,m)=>(m<0&&(m+=1),m>1&&(m-=1),m<.16666666666666666?v+(b-v)*6*m:m<.5?b:m<.6666666666666666?v+(b-v)*(.6666666666666666-m)*6:v),x=a<.5?a*(1+s):a+s-a*s,S=2*a-x;p=c(S,x,o+1/3),h=c(S,x,o),u=c(S,x,o-1/3)}return[p,h,u,l]}var M=(t,e,i)=>Math.min(Math.max(t,e),i),R=[.5,.5,.5,1];var G="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";var U=z(V(),1);function ee(t){let e=U.useRef(void 0),i=U.useCallback(r=>{let l=t.map(o=>{if(o!=null){if(typeof o=="function"){let s=o,a=s(r);return typeof a=="function"?a:()=>{s(null)}}return o.current=r,()=>{o.current=null}}});return()=>{l.forEach(o=>o==null?void 0:o())}},t);return U.useMemo(()=>t.every(r=>r==null)?null:r=>{e.current&&(e.current(),e.current=void 0),r!=null&&(e.current=i(r))},t)}function L(t){if(t.naturalWidth<1024&&t.naturalHeight<1024){if(t.naturalWidth<1||t.naturalHeight<1)return;let e=t.naturalWidth/t.naturalHeight;t.width=Math.round(e>1?1024*e:1024),t.height=Math.round(e>1?1024:1024/e)}}var se=z(C(),1);async function oe(t){let e={},i=[],r=o=>{try{return o.startsWith("/")||new URL(o),!0}catch(s){return!1}},l=o=>{try{return o.startsWith("/")?!1:new URL(o,window.location.origin).origin!==window.location.origin}catch(s){return!1}};return Object.entries(t).forEach(([o,s])=>{if(typeof s=="string"){let a=s||G;if(!r(a)){console.warn(`Uniform "${o}" has invalid URL "${a}". Skipping image loading.`);return}let p=new Promise((h,u)=>{let c=new Image;l(a)&&(c.crossOrigin="anonymous"),c.onload=()=>{L(c),e[o]=c,h()},c.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${a}`),u()},c.src=a});i.push(p)}else if(s instanceof HTMLImageElement){let a=s.decode().then(()=>{L(s),e[o]=s});i.push(a)}else e[o]=s}),await Promise.all(i),e}var H=(0,g.forwardRef)(function({fragmentShader:e,uniforms:i,webGlContextAttributes:r,speed:l=0,frame:o=0,width:s,height:a,minPixelRatio:p,maxPixelCount:h,mipmaps:u,style:c,...x},S){let[v,b]=(0,g.useState)(!1),m=(0,g.useRef)(null),_=(0,g.useRef)(null),F=(0,g.useRef)(r);(0,g.useEffect)(()=>((async()=>{let w=await oe(i);m.current&&!_.current&&(_.current=new B(m.current,e,w,F.current,l,o,p,h,u),b(!0))})(),()=>{var w;(w=_.current)==null||w.dispose(),_.current=null}),[e]),(0,g.useEffect)(()=>{let d=!1;return(async()=>{var j;let le=await oe(i);d||(j=_.current)==null||j.setUniforms(le)})(),()=>{d=!0}},[i,v]),(0,g.useEffect)(()=>{var d;(d=_.current)==null||d.setSpeed(l)},[l,v]),(0,g.useEffect)(()=>{var d;(d=_.current)==null||d.setMaxPixelCount(h)},[h,v]),(0,g.useEffect)(()=>{var d;(d=_.current)==null||d.setMinPixelRatio(p)},[p,v]),(0,g.useEffect)(()=>{var d;(d=_.current)==null||d.setFrame(o)},[o,v]);let A=ee([m,S]);return(0,se.jsx)("div",{ref:A,style:s!==void 0||a!==void 0?{width:typeof s=="string"&&isNaN(+s)===!1?+s:s,height:typeof a=="string"&&isNaN(+a)===!1?+a:a,...c}:c,...x})});H.displayName="ShaderMount";var ae=z(V(),1);var ne=z(C(),1),f={name:"Default",params:{...P,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}},Je={name:"Sine Wave",params:{...P,speed:1,frame:0,colorBack:"#730d54",colorFront:"#00becc",shape:"wave",type:"4x4",size:11,scale:1.2}},et={name:"Bugs",params:{...P,speed:1,frame:0,colorBack:"#000000",colorFront:"#008000",shape:"dots",type:"random",size:9}},tt={name:"Ripple",params:{...y,speed:1,frame:0,colorBack:"#603520",colorFront:"#c67953",shape:"ripple",type:"2x2",size:3}},it={name:"Swirl",params:{...y,speed:1,frame:0,colorBack:"#00000000",colorFront:"#47a8e1",shape:"swirl",type:"8x8",size:2}},rt={name:"Warp",params:{...y,speed:1,frame:0,colorBack:"#301c2a",colorFront:"#56ae6c",shape:"warp",type:"4x4",size:2.5}};var N=(0,ae.memo)(function({speed:e=f.params.speed,frame:i=f.params.frame,colorBack:r=f.params.colorBack,colorFront:l=f.params.colorFront,shape:o=f.params.shape,type:s=f.params.type,pxSize:a,size:p=a===void 0?f.params.size:a,fit:h=f.params.fit,scale:u=f.params.scale,rotation:c=f.params.rotation,originX:x=f.params.originX,originY:S=f.params.originY,offsetX:v=f.params.offsetX,offsetY:b=f.params.offsetY,worldWidth:m=f.params.worldWidth,worldHeight:_=f.params.worldHeight,...F}){let A={u_colorBack:E(r),u_colorFront:E(l),u_shape:I[o],u_type:W[s],u_pxSize:p,u_fit:O[h],u_scale:u,u_rotation:c,u_offsetX:v,u_offsetY:b,u_originX:x,u_originY:S,u_worldWidth:m,u_worldHeight:_};return(0,ne.jsx)(H,{...F,speed:e,frame:i,fragmentShader:D,uniforms:A})});window.__GambitPaper={Dithering:N};})();
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  var arrow = function () {
    return h("svg", { width: 14, height: 14, viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true }, h("path", { d: "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" }));
  };

  function Button(p) {
    var variant = p.variant || "secondary", size = p.size || "md";
    var tag = p.href ? "a" : "button";
    var rest = Object.assign({}, p); delete rest.variant; delete rest.size; delete rest.external; delete rest.kbd;
    rest.className = cx("gb-btn", variant !== "secondary" && "gb-btn-" + variant, size === "sm" && "gb-btn-sm", p.className);
    if (p.external) { rest.target = "_blank"; rest.rel = "noopener noreferrer"; }
    return h(tag, rest, p.children, p.external ? arrow() : null, p.kbd ? h("span", { className: "gb-kbd" }, p.kbd) : null);
  }

  function Tag(p) {
    return h("span", { className: cx("gb-tag", p.tone && p.tone !== "neutral" && "gb-tag-" + p.tone, p.className) }, p.children);
  }

  function StatusPill(p) {
    return h("span", { className: cx("gb-pill", p.tone === "muted" && "gb-pill-muted") }, h("span", { className: "gb-pill-dot", "aria-hidden": true }), p.children);
  }

  /* v6: retired. Eyebrows above headings read as template chrome; the move list now lives in StoryRail.
     Kept so existing markup renders nothing instead of breaking. */
  function SectionLabel() { return null; }

  function ProjectCard(p) {
    return h("article", { className: "gb-card" },
      p.mock || p.desktopSrc ? h("div", { className: "gb-card-devices" }, h(DeviceMockup, { url: p.url || (p.liveUrl ? String(p.liveUrl).replace(/^https?:\/\//, "").replace(/\/$/, "") : p.thumbnail), liveUrl: p.live ? p.liveUrl : null, mock: p.mock, mobileMock: p.mobileMock, desktopSrc: p.desktopSrc, phoneSrc: p.phoneSrc, compact: true })) :
      p.thumbnail === false ? null : h("div", { className: "gb-thumb", role: "img", "aria-label": p.title + " screenshot" }, p.thumbnail || "SCREENSHOT 16:9"),
      h("div", { className: "gb-card-meta" }, h("span", null, p.period), p.award ? h(Tag, { tone: "award" }, p.award) : h("span", null, p.status)),
      h("h3", { className: "gb-card-title" }, p.title),
      h("p", { className: "gb-card-body" }, p.summary),
      p.tags ? h("div", { className: "gb-card-tags" }, p.tags.map(function (t) { return h(Tag, { key: t }, t); })) : null,
      (p.liveUrl || p.repoUrl) ? h("div", { className: "gb-card-links" },
        p.liveUrl ? h("a", { href: p.liveUrl, target: "_blank", rel: "noopener noreferrer" }, "Live ↗") : null,
        p.repoUrl ? h("a", { href: p.repoUrl, target: "_blank", rel: "noopener noreferrer" }, "Code ↗") : null) : null);
  }

  function CertCard(p) {
    return h("article", { className: "gb-card gb-cert" },
      h("div", { className: "gb-cert-mark", "aria-hidden": true }, p.mark),
      h("div", null,
        h("div", { className: "gb-cert-issuer" }, p.issuer),
        h("h3", { className: "gb-cert-title" }, p.title)),
      p.note ? h("div", { className: "gb-cert-note" }, p.note) : null,
      p.learned && p.learned.length ? h("ul", { className: "gb-cert-learned", "aria-label": "What I learned" }, p.learned.map(function (x, i) { return h("li", { key: i }, x); })) : null,
      h("div", { className: "gb-cert-foot" },
        h("span", null, p.date, p.length ? ", " + p.length : ""),
        p.verifyUrl ? h("a", { href: p.verifyUrl, target: "_blank", rel: "noopener noreferrer" }, "Verify ↗") : null));
  }

  function TimelineItem(p) {
    return h("div", { className: "gb-tl" },
      h("div", { className: "gb-tl-move" }, p.move, ".", p.current ? h("b", null, " ●") : null),
      h("div", null,
        h("div", { className: "gb-tl-head" },
          h("div", null, h("h3", { className: "gb-tl-role" }, p.role), h("div", { className: "gb-tl-org" }, p.org)),
          h("div", { className: "gb-tl-date" }, p.period)),
        p.points ? h("ul", null, p.points.map(function (x, i) { return h("li", { key: i }, x); })) : null,
        p.tags ? h("div", { className: "gb-card-tags", style: { marginTop: 12 } }, p.tags.map(function (t) { return h(Tag, { key: t }, t); })) : null));
  }

  function reducedMotion() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  /* Count-up for the numeric part of a value ("51", "#3", "7/9" counts the first number). */
  function useCountUp(value, on, delay) {
    var str = String(value == null ? "" : value), m = str.match(/^(\D*)(\d+)(.*)$/);
    var st = React.useState(on && m && !reducedMotion() ? 0 : null), cur = st[0], set = st[1];
    React.useEffect(function () {
      if (cur === null || !m) return;
      var target = parseInt(m[2], 10), t0 = null, raf;
      var timer = setTimeout(function () {
        function tick(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 900); set(Math.round(target * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick); else set(null); }
        raf = requestAnimationFrame(tick);
      }, delay || 0);
      return function () { clearTimeout(timer); cancelAnimationFrame(raf); };
    }, []);
    return cur === null || !m ? str : m[1] + cur + m[3];
  }
  function StatBlock(p) {
    var shown = useCountUp(p.value, p.animate, p.delay);
    return h("div", { className: "gb-stat" },
      h("div", { className: "gb-stat-num", "aria-label": String(p.value) + (p.unit || "") }, h("span", { "aria-hidden": true }, shown), p.unit ? h("em", { "aria-hidden": true }, p.unit) : null),
      h("div", { className: "gb-stat-label" }, p.label));
  }

  function ThemeToggle(p) {
    var st = React.useState(p.value === "light" ? "light" : "dark"), v = st[0], set = st[1];
    function pick(x) { set(x); if (p.onChange) p.onChange(x); else document.documentElement.setAttribute("data-theme", x); }
    var opts = [["light", "sun", "Light theme"], ["dark", "moon", "Dark theme"]];
    return h("div", { className: "gb-toggle", role: "group", "aria-label": "Theme" },
      opts.map(function (o) { return h("button", { key: o[0], type: "button", "aria-pressed": v === o[0], "aria-label": o[2], title: o[2], onClick: function () { pick(o[0]); } }, h(Icon, { name: o[1], size: 15 })); }));
  }

  /* ---------- icons (Lucide paths, 1.75 stroke) ---------- */
  /* Phosphor Icons (regular, MIT), 256 grid */
  var ICONS = {"grid": "M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z", "chart": "M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z", "folder": "M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z", "pen": "M248,92.68a15.86,15.86,0,0,0-4.69-11.31L174.63,12.68a16,16,0,0,0-22.63,0L123.57,41.11l-58,21.77A16.06,16.06,0,0,0,55.35,75.23L32.11,214.68A8,8,0,0,0,40,224a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L243.31,104A15.87,15.87,0,0,0,248,92.68Zm-69.87,92.19L63.32,204l47.37-47.37a28,28,0,1,0-11.32-11.32L52,192.7,71.13,77.86,126,57.29,198.7,130ZM112,132a12,12,0,1,1,12,12A12,12,0,0,1,112,132Zm96-15.32L139.31,48l24-24L232,92.68Z", "award": "M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z", "briefcase": "M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z", "cap": "M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z", "layers": "M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z", "quote": "M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z", "inbox": "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z", "user": "M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z", "file": "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z", "ext": "M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z", "out": "M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z", "edit": "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z", "trash": "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z", "eye": "M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z", "search": "M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z", "plus": "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z", "crown": "M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z", "mouse": "M144,16H112A64.07,64.07,0,0,0,48,80v96a64.07,64.07,0,0,0,64,64h32a64.07,64.07,0,0,0,64-64V80A64.07,64.07,0,0,0,144,16Zm48,160a48.05,48.05,0,0,1-48,48H112a48.05,48.05,0,0,1-48-48V80a48.05,48.05,0,0,1,48-48h32a48.05,48.05,0,0,1,48,48ZM136,83.31v89.38l10.34-10.35a8,8,0,0,1,11.32,11.32l-24,24a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L120,172.69V83.31L109.66,93.66A8,8,0,0,1,98.34,82.34l24-24a8,8,0,0,1,11.32,0l24,24a8,8,0,0,1-11.32,11.32Z", "grip": "M104,60A12,12,0,1,1,92,48,12,12,0,0,1,104,60Zm60,12a12,12,0,1,0-12-12A12,12,0,0,0,164,72ZM92,116a12,12,0,1,0,12,12A12,12,0,0,0,92,116Zm72,0a12,12,0,1,0,12,12A12,12,0,0,0,164,116ZM92,184a12,12,0,1,0,12,12A12,12,0,0,0,92,184Zm72,0a12,12,0,1,0,12,12A12,12,0,0,0,164,184Z", "upload": "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z", "check": "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z", "x": "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z", "reply": "M232,200a8,8,0,0,1-16,0,88.1,88.1,0,0,0-88-88H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,61.66L51.31,96H128A104.11,104.11,0,0,1,232,200Z", "archive": "M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM208,192H48V104H208ZM224,88H32V64H224V88ZM96,136a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136Z", "sun": "M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z", "moon": "M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z", "monitor": "M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Z", "calendar": "M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z", "clock": "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z", "video": "M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z", "left": "M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z", "right": "M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z", "arrow": "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z", "down": "M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z", "trophy": "M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z", "globe": "M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z", "mail": "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z", "play": "M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z", "pause": "M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z", "menu": "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z", "letter": "M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192ZM128,41.61l81.91,54.61-67,47.78H113.11l-67-47.78Z", "chev": "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z", "target": "M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z", "knight": "M136,100a12,12,0,1,1-12-12A12,12,0,0,1,136,100Zm96,29.48A104.29,104.29,0,0,1,130.1,232l-2.17,0a103.32,103.32,0,0,1-69.26-26A8,8,0,1,1,69.34,194a84.71,84.71,0,0,0,20.1,13.37L116,170.84c-22.78-9.83-47.47-5.65-61.4-3.29A31.84,31.84,0,0,1,23.3,154.72l-.3-.43-13.78-22a8,8,0,0,1,2.59-11.05L112,59.53V32a8,8,0,0,1,8-8h8A104,104,0,0,1,232,129.48Zm-16-.22A88,88,0,0,0,128,40V64a8,8,0,0,1-3.81,6.81L27.06,130.59l9.36,15A15.92,15.92,0,0,0,52,151.77c16-2.7,48.77-8.24,78.07,8.18A40.06,40.06,0,0,0,168,120a8,8,0,0,1,16,0,56.07,56.07,0,0,1-51.8,55.83l-27.11,37.28A90.89,90.89,0,0,0,129.78,216,88.29,88.29,0,0,0,216,129.26Z", "book": "M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z", "code": "M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z", "shield": "M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z", "brain": "M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z", "database": "M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z", "lock": "M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z", "github": "M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z", "linkedin": "M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z", "newtab": "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z", "puzzle": "M220.27,158.54a8,8,0,0,0-7.7-.46,20,20,0,1,1,0-36.16A8,8,0,0,0,224,114.69V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36.11,36.11,0,0,0-11.36-26.24,36,36,0,0,0-60.55,23.62,36.56,36.56,0,0,0,.14,6.62H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36.12,36.12,0,0,0-26.24,11.36,35.7,35.7,0,0,0-9.69,27,36.08,36.08,0,0,0,33.31,33.6,35.68,35.68,0,0,0,6.62-.14V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V165.31A8,8,0,0,0,220.27,158.54ZM208,208H64V165.31a8,8,0,0,0-11.43-7.23,20,20,0,1,1,0-36.16A8,8,0,0,0,64,114.69V72h46.69a8,8,0,0,0,7.23-11.43,20,20,0,1,1,36.16,0A8,8,0,0,0,161.31,72H208v32.23a35.68,35.68,0,0,0-6.62-.14A36,36,0,0,0,204,176a35.36,35.36,0,0,0,4-.22Z", "terminal": "M128,128a8,8,0,0,1-3,6.25l-40,32a8,8,0,1,1-10-12.5L107.19,128,75,102.25a8,8,0,1,1,10-12.5l40,32A8,8,0,0,1,128,128Zm48,24H136a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm56-96V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z", "cursor": "M88,24V16a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0ZM16,104h8a8,8,0,0,0,0-16H16a8,8,0,0,0,0,16ZM124.42,39.16a8,8,0,0,0,10.74-3.58l8-16a8,8,0,0,0-14.31-7.16l-8,16A8,8,0,0,0,124.42,39.16Zm-96,81.69-16,8a8,8,0,0,0,7.16,14.31l16-8a8,8,0,1,0-7.16-14.31ZM219.31,184a16,16,0,0,1,0,22.63l-12.68,12.68a16,16,0,0,1-22.63,0L132.7,168,115,214.09c0,.1-.08.21-.13.32a15.83,15.83,0,0,1-14.6,9.59l-.79,0a15.83,15.83,0,0,1-14.41-11L32.8,52.92A16,16,0,0,1,52.92,32.8L213,85.07a16,16,0,0,1,1.41,29.8l-.32.13L168,132.69ZM208,195.31,156.69,144h0a16,16,0,0,1,4.93-26l.32-.14,45.95-17.64L48,48l52.2,159.86,17.65-46c0-.11.08-.22.13-.33a16,16,0,0,1,11.69-9.34,16.72,16.72,0,0,1,3-.28,16,16,0,0,1,11.3,4.69L195.31,208Z", "sparkle": "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z", "plusminus": "M205.66,61.66l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.32ZM64,112a8,8,0,0,0,16,0V80h32a8,8,0,0,0,0-16H80V32a8,8,0,0,0-16,0V64H32a8,8,0,0,0,0,16H64Zm160,64H144a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Z"};
  function Icon(p) {
    if (p.name === "taskview") return h("svg", { width: p.size || 16, height: p.size || 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, className: "gb-icon" },
      h("rect", { x: 4.5, y: 6.5, width: 10, height: 11, rx: 1.8 }), h("path", { d: "M17.5 8.5v7" }), h("path", { d: "M20.5 10v4" }), h("path", { d: "M7 4h5" }));
    return h("svg", { width: p.size || 16, height: p.size || 16, viewBox: "0 0 256 256", fill: "currentColor", "aria-hidden": true, className: "gb-icon" },
      h("path", { d: ICONS[p.name] || ICONS.grid }));
  }

  /* ---------- public site ---------- */
  var SITE = [["Work", "/work"], ["Services", "/services"], ["Career", "/career"], ["Chess", "/chess"]];
  var NAV_NOTE = { Work: "Case studies and every project", Services: "What I build and what it costs", Career: "Every move since 2020", Chess: "Results, the game, a challenge" };
  function MenuGlyph(p) { return h("span", { className: cx("gb-burger", p.open && "is-open"), "aria-hidden": true }, h("i"), h("i")); }
  function SiteNav(p) {
    var items = p.items || SITE.map(function (x) { return { label: x[0], href: x[1] }; });
    var ms = React.useState(false), open = ms[0], setOpen = ms[1];
    var sheet = React.useRef(null), btn = React.useRef(null);
    React.useEffect(function () {
      var el = sheet.current; if (!open || !el) return;
      lockScroll(true);
      var g = G7(), links = [].slice.call(el.querySelectorAll(".gb-navsheet-link, .gb-navsheet-foot > *"));
      if (g && !reducedMotion()) {
        g.fromTo(el, { clipPath: "inset(0 0 100% 0 round 24px)", opacity: 1 }, { clipPath: "inset(0 0 0% 0 round 24px)", duration: 0.5, ease: "expo.out" });
        g.fromTo(links, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: Math.min(0.06, 0.4 / Math.max(links.length, 1)), delay: 0.08 });
      }
      var first = el.querySelector("a"); if (first) first.focus({ preventScroll: true });
      function key(e) { if (e.key === "Escape") { setOpen(false); if (btn.current) btn.current.focus(); } else trapTab(e, el.parentNode); }
      document.addEventListener("keydown", key);
      function wide() { if (window.innerWidth > 820) setOpen(false); }
      window.addEventListener("resize", wide);
      return function () { document.removeEventListener("keydown", key); window.removeEventListener("resize", wide); lockScroll(false); };
    }, [open]);
    var book = p.bookHref || p.contactHref || "/book";
    return h(React.Fragment, null,
      h("a", { className: "gb-skip", href: p.skipHref || "#gb-content" }, "Skip to content"),
      h("header", { className: cx("gb-sitenav", open && "is-open") },
        h("nav", { className: "gb-sitenav-in", "aria-label": "Main" },
          h("a", { className: "gb-brand", href: p.homeHref || "/", "aria-label": "Lewis Magangi, home" }, h("span", { className: "gb-mono" }, "LM"), h("span", { className: "gb-brand-name" }, "Lewis Magangi")),
          h("div", { className: "gb-sitenav-links" }, items.map(function (it) { return h("a", { key: it.label, href: it.href, "aria-current": p.active === it.label ? "page" : undefined }, it.label); })),
          h("div", { className: "gb-sitenav-end" },
            h("span", { className: "gb-sitenav-theme" }, h(ThemeToggle, { value: p.theme || "dark", onChange: p.onTheme })),
            h(Button, { size: "sm", variant: "primary", href: book, className: "gb-sitenav-cta" }, h(Icon, { name: "calendar", size: 15 }), h("span", { className: "gb-cta-long" }, p.ctaLabel || "Book a call"), h("span", { className: "gb-cta-short" }, "Book")),
            h("button", { type: "button", ref: btn, className: "gb-iconbtn gb-sitenav-menu", "aria-expanded": open, "aria-controls": "gb-navsheet", "aria-label": open ? "Close menu" : "Open menu", onClick: function () { setOpen(!open); } }, h(MenuGlyph, { open: open })))),
        open ? h("div", { className: "gb-navsheet", id: "gb-navsheet", ref: sheet, role: "dialog", "aria-modal": "true", "aria-label": "Menu" },
          h("ol", { className: "gb-navsheet-list" }, items.map(function (it, i) {
            return h("li", { key: it.label }, h("a", { className: "gb-navsheet-link", href: it.href, "aria-current": p.active === it.label ? "page" : undefined, onClick: function () { setOpen(false); } },
              h("span", { className: "gb-navsheet-n", "aria-hidden": true }, (i + 1) + "."),
              h("span", { className: "gb-navsheet-t" }, h("strong", null, it.label), h("span", null, it.note || NAV_NOTE[it.label] || "")),
              h(Icon, { name: "right", size: 18 })));
          })),
          h("div", { className: "gb-navsheet-foot" },
            h(Button, { variant: "primary", href: book, className: "gb-navsheet-book" }, h(Icon, { name: "calendar", size: 16 }), "Book a free discovery call"),
            h("div", { className: "gb-navsheet-meta" }, h("span", null, "Theme"), h(ThemeToggle, { value: p.theme || "dark", onChange: p.onTheme })))) : null),
      open ? h("div", { className: "gb-navsheet-scrim", onClick: function () { setOpen(false); } }) : null,
      p.cursor === false ? null : h(Cursor),
      p.skipHref ? null : h("span", { id: "gb-content", tabIndex: -1, className: "gb-skip-target" }));
  }

  /* ---------- admin ---------- */
  var ADMIN = [
    ["Overview", [["Dashboard", "grid", "/admin"], ["Analytics", "chart", "/admin/analytics"]]],
    ["Content", [["Projects", "folder", "/admin/projects"], ["Services", "briefcase", "/admin/services"], ["Blog", "pen", "/admin/blog"], ["Certificates", "award", "/admin/certificates"], ["Awards", "trophy", "/admin/awards"], ["References", "quote", "/admin/references"], ["Chess", "crown", "/admin/chess"], ["Challenges", "knight", "/admin/challenges"], ["Books", "book", "/admin/books"], ["Experience", "briefcase", "/admin/experiences"], ["Education", "cap", "/admin/education"], ["Skills", "layers", "/admin/skills"]]],
    ["Inbox", [["Messages", "inbox", "/admin/messages"], ["Bookings", "calendar", "/admin/bookings"], ["Transcripts", "lock", "/admin/transcripts"]]],
    ["Settings", [["Profile", "user", "/admin/profile"], ["CV", "file", "/admin/cv"]]]
  ];
  function AdminSidebar(p) {
    var hrefs = p.hrefs || {}, counts = p.counts || {};
    return h("aside", { className: "gb-side", "aria-label": "Admin" },
      h("div", { className: "gb-side-brand" }, h("span", { className: "gb-mono" }, "LM"), h("span", null, "Admin"), h("small", null, "CMS")),
      ADMIN.map(function (g) {
        return h("nav", { key: g[0], className: "gb-side-group", "aria-label": g[0] }, h("div", { className: "gb-side-title" }, g[0]),
          g[1].map(function (it) {
            return h("a", { key: it[0], href: hrefs[it[0]] || it[2], "aria-current": p.active === it[0] ? "page" : undefined },
              h(Icon, { name: it[1] }), it[0], counts[it[0]] ? h("span", { className: "gb-side-count", "aria-label": counts[it[0]] + " new" }, counts[it[0]]) : null);
          }));
      }),
      h("div", { className: "gb-side-foot" },
        h("a", { href: p.siteHref || "/" }, h(Icon, { name: "ext" }), "View site"),
        h("a", { href: p.logoutHref || "/admin/login" }, h(Icon, { name: "out" }), "Log out")));
  }

  function PageHeader(p) {
    return h("div", { className: "gb-ph" },
      h("div", null, p.crumb ? h("div", { className: "gb-ph-crumb" }, p.crumb) : null, h("h1", null, p.title), p.description ? h("p", null, p.description) : null),
      p.children ? h("div", { className: "gb-ph-actions" }, p.children) : null);
  }

  var TONE = { PENDING: "warn", EXPIRED: "neutral", DECLINED: "danger", REVOKED: "danger", READING_NOW: "warn", UP_NEXT: "neutral", FINISHED: "success", CONFIRMED: "success", UPCOMING: "success", RESCHEDULED: "warn", REQUESTED: "warn", CANCELLED: "danger", NO_SHOW: "danger", HELD: "neutral", PUBLISHED: "success", APPROVED: "success", COMPLETED: "success", REPLIED: "success", ACTIVE: "success", VERIFIED: "success", DRAFT: "warn", PENDING: "warn", IN_PROGRESS: "warn", NEW: "warn", ARCHIVED: "neutral", READ: "neutral", REJECTED: "danger", SPAM: "danger", DELETED: "danger" };
  function StatusBadge(p) {
    var s = String(p.status || "").toUpperCase();
    return h("span", { className: "gb-status gb-status-" + (p.tone || TONE[s] || "neutral") }, p.label || (s.charAt(0) + s.slice(1).toLowerCase()).replace(/_/g, " "));
  }

  function Switch(p) {
    var st = React.useState(!!p.checked), on = st[0], set = st[1];
    return h("button", { type: "button", role: "switch", "aria-checked": on, className: "gb-switch", onClick: function () { set(!on); if (p.onChange) p.onChange(!on); } },
      h("span", { className: "gb-switch-track", "aria-hidden": true }), p.label);
  }

  function DataTable(p) {
    var cols = p.columns || [], rows = p.rows || [];
    function cell(c, r) {
      var v = r[c.key];
      if (c.type === "status") return h(StatusBadge, { status: v });
      if (c.type === "switch") return h(Switch, { checked: v, label: h("span", { className: "gb-sr" }, "") });
      if (c.type === "tags") return h("span", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, (v || []).map(function (t) { return h(Tag, { key: t }, t); }));
      if (c.type === "title") return h("span", null, h("strong", { style: { fontWeight: 600 } }, v), r[c.sub] ? h("span", { className: "gb-td-sub" }, r[c.sub]) : null);
      return v;
    }
    return h("div", { className: "gb-tablewrap" },
      p.toolbar === false ? null : h("div", { className: "gb-toolbar" },
        h("label", { className: "gb-search" }, h(Icon, { name: "search" }), h("input", { type: "search", placeholder: p.searchPlaceholder || "Search…", "aria-label": "Search" })),
        (p.filters || []).map(function (f, i) { return h("button", { key: f, type: "button", className: "gb-chip", "aria-pressed": i === (p.activeFilter || 0), onClick: p.onFilter ? function () { p.onFilter(i); } : undefined }, f); })),
      h("table", { className: "gb-table" },
        h("thead", null, h("tr", null,
          p.selectable ? h("th", { style: { width: 28 } }, h("input", { type: "checkbox", "aria-label": "Select all" })) : null,
          cols.map(function (c) { return h("th", { key: c.key, style: { width: c.width, textAlign: c.align } }, c.label); }),
          p.actions === false ? null : h("th", { style: { width: 112, textAlign: "right" } }, h("span", { className: "gb-sr" }, "Actions")))),
        h("tbody", null, rows.map(function (r, i) {
          return h("tr", { key: i },
            p.selectable ? h("td", null, h("input", { type: "checkbox", "aria-label": "Select row " + (i + 1) })) : null,
            cols.map(function (c) { return h("td", { key: c.key, className: c.type === "mono" ? "gb-td-mono" : undefined, style: { textAlign: c.align } }, cell(c, r)); }),
            p.actions === false ? null : h("td", null, h("div", { className: "gb-rowactions" },
              (r._actions || p.rowActions || ["view", "edit", "delete"]).map(function (a) {
                var map = { view: ["eye", "View"], edit: ["edit", "Edit"], delete: ["trash", "Delete"], reply: ["reply", "Reply"], archive: ["archive", "Archive"], approve: ["check", "Approve"], reapprove: ["check", "Approve again"], reject: ["x", "Reject"], decline: ["x", "Decline"], revoke: ["lock", "Revoke access"] };
                return h("button", { key: a, type: "button", className: "gb-iconbtn" + (a === "delete" || a === "revoke" ? " gb-iconbtn-danger" : ""), title: map[a][1], "aria-label": map[a][1] + " " + (r[cols[0].key] || ""), onClick: p.onAction ? function () { p.onAction(a, r, i); } : undefined }, h(Icon, { name: map[a][0] }));
              }))));
        }))),
      rows.length ? null : h("p", { className: "gb-table-empty" }, p.empty || "Nothing here."),
      p.footer === false ? null : h("div", { className: "gb-tablefoot" }, h("span", null, (p.total || rows.length) + (((p.total || rows.length) === 1) ? " item" : " items")), h("span", null, p.footer || "Page 1 of 1")));
  }

  function Field(p) {
    var id = "f-" + String(p.label || "").replace(/\W+/g, "-").toLowerCase();
    var ctl;
    if (p.type === "textarea") ctl = h("textarea", { id: id, defaultValue: p.value, placeholder: p.placeholder, rows: p.rows || 4 });
    else if (p.type === "select") ctl = h("select", { id: id, defaultValue: p.value }, (p.options || []).map(function (o) { return h("option", { key: o }, o); }));
    else ctl = h("input", { id: id, type: p.type || "text", defaultValue: p.value, placeholder: p.placeholder, required: p.required, "aria-invalid": p.error ? true : undefined });
    return h("div", { className: cx("gb-field", p.error && "gb-field-error"), style: p.style },
      h("label", { className: "gb-field-label", htmlFor: id }, p.label, p.optional ? h("em", null, "optional") : null),
      ctl,
      p.error ? h("span", { className: "gb-field-err", role: "alert" }, "⚠ " + p.error) : p.hint ? h("span", { className: "gb-field-hint" }, p.hint) : null);
  }

  function ListEditor(p) {
    var items = p.items || [];
    return h("div", { className: "gb-field" },
      h("span", { className: "gb-field-label" }, p.label),
      h("div", { className: "gb-list" },
        items.map(function (t, i) {
          return h("div", { key: i, className: "gb-list-row" },
            h("span", { className: "gb-list-grip", "aria-hidden": true }, h(Icon, { name: "grip" })),
            h("span", { className: "gb-list-n" }, String(i + 1).padStart(2, "0")),
            h("input", { defaultValue: t, "aria-label": (p.itemLabel || "Item") + " " + (i + 1) }),
            h("button", { type: "button", className: "gb-iconbtn gb-iconbtn-danger", "aria-label": "Remove " + (p.itemLabel || "item") + " " + (i + 1) }, h(Icon, { name: "x" })));
        }),
        h("div", { className: "gb-list-add" }, h(Button, { size: "sm", variant: "ghost" }, "+ Add " + (p.itemLabel || "item").toLowerCase()))),
      p.hint ? h("span", { className: "gb-field-hint" }, p.hint) : null);
  }

  function FileDrop(p) {
    return h("button", { type: "button", className: "gb-drop" },
      h("span", { className: "gb-drop-icon", "aria-hidden": true }, h(Icon, { name: "upload", size: 18 })),
      h("span", null, h("strong", null, p.label || "Drop a file or browse"), p.hint),
      p.file ? h("span", { className: "gb-drop-file" }, p.file) : null);
  }

  function ConfirmDialog(p) {
    var box = React.useRef(null);
    React.useEffect(function () {
      if (!p.onCancel || !box.current) return;
      var el = box.current, prev = document.activeElement, b = el.querySelector("button"); if (b) b.focus();
      function key(e) { if (e.key === "Escape") { e.preventDefault(); p.onCancel(); } else trapTab(e, el); }
      el.addEventListener("keydown", key);
      return function () { el.removeEventListener("keydown", key); if (prev && prev.focus) prev.focus({ preventScroll: true }); };
    }, []);
    return h("div", { className: cx("gb-dialog-scrim", p.fixed && "is-fixed"), onClick: p.onCancel ? function (e) { if (e.target === e.currentTarget) p.onCancel(); } : undefined },
      h("div", { className: "gb-dialog", ref: box, role: "alertdialog", "aria-modal": true, "aria-labelledby": "gb-dlg-t", "aria-describedby": "gb-dlg-b" },
        h("h2", { id: "gb-dlg-t" }, p.title),
        h("p", { id: "gb-dlg-b" }, p.body),
        h("div", { className: "gb-dialog-actions" },
          h(Button, { onClick: p.onCancel }, p.cancelLabel || "Cancel"),
          h(Button, { variant: p.tone === "neutral" ? "primary" : "danger", onClick: p.onConfirm }, p.confirmLabel || "Delete"))));
  }

  function Toast(p) {
    return h("div", { className: cx("gb-toast", p.tone === "danger" && "gb-toast-danger"), role: "status" },
      h("span", { className: "gb-toast-icon", "aria-hidden": true }, h(Icon, { name: p.tone === "danger" ? "x" : "check", size: 12 })), p.children);
  }

  function EmptyState(p) {
    return h("div", { className: "gb-empty" }, h("div", { className: "gb-empty-art", "aria-hidden": true }), h("h3", null, p.title), p.body ? h("p", null, p.body) : null, p.children);
  }


  /* ---------- Timeline: the career as a game score ---------- */
  function Timeline(p) {
    var items = p.items || [];
    var kinds = []; items.forEach(function (it) { if (kinds.indexOf(it.kind) < 0) kinds.push(it.kind); });
    var fs = React.useState("All"), filter = fs[0], setFilter = fs[1];
    var visible = items.map(function (it, i) { return { it: it, i: i }; }).filter(function (x) { return filter === "All" || x.it.kind === filter; });
    var startIdx = p.initial != null ? p.initial : items.length - 1;
    var as = React.useState(startIdx), active = as[0], setActive = as[1];
    var ps = React.useState(false), playing = ps[0], setPlaying = ps[1];
    var listRef = React.useRef(null), trackRef = React.useRef(null), fillRef = React.useRef(null);
    var ts = React.useState(false), tv = ts[0], setTv = ts[1];
    var vIdx = visible.map(function (x) { return x.i; });
    var pos = vIdx.indexOf(active);
    React.useEffect(function () {
      if (!playing) return;
      var t = setTimeout(function () {
        var k = vIdx.indexOf(active);
        if (k < 0) { setActive(vIdx[0]); return; }
        if (k >= vIdx.length - 1) { setPlaying(false); return; }
        setActive(vIdx[k + 1]);
      }, reducedMotion() ? 900 : 1500);
      return function () { clearTimeout(t); };
    }, [playing, active, filter]);
    var clickRef = React.useRef(0);
    React.useEffect(function () {
      if (!p.scrollSpy || !listRef.current || typeof IntersectionObserver === "undefined") return;
      var io = new IntersectionObserver(function (es) {
        if (playing || Date.now() - clickRef.current < 1200) return;
        es.forEach(function (e) { if (e.isIntersecting) { var i = parseInt(e.target.getAttribute("data-i"), 10); if (!isNaN(i)) setActive(i); } });
      }, { rootMargin: "-42% 0px -52% 0px" });
      [].slice.call(listRef.current.querySelectorAll(".gb-tline-item")).forEach(function (el) { io.observe(el); });
      return function () { io.disconnect(); };
    }, [p.scrollSpy, playing, filter]);
    function go(i) { clickRef.current = Date.now(); setPlaying(false); setActive(i); }
    /* The rail lights continuously: with scroll-spy it follows the reading line, otherwise it eases to the open move. GSAP smooths it; no scroll is intercepted. */
    React.useEffect(function () {
      var list = listRef.current, track = trackRef.current, fill = fillRef.current; if (!list || !track || !fill) return;
      var g = G7(), q = g && !reducedMotion() ? g.quickTo(fill, "scaleY", { duration: 0.6, ease: "power3.out" }) : null, raf = 0, top = 0, len = 1;
      function dots() { return [].slice.call(list.querySelectorAll(".gb-tline-item .gb-tline-dot")); }
      function measure() {
        var d = dots(); if (!d.length) return;
        var lr = list.getBoundingClientRect(), a = d[0].getBoundingClientRect(), z = d[d.length - 1].getBoundingClientRect();
        top = a.top + a.height / 2 - lr.top; len = Math.max(1, z.top + z.height / 2 - lr.top - top);
        track.style.left = (a.left + a.width / 2 - lr.left) + "px"; track.style.top = top + "px"; track.style.height = len + "px";
      }
      function update() {
        raf = 0; measure();
        var lr = list.getBoundingClientRect(), target;
        if (p.scrollSpy && !tv) target = window.innerHeight * 0.45 - lr.top - top;
        else { var cur = list.querySelector(".gb-tline-item.is-active .gb-tline-dot"); target = cur ? cur.getBoundingClientRect().top + cur.getBoundingClientRect().height / 2 - lr.top - top : 0; }
        var v = Math.max(0, Math.min(1, target / len));
        if (q) q(v); else fill.style.transform = "scaleY(" + v + ")";
        dots().forEach(function (d) { var r = d.getBoundingClientRect(), y = r.top + r.height / 2 - lr.top - top; d.closest(".gb-tline-item").classList.toggle("is-lit", y <= target + 1); });
      }
      function on() { if (!raf) raf = requestAnimationFrame(update); }
      update();
      var t = setTimeout(update, 320);
      window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
      var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(on) : null; if (ro) ro.observe(list);
      return function () { clearTimeout(t); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (ro) ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
    }, [active, filter, tv, p.scrollSpy]);
    function onKey(e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      var k = vIdx.indexOf(active), nk = Math.max(0, Math.min(vIdx.length - 1, (k < 0 ? 0 : k) + (e.key === "ArrowDown" ? 1 : -1)));
      go(vIdx[nk]);
      var el = listRef.current && listRef.current.querySelector('[data-i="' + vIdx[nk] + '"] .gb-tline-head');
      if (el) el.focus();
    }
    function replay() { if (playing) { setPlaying(false); return; } setActive(vIdx[0]); setPlaying(true); }
    var lastYear = null;
    return h("div", { className: "gb-tline" },
      p.controls === false || p.controls === "false" ? null : h("div", { className: "gb-tline-bar" },
        h("div", { className: "gb-tline-filters", role: "group", "aria-label": "Filter moves" },
          ["All"].concat(kinds).map(function (k) {
            var c = k === "All" ? items.length : items.filter(function (x) { return x.kind === k; }).length;
            return h("button", { key: k, type: "button", className: "gb-chip", "aria-pressed": filter === k, onClick: function () { setPlaying(false); setFilter(k); } }, (p.kindLabels && p.kindLabels[k]) || k, h("span", { className: "gb-chip-n" }, c));
          })),
        h("div", { className: "gb-tline-play" },
          h("span", { className: "gb-tline-count", "aria-live": "polite" }, pos >= 0 ? "Move " + (pos + 1) + " of " + vIdx.length : vIdx.length + " moves"),
          h(Button, { size: "sm", onClick: function () { setTv(true); }, "aria-haspopup": "dialog", className: "gb-tline-tv" }, h(Icon, { name: "taskview", size: 16 }), "Task view"))),
      tv ? h(TaskView, { items: items, active: active, title: p.taskTitle || "Every move, in order", onPick: function (i) { setFilter("All"); go(i); setTimeout(function () { var el = listRef.current && listRef.current.querySelector('[data-i="' + i + '"]'); if (el) { el.scrollIntoView({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" }); var hd = el.querySelector(".gb-tline-head"); if (hd) hd.focus({ preventScroll: true }); } }, 60); }, onClose: function () { setTv(false); } }) : null,
      h("ol", { className: "gb-tline-list", ref: listRef, onKeyDown: onKey },
        h("li", { className: "gb-tline-track", "aria-hidden": true, ref: trackRef }, h("span", { className: "gb-tline-fill", ref: fillRef })),
        visible.map(function (x, j) {
          var it = x.it, i = x.i, on = i === active, passed = pos >= 0 && j <= pos;
          var yr = it.year && it.year !== lastYear ? it.year : null; lastYear = it.year || lastYear;
          var pid = "gb-tl-p-" + i;
          return h("li", { key: i, "data-i": i, id: it.id || undefined, className: cx("gb-tline-item", on && "is-active", passed && "is-passed", it.key && "is-key", j === visible.length - 1 && "is-last") },
            h("div", { className: "gb-tline-when" }, yr ? h("span", { className: "gb-tline-year" }, yr) : null, h("span", null, keepDates(it.date))),
            h("div", { className: "gb-tline-rail" }, h("button", { type: "button", className: "gb-tline-dot", tabIndex: -1, "aria-hidden": true, title: it.markLabel || it.title, onClick: function () { go(i); } })),
            h("div", { className: "gb-tline-body" },
              h("button", { type: "button", className: "gb-tline-head", "aria-expanded": on, "aria-controls": pid, onClick: function () { go(i); } },
                h("span", { className: "gb-tline-title" }, it.title, it.mark ? h("span", { className: "gb-tline-mark", title: it.markLabel || "Key moment" }, it.mark) : null),
                h(Tag, { tone: it.tone || "neutral" }, it.kindLabel || it.kind)),
              h("div", { className: "gb-tline-panel", id: pid, role: "region", "aria-label": it.title },
                h("div", { className: "gb-tline-panel-in" },
                  it.org ? h("div", { className: "gb-tline-org" }, it.org) : null,
                  it.detail ? h("p", { className: "gb-tline-detail" }, it.detail) : null,
                  it.chips && it.chips.length ? h("ul", { className: "gb-cert-learned gb-tline-chips" }, it.chips.map(function (c, k) { return h("li", { key: k }, c); })) : null,
                  it.href ? h("a", { className: "gb-tline-link", href: it.href }, it.linkLabel || "Read more") : null))));
        })));
  }

  /* ---------- Mockup frames ---------- */
  function BrowserFrame(p) {
    return h("figure", { className: cx("gb-browser", p.className), style: p.style },
      h("div", { className: "gb-browser-bar" },
        h("span", { className: "gb-browser-dots", "aria-hidden": true }, h("i"), h("i"), h("i")),
        h("span", { className: "gb-browser-url", translate: "no" }, p.url || "lewismagangi.dev"),
        p.openHref ? h("a", { className: "gb-frame-open", href: p.openHref, target: "_blank", rel: "noopener noreferrer", "aria-label": "Open " + (p.url || p.openHref) + " in a new tab" }, h(Icon, { name: "newtab", size: 14 })) : null),
      h("div", { className: "gb-browser-view" }, p.children),
      p.caption ? h("figcaption", { className: "gb-frame-cap" }, p.caption) : null);
  }
  function PhoneFrame(p) {
    return h("figure", { className: cx("gb-phone", p.className), style: p.style },
      h("div", { className: "gb-phone-body" }, h("span", { className: "gb-phone-notch", "aria-hidden": true }), h("div", { className: "gb-phone-view" }, p.children)),
      p.caption ? h("figcaption", { className: "gb-frame-cap" }, p.caption) : null);
  }

  /* ---------- Progressive disclosure on scroll ---------- */
  function RevealObserver() {
    React.useEffect(function () {
      if (reducedMotion() || typeof IntersectionObserver === "undefined") return;
      var root = document.documentElement;
      root.classList.add("gb-reveal-on");
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
      function scan() { [].slice.call(document.querySelectorAll("[data-reveal]:not(.is-in)")).forEach(function (el) { io.observe(el); }); }
      scan();
      var mo = typeof MutationObserver !== "undefined" ? new MutationObserver(scan) : null;
      if (mo) mo.observe(document.body, { childList: true, subtree: true });
      return function () { io.disconnect(); if (mo) mo.disconnect(); root.classList.remove("gb-reveal-on"); };
    }, []);
    return null;
  }

  /* ---------- Carousel: mouse wheel, drag, trackpad swipe and keyboard on a scroll-snap track ---------- */
  /* Slides are the track's children, looking through display:contents wrappers (canvas and framework hosts add them). */
  function slidesOf(el) {
    var out = [];
    [].slice.call(el.children).forEach(function (c) {
      if (getComputedStyle(c).display === "contents") [].slice.call(c.children).forEach(function (g) { out.push(g); });
      else out.push(c);
    });
    return out;
  }
  function CarouselControls(p) {
    var ss = React.useState({ k: 0, n: 1, start: true, end: false }), st = ss[0], set = ss[1];
    function track() { return document.getElementById(p.target); }
    function offs(el) { var base = el.getBoundingClientRect().left - el.scrollLeft; return slidesOf(el).map(function (c) { return c.getBoundingClientRect().left - base; }); }
    function idx(el) { var o = offs(el), x = el.scrollLeft, best = 0; o.forEach(function (v, i) { if (Math.abs(v - o[0] - x) < Math.abs(o[best] - o[0] - x)) best = i; }); return best; }
    function to(i) {
      var el = track(); if (!el) return false; var o = offs(el); if (!o.length) return false;
      i = Math.max(0, Math.min(o.length - 1, i));
      var max = el.scrollWidth - el.clientWidth, left = Math.min(max, Math.max(0, o[i] - o[0]));
      if (Math.abs(left - el.scrollLeft) < 2) return false;
      el.scrollTo({ left: left, behavior: reducedMotion() ? "auto" : "smooth" });
      return true;
    }
    React.useEffect(function () {
      var el = track(); if (!el) return;
      el.classList.add("gb-carousel-mouse");
      function upd() {
        var max = el.scrollWidth - el.clientWidth;
        set({ k: el.scrollLeft > max - 4 ? slidesOf(el).length - 1 : idx(el), n: slidesOf(el).length || 1, start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
      }
      /* Vertical wheel steps one slide while the track can still move that way; at either end the page scrolls on, so the wheel is never trapped. */
      var lock = 0;
      function wheel(e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) return; /* trackpads and shift+wheel scroll natively */
        var max = el.scrollWidth - el.clientWidth, dir = e.deltaY > 0 ? 1 : -1;
        if ((dir > 0 && el.scrollLeft >= max - 4) || (dir < 0 && el.scrollLeft <= 4)) return;
        var now = Date.now(); if (now < lock) { e.preventDefault(); return; }
        if (to(idx(el) + dir)) { e.preventDefault(); lock = now + 320; }
      }
      /* Drag with the mouse; touch keeps native swiping. */
      var drag = null;
      function down(e) {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        drag = { x: e.clientX, left: el.scrollLeft, moved: false };
      }
      function move(e) {
        if (!drag) return;
        var dx = e.clientX - drag.x;
        if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; el.classList.add("is-dragging"); try { el.setPointerCapture(e.pointerId); } catch (x) {} }
        if (drag.moved) el.scrollLeft = drag.left - dx;
      }
      function up(e) {
        if (!drag) return; var moved = drag.moved, dx = e.clientX - drag.x, start = drag.left; drag = null;
        if (!moved) return;
        /* Pick the slide while snapping is still off, glide to it, then hand snapping back. */
        var o = offs(el).map(function (v, i, a) { return v - a[0]; }), k = idx(el);
        if (Math.abs(dx) > 60) { var from = 0; o.forEach(function (v, i) { if (Math.abs(v - start) < Math.abs(o[from] - start)) from = i; }); k = Math.max(0, Math.min(o.length - 1, from + (dx < 0 ? 1 : -1))); }
        if (!to(k)) el.scrollTo({ left: Math.min(el.scrollWidth - el.clientWidth, o[k] || 0), behavior: "auto" });
        setTimeout(function () { el.classList.remove("is-dragging"); }, reducedMotion() ? 0 : 480);
        function stop(c) { c.preventDefault(); c.stopPropagation(); }
        el.addEventListener("click", stop, true);
        setTimeout(function () { el.removeEventListener("click", stop, true); }, 0);
      }
      function key(e) {
        if (e.target !== el) return;
        if (e.key === "ArrowRight") { e.preventDefault(); to(idx(el) + 1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); to(idx(el) - 1); }
        else if (e.key === "Home") { e.preventDefault(); to(0); }
        else if (e.key === "End") { e.preventDefault(); to(slidesOf(el).length - 1); }
      }
      upd();
      var mo = typeof MutationObserver !== "undefined" ? new MutationObserver(upd) : null; if (mo) mo.observe(el, { childList: true, subtree: true });
      el.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd);
      el.addEventListener("wheel", wheel, { passive: false });
      el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
      el.addEventListener("keydown", key);
      return function () {
        if (mo) mo.disconnect();
        el.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); el.removeEventListener("wheel", wheel);
        el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); el.removeEventListener("keydown", key);
        el.classList.remove("gb-carousel-mouse");
      };
    }, [p.target]);
    var dots = []; for (var i = 0; i < st.n; i++) dots.push(i);
    var cur = Math.min(st.k, st.n - 1);
    return h("div", { className: "gb-carousel-ctl" },
      h("div", { className: "gb-carousel-dots", role: "group", "aria-label": (p.label || "Slides") + ": jump to" },
        dots.map(function (i) { return h("button", { key: i, type: "button", className: "gb-carousel-dot", "aria-label": "Show " + (p.itemLabel || "slide") + " " + (i + 1) + " of " + st.n, "aria-current": i === cur ? "true" : undefined, onClick: function () { to(i); } }); })),
      h("span", { className: "gb-carousel-count", "aria-live": "polite" }, (cur + 1) + " / " + st.n),
      p.hint === false ? null : h("span", { className: "gb-carousel-hint" }, h(Icon, { name: "mouse", size: 14 }), "Scroll or drag"),
      p.buttons ? h("div", { className: "gb-carousel-btns" },
        h("button", { type: "button", className: "gb-iconbtn gb-carousel-btn", "aria-label": "Previous " + (p.itemLabel || "slide"), disabled: st.start, onClick: function () { to(cur - 1); } }, h(Icon, { name: "left", size: 18 })),
        h("button", { type: "button", className: "gb-iconbtn gb-carousel-btn", "aria-label": "Next " + (p.itemLabel || "slide"), disabled: st.end, onClick: function () { to(cur + 1); } }, h(Icon, { name: "right", size: 18 }))) : null);
  }

  /* ---------- Device mockups: desktop + phone, schematic until real screenshots exist ---------- */
  function MockScreen(p) {
    var m = p.mock || {}, phone = p.phone;
    if (p.src) return h("img", { src: p.src, alt: p.alt || "", className: "gb-mock-img" });
    var stats = (m.stats || []).slice(0, phone ? 1 : 3), rows = (m.rows || []).slice(0, phone ? 3 : 4), bars = m.bars || [40, 62, 48, 80, 66, 92, 74];
    return h("div", { className: cx("gb-mock", phone && "is-phone"), "aria-hidden": true },
      phone ? null : h("div", { className: "gb-mock-side" }, h("b", null, m.brand || "LM"), [0, 1, 2, 3, 4].map(function (i) { return h("i", { key: i, className: i === 0 ? "on" : "" }); })),
      h("div", { className: "gb-mock-main" },
        h("div", { className: "gb-mock-top" }, h("strong", null, m.title || "Dashboard"), phone ? null : h("span", { className: "gb-mock-pill" }, m.badge || "Live")),
        stats.length ? h("div", { className: "gb-mock-stats" }, stats.map(function (s, i) { return h("div", { key: i }, h("em", null, s.l), h("b", null, s.v)); })) : null,
        h("div", { className: "gb-mock-chart" }, bars.map(function (b, i) { return h("i", { key: i, style: { height: b + "%" } }); })),
        h("div", { className: "gb-mock-rows" }, rows.map(function (r, i) { return h("div", { key: i }, h("span", { className: "gb-mock-av" }), h("span", null, r), h("i", null)); }))));
  }
  /* liveUrl renders the real site in both frames (LiveView); the schematic or screenshot stays as the poster. */
  function DeviceMockup(p) {
    var live = p.liveUrl && p.live !== false && p.live !== "false";
    var desk = h(MockScreen, { mock: p.mock, src: p.desktopSrc, alt: p.desktopAlt });
    var mob = h(MockScreen, { mock: p.mobileMock || p.mock, src: p.phoneSrc, alt: p.phoneAlt, phone: true });
    return h("figure", { className: cx("gb-devices", p.compact && "is-compact", live && "is-live"), style: p.style },
      h("div", { className: "gb-devices-stage" },
        h(BrowserFrame, { url: p.url || host(p.liveUrl), openHref: p.liveUrl }, live ? h(LiveView, { src: p.liveUrl, title: p.url || host(p.liveUrl), poster: desk, viewport: 1280 }) : desk),
        p.phone === false ? null : h(PhoneFrame, { className: "gb-devices-phone" }, live ? h(LiveView, { src: p.liveUrl, title: (p.url || host(p.liveUrl)) + " on a phone", poster: mob, viewport: 390, phone: true }) : mob)),
      p.caption ? h("figcaption", { className: "gb-frame-cap" }, p.caption) : null);
  }


  /* ---------- Paper shader (Dithering) ---------- */
  class ShaderBoundary extends React.Component {
    constructor(props) { super(props); this.state = { failed: false }; }
    static getDerivedStateFromError() { return { failed: true }; }
    componentDidCatch() {}
    render() { return this.state.failed ? null : this.props.children; }
  }
  function hasWebGL() { try { var c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } }
  /* Canvas and HTML attributes arrive as strings; Paper treats a string uniform as an image URL. */
  function num(v, d) { var n = parseFloat(v); return isFinite(n) ? n : d; }
  function Shader(p) {
    var ref = React.useRef(null);
    var cs = React.useState(null), col = cs[0], setCol = cs[1];
    React.useEffect(function () {
      if (!ref.current) return;
      var s = getComputedStyle(ref.current);
      var front = (s.getPropertyValue("--" + (p.front || "line-strong")) || "").trim() || "#6b6b6b";
      setCol({ front: front, ok: hasWebGL() && !!(window.__GambitPaper && window.__GambitPaper.Dithering) });
    }, [p.theme, p.front]);
    /* v8: the hover lag came from the GPU, not the cursor. A dither needs no retina pixels, so the canvas renders at 1x
       and is capped near 720p; it also stops animating whenever it is off screen. */
    var vs = React.useState(true), vis = vs[0], setVis = vs[1];
    React.useEffect(function () {
      if (!ref.current || !("IntersectionObserver" in window)) return;
      var io = new IntersectionObserver(function (es) { setVis(es[0].isIntersecting); }, { rootMargin: "120px 0px" });
      io.observe(ref.current);
      return function () { io.disconnect(); };
    }, []);
    var D = window.__GambitPaper && window.__GambitPaper.Dithering;
    return h("div", { ref: ref, className: cx("gb-shader", p.fade && "gb-shader-fade-" + p.fade, p.className), "aria-hidden": true, style: Object.assign({ opacity: num(p.opacity, 1) }, p.style || {}) },
      col && col.ok && D ? h(ShaderBoundary, null, h(D, {
        colorBack: "#00000000", colorFront: col.front, shape: p.shape || "warp", type: p.type || "4x4", size: num(p.size, 2),
        speed: reducedMotion() || !vis ? 0 : num(p.speed, 0.4), scale: num(p.scale, 1), minPixelRatio: 1, maxPixelCount: 1280 * 720,
        style: { width: "100%", height: "100%" }
      })) : h("div", { className: "gb-shader-fallback" }));
  }

  /* ---------- Chess board ---------- */
  var GLYPH = { K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟", k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
  var NAME = { K: "white king", Q: "white queen", R: "white rook", B: "white bishop", N: "white knight", P: "white pawn", k: "black king", q: "black queen", r: "black rook", b: "black bishop", n: "black knight", p: "black pawn" };
  function parseFen(fen) {
    var rows = String(fen || "8/8/8/8/8/8/8/8").split(" ")[0].split("/"), out = [];
    rows.forEach(function (r) { var row = []; r.split("").forEach(function (ch) { if (/\d/.test(ch)) { for (var i = 0; i < +ch; i++) row.push(null); } else row.push(ch); }); out.push(row); });
    return out;
  }
  function ChessBoard(p) {
    var pos = p.positions || [{ fen: p.fen }];
    var start = p.initial != null ? p.initial : 0;
    var ss = React.useState(start), k = p.step != null ? p.step : ss[0], setK = ss[1];
    var ps = React.useState(false), playing = ps[0], setPlaying = ps[1];
    function go(i) { var n = Math.max(0, Math.min(pos.length - 1, i)); setK(n); if (p.onStep) p.onStep(n); }
    React.useEffect(function () {
      if (!playing) return;
      if (k >= pos.length - 1) { setPlaying(false); return; }
      var t = setTimeout(function () { go(k + 1); }, reducedMotion() ? 700 : 1100);
      return function () { clearTimeout(t); };
    }, [playing, k]);
    var cur = pos[k] || pos[0], grid = parseFen(cur.fen), files = "abcdefgh";
    var hl = {}; if (cur.from) hl[cur.from] = "from"; if (cur.to) hl[cur.to] = "to";
    var size = p.size || 360;
    return h("div", { className: "gb-chess", style: { "--board": size + "px" } },
      h("div", { className: "gb-chess-board", role: "img", "aria-label": (cur.san ? "Position after " + cur.san : "Starting position") + (cur.note ? ": " + cur.note : "") },
        grid.map(function (row, r) {
          return row.map(function (pc, f) {
            var sq = files[f] + (8 - r), dark = (r + f) % 2 === 1;
            return h("div", { key: sq, className: cx("gb-sq", dark ? "is-dark" : "is-light", hl[sq] && "is-" + hl[sq]) },
              f === 0 ? h("span", { className: "gb-sq-rank" }, 8 - r) : null,
              r === 7 ? h("span", { className: "gb-sq-file" }, files[f]) : null,
              pc ? h("span", { key: cur.fen + sq, className: cx("gb-pc", pc === pc.toUpperCase() ? "is-white" : "is-black", hl[sq] === "to" && "is-moved"), title: NAME[pc] }, GLYPH[pc] + "︎") : null);
          });
        })),
      p.controls === false ? null : h("div", { className: "gb-chess-ctl" },
        h("button", { type: "button", className: "gb-iconbtn", "aria-label": "Previous move", disabled: k === 0, onClick: function () { setPlaying(false); go(k - 1); } }, h(Icon, { name: "left", size: 18 })),
        h("button", { type: "button", className: "gb-iconbtn", "aria-label": playing ? "Pause" : "Play through", "aria-pressed": playing, onClick: function () { if (!playing && k >= pos.length - 1) go(0); setPlaying(!playing); } }, h(Icon, { name: playing ? "pause" : "play", size: 16 })),
        h("button", { type: "button", className: "gb-iconbtn", "aria-label": "Next move", disabled: k >= pos.length - 1, onClick: function () { setPlaying(false); go(k + 1); } }, h(Icon, { name: "right", size: 18 })),
        h("span", { className: "gb-chess-now", "aria-live": "polite" }, cur.san ? (cur.n ? cur.n + ". " : "") + cur.san : "Start", cur.note ? h("em", null, cur.note) : null)));
  }

  /* ---------- Accordion (single open) ---------- */
  function Accordion(p) {
    var items = p.items || [];
    var ss = React.useState(p.initial == null ? 0 : p.initial), open = ss[0], set = ss[1];
    return h("div", { className: "gb-acc" }, items.map(function (it, i) {
      var on = i === open, id = (p.id || "gb-acc") + "-" + i;
      return h("div", { key: i, className: cx("gb-acc-item", on && "is-open") },
        h("button", { type: "button", className: "gb-acc-head", "aria-expanded": on, "aria-controls": id, onClick: function () { set(on ? -1 : i); } },
          h("span", { className: "gb-acc-title" }, it.title), it.meta ? h("span", { className: "gb-acc-meta" }, it.meta) : null, h("span", { className: "gb-acc-chev", "aria-hidden": true }, h(Icon, { name: "chev", size: 16 }))),
        h("div", { className: "gb-acc-panel", id: id, role: "region", "aria-label": it.title }, h("div", { className: "gb-acc-in" },
          it.body ? h("p", null, it.body) : null,
          it.chips && it.chips.length ? h("ul", { className: "gb-cert-learned" }, it.chips.map(function (c, k) { return h("li", { key: k }, c); })) : null)));
    }));
  }

  /* ---------- Content cards ---------- */
  function CaseStudyCard(p) {
    return h("article", { className: "gb-case" },
      h("div", { className: "gb-case-copy" },
        h("div", { className: "gb-case-meta" }, h("span", null, p.period), p.award ? h(Tag, { tone: "award" }, p.award) : p.kind ? h(Tag, null, p.kind) : null),
        h("h3", { className: "gb-case-title" }, p.title),
        h("p", { className: "gb-case-problem" }, p.problem),
        p.approach ? h("ol", { className: "gb-case-steps" }, p.approach.map(function (a, i) { return h("li", { key: i }, a); })) : null,
        p.results ? h("dl", { className: "gb-case-results" }, p.results.map(function (r, i) { return h("div", { key: i }, h("dt", null, r.v), h("dd", null, r.l)); })) : null,
        h("div", { className: "gb-case-foot" },
          p.href ? h(Button, { size: "sm", href: p.href }, "Read the case study", h(Icon, { name: "arrow", size: 14 })) : null,
          p.liveUrl ? h("a", { className: "gb-case-live", href: p.liveUrl, target: "_blank", rel: "noopener noreferrer" }, "Visit the live site ↗") : null)),
      h("div", { className: "gb-case-shot" },
        p.mock || p.desktopSrc || p.live ? h(DeviceMockup, { url: p.url, liveUrl: p.live ? p.liveUrl : null, mock: p.mock, mobileMock: p.mobileMock, desktopSrc: p.desktopSrc, phoneSrc: p.phoneSrc, compact: true }) :
        h(BrowserFrame, { url: p.url }, h("div", { className: "gb-case-mock" }, h(Shader, { shape: p.shape || "simplex", type: "4x4", size: 3, speed: 0.25, front: "line", theme: p.theme }), h("span", null, p.shot || "Screenshot")))));
  }

  function AwardCard(p) {
    return h("article", { className: cx("gb-award", p.tone && "gb-award-" + p.tone) },
      h("div", { className: cx("gb-award-rank", String(p.rank || "").length > 4 && "is-long") }, p.rank),
      h("div", { className: "gb-award-body" },
        h("h3", { className: "gb-award-title" }, p.title),
        h("p", { className: "gb-award-event" }, p.event),
        h("div", { className: "gb-award-foot" }, h("span", null, p.year), p.href ? h("a", { href: p.href }, p.linkLabel || "See the project") : null)));
  }

  function initials(n) { return String(n || "").replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, "").split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase(); }
  var SOCIAL = { linkedin: ["linkedin", "LinkedIn"], github: ["github", "GitHub"], web: ["globe", "Website"], email: ["mail", "Email"] };
  function ReferenceCard(p) {
    var links = (p.links || []).filter(function (l) { return l && l.href; });
    return h("figure", { className: cx("gb-ref", p.featured && "is-featured") },
      h("div", { className: "gb-ref-head" },
        h("span", { className: "gb-ref-mono", "aria-hidden": true }, p.mark || initials(p.name)),
        h("div", null, h("div", { className: "gb-ref-rel" }, p.relation), p.date ? h("div", { className: "gb-ref-date" }, p.date) : null),
        p.result ? h("span", { className: "gb-ref-result" }, h(Icon, { name: "trophy", size: 14 }), p.result) : null),
      h("blockquote", { className: "gb-ref-quote" }, p.quote),
      /* v8.6: a longer message stays the same card size; the full text opens in place. */
      p.full ? h("details", { className: "gb-ref-more" }, h("summary", null, p.moreLabel || "Read the full message", h(Icon, { name: "chev", size: 14 })), h("p", null, p.full)) : null,
      h("figcaption", { className: "gb-ref-cap" }, h("strong", null, p.name), h("span", null, p.role),
        links.length ? h("span", { className: "gb-ref-social" }, links.map(function (l, k) { var m = SOCIAL[l.type] || ["globe", l.label || "Profile"]; return h("a", { key: k, href: l.href, target: "_blank", rel: "noopener noreferrer", className: "gb-iconbtn", "aria-label": p.name + " on " + (l.label || m[1]) }, h(Icon, { name: m[0], size: 16 })); })) : null),
      (p.href || p.contextHref) ? h("div", { className: "gb-ref-foot" },
        p.contextHref ? h("a", { className: "gb-ref-link", href: p.contextHref }, h(Icon, { name: "play", size: 14 }), p.contextLabel || "See the work") : null,
        p.href ? h("a", { className: "gb-ref-link", href: p.href }, h(Icon, { name: "letter", size: 14 }), p.linkLabel || "Request the full letter") : null) : null);
  }

  function SiteFooter(p) {
    var cols = p.columns || [];
    return h("footer", { className: "gb-footer" },
      h("div", { className: "gb-footer-in" },
        h("div", { className: "gb-footer-lead" },
          h("a", { className: "gb-brand", href: p.homeHref || "/" }, h("span", { className: "gb-mono" }, "LM"), h("span", null, "Lewis Magangi")),
          h("p", null, p.blurb || "Software engineer in Nairobi, moving into AI and ML engineering."),
          h(Button, { size: "sm", href: p.bookHref || "/book" }, h(Icon, { name: "calendar", size: 15 }), "Book a free discovery call")),
        cols.map(function (c) {
          return h("nav", { key: c.title, className: "gb-footer-col", "aria-label": c.title },
            h("p", { className: "gb-footer-h" }, c.title),
            h("ul", null, c.links.map(function (l) { return h("li", { key: l.label }, h("a", { href: l.href, target: l.external ? "_blank" : undefined, rel: l.external ? "noopener noreferrer" : undefined }, l.label)); })));
        })),
      h("div", { className: "gb-footer-base" }, h("span", null, "© 2026 Lewis Magangi, Nairobi, Kenya"),
        h("span", { className: "gb-footer-legal" }, (p.legal || []).map(function (l) { return h("a", { key: l.label, href: l.href }, l.label); }), p.adminHref ? h("a", { href: p.adminHref }, "Admin") : null)));
  }

  /* ---------- Booking: a free 30-minute discovery call ---------- */
  var WD = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function ymd(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function BookingWidget(p) {
    var today = p.today ? new Date(p.today + "T00:00:00") : new Date(); today.setHours(0, 0, 0, 0);
    var horizon = p.horizonDays || 28, offsetH = p.utcOffset == null ? 3 : p.utcOffset;
    var slots = p.slots || ["09:00", "10:30", "14:00", "15:30", "17:00"];
    var topics = p.topics || ["Hiring for AI/ML engineering", "Hiring for full-stack engineering", "A project or freelance work", "Collaboration or mentorship", "Something else"];
    var ss = React.useState({ step: 1, month: 0, date: null, slot: null, name: "", email: "", company: "", topic: topics[0], notes: "", errors: {} }), s = ss[0], setS = ss[1];
    function up(o) { setS(Object.assign({}, s, o)); }
    var base = new Date(today.getFullYear(), today.getMonth() + s.month, 1);
    var first = (base.getDay() + 6) % 7, days = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    var last = new Date(today); last.setDate(last.getDate() + horizon);
    function available(d) { var wd = (d.getDay() + 6) % 7; return d > today && d <= last && wd < 5; }
    function taken(d, i) { return (d.getDate() * 7 + i * 3) % 5 === 0; }
    var cells = []; for (var i = 0; i < first; i++) cells.push(null); for (var j = 1; j <= days; j++) cells.push(new Date(base.getFullYear(), base.getMonth(), j));
    var localTz = ""; try { localTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    function local(slot) {
      if (!s.date) return null;
      var hm = slot.split(":"), d = s.date;
      var dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), +hm[0] - offsetH, +hm[1]));
      if (-dt.getTimezoneOffset() === offsetH * 60) return null;
      try { return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch (e) { return null; }
    }
    function fmtDate(d) { return d ? WD[(d.getDay() + 6) % 7] + " " + d.getDate() + " " + MONTHS[d.getMonth()] : ""; }
    function submit(e) {
      if (e && e.preventDefault) e.preventDefault();
      var er = {};
      if (!s.name.trim()) er.name = "Enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) er.email = "Enter an email address like you@company.com.";
      if (Object.keys(er).length) { up({ errors: er }); setTimeout(function () { var f = document.getElementById(er.name ? "bk-name" : "bk-email"); if (f) f.focus(); }, 0); return; }
      up({ step: 4, errors: {} });
      if (p.onConfirm) p.onConfirm({ date: ymd(s.date), slot: s.slot, name: s.name, email: s.email, company: s.company, topic: s.topic, notes: s.notes });
    }
    function ics() {
      var hm = s.slot.split(":"), d = s.date;
      var st = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), +hm[0] - offsetH, +hm[1])), en = new Date(st.getTime() + (p.duration || 30) * 60000);
      function z(x) { return x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
      var body = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "DTSTART:" + z(st), "DTEND:" + z(en), "SUMMARY:Discovery call with Lewis Magangi", "DESCRIPTION:" + s.topic, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      return "data:text/calendar;charset=utf-8," + encodeURIComponent(body);
    }
    var steps = ["Date", "Time", "Details", "Booked"];
    var summary = h("aside", { className: "gb-book-sum" },
      h("div", { className: "gb-book-host" }, p.hostPhoto ? h("img", { className: "gb-avatar", src: p.hostPhoto, alt: "", width: 40, height: 40 }) : h("span", { className: "gb-mono" }, "LM"), h("div", null, h("strong", null, "Lewis Magangi"), h("span", null, "Software engineer in Nairobi"))),
      h("h2", { className: "gb-book-title" }, p.title || "Free discovery call"),
      h("ul", { className: "gb-book-facts" },
        h("li", null, h(Icon, { name: "clock", size: 15 }), (p.duration || 30) + " minutes"),
        h("li", null, h(Icon, { name: "video", size: 15 }), "Online, on Google Meet"),
        h("li", null, h(Icon, { name: "globe", size: 15 }), "Times in " + (p.tzLabel || "EAT, Nairobi (UTC+3)"))),
      h("p", { className: "gb-book-note" }, p.note || "Tell me what you’re building or hiring for. You’ll leave with a clear next step, whether or not we work together."),
      s.date ? h("div", { className: "gb-book-pick" }, h("span", null, "Your pick"), h("strong", null, fmtDate(s.date) + (s.slot ? " at " + s.slot + " EAT" : ""))) : null);
    var body;
    if (s.step === 1) body = h("div", { className: "gb-book-step" },
      h("div", { className: "gb-cal-head" },
        h("h3", { className: "gb-book-h" }, MONTHS[base.getMonth()] + " " + base.getFullYear()),
        h("div", null,
          h("button", { type: "button", className: "gb-iconbtn", "aria-label": "Previous month", disabled: s.month === 0, onClick: function () { up({ month: s.month - 1 }); } }, h(Icon, { name: "left", size: 18 })),
          h("button", { type: "button", className: "gb-iconbtn", "aria-label": "Next month", disabled: new Date(base.getFullYear(), base.getMonth() + 1, 1) > last, onClick: function () { up({ month: s.month + 1 }); } }, h(Icon, { name: "right", size: 18 })))),
      h("div", { className: "gb-cal", role: "grid", "aria-label": "Choose a date" },
        WD.map(function (w) { return h("div", { key: w, className: "gb-cal-wd", role: "columnheader" }, w.slice(0, 2)); }),
        cells.map(function (d, i) {
          if (!d) return h("div", { key: "x" + i, className: "gb-cal-empty" });
          var ok = available(d), sel = s.date && ymd(d) === ymd(s.date), isToday = ymd(d) === ymd(today);
          return h("button", { key: ymd(d), type: "button", role: "gridcell", className: cx("gb-cal-day", ok && "is-open", sel && "is-sel", isToday && "is-today"), disabled: !ok, "aria-pressed": sel, "aria-label": fmtDate(d) + (ok ? "" : ", unavailable"), onClick: function () { up({ date: d, slot: null, step: 2 }); } }, d.getDate());
        })),
      h("p", { className: "gb-book-hint" }, "Weekdays over the next four weeks. Pick an open date to see times."));
    else if (s.step === 2) body = h("div", { className: "gb-book-step" },
      h("div", { className: "gb-cal-head" }, h("h3", { className: "gb-book-h" }, fmtDate(s.date)), h(Button, { size: "sm", variant: "ghost", onClick: function () { up({ step: 1 }); } }, h(Icon, { name: "left", size: 14 }), "Change date")),
      h("div", { className: "gb-slots", role: "group", "aria-label": "Choose a time" },
        slots.map(function (sl, i) {
          var off = taken(s.date, i), lt = local(sl);
          return h("button", { key: sl, type: "button", className: cx("gb-slot", s.slot === sl && "is-sel"), disabled: off, "aria-pressed": s.slot === sl, onClick: function () { up({ slot: sl }); } },
            h("strong", null, sl + " EAT"), h("span", null, off ? "Booked" : lt ? lt + " your time" : "30 min"));
        })),
      h("div", { className: "gb-book-actions" }, h(Button, { variant: "primary", disabled: !s.slot, onClick: function () { if (s.slot) up({ step: 3 }); } }, "Continue", h(Icon, { name: "arrow", size: 15 }))),
      localTz ? h("p", { className: "gb-book-hint" }, "Your time zone: " + localTz + ".") : null);
    else if (s.step === 3) body = h("form", { className: "gb-book-step gb-book-form", onSubmit: submit, noValidate: true },
      h("div", { className: "gb-cal-head" }, h("h3", { className: "gb-book-h" }, fmtDate(s.date) + " at " + s.slot + " EAT"), h(Button, { size: "sm", variant: "ghost", onClick: function () { up({ step: 2 }); } }, h(Icon, { name: "left", size: 14 }), "Change time")),
      h("div", { className: "gb-book-row" },
        h("div", { className: cx("gb-field", s.errors.name && "gb-field-error") }, h("label", { className: "gb-field-label", htmlFor: "bk-name" }, "Your name"), h("input", { id: "bk-name", value: s.name, onChange: function (e) { up({ name: e.target.value }); }, autoComplete: "name", required: true, "aria-invalid": !!s.errors.name, "aria-describedby": s.errors.name ? "bk-name-err" : undefined }), s.errors.name ? h("span", { id: "bk-name-err", className: "gb-field-err", role: "alert" }, s.errors.name) : null),
        h("div", { className: cx("gb-field", s.errors.email && "gb-field-error") }, h("label", { className: "gb-field-label", htmlFor: "bk-email" }, "Email"), h("input", { id: "bk-email", type: "email", value: s.email, onChange: function (e) { up({ email: e.target.value }); }, autoComplete: "email", inputMode: "email", required: true, "aria-invalid": !!s.errors.email, "aria-describedby": s.errors.email ? "bk-email-err" : "bk-email-hint" }), s.errors.email ? h("span", { id: "bk-email-err", className: "gb-field-err", role: "alert" }, s.errors.email) : h("span", { id: "bk-email-hint", className: "gb-field-hint" }, "The Meet link goes here."))),
      h("div", { className: "gb-book-row" },
        h("div", { className: "gb-field" }, h("label", { className: "gb-field-label", htmlFor: "bk-co" }, "Company", h("em", null, "optional")), h("input", { id: "bk-co", value: s.company, onChange: function (e) { up({ company: e.target.value }); }, autoComplete: "organization" })),
        h("div", { className: "gb-field" }, h("label", { className: "gb-field-label", htmlFor: "bk-topic" }, "What’s it about?"), h("select", { id: "bk-topic", value: s.topic, onChange: function (e) { up({ topic: e.target.value }); } }, topics.map(function (t) { return h("option", { key: t }, t); })))),
      h("div", { className: "gb-field" }, h("label", { className: "gb-field-label", htmlFor: "bk-notes" }, "Anything I should read first?", h("em", null, "optional")), h("textarea", { id: "bk-notes", rows: 3, value: s.notes, placeholder: "A link, a job description, or a line about the problem.", onChange: function (e) { up({ notes: e.target.value }); } })),
      h("div", { className: "gb-book-actions" }, h(Button, { variant: "primary", type: "submit" }, h(Icon, { name: "calendar", size: 15 }), "Book the call")));
    else body = h("div", { className: "gb-book-step gb-book-done", role: "status" },
      h("span", { className: "gb-book-check", "aria-hidden": true }, h(Icon, { name: "check", size: 22 })),
      h("h3", { className: "gb-book-h" }, "You’re booked for " + fmtDate(s.date) + " at " + s.slot + " EAT."),
      h("p", null, "A calendar invite with the Google Meet link is on its way to " + s.email + ". If something comes up, reply to it to reschedule."),
      h("div", { className: "gb-book-actions" },
        h(Button, { href: ics(), download: "discovery-call.ics" }, h(Icon, { name: "calendar", size: 15 }), "Add to my calendar"),
        h(Button, { variant: "ghost", onClick: function () { up({ step: 1, date: null, slot: null, notes: "" }); } }, "Book another time")));
    return h("div", { className: "gb-book" },
      summary,
      h("div", { className: "gb-book-main" },
        h("ol", { className: "gb-book-steps", "aria-label": "Booking progress" }, steps.map(function (t, i) { var n = i + 1; return h("li", { key: t, className: cx(n === s.step && "is-now", n < s.step && "is-done"), "aria-current": n === s.step ? "step" : undefined }, h("span", { "aria-hidden": n < s.step ? true : undefined }, n < s.step ? "✓" : n), h("i", { className: "gb-step-t" }, t)); })),
        body));
  }


  /* ================= v6 additions ================= */
  function useNear(ref, margin) {
    var ss = React.useState(false), on = ss[0], set = ss[1];
    React.useEffect(function () {
      var el = ref.current; if (!el || on) return;
      if (typeof IntersectionObserver === "undefined") { set(true); return; }
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { set(true); io.disconnect(); } }, { rootMargin: margin || "400px 0px" });
      io.observe(el); return function () { io.disconnect(); };
    }, [on]);
    return on;
  }
  function host(u) { return String(u || "").replace(/^https?:\/\//, "").replace(/\/$/, ""); }

  /* ---------- LiveView: the real site, scaled into a frame, poster until it paints ---------- */
  /* Loads when near the viewport. Pointer input is off until the visitor chooses to use the site,
     so the page keeps scrolling past it. Esc or leaving the frame hands the wheel back. */
  function LiveView(p) {
    var ref = React.useRef(null), near = useNear(ref);
    var vw = p.viewport || 1280;
    var ss = React.useState({ s: 0, h: 0 }), box = ss[0], setBox = ss[1];
    var ls = React.useState(false), loaded = ls[0], setLoaded = ls[1];
    var as = React.useState(false), act = as[0], setAct = as[1];
    React.useEffect(function () {
      var el = ref.current; if (!el) return;
      function fit() { setBox({ s: el.clientWidth / vw, h: el.clientHeight }); }
      fit();
      var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null; if (ro) ro.observe(el);
      return function () { if (ro) ro.disconnect(); };
    }, [vw]);
    React.useEffect(function () {
      if (!act) return;
      function k(e) { if (e.key === "Escape") setAct(false); }
      document.addEventListener("keydown", k); return function () { document.removeEventListener("keydown", k); };
    }, [act]);
    var name = p.title || host(p.src);
    return h("div", { ref: ref, className: cx("gb-live", loaded && "is-loaded", act && "is-active"), onMouseLeave: function () { setAct(false); } },
      h("div", { className: "gb-live-poster", "aria-hidden": loaded ? true : undefined }, p.poster),
      near && box.s ? h("iframe", { src: p.src, title: name + " (live site)", loading: "lazy", tabIndex: act ? 0 : -1, referrerPolicy: "strict-origin-when-cross-origin",
        sandbox: "allow-scripts allow-same-origin allow-forms allow-popups",
        onLoad: function () { setLoaded(true); },
        style: { width: vw + "px", height: Math.ceil(box.h / box.s) + "px", transform: "scale(" + box.s + ")" } }) : null,
      act ? null : h("button", { type: "button", className: "gb-live-use", onClick: function () { setAct(true); } },
        h("span", null, h(Icon, { name: "cursor", size: 16 }), p.phone ? "Use it" : "Use the live site")));
  }

  /* ---------- VideoEmbed: poster first, the player loads on request ---------- */
  function VideoEmbed(p) {
    var ss = React.useState(false), on = ss[0], set = ss[1];
    return h("figure", { className: "gb-video" },
      h("div", { className: "gb-video-stage" },
        on ? h("iframe", { src: p.embedSrc, title: p.title, allow: "autoplay; fullscreen; picture-in-picture", allowFullScreen: true }) :
        h("button", { type: "button", className: "gb-video-poster", onClick: function () { set(true); } },
          h(Shader, { shape: "ripple", type: "8x8", size: 2, speed: 0.15, front: "line", theme: p.theme }),
          h("span", { className: "gb-video-play", "aria-hidden": true }, h(Icon, { name: "play", size: 22 })),
          h("span", { className: "gb-video-title" }, h("strong", null, p.title), p.duration ? h("span", null, p.duration) : null),
          h("span", { className: "gb-sr" }, "Play the video"))),
      h("figcaption", { className: "gb-video-cap" }, h("span", null, p.caption),
        p.href ? h("a", { href: p.href, target: "_blank", rel: "noopener noreferrer", className: "gb-video-out" }, "Open in Google Vids", h(Icon, { name: "newtab", size: 14 })) : null));
  }

  /* ---------- CertificateCarousel: the certificate itself, verification on request ---------- */
  function CertificateCarousel(p) {
    var id = p.id || "gb-certs";
    var items = p.items || [];
    return h("div", { className: "gb-certs" },
      h("ul", { className: "gb-certs-track", id: id, tabIndex: 0, "aria-label": p.label || "Certificates" }, items.map(function (c, i) {
        return h("li", { key: i, className: cx("gb-cert-slide", c.portrait && "is-portrait") },
          h("figure", null,
            h("div", { className: "gb-cert-img" }, c.image ? h("img", { src: c.image, alt: c.title + " certificate issued to Lewis Magangi by " + c.issuer, width: c.w || 1200, height: c.h || 850, loading: i > 1 ? "lazy" : undefined, decoding: "async", draggable: false }) : h("span", null, "Certificate image")),
            h("figcaption", null,
              h("strong", null, c.title),
              h("span", { className: "gb-cert-by" }, c.issuer, c.date ? h("time", null, c.date) : null))),
          h("details", { className: "gb-verify" },
            h("summary", null, h(Icon, { name: "shield", size: 14 }), "Verify"),
            h("dl", null,
              c.credential ? h("div", null, h("dt", null, "Credential"), h("dd", { translate: "no" }, c.credential)) : null,
              c.fileUrl ? h("div", null, h("dt", null, "Certificate file"), h("dd", null, h("a", { href: c.fileUrl, target: "_blank", rel: "noopener noreferrer" }, "Open the original", h(Icon, { name: "newtab", size: 13 })))) : null,
              h("div", null, h("dt", null, "Official record"), h("dd", null, c.verifyUrl ? h("a", { href: c.verifyUrl, target: "_blank", rel: "noopener noreferrer" }, "Open on " + (c.verifyHost || host(c.verifyUrl).split("/")[0]), h(Icon, { name: "newtab", size: 13 })) : h("span", { className: "gb-muted" }, "Link being added"))))));
      })),
      h(CarouselControls, { target: id, label: p.label || "Certificates", itemLabel: "certificate" }));
  }

  /* ---------- Services and pricing ---------- */
  function ServiceList(p) {
    return h("ul", { className: "gb-services" }, (p.items || []).map(function (s, i) {
      return h("li", { key: i },
        h("span", { className: "gb-service-icon", "aria-hidden": true }, h(Icon, { name: s.icon || "code", size: 20 })),
        h("div", null, h("h3", null, s.title), h("p", null, s.body)),
        s.points ? h("ul", { className: "gb-service-points" }, s.points.map(function (t, k) { return h("li", { key: k }, t); })) : null);
    }));
  }
  function PricingTiers(p) {
    return h("div", { className: "gb-tiers" },
      h("ul", { className: "gb-tiers-list" }, (p.tiers || []).map(function (t, i) {
        return h("li", { key: i, className: cx("gb-tier", t.featured && "is-featured") },
          h("div", { className: "gb-tier-head" }, h("h3", null, t.name), t.note ? h("span", { className: "gb-tier-note" }, t.note) : null),
          h("p", { className: "gb-tier-price" }, h("span", { className: "gb-tier-from" }, "Typically"), h("strong", null, t.price), h("span", { className: "gb-tier-unit" }, "per project")),
          h("p", { className: "gb-tier-for" }, t.for),
          t.base ? h("p", { className: "gb-tier-base" }, "Everything in " + t.base + ", plus") : null,
          h("ul", { className: "gb-tier-inc" }, (t.includes || []).map(function (x, k) { return h("li", { key: k }, h(Icon, { name: "check", size: 16 }), x); })),
          h(Button, { variant: t.featured ? "primary" : "secondary", href: p.bookHref || "/book", className: "gb-tier-cta" }, p.ctaLabel || "Book a free discovery call"));
      })),
      p.footnote ? h("p", { className: "gb-tiers-foot" }, p.footnote) : null);
  }

  /* ---------- ChallengeBoard: play or race me, live numbers when the platform shares them ---------- */
  var CH_API = {
    lichess: function (u) { return fetch("https://lichess.org/api/user/" + u).then(function (r) { return r.json(); }).then(function (d) { var b = d.perfs && (d.perfs.blitz || d.perfs.rapid); return b ? "Blitz " + b.rating : null; }); },
    chesscom: function (u) { return fetch("https://api.chess.com/pub/player/" + u + "/stats").then(function (r) { return r.json(); }).then(function (d) { var b = d.chess_blitz || d.chess_rapid; return b && b.last ? (d.chess_blitz ? "Blitz " : "Rapid ") + b.last.rating : null; }); },
    codewars: function (u) { return fetch("https://www.codewars.com/api/v1/users/" + u).then(function (r) { return r.json(); }).then(function (d) { return d.ranks && d.ranks.overall ? d.ranks.overall.name + " overall" : null; }); }
  };
  function Challenge(p) {
    var c = p.item, ss = React.useState(null), stat = ss[0], set = ss[1];
    React.useEffect(function () {
      if (!p.live || !CH_API[c.platform]) return;
      var dead = false, t = setTimeout(function () { dead = true; }, 5000);
      CH_API[c.platform](c.handle).then(function (v) { if (!dead && v) set(v); }).catch(function () {});
      return function () { dead = true; clearTimeout(t); };
    }, [p.live, c.handle]);
    return h("li", { className: "gb-challenge" },
      h("span", { className: "gb-challenge-icon", "aria-hidden": true }, h(Icon, { name: c.icon || "knight", size: 22 })),
      h("div", { className: "gb-challenge-copy" },
        h("h3", null, c.label),
        h("p", null, c.invite),
        h("p", { className: "gb-challenge-meta" }, h("span", { translate: "no" }, c.handle), stat ? h("span", { className: "gb-challenge-stat" }, stat) : null)),
      h(Button, { size: "sm", href: c.href, external: true, className: "gb-challenge-cta", "aria-label": c.cta + " on " + c.label }, c.cta));
  }
  function ChallengeBoard(p) {
    return h("ul", { className: "gb-challenges" }, (p.items || []).map(function (c, i) { return h(Challenge, { key: i, item: c, live: p.live }); }));
  }

  /* ---------- Bookshelf: reading now first, the rest one click away ---------- */
  function Bookshelf(p) {
    var HL = "h" + (p.level || 2), reading = p.reading || [], done = p.read || [], next = p.next || [], wish = p.wishlist || [];
    function row(b, i, kind) {
      return h("li", { key: i, className: "gb-book-row" },
        h("div", { className: "gb-book-t" }, h("strong", null, b.title), b.author ? h("span", null, b.author) : null),
        kind === "now" ? h("div", { className: "gb-book-prog" },
          b.pct != null ? h("span", { className: "gb-meter", role: "img", "aria-label": b.pct + " percent read" }, h("i", { style: { width: b.pct + "%" } })) : null,
          h("span", { className: "gb-book-where" }, b.where)) :
        b.note ? h("span", { className: "gb-book-where" }, b.note) : null);
    }
    return h("div", { className: "gb-shelf" },
      h("section", { className: "gb-shelf-group", "aria-labelledby": "gb-shelf-now" },
        h(HL, { id: "gb-shelf-now" }, "Reading now", h("span", null, reading.length)),
        h("ul", null, reading.map(function (b, i) { return row(b, i, "now"); }))),
      next.length ? h("section", { className: "gb-shelf-group", "aria-labelledby": "gb-shelf-next" },
        h(HL, { id: "gb-shelf-next" }, "Up next", h("span", null, next.length)),
        h("ul", null, next.map(function (b, i) { return row(b, i, "next"); }))) : null,
      h("details", { className: "gb-shelf-more" },
        h("summary", null, "Finished", h("span", null, done.length), h(Icon, { name: "chev", size: 16 })),
        h("ul", { className: "gb-shelf-grid" }, done.map(function (b, i) { return row(b, i, "done"); }))),
      h("section", { className: "gb-shelf-group", "aria-labelledby": "gb-shelf-want" },
        h(HL, { id: "gb-shelf-want" }, "Want to read", h("span", null, wish.length)),
        wish.length ? h("ul", null, wish.map(function (b, i) { return row(b, i, "want"); })) :
        h("p", { className: "gb-shelf-empty" }, p.emptyText || "This list fills in from the admin, sorted by genre.")));
  }

  /* ---------- TaglineReveal: one statement, lit word by word as it is read ---------- */
  function TaglineReveal(p) {
    var ref = React.useRef(null);
    var text = String(p.text || (typeof p.children === "string" ? p.children : "") || "");
    var lines = text.split(/\n|\s\/\s/);
    React.useEffect(function () {
      var el = ref.current; if (!el) return;
      var words = [].slice.call(el.querySelectorAll(".gb-tagline-w"));
      if (reducedMotion()) { words.forEach(function (w) { w.classList.add("is-lit"); }); return; }
      el.classList.add("is-armed");
      var raf = 0;
      function tick() {
        raf = 0;
        var line = window.innerHeight * 0.62;
        words.forEach(function (w) { var r = w.getBoundingClientRect(); w.classList.toggle("is-lit", r.top + r.height / 2 < line); });
      }
      function on() { if (!raf) raf = requestAnimationFrame(tick); }
      tick();
      window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
      return function () { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
    }, [text]);
    var Tag2 = p.as || "p";
    return h(Tag2, { ref: ref, className: cx("gb-tagline", p.className) },
      h("span", { className: "gb-sr" }, lines.join(" ")),
      h("span", { "aria-hidden": true }, lines.map(function (l, li) {
        return h("span", { key: li, className: "gb-tagline-line" }, l.split(/\s+/).filter(Boolean).map(function (w, wi) { return h(React.Fragment, { key: wi }, h("span", { className: "gb-tagline-w" }, w), " "); }));
      })));
  }

  /* ---------- HeroIntro: the one authored entrance (headline words rise once on load) ---------- */
  /* Each word is its own layer while it rises, so a text gradient is painted per word but positioned
     against the whole heading (measured), which keeps one continuous sweep across the lines. */
  function SplitWords(p) {
    var words = String(p.text || "").split(/\s+/).filter(Boolean);
    var Tag2 = p.as || "h1", ref = React.useRef(null);
    React.useLayoutEffect(function () {
      var el = ref.current; if (!el) return;
      function measure() {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--W", r.width + "px"); el.style.setProperty("--H", r.height + "px");
        [].slice.call(el.querySelectorAll(".gb-split-w > span")).forEach(function (w) {
          var q = w.parentNode.getBoundingClientRect();
          w.style.setProperty("--x", (q.left - r.left) + "px"); w.style.setProperty("--y", (q.top - r.top) + "px");
        });
      }
      measure();
      var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null; if (ro) ro.observe(el);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      return function () { if (ro) ro.disconnect(); };
    }, [p.text]);
    return h(Tag2, { ref: ref, className: cx("gb-split", p.className), style: p.style },
      h("span", { className: "gb-sr" }, String(p.text || "").replace(/\s\/\s/g, " ")),
      words.map(function (w, i) { return w === "/" ? h("br", { key: i, className: "gb-split-br" }) : h(React.Fragment, { key: i }, h("span", { className: "gb-split-w", "aria-hidden": true, style: { "--i": i } }, h("span", null, w)), " "); }));
  }


  /* ---------- StoryRail (v8.1): a reading battery.
     No pill and no move labels: the header already carries the navigation. A hairline at the left of the column fills
     as you read, and at its foot a small battery shows the same progress, its cell filling from the left with a faint
     ink wash, the way a phone battery fills with white. Under 820px the battery sits in the bottom book bar. ---------- */
  function Battery(p) {
    var v = Math.max(0, Math.min(100, p.value || 0));
    return h("span", { className: cx("gb-batt", v >= 100 && "is-full", p.className), role: "img", "aria-label": v + " percent read" },
      h("span", { className: "gb-batt-cell" },
        h("span", { className: "gb-batt-fill", ref: p.fillRef, style: p.fillRef ? undefined : { transform: "scaleX(" + v / 100 + ")" } }),
        h("span", { className: "gb-batt-num", "aria-hidden": true }, v + "%")),
      h("span", { className: "gb-batt-nub", "aria-hidden": true }));
  }
  function StoryRail(p) {
    var items = p.items || [];
    var ss = React.useState(-1), cur = ss[0], set = ss[1];
    var vs = React.useState(false), shown = vs[0], setShown = vs[1];
    var ps = React.useState(0), pct = ps[0], setPct = ps[1];
    var line = React.useRef(null), cell = React.useRef(null), cell2 = React.useRef(null), q = React.useRef(null);
    React.useEffect(function () {
      var raf = 0;
      function tick() {
        raf = 0;
        var y = window.innerHeight * (window.innerWidth < 820 ? 0.6 : 0.4), k = -1;
        items.forEach(function (it, i) { var el = document.getElementById(it.id); if (el && el.getBoundingClientRect().top <= y) k = i; });
        set(k);
        var hero = p.after ? document.getElementById(p.after) : null;
        setShown(hero ? hero.getBoundingClientRect().bottom < 80 : k >= 0);
        var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var f = Math.min(1, Math.max(0, window.scrollY / max));
        setPct(Math.round(f * 100));
        var g = G7(), smooth = g && !reducedMotion();
        [[line.current, "scaleY", "l"], [cell.current, "scaleX", "a"], [cell2.current, "scaleX", "b"]].forEach(function (t) {
          if (!t[0]) return;
          if (smooth) { q.current = q.current || {}; if (!q.current[t[2]]) q.current[t[2]] = g.quickTo(t[0], t[1], { duration: 0.6, ease: "power3.out" }); q.current[t[2]](f); }
          else t[0].style.transform = t[1] + "(" + f + ")";
        });
      }
      function on() { if (!raf) raf = requestAnimationFrame(tick); }
      tick();
      window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
      return function () { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
    }, [items.length, p.after]);
    var now = items[cur];
    return h(React.Fragment, null,
      h("div", { className: cx("gb-rail-line", shown && "is-shown"), "aria-hidden": true },
        h("span", { className: "gb-rail-track" }, h("span", { ref: line, className: "gb-rail-fill" })),
        h(Battery, { value: pct, fillRef: cell })),
      h("div", { className: cx("gb-bookbar", shown && "is-shown") },
        h("span", { className: "gb-bookbar-now" },
          h(Battery, { value: pct, fillRef: cell2 }),
          now ? h("span", { className: "gb-bookbar-label", "aria-hidden": true }, now.label) : null),
        h(Button, { variant: "primary", size: "sm", href: p.bookHref || "/book" }, p.ctaLabel || "Book a free call")));
  }


  /* ---------- CourseStory (v8): a programme card that flips to its courses, told as stories.
     Front: the same card as the degree and ALX programmes, with a small book button. Select it and the card turns over
     (a real 3D flip, 0.8s on the Tilda curve). The back plays each course in date order, the way a status plays:
     segmented bars across the top fill at a steady, linear pace; a ringed badge counts the courses seen.
     Tap the right of the card for the next course, the left for the one before; press and hold, or use the pause button,
     to pause. Arrow keys, Space and Esc work too. Under reduced motion the card crossfades and starts paused. ---------- */
  function StoryRing(p) {
    var n = Math.max(1, p.count || 1), seen = p.seen || 0, r = 19, c = 2 * Math.PI * r, gap = n > 1 ? 3 : 0, seg = c / n - gap;
    return h("svg", { className: cx("gb-cs-ring", p.loading && "is-loading"), width: 44, height: 44, viewBox: "0 0 44 44", "aria-hidden": true },
      Array.apply(null, Array(n)).map(function (_, i) {
        return h("circle", { key: i, cx: 22, cy: 22, r: r, fill: "none", strokeWidth: 2, strokeLinecap: "round",
          className: i < seen ? "is-seen" : "", strokeDasharray: seg + " " + (c - seg), strokeDashoffset: -(i * (seg + gap)), transform: "rotate(-90 22 22)" });
      }),
      h("text", { x: 22, y: 26, textAnchor: "middle", className: "gb-cs-ring-n" }, p.label || ""));
  }
  function CourseStory(p) {
    var stories = (p.stories || []).slice();
    var fs = React.useState(false), flipped = fs[0], setFlipped = fs[1];
    var is = React.useState(0), idx = is[0], setIdx = is[1];
    var ps = React.useState(!reducedMotion()), playing = ps[0], setPlaying = ps[1];
    var hs = React.useState(false), held = hs[0], setHeld = hs[1];
    var ls = React.useState(false), loading = ls[0], setLoading = ls[1];
    var ds = React.useState(1), dir = ds[0], setDir = ds[1];
    /* Like a status, a course's bar waits for its certificate image to load; the next image preloads behind it. */
    var imgs = React.useState({}), loaded = imgs[0], setLoaded = imgs[1];
    function markLoaded(src) { if (src && !loaded[src]) setLoaded(function (m) { var n = Object.assign({}, m); n[src] = true; return n; }); }
    var back = React.useRef(null), frontBtn = React.useRef(null), hold = React.useRef(0), wasHeld = React.useRef(false), wrap = React.useRef(null);
    /* A nudge toward the book: the first time the card comes into view, its corner lifts like a page about to turn and
       the book button pulses. It plays once, and never again after the card has been turned. */
    var hs2 = React.useState(false), hint = hs2[0], setHint = hs2[1];
    React.useEffect(function () {
      var el = wrap.current; if (!el || reducedMotion() || !("IntersectionObserver" in window)) return;
      var t1 = 0, t2 = 0, done = false;
      var io = new IntersectionObserver(function (es) {
        if (done || !es[0].isIntersecting) return;
        done = true; io.disconnect();
        t1 = setTimeout(function () { setHint(true); t2 = setTimeout(function () { setHint(false); }, 2600); }, 700);
      }, { threshold: 0.6 });
      io.observe(el);
      return function () { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
    }, []);
    var dur = (p.duration || 7) + "s";
    var n = stories.length, cur = stories[idx] || {};
    function go(i) { if (i < 0) i = 0; if (i > n - 1) { setPlaying(false); return; } setDir(i >= idx ? 1 : -1); setIdx(i); }
    function open() {
      setHint(false);
      setFlipped(true); setIdx(0); setLoading(true);
      setTimeout(function () { setLoading(false); setPlaying(!reducedMotion()); if (back.current) back.current.focus({ preventScroll: true }); }, reducedMotion() ? 0 : 700);
    }
    function close() { setFlipped(false); setPlaying(false); setTimeout(function () { if (frontBtn.current) frontBtn.current.focus({ preventScroll: true }); }, 50); }
    function onEnd() { if (idx < n - 1) go(idx + 1); else setPlaying(false); }
    function isControl(t) { return t && t.closest && t.closest("a, button"); }
    function down(e) {
      if (isControl(e.target)) return;
      wasHeld.current = false; clearTimeout(hold.current);
      hold.current = setTimeout(function () { wasHeld.current = true; setHeld(true); }, 220);
    }
    function up(e) {
      if (isControl(e.target)) return;
      clearTimeout(hold.current);
      if (wasHeld.current) { setHeld(false); wasHeld.current = false; return; }
      var r = e.currentTarget.getBoundingClientRect();
      if (e.clientX - r.left < r.width * 0.3) go(idx - 1); else go(idx + 1);
    }
    function cancel() { clearTimeout(hold.current); if (wasHeld.current) { setHeld(false); wasHeld.current = false; } }
    function key(e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
      else if (e.key === " ") { if (isControl(e.target)) return; e.preventDefault(); setPlaying(!playing); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    }
    var ready = !cur.image || !!loaded[cur.image];
    var running = flipped && playing && !held && !loading && ready;
    var nextImg = stories[idx + 1] && stories[idx + 1].image;
    var book = h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
      h("path", { d: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" }), h("path", { d: "M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" }), h("path", { d: "M9 7h7M9 11h5" }));
    var f = p.front || {};
    return h("div", { ref: wrap, className: cx("gb-cs", flipped && "is-flipped", hint && !flipped && "is-hint") },
      h("div", { className: "gb-cs-inner" },
        /* Front */
        h("article", { className: "gb-cs-face gb-cs-front", "aria-hidden": flipped, inert: flipped ? "" : undefined },
          h("div", { className: "gb-cs-meta" }, h("span", null, keepDates(f.dates)), h("span", { className: "gb-cs-result" }, f.result)),
          h("div", { className: "gb-cs-titlerow" },
            h("div", { className: "gb-cs-title" }, h("h3", { className: "title" }, f.title), h("span", null, f.org)),
            n ? h("button", { ref: frontBtn, type: "button", className: "gb-cs-book", onClick: open, "aria-label": "Open the " + n + " course stories for " + f.title, "data-cursor": "Flip" }, book, h("span", { className: "gb-cs-book-label", "aria-hidden": true }, "Play the courses"), h("span", { className: "gb-cs-book-n" }, n)) : null),
          f.links && f.links.length ? h("div", { className: "gb-cs-links" }, f.links.map(function (l, i) { return h("a", { key: i, className: "gb-link", href: l.href, target: "_blank", rel: "noopener noreferrer" }, l.label + " ↗"); })) : null,
          (f.groups || []).map(function (g, i) {
            return h("div", { key: i, className: "gb-cs-group" }, h("h4", null, g.name), h("div", { className: "gb-cs-chips" }, g.items.map(function (c, k) { return h("span", { key: k, className: "gb-cs-chip" }, c); })));
          })),
        /* Back */
        h("section", { ref: back, className: "gb-cs-face gb-cs-back", tabIndex: flipped ? 0 : -1, "aria-hidden": !flipped, inert: flipped ? undefined : "", onKeyDown: key, "aria-roledescription": "course stories", "aria-label": (f.title || "") + ", course stories" },
          h("div", { className: "gb-cs-bars", "aria-hidden": true }, stories.map(function (s, i) {
            return h("span", { key: i, className: "gb-cs-bar" }, h("span", { key: i === idx ? "run-" + idx + (flipped ? "" : "-off") : "s-" + i, className: cx("gb-cs-bar-fill", i < idx && "is-done", i === idx && flipped && !loading && "is-run"),
              style: i === idx ? { animationDuration: dur, animationPlayState: running ? "running" : "paused" } : undefined, onAnimationEnd: i === idx ? onEnd : undefined }));
          })),
          h("div", { className: "gb-cs-head" },
            h(StoryRing, { count: n, seen: idx + (loading ? 0 : 1), loading: loading, label: (idx + 1) + "/" + n }),
            h("div", { className: "gb-cs-who" }, h("strong", null, f.title), h("span", null, keepDates(cur.date || ""))),
            h("button", { type: "button", className: "gb-cs-ctl", onClick: function () { if (!playing && idx >= n - 1) { setIdx(0); } setPlaying(!playing); }, "aria-label": playing ? "Pause" : "Play", "aria-pressed": !playing },
              playing ? h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true }, h("rect", { x: 6, y: 5, width: 4, height: 14, rx: 1 }), h("rect", { x: 14, y: 5, width: 4, height: 14, rx: 1 }))
                : h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true }, h("path", { d: "M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" }))),
            h("button", { type: "button", className: "gb-cs-ctl", onClick: close, "aria-label": "Turn the card back over" }, book)),
          h("div", { className: cx("gb-cs-stage", held && "is-held"), onPointerDown: down, onPointerUp: up, onPointerLeave: cancel, onPointerCancel: cancel, onContextMenu: function (e) { e.preventDefault(); } },
            loading ? h("div", { className: "gb-cs-loading" }, h("span", null, "Loading " + n + " courses")) :
            h("div", { key: idx, className: cx("gb-cs-slide", dir < 0 ? "from-left" : "from-right"), "aria-live": "polite" },
              cur.image ? h("figure", { className: cx("gb-cs-cert", ready && "is-ready") },
                h("img", { src: cur.image, alt: "DataCamp statement of accomplishment for " + cur.title + ", " + (cur.date || ""), width: 880, height: 508, draggable: false, onLoad: function () { markLoaded(cur.image); }, onError: function () { markLoaded(cur.image); } })) : null,
              h("span", { className: "gb-cs-kicker" }, "Course " + (idx + 1) + " of " + n + (cur.hours ? ", " + cur.hours : "")),
              h("h4", { className: "gb-cs-course" }, cur.title),
              cur.about ? h("p", { className: "gb-cs-about" }, cur.about) : null,
              cur.chapters && cur.chapters.length ? h("ol", { className: "gb-cs-chapters" }, cur.chapters.map(function (c, k) { return h("li", { key: k }, c); })) : null,
              cur.verify ? h("a", { className: "gb-cs-verify", href: cur.verify, target: "_blank", rel: "noopener noreferrer" }, "Verify on DataCamp ↗") : null)),
          nextImg && flipped ? h("img", { className: "gb-cs-preload", src: nextImg, alt: "", "aria-hidden": true, onLoad: function () { markLoaded(nextImg); } }) : null,
          h("p", { className: "gb-cs-hint", "aria-hidden": true }, "Tap right for next, left for back, hold to pause"))));
  }


  /* ---------- GameTheatre (v8): my best rated wins, replayed the way people watch a game, and a live view.
     Replays: each game plays at a watching pace (bullet quicker than rapid), rests on the final position, then the next
     game starts. Each is labelled, e.g. "2nd best rated blitz win", with players and ratings shown as Lichess does.
     Scroll over the board to run through the moves, as on Lichess; arrows, Space, Home and End work when it has focus.
     Three window-style buttons switch the board colours: Gambit (the site's greys), Lichess (brown) and Chess.com (green).
     The switch icon flips the same screen to Live: when I'm playing on Lichess the game streams onto this board.
     Sound is off until asked for; the move, capture and check sounds are synthesised here, not borrowed. ---------- */
  var GT_START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  function gtBoard(fen) { var b = [], rows = String(fen || GT_START).split(" ")[0].split("/"); rows.forEach(function (r) { r.split("").forEach(function (c) { if (/\d/.test(c)) { for (var i = 0; i < +c; i++) b.push(null); } else b.push(c); }); }); return b; }
  function gtIdx(sq) { return (8 - parseInt(sq[1], 10)) * 8 + "abcdefgh".indexOf(sq[0]); }
  function gtPlay(moves, sans) {
    var b = gtBoard(GT_START), out = [{ b: b.slice() }];
    moves.forEach(function (u, k) {
      var f = gtIdx(u.slice(0, 2)), t = gtIdx(u.slice(2, 4)), p = b[f], cap = !!b[t];
      if (p && p.toLowerCase() === "k" && Math.abs((f % 8) - (t % 8)) === 2) { var rf = t > f ? f + 3 : f - 4, rt = t > f ? f + 1 : f - 1; b[rt] = b[rf]; b[rf] = null; }
      if (p && p.toLowerCase() === "p" && (f % 8) !== (t % 8) && !b[t]) { b[t + (p === "P" ? 8 : -8)] = null; cap = true; }
      b[t] = u.length > 4 ? (p === "P" ? u[4].toUpperCase() : u[4]) : p; b[f] = null;
      var s = sans[k] || "";
      out.push({ b: b.slice(), from: f, to: t, cap: cap, check: /[+#]$/.test(s), mate: /#$/.test(s), san: s, ply: k + 1 });
    });
    return out;
  }
  var gtAudio = null;
  function gtSound(kind) {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      gtAudio = gtAudio || new AC(); var a = gtAudio, t = a.currentTime;
      if (a.state === "suspended") a.resume();
      function click(freq, vol, len) {
        var n = a.createBuffer(1, Math.floor(a.sampleRate * len), a.sampleRate), d = n.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
        var s = a.createBufferSource(); s.buffer = n;
        var f = a.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = 1.2;
        var g = a.createGain(); g.gain.value = vol; s.connect(f); f.connect(g); g.connect(a.destination); s.start(t);
      }
      function tone(freq, vol, len, at) { var o = a.createOscillator(), g = a.createGain(); o.type = "sine"; o.frequency.value = freq; g.gain.setValueAtTime(0, t + at); g.gain.linearRampToValueAtTime(vol, t + at + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + at + len); o.connect(g); g.connect(a.destination); o.start(t + at); o.stop(t + at + len + 0.02); }
      if (kind === "move") click(2200, 0.5, 0.05);
      else if (kind === "capture") { click(1200, 0.8, 0.07); click(2600, 0.35, 0.04); }
      else if (kind === "check") { click(2200, 0.45, 0.05); tone(990, 0.06, 0.14, 0.02); }
      else if (kind === "end") { tone(523, 0.07, 0.35, 0); tone(784, 0.06, 0.5, 0.12); }
    } catch (e) {}
  }
  function gtStore(k, v) { try { if (v === undefined) return window.localStorage.getItem(k); window.localStorage.setItem(k, v); } catch (e) { return null; } }
  var GT_PACE = { bullet: 520, blitz: 720, rapid: 900 };
  /* Clocks come from Lichess in tenths of a second: one reading after every move, then (when the game ended on time or by
     resignation) one more for the side to move, which is 0 when they flagged. */
  function gtClocks(c, k, last) {
    if (!c || !c.length) return null;
    var w = c[0], b = c.length > 1 ? c[1] : c[0];
    for (var p = 1; p <= k && p <= c.length; p++) { if (p % 2) w = c[p - 1]; else b = c[p - 1]; }
    var flag = null;
    if (k >= last && c.length > last) { if ((last + 1) % 2) { w = c[last]; flag = w === 0 ? "white" : null; } else { b = c[last]; flag = b === 0 ? "black" : null; } }
    return { white: w, black: b, flag: flag, toMove: k % 2 === 0 ? "white" : "black", next: c[k] };
  }
  function GameTheatre(p) {
    var games = p.games || [], user = p.user || "Lique", P = p.pieces || {};
    var gs = React.useState(0), gi = gs[0], setGi = gs[1];
    var ks = React.useState(0), k = ks[0], setK = ks[1];
    var ps = React.useState(!reducedMotion()), auto = ps[0], setAuto = ps[1];
    var ts = React.useState(function () { return gtStore("gb-board") || "gambit"; }), theme = ts[0], setTheme = ts[1];
    var ss = React.useState(function () { return gtStore("gb-sound") === "on"; }), sound = ss[0], setSound = ss[1];
    var ms = React.useState("replay"), mode = ms[0], setMode = ms[1];
    var vs = React.useState(false), inView = vs[0], setInView = vs[1];
    var ls = React.useState({ state: "idle" }), live = ls[0], setLive = ls[1];
    var root = React.useRef(null), boardRef = React.useRef(null), wheelAcc = React.useRef(0);
    var rs = React.useState(null), runVal = rs[0], setRunVal = rs[1];
    var g = games[gi] || {};
    var line = React.useMemo(function () { return gtPlay(String(g.moves || "").split(" ").filter(Boolean), String(g.san || "").split(" ")); }, [gi]);
    var last = line.length - 1, pos = line[Math.min(k, last)] || line[0];
    var clockList = React.useMemo(function () { return typeof g.clocks === "string" ? g.clocks.split(",").map(Number) : (g.clocks || null); }, [gi]);
    var clk = gtClocks(clockList, k, last);
    /* While a replay plays, the clock of the side to move runs down toward the time it will show after its next move. */
    React.useEffect(function () {
      setRunVal(null);
      if (mode !== "replay" || !auto || !inView || !clk || k >= last || clk.next == null) return;
      var from = clk[clk.toMove], to = Math.min(from, clk.next), dur = k === 0 ? 900 : (GT_PACE[g.speed] || 700), t0 = 0, raf = 0;
      function frame(t) { if (!t0) t0 = t; var f = Math.min(1, (t - t0) / dur); setRunVal(Math.round(from - (from - to) * f)); if (f < 1) raf = requestAnimationFrame(frame); }
      raf = requestAnimationFrame(frame);
      return function () { cancelAnimationFrame(raf); };
    }, [k, gi, auto, inView, mode]);
    React.useEffect(function () {
      if (!root.current || !("IntersectionObserver" in window)) { setInView(true); return; }
      var io = new IntersectionObserver(function (es) { setInView(es[0].isIntersecting); }, { threshold: 0.25 });
      io.observe(root.current); return function () { io.disconnect(); };
    }, []);
    /* Watching: one move per beat, a rest on the final position, then the next game. */
    React.useEffect(function () {
      if (mode !== "replay" || !auto || !inView) return;
      var t = setTimeout(function () {
        if (k < last) setK(k + 1);
        else { setGi((gi + 1) % games.length); setK(0); }
      }, k >= last ? 2600 : k === 0 ? 900 : (GT_PACE[g.speed] || 700));
      return function () { clearTimeout(t); };
    }, [auto, k, gi, inView, mode, last]);
    React.useEffect(function () { if (!sound || mode !== "replay" || k === 0) return; var q = line[k]; if (!q) return; gtSound(q.mate || k === last ? "end" : q.check ? "check" : q.cap ? "capture" : "move"); }, [k, gi]);
    function step(n) { setAuto(false); setK(Math.max(0, Math.min(last, n))); }
    /* Scroll over the board runs through the moves, as on Lichess. Only over the board; the page scrolls everywhere else. */
    React.useEffect(function () {
      var el = boardRef.current; if (!el || mode !== "replay") return;
      function wheel(e) {
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        e.preventDefault(); wheelAcc.current += e.deltaY;
        if (Math.abs(wheelAcc.current) >= 40) { var d = wheelAcc.current > 0 ? 1 : -1; wheelAcc.current = 0; setAuto(false); setK(function (x) { return Math.max(0, Math.min(last, x + d)); }); }
      }
      el.addEventListener("wheel", wheel, { passive: false });
      return function () { el.removeEventListener("wheel", wheel); };
    }, [mode, last]);
    function key(e) {
      if (mode !== "replay") return;
      if (e.key === "ArrowRight") { e.preventDefault(); step(k + 1); } else if (e.key === "ArrowLeft") { e.preventDefault(); step(k - 1); }
      else if (e.key === "Home") { e.preventDefault(); step(0); } else if (e.key === "End") { e.preventDefault(); step(last); }
      else if (e.key === " ") { e.preventDefault(); setAuto(!auto); }
    }
    function pick(i) { setGi(i); setK(0); setAuto(true); }
    function pickTheme(t) { setTheme(t); gtStore("gb-board", t); }
    function toggleSound() { var v = !sound; setSound(v); gtStore("gb-sound", v ? "on" : "off"); if (v) gtSound("move"); }
    /* Live: ask Lichess whether I'm playing; if so, stream that game onto this board. */
    React.useEffect(function () {
      if (mode !== "live") return;
      var stop = false, timer = 0, ctrl = null, tick = 0;
      function poll() {
        setLive(function (l) { return l.state === "playing" ? l : { state: "checking" }; });
        fetch("https://lichess.org/api/users/status?ids=" + encodeURIComponent(user) + "&withGameIds=true").then(function (r) { return r.json(); }).then(function (a) {
          if (stop) return; var s = a && a[0];
          if (s && s.playing && s.playingId) watch(s.playingId); else { setLive({ state: "idle", online: !!(s && s.online) }); timer = setTimeout(poll, 20000); }
        }).catch(function () { if (!stop) { setLive({ state: "offline" }); timer = setTimeout(poll, 30000); } });
      }
      function watch(id) {
        ctrl = "AbortController" in window ? new AbortController() : null;
        var base = { state: "playing", id: id, fen: GT_START, lm: null, wc: null, bc: null };
        fetch("https://lichess.org/api/stream/game/" + id, ctrl ? { signal: ctrl.signal } : undefined).then(function (r) {
          var rd = r.body.getReader(), dec = new TextDecoder(), buf = "";
          function read() {
            return rd.read().then(function (res) {
              if (res.done || stop) { if (!stop) { setLive({ state: "ended", id: id }); timer = setTimeout(poll, 15000); } return; }
              buf += dec.decode(res.value, { stream: true });
              var parts = buf.split("\n"); buf = parts.pop();
              parts.forEach(function (ln) {
                if (!ln.trim()) return; var m; try { m = JSON.parse(ln); } catch (e) { return; }
                if (m.players) { base.white = m.players.white; base.black = m.players.black; base.speed = m.speed; }
                if (m.fen) base.fen = m.fen; if (m.lastMove || m.lm) base.lm = m.lastMove || m.lm;
                if (m.wc != null) base.wc = m.wc; if (m.bc != null) base.bc = m.bc;
                if (m.lm && sound) gtSound(/x/.test(m.lm) ? "capture" : "move");
                setLive(Object.assign({}, base));
              });
              return read();
            });
          }
          return read();
        }).catch(function () { if (!stop) { setLive({ state: "offline" }); timer = setTimeout(poll, 30000); } });
      }
      poll();
      tick = setInterval(function () { setLive(function (l) { if (l.state !== "playing" || !l.fen) return l; var w = / w /.test(l.fen); var n = Object.assign({}, l); if (w && n.wc > 0) n.wc--; if (!w && n.bc > 0) n.bc--; return n; }); }, 1000);
      return function () { stop = true; clearTimeout(timer); clearInterval(tick); if (ctrl) try { ctrl.abort(); } catch (e) {} };
    }, [mode]);
    /* What the board shows */
    var isLive = mode === "live", playing = isLive && live.state === "playing";
    var board, hlFrom = -1, hlTo = -1, checkSq = -1, flip, top, bottom, moved = -1;
    if (playing) {
      board = gtBoard(live.fen);
      var lm = live.lm && String(live.lm).match(/^([a-h][1-8])([a-h][1-8])/); if (lm) { hlFrom = gtIdx(lm[1]); hlTo = gtIdx(lm[2]); }
      var meWhite = live.white && live.white.user && String(live.white.user.name).toLowerCase() === user.toLowerCase();
      flip = !meWhite;
      var side = function (c, me) { var pl = live[c] || {}; return { name: pl.user ? pl.user.name : "Anonymous", title: pl.user && pl.user.title, rating: pl.rating, clock: live[c === "white" ? "wc" : "bc"] != null ? live[c === "white" ? "wc" : "bc"] * 10 : null, color: c, me: me, running: (/ w /.test(live.fen) ? "white" : "black") === c }; };
      top = side(meWhite ? "black" : "white", false); bottom = side(meWhite ? "white" : "black", true);
    } else {
      board = pos.b; hlFrom = pos.from != null ? pos.from : -1; hlTo = pos.to != null ? pos.to : -1; moved = k > 0 ? pos.to : -1;
      if (pos.check) { var kc = (pos.ply % 2 === 1) ? "k" : "K"; checkSq = board.indexOf(kc); }
      flip = g.me === "black";
      var done = k >= last;
      top = { name: g.opp, rating: g.oppRating, color: g.me === "white" ? "black" : "white", result: done ? "0" : null };
      bottom = { name: user, rating: g.myRating, color: g.me, me: true, result: done ? "1" : null };
      if (clk) [top, bottom].forEach(function (pl) {
        var running = !done && clk.toMove === pl.color;
        pl.clock = running && runVal != null ? runVal : clk[pl.color]; pl.running = running; pl.flag = clk.flag === pl.color;
      });
    }
    var order = []; for (var i = 0; i < 64; i++) order.push(flip ? 63 - i : i);
    function fmt(d) { if (d == null) return null; d = Math.max(0, Math.round(d)); var sec = Math.floor(d / 10), m = Math.floor(sec / 60), ss = ("0" + (sec % 60)).slice(-2); return d < 200 ? m + ":" + ss + "." + (d % 10) : m + ":" + ss; }
    function player(pl, where) {
      return h("div", { className: cx("gb-gt-player", "is-" + where) },
        h("span", { className: cx("gb-gt-dot", pl.color === "white" ? "is-white" : "is-black"), "aria-hidden": true }),
        pl.title ? h("span", { className: "gb-gt-title" }, pl.title) : null,
        h("strong", { className: "gb-gt-name", translate: "no" }, pl.name || ""),
        pl.rating ? h("span", { className: "gb-gt-rating" }, pl.rating) : null,
        pl.result ? h("span", { className: cx("gb-gt-result", pl.result === "1" && "is-win"), "aria-label": pl.result === "1" ? "won" : "lost" }, pl.result) : null,
        pl.clock != null ? h("span", { className: cx("gb-gt-clock", pl.running && "is-running", pl.flag && "is-flag", pl.clock < 200 && pl.running && "is-low"), "aria-label": (pl.name || "") + " clock " + fmt(pl.clock) + (pl.running ? ", running" : "") + (pl.flag ? ", out of time" : "") }, fmt(pl.clock)) : null);
    }
    var themes = [{ id: "gambit", label: "Gambit board, the site's greys" }, { id: "lichess", label: "Lichess board, brown" }, { id: "chesscom", label: "Chess.com style board, green" }];
    var dx = 0, dy = 0;
    if (moved >= 0 && pos.from != null && !reducedMotion()) { var fi = order.indexOf(pos.from), ti = order.indexOf(pos.to); dx = ((fi % 8) - (ti % 8)) * 100; dy = (Math.floor(fi / 8) - Math.floor(ti / 8)) * 100; }
    var speeds = ["bullet", "blitz", "rapid"];
    return h("div", { ref: root, className: "gb-gt", "data-board": theme },
      h("div", { className: "gb-gt-bar" },
        h("div", { className: "gb-gt-lights", role: "group", "aria-label": "Board colours" }, themes.map(function (t) {
          return h("button", { key: t.id, type: "button", className: cx("gb-gt-light", "is-" + t.id), "aria-label": t.label, "aria-pressed": theme === t.id, title: t.label, onClick: function () { pickTheme(t.id); } });
        })),
        h("span", { className: "gb-gt-label", "aria-live": "polite" }, isLive ? (playing ? h(React.Fragment, null, h("span", { className: "gb-gt-livedot", "aria-hidden": true }), "Live on Lichess") : "Live view") : h(React.Fragment, null, g.label ? g.label.charAt(0).toUpperCase() + g.label.slice(1) : "", h("span", { className: cx("gb-gt-state", k >= last ? "is-final" : "is-play") }, k >= last ? "Final" : (auto ? "In play" : "Paused")))),
        h("div", { className: "gb-gt-icons" },
          h("button", { type: "button", className: "gb-gt-icon", onClick: toggleSound, "aria-pressed": sound, "aria-label": sound ? "Sound on" : "Sound off" },
            h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, h("path", { d: "M4 9v6h4l5 4V5L8 9z" }), sound ? h("path", { d: "M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" }) : h("path", { d: "M17 9l5 6M22 9l-5 6" }))),
          h("button", { type: "button", className: cx("gb-gt-icon", isLive && "is-on"), onClick: function () { setMode(isLive ? "replay" : "live"); }, "aria-pressed": isLive, "aria-label": isLive ? "Back to my best wins" : "Watch me live on Lichess", title: isLive ? "Back to my best wins" : "Watch me live" },
            h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, h("path", { d: "M7 7h11l-3-3M17 17H6l3 3" }))))),
      h("div", { className: "gb-gt-stage" },
        player(top, "top"),
        h("div", { ref: boardRef, className: cx("gb-gt-board", isLive && !playing && "is-dim"), tabIndex: 0, onKeyDown: key, role: "img",
          "aria-label": isLive ? (playing ? "Live game on Lichess" : "No live game") : ((g.label || "") + ", " + (k === 0 ? "starting position" : "after " + Math.ceil(k / 2) + (k % 2 ? ". " : "... ") + pos.san)), "data-cursor": isLive ? undefined : "Scroll" },
          order.map(function (sq, i) {
            var r = Math.floor(sq / 8), f = sq % 8, pc = board[sq], dark = (r + f) % 2 === 1;
            return h("div", { key: sq, className: cx("gb-gt-sq", dark ? "is-dark" : "is-light", (sq === hlFrom || sq === hlTo) && "is-last", sq === checkSq && "is-check") },
              (flip ? f === 7 : f === 0) ? h("span", { className: "gb-gt-rank", "aria-hidden": true }, 8 - r) : null,
              (flip ? r === 0 : r === 7) ? h("span", { className: "gb-gt-file", "aria-hidden": true }, "abcdefgh"[f]) : null,
              pc ? h("img", { key: sq === moved ? "m" + gi + "-" + k : "s" + pc, src: P[pc], alt: "", draggable: false, className: cx("gb-gt-pc", sq === moved && "is-moved"), style: sq === moved ? { "--dx": dx + "%", "--dy": dy + "%" } : undefined }) : null);
          }),
          isLive && !playing ? h("div", { className: "gb-gt-idle" },
            h("strong", null, live.state === "checking" ? "Looking for a live game…" : live.state === "ended" ? "That game just ended." : live.state === "offline" ? "Lichess can’t be reached right now." : "I’m not playing right now."),
            h("span", null, live.state === "idle" && live.online ? "Online on Lichess, between games. This view checks every 20 seconds." : "This view checks every 20 seconds and starts the moment a game does."),
            h("div", { className: "gb-gt-idle-row" }, h(Button, { size: "sm", onClick: function () { setMode("replay"); } }, "Watch my best wins"), h("a", { className: "gb-link", href: "https://lichess.org/@/" + user, target: "_blank", rel: "noopener noreferrer" }, "Follow on Lichess ↗"))) : null),
        player(bottom, "bottom")),
      isLive ? h("div", { className: "gb-gt-foot" }, playing ? h("a", { className: "gb-gt-open", href: "https://lichess.org/" + live.id, target: "_blank", rel: "noopener noreferrer" }, "Open this game on Lichess ↗") : h("span", { className: "gb-gt-meta" }, "Streams straight from Lichess when I’m playing.")) :
      h(React.Fragment, null,
        h("div", { className: "gb-gt-ctl" },
          h("button", { type: "button", className: "gb-iconbtn", onClick: function () { step(0); }, disabled: k === 0, "aria-label": "First move" }, h(Icon, { name: "left", size: 16 }), h(Icon, { name: "left", size: 16 })),
          h("button", { type: "button", className: "gb-iconbtn", onClick: function () { step(k - 1); }, disabled: k === 0, "aria-label": "Previous move" }, h(Icon, { name: "left", size: 18 })),
          h("button", { type: "button", className: "gb-iconbtn", onClick: function () { if (!auto && k >= last) setK(0); setAuto(!auto); }, "aria-pressed": auto, "aria-label": auto ? "Pause" : "Play" }, h(Icon, { name: auto ? "pause" : "play", size: 16 })),
          h("button", { type: "button", className: "gb-iconbtn", onClick: function () { step(k + 1); }, disabled: k >= last, "aria-label": "Next move" }, h(Icon, { name: "right", size: 18 })),
          h("button", { type: "button", className: "gb-iconbtn", onClick: function () { step(last); }, disabled: k >= last, "aria-label": "Last move" }, h(Icon, { name: "right", size: 16 }), h(Icon, { name: "right", size: 16 })),
          h("span", { className: "gb-gt-now" }, k === 0 ? "Start" : Math.ceil(k / 2) + (k % 2 ? ". " : "... ") + pos.san, h("em", null, k >= last ? "Game over, " + String(g.how || "").toLowerCase() : "Move " + Math.ceil(k / 2) + " of " + Math.ceil(last / 2)))),
        h("div", { className: "gb-gt-meta" }, h("span", null, g.opening), h("span", null, g.clock ? (parseInt(g.clock, 10) / 60) + "+" + g.clock.split("+")[1] + " " + g.speed : ""), h("span", null, k >= last ? g.how : g.date), h("a", { className: "gb-gt-open", href: g.url, target: "_blank", rel: "noopener noreferrer" }, "Open on Lichess ↗")),
        h("div", { className: "gb-gt-picker" }, speeds.map(function (sp) {
          var list = games.map(function (x, j) { return { x: x, j: j }; }).filter(function (o) { return o.x.speed === sp; });
          if (!list.length) return null;
          return h("div", { key: sp, className: "gb-gt-speed", role: "group", "aria-label": sp + " games" },
            h("span", { className: "gb-gt-speed-name" }, sp.charAt(0).toUpperCase() + sp.slice(1)),
            list.map(function (o) { return h("button", { key: o.j, type: "button", className: "gb-gt-pick", "aria-pressed": gi === o.j, "aria-label": o.x.label + " against " + o.x.opp + ", " + o.x.oppRating, onClick: function () { pick(o.j); } }, o.x.rank); }));
        })),
        h("p", { className: "gb-gt-credit" }, "Scroll over the board to run through the moves. Pieces: cburnett by Colin M.L. Burnett, GPLv2+.")));
  }


  /* ================= v7: motion with GSAP, task view, cursor, phone nav, access requests ================= */
  var G7 = function () { return window.gsap || null; };
  function canHover() { try { return window.matchMedia("(hover: hover) and (pointer: fine)").matches; } catch (e) { return false; } }
  function lockScroll(on) { var r = document.documentElement; if (on) { r.dataset.gbLock = r.style.overflow || ""; r.style.overflow = "hidden"; } else { r.style.overflow = r.dataset.gbLock || ""; delete r.dataset.gbLock; } }
  function trapTab(e, root) {
    if (e.key !== "Tab" || !root) return;
    var f = [].slice.call(root.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
  /* "6 May to 6 Aug 2024": a day never wraps away from its month, nor a month from its year. */
  function keepDates(t) { return typeof t === "string" ? t.replace(/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, "$1\u00a0$2").replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})/g, "$1\u00a0$2") : t; }
  function portal(node) { var RD = window.ReactDOM; return RD && RD.createPortal && typeof document !== "undefined" && document.body ? RD.createPortal(node, document.body) : node; }

  /* ---------- Cursor: a small board square that follows, and turns on its diagonal over anything you can use ---------- */
  /* Fine pointers only, never under reduced motion; native cursor stays for text fields and live sites. Nothing is ever hidden from touch or keyboard users. */
  function Cursor() {
    React.useEffect(function () {
      if (!canHover() || reducedMotion() || document.querySelector(".gb-cursor")) return;
      var root = document.createElement("div"); root.className = "gb-cursor"; root.setAttribute("aria-hidden", "true");
      root.innerHTML = '<span class="gb-cursor-pos gb-cursor-pos-ring"><span class="gb-cursor-ring"><span class="gb-cursor-label"></span></span></span><span class="gb-cursor-pos gb-cursor-pos-dot"><span class="gb-cursor-dot"></span></span>';
      document.body.appendChild(root);
      var html = document.documentElement; html.classList.add("gb-cursor-on");
      var pr = root.querySelector(".gb-cursor-pos-ring"), pd = root.querySelector(".gb-cursor-pos-dot"), label = root.querySelector(".gb-cursor-label");
      var g = G7(), mx = -100, my = -100, rx = -100, ry = -100, raf = 0, idle = 0;
      var qx, qy, rqx, rqy;
      if (g) { qx = g.quickTo(pd, "x", { duration: 0.12, ease: "power3.out" }); qy = g.quickTo(pd, "y", { duration: 0.12, ease: "power3.out" }); rqx = g.quickTo(pr, "x", { duration: 0.5, ease: "power3.out" }); rqy = g.quickTo(pr, "y", { duration: 0.5, ease: "power3.out" }); }
      function loop() { raf = 0; rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; pd.style.transform = "translate(" + mx + "px," + my + "px)"; pr.style.transform = "translate(" + rx + "px," + ry + "px)"; if (Math.abs(mx - rx) + Math.abs(my - ry) > 0.5) raf = requestAnimationFrame(loop); }
      function mode(t) {
        if (!t || !t.closest) return ["", ""];
        if (t.closest("input, textarea, select, [contenteditable=''], [contenteditable='true'], iframe")) return ["native", ""];
        var c = t.closest("[data-cursor]"); if (c) return ["label", c.getAttribute("data-cursor")];
        if (t.closest(".gb-live-use")) return ["label", "Use"];
        if (t.closest(".gb-video-poster")) return ["label", "Play"];
        if (t.closest(".gb-carousel-track, .gb-certs-track")) return t.closest("a, button") ? ["link", ""] : ["label", "Drag"];
        if (t.closest("a[href], button:not([disabled]), summary, [role='button'], label, .gb-tv-card")) return ["link", ""];
        return ["", ""];
      }
      function move(e) {
        mx = e.clientX; my = e.clientY;
        if (g) { qx(mx); qy(my); rqx(mx); rqy(my); } else if (!raf) raf = requestAnimationFrame(loop);
        var m = mode(e.target);
        root.className = "gb-cursor is-on" + (m[0] ? " is-" + m[0] : "") + (root.classList.contains("is-down") ? " is-down" : "");
        if (label.textContent !== m[1]) label.textContent = m[1];
        clearTimeout(idle); idle = setTimeout(function () { root.classList.add("is-idle"); }, 1800);
      }
      function down() { root.classList.add("is-down"); }
      function up() { root.classList.remove("is-down"); }
      function leave() { root.classList.remove("is-on", "is-down"); clearTimeout(idle); }
      /* Leaving the page or entering a live site frame: the frame gets its own native cursor, so ours steps aside. */
      function out(e) { var r = e.relatedTarget; if (!r || r.tagName === "IFRAME") leave(); }
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerdown", down, { passive: true });
      window.addEventListener("pointerup", up, { passive: true });
      document.addEventListener("pointerleave", leave);
      document.addEventListener("pointerout", out, { passive: true });
      window.addEventListener("blur", leave);
      return function () {
        window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); document.removeEventListener("pointerleave", leave); document.removeEventListener("pointerout", out); window.removeEventListener("blur", leave);
        clearTimeout(idle); if (raf) cancelAnimationFrame(raf); html.classList.remove("gb-cursor-on"); if (root.parentNode) root.parentNode.removeChild(root);
      };
    }, []);
    return null;
  }

  /* ---------- TaskView: every move as a window, grouped by year, with a year scrubber (after Windows Task View) ---------- */
  function TaskView(p) {
    var items = p.items || [];
    var ref = React.useRef(null), scroller = React.useRef(null);
    var ps = React.useState(false), playing = ps[0], setPlaying = ps[1];
    var hs = React.useState(p.active == null ? items.length - 1 : p.active), hi = hs[0], setHi = hs[1];
    var ys = React.useState(null), year = ys[0], setYear = ys[1];
    /* The dialog renders into <body>, outside the page's theme wrapper, so it carries the theme of whatever opened it. */
    var ts = React.useState(function () { if (p.theme) return p.theme; var a = typeof document !== "undefined" && document.activeElement, t = a && a.closest && a.closest("[data-theme]"); if (!t && typeof document !== "undefined") t = document.querySelector("[data-theme]"); return t ? t.getAttribute("data-theme") : undefined; }), theme = ts[0];
    var years = []; items.forEach(function (it) { if (it.year && years.indexOf(it.year) < 0) years.push(it.year); });
    function close() {
      var g = G7(), el = ref.current;
      setPlaying(false);
      if (g && el && !reducedMotion()) g.to(el, { opacity: 0, duration: 0.18, ease: "power2.in", onComplete: p.onClose });
      else if (p.onClose) p.onClose();
    }
    React.useEffect(function () {
      var el = ref.current; if (!el) return;
      lockScroll(true);
      var prev = document.activeElement;
      var g = G7(), cards = [].slice.call(el.querySelectorAll(".gb-tv-card"));
      var cur = el.querySelector('.gb-tv-card[data-i="' + hi + '"]');
      if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "center" });
      if (g && !reducedMotion()) {
        var tl = g.timeline();
        tl.fromTo(el.querySelector(".gb-tv-backdrop"), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
          .fromTo(el.querySelector(".gb-tv-head"), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.05)
          .fromTo(cards, { y: 18, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", stagger: { each: Math.min(0.03, 0.4 / Math.max(cards.length, 1)) } }, 0.08)
          .fromTo(el.querySelector(".gb-tv-years"), { x: 12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.15);
      }
      if (cur) cur.focus({ preventScroll: true });
      function key(e) {
        if (e.key === "Escape") { e.preventDefault(); close(); return; }
        trapTab(e, el);
        var a = document.activeElement; if (!a || !a.classList.contains("gb-tv-card")) return;
        var all = [].slice.call(el.querySelectorAll(".gb-tv-card")), k = all.indexOf(a);
        var cols = Math.max(1, Math.round(a.parentNode.parentNode.getBoundingClientRect().width / a.getBoundingClientRect().width));
        var n = e.key === "ArrowRight" ? k + 1 : e.key === "ArrowLeft" ? k - 1 : e.key === "ArrowDown" ? k + cols : e.key === "ArrowUp" ? k - cols : null;
        if (n == null) return;
        e.preventDefault(); n = Math.max(0, Math.min(all.length - 1, n)); all[n].focus();
      }
      el.addEventListener("keydown", key);
      /* The rail follows the reader's scrolling, not the initial jump to the current move. */
      var settled = false, st = setTimeout(function () { settled = true; }, 700);
      var io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(function (es) {
        if (!settled) return;
        es.forEach(function (x) { if (x.isIntersecting) setYear(x.target.getAttribute("data-year")); });
      }, { root: scroller.current, rootMargin: "-20% 0px -70% 0px" }) : null;
      if (io) [].slice.call(el.querySelectorAll(".gb-tv-year")).forEach(function (s) { io.observe(s); });
      return function () { clearTimeout(st); el.removeEventListener("keydown", key); if (io) io.disconnect(); lockScroll(false); if (prev && prev.focus) prev.focus({ preventScroll: true }); };
    }, []);
    React.useEffect(function () {
      if (!playing) return;
      var t = setTimeout(function () {
        if (hi >= items.length - 1) { setPlaying(false); return; }
        var n = hi + 1; setHi(n);
        var c = ref.current && ref.current.querySelector('.gb-tv-card[data-i="' + n + '"]');
        if (c) c.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
      }, reducedMotion() ? 900 : 1200);
      return function () { clearTimeout(t); };
    }, [playing, hi]);
    React.useEffect(function () { if (items[hi] && items[hi].year) setYear(items[hi].year); }, [hi]);
    function jump(y) {
      var s = ref.current && ref.current.querySelector('.gb-tv-year[data-year="' + y + '"]');
      if (s && scroller.current) scroller.current.scrollTo({ top: s.offsetTop - 8, behavior: reducedMotion() ? "auto" : "smooth" });
    }
    function pick(i) { setPlaying(false); if (p.onPick) p.onPick(i); close(); }
    var shown = year || (items[hi] && items[hi].year) || years[0];
    return portal(h("div", { className: "gb-tv", "data-theme": theme, ref: ref, role: "dialog", "aria-modal": "true", "aria-labelledby": "gb-tv-title" },
      h("div", { className: "gb-tv-backdrop", onClick: close }),
      h("div", { className: "gb-tv-in" },
        h("header", { className: "gb-tv-head" },
          h("div", null, h("h2", { id: "gb-tv-title" }, p.title || "Every move"), h("p", null, items.length + " moves, " + (years[0] || "") + " to now. Pick one to open it.")),
          h("div", { className: "gb-tv-actions" },
            h(Button, { size: "sm", "aria-pressed": playing, onClick: function () { if (!playing && hi >= items.length - 1) setHi(0); setPlaying(!playing); } }, h(Icon, { name: playing ? "pause" : "play", size: 14 }), playing ? "Pause" : "Play through"),
            h("button", { type: "button", className: "gb-iconbtn", "aria-label": "Close task view", onClick: close }, h(Icon, { name: "x", size: 18 })))),
        h("div", { className: "gb-tv-body" },
          h("div", { className: "gb-tv-scroll", ref: scroller },
            years.map(function (y) {
              return h("section", { key: y, className: "gb-tv-year", "data-year": y, "aria-label": y },
                h("h3", null, y),
                h("ul", { className: "gb-tv-grid" }, items.map(function (it, i) {
                  if (it.year !== y) return null;
                  return h("li", { key: i }, h("button", { type: "button", className: cx("gb-tv-card", i === hi && "is-hi", it.key && "is-key"), "data-i": i, onClick: function () { pick(i); }, onFocus: function () { if (!playing) setHi(i); } },
                    h("span", { className: "gb-tv-chrome", "aria-hidden": true }, h("i"), h("i"), h("i"), h("b", null, it.kind)),
                    h("span", { className: "gb-tv-card-body" },
                      h("strong", null, it.title, it.mark ? h("em", { title: it.markLabel }, " " + it.mark) : null),
                      h("span", { className: "gb-tv-date" }, keepDates(it.date)),
                      it.detail ? h("span", { className: "gb-tv-detail" }, it.detail) : null)));
                })));
            })),
          h("nav", { className: "gb-tv-years", "aria-label": "Jump to a year" },
            h("ol", null, years.map(function (y) { return h("li", { key: y }, h("button", { type: "button", "aria-current": y === shown ? "true" : undefined, onClick: function () { jump(y); } }, y)); })))))));
  }

  /* ---------- AccessRequest: ask to see a private document; Lewis approves, the link lasts a fixed time ---------- */
  function AccessRequest(p) {
    var days = p.days || 60;
    var ss = React.useState(p.state || "idle"), st = ss[0], setSt = ss[1];
    var fs = React.useState({ name: "", email: "", org: "", reason: "", note: "", agree: false }), f = fs[0], setF = fs[1];
    var es = React.useState({}), err = es[0], setErr = es[1];
    var formRef = React.useRef(null), doneRef = React.useRef(null), tries = React.useRef(0);
    var ts = React.useState(0), tick = ts[0], setTick = ts[1];
    /* Focus follows the flow: the first field when the form opens, the first error after a failed send, the confirmation once sent. */
    React.useEffect(function () {
      if (st === "form" && formRef.current) {
        var t = tick ? formRef.current.querySelector('[aria-invalid="true"]') : formRef.current.querySelector("input, select, textarea");
        if (t) t.focus();
      } else if (st === "sent" && doneRef.current) doneRef.current.focus();
    }, [st, tick]);
    function up(k, v) { var n = Object.assign({}, f); n[k] = v; setF(n); }
    function submit(e) {
      e.preventDefault();
      var x = {};
      if (!f.name.trim()) x.name = "Add your name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) x.email = "Use a work email like name@company.com.";
      if (!f.org.trim()) x.org = "Add your organisation.";
      if (!f.reason) x.reason = "Choose why you need it.";
      if (!f.agree) x.agree = "Confirm how you’ll use it.";
      setErr(x);
      if (Object.keys(x).length) { tries.current += 1; setTick(tries.current); return; }
      if (p.onSubmit) p.onSubmit(f);
      setSt("sent");
    }
    function field(k, label, type, opts) {
      var id = "gb-ar-" + k, eid = id + "-e";
      var common = { id: id, name: k, value: f[k], "aria-invalid": err[k] ? "true" : undefined, "aria-describedby": err[k] ? eid : undefined, onChange: function (e) { up(k, e.target.value); } };
      var ctl = type === "select" ? h("select", common, h("option", { value: "" }, "Choose one"), opts.map(function (o) { return h("option", { key: o, value: o }, o); })) :
        type === "textarea" ? h("textarea", Object.assign({ rows: 3 }, common)) :
        h("input", Object.assign({ type: type || "text", autoComplete: k === "email" ? "email" : k === "name" ? "name" : k === "org" ? "organization" : "off", spellCheck: k === "email" ? false : undefined }, common));
      return h("div", { className: "gb-field" }, h("label", { htmlFor: id, className: "gb-field-label" }, label), ctl, err[k] ? h("span", { id: eid, className: "gb-field-err", role: "alert" }, err[k]) : null);
    }
    if (st === "sent") return h("div", { className: "gb-ar gb-ar-done", role: "status", tabIndex: -1, ref: doneRef },
      h("span", { className: "gb-ar-icon", "aria-hidden": true }, h(Icon, { name: "check", size: 20 })),
      h("div", null, h("h3", null, "Request sent."), h("p", null, "I review every request myself. If I approve it, you’ll get a private link at " + (f.email || "your email") + ". It works for " + days + " days, then closes on its own.")));
    if (st === "idle") return h("div", { className: "gb-ar gb-ar-idle" },
      h("span", { className: "gb-ar-icon", "aria-hidden": true }, h(Icon, { name: "lock", size: 20 })),
      h("div", null, h("h3", null, p.title || "Transcript on request"), h("p", null, p.blurb || ("My full academic transcript is private. Ask for it here; when I approve, you get a link that works for " + days + " days."))),
      h(Button, { onClick: function () { setSt("form"); } }, "Request access"));
    return h("form", { className: "gb-ar gb-ar-form", ref: formRef, noValidate: true, onSubmit: submit, "aria-labelledby": "gb-ar-h" },
      h("div", { className: "gb-ar-top" }, h("h3", { id: "gb-ar-h" }, "Request my transcript"), h("p", null, "Takes a minute. Access lasts " + days + " days from approval and can’t be passed on.")),
      h("div", { className: "gb-ar-grid" }, field("name", "Your name"), field("email", "Work email", "email"), field("org", "Organisation"), field("reason", "Why you need it", "select", p.reasons || ["Hiring", "Admissions", "Background check", "Other"])),
      field("note", "Anything else (optional)", "textarea"),
      h("label", { className: "gb-ar-agree" }, h("input", { type: "checkbox", id: "gb-ar-agree", checked: f.agree, "aria-invalid": err.agree ? "true" : undefined, "aria-describedby": err.agree ? "gb-ar-agree-e" : undefined, onChange: function (e) { up("agree", e.target.checked); } }), h("span", null, "I’ll use it only to assess Lewis and won’t share it.")),
      err.agree ? h("span", { id: "gb-ar-agree-e", className: "gb-field-err", role: "alert" }, err.agree) : null,
      h("div", { className: "gb-ar-actions" }, h(Button, { variant: "primary", type: "submit" }, "Send request"), h(Button, { variant: "ghost", type: "button", onClick: function () { setSt("idle"); } }, "Cancel")));
  }


  /* ---------- AccessQueue: the admin side of AccessRequest. Actions follow each request's status. ---------- */
  var AQ_ACTIONS = { PENDING: ["view", "approve", "decline"], APPROVED: ["view", "revoke"], EXPIRED: ["view", "reapprove"], REVOKED: ["view", "reapprove"], DECLINED: ["view"] };
  var AQ_FILTERS = [["All", null], ["Pending", ["PENDING"]], ["Active", ["APPROVED"]], ["Closed", ["EXPIRED", "REVOKED"]], ["Declined", ["DECLINED"]]];
  function AccessQueue(p) {
    var rs = React.useState(function () { return (p.rows || []).map(function (r, i) { return Object.assign({ _id: i }, r); }); }), rows = rs[0], setRows = rs[1];
    var fs = React.useState(p.activeFilter || 0), fi = fs[0], setFi = fs[1];
    var cs = React.useState(null), ask = cs[0], setAsk = cs[1];
    var ts = React.useState(null), toast = ts[0], setToast = ts[1];
    var until = p.until || "4 Jan 2027", days = p.days || 60;
    React.useEffect(function () { if (!toast) return; var t = setTimeout(function () { setToast(null); }, 4200); return function () { clearTimeout(t); }; }, [toast]);
    function patch(id, ch) { setRows(rows.map(function (r) { return r._id === id ? Object.assign({}, r, ch) : r; })); }
    function act(a, r) {
      var who = r.name || "They";
      if (a === "view") { if (p.onView) p.onView(r); return; }
      if (a === "approve" || a === "reapprove") { patch(r._id, { status: "APPROVED", until: until }); setToast({ text: "Approved. " + who + " gets a private link that works until " + until + "." }); }
      else if (a === "decline") { patch(r._id, { status: "DECLINED", until: "None" }); setToast({ text: "Declined. " + who + " gets a short note, no link.", tone: "danger" }); }
      else if (a === "revoke") setAsk(r);
    }
    var counts = AQ_FILTERS.map(function (f) { return rows.filter(function (r) { return !f[1] || f[1].indexOf(r.status) >= 0; }).length; });
    var shown = rows.filter(function (r) { var f = AQ_FILTERS[fi][1]; return !f || f.indexOf(r.status) >= 0; }).map(function (r) { return Object.assign({}, r, { _actions: AQ_ACTIONS[r.status] || ["view"] }); });
    return h("div", { className: "gb-aq" },
      h(DataTable, { columns: p.columns, rows: shown, filters: AQ_FILTERS.map(function (f, i) { return f[0] + " " + counts[i]; }), activeFilter: fi, onFilter: setFi, onAction: act, searchPlaceholder: p.searchPlaceholder || "Search requests", footer: p.footer, empty: "No requests here." }),
      ask ? h(ConfirmDialog, { fixed: true, title: "Revoke access for " + ask.name + "?", body: "Their link stops working straight away and the transcript is hidden again. They can send a new request.", confirmLabel: "Revoke access", onCancel: function () { setAsk(null); }, onConfirm: function () { patch(ask._id, { status: "REVOKED", until: "Revoked today" }); setToast({ text: "Access revoked. " + ask.name + "’s link no longer opens.", tone: "danger" }); setAsk(null); } }) : null,
      h("div", { className: "gb-aq-toasts", "aria-live": "polite" }, toast ? h(Toast, { tone: toast.tone }, toast.text) : null));
  }

  /* ---------- AccessViewer: what an approved requester sees, and what happens after the window closes ---------- */
  function AccessViewer(p) {
    var expired = p.state === "expired";
    var left = p.daysLeft == null ? 60 : p.daysLeft, total = p.days || 60;
    return h("section", { className: cx("gb-av", expired && "is-expired"), "aria-label": "Shared document" },
      h("div", { className: "gb-av-bar", role: expired ? "alert" : "status" },
        h(Icon, { name: expired ? "lock" : "shield", size: 18 }),
        expired ? h("p", null, h("strong", null, "This link closed on " + (p.expires || "the expiry date") + "."), " Access lasts " + total + " days. You can ask again; I’ll see the new request.") :
        h("p", null, h("strong", null, "Shared with " + (p.viewer || "you") + "."), " Access ends " + (p.expires || "in " + left + " days") + ", " + left + " days from now."),
        expired ? h(Button, { size: "sm", href: p.requestHref || "#request" }, "Request again") :
        h("span", { className: "gb-meter gb-av-meter", role: "img", "aria-label": left + " of " + total + " days left" }, h("i", { style: { width: Math.round(left / total * 100) + "%" } }))),
      h("div", { className: "gb-av-doc", "aria-hidden": expired ? true : undefined },
        h("div", { className: "gb-av-page" },
          h("div", { className: "gb-av-head" }, h("strong", null, p.docTitle || "Academic transcript"), h("span", null, p.docOrg || "")),
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return h("div", { key: i, className: "gb-av-row" }, h("i", { style: { width: (38 + (i * 17) % 40) + "%" } }), h("i", null)); }),
          h("span", { className: "gb-av-mark" }, "Viewed by " + (p.viewer || "requester") + ", " + (p.viewedOn || "today"))),
        expired ? h("div", { className: "gb-av-veil" }, h(Icon, { name: "lock", size: 24 }), h("span", null, "Access closed")) : null));
  }

  /* ---------- ArticleToc: on-this-page links that follow the reader, plus a reading progress hairline ---------- */
  function ArticleToc(p) {
    var ss = React.useState([]), items = ss[0], setItems = ss[1];
    var cs = React.useState(null), cur = cs[0], setCur = cs[1];
    var bar = React.useRef(null);
    var os = React.useState(false), open = os[0], setOpen = os[1];
    React.useEffect(function () {
      var el = document.getElementById(p.target || "article"); if (!el) return;
      var hs = [].slice.call(el.querySelectorAll("h2[id]"));
      setItems(hs.map(function (x) { return { id: x.id, text: x.textContent }; }));
      var g = G7(), q = g && bar.current && !reducedMotion() ? g.quickTo(bar.current, "scaleX", { duration: 0.3, ease: "power2.out" }) : null, raf = 0;
      function tick() {
        raf = 0;
        var r = el.getBoundingClientRect(), line = window.innerHeight * 0.3;
        var v = Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height - window.innerHeight * 0.4)));
        if (bar.current) { if (q) q(v); else bar.current.style.transform = "scaleX(" + v + ")"; }
        var k = null; hs.forEach(function (x) { if (x.getBoundingClientRect().top < line) k = x.id; }); setCur(k);
      }
      function on() { if (!raf) raf = requestAnimationFrame(tick); }
      tick(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
      return function () { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
    }, [p.target]);
    return h(React.Fragment, null,
      p.progress === false ? null : h("div", { className: "gb-readbar", "aria-hidden": true }, h("i", { ref: bar })),
      h("nav", { className: cx("gb-toc", open && "is-open"), "aria-label": "On this page" },
        h("p", null, "On this page"),
        /* Under 960px the list folds behind this button, so the article starts on screen. */
        h("button", { type: "button", className: "gb-toc-toggle", "aria-expanded": open, "aria-controls": "gb-toc-list", onClick: function () { setOpen(!open); } },
          h("span", null, "On this page"), h("span", { className: "gb-toc-cur" }, (items.filter(function (it) { return it.id === cur; })[0] || {}).text || ""), h(Icon, { name: "chev", size: 16 })),
        h("ol", { id: "gb-toc-list" }, items.map(function (it) { return h("li", { key: it.id }, h("a", { href: "#" + it.id, "aria-current": cur === it.id ? "location" : undefined, onClick: function () { setOpen(false); } }, it.text)); }))));
  }

  window.Gambit = Object.assign(window.Gambit || {}, { Button: Button, Tag: Tag, StatusPill: StatusPill, SectionLabel: SectionLabel, ProjectCard: ProjectCard, CertCard: CertCard, TimelineItem: TimelineItem, StatBlock: StatBlock, ThemeToggle: ThemeToggle,
    Icon: Icon, SiteNav: SiteNav, AdminSidebar: AdminSidebar, PageHeader: PageHeader, StatusBadge: StatusBadge, Switch: Switch, DataTable: DataTable, Field: Field, ListEditor: ListEditor, FileDrop: FileDrop, ConfirmDialog: ConfirmDialog, Toast: Toast, EmptyState: EmptyState, Timeline: Timeline, BrowserFrame: BrowserFrame, PhoneFrame: PhoneFrame, RevealObserver: RevealObserver, CarouselControls: CarouselControls, DeviceMockup: DeviceMockup, Shader: Shader, ChessBoard: ChessBoard, Accordion: Accordion, CaseStudyCard: CaseStudyCard, AwardCard: AwardCard, ReferenceCard: ReferenceCard, SiteFooter: SiteFooter, BookingWidget: BookingWidget,
    LiveView: LiveView, VideoEmbed: VideoEmbed, CertificateCarousel: CertificateCarousel, ServiceList: ServiceList, PricingTiers: PricingTiers, ChallengeBoard: ChallengeBoard, Bookshelf: Bookshelf, TaglineReveal: TaglineReveal, SplitWords: SplitWords, StoryRail: StoryRail, Battery: Battery, CourseStory: CourseStory, GameTheatre: GameTheatre, Cursor: Cursor, TaskView: TaskView, AccessRequest: AccessRequest, AccessQueue: AccessQueue, AccessViewer: AccessViewer, ArticleToc: ArticleToc });
})();
