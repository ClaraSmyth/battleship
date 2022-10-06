(()=>{"use strict";const t=t=>{const e=[];for(let o=0;o<t;o++)e.push(!1);return{length:t,cells:e,hit(t){e[t]=!0},isSunk:()=>e.every((t=>!0===t))}},e=e=>{const o=[],r=[],a=[];e.forEach((e=>{const r=t(e.length);r.coords=e,o.push(r)}));for(let t=0;t<10;t++)for(let e=0;e<10;e++)a.push([t,e]);return{availableAttacks:a,receiveAttack(t){const e=a.findIndex((e=>e.toString()===t.toString()));return a.splice(e,1),o.some((e=>{let o=null;const a=e.coords.some(((e,r)=>(o=r,t.toString()===e.toString())));return a&&e.hit(o),a||r.push(t),a}))},checkWin:()=>o.every((t=>t.isSunk())),checkRemaining(){let t=o.length;return o.forEach((e=>{e.isSunk()&&(t-=1)})),t},checkSunk:()=>o.filter((t=>t.isSunk()))}},o=t=>{const e=Math.round(Math.random()),o=[];if(e){const e=Math.floor(Math.random()*(10-t)),r=Math.floor(10*Math.random());for(let a=0;a<t;a++)o.unshift([e+a,r])}if(!e){const e=Math.floor(10*Math.random()),r=Math.floor(Math.random()*(10-t));for(let a=0;a<t;a++)o.push([e,r+a])}return o},r=()=>{const t=[o(5)];for(;t.length<5;){const e=o(5-t.length),r=e.every((e=>t.every((t=>t.every((t=>t.toString()!==e.toString()))))));r&&t.push(e)}return t},a=(t=null,o=null)=>{const a=o||r();return{playerShips:a,board:e(a),name:t,attack:(t,e)=>t.receiveAttack(e)}},n=(t=null,e=null)=>{let o=a(t,e),r=a();c(o.playerShips);const n=()=>{const t=r;r=o,o=t},d=()=>{const t=Math.floor(Math.random()*r.board.availableAttacks.length),e=r.board.availableAttacks[t],a=o.attack(r.board,e);s(e,a,o,r),r.board.checkWin()?u(o):(a||n(),a&&d())};return{takeTurn(t){if(!r.board.availableAttacks.some((e=>e.toString()===t.toString())))return;const e=o.attack(r.board,t);s(t,e,o,r),r.board.checkWin()?u(o):e||(n(),d())}}},d=()=>{const[t,e]=document.querySelectorAll(".board-container"),o=document.createElement("div"),r=document.createElement("div");o.classList.add("board-one"),r.classList.add("board-two");for(let t=9;t>=0;t--)for(let e=0;e<=9;e++){const a=document.createElement("div"),n=document.createElement("div");a.setAttribute("data-coords",`${t},${e}`),a.classList.add("board-cell"),n.setAttribute("data-coords",`${t},${e}`),n.classList.add("board-cell"),o.append(a),r.append(n)}t.childElementCount>1&&(t.removeChild(t.lastChild),e.removeChild(e.lastChild)),t.append(o),e.append(r)},s=(t,e,o,r)=>{const a=document.querySelector(".board-one"),n=document.querySelector(".board-two"),d=o.name?n:a;for(let o=0;o<d.childNodes.length;o++){const r=d.childNodes[o];if(r.dataset.coords===t.toString()){r.classList.add(e?"hit":"miss");break}}const s=r.board.checkSunk();s&&s.forEach((t=>{t.coords.forEach((t=>{for(let e=0;e<d.childNodes.length;e++){const o=d.childNodes[e];if(o.dataset.coords===t.toString()){o.classList.add("sunk");break}}}))}))},c=t=>{const e=document.querySelector(".board-one");t.forEach((t=>{t.forEach((t=>{for(let o=0;o<e.childNodes.length;o++){const r=e.childNodes[o];if(r.dataset.coords===t.toString()){r.classList.add("friendly");break}}}))}))},l=(t,e)=>{for(let e=9;e>=0;e--)for(let o=0;o<=9;o++){const r=document.createElement("div");r.setAttribute("data-coords",`${e},${o}`),r.classList.add("modal-board-cell"),t.append(r)}e.forEach(((e,o)=>{const r=e[0];let a=!1;e.length>1&&(a=e[0][0]!==e[1][0]);const n=a?"vert":"hor";for(let a=0;a<t.childNodes.length;a++){const d=t.childNodes[a];if(d.dataset.coords===r.toString()){const t=document.createElement("div");t.classList.add("modal-board-ship"),t.classList.add(`${n}-${e.length}`),t.setAttribute("data-index",o),t.setAttribute("draggable","true"),d.append(t);break}}}))},i=t=>{document.querySelectorAll(".modal-board-ship").forEach((e=>{e.addEventListener("click",(e=>{const o=t[e.target.dataset.index],r=(t=>{const e=[];let o=!1;return t.length<2?t:(t[0][0]===t[1][0]&&t.forEach(((t,r)=>{const a=t[0]-r,n=t[1]-r;(a<0||a>9||n<0||n>9)&&(o=!0),e.push([a,n])})),t[0][0]!==t[1][0]&&t.forEach(((t,r)=>{const a=t[0]+r,n=t[1]+r;(a<0||a>9||n<0||n>9)&&(o=!0),e.push([a,n])})),o?t:e)})(o),a=[...t];if(o.toString()===r.toString())return;a.splice(e.target.dataset.index,1);r.every((t=>a.every((e=>e.every((e=>t.toString()!==e.toString()))))))&&(t.splice(e.target.dataset.index,1,r),e.target.classList.toggle(`hor-${r.length}`),e.target.classList.toggle(`vert-${r.length}`))}));document.querySelectorAll(".modal-board-cell").forEach((e=>{e.addEventListener("dragover",(o=>{o.preventDefault();const r=document.querySelector(".dragging"),a=t[r.dataset.index],n=((t,e)=>{const o=[];let r=!1;return t.length<2?e:(t[0][0]===t[1][0]&&t.forEach(((t,a)=>{const n=e[0],d=e[1]+a;(n<0||n>9||d<0||d>9)&&(r=!0),o.push([n,d])})),t[0][0]!==t[1][0]&&t.forEach(((t,a)=>{const n=e[0]-a,d=e[1];(n<0||n>9||d<0||d>9)&&(r=!0),o.push([n,d])})),r?t:o)})(a,e.dataset.coords.split(",").map(Number)),d=[...t];if(a.toString()===n.toString()&&n.length>2)return;d.splice(r.dataset.index,1);n.every((t=>d.every((e=>e.every((e=>t.toString()!==e.toString()))))))&&(t.splice(r.dataset.index,1,n),e.append(r))}))})),e.addEventListener("dragstart",(()=>{e.classList.add("dragging")})),e.addEventListener("dragend",(()=>{e.classList.remove("dragging")}))}))},u=t=>{const e=document.querySelector(".modal"),o=document.querySelector(".modal-title"),r=document.querySelector(".modal-outcome");r.innerText=`You ${t.name?"Won":"Lost"}!`,r.classList.remove("display-none"),o.innerText="Rearrange your ships and play again!",e.classList.remove("display-none"),d()};d(),(()=>{const t=document.querySelector(".modal-board"),e=document.querySelector(".modal-form"),o=document.querySelector(".modal-random");let a=r();l(t,a),i(a),e.addEventListener("submit",(t=>{t.preventDefault();const e=document.querySelector(".modal-name-input"),o=document.querySelector(".board-one-title"),r=document.querySelector(".modal"),d=n(e.value,a);r.classList.add("display-none"),o.innerText=e.value,(t=>{document.querySelector(".board-two").addEventListener("click",(e=>{if(!e.target.dataset.coords)return;const o=e.target.dataset.coords.split(",").map(Number);t.takeTurn(o)}))})(d)})),o.addEventListener("click",(()=>{a=r(),t.textContent="",l(t,a),i(a)}))})()})();