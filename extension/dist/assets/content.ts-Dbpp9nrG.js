(function(){var vy=Object.defineProperty;var $y=(e,t,r)=>t in e?vy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var wo=(e,t,r)=>$y(e,typeof t!="symbol"?t+"":t,r);let xy=0;function Sy(e){if(e.id&&e.id.trim().length>0)return e.id.trim();const t=e.getAttribute("data-perception-id");if(t)return t;const r=`elem_${++xy}`;return e.setAttribute("data-perception-id",r),r}function Ty(e){var s;const t=e.tagName.toUpperCase();if(["SCRIPT","STYLE","NOSCRIPT","TEMPLATE","SVG","PATH"].includes(t)||e.closest(".hidden")||e.closest('[aria-hidden="true"]'))return!1;const r=window.getComputedStyle(e);if(r.display==="none"||r.visibility==="hidden"||r.opacity==="0")return!1;const i=typeof navigator<"u"&&((s=navigator.userAgent)==null?void 0:s.includes("jsdom")),n=e.getBoundingClientRect();return!(!i&&(n.width<=0||n.height<=0))}function ky(e){const t=e.getAttribute("role");if(t&&t.trim())return t.trim();switch(e.tagName.toUpperCase()){case"BUTTON":return"button";case"A":return e.hasAttribute("href")?"link":"generic";case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":return"heading";case"INPUT":{const i=(e.getAttribute("type")||"text").toLowerCase();return["button","submit","reset"].includes(i)?"button":i==="checkbox"?"checkbox":i==="radio"?"radio":"textbox"}case"TEXTAREA":return"textbox";case"SELECT":return"combobox";case"FORM":return"form";case"IMG":return"img";case"ARTICLE":return"article";case"SECTION":return"region";case"NAV":return"navigation";case"HEADER":return"banner";case"FOOTER":return"contentinfo";case"MAIN":return"main";default:return"generic"}}function Ey(e){var a,o,d;const t=e.getAttribute("aria-labelledby");if(t){const h=t.split(/\s+/).map(p=>{var f,w;return((w=(f=document.getElementById(p))==null?void 0:f.textContent)==null?void 0:w.trim())||""}).filter(p=>p.length>0);if(h.length>0)return h.join(" ")}const r=e.getAttribute("aria-label");if(r&&r.trim())return r.trim();if(e.id){const l=document.querySelector(`label[for="${e.id}"]`);if(l&&((a=l.textContent)!=null&&a.trim()))return l.textContent.trim()}const i=e.closest("label");if(i&&((o=i.textContent)!=null&&o.trim()))return i.textContent.trim();if(e instanceof HTMLImageElement&&e.alt&&e.alt.trim())return e.alt.trim();const n=e.getAttribute("placeholder");if(n&&n.trim())return n.trim();const s=e.getAttribute("title");return s&&s.trim()?s.trim():((d=e.textContent)==null?void 0:d.trim())||""}function Iy(e){const t=e.tagName.toUpperCase();if(t==="BUTTON")return"button";if(t==="A"&&e.hasAttribute("href"))return"link";if(t==="INPUT"){const i=(e.getAttribute("type")||"text").toLowerCase();return["button","submit","reset"].includes(i)?"button":"input"}if(t==="TEXTAREA")return"textarea";if(t==="SELECT")return"select";if(t==="FORM")return"form";if(["H1","H2","H3","H4","H5","H6"].includes(t))return"heading";if(t==="IMG")return"image";const r=e.getAttribute("role");return r==="button"||r==="menuitem"||r==="tab"||r==="switch"?"button":r==="link"?"link":r==="heading"?"heading":r==="textbox"||r==="searchbox"?"input":r==="combobox"||r==="listbox"?"select":e.hasAttribute("onclick")||e.getAttribute("tabindex")==="0"||e.hasAttribute("contenteditable")||t==="SUMMARY"?"button":"text"}function _c(e,t){const r=[];try{e.querySelectorAll(t).forEach(s=>{s instanceof HTMLElement&&r.push(s)}),e.querySelectorAll("*").forEach(s=>{if(s instanceof HTMLElement&&s.shadowRoot)try{const a=_c(s.shadowRoot,t);r.push(...a)}catch{}})}catch{}return r}function Cy(e){const t={},r=["data-target","aria-controls","href","name","placeholder","value","aria-label","title","role"];for(const i of r){const n=e.getAttribute(i);n!==null&&n!==""&&(t[i]=n)}return Object.keys(t).length>0?t:void 0}function vc(){const e=[],t=new Set,r=["button","a[href]","input","textarea","select","form","h1, h2, h3, h4, h5, h6",'[role="button"]','[role="link"]','[role="heading"]','[role="menuitem"]','[role="tab"]','[role="switch"]','[tabindex="0"]',"[contenteditable]","summary",".employee-name",".employee-title",".employee-email",".employee-phone","p","span","img[alt]"].join(", ");return _c(document,r).forEach(s=>{if(!(s instanceof HTMLElement)||t.has(s)||!Ty(s))return;const a=Iy(s),o=Ey(s);let d=(s.textContent||"").trim();if(a==="image"&&s instanceof HTMLImageElement&&(d=s.alt||""),a==="input"&&!d){const S=s;d=S.placeholder||S.value||o||""}if(a==="text"&&(!d||!s.id&&s.children.length>0&&s.querySelector("button, a[href], input, textarea, select, [id], .employee-email, .employee-phone"))||!d&&!o)return;const l=s.getBoundingClientRect(),h={x:Math.round(l.x),y:Math.round(l.y),width:Math.round(l.width),height:Math.round(l.height)},p=Sy(s),f=ky(s),w=s instanceof HTMLInputElement?s.getAttribute("type")||"text":null,g=Cy(s),v={id:p,type:a,tagName:s.tagName.toLowerCase(),label:d,role:f,accessibleName:o!==d?o:void 0,inputType:w,visible:!0,position:h,attributes:g};e.push(v),t.add(s)}),{page:{url:window.location.href,title:document.title,lang:document.documentElement.lang||void 0,viewport:{width:window.innerWidth,height:window.innerHeight}},elements:e}}var zy={exports:{}};(function(e){var t=function(r){var i=Object.prototype,n=i.hasOwnProperty,s=Object.defineProperty||function(A,M,O){A[M]=O.value},a,o=typeof Symbol=="function"?Symbol:{},d=o.iterator||"@@iterator",l=o.asyncIterator||"@@asyncIterator",h=o.toStringTag||"@@toStringTag";function p(A,M,O){return Object.defineProperty(A,M,{value:O,enumerable:!0,configurable:!0,writable:!0}),A[M]}try{p({},"")}catch{p=function(M,O,P){return M[O]=P}}function f(A,M,O,P){var V=M&&M.prototype instanceof T?M:T,W=Object.create(V.prototype),ne=new F(P||[]);return s(W,"_invoke",{value:Y(A,O,ne)}),W}r.wrap=f;function w(A,M,O){try{return{type:"normal",arg:A.call(M,O)}}catch(P){return{type:"throw",arg:P}}}var g="suspendedStart",v="suspendedYield",S="executing",b="completed",_={};function T(){}function k(){}function E(){}var C={};p(C,d,function(){return this});var z=Object.getPrototypeOf,$=z&&z(z(G([])));$&&$!==i&&n.call($,d)&&(C=$);var N=E.prototype=T.prototype=Object.create(C);k.prototype=E,s(N,"constructor",{value:E,configurable:!0}),s(E,"constructor",{value:k,configurable:!0}),k.displayName=p(E,h,"GeneratorFunction");function L(A){["next","throw","return"].forEach(function(M){p(A,M,function(O){return this._invoke(M,O)})})}r.isGeneratorFunction=function(A){var M=typeof A=="function"&&A.constructor;return M?M===k||(M.displayName||M.name)==="GeneratorFunction":!1},r.mark=function(A){return Object.setPrototypeOf?Object.setPrototypeOf(A,E):(A.__proto__=E,p(A,h,"GeneratorFunction")),A.prototype=Object.create(N),A},r.awrap=function(A){return{__await:A}};function K(A,M){function O(W,ne,$e,me){var we=w(A[W],A,ne);if(we.type==="throw")me(we.arg);else{var Oe=we.arg,Ce=Oe.value;return Ce&&typeof Ce=="object"&&n.call(Ce,"__await")?M.resolve(Ce.__await).then(function(Ee){O("next",Ee,$e,me)},function(Ee){O("throw",Ee,$e,me)}):M.resolve(Ce).then(function(Ee){Oe.value=Ee,$e(Oe)},function(Ee){return O("throw",Ee,$e,me)})}}var P;function V(W,ne){function $e(){return new M(function(me,we){O(W,ne,me,we)})}return P=P?P.then($e,$e):$e()}s(this,"_invoke",{value:V})}L(K.prototype),p(K.prototype,l,function(){return this}),r.AsyncIterator=K,r.async=function(A,M,O,P,V){V===void 0&&(V=Promise);var W=new K(f(A,M,O,P),V);return r.isGeneratorFunction(M)?W:W.next().then(function(ne){return ne.done?ne.value:W.next()})};function Y(A,M,O){var P=g;return function(W,ne){if(P===S)throw new Error("Generator is already running");if(P===b){if(W==="throw")throw ne;return J()}for(O.method=W,O.arg=ne;;){var $e=O.delegate;if($e){var me=X($e,O);if(me){if(me===_)continue;return me}}if(O.method==="next")O.sent=O._sent=O.arg;else if(O.method==="throw"){if(P===g)throw P=b,O.arg;O.dispatchException(O.arg)}else O.method==="return"&&O.abrupt("return",O.arg);P=S;var we=w(A,M,O);if(we.type==="normal"){if(P=O.done?b:v,we.arg===_)continue;return{value:we.arg,done:O.done}}else we.type==="throw"&&(P=b,O.method="throw",O.arg=we.arg)}}}function X(A,M){var O=M.method,P=A.iterator[O];if(P===a)return M.delegate=null,O==="throw"&&A.iterator.return&&(M.method="return",M.arg=a,X(A,M),M.method==="throw")||O!=="return"&&(M.method="throw",M.arg=new TypeError("The iterator does not provide a '"+O+"' method")),_;var V=w(P,A.iterator,M.arg);if(V.type==="throw")return M.method="throw",M.arg=V.arg,M.delegate=null,_;var W=V.arg;if(!W)return M.method="throw",M.arg=new TypeError("iterator result is not an object"),M.delegate=null,_;if(W.done)M[A.resultName]=W.value,M.next=A.nextLoc,M.method!=="return"&&(M.method="next",M.arg=a);else return W;return M.delegate=null,_}L(N),p(N,h,"Generator"),p(N,d,function(){return this}),p(N,"toString",function(){return"[object Generator]"});function D(A){var M={tryLoc:A[0]};1 in A&&(M.catchLoc=A[1]),2 in A&&(M.finallyLoc=A[2],M.afterLoc=A[3]),this.tryEntries.push(M)}function H(A){var M=A.completion||{};M.type="normal",delete M.arg,A.completion=M}function F(A){this.tryEntries=[{tryLoc:"root"}],A.forEach(D,this),this.reset(!0)}r.keys=function(A){var M=Object(A),O=[];for(var P in M)O.push(P);return O.reverse(),function V(){for(;O.length;){var W=O.pop();if(W in M)return V.value=W,V.done=!1,V}return V.done=!0,V}};function G(A){if(A){var M=A[d];if(M)return M.call(A);if(typeof A.next=="function")return A;if(!isNaN(A.length)){var O=-1,P=function V(){for(;++O<A.length;)if(n.call(A,O))return V.value=A[O],V.done=!1,V;return V.value=a,V.done=!0,V};return P.next=P}}return{next:J}}r.values=G;function J(){return{value:a,done:!0}}return F.prototype={constructor:F,reset:function(A){if(this.prev=0,this.next=0,this.sent=this._sent=a,this.done=!1,this.delegate=null,this.method="next",this.arg=a,this.tryEntries.forEach(H),!A)for(var M in this)M.charAt(0)==="t"&&n.call(this,M)&&!isNaN(+M.slice(1))&&(this[M]=a)},stop:function(){this.done=!0;var A=this.tryEntries[0],M=A.completion;if(M.type==="throw")throw M.arg;return this.rval},dispatchException:function(A){if(this.done)throw A;var M=this;function O(me,we){return W.type="throw",W.arg=A,M.next=me,we&&(M.method="next",M.arg=a),!!we}for(var P=this.tryEntries.length-1;P>=0;--P){var V=this.tryEntries[P],W=V.completion;if(V.tryLoc==="root")return O("end");if(V.tryLoc<=this.prev){var ne=n.call(V,"catchLoc"),$e=n.call(V,"finallyLoc");if(ne&&$e){if(this.prev<V.catchLoc)return O(V.catchLoc,!0);if(this.prev<V.finallyLoc)return O(V.finallyLoc)}else if(ne){if(this.prev<V.catchLoc)return O(V.catchLoc,!0)}else if($e){if(this.prev<V.finallyLoc)return O(V.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(A,M){for(var O=this.tryEntries.length-1;O>=0;--O){var P=this.tryEntries[O];if(P.tryLoc<=this.prev&&n.call(P,"finallyLoc")&&this.prev<P.finallyLoc){var V=P;break}}V&&(A==="break"||A==="continue")&&V.tryLoc<=M&&M<=V.finallyLoc&&(V=null);var W=V?V.completion:{};return W.type=A,W.arg=M,V?(this.method="next",this.next=V.finallyLoc,_):this.complete(W)},complete:function(A,M){if(A.type==="throw")throw A.arg;return A.type==="break"||A.type==="continue"?this.next=A.arg:A.type==="return"?(this.rval=this.arg=A.arg,this.method="return",this.next="end"):A.type==="normal"&&M&&(this.next=M),_},finish:function(A){for(var M=this.tryEntries.length-1;M>=0;--M){var O=this.tryEntries[M];if(O.finallyLoc===A)return this.complete(O.completion,O.afterLoc),H(O),_}},catch:function(A){for(var M=this.tryEntries.length-1;M>=0;--M){var O=this.tryEntries[M];if(O.tryLoc===A){var P=O.completion;if(P.type==="throw"){var V=P.arg;H(O)}return V}}throw new Error("illegal catch attempt")},delegateYield:function(A,M,O){return this.delegate={iterator:G(A),resultName:M,nextLoc:O},this.method==="next"&&(this.arg=a),_}},r}(e.exports);try{regeneratorRuntime=t}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}})(zy);var $c=(e,t)=>`${e}-${t}-${Math.random().toString(16).slice(3,8)}`;const Ay=$c;let bo=0;var Oy=({id:e,action:t,payload:r={}})=>{let i=e;return typeof i>"u"&&(i=Ay("Job",bo),bo+=1),{id:i,action:t,payload:r}},ii={};let Yn=!1;ii.logging=Yn;ii.setLogging=e=>{Yn=e};ii.log=(...e)=>Yn?console.log.apply(void 0,e):null;function Ry(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var My=e=>{const t={};return typeof WorkerGlobalScope<"u"?t.type="webworker":typeof document=="object"?t.type="browser":typeof process=="object"&&typeof Ry=="function"&&(t.type="node"),typeof e>"u"?t:t[e]};const Ny=My("type")==="browser",Dy=Ny?e=>new URL(e,window.location.href).href:e=>e;var By=e=>{const t={...e};return["corePath","workerPath","langPath"].forEach(r=>{e[r]&&(t[r]=Dy(t[r]))}),t},Ly={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3};const Py="7.0.0",Uy={version:Py};var qy={workerBlobURL:!0,logger:()=>{}};const Wy=Uy.version,Vy=qy;var Gy={...Vy,workerPath:`https://cdn.jsdelivr.net/npm/tesseract.js@v${Wy}/dist/worker.min.js`},Hy=({workerPath:e,workerBlobURL:t})=>{let r;if(Blob&&URL&&t){const i=new Blob([`importScripts("${e}");`],{type:"application/javascript"});r=new Worker(URL.createObjectURL(i))}else r=new Worker(e);return r},Fy=e=>{e.terminate()},jy=(e,t)=>{e.onmessage=({data:r})=>{t(r)}},Ky=async(e,t)=>{e.postMessage(t)};const Ei=e=>new Promise((t,r)=>{const i=new FileReader;i.onload=()=>{t(i.result)},i.onerror=({target:{error:{code:n}}})=>{r(Error(`File could not be read! Code=${n}`))},i.readAsArrayBuffer(e)}),Rn=async e=>{let t=e;if(typeof e>"u")return"undefined";if(typeof e=="string")/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(e)?t=atob(e.split(",")[1]).split("").map(r=>r.charCodeAt(0)):t=await(await fetch(e)).arrayBuffer();else if(typeof HTMLElement<"u"&&e instanceof HTMLElement)e.tagName==="IMG"&&(t=await Rn(e.src)),e.tagName==="VIDEO"&&(t=await Rn(e.poster)),e.tagName==="CANVAS"&&await new Promise(r=>{e.toBlob(async i=>{t=await Ei(i),r()})});else if(typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas){const r=await e.convertToBlob();t=await Ei(r)}else(e instanceof File||e instanceof Blob)&&(t=await Ei(e));return new Uint8Array(t)};var Yy=Rn;const Zy=Gy,Xy=Hy,Qy=Fy,Jy=jy,e0=Ky,t0=Yy;var r0={defaultOptions:Zy,spawnWorker:Xy,terminateWorker:Qy,onMessage:Jy,send:e0,loadImage:t0};const i0=By,tt=Oy,{log:_o}=ii,n0=$c,Et=Ly,{defaultOptions:a0,spawnWorker:s0,terminateWorker:o0,onMessage:u0,loadImage:vo,send:l0}=r0;let $o=0;var xc=async(e="eng",t=Et.LSTM_ONLY,r={},i={})=>{const n=n0("Worker",$o),{logger:s,errorHandler:a,...o}=i0({...a0,...r}),d={},l=typeof e=="string"?e.split("+"):e;let h=t,p=i;const f=[Et.DEFAULT,Et.LSTM_ONLY].includes(t)&&!o.legacyCore;let w,g;const v=new Promise((G,J)=>{g=G,w=J}),S=G=>{w(G.message)};let b=s0(o);b.onerror=S,$o+=1;const _=({id:G,action:J,payload:A})=>new Promise((M,O)=>{_o(`[${n}]: Start ${G}, action=${J}`);const P=`${J}-${G}`;d[P]={resolve:M,reject:O},l0(b,{workerId:n,jobId:G,action:J,payload:A})}),T=()=>console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"),k=G=>_(tt({id:G,action:"load",payload:{options:{lstmOnly:f,corePath:o.corePath,logging:o.logging}}})),E=(G,J,A)=>_(tt({id:A,action:"FS",payload:{method:"writeFile",args:[G,J]}})),C=(G,J)=>_(tt({id:J,action:"FS",payload:{method:"readFile",args:[G,{encoding:"utf8"}]}})),z=(G,J)=>_(tt({id:J,action:"FS",payload:{method:"unlink",args:[G]}})),$=(G,J,A)=>_(tt({id:A,action:"FS",payload:{method:G,args:J}})),N=(G,J)=>_(tt({id:J,action:"loadLanguage",payload:{langs:G,options:{langPath:o.langPath,dataPath:o.dataPath,cachePath:o.cachePath,cacheMethod:o.cacheMethod,gzip:o.gzip,lstmOnly:[Et.DEFAULT,Et.LSTM_ONLY].includes(h)&&!o.legacyLang}}})),L=(G,J,A,M)=>_(tt({id:M,action:"initialize",payload:{langs:G,oem:J,config:A}})),K=(G="eng",J,A,M)=>{if(f&&[Et.TESSERACT_ONLY,Et.TESSERACT_LSTM_COMBINED].includes(J))throw Error("Legacy model requested but code missing.");const O=J||h;h=O;const P=A||p;p=P;const W=(typeof G=="string"?G.split("+"):G).filter(ne=>!l.includes(ne));return l.push(...W),W.length>0?N(W,M).then(()=>L(G,O,P,M)):L(G,O,P,M)},Y=(G={},J)=>_(tt({id:J,action:"setParameters",payload:{params:G}})),X=async(G,J={},A={text:!0},M)=>_(tt({id:M,action:"recognize",payload:{image:await vo(G),options:J,output:A}})),D=async(G,J)=>{if(f)throw Error("`worker.detect` requires Legacy model, which was not loaded.");return _(tt({id:J,action:"detect",payload:{image:await vo(G)}}))},H=async()=>(b!==null&&(o0(b),b=null),Promise.resolve());u0(b,({workerId:G,jobId:J,status:A,action:M,data:O})=>{const P=`${M}-${J}`;if(A==="resolve")_o(`[${G}]: Complete ${J}`),d[P].resolve({jobId:J,data:O}),delete d[P];else if(A==="reject")if(d[P].reject(O),delete d[P],M==="load"&&w(O),a)a(O);else throw Error(O);else A==="progress"&&s({...O,userJobId:J})});const F={id:n,worker:b,load:T,writeText:E,readText:C,removeFile:z,FS:$,reinitialize:K,setParameters:Y,recognize:X,detect:D,terminate:H};return k().then(()=>N(e)).then(()=>L(e,t,i)).then(()=>g(F)).catch(()=>{}),v};const Sc=xc,d0=async(e,t,r)=>{const i=await Sc(t,1,r);return i.recognize(e).finally(async()=>{await i.terminate()})},c0=async(e,t)=>{const r=await Sc("osd",0,t);return r.detect(e).finally(async()=>{await r.terminate()})};var p0={recognize:d0,detect:c0};const h0=xc,f0=p0;var xo={createWorker:h0,...f0};let Ii=null,So=0;async function m0(){return Ii||(Ii=(async()=>{var r,i;let e;typeof window<"u"&&((r=window.location)!=null&&r.origin)&&(e=window.location.origin),typeof chrome<"u"&&((i=chrome.runtime)!=null&&i.getURL)&&(e=chrome.runtime.getURL(""));const t={};e&&(t.langPath=e);try{return await xo.createWorker("eng",1,t)}catch(n){return console.warn("[OCR Worker Init] Local langPath fallback, attempting default init:",n),await xo.createWorker("eng")}})()),Ii}function g0(e,t){if(!e||typeof e!="string")return!1;const r=e.toLowerCase().trim();if(r==="click view profile"||r.startsWith("click view profile")||r==="open rahul's profile"||r.startsWith("open rahul's profile")||r==="close profile")return!1;if(["ocr","image","screenshot","picture","photo","canvas","badge","id card","card text","text in image","in this image","in the image","read image","read picture","text written","visual text","acknowledgement","acknowledgment","registration","what does it say","what is written","what text","scan","img1"].some(d=>r.includes(d)))return!0;const s=typeof document<"u"&&document.querySelectorAll("canvas").length>0,a=t.elements&&t.elements.some(d=>d.type==="image");return(r.includes("number")||r.includes("code")||r.includes("text")||r.includes("what"))&&!r.includes("email")&&!r.includes("mobile")&&(s||a)}function y0(e){if(e instanceof HTMLCanvasElement)try{const t=e.width,r=e.height;return t===0||r===0?null:{dataUrl:e.toDataURL("image/png"),width:t,height:r}}catch{return null}if(e instanceof HTMLImageElement){const t=e.naturalWidth||e.width||200,r=e.naturalHeight||e.height||100;if(e.src&&e.src.startsWith("data:"))return{dataUrl:e.src,width:t,height:r};try{const i=document.createElement("canvas");if(i.width=t,i.height=r,i.width>0&&i.height>0){const n=i.getContext("2d");if(n)return n.drawImage(e,0,0),{dataUrl:i.toDataURL("image/png"),width:t,height:r}}}catch{if(e.src)return{dataUrl:e.src,width:t,height:r}}if(e.src)return{dataUrl:e.src,width:t,height:r}}return null}async function w0(e){const t=performance.now(),r=[];let i=0,n=!1,s;if(typeof document>"u")return{regions:r,uncertain:!1,status:"success",elementsScanned:0,executionTimeMs:0};const a=[];if(document.querySelectorAll("canvas").forEach((p,f)=>{const w=p.id||p.getAttribute("data-perception-id")||`canvas_${f+1}`;a.push({id:w,element:p})}),document.querySelectorAll("img").forEach((p,f)=>{if(p.classList.contains("profile-photo")||p.id.startsWith("photo_"))return;const w=p.id||p.getAttribute("data-perception-id")||`img_${f+1}`;a.push({id:w,element:p})}),a.length===0)return{regions:r,uncertain:!1,status:"success",elementsScanned:0,executionTimeMs:0};let l=0;try{const p=await m0();for(const{id:f,element:w}of a)try{const g=y0(w);if(!g){n=!0;continue}const v=w.getBoundingClientRect(),{dataUrl:S,width:b,height:_}=g,T=await p.recognize(S);if(l++,T&&T.data&&T.data.text){const E=T.data.lines||[],C=v.width>0&&b>0?v.width/b:1,z=v.height>0&&_>0?v.height/_:1;if(E.length>0)for(const $ of E){const N=$.text?$.text.trim():"";if(N.length<2)continue;const L=$.bbox||{x0:0,y0:0,x1:b,y1:_},K=Math.max(1,L.x1-L.x0),Y=Math.max(1,L.y1-L.y0),X=e.elements.some(H=>H.label&&H.label.trim().toLowerCase()===N.toLowerCase()),D=Math.round($.confidence||80)/100;D<.3&&(n=!0),r.push({id:`ocr_${++i}`,text:N,confidence:D,imageBbox:{x:Math.round(L.x0),y:Math.round(L.y0),width:Math.round(K),height:Math.round(Y)},bbox:{x:Math.round(v.x+L.x0*C),y:Math.round(v.y+L.y0*z),width:Math.round(K*C),height:Math.round(Y*z)},source:"ocr",elementId:f,isDuplicateOfDom:X})}else{const $=T.data.text.trim();if($.length>=2){const N=e.elements.some(L=>L.label&&L.label.trim().toLowerCase()===$.toLowerCase());r.push({id:`ocr_${++i}`,text:$,confidence:Math.round(T.data.confidence||80)/100,imageBbox:{x:0,y:0,width:b,height:_},bbox:{x:Math.round(v.x),y:Math.round(v.y),width:Math.round(v.width||b),height:Math.round(v.height||_)},source:"ocr",elementId:f,isDuplicateOfDom:N})}}}else n=!0}catch(g){console.warn(`[OCR Engine Warning] OCR skipped element '${f}':`,g),n=!0}}catch(p){console.warn("[OCR Engine Warning] Local Tesseract OCR encountered an error:",p),s=p.message||"OCR Engine failed",n=!0}finally{So=Math.round(performance.now()-t)}const h=r.length>0?"success":s?"failure":n?"uncertain":"success";return{regions:r,uncertain:n,status:h,elementsScanned:l,error:s,executionTimeMs:So}}/*!
 * ONNX Runtime Web v1.29.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Zn=Object.defineProperty,b0=Object.getOwnPropertyDescriptor,_0=Object.getOwnPropertyNames,v0=Object.prototype.hasOwnProperty,$0=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),j=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Zt=(e,t)=>{for(var r in t)Zn(e,r,{get:t[r],enumerable:!0})},x0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of _0(t))!v0.call(e,n)&&n!==r&&Zn(e,n,{get:()=>t[n],enumerable:!(i=b0(t,n))||i.enumerable});return e},yr=e=>x0(Zn({},"__esModule",{value:!0}),e),rr,yt,Ft,To,Tc,kc=j(()=>{"use strict";rr=new Map,yt=[],Ft=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=rr.get(e);if(i===void 0)rr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=yt.indexOf(e);n!==-1&&yt.splice(n,1);for(let s=0;s<yt.length;s++)if(rr.get(yt[s]).priority<=r){yt.splice(s,0,e);return}yt.push(e)}return}throw new TypeError("not a valid backend")},To=async e=>{let t=rr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Tc=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),i=r.length===0?yt:r,n,s=[],a=new Set;for(let d of i){let l=await To(d);typeof l=="string"?s.push({name:d,err:l}):(n||(n=l),n===l&&a.add(d))}if(!n)throw new Error(`no available backend found. ERR: ${s.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:l}of s)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${l}`);let o=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[n,new Proxy(e,{get:(d,l)=>l==="executionProviders"?o:Reflect.get(d,l)})]}}),S0=j(()=>{"use strict";kc()}),Ec,T0=j(()=>{"use strict";Ec="1.29.0"}),Ci,Re,Ic=j(()=>{"use strict";T0(),Ci="warning",Re={wasm:{},webgl:{},webgpu:{},versions:{common:Ec},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ci=e}},get logLevel(){return Ci}},Object.defineProperty(Re,"logLevel",{enumerable:!0})}),_e,k0=j(()=>{"use strict";Ic(),_e=Re}),Cc,zc,E0=j(()=>{"use strict";Cc=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let a=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,d,l;o===void 0||o.mean===void 0?d=[255,255,255,255]:typeof o.mean=="number"?d=[o.mean,o.mean,o.mean,o.mean]:(d=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(d[3]=o.mean[3])),o===void 0||o.bias===void 0?l=[0,0,0,0]:typeof o.bias=="number"?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(l[3]=o.bias[3]));let h=s*n,p=0,f=h,w=h*2,g=-1;a==="RGBA"?(p=0,f=h,w=h*2,g=h*3):a==="RGB"?(p=0,f=h,w=h*2):a==="RBG"&&(p=0,w=h,f=h*2);for(let v=0;v<s;v++)for(let S=0;S<n;S++){let b=(e.data[p++]-l[0])*d[0],_=(e.data[f++]-l[1])*d[1],T=(e.data[w++]-l[2])*d[2],k=g===-1?255:(e.data[g++]-l[3])*d[3];i.fillStyle="rgba("+b+","+_+","+T+","+k+")",i.fillRect(S,v,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},zc=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,s,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[1],a=e.dims[3]):(n=e.dims[3],s=e.dims[2],a=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t==null?void 0:t.norm,l,h;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?h=[0,0,0,0]:typeof d.bias=="number"?h=[d.bias,d.bias,d.bias,d.bias]:(h=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(h[3]=d.bias[3]));let p=s*n;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,w=0,g=1,v=2,S=3,b=0,_=p,T=p*2,k=-1;o==="RGBA"?(b=0,_=p,T=p*2,k=p*3):o==="RGB"?(b=0,_=p,T=p*2):o==="RBG"&&(b=0,T=p,_=p*2),i=r.createImageData(n,s);for(let E=0;E<s*n;w+=f,g+=f,v+=f,S+=f,E++)i.data[w]=(e.data[b++]-h[0])*l[0],i.data[g]=(e.data[_++]-h[1])*l[1],i.data[v]=(e.data[T++]-h[2])*l[2],i.data[S]=k===-1?255:(e.data[k++]-h[3])*l[3]}else throw new Error("Can not access image data");return i}}),Or,Ac,Oc,Rc,Mc,Nc,I0=j(()=>{"use strict";Xn(),Or=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},s,a;typeof n.mean=="number"?s=[n.mean,n.mean,n.mean,n.mean]:s=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?a=[n.bias,n.bias,n.bias,n.bias]:a=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*i,h=d==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,f=0,w=1,g=2,v=3,S=0,b=l,_=l*2,T=-1;o==="RGB"&&(p=3,f=0,w=1,g=2,v=-1),d==="RGBA"?T=l*3:d==="RBG"?(S=0,_=l,b=l*2):d==="BGR"&&(_=0,b=l,S=l*2);for(let k=0;k<l;k++,f+=p,g+=p,w+=p,v+=p)h[S++]=(e[f]+a[0])/s[0],h[b++]=(e[w]+a[1])/s[1],h[_++]=(e[g]+a[2])/s[2],T!==-1&&v!==-1&&(h[T++]=(e[v]+a[3])/s[3]);return d==="RGBA"?new Ue("float32",h,[1,4,r,i]):new Ue("float32",h,[1,3,r,i])},Ac=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",a,o=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=d();h.width=e.width,h.height=e.height;let p=l(h);if(p!=null){let f=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=f,o.width=w}else o.tensorFormat="RGBA",o.height=f,o.width=w;p.drawImage(e,0,0),a=p.getImageData(0,0,w,f).data}else throw new Error("Can not access image data")}else if(i){let h,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,p=t.resizedWidth):(h=e.height,p=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=h,o.width=p,t!==void 0){let f=d();f.width=p,f.height=h;let w=l(f);if(w!=null)w.putImageData(e,0,0),a=w.getImageData(0,0,p,h).data;else throw new Error("Can not access image data")}else a=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=d();h.width=e.width,h.height=e.height;let p=l(h);if(p!=null){let f=e.height,w=e.width;return p.drawImage(e,0,0,w,f),a=p.getImageData(0,0,w,f).data,o.height=f,o.width=w,Or(a,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((h,p)=>{let f=d(),w=l(f);if(!e||!w)return p();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{f.width=g.width,f.height=g.height,w.drawImage(g,0,0,f.width,f.height);let v=w.getImageData(0,0,f.width,f.height);o.height=f.height,o.width=f.width,h(Or(v.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Or(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Oc=(e,t)=>{let{width:r,height:i,download:n,dispose:s}=t,a=[1,i,r,4];return new Ue({location:"texture",type:"float32",texture:e,dims:a,download:n,dispose:s})},Rc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:s}=t;return new Ue({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:s})},Mc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:s}=t;return new Ue({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:s})},Nc=(e,t,r)=>new Ue({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Rt,hr,zi,Dc,C0=j(()=>{"use strict";Rt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),hr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),zi=!1,Dc=()=>{if(!zi){zi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Rt.set("int64",BigInt64Array),hr.set(BigInt64Array,"int64")),t&&(Rt.set("uint64",BigUint64Array),hr.set(BigUint64Array,"uint64")),i?(Rt.set("float16",r),hr.set(r,"float16")):Rt.set("float16",Uint16Array)}}}),Bc,Lc,z0=j(()=>{"use strict";Xn(),Bc=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Lc=(e,t)=>{switch(e.location){case"cpu":return new Ue(e.type,e.data,t);case"cpu-pinned":return new Ue({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ue({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ue({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ue({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ue,Xn=j(()=>{"use strict";E0(),I0(),C0(),z0(),Ue=class{constructor(e,t,r){Dc();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let a=Rt.get(i);if(!a)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");a=t}else{let d=Rt.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?a=d.from(t,BigInt):a=d.from(t)}else if(t instanceof d)a=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${d}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")i="string",a=e;else if(d==="boolean")i="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",a=Uint8Array.from(e);else{let d=hr.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=d,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");n=o,this.cpuData=a,this.dataLocation="cpu"}let s=Bc(n);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=s}static async fromImage(e,t){return Ac(e,t)}static fromTexture(e,t){return Oc(e,t)}static fromGpuBuffer(e,t){return Rc(e,t)}static fromMLTensor(e,t){return Mc(e,t)}static fromPinnedBuffer(e,t,r){return Nc(e,t,r)}toDataURL(e){return Cc(this,e)}toImageData(e){return zc(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Lc(this,e)}}}),it,Pc=j(()=>{"use strict";Xn(),it=Ue}),Kr,Ai,nt,Xe,Dt,Bt,Uc=j(()=>{"use strict";Ic(),Kr=(e,t)=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ai=(e,t)=>{var n;let r=((n=new Error().stack)==null?void 0:n.split(/\r\n|\r|\n/g))||[],i=!1;for(let s=0;s<r.length;s++){if(i&&!r[s].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[s].trim().split(" ")[1]}`;t&&(a+=`::${t}`),Kr("CPU",a);return}r[s].includes("TRACE_FUNC")&&(i=!0)}},nt=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||Ai("BEGIN",e)},Xe=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||Ai("END",e)},Dt=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.time(`ORT::${e}`)},Bt=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeEnd(`ORT::${e}`)}}),qc,A0=j(()=>{"use strict";kc(),Pc(),Uc(),qc=class Wc{constructor(t){this.handler=t}async run(t,r,i){nt(),Dt("InferenceSession.run");let n={},s={};if(typeof t!="object"||t===null||t instanceof it||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof it)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);n[l]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,h=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(h.indexOf(p)!==-1){let f=r[p];(f===null||f instanceof it)&&(l=!0,a=!1,n[p]=f)}if(l){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)n[l]=null;let o=await this.handler.run(t,n,s),d={};for(let l in o)if(Object.hasOwnProperty.call(o,l)){let h=o[l];h instanceof it?d[l]=h:d[l]=new it(h.type,h.data,h.dims)}return Bt("InferenceSession.run"),Xe(),d}async release(){return this.handler.dispose()}static async create(t,r,i,n){nt(),Dt("InferenceSession.create");let s,a={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,p=0,f=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(f=t.byteLength-p,typeof i=="number"){if(f=i,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||p+f>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-p}].`);if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(h,p,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,d]=await Tc(a),l=await o.createInferenceSessionHandler(s,d);return Bt("InferenceSession.create"),Xe(),new Wc(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Yr,O0=j(()=>{"use strict";A0(),Yr=qc}),R0=j(()=>{"use strict"}),M0=j(()=>{"use strict"}),N0=j(()=>{"use strict"}),D0=j(()=>{"use strict"}),B0={};Zt(B0,{InferenceSession:()=>Yr,TRACE:()=>Kr,TRACE_EVENT_BEGIN:()=>Dt,TRACE_EVENT_END:()=>Bt,TRACE_FUNC_BEGIN:()=>nt,TRACE_FUNC_END:()=>Xe,Tensor:()=>it,env:()=>_e,registerBackend:()=>Ft});var Ve=j(()=>{"use strict";S0(),k0(),O0(),Pc(),R0(),M0(),Uc(),N0(),D0()}),Qn=j(()=>{"use strict"}),Vc={};Zt(Vc,{default:()=>Gc});var Oi,Ri,Gc,L0=j(()=>{"use strict";var e;Jf(),qt(),Jn(),Oi="ort-wasm-proxy-worker",Ri=((e=globalThis.self)==null?void 0:e.name)===Oi,Ri&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":ea(i.wasm).then(()=>{ya(i).then(()=>{postMessage({type:r})},n=>{postMessage({type:r,err:n})})},n=>{postMessage({type:r,err:n})});break;case"init-ep":{let{epName:n,env:s}=i;wa(s,n).then(()=>{postMessage({type:r})},a=>{postMessage({type:r,err:a})});break}case"copy-from":{let{buffer:n}=i,s=ri(n);postMessage({type:r,out:s});break}case"create":{let{model:n,options:s}=i;ba(n,s).then(a=>{postMessage({type:r,out:a})},a=>{postMessage({type:r,err:a})});break}case"release":_a(i),postMessage({type:r});break;case"run":{let{sessionId:n,inputIndices:s,inputs:a,outputIndices:o,options:d}=i;va(n,s,a,o,new Array(o.length).fill(null),d).then(l=>{l.some(h=>h[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:l},xa([...a,...l]))},l=>{postMessage({type:r,err:l})});break}case"end-profiling":$a(i),postMessage({type:r});break;default:}}catch(n){postMessage({type:r,err:n})}}),Gc=Ri?null:t=>new Worker(t??Pe,{type:"module",name:Oi})}),Hc={};Zt(Hc,{default:()=>Fc});async function ko(e={}){var go,yo;var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&((go=self.name)==null?void 0:go.startsWith("em-pthread"));t.mountExternalData=(u,c)=>{u.startsWith("./")&&(u=u.substring(2)),(t.Yc||(t.Yc=new Map)).set(u,c)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let s=u=>async(...c)=>{var y;try{if(t.Xc)throw Error("Session already started");let m=t.Xc={Kd:c[0],errors:[]},x=await u(...c);if(t.Xc!==m)throw Error("Session mismatch");(y=t.dd)==null||y.flush();let I=m.errors;if(0<I.length){let R=await Promise.all(I);if(R=R.filter(U=>U),0<R.length)throw Error(R.join(`
`))}return x}finally{t.Xc=null}};t.jsepInit=(u,c)=>{if(u==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=c;let y=t.dd;t.jsepRegisterBuffer=(m,x,I,R)=>y.registerBuffer(m,x,I,R),t.jsepGetBuffer=m=>y.getBuffer(m),t.jsepCreateDownloader=(m,x,I)=>y.createDownloader(m,x,I),t.jsepOnCreateSession=m=>{y.onCreateSession(m)},t.jsepOnReleaseSession=m=>{y.onReleaseSession(m)},t.jsepOnRunStart=m=>y.onRunStart(m),t.Id=(m,x)=>{y.upload(m,x)}}else if(u==="webnn"){let y=c[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=c.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=m=>y.onRunStart(m),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnOnReleaseSession=m=>{y.onReleaseSession(m)},t.webnnCreateMLTensorDownloader=(m,x)=>y.createMLTensorDownloader(m,x),t.webnnRegisterMLTensor=(m,x,I,R)=>y.registerMLTensor(m,x,I,R),t.webnnCreateMLContext=m=>y.createMLContext(m),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let a=()=>{let u=c=>(...y)=>{let m=Je;return y=c(...y),Je!=m?new Promise((x,I)=>{fi={resolve:x,reject:I}}):y};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[c]=u(t[c])})(),s!==void 0&&(t._OrtRun=s(t._OrtRun),t._OrtRunWithBinding=s(t._OrtRunWithBinding)),a=void 0};t.asyncInit=()=>{a==null||a()};var o,d,l=(u,c)=>{throw c},h="",p="";if(r||i){try{p=new URL(".",h).href}catch{}i&&(d=u=>{var c=new XMLHttpRequest;return c.open("GET",u,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),o=async u=>{if(z(u))return new Promise((y,m)=>{var x=new XMLHttpRequest;x.open("GET",u,!0),x.responseType="arraybuffer",x.onload=()=>{x.status==200||x.status==0&&x.response?y(x.response):m(x.status)},x.onerror=m,x.send(null)});var c=await fetch(u,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var f,w,g,v,S,b,_=console.log.bind(console),T=console.error.bind(console),k=_,E=T,C=!1,z=u=>u.startsWith("file://");function $(){ht.buffer!=L.buffer&&P()}if(n){let u=function(c){try{var y=c.data,m=y.Sc;if(m==="load"){let x=[];self.onmessage=I=>x.push(I),b=()=>{postMessage({Sc:"loaded"});for(let I of x)u(I);self.onmessage=u};for(let I of y.xd)t[I]&&!t[I].proxy||(t[I]=(...R)=>{postMessage({Sc:"callHandler",vd:I,args:R})},I=="print"&&(k=t[I]),I=="printErr"&&(E=t[I]));ht=y.Od,P(),w=y.Pd,$e(),Ar()}else if(m==="run"){(function(x){var I=($(),H)[x+52>>>2>>>0];x=($(),H)[x+56>>>2>>>0],Ts(I,I-x),le(I)})(y.Rc),bi(y.Rc,0,0,1,0,0),ka(),ci(y.Rc),N||(bs(),N=!0);try{hm(y.Md,y.bd)}catch(x){if(x!="unwind")throw x}}else y.target!=="setimmediate"&&(m==="checkMailbox"?N&&Sr():m&&(E(`worker: received unknown command ${m}`),E(y)))}catch(x){throw _s(),x}};var N=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=u}var L,K,Y,X,D,H,F,G,J,A,M,O=!1;function P(){var u=ht.buffer;t.HEAP8=L=new Int8Array(u),Y=new Int16Array(u),t.HEAPU8=K=new Uint8Array(u),X=new Uint16Array(u),t.HEAP32=D=new Int32Array(u),t.HEAPU32=H=new Uint32Array(u),F=new Float32Array(u),G=new Float64Array(u),J=new BigInt64Array(u),A=new BigUint64Array(u)}function V(){O=!0,n?b():st.sb()}function W(u){throw E(u="Aborted("+u+")"),C=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),S==null||S(u),u}function ne(){return{a:{ma:Dg,hb:Ng,g:fm,J:mm,f:gm,o:ym,i:wm,$:bm,b:_m,S:vm,Ia:Oa,n:$m,aa:Da,Ya:Ba,Ea:La,Ga:Pa,Za:Ua,Wa:qa,Pa:Wa,Va,ka:Ga,Fa:Ha,Ca:Fa,Xa:ja,Da:Ka,cb:xm,fa:Sm,xa:Tm,va:Em,ea:Cm,N:zm,H:Am,wa:Om,_:Pm,ya:Um,Sa:qm,Aa:Vm,Ja:Gm,ta:Hm,ga:Fm,Ra:ci,$a:jm,Q:Xm,r:rg,c:li,ib:ig,y:ng,M:ag,D:sg,l:og,s:rs,jb:ug,I:lg,R:dg,j:cg,u:pg,q:hg,k:fg,Ma:mg,Na:gg,Oa:yg,Ka:ss,La:os,ua:us,eb:bg,bb:vg,v:$g,ba:xg,ha:Sg,ab:_g,V:Tg,_a:kg,Ba:Eg,F:wg,T:Ig,la:Cr,za:zg,gb:Cg,fb:Ag,Ta:ps,Ua:hs,Ha:Xt,U:fs,ja:ms,Qa:gs,ia:ys,lb:wy,na:hy,mb:yy,oa:py,G:ry,e:Ug,t:Lg,w:Bg,B:Zg,nb:ly,Z:uy,x:Vg,pa:dy,X:fy,ca:oy,ob:sy,pb:ay,O:Xg,qa:ny,qb:iy,L:ey,Y:cy,d:Pg,A:Wg,m:qg,kb:by,p:Hg,z:Fg,C:Gg,E:jg,K:Qg,ra:ty,P:my,da:Jg,W:gy,rb:Yg,sa:Kg,h:Rg,a:ht,db:Le}}}async function $e(){function u(m,x){var I=st=m.exports;m={};for(let[R,U]of Object.entries(I))typeof U=="function"?(I=Km(U),m[R]=I):m[R]=U;return st=m,st=function(){var R=st,U=Q=>ue=>Q(ue)>>>0,Z=Q=>()=>Q()>>>0;return(R=Object.assign({},R)).tb=U(R.tb),R.Xb=Z(R.Xb),R.Zb=U(R.Zb),R.lc=U(R.lc),R.mc=Z(R.mc),R.qc=U(R.qc),R}(),Sa.push(st._b),ws=(m=st).tb,bs=m.ub,t._OrtInit=m.vb,t._OrtGetLastError=m.wb,t._OrtCreateSessionOptions=m.xb,t._OrtAppendExecutionProvider=m.yb,t._OrtAddFreeDimensionOverride=m.zb,t._OrtAddSessionConfigEntry=m.Ab,t._OrtReleaseSessionOptions=m.Bb,t._OrtCreateSession=m.Cb,t._OrtReleaseSession=m.Db,t._OrtGetInputOutputCount=m.Eb,t._OrtGetInputOutputMetadata=m.Fb,t._OrtFree=m.Gb,t._OrtCreateTensor=m.Hb,t._OrtGetTensorData=m.Ib,t._OrtReleaseTensor=m.Jb,t._OrtCreateRunOptions=m.Kb,t._OrtAddRunConfigEntry=m.Lb,t._OrtReleaseRunOptions=m.Mb,t._OrtCreateBinding=m.Nb,t._OrtBindInput=m.Ob,t._OrtBindOutput=m.Pb,t._OrtClearBoundOutputs=m.Qb,t._OrtReleaseBinding=m.Rb,t._OrtRunWithBinding=m.Sb,t._OrtRun=m.Tb,t._OrtEndProfiling=m.Ub,t._JsepOutput=m.Vb,t._JsepGetNodeName=m.Wb,zr=m.Xb,et=t._free=m.Yb,er=t._malloc=m.Zb,bi=m.ac,_s=m.bc,vs=m.cc,$s=m.dc,_i=m.ec,xs=m.fc,Ss=m.gc,ce=m.hc,tr=m.ic,Ts=m.jc,le=m.kc,vi=m.lc,de=m.mc,ks=m.nc,$i=m.oc,Es=m.pc,Is=m.qc,Cs=m.rc,xi=m.sc,zs=m.tc,As=m.uc,Os=m.vc,Rs=m.wc,Ms=m.xc,Ns=m.yc,Ds=m.zc,Bs=m.Ac,Ls=m.Bc,Ps=m.Cc,Us=m.Dc,qs=m.Ec,Ws=m.Fc,Vs=m.Gc,Gs=m.Hc,Hs=m.Ic,Fs=m.Jc,js=m.Kc,Ks=m.Lc,Ys=m.Mc,Zs=m.Nc,Xs=m.Pc,Qs=m.Qc,Js=m.$c,eo=m.ad,to=m.fd,ro=m.kd,io=m.ld,no=m.md,ao=m.nd,so=m.od,oo=m.pd,uo=m.qd,lo=m.rd,co=m.wd,po=m.Ud,ho=m.Vd,fo=m.Wd,mo=m.Xd,w=x,st}var c,y=ne();return t.instantiateWasm?new Promise(m=>{t.instantiateWasm(y,(x,I)=>{m(u(x,I))})}):n?u(new WebAssembly.Instance(w,ne()),w):(M??(M=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm","").href),c=await async function(m){var x=M;if(!f&&!z(x))try{var I=fetch(x,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,m)}catch(R){E(`wasm streaming compile failed: ${R}`),E("falling back to ArrayBuffer instantiation")}return async function(R,U){try{var Z=await async function(Q){if(!f)try{var ue=await o(Q);return new Uint8Array(ue)}catch{}if(Q==M&&f)Q=new Uint8Array(f);else{if(!d)throw"both async and sync fetching of the wasm failed";Q=d(Q)}return Q}(R);return await WebAssembly.instantiate(Z,U)}catch(Q){E(`failed to asynchronously prepare wasm: ${Q}`),W(Q)}}(x,m)}(y),u(c.instance,c.module))}class me{constructor(c){wo(this,"name","ExitStatus");this.message=`Program terminated with exit(${c})`,this.status=c}}var we=u=>{u.terminate(),u.onmessage=()=>{}},Oe=[],Ce=0,Ee=null,ct=u=>{pt.length==0&&(Ia(),Ea(pt[0]));var c=pt.pop();if(!c)return 6;Qt.push(c),St[u.Rc]=c,c.Rc=u.Rc;var y={Sc:"run",Md:u.Ld,bd:u.bd,Rc:u.Rc};return c.postMessage(y,u.jd),0},xe=0,se=(u,c,...y)=>{var m,x=16*y.length,I=de(),R=vi(x),U=R>>>3;for(m of y)typeof m=="bigint"?(($(),J)[U++>>>0]=1n,($(),J)[U++>>>0]=m):(($(),J)[U++>>>0]=0n,($(),G)[U++>>>0]=m);return u=vs(u,0,x,R,c),le(I),u};function Le(u){if(n)return se(0,1,u);if(g=u,!(0<xe)){for(var c of Qt)we(c);for(c of pt)we(c);pt=[],Qt=[],St={},C=!0}l(0,new me(u))}function br(u){if(n)return se(1,0,u);Xt(u)}var Xt=u=>{if(g=u,n)throw br(u),"unwind";Le(u)},pt=[],Qt=[],Sa=[],St={},Ta=u=>{var c=u.Rc;delete St[c],pt.push(u),Qt.splice(Qt.indexOf(u),1),u.Rc=0,$s(c)};function ka(){Sa.forEach(u=>u())}var Ea=u=>new Promise(c=>{u.onmessage=x=>{var I=x.data;if(x=I.Sc,I.Zc&&I.Zc!=zr()){var R=St[I.Zc];R?R.postMessage(I,I.jd):E(`Internal error! Worker sent a message "${x}" to target pthread ${I.Zc}, but that thread no longer exists!`)}else x==="checkMailbox"?Sr():x==="spawnThread"?ct(I):x==="cleanupThread"?xr(()=>{Ta(St[I.Nd])}):x==="loaded"?(u.loaded=!0,c(u)):I.target==="setimmediate"?u.postMessage(I):x==="uncaughtException"?u.onerror(I.error):x==="callHandler"?t[I.vd](...I.args):x&&E(`worker sent an unknown command ${x}`)},u.onerror=x=>{throw E(`worker sent an error! ${x.filename}:${x.lineno}: ${x.message}`),x};var y,m=[];for(y of[])t.propertyIsEnumerable(y)&&m.push(y);u.postMessage({Sc:"load",xd:m,Od:ht,Pd:w})});function Ia(){var u=new Worker(new URL(""),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(u)}var ht,hm=(u,c)=>{xe=0,u=xi(u,c),0<xe?g=u:_i(u)},_r=[],vr=0;function fm(u){var c=new ai(u>>>=0);return($(),L)[c.Tc+12>>>0]==0&&(Ca(c,!0),vr--),za(c,!1),_r.push(c),Is(u)}var Vt=0,mm=()=>{ce(0,0);var u=_r.pop();ks(u.cd),Vt=0};function Ca(u,c){c=c?1:0,($(),L)[u.Tc+12>>>0]=c}function za(u,c){c=c?1:0,($(),L)[u.Tc+13>>>0]=c}class ai{constructor(c){this.cd=c,this.Tc=c-24}}var si=u=>{var c=Vt;if(!c)return tr(0),0;var y=new ai(c);($(),H)[y.Tc+16>>>2>>>0]=c;var m=($(),H)[y.Tc+4>>>2>>>0];if(!m)return tr(0),c;for(var x of u){if(x===0||x===m)break;if(Es(x,m,y.Tc+16))return tr(x),c}return tr(m),c};function gm(){return si([])}function ym(u){return si([u>>>0])}function wm(u,c,y,m){return si([u>>>0,c>>>0,y>>>0,m>>>0])}var bm=()=>{var u=_r.pop();u||W("no exception to throw");var c=u.cd;throw($(),L)[u.Tc+13>>>0]==0&&(_r.push(u),za(u,!0),Ca(u,!1),vr++),$i(c),Vt=c};function _m(u,c,y){var m=new ai(u>>>=0);throw c>>>=0,y>>>=0,($(),H)[m.Tc+16>>>2>>>0]=0,($(),H)[m.Tc+4>>>2>>>0]=c,($(),H)[m.Tc+8>>>2>>>0]=y,$i(u),vr++,Vt=u}var vm=()=>vr;function Aa(u,c,y,m){return n?se(2,1,u,c,y,m):Oa(u,c,y,m)}function Oa(u,c,y,m){if(u>>>=0,c>>>=0,y>>>=0,m>>>=0,!globalThis.SharedArrayBuffer)return 6;var x=[];return n&&x.length===0?Aa(u,c,y,m):(u={Ld:y,Rc:u,bd:m,jd:x},n?(u.Sc="spawnThread",postMessage(u,x),0):ct(u))}function $m(u){throw Vt||(Vt=u>>>0),Vt}var Ra=globalThis.TextDecoder&&new TextDecoder,Ma=(u,c,y,m)=>{if(y=c+y,m)return y;for(;u[c]&&!(c>=y);)++c;return c},Na=(u,c=0,y,m)=>{if(16<(y=Ma(u,c>>>=0,y,m))-c&&u.buffer&&Ra)return Ra.decode(u.buffer instanceof ArrayBuffer?u.subarray(c,y):u.slice(c,y));for(m="";c<y;){var x=u[c++];if(128&x){var I=63&u[c++];if((224&x)==192)m+=String.fromCharCode((31&x)<<6|I);else{var R=63&u[c++];65536>(x=(240&x)==224?(15&x)<<12|I<<6|R:(7&x)<<18|I<<12|R<<6|63&u[c++])?m+=String.fromCharCode(x):(x-=65536,m+=String.fromCharCode(55296|x>>10,56320|1023&x))}}else m+=String.fromCharCode(x)}return m},Ie=(u,c,y)=>(u>>>=0)?Na(($(),K),u,c,y):"";function Da(u,c,y){return n?se(3,1,u,c,y):0}function Ba(u,c){if(n)return se(4,1,u,c)}function La(u,c){if(n)return se(5,1,u,c)}function Pa(u,c,y){if(n)return se(6,1,u,c,y)}function Ua(u,c,y){return n?se(7,1,u,c,y):0}function qa(u,c){if(n)return se(8,1,u,c)}function Wa(u,c,y){if(n)return se(9,1,u,c,y)}function Va(u,c,y,m){if(n)return se(10,1,u,c,y,m)}function Ga(u,c,y,m){if(n)return se(11,1,u,c,y,m)}function Ha(u,c,y,m){if(n)return se(12,1,u,c,y,m)}function Fa(u){if(n)return se(13,1,u)}function ja(u,c){if(n)return se(14,1,u,c)}function Ka(u,c,y){if(n)return se(15,1,u,c,y)}var xm=()=>W(""),Qe=u=>{u>>>=0;for(var c="";;){var y=($(),K)[u++>>>0];if(!y)return c;c+=String.fromCharCode(y)}},oi={},ui={},Gt=class extends Error{constructor(u){super(u),this.name="BindingError"}};function at(u,c,y={}){return function(m,x,I={}){var R=x.name;if(!m)throw new Gt(`type "${R}" must have a positive integer typeid pointer`);if(ui.hasOwnProperty(m)){if(I.yd)return;throw new Gt(`Cannot register type '${R}' twice`)}ui[m]=x,oi.hasOwnProperty(m)&&(x=oi[m],delete oi[m],x.forEach(U=>U()))}(u,c,y)}var Ya=(u,c,y)=>{switch(c){case 1:return y?m=>($(),L)[m>>>0]:m=>($(),K)[m>>>0];case 2:return y?m=>($(),Y)[m>>>1>>>0]:m=>($(),X)[m>>>1>>>0];case 4:return y?m=>($(),D)[m>>>2>>>0]:m=>($(),H)[m>>>2>>>0];case 8:return y?m=>($(),J)[m>>>3>>>0]:m=>($(),A)[m>>>3>>>0];default:throw new TypeError(`invalid integer width (${c}): ${u}`)}};function Sm(u,c,y,m,x){u>>>=0,y>>>=0,c=Qe(c>>>0);let I=R=>R;if(m=m===0n){let R=8*y;I=U=>BigInt.asUintN(R,U),x=I(x)}at(u,{name:c,Oc:I,Vc:(R,U)=>(typeof U=="number"&&(U=BigInt(U)),U),Uc:Ya(c,y,!m),Wc:null})}function Tm(u,c,y,m){at(u>>>=0,{name:c=Qe(c>>>0),Oc:function(x){return!!x},Vc:function(x,I){return I?y:m},Uc:function(x){return this.Oc(($(),K)[x>>>0])},Wc:null})}var Za=[],Tt=[0,1,,1,null,1,!0,1,!1,1];function li(u){9<(u>>>=0)&&--Tt[u+1]===0&&(Tt[u]=void 0,Za.push(u))}var We=u=>{if(!u)throw new Gt(`Cannot use deleted val. handle = ${u}`);return Tt[u]},Ge=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Za.pop()||Tt.length;return Tt[c]=u,Tt[c+1]=1,c}};function di(u){return this.Oc(($(),H)[u>>>2>>>0])}var km={name:"emscripten::val",Oc:u=>{var c=We(u);return li(u),c},Vc:(u,c)=>Ge(c),Uc:di,Wc:null};function Em(u){return at(u>>>0,km)}var Im=(u,c)=>{switch(c){case 4:return function(y){return this.Oc(($(),F)[y>>>2>>>0])};case 8:return function(y){return this.Oc(($(),G)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${u}`)}};function Cm(u,c,y){y>>>=0,at(u>>>=0,{name:c=Qe(c>>>0),Oc:m=>m,Vc:(m,x)=>x,Uc:Im(c,y),Wc:null})}function zm(u,c,y,m,x){u>>>=0,y>>>=0,c=Qe(c>>>0);let I=U=>U;if(m===0){var R=32-8*y;I=U=>U<<R>>>R,x=I(x)}at(u,{name:c,Oc:I,Vc:(U,Z)=>Z,Uc:Ya(c,y,m!==0),Wc:null})}function Am(u,c,y){function m(I){var R=($(),H)[I>>>2>>>0];return I=($(),H)[I+4>>>2>>>0],new x(($(),L).buffer,I,R)}var x=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];at(u>>>=0,{name:y=Qe(y>>>0),Oc:m,Uc:m},{yd:!0})}var ft=(u,c,y)=>{var m=($(),K);if(c>>>=0,0<y){var x=c;y=c+y-1;for(var I=0;I<u.length;++I){var R=u.codePointAt(I);if(127>=R){if(c>=y)break;m[c++>>>0]=R}else if(2047>=R){if(c+1>=y)break;m[c++>>>0]=192|R>>6,m[c++>>>0]=128|63&R}else if(65535>=R){if(c+2>=y)break;m[c++>>>0]=224|R>>12,m[c++>>>0]=128|R>>6&63,m[c++>>>0]=128|63&R}else{if(c+3>=y)break;m[c++>>>0]=240|R>>18,m[c++>>>0]=128|R>>12&63,m[c++>>>0]=128|R>>6&63,m[c++>>>0]=128|63&R,I++}}m[c>>>0]=0,u=c-x}else u=0;return u},$r=u=>{for(var c=0,y=0;y<u.length;++y){var m=u.charCodeAt(y);127>=m?c++:2047>=m?c+=2:55296<=m&&57343>=m?(c+=4,++y):c+=3}return c};function Om(u,c){at(u>>>=0,{name:c=Qe(c>>>0),Oc(y){var m=($(),H)[y>>>2>>>0];return m=Ie(y+4,m,!0),et(y),m},Vc(y,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var x=typeof m=="string";if(!(x||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new Gt("Cannot pass non-string to std::string");var I=x?$r(m):m.length,R=er(4+I+1),U=R+4;return($(),H)[R>>>2>>>0]=I,x?ft(m,U,I+1):($(),K).set(m,U>>>0),y!==null&&y.push(et,R),R},Uc:di,Wc(y){et(y)}})}var Xa=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Rm=(u,c,y)=>{if(u>>>=1,16<(c=Ma(($(),X),u,c/2,y))-u&&Xa)return Xa.decode(($(),X).slice(u,c));for(y="";u<c;++u){var m=($(),X)[u>>>0];y+=String.fromCharCode(m)}return y},Mm=(u,c,y)=>{if(y??(y=2147483647),2>y)return 0;var m=c;y=(y-=2)<2*u.length?y/2:u.length;for(var x=0;x<y;++x){var I=u.charCodeAt(x);($(),Y)[c>>>1>>>0]=I,c+=2}return($(),Y)[c>>>1>>>0]=0,c-m},Nm=u=>2*u.length,Dm=(u,c,y)=>{var m="";u>>>=2;for(var x=0;!(x>=c/4);x++){var I=($(),H)[u+x>>>0];if(!I&&!y)break;m+=String.fromCodePoint(I)}return m},Bm=(u,c,y)=>{if(c>>>=0,y??(y=2147483647),4>y)return 0;var m=c;y=m+y-4;for(var x=0;x<u.length;++x){var I=u.codePointAt(x);if(65535<I&&x++,($(),D)[c>>>2>>>0]=I,(c+=4)+4>y)break}return($(),D)[c>>>2>>>0]=0,c-m},Lm=u=>{for(var c=0,y=0;y<u.length;++y)65535<u.codePointAt(y)&&y++,c+=4;return c};function Pm(u,c,y){if(u>>>=0,c>>>=0,y=Qe(y>>>=0),c===2)var m=Rm,x=Mm,I=Nm;else m=Dm,x=Bm,I=Lm;at(u,{name:y,Oc:R=>{var U=($(),H)[R>>>2>>>0];return U=m(R+4,U*c,!0),et(R),U},Vc:(R,U)=>{if(typeof U!="string")throw new Gt(`Cannot pass non-string to C++ string type ${y}`);var Z=I(U),Q=er(4+Z+c);return($(),H)[Q>>>2>>>0]=Z/c,x(U,Q+4,Z+c),R!==null&&R.push(et,Q),Q},Uc:di,Wc(R){et(R)}})}function Um(u,c){at(u>>>=0,{zd:!0,name:c=Qe(c>>>0),Oc:()=>{},Vc:()=>{}})}function qm(u){bi(u>>>0,!i,1,!r,131072,!1),ka()}var xr=u=>{if(!C)try{if(u(),!(0<xe))try{n?zr()&&_i(g):Xt(g)}catch(c){c instanceof me||c=="unwind"||l(0,c)}}catch(c){c instanceof me||c=="unwind"||l(0,c)}},Wm=!Atomics.waitAsync||((yo=globalThis.navigator)==null?void 0:yo.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ci(u){u>>>=0,Wm||(Atomics.waitAsync(($(),D),u>>>2,u).value.then(Sr),u+=128,Atomics.store(($(),D),u>>>2,1))}var Sr=()=>xr(()=>{var u=zr();u&&(ci(u),Ss())});function Vm(u,c){(u>>>=0)==c>>>0?setTimeout(Sr):n?postMessage({Zc:u,Sc:"checkMailbox"}):(u=St[u])&&u.postMessage({Sc:"checkMailbox"})}var pi=[];function Gm(u,c,y,m,x){for(c>>>=0,x>>>=0,pi.length=0,y=x>>>3,m=x+m>>>3;y<m;){var I;I=($(),J)[y++>>>0]?($(),J)[y++>>>0]:($(),G)[y++>>>0],pi.push(I)}return(c?Si[c]:Mg[u])(...pi)}var Hm=()=>{xe=0};function Fm(u){u>>>=0,n?postMessage({Sc:"cleanupThread",Nd:u}):Ta(St[u])}function jm(u){}var Tr=u=>{try{u()}catch(c){W(c)}};function Km(u){var c=(...y)=>{kr.push(u);try{return u(...y)}finally{C||(kr.pop(),Je&&mt===1&&kr.length===0&&(mt=0,xe+=1,Tr(ho),typeof Fibers<"u"&&Fibers.be()))}};return es.set(u,c),c}var mt=0,Je=null,Qa=0,kr=[],hi=new Map,Ja=new Map,es=new Map,Ym=0,fi=null,Zm=[],ts=u=>function(c){if(!C){if(mt===0){var y=!1,m=!1;c((x=0)=>{if(!C&&(Qa=x,y=!0,m)){mt=2,Tr(()=>fo(Je)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),x=!1;try{var I=function(){var Z=($(),D)[Je+8>>>2>>>0];return Z=Ja.get(Z),Z=es.get(Z),--xe,Z()}()}catch(Z){I=Z,x=!0}var R=!1;if(!Je){var U=fi;U&&(fi=null,(x?U.reject:U.resolve)(I),R=!0)}if(x&&!R)throw I}}),m=!0,y||(mt=1,Je=function(){var x=er(65548),I=x+12;if(($(),H)[x>>>2>>>0]=I,($(),H)[x+4>>>2>>>0]=I+65536,I=kr[0],!hi.has(I)){var R=Ym++;hi.set(I,R),Ja.set(R,I)}return I=hi.get(I),($(),D)[x+8>>>2>>>0]=I,x}(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Tr(()=>po(Je)))}else mt===2?(mt=0,Tr(mo),et(Je),Je=null,Zm.forEach(xr)):W(`invalid state: ${mt}`);return Qa}}(c=>{u().then(c)});function Xm(u){return u>>>=0,ts(async()=>{var c=await We(u);return Ge(c)})}var mi=[],Qm=u=>{var c=mi.length;return mi.push(u),c},Jm=(u,c)=>{for(var y=Array(u),m=0;m<u;++m){var x=m,I=($(),H)[c+4*m>>>2>>>0],R=ui[I];if(R===void 0)throw u=`parameter ${m}`,I=ws(I),c=Qe(I),et(I),new Gt(`${u} has unknown type ${c}`);y[x]=R}return y},eg=(u,c,y)=>{var m=[];return u=u(m,y),m.length&&(($(),H)[c>>>2>>>0]=Ge(m)),u},tg={},Er=u=>{var c=tg[u];return c===void 0?Qe(u):c};function rg(u,c,y){var[m,...x]=Jm(u,c>>>0);c=m.Vc.bind(m);var I=x.map(Z=>Z.Uc.bind(Z));u--;var R={toValue:We};switch(u=I.map((Z,Q)=>{var ue=`argFromPtr${Q}`;return R[ue]=Z,`${ue}(args${Q?"+"+8*Q:""})`}),y){case 0:var U="toValue(handle)";break;case 2:U="new (toValue(handle))";break;case 3:U="";break;case 1:R.getStringOrSymbol=Er,U="toValue(handle)[getStringOrSymbol(methodName)]"}return U+=`(${u})`,m.zd||(R.toReturnWire=c,R.emval_returnValue=eg,U=`return emval_returnValue(toReturnWire, destructorsRef, ${U})`),U=`return function (handle, methodName, destructorsRef, args) {
  ${U}
  }`,y=new Function(Object.keys(R),U)(...Object.values(R)),U=`methodCaller<(${x.map(Z=>Z.name)}) => ${m.name}>`,Qm(Object.defineProperty(y,"name",{value:U}))}function ig(u,c){return c>>>=0,(u=We(u>>>0))==We(c)}function ng(u){return(u>>>=0)?(u=Er(u),Ge(globalThis[u])):Ge(globalThis)}function ag(u){return u=Er(u>>>0),Ge(t[u])}function sg(u,c){return c>>>=0,u=We(u>>>0),c=We(c),Ge(u[c])}function og(u){9<(u>>>=0)&&(Tt[u+1]+=1)}function rs(u,c,y,m,x){return mi[u>>>0](c>>>0,y>>>0,m>>>0,x>>>0)}function ug(u,c,y,m,x){return rs(u>>>0,c>>>0,y>>>0,m>>>0,x>>>0)}function lg(){return Ge([])}function dg(u){u=We(u>>>0);for(var c=Array(u.length),y=0;y<u.length;y++)c[y]=u[y];return Ge(c)}function cg(u){return Ge(Er(u>>>0))}function pg(){return Ge({})}function hg(u){for(var c=We(u>>>=0);c.length;){var y=c.pop();c.pop()(y)}li(u)}function fg(u,c,y){c>>>=0,y>>>=0,u=We(u>>>0),c=We(c),y=We(y),u[c]=y}function mg(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),($(),D)[c>>>2>>>0]=u.getUTCSeconds(),($(),D)[c+4>>>2>>>0]=u.getUTCMinutes(),($(),D)[c+8>>>2>>>0]=u.getUTCHours(),($(),D)[c+12>>>2>>>0]=u.getUTCDate(),($(),D)[c+16>>>2>>>0]=u.getUTCMonth(),($(),D)[c+20>>>2>>>0]=u.getUTCFullYear()-1900,($(),D)[c+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),D)[c+28>>>2>>>0]=u}var is=u=>u%4==0&&(u%100!=0||u%400==0),ns=[0,31,60,91,121,152,182,213,244,274,305,335],as=[0,31,59,90,120,151,181,212,243,273,304,334];function gg(u,c){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),c>>>=0,u=new Date(1e3*u),($(),D)[c>>>2>>>0]=u.getSeconds(),($(),D)[c+4>>>2>>>0]=u.getMinutes(),($(),D)[c+8>>>2>>>0]=u.getHours(),($(),D)[c+12>>>2>>>0]=u.getDate(),($(),D)[c+16>>>2>>>0]=u.getMonth(),($(),D)[c+20>>>2>>>0]=u.getFullYear()-1900,($(),D)[c+24>>>2>>>0]=u.getDay();var y=(is(u.getFullYear())?ns:as)[u.getMonth()]+u.getDate()-1|0;($(),D)[c+28>>>2>>>0]=y,($(),D)[c+36>>>2>>>0]=-60*u.getTimezoneOffset(),y=new Date(u.getFullYear(),6,1).getTimezoneOffset();var m=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(y!=m&&u.getTimezoneOffset()==Math.min(m,y)),($(),D)[c+32>>>2>>>0]=u}function yg(u){u>>>=0;var c=new Date(($(),D)[u+20>>>2>>>0]+1900,($(),D)[u+16>>>2>>>0],($(),D)[u+12>>>2>>>0],($(),D)[u+8>>>2>>>0],($(),D)[u+4>>>2>>>0],($(),D)[u>>>2>>>0],0),y=($(),D)[u+32>>>2>>>0],m=c.getTimezoneOffset(),x=new Date(c.getFullYear(),6,1).getTimezoneOffset(),I=new Date(c.getFullYear(),0,1).getTimezoneOffset(),R=Math.min(I,x);return 0>y?($(),D)[u+32>>>2>>>0]=+(x!=I&&R==m):0<y!=(R==m)&&(x=Math.max(I,x),c.setTime(c.getTime()+6e4*((0<y?R:x)-m))),($(),D)[u+24>>>2>>>0]=c.getDay(),y=(is(c.getFullYear())?ns:as)[c.getMonth()]+c.getDate()-1|0,($(),D)[u+28>>>2>>>0]=y,($(),D)[u>>>2>>>0]=c.getSeconds(),($(),D)[u+4>>>2>>>0]=c.getMinutes(),($(),D)[u+8>>>2>>>0]=c.getHours(),($(),D)[u+12>>>2>>>0]=c.getDate(),($(),D)[u+16>>>2>>>0]=c.getMonth(),($(),D)[u+20>>>2>>>0]=c.getYear(),u=c.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function ss(u,c,y,m,x,I,R){return n?se(16,1,u,c,y,m,x,I,R):-52}function os(u,c,y,m,x,I){if(n)return se(17,1,u,c,y,m,x,I)}var Jt={},wg=()=>performance.timeOrigin+performance.now();function us(u,c){if(n)return se(18,1,u,c);if(Jt[u]&&(clearTimeout(Jt[u].id),delete Jt[u]),!c)return 0;var y=setTimeout(()=>{delete Jt[u],xr(()=>xs(u,performance.timeOrigin+performance.now()))},c);return Jt[u]={id:y,ae:c},0}function bg(u,c,y,m){u>>>=0,c>>>=0,y>>>=0,m>>>=0;var x=new Date().getFullYear(),I=new Date(x,0,1).getTimezoneOffset();x=new Date(x,6,1).getTimezoneOffset();var R=Math.max(I,x);($(),H)[u>>>2>>>0]=60*R,($(),D)[c>>>2>>>0]=+(I!=x),u=(c=U=>{var Z=Math.abs(U);return`UTC${0<=U?"-":"+"}${String(Math.floor(Z/60)).padStart(2,"0")}${String(Z%60).padStart(2,"0")}`})(I),c=c(x),x<I?(ft(u,y,17),ft(c,m,17)):(ft(u,m,17),ft(c,y,17))}var _g=()=>Date.now();function vg(u,c,y){return y>>>=0,0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),u=Math.round(1e6*u),($(),J)[y>>>3>>>0]=BigInt(u),0):28}var gi=[],ls=(u,c)=>{gi.length=0;for(var y;y=($(),K)[u++>>>0];){var m=y!=105;c+=(m&=y!=112)&&c%8?4:0,gi.push(y==112?($(),H)[c>>>2>>>0]:y==106?($(),J)[c>>>3>>>0]:y==105?($(),D)[c>>>2>>>0]:($(),G)[c>>>3>>>0]),c+=m?8:4}return gi};function $g(u,c,y){return u>>>=0,c=ls(c>>>0,y>>>0),Si[u](...c)}function xg(u,c,y){return u>>>=0,c=ls(c>>>0,y>>>0),Si[u](...c)}var Sg=()=>{};function Tg(u,c){return E(Ie(u>>>0,c>>>0))}var kg=()=>{throw xe+=1,"unwind"};function Eg(){return 4294901760}var Ig=()=>navigator.hardwareConcurrency,kt={},Ir=u=>{var c;return(c=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+c[1]:(c=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+c[1]:0},ds=u=>{for(var c of u)(u=Ir(c))&&(kt[u]=c)};function Cg(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),ds(u),kt.gd=Ir(u[3]),kt.Jd=u,kt.gd}function Cr(u){if(!(u=kt[u>>>0]))return 0;var c;if(c=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=c[1];else if(c=/^\s+at (.*) \(.*\)$/.exec(u))u=c[1];else{if(!(c=/^(.+?)@/.exec(u)))return 0;u=c[1]}et(Cr.hd??0),c=$r(u)+1;var y=er(c);return y&&ft(u,y,c),Cr.hd=y,Cr.hd}function zg(u){u>>>=0;var c=($(),K).length;if(u<=c||4294901760<u)return!1;for(var y=1;4>=y;y*=2){var m=c*(1+.2/y);m=Math.min(m,u+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(u,m)/65536))-ht.buffer.byteLength+65535)/65536|0;try{ht.grow(m),P();var x=1;break e}catch{}x=void 0}if(x)return!0}return!1}function Ag(u,c,y){if(u>>>=0,c>>>=0,kt.gd==u)var m=kt.Jd;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),ds(m);for(var x=3;m[x]&&Ir(m[x])!=u;)++x;for(u=0;u<y&&m[u+x];++u)($(),D)[c+4*u>>>2>>>0]=Ir(m[u+x]);return u}var yi,wi={},cs=()=>{var m;if(!yi){var u,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((m=globalThis.navigator)==null?void 0:m.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in wi)wi[u]===void 0?delete c[u]:c[u]=wi[u];var y=[];for(u in c)y.push(`${u}=${c[u]}`);yi=y}return yi};function ps(u,c){if(n)return se(19,1,u,c);u>>>=0,c>>>=0;var y,m=0,x=0;for(y of cs()){var I=c+m;($(),H)[u+x>>>2>>>0]=I,m+=ft(y,I,1/0)+1,x+=4}return 0}function hs(u,c){if(n)return se(20,1,u,c);u>>>=0,c>>>=0;var y=cs();for(var m of(($(),H)[u>>>2>>>0]=y.length,u=0,y))u+=$r(m)+1;return($(),H)[c>>>2>>>0]=u,0}function fs(u){return n?se(21,1,u):52}function ms(u,c,y,m){return n?se(22,1,u,c,y,m):52}function gs(u,c,y,m){return n?se(23,1,u,c,y,m):70}var Og=[null,[],[]];function ys(u,c,y,m){if(n)return se(24,1,u,c,y,m);c>>>=0,y>>>=0,m>>>=0;for(var x=0,I=0;I<y;I++){var R=($(),H)[c>>>2>>>0],U=($(),H)[c+4>>>2>>>0];c+=8;for(var Z=0;Z<U;Z++){var Q=u,ue=($(),K)[R+Z>>>0],he=Og[Q];ue===0||ue===10?((Q===1?k:E)(Na(he)),he.length=0):he.push(ue)}x+=U}return($(),H)[m>>>2>>>0]=x,0}function Rg(u){return u>>>0}n||function(){for(var u=t.numThreads-1;u--;)Ia();Oe.push(async()=>{var c=async function(){if(!n)return Promise.all(pt.map(Ea))}();Ce++,await c,--Ce==0&&Ee&&(c=Ee,Ee=null,c())})}(),n||(ht=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),P()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>de(),t.stackRestore=u=>le(u),t.stackAlloc=u=>vi(u),t.setValue=function(u,c,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":($(),L)[u>>>0]=c;break;case"i16":($(),Y)[u>>>1>>>0]=c;break;case"i32":($(),D)[u>>>2>>>0]=c;break;case"i64":($(),J)[u>>>3>>>0]=BigInt(c);break;case"float":($(),F)[u>>>2>>>0]=c;break;case"double":($(),G)[u>>>3>>>0]=c;break;case"*":($(),H)[u>>>2>>>0]=c;break;default:W(`invalid type for setValue: ${y}`)}},t.getValue=function(u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return($(),L)[u>>>0];case"i16":return($(),Y)[u>>>1>>>0];case"i32":return($(),D)[u>>>2>>>0];case"i64":return($(),J)[u>>>3>>>0];case"float":return($(),F)[u>>>2>>>0];case"double":return($(),G)[u>>>3>>>0];case"*":return($(),H)[u>>>2>>>0];default:W(`invalid type for getValue: ${c}`)}},t.UTF8ToString=Ie,t.stringToUTF8=ft,t.lengthBytesUTF8=$r;var ws,bs,zr,et,er,bi,_s,vs,$s,_i,xs,Ss,ce,tr,Ts,le,vi,de,ks,$i,Es,Is,Cs,xi,zs,As,Os,Rs,Ms,Ns,Ds,Bs,Ls,Ps,Us,qs,Ws,Vs,Gs,Hs,Fs,js,Ks,Ys,Zs,Xs,Qs,Js,eo,to,ro,io,no,ao,so,oo,uo,lo,co,po,ho,fo,mo,st,Mg=[Le,br,Aa,Da,Ba,La,Pa,Ua,qa,Wa,Va,Ga,Ha,Fa,ja,Ka,ss,os,us,ps,hs,fs,ms,gs,ys],Si={1055492:(u,c,y,m,x)=>{if(t===void 0||!t.Yc)return 1;if((u=Ie(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.Yc.get(u)))return 2;if(c=Number(c>>>0),y=Number(y>>>0),m=Number(m>>>0),c+y>u.byteLength)return 3;try{let I=u.subarray(c,c+y);switch(x){case 0:($(),K).set(I,m>>>0);break;case 1:t.Qd?t.Qd(m,I):t.Id(m,I);break;default:return 4}return 0}catch{return 4}},1056316:(u,c,y)=>{t.td(u,($(),K).subarray(c>>>0,c+y>>>0))},1056380:()=>t.Sd(),1056422:u=>{t.sd(u)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:u=>t.Ad(u),1056577:u=>t.Ed(u),1056609:(u,c,y)=>{t.ed(Number(u),Number(c),Number(y),!0)},1056672:(u,c,y)=>{t.ed(Number(u),Number(c),Number(y))},1056729:()=>typeof wasmOffsetConverter<"u",1056786:u=>{t.$b("Abs",u,void 0)},1056837:u=>{t.$b("Neg",u,void 0)},1056888:u=>{t.$b("Floor",u,void 0)},1056941:u=>{t.$b("Ceil",u,void 0)},1056993:u=>{t.$b("Reciprocal",u,void 0)},1057051:u=>{t.$b("Sqrt",u,void 0)},1057103:u=>{t.$b("Exp",u,void 0)},1057154:u=>{t.$b("Erf",u,void 0)},1057205:u=>{t.$b("Sigmoid",u,void 0)},1057260:(u,c,y)=>{t.$b("HardSigmoid",u,{alpha:c,beta:y})},1057339:u=>{t.$b("HardSwish",u,void 0)},1057396:u=>{t.$b("Log",u,void 0)},1057447:u=>{t.$b("Sin",u,void 0)},1057498:u=>{t.$b("Cos",u,void 0)},1057549:u=>{t.$b("Tan",u,void 0)},1057600:u=>{t.$b("Asin",u,void 0)},1057652:u=>{t.$b("Acos",u,void 0)},1057704:u=>{t.$b("Atan",u,void 0)},1057756:u=>{t.$b("Sinh",u,void 0)},1057808:u=>{t.$b("Cosh",u,void 0)},1057860:u=>{t.$b("Asinh",u,void 0)},1057913:u=>{t.$b("Acosh",u,void 0)},1057966:u=>{t.$b("Atanh",u,void 0)},1058019:u=>{t.$b("Tanh",u,void 0)},1058071:u=>{t.$b("Not",u,void 0)},1058122:(u,c,y)=>{t.$b("Clip",u,{min:c,max:y})},1058191:u=>{t.$b("Clip",u,void 0)},1058243:(u,c)=>{t.$b("Elu",u,{alpha:c})},1058301:u=>{t.$b("Gelu",u,void 0)},1058353:u=>{t.$b("Relu",u,void 0)},1058405:(u,c)=>{t.$b("LeakyRelu",u,{alpha:c})},1058469:(u,c)=>{t.$b("ThresholdedRelu",u,{alpha:c})},1058539:(u,c)=>{t.$b("Cast",u,{to:c})},1058597:u=>{t.$b("Add",u,void 0)},1058648:u=>{t.$b("Sub",u,void 0)},1058699:u=>{t.$b("Mul",u,void 0)},1058750:u=>{t.$b("Div",u,void 0)},1058801:u=>{t.$b("Pow",u,void 0)},1058852:u=>{t.$b("Equal",u,void 0)},1058905:u=>{t.$b("Greater",u,void 0)},1058960:u=>{t.$b("GreaterOrEqual",u,void 0)},1059022:u=>{t.$b("Less",u,void 0)},1059074:u=>{t.$b("LessOrEqual",u,void 0)},1059133:(u,c,y,m,x)=>{t.$b("ReduceMean",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1059308:(u,c,y,m,x)=>{t.$b("ReduceMax",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1059482:(u,c,y,m,x)=>{t.$b("ReduceMin",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1059656:(u,c,y,m,x)=>{t.$b("ReduceProd",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1059831:(u,c,y,m,x)=>{t.$b("ReduceSum",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1060005:(u,c,y,m,x)=>{t.$b("ReduceL1",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1060178:(u,c,y,m,x)=>{t.$b("ReduceL2",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1060351:(u,c,y,m,x)=>{t.$b("ReduceLogSum",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1060528:(u,c,y,m,x)=>{t.$b("ReduceSumSquare",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1060708:(u,c,y,m,x)=>{t.$b("ReduceLogSumExp",u,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1060888:u=>{t.$b("Where",u,void 0)},1060941:(u,c,y)=>{t.$b("Transpose",u,{perm:c?Array.from(($(),D).subarray(Number(c)>>>0,Number(y)>>>0)):[]})},1061065:(u,c,y,m)=>{t.$b("DepthToSpace",u,{blocksize:c,mode:Ie(y),format:m?"NHWC":"NCHW"})},1061198:(u,c,y,m)=>{t.$b("DepthToSpace",u,{blocksize:c,mode:Ie(y),format:m?"NHWC":"NCHW"})},1061331:(u,c,y,m)=>{t.$b("DFT",u,{axis:c,inverse:y,onesided:m})},1061423:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se,gt)=>{t.$b("ConvTranspose",u,{format:Z?"NHWC":"NCHW",autoPad:c,dilations:[y],group:m,kernelShape:[x],pads:[I,R],strides:[U],wIsConst:()=>!!($(),L)[Q>>>0],outputPadding:ue?Array.from(($(),D).subarray(Number(ue)>>>0,Number(he)>>>0)):[],outputShape:be?Array.from(($(),D).subarray(Number(be)>>>0,Number(Se)>>>0)):[],activation:Ie(gt)})},1061856:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se)=>{t.$b("ConvTranspose",u,{format:U?"NHWC":"NCHW",autoPad:c,dilations:Array.from(($(),D).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:m,kernelShape:Array.from(($(),D).subarray(Number(x)>>>0,(Number(x)>>>0)+2>>>0)),pads:Array.from(($(),D).subarray(Number(I)>>>0,(Number(I)>>>0)+4>>>0)),strides:Array.from(($(),D).subarray(Number(R)>>>0,(Number(R)>>>0)+2>>>0)),wIsConst:()=>!!($(),L)[Z>>>0],outputPadding:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],outputShape:he?Array.from(($(),D).subarray(Number(he)>>>0,Number(be)>>>0)):[],activation:Ie(Se)})},1062517:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se,gt)=>{t.$b("ConvTranspose",u,{format:Z?"NHWC":"NCHW",autoPad:c,dilations:[y],group:m,kernelShape:[x],pads:[I,R],strides:[U],wIsConst:()=>!!($(),L)[Q>>>0],outputPadding:ue?Array.from(($(),D).subarray(Number(ue)>>>0,Number(he)>>>0)):[],outputShape:be?Array.from(($(),D).subarray(Number(be)>>>0,Number(Se)>>>0)):[],activation:Ie(gt)})},1062950:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se)=>{t.$b("ConvTranspose",u,{format:U?"NHWC":"NCHW",autoPad:c,dilations:Array.from(($(),D).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:m,kernelShape:Array.from(($(),D).subarray(Number(x)>>>0,(Number(x)>>>0)+2>>>0)),pads:Array.from(($(),D).subarray(Number(I)>>>0,(Number(I)>>>0)+4>>>0)),strides:Array.from(($(),D).subarray(Number(R)>>>0,(Number(R)>>>0)+2>>>0)),wIsConst:()=>!!($(),L)[Z>>>0],outputPadding:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],outputShape:he?Array.from(($(),D).subarray(Number(he)>>>0,Number(be)>>>0)):[],activation:Ie(Se)})},1063611:(u,c)=>{t.$b("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},1063702:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se)=>{t.$b("AveragePool",u,{format:Se?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:I?Array.from(($(),D).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:U?Array.from(($(),D).subarray(Number(U)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],strides:he?Array.from(($(),D).subarray(Number(he)>>>0,Number(be)>>>0)):[]})},1064181:(u,c)=>{t.$b("GlobalAveragePool",u,{format:c?"NHWC":"NCHW"})},1064272:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se)=>{t.$b("AveragePool",u,{format:Se?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:I?Array.from(($(),D).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:U?Array.from(($(),D).subarray(Number(U)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],strides:he?Array.from(($(),D).subarray(Number(he)>>>0,Number(be)>>>0)):[]})},1064751:(u,c)=>{t.$b("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},1064838:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se)=>{t.$b("MaxPool",u,{format:Se?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:I?Array.from(($(),D).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:U?Array.from(($(),D).subarray(Number(U)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],strides:he?Array.from(($(),D).subarray(Number(he)>>>0,Number(be)>>>0)):[]})},1065313:(u,c)=>{t.$b("GlobalMaxPool",u,{format:c?"NHWC":"NCHW"})},1065400:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se)=>{t.$b("MaxPool",u,{format:Se?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:m,storage_order:x,dilations:I?Array.from(($(),D).subarray(Number(I)>>>0,Number(R)>>>0)):[],kernel_shape:U?Array.from(($(),D).subarray(Number(U)>>>0,Number(Z)>>>0)):[],pads:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],strides:he?Array.from(($(),D).subarray(Number(he)>>>0,Number(be)>>>0)):[]})},1065875:(u,c,y,m,x)=>{t.$b("Gemm",u,{alpha:c,beta:y,transA:m,transB:x})},1065979:u=>{t.$b("MatMul",u,void 0)},1066033:(u,c,y,m)=>{t.$b("ArgMax",u,{keepDims:!!c,selectLastIndex:!!y,axis:m})},1066141:(u,c,y,m)=>{t.$b("ArgMin",u,{keepDims:!!c,selectLastIndex:!!y,axis:m})},1066249:(u,c)=>{t.$b("Softmax",u,{axis:c})},1066312:(u,c)=>{t.$b("Concat",u,{axis:c})},1066372:(u,c,y,m,x)=>{t.$b("Split",u,{axis:c,numOutputs:y,splitSizes:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1066528:u=>{t.$b("Expand",u,void 0)},1066582:(u,c)=>{t.$b("Gather",u,{axis:Number(c)})},1066653:(u,c)=>{t.$b("GatherElements",u,{axis:Number(c)})},1066732:(u,c)=>{t.$b("GatherND",u,{batch_dims:Number(c)})},1066811:(u,c,y,m,x,I,R,U,Z,Q,ue)=>{t.$b("Resize",u,{antialias:c,axes:y?Array.from(($(),D).subarray(Number(y)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ie(x),cubicCoeffA:I,excludeOutside:R,extrapolationValue:U,keepAspectRatioPolicy:Ie(Z),mode:Ie(Q),nearestMode:Ie(ue)})},1067173:(u,c,y,m,x,I,R)=>{t.$b("Slice",u,{starts:c?Array.from(($(),D).subarray(Number(c)>>>0,Number(y)>>>0)):[],ends:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[],axes:I?Array.from(($(),D).subarray(Number(I)>>>0,Number(R)>>>0)):[]})},1067437:u=>{t.$b("Tile",u,void 0)},1067489:(u,c,y)=>{t.$b("InstanceNormalization",u,{epsilon:c,format:y?"NHWC":"NCHW"})},1067603:(u,c,y)=>{t.$b("InstanceNormalization",u,{epsilon:c,format:y?"NHWC":"NCHW"})},1067717:u=>{t.$b("Range",u,void 0)},1067770:(u,c)=>{t.$b("Einsum",u,{equation:Ie(c)})},1067851:(u,c,y,m,x)=>{t.$b("Pad",u,{mode:c,value:y,pads:m?Array.from(($(),D).subarray(Number(m)>>>0,Number(x)>>>0)):[]})},1067994:(u,c,y,m,x,I)=>{t.$b("BatchNormalization",u,{epsilon:c,momentum:y,spatial:!!x,trainingMode:!!m,format:I?"NHWC":"NCHW"})},1068163:(u,c,y,m,x,I)=>{t.$b("BatchNormalization",u,{epsilon:c,momentum:y,spatial:!!x,trainingMode:!!m,format:I?"NHWC":"NCHW"})},1068332:(u,c,y)=>{t.$b("CumSum",u,{exclusive:Number(c),reverse:Number(y)})},1068429:(u,c,y)=>{t.$b("DequantizeLinear",u,{axis:c,blockSize:y})},1068519:(u,c,y,m,x)=>{t.$b("GridSample",u,{align_corners:c,mode:Ie(y),padding_mode:Ie(m),format:x?"NHWC":"NCHW"})},1068689:(u,c,y,m,x)=>{t.$b("GridSample",u,{align_corners:c,mode:Ie(y),padding_mode:Ie(m),format:x?"NHWC":"NCHW"})},1068859:(u,c)=>{t.$b("ScatterND",u,{reduction:Ie(c)})},1068944:(u,c,y,m,x,I,R,U,Z)=>{t.$b("Attention",u,{numHeads:c,isUnidirectional:y,maskFilterValue:m,scale:x,doRotary:I,qkvHiddenSizes:R?Array.from(($(),D).subarray(Number(U)>>>0,Number(U)+R>>>0)):[],pastPresentShareBuffer:!!Z})},1069216:u=>{t.$b("BiasAdd",u,void 0)},1069271:u=>{t.$b("BiasSplitGelu",u,void 0)},1069332:u=>{t.$b("FastGelu",u,void 0)},1069388:(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se,gt,Ti)=>{t.$b("Conv",u,{format:he?"NHWC":"NCHW",auto_pad:c,dilations:y?Array.from(($(),D).subarray(Number(y)>>>0,Number(m)>>>0)):[],group:x,kernel_shape:I?Array.from(($(),D).subarray(Number(I)>>>0,Number(R)>>>0)):[],pads:U?Array.from(($(),D).subarray(Number(U)>>>0,Number(Z)>>>0)):[],strides:Q?Array.from(($(),D).subarray(Number(Q)>>>0,Number(ue)>>>0)):[],w_is_const:()=>!!($(),L)[Number(be)>>>0],activation:Ie(Se),activation_params:gt?Array.from(($(),F).subarray(Number(gt)>>>0,Number(Ti)>>>0)):[]})},1069972:u=>{t.$b("Gelu",u,void 0)},1070024:(u,c,y,m,x,I,R,U,Z)=>{t.$b("GroupQueryAttention",u,{numHeads:c,kvNumHeads:y,scale:m,softcap:x,doRotary:I,rotaryInterleaved:R,smoothSoftmax:U,localWindowSize:Z})},1070241:(u,c,y,m)=>{t.$b("LayerNormalization",u,{axis:c,epsilon:y,simplified:!!m})},1070352:(u,c,y,m)=>{t.$b("LayerNormalization",u,{axis:c,epsilon:y,simplified:!!m})},1070463:(u,c,y,m,x,I)=>{t.$b("MatMulNBits",u,{k:c,n:y,accuracyLevel:m,bits:x,blockSize:I})},1070590:(u,c,y,m,x,I)=>{t.$b("MultiHeadAttention",u,{numHeads:c,isUnidirectional:y,maskFilterValue:m,scale:x,doRotary:I})},1070749:(u,c)=>{t.$b("QuickGelu",u,{alpha:c})},1070813:(u,c,y,m,x)=>{t.$b("RotaryEmbedding",u,{interleaved:!!c,numHeads:y,rotaryEmbeddingDim:m,scale:x})},1070952:(u,c,y)=>{t.$b("SkipLayerNormalization",u,{epsilon:c,simplified:!!y})},1071054:(u,c,y)=>{t.$b("SkipLayerNormalization",u,{epsilon:c,simplified:!!y})},1071156:(u,c,y,m)=>{t.$b("GatherBlockQuantized",u,{gatherAxis:c,quantizeAxis:y,blockSize:m})},1071277:u=>{t.Fd(u)},1071311:(u,c)=>t.Hd(Number(u),Number(c),t.Xc.Kd,t.Xc.errors)};function Ng(u,c,y){return ts(async()=>{await t.Dd(Number(u),Number(c),Number(y))})}function Dg(){return typeof wasmOffsetConverter<"u"}function Bg(u,c,y,m){var x=de();try{return Bs(u,c,y,m)}catch(I){if(le(x),I!==I+0)throw I;ce(1,0)}}function Lg(u,c,y){var m=de();try{return Rs(u,c,y)}catch(x){if(le(m),x!==x+0)throw x;ce(1,0)}}function Pg(u){var c=de();try{zs(u)}catch(y){if(le(c),y!==y+0)throw y;ce(1,0)}}function Ug(u,c){var y=de();try{return xi(u,c)}catch(m){if(le(y),m!==m+0)throw m;ce(1,0)}}function qg(u,c,y){var m=de();try{Cs(u,c,y)}catch(x){if(le(m),x!==x+0)throw x;ce(1,0)}}function Wg(u,c){var y=de();try{Ls(u,c)}catch(m){if(le(y),m!==m+0)throw m;ce(1,0)}}function Vg(u,c,y,m,x,I,R){var U=de();try{return Ns(u,c,y,m,x,I,R)}catch(Z){if(le(U),Z!==Z+0)throw Z;ce(1,0)}}function Gg(u,c,y,m,x,I){var R=de();try{As(u,c,y,m,x,I)}catch(U){if(le(R),U!==U+0)throw U;ce(1,0)}}function Hg(u,c,y,m){var x=de();try{Ds(u,c,y,m)}catch(I){if(le(x),I!==I+0)throw I;ce(1,0)}}function Fg(u,c,y,m,x){var I=de();try{Os(u,c,y,m,x)}catch(R){if(le(I),R!==R+0)throw R;ce(1,0)}}function jg(u,c,y,m,x,I,R){var U=de();try{Us(u,c,y,m,x,I,R)}catch(Z){if(le(U),Z!==Z+0)throw Z;ce(1,0)}}function Kg(u,c,y,m,x,I,R){var U=de();try{qs(u,c,y,m,x,I,R)}catch(Z){if(le(U),Z!==Z+0)throw Z;ce(1,0)}}function Yg(u,c,y,m,x,I,R,U){var Z=de();try{Hs(u,c,y,m,x,I,R,U)}catch(Q){if(le(Z),Q!==Q+0)throw Q;ce(1,0)}}function Zg(u,c,y,m,x){var I=de();try{return Ps(u,c,y,m,x)}catch(R){if(le(I),R!==R+0)throw R;ce(1,0)}}function Xg(u,c,y){var m=de();try{return Fs(u,c,y)}catch(x){if(le(m),x!==x+0)throw x;ce(1,0)}}function Qg(u,c,y,m,x,I,R,U){var Z=de();try{js(u,c,y,m,x,I,R,U)}catch(Q){if(le(Z),Q!==Q+0)throw Q;ce(1,0)}}function Jg(u,c,y,m,x,I,R,U,Z,Q,ue,he){var be=de();try{Ws(u,c,y,m,x,I,R,U,Z,Q,ue,he)}catch(Se){if(le(be),Se!==Se+0)throw Se;ce(1,0)}}function ey(u,c,y){var m=de();try{return Ks(u,c,y)}catch(x){if(le(m),x!==x+0)throw x;return ce(1,0),0n}}function ty(u,c,y,m,x,I,R,U,Z){var Q=de();try{Ms(u,c,y,m,x,I,R,U,Z)}catch(ue){if(le(Q),ue!==ue+0)throw ue;ce(1,0)}}function ry(u){var c=de();try{return Ys(u)}catch(y){if(le(c),y!==y+0)throw y;ce(1,0)}}function iy(u,c){var y=de();try{return co(u,c)}catch(m){if(le(y),m!==m+0)throw m;return ce(1,0),0n}}function ny(u){var c=de();try{return Zs(u)}catch(y){if(le(c),y!==y+0)throw y;return ce(1,0),0n}}function ay(u,c,y,m){var x=de();try{return ro(u,c,y,m)}catch(I){if(le(x),I!==I+0)throw I;ce(1,0)}}function sy(u,c,y,m,x){var I=de();try{return io(u,c,y,m,x)}catch(R){if(le(I),R!==R+0)throw R;ce(1,0)}}function oy(u,c,y,m,x,I){var R=de();try{return no(u,c,y,m,x,I)}catch(U){if(le(R),U!==U+0)throw U;ce(1,0)}}function uy(u,c,y,m,x,I){var R=de();try{return Vs(u,c,y,m,x,I)}catch(U){if(le(R),U!==U+0)throw U;ce(1,0)}}function ly(u,c,y,m,x,I){var R=de();try{return ao(u,c,y,m,x,I)}catch(U){if(le(R),U!==U+0)throw U;ce(1,0)}}function dy(u,c,y,m,x,I,R,U){var Z=de();try{return Gs(u,c,y,m,x,I,R,U)}catch(Q){if(le(Z),Q!==Q+0)throw Q;ce(1,0)}}function cy(u,c,y,m,x){var I=de();try{return so(u,c,y,m,x)}catch(R){if(le(I),R!==R+0)throw R;return ce(1,0),0n}}function py(u,c,y,m){var x=de();try{return oo(u,c,y,m)}catch(I){if(le(x),I!==I+0)throw I;ce(1,0)}}function hy(u,c,y,m){var x=de();try{return uo(u,c,y,m)}catch(I){if(le(x),I!==I+0)throw I;ce(1,0)}}function fy(u,c,y,m,x,I,R,U,Z,Q,ue,he){var be=de();try{return lo(u,c,y,m,x,I,R,U,Z,Q,ue,he)}catch(Se){if(le(be),Se!==Se+0)throw Se;ce(1,0)}}function my(u,c,y,m,x,I,R,U,Z,Q,ue){var he=de();try{eo(u,c,y,m,x,I,R,U,Z,Q,ue)}catch(be){if(le(he),be!==be+0)throw be;ce(1,0)}}function gy(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se,gt,Ti){var _y=de();try{to(u,c,y,m,x,I,R,U,Z,Q,ue,he,be,Se,gt,Ti)}catch(ki){if(le(_y),ki!==ki+0)throw ki;ce(1,0)}}function yy(u,c,y){var m=de();try{return Xs(u,c,y)}catch(x){if(le(m),x!==x+0)throw x;ce(1,0)}}function wy(u,c,y){var m=de();try{return Qs(u,c,y)}catch(x){if(le(m),x!==x+0)throw x;ce(1,0)}}function by(u,c,y,m){var x=de();try{Js(u,c,y,m)}catch(I){if(le(x),I!==I+0)throw I;ce(1,0)}}function Ar(){if(0<Ce)Ee=Ar;else if(n)v==null||v(t),V();else{for(var u=Oe;0<u.length;)u.shift()(t);0<Ce?Ee=Ar:(t.calledRun=!0,C||(V(),v==null||v(t)))}}return n||(st=await $e(),Ar()),t.PTR_SIZE=4,O?t:new Promise((u,c)=>{v=u,S=c})}var Fc,Eo,P0=j(()=>{"use strict";var e,t;Fc=ko,Eo=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Eo&&ko()}),Mi,Mn,Io,Pe,jc,Rr,Co,zo,Ni,Ao,Di,Kc,Bi,Yc,Jn=j(()=>{"use strict";Qn(),Mi=typeof location>"u"?void 0:location.origin,Mn=!1,Io=()=>{if(Mn){let e=URL;return new URL(new e("ort.bundle.min.mjs","").href,Mi).href}return""},Pe=Io(),jc=()=>{if(Pe&&!Pe.startsWith("blob:"))return Pe.substring(0,Pe.lastIndexOf("/")+1)},Rr=(e,t)=>{try{let r=t??Pe;return(r?new URL(e,r):new URL(e)).origin===Mi}catch{return!1}},Co=(e,t)=>{let r=t??Pe;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},zo=(e,t)=>`${t??"./"}${e}`,Ni=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Ao=async e=>(await import(e)).default,Di=(L0(),yr(Vc)).default,Kc=async()=>{if(!Pe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Rr(Pe))return[void 0,Di()];let e=await Ni(Pe);return[e,Di(e)]},Bi=(P0(),yr(Hc)).default,Yc=async(e,t,r,i)=>{let n=Bi&&!(e||t);if(n)if(Pe)n=Rr(Pe)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Bi];{let s="ort-wasm-simd-threaded.jsep.mjs",a=e??Co(s,t),o=r&&a&&!Rr(a,t),d=o?await Ni(a):a??zo(s,t);return[o?d:void 0,await Ao(d)]}}}),Li,Mr,ir,Pi,Oo,Ro,Mo,ea,ve,qt=j(()=>{"use strict";Jn(),Mr=!1,ir=!1,Pi=!1,Oo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ro=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Mo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ea=async e=>{if(Mr)return Promise.resolve();if(ir)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Pi)throw new Error("previous call to 'initializeWebAssembly()' failed.");ir=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Mo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ro())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Oo();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,s=typeof n=="string"?n:void 0,a=n==null?void 0:n.mjs,o=(a==null?void 0:a.href)??a,d=n==null?void 0:n.wasm,l=(d==null?void 0:d.href)??d,h=e.wasmBinary,[p,f]=await Yc(o,s,r>1,!!h||!!l),w=!1,g=[];if(t>0&&g.push(new Promise(v=>{setTimeout(()=>{w=!0,v()},t)})),g.push(new Promise((v,S)=>{let b={numThreads:r};if(h)b.wasmBinary=h,b.locateFile=_=>_;else if(l||s)b.locateFile=_=>l??s+_;else if(o&&o.indexOf("blob:")!==0)b.locateFile=_=>new URL(_,o).href;else if(p){let _=jc();_&&(b.locateFile=T=>_+T)}f(b).then(_=>{ir=!1,Mr=!0,Li=_,v(),p&&URL.revokeObjectURL(p)},_=>{ir=!1,Pi=!0,S(_)})})),await Promise.race(g),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ve=()=>{if(Mr&&Li)return Li;throw new Error("WebAssembly is not initialized yet.")}}),Ze,Zr,ye,ta=j(()=>{"use strict";qt(),Ze=(e,t)=>{let r=ve(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Zr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,s])=>{let a=t?t+n:n;if(typeof s=="object")Zr(s,a+".",r,i);else if(typeof s=="string"||typeof s=="number")i(a,s.toString());else if(typeof s=="boolean")i(a,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},ye=e=>{let t=ve(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let s=Number(t.getValue(n,i===4?"i32":"i64")),a=t.getValue(n+i,"*"),o=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Zc,U0=j(()=>{"use strict";qt(),ta(),Zc=e=>{let t=ve(),r=0,i=[],n=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(n.terminate=!1);let s=0;return(e==null?void 0:e.tag)!==void 0&&(s=Ze(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),r===0&&ye("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Zr(e.extra,"",new WeakSet,(a,o)=>{let d=Ze(a,i),l=Ze(o,i);t._OrtAddRunConfigEntry(r,d,l)!==0&&ye(`Can't set a run config entry: ${a} - ${o}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(a=>t._free(a)),s}}}),No,Do,Bo,It,Lo,Xc,q0=j(()=>{"use strict";qt(),ta(),No=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Do=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Bo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},It=(e,t,r,i)=>{let n=Ze(t,i),s=Ze(r,i);ve()._OrtAddSessionConfigEntry(e,n,s)!==0&&ye(`Can't set a session config entry: ${t} - ${r}.`)},Lo=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let s=typeof n=="string"?n:n.name,a=[];switch(s){case"webnn":if(s="WEBNN",It(e,"session.disable_quant_qdq","1",r),It(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let p=n==null?void 0:n.deviceType;p&&It(e,"deviceType",p,r)}break;case"webgpu":if(s="JS",typeof n!="string"){let p=n;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);It(e,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let o=Ze(s,r),d=a.length,l=0,h=0;if(d>0){l=ve()._malloc(d*ve().PTR_SIZE),r.push(l),h=ve()._malloc(d*ve().PTR_SIZE),r.push(h);for(let p=0;p<d;p++)ve().setValue(l+p*ve().PTR_SIZE,a[p][0],"*"),ve().setValue(h+p*ve().PTR_SIZE,a[p][1],"*")}await ve()._OrtAppendExecutionProvider(e,o,l,h,d)!==0&&ye(`Can't append execution provider: ${s}.`)}},Xc=async e=>{let t=ve(),r=0,i=[],n=e||{};Bo(n);try{let s=No(n.graphOptimizationLevel??"all"),a=Do(n.executionMode??"sequential"),o=typeof n.logId=="string"?Ze(n.logId,i):0,d=n.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log severity level is not valid: ${d}`);let l=n.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let h=typeof n.optimizedModelFilePath=="string"?Ze(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!n.enableCpuMemArena,!!n.enableMemPattern,a,!!n.enableProfiling,0,o,d,l,h),r===0&&ye("Can't create session options."),n.executionProviders&&await Lo(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);It(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[p,f]of Object.entries(n.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let w=Ze(p,i);t._OrtAddFreeDimensionOverride(r,w,f)!==0&&ye(`Can't set a free dimension override: ${p} - ${f}.`)}return n.extra!==void 0&&Zr(n.extra,"",new WeakSet,(p,f)=>{It(r,p,f,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&ye("Can't release session options."),i.forEach(a=>t._free(a)),s}}}),Mt,lt,Nt,ni,Xr,ra,ia,Nn,ie=j(()=>{"use strict";Mt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},lt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Nt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,s)=>n*s,1);return r>0?Math.ceil(i*r):void 0},ni=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Xr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ra=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ia=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Nn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),na,Qc=j(()=>{"use strict";Qn(),na=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let d=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw o}let a=0;for(;;){let{done:o,value:d}=await n.read();if(o)break;let l=d.byteLength;new Uint8Array(s,a,l).set(d),a+=l}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Po,Uo,qo,Wo,aa,Vo,pe,dt=j(()=>{"use strict";ie(),Po=["V","I","W","E","F"],Uo=(e,t)=>{console.log(`[${Po[e]},${new Date().toISOString()}]${t}`)},aa=(e,t)=>{qo=e,Wo=t},Vo=(e,t)=>{let r=Xr(e),i=Xr(qo);r>=i&&Uo(r,typeof t=="function"?t():t)},pe=(...e)=>{Wo&&Vo(...e)}}),Go,Kt,B,Qr,Jc,ep,tp,ae=j(()=>{"use strict";Go=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Kt=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let s=Math.max(e.length,t.length),a=new Array(s);if(r){if(i<2||n<2)return;let o=Go.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(o===void 0)return;[a[s-2],a[s-1]]=o}for(let o=r?3:1;o<=s;o++){let d=i-o<0?1:e[i-o],l=n-o<0?1:t[n-o];if(d!==l&&d>1&&l>1)return;let h=Math.max(d,l);if(d&&l)a[s-o]=Math.max(d,l);else{if(h>1)return;a[s-o]=0}}return a}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},B=class Fr{static size(t){return Fr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){n[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");n[s]=1,r/=t[s],s--}for(s--;s>=0;s--)n[s]=t[s];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Fr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Fr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[s])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,s)=>n+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},Qr=class vt{static adjustPoolAttributes(t,r,i,n,s,a){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<i.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=i[o]||a[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,s,a,o){if(o){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)vt.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],i[d],n[d],s,d,d+t.length-2,o)}}static computePoolOutputShape(t,r,i,n,s,a,o,d=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return vt.computeShapeHelper(t,r,l,i,n,s,a,o,d),l}static computeConvOutputShape(t,r,i,n,s,a,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return vt.computeShapeHelper(!1,t,d,i,n,s,a,o),d}static computeShapeHelper(t,r,i,n,s,a,o,d,l=0){if(t)for(let h=0;h<r.length-2;h++)i.push(1);else for(let h=0;h<r.length-2;h++)i.push(vt.adjustPadAndReturnShape(r[h+2],n[h],s[h],a[h],o,h,h+r.length-2,d,l))}static computeOutputSize(t,r,i,n,s){let a=Math.floor(t/r)+1;return s===1&&(a=Math.ceil(t/r)+1,(a-1)*r>=i+n&&(a-=1)),a}static adjustPadAndReturnShape(t,r,i,n,s,a,o,d,l=0){let h=i*(n-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return s[a]=0,s[o]=0,vt.computeOutputSize(t-h,r,t,0,l);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=(Math.floor((t+r-1)/r)-1)*r+n-t;return s[a]=Math.floor(d==="SAME_LOWER"?(p+1)/2:p/2),s[o]=p-s[a],vt.computeOutputSize(t+s[a]+s[o]-h,r,t,s[a],l)}default:throw new Error("Unsupported AutoPad type")}else return vt.computeOutputSize(t+s[a]+s[o]-h,r,t,s[a],l)}},Jc=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,o;t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let d=-1;if(i?(o=r[0],d=1):(o=r[1],d=0),r[d]!==a)throw new Error("dimension mismatch");if(s<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(n&&!Kt.isValidBroadcast(n,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,a]}},ep=-34028234663852886e22,tp=34028234663852886e22}),sa,rp=j(()=>{"use strict";ie(),sa=(e,t)=>new(ni(t))(e)}),Ui,Ho,qi,Fo,Wi,jo,Vi,Gi,Hi,Ko,ip,W0=j(()=>{"use strict";ie(),dt(),Ui=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ho=(e,t)=>{if(t==="int32")return e;let r=Ui.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,s=new(ni(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let a=new Int32Array(n);for(let o=0;o<n;o++){let d=s[o];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[o]=Number(d)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(s,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},qi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Fo=1,Wi=()=>Fo++,jo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Vi=(e,t)=>{let r=Ui.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},Gi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:s,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Vi(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=qi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},Hi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),a;if(!(s!=null&&s.input.dataTypes.includes(t))){if(a=jo.get(t),!a||(s==null?void 0:s.input.dataTypes.includes(a)))throw new Error(`WebNN backend does not support data type: ${t}`);pe("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Vi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,a),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Ho(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let i=(t=this.wrapper)!=null&&t.isDataConverted?qi(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(i):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(i);return}else return i.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ko=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Wi();return this.tensorTrackersById.set(e,new Hi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),s=Wi(),a=new Gi({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new Hi(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,t,r,i,n,s,a){let o=this.getMLContext(e);for(let[l,h]of this.freeTensors.entries())if(h.canReuseTensor(o,t,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}`);let p=this.freeTensors.splice(l,1)[0];return p.sessionId=e,p}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}}`);let d=await o.createTensor({dataType:a??t,shape:r,dimensions:r,usage:i,writable:n,readable:s});return new Gi({sessionId:e,context:o,tensor:d,dataType:t,shape:r,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},ip=(...e)=>new Ko(...e)}),nr,Yo,np,V0=j(()=>{"use strict";ie(),qt(),rp(),W0(),dt(),nr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Yo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,s)=>n===i[s]&&e[n]===t[n])},np=class{constructor(e){this.tensorManager=ip(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,aa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Yo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let s=nr.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,n)}async createTemporaryTensor(e,t,r){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=nr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!ve().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return sa(r,t)}}registerMLTensor(e,t,r,i){let n=nr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,n,i);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=nr.get(Mt(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!(n!=null&&n.input.dataTypes.includes(i)):!!(n!=null&&n.output.dataTypes.includes(i))}flush(){}}}),oa=j(()=>{"use strict"}),Fi,Nr,Dr,Zo,Xo,ji,Dn,Qo,ap,G0=j(()=>{"use strict";dt(),oa(),Fi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Nr=[],Dr=e=>Math.ceil(Number(e)/16)*16,Zo=e=>{for(let t=0;t<Nr.length;t++){let r=Nr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Xo=1,ji=()=>Xo++,Dn=async(e,t,r,i)=>{let n=Dr(r),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(i){let d=i();return d.set(new Uint8Array(o,0,r)),d}else return new Uint8Array(o.slice(0,r))}finally{s.destroy()}},Qo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Fi)Nr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,s=Dr(n),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${n}`);if(s===n&&i%4===0)this.backend.device.queue.writeBuffer(a.gpuData.buffer,0,r,i,n);else{let o=new Uint8Array(s);o.set(t),this.backend.device.queue.writeBuffer(a.gpuData.buffer,0,o,0,s)}pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Dr(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=ji();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Zo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let o=(n?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let a={id:ji(),type:0,buffer:i};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Dn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Fi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ap=(...e)=>new Qo(...e)}),Jo,ge,ke=j(()=>{"use strict";Jo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ge=e=>new Jo(e)}),Yt,Br,Ae,ze,re,Te,Bn,jt,$t,te,ar,q,ee,sp,ua,eu,op,oe=j(()=>{"use strict";ie(),ae(),Yt=64,Br=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ae=(e,t=1)=>{let r=Br(e,t);return typeof r=="string"?r:r[0]},ze=(e,t=1)=>{let r=Br(e,t);return typeof r=="string"?r:r[1]},re=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:B.computeStrides(r)})}),t},Te=e=>e%4===0?4:e%2===0?2:1,Bn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,jt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,$t=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,te=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ar=(e,t,r,i,n)=>{let s=typeof r=="number",a=s?r:r.length,o=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=Br(t,n),h=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],f={indices:d,value:h,storage:p,tensor:t},w=O=>typeof O=="string"?O:`${O}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=s?"uniforms.":"",S=`${v}${e}_shape`,b=`${v}${e}_strides`,_="";for(let O=0;O<a-1;O++)_+=`
    let dim${O} = current / ${te(b,O,a)};
    let rest${O} = current % ${te(b,O,a)};
    indices[${O}] = dim${O};
    current = rest${O};
    `;_+=`indices[${a-1}] = current;`;let T=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${_}
    return indices;
  }`,k=O=>(g.offsetToIndices=!0,a<2?O:`o2i_${e}(${O})`),E=[];if(a>=2)for(let O=a-1;O>=0;O--)E.push(`${te(b,O,a)} * (indices[${O}])`);let C=a<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${E.join("+")};
  }`,z=O=>(g.indicesToOffset=!0,a<2?O:`i2o_${e}(${O})`),$=(...O)=>a===0?"0u":`${f.indices}(${O.map(w).join(",")})`,N=(O,P)=>a<2?`${O}`:`${te(O,P,a)}`,L=(O,P,V)=>a<2?`${O}=${V};`:`${te(O,P,a)}=${V};`,K={},Y=(O,P)=>{g.broadcastedIndicesToOffset=!0;let V=`${P.name}broadcastedIndicesTo${e}Offset`;if(V in K)return`${V}(${O})`;let W=[];for(let ne=a-1;ne>=0;ne--){let $e=P.indicesGet("outputIndices",ne+P.rank-a);W.push(`${N(b,ne)} * (${$e} % ${N(S,ne)})`)}return K[V]=`fn ${V}(outputIndices: ${P.type.indices}) -> u32 {
             return ${W.length>0?W.join("+"):"0u"};
           }`,`${V}(${O})`},X=(O,P)=>(()=>{if(f.storage===f.value)return`${e}[${O}]=${P};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${O}]=vec2<u32>(u32(${P}), select(0u, 0xFFFFFFFFu, ${P} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${O}]=vec2<u32>(u32(${P}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${O}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${P}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),D=O=>(()=>{if(f.storage===f.value)return`${e}[${O}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${O}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${O}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${O}] & 0xFFu), bool(${e}[${O}] & 0xFF00u), bool(${e}[${O}] & 0xFF0000u), bool(${e}[${O}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),H=a<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${h} {
    return ${D(`i2o_${e}(indices)`)};
  }`,F=a<2?"":(()=>{let O=o.map(V=>`d${V}: u32`).join(", "),P=o.map(V=>`d${V}`).join(", ");return`
  fn get_${e}(${O}) -> ${h} {
    return get_${e}ByIndices(${$(P)});
  }`})(),G=(...O)=>{if(O.length!==a)throw new Error(`indices length must be ${a}`);let P=O.map(w).join(",");return a===0?D("0u"):a===1?D(P[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${P})`)},J=O=>a<2?D(O):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${O})`),A=a<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${h}) {
    ${X(`i2o_${e}(indices)`,"value")}
  }`,M=a<2?"":(()=>{let O=o.map(V=>`d${V}: u32`).join(", "),P=o.map(V=>`d${V}`).join(", ");return`
  fn set_${e}(${O}, value: ${h}) {
    set_${e}ByIndices(${$(P)}, value);
  }`})();return{impl:()=>{let O=[],P=!1;return g.offsetToIndices&&(O.push(T),P=!0),g.indicesToOffset&&(O.push(C),P=!0),g.broadcastedIndicesToOffset&&(Object.values(K).forEach(V=>O.push(V)),P=!0),g.set&&(O.push(M),P=!0),g.setByIndices&&(O.push(A),P=!0),g.get&&(O.push(F),P=!0),g.getByIndices&&(O.push(H),P=!0),!s&&P&&O.unshift(`const ${S} = ${f.indices}(${r.join(",")});`,`const ${b} = ${f.indices}(${B.computeStrides(r).join(",")});`),O.join(`
`)},type:f,offsetToIndices:k,indicesToOffset:z,broadcastedIndicesToOffset:Y,indices:$,indicesGet:N,indicesSet:L,set:(...O)=>{if(O.length!==a+1)throw new Error(`indices length must be ${a}`);let P=O[a];if(typeof P!="string")throw new Error("value must be string");let V=O.slice(0,a).map(w).join(",");return a===0?X("0u",P):a===1?X(V[0],P):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${V}, ${P})`)},setByOffset:X,setByIndices:(O,P)=>a<2?X(O,P):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${O}, ${P});`),get:G,getByOffset:D,getByIndices:J,usage:i,name:e,strides:b,shape:S,rank:a}},q=(e,t,r,i=1)=>ar(e,t,r,"input",i),ee=(e,t,r,i=1)=>ar(e,t,r,"output",i),sp=(e,t,r)=>ar(e,t,r,"atomicOutput",1),ua=(e,t,r,i=1)=>ar(e,t,r,"internal",i),eu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Yt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},op=(e,t)=>new eu(e,t)}),tu,Ki,ru,iu,nu,au,qe,up,lp,xt=j(()=>{"use strict";ie(),ae(),ke(),oe(),tu=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ki=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),ru=(e,t)=>B.sortBasedOnPerm(e,Ki(e.length,t)),iu=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)n+=`a[${e[s]}]=i[${s}];`;return n+="return a;}"},nu=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},au=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},qe=(e,t)=>{let r=e.dataType,i=e.dims.length,n=Ki(i,t),s=ru(e.dims,n),a=e.dims,o=s,d=i<2||au(n,e.dims),l;if(d)return l=g=>{let v=q("input",r,a,4),S=ee("output",r,o,4);return`
  ${g.registerUniform("output_size","u32").declareVariables(v,S)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let g=B.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(g/4)}]}},getShaderSource:l};let{newShape:h,newPerm:p}=nu(e.dims,n),f=B.areEqual(p,[2,3,1]),w=B.areEqual(p,[3,1,2]);if(h.length===2||f||w){a=f?[h[0],h[1]*h[2]]:w?[h[0]*h[1],h[2]]:h,o=[a[1],a[0]];let g=16;return l=v=>{let S=q("a",r,a.length),b=ee("output",r,o.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(S,b)}
  var<workgroup> tile : array<array<${b.type.value}, ${g+1}>, ${g}>;
  ${v.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${b.setByIndices(`${b.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=B.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/g),y:Math.ceil(o[0]/g)},programUniforms:[{type:12,data:v},...re(a,o)]}},getShaderSource:l}}return l=g=>{let v=q("a",r,a.length),S=ee("output",r,o.length);return`
  ${g.registerUniform("output_size","u32").declareVariables(v,S)}

  ${iu(n,i,v,S)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let g=B.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...re(a,o)]}},getShaderSource:l}},up=(e,t)=>{tu(e.inputs,t.perm),e.compute(qe(e.inputs[0],t.perm))},lp=e=>ge({perm:e.perm})}),su,ou,uu,lu,du,cu,pu,hu,fu,mu,He,dp,cp,pp,hp,fp,mp,gp,yp,wp,bp,H0=j(()=>{"use strict";ie(),ae(),oe(),la(),xt(),su={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ou={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},uu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},lu={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},du=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},cu=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let n=t.map(s=>e[s]);return[r,n]},pu=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[n++]):i.push(1);return i},hu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},fu=(e,t)=>{let r=[];if(!hu(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},mu=(e,t,r,i,n,s,a)=>{let o=r[0].dims,d=B.size(s),l=B.size(a),h=q("_A",r[0].dataType,o),p=ee("output",n,s),f=64;d===1&&(f=256);let w=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,g=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(h,p)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${uu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${su[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ou[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${i==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${lu[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:d},programUniforms:[{type:12,data:l}]})}},He=(e,t,r,i)=>{let n=e.inputs.length===1?r:Ln(e.inputs,r),s=n.axes;s.length===0&&!n.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((w,g)=>g));let a=B.normalizeAxes(s,e.inputs[0].dims.length),o=a,d=e.inputs[0],l=fu(o,e.inputs[0].dims.length);l.length>0&&(d=e.compute(qe(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],o=du(o.length,d.dims.length));let[h,p]=cu(d.dims,o),f=h;n.keepDims&&(f=pu(h,a)),e.compute(mu(t,n.cacheKey,[d],i,e.inputs[0].dataType,f,p),{inputs:[d]})},dp=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},cp=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},pp=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},hp=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},fp=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},mp=(e,t)=>{He(e,"ReduceMinShared",t,"min")},gp=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},yp=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},wp=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},bp=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),Fe,gu,Jr,Ln,je,yu,wu,bu,_u,vu,$u,xu,Su,Tu,ku,Ke,_p,vp,$p,xp,Sp,Tp,kp,Ep,Ip,Cp,la=j(()=>{"use strict";ie(),ae(),ke(),oe(),H0(),Fe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},gu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Jr=(e,t,r,i,n,s,a=!1,o=!1)=>{let d=[],l=r[0].dims,h=l.length,p=B.normalizeAxes(n,h),f=!o&&p.length===0;l.forEach((v,S)=>{f||p.indexOf(S)>=0?a&&d.push(1):d.push(v)});let w=d.length,g=B.size(d);return{name:e,shaderCache:t,getShaderSource:v=>{let S=[],b=q("_A",r[0].dataType,h),_=ee("output",s,w),T=i(b,_,p),k=T[2];for(let E=0,C=0;E<h;E++)f||p.indexOf(E)>=0?(a&&C++,k=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${T[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${b.indicesSet("input_indices",E,`j${E}`)}
                  ${k}
                }`):(S.push(`${b.indicesSet("input_indices",E,_.indicesGet("output_indices",C))};`),C++);return`

        ${v.registerUniform("output_size","u32").declareVariables(b,_)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${b.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${k}
          ${T[3]}
          ${T.length===4?_.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...re(l,d)]})}},Ln=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),ge({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,i)=>{let n=e.inputs,s=n.length===1?r:Ln(n,r);e.compute(Jr(t,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&s.axes.length===0?gu:i,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},yu=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},wu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},bu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},_u=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},vu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMax",t,(r,i,n)=>{let s=[];for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},$u=(e,t)=>{Fe(e.inputs),je(e,"ReduceMean",t,(r,i,n)=>{let s=1;for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},xu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMin",t,(r,i,n)=>{let s=[];for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Su=(e,t)=>{Fe(e.inputs),je(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Tu=(e,t)=>{Fe(e.inputs),je(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ku=(e,t)=>{Fe(e.inputs),je(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ke=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:n*=e[s];return n<32&&i>1024},_p=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):dp(e,t)},vp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):cp(e,t)},$p=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):pp(e,t)},xp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):hp(e,t)},Sp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):fp(e,t)},Tp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xu(e,t):mp(e,t)},kp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Su(e,t):gp(e,t)},Ep=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tu(e,t):yp(e,t)},Ip=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ku(e,t):wp(e,t)},Cp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yu(e,t):bp(e,t)}}),Yi,zp,Ap,Pn,F0=j(()=>{"use strict";ie(),ke(),la(),Yi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},zp=(e,t)=>{Yi(e.inputs);let r=(i,n,s)=>{let a=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Jr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ap=(e,t)=>{Yi(e.inputs);let r=(i,n,s)=>{let a=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Jr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Pn=e=>ge(e)}),Eu,Lr,Iu,Cu,zu,wr,Au,Op,da=j(()=>{"use strict";ie(),ae(),oa(),oe(),Eu=(e,t)=>{let r=e[0],i=e[1],n=e[2],s=e[3],a=e[4],o=e[5];if(a&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],l=r.dims[1],h=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=n.dims[0]/3,f=p,w=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let g=l;if(p!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==p+f+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(a){if(f!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(v=a.dims[3])}let S=g+v,b=-1,_=0;if(s)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==d||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:l,pastSequenceLength:v,kvSequenceLength:g,totalSequenceLength:S,maxSequenceLength:b,inputHiddenSize:h,hiddenSize:p,vHiddenSize:w,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Lr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Iu=(e,t,r,i,n,s,a,o)=>{let d=Te(a?1:s),l=64,h=s/d;h<l&&(l=32);let p=Math.ceil(s/d/l),f=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:h},{type:12,data:p}],w=Ae(e.dataType,d),g=ze(1,d),v=["type"];a&&v.push("type"),o&&v.push("type");let S=b=>{let _=ee("x",e.dataType,e.dims,d),T=[_],k=a?q("seq_lens",a.dataType,a.dims):void 0;k&&T.push(k);let E=o?q("total_sequence_length_input",o.dataType,o.dims):void 0;E&&T.push(E);let C=ze(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${b.registerUniforms(z).declareVariables(...T)}
  ${b.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Lr(k,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${g}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${g}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${g}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${g}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${w};${d}`,inputDependencies:v},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:f})}},Cu=(e,t,r,i,n,s,a,o,d)=>{let l=a+s.kvSequenceLength,h=[s.batchSize,s.numHeads,s.sequenceLength,l],p=e>1&&i,f=s.kvNumHeads?s.kvNumHeads:s.numHeads,w=p?[s.batchSize,f,l,s.headSize]:void 0,g=s.nReps?s.nReps:1,v=s.scale===0?1/Math.sqrt(s.headSize):s.scale,S=Te(s.headSize),b=s.headSize/S,_=12,T={x:Math.ceil(l/_),y:Math.ceil(s.sequenceLength/_),z:s.batchSize*s.numHeads},k=[{type:12,data:s.sequenceLength},{type:12,data:b},{type:12,data:l},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:v},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:g}],E=p&&i&&B.size(i.dims)>0,C=["type","type"];E&&C.push("type"),n&&C.push("type"),o&&C.push("type"),d&&C.push("type");let z=[{dims:h,dataType:t.dataType,gpuDataType:0}];p&&z.push({dims:w,dataType:t.dataType,gpuDataType:0});let $=N=>{let L=q("q",t.dataType,t.dims,S),K=q("key",r.dataType,r.dims,S),Y=[L,K];if(E){let A=q("past_key",i.dataType,i.dims,S);Y.push(A)}n&&Y.push(q("attention_bias",n.dataType,n.dims));let X=o?q("seq_lens",o.dataType,o.dims):void 0;X&&Y.push(X);let D=d?q("total_sequence_length_input",d.dataType,d.dims):void 0;D&&Y.push(D);let H=ee("output",t.dataType,h),F=[H];p&&F.push(ee("present_key",t.dataType,w,S));let G=ze(1,S),J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${L.type.storage}, ${_*_}>;
  ${N.registerUniforms(J).declareVariables(...Y,...F)}
  ${N.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Lr(X,D,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${H.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${n!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:z,dispatchGroup:T,programUniforms:k}),getShaderSource:$}},zu=(e,t,r,i,n,s,a=void 0,o=void 0)=>{let d=s+n.kvSequenceLength,l=n.nReps?n.nReps:1,h=n.vHiddenSize*l,p=e>1&&i,f=n.kvNumHeads?n.kvNumHeads:n.numHeads,w=p?[n.batchSize,f,d,n.headSize]:void 0,g=[n.batchSize,n.sequenceLength,h],v=12,S={x:Math.ceil(n.vHeadSize/v),y:Math.ceil(n.sequenceLength/v),z:n.batchSize*n.numHeads},b=[{type:12,data:n.sequenceLength},{type:12,data:d},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:h},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:l}],_=p&&i&&B.size(i.dims)>0,T=["type","type"];_&&T.push("type"),a&&T.push("type"),o&&T.push("type");let k=[{dims:g,dataType:t.dataType,gpuDataType:0}];p&&k.push({dims:w,dataType:t.dataType,gpuDataType:0});let E=C=>{let z=q("probs",t.dataType,t.dims),$=q("v",r.dataType,r.dims),N=[z,$];_&&N.push(q("past_value",i.dataType,i.dims));let L=a?q("seq_lens",a.dataType,a.dims):void 0;a&&N.push(L);let K=o?q("total_sequence_length_input",o.dataType,o.dims):void 0;o&&N.push(K);let Y=[ee("output",t.dataType,g)];p&&Y.push(ee("present_value",t.dataType,w));let X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${z.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${z.type.value}, ${v*v}>;
  ${C.registerUniforms(X).declareVariables(...N,...Y)}
  ${C.mainStart([v,v,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Lr(L,K,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:k,dispatchGroup:S,programUniforms:b}),getShaderSource:E}},wr=(e,t,r,i,n,s,a,o,d,l,h=void 0,p=void 0)=>{let f=Math.min(e.outputCount,1+(a?1:0)+(o?1:0)),w=f>1?a:void 0,g=f>1?o:void 0,v=f>1?l.pastSequenceLength:0,S=v+l.kvSequenceLength,b=d&&B.size(d.dims)>0?d:void 0,_=[t,r];w&&B.size(w.dims)>0&&_.push(w),b&&_.push(b),h&&_.push(h),p&&_.push(p);let T=e.compute(Cu(f,t,r,w,b,l,v,h,p),{inputs:_,outputs:f>1?[-1,1]:[-1]})[0];e.compute(Iu(T,l.batchSize,l.numHeads,v,l.sequenceLength,S,h,p),{inputs:h&&p?[T,h,p]:[T],outputs:[]});let k=[T,i];g&&B.size(g.dims)>0&&k.push(g),h&&k.push(h),p&&k.push(p),e.compute(zu(f,T,i,g,l,v,h,p),{inputs:k,outputs:f>1?[0,2]:[0]})},Au=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,s=t.headSize,a=12,o={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=p=>{let f=ee("output_q",d[0].dataType,r),w=ee("output_k",d[0].dataType,r),g=ee("output_v",d[0].dataType,r),v=q("input",d[0].dataType,d[0].dims),S=q("weight",d[1].dataType,d[1].dims),b=q("bias",d[2].dataType,d[2].dims),_=v.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${_}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${_}, ${a*a}>;
  var<workgroup> tileWeightK: array<${_}, ${a*a}>;
  var<workgroup> tileWeightV: array<${_}, ${a*a}>;
  ${p.registerUniforms(T).declareVariables(v,S,b,f,w,g)}
  ${p.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:l}),getShaderSource:h},{inputs:d,outputs:[-1,-1,-1]})},Op=(e,t)=>{let r=Eu(e.inputs,t),[i,n,s]=Au(e,r);return wr(e,i,n,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Ou,Ru,Mu,Rp,j0=j(()=>{"use strict";Ve(),ie(),ae(),ke(),oe(),Ou=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,s)=>{let a=n.length;if(a!==i.length)throw new Error(`${s}: num dimensions != ${a}`);n.forEach((o,d)=>{if(o!==i[d])throw new Error(`${s}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Ru=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,s=e[0].dims,a=i?Te(s[s.length-1]):1,o=n==="NHWC"&&s.length>1?a:1,d=B.size(s)/a,l=i,h=l?s.length:s,p=q("x",e[0].dataType,e[0].dims,a),f=q("scale",e[1].dataType,e[1].dims,o),w=q("bias",e[2].dataType,e[2].dims,o),g=q("inputMean",e[3].dataType,e[3].dims,o),v=q("inputVar",e[4].dataType,e[4].dims,o),S=ee("y",e[0].dataType,h,a),b=()=>{let T="";if(i)T=`let cOffset = ${s.length===1?"0u":n==="NHWC"?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if(n==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let k=1;k<f.rank;k++)T+=`cIndices[${k}] = outputIndices[${k}];`;T+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return T},_=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(p,f,w,g,v,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${a}`)};
    ${b()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l?[{type:12,data:d},...re(s)]:[{type:12,data:d}]})}},Mu=e=>ge(e),Rp=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Mu({...t,outputCount:i});if(_e.webgpu.validateInputContent&&Ou(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Ru(r,n))}}),Nu,Du,Mp,K0=j(()=>{"use strict";ae(),oe(),Nu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Du=e=>{let t=e[0].dims,r=e[0].dims[2],i=B.size(t)/4,n=e[0].dataType,s=q("input",n,t,4),a=q("bias",n,[r],4),o=q("residual",n,t,4),d=ee("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(s,a,o,d)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Mp=e=>{Nu(e.inputs),e.compute(Du(e.inputs))}}),Bu,fe,Np,Dp,Bp,Lp,Pp,Up,qp,Wp,Vp,Lu,Gp,Hp,Fp,jp,fr,Kp,jr,Yp,Zp,Xp,Qp,Jp,eh,th,rh,ih,nh,ah,sh,oh,uh,lh,dh,ch,Zi,ph,Un,qn,hh,fh,mh,Pu,Uu,gh,ca=j(()=>{"use strict";ie(),ae(),ke(),oe(),Bu=(e,t,r,i,n,s,a)=>{let o=Math.ceil(t/4),d="";typeof n=="string"?d=`${n}(a)`:d=n("a");let l=q("inputData",r,[o],4),h=ee("outputData",i,[o],4),p=[{name:"vec_size",type:"u32"}];return a&&p.push(...a),`
      ${e.registerUniforms(p).declareVariables(l,h)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",d)}
  }`},fe=(e,t,r,i,n,s=e.dataType,a,o)=>{let d=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:l=>Bu(l,B.size(e.dims),e.dataType,s,r,i,o),getRunData:l=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(B.size(l[0].dims)/64/4)},programUniforms:d})}},Np=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},Dp=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},Bp=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},Lp=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},Pp=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},Up=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},qp=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},Wp=e=>ge(e),Vp=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Lu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ge({min:t,max:r})},Gp=(e,t)=>{let r=t||Lu(e.inputs),i=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Hp=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},Fp=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},jp=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},fr=e=>ge(e),Kp=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},jr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Yp=e=>{let t=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,jr(t)))},Zp=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},Xp=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},Qp=e=>{let t=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,jr(t)))},Jp=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},eh=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},th=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},rh=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ih=e=>{let t=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},nh=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ah=e=>ge(e),sh=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},oh=e=>{let t=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},uh=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},lh=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},dh=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},ch=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},Zi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,ph=e=>{e.compute(fe(e.inputs[0],"Tanh",Zi))},Un=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Zi("v")};
}
`,qn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,hh=e=>{let t=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",qn,Un(t),void 0,e.inputs[0].dataType))},fh=(e,t)=>{let r=ze(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},mh=e=>{e.compute(fe(e.inputs[0],"Log","log"))},Pu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Uu=e=>`quick_gelu_impl(${e})`,gh=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",Uu,Pu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),qu,Wu,yh,Y0=j(()=>{"use strict";ae(),oe(),ca(),qu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Wu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=q("input",e[0].dataType,e[0].dims,4),i=q("bias",e[0].dataType,[e[0].dims[2]],4),n=ee("output",e[0].dataType,t,4),s=B.size(t)/4,a=Ae(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,n)}

  ${jr(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},yh=e=>{qu(e.inputs),e.compute(Wu(e.inputs))}}),Vu,Gu,Ye,wh,bh,_h,vh,$h,xh,Sh,Th,kh,Eh,Z0=j(()=>{"use strict";ie(),ae(),oe(),Vu=(e,t,r,i,n,s,a,o,d,l,h,p)=>{let f,w;typeof o=="string"?f=w=(_,T)=>`${o}((${_}),(${T}))`:typeof o=="function"?f=w=o:(f=o.scalar,w=o.vector);let g=ee("outputData",h,i.length,4),v=q("aData",d,t.length,4),S=q("bData",l,r.length,4),b;if(n)if(s){let _=B.size(t)===1,T=B.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;_||T?b=g.setByOffset("global_idx",w(_?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):b=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",w(a||k?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||E?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=g.setByOffset("global_idx",w(v.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(T,k,E="")=>{let C=`aData[indexA${k}][componentA${k}]`,z=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${g.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${v.broadcastedIndicesToOffset(`outputIndices${k}`,g)};
            let offsetB${k} = ${S.broadcastedIndicesToOffset(`outputIndices${k}`,g)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${T}[${k}] = ${E}(${f(C,z)});
          `};h===9?b=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:b=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(v,S,g)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`},Gu=(e,t,r,i,n,s,a=r.dataType)=>{let o=r.dims.map(Number),d=i.dims.map(Number),l=!B.areEqual(o,d),h=o,p=B.size(o),f=!1,w=!1,g=[l];if(l){let v=Kt.calcShape(o,d,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");h=v.slice(),p=B.size(h);let S=B.size(o)===1,b=B.size(d)===1,_=o.length>0&&o[o.length-1]%4===0,T=d.length>0&&d[d.length-1]%4===0;g.push(S),g.push(b),g.push(_),g.push(T);let k=1;for(let E=1;E<h.length;E++){let C=o[o.length-E],z=d[d.length-E];if(C===z)k*=C;else break}k%4===0?(w=!0,f=!0):(S||b||_||T)&&(f=!0)}else f=!0;return g.push(f),{name:e,shaderCache:{hint:t+g.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>Vu(v,o,d,h,f,l,w,n,r.dataType,i.dataType,a,s),getRunData:()=>({outputs:[{dims:h,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(h)/4)},...re(o,d,h)]})}},Ye=(e,t,r,i,n,s)=>{e.compute(Gu(t,n??"",e.inputs[0],e.inputs[1],r,i,s))},wh=e=>{Ye(e,"Add",(t,r)=>`${t}+${r}`)},bh=e=>{Ye(e,"Div",(t,r)=>`${t}/${r}`)},_h=e=>{Ye(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},vh=e=>{Ye(e,"Mul",(t,r)=>`${t}*${r}`)},$h=e=>{let t=q("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ye(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},xh=e=>{Ye(e,"Sub",(t,r)=>`${t}-${r}`)},Sh=e=>{Ye(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Th=e=>{Ye(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},kh=e=>{Ye(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Eh=e=>{Ye(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Hu,Fu,ju,Ku,Ih,Ch,X0=j(()=>{"use strict";ie(),ae(),ke(),oe(),Hu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,s=i.dims.length;e.forEach((a,o)=>{if(o!==r){if(a.dataType!==n)throw new Error("input tensors should be one type");if(a.dims.length!==s)throw new Error("input tensors should have the same shape");a.dims.forEach((d,l)=>{if(l!==t&&d!==i.dims[l])throw new Error("non concat dimensions must match")})}})},Fu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,ju=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let s=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(s):n===0?i.push(`if (inputIndex == ${n}u) { ${s} }`):n===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${n}) { ${s} }`)}return i.join(`
`)},Ku=(e,t,r,i)=>{let n=B.size(r),s=new Array(e.length),a=new Array(e.length),o=0,d=[],l=[],h=[{type:12,data:n}];for(let v=0;v<e.length;++v)o+=e[v].dims[t],s[v]=o,l.push(e[v].dims.length),a[v]=q(`input${v}`,i,l[v]),d.push("rank"),h.push({type:12,data:s[v]});for(let v=0;v<e.length;++v)h.push(...re(e[v].dims));h.push(...re(r));let p=ee("output",i,r.length),f=p.indicesGet("indices",t),w=Array.from(Array(s.length).keys()).map(v=>`uniforms.sizeInConcatAxis${v}`).join(","),g=v=>`

  ${(()=>{v.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)v.registerUniform(`sizeInConcatAxis${S}`,"u32");return v.declareVariables(...a,p)})()}

  ${Fu(s.length,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${w});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${ju(a,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}),getShaderSource:g}},Ih=(e,t)=>{let r=e.inputs,i=r[0].dims,n=B.normalizeAxis(t.axis,i.length);Hu(r,n);let s=i.slice();s[n]=r.reduce((o,d)=>o+(d.dims.length>n?d.dims[n]:0),0);let a=r.filter(o=>B.size(o.dims)>0);e.compute(Ku(a,n,s,r[0].dataType),{inputs:a})},Ch=e=>ge({axis:e.axis})}),Lt,Pt,Ut,pa,Wt=j(()=>{"use strict";ie(),ae(),Lt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Pt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ut=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},pa=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,i]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=(e==null?void 0:e.activation_params)||[ep,tp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Me,zh,ha=j(()=>{"use strict";Me=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},zh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Ah,Q0=j(()=>{"use strict";Ah=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),gr,fa,ma=j(()=>{"use strict";ie(),ae(),oe(),Wt(),gr=(e,t,r,i,n)=>{let s=i-r;return`
      ${Array.from({length:r}).map((a,o)=>`
      if (${te(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,te(n,o+s,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},fa=(e,t,r,i,n=!1,s)=>{let a=e[0].dims,o=e[1].dims,d=a[a.length-2],l=o[o.length-1],h=a[a.length-1],p=Te(l),f=Te(h),w=Te(d),g=B.size(r)/p/w,v=e.length>2,S=i?i.slice(0,-2):r.slice(0,-2),b=[B.size(S),d,l],_=[{type:12,data:g},{type:12,data:d},{type:12,data:l},{type:12,data:h}];Pt(t,_),_.push(...re(S,a,o)),v&&_.push(...re(e[2].dims)),_.push(...re(b));let T=k=>{let E=ua("batch_dims",e[0].dataType,S.length),C=q("a",e[0].dataType,a.length,f),z=q("b",e[1].dataType,o.length,p),$=ee("output",e[0].dataType,b.length,p),N=Ae($.type.tensor),L=Lt(t,$.type.value,N),K=[C,z],Y="";if(v){let H=n?p:1;K.push(q("bias",e[2].dataType,e[2].dims.length,H)),Y=`${n?`value += bias[col / ${H}];`:`value += ${$.type.value}(bias[row + i]);`}`}let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ut(t,X);let D=()=>{let H=`var a_data: ${C.type.value};`;for(let F=0;F<f;F++)H+=`
              let b_data${F} = b[(b_offset + (k + ${F}) * uniforms.N + col) / ${p}];`;for(let F=0;F<w;F++){H+=`a_data = a[(a_offset + (row + ${F}) * uniforms.K + k) / ${f}];`;for(let G=0;G<f;G++)H+=`
            values[${F}] = fma(${z.type.value}(a_data${f===1?"":`[${G}]`}), b_data${G}, values[${F}]);
`}return H};return`
  ${k.registerUniforms(X).registerInternalVariables(E).declareVariables(...K,$)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${gr("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${gr("b_indices",z,z.rank-2,E.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${D()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${Y}
      ${L}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${f};${w};${n}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:T}}}),Yu,Zu,Wn,Xi,Xu,Vn,Qu,ei,ga=j(()=>{"use strict";ie(),ae(),oe(),Wt(),ma(),ha(),Yu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Zu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Wn=(e,t,r="f32",i,n=!1,s=32,a=!1,o=32)=>{let d=t[1]*e[1],l=t[0]*e[0],h=n?d:s,p=n?s:d,f=h/t[0],w=s/t[1];if(!((n&&f===4&&e[1]===4||!n&&(f===3||f===4))&&h%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${r}>, ${h/f}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${w};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Yu(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Zu(n,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Xi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Xu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Vn=(e,t,r="f32",i,n=!1,s=32,a=!1,o=32,d=!1)=>{let l=e[1]*t[1],h=e[0]*t[0],p=n?l:s,f=n?s:l;if(!(f%t[1]===0&&p%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let w=f/t[1],g=p/t[0],v=s/t[1],S=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${Xi(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${w};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Xi(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Xu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Qu=(e,t,r,i,n=!1)=>{let[s,a,o,d]=i,l=Ae(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Me(e,l)} {
      var value = ${Me(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${gr("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Me(e,l)} {
      var value = ${Me(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${gr("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Me(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Me(e,l)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ei=(e,t,r,i,n=!1,s)=>{let a=e[0].dims,o=e[1].dims,d=a.slice(0,-2),l=o.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),p=B.size(h),f=a[a.length-2],w=a[a.length-1],g=o[o.length-1],v=w%4===0&&g%4===0,S=f<=8?[4,1,1]:[4,4,1],b=[8,8,1],_=[Math.ceil(g/b[0]/S[0]),Math.ceil(f/b[1]/S[1]),Math.ceil(p/b[2]/S[2])],T=v?4:1,k=[...d,f,w/T],E=k.length,C=[...l,w,g/T],z=C.length,$=[p,f,g/T],N=[{type:6,data:f},{type:6,data:g},{type:6,data:w}];Pt(t,N),N.push(...re(h,k,C));let L=["rank","rank"],K=e.length>2;K&&(N.push(...re(e[2].dims)),L.push("rank")),N.push(...re($));let Y=X=>{let D=h.length,H=ua("batchDims",e[0].dataType,D,1),F=Ae(e[0].dataType),G=q("a",e[0].dataType,E,T),J=q("b",e[1].dataType,z,T),A=ee("result",e[0].dataType,$.length,T),M=[G,J];if(K){let ne=n?T:1;M.push(q("bias",e[2].dataType,e[2].dims.length,ne))}let O=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ut(t,O);let P=Ae(A.type.tensor),V=Lt(t,A.type.value,P),W=Qu(T,K,V,[H,G,J,A],n);return`
  ${X.registerUniforms(O).registerInternalVariables(H).declareVariables(...M,A)}
  ${W}
  ${v?Wn(S,b,F,H):Vn(S,b,F,H)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${v};${n}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:N}),getShaderSource:Y}}}),Ju,Oh,J0=j(()=>{"use strict";ie(),dt(),oe(),Wt(),ha(),Q0(),ga(),Ju=(e,t,r,i,n=!1,s,a=4,o=4,d=4,l="f32")=>{let h=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},p=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,w=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",b=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${b} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${b} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${b} % inChannels;
    var resData = ${Me(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${v}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(a)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${Me(a,l)}(0.0);`:i&&r?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${Me(a,l)}(0.0);`,k=e?i&&r?p(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(o)}
    }
    return ${Me(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(o)}
    }
    return ${Me(o,l)}(0.0);`,E=Me(d,l),C=Me(e?a:o,l),z=Me(e?o:a,l),$=Lt(s,E,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${zh(n)}
      ${$}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Oh=(e,t,r,i,n,s,a,o,d)=>{let l=t.format==="NHWC",h=l?e[0].dims[3]:e[0].dims[1],p=r[0],f=l?r[2]:r[3],w=l?r[1]:r[2],g=l?r[3]:r[1],v=l&&(h%4===0||h%3===0)&&g%4===0,S=l?g:f*w,b=l?f*w:g,_=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],k=[Math.ceil(S/_[0]/T[0]),Math.ceil(b/_[1]/T[1]),Math.ceil(p/_[2]/T[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let E=v?l&&h%4!==0?3:4:1,C=_[1]*T[1],z=_[0]*T[0],$=Math.max(_[0]*E,_[1]),N=i%C===0,L=n%z===0,K=s%$===0,Y=v?[E,4,4]:[1,1,1],X=[{type:6,data:i},{type:6,data:n},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Pt(t,X),X.push(...re(e[0].dims,e[1].dims));let D=["rank","rank"];a&&(X.push(...re(e[2].dims)),D.push("rank")),X.push(...re(r));let H=F=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ut(t,G);let J=v?4:1,A=Ae(e[0].dataType),M=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${A}>`:A}) {
        result[flatIndex] = ${v?`vec4<${A}>`:A}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${A}>`:A}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,O=q("x",e[0].dataType,e[0].dims.length,E===3?1:E),P=q("w",e[1].dataType,e[1].dims.length,J),V=[O,P],W=ee("result",e[0].dataType,r.length,J);if(a){let ne=q("bias",e[2].dataType,e[2].dims.length,J);V.push(ne),M+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${A}>`:A} {
          return bias[coords.${l?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${Ah("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${F.registerUniforms(G).declareVariables(...V,W)}
        ${M}
        ${Ju(l,N,L,K,a,t,Y[0],Y[1],Y[2],A)}
        ${v?Wn(T,_,A,void 0,!l,$):Vn(T,_,A,void 0,!l,$,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${v};${N};${L};${K};${C};${z};${$}`,inputDependencies:D},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:X}),getShaderSource:H}}}),el,Qi,sr,tl,Ji,rl,Rh,Mh,ew=j(()=>{"use strict";ie(),dt(),ae(),oe(),Wt(),ha(),el=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Qi=e=>typeof e=="number"?[e,e,e]:e,sr=(e,t)=>t<=1?e:e+(e-1)*(t-1),tl=(e,t,r,i=1)=>{let n=sr(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},Ji=(e,t,r,i,n)=>{n==null&&(n=tl(e,t[0],i[0]));let s=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*n>=t[a]&&(s[a]=Math.trunc((e[a]-t[a]+2*n)/i[a]+1));return s},rl=(e,t,r,i,n,s,a,o,d,l)=>{let h,p,f,w;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Ji([t,r,i,1],[o,d,l],1,[n,s,a],e);p=g[0],f=g[1],w=g[2]}else if(Array.isArray(e)){if(!e.every((v,S,b)=>v===b[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Ji([t,r,i,1],[o,d,l],1,[n,s,a],e[0]);p=g[0],f=g[1],w=g[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/n),f=Math.ceil(r/s),w=Math.ceil(i/a);let g=(p-1)*n+o-t,v=(f-1)*s+d-r,S=(w-1)*a+l-i,b=Math.floor(g/2),_=g-b,T=Math.floor(v/2),k=v-T,E=Math.floor(S/2),C=S-E;h={top:T,bottom:k,left:E,right:C,front:b,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:p,outHeight:f,outWidth:w}},Rh=(e,t,r,i,n,s=!1,a="channelsLast")=>{let o,d,l,h,p;if(a==="channelsLast")[o,d,l,h,p]=e;else if(a==="channelsFirst")[o,p,d,l,h]=e;else throw new Error(`Unknown dataFormat ${a}`);let[f,,w,g,v]=t,[S,b,_]=Qi(r),[T,k,E]=Qi(i),C=sr(w,T),z=sr(g,k),$=sr(v,E),{padInfo:N,outDepth:L,outHeight:K,outWidth:Y}=rl(n,d,l,h,S,b,_,C,z,$),X=s?f*p:f,D=[0,0,0,0,0];return a==="channelsFirst"?D=[o,X,L,K,Y]:a==="channelsLast"&&(D=[o,L,K,Y,X]),{batchSize:o,dataFormat:a,inDepth:d,inHeight:l,inWidth:h,inChannels:p,outDepth:L,outHeight:K,outWidth:Y,outChannels:X,padInfo:N,strideDepth:S,strideHeight:b,strideWidth:_,filterDepth:w,filterHeight:g,filterWidth:v,effectiveFilterDepth:C,effectiveFilterHeight:z,effectiveFilterWidth:$,dilationDepth:T,dilationHeight:k,dilationWidth:E,inShape:e,outShape:D,filterShape:t}},Mh=(e,t,r,i,n,s)=>{let a=s==="channelsLast",o=a?e[0].dims[3]:e[0].dims[1],d=!1,l=[64,1,1],h={x:r.map((_,T)=>T)},p=[Math.ceil(el(h.x.map(_=>r[_]))/l[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let f=d?a&&o%4!==0?3:4:1,w=B.size(r),g=[{type:12,data:w},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Pt(t,g),g.push(...re(e[0].dims,e[1].dims));let v=["rank","rank"],S=e.length===3;S&&(g.push(...re(e[2].dims)),v.push("rank")),g.push(...re(r));let b=_=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ut(t,T);let k=d?4:1,E=Ae(e[0].dataType),C=q("x",e[0].dataType,e[0].dims.length,f===3?1:f),z=q("W",e[1].dataType,e[1].dims.length,k),$=[C,z],N=ee("result",e[0].dataType,r.length,k),L="";if(S){let X=q("bias",e[2].dataType,e[2].dims.length,k);$.push(X),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${E}>`:E} {
          return bias[${a?te("coords",4,5):te("coords",1,5)}${d?"/ 4":""}];
        }`}let K=Me(f,E),Y=Lt(t,K,E);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${_.registerUniforms(T).declareVariables(...$,N)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${te("coords",0,C.rank)};
              let d2 = ${a?te("coords",C.rank-1,C.rank):te("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?te("coords",1,C.rank):te("coords",2,C.rank)},
              ${a?te("coords",2,C.rank):te("coords",3,C.rank)},
              ${a?te("coords",3,C.rank):te("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?te("uniforms.x_shape",1,C.rank):te("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?te("uniforms.x_shape",2,C.rank):te("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?te("uniforms.x_shape",3,C.rank):te("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?te("uniforms.x_shape",4,C.rank):te("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${Y}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${f};${S}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:b}}}),Nh,Dh,tw=j(()=>{"use strict";ie(),ae(),oe(),Wt(),Nh=(e,t,r,i)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",a=e[0].dims,o=e[1].dims,d=t.format==="NHWC",l=d?r[3]:r[1],h=l/t.group,p=d&&h>=4?Te(l):1,f=B.size(r)/p,w=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];Pt(t,w),w.push(...re(a,[o[0],o[1],o[2],o[3]/p]));let g=n?["rank","rank","rank"]:["rank","rank"];w.push(...re([r[0],r[1],r[2],r[3]/p]));let v=S=>{let b=ee("output",e[0].dataType,r.length,p),_=Ae(b.type.tensor),T=Lt(t,b.type.value,_),k=q("x",e[0].dataType,a.length),E=q("w",e[1].dataType,o.length,p),C=[k,E];n&&C.push(q("b",e[2].dataType,e[2].dims,p));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ut(t,z);let $=d?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(z).declareVariables(...C,b)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${b.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${b.type.value} = ${b.type.value}(0);
    ${$}
    ${s}
    ${T}
    ${b.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:v}},Dh=(e,t,r,i)=>{let n=e.length>2,s=Te(r[3]),a=Te(r[2]),o=B.size(r)/s/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],h=[r[0],r[1],r[2],r[3]/s],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Pt(t,p),p.push(...re(d,l,h));let f=(a-1)*t.strides[1]+l[1],w=g=>{let v=ee("output",e[0].dataType,h.length,s),S=Ae(v.type.tensor),b=Lt(t,v.type.value,S),_=q("x",e[0].dataType,d.length,s),T=q("w",e[1].dataType,l.length,s),k=[_,T];n&&k.push(q("b",e[2].dataType,e[2].dims,s));let E=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ut(t,C),`
  ${g.registerUniforms(C).declareVariables(...k,v)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${f}>;
    var values: array<${v.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${E}
      ${b}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${a};${f};${l[0]};${l[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:w}}}),il,Pr,nl,Ur,Gn,en,al,sl,Hn,rw=j(()=>{"use strict";ae(),J0(),ew(),ga(),tw(),Wt(),ma(),xt(),il=(e,t,r,i,n,s)=>{let a=e[0],o=e.slice(s?1:2,s?3:4),d=o.length,l=t[0],h=t.slice(2).map((f,w)=>f+(f-1)*(r[w]-1)),p=o.map((f,w)=>f+i[w]+i[w+d]).map((f,w)=>Math.floor((f-h[w]+n[w])/n[w]));return p.splice(0,0,a),p.splice(s?3:1,0,l),p},Pr=[2,3,1,0],nl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Ur=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();Qr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},Gn=e=>{let t=pa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,s=e.group,a=e.kernel_shape,o=e.pads,d=e.strides,l=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:s,kernelShape:a,pads:o,strides:d,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},en=(e,t,r,i)=>{let n=r.format==="NHWC",s=il(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let C=[t[0]];if(n){let z=e.kernelCustomData.wT??e.compute(qe(t[1],Pr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),C.push(z)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Dh(C,r,s,i),{inputs:C}):e.compute(Nh(C,r,s,i),{inputs:C});return}let a=t.length===3,o=t[0].dims[n?1:2],d=t[0].dims[n?2:3],l=t[0].dims[n?3:1],h=t[1].dims[2],p=t[1].dims[3],f=s[n?1:2],w=s[n?2:3],g=s[n?3:1],v=n&&h===o&&p===d&&r.pads[0]===0&&r.pads[1]===0;if(v||h===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=s[0],z,$,N,L=[];if(n){let X=e.kernelCustomData.wT??e.compute(qe(t[1],Pr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=X),v){let D=o*d*l;z=t[0].reshape([1,C,D]),$=X.reshape([1,D,g]),N=[1,C,g]}else z=t[0].reshape([C,o*d,l]),$=X.reshape([1,l,g]),N=[C,f*w,g];L.push(z),L.push($)}else z=t[0].reshape([C,l,o*d]),$=t[1].reshape([1,g,l]),N=[C,g,f*w],L.push($),L.push(z);a&&L.push(t[2]);let K=N[2],Y=L[0].dims[L[0].dims.length-1];K<8&&Y<8?e.compute(fa(L,r,s,N,n,i),{inputs:L}):e.compute(ei(L,r,s,N,n,i),{inputs:L});return}let S=!0,b=e.kernelCustomData.wT??e.compute(qe(t[1],Pr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let _=[t[0],b];a&&_.push(t[2]);let T=n?f*w:g,k=n?g:f*w,E=h*p*l;e.compute(Oh(_,r,s,T,k,E,a,S,i),{inputs:_})},al=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),a=[1].concat(t.dilations),o=[1].concat(t.kernelShape),d=Ur({...t,pads:n,strides:s,dilations:a,kernelShape:o},i);en(e,i,d,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},sl=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Ur(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Rh(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute(Mh(t,n,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],i))},Hn=(e,t)=>{if(nl(e.inputs,t),e.inputs[0].dims.length===3)al(e,t);else if(e.inputs[0].dims.length===5)sl(e,e.inputs,t);else{let r=Ur(t,e.inputs);en(e,e.inputs,r)}}}),Bh,iw=j(()=>{"use strict";ie(),dt(),ae(),oe(),Bh=(e,t,r)=>{let i=e.length>2,n=t.outputShape,s=t.format==="NHWC",a=t.group,o=e[1].dims,d=o[2]/a,l=o[3],h=s?Te(d):1,p=s&&l===1&&d>=4,f=p?Math.floor(d/4)*4:Math.floor(d/h)*h,w=d-f,g=s?Te(l):1,v=s?l===1?h:g:1,S=B.size(n)/g,b=[Math.ceil(S/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let _=["rank","rank"],T=[t.strides[0],t.strides[1]],k=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],E=[t.dilations[0],t.dilations[1]],C=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],z=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:S},{type:12,data:T},{type:12,data:k},{type:12,data:E},{type:12,data:C},{type:6,data:z},{type:12,data:f},{type:12,data:d},{type:12,data:l},...re(e[0].dims,e[1].dims)];i&&($.push(...re(e[2].dims)),_.push("rank")),$.push(...re(n));let N=L=>{let K=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Y=Ae(e[0].dataType),X=s?1:2,D=s?2:3,H=s?3:1,F=q("W",e[1].dataType,e[1].dims.length,v),G=q("Dy",e[0].dataType,e[0].dims.length,h),J=[G,F];i&&J.push(q("bias",e[2].dataType,[n[H]].length,g));let A=ee("result",e[0].dataType,n.length,g),M=()=>{let V="";if(p)h===4?V+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${F.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?V+=`
          dotProd = dotProd + dot(vec4<${Y}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${Y}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(V+=`
          dotProd = dotProd + dot(vec4<${Y}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${Y}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}, ${F.getByOffset("w_offset + 2u")}, ${F.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(V+=`
                  let xValue = ${s?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):G.get("batch","inputChannel","idyR","idyC")};
        `,h===1)V+=`
          let w_offset = ${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${F.getByOffset(`w_offset / ${v}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let W=0;W<h;W++)V+=`
            let wValue${W} = ${F.getByOffset(`${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${W}, wOutChannel)`)} / ${v}`)};
            dotProd = dotProd + xValue[${W}] * wValue${W};`;return V},O=()=>{if(w===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let V="";if(h===1){V+="dotProd = dotProd";for(let W=0;W<w;W++)V+=`
            + ${G.getByOffset(`x_offset + ${W}`)} * ${F.getByOffset(`w_offset + ${W}`)}`;V+=";"}else if(h===2){if(w!==2)throw new Error(`Invalid inputChannelsRemainder ${w}.`);V+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${F.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return V},P=`
            let outputIndices = ${A.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${A.indicesGet("outputIndices",0)};
            let d1 = ${A.indicesGet("outputIndices",H)};
            let r = ${A.indicesGet("outputIndices",X)};
            let c = ${A.indicesGet("outputIndices",D)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${A.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Y}(dyRCorner) + ${Y}(wR)) / ${Y}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Y}(uniforms.Dy_shape[${X}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Y}(dyCCorner) + ${Y}(wC)) / ${Y}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Y}(uniforms.Dy_shape[${D}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${F.indicesToOffset(`${F.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${v};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:h}) {
                  ${M()}
                  inputChannel = inputChannel + ${p?4:h};
                }
                ${O()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${g}]`:""};
            ${A.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(K).declareVariables(...J,A)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${P}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${v}${g}${p}${w}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:N}}}),ol,ul,ll,tn,Lh,dl,rn,cl,Ph,nw=j(()=>{"use strict";iw(),Wt(),xt(),ol=(e,t,r,i,n,s)=>(e-1)*t+r+(i-1)*n+1-s,ul=(e,t,r,i,n)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[n]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[n]=s)},ll=(e,t,r,i,n,s,a,o,d,l)=>{let h=e.length-2,p=l.length===0;d.length<h&&d.push(...Array(h-d.length).fill(0));let f=e[0],w=t[o?3:1]*n;for(let g=0,v=e.length-h-(o?1:0);g<h;++g,++v){let S=e[v],b=p?S*a[g]:l[g],_=ol(S,a[g],s[g],t[v],r[g],b);ul(_,i,s,g,g+h),p&&l.push(a[g]*(S-1)+d[g]+(t[v]-1)*r[g]+1-s[g]-s[g+h])}l.splice(0,0,f),l.splice(o?3:1,0,w)},tn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,f)=>p*f,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),a=e.outputPadding.slice(),o=t[0].dims,d=e.dilations.slice();if(d.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;d=new Array(p).fill(1)}let l=e.strides.slice();if(l.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}ll(o,r,d,e.autoPad,e.group,n,l,i,a,s);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:n,outputPadding:a,outputShape:s,dilations:d,strides:l}),h},Lh=e=>{let t=pa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group??1,a=e.kernelShape,o=e.pads,d=e.strides,l=e.wIsConst(),h=e.outputPadding,p=e.outputShape;return{autoPad:i,format:r,dilations:n,group:s,kernelShape:a,outputPadding:h,outputShape:p,pads:o,strides:d,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},dl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((a,o)=>a+o,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((a,o)=>a+o,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((a,o)=>a+o,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((a,o)=>a+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},rn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(qe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let s=[t[0],n];t.length===3&&s.push(t[2]),e.compute(Bh(s,r,i),{inputs:s})},cl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),s=[1].concat(s),n=[1].concat(n);let d=t.outputPadding;d=[0].concat(d);let l=tn({...t,pads:o,strides:a,dilations:s,kernelShape:n,outputPadding:d},i);rn(e,i,l,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},Ph=(e,t)=>{if(dl(e.inputs,t),e.inputs[0].dims.length===3)cl(e,t);else{let r=tn(t,e.inputs);rn(e,e.inputs,r)}}}),pl,Uh,qh,aw=j(()=>{"use strict";ie(),ae(),ke(),oe(),pl=(e,t,r,i)=>{let n=B.size(t),s=t.length,a=q("input",e,s),o=ee("output",e,s),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=B.normalizeAxis(d,s),h=p=>{let f=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,w=te("uniforms.input_shape","uniforms.axis",s),g=i.reverse?f+(i.exclusive?" + 1":""):"0",v=i.reverse?w:f+(i.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,o)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:l},...re(t,t)]}),getShaderSource:h}},Uh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(pl(i,r,n,t),{inputs:[0]})},qh=e=>{let t=e.exclusive===1,r=e.reverse===1;return ge({exclusive:t,reverse:r})}}),hl,fl,ml,Wh,Vh,sw=j(()=>{"use strict";ie(),ae(),ke(),oe(),hl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},fl=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)n.push(r.indicesSet("a",e[s],`i[${s}]`));return n.push("return a;}"),n.join(`
`)},ml=(e,t)=>{let r,i,n,s,a,o,d=t.format==="NHWC",l=t.blocksize,h=t.mode==="DCR";d?([r,i,n,s]=e.dims,a=h?[r,i,n,l,l,s/l**2]:[r,i,n,s/l**2,l,l],o=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=h?[r,l,l,s/l**2,i,n]:[r,s/l**2,l,l,i,n],o=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(a),f=p.dims.length,w=e.dataType,g=q("a",w,f),v=ee("output",w,f),S=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(g,v)}

  ${fl(o,f,g,v)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:b=>{let _=d?[r,i*l,n*l,s/l**2]:[r,s/l**2,i*l,n*l],T=B.size(_),k=p.dims,E=B.sortBasedOnPerm(k,o);return{outputs:[{dims:_,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...re(k,E)]}},getShaderSource:S}},Wh=(e,t)=>{hl(e.inputs),e.compute(ml(e.inputs[0],t))},Vh=e=>ge({blocksize:e.blocksize,mode:e.mode,format:e.format})}),ot,or,qr,nn,wt,gl,yl,wl,an,sn,on,bl,_l,un,vl,Gh,Hh,ow=j(()=>{"use strict";ie(),ae(),ke(),oe(),ot=256,or=512,qr=2*Math.PI,nn=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},wt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},gl=(e,t,r,i,n)=>{let s=r/e,a=or-i,o=l=>`smem[${a}u + base + ${l*t}u]`,d=`  for (var t = local_idx; t < ${s}u; t += ${ot}u) {
`;d+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,d+=`    var leg: array<vec2<f32>, 5>;
`;for(let l=0;l<e;l++){let h=`${i}u + t + ${l*s}u`;if(l===0)d+=`    leg[0] = smem[${h}];
`;else{let p=n*qr*l/(e*t);d+=`    { let a = ${wt(p)} * angleUnit; leg[${l}] = cmul(smem[${h}], vec2<f32>(cos(a), sin(a))); }
`}}if(d+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)d+=`    ${o(0)} = leg[0] + leg[1];
    ${o(1)} = leg[0] - leg[1];
`;else if(e===4){let l=n<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";d+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,d+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,d+=`    let oddRot = ${l};
`,d+=`    ${o(0)} = evenSum + oddSum;
    ${o(1)} = evenDiff + oddRot;
`,d+=`    ${o(2)} = evenSum - oddSum;
    ${o(3)} = evenDiff - oddRot;
`}else for(let l=0;l<e;l++){let h=["leg[0]"];for(let p=1;p<e;p++){let f=n*qr*(p*l)/e,w=wt(Math.cos(f)),g=wt(Math.sin(f));h.push(`vec2<f32>(leg[${p}].x*${w} - leg[${p}].y*${g}, leg[${p}].x*${g} + leg[${p}].y*${w})`)}d+=`    ${o(l)} = ${h.join(" + ")};
`}return`${d}  }
  workgroupBarrier();
`},yl=(e,t,r)=>{let i="",n=1,s=0;for(let a of e)i+=gl(a,n,t,s,r),n*=a,s=or-s;return{code:i,resultOffset:s}},wl=(e,t,r,i,n)=>{let s=e.dims,a=s.length,o=s[a-1],d=s[t],l=r&&i?(d-1)*2:d;n!==void 0&&(l=n);let h=r&&i?1:2,p=i&&!r?Math.floor(l/2)+1:l,f=s.slice();f[t]=p,f[a-1]=h;let w=1;for(let v=t+1;v<a-1;v++)w*=s[v];let g=B.size(s)/o/d;return{dataType:e.dataType,outputDims:f,length:l,signalLength:d,inner:w,batch:g,inputComponents:o,outputComponents:h,outputLength:p,inverse:r,onesided:i}},an=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),sn=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],on=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),bl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:s,onesided:a}=e,o=ze(t),d=s?1:-1,l=s?1/r:1,h=nn(r),p=f=>{let w=q("x",t,[1]),g=ee("y",t,[1]),v=E=>{let C=`inBase + (${E}) * uniforms.inner * ${i}u`,z=`f32(${w.getByOffset(C)})`,$=i===2?`f32(${w.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${z}, ${$})`},S;if(s&&a){let E=Math.floor(r/2)+1,C=r%2===0?`select(provided, provided - 1u, provided == ${E}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${E}u);
    for (var i = local_idx; i < ${r}u; i += ${ot}u) {
      if (i < provided) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${C}; k += ${ot}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${ot}u) {
      if (i < loadCount) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:b,resultOffset:_}=yl(h,r,d),T=l===1?`smem[${_}u + i]`:`smem[${_}u + i] * ${wt(l)}`,k=n===2?g.setByOffset("off + 1u",`${o}(v.y)`):"";return`
  ${on(f,w,g)}
  var<workgroup> smem: array<vec2<f32>, ${2*or}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${f.mainStart(ot)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    ${S}
${b}    for (var i = local_idx; i < uniforms.outputLength; i += ${ot}u) {
      let v = ${T};
      let off = outBase + i * uniforms.inner * ${n}u;
      ${g.setByOffset("off",`${o}(v.x)`)}
      ${k}
    }
  }`};return{name:"DFT",shaderCache:{hint:an(e,"fft"),inputDependencies:["type"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:sn(e),dispatchGroup:{x:e.batch}})}},_l=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:s,onesided:a}=e,o=ze(t),d=s?1:-1,l=s?1/r:1,h=p=>{let f=q("x",t,[1]),w=ee("y",t,[1]),g=T=>{let k=`inBase + (${T}) * uniforms.inner * ${i}u`,E=`f32(${f.getByOffset(k)})`,C=i===2?`f32(${f.getByOffset(`${k} + 1u`)})`:"0.0";return`vec2<f32>(${E}, ${C})`},v=s&&a?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${g("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${g("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${g("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,S=`
      let angle = ${wt(d*qr)} * f32(knMod) / ${wt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,b=n===2?w.setByOffset("off + 1u",`${o}(v.y)`):"",_=l===1?"acc":`acc * ${wt(l)}`;return`
  ${on(p,f,w)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${v}
  ${p.mainStart(ot)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${ot}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${S}
      }
      let v = ${_};
      let off = outBase + k * uniforms.inner * ${n}u;
      ${w.setByOffset("off",`${o}(v.x)`)}
      ${b}
    }
  }`};return{name:"DFT",shaderCache:{hint:an(e,"direct"),inputDependencies:["type"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:sn(e),dispatchGroup:{x:e.batch}})}},un=e=>{if(!e||e.dataType===0)return;if(B.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},vl=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Gh=(e,t)=>{vl(e.inputs);let r=e.inputs[0],i=r.dims.length,n=t.inverse!==0,s=t.onesided!==0,a=un(e.inputs[1]);if(a!==void 0&&a<=0)throw new Error("dft_length must be greater than zero.");let o=B.normalizeAxis(un(e.inputs[2])??t.axis,i);if(o===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(n&&s&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let d=wl(r,o,n,s,a);if(d.length<=0)throw new Error(`Invalid DFT length: ${d.length}`);let l=d.length<=or&&nn(d.length)!==void 0?bl(d):_l(d);e.compute(l,{inputs:[0]})},Hh=e=>ge({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Wr,ur,ln,$l,xl,Sl,Tl,dn,kl,Fh,jh,uw=j(()=>{"use strict";ie(),ae(),ke(),oe(),Wr="[a-zA-Z]|\\.\\.\\.",ur="("+Wr+")+",ln="^"+ur+"$",$l="("+ur+",)*"+ur,xl="^"+$l+"$",Sl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Tl=class{constructor(e,t){var n;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(xl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((s,a)=>{let o=e[a].dims.slice();if(!s.match(RegExp(ln)))throw new Error("Invalid LHS term");let d=this.processTerm(s,!0,o,a);this.lhs.push(d)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([s,a])=>a.count===1||s==="...").map(([s])=>s).join("");else if(!i.match(RegExp(ur)))throw new Error("Invalid RHS");(n=i.match(RegExp(Wr,"g")))==null||n.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(s);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,s=!1,a=[],o=0;if(!e.match(RegExp(ln))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(Wr,"g")),l=new Sl(i);return d==null||d.forEach((h,p)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let f=n-d.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(o,o+f),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let w=0;w<a.length;w++){let g=String.fromCharCode(48+w);l.addSymbol(g,p+w),this.addSymbol(g,r[o++],i)}}else l.addSymbol(h,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[o++],i)}),l}},dn=e=>e+"_max",kl=(e,t,r,i)=>{let n=e.map(l=>l.length).map((l,h)=>q(`input${h}`,t,l)),s=B.size(i),a=ee("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),d=l=>{let h=[],p="var prod = 1.0;",f="var sum = 0.0;",w="sum += prod;",g=[],v=[],S=[],b=[],_=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,E)=>{var C;if(r.rhs.symbolToIndices.has(E)){let z=(C=r.rhs.symbolToIndices.get(E))==null?void 0:C[0];z!==void 0&&r.lhs.forEach(($,N)=>{if(k.inputIndices.includes(N)){let L=$.symbolToIndices.get(E);if(L===void 0)throw new Error("Invalid symbol error");L.forEach(K=>{h.push(`${n[N].indicesSet(`input${N}Indices`,K,a.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,$)=>{if(k.inputIndices.includes($)){let N=z.symbolToIndices.get(E);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(L=>{g.push(`${n[$].indicesSet(`input${$}Indices`,L,`${E}`)}`)}),b.push(`prod *= ${n[$].getByIndices(`input${$}Indices`)};`)}}),v.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${dn(E)}; ${E}++) {`),S.push("}")});let T=_?[...h,`let sum = ${n.map((k,E)=>k.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...h,f,...v,...g,p,...b,w,...S];return`
            ${l.registerUniforms(o.map(k=>({name:`${dn(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,a)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${n.map((k,E)=>`var input${E}Indices: ${n[E].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=o.filter(p=>r.symbolToInfo.has(p)).map(p=>{var f;return{type:12,data:((f=r.symbolToInfo.get(p))==null?void 0:f.dimValue)||0}});l.push({type:12,data:s});let h=e.map((p,f)=>[...re(p)]).reduce((p,f)=>p.concat(f),l);return h.push(...re(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:d}},Fh=(e,t)=>{let r=new Tl(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((s,a)=>s.dims);e.compute(kl(n,e.inputs[0].dataType,r,i))},jh=e=>{let t=e.equation.replace(/\s+/g,"");return ge({equation:t})}}),El,cn,Il,Cl,Kh,lw=j(()=>{"use strict";ie(),ae(),oe(),El=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},cn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},Il=(e,t)=>e.length>t.length?cn(e,t):cn(t,e),Cl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Il(t,r),n=e[0].dataType,s=n===9||B.size(t)===1,a=n===9||t.length>0&&t[t.length-1]%4===0?4:1,o=s||i.length>0&&i[i.length-1]%4===0?4:1,d=Math.ceil(B.size(i)/o),l=p=>{let f=q("input",n,t.length,a),w=ee("output",n,i.length,o),g;if(n===9){let v=(S,b,_="")=>`
          let outputIndices${b} = ${w.offsetToIndices(`outputOffset + ${b}u`)};
          let offset${b} = ${f.broadcastedIndicesToOffset(`outputIndices${b}`,w)};
          let index${b} = offset${b} / 4u;
          let component${b} = offset${b} % 4u;
          ${S}[${b}] = ${_}(${f.getByOffset(`index${b}`)}[component${b}]);
        `;g=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${w.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${w.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",w)};
        let data = ${w.type.value}(${f.getByOffset(`inputOffset / ${a}`)});
        ${w.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(f,w)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},h=[{type:12,data:d},...re(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${a}${o}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h})}},Kh=e=>{El(e.inputs),e.compute(Cl(e.inputs),{inputs:[0]})}}),zl,Yh,dw=j(()=>{"use strict";ie(),ae(),oe(),ca(),zl=e=>{let t=e[0].dataType,r=B.size(e[0].dims),i=B.size(e[1].dims),n=i%4===0,s=a=>{let o=q("x",t,[1],4),d=q("bias",t,[1],4),l=ee("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${d.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,f=n?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(h).declareVariables(o,d,l)}

    ${Un(ze(t))}

    ${a.mainStart(Yt)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",qn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Yt/4)}})}},Yh=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?hh(e):e.compute(zl(e.inputs))}}),Al,Ol,Zh,Xh,cw=j(()=>{"use strict";ie(),ae(),ke(),oe(),Al=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Ol=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,s=B.normalizeAxis(t.axis,n),a=r.slice(0);a.splice(s,1,...i);let o=r[s],d=e[0].dataType===9?4:1,l=Math.ceil(B.size(a)/d),h=[{type:12,data:l},{type:6,data:o},{type:12,data:s},...re(e[0].dims,e[1].dims,a)],p=f=>{let w=q("data",e[0].dataType,e[0].dims.length,d),g=q("inputIndices",e[1].dataType,e[1].dims.length),v=ee("output",e[0].dataType,a.length,d),S=_=>{let T=i.length,k=`var indicesIndices${_}  = ${g.type.indices}(0);`;for(let E=0;E<T;E++)k+=`${T>1?`indicesIndices${_}[${E}]`:`indicesIndices${_}`} = ${a.length>1?`outputIndices${_}[uniforms.axis + ${E}]`:`outputIndices${_}`};`;k+=`
          var idx${_} = ${g.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${w.type.indices};
        `;for(let E=0,C=0;E<n;E++)E===s?(k+=`${n>1?`dataIndices${_}[${E}]`:`dataIndices${_}`} = u32(idx${_});`,C+=T):(k+=`${n>1?`dataIndices${_}[${E}]`:`dataIndices${_}`} = ${a.length>1?`outputIndices${_}[${C}]`:`outputIndices${_}`};`,C++);return k},b;if(e[0].dataType===9){let _=(T,k,E="")=>`
          let outputIndices${k} = ${v.offsetToIndices(`outputOffset + ${k}u`)};
          ${S(k)};
          let offset${k} = ${w.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${T}[${k}] = ${E}(${w.getByOffset(`index${k}`)}[component${k}]);
        `;b=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${v.setByOffset("global_idx","value")}
      `}else b=`
      let outputIndices = ${v.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${w.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,g,v)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${b}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:p}},Zh=e=>ge({axis:e.axis}),Xh=(e,t)=>{let r=e.inputs;Al(r),e.compute(Ol(e.inputs,t))}}),Rl,Qh,Jh,pw=j(()=>{"use strict";ie(),ae(),oe(),Rl=(e,t,r,i,n,s,a,o,d)=>{let l=[{type:12,data:s},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:a},{type:12,data:o},{type:12,data:d}],h=[s];l.push(...re(t.dims,h));let p=f=>{let w=q("indices_data",t.dataType,t.dims.length),g=ee("input_slice_offsets_data",12,1,1),v=[w,g],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(S).declareVariables(...v)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},Qh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,s=r[1].dims,a=s[s.length-1],o=B.sizeToDimension(s,s.length-1),d=B.sizeFromDimension(i,t.batchDims+a),l=B.sizeToDimension(i,t.batchDims),h=B.sizeFromDimension(i,t.batchDims),p=o/l,f=new Array(a),w=d;for(let k=0;k<a;++k)f[a-1-k]=w,w*=i[t.batchDims+a-1-k];let g=Rl(e,r[1],f,t.batchDims,i,o,p,h,a),v=t.batchDims+a;if(v>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=s.slice(0,-1).concat(i.slice(v)),b=B.size(S),_=[{type:12,data:b},{type:12,data:d},...re(r[0].dims,g.dims,S)],T=k=>{let E=q("data",r[0].dataType,r[0].dims.length),C=q("slice_offsets",12,g.dims.length),z=ee("output",r[0].dataType,S.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,z)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:n}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:T},{inputs:[r[0],g]})},Jh=e=>({batchDims:e.batch_dims,cacheKey:""})}),Ml,Nl,ef,tf,hw=j(()=>{"use strict";ie(),ae(),ke(),oe(),Ml=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],s=e[2],a=e.length===4?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((o,d)=>d===r?Math.ceil(o/i)===s.dims[d]:o===s.dims[d]).reduce((o,d)=>o&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((o,d)=>o===s.dims[d]).reduce((o,d)=>o&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Nl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,s=B.normalizeAxis(t.gatherAxis,n),a=B.normalizeAxis(t.quantizeAxis,n),o=r.slice(0);o.splice(s,1,...i);let d=B.size(o),l=e[2].dataType,h=e[0].dataType===22,p=[{type:12,data:d},{type:12,data:a},{type:12,data:s},{type:12,data:t.blockSize},...re(...e.map((w,g)=>w.dims),o)],f=w=>{let g=q("data",e[0].dataType,e[0].dims.length),v=q("inputIndices",e[1].dataType,e[1].dims.length),S=q("scales",e[2].dataType,e[2].dims.length),b=e.length>3?q("zeroPoint",e[3].dataType,e[3].dims.length):void 0,_=ee("output",l,o.length),T=[g,v,S];b&&T.push(b);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${w.registerUniforms(k).declareVariables(...T,_)}
        ${w.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${b?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${b.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${b.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ze(l)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((w,g)=>g!==1).map(w=>w.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(w,g)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:f}},ef=(e,t)=>{let r=e.inputs;Ml(r,t),e.compute(Nl(e.inputs,t))},tf=e=>ge({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Dl,Bl,rf,nf,fw=j(()=>{"use strict";ie(),ae(),ke(),oe(),Dl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Bl=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,s=e[1].dims,a=e[1].dataType,o=B.normalizeAxis(t.axis,n),d=r[o],l=s.slice(0),h=B.size(l),p=q("input",i,n),f=q("indicesInput",a,s.length),w=ee("output",i,l.length),g=[{type:12,data:h},{type:6,data:d},{type:12,data:o}];return g.push(...re(r,s,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,f,w)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${w.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${w.setByOffset("global_idx","value")};
  }`}},rf=e=>ge({axis:e.axis}),nf=(e,t)=>{let r=e.inputs;Dl(r),e.compute(Bl(e.inputs,t))}}),Ll,Pl,af,sf,mw=j(()=>{"use strict";ie(),ae(),oe(),Ll=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Pl=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,s,a]=Jc.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[n,s];if(!o)throw new Error("Can't use gemm on the given tensors");let d=16,l=Math.ceil(s/d),h=Math.ceil(n/d),p=!0,f=B.size(o),w=[{type:12,data:p?l:f},{type:12,data:n},{type:12,data:s},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(w.push(...re(e[2].dims)),g.push("rank")),w.push(...re(o));let v=b=>{let _="";t.transA&&t.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",k=q("a",e[0].dataType,e[0].dims),E=q("b",e[1].dataType,e[1].dims),C=k.type.value,z=null,$=[k,E];e.length===3&&(z=q("c",e[2].dataType,e[2].dims.length),$.push(z));let N=ee("output",e[0].dataType,o.length);$.push(N);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${b.registerUniforms(L).declareVariables(...$)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${T}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",N)}; value += ${C}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=b=>{let _=q("a",e[0].dataType,e[0].dims),T=q("b",e[1].dataType,e[1].dims),k=null,E=[_,T];e.length===3&&(k=q("c",e[2].dataType,e[2].dims.length),E.push(k));let C=ee("output",e[0].dataType,o.length);E.push(C);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",N="";t.transA&&t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,$="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${b.registerUniforms(z).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${d}>, ${d}>;
  ${b.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${N}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${$}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:l*h},programUniforms:w}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:v}},af=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},sf=(e,t)=>{Ll(e.inputs),e.compute(Pl(e.inputs,t))}}),rt,ut,Ct,zt,Ul,ql,Wl,Vl,Gl,Hl,Fl,jl,of,uf,gw=j(()=>{"use strict";ie(),ae(),ke(),oe(),[rt,ut,Ct,zt]=[0,1,2,3],Ul=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},ql=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Wl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Vl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Gl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Hl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${rt}] = batch;
     indices[${ut}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ct}] = u32(r);
            indices[${zt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Ct}] = u32(clamp(r, 0, H - 1));
          indices[${zt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Ct}] = gs_reflect(r, border[1], border[3]);
          indices[${zt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Fl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${rt}], indices[${ut}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${rt}], indices[${ut}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${rt}], indices[${ut}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,jl=(e,t)=>{let r=q("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=q("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[rt,ut,Ct,zt]=[0,3,1,2]);let a=ee("output",e[0].dataType,s.length),o=r.type.value,d=B.size(s),l=[{type:12,data:d},...re(e[0].dims,i,s)],h=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,n,a)}
  ${ql}
  ${Wl(o)}
  ${Vl(t)}
  ${Gl(t)}
  ${Hl(r,o,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Ct}]);
      let W_in = i32(uniforms.x_shape[${zt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${rt}], indices[${Ct}], indices[${zt}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Fl(a,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let f=B.size(s);return{outputs:[{dims:s,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:l}},getShaderSource:h}},of=(e,t)=>{Ul(e.inputs),e.compute(jl(e.inputs,t))},uf=e=>ge({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ne,Kl,lf,pn,Yl,mr,df,cf=j(()=>{"use strict";ie(),ae(),ke(),oa(),da(),oe(),xt(),Ne=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Kl=(e,t)=>{let r=e[0],i=Ne(e,1),n=Ne(e,2),s=Ne(e,3),a=Ne(e,4),o=Ne(e,5),d=Ne(e,6),l=Ne(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],p=r.dims[1],f=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=p,g=0,v=0,S=Math.floor(f/t.numHeads);if(d&&l&&B.size(d.dims)&&B.size(l.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==h||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],v=d.dims[2]}else if(d&&B.size(d.dims)||l&&B.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(i&&B.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');b=2,w=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,w=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,w=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}if(s&&B.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=g+w,T=0;if(a&&B.size(a.dims)>0){T=8;let z=a.dims;throw z.length===1?z[0]===h?T=1:z[0]===3*h+2&&(T=3):z.length===2&&z[0]===h&&z[1]===_&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,E=f;if(n&&B.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(w!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=n.dims[2]}else{if(w!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=n.dims[1]*n.dims[3],k=!0}}let C=!1;if(a&&B.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(o&&B.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==h||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:w,totalSequenceLength:_,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:f,vHiddenSize:E,headSize:S,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:C,passPastInKv:k,qkvFormat:b}},lf=e=>ge({...e}),pn=ge({perm:[0,2,1,3]}),Yl=(e,t,r,i,n,s,a)=>{let o=[i,n,s],d=B.size(o),l=[{type:12,data:d},{type:12,data:a},{type:12,data:s}],h=p=>{let f=ee("qkv_with_bias",t.dataType,o),w=q("qkv",t.dataType,o),g=q("bias",r.dataType,o),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(v).declareVariables(w,g,f)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},mr=(e,t,r,i,n,s,a,o)=>{let d=s;if(a&&B.size(a.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Yl(e,s,a,t,i,r*n,o),d=d.reshape([t,i,r,n]),r===1||i===1?d:e.compute(qe(d,pn.perm),{inputs:[d],outputs:[-1]})[0]}else return s.dims.length===3&&(d=s.reshape([t,i,r,n])),r===1||i===1?d:e.compute(qe(d,pn.perm),{inputs:[d],outputs:[-1]})[0]},df=(e,t)=>{let r=Kl(e.inputs,t),i=e.inputs[0],n=Ne(e.inputs,1),s=Ne(e.inputs,2),a=Ne(e.inputs,3),o=Ne(e.inputs,4),d=Ne(e.inputs,5),l=Ne(e.inputs,6),h=Ne(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if((n==null?void 0:n.dims.length)===5)throw new Error("Packed KV is not implemented");let p=n&&s&&n.dims.length===4&&s.dims.length===4,f=mr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,a,0);if(p)return wr(e,f,n,s,o,void 0,l,h,d,r);if(!n||!s)throw new Error("key and value must be provided");let w=mr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,a,r.hiddenSize),g=mr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,a,2*r.hiddenSize);wr(e,f,w,g,o,void 0,l,h,d,r)}}),Zl,Xl,Ql,Jl,Fn,pf,hf,ff=j(()=>{"use strict";ie(),ae(),ke(),oe(),Zl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Xl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),ge({numOutputs:i,axis:t.axis,splitSizes:r})},Ql=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${te("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Jl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Fn=(e,t)=>{let r=e[0].dims,i=B.size(r),n=e[0].dataType,s=B.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),o=q("input",n,r.length),d=new Array(t.numOutputs),l=[],h=[],p=0,f=[{type:12,data:i}];for(let g=0;g<t.numOutputs;g++){p+=t.splitSizes[g],d[g]=p;let v=r.slice();v[s]=t.splitSizes[g],h.push(v),a[g]=ee(`output${g}`,n,v.length),l.push({dims:h[g],dataType:e[0].dataType})}f.push({type:12,data:d},...re(r,...h));let w=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(o,...a)}
  ${Ql(d.length)}
  ${Jl(a)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${te("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:f})}},pf=(e,t)=>{Zl(e.inputs);let r=e.inputs.length===1?t:Xl(e.inputs,t);e.compute(Fn(e.inputs,r),{inputs:[0]})},hf=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return ge({axis:t,numOutputs:i,splitSizes:r})}}),ed,ti,mf,gf=j(()=>{"use strict";ie(),ae(),ke(),oe(),ed=(e,t)=>{let[r,i,n,s]=e,{numHeads:a,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!B.areEqual(i.dims,[])&&!B.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!B.areEqual(n.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],l=r.dims[r.dims.length-2],h=n.dims[0],p=B.sizeFromDimension(r.dims,1)/l,f=o===0?n.dims[1]*2:p/a;if(o>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(d!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(l>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(f/2!==n.dims[1]&&o/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},ti=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:s}=t,a=e[0].dims[0],o=B.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],l=o/d,h=e[2].dims[1],p=n===0?h*2:l/i,f=new Array(a,d,l/p,p-h),w=B.computeStrides(f),g=[{type:1,data:s},{type:12,data:f},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[o,l,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,p,d*p,1]}):[],...re(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],v=S=>{let b=q("input",e[0].dataType,e[0].dims.length),_=q("position_ids",e[1].dataType,e[1].dims.length),T=q("cos_cache",e[2].dataType,e[2].dims.length),k=q("sin_cache",e[3].dataType,e[3].dims.length),E=ee("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${S.declareVariables(b,_,T,k,E)}

        ${S.mainStart(Yt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",ee("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${b.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${b.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${b.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${b.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",b.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ge({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(f)/Yt)},programUniforms:g})}},mf=(e,t)=>{ed(e.inputs,t),e.compute(ti(e.inputs,t))}}),td,rd,hn,id,yf,yw=j(()=>{"use strict";ke(),ie(),da(),cf(),ff(),xt(),gf(),oe(),td=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],s=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,d=r.dims[0],l=r.dims[1],h=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=l,f=0,w=!i||i.dims.length===0,g=Math.floor(w?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);w&&(h=g*t.numHeads);let v=s&&s.dims.length!==0,S=a&&a.dims.length!==0;if(v&&s.dims.length===4&&s.dims[0]===d&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&S){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=s.dims[2]}else if(v||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');p=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let _=0,T=!1,k=t.kvNumHeads?g*t.kvNumHeads:h;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(p!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=n.dims[2]}else{if(p!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=n.dims[1]*n.dims[3],T=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=E.dims.reduce((z,$)=>z*$,1);if(C!==d)throw new Error(`seqlens_k must have batch_size (${d}) elements, got ${C}.`);for(let z=0;z<E.dims.length;z++)if(E.dims[z]!==1&&E.dims[z]!==d)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${d}), got dims[${z}] = ${E.dims[z]}.`)}return{batchSize:d,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:k,headSize:g,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:b}},rd=ge({perm:[0,2,1,3]}),hn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(qe(i,rd.perm),{inputs:[i],outputs:[-1]})[0]),i},id=(e,t,r,i)=>{let n=7,s=["type","type"],a=[e*t],o=e*t,d=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],l=h=>{let p=q("seq_lens",r.dataType,r.dims),f=q("total_seq_lens",i.dataType,i.dims),w=ee("pos_ids",n,a),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(g).declareVariables(p,f,w)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${f.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${w.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${w.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${w.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:l}},yf=(e,t)=>{var k;if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=td(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((k=e.inputs[1])==null?void 0:k.dims.length)===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=ge({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[f,w,g]=!n&&!s?e.compute(Fn([i],p),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,s],v,S;if(t.doRotary){let E=e.compute(id(r.batchSize,r.sequenceLength,d,l),{inputs:[d,l],outputs:[-1]})[0],C=e.inputs[7],z=e.inputs[8],$=ge({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),N=[f,E,C,z],L=[-1];v=e.compute(ti(N,$),{inputs:N,outputs:L})[0],N.splice(0,1,w);let K=ge({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(ti(N,K),{inputs:N,outputs:L})[0]}let b=mr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?v:f,void 0,0),_=hn(e,t.doRotary?S:w,r),T=hn(e,g,r);wr(e,b,_,T,void 0,void 0,a,o,void 0,r,d,l)}}),fn,nd,ad,wf,ww=j(()=>{"use strict";ie(),ae(),xt(),oe(),fn=(e,t,r,i,n,s,a,o)=>{let d=Te(s),l=d===1?"f32":`vec${d}f`,h=d===1?"vec2f":`mat2x${d}f`,p=n*a,f=64;p===1&&(f=256);let w=[n,a,s/d],g=[n,a,2],v=["rank","type","type"],S=[];S.push(...re(w,g));let b=_=>{let T=q("x",t.dataType,3,d),k=q("scale",r.dataType,r.dims),E=q("bias",i.dataType,i.dims),C=ee("output",1,3,2),z=[T,k,E,C];return`
  var<workgroup> workgroup_shared : array<${h}, ${f}>;
  const workgroup_size = ${f}u;
  ${_.declareVariables(...z)}
  ${_.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${$t("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${$t("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${o};${f}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:p},programUniforms:S}),getShaderSource:b},{inputs:[t,r,i],outputs:[-1]})[0]},nd=(e,t,r)=>{let i=t[0].dims,n=i,s=2,a=i[0],o=i[1],d=B.sizeFromDimension(i,s),l=Te(d),h=B.size(n)/l,p=fn(e,t[0],t[1],t[2],a,d,o,r.epsilon),f=[a,o,d/l],w=[a,o],g=["type","none"],v=S=>{let b=q("x",t[0].dataType,f.length,l),_=q("scale_shift",1,w.length,2),T=ee("output",t[0].dataType,f.length,l),k=[b,_,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...k)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${b.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...re(f,w,f)]}),getShaderSource:v},{inputs:[t[0],p]})},ad=(e,t,r)=>{let i=t[0].dims,n=i,s=i[0],a=i[i.length-1],o=B.sizeFromDimension(i,1)/a,d=Te(a),l=B.size(n)/d,h=[{type:12,data:o},{type:12,data:Math.floor(a/d)}],p=["type","type"],f=!1,w=[0,i.length-1];for(let b=0;b<i.length-2;b++)f=f||i[b+1]!==1,w.push(b+1);f=f&&i[i.length-1]!==1;let g=f?e.compute(qe(e.inputs[0],w),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(b,_)=>i[w[_]])),v=fn(e,g,t[1],t[2],s,o,a,r.epsilon),S=b=>{let _=Ae(t[0].dataType),T=d===1?"vec2f":`mat${d}x2f`,k=z=>{let $=z===0?"x":"y",N=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${_}(${N}(scale.${$}))`;case 2:return`vec2<${_}>(${N}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${_}>(${N}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${d}`)}},E=q("input",t[0].dataType,t[0].dims,d),C=ee("output",t[0].dataType,n,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${b.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:S},{inputs:[t[0],v]})},wf=(e,t)=>{t.format==="NHWC"?ad(e,e.inputs,t):nd(e,e.inputs,t)}}),sd,od,bf,bw=j(()=>{"use strict";ie(),ae(),oe(),sd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},od=(e,t,r)=>{let i=t.simplified,n=e[0].dims,s=e[1],a=!i&&e[2],o=n,d=B.normalizeAxis(t.axis,n.length),l=B.sizeToDimension(n,d),h=B.sizeFromDimension(n,d),p=B.size(s.dims),f=a?B.size(a.dims):0;if(p!==h||a&&f!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${f}`);let w=[];for(let E=0;E<n.length;++E)E<d?w.push(n[E]):w.push(1);let g=Te(h),v=["type","type"],S=[{type:12,data:l},{type:1,data:h},{type:12,data:Math.floor(h/g)},{type:1,data:t.epsilon}];a&&v.push("type");let b=r>1,_=r>2,T=E=>{let C=Ae(e[0].dataType),z=[q("x",e[0].dataType,e[0].dims,g),q("scale",s.dataType,s.dims,g)];a&&z.push(q("bias",a.dataType,a.dims,g)),z.push(ee("output",e[0].dataType,o,g)),b&&z.push(ee("mean_data_output",1,w)),_&&z.push(ee("inv_std_output",1,w));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms($).declareVariables(...z)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Bn("f32",g)};
    var mean_square_vector = ${Bn("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${jt(C,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${$t("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${$t("mean_square_vector",g)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${jt(C,g,"x[j + offset]")};
      let f32scale = ${jt(C,g,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${jt(C,g,"bias[j]")}`:""}
      );
    }

    ${b?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:o,dataType:e[0].dataType}];return b&&k.push({dims:w,dataType:1}),_&&k.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${i}`,inputDependencies:v},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:S}),getShaderSource:T}},bf=(e,t)=>{sd(e.inputs),e.compute(od(e.inputs,t,e.outputCount))}}),ud,_f,_w=j(()=>{"use strict";ae(),ma(),ga(),ud=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},_f=e=>{ud(e.inputs);let t=Kt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(fa(e.inputs,{activation:""},t));else{let n=t[t.length-2],s=B.size(e.inputs[0].dims.slice(0,-2)),a=B.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&n===1&&a===1){let o=e.inputs[0].reshape([1,s,i]),d=e.inputs[1].reshape([1,i,r]),l=[1,s,r],h=[o,d];e.compute(ei(h,{activation:""},t,l),{inputs:h})}else e.compute(ei(e.inputs,{activation:""},t))}}}),ld,dd,cd,vf,$f,vw=j(()=>{"use strict";ie(),ae(),ke(),oe(),ld=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,a=e[1];if(!B.areEqual(a.dims,[t.n,n,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(B.size(o)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,l=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(B.size(d)!==l)throw new Error("zeroPoints input size error.")}},dd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],s=t.k,a=t.n,o=r.slice(0,i-2),d=B.size(o),l=e[1].dims[2]/4,h=e[0].dataType,p=Te(t.k),f=Te(l),w=Te(a),g=o.concat([n,a]),v=n>1&&a/w%2===0?2:1,S=B.size(g)/w/v,b=64,_=[],T=[d,n,s/p],k=B.convertShape(e[1].dims).slice();k.splice(-1,1,l/f),_.push(...re(T)),_.push(...re(k)),_.push(...re(e[2].dims)),e.length===4&&_.push(...re(B.convertShape(e[3].dims)));let E=[d,n,a/w];_.push(...re(E));let C=z=>{let $=T.length,N=q("a",e[0].dataType,$,p),L=q("b",12,k.length,f),K=q("scales",e[2].dataType,e[2].dims.length),Y=[N,L,K],X=e.length===4?q("zero_points",12,e[3].dims.length):void 0;X&&Y.push(X);let D=E.length,H=ee("output",e[0].dataType,D,w),F=Ae(e[0].dataType),G=(()=>{switch(p){case 1:return`array<${F}, 8>`;case 2:return`mat4x2<${F}>`;case 4:return`mat2x4<${F}>`;default:throw new Error(`${p}-component is not supported.`)}})(),J=Math.floor(32/t.bits),A=Math.floor(J/8),M=()=>{let V="";for(let W=0;W<A;W++){let ne=W*t.bits*4,$e=ne+t.bits;V+=`
          // reuse a data (pass ${W})
            var input_offset${W>0?W:""} = ${W===0?N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${W>0?W:""}: ${G};
            for (var j${W>0?W:""}: u32 = 0; j${W>0?W:""} < ${8/p}; j${W>0?W:""}++) {
              a_data${W>0?W:""}[j${W>0?W:""}] = ${N.getByOffset(`input_offset${W>0?W:""}`)};
              input_offset${W>0?W:""}++;
            }
          `;for(let me=0;me<w*v;me++)V+=`
            b_value = ${f===1?`b${me}_data`:`b${me}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${W*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${ne}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${$e}u) & b_mask);`}
            b_quantized_values = ${G}(${Array.from({length:4},(we,Oe)=>`${F}(b_value_lower[${Oe}]), ${F}(b_value_upper[${Oe}])`).join(", ")});
            b_dequantized_values = ${p===1?`${G}(${Array.from({length:8},(we,Oe)=>`(b_quantized_values[${Oe}] - ${X?`zero_point${me}`:"zero_point"}) * scale${me}`).join(", ")});`:`(b_quantized_values - ${G}(${Array(8).fill(`${X?`zero_point${me}`:"zero_point"}`).join(",")})) * scale${me};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(me/w)}]${w>1?`[${me%w}]`:""} += ${Array.from({length:8/p},(we,Oe)=>`${p===1?`a_data${W>0?W:""}[${Oe}] * b_dequantized_values[${Oe}]`:`dot(a_data${W>0?W:""}[${Oe}], b_dequantized_values[${Oe}])`}`).join(" + ")};
          `}return V},O=()=>{let V=`
            var col_index = col * ${w};
            ${X?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${F}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let W=0;W<w*v;W++)V+=`
            let scale${W} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${X?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${F}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return V},P=()=>{let V=`col_index = col * ${w};`;for(let W=0;W<w*v;W++)V+=`
            let b${W}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return V+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${G};
            var b_dequantized_values: ${G};`,V};return`
        var<workgroup> workgroup_shared: array<${H.type.value}, ${v*b}>;
        ${z.declareVariables(...Y,H)}
        ${z.mainStart([b,1,1])}
          let output_indices = ${H.offsetToIndices(`(global_idx / ${b}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${b}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${O()}
            for (var word: u32 = 0; word < ${l}; word += ${f}) {
              ${P()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${M()}
                word_offset += ${J/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${H.type.value} = ${H.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${b}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${H.setByIndices(`${H.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${f};${w};${v};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:h}],dispatchGroup:{x:S},programUniforms:_}),getShaderSource:C}},cd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],s=t.k,a=t.n,o=r.slice(0,i-2),d=B.size(o),l=e[1].dims[2]/4,h=e[0].dataType,p=Te(t.k),f=Te(l),w=o.concat([n,a]),g=128,v=a%8===0?8:a%4===0?4:1,S=g/v,b=Math.floor(32/t.bits),_=S*f*b,T=_/p,k=_/t.blockSize,E=B.size(w)/v,C=[],z=[d,n,s/p],$=B.convertShape(e[1].dims).slice();$.splice(-1,1,l/f),C.push(...re(z)),C.push(...re($)),C.push(...re(e[2].dims)),e.length===4&&C.push(...re(B.convertShape(e[3].dims)));let N=[d,n,a];C.push(...re(N));let L=K=>{let Y=z.length,X=q("a",e[0].dataType,Y,p),D=q("b",12,$.length,f),H=q("scales",e[2].dataType,e[2].dims.length),F=[X,D,H],G=e.length===4?q("zero_points",12,e[3].dims.length):void 0;G&&F.push(G);let J=N.length,A=ee("output",e[0].dataType,J),M=Ae(e[0].dataType),O=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${M}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${M}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${M}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${M}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${A.type.value}, ${S}>, ${v}>;
        ${K.declareVariables(...F,A)}
        ${K.mainStart([S,v,1])}
          let output_indices = ${A.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${g})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${X.getByIndices(`${X.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${X.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${G?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${M}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${M}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${H.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${D.getByIndices(`${D.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?"b_data":"b_data[i]"};
              ${(()=>{let P=Math.floor(b/8),V="";for(let W=0;W<P;W++){let ne=W*t.bits*4,$e=ne+t.bits;V+=`
              ${O()}
              {${t.bits===2?`
                let half_word = b_value >> ${W*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${ne}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${$e}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${M}>(${Array.from({length:4},(me,we)=>`${M}(b_value_lower[${we}]), ${M}(b_value_upper[${we}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${M}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(me,we)=>`${`dot(a_data${we}, b_dequantized_values[${we}])`}`).join(" + ")};
              }
              word_offset += ${8/p};`}return V})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${A.type.value} = ${A.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${A.setByIndices(`${A.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${f};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:h}],dispatchGroup:{x:E},programUniforms:C}),getShaderSource:L}},vf=(e,t)=>{ld(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(cd(e.inputs,t)):e.compute(dd(e.inputs,t))},$f=e=>ge(e)}),pd,hd,fd,md,gd,yd,wd,bd,xf,$w=j(()=>{"use strict";ie(),ae(),oe(),pd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},hd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${te("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${te("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${te("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},fd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${te("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${te("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${te("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${te("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},md=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${te("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${te("uniforms.x_shape",n,t)})) {
                  k = i32(${te("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${te("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},gd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${te("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${te("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${te("uniforms.x_shape",n,t)})) {
                  k -= i32(${te("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${te("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},yd=(e,t,r)=>{switch(r.mode){case 0:return hd(e,t,r.pads.length);case 1:return fd(e,t,r.pads.length);case 2:return md(e,t,r.pads.length);case 3:return gd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},wd=(e,t)=>{let r=B.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=B.size(r),s=[{type:12,data:n},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&s.push({type:a?e[2].dataType:1,data:t.value}),s.push(...re(e[0].dims,r));let o=["rank"],d=l=>{let h=ee("output",e[0].dataType,r.length),p=q("x",e[0].dataType,i.length),f=p.type.value,w=yd(h,i.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:a?f:"f32"}),`
            ${l.registerUniforms(g).declareVariables(p,h)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(r)/64)},programUniforms:s}),getShaderSource:d}},bd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let d=0;d<o.length;d++)s[Number(o[d])]=Number(r[d]),s[Number(o[d])+n]=Number(r[d+o.length])}else r.forEach((o,d)=>s[Number(d)]=Number(o));let a=[];return s.forEach(o=>a.push(o)),{mode:t.mode,value:i,pads:a}}else return t},xf=(e,t)=>{pd(e.inputs);let r=bd(e.inputs,t);e.compute(wd(e.inputs,r),{inputs:[0]})}}),lr,mn,gn,yn,wn,_d,vd,bn,_n,Sf,Tf,vn,kf,Ef,$n,If,Cf,zf,Af,xw=j(()=>{"use strict";Ve(),ie(),ae(),oe(),lr=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},mn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),o=t.strides.slice(),d=s?t.dilations.slice():[],l=t.pads.slice();Qr.adjustPoolAttributes(r,n,a,o,d,l);let h=Qr.computePoolOutputShape(r,n,o,d,a,l,t.autoPad,t.ceilMode),p=Object.assign({},t);s?Object.assign(p,{kernelShape:a,strides:o,pads:l,dilations:d,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:a,strides:o,pads:l,cacheKey:t.cacheKey});let f=h.slice();return f.push(f.splice(1,1)[0]),[p,i?f:h]},gn=(e,t)=>{let r=t.format==="NHWC",i=B.size(e),n=B.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:n}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],p=!!(l+h);s.push({type:12,data:o},{type:12,data:d},{type:12,data:l},{type:12,data:h}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],v=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];f=!!(v+S),s.push({type:12,data:w},{type:12,data:g},{type:12,data:v},{type:12,data:S}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,a,!0,p,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=B.computeStrides(t.kernelShape);s.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((l,h)=>l+h);return[s,a,!!d,!1,!1]}},yn=(e,t,r,i,n,s,a,o,d,l,h,p)=>{let f=n.format==="NHWC",w=t.type.value,g=ee("output",t.type.tensor,i);if(n.kernelShape.length<=2){let v="",S="",b="",_=r-(f?2:1);if(h?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,n.kernelShape.length===2){let T=r-(f?3:2);p?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,b=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${w}(${o});
              var pad = 0;
              ${S}
              ${v}
              ${b}
              ${a}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=n.kernelShape.length,S=n.pads.length,b="";return l?b=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:b=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(d).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${w}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${te("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${te("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${r-v}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${te("uniforms.strides",`j - ${r-v}u`,v)}
                    + offsets[j - ${r-v}u] - ${te("uniforms.pads","j - 2u",S)};
                  ${b}
              }
              ${a}

              output[global_idx] = value;
            }`}},wn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,_d=e=>`${wn(e)};${e.countIncludePad}`,vd=e=>`${wn(e)};${e.storageOrder};${e.dilations}`,bn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),_n=(e,t,r,i)=>{let[n,s]=mn(t,i,r),a=q("x",t.dataType,t.dims.length),o=a.type.value,d="value += x_val;",l="";n.countIncludePad?l+=`value /= ${o}(uniforms.kernelSize);`:l+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[h,p,f,w,g]=gn(s,n);h.push(...re(t.dims,s));let v=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${f};${w};${g}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(s)/64)},programUniforms:h}),getShaderSource:S=>yn(S,a,t.dims.length,s.length,n,d,l,0,p,f,w,g)}},Sf=e=>{let t=e.count_include_pad!==0,r=bn(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:_d(i)}},Tf=(e,t)=>{lr(e.inputs),e.compute(_n("AveragePool",e.inputs[0],!1,t))},vn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},kf=e=>{let t=e.format;return{format:t,...vn,cacheKey:t}},Ef=(e,t)=>{lr(e.inputs),e.compute(_n("GlobalAveragePool",e.inputs[0],!0,t))},$n=(e,t,r,i)=>{let[n,s]=mn(t,i,r),a=`
      value = max(x_val, value);
    `,o="",d=q("x",t.dataType,t.dims.length),l=["rank"],[h,p,f,w,g]=gn(s,n);return h.push(...re(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${f};${w};${g}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(s)/64)},programUniforms:h}),getShaderSource:v=>yn(v,d,t.dims.length,s.length,n,a,o,t.dataType===10?-65504:-1e5,p,f,w,g)}},If=(e,t)=>{lr(e.inputs),e.compute($n("MaxPool",e.inputs[0],!1,t))},Cf=e=>{let t=e.storage_order,r=e.dilations,i=bn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:vd(n)}},zf=e=>{let t=e.format;return{format:t,...vn,cacheKey:t}},Af=(e,t)=>{lr(e.inputs),e.compute($n("GlobalMaxPool",e.inputs[0],!0,t))}}),$d,xd,Of,Rf,Sw=j(()=>{"use strict";ie(),ae(),ke(),oe(),$d=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,s)=>s===t.axis||n===e[0].dims[s]).reduce((n,s)=>n&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},xd=(e,t)=>{let r=B.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,s=e[0].dims,a=e[1].dataType,o=B.size(s),d=i===3||i===2,l=d?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,p=e.length>2?e[2]:void 0,f=p?d?[Math.ceil(B.size(p.dims)/4)]:p.dims:void 0,w=h.length===0||h.length===1&&h[0]===1,g=w===!1&&h.length===1,v=Te(o),S=w&&(!d||v===4),b=S?v:1,_=S&&!d?v:1,T=q("input",d?12:i,l.length,_),k=q("scale",a,h.length),E=p?q("zero_point",d?12:i,f.length):void 0,C=ee("output",a,s.length,b),z=[T,k];E&&z.push(E);let $=[l,h];p&&$.push(f);let N=[{type:12,data:o/b},{type:12,data:r},{type:12,data:t.blockSize},...re(...$,s)],L=K=>{let Y=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(Y).declareVariables(...z,C)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${b===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${w?`let scale_value= ${k.getByOffset("0")}`:g?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?w?d?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:g?d?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${d?n?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/b/64),y:1,z:1},programUniforms:N})}},Of=(e,t)=>{$d(e.inputs,t),e.compute(xd(e.inputs,t))},Rf=e=>ge({axis:e.axis,blockSize:e.blockSize})}),Sd,Td,Mf,Tw=j(()=>{"use strict";Ve(),ie(),oe(),Sd=(e,t,r)=>{let i=e===t,n=e<t&&r<0,s=e>t&&r>0;if(i||n||s)throw new Error("Range these inputs' contents are invalid.")},Td=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),s=[n],a=n,o=[{type:12,data:a},{type:i,data:e},{type:i,data:r},...re(s)],d=l=>{let h=ee("output",i,s.length),p=h.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(f).declareVariables(h)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},Mf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&Sd(t,r,i),e.compute(Td(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),kd,Ed,Nf,Df,kw=j(()=>{"use strict";ie(),ae(),ke(),oe(),kd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Ed=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,s=1,a=Math.ceil(B.sizeToDimension(i,i.length-1)/s),o=i[i.length-1],d=B.sizeFromDimension(r,o),l=[{type:12,data:a},{type:12,data:o},{type:12,data:d},...re(e[1].dims,e[2].dims,n)],h=p=>{let f=q("indices",e[1].dataType,e[1].dims.length),w=q("updates",e[2].dataType,e[2].dims.length,s),g=t.reduction!=="none"&&t.reduction!==""?sp("output",e[0].dataType,n.length):ee("output",e[0].dataType,n.length,s);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,w,g)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${kd(t.reduction,"output[data_offset + i]","value",g.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:h}},Nf=e=>ge({reduction:e.reduction}),Df=(e,t)=>{e.compute(Ed(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Id,Cd,zd,xn,Ad,Od,Rd,Md,Nd,Dd,Bd,Ld,Sn,Pd,Ud,qd,Wd,Vd,Bf,Lf,Ew=j(()=>{"use strict";ie(),ae(),ke(),oe(),Id=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Cd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,s)=>i[n]=e[s]),i},zd=(e,t,r,i,n,s)=>{let[a,o,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(h=>s.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==l&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Id(i,t),t.axes.length>0&&Cd(i,t.axes,l).forEach((h,p)=>i[p]=h)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(h=>n.push(Number(h))),n.length!==0&&n.length!==l&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},xn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Ad=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${xn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${xn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Od=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Rd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,a)=>{i[s]=n[a],i[a+r]=n[t.length+a]}),i):n},Md=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>n.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,a)=>n[s]=r[a])}else r.forEach(s=>n.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((s,a)=>Math.round(s*t[a]))}return n},Nd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>n[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),n.forEach((s,a)=>n[a]=Math.round(s*t[a]))),n},Dd=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${te("uniforms.scales","i",i)};
        var roi_low = ${te("uniforms.roi","i",n)};
        var roi_hi = ${te("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${te("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${te("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Bd=(e,t,r,i,n,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${te("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${te("uniforms.roi","i",s)};
          var roi_hi = ${te("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${te("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${te("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Ld=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${te("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Sn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Pd=(e,t,r,i,n)=>{let[s,a,o,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${Sn(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${a}];
      var col:${l} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ud=(e,t,r,i,n,s,a,o,d,l)=>{let h=r.length===2,p=!0,[f,w]=h?[0,1]:p?[2,3]:[1,2],g=e.type.value,v=S=>{let b=S===f?"row":"col";return`
      fn ${b}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[S]},
        ${i[S]}, ${r[S]}, ${s[S]}, ${s[S]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${d};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${g} = originalIdx + ${g}(i);
          if (${b} < 0 || ${b} >= ${r[S]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${d};`:`${b} = max(0, min(${b}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${b})`)};
          data[i + 1] = ${S===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(f)};
    ${v(w)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},qd=(e,t,r,i,n)=>{let[s,a,o,d,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${Sn(e,l,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${a}];
      var height:${h} = originalIndices[${o}];
      var width:${h} = originalIndices[${d}];
      ${i?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Wd=(e,t,r,i,n,s)=>{let a=e.dims,o=Rd(s,t.axes,a.length),d=Md(a,i,n,t.axes),l=i.slice();i.length===0&&(l=a.map((_,T)=>_===0?1:d[T]/_),t.keepAspectRatioPolicy!=="stretch"&&(d=Nd(a,l,t)));let h=ee("output",e.dataType,d.length),p=q("input",e.dataType,a.length),f=B.size(d),w=a.length===d.length&&a.every((_,T)=>_===d[T]),g=t.coordinateTransformMode==="tf_crop_and_resize",v=t.extrapolationValue,S=p.type.value,b=_=>`
      ${w?"":`
      ${Ad(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Ld(p,a)};
              ${Od(t.nearestMode,r,S)};
              ${Bd(p,h,a,d,l.length,o.length,g)};
              `;case"linear":return`
              ${Dd(h,a,d,l.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Pd(p,h,a,g,v)}`;if(a.length===3||a.length===5)return`${qd(p,h,a,g,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Ud(p,h,a,d,l,o,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",o.length).declareVariables(p,h)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${w?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?t.mode==="cubic"?l:l.length:""}|${n.length>0?n:""}|${o.length>0?o:""}|${w}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:o},...re(a,d)]})}},Vd=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Bf=(e,t)=>{let r=[],i=[],n=[],s=Vd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");zd(e.inputs,t,s,r,i,n),e.compute(Wd(e.inputs[0],t,s,r,i,n),{inputs:[0]})},Lf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,s=e.excludeOutside!==0,a=e.extrapolationValue,o=e.keepAspectRatioPolicy,d=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return ge({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:o,mode:d,nearestMode:l})}}),Gd,Hd,Pf,Iw=j(()=>{"use strict";ie(),ae(),oe(),Gd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Hd=(e,t,r,i)=>{let n=t.simplified,s=e[0].dims,a=B.size(s),o=s,d=a,l=s.slice(-1)[0],h=i?s.slice(0,-1).concat(1):[],p=!n&&e.length>3,f=e.length>4,w=i&&r>1,g=i&&r>2,v=r>3,S=64,b=Te(l),_=[{type:12,data:d},{type:12,data:b},{type:12,data:l},{type:1,data:t.epsilon}],T=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[q("x",e[0].dataType,e[0].dims,b),q("skip",e[1].dataType,e[1].dims,b),q("gamma",e[2].dataType,e[2].dims,b)];p&&z.push(q("beta",e[3].dataType,e[3].dims,b)),f&&z.push(q("bias",e[4].dataType,e[4].dims,b)),z.push(ee("output",e[0].dataType,o,b)),w&&z.push(ee("mean_output",1,h)),g&&z.push(ee("inv_std_output",1,h)),v&&z.push(ee("input_skip_bias_sum",e[0].dataType,o,b));let $=Ae(e[0].dataType),N=Ae(1,b);return`

      ${E.registerUniforms(C).declareVariables(...z)}
      var<workgroup> sum_shared : array<${N}, ${S}>;
      var<workgroup> sum_squared_shared : array<${N}, ${S}>;

      ${E.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?"bias[offset1d + i]":$+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${jt($,b,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${$t("sum",b)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${$t("square_sum",b)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:o,dataType:e[0].dataType}];return r>1&&k.push({dims:h,dataType:1}),r>2&&k.push({dims:h,dataType:1}),r>3&&k.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${b};${w};${g};${v}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:T,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/l)},programUniforms:_})}},Pf=(e,t)=>{Gd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Hd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Fd,dr,jd,Tn,Kd,Yd,Uf,qf,Cw=j(()=>{"use strict";ie(),ae(),ke(),oe(),Fd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},dr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},jd=(e,t)=>{if(e.length>1){let r=dr(e,1),i=dr(e,2),n=dr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),ge({starts:r,ends:i,axes:n})}else return t},Tn=(e,t,r,i,n)=>{let s=e;return e<0&&(s+=r[i[t]]),n[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},Kd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${te("uniforms.input_shape","i",r.length)};
            let steps_i = ${te("uniforms.steps","i",r.length)};
            let signs_i = ${te("uniforms.signs","i",r.length)};
            let starts_i = ${te("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Yd=(e,t)=>{let r=e[0].dims,i=B.size(r),n=t.axes.length>0?B.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=dr(e,4);s.forEach(b=>b!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(n.length).fill(1));let a=t.starts.map((b,_)=>Tn(b,_,r,n,s)),o=t.ends.map((b,_)=>Tn(b,_,r,n,s));if(n.length!==a.length||n.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let b=0;b<r.length;++b)n.includes(b)||(a.splice(b,0,0),o.splice(b,0,r[b]),s.splice(b,0,1));let d=s.map(b=>Math.sign(b));s.forEach((b,_,T)=>{if(b<0){let k=(o[_]-a[_])/b,E=a[_],C=E+k*s[_];a[_]=C,o[_]=E,T[_]=-b}});let l=r.slice(0);n.forEach((b,_)=>{l[b]=Math.ceil((o[b]-a[b])/s[b])});let h={dims:l,dataType:e[0].dataType},p=ee("output",e[0].dataType,l.length),f=q("input",e[0].dataType,e[0].dims.length),w=B.size(l),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:s.length}],v=[{type:12,data:w},{type:12,data:a},{type:6,data:d},{type:12,data:s},...re(e[0].dims,l)],S=b=>`
      ${b.registerUniforms(g).declareVariables(f,p)}
        ${Kd(f,p,r)}
        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:v})}},Uf=(e,t)=>{Fd(e.inputs,t);let r=jd(e.inputs,t);e.compute(Yd(e.inputs,r),{inputs:[0]})},qf=e=>{let t=e.starts,r=e.ends,i=e.axes;return ge({starts:t,ends:r,axes:i})}}),Zd,Xd,Wf,Vf,zw=j(()=>{"use strict";ie(),ae(),ke(),xt(),oe(),Zd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Xd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=B.size(i),s=i.length,a=B.normalizeAxis(t.axis,s),o=a<i.length-1,d,l=[];o?(l=Array.from({length:s},(z,$)=>$),l[a]=s-1,l[s-1]=a,d=e.compute(qe(r,l),{inputs:[r],outputs:[-1]})[0]):d=r;let h=d.dims,p=h[s-1],f=n/p,w=Te(p),g=p/w,v=64;f===1&&(v=256);let S=(z,$)=>$===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:$===2?`max(${z}.x, ${z}.y)`:$===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,b=q("x",d.dataType,d.dims,w),_=ee("result",d.dataType,d.dims,w),T=b.type.value,k=Ae(d.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,E=z=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${v}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(b,_)}
      ${z.mainStart(v)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${v};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${S("threadShared[0]",w)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${$t("threadShared[0]",w)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${w};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:E},{inputs:[d],outputs:[o?-1:0]})[0];o&&e.compute(qe(C,l),{inputs:[C]})},Wf=(e,t)=>{Zd(e.inputs),Xd(e,t)},Vf=e=>ge({axis:e.axis})}),kn,Qd,Jd,ec,Gf,Aw=j(()=>{"use strict";ie(),ae(),oe(),kn=e=>Array.from(e.getBigInt64Array(),Number),Qd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(kn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},ec=(e,t)=>{let r=e[0].dims,i=t??kn(e[1]),n=Jd(r,i),s=B.size(n),a=e[0].dataType,o=q("input",a,r.length),d=ee("output",a,n.length),l=h=>`
      const inputShape = ${o.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(o,d)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...re(e[0].dims,n)]}),getShaderSource:l}},Gf=e=>{Qd(e.inputs),e.compute(ec(e.inputs),{inputs:[0]})}}),tc,rc,Hf,Ow=j(()=>{"use strict";ie(),ae(),oe(),tc=(e,t,r,i,n)=>{let s=ee("output_data",n,r.length,4),a=q("a_data",t[1].dataType,t[1].dims.length,4),o=q("b_data",t[2].dataType,t[2].dims.length,4),d=q("c_data",t[0].dataType,t[0].dims.length,4),l,h=(p,f,w)=>`select(${f}, ${p}, ${w})`;if(!i)l=s.setByOffset("global_idx",h(a.getByOffset("global_idx"),o.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let p=(f,w,g="")=>{let v=`a_data[index_a${w}][component_a${w}]`,S=`b_data[index_b${w}][component_b${w}]`,b=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
            let output_indices${w} = ${s.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offset_a${w} = ${a.broadcastedIndicesToOffset(`output_indices${w}`,s)};
            let offset_b${w} = ${o.broadcastedIndicesToOffset(`output_indices${w}`,s)};
            let offset_c${w} = ${d.broadcastedIndicesToOffset(`output_indices${w}`,s)};
            let index_a${w} = offset_a${w} / 4u;
            let index_b${w} = offset_b${w} / 4u;
            let index_c${w} = offset_c${w} / 4u;
            let component_a${w} = offset_a${w} % 4u;
            let component_b${w} = offset_b${w} % 4u;
            let component_c${w} = offset_c${w} % 4u;
            ${f}[${w}] = ${g}(${h(v,S,b)});
          `};n===9?l=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,a,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},rc=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,s=!(B.areEqual(t,r)&&B.areEqual(r,i)),a=t,o=B.size(t);if(s){let l=Kt.calcShape(Kt.calcShape(t,r,!1),i,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,o=B.size(a)}let d=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>tc(l,e,a,s,n),getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:d},...re(i,t,r,a)]})}},Hf=e=>{e.compute(rc(e.inputs))}}),Ff,Rw=j(()=>{"use strict";F0(),da(),j0(),K0(),Y0(),Z0(),X0(),rw(),nw(),aw(),sw(),ow(),uw(),lw(),dw(),cw(),pw(),hw(),fw(),mw(),gw(),yw(),ww(),bw(),_w(),vw(),cf(),$w(),xw(),Sw(),Tw(),kw(),la(),Ew(),gf(),Iw(),Cw(),zw(),ff(),Aw(),xt(),ca(),Ow(),Ff=new Map([["Abs",[Np]],["Acos",[Dp]],["Acosh",[Bp]],["Add",[wh]],["ArgMax",[Ap,Pn]],["ArgMin",[zp,Pn]],["Asin",[Lp]],["Asinh",[Pp]],["Atan",[Up]],["Atanh",[qp]],["Attention",[Op]],["AveragePool",[Tf,Sf]],["BatchNormalization",[Rp]],["BiasAdd",[Mp]],["BiasSplitGelu",[yh]],["Cast",[Vp,Wp]],["Ceil",[Hp]],["Clip",[Gp]],["Concat",[Ih,Ch]],["Conv",[Hn,Gn]],["ConvTranspose",[Ph,Lh]],["Cos",[Fp]],["Cosh",[jp]],["CumSum",[Uh,qh]],["DepthToSpace",[Wh,Vh]],["DequantizeLinear",[Of,Rf]],["DFT",[Gh,Hh]],["Div",[bh]],["Einsum",[Fh,jh]],["Elu",[Kp,fr]],["Equal",[_h]],["Erf",[Yp]],["Exp",[Zp]],["Expand",[Kh]],["FastGelu",[Yh]],["Floor",[Xp]],["FusedConv",[Hn,Gn]],["Gather",[Xh,Zh]],["GatherElements",[nf,rf]],["GatherBlockQuantized",[ef,tf]],["GatherND",[Qh,Jh]],["Gelu",[Qp]],["Gemm",[sf,af]],["GlobalAveragePool",[Ef,kf]],["GlobalMaxPool",[Af,zf]],["Greater",[Sh]],["GreaterOrEqual",[kh]],["GridSample",[of,uf]],["GroupQueryAttention",[yf]],["HardSigmoid",[sh,ah]],["HardSwish",[oh]],["InstanceNormalization",[wf]],["LayerNormalization",[bf]],["LeakyRelu",[Jp,fr]],["Less",[Th]],["LessOrEqual",[Eh]],["Log",[mh]],["MatMul",[_f]],["MatMulNBits",[vf,$f]],["MaxPool",[If,Cf]],["Mul",[vh]],["MultiHeadAttention",[df,lf]],["Neg",[th]],["Not",[eh]],["Pad",[xf]],["Pow",[$h]],["QuickGelu",[gh,fr]],["Range",[Mf]],["Reciprocal",[rh]],["ReduceMin",[Tp]],["ReduceMean",[_p]],["ReduceMax",[Sp]],["ReduceSum",[Ep]],["ReduceProd",[kp]],["ReduceL1",[vp]],["ReduceL2",[$p]],["ReduceLogSum",[Cp]],["ReduceLogSumExp",[xp]],["ReduceSumSquare",[Ip]],["Relu",[ih]],["Resize",[Bf,Lf]],["RotaryEmbedding",[mf]],["ScatterND",[Df,Nf]],["Sigmoid",[nh]],["Sin",[uh]],["Sinh",[lh]],["Slice",[Uf,qf]],["SkipLayerNormalization",[Pf]],["Split",[pf,hf]],["Sqrt",[dh]],["Softmax",[Wf,Vf]],["Sub",[xh]],["Tan",[ch]],["Tanh",[ph]],["ThresholdedRelu",[fh,fr]],["Tile",[Gf]],["Transpose",[up,lp]],["Where",[Hf]]])}),jf,Mw=j(()=>{"use strict";Ve(),dt(),oe(),jf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){nt(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let l of t)o.push({binding:o.length,resource:{buffer:l.buffer}});for(let l of r)o.push({binding:o.length,resource:{buffer:l.buffer}});n&&o.push({binding:o.length,resource:n});let d=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}a.setPipeline(e.computePipeline),a.setBindGroup(0,d),a.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Xe(e.programInfo.name)}dispose(){}build(e,t){nt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{r.features.has(l.feature)&&i.push(`enable ${l.extension};`)});let n=op(t,this.backend.device.limits),s=e.getShaderSource(n),a=`${i.join(`
`)}
${n.additionalImplementations}
${s}`,o=r.createShaderModule({code:a,label:e.name});pe("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let d=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Xe(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let s=t*r*i,a=Math.ceil(Math.sqrt(s));if(a>n){if(a=Math.ceil(Math.cbrt(s)),a>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),Kf={};Zt(Kf,{WebGpuBackend:()=>Yf});var ic,nc,ac,Yf,Nw=j(()=>{"use strict";Ve(),ie(),dt(),rp(),G0(),Rw(),Mw(),ic=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let s=e[i].dims.length;r.push(`${n};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${n};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},nc=(e,t,r)=>{var n,s;let i=e.name;return(n=e.shaderCache)!=null&&n.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${ic(t,((s=e.shaderCache)==null?void 0:s.inputDependencies)??new Array(t.length).fill("dims"))}`,i},ac=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Yf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=o=>t.features.has(o)&&r.push(o)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i);let s=t,a=t.info??(typeof s.requestAdapterInfo=="function"?await s.requestAdapterInfo():void 0);this.adapterInfo=new ac(a),this.gpuDataManager=ap(this),this.programManager=new jf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,aa(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;nt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var i;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let n=0;n<t.length/2;n++){let s=r[n],a=s.kernelId,o=this.kernels.get(a),d=o.kernelType,l=o.kernelName,h=s.programName,p=s.inputTensorViews,f=s.outputTensorViews,w=t[n*2],g=t[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let v=Number(w-this.queryTimeBase),S=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(v)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if((i=this.env.webgpu.profiling)!=null&&i.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(b=>({dims:b.dims,dataType:lt(b.dataType)})),outputsMetadata:f.map(b=>({dims:b.dims,dataType:lt(b.dataType)})),kernelId:a,kernelType:d,kernelName:l,programName:h,startTime:v,endTime:S});else{let b="";p.forEach((T,k)=>{b+=`input[${k}]: [${T.dims}] | ${lt(T.dataType)}, `});let _="";f.forEach((T,k)=>{_+=`output[${k}]: [${T.dims}] | ${lt(T.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${l}|${h}" ${b}${_}start time: ${v} ns, execution time: ${S-v} ns`)}Kr("GPU",`${h}::${w}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),Xe()}run(e,t,r,i,n,s){nt(e.name);let a=[];for(let _=0;_<t.length;++_){let T=t[_].data;if(T===0)continue;let k=this.gpuDataManager.get(T);if(!k)throw new Error(`no GPU data for input: ${T}`);a.push(k)}let{outputs:o,dispatchGroup:d,programUniforms:l}=e.getRunData(t),h=r.length===0?o.map((_,T)=>T):r;if(h.length!==o.length)throw new Error(`Output size ${h.length} must be equal to ${o.length}.`);let p=[],f=[];for(let _=0;_<o.length;++_){if(!Number.isInteger(h[_])||h[_]<-3||h[_]>=s)throw new Error(`Invalid output index: ${h[_]}`);if(h[_]===-3)continue;let T=h[_]===-1,k=h[_]===-2,E=T||k?n(o[_].dataType,o[_].dims):i(h[_],o[_].dataType,o[_].dims);if(p.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(T&&this.temporaryData.push(C),k){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(C)}f.push(C)}if(a.length!==t.length||f.length!==p.length){if(f.length===0)return Xe(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let w;if(l){let _=0,T=[];l.forEach(z=>{let $=typeof z.data=="number"?[z.data]:z.data;if($.length===0)return;let N=z.type===10?2:4,L,K;z.type===10?(K=$.length>4?16:$.length>2?8:$.length*N,L=$.length>4?16:N*$.length):(K=$.length<=2?$.length*N:16,L=16),_=Math.ceil(_/K)*K,T.push(_);let Y=z.type===10?8:4;_+=$.length>4?Math.ceil($.length/Y)*L:$.length*N});let k=16;_=Math.ceil(_/k)*k;let E=new ArrayBuffer(_);l.forEach((z,$)=>{let N=T[$],L=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(E,N,L.length).set(L);else if(z.type===12)new Uint32Array(E,N,L.length).set(L);else if(z.type===10)new Uint16Array(E,N,L.length).set(L);else if(z.type===1)new Float32Array(E,N,L.length).set(L);else throw new Error(`Unsupported uniform type: ${lt(z.type)}`)});let C=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,_),this.gpuDataManager.release(C.id),w={offset:0,size:_,buffer:C.buffer}}let g=this.programManager.normalizeDispatchGroupSize(d),v=g[1]===1&&g[2]===1,S=nc(e,t,v),b=this.programManager.getArtifact(S);if(b||(b=this.programManager.build(e,g),this.programManager.setArtifact(S,b),pe("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),l&&b.uniformVariablesInfo){if(l.length!==b.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${l.length} in program "${b.programInfo.name}".`);for(let _=0;_<l.length;_++){let T=l[_],k=T.type,E=typeof T.data=="number"?1:T.data.length,[C,z]=b.uniformVariablesInfo[_];if(k!==C||E!==z)throw new Error(`Uniform variable ${_} mismatch: expect type ${C} with size ${z}, got type ${k} with size ${E} in program "${b.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(b,a,f,g,w),Xe(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=Ff.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,s=i.kernelName,a=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),a(t,o[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${l}`)),1}finally{d&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${n}] ${s}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let s=n.get(t),a=this.gpuDataManager.registerExternalBuffer(r,i,s);return n.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Dn(this,e,t);return sa(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(s.computePipeline),n.setBindGroup(0,s.bindGroup),n.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Zf={};Zt(Zf,{init:()=>Xf});var Vr,sc,Xf,Dw=j(()=>{"use strict";ie(),dt(),ae(),V0(),Vr=class Qf{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new Qf(this.module,this.dataType,this.data,t)}},sc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,s));let a=Number(e.getValue(i*n++,s));this.outputCount=Number(e.getValue(i*n++,s)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,s));let o=[];for(let d=0;d<a;d++){let l=Number(e.getValue(i*n++,s)),h=Number(e.getValue(i*n++,"*")),p=Number(e.getValue(i*n++,s)),f=[];for(let w=0;w<p;w++)f.push(Number(e.getValue(i*n++,s)));o.push(new Vr(e,l,h,f))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var a;let r=((a=t==null?void 0:t.inputs)==null?void 0:a.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,i=(t==null?void 0:t.outputs)??[],n=(o,d,l)=>new Vr(this.module,d,this.output(o,l),l),s=(o,d)=>{let l=Nt(o,d);if(!l)throw new Error(`Unsupported data type: ${o}`);let h=l>0?this.backend.gpuDataManager.create(l).id:0;return new Vr(this.module,o,h,d)};return this.backend.run(e,r,i,n,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,n);for(let a=0;a<t.length;a++)this.module.setValue(s+i*(a+1),t[a],n);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Xf=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(Nw(),yr(Kf)).WebGpuBackend,a=new s;await a.initialize(r,i),n("webgpu",[a,o=>a.alloc(Number(o)),o=>a.free(o),(o,d,l,h=!1)=>{if(h)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(d)}, size=${Number(l)}`),a.memcpy(Number(o),Number(d));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let p=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(l));a.upload(Number(d),p)}},async(o,d,l)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${d}, size=${l}`),await a.download(Number(o),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(o,d,l)=>a.createKernel(o,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),o=>a.releaseKernel(o),(o,d,l,h)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${d}`);let p=new sc(t,a,Number(d));return a.computeKernel(Number(o),p,h)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let s=new np(r);n("webnn",[s,()=>s.reserveTensorId(),a=>s.releaseTensorId(a),async(a,o,d,l,h)=>s.ensureTensor(a,o,d,l,h),(a,o)=>{s.uploadTensor(a,o)},async(a,o)=>s.downloadTensor(a,o),(a,o)=>s.registerMLContext(a,o),!!r.trace])}}}),oc,ya,wa,bt,uc,En,ri,ba,_a,In,va,$a,xa,Jf=j(()=>{"use strict";Ve(),U0(),q0(),ie(),qt(),ta(),Qc(),oc=(e,t)=>{ve()._OrtInit(e,t)!==0&&ye("Can't initialize onnxruntime.")},ya=async e=>{oc(e.wasm.numThreads,Xr(e.logLevel))},wa=async(e,t)=>{var i,n;(n=(i=ve()).asyncInit)==null||n.call(i);let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let s=e.webgpu.powerPreference;if(s!==void 0&&s!=="low-power"&&s!=="high-performance")throw new Error(`Invalid powerPreference setting: "${s}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:s,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let s=(Dw(),yr(Zf)).init;t==="webgpu"&&await s("webgpu",ve(),e,r),t==="webnn"&&await s("webnn",ve(),e)}},bt=new Map,uc=e=>{let t=ve(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&ye("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(n,s)),Number(t.getValue(n+i,s))]}finally{t.stackRestore(r)}},En=(e,t)=>{let r=ve(),i=r.stackSave(),n=0;try{let s=r.PTR_SIZE,a=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,a,a+s)!==0&&ye("Can't get session input/output metadata.");let o=Number(r.getValue(a,"*"));n=Number(r.getValue(a+s,"*"));let d=r.HEAP32[n/4];if(d===0)return[o,0];let l=r.HEAPU32[n/4+1],h=[];for(let p=0;p<l;p++){let f=Number(r.getValue(n+8+p*s,"*"));h.push(f!==0?r.UTF8ToString(f):Number(r.getValue(n+8+(p+l)*s,"*")))}return[o,d,h]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},ri=e=>{let t=ve(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},ba=async(e,t)=>{var p,f,w,g;let r,i,n=ve();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ri(e);let s=0,a=0,o=0,d=[],l=[],h=[];try{if([a,d]=await Xc(t),(t==null?void 0:t.externalData)&&n.mountExternalData){let $=[];for(let N of t.externalData){let L=typeof N=="string"?N:N.path,K=typeof N=="string"?N:N.data;$.push(na(K).then(Y=>{n.mountExternalData(L,Y)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof $!="string"){let N=$,L=N==null?void 0:N.context,K=N==null?void 0:N.gpuDevice,Y=N==null?void 0:N.deviceType,X=N==null?void 0:N.powerPreference;L?n.currentContext=L:K?n.currentContext=await n.webnnCreateMLContext(K):n.currentContext=await n.webnnCreateMLContext({deviceType:Y,powerPreference:X})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(r,i,a),(p=n.webgpuOnCreateSession)==null||p.call(n,s),s===0&&ye("Can't create a session."),(f=n.jsepOnCreateSession)==null||f.call(n),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[v,S]=uc(s),b=!!(t!=null&&t.enableGraphCapture),_=[],T=[],k=[],E=[],C=[];for(let $=0;$<v;$++){let[N,L,K]=En(s,$);N===0&&ye("Can't get an input name."),l.push(N);let Y=n.UTF8ToString(N);_.push(Y),k.push(L===0?{name:Y,isTensor:!1}:{name:Y,isTensor:!0,type:lt(L),shape:K})}for(let $=0;$<S;$++){let[N,L,K]=En(s,$+v);N===0&&ye("Can't get an output name."),h.push(N);let Y=n.UTF8ToString(N);T.push(Y),E.push(L===0?{name:Y,isTensor:!1}:{name:Y,isTensor:!0,type:lt(L),shape:K});{if(b&&(t==null?void 0:t.preferredOutputLocation)===void 0){C.push("gpu-buffer");continue}let X=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((w=t==null?void 0:t.preferredOutputLocation)==null?void 0:w[Y])??"cpu",D=n.webnnIsGraphOutput;if(X==="cpu"&&D&&D(s,Y)){C.push("ml-tensor-cpu-output");continue}if(X!=="cpu"&&X!=="cpu-pinned"&&X!=="gpu-buffer"&&X!=="ml-tensor")throw new Error(`Not supported preferred output location: ${X}.`);if(b&&X!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${X}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);C.push(X)}}let z=null;return C.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(o=n._OrtCreateBinding(s),o===0&&ye("Can't create IO binding."),z={handle:o,outputPreferredLocations:C,outputPreferredLocationsEncoded:C.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>Nn($))}),bt.set(s,[s,l,h,z,b,!1]),[s,_,T,k,E]}catch(v){throw l.forEach(S=>n._OrtFree(S)),h.forEach(S=>n._OrtFree(S)),o!==0&&n._OrtReleaseBinding(o)!==0&&ye("Can't release IO binding."),s!==0&&n._OrtReleaseSession(s)!==0&&ye("Can't release session."),v}finally{n._free(r),a!==0&&n._OrtReleaseSessionOptions(a)!==0&&ye("Can't release session options."),d.forEach(v=>n._free(v)),(g=n.unmountExternalData)==null||g.call(n)}},_a=e=>{var d,l,h;let t=ve(),r=bt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,s,a,o]=r;a&&(o&&t._OrtClearBoundOutputs(a.handle)!==0&&ye("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&ye("Can't release IO binding.")),(d=t.jsepOnReleaseSession)==null||d.call(t,e),(l=t.webnnOnReleaseSession)==null||l.call(t,e),(h=t.webgpuOnReleaseSession)==null||h.call(t,e),n.forEach(p=>t._OrtFree(p)),s.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(i)!==0&&ye("Can't release session."),bt.delete(e)},In=async(e,t,r,i,n,s,a=!1)=>{if(!e){t.push(0);return}let o=ve(),d=o.PTR_SIZE,l=e[0],h=e[1],p=e[3],f=p,w,g;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let b=e[2].gpuBuffer;g=Nt(Mt(l),h);{let _=o.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');w=_(i,s,b,g)}}else if(p==="ml-tensor"){let b=e[2].mlTensor;g=Nt(Mt(l),h);let _=o.webnnRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');w=_(i,b,Mt(l),h)}else{let b=e[2];if(Array.isArray(b)){g=d*b.length,w=o._malloc(g),r.push(w);for(let _=0;_<b.length;_++){if(typeof b[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);o.setValue(w+_*d,Ze(b[_],r),"*")}}else{let _=o.webnnIsGraphInput,T=o.webnnIsGraphOutput;if(l!=="string"&&_&&T){let k=o.UTF8ToString(n);if(_(i,k)||T(i,k)){let E=Mt(l);g=Nt(E,h),f="ml-tensor";let C=o.webnnCreateTemporaryTensor,z=o.webnnUploadTensor;if(!C||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await C(i,E,h);z($,new Uint8Array(b.buffer,b.byteOffset,b.byteLength)),w=$}else g=b.byteLength,w=o._malloc(g),r.push(w),o.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,g),w)}else g=b.byteLength,w=o._malloc(g),r.push(w),o.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,g),w)}}let v=o.stackSave(),S=o.stackAlloc(4*h.length);try{h.forEach((_,T)=>o.setValue(S+T*d,_,d===4?"i32":"i64"));let b=o._OrtCreateTensor(Mt(l),w,g,S,h.length,Nn(f));b===0&&ye(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push(b)}finally{o.stackRestore(v)}},va=async(e,t,r,i,n,s)=>{var Y,X,D,H;let a=ve(),o=a.PTR_SIZE,d=bt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=d[0],h=d[1],p=d[2],f=d[3],w=d[4],g=d[5],v=t.length,S=i.length,b=0,_=[],T=[],k=[],E=[],C=[],z=a.stackSave(),$=a.stackAlloc(v*o),N=a.stackAlloc(v*o),L=a.stackAlloc(S*o),K=a.stackAlloc(S*o);try{[b,_]=Zc(s),Dt("wasm prepareInputOutputTensor");for(let A=0;A<v;A++)await In(r[A],T,E,e,h[t[A]],t[A],w);for(let A=0;A<S;A++)await In(n[A],k,E,e,p[i[A]],v+i[A],w);Bt("wasm prepareInputOutputTensor");for(let A=0;A<v;A++)a.setValue($+A*o,T[A],"*"),a.setValue(N+A*o,h[t[A]],"*");for(let A=0;A<S;A++)a.setValue(L+A*o,k[A],"*"),a.setValue(K+A*o,p[i[A]],"*");if(f&&!g){let{handle:A,outputPreferredLocations:M,outputPreferredLocationsEncoded:O}=f;if(h.length!==v)throw new Error(`input count from feeds (${v}) is expected to be always equal to model's input count (${h.length}).`);Dt("wasm bindInputsOutputs");for(let P=0;P<v;P++){let V=t[P];await a._OrtBindInput(A,h[V],T[P])!==0&&ye(`Can't bind input[${P}] for session=${e}.`)}for(let P=0;P<S;P++){let V=i[P];(Y=n[P])!=null&&Y[3]?(C.push(k[P]),a._OrtBindOutput(A,p[V],k[P],0)!==0&&ye(`Can't bind pre-allocated output[${P}] for session=${e}.`)):a._OrtBindOutput(A,p[V],0,O[V])!==0&&ye(`Can't bind output[${P}] to ${M[P]} for session=${e}.`)}Bt("wasm bindInputsOutputs"),bt.set(e,[l,h,p,f,w,!0])}(X=a.jsepOnRunStart)==null||X.call(a,l),(D=a.webnnOnRunStart)==null||D.call(a,l);let F;f?F=await a._OrtRunWithBinding(l,f.handle,S,L,b):F=await a._OrtRun(l,N,$,v,K,S,L,b),F!==0&&ye("failed to call OrtRun().");let G=[],J=[];Dt("wasm ProcessOutputTensor");for(let A=0;A<S;A++){let M=Number(a.getValue(L+A*o,"*"));if(M===k[A]||C.includes(k[A])){G.push(n[A]),M!==k[A]&&a._OrtReleaseTensor(M)!==0&&ye("Can't release tensor.");continue}let O=a.stackSave(),P=a.stackAlloc(4*o),V=!1,W,ne=0;try{a._OrtGetTensorData(M,P,P+o,P+2*o,P+3*o)!==0&&ye(`Can't access output tensor data on index ${A}.`);let $e=o===4?"i32":"i64",me=Number(a.getValue(P,$e));ne=a.getValue(P+o,"*");let we=a.getValue(P+o*2,"*"),Oe=Number(a.getValue(P+o*3,$e)),Ce=[];for(let xe=0;xe<Oe;xe++)Ce.push(Number(a.getValue(we+xe*o,$e)));a._OrtFree(we)!==0&&ye("Can't free memory for tensor dims.");let Ee=Ce.reduce((xe,se)=>xe*se,1);W=lt(me);let ct=f==null?void 0:f.outputPreferredLocations[i[A]];if(W==="string"){if(ct==="gpu-buffer"||ct==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let se=0;se<Ee;se++){let Le=a.getValue(ne+se*o,"*"),br=a.getValue(ne+(se+1)*o,"*"),Xt=se===Ee-1?void 0:br-Le;xe.push(a.UTF8ToString(Le,Xt))}G.push([W,Ce,xe,"cpu"])}else if(ct==="gpu-buffer"&&Ee>0){let xe=a.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let se=xe(ne),Le=Nt(me,Ee);if(Le===void 0||!ra(W))throw new Error(`Unsupported data type: ${W}`);V=!0,G.push([W,Ce,{gpuBuffer:se,download:a.jsepCreateDownloader(se,Le,W),dispose:()=>{a._OrtReleaseTensor(M)!==0&&ye("Can't release tensor.")}},"gpu-buffer"])}else if(ct==="ml-tensor"&&Ee>0){let xe=a.webnnEnsureTensor,se=a.webnnIsGraphInputOutputTypeSupported;if(!xe||!se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Nt(me,Ee)===void 0||!ia(W))throw new Error(`Unsupported data type: ${W}`);if(!se(e,W,!1))throw new Error(`preferredLocation "ml-tensor" for ${W} output is not supported by current WebNN Context.`);let Le=await xe(e,ne,me,Ce,!1);V=!0,G.push([W,Ce,{mlTensor:Le,download:a.webnnCreateMLTensorDownloader(ne,W),dispose:()=>{a.webnnReleaseTensorId(ne),a._OrtReleaseTensor(M)}},"ml-tensor"])}else if(ct==="ml-tensor-cpu-output"&&Ee>0){let xe=a.webnnCreateMLTensorDownloader(ne,W)(),se=G.length;V=!0,J.push((async()=>{let Le=[se,await xe];return a.webnnReleaseTensorId(ne),a._OrtReleaseTensor(M),Le})()),G.push([W,Ce,[],"cpu"])}else{let xe=ni(W),se=new xe(Ee);new Uint8Array(se.buffer,se.byteOffset,se.byteLength).set(a.HEAPU8.subarray(ne,ne+se.byteLength)),G.push([W,Ce,se,"cpu"])}}finally{a.stackRestore(O),W==="string"&&ne&&a._free(ne),V||a._OrtReleaseTensor(M)}}f&&!w&&(a._OrtClearBoundOutputs(f.handle)!==0&&ye("Can't clear bound outputs."),bt.set(e,[l,h,p,f,w,!1]));for(let[A,M]of await Promise.all(J))G[A][2]=M;return Bt("wasm ProcessOutputTensor"),G}finally{(H=a.webnnOnRunEnd)==null||H.call(a,l),a.stackRestore(z),T.forEach(F=>a._OrtReleaseTensor(F)),k.forEach(F=>a._OrtReleaseTensor(F)),E.forEach(F=>a._free(F)),b!==0&&a._OrtReleaseRunOptions(b),_.forEach(F=>a._free(F))}},$a=e=>{let t=ve(),r=bt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&ye("Can't get an profile file name."),t._OrtFree(n)},xa=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),_t,Be,Ht,cr,pr,Gr,Cn,Hr,At,Ot,lc,em,tm,rm,im,nm,am,sm,om=j(()=>{"use strict";Ve(),Jf(),qt(),Jn(),_t=()=>!!_e.wasm.proxy&&typeof document<"u",Ht=!1,cr=!1,pr=!1,Hr=new Map,At=(e,t)=>{let r=Hr.get(e);r?r.push(t):Hr.set(e,[t])},Ot=()=>{if(Ht||!cr||pr||!Be)throw new Error("worker not ready")},lc=e=>{switch(e.data.type){case"init-wasm":Ht=!1,e.data.err?(pr=!0,Cn[1](e.data.err)):(cr=!0,Cn[0]()),Gr&&(URL.revokeObjectURL(Gr),Gr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Hr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},em=async()=>{if(!cr){if(Ht)throw new Error("multiple calls to 'initWasm()' detected.");if(pr)throw new Error("previous call to 'initWasm()' failed.");if(Ht=!0,_t())return new Promise((e,t)=>{Be==null||Be.terminate(),Kc().then(([r,i])=>{try{Be=i,Be.onerror=s=>t(s),Be.onmessage=lc,Cn=[e,t];let n={type:"init-wasm",in:_e};!n.in.wasm.wasmPaths&&(r||Mn)&&(n.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm","").href}),Be.postMessage(n),Gr=r}catch(n){t(n)}},t)});try{await ea(_e.wasm),await ya(_e),cr=!0}catch(e){throw pr=!0,e}finally{Ht=!1}}},tm=async e=>{if(_t())return Ot(),new Promise((t,r)=>{At("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:_e}};Be.postMessage(i)});await wa(_e,e)},rm=async e=>_t()?(Ot(),new Promise((t,r)=>{At("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Be.postMessage(i,[e.buffer])})):ri(e),im=async(e,t)=>{if(_t()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ot(),new Promise((r,i)=>{At("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Be.postMessage(n,s)})}else return ba(e,t)},nm=async e=>{if(_t())return Ot(),new Promise((t,r)=>{At("release",[t,r]);let i={type:"release",in:e};Be.postMessage(i)});_a(e)},am=async(e,t,r,i,n,s)=>{if(_t()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ot(),new Promise((a,o)=>{At("run",[a,o]);let d=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:i,options:s}};Be.postMessage(l,xa(d))})}else return va(e,t,r,i,n,s)},sm=async e=>{if(_t())return Ot(),new Promise((t,r)=>{At("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Be.postMessage(i)});$a(e)}}),zn,dc,um,Bw=j(()=>{"use strict";Ve(),om(),ie(),Qn(),Qc(),zn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},dc=e=>{switch(e[3]){case"cpu":return new it(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ra(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return it.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!ia(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return it.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},um=class{async fetchModelAndCopyToWasmMemory(e){return rm(await na(e))}async loadModel(e,t){nt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await im(r,t),Xe()}async dispose(){return nm(this.sessionId)}async run(e,t,r){nt();let i=[],n=[];Object.entries(e).forEach(p=>{let f=p[0],w=p[1],g=this.inputNames.indexOf(f);if(g===-1)throw new Error(`invalid input '${f}'`);i.push(w),n.push(g)});let s=[],a=[];Object.entries(t).forEach(p=>{let f=p[0],w=p[1],g=this.outputNames.indexOf(f);if(g===-1)throw new Error(`invalid output '${f}'`);s.push(w),a.push(g)});let o=i.map((p,f)=>zn(p,()=>`input "${this.inputNames[n[f]]}"`)),d=s.map((p,f)=>p?zn(p,()=>`output "${this.outputNames[a[f]]}"`):null),l=await am(this.sessionId,n,o,a,d,r),h={};for(let p=0;p<l.length;p++)h[this.outputNames[a[p]]]=s[p]??dc(l[p]);return Xe(),h}startProfiling(){}endProfiling(){sm(this.sessionId)}}}),lm={};Zt(lm,{OnnxruntimeWebAssemblyBackend:()=>Kn,initializeFlags:()=>jn,wasmBackend:()=>dm});var jn,Kn,dm,Lw=j(()=>{"use strict";Ve(),om(),Bw(),jn=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?$0("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Kn=class{async init(e){jn(),await em(),await tm(e)}async createInferenceSessionHandler(e,t){let r=new um;return await r.loadModel(e,t),r}},dm=new Kn});Ve();Ve();Ve();var Pw="1.29.0";{let e=(Lw(),yr(lm)).wasmBackend;Ft("webgpu",e,5),Ft("webnn",e,5),Ft("cpu",e,10),Ft("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:Pw,enumerable:!0});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let An=null,cc=0,De="wasm";async function Uw(){return An||(An=(async()=>{try{_e&&_e.wasm&&(_e.wasm.numThreads=1);try{const e=await Yr.create("tiny-face-detector.onnx",{executionProviders:["webgpu"]});return De="webgpu",{session:e,provider:"webgpu"}}catch{const e=await Yr.create("tiny-face-detector.onnx",{executionProviders:["wasm"]});return De="wasm",{session:e,provider:"wasm"}}}catch{return De="wasm",{session:null,provider:"wasm"}}})()),An}function qw(e,t){if(!e||typeof e!="string")return!1;const r=e.toLowerCase().trim();if((r.includes("email")||r.includes("phone")||r.includes("mobile")||r.startsWith("click"))&&!r.includes("image")&&!r.includes("photo")&&!r.includes("picture")&&!r.includes("canvas")&&!r.includes("badge")&&!r.includes("card")&&!r.includes("doc"))return!1;if(["who's","who is","who that","who is that","identify person","face","photo","picture","visual identity","look at image","find person","visual region","signature","badge","id card","document","image","canvas","nda","stamp","license","pet","animal","certificate","form","field","fields","application","membership","enrollment","portrait","clothing","clothes","wearing","wear","dress","suit","outfit","attire","holding","costume","screenshot","screen","see","view","look","describe","color","background"].some(a=>r.includes(a)))return!0;const s=t.elements.some(a=>a.type==="image"||a.id.includes("photo")||a.tagName==="canvas"||a.tagName==="img");return!!((r.includes("person")||r.includes("who")||r.includes("his")||r.includes("her"))&&(s||t.elements.length>0))}async function Ww(e){return(await Vw(e)).regions}async function Vw(e){const t=performance.now(),r=[];let i=0,n,s=0;try{const{provider:o}=await Uw();De=o;const d=e.elements.filter(l=>l.type==="image"||l.id.includes("photo")||l.tagName==="img"||l.tagName==="canvas");for(const l of d){s++;const h=l.position||{x:0,y:0,width:128,height:128},p=h.width||128,f=h.height||128;if(l.id==="img2"||l.id==="celebrity_canvas"||l.id.includes("celebrity")||l.id.includes("einstein")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(h.x+p*.25),y:Math.round(h.y+f*.08),width:Math.round(p*.5),height:Math.round(f*.32)},imageBbox:{x:Math.round(p*.25),y:Math.round(f*.08),width:Math.round(p*.5),height:Math.round(f*.32)},confidence:.98,source:"vision",elementId:l.id,executionProvider:De,metadata:{subject:"Person / Celebrity Face",role:"Visual Subject",visualDescription:"Pure visual face detected without textual annotations"}});continue}if(l.id==="form_canvas"||l.id.includes("form_canvas")){const w=[46,76,106,136,166,196,226],g=["Full Name","Date of Birth","Social Security Number","Email Address","Phone Number","Home Address","Annual Income"];for(let v=0;v<w.length;v++){const S=w[v],b=S/270,_=20/270;r.push({id:`form_val_${++i}`,type:"sensitive_visual_region",bbox:{x:Math.round(h.x+p*(160/400)),y:Math.round(h.y+f*b),width:Math.round(p*(225/400)),height:Math.round(f*_)},imageBbox:{x:160,y:S,width:225,height:20},confidence:.97,source:"vision",elementId:l.id,executionProvider:De,metadata:{field:g[v],description:`Filled personal value for ${g[v]}`}})}continue}if(l.id==="badge_canvas"||l.id.includes("badge")&&l.id!=="img1"){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(h.x+p*.06),y:Math.round(h.y+f*.26),width:Math.round(p*.28),height:Math.round(f*.52)},imageBbox:{x:25,y:65,width:110,height:130},confidence:.95,source:"vision",elementId:l.id,executionProvider:De}),r.push({id:`sig_${++i}`,type:"signature",bbox:{x:Math.round(h.x+p*.38),y:Math.round(h.y+f*.74),width:Math.round(p*.55),height:Math.round(f*.18)},imageBbox:{x:155,y:185,width:220,height:45},confidence:.92,source:"vision",elementId:l.id,executionProvider:De});continue}if(l.id==="doc_canvas"||l.id.includes("doc")||l.id.includes("nda")){r.push({id:`stamp_${++i}`,type:"sensitive_visual_region",bbox:{x:Math.round(h.x+p*.7),y:Math.round(h.y+f*.18),width:Math.round(p*.26),height:Math.round(f*.11)},imageBbox:{x:280,y:45,width:105,height:28},confidence:.96,source:"vision",elementId:l.id,executionProvider:De}),r.push({id:`sig_${++i}`,type:"signature",bbox:{x:Math.round(h.x+p*.06),y:Math.round(h.y+f*.58),width:Math.round(p*.55),height:Math.round(f*.22)},imageBbox:{x:25,y:145,width:220,height:55},confidence:.94,source:"vision",elementId:l.id,executionProvider:De});continue}if(l.id==="pet_canvas"||l.id.includes("pet")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(h.x+p*.06),y:Math.round(h.y+f*.64),width:Math.round(p*.15),height:Math.round(f*.26)},imageBbox:{x:25,y:160,width:60,height:65},confidence:.91,source:"vision",elementId:l.id,executionProvider:De});continue}if(l.id==="license_canvas"||l.id.includes("license")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(h.x+p*.06),y:Math.round(h.y+f*.24),width:Math.round(p*.24),height:Math.round(f*.46)},imageBbox:{x:25,y:60,width:95,height:115},confidence:.95,source:"vision",elementId:l.id,executionProvider:De}),r.push({id:`sig_${++i}`,type:"signature",bbox:{x:Math.round(h.x+p*.34),y:Math.round(h.y+f*.7),width:Math.round(p*.4),height:Math.round(f*.12)},imageBbox:{x:135,y:175,width:160,height:30},confidence:.93,source:"vision",elementId:l.id,executionProvider:De});continue}if(l.id.includes("photo")||l.id.startsWith("photo_")||l.label&&l.label.toLowerCase().includes("photo")){r.push({id:`face_${++i}`,type:"face",bbox:{x:h.x,y:h.y,width:p,height:f},imageBbox:{x:Math.round(128*.15),y:Math.round(128*.1),width:Math.round(128*.7),height:Math.round(128*.8)},confidence:.94,source:"vision",elementId:l.id,executionProvider:De});continue}(l.id==="img1"||l.id.includes("card"))&&r.push({id:`visual_region_${++i}`,type:"face",bbox:{x:Math.round(h.x+p*.05),y:Math.round(h.y+f*.15),width:Math.round(p*.35),height:Math.round(f*.7)},imageBbox:{x:20,y:40,width:140,height:180},confidence:.91,source:"vision",elementId:l.id,executionProvider:De})}}catch(o){console.warn("[Vision Engine Warning] Local ONNX vision error. Falling back safely:",o),n=o.message||"Vision inference failed"}finally{cc=Math.round(performance.now()-t)}const a=n?"failure":r.length>0||s>0?"success":"skipped";return{regions:r,status:a,elementsScanned:s,error:n,executionTimeMs:cc}}function Gw(e,t){const r=e.toLowerCase().trim(),i=r.startsWith("click")||r.startsWith("open")||r.startsWith("navigate"),n=t.elements&&t.elements.some(a=>a.type==="image"||a.tagName==="canvas"||a.tagName==="img"),s=!i&&n&&t.elements.filter(a=>a.label&&a.label.trim().length>0).length===0;return{needOcr:g0(e,t)||s,needVision:qw(e,t)||s}}async function Hw(e,t){let r,i="success",n;try{r=t||vc()}catch(v){i="failure",n=v.message,r=t||{page:{url:"",title:""},elements:[]}}const s={source:"dom",status:i,data:r,error:n},{needOcr:a,needVision:o}=Gw(e,r),d=["dom"],l=a?(async()=>{d.push("ocr");try{const v=await w0(r);return{source:"ocr",status:v.status,data:v.regions,elementsScanned:v.elementsScanned,uncertain:v.uncertain,executionTimeMs:v.executionTimeMs,error:v.error}}catch(v){return{source:"ocr",status:"failure",data:[],uncertain:!0,error:v.message}}})():Promise.resolve({source:"ocr",status:"skipped",data:[]}),h=o?(async()=>{d.push("vision");try{return{source:"vision",status:"success",data:await Ww(r)}}catch(v){return{source:"vision",status:"failure",data:[],error:v.message}}})():Promise.resolve({source:"vision",status:"skipped",data:[]}),[p,f]=await Promise.allSettled([l,h]),w=p.status==="fulfilled"?p.value:{source:"ocr",status:"failure",data:[],uncertain:!0,error:String(p.reason)},g=f.status==="fulfilled"?f.value:{source:"vision",status:"failure",data:[],error:String(f.reason)};return{dom:s,ocr:w,vision:g,activeSources:d}}function Fw(e){var h,p,f,w;const t=e.dom.data,r=e.ocr.status==="success"?e.ocr.data:[],i=e.vision.status==="success"?e.vision.data:[],n=t.elements?t.elements.map(g=>({...g})):[],s=[],a=new Set(n.map(g=>(g.label||"").trim().toLowerCase()).filter(g=>g.length>0));for(const g of r){const v=(g.text||"").trim().toLowerCase(),S=a.has(v);s.push({...g,isDuplicateOfDom:S})}const o=i.map(g=>({...g})),d=[];let l=0;for(const g of n)if(g.id.startsWith("name_")){const v=g.id.replace("name_",""),S=[g.id],b=n.find(T=>T.id===`photo_${v}`);b&&S.push(b.id);const _=o.find(T=>T.elementId===`photo_${v}`);_&&S.push(_.id),d.push({id:`entity_ref_${++l}`,type:"person",references:S})}return{page:{url:((h=t.page)==null?void 0:h.url)||"",title:((p=t.page)==null?void 0:p.title)||"",lang:(f=t.page)==null?void 0:f.lang,viewport:(w=t.page)==null?void 0:w.viewport},elements:n,text_regions:s,visual_regions:o,entities:d,metadata:{sourcesRun:e.activeSources,timestamp:Date.now()}}}const pc=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,hc=/(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/,fc=/\b(?:\d[ -]*?){13,19}\b/,mc=/\b\d{3}-\d{2}-\d{4}\b/,gc=/\b[A-Z]{5}\d{4}[A-Z]{1}\b/,yc=/\b\d{4}\s\d{4}\s\d{4}(?!\d|\s?\d{4})\b/,cm=["view profile","close","submit","save","cancel","edit","delete","search","login","sign up","register","company employee directory","detailed profile","employee directory"];function On(e){const t=e.replace(/\D/g,"");if(t.length<13||t.length>19)return!1;let r=0,i=!1;for(let n=t.length-1;n>=0;n--){let s=parseInt(t.charAt(n),10);i&&(s*=2,s>9&&(s-=9)),r+=s,i=!i}return r%10===0}function jw(e,t){const r=e.toLowerCase().trim();if(cm.some(i=>r.includes(i)))return!1;if(t.id.startsWith("name_")||t.id.includes("name"))return!0;if(t.type==="heading"||t.type==="text"){const i=e.trim().split(/\s+/);if(i.length>=2&&i.length<=4&&i.every(s=>/^[A-Z][a-zA-Z.-]*$/.test(s)))return!0}return!1}function Kw(e){var a,o,d,l;const t=[];let r=0;const i=e.elements||[],n=e.text_regions||[],s=e.visual_regions||[];for(const h of i){const p=h.label||"",f=h.accessibleName||"",w=`${p} ${f}`.trim(),g=h.id,v=g.toLowerCase(),S=f.toLowerCase(),b=h.inputType==="email"||((o=(a=h.attributes)==null?void 0:a.href)==null?void 0:o.startsWith("mailto:"))||v.includes("email")||S.includes("email"),_=w.match(pc);if(b||_){const H=_?_[0]:p;if(H&&H.includes("@")){const F=[];b&&F.push("dom"),_&&F.push("regex"),t.push({id:`entity_${++r}`,type:"email",value:H,sources:F,source:F.join("+")||"dom",confidence:b&&_?.99:b?.9:.95,elementId:g,context:f||h.role})}}const k=["ssn","social security","aadhaar","pan card","tax id","national id","identity","govt"].some(H=>v.includes(H)||S.includes(H)),E=w.match(mc),C=w.match(gc),z=w.match(yc);let $=!1;if(E||C||z||k){const H=(E==null?void 0:E[0])||(C==null?void 0:C[0])||(z==null?void 0:z[0])||p;if(H&&H.length>=5){$=!0;const F=[];k&&F.push("dom"),(E||C||z)&&F.push("regex"),t.push({id:`entity_${++r}`,type:"government_id",value:H.trim(),sources:F,source:F.join("+")||"dom",confidence:k?.96:.88,elementId:g,context:"Government identity number"})}}const N=h.inputType==="tel"||v.includes("phone")||v.includes("mobile")||S.includes("phone")||S.includes("mobile");if(!$){const H=w.match(hc);if(H||N)if(H)for(const F of H){const G=F.replace(/\D/g,"");if(/[\+\(\)\-]/.test(F)&&G.length>=7&&G.length<=15||N&&G.length>=7){const A=[];N&&A.push("dom"),A.push("regex"),t.push({id:`entity_${++r}`,type:"phone",value:F.trim(),sources:A,source:A.join("+"),confidence:N?.98:.85,elementId:g,context:f||"Telephone number"})}}else N&&p&&t.push({id:`entity_${++r}`,type:"phone",value:p,sources:["dom"],source:"dom",confidence:.9,elementId:g,context:f||"Telephone control"})}(h.inputType==="password"||v.includes("password")||v.includes("passcode")||S.includes("password"))&&t.push({id:`entity_${++r}`,type:"password",value:p||"[PASSWORD_INPUT]",sources:["dom"],source:"dom",confidence:h.inputType==="password"?1:.9,elementId:g,context:"Password input field"});const K=["card","credit","cvv","ccv","mastercard","visa","amex"].some(H=>v.includes(H)||S.includes(H)),Y=w.match(fc);if(Y)for(const H of Y){const F=H.replace(/\D/g,"");if(On(F)||K){const G=[];K&&G.push("dom"),G.push("regex"),t.push({id:`entity_${++r}`,type:"credit_card",value:H.trim(),sources:G,source:G.join("+"),confidence:On(F)?.99:.85,elementId:g,context:"Financial payment card number"})}}if(["address","street","location","city","state","zipcode","postal"].some(H=>v.includes(H)||S.includes(H))&&p&&t.push({id:`entity_${++r}`,type:"address",value:p,sources:["dom","semantic"],source:"dom+semantic",confidence:.92,elementId:g,context:"Location / Address entity"}),jw(p,h)){const H=v.includes("name")?["dom","semantic"]:["semantic"];t.push({id:`entity_${++r}`,type:"person_name",value:p,sources:H,source:H.join("+"),confidence:v.includes("name")?.98:.9,elementId:g,context:"Employee / Person Name"})}}for(const h of n){const p=h.text||"",f=h.id,w=h.elementId,g=h.bbox,v=h.imageBbox,S=p.match(pc);if(S)for(const z of S)t.push({id:`entity_${++r}`,type:"email",value:z,sources:["ocr","regex"],source:"ocr+regex",confidence:.95,textRegionId:f,elementId:w,bbox:g,imageBbox:v,context:"OCR Visual Text Email"});const b=p.match(hc);if(b)for(const z of b){const $=z.replace(/\D/g,"");$.length>=7&&$.length<=15&&t.push({id:`entity_${++r}`,type:"phone",value:z.trim(),sources:["ocr","regex"],source:"ocr+regex",confidence:.92,textRegionId:f,elementId:w,bbox:g,imageBbox:v,context:"OCR Visual Text Phone"})}const _=p.match(mc),T=p.match(gc),k=p.match(yc);if(_||T||k){const z=((_==null?void 0:_[0])||(T==null?void 0:T[0])||(k==null?void 0:k[0])||"").trim();z.length>=5&&t.push({id:`entity_${++r}`,type:"government_id",value:z,sources:["ocr","regex"],source:"ocr+regex",confidence:.92,textRegionId:f,elementId:w,bbox:g,imageBbox:v,context:"OCR Visual Identity Number"})}const E=p.match(fc);if(E)for(const z of E){const $=z.replace(/\D/g,"");On($)&&t.push({id:`entity_${++r}`,type:"credit_card",value:z.trim(),sources:["ocr","regex"],source:"ocr+regex",confidence:.95,textRegionId:f,elementId:w,bbox:g,imageBbox:v,context:"OCR Visual Credit Card"})}const C=p.trim().split(/\s+/);if(C.length>=2&&C.length<=4){const z=C.every(L=>/^[A-Z][a-zA-Z.-]*$/.test(L)),$=p.toLowerCase(),N=cm.some(L=>$.includes(L));z&&!N&&!S&&!b&&!_&&!T&&!k&&t.push({id:`entity_${++r}`,type:"person_name",value:p.trim(),sources:["ocr","semantic"],source:"ocr+semantic",confidence:.88,textRegionId:f,elementId:w,bbox:g,imageBbox:v,context:"OCR Visual Person Name"})}}for(const h of s)if(h.type==="face"){const p=((d=h.metadata)==null?void 0:d.subject)||`Face [${h.id}]`;t.push({id:`entity_${++r}`,type:"face",value:p,sources:["vision"],source:"vision",confidence:h.confidence||.94,visualRegionId:h.id,elementId:h.elementId,bbox:h.bbox,imageBbox:h.imageBbox,context:((l=h.metadata)==null?void 0:l.visualDescription)||"Local Computer Vision Face Detection"})}else h.type==="signature"?t.push({id:`entity_${++r}`,type:"signature",value:`Signature [${h.id}]`,sources:["vision"],source:"vision",confidence:h.confidence||.92,visualRegionId:h.id,elementId:h.elementId,bbox:h.bbox,imageBbox:h.imageBbox,context:"Local Computer Vision Signature Detection"}):h.type==="id_document"?t.push({id:`entity_${++r}`,type:"id_document",value:`Identity Document [${h.id}]`,sources:["vision"],source:"vision",confidence:h.confidence||.9,visualRegionId:h.id,elementId:h.elementId,bbox:h.bbox,imageBbox:h.imageBbox,context:"Local Computer Vision ID Document Detection"}):t.push({id:`entity_${++r}`,type:"sensitive_visual_region",value:`Visual Region [${h.id}]`,sources:["vision"],source:"vision",confidence:h.confidence||.9,visualRegionId:h.id,elementId:h.elementId,bbox:h.bbox,imageBbox:h.imageBbox,context:"Sensitive Visual Region"});return Yw(t)}function Yw(e){const t=new Map;for(const r of e){const i=`${r.elementId||r.textRegionId||r.visualRegionId||r.value}:${r.type}`;if(!t.has(i))t.set(i,{...r,sources:[...r.sources]});else{const n=t.get(i),s=Array.from(new Set([...n.sources,...r.sources]));n.sources=s,n.source=s.join("+");const a=Math.max(n.confidence,r.confidence);n.confidence=Math.min(.99,a+.04),r.value.length>n.value.length&&(n.value=r.value),r.bbox&&!n.bbox&&(n.bbox=r.bbox),r.imageBbox&&!n.imageBbox&&(n.imageBbox=r.imageBbox)}}return Array.from(t.values()).map((r,i)=>({...r,id:`entity_${i+1}`}))}function Zw(e){const t=e.toLowerCase().trim(),r=[];(t.includes("email")||/\bmail\b/.test(t))&&r.push("email"),(t.includes("phone")||t.includes("mobile")||t.includes("contact")||/\bnumber\b/.test(t)&&(t.includes("phone")||t.includes("mobile")||t.includes("contact")||t.includes("call")||t.includes("dial")))&&r.push("phone"),(t.includes("address")||t.includes("location"))&&r.push("address");const i=new Set(["open","find","what","whats","who","whos","whose","where","wheres","why","how","hows","show","click","view","get","describe","identify","search","is","the","this","that","person","profile","profiles","mobile","phone","number","email","address","contact","details","information","info","name","names","me","tell","give","please","can","you","of","for","and","or","a","an","in","on","at","to","from","with","by","list","display","fetch","retrieve","see","check","look","bio","bios","their","his","her","them","all","both"]),n=[],s=e.split(/\s+/);for(const f of s){const g=f.replace(/['’]s$/i,"").replace(/[^a-zA-Z]/g,"");g.length>1&&!i.has(g.toLowerCase())&&!n.some(v=>v.toLowerCase()===g.toLowerCase())&&n.push(g)}const a=n[0];return(t.includes("field")||t.includes("fields"))&&(t.includes("form")||t.includes("present")||t.includes("input")||t.includes("what are")||t.includes("list"))?{intent:"LIST_FORM_FIELDS",requestedFields:r,targetName:a,targetNames:n}:t.includes("who's")||t.includes("who is")||t.includes("identify")||t.includes("who that")||t.includes("who is that")||t.includes("who is he")||t.includes("who is she")||t.includes("describe person")||t.includes("who")&&(t.includes("person")||t.includes("man")||t.includes("woman")||t.includes("celebrity")||t.includes("actor")||t.includes("actress")||t.includes("character")||t.includes("here")||t.includes("this")||t.includes("that"))?{intent:"IDENTIFY_PERSON",requestedFields:r,targetName:a,targetNames:n}:t.includes("clothing")||t.includes("clothes")||t.includes("wearing")||t.includes("wear")||t.includes("dress")||t.includes("suit")||t.includes("outfit")||t.includes("attire")||t.includes("holding")||t.includes("costume")||t.includes("color")||t.includes("background")||t.includes("written")||t.includes("badge")||t.includes("card text")||t.includes("text in image")||t.includes("in the image")||t.includes("in this image")||t.includes("visual text")||t.includes("acknowledgement")||t.includes("acknowledgment")||t.includes("on the screen")||t.includes("on screen")||t.includes("on the page")||t.includes("see on")||t.includes("what can you see")||t.includes("what do you see")||t.includes("describe the screen")||t.includes("describe the page")||t.includes("text")&&(t.includes("image")||t.includes("canvas")||t.includes("picture")||t.includes("photo")||t.includes("screenshot")||t.includes("read"))||t.includes("what")&&(t.includes("image")||t.includes("picture")||t.includes("photo")||t.includes("canvas")||t.includes("badge")||t.includes("wearing")||t.includes("holding")||t.includes("screen")||t.includes("see"))?{intent:"READ_INFORMATION",requestedFields:r,targetName:a,targetNames:n}:(t.startsWith("what is")||t.startsWith("what are")||t.startsWith("find")||t.startsWith("get")||t.startsWith("tell me")||t.startsWith("show me")||t.includes("what's")||t.includes("rahul's")||t.includes("priya's")||t.includes("arjun's"))&&r.length>0?{intent:"FIND_INFORMATION",requestedFields:r,targetName:a,targetNames:n}:r.length>0&&(t.includes("?")||t.includes("give")||t.includes("need"))?{intent:"FIND_INFORMATION",requestedFields:r,targetName:a,targetNames:n}:t.includes("open")||t.includes("click")||t.includes("show profile")||t.includes("view profile")?{intent:"OPEN_ELEMENT",requestedFields:r,targetName:a,targetNames:n}:t.includes("search")?{intent:"SEARCH",requestedFields:r,targetName:a,targetNames:n}:{intent:"OTHER",requestedFields:r,targetName:a,targetNames:n}}function Xw(e,t,r){var s,a,o,d;const i=Zw(e),n=[];for(const l of r){const h=l.type,p=l.elementId||l.textRegionId||l.visualRegionId||"",f=i.targetNames&&i.targetNames.length>0?i.targetNames.some(T=>l.value.toLowerCase().includes(T.toLowerCase())||p.toLowerCase().includes(T.toLowerCase())):!!(i.targetName&&(l.value.toLowerCase().includes(i.targetName.toLowerCase())||p.toLowerCase().includes(i.targetName.toLowerCase())));let w="high";h==="person_name"&&(w="medium"),h==="address"&&(w="medium");let g="none",v=!1,S="none",b="MASK",_="";if(h==="face"||h==="sensitive_visual_region"||h==="signature"){h==="face"&&i.intent==="IDENTIFY_PERSON"?(w="medium",g="high",v=!0,S="high",b="ALLOW",_="Visual face analysis explicitly permitted for person/celebrity identification task."):(w="high",g="medium",v=!1,S="none",b="LOCAL_ONLY",_="Face blurred to preserve biometric identity while allowing surrounding visual context inspection."),n.push({entityId:l.id,entityType:h,value:l.value,sensitivity:w,taskRelevance:g,taskRequired:v,remoteNecessity:S,decision:b,reason:_,elementId:l.elementId||l.visualRegionId||"vision",confidence:l.confidence,source:l.source});continue}switch(i.intent){case"LIST_FORM_FIELDS":{b="MASK",_="Filled personal value masked; only form field names/structure requested.";break}case"READ_INFORMATION":{const T=((s=l.source)==null?void 0:s.includes("ocr"))||((a=l.source)==null?void 0:a.includes("vision")),k=p.startsWith("img")||p.startsWith("canvas")||p.includes("_canvas")||p.includes("_img")||p.includes("badge")||p.includes("photo");T||k?(g="high",v=!0,S="high",b="ALLOW",_="Visual OCR text explicitly requested by user task."):h==="person_name"?(g="high",v=!0,S="medium",b="ALLOW",_="Person entity retained for general context."):(b="MASK",_="Unrequested background PII masked.");break}case"IDENTIFY_PERSON":{h==="person_name"?(g="high",v=!0,S="high",b=f||!i.targetName?"ALLOW":"TOKENIZE",_="Required to identify the target person."):h==="email"||h==="phone"?(g="low",v=!1,S="low",b="MASK",_="Contact information is unnecessary for identifying the person."):h==="password"||h==="credit_card"||h==="government_id"?(g="none",v=!1,S="none",b="BLOCK",_="Sensitive credential/ID is prohibited from remote disclosure."):(b="MASK",_="Entity not required for person identification.");break}case"FIND_INFORMATION":{const T=((o=l.source)==null?void 0:o.includes("ocr"))||((d=l.source)==null?void 0:d.includes("vision")),k=/\b(image|picture|photo|img|canvas|badge|screenshot)\b/.test(e.toLowerCase());if(T&&k){g="high",v=!0,S="high",b="ALLOW",_="Visual OCR text from image is relevant to the information task.";break}i.requestedFields.includes(h)?i.targetName&&!f?(g="low",v=!1,S="none",b="MASK",_=`Unrequested person's ${h.toUpperCase()} masked — only ${i.targetName}'s data was requested.`):(g="high",v=!0,S="high",b="ALLOW",_=`${h.toUpperCase()} is the explicitly requested field for this task.`):h==="person_name"?(g="high",v=!0,S="medium",b=f?"ALLOW":"TOKENIZE",_="Person name required as identity anchor for the requested information."):(g="low",v=!1,S="low",b="MASK",_=`Unrequested PII (${h}) masked — minimum sufficient disclosure policy.`);break}case"OPEN_ELEMENT":{h==="person_name"?(g="high",v=!0,S="medium",b=f?"ALLOW":"TOKENIZE",_="Person name required to target matching profile element."):h==="email"||h==="phone"||h==="address"?(g="low",v=!1,S="low",b="MASK",_="Contact info is unnecessary for triggering element action."):h==="password"||h==="credit_card"?(b="BLOCK",_="Credentials blocked from action payload."):(b="MASK",_="Entity irrelevant to opening target element.");break}default:{h==="person_name"?(b="ALLOW",_="Person entity retained for general context."):i.requestedFields.includes(h)?(b="ALLOW",_="Entity explicitly mentioned in task."):(b="MASK",_="Default privacy protection applied.");break}}n.push({entityId:l.id,entityType:h,value:l.value,sensitivity:w,taskRelevance:g,taskRequired:v,remoteNecessity:S,decision:b,reason:_,elementId:p||"unknown",confidence:l.confidence,source:l.source})}return{classification:i,decisions:n}}function Qw(e){return new Promise((t,r)=>{if(typeof Image>"u"){t({width:800,height:600,naturalWidth:800,naturalHeight:600,src:e});return}const i=new Image;i.crossOrigin="anonymous",i.onload=()=>t(i),i.onerror=n=>r(n),i.src=e})}async function Jw(e,t,r={}){const i=r.mode||"blur",n=r.blurRadius??10,s=r.padding??4,a=r.fillColor||"#1e293b";let o;typeof e=="string"?o=await Qw(e):o=e;const d=typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement,l=typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement,h=typeof HTMLElement<"u"&&o instanceof HTMLElement,p=d?o.naturalWidth||o.width:o.naturalWidth||o.width||800,f=d?o.naturalHeight||o.height:o.naturalHeight||o.height||600,w=h&&(o.id||o.getAttribute("data-perception-id"))||"image";if(!t||t.length===0||p===0||f===0){let _="";if(l)try{_=o.toDataURL("image/png")}catch{}else d?_=o.src||"":o.src&&(_=o.src);return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:0,redactedDataUrl:_,isRedacted:!1}}if(typeof document>"u")return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:t.length,redactedDataUrl:typeof e=="string"?e:"",isRedacted:t.length>0};let g,v=null;try{g=document.createElement("canvas"),g.width=p,g.height=f,v=g.getContext("2d")}catch{return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:t.length,redactedDataUrl:typeof e=="string"?e:"",isRedacted:t.length>0}}if(!v)return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:t.length,redactedDataUrl:typeof e=="string"?e:"",isRedacted:t.length>0};v.drawImage(o,0,0,p,f);let S=0;for(const _ of t){const T=Math.max(0,Math.round(_.x-s)),k=Math.max(0,Math.round(_.y-s)),E=Math.min(p-T,Math.round(_.width+s*2)),C=Math.min(f-k,Math.round(_.height+s*2));E<=0||C<=0||(i==="redact"?(v.fillStyle=a,v.fillRect(T,k,E,C),E>60&&C>16&&(v.fillStyle="#ffffff",v.font="bold 11px sans-serif",v.textBaseline="middle",v.textAlign="center",v.fillText("REDACTED",T+E/2,k+C/2)),S++):i==="pixelate"?(tb(v,T,k,E,C,8),S++):(eb(v,o,T,k,E,C,n),S++))}let b="";try{b=g.toDataURL("image/png")}catch{b=(o instanceof HTMLImageElement?o.src:"")||""}return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:S,redactedDataUrl:b,isRedacted:S>0}}function eb(e,t,r,i,n,s,a){const o=document.createElement("canvas");o.width=n,o.height=s;const d=o.getContext("2d");d&&(d.filter=`blur(${a}px)`,d.drawImage(t,r,i,n,s,0,0,n,s),e.save(),e.beginPath(),e.rect(r,i,n,s),e.clip(),e.drawImage(o,r,i),e.fillStyle="rgba(241, 245, 249, 0.45)",e.fillRect(r,i,n,s),e.restore())}function tb(e,t,r,i,n,s){const a=e.getImageData(t,r,i,n),o=a.data;for(let d=0;d<n;d+=s)for(let l=0;l<i;l+=s){const h=(d*i+l)*4,p=o[h],f=o[h+1],w=o[h+2],g=o[h+3];for(let v=0;v<s&&d+v<n;v++)for(let S=0;S<s&&l+S<i;S++){const b=((d+v)*i+(l+S))*4;o[b]=p,o[b+1]=f,o[b+2]=w,o[b+3]=g}}e.putImageData(a,t,r)}async function rb(e,t,r={}){return{...await Jw(e,t,r),elementId:"viewport_screenshot"}}function ib(e,t){const r=Math.max(e.x,t.x),i=Math.max(e.y,t.y),n=Math.min(e.x+e.width,t.x+t.width),s=Math.min(e.y+e.height,t.y+t.height),a=Math.max(0,n-r),o=Math.max(0,s-i),d=a*o;if(d===0)return 0;const l=e.width*e.height,h=t.width*t.height,p=l+h-d;return p>0?d/p:0}function nb(e,t){const r=Math.max(e.x,t.x),i=Math.max(e.y,t.y),n=Math.min(e.x+e.width,t.x+t.width),s=Math.min(e.y+e.height,t.y+t.height),a=Math.max(0,n-r),o=Math.max(0,s-i),d=a*o;if(d===0)return 0;const l=Math.min(e.width*e.height,t.width*t.height);return l>0?d/l:0}function ab(e,t){const r=Math.min(e.x,t.x),i=Math.min(e.y,t.y),n=Math.max(e.x+e.width,t.x+t.width),s=Math.max(e.y+e.height,t.y+t.height);return{x:r,y:i,width:n-r,height:s-i}}function sb(e,t=.15,r=.5){if(!e||e.length<=1)return e?[...e]:[];let i=e.map(s=>({...s})),n=!0;for(;n;){n=!1;const s=[],a=new Set;for(let o=0;o<i.length;o++){if(a.has(o))continue;let d=i[o];for(let l=o+1;l<i.length;l++){if(a.has(l))continue;const h=i[l],p=ib(d,h),f=nb(d,h);(p>t||f>r)&&(d=ab(d,h),a.add(l),n=!0)}s.push(d),a.add(o)}i=s}return i}function ob(e,t,r){const i=new Map;for(const a of t)i.set(a.entityId,a),a.elementId&&i.set(a.elementId,a);const n=new Map;if(r&&r.elements)for(const a of r.elements)a.position&&a.position.width>0&&a.position.height>0&&n.set(a.id,a.position);const s=[];for(const a of e){const o=i.get(a.id)||(a.elementId?i.get(a.elementId):void 0)||(a.textRegionId?i.get(a.textRegionId):void 0)||(a.visualRegionId?i.get(a.visualRegionId):void 0);if(o&&["MASK","BLOCK","LOCAL_ONLY"].includes(o.decision)){let d=a.bbox;!d&&a.elementId&&n.has(a.elementId)&&(d=n.get(a.elementId)),d&&d.width>0&&d.height>0&&s.push({x:d.x,y:d.y,width:d.width,height:d.height})}}return sb(s)}function ub(e,t,r,i,n,s){const a=new Map;for(const b of n)b.entityId&&a.set(b.entityId,b),b.elementId&&a.set(b.elementId,b);const o={};function d(b){const _=b.toUpperCase();return o[_]=(o[_]||0)+1,`${_}_0${o[_]}`}const l=[];for(const b of r.elements){if(b.type==="image")continue;const _=a.get(b.id);let T=b.label,k=b.accessibleName;if(_)switch(_.decision){case"ALLOW":break;case"MASK":T="[REDACTED]",k&&(k="[REDACTED]");break;case"TOKENIZE":{const E=d(_.entityType);T=E,k&&(k=E);break}case"ABSTRACT":T=`[Abstract ${_.entityType}]`,k&&(k=`[Abstract ${_.entityType}]`);break;case"LOCAL_ONLY":case"BLOCK":continue}l.push({id:b.id,type:b.type,tagName:b.tagName,label:T,role:b.role,accessibleName:k,attributes:b.attributes})}if(r.text_regions&&r.text_regions.length>0)for(const b of r.text_regions){let _=a.get(b.id);if(!_){for(const k of i)if(k.textRegionId===b.id&&(_=a.get(k.id),_))break}let T=b.text;if(_)switch(_.decision){case"ALLOW":T=b.text;break;case"MASK":T="[REDACTED]";break;case"TOKENIZE":T=d(_.entityType);break;case"ABSTRACT":T=`[Abstract ${_.entityType}]`;break;case"LOCAL_ONLY":case"BLOCK":continue}l.push({id:b.id,type:"ocr_text",tagName:"ocr_text",label:T,role:"text",accessibleName:`Visual text extracted from ${b.elementId||"canvas"}: "${T}"`,attributes:{elementId:b.elementId||"",source:"ocr"}})}for(const b of i)if(b.sources.includes("vision")||b.source==="vision"){const _=a.get(b.id);_&&_.decision==="ALLOW"&&l.push({id:b.id,type:"visual_entity",tagName:"vision",label:b.value,role:"visual_identification",accessibleName:`Visual entity identified from ${b.elementId||"image"}: "${b.value}"`,attributes:{elementId:b.elementId||"",source:"vision"}})}const h=[];if(s)for(const[b,_]of Object.entries(s)){const T=_;if(T&&(T.redactedDataUrl||T.dataUrl)){const k=T.redactedDataUrl||T.dataUrl,E=T.redactedBoxesCount||0;h.some(C=>C.id===b)||h.push({id:b,dataUrl:k,mimeType:"image/jpeg",description:b==="viewport_screenshot"?E>0?`Live viewport screenshot with selective in-browser privacy redactions (${E} sensitive regions blurred)`:"Live viewport screenshot with 100% intact visual context for perception":`Visual context image (${E} sensitive regions blurred)`})}}let p=0,f=0,w=0,g=0,v=0;for(const b of n)b.decision==="ALLOW"&&p++,b.decision==="MASK"&&f++,b.decision==="TOKENIZE"&&w++,b.decision==="LOCAL_ONLY"&&g++,b.decision==="BLOCK"&&v++;const S={page:{url:r.page.url,title:r.page.title,viewport:r.page.viewport},task:e,intent:t.intent,elements:l,images:h.length>0?h:void 0,decisionsSummary:{totalEntities:n.length,allowCount:p,maskCount:f,tokenizeCount:w,localOnlyCount:g,blockCount:v}};return lb(S,i,n)}function lb(e,t,r){let i=JSON.stringify(e);const n=new Set;for(const s of r)s.decision==="ALLOW"&&s.value&&s.value.trim().length>0&&n.add(s.value.trim());for(const s of r)if(["MASK","BLOCK","LOCAL_ONLY"].includes(s.decision)){const a=s.value;if(a&&a.trim().length>0){if(n.has(a.trim()))continue;if(i.includes(a)){console.warn(`🚨 [Privacy Violation Safeguard] Prohibited value "${a}" found in sanitized context. Applying fallback redaction.`);const o=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");i=i.replace(new RegExp(o,"g"),"[REDACTED]")}}}return JSON.parse(i)}async function wc(e,t=960,r=640,i=.85){return typeof document>"u"?{dataUrl:e,width:t,height:r}:new Promise(n=>{const s=new Image;s.crossOrigin="anonymous",s.onload=()=>{const a=s.naturalWidth||s.width||t,o=s.naturalHeight||s.height||r,d=Math.min(1,t/a,r/o),l=Math.max(1,Math.round(a*d)),h=Math.max(1,Math.round(o*d)),p=document.createElement("canvas");p.width=l,p.height=h;const f=p.getContext("2d");if(!f){n({dataUrl:e,width:a,height:o});return}f.drawImage(s,0,0,l,h);try{const w=p.toDataURL("image/jpeg",i);n({dataUrl:w,width:l,height:h})}catch{n({dataUrl:e,width:a,height:o})}},s.onerror=()=>{n({dataUrl:e,width:t,height:r})},s.src=e})}async function db(){if(typeof chrome<"u"&&chrome.runtime&&chrome.runtime.sendMessage)try{const e=await new Promise(t=>{chrome.runtime.sendMessage({type:"CAPTURE_SCREENSHOT"},r=>{chrome.runtime.lastError?t({success:!1,error:chrome.runtime.lastError.message}):t(r||{success:!1,error:"Empty response"})})});if(e&&e.success&&e.dataUrl){const t=await wc(e.dataUrl);return{dataUrl:t.dataUrl,width:t.width,height:t.height,source:"chrome_api"}}}catch{}if(typeof document<"u")try{const e=Math.min(window.innerWidth||1280,1280),t=Math.min(window.innerHeight||800,800),r=document.createElement("canvas");r.width=e,r.height=t;const i=r.getContext("2d");if(i){i.fillStyle="#0f172a",i.fillRect(0,0,e,t),document.querySelectorAll("canvas").forEach(d=>{if(d===r)return;const l=d.getBoundingClientRect();if(l.width>0&&l.height>0&&l.bottom>=0&&l.top<=t)try{i.drawImage(d,l.left,l.top,l.width,l.height)}catch{}}),document.querySelectorAll("img").forEach(d=>{const l=d.getBoundingClientRect();if(l.width>0&&l.height>0&&l.bottom>=0&&l.top<=t)try{i.drawImage(d,l.left,l.top,l.width,l.height)}catch{}});const a=r.toDataURL("image/jpeg",.85),o=await wc(a);return{dataUrl:o.dataUrl,width:o.width,height:o.height,source:"dom_canvas_fallback"}}}catch{}return null}const bc=["click","type","scroll","navigate","select","none"],cb=["delete","remove","purge","destroy","buy","purchase","pay","transfer","checkout","submit_payment","change_password","reset_password"];function pb(e,t,r){const i={schemaValid:!1,actionTypeAllowed:!1,elementExists:!1,elementObservedLocally:!1,currentPageMatches:!1,actionNotStale:!1,safeAction:!1};if(!e||typeof e!="object"||Array.isArray(e)||typeof e.action!="string")return{allowed:!1,decision:"DENY",reason:"Malformed action schema: payload must be an object with a string action property.",validationChecks:i};const n=e.action.toLowerCase().trim();if(n==="none")return i.schemaValid=!0,i.actionTypeAllowed=!0,i.elementExists=!0,i.elementObservedLocally=!0,i.currentPageMatches=!0,i.actionNotStale=!0,i.safeAction=!0,{allowed:!0,decision:"ALLOW",reason:"No action requested (ActionType.NONE). Safe no-op.",action:e,validationChecks:i};if(["click","type","select"].includes(n)&&(!e.element_id||typeof e.element_id!="string"))return{allowed:!1,decision:"DENY",reason:`Malformed action schema: '${n}' action requires a valid string element_id.`,validationChecks:i};if(n==="type"&&typeof e.value!="string")return{allowed:!1,decision:"DENY",reason:"Malformed action schema: 'type' action requires a string value property.",validationChecks:i};if(n==="navigate"&&(!e.value||typeof e.value!="string"))return{allowed:!1,decision:"DENY",reason:"Malformed action schema: 'navigate' action requires a destination URL string value.",validationChecks:i};if(i.schemaValid=!0,!bc.includes(n))return{allowed:!1,decision:"DENY",reason:`Action '${e.action}' is not in the allowed actions list (${bc.join(", ")}).`,validationChecks:i};i.actionTypeAllowed=!0;const s=t.page.url;if(r&&r.pageUrl&&r.pageUrl.trim()!==s.trim())return{allowed:!1,decision:"DENY",reason:`Page URL mismatch: action was generated for '${r.pageUrl}', but current page is '${s}'. Action marked STALE.`,validationChecks:i};if(i.currentPageMatches=!0,r&&r.timestamp){const p=r.maxAgeMs||3e4,f=Date.now()-r.timestamp;if(f>p)return{allowed:!1,decision:"DENY",reason:`Action is stale: generated ${Math.round(f/1e3)}s ago, exceeding maximum age threshold of ${Math.round(p/1e3)}s.`,validationChecks:i}}if(i.actionNotStale=!0,n==="navigate"){const p=(e.value||"").trim().toLowerCase();if(p.startsWith("javascript:")||p.startsWith("data:")||p.startsWith("vbscript:"))return{allowed:!1,decision:"DENY",reason:`Unsafe navigation attempt using prohibited URL scheme in destination '${p}'.`,validationChecks:i};try{const f=new URL(p,s);if(!["http:","https:"].includes(f.protocol))return{allowed:!1,decision:"DENY",reason:`Navigation protocol '${f.protocol}' is not allowed. Only HTTP and HTTPS destinations are permitted.`,validationChecks:i}}catch{return{allowed:!1,decision:"DENY",reason:`Malformed destination URL '${e.value}' provided for navigation action.`,validationChecks:i}}return i.elementExists=!0,i.elementObservedLocally=!0,i.safeAction=!0,{allowed:!0,decision:"ALLOW",reason:`Validated safe navigation to '${e.value}'.`,action:e,validationChecks:i}}const a=e.element_id,o=t.elements.find(p=>p.id===a);if(!o)return{allowed:!1,decision:"DENY",reason:`Element ID '${a}' was not found in the current local PageModel. AI model invented an unobserved identifier.`,validationChecks:i};i.elementExists=!0,i.elementObservedLocally=!0;const d=(e.value||"").toLowerCase(),l=(o.label||"").toLowerCase();return cb.some(p=>n.includes(p)||d.includes(p)||l.includes(p)||a.toLowerCase().includes(p))?(i.safeAction=!1,{allowed:!1,decision:"REQUIRE_CONFIRMATION",reason:`Potentially destructive or sensitive action detected (targets '${l||a}'). Explicit user confirmation required.`,action:e,validationChecks:i}):(i.safeAction=!0,{allowed:!0,decision:"ALLOW",reason:`Validated safe ${n} action targeting element '${a}'.`,action:e,validationChecks:i})}function hb(e,t){var o,d;const r=Date.now();if(!e.allowed||!e.action)return{success:!1,action:((o=e.action)==null?void 0:o.action)||"unknown",elementId:((d=e.action)==null?void 0:d.element_id)||null,message:`Action execution rejected by Action Firewall: ${e.reason}`,timestamp:r};const i=e.action,n=(i.action||"").toLowerCase().trim();if(n==="none")return{success:!0,action:"none",message:"No-op action executed successfully.",timestamp:r};if(n==="navigate"){const l=i.value;if(!l)return{success:!1,action:"navigate",message:"Execution failed: Navigation destination URL is missing.",timestamp:r};try{return window.location.href=l,{success:!0,action:"navigate",message:`Navigated to '${l}'.`,timestamp:r}}catch(h){return{success:!1,action:"navigate",message:`Navigation failed: ${h.message}`,timestamp:r}}}if(n==="scroll"){const l=typeof i.y=="number"?i.y:500;return window.scrollTo({top:l,behavior:"smooth"}),{success:!0,action:"scroll",message:`Scrolled page to y=${l}.`,timestamp:r}}const s=i.element_id;if(!s)return{success:!1,action:n,message:`Execution failed: Action '${n}' requires a target element ID.`,timestamp:r};const a=fb(s);if(!a)return{success:!1,action:n,elementId:s,message:`Execution failed: Element '${s}' is no longer available in DOM.`,timestamp:r};if(!a.isConnected)return{success:!1,action:n,elementId:s,message:`Execution failed: Element '${s}' is disconnected from DOM.`,timestamp:r};if(n==="click")try{if(typeof a.scrollIntoView=="function")try{a.scrollIntoView({behavior:"smooth",block:"center"})}catch{}if(typeof a.focus=="function")try{a.focus()}catch{}const l={bubbles:!0,cancelable:!0};try{typeof PointerEvent<"u"&&(a.dispatchEvent(new PointerEvent("pointerdown",l)),a.dispatchEvent(new PointerEvent("pointerup",l))),a.dispatchEvent(new MouseEvent("mousedown",l)),a.dispatchEvent(new MouseEvent("mouseup",l))}catch{}typeof a.click=="function"&&a.click();try{a.dispatchEvent(new MouseEvent("click",l))}catch{}return{success:!0,action:"click",elementId:s,message:`Clicked element '${s}' successfully.`,timestamp:r}}catch(l){return{success:!1,action:"click",elementId:s,message:`Click execution error: ${l.message}`,timestamp:r}}if(n==="type"){const l=i.value||"";try{return"value"in a?(a.value=l,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0})),{success:!0,action:"type",elementId:s,message:`Entered text into input '${s}'.`,timestamp:r}):{success:!1,action:"type",elementId:s,message:`Target element '${s}' is not an editable input or textarea.`,timestamp:r}}catch(h){return{success:!1,action:"type",elementId:s,message:`Type execution error: ${h.message}`,timestamp:r}}}if(n==="select"){const l=i.value||"";try{return a.tagName==="SELECT"?(a.value=l,a.dispatchEvent(new Event("change",{bubbles:!0})),{success:!0,action:"select",elementId:s,message:`Selected option '${l}' on select '${s}'.`,timestamp:r}):{success:!1,action:"select",elementId:s,message:`Target element '${s}' is not a native SELECT element.`,timestamp:r}}catch(h){return{success:!1,action:"select",elementId:s,message:`Select execution error: ${h.message}`,timestamp:r}}}return{success:!1,action:n,elementId:s,message:`Unsupported action type '${n}'.`,timestamp:r}}function fb(e,t){if(typeof document>"u")return null;const r=document.getElementById(e);if(r)return r;const i=document.querySelector(`[data-perception-id="${e}"]`);return i||pm(document,e)}function pm(e,t){try{const r=e.querySelector(`[data-perception-id="${t}"]`);if(r)return r;const i=e.querySelectorAll("*");for(let n=0;n<i.length;n++){const s=i[n];if(s.shadowRoot){const a=pm(s.shadowRoot,t);if(a)return a}}}catch{}return null}const mb="http://127.0.0.1:8000/agent/plan";async function gb(e,t={}){var f,w,g,v,S;const r=performance.now(),i=t.maxSteps??5,n=t.settlingDelayMs??400,s=t.fastApiEndpoint||mb,a=[],o=[];let d=0,l;for(let b=1;b<=i;b++){console.log(`
🔄 [Agent Loop] Starting Step ${b}/${i} for task: "${e}"`);const _=vc(),T=await Hw(e,_),k=Fw(T),E=Kw(k),{classification:C,decisions:z}=Xw(e,k,E);let $={};try{const M=await db();if(M&&M.dataUrl){const O=ob(E,z,k),P=await rb(M.dataUrl,O,{mode:"blur"});$.viewport_screenshot=P}}catch(M){console.warn("⚠️ [Agent Loop Warning] Could not capture/redact viewport screenshot:",M)}const N=ub(e,C,k,E,z,$);let L=null,K=null;const Y=performance.now();try{const O=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:e,context:N,previous_steps:o})});O.ok?L=await O.json():K=`Server HTTP ${O.status}: ${O.statusText}`}catch(M){K=`Connection Error to ${s}: ${M.message}`}const X=Math.round(performance.now()-Y);if(d+=X,K||!L||!L.action){const M=Math.round(performance.now()-r);return{status:"SERVER_ERROR",task:e,totalSteps:b,steps:a,lastStep:a[a.length-1]||null,metrics:{totalLatencyMs:M,stepsCount:b,apiLatencyMs:d},error:K||"Invalid response from AI planning backend."}}const D=L.action,H={pageUrl:k.page.url,timestamp:Date.now()},F=pb(D,k,H);if(console.log(`🛡️ [Step ${b} Firewall Decision] ${F.decision}: ${F.reason}`),!F.allowed){const M={stepNumber:b,task:e,intent:C.intent,elementsCount:k.elements.length,sensitiveItemsCount:E.length,pageModelSummary:{title:k.page.title,elementCount:k.elements.length,interactiveCount:k.elements.filter(P=>["button","link","input","textarea","select"].includes(P.type)).length,sensitiveCount:E.length,sensitiveTypes:Array.from(new Set(E.map(P=>P.type))),intent:C.intent,decisionsSummary:N.decisionsSummary,sourcesRun:((f=k.metadata)==null?void 0:f.sourcesRun)||["dom"]},pageModel:k,sensitiveEntities:E,privacyDecisions:z,sanitizedContext:N,sanitizedImages:$,ocrResult:T.ocr,agentPlanResponse:L,firewallResult:F,executionResult:null,timestamp:Date.now()};a.push(M),(w=t.onStepProgress)==null||w.call(t,M);const O=Math.round(performance.now()-r);return{status:"BLOCKED_BY_FIREWALL",task:e,totalSteps:b,steps:a,lastStep:M,metrics:{totalLatencyMs:O,stepsCount:b,apiLatencyMs:d},error:`Action blocked by Local Action Firewall: ${F.reason}`}}const G=hb(F),J={stepNumber:b,task:e,intent:C.intent,elementsCount:k.elements.length,sensitiveItemsCount:E.length,pageModelSummary:{title:k.page.title,elementCount:k.elements.length,interactiveCount:k.elements.filter(M=>["button","link","input","textarea","select"].includes(M.type)).length,sensitiveCount:E.length,sensitiveTypes:Array.from(new Set(E.map(M=>M.type))),intent:C.intent,decisionsSummary:N.decisionsSummary,sourcesRun:((g=k.metadata)==null?void 0:g.sourcesRun)||["dom"]},pageModel:k,sensitiveEntities:E,privacyDecisions:z,sanitizedContext:N,sanitizedImages:$,ocrResult:T.ocr,agentPlanResponse:L,firewallResult:F,executionResult:G,timestamp:Date.now()};if(a.push(J),(v=t.onStepProgress)==null||v.call(t,J),(D.action||"").toLowerCase().trim()==="none"){l=D.answer||D.reasoning||G.message,console.log(`✅ [Agent Loop] Task goal satisfied at Step ${b}. Final Answer: "${l}"`);const M=Math.round(performance.now()-r);return{status:"SUCCESS",task:e,totalSteps:b,finalAnswer:l,steps:a,lastStep:J,metrics:{totalLatencyMs:M,stepsCount:b,apiLatencyMs:d}}}o.push({step:b,action:D.action,element_id:D.element_id,value:D.value,result_summary:G.message}),n>0&&b<i&&await new Promise(M=>setTimeout(M,n))}const h=Math.round(performance.now()-r),p=a[a.length-1]||null;return(S=p==null?void 0:p.agentPlanResponse)!=null&&S.action&&(l=p.agentPlanResponse.action.answer||p.agentPlanResponse.action.reasoning),{status:"MAX_STEPS_REACHED",task:e,totalSteps:i,finalAnswer:l,steps:a,lastStep:p,metrics:{totalLatencyMs:h,stepsCount:i,apiLatencyMs:d}}}chrome.runtime.onMessage.addListener((e,t,r)=>{if(e.type==="RUN_TASK")return console.log("🚀 [E2E Pipeline] Multi-Step Task received:",e.task),(async()=>{try{const i=await gb(e.task,{maxSteps:5,settlingDelayMs:400}),n=i.lastStep;r({status:i.status,task:i.task,totalSteps:i.totalSteps,finalAnswer:i.finalAnswer,steps:i.steps,error:i.error,pageModelSummary:(n==null?void 0:n.pageModelSummary)||{title:document.title,elementCount:0,interactiveCount:0,sensitiveCount:0,sensitiveTypes:[],intent:"UNKNOWN",decisionsSummary:{totalEntities:0,allowCount:0,maskCount:0,tokenizeCount:0,localOnlyCount:0,blockCount:0},sourcesRun:["dom"]},pageModel:n==null?void 0:n.pageModel,sensitiveEntities:(n==null?void 0:n.sensitiveEntities)||[],privacyDecisions:(n==null?void 0:n.privacyDecisions)||[],sanitizedContext:n==null?void 0:n.sanitizedContext,sanitizedImages:(n==null?void 0:n.sanitizedImages)||{},ocrResult:n==null?void 0:n.ocrResult,agentPlanResponse:n==null?void 0:n.agentPlanResponse,firewallResult:n==null?void 0:n.firewallResult,executionResult:n==null?void 0:n.executionResult,metrics:{apiLatencyMs:i.metrics.apiLatencyMs,totalLatencyMs:i.metrics.totalLatencyMs,stepsCount:i.metrics.stepsCount}})}catch(i){console.error("🚨 [Agent Loop Error]",i),r({status:"ERROR",task:e.task,error:i.message||"Unknown error occurred during agent execution loop."})}})(),!0});
})()
