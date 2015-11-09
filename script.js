!function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return o(n?n:t)},c,c.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){"use strict";var r=t("./possible-groups"),o=t("./util"),i=function(){function t(t,e){var n=this;this.pots=t,this.groups=e;var r=window.fetch("json/country-names.json").then(function(t){return t.json()}),o=document.createElement("div");o.id="tables-div",this.potsDiv=document.createElement("div"),this.potsDiv.id="pots-div",t.forEach(function(t,e){var r=document.createElement("table");r.innerHTML="<thead><tr><th>Pot "+(e+1)+"</th></tr></thead><tbody></tbody>";for(var o=r.tBodies[0],i=0;i<t.length;++i){var a=o.insertRow(i).insertCell();a.classList.add("flag"),a.innerHTML=t[i].name,void 0!==t[i].pairing&&(a.title="paired with "+t[i].pairing.name)}n.potsDiv.appendChild(r)}),r.then(function(e){return[].forEach.call(n.potsDiv.children,function(n,r){return[].forEach.call(n.tBodies[0].rows,function(n,o){return n.cells[0].style.backgroundImage="url(http://icons.iconarchive.com/icons/gosquared/flag/16/"+e[t[r][o].country.toLowerCase()].replace(" ","-")+"-flat-icon.png)"})})}),o.appendChild(this.potsDiv),this.groupsDiv=document.createElement("div"),this.groupsDiv.id="groups-div";for(var i=0;i<t[0].length;++i){var a=document.createElement("table");a.innerHTML="<thead><tr><th>Group "+String.fromCharCode(65+i)+"</th></tr></thead><tbody></tbody>";for(var s=a.tBodies[0],u=0;u<t.length;++u)s.insertRow(u).insertCell().classList.add("flag");this.groupsDiv.appendChild(a)}o.appendChild(this.groupsDiv),document.body.appendChild(o);var l=document.createElement("div");l.id="bowls-div",this.teamBowl=document.createElement("div"),this.teamBowl.id="team-bowl",this.teamBowl.classList.add("bowl"),l.appendChild(this.teamBowl),this.announcement=document.createElement("div"),this.announcement.id="announcement",l.appendChild(this.announcement),this.groupBowl=document.createElement("div"),this.groupBowl.id="group-bowl",this.groupBowl.classList.add("bowl"),l.appendChild(this.groupBowl),document.body.appendChild(l),this.currentPotNum=0}return t.prototype.runDraw=function(){if(this.currentPotNum>0||this.groups.some(function(t){return t.length>0})||this.pots.some(function(t){return t.length<8}))throw new Error("cannot start draw");this.fillTeamBowl(),this.announcement.textContent="Pick a ball"},t.prototype.fillTeamBowl=function(){var t=this,e=this.pots[this.currentPotNum],n=e.map(function(n,r){var o=document.createElement("div");return o.classList.add("ball"),o.textContent=e[r].name,o.dataset.team=r.toString(),o.addEventListener("click",function(e){return t.onTeamBallPick(e)}),o});o.shuffle(n).forEach(function(e){return t.teamBowl.appendChild(e)})},t.prototype.onTeamBallPick=function(t){this.teamBowl.style.cursor="not-allowed",this.teamBowl.style.pointerEvents="none";var e=t.target;e.classList.add("ball-picked");for(var n=this.pots[this.currentPotNum],i=0;i<n.length&&n[i].name!==e.textContent;++i);for(var a=n.splice(i,1)[0],s=r["default"](this.pots,this.groups,a,this.currentPotNum),u=0;u<s.length;u++){var l=s[u],c=o.getCell(this.groupsDiv.children[l],this.currentPotNum);c.classList.add("possible-group")}var d=o.getCell(this.potsDiv.children[this.currentPotNum],parseInt(e.dataset.team));d.classList.add("team-selected"),this.announcement.textContent="Possible groups for "+a.name+": "+s.map(function(t){return String.fromCharCode(65+t)}).join(", "),this.fillGroupBowl(s,a,e)},t.prototype.fillGroupBowl=function(t,e,n){var r=this,i=t.map(function(t){var o=document.createElement("div");return o.classList.add("ball"),o.textContent=String.fromCharCode(65+t),o.dataset.group=t.toString(),o.addEventListener("click",function(t){r.teamBowl.removeChild(n);var o=parseInt(t.target.dataset.group);r.animateCell(e,n,o),r.onGroupBallPick(e,o)}),o});o.shuffle(i).forEach(function(t){return r.groupBowl.appendChild(t)})},t.prototype.onGroupBallPick=function(t,e){this.groupBowl.innerHTML="",this.announcement.textContent="Group "+String.fromCharCode(65+e)+"!",this.groups[e].push(t),this.teamBowl.style.pointerEvents="auto",this.teamBowl.style.cursor=null,this.teamBowl.onclick=null;for(var n=this.groupsDiv.children,r=0;r<n.length;++r)r!==e&&o.getCell(n[r],this.currentPotNum).classList.remove("possible-group");if(!(this.pots[this.currentPotNum].length>0))if(this.potsDiv.children[this.currentPotNum].tHead.classList.add("greyed"),this.currentPotNum<3)++this.currentPotNum,this.fillTeamBowl(),this.announcement.textContent="Pick a ball";else{var i=this.groupBowl.parentElement;i.removeChild(this.groupBowl),i.removeChild(this.teamBowl),this.announcement.textContent="Draw completed!"}},t.prototype.animateCell=function(t,e,n){var r=o.getCell(this.groupsDiv.children[n],this.currentPotNum),i=o.getCell(this.potsDiv.children[this.currentPotNum],parseInt(e.dataset.team));i.classList.remove("team-selected"),i.classList.add("greyed");var a=document.createElement("span");document.body.appendChild(a),a.classList.add("fake-cell"),a.classList.add("flag"),a.style.width=i.offsetWidth+"px",a.textContent=i.textContent,a.style.position="absolute";var s=o.getPos(i);a.style.left=s.x+"px",a.style.top=s.y+"px",a.style.backgroundImage=window.getComputedStyle(i,null).getPropertyValue("background-image");var u=o.getElementSize(i,"padding-left"),l=o.getElementSize(i,"padding-top"),c=o.getElementSize(i,"height"),d=o.getElementSize(i,"font-size"),h=new o.Vec2(u,l+(c-d)/2),f=new o.Vec2(1,h.y-.5),p=o.getPos(r).subtract(s).add(f);o.moveElement(a,f,p,300,function(){document.body.removeChild(a),r.textContent=t.name,r.style.backgroundImage=i.style.backgroundImage,r.classList.remove("possible-group"),r.classList.add("team-emerge")})},t}();Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=i},{"./possible-groups":4,"./util":6}],2:[function(t,e,n){"use strict";function r(t){var e=encodeURIComponent(t),n=c("https://cors-inker.c9.io/?url="+e+"&encoding=latin1")["catch"](function(t){return c("https://cors3-inker.c9.io/?url="+e+"&encoding=latin1")}).then(function(t){return t.text()})["catch"](function(e){return c("https://crossorigin.me/"+t).then(function(t){return t.text()}).then(function(t){return u.convertBadName(t)})})["catch"](function(t){return alert("proxies are down")}).then(function(t){return o(t)}),r=c("json/pairings.json").then(function(t){return t.json()});return l.all([n,r]).then(function(t){return i(t[0],t[1])}).then(function(t){return a(t)})["catch"](function(t){return alert(t.message)})}function o(t){var e=/\s*(.+?)\s+(\*+\d?\s+)?(\w{3})\s+(\d{1,3}\.\d{3})/g;t=t.slice(t.indexOf("Pot 1"));for(var n,r=[];null!==(n=e.exec(t));)r.push(new s["default"](n[1],n[3],parseFloat(n[4])));return r}function i(t,e){return e.forEach(function(e){var n=e.map(function(e){for(var n=0;n<t.length;n++){var r=t[n];if(r.name.indexOf(e)>-1)return r}throw new Error("couldn't find team named "+e)});n[0].pairing=n[1],n[1].pairing=n[0]}),t}function a(t){var e=["Barcelona","Chelsea","Bayern","Juventus","Benfica","Paris","Zenit","PSV"],n=new Array(4);n[0]=e.map(function(e){for(var n=0;n<t.length;n++){var r=t[n];if(r.name.indexOf(e)>-1)return t.splice(t.indexOf(r),1),r}throw new Error("couldn't find team named "+e)}),t.sort(function(t,e){return e.coefficient-t.coefficient});for(var r=1;r<n.length;++r)n[r]=t.splice(0,8);return n}var s=t("./team"),u=t("./util");"Promise"in window&&"fetch"in window||alert("The draw simulation only works in Chrome, Opera & Firefox.");var l=window.Promise,c=window.fetch;Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r},{"./team":5,"./util":6}],3:[function(t,e,n){"use strict";var r=t("./fetch-parse-pots"),o=t("./draw-visualizer");r["default"]("http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2015.html").then(function(t){var e=new o["default"](t,[[],[],[],[],[],[],[],[]]);e.runDraw()})},{"./draw-visualizer":1,"./fetch-parse-pots":2}],4:[function(t,e,n){"use strict";function r(t,e,n,r){return e.every(function(t){return 0===t.length})?e.map(function(t,e){return e}):i(e,n,r).filter(function(i){e[i].push(n);var a=o(t,e,r);return e[i].pop(),a})}function o(t,e,n){if(0===t[n].length&&(++n,n===t.length))return!0;for(var r=t[n],a=r.pop(),s=!1,u=0,l=i(e,a,n);u<l.length;u++){var c=l[u],d=e[c];if(d.push(a),s=o(t,e,n),d.pop(),s)break}return r.push(a),s}function i(t,e,n){var r=a(t,e,n,0,t.length>>1),o=a(t,e,n,t.length>>1,t.length);return 0===r.length?o:0===o.length?r:r.concat(o)}function a(t,e,n,r,o){for(var i=[],a=r;o>a;++a){for(var s=t[a],u=!0,l=0;l<s.length;l++){var c=s[l];if(c.country===e.country){if(u=!1,c.pairing===e)return[];break}}u&&s.length<=n&&i.push(a)}return i}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r},{}],5:[function(t,e,n){"use strict";var r=function(){function t(t,e,n,r){this.name=t,this.country=e,this.coefficient=n,this.pairing=r}return t}();Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r},{}],6:[function(t,e,n){"use strict";function r(t){for(var e,n,r=t.length;r;e=Math.floor(Math.random()*r),n=t[--r],t[r]=t[e],t[e]=n);return t}function o(t){for(var e=0,n=0;null!==t;e+=t.offsetLeft,n+=t.offsetTop,t=t.offsetParent);return new l(e,n)}function i(t,e){return t.tBodies[0].rows[e].cells[0]}function a(t,e,n,r,o){function i(s){a||(a=s);var u=s-a,l=u/r,c=n.subtract(e).multiply(l).add(e);t.style.transform="translate3d("+c.x+"px, "+c.y+"px, 0px)",r>u?window.requestAnimationFrame(i):"function"==typeof o&&o()}var a=null;window.requestAnimationFrame(i)}function s(t,e){return Number(window.getComputedStyle(t,null).getPropertyValue(e).match(/(.+?)(px|$)/)[1])}function u(t){return t.replace(/Malm./,"Malmö").replace(/Borussia M.nchengladbach/,"Borussia Mönchengladbach").replace(/Atl.tico/,"Atlético").replace(/Bayern M.nchen/,"Bayern München")}n.shuffle=r,n.getPos=o,n.getCell=i;var l=(window.Promise,function(){function t(t,e){this.x=t,this.y=e}return t.prototype.add=function(e){return new t(this.x+e.x,this.y+e.y)},t.prototype.subtract=function(e){return new t(this.x-e.x,this.y-e.y)},t.prototype.multiply=function(e){return new t(this.x*e,this.y*e)},t}());n.Vec2=l,n.moveElement=a,n.getElementSize=s,n.convertBadName=u},{}]},{},[3]);