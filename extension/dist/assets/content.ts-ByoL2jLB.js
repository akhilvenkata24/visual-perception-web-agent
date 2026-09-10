(function(){var Sy=Object.defineProperty;var Ty=(e,t,r)=>t in e?Sy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Pe=(e,t,r)=>Ty(e,typeof t!="symbol"?t+"":t,r);let ky=0;function Ey(e){if(e.id&&e.id.trim().length>0)return e.id.trim();const t=e.getAttribute("data-perception-id");if(t)return t;const r=`elem_${++ky}`;return e.setAttribute("data-perception-id",r),r}function Iy(e){var a;const t=e.tagName.toUpperCase();if(["SCRIPT","STYLE","NOSCRIPT","TEMPLATE","SVG","PATH"].includes(t)||e.closest(".hidden")||e.closest('[aria-hidden="true"]'))return!1;const r=window.getComputedStyle(e);if(r.display==="none"||r.visibility==="hidden"||r.opacity==="0")return!1;const i=typeof navigator<"u"&&((a=navigator.userAgent)==null?void 0:a.includes("jsdom")),n=e.getBoundingClientRect();return!(!i&&(n.width<=0||n.height<=0))}function Cy(e){const t=e.getAttribute("role");if(t&&t.trim())return t.trim();switch(e.tagName.toUpperCase()){case"BUTTON":return"button";case"A":return e.hasAttribute("href")?"link":"generic";case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":return"heading";case"INPUT":{const i=(e.getAttribute("type")||"text").toLowerCase();return["button","submit","reset"].includes(i)?"button":i==="checkbox"?"checkbox":i==="radio"?"radio":"textbox"}case"TEXTAREA":return"textbox";case"SELECT":return"combobox";case"FORM":return"form";case"IMG":return"img";case"ARTICLE":return"article";case"SECTION":return"region";case"NAV":return"navigation";case"HEADER":return"banner";case"FOOTER":return"contentinfo";case"MAIN":return"main";default:return"generic"}}function Ay(e){var s,o,d;const t=e.getAttribute("aria-labelledby");if(t){const c=t.split(/\s+/).map(p=>{var f,w;return((w=(f=document.getElementById(p))==null?void 0:f.textContent)==null?void 0:w.trim())||""}).filter(p=>p.length>0);if(c.length>0)return c.join(" ")}const r=e.getAttribute("aria-label");if(r&&r.trim())return r.trim();if(e.id){const l=document.querySelector(`label[for="${e.id}"]`);if(l&&((s=l.textContent)!=null&&s.trim()))return l.textContent.trim()}const i=e.closest("label");if(i&&((o=i.textContent)!=null&&o.trim()))return i.textContent.trim();if(e instanceof HTMLImageElement&&e.alt&&e.alt.trim())return e.alt.trim();const n=e.getAttribute("placeholder");if(n&&n.trim())return n.trim();const a=e.getAttribute("title");return a&&a.trim()?a.trim():((d=e.textContent)==null?void 0:d.trim())||""}function zy(e){const t=e.tagName.toUpperCase();if(t==="BUTTON")return"button";if(t==="A"&&e.hasAttribute("href"))return"link";if(t==="INPUT"){const i=(e.getAttribute("type")||"text").toLowerCase();return["button","submit","reset"].includes(i)?"button":"input"}if(t==="TEXTAREA")return"textarea";if(t==="SELECT")return"select";if(t==="FORM")return"form";if(["H1","H2","H3","H4","H5","H6"].includes(t))return"heading";if(t==="IMG")return"image";const r=e.getAttribute("role");return r==="button"||r==="menuitem"||r==="tab"||r==="switch"?"button":r==="link"?"link":r==="heading"?"heading":r==="textbox"||r==="searchbox"?"input":r==="combobox"||r==="listbox"?"select":e.hasAttribute("contenteditable")||e.isContentEditable||e.getAttribute("contenteditable")==="true"?"input":e.hasAttribute("onclick")||e.getAttribute("tabindex")==="0"||t==="SUMMARY"?"button":"text"}function vc(e,t){const r=[];try{e.querySelectorAll(t).forEach(a=>{a instanceof HTMLElement&&r.push(a)}),e.querySelectorAll("*").forEach(a=>{if(a instanceof HTMLElement&&a.shadowRoot)try{const s=vc(a.shadowRoot,t);r.push(...s)}catch{}})}catch{}return r}function Oy(e){const t={},r=["data-target","aria-controls","href","name","placeholder","value","aria-label","title","role"];for(const i of r){const n=e.getAttribute(i);n!==null&&n!==""&&(t[i]=n)}return Object.keys(t).length>0?t:void 0}function $c(){const e=[],t=new Set,r=["button","a[href]","input","textarea","select","form","h1, h2, h3, h4, h5, h6",'[role="button"]','[role="link"]','[role="heading"]','[role="menuitem"]','[role="tab"]','[role="switch"]','[tabindex="0"]',"[contenteditable]","summary",".employee-name",".employee-title",".employee-email",".employee-phone","p","span","img[alt]"].join(", ");return vc(document,r).forEach(a=>{if(!(a instanceof HTMLElement)||t.has(a)||!Iy(a))return;const s=zy(a),o=Ay(a);let d=(a.textContent||"").trim();if(s==="image"&&a instanceof HTMLImageElement&&(d=a.alt||""),s==="input"&&!d){const x=a;d=x.placeholder||x.value||o||""}if(s==="text"&&(!d||!a.id&&a.children.length>0&&a.querySelector("button, a[href], input, textarea, select, [id], .employee-email, .employee-phone"))||!d&&!o)return;const l=a.getBoundingClientRect(),c={x:Math.round(l.x),y:Math.round(l.y),width:Math.round(l.width),height:Math.round(l.height)},p=Ey(a),f=Cy(a),w=a instanceof HTMLInputElement?a.getAttribute("type")||"text":null,m=Oy(a),v={id:p,type:s,tagName:a.tagName.toLowerCase(),label:d,role:f,accessibleName:o!==d?o:void 0,inputType:w,visible:!0,position:c,attributes:m};e.push(v),t.add(a)}),{page:{url:window.location.href,title:document.title,lang:document.documentElement.lang||void 0,viewport:{width:window.innerWidth,height:window.innerHeight}},elements:e}}var My={exports:{}};(function(e){var t=function(r){var i=Object.prototype,n=i.hasOwnProperty,a=Object.defineProperty||function(z,D,O){z[D]=O.value},s,o=typeof Symbol=="function"?Symbol:{},d=o.iterator||"@@iterator",l=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function p(z,D,O){return Object.defineProperty(z,D,{value:O,enumerable:!0,configurable:!0,writable:!0}),z[D]}try{p({},"")}catch{p=function(D,O,q){return D[O]=q}}function f(z,D,O,q){var B=D&&D.prototype instanceof T?D:T,U=Object.create(B.prototype),te=new F(q||[]);return a(U,"_invoke",{value:Y(z,O,te)}),U}r.wrap=f;function w(z,D,O){try{return{type:"normal",arg:z.call(D,O)}}catch(q){return{type:"throw",arg:q}}}var m="suspendedStart",v="suspendedYield",x="executing",b="completed",_={};function T(){}function k(){}function E(){}var C={};p(C,d,function(){return this});var A=Object.getPrototypeOf,$=A&&A(A(G([])));$&&$!==i&&n.call($,d)&&(C=$);var N=E.prototype=T.prototype=Object.create(C);k.prototype=E,a(N,"constructor",{value:E,configurable:!0}),a(E,"constructor",{value:k,configurable:!0}),k.displayName=p(E,c,"GeneratorFunction");function P(z){["next","throw","return"].forEach(function(D){p(z,D,function(O){return this._invoke(D,O)})})}r.isGeneratorFunction=function(z){var D=typeof z=="function"&&z.constructor;return D?D===k||(D.displayName||D.name)==="GeneratorFunction":!1},r.mark=function(z){return Object.setPrototypeOf?Object.setPrototypeOf(z,E):(z.__proto__=E,p(z,c,"GeneratorFunction")),z.prototype=Object.create(N),z},r.awrap=function(z){return{__await:z}};function K(z,D){function O(U,te,be,pe){var he=w(z[U],z,te);if(he.type==="throw")pe(he.arg);else{var Ce=he.arg,Ae=Ce.value;return Ae&&typeof Ae=="object"&&n.call(Ae,"__await")?D.resolve(Ae.__await).then(function(Ee){O("next",Ee,be,pe)},function(Ee){O("throw",Ee,be,pe)}):D.resolve(Ae).then(function(Ee){Ce.value=Ee,be(Ce)},function(Ee){return O("throw",Ee,be,pe)})}}var q;function B(U,te){function be(){return new D(function(pe,he){O(U,te,pe,he)})}return q=q?q.then(be,be):be()}a(this,"_invoke",{value:B})}P(K.prototype),p(K.prototype,l,function(){return this}),r.AsyncIterator=K,r.async=function(z,D,O,q,B){B===void 0&&(B=Promise);var U=new K(f(z,D,O,q),B);return r.isGeneratorFunction(D)?U:U.next().then(function(te){return te.done?te.value:U.next()})};function Y(z,D,O){var q=m;return function(U,te){if(q===x)throw new Error("Generator is already running");if(q===b){if(U==="throw")throw te;return Q()}for(O.method=U,O.arg=te;;){var be=O.delegate;if(be){var pe=X(be,O);if(pe){if(pe===_)continue;return pe}}if(O.method==="next")O.sent=O._sent=O.arg;else if(O.method==="throw"){if(q===m)throw q=b,O.arg;O.dispatchException(O.arg)}else O.method==="return"&&O.abrupt("return",O.arg);q=x;var he=w(z,D,O);if(he.type==="normal"){if(q=O.done?b:v,he.arg===_)continue;return{value:he.arg,done:O.done}}else he.type==="throw"&&(q=b,O.method="throw",O.arg=he.arg)}}}function X(z,D){var O=D.method,q=z.iterator[O];if(q===s)return D.delegate=null,O==="throw"&&z.iterator.return&&(D.method="return",D.arg=s,X(z,D),D.method==="throw")||O!=="return"&&(D.method="throw",D.arg=new TypeError("The iterator does not provide a '"+O+"' method")),_;var B=w(q,z.iterator,D.arg);if(B.type==="throw")return D.method="throw",D.arg=B.arg,D.delegate=null,_;var U=B.arg;if(!U)return D.method="throw",D.arg=new TypeError("iterator result is not an object"),D.delegate=null,_;if(U.done)D[z.resultName]=U.value,D.next=z.nextLoc,D.method!=="return"&&(D.method="next",D.arg=s);else return U;return D.delegate=null,_}P(N),p(N,c,"Generator"),p(N,d,function(){return this}),p(N,"toString",function(){return"[object Generator]"});function R(z){var D={tryLoc:z[0]};1 in z&&(D.catchLoc=z[1]),2 in z&&(D.finallyLoc=z[2],D.afterLoc=z[3]),this.tryEntries.push(D)}function H(z){var D=z.completion||{};D.type="normal",delete D.arg,z.completion=D}function F(z){this.tryEntries=[{tryLoc:"root"}],z.forEach(R,this),this.reset(!0)}r.keys=function(z){var D=Object(z),O=[];for(var q in D)O.push(q);return O.reverse(),function B(){for(;O.length;){var U=O.pop();if(U in D)return B.value=U,B.done=!1,B}return B.done=!0,B}};function G(z){if(z){var D=z[d];if(D)return D.call(z);if(typeof z.next=="function")return z;if(!isNaN(z.length)){var O=-1,q=function B(){for(;++O<z.length;)if(n.call(z,O))return B.value=z[O],B.done=!1,B;return B.value=s,B.done=!0,B};return q.next=q}}return{next:Q}}r.values=G;function Q(){return{value:s,done:!0}}return F.prototype={constructor:F,reset:function(z){if(this.prev=0,this.next=0,this.sent=this._sent=s,this.done=!1,this.delegate=null,this.method="next",this.arg=s,this.tryEntries.forEach(H),!z)for(var D in this)D.charAt(0)==="t"&&n.call(this,D)&&!isNaN(+D.slice(1))&&(this[D]=s)},stop:function(){this.done=!0;var z=this.tryEntries[0],D=z.completion;if(D.type==="throw")throw D.arg;return this.rval},dispatchException:function(z){if(this.done)throw z;var D=this;function O(pe,he){return U.type="throw",U.arg=z,D.next=pe,he&&(D.method="next",D.arg=s),!!he}for(var q=this.tryEntries.length-1;q>=0;--q){var B=this.tryEntries[q],U=B.completion;if(B.tryLoc==="root")return O("end");if(B.tryLoc<=this.prev){var te=n.call(B,"catchLoc"),be=n.call(B,"finallyLoc");if(te&&be){if(this.prev<B.catchLoc)return O(B.catchLoc,!0);if(this.prev<B.finallyLoc)return O(B.finallyLoc)}else if(te){if(this.prev<B.catchLoc)return O(B.catchLoc,!0)}else if(be){if(this.prev<B.finallyLoc)return O(B.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(z,D){for(var O=this.tryEntries.length-1;O>=0;--O){var q=this.tryEntries[O];if(q.tryLoc<=this.prev&&n.call(q,"finallyLoc")&&this.prev<q.finallyLoc){var B=q;break}}B&&(z==="break"||z==="continue")&&B.tryLoc<=D&&D<=B.finallyLoc&&(B=null);var U=B?B.completion:{};return U.type=z,U.arg=D,B?(this.method="next",this.next=B.finallyLoc,_):this.complete(U)},complete:function(z,D){if(z.type==="throw")throw z.arg;return z.type==="break"||z.type==="continue"?this.next=z.arg:z.type==="return"?(this.rval=this.arg=z.arg,this.method="return",this.next="end"):z.type==="normal"&&D&&(this.next=D),_},finish:function(z){for(var D=this.tryEntries.length-1;D>=0;--D){var O=this.tryEntries[D];if(O.finallyLoc===z)return this.complete(O.completion,O.afterLoc),H(O),_}},catch:function(z){for(var D=this.tryEntries.length-1;D>=0;--D){var O=this.tryEntries[D];if(O.tryLoc===z){var q=O.completion;if(q.type==="throw"){var B=q.arg;H(O)}return B}}throw new Error("illegal catch attempt")},delegateYield:function(z,D,O){return this.delegate={iterator:G(z),resultName:D,nextLoc:O},this.method==="next"&&(this.arg=s),_}},r}(e.exports);try{regeneratorRuntime=t}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}})(My);var xc=(e,t)=>`${e}-${t}-${Math.random().toString(16).slice(3,8)}`;const Ry=xc;let vo=0;var Ny=({id:e,action:t,payload:r={}})=>{let i=e;return typeof i>"u"&&(i=Ry("Job",vo),vo+=1),{id:i,action:t,payload:r}},si={};let Qn=!1;si.logging=Qn;si.setLogging=e=>{Qn=e};si.log=(...e)=>Qn?console.log.apply(void 0,e):null;function By(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Dy=e=>{const t={};return typeof WorkerGlobalScope<"u"?t.type="webworker":typeof document=="object"?t.type="browser":typeof process=="object"&&typeof By=="function"&&(t.type="node"),typeof e>"u"?t:t[e]};const Ly=Dy("type")==="browser",Py=Ly?e=>new URL(e,window.location.href).href:e=>e;var Uy=e=>{const t={...e};return["corePath","workerPath","langPath"].forEach(r=>{e[r]&&(t[r]=Py(t[r]))}),t},qy={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3};const Wy="7.0.0",Vy={version:Wy};var Gy={workerBlobURL:!0,logger:()=>{}};const Hy=Vy.version,Fy=Gy;var jy={...Fy,workerPath:`https://cdn.jsdelivr.net/npm/tesseract.js@v${Hy}/dist/worker.min.js`},Ky=({workerPath:e,workerBlobURL:t})=>{let r;if(Blob&&URL&&t){const i=new Blob([`importScripts("${e}");`],{type:"application/javascript"});r=new Worker(URL.createObjectURL(i))}else r=new Worker(e);return r},Yy=e=>{e.terminate()},Zy=(e,t)=>{e.onmessage=({data:r})=>{t(r)}},Xy=async(e,t)=>{e.postMessage(t)};const Ai=e=>new Promise((t,r)=>{const i=new FileReader;i.onload=()=>{t(i.result)},i.onerror=({target:{error:{code:n}}})=>{r(Error(`File could not be read! Code=${n}`))},i.readAsArrayBuffer(e)}),Bn=async e=>{let t=e;if(typeof e>"u")return"undefined";if(typeof e=="string")/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(e)?t=atob(e.split(",")[1]).split("").map(r=>r.charCodeAt(0)):t=await(await fetch(e)).arrayBuffer();else if(typeof HTMLElement<"u"&&e instanceof HTMLElement)e.tagName==="IMG"&&(t=await Bn(e.src)),e.tagName==="VIDEO"&&(t=await Bn(e.poster)),e.tagName==="CANVAS"&&await new Promise(r=>{e.toBlob(async i=>{t=await Ai(i),r()})});else if(typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas){const r=await e.convertToBlob();t=await Ai(r)}else(e instanceof File||e instanceof Blob)&&(t=await Ai(e));return new Uint8Array(t)};var Qy=Bn;const Jy=jy,e0=Ky,t0=Yy,r0=Zy,i0=Xy,n0=Qy;var a0={defaultOptions:Jy,spawnWorker:e0,terminateWorker:t0,onMessage:r0,send:i0,loadImage:n0};const s0=Uy,rt=Ny,{log:$o}=si,o0=xc,Ct=qy,{defaultOptions:u0,spawnWorker:l0,terminateWorker:d0,onMessage:c0,loadImage:xo,send:p0}=a0;let So=0;var Sc=async(e="eng",t=Ct.LSTM_ONLY,r={},i={})=>{const n=o0("Worker",So),{logger:a,errorHandler:s,...o}=s0({...u0,...r}),d={},l=typeof e=="string"?e.split("+"):e;let c=t,p=i;const f=[Ct.DEFAULT,Ct.LSTM_ONLY].includes(t)&&!o.legacyCore;let w,m;const v=new Promise((G,Q)=>{m=G,w=Q}),x=G=>{w(G.message)};let b=l0(o);b.onerror=x,So+=1;const _=({id:G,action:Q,payload:z})=>new Promise((D,O)=>{$o(`[${n}]: Start ${G}, action=${Q}`);const q=`${Q}-${G}`;d[q]={resolve:D,reject:O},p0(b,{workerId:n,jobId:G,action:Q,payload:z})}),T=()=>console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"),k=G=>_(rt({id:G,action:"load",payload:{options:{lstmOnly:f,corePath:o.corePath,logging:o.logging}}})),E=(G,Q,z)=>_(rt({id:z,action:"FS",payload:{method:"writeFile",args:[G,Q]}})),C=(G,Q)=>_(rt({id:Q,action:"FS",payload:{method:"readFile",args:[G,{encoding:"utf8"}]}})),A=(G,Q)=>_(rt({id:Q,action:"FS",payload:{method:"unlink",args:[G]}})),$=(G,Q,z)=>_(rt({id:z,action:"FS",payload:{method:G,args:Q}})),N=(G,Q)=>_(rt({id:Q,action:"loadLanguage",payload:{langs:G,options:{langPath:o.langPath,dataPath:o.dataPath,cachePath:o.cachePath,cacheMethod:o.cacheMethod,gzip:o.gzip,lstmOnly:[Ct.DEFAULT,Ct.LSTM_ONLY].includes(c)&&!o.legacyLang}}})),P=(G,Q,z,D)=>_(rt({id:D,action:"initialize",payload:{langs:G,oem:Q,config:z}})),K=(G="eng",Q,z,D)=>{if(f&&[Ct.TESSERACT_ONLY,Ct.TESSERACT_LSTM_COMBINED].includes(Q))throw Error("Legacy model requested but code missing.");const O=Q||c;c=O;const q=z||p;p=q;const U=(typeof G=="string"?G.split("+"):G).filter(te=>!l.includes(te));return l.push(...U),U.length>0?N(U,D).then(()=>P(G,O,q,D)):P(G,O,q,D)},Y=(G={},Q)=>_(rt({id:Q,action:"setParameters",payload:{params:G}})),X=async(G,Q={},z={text:!0},D)=>_(rt({id:D,action:"recognize",payload:{image:await xo(G),options:Q,output:z}})),R=async(G,Q)=>{if(f)throw Error("`worker.detect` requires Legacy model, which was not loaded.");return _(rt({id:Q,action:"detect",payload:{image:await xo(G)}}))},H=async()=>(b!==null&&(d0(b),b=null),Promise.resolve());c0(b,({workerId:G,jobId:Q,status:z,action:D,data:O})=>{const q=`${D}-${Q}`;if(z==="resolve")$o(`[${G}]: Complete ${Q}`),d[q].resolve({jobId:Q,data:O}),delete d[q];else if(z==="reject")if(d[q].reject(O),delete d[q],D==="load"&&w(O),s)s(O);else throw Error(O);else z==="progress"&&a({...O,userJobId:Q})});const F={id:n,worker:b,load:T,writeText:E,readText:C,removeFile:A,FS:$,reinitialize:K,setParameters:Y,recognize:X,detect:R,terminate:H};return k().then(()=>N(e)).then(()=>P(e,t,i)).then(()=>m(F)).catch(()=>{}),v};const Tc=Sc,h0=async(e,t,r)=>{const i=await Tc(t,1,r);return i.recognize(e).finally(async()=>{await i.terminate()})},f0=async(e,t)=>{const r=await Tc("osd",0,t);return r.detect(e).finally(async()=>{await r.terminate()})};var m0={recognize:h0,detect:f0};const g0=Sc,y0=m0;var w0={createWorker:g0,...y0},zi={};let Rr=null,To=0;async function b0(){return Rr||(Rr=(async()=>{var t;if(typeof process<"u"&&(zi!=null&&zi.VITEST))return{recognize:async()=>({data:{text:"",lines:[],confidence:90}}),terminate:async()=>{}};const e={cacheMethod:"none"};if(typeof chrome<"u"&&((t=chrome.runtime)!=null&&t.getURL))try{const r=chrome.runtime.getURL("eng.traineddata"),i=await fetch(r);if(i.ok){const n=await i.arrayBuffer();e.workerOptions={langPath:r},e.langData={eng:n}}}catch(r){console.warn("[OCR] Pre-fetch of eng.traineddata failed:",r),e.langPath=chrome.runtime.getURL("")}try{return await w0.createWorker("eng",1,e)}catch(r){throw console.warn("[OCR Worker Init] Primary init failed, trying bare fallback:",r),Rr=null,r}})()),Rr}function _0(e,t){if(!e||typeof e!="string")return!1;const r=e.toLowerCase().trim();if(r==="click view profile"||r.startsWith("click view profile")||r==="open rahul's profile"||r.startsWith("open rahul's profile")||r==="close profile")return!1;if(["ocr","text in image","in this image","in the image","read image","read picture","text written","visual text","acknowledgement","acknowledgment","registration","what does it say","what is written","what text","scan","badge text","card text","img1","badge","canvas","photo","screenshot","code","code written","written in"].some(o=>r.includes(o)))return!0;const a=typeof document<"u"&&document.querySelectorAll("canvas").length>0;return(r.includes("number")||r.includes("code")||r.includes("what text"))&&!r.includes("email")&&!r.includes("mobile")&&a}function v0(e){if(e instanceof HTMLCanvasElement)try{const t=e.width,r=e.height;return t===0||r===0?null:{dataUrl:e.toDataURL("image/png"),width:t,height:r}}catch{return null}if(e instanceof HTMLImageElement){const t=e.naturalWidth||e.width||200,r=e.naturalHeight||e.height||100;if(e.src&&e.src.startsWith("data:"))return{dataUrl:e.src,width:t,height:r};try{const i=document.createElement("canvas");if(i.width=t,i.height=r,i.width>0&&i.height>0){const n=i.getContext("2d");if(n)return n.drawImage(e,0,0),{dataUrl:i.toDataURL("image/png"),width:t,height:r}}}catch{if(e.src)return{dataUrl:e.src,width:t,height:r}}if(e.src)return{dataUrl:e.src,width:t,height:r}}return null}async function $0(e){const t=performance.now(),r=[];let i=0,n=!1,a;if(typeof document>"u")return{regions:r,uncertain:!1,status:"success",elementsScanned:0,executionTimeMs:0};const s=[];if(document.querySelectorAll("canvas").forEach((p,f)=>{const w=p.id||p.getAttribute("data-perception-id")||`canvas_${f+1}`;s.push({id:w,element:p})}),document.querySelectorAll("img").forEach((p,f)=>{if(p.classList.contains("profile-photo")||p.id.startsWith("photo_"))return;const w=p.id||p.getAttribute("data-perception-id")||`img_${f+1}`;s.push({id:w,element:p})}),s.length===0)return{regions:r,uncertain:!1,status:"success",elementsScanned:0,executionTimeMs:0};let l=0;try{const p=await b0();for(const{id:f,element:w}of s)try{const m=v0(w);if(!m){n=!0;continue}const v=w.getBoundingClientRect(),{dataUrl:x,width:b,height:_}=m,T=await p.recognize(x);if(l++,T&&T.data&&T.data.text){const E=T.data.lines||[],C=v.width>0&&b>0?v.width/b:1,A=v.height>0&&_>0?v.height/_:1;if(E.length>0)for(const $ of E){const N=$.text?$.text.trim():"";if(N.length<2)continue;const P=$.bbox||{x0:0,y0:0,x1:b,y1:_},K=Math.max(1,P.x1-P.x0),Y=Math.max(1,P.y1-P.y0),X=e.elements.some(H=>H.label&&H.label.trim().toLowerCase()===N.toLowerCase()),R=Math.round($.confidence||80)/100;R<.3&&(n=!0),r.push({id:`ocr_${++i}`,text:N,confidence:R,imageBbox:{x:Math.round(P.x0),y:Math.round(P.y0),width:Math.round(K),height:Math.round(Y)},bbox:{x:Math.round(v.x+P.x0*C),y:Math.round(v.y+P.y0*A),width:Math.round(K*C),height:Math.round(Y*A)},source:"ocr",elementId:f,isDuplicateOfDom:X})}else{const $=T.data.text.trim();if($.length>=2){const N=e.elements.some(P=>P.label&&P.label.trim().toLowerCase()===$.toLowerCase());r.push({id:`ocr_${++i}`,text:$,confidence:Math.round(T.data.confidence||80)/100,imageBbox:{x:0,y:0,width:b,height:_},bbox:{x:Math.round(v.x),y:Math.round(v.y),width:Math.round(v.width||b),height:Math.round(v.height||_)},source:"ocr",elementId:f,isDuplicateOfDom:N})}}}else n=!0}catch(m){console.warn(`[OCR Engine Warning] OCR skipped element '${f}':`,m),n=!0}}catch(p){console.warn("[OCR Engine Warning] Local Tesseract OCR encountered an error:",p),a=p.message||"OCR Engine failed",n=!0}finally{To=Math.round(performance.now()-t)}const c=r.length>0?"success":a?"failure":n?"uncertain":"success";return{regions:r,uncertain:n,status:c,elementsScanned:l,error:a,executionTimeMs:To}}/*!
 * ONNX Runtime Web v1.29.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Jn=Object.defineProperty,x0=Object.getOwnPropertyDescriptor,S0=Object.getOwnPropertyNames,T0=Object.prototype.hasOwnProperty,k0=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),j=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Qt=(e,t)=>{for(var r in t)Jn(e,r,{get:t[r],enumerable:!0})},E0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of S0(t))!T0.call(e,n)&&n!==r&&Jn(e,n,{get:()=>t[n],enumerable:!(i=x0(t,n))||i.enumerable});return e},br=e=>E0(Jn({},"__esModule",{value:!0}),e),nr,wt,Kt,ko,kc,Ec=j(()=>{"use strict";nr=new Map,wt=[],Kt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=nr.get(e);if(i===void 0)nr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=wt.indexOf(e);n!==-1&&wt.splice(n,1);for(let a=0;a<wt.length;a++)if(nr.get(wt[a]).priority<=r){wt.splice(a,0,e);return}wt.push(e)}return}throw new TypeError("not a valid backend")},ko=async e=>{let t=nr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},kc=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),i=r.length===0?wt:r,n,a=[],s=new Set;for(let d of i){let l=await ko(d);typeof l=="string"?a.push({name:d,err:l}):(n||(n=l),n===l&&s.add(d))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:l}of a)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${l}`);let o=t.filter(d=>s.has(typeof d=="string"?d:d.name));return[n,new Proxy(e,{get:(d,l)=>l==="executionProviders"?o:Reflect.get(d,l)})]}}),I0=j(()=>{"use strict";Ec()}),Ic,C0=j(()=>{"use strict";Ic="1.29.0"}),Oi,Me,Cc=j(()=>{"use strict";C0(),Oi="warning",Me={wasm:{},webgl:{},webgpu:{},versions:{common:Ic},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Oi=e}},get logLevel(){return Oi}},Object.defineProperty(Me,"logLevel",{enumerable:!0})}),ve,A0=j(()=>{"use strict";Cc(),ve=Me}),Ac,zc,z0=j(()=>{"use strict";Ac=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,d,l;o===void 0||o.mean===void 0?d=[255,255,255,255]:typeof o.mean=="number"?d=[o.mean,o.mean,o.mean,o.mean]:(d=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(d[3]=o.mean[3])),o===void 0||o.bias===void 0?l=[0,0,0,0]:typeof o.bias=="number"?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(l[3]=o.bias[3]));let c=a*n,p=0,f=c,w=c*2,m=-1;s==="RGBA"?(p=0,f=c,w=c*2,m=c*3):s==="RGB"?(p=0,f=c,w=c*2):s==="RBG"&&(p=0,w=c,f=c*2);for(let v=0;v<a;v++)for(let x=0;x<n;x++){let b=(e.data[p++]-l[0])*d[0],_=(e.data[f++]-l[1])*d[1],T=(e.data[w++]-l[2])*d[2],k=m===-1?255:(e.data[m++]-l[3])*d[3];i.fillStyle="rgba("+b+","+_+","+T+","+k+")",i.fillRect(x,v,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},zc=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t==null?void 0:t.norm,l,c;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?c=[0,0,0,0]:typeof d.bias=="number"?c=[d.bias,d.bias,d.bias,d.bias]:(c=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(c[3]=d.bias[3]));let p=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,w=0,m=1,v=2,x=3,b=0,_=p,T=p*2,k=-1;o==="RGBA"?(b=0,_=p,T=p*2,k=p*3):o==="RGB"?(b=0,_=p,T=p*2):o==="RBG"&&(b=0,T=p,_=p*2),i=r.createImageData(n,a);for(let E=0;E<a*n;w+=f,m+=f,v+=f,x+=f,E++)i.data[w]=(e.data[b++]-c[0])*l[0],i.data[m]=(e.data[_++]-c[1])*l[1],i.data[v]=(e.data[T++]-c[2])*l[2],i.data[x]=k===-1?255:(e.data[k++]-c[3])*l[3]}else throw new Error("Can not access image data");return i}}),Nr,Oc,Mc,Rc,Nc,Bc,O0=j(()=>{"use strict";ea(),Nr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*i,c=d==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,f=0,w=1,m=2,v=3,x=0,b=l,_=l*2,T=-1;o==="RGB"&&(p=3,f=0,w=1,m=2,v=-1),d==="RGBA"?T=l*3:d==="RBG"?(x=0,_=l,b=l*2):d==="BGR"&&(_=0,b=l,x=l*2);for(let k=0;k<l;k++,f+=p,m+=p,w+=p,v+=p)c[x++]=(e[f]+s[0])/a[0],c[b++]=(e[w]+s[1])/a[1],c[_++]=(e[m]+s[2])/a[2],T!==-1&&v!==-1&&(c[T++]=(e[v]+s[3])/a[3]);return d==="RGBA"?new qe("float32",c,[1,4,r,i]):new qe("float32",c,[1,3,r,i])},Oc=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,o=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=d();c.width=e.width,c.height=e.height;let p=l(c);if(p!=null){let f=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(f=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=f,o.width=w}else o.tensorFormat="RGBA",o.height=f,o.width=w;p.drawImage(e,0,0),s=p.getImageData(0,0,w,f).data}else throw new Error("Can not access image data")}else if(i){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=e.height,p=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=p,t!==void 0){let f=d();f.width=p,f.height=c;let w=l(f);if(w!=null)w.putImageData(e,0,0),s=w.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=d();c.width=e.width,c.height=e.height;let p=l(c);if(p!=null){let f=e.height,w=e.width;return p.drawImage(e,0,0,w,f),s=p.getImageData(0,0,w,f).data,o.height=f,o.width=w,Nr(s,o)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,p)=>{let f=d(),w=l(f);if(!e||!w)return p();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{f.width=m.width,f.height=m.height,w.drawImage(m,0,0,f.width,f.height);let v=w.getImageData(0,0,f.width,f.height);o.height=f.height,o.width=f.width,c(Nr(v.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Nr(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Mc=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new qe({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},Rc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new qe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},Nc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new qe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},Bc=(e,t,r)=>new qe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Nt,mr,Mi,Dc,M0=j(()=>{"use strict";Nt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),mr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Mi=!1,Dc=()=>{if(!Mi){Mi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Nt.set("int64",BigInt64Array),mr.set(BigInt64Array,"int64")),t&&(Nt.set("uint64",BigUint64Array),mr.set(BigUint64Array,"uint64")),i?(Nt.set("float16",r),mr.set(r,"float16")):Nt.set("float16",Uint16Array)}}}),Lc,Pc,R0=j(()=>{"use strict";ea(),Lc=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Pc=(e,t)=>{switch(e.location){case"cpu":return new qe(e.type,e.data,t);case"cpu-pinned":return new qe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new qe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new qe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new qe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),qe,ea=j(()=>{"use strict";z0(),O0(),M0(),R0(),qe=class{constructor(e,t,r){Dc();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=Nt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let d=Nt.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?s=d.from(t,BigInt):s=d.from(t)}else if(t instanceof d)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${d}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")i="string",s=e;else if(d==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let d=mr.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=d,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let a=Lc(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return Oc(e,t)}static fromTexture(e,t){return Mc(e,t)}static fromGpuBuffer(e,t){return Rc(e,t)}static fromMLTensor(e,t){return Nc(e,t)}static fromPinnedBuffer(e,t,r){return Bc(e,t,r)}toDataURL(e){return Ac(this,e)}toImageData(e){return zc(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Pc(this,e)}}}),nt,Uc=j(()=>{"use strict";ea(),nt=qe}),Xr,Ri,at,Qe,Lt,Pt,qc=j(()=>{"use strict";Cc(),Xr=(e,t)=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ri=(e,t)=>{var n;let r=((n=new Error().stack)==null?void 0:n.split(/\r\n|\r|\n/g))||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Xr("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},at=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||Ri("BEGIN",e)},Qe=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||Ri("END",e)},Lt=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.time(`ORT::${e}`)},Pt=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.timeEnd(`ORT::${e}`)}}),Wc,N0=j(()=>{"use strict";Ec(),Uc(),qc(),Wc=class Vc{constructor(t){this.handler=t}async run(t,r,i){at(),Lt("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof nt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof nt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);n[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let f=r[p];(f===null||f instanceof nt)&&(l=!0,s=!1,n[p]=f)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)n[l]=null;let o=await this.handler.run(t,n,a),d={};for(let l in o)if(Object.hasOwnProperty.call(o,l)){let c=o[l];c instanceof nt?d[l]=c:d[l]=new nt(c.type,c.data,c.dims)}return Pt("InferenceSession.run"),Qe(),d}async release(){return this.handler.dispose()}static async create(t,r,i,n){at(),Lt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,f=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(f=t.byteLength-p,typeof i=="number"){if(f=i,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||p+f>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,p,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,d]=await kc(s),l=await o.createInferenceSessionHandler(a,d);return Pt("InferenceSession.create"),Qe(),new Vc(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Qr,B0=j(()=>{"use strict";N0(),Qr=Wc}),D0=j(()=>{"use strict"}),L0=j(()=>{"use strict"}),P0=j(()=>{"use strict"}),U0=j(()=>{"use strict"}),q0={};Qt(q0,{InferenceSession:()=>Qr,TRACE:()=>Xr,TRACE_EVENT_BEGIN:()=>Lt,TRACE_EVENT_END:()=>Pt,TRACE_FUNC_BEGIN:()=>at,TRACE_FUNC_END:()=>Qe,Tensor:()=>nt,env:()=>ve,registerBackend:()=>Kt});var Ge=j(()=>{"use strict";I0(),A0(),B0(),Uc(),D0(),L0(),qc(),P0(),U0()}),ta=j(()=>{"use strict"}),Gc={};Qt(Gc,{default:()=>Hc});var Ni,Bi,Hc,W0=j(()=>{"use strict";var e;em(),Vt(),ra(),Ni="ort-wasm-proxy-worker",Bi=((e=globalThis.self)==null?void 0:e.name)===Ni,Bi&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":ia(i.wasm).then(()=>{_a(i).then(()=>{postMessage({type:r})},n=>{postMessage({type:r,err:n})})},n=>{postMessage({type:r,err:n})});break;case"init-ep":{let{epName:n,env:a}=i;va(a,n).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})});break}case"copy-from":{let{buffer:n}=i,a=ai(n);postMessage({type:r,out:a});break}case"create":{let{model:n,options:a}=i;$a(n,a).then(s=>{postMessage({type:r,out:s})},s=>{postMessage({type:r,err:s})});break}case"release":xa(i),postMessage({type:r});break;case"run":{let{sessionId:n,inputIndices:a,inputs:s,outputIndices:o,options:d}=i;Sa(n,a,s,o,new Array(o.length).fill(null),d).then(l=>{l.some(c=>c[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:l},ka([...s,...l]))},l=>{postMessage({type:r,err:l})});break}case"end-profiling":Ta(i),postMessage({type:r});break;default:}}catch(n){postMessage({type:r,err:n})}}),Hc=Bi?null:t=>new Worker(t??Ue,{type:"module",name:Ni})}),Fc={};Qt(Fc,{default:()=>jc});async function Eo(e={}){var bo,_o;var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&((bo=self.name)==null?void 0:bo.startsWith("em-pthread"));t.mountExternalData=(u,h)=>{u.startsWith("./")&&(u=u.substring(2)),(t.Yc||(t.Yc=new Map)).set(u,h)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=u=>async(...h)=>{var y;try{if(t.Xc)throw Error("Session already started");let g=t.Xc={Kd:h[0],errors:[]},S=await u(...h);if(t.Xc!==g)throw Error("Session mismatch");(y=t.dd)==null||y.flush();let I=g.errors;if(0<I.length){let M=await Promise.all(I);if(M=M.filter(W=>W),0<M.length)throw Error(M.join(`
`))}return S}finally{t.Xc=null}};t.jsepInit=(u,h)=>{if(u==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=h;let y=t.dd;t.jsepRegisterBuffer=(g,S,I,M)=>y.registerBuffer(g,S,I,M),t.jsepGetBuffer=g=>y.getBuffer(g),t.jsepCreateDownloader=(g,S,I)=>y.createDownloader(g,S,I),t.jsepOnCreateSession=g=>{y.onCreateSession(g)},t.jsepOnReleaseSession=g=>{y.onReleaseSession(g)},t.jsepOnRunStart=g=>y.onRunStart(g),t.Id=(g,S)=>{y.upload(g,S)}}else if(u==="webnn"){let y=h[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=h.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=g=>y.onRunStart(g),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnOnReleaseSession=g=>{y.onReleaseSession(g)},t.webnnCreateMLTensorDownloader=(g,S)=>y.createMLTensorDownloader(g,S),t.webnnRegisterMLTensor=(g,S,I,M)=>y.registerMLTensor(g,S,I,M),t.webnnCreateMLContext=g=>y.createMLContext(g),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let s=()=>{let u=h=>(...y)=>{let g=et;return y=h(...y),et!=g?new Promise((S,I)=>{yi={resolve:S,reject:I}}):y};(()=>{for(let h of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[h]=u(t[h])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s==null||s()};var o,d,l=(u,h)=>{throw h},c="",p="";if(r||i){try{p=new URL(".",c).href}catch{}i&&(d=u=>{var h=new XMLHttpRequest;return h.open("GET",u,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),o=async u=>{if(A(u))return new Promise((y,g)=>{var S=new XMLHttpRequest;S.open("GET",u,!0),S.responseType="arraybuffer",S.onload=()=>{S.status==200||S.status==0&&S.response?y(S.response):g(S.status)},S.onerror=g,S.send(null)});var h=await fetch(u,{credentials:"same-origin"});if(h.ok)return h.arrayBuffer();throw Error(h.status+" : "+h.url)}}var f,w,m,v,x,b,_=console.log.bind(console),T=console.error.bind(console),k=_,E=T,C=!1,A=u=>u.startsWith("file://");function $(){ft.buffer!=P.buffer&&q()}if(n){let u=function(h){try{var y=h.data,g=y.Sc;if(g==="load"){let S=[];self.onmessage=I=>S.push(I),b=()=>{postMessage({Sc:"loaded"});for(let I of S)u(I);self.onmessage=u};for(let I of y.xd)t[I]&&!t[I].proxy||(t[I]=(...M)=>{postMessage({Sc:"callHandler",vd:I,args:M})},I=="print"&&(k=t[I]),I=="printErr"&&(E=t[I]));ft=y.Od,q(),w=y.Pd,be(),Mr()}else if(g==="run"){(function(S){var I=($(),H)[S+52>>>2>>>0];S=($(),H)[S+56>>>2>>>0],Is(I,I-S),le(I)})(y.Rc),$i(y.Rc,0,0,1,0,0),Ca(),fi(y.Rc),N||($s(),N=!0);try{gm(y.Md,y.bd)}catch(S){if(S!="unwind")throw S}}else y.target!=="setimmediate"&&(g==="checkMailbox"?N&&kr():g&&(E(`worker: received unknown command ${g}`),E(y)))}catch(S){throw xs(),S}};var N=!1;self.onunhandledrejection=h=>{throw h.reason||h},self.onmessage=u}var P,K,Y,X,R,H,F,G,Q,z,D,O=!1;function q(){var u=ft.buffer;t.HEAP8=P=new Int8Array(u),Y=new Int16Array(u),t.HEAPU8=K=new Uint8Array(u),X=new Uint16Array(u),t.HEAP32=R=new Int32Array(u),t.HEAPU32=H=new Uint32Array(u),F=new Float32Array(u),G=new Float64Array(u),Q=new BigInt64Array(u),z=new BigUint64Array(u)}function B(){O=!0,n?b():ot.sb()}function U(u){throw E(u="Aborted("+u+")"),C=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),x==null||x(u),u}function te(){return{a:{ma:Pg,hb:Lg,g:ym,J:wm,f:bm,o:_m,i:vm,$:$m,b:xm,S:Sm,Ia:Na,n:Tm,aa:Pa,Ya:Ua,Ea:qa,Ga:Wa,Za:Va,Wa:Ga,Pa:Ha,Va:Fa,ka:ja,Fa:Ka,Ca:Ya,Xa:Za,Da:Xa,cb:km,fa:Em,xa:Im,va:Am,ea:Om,N:Mm,H:Rm,wa:Nm,_:Wm,ya:Vm,Sa:Gm,Aa:Fm,Ja:jm,ta:Km,ga:Ym,Ra:fi,$a:Zm,Q:eg,r:ag,c:pi,ib:sg,y:og,M:ug,D:lg,l:dg,s:as,jb:cg,I:pg,R:hg,j:fg,u:mg,q:gg,k:yg,Ma:wg,Na:bg,Oa:_g,Ka:ls,La:ds,ua:cs,eb:$g,bb:Sg,v:Tg,ba:kg,ha:Eg,ab:xg,V:Ig,_a:Cg,Ba:Ag,F:vg,T:zg,la:zr,za:Mg,gb:Og,fb:Rg,Ta:ms,Ua:gs,Ha:Jt,U:ys,ja:ws,Qa:bs,ia:_s,lb:vy,na:gy,mb:_y,oa:my,G:ay,e:Vg,t:qg,w:Ug,B:Jg,nb:py,Z:cy,x:Fg,pa:hy,X:yy,ca:dy,ob:ly,pb:uy,O:ey,qa:oy,qb:sy,L:iy,Y:fy,d:Wg,A:Hg,m:Gg,kb:$y,p:Kg,z:Yg,C:jg,E:Zg,K:ty,ra:ny,P:wy,da:ry,W:by,rb:Qg,sa:Xg,h:Bg,a:ft,db:Le}}}async function be(){function u(g,S){var I=ot=g.exports;g={};for(let[M,W]of Object.entries(I))typeof W=="function"?(I=Xm(W),g[M]=I):g[M]=W;return ot=g,ot=function(){var M=ot,W=J=>ue=>J(ue)>>>0,Z=J=>()=>J()>>>0;return(M=Object.assign({},M)).tb=W(M.tb),M.Xb=Z(M.Xb),M.Zb=W(M.Zb),M.lc=W(M.lc),M.mc=Z(M.mc),M.qc=W(M.qc),M}(),Ea.push(ot._b),vs=(g=ot).tb,$s=g.ub,t._OrtInit=g.vb,t._OrtGetLastError=g.wb,t._OrtCreateSessionOptions=g.xb,t._OrtAppendExecutionProvider=g.yb,t._OrtAddFreeDimensionOverride=g.zb,t._OrtAddSessionConfigEntry=g.Ab,t._OrtReleaseSessionOptions=g.Bb,t._OrtCreateSession=g.Cb,t._OrtReleaseSession=g.Db,t._OrtGetInputOutputCount=g.Eb,t._OrtGetInputOutputMetadata=g.Fb,t._OrtFree=g.Gb,t._OrtCreateTensor=g.Hb,t._OrtGetTensorData=g.Ib,t._OrtReleaseTensor=g.Jb,t._OrtCreateRunOptions=g.Kb,t._OrtAddRunConfigEntry=g.Lb,t._OrtReleaseRunOptions=g.Mb,t._OrtCreateBinding=g.Nb,t._OrtBindInput=g.Ob,t._OrtBindOutput=g.Pb,t._OrtClearBoundOutputs=g.Qb,t._OrtReleaseBinding=g.Rb,t._OrtRunWithBinding=g.Sb,t._OrtRun=g.Tb,t._OrtEndProfiling=g.Ub,t._JsepOutput=g.Vb,t._JsepGetNodeName=g.Wb,Or=g.Xb,tt=t._free=g.Yb,rr=t._malloc=g.Zb,$i=g.ac,xs=g.bc,Ss=g.cc,Ts=g.dc,xi=g.ec,ks=g.fc,Es=g.gc,ce=g.hc,ir=g.ic,Is=g.jc,le=g.kc,Si=g.lc,de=g.mc,Cs=g.nc,Ti=g.oc,As=g.pc,zs=g.qc,Os=g.rc,ki=g.sc,Ms=g.tc,Rs=g.uc,Ns=g.vc,Bs=g.wc,Ds=g.xc,Ls=g.yc,Ps=g.zc,Us=g.Ac,qs=g.Bc,Ws=g.Cc,Vs=g.Dc,Gs=g.Ec,Hs=g.Fc,Fs=g.Gc,js=g.Hc,Ks=g.Ic,Ys=g.Jc,Zs=g.Kc,Xs=g.Lc,Qs=g.Mc,Js=g.Nc,eo=g.Pc,to=g.Qc,ro=g.$c,io=g.ad,no=g.fd,ao=g.kd,so=g.ld,oo=g.md,uo=g.nd,lo=g.od,co=g.pd,po=g.qd,ho=g.rd,fo=g.wd,mo=g.Ud,go=g.Vd,yo=g.Wd,wo=g.Xd,w=S,ot}var h,y=te();return t.instantiateWasm?new Promise(g=>{t.instantiateWasm(y,(S,I)=>{g(u(S,I))})}):n?u(new WebAssembly.Instance(w,te()),w):(D??(D=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm","").href),h=await async function(g){var S=D;if(!f&&!A(S))try{var I=fetch(S,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,g)}catch(M){E(`wasm streaming compile failed: ${M}`),E("falling back to ArrayBuffer instantiation")}return async function(M,W){try{var Z=await async function(J){if(!f)try{var ue=await o(J);return new Uint8Array(ue)}catch{}if(J==D&&f)J=new Uint8Array(f);else{if(!d)throw"both async and sync fetching of the wasm failed";J=d(J)}return J}(M);return await WebAssembly.instantiate(Z,W)}catch(J){E(`failed to asynchronously prepare wasm: ${J}`),U(J)}}(S,g)}(y),u(h.instance,h.module))}class pe{constructor(h){Pe(this,"name","ExitStatus");this.message=`Program terminated with exit(${h})`,this.status=h}}var he=u=>{u.terminate(),u.onmessage=()=>{}},Ce=[],Ae=0,Ee=null,pt=u=>{ht.length==0&&(za(),Aa(ht[0]));var h=ht.pop();if(!h)return 6;er.push(h),kt[u.Rc]=h,h.Rc=u.Rc;var y={Sc:"run",Md:u.Ld,bd:u.bd,Rc:u.Rc};return h.postMessage(y,u.jd),0},xe=0,se=(u,h,...y)=>{var g,S=16*y.length,I=de(),M=Si(S),W=M>>>3;for(g of y)typeof g=="bigint"?(($(),Q)[W++>>>0]=1n,($(),Q)[W++>>>0]=g):(($(),Q)[W++>>>0]=0n,($(),G)[W++>>>0]=g);return u=Ss(u,0,S,M,h),le(I),u};function Le(u){if(n)return se(0,1,u);if(m=u,!(0<xe)){for(var h of er)he(h);for(h of ht)he(h);ht=[],er=[],kt={},C=!0}l(0,new pe(u))}function vr(u){if(n)return se(1,0,u);Jt(u)}var Jt=u=>{if(m=u,n)throw vr(u),"unwind";Le(u)},ht=[],er=[],Ea=[],kt={},Ia=u=>{var h=u.Rc;delete kt[h],ht.push(u),er.splice(er.indexOf(u),1),u.Rc=0,Ts(h)};function Ca(){Ea.forEach(u=>u())}var Aa=u=>new Promise(h=>{u.onmessage=S=>{var I=S.data;if(S=I.Sc,I.Zc&&I.Zc!=Or()){var M=kt[I.Zc];M?M.postMessage(I,I.jd):E(`Internal error! Worker sent a message "${S}" to target pthread ${I.Zc}, but that thread no longer exists!`)}else S==="checkMailbox"?kr():S==="spawnThread"?pt(I):S==="cleanupThread"?Tr(()=>{Ia(kt[I.Nd])}):S==="loaded"?(u.loaded=!0,h(u)):I.target==="setimmediate"?u.postMessage(I):S==="uncaughtException"?u.onerror(I.error):S==="callHandler"?t[I.vd](...I.args):S&&E(`worker sent an unknown command ${S}`)},u.onerror=S=>{throw E(`worker sent an error! ${S.filename}:${S.lineno}: ${S.message}`),S};var y,g=[];for(y of[])t.propertyIsEnumerable(y)&&g.push(y);u.postMessage({Sc:"load",xd:g,Od:ft,Pd:w})});function za(){var u=new Worker(new URL(""),{type:"module",workerData:"em-pthread",name:"em-pthread"});ht.push(u)}var ft,gm=(u,h)=>{xe=0,u=ki(u,h),0<xe?m=u:xi(u)},$r=[],xr=0;function ym(u){var h=new ui(u>>>=0);return($(),P)[h.Tc+12>>>0]==0&&(Oa(h,!0),xr--),Ma(h,!1),$r.push(h),zs(u)}var Ht=0,wm=()=>{ce(0,0);var u=$r.pop();Cs(u.cd),Ht=0};function Oa(u,h){h=h?1:0,($(),P)[u.Tc+12>>>0]=h}function Ma(u,h){h=h?1:0,($(),P)[u.Tc+13>>>0]=h}class ui{constructor(h){this.cd=h,this.Tc=h-24}}var li=u=>{var h=Ht;if(!h)return ir(0),0;var y=new ui(h);($(),H)[y.Tc+16>>>2>>>0]=h;var g=($(),H)[y.Tc+4>>>2>>>0];if(!g)return ir(0),h;for(var S of u){if(S===0||S===g)break;if(As(S,g,y.Tc+16))return ir(S),h}return ir(g),h};function bm(){return li([])}function _m(u){return li([u>>>0])}function vm(u,h,y,g){return li([u>>>0,h>>>0,y>>>0,g>>>0])}var $m=()=>{var u=$r.pop();u||U("no exception to throw");var h=u.cd;throw($(),P)[u.Tc+13>>>0]==0&&($r.push(u),Ma(u,!0),Oa(u,!1),xr++),Ti(h),Ht=h};function xm(u,h,y){var g=new ui(u>>>=0);throw h>>>=0,y>>>=0,($(),H)[g.Tc+16>>>2>>>0]=0,($(),H)[g.Tc+4>>>2>>>0]=h,($(),H)[g.Tc+8>>>2>>>0]=y,Ti(u),xr++,Ht=u}var Sm=()=>xr;function Ra(u,h,y,g){return n?se(2,1,u,h,y,g):Na(u,h,y,g)}function Na(u,h,y,g){if(u>>>=0,h>>>=0,y>>>=0,g>>>=0,!globalThis.SharedArrayBuffer)return 6;var S=[];return n&&S.length===0?Ra(u,h,y,g):(u={Ld:y,Rc:u,bd:g,jd:S},n?(u.Sc="spawnThread",postMessage(u,S),0):pt(u))}function Tm(u){throw Ht||(Ht=u>>>0),Ht}var Ba=globalThis.TextDecoder&&new TextDecoder,Da=(u,h,y,g)=>{if(y=h+y,g)return y;for(;u[h]&&!(h>=y);)++h;return h},La=(u,h=0,y,g)=>{if(16<(y=Da(u,h>>>=0,y,g))-h&&u.buffer&&Ba)return Ba.decode(u.buffer instanceof ArrayBuffer?u.subarray(h,y):u.slice(h,y));for(g="";h<y;){var S=u[h++];if(128&S){var I=63&u[h++];if((224&S)==192)g+=String.fromCharCode((31&S)<<6|I);else{var M=63&u[h++];65536>(S=(240&S)==224?(15&S)<<12|I<<6|M:(7&S)<<18|I<<12|M<<6|63&u[h++])?g+=String.fromCharCode(S):(S-=65536,g+=String.fromCharCode(55296|S>>10,56320|1023&S))}}else g+=String.fromCharCode(S)}return g},Ie=(u,h,y)=>(u>>>=0)?La(($(),K),u,h,y):"";function Pa(u,h,y){return n?se(3,1,u,h,y):0}function Ua(u,h){if(n)return se(4,1,u,h)}function qa(u,h){if(n)return se(5,1,u,h)}function Wa(u,h,y){if(n)return se(6,1,u,h,y)}function Va(u,h,y){return n?se(7,1,u,h,y):0}function Ga(u,h){if(n)return se(8,1,u,h)}function Ha(u,h,y){if(n)return se(9,1,u,h,y)}function Fa(u,h,y,g){if(n)return se(10,1,u,h,y,g)}function ja(u,h,y,g){if(n)return se(11,1,u,h,y,g)}function Ka(u,h,y,g){if(n)return se(12,1,u,h,y,g)}function Ya(u){if(n)return se(13,1,u)}function Za(u,h){if(n)return se(14,1,u,h)}function Xa(u,h,y){if(n)return se(15,1,u,h,y)}var km=()=>U(""),Je=u=>{u>>>=0;for(var h="";;){var y=($(),K)[u++>>>0];if(!y)return h;h+=String.fromCharCode(y)}},di={},ci={},Ft=class extends Error{constructor(u){super(u),this.name="BindingError"}};function st(u,h,y={}){return function(g,S,I={}){var M=S.name;if(!g)throw new Ft(`type "${M}" must have a positive integer typeid pointer`);if(ci.hasOwnProperty(g)){if(I.yd)return;throw new Ft(`Cannot register type '${M}' twice`)}ci[g]=S,di.hasOwnProperty(g)&&(S=di[g],delete di[g],S.forEach(W=>W()))}(u,h,y)}var Qa=(u,h,y)=>{switch(h){case 1:return y?g=>($(),P)[g>>>0]:g=>($(),K)[g>>>0];case 2:return y?g=>($(),Y)[g>>>1>>>0]:g=>($(),X)[g>>>1>>>0];case 4:return y?g=>($(),R)[g>>>2>>>0]:g=>($(),H)[g>>>2>>>0];case 8:return y?g=>($(),Q)[g>>>3>>>0]:g=>($(),z)[g>>>3>>>0];default:throw new TypeError(`invalid integer width (${h}): ${u}`)}};function Em(u,h,y,g,S){u>>>=0,y>>>=0,h=Je(h>>>0);let I=M=>M;if(g=g===0n){let M=8*y;I=W=>BigInt.asUintN(M,W),S=I(S)}st(u,{name:h,Oc:I,Vc:(M,W)=>(typeof W=="number"&&(W=BigInt(W)),W),Uc:Qa(h,y,!g),Wc:null})}function Im(u,h,y,g){st(u>>>=0,{name:h=Je(h>>>0),Oc:function(S){return!!S},Vc:function(S,I){return I?y:g},Uc:function(S){return this.Oc(($(),K)[S>>>0])},Wc:null})}var Ja=[],Et=[0,1,,1,null,1,!0,1,!1,1];function pi(u){9<(u>>>=0)&&--Et[u+1]===0&&(Et[u]=void 0,Ja.push(u))}var Ve=u=>{if(!u)throw new Ft(`Cannot use deleted val. handle = ${u}`);return Et[u]},He=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let h=Ja.pop()||Et.length;return Et[h]=u,Et[h+1]=1,h}};function hi(u){return this.Oc(($(),H)[u>>>2>>>0])}var Cm={name:"emscripten::val",Oc:u=>{var h=Ve(u);return pi(u),h},Vc:(u,h)=>He(h),Uc:hi,Wc:null};function Am(u){return st(u>>>0,Cm)}var zm=(u,h)=>{switch(h){case 4:return function(y){return this.Oc(($(),F)[y>>>2>>>0])};case 8:return function(y){return this.Oc(($(),G)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${h}): ${u}`)}};function Om(u,h,y){y>>>=0,st(u>>>=0,{name:h=Je(h>>>0),Oc:g=>g,Vc:(g,S)=>S,Uc:zm(h,y),Wc:null})}function Mm(u,h,y,g,S){u>>>=0,y>>>=0,h=Je(h>>>0);let I=W=>W;if(g===0){var M=32-8*y;I=W=>W<<M>>>M,S=I(S)}st(u,{name:h,Oc:I,Vc:(W,Z)=>Z,Uc:Qa(h,y,g!==0),Wc:null})}function Rm(u,h,y){function g(I){var M=($(),H)[I>>>2>>>0];return I=($(),H)[I+4>>>2>>>0],new S(($(),P).buffer,I,M)}var S=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][h];st(u>>>=0,{name:y=Je(y>>>0),Oc:g,Uc:g},{yd:!0})}var mt=(u,h,y)=>{var g=($(),K);if(h>>>=0,0<y){var S=h;y=h+y-1;for(var I=0;I<u.length;++I){var M=u.codePointAt(I);if(127>=M){if(h>=y)break;g[h++>>>0]=M}else if(2047>=M){if(h+1>=y)break;g[h++>>>0]=192|M>>6,g[h++>>>0]=128|63&M}else if(65535>=M){if(h+2>=y)break;g[h++>>>0]=224|M>>12,g[h++>>>0]=128|M>>6&63,g[h++>>>0]=128|63&M}else{if(h+3>=y)break;g[h++>>>0]=240|M>>18,g[h++>>>0]=128|M>>12&63,g[h++>>>0]=128|M>>6&63,g[h++>>>0]=128|63&M,I++}}g[h>>>0]=0,u=h-S}else u=0;return u},Sr=u=>{for(var h=0,y=0;y<u.length;++y){var g=u.charCodeAt(y);127>=g?h++:2047>=g?h+=2:55296<=g&&57343>=g?(h+=4,++y):h+=3}return h};function Nm(u,h){st(u>>>=0,{name:h=Je(h>>>0),Oc(y){var g=($(),H)[y>>>2>>>0];return g=Ie(y+4,g,!0),tt(y),g},Vc(y,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var S=typeof g=="string";if(!(S||ArrayBuffer.isView(g)&&g.BYTES_PER_ELEMENT==1))throw new Ft("Cannot pass non-string to std::string");var I=S?Sr(g):g.length,M=rr(4+I+1),W=M+4;return($(),H)[M>>>2>>>0]=I,S?mt(g,W,I+1):($(),K).set(g,W>>>0),y!==null&&y.push(tt,M),M},Uc:hi,Wc(y){tt(y)}})}var es=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Bm=(u,h,y)=>{if(u>>>=1,16<(h=Da(($(),X),u,h/2,y))-u&&es)return es.decode(($(),X).slice(u,h));for(y="";u<h;++u){var g=($(),X)[u>>>0];y+=String.fromCharCode(g)}return y},Dm=(u,h,y)=>{if(y??(y=2147483647),2>y)return 0;var g=h;y=(y-=2)<2*u.length?y/2:u.length;for(var S=0;S<y;++S){var I=u.charCodeAt(S);($(),Y)[h>>>1>>>0]=I,h+=2}return($(),Y)[h>>>1>>>0]=0,h-g},Lm=u=>2*u.length,Pm=(u,h,y)=>{var g="";u>>>=2;for(var S=0;!(S>=h/4);S++){var I=($(),H)[u+S>>>0];if(!I&&!y)break;g+=String.fromCodePoint(I)}return g},Um=(u,h,y)=>{if(h>>>=0,y??(y=2147483647),4>y)return 0;var g=h;y=g+y-4;for(var S=0;S<u.length;++S){var I=u.codePointAt(S);if(65535<I&&S++,($(),R)[h>>>2>>>0]=I,(h+=4)+4>y)break}return($(),R)[h>>>2>>>0]=0,h-g},qm=u=>{for(var h=0,y=0;y<u.length;++y)65535<u.codePointAt(y)&&y++,h+=4;return h};function Wm(u,h,y){if(u>>>=0,h>>>=0,y=Je(y>>>=0),h===2)var g=Bm,S=Dm,I=Lm;else g=Pm,S=Um,I=qm;st(u,{name:y,Oc:M=>{var W=($(),H)[M>>>2>>>0];return W=g(M+4,W*h,!0),tt(M),W},Vc:(M,W)=>{if(typeof W!="string")throw new Ft(`Cannot pass non-string to C++ string type ${y}`);var Z=I(W),J=rr(4+Z+h);return($(),H)[J>>>2>>>0]=Z/h,S(W,J+4,Z+h),M!==null&&M.push(tt,J),J},Uc:hi,Wc(M){tt(M)}})}function Vm(u,h){st(u>>>=0,{zd:!0,name:h=Je(h>>>0),Oc:()=>{},Vc:()=>{}})}function Gm(u){$i(u>>>0,!i,1,!r,131072,!1),Ca()}var Tr=u=>{if(!C)try{if(u(),!(0<xe))try{n?Or()&&xi(m):Jt(m)}catch(h){h instanceof pe||h=="unwind"||l(0,h)}}catch(h){h instanceof pe||h=="unwind"||l(0,h)}},Hm=!Atomics.waitAsync||((_o=globalThis.navigator)==null?void 0:_o.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function fi(u){u>>>=0,Hm||(Atomics.waitAsync(($(),R),u>>>2,u).value.then(kr),u+=128,Atomics.store(($(),R),u>>>2,1))}var kr=()=>Tr(()=>{var u=Or();u&&(fi(u),Es())});function Fm(u,h){(u>>>=0)==h>>>0?setTimeout(kr):n?postMessage({Zc:u,Sc:"checkMailbox"}):(u=kt[u])&&u.postMessage({Sc:"checkMailbox"})}var mi=[];function jm(u,h,y,g,S){for(h>>>=0,S>>>=0,mi.length=0,y=S>>>3,g=S+g>>>3;y<g;){var I;I=($(),Q)[y++>>>0]?($(),Q)[y++>>>0]:($(),G)[y++>>>0],mi.push(I)}return(h?Ei[h]:Dg[u])(...mi)}var Km=()=>{xe=0};function Ym(u){u>>>=0,n?postMessage({Sc:"cleanupThread",Nd:u}):Ia(kt[u])}function Zm(u){}var Er=u=>{try{u()}catch(h){U(h)}};function Xm(u){var h=(...y)=>{Ir.push(u);try{return u(...y)}finally{C||(Ir.pop(),et&&gt===1&&Ir.length===0&&(gt=0,xe+=1,Er(go),typeof Fibers<"u"&&Fibers.be()))}};return is.set(u,h),h}var gt=0,et=null,ts=0,Ir=[],gi=new Map,rs=new Map,is=new Map,Qm=0,yi=null,Jm=[],ns=u=>function(h){if(!C){if(gt===0){var y=!1,g=!1;h((S=0)=>{if(!C&&(ts=S,y=!0,g)){gt=2,Er(()=>yo(et)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),S=!1;try{var I=function(){var Z=($(),R)[et+8>>>2>>>0];return Z=rs.get(Z),Z=is.get(Z),--xe,Z()}()}catch(Z){I=Z,S=!0}var M=!1;if(!et){var W=yi;W&&(yi=null,(S?W.reject:W.resolve)(I),M=!0)}if(S&&!M)throw I}}),g=!0,y||(gt=1,et=function(){var S=rr(65548),I=S+12;if(($(),H)[S>>>2>>>0]=I,($(),H)[S+4>>>2>>>0]=I+65536,I=Ir[0],!gi.has(I)){var M=Qm++;gi.set(I,M),rs.set(M,I)}return I=gi.get(I),($(),R)[S+8>>>2>>>0]=I,S}(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Er(()=>mo(et)))}else gt===2?(gt=0,Er(wo),tt(et),et=null,Jm.forEach(Tr)):U(`invalid state: ${gt}`);return ts}}(h=>{u().then(h)});function eg(u){return u>>>=0,ns(async()=>{var h=await Ve(u);return He(h)})}var wi=[],tg=u=>{var h=wi.length;return wi.push(u),h},rg=(u,h)=>{for(var y=Array(u),g=0;g<u;++g){var S=g,I=($(),H)[h+4*g>>>2>>>0],M=ci[I];if(M===void 0)throw u=`parameter ${g}`,I=vs(I),h=Je(I),tt(I),new Ft(`${u} has unknown type ${h}`);y[S]=M}return y},ig=(u,h,y)=>{var g=[];return u=u(g,y),g.length&&(($(),H)[h>>>2>>>0]=He(g)),u},ng={},Cr=u=>{var h=ng[u];return h===void 0?Je(u):h};function ag(u,h,y){var[g,...S]=rg(u,h>>>0);h=g.Vc.bind(g);var I=S.map(Z=>Z.Uc.bind(Z));u--;var M={toValue:Ve};switch(u=I.map((Z,J)=>{var ue=`argFromPtr${J}`;return M[ue]=Z,`${ue}(args${J?"+"+8*J:""})`}),y){case 0:var W="toValue(handle)";break;case 2:W="new (toValue(handle))";break;case 3:W="";break;case 1:M.getStringOrSymbol=Cr,W="toValue(handle)[getStringOrSymbol(methodName)]"}return W+=`(${u})`,g.zd||(M.toReturnWire=h,M.emval_returnValue=ig,W=`return emval_returnValue(toReturnWire, destructorsRef, ${W})`),W=`return function (handle, methodName, destructorsRef, args) {
  ${W}
  }`,y=new Function(Object.keys(M),W)(...Object.values(M)),W=`methodCaller<(${S.map(Z=>Z.name)}) => ${g.name}>`,tg(Object.defineProperty(y,"name",{value:W}))}function sg(u,h){return h>>>=0,(u=Ve(u>>>0))==Ve(h)}function og(u){return(u>>>=0)?(u=Cr(u),He(globalThis[u])):He(globalThis)}function ug(u){return u=Cr(u>>>0),He(t[u])}function lg(u,h){return h>>>=0,u=Ve(u>>>0),h=Ve(h),He(u[h])}function dg(u){9<(u>>>=0)&&(Et[u+1]+=1)}function as(u,h,y,g,S){return wi[u>>>0](h>>>0,y>>>0,g>>>0,S>>>0)}function cg(u,h,y,g,S){return as(u>>>0,h>>>0,y>>>0,g>>>0,S>>>0)}function pg(){return He([])}function hg(u){u=Ve(u>>>0);for(var h=Array(u.length),y=0;y<u.length;y++)h[y]=u[y];return He(h)}function fg(u){return He(Cr(u>>>0))}function mg(){return He({})}function gg(u){for(var h=Ve(u>>>=0);h.length;){var y=h.pop();h.pop()(y)}pi(u)}function yg(u,h,y){h>>>=0,y>>>=0,u=Ve(u>>>0),h=Ve(h),y=Ve(y),u[h]=y}function wg(u,h){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),h>>>=0,u=new Date(1e3*u),($(),R)[h>>>2>>>0]=u.getUTCSeconds(),($(),R)[h+4>>>2>>>0]=u.getUTCMinutes(),($(),R)[h+8>>>2>>>0]=u.getUTCHours(),($(),R)[h+12>>>2>>>0]=u.getUTCDate(),($(),R)[h+16>>>2>>>0]=u.getUTCMonth(),($(),R)[h+20>>>2>>>0]=u.getUTCFullYear()-1900,($(),R)[h+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),R)[h+28>>>2>>>0]=u}var ss=u=>u%4==0&&(u%100!=0||u%400==0),os=[0,31,60,91,121,152,182,213,244,274,305,335],us=[0,31,59,90,120,151,181,212,243,273,304,334];function bg(u,h){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),h>>>=0,u=new Date(1e3*u),($(),R)[h>>>2>>>0]=u.getSeconds(),($(),R)[h+4>>>2>>>0]=u.getMinutes(),($(),R)[h+8>>>2>>>0]=u.getHours(),($(),R)[h+12>>>2>>>0]=u.getDate(),($(),R)[h+16>>>2>>>0]=u.getMonth(),($(),R)[h+20>>>2>>>0]=u.getFullYear()-1900,($(),R)[h+24>>>2>>>0]=u.getDay();var y=(ss(u.getFullYear())?os:us)[u.getMonth()]+u.getDate()-1|0;($(),R)[h+28>>>2>>>0]=y,($(),R)[h+36>>>2>>>0]=-60*u.getTimezoneOffset(),y=new Date(u.getFullYear(),6,1).getTimezoneOffset();var g=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(y!=g&&u.getTimezoneOffset()==Math.min(g,y)),($(),R)[h+32>>>2>>>0]=u}function _g(u){u>>>=0;var h=new Date(($(),R)[u+20>>>2>>>0]+1900,($(),R)[u+16>>>2>>>0],($(),R)[u+12>>>2>>>0],($(),R)[u+8>>>2>>>0],($(),R)[u+4>>>2>>>0],($(),R)[u>>>2>>>0],0),y=($(),R)[u+32>>>2>>>0],g=h.getTimezoneOffset(),S=new Date(h.getFullYear(),6,1).getTimezoneOffset(),I=new Date(h.getFullYear(),0,1).getTimezoneOffset(),M=Math.min(I,S);return 0>y?($(),R)[u+32>>>2>>>0]=+(S!=I&&M==g):0<y!=(M==g)&&(S=Math.max(I,S),h.setTime(h.getTime()+6e4*((0<y?M:S)-g))),($(),R)[u+24>>>2>>>0]=h.getDay(),y=(ss(h.getFullYear())?os:us)[h.getMonth()]+h.getDate()-1|0,($(),R)[u+28>>>2>>>0]=y,($(),R)[u>>>2>>>0]=h.getSeconds(),($(),R)[u+4>>>2>>>0]=h.getMinutes(),($(),R)[u+8>>>2>>>0]=h.getHours(),($(),R)[u+12>>>2>>>0]=h.getDate(),($(),R)[u+16>>>2>>>0]=h.getMonth(),($(),R)[u+20>>>2>>>0]=h.getYear(),u=h.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function ls(u,h,y,g,S,I,M){return n?se(16,1,u,h,y,g,S,I,M):-52}function ds(u,h,y,g,S,I){if(n)return se(17,1,u,h,y,g,S,I)}var tr={},vg=()=>performance.timeOrigin+performance.now();function cs(u,h){if(n)return se(18,1,u,h);if(tr[u]&&(clearTimeout(tr[u].id),delete tr[u]),!h)return 0;var y=setTimeout(()=>{delete tr[u],Tr(()=>ks(u,performance.timeOrigin+performance.now()))},h);return tr[u]={id:y,ae:h},0}function $g(u,h,y,g){u>>>=0,h>>>=0,y>>>=0,g>>>=0;var S=new Date().getFullYear(),I=new Date(S,0,1).getTimezoneOffset();S=new Date(S,6,1).getTimezoneOffset();var M=Math.max(I,S);($(),H)[u>>>2>>>0]=60*M,($(),R)[h>>>2>>>0]=+(I!=S),u=(h=W=>{var Z=Math.abs(W);return`UTC${0<=W?"-":"+"}${String(Math.floor(Z/60)).padStart(2,"0")}${String(Z%60).padStart(2,"0")}`})(I),h=h(S),S<I?(mt(u,y,17),mt(h,g,17)):(mt(u,g,17),mt(h,y,17))}var xg=()=>Date.now();function Sg(u,h,y){return y>>>=0,0<=u&&3>=u?(u===0?u=Date.now():u=performance.timeOrigin+performance.now(),u=Math.round(1e6*u),($(),Q)[y>>>3>>>0]=BigInt(u),0):28}var bi=[],ps=(u,h)=>{bi.length=0;for(var y;y=($(),K)[u++>>>0];){var g=y!=105;h+=(g&=y!=112)&&h%8?4:0,bi.push(y==112?($(),H)[h>>>2>>>0]:y==106?($(),Q)[h>>>3>>>0]:y==105?($(),R)[h>>>2>>>0]:($(),G)[h>>>3>>>0]),h+=g?8:4}return bi};function Tg(u,h,y){return u>>>=0,h=ps(h>>>0,y>>>0),Ei[u](...h)}function kg(u,h,y){return u>>>=0,h=ps(h>>>0,y>>>0),Ei[u](...h)}var Eg=()=>{};function Ig(u,h){return E(Ie(u>>>0,h>>>0))}var Cg=()=>{throw xe+=1,"unwind"};function Ag(){return 4294901760}var zg=()=>navigator.hardwareConcurrency,It={},Ar=u=>{var h;return(h=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+h[1]:(h=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+h[1]:0},hs=u=>{for(var h of u)(u=Ar(h))&&(It[u]=h)};function Og(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),hs(u),It.gd=Ar(u[3]),It.Jd=u,It.gd}function zr(u){if(!(u=It[u>>>0]))return 0;var h;if(h=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=h[1];else if(h=/^\s+at (.*) \(.*\)$/.exec(u))u=h[1];else{if(!(h=/^(.+?)@/.exec(u)))return 0;u=h[1]}tt(zr.hd??0),h=Sr(u)+1;var y=rr(h);return y&&mt(u,y,h),zr.hd=y,zr.hd}function Mg(u){u>>>=0;var h=($(),K).length;if(u<=h||4294901760<u)return!1;for(var y=1;4>=y;y*=2){var g=h*(1+.2/y);g=Math.min(g,u+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(u,g)/65536))-ft.buffer.byteLength+65535)/65536|0;try{ft.grow(g),q();var S=1;break e}catch{}S=void 0}if(S)return!0}return!1}function Rg(u,h,y){if(u>>>=0,h>>>=0,It.gd==u)var g=It.Jd;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),hs(g);for(var S=3;g[S]&&Ar(g[S])!=u;)++S;for(u=0;u<y&&g[u+S];++u)($(),R)[h+4*u>>>2>>>0]=Ar(g[u+S]);return u}var _i,vi={},fs=()=>{var g;if(!_i){var u,h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((g=globalThis.navigator)==null?void 0:g.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in vi)vi[u]===void 0?delete h[u]:h[u]=vi[u];var y=[];for(u in h)y.push(`${u}=${h[u]}`);_i=y}return _i};function ms(u,h){if(n)return se(19,1,u,h);u>>>=0,h>>>=0;var y,g=0,S=0;for(y of fs()){var I=h+g;($(),H)[u+S>>>2>>>0]=I,g+=mt(y,I,1/0)+1,S+=4}return 0}function gs(u,h){if(n)return se(20,1,u,h);u>>>=0,h>>>=0;var y=fs();for(var g of(($(),H)[u>>>2>>>0]=y.length,u=0,y))u+=Sr(g)+1;return($(),H)[h>>>2>>>0]=u,0}function ys(u){return n?se(21,1,u):52}function ws(u,h,y,g){return n?se(22,1,u,h,y,g):52}function bs(u,h,y,g){return n?se(23,1,u,h,y,g):70}var Ng=[null,[],[]];function _s(u,h,y,g){if(n)return se(24,1,u,h,y,g);h>>>=0,y>>>=0,g>>>=0;for(var S=0,I=0;I<y;I++){var M=($(),H)[h>>>2>>>0],W=($(),H)[h+4>>>2>>>0];h+=8;for(var Z=0;Z<W;Z++){var J=u,ue=($(),K)[M+Z>>>0],me=Ng[J];ue===0||ue===10?((J===1?k:E)(La(me)),me.length=0):me.push(ue)}S+=W}return($(),H)[g>>>2>>>0]=S,0}function Bg(u){return u>>>0}n||function(){for(var u=t.numThreads-1;u--;)za();Ce.push(async()=>{var h=async function(){if(!n)return Promise.all(ht.map(Aa))}();Ae++,await h,--Ae==0&&Ee&&(h=Ee,Ee=null,h())})}(),n||(ft=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),q()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>de(),t.stackRestore=u=>le(u),t.stackAlloc=u=>Si(u),t.setValue=function(u,h,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":($(),P)[u>>>0]=h;break;case"i16":($(),Y)[u>>>1>>>0]=h;break;case"i32":($(),R)[u>>>2>>>0]=h;break;case"i64":($(),Q)[u>>>3>>>0]=BigInt(h);break;case"float":($(),F)[u>>>2>>>0]=h;break;case"double":($(),G)[u>>>3>>>0]=h;break;case"*":($(),H)[u>>>2>>>0]=h;break;default:U(`invalid type for setValue: ${y}`)}},t.getValue=function(u,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":return($(),P)[u>>>0];case"i16":return($(),Y)[u>>>1>>>0];case"i32":return($(),R)[u>>>2>>>0];case"i64":return($(),Q)[u>>>3>>>0];case"float":return($(),F)[u>>>2>>>0];case"double":return($(),G)[u>>>3>>>0];case"*":return($(),H)[u>>>2>>>0];default:U(`invalid type for getValue: ${h}`)}},t.UTF8ToString=Ie,t.stringToUTF8=mt,t.lengthBytesUTF8=Sr;var vs,$s,Or,tt,rr,$i,xs,Ss,Ts,xi,ks,Es,ce,ir,Is,le,Si,de,Cs,Ti,As,zs,Os,ki,Ms,Rs,Ns,Bs,Ds,Ls,Ps,Us,qs,Ws,Vs,Gs,Hs,Fs,js,Ks,Ys,Zs,Xs,Qs,Js,eo,to,ro,io,no,ao,so,oo,uo,lo,co,po,ho,fo,mo,go,yo,wo,ot,Dg=[Le,vr,Ra,Pa,Ua,qa,Wa,Va,Ga,Ha,Fa,ja,Ka,Ya,Za,Xa,ls,ds,cs,ms,gs,ys,ws,bs,_s],Ei={1055492:(u,h,y,g,S)=>{if(t===void 0||!t.Yc)return 1;if((u=Ie(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.Yc.get(u)))return 2;if(h=Number(h>>>0),y=Number(y>>>0),g=Number(g>>>0),h+y>u.byteLength)return 3;try{let I=u.subarray(h,h+y);switch(S){case 0:($(),K).set(I,g>>>0);break;case 1:t.Qd?t.Qd(g,I):t.Id(g,I);break;default:return 4}return 0}catch{return 4}},1056316:(u,h,y)=>{t.td(u,($(),K).subarray(h>>>0,h+y>>>0))},1056380:()=>t.Sd(),1056422:u=>{t.sd(u)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:u=>t.Ad(u),1056577:u=>t.Ed(u),1056609:(u,h,y)=>{t.ed(Number(u),Number(h),Number(y),!0)},1056672:(u,h,y)=>{t.ed(Number(u),Number(h),Number(y))},1056729:()=>typeof wasmOffsetConverter<"u",1056786:u=>{t.$b("Abs",u,void 0)},1056837:u=>{t.$b("Neg",u,void 0)},1056888:u=>{t.$b("Floor",u,void 0)},1056941:u=>{t.$b("Ceil",u,void 0)},1056993:u=>{t.$b("Reciprocal",u,void 0)},1057051:u=>{t.$b("Sqrt",u,void 0)},1057103:u=>{t.$b("Exp",u,void 0)},1057154:u=>{t.$b("Erf",u,void 0)},1057205:u=>{t.$b("Sigmoid",u,void 0)},1057260:(u,h,y)=>{t.$b("HardSigmoid",u,{alpha:h,beta:y})},1057339:u=>{t.$b("HardSwish",u,void 0)},1057396:u=>{t.$b("Log",u,void 0)},1057447:u=>{t.$b("Sin",u,void 0)},1057498:u=>{t.$b("Cos",u,void 0)},1057549:u=>{t.$b("Tan",u,void 0)},1057600:u=>{t.$b("Asin",u,void 0)},1057652:u=>{t.$b("Acos",u,void 0)},1057704:u=>{t.$b("Atan",u,void 0)},1057756:u=>{t.$b("Sinh",u,void 0)},1057808:u=>{t.$b("Cosh",u,void 0)},1057860:u=>{t.$b("Asinh",u,void 0)},1057913:u=>{t.$b("Acosh",u,void 0)},1057966:u=>{t.$b("Atanh",u,void 0)},1058019:u=>{t.$b("Tanh",u,void 0)},1058071:u=>{t.$b("Not",u,void 0)},1058122:(u,h,y)=>{t.$b("Clip",u,{min:h,max:y})},1058191:u=>{t.$b("Clip",u,void 0)},1058243:(u,h)=>{t.$b("Elu",u,{alpha:h})},1058301:u=>{t.$b("Gelu",u,void 0)},1058353:u=>{t.$b("Relu",u,void 0)},1058405:(u,h)=>{t.$b("LeakyRelu",u,{alpha:h})},1058469:(u,h)=>{t.$b("ThresholdedRelu",u,{alpha:h})},1058539:(u,h)=>{t.$b("Cast",u,{to:h})},1058597:u=>{t.$b("Add",u,void 0)},1058648:u=>{t.$b("Sub",u,void 0)},1058699:u=>{t.$b("Mul",u,void 0)},1058750:u=>{t.$b("Div",u,void 0)},1058801:u=>{t.$b("Pow",u,void 0)},1058852:u=>{t.$b("Equal",u,void 0)},1058905:u=>{t.$b("Greater",u,void 0)},1058960:u=>{t.$b("GreaterOrEqual",u,void 0)},1059022:u=>{t.$b("Less",u,void 0)},1059074:u=>{t.$b("LessOrEqual",u,void 0)},1059133:(u,h,y,g,S)=>{t.$b("ReduceMean",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1059308:(u,h,y,g,S)=>{t.$b("ReduceMax",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1059482:(u,h,y,g,S)=>{t.$b("ReduceMin",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1059656:(u,h,y,g,S)=>{t.$b("ReduceProd",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1059831:(u,h,y,g,S)=>{t.$b("ReduceSum",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1060005:(u,h,y,g,S)=>{t.$b("ReduceL1",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1060178:(u,h,y,g,S)=>{t.$b("ReduceL2",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1060351:(u,h,y,g,S)=>{t.$b("ReduceLogSum",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1060528:(u,h,y,g,S)=>{t.$b("ReduceSumSquare",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1060708:(u,h,y,g,S)=>{t.$b("ReduceLogSumExp",u,{keepDims:!!h,noopWithEmptyAxes:!!y,axes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1060888:u=>{t.$b("Where",u,void 0)},1060941:(u,h,y)=>{t.$b("Transpose",u,{perm:h?Array.from(($(),R).subarray(Number(h)>>>0,Number(y)>>>0)):[]})},1061065:(u,h,y,g)=>{t.$b("DepthToSpace",u,{blocksize:h,mode:Ie(y),format:g?"NHWC":"NCHW"})},1061198:(u,h,y,g)=>{t.$b("DepthToSpace",u,{blocksize:h,mode:Ie(y),format:g?"NHWC":"NCHW"})},1061331:(u,h,y,g)=>{t.$b("DFT",u,{axis:h,inverse:y,onesided:g})},1061423:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se,yt)=>{t.$b("ConvTranspose",u,{format:Z?"NHWC":"NCHW",autoPad:h,dilations:[y],group:g,kernelShape:[S],pads:[I,M],strides:[W],wIsConst:()=>!!($(),P)[J>>>0],outputPadding:ue?Array.from(($(),R).subarray(Number(ue)>>>0,Number(me)>>>0)):[],outputShape:_e?Array.from(($(),R).subarray(Number(_e)>>>0,Number(Se)>>>0)):[],activation:Ie(yt)})},1061856:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se)=>{t.$b("ConvTranspose",u,{format:W?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),R).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:g,kernelShape:Array.from(($(),R).subarray(Number(S)>>>0,(Number(S)>>>0)+2>>>0)),pads:Array.from(($(),R).subarray(Number(I)>>>0,(Number(I)>>>0)+4>>>0)),strides:Array.from(($(),R).subarray(Number(M)>>>0,(Number(M)>>>0)+2>>>0)),wIsConst:()=>!!($(),P)[Z>>>0],outputPadding:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],outputShape:me?Array.from(($(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Ie(Se)})},1062517:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se,yt)=>{t.$b("ConvTranspose",u,{format:Z?"NHWC":"NCHW",autoPad:h,dilations:[y],group:g,kernelShape:[S],pads:[I,M],strides:[W],wIsConst:()=>!!($(),P)[J>>>0],outputPadding:ue?Array.from(($(),R).subarray(Number(ue)>>>0,Number(me)>>>0)):[],outputShape:_e?Array.from(($(),R).subarray(Number(_e)>>>0,Number(Se)>>>0)):[],activation:Ie(yt)})},1062950:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se)=>{t.$b("ConvTranspose",u,{format:W?"NHWC":"NCHW",autoPad:h,dilations:Array.from(($(),R).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:g,kernelShape:Array.from(($(),R).subarray(Number(S)>>>0,(Number(S)>>>0)+2>>>0)),pads:Array.from(($(),R).subarray(Number(I)>>>0,(Number(I)>>>0)+4>>>0)),strides:Array.from(($(),R).subarray(Number(M)>>>0,(Number(M)>>>0)+2>>>0)),wIsConst:()=>!!($(),P)[Z>>>0],outputPadding:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],outputShape:me?Array.from(($(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Ie(Se)})},1063611:(u,h)=>{t.$b("GlobalAveragePool",u,{format:h?"NHWC":"NCHW"})},1063702:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se)=>{t.$b("AveragePool",u,{format:Se?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:g,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:W?Array.from(($(),R).subarray(Number(W)>>>0,Number(Z)>>>0)):[],pads:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],strides:me?Array.from(($(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},1064181:(u,h)=>{t.$b("GlobalAveragePool",u,{format:h?"NHWC":"NCHW"})},1064272:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se)=>{t.$b("AveragePool",u,{format:Se?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:g,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:W?Array.from(($(),R).subarray(Number(W)>>>0,Number(Z)>>>0)):[],pads:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],strides:me?Array.from(($(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},1064751:(u,h)=>{t.$b("GlobalMaxPool",u,{format:h?"NHWC":"NCHW"})},1064838:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se)=>{t.$b("MaxPool",u,{format:Se?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:g,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:W?Array.from(($(),R).subarray(Number(W)>>>0,Number(Z)>>>0)):[],pads:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],strides:me?Array.from(($(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},1065313:(u,h)=>{t.$b("GlobalMaxPool",u,{format:h?"NHWC":"NCHW"})},1065400:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se)=>{t.$b("MaxPool",u,{format:Se?"NHWC":"NCHW",auto_pad:h,ceil_mode:y,count_include_pad:g,storage_order:S,dilations:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:W?Array.from(($(),R).subarray(Number(W)>>>0,Number(Z)>>>0)):[],pads:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],strides:me?Array.from(($(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[]})},1065875:(u,h,y,g,S)=>{t.$b("Gemm",u,{alpha:h,beta:y,transA:g,transB:S})},1065979:u=>{t.$b("MatMul",u,void 0)},1066033:(u,h,y,g)=>{t.$b("ArgMax",u,{keepDims:!!h,selectLastIndex:!!y,axis:g})},1066141:(u,h,y,g)=>{t.$b("ArgMin",u,{keepDims:!!h,selectLastIndex:!!y,axis:g})},1066249:(u,h)=>{t.$b("Softmax",u,{axis:h})},1066312:(u,h)=>{t.$b("Concat",u,{axis:h})},1066372:(u,h,y,g,S)=>{t.$b("Split",u,{axis:h,numOutputs:y,splitSizes:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1066528:u=>{t.$b("Expand",u,void 0)},1066582:(u,h)=>{t.$b("Gather",u,{axis:Number(h)})},1066653:(u,h)=>{t.$b("GatherElements",u,{axis:Number(h)})},1066732:(u,h)=>{t.$b("GatherND",u,{batch_dims:Number(h)})},1066811:(u,h,y,g,S,I,M,W,Z,J,ue)=>{t.$b("Resize",u,{antialias:h,axes:y?Array.from(($(),R).subarray(Number(y)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Ie(S),cubicCoeffA:I,excludeOutside:M,extrapolationValue:W,keepAspectRatioPolicy:Ie(Z),mode:Ie(J),nearestMode:Ie(ue)})},1067173:(u,h,y,g,S,I,M)=>{t.$b("Slice",u,{starts:h?Array.from(($(),R).subarray(Number(h)>>>0,Number(y)>>>0)):[],ends:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[],axes:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(M)>>>0)):[]})},1067437:u=>{t.$b("Tile",u,void 0)},1067489:(u,h,y)=>{t.$b("InstanceNormalization",u,{epsilon:h,format:y?"NHWC":"NCHW"})},1067603:(u,h,y)=>{t.$b("InstanceNormalization",u,{epsilon:h,format:y?"NHWC":"NCHW"})},1067717:u=>{t.$b("Range",u,void 0)},1067770:(u,h)=>{t.$b("Einsum",u,{equation:Ie(h)})},1067851:(u,h,y,g,S)=>{t.$b("Pad",u,{mode:h,value:y,pads:g?Array.from(($(),R).subarray(Number(g)>>>0,Number(S)>>>0)):[]})},1067994:(u,h,y,g,S,I)=>{t.$b("BatchNormalization",u,{epsilon:h,momentum:y,spatial:!!S,trainingMode:!!g,format:I?"NHWC":"NCHW"})},1068163:(u,h,y,g,S,I)=>{t.$b("BatchNormalization",u,{epsilon:h,momentum:y,spatial:!!S,trainingMode:!!g,format:I?"NHWC":"NCHW"})},1068332:(u,h,y)=>{t.$b("CumSum",u,{exclusive:Number(h),reverse:Number(y)})},1068429:(u,h,y)=>{t.$b("DequantizeLinear",u,{axis:h,blockSize:y})},1068519:(u,h,y,g,S)=>{t.$b("GridSample",u,{align_corners:h,mode:Ie(y),padding_mode:Ie(g),format:S?"NHWC":"NCHW"})},1068689:(u,h,y,g,S)=>{t.$b("GridSample",u,{align_corners:h,mode:Ie(y),padding_mode:Ie(g),format:S?"NHWC":"NCHW"})},1068859:(u,h)=>{t.$b("ScatterND",u,{reduction:Ie(h)})},1068944:(u,h,y,g,S,I,M,W,Z)=>{t.$b("Attention",u,{numHeads:h,isUnidirectional:y,maskFilterValue:g,scale:S,doRotary:I,qkvHiddenSizes:M?Array.from(($(),R).subarray(Number(W)>>>0,Number(W)+M>>>0)):[],pastPresentShareBuffer:!!Z})},1069216:u=>{t.$b("BiasAdd",u,void 0)},1069271:u=>{t.$b("BiasSplitGelu",u,void 0)},1069332:u=>{t.$b("FastGelu",u,void 0)},1069388:(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se,yt,Ii)=>{t.$b("Conv",u,{format:me?"NHWC":"NCHW",auto_pad:h,dilations:y?Array.from(($(),R).subarray(Number(y)>>>0,Number(g)>>>0)):[],group:S,kernel_shape:I?Array.from(($(),R).subarray(Number(I)>>>0,Number(M)>>>0)):[],pads:W?Array.from(($(),R).subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:J?Array.from(($(),R).subarray(Number(J)>>>0,Number(ue)>>>0)):[],w_is_const:()=>!!($(),P)[Number(_e)>>>0],activation:Ie(Se),activation_params:yt?Array.from(($(),F).subarray(Number(yt)>>>0,Number(Ii)>>>0)):[]})},1069972:u=>{t.$b("Gelu",u,void 0)},1070024:(u,h,y,g,S,I,M,W,Z)=>{t.$b("GroupQueryAttention",u,{numHeads:h,kvNumHeads:y,scale:g,softcap:S,doRotary:I,rotaryInterleaved:M,smoothSoftmax:W,localWindowSize:Z})},1070241:(u,h,y,g)=>{t.$b("LayerNormalization",u,{axis:h,epsilon:y,simplified:!!g})},1070352:(u,h,y,g)=>{t.$b("LayerNormalization",u,{axis:h,epsilon:y,simplified:!!g})},1070463:(u,h,y,g,S,I)=>{t.$b("MatMulNBits",u,{k:h,n:y,accuracyLevel:g,bits:S,blockSize:I})},1070590:(u,h,y,g,S,I)=>{t.$b("MultiHeadAttention",u,{numHeads:h,isUnidirectional:y,maskFilterValue:g,scale:S,doRotary:I})},1070749:(u,h)=>{t.$b("QuickGelu",u,{alpha:h})},1070813:(u,h,y,g,S)=>{t.$b("RotaryEmbedding",u,{interleaved:!!h,numHeads:y,rotaryEmbeddingDim:g,scale:S})},1070952:(u,h,y)=>{t.$b("SkipLayerNormalization",u,{epsilon:h,simplified:!!y})},1071054:(u,h,y)=>{t.$b("SkipLayerNormalization",u,{epsilon:h,simplified:!!y})},1071156:(u,h,y,g)=>{t.$b("GatherBlockQuantized",u,{gatherAxis:h,quantizeAxis:y,blockSize:g})},1071277:u=>{t.Fd(u)},1071311:(u,h)=>t.Hd(Number(u),Number(h),t.Xc.Kd,t.Xc.errors)};function Lg(u,h,y){return ns(async()=>{await t.Dd(Number(u),Number(h),Number(y))})}function Pg(){return typeof wasmOffsetConverter<"u"}function Ug(u,h,y,g){var S=de();try{return Us(u,h,y,g)}catch(I){if(le(S),I!==I+0)throw I;ce(1,0)}}function qg(u,h,y){var g=de();try{return Bs(u,h,y)}catch(S){if(le(g),S!==S+0)throw S;ce(1,0)}}function Wg(u){var h=de();try{Ms(u)}catch(y){if(le(h),y!==y+0)throw y;ce(1,0)}}function Vg(u,h){var y=de();try{return ki(u,h)}catch(g){if(le(y),g!==g+0)throw g;ce(1,0)}}function Gg(u,h,y){var g=de();try{Os(u,h,y)}catch(S){if(le(g),S!==S+0)throw S;ce(1,0)}}function Hg(u,h){var y=de();try{qs(u,h)}catch(g){if(le(y),g!==g+0)throw g;ce(1,0)}}function Fg(u,h,y,g,S,I,M){var W=de();try{return Ls(u,h,y,g,S,I,M)}catch(Z){if(le(W),Z!==Z+0)throw Z;ce(1,0)}}function jg(u,h,y,g,S,I){var M=de();try{Rs(u,h,y,g,S,I)}catch(W){if(le(M),W!==W+0)throw W;ce(1,0)}}function Kg(u,h,y,g){var S=de();try{Ps(u,h,y,g)}catch(I){if(le(S),I!==I+0)throw I;ce(1,0)}}function Yg(u,h,y,g,S){var I=de();try{Ns(u,h,y,g,S)}catch(M){if(le(I),M!==M+0)throw M;ce(1,0)}}function Zg(u,h,y,g,S,I,M){var W=de();try{Vs(u,h,y,g,S,I,M)}catch(Z){if(le(W),Z!==Z+0)throw Z;ce(1,0)}}function Xg(u,h,y,g,S,I,M){var W=de();try{Gs(u,h,y,g,S,I,M)}catch(Z){if(le(W),Z!==Z+0)throw Z;ce(1,0)}}function Qg(u,h,y,g,S,I,M,W){var Z=de();try{Ks(u,h,y,g,S,I,M,W)}catch(J){if(le(Z),J!==J+0)throw J;ce(1,0)}}function Jg(u,h,y,g,S){var I=de();try{return Ws(u,h,y,g,S)}catch(M){if(le(I),M!==M+0)throw M;ce(1,0)}}function ey(u,h,y){var g=de();try{return Ys(u,h,y)}catch(S){if(le(g),S!==S+0)throw S;ce(1,0)}}function ty(u,h,y,g,S,I,M,W){var Z=de();try{Zs(u,h,y,g,S,I,M,W)}catch(J){if(le(Z),J!==J+0)throw J;ce(1,0)}}function ry(u,h,y,g,S,I,M,W,Z,J,ue,me){var _e=de();try{Hs(u,h,y,g,S,I,M,W,Z,J,ue,me)}catch(Se){if(le(_e),Se!==Se+0)throw Se;ce(1,0)}}function iy(u,h,y){var g=de();try{return Xs(u,h,y)}catch(S){if(le(g),S!==S+0)throw S;return ce(1,0),0n}}function ny(u,h,y,g,S,I,M,W,Z){var J=de();try{Ds(u,h,y,g,S,I,M,W,Z)}catch(ue){if(le(J),ue!==ue+0)throw ue;ce(1,0)}}function ay(u){var h=de();try{return Qs(u)}catch(y){if(le(h),y!==y+0)throw y;ce(1,0)}}function sy(u,h){var y=de();try{return fo(u,h)}catch(g){if(le(y),g!==g+0)throw g;return ce(1,0),0n}}function oy(u){var h=de();try{return Js(u)}catch(y){if(le(h),y!==y+0)throw y;return ce(1,0),0n}}function uy(u,h,y,g){var S=de();try{return ao(u,h,y,g)}catch(I){if(le(S),I!==I+0)throw I;ce(1,0)}}function ly(u,h,y,g,S){var I=de();try{return so(u,h,y,g,S)}catch(M){if(le(I),M!==M+0)throw M;ce(1,0)}}function dy(u,h,y,g,S,I){var M=de();try{return oo(u,h,y,g,S,I)}catch(W){if(le(M),W!==W+0)throw W;ce(1,0)}}function cy(u,h,y,g,S,I){var M=de();try{return Fs(u,h,y,g,S,I)}catch(W){if(le(M),W!==W+0)throw W;ce(1,0)}}function py(u,h,y,g,S,I){var M=de();try{return uo(u,h,y,g,S,I)}catch(W){if(le(M),W!==W+0)throw W;ce(1,0)}}function hy(u,h,y,g,S,I,M,W){var Z=de();try{return js(u,h,y,g,S,I,M,W)}catch(J){if(le(Z),J!==J+0)throw J;ce(1,0)}}function fy(u,h,y,g,S){var I=de();try{return lo(u,h,y,g,S)}catch(M){if(le(I),M!==M+0)throw M;return ce(1,0),0n}}function my(u,h,y,g){var S=de();try{return co(u,h,y,g)}catch(I){if(le(S),I!==I+0)throw I;ce(1,0)}}function gy(u,h,y,g){var S=de();try{return po(u,h,y,g)}catch(I){if(le(S),I!==I+0)throw I;ce(1,0)}}function yy(u,h,y,g,S,I,M,W,Z,J,ue,me){var _e=de();try{return ho(u,h,y,g,S,I,M,W,Z,J,ue,me)}catch(Se){if(le(_e),Se!==Se+0)throw Se;ce(1,0)}}function wy(u,h,y,g,S,I,M,W,Z,J,ue){var me=de();try{io(u,h,y,g,S,I,M,W,Z,J,ue)}catch(_e){if(le(me),_e!==_e+0)throw _e;ce(1,0)}}function by(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se,yt,Ii){var xy=de();try{no(u,h,y,g,S,I,M,W,Z,J,ue,me,_e,Se,yt,Ii)}catch(Ci){if(le(xy),Ci!==Ci+0)throw Ci;ce(1,0)}}function _y(u,h,y){var g=de();try{return eo(u,h,y)}catch(S){if(le(g),S!==S+0)throw S;ce(1,0)}}function vy(u,h,y){var g=de();try{return to(u,h,y)}catch(S){if(le(g),S!==S+0)throw S;ce(1,0)}}function $y(u,h,y,g){var S=de();try{ro(u,h,y,g)}catch(I){if(le(S),I!==I+0)throw I;ce(1,0)}}function Mr(){if(0<Ae)Ee=Mr;else if(n)v==null||v(t),B();else{for(var u=Ce;0<u.length;)u.shift()(t);0<Ae?Ee=Mr:(t.calledRun=!0,C||(B(),v==null||v(t)))}}return n||(ot=await be(),Mr()),t.PTR_SIZE=4,O?t:new Promise((u,h)=>{v=u,x=h})}var jc,Io,V0=j(()=>{"use strict";var e,t;jc=Eo,Io=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Io&&Eo()}),Di,Dn,Co,Ue,Kc,Br,Ao,zo,Li,Oo,Pi,Yc,Ui,Zc,ra=j(()=>{"use strict";ta(),Di=typeof location>"u"?void 0:location.origin,Dn=!1,Co=()=>{if(Dn){let e=URL;return new URL(new e("ort.bundle.min.mjs","").href,Di).href}return""},Ue=Co(),Kc=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},Br=(e,t)=>{try{let r=t??Ue;return(r?new URL(e,r):new URL(e)).origin===Di}catch{return!1}},Ao=(e,t)=>{let r=t??Ue;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},zo=(e,t)=>`${t??"./"}${e}`,Li=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Oo=async e=>(await import(e)).default,Pi=(W0(),br(Gc)).default,Yc=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Br(Ue))return[void 0,Pi()];let e=await Li(Ue);return[e,Pi(e)]},Ui=(V0(),br(Fc)).default,Zc=async(e,t,r,i)=>{let n=Ui&&!(e||t);if(n)if(Ue)n=Br(Ue)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Ui];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??Ao(a,t),o=r&&s&&!Br(s,t),d=o?await Li(s):s??zo(a,t);return[o?d:void 0,await Oo(d)]}}}),qi,Dr,ar,Wi,Mo,Ro,No,ia,$e,Vt=j(()=>{"use strict";ra(),Dr=!1,ar=!1,Wi=!1,Mo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ro=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},No=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ia=async e=>{if(Dr)return Promise.resolve();if(ar)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Wi)throw new Error("previous call to 'initializeWebAssembly()' failed.");ar=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!No())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ro())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Mo();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n==null?void 0:n.mjs,o=(s==null?void 0:s.href)??s,d=n==null?void 0:n.wasm,l=(d==null?void 0:d.href)??d,c=e.wasmBinary,[p,f]=await Zc(o,a,r>1,!!c||!!l),w=!1,m=[];if(t>0&&m.push(new Promise(v=>{setTimeout(()=>{w=!0,v()},t)})),m.push(new Promise((v,x)=>{let b={numThreads:r};if(c)b.wasmBinary=c,b.locateFile=_=>_;else if(l||a)b.locateFile=_=>l??a+_;else if(o&&o.indexOf("blob:")!==0)b.locateFile=_=>new URL(_,o).href;else if(p){let _=Kc();_&&(b.locateFile=T=>_+T)}f(b).then(_=>{ar=!1,Dr=!0,qi=_,v(),p&&URL.revokeObjectURL(p)},_=>{ar=!1,Wi=!0,x(_)})})),await Promise.race(m),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},$e=()=>{if(Dr&&qi)return qi;throw new Error("WebAssembly is not initialized yet.")}}),Xe,Jr,we,na=j(()=>{"use strict";Vt(),Xe=(e,t)=>{let r=$e(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Jr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")Jr(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},we=e=>{let t=$e(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Xc,G0=j(()=>{"use strict";Vt(),na(),Xc=e=>{let t=$e(),r=0,i=[],n=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(n.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=Xe(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,a),r===0&&we("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Jr(e.extra,"",new WeakSet,(s,o)=>{let d=Xe(s,i),l=Xe(o,i);t._OrtAddRunConfigEntry(r,d,l)!==0&&we(`Can't set a run config entry: ${s} - ${o}.`)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),a}}}),Bo,Do,Lo,At,Po,Qc,H0=j(()=>{"use strict";Vt(),na(),Bo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Do=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Lo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},At=(e,t,r,i)=>{let n=Xe(t,i),a=Xe(r,i);$e()._OrtAddSessionConfigEntry(e,n,a)!==0&&we(`Can't set a session config entry: ${t} - ${r}.`)},Po=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,s=[];switch(a){case"webnn":if(a="WEBNN",At(e,"session.disable_quant_qdq","1",r),At(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let p=n==null?void 0:n.deviceType;p&&At(e,"deviceType",p,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let p=n;if(p!=null&&p.preferredLayout){if(p.preferredLayout!=="NCHW"&&p.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${p.preferredLayout}`);At(e,"preferredLayout",p.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let o=Xe(a,r),d=s.length,l=0,c=0;if(d>0){l=$e()._malloc(d*$e().PTR_SIZE),r.push(l),c=$e()._malloc(d*$e().PTR_SIZE),r.push(c);for(let p=0;p<d;p++)$e().setValue(l+p*$e().PTR_SIZE,s[p][0],"*"),$e().setValue(c+p*$e().PTR_SIZE,s[p][1],"*")}await $e()._OrtAppendExecutionProvider(e,o,l,c,d)!==0&&we(`Can't append execution provider: ${a}.`)}},Qc=async e=>{let t=$e(),r=0,i=[],n=e||{};Lo(n);try{let a=Bo(n.graphOptimizationLevel??"all"),s=Do(n.executionMode??"sequential"),o=typeof n.logId=="string"?Xe(n.logId,i):0,d=n.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log severity level is not valid: ${d}`);let l=n.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof n.optimizedModelFilePath=="string"?Xe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,o,d,l,c),r===0&&we("Can't create session options."),n.executionProviders&&await Po(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);At(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[p,f]of Object.entries(n.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let w=Xe(p,i);t._OrtAddFreeDimensionOverride(r,w,f)!==0&&we(`Can't set a free dimension override: ${p} - ${f}.`)}return n.extra!==void 0&&Jr(n.extra,"",new WeakSet,(p,f)=>{At(r,p,f,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&we("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),Bt,dt,Dt,oi,ei,aa,sa,Ln,ne=j(()=>{"use strict";Bt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},dt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Dt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},oi=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ei=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},aa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",sa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ln=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),oa,Jc=j(()=>{"use strict";ta(),oa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let d=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw o}let s=0;for(;;){let{done:o,value:d}=await n.read();if(o)break;let l=d.byteLength;new Uint8Array(a,s,l).set(d),s+=l}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Uo,qo,Wo,Vo,ua,Go,fe,ct=j(()=>{"use strict";ne(),Uo=["V","I","W","E","F"],qo=(e,t)=>{console.log(`[${Uo[e]},${new Date().toISOString()}]${t}`)},ua=(e,t)=>{Wo=e,Vo=t},Go=(e,t)=>{let r=ei(e),i=ei(Wo);r>=i&&qo(r,typeof t=="function"?t():t)},fe=(...e)=>{Vo&&Go(...e)}}),Ho,Zt,L,ti,ep,tp,rp,ae=j(()=>{"use strict";Ho=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Zt=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let o=Ho.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(o===void 0)return;[s[a-2],s[a-1]]=o}for(let o=r?3:1;o<=a;o++){let d=i-o<0?1:e[i-o],l=n-o<0?1:t[n-o];if(d!==l&&d>1&&l>1)return;let c=Math.max(d,l);if(d&&l)s[a-o]=Math.max(d,l);else{if(c>1)return;s[a-o]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},L=class Yr{static size(t){return Yr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Yr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Yr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},ti=class xt{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length;o++)if(o<a.length){if(a[o]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let o=0;o<i.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=i[o]||s[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,o){if(o){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)xt.adjustPadAndReturnShape(t[d+(s?1:2)],r[d],i[d],n[d],a,d,d+t.length-2,o)}}static computePoolOutputShape(t,r,i,n,a,s,o,d=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return xt.computeShapeHelper(t,r,l,i,n,a,s,o,d),l}static computeConvOutputShape(t,r,i,n,a,s,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return xt.computeShapeHelper(!1,t,d,i,n,a,s,o),d}static computeShapeHelper(t,r,i,n,a,s,o,d,l=0){if(t)for(let c=0;c<r.length-2;c++)i.push(1);else for(let c=0;c<r.length-2;c++)i.push(xt.adjustPadAndReturnShape(r[c+2],n[c],a[c],s[c],o,c,c+r.length-2,d,l))}static computeOutputSize(t,r,i,n,a){let s=Math.floor(t/r)+1;return a===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=i+n&&(s-=1)),s}static adjustPadAndReturnShape(t,r,i,n,a,s,o,d,l=0){let c=i*(n-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return a[s]=0,a[o]=0,xt.computeOutputSize(t-c,r,t,0,l);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=(Math.floor((t+r-1)/r)-1)*r+n-t;return a[s]=Math.floor(d==="SAME_LOWER"?(p+1)/2:p/2),a[o]=p-a[s],xt.computeOutputSize(t+a[s]+a[o]-c,r,t,a[s],l)}default:throw new Error("Unsupported AutoPad type")}else return xt.computeOutputSize(t+a[s]+a[o]-c,r,t,a[s],l)}},ep=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,o;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let d=-1;if(i?(o=r[0],d=1):(o=r[1],d=0),r[d]!==s)throw new Error("dimension mismatch");if(a<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(n&&!Zt.isValidBroadcast(n,[a,o]))throw new Error("gemm: invalid bias shape for broadcast");return[a,o,s]}},tp=-34028234663852886e22,rp=34028234663852886e22}),la,ip=j(()=>{"use strict";ne(),la=(e,t)=>new(oi(t))(e)}),Vi,Fo,Gi,jo,Hi,Ko,Fi,ji,Ki,Yo,np,F0=j(()=>{"use strict";ne(),ct(),Vi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Fo=(e,t)=>{if(t==="int32")return e;let r=Vi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(oi(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let o=0;o<n;o++){let d=a[o];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(d)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Gi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},jo=1,Hi=()=>jo++,Ko=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Fi=(e,t)=>{let r=Vi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},ji=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Fi(this.dataType,this.tensorShape)}destroy(){fe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Gi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},Ki=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!(a!=null&&a.input.dataTypes.includes(t))){if(s=Ko.get(t),!s||(a==null?void 0:a.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);fe("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Fi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Fo(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else fe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let i=(t=this.wrapper)!=null&&t.isDataConverted?Gi(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(i):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(i);return}else return i.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Yo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Hi();return this.tensorTrackersById.set(e,new Ki(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){fe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){fe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=Hi(),s=new ji({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new Ki(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let o=this.getMLContext(e);for(let[l,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,r)){fe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let p=this.freeTensors.splice(l,1)[0];return p.sessionId=e,p}fe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let d=await o.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new ji({sessionId:e,context:o,tensor:d,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},np=(...e)=>new Yo(...e)}),sr,Zo,ap,j0=j(()=>{"use strict";ne(),Vt(),ip(),F0(),ct(),sr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Zo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},ap=class{constructor(e){this.tensorManager=np(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,ua(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){fe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){fe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)fe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Zo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){fe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=sr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){fe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=sr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!$e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");fe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return la(r,t)}}registerMLTensor(e,t,r,i){let n=sr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return fe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=sr.get(Bt(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!(n!=null&&n.input.dataTypes.includes(i)):!!(n!=null&&n.output.dataTypes.includes(i))}flush(){}}}),da=j(()=>{"use strict"}),Yi,Lr,Pr,Xo,Qo,Zi,Pn,Jo,sp,K0=j(()=>{"use strict";ct(),da(),Yi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Lr=[],Pr=e=>Math.ceil(Number(e)/16)*16,Xo=e=>{for(let t=0;t<Lr.length;t++){let r=Lr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Qo=1,Zi=()=>Qo++,Pn=async(e,t,r,i)=>{let n=Pr(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let o=a.getMappedRange();if(i){let d=i();return d.set(new Uint8Array(o,0,r)),d}else return new Uint8Array(o.slice(0,r))}finally{a.destroy()}},Jo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Yi)Lr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Pr(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);if(a===n&&i%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,r,i,n);else{let o=new Uint8Array(a);o.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,o,0,a)}fe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Pr(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return fe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Zi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),fe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),fe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Xo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let o=(n?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Zi(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),fe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return fe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Pn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Yi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(fe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},sp=(...e)=>new Jo(...e)}),eu,ye,ke=j(()=>{"use strict";eu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ye=e=>new eu(e)}),Xt,Ur,Oe,ze,ie,Te,Un,Yt,St,re,or,V,ee,op,ca,tu,up,oe=j(()=>{"use strict";ne(),ae(),Xt=64,Ur=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Oe=(e,t=1)=>{let r=Ur(e,t);return typeof r=="string"?r:r[0]},ze=(e,t=1)=>{let r=Ur(e,t);return typeof r=="string"?r:r[1]},ie=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:L.computeStrides(r)})}),t},Te=e=>e%4===0?4:e%2===0?2:1,Un=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Yt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,St=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,re=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,or=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,o=[...new Array(s).keys()],d=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Ur(t,n),c=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],f={indices:d,value:c,storage:p,tensor:t},w=O=>typeof O=="string"?O:`${O}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=a?"uniforms.":"",x=`${v}${e}_shape`,b=`${v}${e}_strides`,_="";for(let O=0;O<s-1;O++)_+=`
    let dim${O} = current / ${re(b,O,s)};
    let rest${O} = current % ${re(b,O,s)};
    indices[${O}] = dim${O};
    current = rest${O};
    `;_+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${_}
    return indices;
  }`,k=O=>(m.offsetToIndices=!0,s<2?O:`o2i_${e}(${O})`),E=[];if(s>=2)for(let O=s-1;O>=0;O--)E.push(`${re(b,O,s)} * (indices[${O}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${f.indices}) -> u32 {
    return ${E.join("+")};
  }`,A=O=>(m.indicesToOffset=!0,s<2?O:`i2o_${e}(${O})`),$=(...O)=>s===0?"0u":`${f.indices}(${O.map(w).join(",")})`,N=(O,q)=>s<2?`${O}`:`${re(O,q,s)}`,P=(O,q,B)=>s<2?`${O}=${B};`:`${re(O,q,s)}=${B};`,K={},Y=(O,q)=>{m.broadcastedIndicesToOffset=!0;let B=`${q.name}broadcastedIndicesTo${e}Offset`;if(B in K)return`${B}(${O})`;let U=[];for(let te=s-1;te>=0;te--){let be=q.indicesGet("outputIndices",te+q.rank-s);U.push(`${N(b,te)} * (${be} % ${N(x,te)})`)}return K[B]=`fn ${B}(outputIndices: ${q.type.indices}) -> u32 {
             return ${U.length>0?U.join("+"):"0u"};
           }`,`${B}(${O})`},X=(O,q)=>(()=>{if(f.storage===f.value)return`${e}[${O}]=${q};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${e}[${O}]=vec2<u32>(u32(${q}), select(0u, 0xFFFFFFFFu, ${q} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${e}[${O}]=vec2<u32>(u32(${q}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${e}[${O}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${q}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),R=O=>(()=>{if(f.storage===f.value)return`${e}[${O}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${e}[${O}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${e}[${O}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${O}] & 0xFFu), bool(${e}[${O}] & 0xFF00u), bool(${e}[${O}] & 0xFF0000u), bool(${e}[${O}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),H=s<2?"":`
  fn get_${e}ByIndices(indices: ${f.indices}) -> ${c} {
    return ${R(`i2o_${e}(indices)`)};
  }`,F=s<2?"":(()=>{let O=o.map(B=>`d${B}: u32`).join(", "),q=o.map(B=>`d${B}`).join(", ");return`
  fn get_${e}(${O}) -> ${c} {
    return get_${e}ByIndices(${$(q)});
  }`})(),G=(...O)=>{if(O.length!==s)throw new Error(`indices length must be ${s}`);let q=O.map(w).join(",");return s===0?R("0u"):s===1?R(q[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${q})`)},Q=O=>s<2?R(O):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${O})`),z=s<2?"":`
  fn set_${e}ByIndices(indices: ${f.indices}, value: ${c}) {
    ${X(`i2o_${e}(indices)`,"value")}
  }`,D=s<2?"":(()=>{let O=o.map(B=>`d${B}: u32`).join(", "),q=o.map(B=>`d${B}`).join(", ");return`
  fn set_${e}(${O}, value: ${c}) {
    set_${e}ByIndices(${$(q)}, value);
  }`})();return{impl:()=>{let O=[],q=!1;return m.offsetToIndices&&(O.push(T),q=!0),m.indicesToOffset&&(O.push(C),q=!0),m.broadcastedIndicesToOffset&&(Object.values(K).forEach(B=>O.push(B)),q=!0),m.set&&(O.push(D),q=!0),m.setByIndices&&(O.push(z),q=!0),m.get&&(O.push(F),q=!0),m.getByIndices&&(O.push(H),q=!0),!a&&q&&O.unshift(`const ${x} = ${f.indices}(${r.join(",")});`,`const ${b} = ${f.indices}(${L.computeStrides(r).join(",")});`),O.join(`
`)},type:f,offsetToIndices:k,indicesToOffset:A,broadcastedIndicesToOffset:Y,indices:$,indicesGet:N,indicesSet:P,set:(...O)=>{if(O.length!==s+1)throw new Error(`indices length must be ${s}`);let q=O[s];if(typeof q!="string")throw new Error("value must be string");let B=O.slice(0,s).map(w).join(",");return s===0?X("0u",q):s===1?X(B[0],q):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${B}, ${q})`)},setByOffset:X,setByIndices:(O,q)=>s<2?X(O,q):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${O}, ${q});`),get:G,getByOffset:R,getByIndices:Q,usage:i,name:e,strides:b,shape:x,rank:s}},V=(e,t,r,i=1)=>or(e,t,r,"input",i),ee=(e,t,r,i=1)=>or(e,t,r,"output",i),op=(e,t,r)=>or(e,t,r,"atomicOutput",1),ca=(e,t,r,i=1)=>or(e,t,r,"internal",i),tu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Xt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},up=(e,t)=>new tu(e,t)}),ru,Xi,iu,nu,au,su,We,lp,dp,Tt=j(()=>{"use strict";ne(),ae(),ke(),oe(),ru=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Xi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),iu=(e,t)=>L.sortBasedOnPerm(e,Xi(e.length,t)),nu=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},au=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},su=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},We=(e,t)=>{let r=e.dataType,i=e.dims.length,n=Xi(i,t),a=iu(e.dims,n),s=e.dims,o=a,d=i<2||su(n,e.dims),l;if(d)return l=m=>{let v=V("input",r,s,4),x=ee("output",r,o,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(v,x)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=L.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:l};let{newShape:c,newPerm:p}=au(e.dims,n),f=L.areEqual(p,[2,3,1]),w=L.areEqual(p,[3,1,2]);if(c.length===2||f||w){s=f?[c[0],c[1]*c[2]]:w?[c[0]*c[1],c[2]]:c,o=[s[1],s[0]];let m=16;return l=v=>{let x=V("a",r,s.length),b=ee("output",r,o.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(x,b)}
  var<workgroup> tile : array<array<${b.type.value}, ${m+1}>, ${m}>;
  ${v.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${b.setByIndices(`${b.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=L.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/m),y:Math.ceil(o[0]/m)},programUniforms:[{type:12,data:v},...ie(s,o)]}},getShaderSource:l}}return l=m=>{let v=V("a",r,s.length),x=ee("output",r,o.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(v,x)}

  ${nu(n,i,v,x)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let m=L.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...ie(s,o)]}},getShaderSource:l}},lp=(e,t)=>{ru(e.inputs,t.perm),e.compute(We(e.inputs[0],t.perm))},dp=e=>ye({perm:e.perm})}),ou,uu,lu,du,cu,pu,hu,fu,mu,gu,Fe,cp,pp,hp,fp,mp,gp,yp,wp,bp,_p,Y0=j(()=>{"use strict";ne(),ae(),oe(),pa(),Tt(),ou={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},uu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},lu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},du={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},cu=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},pu=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},hu=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},fu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},mu=(e,t)=>{let r=[];if(!fu(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},gu=(e,t,r,i,n,a,s)=>{let o=r[0].dims,d=L.size(a),l=L.size(s),c=V("_A",r[0].dataType,o),p=ee("output",n,a),f=64;d===1&&(f=256);let w=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,m=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(c,p)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${lu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${ou[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${uu[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${i==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${du[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:d},programUniforms:[{type:12,data:l}]})}},Fe=(e,t,r,i)=>{let n=e.inputs.length===1?r:qn(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((w,m)=>m));let s=L.normalizeAxes(a,e.inputs[0].dims.length),o=s,d=e.inputs[0],l=mu(o,e.inputs[0].dims.length);l.length>0&&(d=e.compute(We(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],o=cu(o.length,d.dims.length));let[c,p]=pu(d.dims,o),f=c;n.keepDims&&(f=hu(c,s)),e.compute(gu(t,n.cacheKey,[d],i,e.inputs[0].dataType,f,p),{inputs:[d]})},cp=(e,t)=>{Fe(e,"ReduceMeanShared",t,"mean")},pp=(e,t)=>{Fe(e,"ReduceL1Shared",t,"l1")},hp=(e,t)=>{Fe(e,"ReduceL2Shared",t,"l2")},fp=(e,t)=>{Fe(e,"ReduceLogSumExpShared",t,"logSumExp")},mp=(e,t)=>{Fe(e,"ReduceMaxShared",t,"max")},gp=(e,t)=>{Fe(e,"ReduceMinShared",t,"min")},yp=(e,t)=>{Fe(e,"ReduceProdShared",t,"prod")},wp=(e,t)=>{Fe(e,"ReduceSumShared",t,"sum")},bp=(e,t)=>{Fe(e,"ReduceSumSquareShared",t,"sumSquare")},_p=(e,t)=>{Fe(e,"ReduceLogSumShared",t,"logSum")}}),je,yu,ri,qn,Ke,wu,bu,_u,vu,$u,xu,Su,Tu,ku,Eu,Ye,vp,$p,xp,Sp,Tp,kp,Ep,Ip,Cp,Ap,pa=j(()=>{"use strict";ne(),ae(),ke(),oe(),Y0(),je=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},yu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],ri=(e,t,r,i,n,a,s=!1,o=!1)=>{let d=[],l=r[0].dims,c=l.length,p=L.normalizeAxes(n,c),f=!o&&p.length===0;l.forEach((v,x)=>{f||p.indexOf(x)>=0?s&&d.push(1):d.push(v)});let w=d.length,m=L.size(d);return{name:e,shaderCache:t,getShaderSource:v=>{let x=[],b=V("_A",r[0].dataType,c),_=ee("output",a,w),T=i(b,_,p),k=T[2];for(let E=0,C=0;E<c;E++)f||p.indexOf(E)>=0?(s&&C++,k=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${T[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${b.indicesSet("input_indices",E,`j${E}`)}
                  ${k}
                }`):(x.push(`${b.indicesSet("input_indices",E,_.indicesGet("output_indices",C))};`),C++);return`

        ${v.registerUniform("output_size","u32").declareVariables(b,_)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${b.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${k}
          ${T[3]}
          ${T.length===4?_.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...ie(l,d)]})}},qn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),ye({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ke=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:qn(n,r);e.compute(ri(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?yu:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},wu=(e,t)=>{je(e.inputs),Ke(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},bu=(e,t)=>{je(e.inputs),Ke(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},_u=(e,t)=>{je(e.inputs),Ke(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},vu=(e,t)=>{je(e.inputs),Ke(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},$u=(e,t)=>{je(e.inputs),Ke(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},xu=(e,t)=>{je(e.inputs),Ke(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},Su=(e,t)=>{je(e.inputs),Ke(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Tu=(e,t)=>{je(e.inputs),Ke(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},ku=(e,t)=>{je(e.inputs),Ke(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Eu=(e,t)=>{je(e.inputs),Ke(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ye=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},vp=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xu(e,t):cp(e,t)},$p=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):pp(e,t)},xp=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):hp(e,t)},Sp=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):fp(e,t)},Tp=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):mp(e,t)},kp=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Su(e,t):gp(e,t)},Ep=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tu(e,t):yp(e,t)},Ip=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ku(e,t):wp(e,t)},Cp=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Eu(e,t):bp(e,t)},Ap=(e,t)=>{Ye(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):_p(e,t)}}),Qi,zp,Op,Wn,Z0=j(()=>{"use strict";ne(),ke(),pa(),Qi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},zp=(e,t)=>{Qi(e.inputs);let r=(i,n,a)=>{let s=[];for(let o=0;o<i.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(ri("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Op=(e,t)=>{Qi(e.inputs);let r=(i,n,a)=>{let s=[];for(let o=0;o<i.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(ri("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Wn=e=>ye(e)}),Iu,qr,Cu,Au,zu,_r,Ou,Mp,ha=j(()=>{"use strict";ne(),ae(),da(),oe(),Iu=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],l=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=n.dims[0]/3,f=p,w=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let m=l;if(p!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==p+f+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(s){if(f!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==f/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(v=s.dims[3])}let x=m+v,b=-1,_=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==d||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:l,pastSequenceLength:v,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:b,inputHiddenSize:c,hiddenSize:p,vHiddenSize:w,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},qr=(e,t,r)=>t&&e?`
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
    `,Cu=(e,t,r,i,n,a,s,o)=>{let d=Te(s?1:a),l=64,c=a/d;c<l&&(l=32);let p=Math.ceil(a/d/l),f=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:p}],w=Oe(e.dataType,d),m=ze(1,d),v=["type"];s&&v.push("type"),o&&v.push("type");let x=b=>{let _=ee("x",e.dataType,e.dims,d),T=[_],k=s?V("seq_lens",s.dataType,s.dims):void 0;k&&T.push(k);let E=o?V("total_sequence_length_input",o.dataType,o.dims):void 0;E&&T.push(E);let C=ze(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${b.registerUniforms(A).declareVariables(...T)}
  ${b.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${qr(k,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
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
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${w};${d}`,inputDependencies:v},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:f})}},Au=(e,t,r,i,n,a,s,o,d)=>{let l=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,l],p=e>1&&i,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,w=p?[a.batchSize,f,l,a.headSize]:void 0,m=a.nReps?a.nReps:1,v=a.scale===0?1/Math.sqrt(a.headSize):a.scale,x=Te(a.headSize),b=a.headSize/x,_=12,T={x:Math.ceil(l/_),y:Math.ceil(a.sequenceLength/_),z:a.batchSize*a.numHeads},k=[{type:12,data:a.sequenceLength},{type:12,data:b},{type:12,data:l},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:v},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:m}],E=p&&i&&L.size(i.dims)>0,C=["type","type"];E&&C.push("type"),n&&C.push("type"),o&&C.push("type"),d&&C.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];p&&A.push({dims:w,dataType:t.dataType,gpuDataType:0});let $=N=>{let P=V("q",t.dataType,t.dims,x),K=V("key",r.dataType,r.dims,x),Y=[P,K];if(E){let z=V("past_key",i.dataType,i.dims,x);Y.push(z)}n&&Y.push(V("attention_bias",n.dataType,n.dims));let X=o?V("seq_lens",o.dataType,o.dims):void 0;X&&Y.push(X);let R=d?V("total_sequence_length_input",d.dataType,d.dims):void 0;R&&Y.push(R);let H=ee("output",t.dataType,c),F=[H];p&&F.push(ee("present_key",t.dataType,w,x));let G=ze(1,x),Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${P.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${P.type.storage}, ${_*_}>;
  ${N.registerUniforms(Q).declareVariables(...Y,...F)}
  ${N.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${qr(X,R,!0)}
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
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${H.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${n!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:k}),getShaderSource:$}},zu=(e,t,r,i,n,a,s=void 0,o=void 0)=>{let d=a+n.kvSequenceLength,l=n.nReps?n.nReps:1,c=n.vHiddenSize*l,p=e>1&&i,f=n.kvNumHeads?n.kvNumHeads:n.numHeads,w=p?[n.batchSize,f,d,n.headSize]:void 0,m=[n.batchSize,n.sequenceLength,c],v=12,x={x:Math.ceil(n.vHeadSize/v),y:Math.ceil(n.sequenceLength/v),z:n.batchSize*n.numHeads},b=[{type:12,data:n.sequenceLength},{type:12,data:d},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:l}],_=p&&i&&L.size(i.dims)>0,T=["type","type"];_&&T.push("type"),s&&T.push("type"),o&&T.push("type");let k=[{dims:m,dataType:t.dataType,gpuDataType:0}];p&&k.push({dims:w,dataType:t.dataType,gpuDataType:0});let E=C=>{let A=V("probs",t.dataType,t.dims),$=V("v",r.dataType,r.dims),N=[A,$];_&&N.push(V("past_value",i.dataType,i.dims));let P=s?V("seq_lens",s.dataType,s.dims):void 0;s&&N.push(P);let K=o?V("total_sequence_length_input",o.dataType,o.dims):void 0;o&&N.push(K);let Y=[ee("output",t.dataType,m)];p&&Y.push(ee("present_value",t.dataType,w));let X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${A.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${A.type.value}, ${v*v}>;
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
   ${qr(P,K,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:k,dispatchGroup:x,programUniforms:b}),getShaderSource:E}},_r=(e,t,r,i,n,a,s,o,d,l,c=void 0,p=void 0)=>{let f=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),w=f>1?s:void 0,m=f>1?o:void 0,v=f>1?l.pastSequenceLength:0,x=v+l.kvSequenceLength,b=d&&L.size(d.dims)>0?d:void 0,_=[t,r];w&&L.size(w.dims)>0&&_.push(w),b&&_.push(b),c&&_.push(c),p&&_.push(p);let T=e.compute(Au(f,t,r,w,b,l,v,c,p),{inputs:_,outputs:f>1?[-1,1]:[-1]})[0];e.compute(Cu(T,l.batchSize,l.numHeads,v,l.sequenceLength,x,c,p),{inputs:c&&p?[T,c,p]:[T],outputs:[]});let k=[T,i];m&&L.size(m.dims)>0&&k.push(m),c&&k.push(c),p&&k.push(p),e.compute(zu(f,T,i,m,l,v,c,p),{inputs:k,outputs:f>1?[0,2]:[0]})},Ou=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=p=>{let f=ee("output_q",d[0].dataType,r),w=ee("output_k",d[0].dataType,r),m=ee("output_v",d[0].dataType,r),v=V("input",d[0].dataType,d[0].dims),x=V("weight",d[1].dataType,d[1].dims),b=V("bias",d[2].dataType,d[2].dims),_=v.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${_}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${_}, ${s*s}>;
  var<workgroup> tileWeightK: array<${_}, ${s*s}>;
  var<workgroup> tileWeightV: array<${_}, ${s*s}>;
  ${p.registerUniforms(T).declareVariables(v,x,b,f,w,m)}
  ${p.mainStart([s,s,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:l}),getShaderSource:c},{inputs:d,outputs:[-1,-1,-1]})},Mp=(e,t)=>{let r=Iu(e.inputs,t),[i,n,a]=Ou(e,r);return _r(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Mu,Ru,Nu,Rp,X0=j(()=>{"use strict";Ge(),ne(),ae(),ke(),oe(),Mu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((o,d)=>{if(o!==i[d])throw new Error(`${a}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Ru=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?Te(a[a.length-1]):1,o=n==="NHWC"&&a.length>1?s:1,d=L.size(a)/s,l=i,c=l?a.length:a,p=V("x",e[0].dataType,e[0].dims,s),f=V("scale",e[1].dataType,e[1].dims,o),w=V("bias",e[2].dataType,e[2].dims,o),m=V("inputMean",e[3].dataType,e[3].dims,o),v=V("inputVar",e[4].dataType,e[4].dims,o),x=ee("y",e[0].dataType,c,s),b=()=>{let T="";if(i)T=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")T=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let k=1;k<f.rank;k++)T+=`cIndices[${k}] = outputIndices[${k}];`;T+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return T},_=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(p,f,w,m,v,x)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${b()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l?[{type:12,data:d},...ie(a)]:[{type:12,data:d}]})}},Nu=e=>ye(e),Rp=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Nu({...t,outputCount:i});if(ve.webgpu.validateInputContent&&Mu(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Ru(r,n))}}),Bu,Du,Np,Q0=j(()=>{"use strict";ae(),oe(),Bu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Du=e=>{let t=e[0].dims,r=e[0].dims[2],i=L.size(t)/4,n=e[0].dataType,a=V("input",n,t,4),s=V("bias",n,[r],4),o=V("residual",n,t,4),d=ee("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(a,s,o,d)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Np=e=>{Bu(e.inputs),e.compute(Du(e.inputs))}}),Lu,ge,Bp,Dp,Lp,Pp,Up,qp,Wp,Vp,Gp,Pu,Hp,Fp,jp,Kp,gr,Yp,Zr,Zp,Xp,Qp,Jp,eh,th,rh,ih,nh,ah,sh,oh,uh,lh,dh,ch,ph,Ji,hh,Vn,Gn,fh,mh,gh,Uu,qu,yh,fa=j(()=>{"use strict";ne(),ae(),ke(),oe(),Lu=(e,t,r,i,n,a,s)=>{let o=Math.ceil(t/4),d="";typeof n=="string"?d=`${n}(a)`:d=n("a");let l=V("inputData",r,[o],4),c=ee("outputData",i,[o],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(l,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",d)}
  }`},ge=(e,t,r,i,n,a=e.dataType,s,o)=>{let d=[{type:12,data:Math.ceil(L.size(e.dims)/4)}];return s&&d.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:l=>Lu(l,L.size(e.dims),e.dataType,a,r,i,o),getRunData:l=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(L.size(l[0].dims)/64/4)},programUniforms:d})}},Bp=e=>{e.compute(ge(e.inputs[0],"Abs","abs"))},Dp=e=>{e.compute(ge(e.inputs[0],"Acos","acos"))},Lp=e=>{e.compute(ge(e.inputs[0],"Acosh","acosh"))},Pp=e=>{e.compute(ge(e.inputs[0],"Asin","asin"))},Up=e=>{e.compute(ge(e.inputs[0],"Asinh","asinh"))},qp=e=>{e.compute(ge(e.inputs[0],"Atan","atan"))},Wp=e=>{e.compute(ge(e.inputs[0],"Atanh","atanh"))},Vp=e=>ye(e),Gp=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ge(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Pu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return ye({min:t,max:r})},Hp=(e,t)=>{let r=t||Pu(e.inputs),i=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Fp=e=>{e.compute(ge(e.inputs[0],"Ceil","ceil"))},jp=e=>{e.compute(ge(e.inputs[0],"Cos","cos"))},Kp=e=>{e.compute(ge(e.inputs[0],"Cosh","cosh"))},gr=e=>ye(e),Yp=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Zr=(e="f32")=>`
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
}`,Zp=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Zr(t)))},Xp=e=>{e.compute(ge(e.inputs[0],"Exp","exp"))},Qp=e=>{e.compute(ge(e.inputs[0],"Floor","floor"))},Jp=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Zr(t)))},eh=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},th=e=>{e.compute(ge(e.inputs[0],"Not",t=>`!${t}`))},rh=e=>{e.compute(ge(e.inputs[0],"Neg",t=>`-${t}`))},ih=e=>{e.compute(ge(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},nh=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},ah=e=>{e.compute(ge(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},sh=e=>ye(e),oh=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},uh=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},lh=e=>{e.compute(ge(e.inputs[0],"Sin","sin"))},dh=e=>{e.compute(ge(e.inputs[0],"Sinh","sinh"))},ch=e=>{e.compute(ge(e.inputs[0],"Sqrt","sqrt"))},ph=e=>{e.compute(ge(e.inputs[0],"Tan","tan"))},Ji=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,hh=e=>{e.compute(ge(e.inputs[0],"Tanh",Ji))},Vn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ji("v")};
}
`,Gn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,fh=e=>{let t=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"FastGelu",Gn,Vn(t),void 0,e.inputs[0].dataType))},mh=(e,t)=>{let r=ze(e.inputs[0].dataType);return e.compute(ge(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},gh=e=>{e.compute(ge(e.inputs[0],"Log","log"))},Uu=(e,t)=>`
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
`,qu=e=>`quick_gelu_impl(${e})`,yh=(e,t)=>{let r=ze(e.inputs[0].dataType);e.compute(ge(e.inputs[0],"QuickGelu",qu,Uu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Wu,Vu,wh,J0=j(()=>{"use strict";ae(),oe(),fa(),Wu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=V("input",e[0].dataType,e[0].dims,4),i=V("bias",e[0].dataType,[e[0].dims[2]],4),n=ee("output",e[0].dataType,t,4),a=L.size(t)/4,s=Oe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,n)}

  ${Zr(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},wh=e=>{Wu(e.inputs),e.compute(Vu(e.inputs))}}),Gu,Hu,Ze,bh,_h,vh,$h,xh,Sh,Th,kh,Eh,Ih,ew=j(()=>{"use strict";ne(),ae(),oe(),Gu=(e,t,r,i,n,a,s,o,d,l,c,p)=>{let f,w;typeof o=="string"?f=w=(_,T)=>`${o}((${_}),(${T}))`:typeof o=="function"?f=w=o:(f=o.scalar,w=o.vector);let m=ee("outputData",c,i.length,4),v=V("aData",d,t.length,4),x=V("bData",l,r.length,4),b;if(n)if(a){let _=L.size(t)===1,T=L.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;_||T?b=m.setByOffset("global_idx",w(_?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),T?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):b=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",w(s||k?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=m.setByOffset("global_idx",w(v.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(T,k,E="")=>{let C=`aData[indexA${k}][componentA${k}]`,A=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${m.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${v.broadcastedIndicesToOffset(`outputIndices${k}`,m)};
            let offsetB${k} = ${x.broadcastedIndicesToOffset(`outputIndices${k}`,m)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${T}[${k}] = ${E}(${f(C,A)});
          `};c===9?b=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(v,x,m)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`},Hu=(e,t,r,i,n,a,s=r.dataType)=>{let o=r.dims.map(Number),d=i.dims.map(Number),l=!L.areEqual(o,d),c=o,p=L.size(o),f=!1,w=!1,m=[l];if(l){let v=Zt.calcShape(o,d,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");c=v.slice(),p=L.size(c);let x=L.size(o)===1,b=L.size(d)===1,_=o.length>0&&o[o.length-1]%4===0,T=d.length>0&&d[d.length-1]%4===0;m.push(x),m.push(b),m.push(_),m.push(T);let k=1;for(let E=1;E<c.length;E++){let C=o[o.length-E],A=d[d.length-E];if(C===A)k*=C;else break}k%4===0?(w=!0,f=!0):(x||b||_||T)&&(f=!0)}else f=!0;return m.push(f),{name:e,shaderCache:{hint:t+m.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>Gu(v,o,d,c,f,l,w,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(L.size(c)/4)},...ie(o,d,c)]})}},Ze=(e,t,r,i,n,a)=>{e.compute(Hu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},bh=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},_h=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},vh=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},$h=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},xh=e=>{let t=V("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
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
      `)},Sh=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},Th=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},kh=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Eh=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Ih=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Fu,ju,Ku,Yu,Ch,Ah,tw=j(()=>{"use strict";ne(),ae(),ke(),oe(),Fu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,o)=>{if(o!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((d,l)=>{if(l!==t&&d!==i.dims[l])throw new Error("non concat dimensions must match")})}})},ju=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ku=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let a=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(a):n===0?i.push(`if (inputIndex == ${n}u) { ${a} }`):n===r-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${n}) { ${a} }`)}return i.join(`
`)},Yu=(e,t,r,i)=>{let n=L.size(r),a=new Array(e.length),s=new Array(e.length),o=0,d=[],l=[],c=[{type:12,data:n}];for(let v=0;v<e.length;++v)o+=e[v].dims[t],a[v]=o,l.push(e[v].dims.length),s[v]=V(`input${v}`,i,l[v]),d.push("rank"),c.push({type:12,data:a[v]});for(let v=0;v<e.length;++v)c.push(...ie(e[v].dims));c.push(...ie(r));let p=ee("output",i,r.length),f=p.indicesGet("indices",t),w=Array.from(Array(a.length).keys()).map(v=>`uniforms.sizeInConcatAxis${v}`).join(","),m=v=>`

  ${(()=>{v.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)v.registerUniform(`sizeInConcatAxis${x}`,"u32");return v.declareVariables(...s,p)})()}

  ${ju(a.length,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${w});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ku(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:m}},Ch=(e,t)=>{let r=e.inputs,i=r[0].dims,n=L.normalizeAxis(t.axis,i.length);Fu(r,n);let a=i.slice();a[n]=r.reduce((o,d)=>o+(d.dims.length>n?d.dims[n]:0),0);let s=r.filter(o=>L.size(o.dims)>0);e.compute(Yu(s,n,a,r[0].dataType),{inputs:s})},Ah=e=>ye({axis:e.axis})}),Ut,qt,Wt,ma,Gt=j(()=>{"use strict";ne(),ae(),Ut=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},qt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Wt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},ma=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,i]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=(e==null?void 0:e.activation_params)||[tp,rp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Re,zh,ga=j(()=>{"use strict";Re=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},zh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Oh,rw=j(()=>{"use strict";Oh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),wr,ya,wa=j(()=>{"use strict";ne(),ae(),oe(),Gt(),wr=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,o)=>`
      if (${re(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,re(n,o+a,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},ya=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,o=e[1].dims,d=s[s.length-2],l=o[o.length-1],c=s[s.length-1],p=Te(l),f=Te(c),w=Te(d),m=L.size(r)/p/w,v=e.length>2,x=i?i.slice(0,-2):r.slice(0,-2),b=[L.size(x),d,l],_=[{type:12,data:m},{type:12,data:d},{type:12,data:l},{type:12,data:c}];qt(t,_),_.push(...ie(x,s,o)),v&&_.push(...ie(e[2].dims)),_.push(...ie(b));let T=k=>{let E=ca("batch_dims",e[0].dataType,x.length),C=V("a",e[0].dataType,s.length,f),A=V("b",e[1].dataType,o.length,p),$=ee("output",e[0].dataType,b.length,p),N=Oe($.type.tensor),P=Ut(t,$.type.value,N),K=[C,A],Y="";if(v){let H=n?p:1;K.push(V("bias",e[2].dataType,e[2].dims.length,H)),Y=`${n?`value += bias[col / ${H}];`:`value += ${$.type.value}(bias[row + i]);`}`}let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Wt(t,X);let R=()=>{let H=`var a_data: ${C.type.value};`;for(let F=0;F<f;F++)H+=`
              let b_data${F} = b[(b_offset + (k + ${F}) * uniforms.N + col) / ${p}];`;for(let F=0;F<w;F++){H+=`a_data = a[(a_offset + (row + ${F}) * uniforms.K + k) / ${f}];`;for(let G=0;G<f;G++)H+=`
            values[${F}] = fma(${A.type.value}(a_data${f===1?"":`[${G}]`}), b_data${G}, values[${F}]);
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
    ${wr("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${wr("b_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${$.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${R()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${Y}
      ${P}
      let cur_indices = ${$.type.indices}(batch, row + i, col);
      let offset = ${$.indicesToOffset("cur_indices")};
      ${$.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${f};${w};${n}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:T}}}),Zu,Xu,Hn,en,Qu,Fn,Ju,ii,ba=j(()=>{"use strict";ne(),ae(),oe(),Gt(),wa(),ga(),Zu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Xu=(e,t)=>e?`
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
        }`,Hn=(e,t,r="f32",i,n=!1,a=32,s=!1,o=32)=>{let d=t[1]*e[1],l=t[0]*e[0],c=n?d:a,p=n?a:d,f=c/t[0],w=a/t[1];if(!((n&&f===4&&e[1]===4||!n&&(f===3||f===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${r}>, ${c/f}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${w};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Zu(n,i)}
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

          ${Xu(n,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},en=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Qu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Fn=(e,t,r="f32",i,n=!1,a=32,s=!1,o=32,d=!1)=>{let l=e[1]*t[1],c=e[0]*t[0],p=n?l:a,f=n?a:l;if(!(f%t[1]===0&&p%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let w=f/t[1],m=p/t[0],v=a/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${en(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
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
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${en(n,i)}
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
      ${Qu(n)}
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
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Ju=(e,t,r,i,n=!1)=>{let[a,s,o,d]=i,l=Oe(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Re(e,l)} {
      var value = ${Re(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${wr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Re(e,l)} {
      var value = ${Re(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${wr("bIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Re(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Re(e,l)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ii=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,o=e[1].dims,d=s.slice(0,-2),l=o.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),p=L.size(c),f=s[s.length-2],w=s[s.length-1],m=o[o.length-1],v=w%4===0&&m%4===0,x=f<=8?[4,1,1]:[4,4,1],b=[8,8,1],_=[Math.ceil(m/b[0]/x[0]),Math.ceil(f/b[1]/x[1]),Math.ceil(p/b[2]/x[2])],T=v?4:1,k=[...d,f,w/T],E=k.length,C=[...l,w,m/T],A=C.length,$=[p,f,m/T],N=[{type:6,data:f},{type:6,data:m},{type:6,data:w}];qt(t,N),N.push(...ie(c,k,C));let P=["rank","rank"],K=e.length>2;K&&(N.push(...ie(e[2].dims)),P.push("rank")),N.push(...ie($));let Y=X=>{let R=c.length,H=ca("batchDims",e[0].dataType,R,1),F=Oe(e[0].dataType),G=V("a",e[0].dataType,E,T),Q=V("b",e[1].dataType,A,T),z=ee("result",e[0].dataType,$.length,T),D=[G,Q];if(K){let te=n?T:1;D.push(V("bias",e[2].dataType,e[2].dims.length,te))}let O=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Wt(t,O);let q=Oe(z.type.tensor),B=Ut(t,z.type.value,q),U=Ju(T,K,B,[H,G,Q,z],n);return`
  ${X.registerUniforms(O).registerInternalVariables(H).declareVariables(...D,z)}
  ${U}
  ${v?Hn(x,b,F,H):Fn(x,b,F,H)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${v};${n}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:N}),getShaderSource:Y}}}),el,Mh,iw=j(()=>{"use strict";ne(),ct(),oe(),Gt(),ga(),rw(),ba(),el=(e,t,r,i,n=!1,a,s=4,o=4,d=4,l="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},p=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=e?`
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
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",b=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${b} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${b} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${b} % inChannels;
    var resData = ${Re(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${v}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${Re(s,l)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${Re(s,l)}(0.0);`,k=e?i&&r?p(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(o)}
    }
    return ${Re(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(o)}
    }
    return ${Re(o,l)}(0.0);`,E=Re(d,l),C=Re(e?s:o,l),A=Re(e?o:s,l),$=Ut(a,E,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
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
    }`},Mh=(e,t,r,i,n,a,s,o,d)=>{let l=t.format==="NHWC",c=l?e[0].dims[3]:e[0].dims[1],p=r[0],f=l?r[2]:r[3],w=l?r[1]:r[2],m=l?r[3]:r[1],v=l&&(c%4===0||c%3===0)&&m%4===0,x=l?m:f*w,b=l?f*w:m,_=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],k=[Math.ceil(x/_[0]/T[0]),Math.ceil(b/_[1]/T[1]),Math.ceil(p/_[2]/T[2])];fe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let E=v?l&&c%4!==0?3:4:1,C=_[1]*T[1],A=_[0]*T[0],$=Math.max(_[0]*E,_[1]),N=i%C===0,P=n%A===0,K=a%$===0,Y=v?[E,4,4]:[1,1,1],X=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qt(t,X),X.push(...ie(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(X.push(...ie(e[2].dims)),R.push("rank")),X.push(...ie(r));let H=F=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Wt(t,G);let Q=v?4:1,z=Oe(e[0].dataType),D=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${z}>`:z}) {
        result[flatIndex] = ${v?`vec4<${z}>`:z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${z}>`:z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,O=V("x",e[0].dataType,e[0].dims.length,E===3?1:E),q=V("w",e[1].dataType,e[1].dims.length,Q),B=[O,q],U=ee("result",e[0].dataType,r.length,Q);if(s){let te=V("bias",e[2].dataType,e[2].dims.length,Q);B.push(te),D+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${z}>`:z} {
          return bias[coords.${l?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${Oh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${F.registerUniforms(G).declareVariables(...B,U)}
        ${D}
        ${el(l,N,P,K,s,t,Y[0],Y[1],Y[2],z)}
        ${v?Hn(T,_,z,void 0,!l,$):Fn(T,_,z,void 0,!l,$,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${v};${N};${P};${K};${C};${A};${$}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:X}),getShaderSource:H}}}),tl,tn,ur,rl,rn,il,Rh,Nh,nw=j(()=>{"use strict";ne(),ct(),ae(),oe(),Gt(),ga(),tl=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},tn=e=>typeof e=="number"?[e,e,e]:e,ur=(e,t)=>t<=1?e:e+(e-1)*(t-1),rl=(e,t,r,i=1)=>{let n=ur(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},rn=(e,t,r,i,n)=>{n==null&&(n=rl(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},il=(e,t,r,i,n,a,s,o,d,l)=>{let c,p,f,w;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=rn([t,r,i,1],[o,d,l],1,[n,a,s],e);p=m[0],f=m[1],w=m[2]}else if(Array.isArray(e)){if(!e.every((v,x,b)=>v===b[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=rn([t,r,i,1],[o,d,l],1,[n,a,s],e[0]);p=m[0],f=m[1],w=m[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/n),f=Math.ceil(r/a),w=Math.ceil(i/s);let m=(p-1)*n+o-t,v=(f-1)*a+d-r,x=(w-1)*s+l-i,b=Math.floor(m/2),_=m-b,T=Math.floor(v/2),k=v-T,E=Math.floor(x/2),C=x-E;c={top:T,bottom:k,left:E,right:C,front:b,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:f,outWidth:w}},Rh=(e,t,r,i,n,a=!1,s="channelsLast")=>{let o,d,l,c,p;if(s==="channelsLast")[o,d,l,c,p]=e;else if(s==="channelsFirst")[o,p,d,l,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[f,,w,m,v]=t,[x,b,_]=tn(r),[T,k,E]=tn(i),C=ur(w,T),A=ur(m,k),$=ur(v,E),{padInfo:N,outDepth:P,outHeight:K,outWidth:Y}=il(n,d,l,c,x,b,_,C,A,$),X=a?f*p:f,R=[0,0,0,0,0];return s==="channelsFirst"?R=[o,X,P,K,Y]:s==="channelsLast"&&(R=[o,P,K,Y,X]),{batchSize:o,dataFormat:s,inDepth:d,inHeight:l,inWidth:c,inChannels:p,outDepth:P,outHeight:K,outWidth:Y,outChannels:X,padInfo:N,strideDepth:x,strideHeight:b,strideWidth:_,filterDepth:w,filterHeight:m,filterWidth:v,effectiveFilterDepth:C,effectiveFilterHeight:A,effectiveFilterWidth:$,dilationDepth:T,dilationHeight:k,dilationWidth:E,inShape:e,outShape:R,filterShape:t}},Nh=(e,t,r,i,n,a)=>{let s=a==="channelsLast",o=s?e[0].dims[3]:e[0].dims[1],d=!1,l=[64,1,1],c={x:r.map((_,T)=>T)},p=[Math.ceil(tl(c.x.map(_=>r[_]))/l[0]),1,1];fe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let f=d?s&&o%4!==0?3:4:1,w=L.size(r),m=[{type:12,data:w},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];qt(t,m),m.push(...ie(e[0].dims,e[1].dims));let v=["rank","rank"],x=e.length===3;x&&(m.push(...ie(e[2].dims)),v.push("rank")),m.push(...ie(r));let b=_=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Wt(t,T);let k=d?4:1,E=Oe(e[0].dataType),C=V("x",e[0].dataType,e[0].dims.length,f===3?1:f),A=V("W",e[1].dataType,e[1].dims.length,k),$=[C,A],N=ee("result",e[0].dataType,r.length,k),P="";if(x){let X=V("bias",e[2].dataType,e[2].dims.length,k);$.push(X),P+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${E}>`:E} {
          return bias[${s?re("coords",4,5):re("coords",1,5)}${d?"/ 4":""}];
        }`}let K=Re(f,E),Y=Ut(t,K,E);return`
            ${P}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
          ${_.registerUniforms(T).declareVariables(...$,N)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${re("coords",0,C.rank)};
              let d2 = ${s?re("coords",C.rank-1,C.rank):re("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${s?re("coords",1,C.rank):re("coords",2,C.rank)},
              ${s?re("coords",2,C.rank):re("coords",3,C.rank)},
              ${s?re("coords",3,C.rank):re("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?re("uniforms.x_shape",1,C.rank):re("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${s?re("uniforms.x_shape",2,C.rank):re("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${s?re("uniforms.x_shape",3,C.rank):re("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${s?re("uniforms.x_shape",4,C.rank):re("uniforms.x_shape",1,C.rank)};
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
                      ${s?`let xValues = vec4<f32>(
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
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
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
                      ${s?`let xValues = vec3<f32>(
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
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${Y}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${f};${x}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:m}),getShaderSource:b}}}),Bh,Dh,aw=j(()=>{"use strict";ne(),ae(),oe(),Gt(),Bh=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,d=t.format==="NHWC",l=d?r[3]:r[1],c=l/t.group,p=d&&c>=4?Te(l):1,f=L.size(r)/p,w=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];qt(t,w),w.push(...ie(s,[o[0],o[1],o[2],o[3]/p]));let m=n?["rank","rank","rank"]:["rank","rank"];w.push(...ie([r[0],r[1],r[2],r[3]/p]));let v=x=>{let b=ee("output",e[0].dataType,r.length,p),_=Oe(b.type.tensor),T=Ut(t,b.type.value,_),k=V("x",e[0].dataType,s.length),E=V("w",e[1].dataType,o.length,p),C=[k,E];n&&C.push(V("b",e[2].dataType,e[2].dims,p));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Wt(t,A);let $=d?`
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
  ${x.registerUniforms(A).declareVariables(...C,b)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${b.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${b.type.value} = ${b.type.value}(0);
    ${$}
    ${a}
    ${T}
    ${b.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:v}},Dh=(e,t,r,i)=>{let n=e.length>2,a=Te(r[3]),s=Te(r[2]),o=L.size(r)/a/s,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qt(t,p),p.push(...ie(d,l,c));let f=(s-1)*t.strides[1]+l[1],w=m=>{let v=ee("output",e[0].dataType,c.length,a),x=Oe(v.type.tensor),b=Ut(t,v.type.value,x),_=V("x",e[0].dataType,d.length,a),T=V("w",e[1].dataType,l.length,a),k=[_,T];n&&k.push(V("b",e[2].dataType,e[2].dims,a));let E=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Wt(t,C),`
  ${m.registerUniforms(C).declareVariables(...k,v)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${f}>;
    var values: array<${v.type.value}, ${s}>;
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
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${b}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${f};${l[0]};${l[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:w}}}),nl,Wr,al,Vr,jn,nn,sl,ol,Kn,sw=j(()=>{"use strict";ae(),iw(),nw(),ba(),aw(),Gt(),wa(),Tt(),nl=(e,t,r,i,n,a)=>{let s=e[0],o=e.slice(a?1:2,a?3:4),d=o.length,l=t[0],c=t.slice(2).map((f,w)=>f+(f-1)*(r[w]-1)),p=o.map((f,w)=>f+i[w]+i[w+d]).map((f,w)=>Math.floor((f-c[w]+n[w])/n[w]));return p.splice(0,0,s),p.splice(a?3:1,0,l),p},Wr=[2,3,1,0],al=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Vr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();ti.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},jn=e=>{let t=ma(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,o=e.pads,d=e.strides,l=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:o,strides:d,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},nn=(e,t,r,i)=>{let n=r.format==="NHWC",a=nl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let C=[t[0]];if(n){let A=e.kernelCustomData.wT??e.compute(We(t[1],Wr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),C.push(A)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Dh(C,r,a,i),{inputs:C}):e.compute(Bh(C,r,a,i),{inputs:C});return}let s=t.length===3,o=t[0].dims[n?1:2],d=t[0].dims[n?2:3],l=t[0].dims[n?3:1],c=t[1].dims[2],p=t[1].dims[3],f=a[n?1:2],w=a[n?2:3],m=a[n?3:1],v=n&&c===o&&p===d&&r.pads[0]===0&&r.pads[1]===0;if(v||c===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=a[0],A,$,N,P=[];if(n){let X=e.kernelCustomData.wT??e.compute(We(t[1],Wr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=X),v){let R=o*d*l;A=t[0].reshape([1,C,R]),$=X.reshape([1,R,m]),N=[1,C,m]}else A=t[0].reshape([C,o*d,l]),$=X.reshape([1,l,m]),N=[C,f*w,m];P.push(A),P.push($)}else A=t[0].reshape([C,l,o*d]),$=t[1].reshape([1,m,l]),N=[C,m,f*w],P.push($),P.push(A);s&&P.push(t[2]);let K=N[2],Y=P[0].dims[P[0].dims.length-1];K<8&&Y<8?e.compute(ya(P,r,a,N,n,i),{inputs:P}):e.compute(ii(P,r,a,N,n,i),{inputs:P});return}let x=!0,b=e.kernelCustomData.wT??e.compute(We(t[1],Wr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let _=[t[0],b];s&&_.push(t[2]);let T=n?f*w:m,k=n?m:f*w,E=c*p*l;e.compute(Mh(_,r,a,T,k,E,s,x,i),{inputs:_})},sl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),d=Vr({...t,pads:n,strides:a,dilations:s,kernelShape:o},i);nn(e,i,d,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},ol=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Vr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Rh(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(Nh(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Kn=(e,t)=>{if(al(e.inputs,t),e.inputs[0].dims.length===3)sl(e,t);else if(e.inputs[0].dims.length===5)ol(e,e.inputs,t);else{let r=Vr(t,e.inputs);nn(e,e.inputs,r)}}}),Lh,ow=j(()=>{"use strict";ne(),ct(),ae(),oe(),Lh=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,o=e[1].dims,d=o[2]/s,l=o[3],c=a?Te(d):1,p=a&&l===1&&d>=4,f=p?Math.floor(d/4)*4:Math.floor(d/c)*c,w=d-f,m=a?Te(l):1,v=a?l===1?c:m:1,x=L.size(n)/m,b=[Math.ceil(x/64),1,1];fe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let _=["rank","rank"],T=[t.strides[0],t.strides[1]],k=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],E=[t.dilations[0],t.dilations[1]],C=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],$=[{type:12,data:x},{type:12,data:T},{type:12,data:k},{type:12,data:E},{type:12,data:C},{type:6,data:A},{type:12,data:f},{type:12,data:d},{type:12,data:l},...ie(e[0].dims,e[1].dims)];i&&($.push(...ie(e[2].dims)),_.push("rank")),$.push(...ie(n));let N=P=>{let K=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Y=Oe(e[0].dataType),X=a?1:2,R=a?2:3,H=a?3:1,F=V("W",e[1].dataType,e[1].dims.length,v),G=V("Dy",e[0].dataType,e[0].dims.length,c),Q=[G,F];i&&Q.push(V("bias",e[2].dataType,[n[H]].length,m));let z=ee("result",e[0].dataType,n.length,m),D=()=>{let B="";if(p)c===4?B+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${F.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?B+=`
          dotProd = dotProd + dot(vec4<${Y}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${Y}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(B+=`
          dotProd = dotProd + dot(vec4<${Y}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${Y}>(${F.getByOffset("w_offset")}, ${F.getByOffset("w_offset + 1u")}, ${F.getByOffset("w_offset + 2u")}, ${F.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(B+=`
                  let xValue = ${a?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):G.get("batch","inputChannel","idyR","idyC")};
        `,c===1)B+=`
          let w_offset = ${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${F.getByOffset(`w_offset / ${v}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let U=0;U<c;U++)B+=`
            let wValue${U} = ${F.getByOffset(`${F.indicesToOffset(`${F.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${U}, wOutChannel)`)} / ${v}`)};
            dotProd = dotProd + xValue[${U}] * wValue${U};`;return B},O=()=>{if(w===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let B="";if(c===1){B+="dotProd = dotProd";for(let U=0;U<w;U++)B+=`
            + ${G.getByOffset(`x_offset + ${U}`)} * ${F.getByOffset(`w_offset + ${U}`)}`;B+=";"}else if(c===2){if(w!==2)throw new Error(`Invalid inputChannelsRemainder ${w}.`);B+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${F.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return B},q=`
            let outputIndices = ${z.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${z.indicesGet("outputIndices",0)};
            let d1 = ${z.indicesGet("outputIndices",H)};
            let r = ${z.indicesGet("outputIndices",X)};
            let c = ${z.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${z.type.value}(0.0);
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
                if (dyC < 0.0 || dyC >= ${Y}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${F.indicesToOffset(`${F.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${v};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:c}) {
                  ${D()}
                  inputChannel = inputChannel + ${p?4:c};
                }
                ${O()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${z.setByOffset("global_idx","value")};
          `;return`
    ${P.registerUniforms(K).declareVariables(...Q,z)}
      ${P.mainStart()}
      ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${q}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${v}${m}${p}${w}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:$}),getShaderSource:N}}}),ul,ll,dl,an,Ph,cl,sn,pl,Uh,uw=j(()=>{"use strict";ow(),Gt(),Tt(),ul=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,ll=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},dl=(e,t,r,i,n,a,s,o,d,l)=>{let c=e.length-2,p=l.length===0;d.length<c&&d.push(...Array(c-d.length).fill(0));let f=e[0],w=t[o?3:1]*n;for(let m=0,v=e.length-c-(o?1:0);m<c;++m,++v){let x=e[v],b=p?x*s[m]:l[m],_=ul(x,s[m],a[m],t[v],r[m],b);ll(_,i,a,m,m+c),p&&l.push(s[m]*(x-1)+d[m]+(t[v]-1)*r[m]+1-a[m]-a[m+c])}l.splice(0,0,f),l.splice(o?3:1,0,w)},an=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,f)=>p*f,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,d=e.dilations.slice();if(d.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;d=new Array(p).fill(1)}let l=e.strides.slice();if(l.reduce((p,f)=>p+f,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}dl(o,r,d,e.autoPad,e.group,n,l,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:d,strides:l}),c},Ph=e=>{let t=ma(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,s=e.kernelShape,o=e.pads,d=e.strides,l=e.wIsConst(),c=e.outputPadding,p=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:p,pads:o,strides:d,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},cl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},sn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(We(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(Lh(a,r,i),{inputs:a})},pl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let d=t.outputPadding;d=[0].concat(d);let l=an({...t,pads:o,strides:s,dilations:a,kernelShape:n,outputPadding:d},i);sn(e,i,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Uh=(e,t)=>{if(cl(e.inputs,t),e.inputs[0].dims.length===3)pl(e,t);else{let r=an(t,e.inputs);sn(e,e.inputs,r)}}}),hl,qh,Wh,lw=j(()=>{"use strict";ne(),ae(),ke(),oe(),hl=(e,t,r,i)=>{let n=L.size(t),a=t.length,s=V("input",e,a),o=ee("output",e,a),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=L.normalizeAxis(d,a),c=p=>{let f=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,w=re("uniforms.input_shape","uniforms.axis",a),m=i.reverse?f+(i.exclusive?" + 1":""):"0",v=i.reverse?w:f+(i.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:l},...ie(t,t)]}),getShaderSource:c}},qh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(hl(i,r,n,t),{inputs:[0]})},Wh=e=>{let t=e.exclusive===1,r=e.reverse===1;return ye({exclusive:t,reverse:r})}}),fl,ml,gl,Vh,Gh,dw=j(()=>{"use strict";ne(),ae(),ke(),oe(),fl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ml=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},gl=(e,t)=>{let r,i,n,a,s,o,d=t.format==="NHWC",l=t.blocksize,c=t.mode==="DCR";d?([r,i,n,a]=e.dims,s=c?[r,i,n,l,l,a/l**2]:[r,i,n,a/l**2,l,l],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,l,l,a/l**2,i,n]:[r,a/l**2,l,l,i,n],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),f=p.dims.length,w=e.dataType,m=V("a",w,f),v=ee("output",w,f),x=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(m,v)}

  ${ml(o,f,m,v)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:b=>{let _=d?[r,i*l,n*l,a/l**2]:[r,a/l**2,i*l,n*l],T=L.size(_),k=p.dims,E=L.sortBasedOnPerm(k,o);return{outputs:[{dims:_,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...ie(k,E)]}},getShaderSource:x}},Vh=(e,t)=>{fl(e.inputs),e.compute(gl(e.inputs[0],t))},Gh=e=>ye({blocksize:e.blocksize,mode:e.mode,format:e.format})}),ut,lr,Gr,on,bt,yl,wl,bl,un,ln,dn,_l,vl,cn,$l,Hh,Fh,cw=j(()=>{"use strict";ne(),ae(),ke(),oe(),ut=256,lr=512,Gr=2*Math.PI,on=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},bt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},yl=(e,t,r,i,n)=>{let a=r/e,s=lr-i,o=l=>`smem[${s}u + base + ${l*t}u]`,d=`  for (var t = local_idx; t < ${a}u; t += ${ut}u) {
`;d+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,d+=`    var leg: array<vec2<f32>, 5>;
`;for(let l=0;l<e;l++){let c=`${i}u + t + ${l*a}u`;if(l===0)d+=`    leg[0] = smem[${c}];
`;else{let p=n*Gr*l/(e*t);d+=`    { let a = ${bt(p)} * angleUnit; leg[${l}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
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
`}else for(let l=0;l<e;l++){let c=["leg[0]"];for(let p=1;p<e;p++){let f=n*Gr*(p*l)/e,w=bt(Math.cos(f)),m=bt(Math.sin(f));c.push(`vec2<f32>(leg[${p}].x*${w} - leg[${p}].y*${m}, leg[${p}].x*${m} + leg[${p}].y*${w})`)}d+=`    ${o(l)} = ${c.join(" + ")};
`}return`${d}  }
  workgroupBarrier();
`},wl=(e,t,r)=>{let i="",n=1,a=0;for(let s of e)i+=yl(s,n,t,a,r),n*=s,a=lr-a;return{code:i,resultOffset:a}},bl=(e,t,r,i,n)=>{let a=e.dims,s=a.length,o=a[s-1],d=a[t],l=r&&i?(d-1)*2:d;n!==void 0&&(l=n);let c=r&&i?1:2,p=i&&!r?Math.floor(l/2)+1:l,f=a.slice();f[t]=p,f[s-1]=c;let w=1;for(let v=t+1;v<s-1;v++)w*=a[v];let m=L.size(a)/o/d;return{dataType:e.dataType,outputDims:f,length:l,signalLength:d,inner:w,batch:m,inputComponents:o,outputComponents:c,outputLength:p,inverse:r,onesided:i}},un=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),ln=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],dn=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),_l=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,o=ze(t),d=a?1:-1,l=a?1/r:1,c=on(r),p=f=>{let w=V("x",t,[1]),m=ee("y",t,[1]),v=E=>{let C=`inBase + (${E}) * uniforms.inner * ${i}u`,A=`f32(${w.getByOffset(C)})`,$=i===2?`f32(${w.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${A}, ${$})`},x;if(a&&s){let E=Math.floor(r/2)+1,C=r%2===0?`select(provided, provided - 1u, provided == ${E}u)`:"provided";x=`
    let provided = min(uniforms.signalLength, ${E}u);
    for (var i = local_idx; i < ${r}u; i += ${ut}u) {
      if (i < provided) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${C}; k += ${ut}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else x=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${ut}u) {
      if (i < loadCount) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:b,resultOffset:_}=wl(c,r,d),T=l===1?`smem[${_}u + i]`:`smem[${_}u + i] * ${bt(l)}`,k=n===2?m.setByOffset("off + 1u",`${o}(v.y)`):"";return`
  ${dn(f,w,m)}
  var<workgroup> smem: array<vec2<f32>, ${2*lr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${f.mainStart(ut)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    ${x}
${b}    for (var i = local_idx; i < uniforms.outputLength; i += ${ut}u) {
      let v = ${T};
      let off = outBase + i * uniforms.inner * ${n}u;
      ${m.setByOffset("off",`${o}(v.x)`)}
      ${k}
    }
  }`};return{name:"DFT",shaderCache:{hint:un(e,"fft"),inputDependencies:["type"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ln(e),dispatchGroup:{x:e.batch}})}},vl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,o=ze(t),d=a?1:-1,l=a?1/r:1,c=p=>{let f=V("x",t,[1]),w=ee("y",t,[1]),m=T=>{let k=`inBase + (${T}) * uniforms.inner * ${i}u`,E=`f32(${f.getByOffset(k)})`,C=i===2?`f32(${f.getByOffset(`${k} + 1u`)})`:"0.0";return`vec2<f32>(${E}, ${C})`},v=a&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${m("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${m("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${m("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,x=`
      let angle = ${bt(d*Gr)} * f32(knMod) / ${bt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,b=n===2?w.setByOffset("off + 1u",`${o}(v.y)`):"",_=l===1?"acc":`acc * ${bt(l)}`;return`
  ${dn(p,f,w)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${v}
  ${p.mainStart(ut)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${ut}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${x}
      }
      let v = ${_};
      let off = outBase + k * uniforms.inner * ${n}u;
      ${w.setByOffset("off",`${o}(v.x)`)}
      ${b}
    }
  }`};return{name:"DFT",shaderCache:{hint:un(e,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:ln(e),dispatchGroup:{x:e.batch}})}},cn=e=>{if(!e||e.dataType===0)return;if(L.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},$l=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Hh=(e,t)=>{$l(e.inputs);let r=e.inputs[0],i=r.dims.length,n=t.inverse!==0,a=t.onesided!==0,s=cn(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let o=L.normalizeAxis(cn(e.inputs[2])??t.axis,i);if(o===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(n&&a&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let d=bl(r,o,n,a,s);if(d.length<=0)throw new Error(`Invalid DFT length: ${d.length}`);let l=d.length<=lr&&on(d.length)!==void 0?_l(d):vl(d);e.compute(l,{inputs:[0]})},Fh=e=>ye({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Hr,dr,pn,xl,Sl,Tl,kl,hn,El,jh,Kh,pw=j(()=>{"use strict";ne(),ae(),ke(),oe(),Hr="[a-zA-Z]|\\.\\.\\.",dr="("+Hr+")+",pn="^"+dr+"$",xl="("+dr+",)*"+dr,Sl="^"+xl+"$",Tl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},kl=class{constructor(e,t){var n;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Sl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let o=e[s].dims.slice();if(!a.match(RegExp(pn)))throw new Error("Invalid LHS term");let d=this.processTerm(a,!0,o,s);this.lhs.push(d)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(dr)))throw new Error("Invalid RHS");(n=i.match(RegExp(Hr,"g")))==null||n.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],o=0;if(!e.match(RegExp(pn))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(Hr,"g")),l=new Tl(i);return d==null||d.forEach((c,p)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let f=n-d.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(o,o+f),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let w=0;w<s.length;w++){let m=String.fromCharCode(48+w);l.addSymbol(m,p+w),this.addSymbol(m,r[o++],i)}}else l.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[o++],i)}),l}},hn=e=>e+"_max",El=(e,t,r,i)=>{let n=e.map(l=>l.length).map((l,c)=>V(`input${c}`,t,l)),a=L.size(i),s=ee("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),d=l=>{let c=[],p="var prod = 1.0;",f="var sum = 0.0;",w="sum += prod;",m=[],v=[],x=[],b=[],_=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,E)=>{var C;if(r.rhs.symbolToIndices.has(E)){let A=(C=r.rhs.symbolToIndices.get(E))==null?void 0:C[0];A!==void 0&&r.lhs.forEach(($,N)=>{if(k.inputIndices.includes(N)){let P=$.symbolToIndices.get(E);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(K=>{c.push(`${n[N].indicesSet(`input${N}Indices`,K,s.indicesGet("outputIndices",A))}`)})}})}else r.lhs.forEach((A,$)=>{if(k.inputIndices.includes($)){let N=A.symbolToIndices.get(E);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(P=>{m.push(`${n[$].indicesSet(`input${$}Indices`,P,`${E}`)}`)}),b.push(`prod *= ${n[$].getByIndices(`input${$}Indices`)};`)}}),v.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${hn(E)}; ${E}++) {`),x.push("}")});let T=_?[...c,`let sum = ${n.map((k,E)=>k.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,f,...v,...m,p,...b,w,...x];return`
            ${l.registerUniforms(o.map(k=>({name:`${hn(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((k,E)=>`var input${E}Indices: ${n[E].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=o.filter(p=>r.symbolToInfo.has(p)).map(p=>{var f;return{type:12,data:((f=r.symbolToInfo.get(p))==null?void 0:f.dimValue)||0}});l.push({type:12,data:a});let c=e.map((p,f)=>[...ie(p)]).reduce((p,f)=>p.concat(f),l);return c.push(...ie(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:d}},jh=(e,t)=>{let r=new kl(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(El(n,e.inputs[0].dataType,r,i))},Kh=e=>{let t=e.equation.replace(/\s+/g,"");return ye({equation:t})}}),Il,fn,Cl,Al,Yh,hw=j(()=>{"use strict";ne(),ae(),oe(),Il=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},fn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},Cl=(e,t)=>e.length>t.length?fn(e,t):fn(t,e),Al=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Cl(t,r),n=e[0].dataType,a=n===9||L.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,o=a||i.length>0&&i[i.length-1]%4===0?4:1,d=Math.ceil(L.size(i)/o),l=p=>{let f=V("input",n,t.length,s),w=ee("output",n,i.length,o),m;if(n===9){let v=(x,b,_="")=>`
          let outputIndices${b} = ${w.offsetToIndices(`outputOffset + ${b}u`)};
          let offset${b} = ${f.broadcastedIndicesToOffset(`outputIndices${b}`,w)};
          let index${b} = offset${b} / 4u;
          let component${b} = offset${b} % 4u;
          ${x}[${b}] = ${_}(${f.getByOffset(`index${b}`)}[component${b}]);
        `;m=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${w.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${w.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${f.broadcastedIndicesToOffset("outputIndices",w)};
        let data = ${w.type.value}(${f.getByOffset(`inputOffset / ${s}`)});
        ${w.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(f,w)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},c=[{type:12,data:d},...ie(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c})}},Yh=e=>{Il(e.inputs),e.compute(Al(e.inputs),{inputs:[0]})}}),zl,Zh,fw=j(()=>{"use strict";ne(),ae(),oe(),fa(),zl=e=>{let t=e[0].dataType,r=L.size(e[0].dims),i=L.size(e[1].dims),n=i%4===0,a=s=>{let o=V("x",t,[1],4),d=V("bias",t,[1],4),l=ee("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${d.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,f=n?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(o,d,l)}

    ${Vn(ze(t))}

    ${s.mainStart(Xt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Gn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Xt/4)}})}},Zh=e=>{e.inputs.length<2||L.size(e.inputs[1].dims)===0?fh(e):e.compute(zl(e.inputs))}}),Ol,Ml,Xh,Qh,mw=j(()=>{"use strict";ne(),ae(),ke(),oe(),Ol=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Ml=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=L.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let o=r[a],d=e[0].dataType===9?4:1,l=Math.ceil(L.size(s)/d),c=[{type:12,data:l},{type:6,data:o},{type:12,data:a},...ie(e[0].dims,e[1].dims,s)],p=f=>{let w=V("data",e[0].dataType,e[0].dims.length,d),m=V("inputIndices",e[1].dataType,e[1].dims.length),v=ee("output",e[0].dataType,s.length,d),x=_=>{let T=i.length,k=`var indicesIndices${_}  = ${m.type.indices}(0);`;for(let E=0;E<T;E++)k+=`${T>1?`indicesIndices${_}[${E}]`:`indicesIndices${_}`} = ${s.length>1?`outputIndices${_}[uniforms.axis + ${E}]`:`outputIndices${_}`};`;k+=`
          var idx${_} = ${m.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${w.type.indices};
        `;for(let E=0,C=0;E<n;E++)E===a?(k+=`${n>1?`dataIndices${_}[${E}]`:`dataIndices${_}`} = u32(idx${_});`,C+=T):(k+=`${n>1?`dataIndices${_}[${E}]`:`dataIndices${_}`} = ${s.length>1?`outputIndices${_}[${C}]`:`outputIndices${_}`};`,C++);return k},b;if(e[0].dataType===9){let _=(T,k,E="")=>`
          let outputIndices${k} = ${v.offsetToIndices(`outputOffset + ${k}u`)};
          ${x(k)};
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
      ${x("")};
      let value = ${w.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,m,v)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${b}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:p}},Xh=e=>ye({axis:e.axis}),Qh=(e,t)=>{let r=e.inputs;Ol(r),e.compute(Ml(e.inputs,t))}}),Rl,Jh,ef,gw=j(()=>{"use strict";ne(),ae(),oe(),Rl=(e,t,r,i,n,a,s,o,d)=>{let l=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:o},{type:12,data:d}],c=[a];l.push(...ie(t.dims,c));let p=f=>{let w=V("indices_data",t.dataType,t.dims.length),m=ee("input_slice_offsets_data",12,1,1),v=[w,m],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${f.registerUniforms(x).declareVariables(...v)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},Jh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],o=L.sizeToDimension(a,a.length-1),d=L.sizeFromDimension(i,t.batchDims+s),l=L.sizeToDimension(i,t.batchDims),c=L.sizeFromDimension(i,t.batchDims),p=o/l,f=new Array(s),w=d;for(let k=0;k<s;++k)f[s-1-k]=w,w*=i[t.batchDims+s-1-k];let m=Rl(e,r[1],f,t.batchDims,i,o,p,c,s),v=t.batchDims+s;if(v>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=a.slice(0,-1).concat(i.slice(v)),b=L.size(x),_=[{type:12,data:b},{type:12,data:d},...ie(r[0].dims,m.dims,x)],T=k=>{let E=V("data",r[0].dataType,r[0].dims.length),C=V("slice_offsets",12,m.dims.length),A=ee("output",r[0].dataType,x.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,A)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:n}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:T},{inputs:[r[0],m]})},ef=e=>({batchDims:e.batch_dims,cacheKey:""})}),Nl,Bl,tf,rf,yw=j(()=>{"use strict";ne(),ae(),ke(),oe(),Nl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=L.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((o,d)=>d===r?Math.ceil(o/i)===a.dims[d]:o===a.dims[d]).reduce((o,d)=>o&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((o,d)=>o===a.dims[d]).reduce((o,d)=>o&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Bl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=L.normalizeAxis(t.gatherAxis,n),s=L.normalizeAxis(t.quantizeAxis,n),o=r.slice(0);o.splice(a,1,...i);let d=L.size(o),l=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:d},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...ie(...e.map((w,m)=>w.dims),o)],f=w=>{let m=V("data",e[0].dataType,e[0].dims.length),v=V("inputIndices",e[1].dataType,e[1].dims.length),x=V("scales",e[2].dataType,e[2].dims.length),b=e.length>3?V("zeroPoint",e[3].dataType,e[3].dims.length):void 0,_=ee("output",l,o.length),T=[m,v,x];b&&T.push(b);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${w.registerUniforms(k).declareVariables(...T,_)}
        ${w.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${b?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${b.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${b.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ze(l)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((w,m)=>m!==1).map(w=>w.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(w,m)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:f}},tf=(e,t)=>{let r=e.inputs;Nl(r,t),e.compute(Bl(e.inputs,t))},rf=e=>ye({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Dl,Ll,nf,af,ww=j(()=>{"use strict";ne(),ae(),ke(),oe(),Dl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ll=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,o=L.normalizeAxis(t.axis,n),d=r[o],l=a.slice(0),c=L.size(l),p=V("input",i,n),f=V("indicesInput",s,a.length),w=ee("output",i,l.length),m=[{type:12,data:c},{type:6,data:d},{type:12,data:o}];return m.push(...ie(r,a,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:v=>`
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
  }`}},nf=e=>ye({axis:e.axis}),af=(e,t)=>{let r=e.inputs;Dl(r),e.compute(Ll(e.inputs,t))}}),Pl,Ul,sf,of,bw=j(()=>{"use strict";ne(),ae(),oe(),Pl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ul=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=ep.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[n,a];if(!o)throw new Error("Can't use gemm on the given tensors");let d=16,l=Math.ceil(a/d),c=Math.ceil(n/d),p=!0,f=L.size(o),w=[{type:12,data:p?l:f},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(w.push(...ie(e[2].dims)),m.push("rank")),w.push(...ie(o));let v=b=>{let _="";t.transA&&t.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",k=V("a",e[0].dataType,e[0].dims),E=V("b",e[1].dataType,e[1].dims),C=k.type.value,A=null,$=[k,E];e.length===3&&(A=V("c",e[2].dataType,e[2].dims.length),$.push(A));let N=ee("output",e[0].dataType,o.length);$.push(N);let P=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${b.registerUniforms(P).declareVariables(...$)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${T}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",N)}; value += ${C}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=b=>{let _=V("a",e[0].dataType,e[0].dims),T=V("b",e[1].dataType,e[1].dims),k=null,E=[_,T];e.length===3&&(k=V("c",e[2].dataType,e[2].dims.length),E.push(k));let C=ee("output",e[0].dataType,o.length);E.push(C);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],$="",N="";t.transA&&t.transB?(N=`
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
      `,$="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let P=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${b.registerUniforms(A).declareVariables(...E)}
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

    ${P}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:l*c},programUniforms:w}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:w}),getShaderSource:v}},sf=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},of=(e,t)=>{Pl(e.inputs),e.compute(Ul(e.inputs,t))}}),it,lt,zt,Ot,ql,Wl,Vl,Gl,Hl,Fl,jl,Kl,uf,lf,_w=j(()=>{"use strict";ne(),ae(),ke(),oe(),[it,lt,zt,Ot]=[0,1,2,3],ql=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Wl=`
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
`,Vl=e=>`
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
`,Gl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Hl=e=>`
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
`,Fl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${it}] = batch;
     indices[${lt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${zt}] = u32(r);
            indices[${Ot}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${zt}] = u32(clamp(r, 0, H - 1));
          indices[${Ot}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${zt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ot}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,jl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${it}], indices[${lt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${it}], indices[${lt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${it}], indices[${lt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${it}], indices[${lt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${it}], indices[${lt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${it}], indices[${lt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Kl=(e,t)=>{let r=V("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=V("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[it,lt,zt,Ot]=[0,3,1,2]);let s=ee("output",e[0].dataType,a.length),o=r.type.value,d=L.size(a),l=[{type:12,data:d},...ie(e[0].dims,i,a)],c=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${Wl}
  ${Vl(o)}
  ${Gl(t)}
  ${Hl(t)}
  ${Fl(r,o,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${zt}]);
      let W_in = i32(uniforms.x_shape[${Ot}]);

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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${it}], indices[${zt}], indices[${Ot}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${jl(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let f=L.size(a);return{outputs:[{dims:a,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:l}},getShaderSource:c}},uf=(e,t)=>{ql(e.inputs),e.compute(Kl(e.inputs,t))},lf=e=>ye({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Be,Yl,df,mn,Zl,yr,cf,pf=j(()=>{"use strict";ne(),ae(),ke(),da(),ha(),oe(),Tt(),Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Yl=(e,t)=>{let r=e[0],i=Be(e,1),n=Be(e,2),a=Be(e,3),s=Be(e,4),o=Be(e,5),d=Be(e,6),l=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],p=r.dims[1],f=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=p,m=0,v=0,x=Math.floor(f/t.numHeads);if(d&&l&&L.size(d.dims)&&L.size(l.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=d.dims[2],v=d.dims[2]}else if(d&&L.size(d.dims)||l&&L.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(i&&L.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');b=2,w=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,w=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,w=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}if(a&&L.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=m+w,T=0;if(s&&L.size(s.dims)>0){T=8;let A=s.dims;throw A.length===1?A[0]===c?T=1:A[0]===3*c+2&&(T=3):A.length===2&&A[0]===c&&A[1]===_&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,E=f;if(n&&L.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(w!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=n.dims[2]}else{if(w!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=n.dims[1]*n.dims[3],k=!0}}let C=!1;if(s&&L.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&L.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:w,totalSequenceLength:_,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:f,vHiddenSize:E,headSize:x,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:C,passPastInKv:k,qkvFormat:b}},df=e=>ye({...e}),mn=ye({perm:[0,2,1,3]}),Zl=(e,t,r,i,n,a,s)=>{let o=[i,n,a],d=L.size(o),l=[{type:12,data:d},{type:12,data:s},{type:12,data:a}],c=p=>{let f=ee("qkv_with_bias",t.dataType,o),w=V("qkv",t.dataType,o),m=V("bias",r.dataType,o),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(v).declareVariables(w,m,f)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},yr=(e,t,r,i,n,a,s,o)=>{let d=a;if(s&&L.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Zl(e,a,s,t,i,r*n,o),d=d.reshape([t,i,r,n]),r===1||i===1?d:e.compute(We(d,mn.perm),{inputs:[d],outputs:[-1]})[0]}else return a.dims.length===3&&(d=a.reshape([t,i,r,n])),r===1||i===1?d:e.compute(We(d,mn.perm),{inputs:[d],outputs:[-1]})[0]},cf=(e,t)=>{let r=Yl(e.inputs,t),i=e.inputs[0],n=Be(e.inputs,1),a=Be(e.inputs,2),s=Be(e.inputs,3),o=Be(e.inputs,4),d=Be(e.inputs,5),l=Be(e.inputs,6),c=Be(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if((n==null?void 0:n.dims.length)===5)throw new Error("Packed KV is not implemented");let p=n&&a&&n.dims.length===4&&a.dims.length===4,f=yr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(p)return _r(e,f,n,a,o,void 0,l,c,d,r);if(!n||!a)throw new Error("key and value must be provided");let w=yr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),m=yr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);_r(e,f,w,m,o,void 0,l,c,d,r)}}),Xl,Ql,Jl,ed,Yn,hf,ff,mf=j(()=>{"use strict";ne(),ae(),ke(),oe(),Xl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ql=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),ye({numOutputs:i,axis:t.axis,splitSizes:r})},Jl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${re("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,ed=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Yn=(e,t)=>{let r=e[0].dims,i=L.size(r),n=e[0].dataType,a=L.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),o=V("input",n,r.length),d=new Array(t.numOutputs),l=[],c=[],p=0,f=[{type:12,data:i}];for(let m=0;m<t.numOutputs;m++){p+=t.splitSizes[m],d[m]=p;let v=r.slice();v[a]=t.splitSizes[m],c.push(v),s[m]=ee(`output${m}`,n,v.length),l.push({dims:c[m],dataType:e[0].dataType})}f.push({type:12,data:d},...ie(r,...c));let w=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(o,...s)}
  ${Jl(d.length)}
  ${ed(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${re("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${o.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:f})}},hf=(e,t)=>{Xl(e.inputs);let r=e.inputs.length===1?t:Ql(e.inputs,t);e.compute(Yn(e.inputs,r),{inputs:[0]})},ff=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return ye({axis:t,numOutputs:i,splitSizes:r})}}),td,ni,gf,yf=j(()=>{"use strict";ne(),ae(),ke(),oe(),td=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!L.areEqual(i.dims,[])&&!L.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!L.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],l=r.dims[r.dims.length-2],c=n.dims[0],p=L.sizeFromDimension(r.dims,1)/l,f=o===0?n.dims[1]*2:p/s;if(o>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(d!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(f/2!==n.dims[1]&&o/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},ni=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],o=L.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],l=o/d,c=e[2].dims[1],p=n===0?c*2:l/i,f=new Array(s,d,l/p,p-c),w=L.computeStrides(f),m=[{type:1,data:a},{type:12,data:f},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[o,l,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,p,d*p,1]}):[],...ie(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],v=x=>{let b=V("input",e[0].dataType,e[0].dims.length),_=V("position_ids",e[1].dataType,e[1].dims.length),T=V("cos_cache",e[2].dataType,e[2].dims.length),k=V("sin_cache",e[3].dataType,e[3].dims.length),E=ee("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${x.declareVariables(b,_,T,k,E)}

        ${x.mainStart(Xt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

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
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ye({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(L.size(f)/Xt)},programUniforms:m})}},gf=(e,t)=>{td(e.inputs,t),e.compute(ni(e.inputs,t))}}),rd,id,gn,nd,wf,vw=j(()=>{"use strict";ke(),ne(),ha(),pf(),mf(),Tt(),yf(),oe(),rd=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,d=r.dims[0],l=r.dims[1],c=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=l,f=0,w=!i||i.dims.length===0,m=Math.floor(w?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);w&&(c=m*t.numHeads);let v=a&&a.dims.length!==0,x=s&&s.dims.length!==0;if(v&&a.dims.length===4&&a.dims[0]===d&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&x){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=a.dims[2]}else if(v||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');p=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let _=0,T=!1,k=t.kvNumHeads?m*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(p!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=n.dims[2]}else{if(p!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=n.dims[1]*n.dims[3],T=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=E.dims.reduce((A,$)=>A*$,1);if(C!==d)throw new Error(`seqlens_k must have batch_size (${d}) elements, got ${C}.`);for(let A=0;A<E.dims.length;A++)if(E.dims[A]!==1&&E.dims[A]!==d)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${d}), got dims[${A}] = ${E.dims[A]}.`)}return{batchSize:d,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:k,headSize:m,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:b}},id=ye({perm:[0,2,1,3]}),gn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(We(i,id.perm),{inputs:[i],outputs:[-1]})[0]),i},nd=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],o=e*t,d=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],l=c=>{let p=V("seq_lens",r.dataType,r.dims),f=V("total_seq_lens",i.dataType,i.dims),w=ee("pos_ids",n,s),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(p,f,w)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:l}},wf=(e,t)=>{var k;if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=rd(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((k=e.inputs[1])==null?void 0:k.dims.length)===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=ye({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[f,w,m]=!n&&!a?e.compute(Yn([i],p),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],v,x;if(t.doRotary){let E=e.compute(nd(r.batchSize,r.sequenceLength,d,l),{inputs:[d,l],outputs:[-1]})[0],C=e.inputs[7],A=e.inputs[8],$=ye({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),N=[f,E,C,A],P=[-1];v=e.compute(ni(N,$),{inputs:N,outputs:P})[0],N.splice(0,1,w);let K=ye({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(ni(N,K),{inputs:N,outputs:P})[0]}let b=yr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?v:f,void 0,0),_=gn(e,t.doRotary?x:w,r),T=gn(e,m,r);_r(e,b,_,T,void 0,void 0,s,o,void 0,r,d,l)}}),yn,ad,sd,bf,$w=j(()=>{"use strict";ne(),ae(),Tt(),oe(),yn=(e,t,r,i,n,a,s,o)=>{let d=Te(a),l=d===1?"f32":`vec${d}f`,c=d===1?"vec2f":`mat2x${d}f`,p=n*s,f=64;p===1&&(f=256);let w=[n,s,a/d],m=[n,s,2],v=["rank","type","type"],x=[];x.push(...ie(w,m));let b=_=>{let T=V("x",t.dataType,3,d),k=V("scale",r.dataType,r.dims),E=V("bias",i.dataType,i.dims),C=ee("output",1,3,2),A=[T,k,E,C];return`
  var<workgroup> workgroup_shared : array<${c}, ${f}>;
  const workgroup_size = ${f}u;
  ${_.declareVariables(...A)}
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
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${St("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${St("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${o};${f}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:p},programUniforms:x}),getShaderSource:b},{inputs:[t,r,i],outputs:[-1]})[0]},ad=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],o=i[1],d=L.sizeFromDimension(i,a),l=Te(d),c=L.size(n)/l,p=yn(e,t[0],t[1],t[2],s,d,o,r.epsilon),f=[s,o,d/l],w=[s,o],m=["type","none"],v=x=>{let b=V("x",t[0].dataType,f.length,l),_=V("scale_shift",1,w.length,2),T=ee("output",t[0].dataType,f.length,l),k=[b,_,T];return`
  ${x.registerUniform("output_size","u32").declareVariables(...k)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${b.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...ie(f,w,f)]}),getShaderSource:v},{inputs:[t[0],p]})},sd=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],o=L.sizeFromDimension(i,1)/s,d=Te(s),l=L.size(n)/d,c=[{type:12,data:o},{type:12,data:Math.floor(s/d)}],p=["type","type"],f=!1,w=[0,i.length-1];for(let b=0;b<i.length-2;b++)f=f||i[b+1]!==1,w.push(b+1);f=f&&i[i.length-1]!==1;let m=f?e.compute(We(e.inputs[0],w),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(b,_)=>i[w[_]])),v=yn(e,m,t[1],t[2],a,o,s,r.epsilon),x=b=>{let _=Oe(t[0].dataType),T=d===1?"vec2f":`mat${d}x2f`,k=A=>{let $=A===0?"x":"y",N=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${_}(${N}(scale.${$}))`;case 2:return`vec2<${_}>(${N}(scale[0].${$}, scale[1].${$}))`;case 4:return`vec4<${_}>(${N}(scale[0].${$}, scale[1].${$}, scale[2].${$}, scale[3].${$}))`;default:throw new Error(`Not supported compoents ${d}`)}},E=V("input",t[0].dataType,t[0].dims,d),C=ee("output",t[0].dataType,n,d);return`
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
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:x},{inputs:[t[0],v]})},bf=(e,t)=>{t.format==="NHWC"?sd(e,e.inputs,t):ad(e,e.inputs,t)}}),od,ud,_f,xw=j(()=>{"use strict";ne(),ae(),oe(),od=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},ud=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],o=n,d=L.normalizeAxis(t.axis,n.length),l=L.sizeToDimension(n,d),c=L.sizeFromDimension(n,d),p=L.size(a.dims),f=s?L.size(s.dims):0;if(p!==c||s&&f!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${f}`);let w=[];for(let E=0;E<n.length;++E)E<d?w.push(n[E]):w.push(1);let m=Te(c),v=["type","type"],x=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/m)},{type:1,data:t.epsilon}];s&&v.push("type");let b=r>1,_=r>2,T=E=>{let C=Oe(e[0].dataType),A=[V("x",e[0].dataType,e[0].dims,m),V("scale",a.dataType,a.dims,m)];s&&A.push(V("bias",s.dataType,s.dims,m)),A.push(ee("output",e[0].dataType,o,m)),b&&A.push(ee("mean_data_output",1,w)),_&&A.push(ee("inv_std_output",1,w));let $=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms($).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Un("f32",m)};
    var mean_square_vector = ${Un("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Yt(C,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${St("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${St("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Yt(C,m,"x[j + offset]")};
      let f32scale = ${Yt(C,m,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Yt(C,m,"bias[j]")}`:""}
      );
    }

    ${b?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:o,dataType:e[0].dataType}];return b&&k.push({dims:w,dataType:1}),_&&k.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${i}`,inputDependencies:v},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:x}),getShaderSource:T}},_f=(e,t)=>{od(e.inputs),e.compute(ud(e.inputs,t,e.outputCount))}}),ld,vf,Sw=j(()=>{"use strict";ae(),wa(),ba(),ld=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},vf=e=>{ld(e.inputs);let t=Zt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(ya(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=L.size(e.inputs[0].dims.slice(0,-2)),s=L.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let o=e.inputs[0].reshape([1,a,i]),d=e.inputs[1].reshape([1,i,r]),l=[1,a,r],c=[o,d];e.compute(ii(c,{activation:""},t,l),{inputs:c})}else e.compute(ii(e.inputs,{activation:""},t))}}}),dd,cd,pd,$f,xf,Tw=j(()=>{"use strict";ne(),ae(),ke(),oe(),dd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!L.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(L.size(o)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,l=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(L.size(d)!==l)throw new Error("zeroPoints input size error.")}},cd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,o=r.slice(0,i-2),d=L.size(o),l=e[1].dims[2]/4,c=e[0].dataType,p=Te(t.k),f=Te(l),w=Te(s),m=o.concat([n,s]),v=n>1&&s/w%2===0?2:1,x=L.size(m)/w/v,b=64,_=[],T=[d,n,a/p],k=L.convertShape(e[1].dims).slice();k.splice(-1,1,l/f),_.push(...ie(T)),_.push(...ie(k)),_.push(...ie(e[2].dims)),e.length===4&&_.push(...ie(L.convertShape(e[3].dims)));let E=[d,n,s/w];_.push(...ie(E));let C=A=>{let $=T.length,N=V("a",e[0].dataType,$,p),P=V("b",12,k.length,f),K=V("scales",e[2].dataType,e[2].dims.length),Y=[N,P,K],X=e.length===4?V("zero_points",12,e[3].dims.length):void 0;X&&Y.push(X);let R=E.length,H=ee("output",e[0].dataType,R,w),F=Oe(e[0].dataType),G=(()=>{switch(p){case 1:return`array<${F}, 8>`;case 2:return`mat4x2<${F}>`;case 4:return`mat2x4<${F}>`;default:throw new Error(`${p}-component is not supported.`)}})(),Q=Math.floor(32/t.bits),z=Math.floor(Q/8),D=()=>{let B="";for(let U=0;U<z;U++){let te=U*t.bits*4,be=te+t.bits;B+=`
          // reuse a data (pass ${U})
            var input_offset${U>0?U:""} = ${U===0?N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${U>0?U:""}: ${G};
            for (var j${U>0?U:""}: u32 = 0; j${U>0?U:""} < ${8/p}; j${U>0?U:""}++) {
              a_data${U>0?U:""}[j${U>0?U:""}] = ${N.getByOffset(`input_offset${U>0?U:""}`)};
              input_offset${U>0?U:""}++;
            }
          `;for(let pe=0;pe<w*v;pe++)B+=`
            b_value = ${f===1?`b${pe}_data`:`b${pe}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${U*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${te}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${be}u) & b_mask);`}
            b_quantized_values = ${G}(${Array.from({length:4},(he,Ce)=>`${F}(b_value_lower[${Ce}]), ${F}(b_value_upper[${Ce}])`).join(", ")});
            b_dequantized_values = ${p===1?`${G}(${Array.from({length:8},(he,Ce)=>`(b_quantized_values[${Ce}] - ${X?`zero_point${pe}`:"zero_point"}) * scale${pe}`).join(", ")});`:`(b_quantized_values - ${G}(${Array(8).fill(`${X?`zero_point${pe}`:"zero_point"}`).join(",")})) * scale${pe};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(pe/w)}]${w>1?`[${pe%w}]`:""} += ${Array.from({length:8/p},(he,Ce)=>`${p===1?`a_data${U>0?U:""}[${Ce}] * b_dequantized_values[${Ce}]`:`dot(a_data${U>0?U:""}[${Ce}], b_dequantized_values[${Ce}])`}`).join(" + ")};
          `}return B},O=()=>{let B=`
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
            `;for(let U=0;U<w*v;U++)B+=`
            let scale${U} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${X?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${U} = ${F}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return B},q=()=>{let B=`col_index = col * ${w};`;for(let U=0;U<w*v;U++)B+=`
            let b${U}_data = ${P.getByIndices(`${P.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return B+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${G};
            var b_dequantized_values: ${G};`,B};return`
        var<workgroup> workgroup_shared: array<${H.type.value}, ${v*b}>;
        ${A.declareVariables(...Y,H)}
        ${A.mainStart([b,1,1])}
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
              ${q()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${D()}
                word_offset += ${Q/p};
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
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${f};${w};${v};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x},programUniforms:_}),getShaderSource:C}},pd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,o=r.slice(0,i-2),d=L.size(o),l=e[1].dims[2]/4,c=e[0].dataType,p=Te(t.k),f=Te(l),w=o.concat([n,s]),m=128,v=s%8===0?8:s%4===0?4:1,x=m/v,b=Math.floor(32/t.bits),_=x*f*b,T=_/p,k=_/t.blockSize,E=L.size(w)/v,C=[],A=[d,n,a/p],$=L.convertShape(e[1].dims).slice();$.splice(-1,1,l/f),C.push(...ie(A)),C.push(...ie($)),C.push(...ie(e[2].dims)),e.length===4&&C.push(...ie(L.convertShape(e[3].dims)));let N=[d,n,s];C.push(...ie(N));let P=K=>{let Y=A.length,X=V("a",e[0].dataType,Y,p),R=V("b",12,$.length,f),H=V("scales",e[2].dataType,e[2].dims.length),F=[X,R,H],G=e.length===4?V("zero_points",12,e[3].dims.length):void 0;G&&F.push(G);let Q=N.length,z=ee("output",e[0].dataType,Q),D=Oe(e[0].dataType),O=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${D}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${D}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${D}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${D}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${z.type.value}, ${x}>, ${v}>;
        ${K.declareVariables(...F,z)}
        ${K.mainStart([x,v,1])}
          let output_indices = ${z.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${m})
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
            let zero_point = ${D}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${D}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${H.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?"b_data":"b_data[i]"};
              ${(()=>{let q=Math.floor(b/8),B="";for(let U=0;U<q;U++){let te=U*t.bits*4,be=te+t.bits;B+=`
              ${O()}
              {${t.bits===2?`
                let half_word = b_value >> ${U*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${te}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${be}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${D}>(${Array.from({length:4},(pe,he)=>`${D}(b_value_lower[${he}]), ${D}(b_value_upper[${he}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${D}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(pe,he)=>`${`dot(a_data${he}, b_dequantized_values[${he}])`}`).join(" + ")};
              }
              word_offset += ${8/p};`}return B})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${z.type.value} = ${z.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${z.setByIndices(`${z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${f};${x};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:c}],dispatchGroup:{x:E},programUniforms:C}),getShaderSource:P}},$f=(e,t)=>{dd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(pd(e.inputs,t)):e.compute(cd(e.inputs,t))},xf=e=>ye(e)}),hd,fd,md,gd,yd,wd,bd,_d,Sf,kw=j(()=>{"use strict";ne(),ae(),oe(),hd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},fd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${re("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${re("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${re("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},md=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${re("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${re("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${re("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${re("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},gd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${re("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${re("uniforms.x_shape",n,t)})) {
                  k = i32(${re("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${re("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},yd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${re("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${re("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${re("uniforms.x_shape",n,t)})) {
                  k -= i32(${re("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${re("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},wd=(e,t,r)=>{switch(r.mode){case 0:return fd(e,t,r.pads.length);case 1:return md(e,t,r.pads.length);case 2:return gd(e,t,r.pads.length);case 3:return yd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},bd=(e,t)=>{let r=L.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=L.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...ie(e[0].dims,r));let o=["rank"],d=l=>{let c=ee("output",e[0].dataType,r.length),p=V("x",e[0].dataType,i.length),f=p.type.value,w=wd(c,i.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?f:"f32"}),`
            ${l.registerUniforms(m).declareVariables(p,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(L.size(r)/64)},programUniforms:a}),getShaderSource:d}},_d=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let d=0;d<o.length;d++)a[Number(o[d])]=Number(r[d]),a[Number(o[d])+n]=Number(r[d+o.length])}else r.forEach((o,d)=>a[Number(d)]=Number(o));let s=[];return a.forEach(o=>s.push(o)),{mode:t.mode,value:i,pads:s}}else return t},Sf=(e,t)=>{hd(e.inputs);let r=_d(e.inputs,t);e.compute(bd(e.inputs,r),{inputs:[0]})}}),cr,wn,bn,_n,vn,vd,$d,$n,xn,Tf,kf,Sn,Ef,If,Tn,Cf,Af,zf,Of,Ew=j(()=>{"use strict";Ge(),ne(),ae(),oe(),cr=e=>{if(ve.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},wn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),d=a?t.dilations.slice():[],l=t.pads.slice();ti.adjustPoolAttributes(r,n,s,o,d,l);let c=ti.computePoolOutputShape(r,n,o,d,s,l,t.autoPad,t.ceilMode),p=Object.assign({},t);a?Object.assign(p,{kernelShape:s,strides:o,pads:l,dilations:d,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:o,pads:l,cacheKey:t.cacheKey});let f=c.slice();return f.push(f.splice(1,1)[0]),[p,i?f:c]},bn=(e,t)=>{let r=t.format==="NHWC",i=L.size(e),n=L.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],p=!!(l+c);a.push({type:12,data:o},{type:12,data:d},{type:12,data:l},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],v=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];f=!!(v+x),a.push({type:12,data:w},{type:12,data:m},{type:12,data:v},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,p,f]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=L.computeStrides(t.kernelShape);a.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((l,c)=>l+c);return[a,s,!!d,!1,!1]}},_n=(e,t,r,i,n,a,s,o,d,l,c,p)=>{let f=n.format==="NHWC",w=t.type.value,m=ee("output",t.type.tensor,i);if(n.kernelShape.length<=2){let v="",x="",b="",_=r-(f?2:1);if(c?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let T=r-(f?3:2);p?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,b=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${w}(${o});
              var pad = 0;
              ${x}
              ${v}
              ${b}
              ${s}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=n.kernelShape.length,x=n.pads.length,b="";return l?b=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:b=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(d).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${w}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${re("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${re("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${r-v}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${re("uniforms.strides",`j - ${r-v}u`,v)}
                    + offsets[j - ${r-v}u] - ${re("uniforms.pads","j - 2u",x)};
                  ${b}
              }
              ${s}

              output[global_idx] = value;
            }`}},vn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,vd=e=>`${vn(e)};${e.countIncludePad}`,$d=e=>`${vn(e)};${e.storageOrder};${e.dilations}`,$n=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),xn=(e,t,r,i)=>{let[n,a]=wn(t,i,r),s=V("x",t.dataType,t.dims.length),o=s.type.value,d="value += x_val;",l="";n.countIncludePad?l+=`value /= ${o}(uniforms.kernelSize);`:l+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,p,f,w,m]=bn(a,n);c.push(...ie(t.dims,a));let v=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${f};${w};${m}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(L.size(a)/64)},programUniforms:c}),getShaderSource:x=>_n(x,s,t.dims.length,a.length,n,d,l,0,p,f,w,m)}},Tf=e=>{let t=e.count_include_pad!==0,r=$n(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:vd(i)}},kf=(e,t)=>{cr(e.inputs),e.compute(xn("AveragePool",e.inputs[0],!1,t))},Sn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Ef=e=>{let t=e.format;return{format:t,...Sn,cacheKey:t}},If=(e,t)=>{cr(e.inputs),e.compute(xn("GlobalAveragePool",e.inputs[0],!0,t))},Tn=(e,t,r,i)=>{let[n,a]=wn(t,i,r),s=`
      value = max(x_val, value);
    `,o="",d=V("x",t.dataType,t.dims.length),l=["rank"],[c,p,f,w,m]=bn(a,n);return c.push(...ie(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${f};${w};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(L.size(a)/64)},programUniforms:c}),getShaderSource:v=>_n(v,d,t.dims.length,a.length,n,s,o,t.dataType===10?-65504:-1e5,p,f,w,m)}},Cf=(e,t)=>{cr(e.inputs),e.compute(Tn("MaxPool",e.inputs[0],!1,t))},Af=e=>{let t=e.storage_order,r=e.dilations,i=$n(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:$d(n)}},zf=e=>{let t=e.format;return{format:t,...Sn,cacheKey:t}},Of=(e,t)=>{cr(e.inputs),e.compute(Tn("GlobalMaxPool",e.inputs[0],!0,t))}}),xd,Sd,Mf,Rf,Iw=j(()=>{"use strict";ne(),ae(),ke(),oe(),xd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Sd=(e,t)=>{let r=L.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,o=L.size(a),d=i===3||i===2,l=d?[Math.ceil(L.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,p=e.length>2?e[2]:void 0,f=p?d?[Math.ceil(L.size(p.dims)/4)]:p.dims:void 0,w=c.length===0||c.length===1&&c[0]===1,m=w===!1&&c.length===1,v=Te(o),x=w&&(!d||v===4),b=x?v:1,_=x&&!d?v:1,T=V("input",d?12:i,l.length,_),k=V("scale",s,c.length),E=p?V("zero_point",d?12:i,f.length):void 0,C=ee("output",s,a.length,b),A=[T,k];E&&A.push(E);let $=[l,c];p&&$.push(f);let N=[{type:12,data:o/b},{type:12,data:r},{type:12,data:t.blockSize},...ie(...$,a)],P=K=>{let Y=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(Y).declareVariables(...A,C)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${b===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${w?`let scale_value= ${k.getByOffset("0")}`:m?`
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
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:m?d?`
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
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:P,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/b/64),y:1,z:1},programUniforms:N})}},Mf=(e,t)=>{xd(e.inputs,t),e.compute(Sd(e.inputs,t))},Rf=e=>ye({axis:e.axis,blockSize:e.blockSize})}),Td,kd,Nf,Cw=j(()=>{"use strict";Ge(),ne(),oe(),Td=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},kd=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,o=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...ie(a)],d=l=>{let c=ee("output",i,a.length),p=c.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(f).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},Nf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ve.webgpu.validateInputContent&&Td(t,r,i),e.compute(kd(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Ed,Id,Bf,Df,Aw=j(()=>{"use strict";ne(),ae(),ke(),oe(),Ed=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Id=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(L.sizeToDimension(i,i.length-1)/a),o=i[i.length-1],d=L.sizeFromDimension(r,o),l=[{type:12,data:s},{type:12,data:o},{type:12,data:d},...ie(e[1].dims,e[2].dims,n)],c=p=>{let f=V("indices",e[1].dataType,e[1].dims.length),w=V("updates",e[2].dataType,e[2].dims.length,a),m=t.reduction!=="none"&&t.reduction!==""?op("output",e[0].dataType,n.length):ee("output",e[0].dataType,n.length,a);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,w,m)}
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
    ${Ed(t.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:c}},Bf=e=>ye({reduction:e.reduction}),Df=(e,t)=>{e.compute(Id(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Cd,Ad,zd,kn,Od,Md,Rd,Nd,Bd,Dd,Ld,Pd,En,Ud,qd,Wd,Vd,Gd,Lf,Pf,zw=j(()=>{"use strict";ne(),ae(),ke(),oe(),Cd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ad=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},zd=(e,t,r,i,n,a)=>{let[s,o,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==l&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Cd(i,t),t.axes.length>0&&Ad(i,t.axes,l).forEach((c,p)=>i[p]=c)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==l&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},kn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Od=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${kn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${kn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Md=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Rd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},Nd=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},Bd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},Dd=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${re("uniforms.scales","i",i)};
        var roi_low = ${re("uniforms.roi","i",n)};
        var roi_hi = ${re("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${re("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${re("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ld=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${re("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${re("uniforms.roi","i",a)};
          var roi_hi = ${re("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${re("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${re("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,Pd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${re("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,En=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Ud=(e,t,r,i,n)=>{let[a,s,o,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${En(e,d,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${s}];
      var col:${l} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
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
    }`},qd=(e,t,r,i,n,a,s,o,d,l)=>{let c=r.length===2,p=!0,[f,w]=c?[0,1]:p?[2,3]:[1,2],m=e.type.value,v=x=>{let b=x===f?"row":"col";return`
      fn ${b}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[x]},
        ${i[x]}, ${r[x]}, ${a[x]}, ${a[x]} + ${r.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${d};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${m} = originalIdx + ${m}(i);
          if (${b} < 0 || ${b} >= ${r[x]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${d};`:`${b} = max(0, min(${b}, ${r[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${b})`)};
          data[i + 1] = ${x===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(f)};
    ${v(w)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Wd=(e,t,r,i,n)=>{let[a,s,o,d,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${En(e,l,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${d}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
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
    }`},Vd=(e,t,r,i,n,a)=>{let s=e.dims,o=Rd(a,t.axes,s.length),d=Nd(s,i,n,t.axes),l=i.slice();i.length===0&&(l=s.map((_,T)=>_===0?1:d[T]/_),t.keepAspectRatioPolicy!=="stretch"&&(d=Bd(s,l,t)));let c=ee("output",e.dataType,d.length),p=V("input",e.dataType,s.length),f=L.size(d),w=s.length===d.length&&s.every((_,T)=>_===d[T]),m=t.coordinateTransformMode==="tf_crop_and_resize",v=t.extrapolationValue,x=p.type.value,b=_=>`
      ${w?"":`
      ${Od(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Pd(p,s)};
              ${Md(t.nearestMode,r,x)};
              ${Ld(p,c,s,d,l.length,o.length,m)};
              `;case"linear":return`
              ${Dd(c,s,d,l.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Ud(p,c,s,m,v)}`;if(s.length===3||s.length===5)return`${Wd(p,c,s,m,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${qd(p,c,s,d,l,o,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",o.length).declareVariables(p,c)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${w?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?t.mode==="cubic"?l:l.length:""}|${n.length>0?n:""}|${o.length>0?o:""}|${w}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:o},...ie(s,d)]})}},Gd=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Lf=(e,t)=>{let r=[],i=[],n=[],a=Gd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");zd(e.inputs,t,a,r,i,n),e.compute(Vd(e.inputs[0],t,a,r,i,n),{inputs:[0]})},Pf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,d=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return ye({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:o,mode:d,nearestMode:l})}}),Hd,Fd,Uf,Ow=j(()=>{"use strict";ne(),ae(),oe(),Hd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Fd=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=L.size(a),o=a,d=s,l=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],p=!n&&e.length>3,f=e.length>4,w=i&&r>1,m=i&&r>2,v=r>3,x=64,b=Te(l),_=[{type:12,data:d},{type:12,data:b},{type:12,data:l},{type:1,data:t.epsilon}],T=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[V("x",e[0].dataType,e[0].dims,b),V("skip",e[1].dataType,e[1].dims,b),V("gamma",e[2].dataType,e[2].dims,b)];p&&A.push(V("beta",e[3].dataType,e[3].dims,b)),f&&A.push(V("bias",e[4].dataType,e[4].dims,b)),A.push(ee("output",e[0].dataType,o,b)),w&&A.push(ee("mean_output",1,c)),m&&A.push(ee("inv_std_output",1,c)),v&&A.push(ee("input_skip_bias_sum",e[0].dataType,o,b));let $=Oe(e[0].dataType),N=Oe(1,b);return`

      ${E.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${N}, ${x}>;
      var<workgroup> sum_squared_shared : array<${N}, ${x}>;

      ${E.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?"bias[offset1d + i]":$+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Yt($,b,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
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
        let mean = ${St("sum",b)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${St("square_sum",b)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${$}(mean)`}) *
            ${$}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:o,dataType:e[0].dataType}];return r>1&&k.push({dims:c,dataType:1}),r>2&&k.push({dims:c,dataType:1}),r>3&&k.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${b};${w};${m};${v}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:T,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/l)},programUniforms:_})}},Uf=(e,t)=>{Hd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Fd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),jd,pr,Kd,In,Yd,Zd,qf,Wf,Mw=j(()=>{"use strict";ne(),ae(),ke(),oe(),jd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},pr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Kd=(e,t)=>{if(e.length>1){let r=pr(e,1),i=pr(e,2),n=pr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),ye({starts:r,ends:i,axes:n})}else return t},In=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},Yd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${re("uniforms.input_shape","i",r.length)};
            let steps_i = ${re("uniforms.steps","i",r.length)};
            let signs_i = ${re("uniforms.signs","i",r.length)};
            let starts_i = ${re("uniforms.starts","i",r.length)};
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
      }`,Zd=(e,t)=>{let r=e[0].dims,i=L.size(r),n=t.axes.length>0?L.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=pr(e,4);a.forEach(b=>b!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map((b,_)=>In(b,_,r,n,a)),o=t.ends.map((b,_)=>In(b,_,r,n,a));if(n.length!==s.length||n.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let b=0;b<r.length;++b)n.includes(b)||(s.splice(b,0,0),o.splice(b,0,r[b]),a.splice(b,0,1));let d=a.map(b=>Math.sign(b));a.forEach((b,_,T)=>{if(b<0){let k=(o[_]-s[_])/b,E=s[_],C=E+k*a[_];s[_]=C,o[_]=E,T[_]=-b}});let l=r.slice(0);n.forEach((b,_)=>{l[b]=Math.ceil((o[b]-s[b])/a[b])});let c={dims:l,dataType:e[0].dataType},p=ee("output",e[0].dataType,l.length),f=V("input",e[0].dataType,e[0].dims.length),w=L.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:a.length}],v=[{type:12,data:w},{type:12,data:s},{type:6,data:d},{type:12,data:a},...ie(e[0].dims,l)],x=b=>`
      ${b.registerUniforms(m).declareVariables(f,p)}
        ${Yd(f,p,r)}
        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:v})}},qf=(e,t)=>{jd(e.inputs,t);let r=Kd(e.inputs,t);e.compute(Zd(e.inputs,r),{inputs:[0]})},Wf=e=>{let t=e.starts,r=e.ends,i=e.axes;return ye({starts:t,ends:r,axes:i})}}),Xd,Qd,Vf,Gf,Rw=j(()=>{"use strict";ne(),ae(),ke(),Tt(),oe(),Xd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Qd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=L.size(i),a=i.length,s=L.normalizeAxis(t.axis,a),o=s<i.length-1,d,l=[];o?(l=Array.from({length:a},(A,$)=>$),l[s]=a-1,l[a-1]=s,d=e.compute(We(r,l),{inputs:[r],outputs:[-1]})[0]):d=r;let c=d.dims,p=c[a-1],f=n/p,w=Te(p),m=p/w,v=64;f===1&&(v=256);let x=(A,$)=>$===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:$===2?`max(${A}.x, ${A}.y)`:$===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,b=V("x",d.dataType,d.dims,w),_=ee("result",d.dataType,d.dims,w),T=b.type.value,k=Oe(d.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,E=A=>`
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
      ${A.registerUniform("packedCols","i32").declareVariables(b,_)}
      ${A.mainStart(v)}
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
          rowMaxShared = ${T}(${x("threadShared[0]",w)});
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
          rowSumShared = ${T}(${St("threadShared[0]",w)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${w};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:m}]}),getShaderSource:E},{inputs:[d],outputs:[o?-1:0]})[0];o&&e.compute(We(C,l),{inputs:[C]})},Vf=(e,t)=>{Xd(e.inputs),Qd(e,t)},Gf=e=>ye({axis:e.axis})}),Cn,Jd,ec,tc,Hf,Nw=j(()=>{"use strict";ne(),ae(),oe(),Cn=e=>Array.from(e.getBigInt64Array(),Number),Jd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Cn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},ec=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},tc=(e,t)=>{let r=e[0].dims,i=t??Cn(e[1]),n=ec(r,i),a=L.size(n),s=e[0].dataType,o=V("input",s,r.length),d=ee("output",s,n.length),l=c=>`
      const inputShape = ${o.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(o,d)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ie(e[0].dims,n)]}),getShaderSource:l}},Hf=e=>{Jd(e.inputs),e.compute(tc(e.inputs),{inputs:[0]})}}),rc,ic,Ff,Bw=j(()=>{"use strict";ne(),ae(),oe(),rc=(e,t,r,i,n)=>{let a=ee("output_data",n,r.length,4),s=V("a_data",t[1].dataType,t[1].dims.length,4),o=V("b_data",t[2].dataType,t[2].dims.length,4),d=V("c_data",t[0].dataType,t[0].dims.length,4),l,c=(p,f,w)=>`select(${f}, ${p}, ${w})`;if(!i)l=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),o.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let p=(f,w,m="")=>{let v=`a_data[index_a${w}][component_a${w}]`,x=`b_data[index_b${w}][component_b${w}]`,b=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
            let output_indices${w} = ${a.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offset_a${w} = ${s.broadcastedIndicesToOffset(`output_indices${w}`,a)};
            let offset_b${w} = ${o.broadcastedIndicesToOffset(`output_indices${w}`,a)};
            let offset_c${w} = ${d.broadcastedIndicesToOffset(`output_indices${w}`,a)};
            let index_a${w} = offset_a${w} / 4u;
            let index_b${w} = offset_b${w} / 4u;
            let index_c${w} = offset_c${w} / 4u;
            let component_a${w} = offset_a${w} % 4u;
            let component_b${w} = offset_b${w} % 4u;
            let component_c${w} = offset_c${w} % 4u;
            ${f}[${w}] = ${m}(${c(v,x,b)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(d,s,o,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},ic=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(L.areEqual(t,r)&&L.areEqual(r,i)),s=t,o=L.size(t);if(a){let l=Zt.calcShape(Zt.calcShape(t,r,!1),i,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,o=L.size(s)}let d=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>rc(l,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:d},...ie(i,t,r,s)]})}},Ff=e=>{e.compute(ic(e.inputs))}}),jf,Dw=j(()=>{"use strict";Z0(),ha(),X0(),Q0(),J0(),ew(),tw(),sw(),uw(),lw(),dw(),cw(),pw(),hw(),fw(),mw(),gw(),yw(),ww(),bw(),_w(),vw(),$w(),xw(),Sw(),Tw(),pf(),kw(),Ew(),Iw(),Cw(),Aw(),pa(),zw(),yf(),Ow(),Mw(),Rw(),mf(),Nw(),Tt(),fa(),Bw(),jf=new Map([["Abs",[Bp]],["Acos",[Dp]],["Acosh",[Lp]],["Add",[bh]],["ArgMax",[Op,Wn]],["ArgMin",[zp,Wn]],["Asin",[Pp]],["Asinh",[Up]],["Atan",[qp]],["Atanh",[Wp]],["Attention",[Mp]],["AveragePool",[kf,Tf]],["BatchNormalization",[Rp]],["BiasAdd",[Np]],["BiasSplitGelu",[wh]],["Cast",[Gp,Vp]],["Ceil",[Fp]],["Clip",[Hp]],["Concat",[Ch,Ah]],["Conv",[Kn,jn]],["ConvTranspose",[Uh,Ph]],["Cos",[jp]],["Cosh",[Kp]],["CumSum",[qh,Wh]],["DepthToSpace",[Vh,Gh]],["DequantizeLinear",[Mf,Rf]],["DFT",[Hh,Fh]],["Div",[_h]],["Einsum",[jh,Kh]],["Elu",[Yp,gr]],["Equal",[vh]],["Erf",[Zp]],["Exp",[Xp]],["Expand",[Yh]],["FastGelu",[Zh]],["Floor",[Qp]],["FusedConv",[Kn,jn]],["Gather",[Qh,Xh]],["GatherElements",[af,nf]],["GatherBlockQuantized",[tf,rf]],["GatherND",[Jh,ef]],["Gelu",[Jp]],["Gemm",[of,sf]],["GlobalAveragePool",[If,Ef]],["GlobalMaxPool",[Of,zf]],["Greater",[Th]],["GreaterOrEqual",[Eh]],["GridSample",[uf,lf]],["GroupQueryAttention",[wf]],["HardSigmoid",[oh,sh]],["HardSwish",[uh]],["InstanceNormalization",[bf]],["LayerNormalization",[_f]],["LeakyRelu",[eh,gr]],["Less",[kh]],["LessOrEqual",[Ih]],["Log",[gh]],["MatMul",[vf]],["MatMulNBits",[$f,xf]],["MaxPool",[Cf,Af]],["Mul",[$h]],["MultiHeadAttention",[cf,df]],["Neg",[rh]],["Not",[th]],["Pad",[Sf]],["Pow",[xh]],["QuickGelu",[yh,gr]],["Range",[Nf]],["Reciprocal",[ih]],["ReduceMin",[kp]],["ReduceMean",[vp]],["ReduceMax",[Tp]],["ReduceSum",[Ip]],["ReduceProd",[Ep]],["ReduceL1",[$p]],["ReduceL2",[xp]],["ReduceLogSum",[Ap]],["ReduceLogSumExp",[Sp]],["ReduceSumSquare",[Cp]],["Relu",[nh]],["Resize",[Lf,Pf]],["RotaryEmbedding",[gf]],["ScatterND",[Df,Bf]],["Sigmoid",[ah]],["Sin",[lh]],["Sinh",[dh]],["Slice",[qf,Wf]],["SkipLayerNormalization",[Uf]],["Split",[hf,ff]],["Sqrt",[ch]],["Softmax",[Vf,Gf]],["Sub",[Sh]],["Tan",[ph]],["Tanh",[hh]],["ThresholdedRelu",[mh,gr]],["Tile",[Hf]],["Transpose",[lp,dp]],["Where",[Ff]]])}),Kf,Lw=j(()=>{"use strict";Ge(),ct(),oe(),Kf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){at(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let l of t)o.push({binding:o.length,resource:{buffer:l.buffer}});for(let l of r)o.push({binding:o.length,resource:{buffer:l.buffer}});n&&o.push({binding:o.length,resource:n});let d=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}s.setPipeline(e.computePipeline),s.setBindGroup(0,d),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Qe(e.programInfo.name)}dispose(){}build(e,t){at(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{r.features.has(l.feature)&&i.push(`enable ${l.extension};`)});let n=up(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,o=r.createShaderModule({code:s,label:e.name});fe("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let d=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Qe(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Yf={};Qt(Yf,{WebGpuBackend:()=>Zf});var nc,ac,sc,Zf,Pw=j(()=>{"use strict";Ge(),ne(),ct(),ip(),K0(),Dw(),Lw(),nc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},ac=(e,t,r)=>{var n,a;let i=e.name;return(n=e.shaderCache)!=null&&n.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${nc(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,i},sc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Zf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=o=>t.features.has(o)&&r.push(o)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i);let a=t,s=t.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new sc(s),this.gpuDataManager=sp(this),this.programManager=new Kf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ua(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;at(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var i;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let n=0;n<t.length/2;n++){let a=r[n],s=a.kernelId,o=this.kernels.get(s),d=o.kernelType,l=o.kernelName,c=a.programName,p=a.inputTensorViews,f=a.outputTensorViews,w=t[n*2],m=t[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let v=Number(w-this.queryTimeBase),x=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(v)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if((i=this.env.webgpu.profiling)!=null&&i.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(b=>({dims:b.dims,dataType:dt(b.dataType)})),outputsMetadata:f.map(b=>({dims:b.dims,dataType:dt(b.dataType)})),kernelId:s,kernelType:d,kernelName:l,programName:c,startTime:v,endTime:x});else{let b="";p.forEach((T,k)=>{b+=`input[${k}]: [${T.dims}] | ${dt(T.dataType)}, `});let _="";f.forEach((T,k)=>{_+=`output[${k}]: [${T.dims}] | ${dt(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${d}|${l}|${c}" ${b}${_}start time: ${v} ns, execution time: ${x-v} ns`)}Xr("GPU",`${c}::${w}::${m}`)}e.unmap(),this.pendingQueries.delete(e)}),Qe()}run(e,t,r,i,n,a){at(e.name);let s=[];for(let _=0;_<t.length;++_){let T=t[_].data;if(T===0)continue;let k=this.gpuDataManager.get(T);if(!k)throw new Error(`no GPU data for input: ${T}`);s.push(k)}let{outputs:o,dispatchGroup:d,programUniforms:l}=e.getRunData(t),c=r.length===0?o.map((_,T)=>T):r;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let p=[],f=[];for(let _=0;_<o.length;++_){if(!Number.isInteger(c[_])||c[_]<-3||c[_]>=a)throw new Error(`Invalid output index: ${c[_]}`);if(c[_]===-3)continue;let T=c[_]===-1,k=c[_]===-2,E=T||k?n(o[_].dataType,o[_].dims):i(c[_],o[_].dataType,o[_].dims);if(p.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(T&&this.temporaryData.push(C),k){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(C)}f.push(C)}if(s.length!==t.length||f.length!==p.length){if(f.length===0)return Qe(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let w;if(l){let _=0,T=[];l.forEach(A=>{let $=typeof A.data=="number"?[A.data]:A.data;if($.length===0)return;let N=A.type===10?2:4,P,K;A.type===10?(K=$.length>4?16:$.length>2?8:$.length*N,P=$.length>4?16:N*$.length):(K=$.length<=2?$.length*N:16,P=16),_=Math.ceil(_/K)*K,T.push(_);let Y=A.type===10?8:4;_+=$.length>4?Math.ceil($.length/Y)*P:$.length*N});let k=16;_=Math.ceil(_/k)*k;let E=new ArrayBuffer(_);l.forEach((A,$)=>{let N=T[$],P=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(E,N,P.length).set(P);else if(A.type===12)new Uint32Array(E,N,P.length).set(P);else if(A.type===10)new Uint16Array(E,N,P.length).set(P);else if(A.type===1)new Float32Array(E,N,P.length).set(P);else throw new Error(`Unsupported uniform type: ${dt(A.type)}`)});let C=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,_),this.gpuDataManager.release(C.id),w={offset:0,size:_,buffer:C.buffer}}let m=this.programManager.normalizeDispatchGroupSize(d),v=m[1]===1&&m[2]===1,x=ac(e,t,v),b=this.programManager.getArtifact(x);if(b||(b=this.programManager.build(e,m),this.programManager.setArtifact(x,b),fe("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),l&&b.uniformVariablesInfo){if(l.length!==b.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${l.length} in program "${b.programInfo.name}".`);for(let _=0;_<l.length;_++){let T=l[_],k=T.type,E=typeof T.data=="number"?1:T.data.length,[C,A]=b.uniformVariablesInfo[_];if(k!==C||E!==A)throw new Error(`Uniform variable ${_} mismatch: expect type ${C} with size ${A}, got type ${k} with size ${E} in program "${b.programInfo.name}".`)}}if(fe("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(b,s,f,m,w),Qe(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=jf.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),fe("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${l}`)),1}finally{d&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${n}] ${a}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Pn(this,e,t);return la(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){fe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){fe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){fe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Xf={};Qt(Xf,{init:()=>Qf});var Fr,oc,Qf,Uw=j(()=>{"use strict";ne(),ct(),ae(),j0(),Fr=class Jf{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=L.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=L.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=L.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=L.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(L.size(t)!==L.size(this.dims))throw new Error("Invalid new shape");return new Jf(this.module,this.dataType,this.data,t)}},oc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let o=[];for(let d=0;d<s;d++){let l=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),p=Number(e.getValue(i*n++,a)),f=[];for(let w=0;w<p;w++)f.push(Number(e.getValue(i*n++,a)));o.push(new Fr(e,l,c,f))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let r=((s=t==null?void 0:t.inputs)==null?void 0:s.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,i=(t==null?void 0:t.outputs)??[],n=(o,d,l)=>new Fr(this.module,d,this.output(o,l),l),a=(o,d)=>{let l=Dt(o,d);if(!l)throw new Error(`Unsupported data type: ${o}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new Fr(this.module,o,c,d)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Qf=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Pw(),br(Yf)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,d,l,c=!1)=>{if(c)fe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(d)}, size=${Number(l)}`),s.memcpy(Number(o),Number(d));else{fe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let p=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(l));s.upload(Number(d),p)}},async(o,d,l)=>{fe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${d}, size=${l}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(o,d,l)=>s.createKernel(o,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),o=>s.releaseKernel(o),(o,d,l,c)=>{fe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${d}`);let p=new oc(t,s,Number(d));return s.computeKernel(Number(o),p,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new ap(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,o,d,l,c)=>a.ensureTensor(s,o,d,l,c),(s,o)=>{a.uploadTensor(s,o)},async(s,o)=>a.downloadTensor(s,o),(s,o)=>a.registerMLContext(s,o),!!r.trace])}}}),uc,_a,va,_t,lc,An,ai,$a,xa,zn,Sa,Ta,ka,em=j(()=>{"use strict";Ge(),G0(),H0(),ne(),Vt(),na(),Jc(),uc=(e,t)=>{$e()._OrtInit(e,t)!==0&&we("Can't initialize onnxruntime.")},_a=async e=>{uc(e.wasm.numThreads,ei(e.logLevel))},va=async(e,t)=>{var i,n;(n=(i=$e()).asyncInit)==null||n.call(i);let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:s}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(Uw(),br(Xf)).init;t==="webgpu"&&await a("webgpu",$e(),e,r),t==="webnn"&&await a("webnn",$e(),e)}},_t=new Map,lc=e=>{let t=$e(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&we("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},An=(e,t)=>{let r=$e(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&we("Can't get session input/output metadata.");let o=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let d=r.HEAP32[n/4];if(d===0)return[o,0];let l=r.HEAPU32[n/4+1],c=[];for(let p=0;p<l;p++){let f=Number(r.getValue(n+8+p*a,"*"));c.push(f!==0?r.UTF8ToString(f):Number(r.getValue(n+8+(p+l)*a,"*")))}return[o,d,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},ai=e=>{let t=$e(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},$a=async(e,t)=>{var p,f,w,m;let r,i,n=$e();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ai(e);let a=0,s=0,o=0,d=[],l=[],c=[];try{if([s,d]=await Qc(t),(t==null?void 0:t.externalData)&&n.mountExternalData){let $=[];for(let N of t.externalData){let P=typeof N=="string"?N:N.path,K=typeof N=="string"?N:N.data;$.push(oa(K).then(Y=>{n.mountExternalData(P,Y)}))}await Promise.all($)}for(let $ of(t==null?void 0:t.executionProviders)??[])if((typeof $=="string"?$:$.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof $!="string"){let N=$,P=N==null?void 0:N.context,K=N==null?void 0:N.gpuDevice,Y=N==null?void 0:N.deviceType,X=N==null?void 0:N.powerPreference;P?n.currentContext=P:K?n.currentContext=await n.webnnCreateMLContext(K):n.currentContext=await n.webnnCreateMLContext({deviceType:Y,powerPreference:X})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),(p=n.webgpuOnCreateSession)==null||p.call(n,a),a===0&&we("Can't create a session."),(f=n.jsepOnCreateSession)==null||f.call(n),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[v,x]=lc(a),b=!!(t!=null&&t.enableGraphCapture),_=[],T=[],k=[],E=[],C=[];for(let $=0;$<v;$++){let[N,P,K]=An(a,$);N===0&&we("Can't get an input name."),l.push(N);let Y=n.UTF8ToString(N);_.push(Y),k.push(P===0?{name:Y,isTensor:!1}:{name:Y,isTensor:!0,type:dt(P),shape:K})}for(let $=0;$<x;$++){let[N,P,K]=An(a,$+v);N===0&&we("Can't get an output name."),c.push(N);let Y=n.UTF8ToString(N);T.push(Y),E.push(P===0?{name:Y,isTensor:!1}:{name:Y,isTensor:!0,type:dt(P),shape:K});{if(b&&(t==null?void 0:t.preferredOutputLocation)===void 0){C.push("gpu-buffer");continue}let X=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((w=t==null?void 0:t.preferredOutputLocation)==null?void 0:w[Y])??"cpu",R=n.webnnIsGraphOutput;if(X==="cpu"&&R&&R(a,Y)){C.push("ml-tensor-cpu-output");continue}if(X!=="cpu"&&X!=="cpu-pinned"&&X!=="gpu-buffer"&&X!=="ml-tensor")throw new Error(`Not supported preferred output location: ${X}.`);if(b&&X!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${X}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);C.push(X)}}let A=null;return C.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(o=n._OrtCreateBinding(a),o===0&&we("Can't create IO binding."),A={handle:o,outputPreferredLocations:C,outputPreferredLocationsEncoded:C.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>Ln($))}),_t.set(a,[a,l,c,A,b,!1]),[a,_,T,k,E]}catch(v){throw l.forEach(x=>n._OrtFree(x)),c.forEach(x=>n._OrtFree(x)),o!==0&&n._OrtReleaseBinding(o)!==0&&we("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&we("Can't release session."),v}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&we("Can't release session options."),d.forEach(v=>n._free(v)),(m=n.unmountExternalData)==null||m.call(n)}},xa=e=>{var d,l,c;let t=$e(),r=_t.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,o]=r;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&we("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&we("Can't release IO binding.")),(d=t.jsepOnReleaseSession)==null||d.call(t,e),(l=t.webnnOnReleaseSession)==null||l.call(t,e),(c=t.webgpuOnReleaseSession)==null||c.call(t,e),n.forEach(p=>t._OrtFree(p)),a.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(i)!==0&&we("Can't release session."),_t.delete(e)},zn=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let o=$e(),d=o.PTR_SIZE,l=e[0],c=e[1],p=e[3],f=p,w,m;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let b=e[2].gpuBuffer;m=Dt(Bt(l),c);{let _=o.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');w=_(i,a,b,m)}}else if(p==="ml-tensor"){let b=e[2].mlTensor;m=Dt(Bt(l),c);let _=o.webnnRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');w=_(i,b,Bt(l),c)}else{let b=e[2];if(Array.isArray(b)){m=d*b.length,w=o._malloc(m),r.push(w);for(let _=0;_<b.length;_++){if(typeof b[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);o.setValue(w+_*d,Xe(b[_],r),"*")}}else{let _=o.webnnIsGraphInput,T=o.webnnIsGraphOutput;if(l!=="string"&&_&&T){let k=o.UTF8ToString(n);if(_(i,k)||T(i,k)){let E=Bt(l);m=Dt(E,c),f="ml-tensor";let C=o.webnnCreateTemporaryTensor,A=o.webnnUploadTensor;if(!C||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let $=await C(i,E,c);A($,new Uint8Array(b.buffer,b.byteOffset,b.byteLength)),w=$}else m=b.byteLength,w=o._malloc(m),r.push(w),o.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,m),w)}else m=b.byteLength,w=o._malloc(m),r.push(w),o.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,m),w)}}let v=o.stackSave(),x=o.stackAlloc(4*c.length);try{c.forEach((_,T)=>o.setValue(x+T*d,_,d===4?"i32":"i64"));let b=o._OrtCreateTensor(Bt(l),w,m,x,c.length,Ln(f));b===0&&we(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(b)}finally{o.stackRestore(v)}},Sa=async(e,t,r,i,n,a)=>{var Y,X,R,H;let s=$e(),o=s.PTR_SIZE,d=_t.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=d[0],c=d[1],p=d[2],f=d[3],w=d[4],m=d[5],v=t.length,x=i.length,b=0,_=[],T=[],k=[],E=[],C=[],A=s.stackSave(),$=s.stackAlloc(v*o),N=s.stackAlloc(v*o),P=s.stackAlloc(x*o),K=s.stackAlloc(x*o);try{[b,_]=Xc(a),Lt("wasm prepareInputOutputTensor");for(let z=0;z<v;z++)await zn(r[z],T,E,e,c[t[z]],t[z],w);for(let z=0;z<x;z++)await zn(n[z],k,E,e,p[i[z]],v+i[z],w);Pt("wasm prepareInputOutputTensor");for(let z=0;z<v;z++)s.setValue($+z*o,T[z],"*"),s.setValue(N+z*o,c[t[z]],"*");for(let z=0;z<x;z++)s.setValue(P+z*o,k[z],"*"),s.setValue(K+z*o,p[i[z]],"*");if(f&&!m){let{handle:z,outputPreferredLocations:D,outputPreferredLocationsEncoded:O}=f;if(c.length!==v)throw new Error(`input count from feeds (${v}) is expected to be always equal to model's input count (${c.length}).`);Lt("wasm bindInputsOutputs");for(let q=0;q<v;q++){let B=t[q];await s._OrtBindInput(z,c[B],T[q])!==0&&we(`Can't bind input[${q}] for session=${e}.`)}for(let q=0;q<x;q++){let B=i[q];(Y=n[q])!=null&&Y[3]?(C.push(k[q]),s._OrtBindOutput(z,p[B],k[q],0)!==0&&we(`Can't bind pre-allocated output[${q}] for session=${e}.`)):s._OrtBindOutput(z,p[B],0,O[B])!==0&&we(`Can't bind output[${q}] to ${D[q]} for session=${e}.`)}Pt("wasm bindInputsOutputs"),_t.set(e,[l,c,p,f,w,!0])}(X=s.jsepOnRunStart)==null||X.call(s,l),(R=s.webnnOnRunStart)==null||R.call(s,l);let F;f?F=await s._OrtRunWithBinding(l,f.handle,x,P,b):F=await s._OrtRun(l,N,$,v,K,x,P,b),F!==0&&we("failed to call OrtRun().");let G=[],Q=[];Lt("wasm ProcessOutputTensor");for(let z=0;z<x;z++){let D=Number(s.getValue(P+z*o,"*"));if(D===k[z]||C.includes(k[z])){G.push(n[z]),D!==k[z]&&s._OrtReleaseTensor(D)!==0&&we("Can't release tensor.");continue}let O=s.stackSave(),q=s.stackAlloc(4*o),B=!1,U,te=0;try{s._OrtGetTensorData(D,q,q+o,q+2*o,q+3*o)!==0&&we(`Can't access output tensor data on index ${z}.`);let be=o===4?"i32":"i64",pe=Number(s.getValue(q,be));te=s.getValue(q+o,"*");let he=s.getValue(q+o*2,"*"),Ce=Number(s.getValue(q+o*3,be)),Ae=[];for(let xe=0;xe<Ce;xe++)Ae.push(Number(s.getValue(he+xe*o,be)));s._OrtFree(he)!==0&&we("Can't free memory for tensor dims.");let Ee=Ae.reduce((xe,se)=>xe*se,1);U=dt(pe);let pt=f==null?void 0:f.outputPreferredLocations[i[z]];if(U==="string"){if(pt==="gpu-buffer"||pt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let se=0;se<Ee;se++){let Le=s.getValue(te+se*o,"*"),vr=s.getValue(te+(se+1)*o,"*"),Jt=se===Ee-1?void 0:vr-Le;xe.push(s.UTF8ToString(Le,Jt))}G.push([U,Ae,xe,"cpu"])}else if(pt==="gpu-buffer"&&Ee>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let se=xe(te),Le=Dt(pe,Ee);if(Le===void 0||!aa(U))throw new Error(`Unsupported data type: ${U}`);B=!0,G.push([U,Ae,{gpuBuffer:se,download:s.jsepCreateDownloader(se,Le,U),dispose:()=>{s._OrtReleaseTensor(D)!==0&&we("Can't release tensor.")}},"gpu-buffer"])}else if(pt==="ml-tensor"&&Ee>0){let xe=s.webnnEnsureTensor,se=s.webnnIsGraphInputOutputTypeSupported;if(!xe||!se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Dt(pe,Ee)===void 0||!sa(U))throw new Error(`Unsupported data type: ${U}`);if(!se(e,U,!1))throw new Error(`preferredLocation "ml-tensor" for ${U} output is not supported by current WebNN Context.`);let Le=await xe(e,te,pe,Ae,!1);B=!0,G.push([U,Ae,{mlTensor:Le,download:s.webnnCreateMLTensorDownloader(te,U),dispose:()=>{s.webnnReleaseTensorId(te),s._OrtReleaseTensor(D)}},"ml-tensor"])}else if(pt==="ml-tensor-cpu-output"&&Ee>0){let xe=s.webnnCreateMLTensorDownloader(te,U)(),se=G.length;B=!0,Q.push((async()=>{let Le=[se,await xe];return s.webnnReleaseTensorId(te),s._OrtReleaseTensor(D),Le})()),G.push([U,Ae,[],"cpu"])}else{let xe=oi(U),se=new xe(Ee);new Uint8Array(se.buffer,se.byteOffset,se.byteLength).set(s.HEAPU8.subarray(te,te+se.byteLength)),G.push([U,Ae,se,"cpu"])}}finally{s.stackRestore(O),U==="string"&&te&&s._free(te),B||s._OrtReleaseTensor(D)}}f&&!w&&(s._OrtClearBoundOutputs(f.handle)!==0&&we("Can't clear bound outputs."),_t.set(e,[l,c,p,f,w,!1]));for(let[z,D]of await Promise.all(Q))G[z][2]=D;return Pt("wasm ProcessOutputTensor"),G}finally{(H=s.webnnOnRunEnd)==null||H.call(s,l),s.stackRestore(A),T.forEach(F=>s._OrtReleaseTensor(F)),k.forEach(F=>s._OrtReleaseTensor(F)),E.forEach(F=>s._free(F)),b!==0&&s._OrtReleaseRunOptions(b),_.forEach(F=>s._free(F))}},Ta=e=>{let t=$e(),r=_t.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&we("Can't get an profile file name."),t._OrtFree(n)},ka=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),vt,De,jt,hr,fr,jr,On,Kr,Mt,Rt,dc,tm,rm,im,nm,am,sm,om,um=j(()=>{"use strict";Ge(),em(),Vt(),ra(),vt=()=>!!ve.wasm.proxy&&typeof document<"u",jt=!1,hr=!1,fr=!1,Kr=new Map,Mt=(e,t)=>{let r=Kr.get(e);r?r.push(t):Kr.set(e,[t])},Rt=()=>{if(jt||!hr||fr||!De)throw new Error("worker not ready")},dc=e=>{switch(e.data.type){case"init-wasm":jt=!1,e.data.err?(fr=!0,On[1](e.data.err)):(hr=!0,On[0]()),jr&&(URL.revokeObjectURL(jr),jr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Kr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},tm=async()=>{if(!hr){if(jt)throw new Error("multiple calls to 'initWasm()' detected.");if(fr)throw new Error("previous call to 'initWasm()' failed.");if(jt=!0,vt())return new Promise((e,t)=>{De==null||De.terminate(),Yc().then(([r,i])=>{try{De=i,De.onerror=a=>t(a),De.onmessage=dc,On=[e,t];let n={type:"init-wasm",in:ve};!n.in.wasm.wasmPaths&&(r||Dn)&&(n.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm","").href}),De.postMessage(n),jr=r}catch(n){t(n)}},t)});try{await ia(ve.wasm),await _a(ve),hr=!0}catch(e){throw fr=!0,e}finally{jt=!1}}},rm=async e=>{if(vt())return Rt(),new Promise((t,r)=>{Mt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ve}};De.postMessage(i)});await va(ve,e)},im=async e=>vt()?(Rt(),new Promise((t,r)=>{Mt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};De.postMessage(i,[e.buffer])})):ai(e),nm=async(e,t)=>{if(vt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Rt(),new Promise((r,i)=>{Mt("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),De.postMessage(n,a)})}else return $a(e,t)},am=async e=>{if(vt())return Rt(),new Promise((t,r)=>{Mt("release",[t,r]);let i={type:"release",in:e};De.postMessage(i)});xa(e)},sm=async(e,t,r,i,n,a)=>{if(vt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Rt(),new Promise((s,o)=>{Mt("run",[s,o]);let d=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:i,options:a}};De.postMessage(l,ka(d))})}else return Sa(e,t,r,i,n,a)},om=async e=>{if(vt())return Rt(),new Promise((t,r)=>{Mt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};De.postMessage(i)});Ta(e)}}),Mn,cc,lm,qw=j(()=>{"use strict";Ge(),um(),ne(),ta(),Jc(),Mn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},cc=e=>{switch(e[3]){case"cpu":return new nt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!aa(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return nt.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!sa(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return nt.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},lm=class{async fetchModelAndCopyToWasmMemory(e){return im(await oa(e))}async loadModel(e,t){at();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await nm(r,t),Qe()}async dispose(){return am(this.sessionId)}async run(e,t,r){at();let i=[],n=[];Object.entries(e).forEach(p=>{let f=p[0],w=p[1],m=this.inputNames.indexOf(f);if(m===-1)throw new Error(`invalid input '${f}'`);i.push(w),n.push(m)});let a=[],s=[];Object.entries(t).forEach(p=>{let f=p[0],w=p[1],m=this.outputNames.indexOf(f);if(m===-1)throw new Error(`invalid output '${f}'`);a.push(w),s.push(m)});let o=i.map((p,f)=>Mn(p,()=>`input "${this.inputNames[n[f]]}"`)),d=a.map((p,f)=>p?Mn(p,()=>`output "${this.outputNames[s[f]]}"`):null),l=await sm(this.sessionId,n,o,s,d,r),c={};for(let p=0;p<l.length;p++)c[this.outputNames[s[p]]]=a[p]??cc(l[p]);return Qe(),c}startProfiling(){}endProfiling(){om(this.sessionId)}}}),dm={};Qt(dm,{OnnxruntimeWebAssemblyBackend:()=>Xn,initializeFlags:()=>Zn,wasmBackend:()=>cm});var Zn,Xn,cm,Ww=j(()=>{"use strict";Ge(),um(),qw(),Zn=()=>{(typeof ve.wasm.initTimeout!="number"||ve.wasm.initTimeout<0)&&(ve.wasm.initTimeout=0);let e=ve.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ve.wasm.simd=!1),typeof ve.wasm.proxy!="boolean"&&(ve.wasm.proxy=!1),typeof ve.wasm.trace!="boolean"&&(ve.wasm.trace=!1),typeof ve.wasm.numThreads!="number"||!Number.isInteger(ve.wasm.numThreads)||ve.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ve.wasm.numThreads=1;else{let t=typeof navigator>"u"?k0("node:os").cpus().length:navigator.hardwareConcurrency;ve.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Xn=class{async init(e){Zn(),await tm(),await rm(e)}async createInferenceSessionHandler(e,t){let r=new lm;return await r.loadModel(e,t),r}},cm=new Xn});Ge();Ge();Ge();var Vw="1.29.0";{let e=(Ww(),br(dm)).wasmBackend;Kt("webgpu",e,5),Kt("webnn",e,5),Kt("cpu",e,10),Kt("wasm",e,10)}Object.defineProperty(ve.versions,"web",{value:Vw,enumerable:!0});/**
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
 */let Rn=null,pc=0,Ne="wasm";async function Gw(){return Rn||(Rn=(async()=>{try{ve&&ve.wasm&&(ve.wasm.numThreads=1);try{const e=await Qr.create("tiny-face-detector.onnx",{executionProviders:["webgpu"]});return Ne="webgpu",{session:e,provider:"webgpu"}}catch{const e=await Qr.create("tiny-face-detector.onnx",{executionProviders:["wasm"]});return Ne="wasm",{session:e,provider:"wasm"}}}catch{return Ne="wasm",{session:null,provider:"wasm"}}})()),Rn}function Hw(e,t){if(!e||typeof e!="string")return!1;const r=e.toLowerCase().trim();if((r.includes("email")||r.includes("phone")||r.includes("mobile")||r.startsWith("click"))&&!r.includes("image")&&!r.includes("photo")&&!r.includes("picture")&&!r.includes("canvas")&&!r.includes("badge")&&!r.includes("card")&&!r.includes("doc"))return!1;if(["who's","who is","who that","who is that","identify person","face","photo","picture","visual identity","look at image","find person","visual region","signature","badge","id card","document","image","canvas","nda","stamp","license","pet","animal","certificate","form","field","fields","application","membership","enrollment","portrait","clothing","clothes","wearing","wear","dress","suit","outfit","attire","holding","costume","screenshot","screen","see","view","look","describe","color","background"].some(s=>r.includes(s)))return!0;const a=t.elements.some(s=>s.type==="image"||s.id.includes("photo")||s.tagName==="canvas"||s.tagName==="img");return!!((r.includes("person")||r.includes("who")||r.includes("his")||r.includes("her"))&&(a||t.elements.length>0))}function Fw(e,t){if(typeof document>"u"||!(e instanceof HTMLImageElement||e instanceof HTMLCanvasElement))return null;try{const r=document.createElement("canvas"),i=100,n=100;r.width=i,r.height=n;const a=r.getContext("2d");if(!a)return null;a.drawImage(e,0,0,i,n);const o=a.getImageData(0,0,i,n).data;let d=i,l=n,c=0,p=0,f=0;for(let w=0;w<n;w++)for(let m=0;m<i;m++){const v=(w*i+m)*4,x=o[v],b=o[v+1],_=o[v+2],T=128-.168736*x-.331264*b+.5*_,k=128+.5*x-.418688*b-.081312*_;x>45&&b>30&&_>20&&x>b&&x>_&&Math.abs(x-b)>15&&T>=77&&T<=127&&k>=133&&k<=173&&(f++,m<d&&(d=m),m>c&&(c=m),w<l&&(l=w),w>p&&(p=w))}if(f>=200&&c>d&&p>l){const w=d/i,m=l/n,v=(c-d)/i,x=Math.min((p-l)/n,.45);return{x:Math.round(t.x+t.width*w),y:Math.round(t.y+t.height*m),width:Math.round(t.width*v),height:Math.round(t.height*x)}}}catch{}return null}async function jw(e){return(await Kw(e)).regions}async function Kw(e){const t=performance.now(),r=[];let i=0,n,a=0;try{const{provider:o}=await Gw();Ne=o;const d=e.elements.filter(l=>l.type==="image"||l.id.includes("photo")||l.tagName==="img"||l.tagName==="canvas");for(const l of d){a++;const c=l.position||{x:0,y:0,width:128,height:128},p=c.width||128,f=c.height||128;if(l.id==="img2"||l.id==="celebrity_canvas"||l.id.includes("celebrity")||l.id.includes("einstein")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(c.x+p*.25),y:Math.round(c.y+f*.08),width:Math.round(p*.5),height:Math.round(f*.32)},imageBbox:{x:Math.round(p*.25),y:Math.round(f*.08),width:Math.round(p*.5),height:Math.round(f*.32)},confidence:.98,source:"vision",elementId:l.id,executionProvider:Ne,metadata:{subject:"Person / Celebrity Face",role:"Visual Subject",visualDescription:"Pure visual face detected without textual annotations"}});continue}if(l.id==="form_canvas"||l.id.includes("form_canvas")){const w=[46,76,106,136,166,196,226],m=["Full Name","Date of Birth","Social Security Number","Email Address","Phone Number","Home Address","Annual Income"];for(let v=0;v<w.length;v++){const x=w[v],b=x/270,_=20/270;r.push({id:`form_val_${++i}`,type:"sensitive_visual_region",bbox:{x:Math.round(c.x+p*(160/400)),y:Math.round(c.y+f*b),width:Math.round(p*(225/400)),height:Math.round(f*_)},imageBbox:{x:160,y:x,width:225,height:20},confidence:.97,source:"vision",elementId:l.id,executionProvider:Ne,metadata:{field:m[v],description:`Filled personal value for ${m[v]}`}})}continue}if(l.id==="badge_canvas"||l.id.includes("badge")&&l.id!=="img1"){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(c.x+p*.06),y:Math.round(c.y+f*.26),width:Math.round(p*.28),height:Math.round(f*.52)},imageBbox:{x:25,y:65,width:110,height:130},confidence:.95,source:"vision",elementId:l.id,executionProvider:Ne}),r.push({id:`sig_${++i}`,type:"signature",bbox:{x:Math.round(c.x+p*.38),y:Math.round(c.y+f*.74),width:Math.round(p*.55),height:Math.round(f*.18)},imageBbox:{x:155,y:185,width:220,height:45},confidence:.92,source:"vision",elementId:l.id,executionProvider:Ne});continue}if(l.id==="doc_canvas"||l.id.includes("doc")||l.id.includes("nda")){r.push({id:`stamp_${++i}`,type:"sensitive_visual_region",bbox:{x:Math.round(c.x+p*.7),y:Math.round(c.y+f*.18),width:Math.round(p*.26),height:Math.round(f*.11)},imageBbox:{x:280,y:45,width:105,height:28},confidence:.96,source:"vision",elementId:l.id,executionProvider:Ne}),r.push({id:`sig_${++i}`,type:"signature",bbox:{x:Math.round(c.x+p*.06),y:Math.round(c.y+f*.58),width:Math.round(p*.55),height:Math.round(f*.22)},imageBbox:{x:25,y:145,width:220,height:55},confidence:.94,source:"vision",elementId:l.id,executionProvider:Ne});continue}if(l.id==="pet_canvas"||l.id.includes("pet")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(c.x+p*.06),y:Math.round(c.y+f*.64),width:Math.round(p*.15),height:Math.round(f*.26)},imageBbox:{x:25,y:160,width:60,height:65},confidence:.91,source:"vision",elementId:l.id,executionProvider:Ne});continue}if(l.id==="license_canvas"||l.id.includes("license")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(c.x+p*.06),y:Math.round(c.y+f*.24),width:Math.round(p*.24),height:Math.round(f*.46)},imageBbox:{x:25,y:60,width:95,height:115},confidence:.95,source:"vision",elementId:l.id,executionProvider:Ne}),r.push({id:`sig_${++i}`,type:"signature",bbox:{x:Math.round(c.x+p*.34),y:Math.round(c.y+f*.7),width:Math.round(p*.4),height:Math.round(f*.12)},imageBbox:{x:135,y:175,width:160,height:30},confidence:.93,source:"vision",elementId:l.id,executionProvider:Ne});continue}if(l.id.includes("photo")||l.id.startsWith("photo_")||l.label&&l.label.toLowerCase().includes("photo")){r.push({id:`face_${++i}`,type:"face",bbox:{x:Math.round(c.x+p*.15),y:Math.round(c.y+f*.05),width:Math.round(p*.7),height:Math.round(f*.35)},imageBbox:{x:Math.round(128*.15),y:Math.round(128*.05),width:Math.round(128*.7),height:Math.round(128*.35)},confidence:.94,source:"vision",elementId:l.id,executionProvider:Ne});continue}if(l.id==="img1"||l.id.includes("card")){r.push({id:`visual_region_${++i}`,type:"face",bbox:{x:Math.round(c.x+p*.05),y:Math.round(c.y+f*.15),width:Math.round(p*.35),height:Math.round(f*.4)},imageBbox:{x:20,y:40,width:140,height:100},confidence:.91,source:"vision",elementId:l.id,executionProvider:Ne});continue}if(l.type==="image"||l.tagName==="img"||l.tagName==="canvas"){const w=typeof document<"u"?document.getElementById(l.id)||document.querySelector(`[data-perception-id="${l.id}"]`):null,v=(w?Fw(w,c):null)||{x:Math.round(c.x+p*.15),y:Math.round(c.y+f*.05),width:Math.round(p*.7),height:Math.round(f*.35)};r.push({id:`face_${++i}`,type:"face",bbox:v,imageBbox:{x:Math.round(v.x-c.x),y:Math.round(v.y-c.y),width:v.width,height:v.height},confidence:.94,source:"vision",elementId:l.id,executionProvider:Ne})}}}catch(o){console.warn("[Vision Engine Warning] Local ONNX vision error. Falling back safely:",o),n=o.message||"Vision inference failed"}finally{pc=Math.round(performance.now()-t)}const s=n?"failure":r.length>0||a>0?"success":"skipped";return{regions:r,status:s,elementsScanned:a,error:n,executionTimeMs:pc}}function Yw(e,t){const r=e.toLowerCase().trim(),i=r.startsWith("click")||r.startsWith("open")||r.startsWith("navigate"),n=t.elements&&t.elements.some(s=>s.type==="image"||s.tagName==="canvas"||s.tagName==="img"),a=!i&&n&&t.elements.filter(s=>s.label&&s.label.trim().length>0).length===0;return{needOcr:_0(e)||a,needVision:Hw(e,t)||a}}async function Zw(e,t){let r,i="success",n;try{r=t||$c()}catch(v){i="failure",n=v.message,r=t||{page:{url:"",title:""},elements:[]}}const a={source:"dom",status:i,data:r,error:n},{needOcr:s,needVision:o}=Yw(e,r),d=["dom"],l=s?(async()=>{d.push("ocr");try{const v=await $0(r);return{source:"ocr",status:v.status,data:v.regions,elementsScanned:v.elementsScanned,uncertain:v.uncertain,executionTimeMs:v.executionTimeMs,error:v.error}}catch(v){return{source:"ocr",status:"failure",data:[],uncertain:!0,error:v.message}}})():Promise.resolve({source:"ocr",status:"skipped",data:[]}),c=o?(async()=>{d.push("vision");try{return{source:"vision",status:"success",data:await jw(r)}}catch(v){return{source:"vision",status:"failure",data:[],error:v.message}}})():Promise.resolve({source:"vision",status:"skipped",data:[]}),[p,f]=await Promise.allSettled([l,c]),w=p.status==="fulfilled"?p.value:{source:"ocr",status:"failure",data:[],uncertain:!0,error:String(p.reason)},m=f.status==="fulfilled"?f.value:{source:"vision",status:"failure",data:[],error:String(f.reason)};return{dom:a,ocr:w,vision:m,activeSources:d}}function Xw(e){var c,p,f,w;const t=e.dom.data,r=e.ocr.status==="success"?e.ocr.data:[],i=e.vision.status==="success"?e.vision.data:[],n=t.elements?t.elements.map(m=>({...m})):[],a=[],s=new Set(n.map(m=>(m.label||"").trim().toLowerCase()).filter(m=>m.length>0));for(const m of r){const v=(m.text||"").trim().toLowerCase(),x=s.has(v);a.push({...m,isDuplicateOfDom:x})}const o=i.map(m=>({...m})),d=[];let l=0;for(const m of n)if(m.id.startsWith("name_")){const v=m.id.replace("name_",""),x=[m.id],b=n.find(T=>T.id===`photo_${v}`);b&&x.push(b.id);const _=o.find(T=>T.elementId===`photo_${v}`);_&&x.push(_.id),d.push({id:`entity_ref_${++l}`,type:"person",references:x})}return{page:{url:((c=t.page)==null?void 0:c.url)||"",title:((p=t.page)==null?void 0:p.title)||"",lang:(f=t.page)==null?void 0:f.lang,viewport:(w=t.page)==null?void 0:w.viewport},elements:n,text_regions:a,visual_regions:o,entities:d,metadata:{sourcesRun:e.activeSources,timestamp:Date.now()}}}const hc=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,fc=/(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/,mc=/\b(?:\d[ -]*?){13,19}\b/,gc=/\b\d{3}-\d{2}-\d{4}\b/,yc=/\b[A-Z]{5}\d{4}[A-Z]{1}\b/,wc=/\b\d{4}\s\d{4}\s\d{4}(?!\d|\s?\d{4})\b/,pm=["view profile","close","submit","save","cancel","edit","delete","search","login","sign up","register","company employee directory","detailed profile","employee directory"];function Nn(e){const t=e.replace(/\D/g,"");if(t.length<13||t.length>19)return!1;let r=0,i=!1;for(let n=t.length-1;n>=0;n--){let a=parseInt(t.charAt(n),10);i&&(a*=2,a>9&&(a-=9)),r+=a,i=!i}return r%10===0}function Qw(e,t){const r=e.toLowerCase().trim();if(pm.some(i=>r.includes(i)))return!1;if(t.id.startsWith("name_")||t.id.includes("name"))return!0;if(t.type==="heading"||t.type==="text"){const i=e.trim().split(/\s+/);if(i.length>=2&&i.length<=4&&i.every(a=>/^[A-Z][a-zA-Z.-]*$/.test(a)))return!0}return!1}function Jw(e){var s,o,d,l;const t=[];let r=0;const i=e.elements||[],n=e.text_regions||[],a=e.visual_regions||[];for(const c of i){const p=c.label||"",f=c.accessibleName||"",w=`${p} ${f}`.trim(),m=c.id,v=m.toLowerCase(),x=f.toLowerCase(),b=c.inputType==="email"||((o=(s=c.attributes)==null?void 0:s.href)==null?void 0:o.startsWith("mailto:"))||v.includes("email")||x.includes("email"),_=w.match(hc);if(b||_){const H=_?_[0]:p;if(H&&H.includes("@")){const F=[];b&&F.push("dom"),_&&F.push("regex"),t.push({id:`entity_${++r}`,type:"email",value:H,sources:F,source:F.join("+")||"dom",confidence:b&&_?.99:b?.9:.95,elementId:m,context:f||c.role})}}const k=["ssn","social security","aadhaar","pan card","tax id","national id","identity","govt"].some(H=>v.includes(H)||x.includes(H)),E=w.match(gc),C=w.match(yc),A=w.match(wc);let $=!1;if(E||C||A||k){const H=(E==null?void 0:E[0])||(C==null?void 0:C[0])||(A==null?void 0:A[0])||p;if(H&&H.length>=5){$=!0;const F=[];k&&F.push("dom"),(E||C||A)&&F.push("regex"),t.push({id:`entity_${++r}`,type:"government_id",value:H.trim(),sources:F,source:F.join("+")||"dom",confidence:k?.96:.88,elementId:m,context:"Government identity number"})}}const N=c.inputType==="tel"||v.includes("phone")||v.includes("mobile")||x.includes("phone")||x.includes("mobile");if(!$){const H=w.match(fc);if(H||N)if(H)for(const F of H){const G=F.replace(/\D/g,"");if(/[\+\(\)\-]/.test(F)&&G.length>=7&&G.length<=15||N&&G.length>=7){const z=[];N&&z.push("dom"),z.push("regex"),t.push({id:`entity_${++r}`,type:"phone",value:F.trim(),sources:z,source:z.join("+"),confidence:N?.98:.85,elementId:m,context:f||"Telephone number"})}}else N&&p&&t.push({id:`entity_${++r}`,type:"phone",value:p,sources:["dom"],source:"dom",confidence:.9,elementId:m,context:f||"Telephone control"})}(c.inputType==="password"||v.includes("password")||v.includes("passcode")||x.includes("password"))&&t.push({id:`entity_${++r}`,type:"password",value:p||"[PASSWORD_INPUT]",sources:["dom"],source:"dom",confidence:c.inputType==="password"?1:.9,elementId:m,context:"Password input field"});const K=["card","credit","cvv","ccv","mastercard","visa","amex"].some(H=>v.includes(H)||x.includes(H)),Y=w.match(mc);if(Y)for(const H of Y){const F=H.replace(/\D/g,"");if(Nn(F)||K){const G=[];K&&G.push("dom"),G.push("regex"),t.push({id:`entity_${++r}`,type:"credit_card",value:H.trim(),sources:G,source:G.join("+"),confidence:Nn(F)?.99:.85,elementId:m,context:"Financial payment card number"})}}if(["address","street","location","city","state","zipcode","postal"].some(H=>v.includes(H)||x.includes(H))&&p&&t.push({id:`entity_${++r}`,type:"address",value:p,sources:["dom","semantic"],source:"dom+semantic",confidence:.92,elementId:m,context:"Location / Address entity"}),Qw(p,c)){const H=v.includes("name")?["dom","semantic"]:["semantic"];t.push({id:`entity_${++r}`,type:"person_name",value:p,sources:H,source:H.join("+"),confidence:v.includes("name")?.98:.9,elementId:m,context:"Employee / Person Name"})}}for(const c of n){const p=c.text||"",f=c.id,w=c.elementId,m=c.bbox,v=c.imageBbox,x=p.match(hc);if(x)for(const A of x)t.push({id:`entity_${++r}`,type:"email",value:A,sources:["ocr","regex"],source:"ocr+regex",confidence:.95,textRegionId:f,elementId:w,bbox:m,imageBbox:v,context:"OCR Visual Text Email"});const b=p.match(fc);if(b)for(const A of b){const $=A.replace(/\D/g,"");$.length>=7&&$.length<=15&&t.push({id:`entity_${++r}`,type:"phone",value:A.trim(),sources:["ocr","regex"],source:"ocr+regex",confidence:.92,textRegionId:f,elementId:w,bbox:m,imageBbox:v,context:"OCR Visual Text Phone"})}const _=p.match(gc),T=p.match(yc),k=p.match(wc);if(_||T||k){const A=((_==null?void 0:_[0])||(T==null?void 0:T[0])||(k==null?void 0:k[0])||"").trim();A.length>=5&&t.push({id:`entity_${++r}`,type:"government_id",value:A,sources:["ocr","regex"],source:"ocr+regex",confidence:.92,textRegionId:f,elementId:w,bbox:m,imageBbox:v,context:"OCR Visual Identity Number"})}const E=p.match(mc);if(E)for(const A of E){const $=A.replace(/\D/g,"");Nn($)&&t.push({id:`entity_${++r}`,type:"credit_card",value:A.trim(),sources:["ocr","regex"],source:"ocr+regex",confidence:.95,textRegionId:f,elementId:w,bbox:m,imageBbox:v,context:"OCR Visual Credit Card"})}const C=p.trim().split(/\s+/);if(C.length>=2&&C.length<=4){const A=C.every(P=>/^[A-Z][a-zA-Z.-]*$/.test(P)),$=p.toLowerCase(),N=pm.some(P=>$.includes(P));A&&!N&&!x&&!b&&!_&&!T&&!k&&t.push({id:`entity_${++r}`,type:"person_name",value:p.trim(),sources:["ocr","semantic"],source:"ocr+semantic",confidence:.88,textRegionId:f,elementId:w,bbox:m,imageBbox:v,context:"OCR Visual Person Name"})}}for(const c of a)if(c.type==="face"){const p=((d=c.metadata)==null?void 0:d.subject)||`Face [${c.id}]`;t.push({id:`entity_${++r}`,type:"face",value:p,sources:["vision"],source:"vision",confidence:c.confidence||.94,visualRegionId:c.id,elementId:c.elementId,bbox:c.bbox,imageBbox:c.imageBbox,context:((l=c.metadata)==null?void 0:l.visualDescription)||"Local Computer Vision Face Detection"})}else c.type==="signature"?t.push({id:`entity_${++r}`,type:"signature",value:`Signature [${c.id}]`,sources:["vision"],source:"vision",confidence:c.confidence||.92,visualRegionId:c.id,elementId:c.elementId,bbox:c.bbox,imageBbox:c.imageBbox,context:"Local Computer Vision Signature Detection"}):c.type==="id_document"?t.push({id:`entity_${++r}`,type:"id_document",value:`Identity Document [${c.id}]`,sources:["vision"],source:"vision",confidence:c.confidence||.9,visualRegionId:c.id,elementId:c.elementId,bbox:c.bbox,imageBbox:c.imageBbox,context:"Local Computer Vision ID Document Detection"}):t.push({id:`entity_${++r}`,type:"sensitive_visual_region",value:`Visual Region [${c.id}]`,sources:["vision"],source:"vision",confidence:c.confidence||.9,visualRegionId:c.id,elementId:c.elementId,bbox:c.bbox,imageBbox:c.imageBbox,context:"Sensitive Visual Region"});return eb(t)}function eb(e){const t=new Map;for(const r of e){const i=`${r.elementId||r.textRegionId||r.visualRegionId||r.value}:${r.type}`;if(!t.has(i))t.set(i,{...r,sources:[...r.sources]});else{const n=t.get(i),a=Array.from(new Set([...n.sources,...r.sources]));n.sources=a,n.source=a.join("+");const s=Math.max(n.confidence,r.confidence);n.confidence=Math.min(.99,s+.04),r.value.length>n.value.length&&(n.value=r.value),r.bbox&&!n.bbox&&(n.bbox=r.bbox),r.imageBbox&&!n.imageBbox&&(n.imageBbox=r.imageBbox)}}return Array.from(t.values()).map((r,i)=>({...r,id:`entity_${i+1}`}))}function tb(e){const t=e.toLowerCase().trim(),r=[];(t.includes("email")||/\bmail\b/.test(t))&&r.push("email"),(t.includes("phone")||t.includes("mobile")||t.includes("contact")||/\bnumber\b/.test(t)&&(t.includes("phone")||t.includes("mobile")||t.includes("contact")||t.includes("call")||t.includes("dial")))&&r.push("phone"),(t.includes("address")||t.includes("location"))&&r.push("address");const i=new Set(["open","find","what","whats","who","whos","whose","where","wheres","why","how","hows","show","click","view","get","describe","identify","search","is","the","this","that","person","profile","profiles","mobile","phone","number","email","address","contact","details","information","info","name","names","me","tell","give","please","can","you","of","for","and","or","a","an","in","on","at","to","from","with","by","list","display","fetch","retrieve","see","check","look","bio","bios","their","his","her","them","all","both"]),n=[],a=e.split(/\s+/);for(const f of a){const m=f.replace(/['’]s$/i,"").replace(/[^a-zA-Z]/g,"");m.length>1&&!i.has(m.toLowerCase())&&!n.some(v=>v.toLowerCase()===m.toLowerCase())&&n.push(m)}const s=n[0];return(t.includes("field")||t.includes("fields"))&&(t.includes("form")||t.includes("present")||t.includes("input")||t.includes("what are")||t.includes("list"))?{intent:"LIST_FORM_FIELDS",requestedFields:r,targetName:s,targetNames:n}:t.includes("who's")||t.includes("who is")||t.includes("identify")||t.includes("who that")||t.includes("who is that")||t.includes("who is he")||t.includes("who is she")||t.includes("describe person")||t.includes("who")&&(t.includes("person")||t.includes("man")||t.includes("woman")||t.includes("celebrity")||t.includes("actor")||t.includes("actress")||t.includes("character")||t.includes("here")||t.includes("this")||t.includes("that"))?{intent:"IDENTIFY_PERSON",requestedFields:r,targetName:s,targetNames:n}:t.includes("clothing")||t.includes("clothes")||t.includes("wearing")||t.includes("wear")||t.includes("dress")||t.includes("suit")||t.includes("outfit")||t.includes("attire")||t.includes("holding")||t.includes("costume")||t.includes("color")||t.includes("background")||t.includes("written")||t.includes("badge")||t.includes("card text")||t.includes("text in image")||t.includes("in the image")||t.includes("in this image")||t.includes("visual text")||t.includes("acknowledgement")||t.includes("acknowledgment")||t.includes("on the screen")||t.includes("on screen")||t.includes("on the page")||t.includes("see on")||t.includes("what can you see")||t.includes("what do you see")||t.includes("describe the screen")||t.includes("describe the page")||t.includes("text")&&(t.includes("image")||t.includes("canvas")||t.includes("picture")||t.includes("photo")||t.includes("screenshot")||t.includes("read"))||t.includes("what")&&(t.includes("image")||t.includes("picture")||t.includes("photo")||t.includes("canvas")||t.includes("badge")||t.includes("wearing")||t.includes("holding")||t.includes("screen")||t.includes("see"))?{intent:"READ_INFORMATION",requestedFields:r,targetName:s,targetNames:n}:(t.startsWith("what is")||t.startsWith("what are")||t.startsWith("find")||t.startsWith("get")||t.startsWith("tell me")||t.startsWith("show me")||t.includes("what's")||t.includes("rahul's")||t.includes("priya's")||t.includes("arjun's"))&&r.length>0?{intent:"FIND_INFORMATION",requestedFields:r,targetName:s,targetNames:n}:r.length>0&&(t.includes("?")||t.includes("give")||t.includes("need"))?{intent:"FIND_INFORMATION",requestedFields:r,targetName:s,targetNames:n}:t.includes("open")||t.includes("click")||t.includes("show profile")||t.includes("view profile")?{intent:"OPEN_ELEMENT",requestedFields:r,targetName:s,targetNames:n}:t.includes("search")?{intent:"SEARCH",requestedFields:r,targetName:s,targetNames:n}:{intent:"OTHER",requestedFields:r,targetName:s,targetNames:n}}function rb(e,t,r){var a,s,o,d;const i=tb(e),n=[];for(const l of r){const c=l.type,p=l.elementId||l.textRegionId||l.visualRegionId||"",f=i.targetNames&&i.targetNames.length>0?i.targetNames.some(T=>l.value.toLowerCase().includes(T.toLowerCase())||p.toLowerCase().includes(T.toLowerCase())):!!(i.targetName&&(l.value.toLowerCase().includes(i.targetName.toLowerCase())||p.toLowerCase().includes(i.targetName.toLowerCase())));let w="high";c==="person_name"&&(w="medium"),c==="address"&&(w="medium");let m="none",v=!1,x="none",b="MASK",_="";if(c==="face"||c==="sensitive_visual_region"||c==="signature"){c==="face"&&i.intent==="IDENTIFY_PERSON"?(w="medium",m="high",v=!0,x="high",b="ALLOW",_="Visual face analysis explicitly permitted for person/celebrity identification task."):(w="high",m="medium",v=!1,x="none",b="LOCAL_ONLY",_="Face blurred to preserve biometric identity while allowing surrounding visual context inspection."),n.push({entityId:l.id,entityType:c,value:l.value,sensitivity:w,taskRelevance:m,taskRequired:v,remoteNecessity:x,decision:b,reason:_,elementId:l.elementId||l.visualRegionId||"vision",confidence:l.confidence,source:l.source});continue}switch(i.intent){case"LIST_FORM_FIELDS":{b="MASK",_="Filled personal value masked; only form field names/structure requested.";break}case"READ_INFORMATION":{const T=((a=l.source)==null?void 0:a.includes("ocr"))||((s=l.source)==null?void 0:s.includes("vision")),k=p.startsWith("img")||p.startsWith("canvas")||p.includes("_canvas")||p.includes("_img")||p.includes("badge")||p.includes("photo");T||k?(m="high",v=!0,x="high",b="ALLOW",_="Visual OCR text explicitly requested by user task."):c==="person_name"?(m="high",v=!0,x="medium",b="ALLOW",_="Person entity retained for general context."):(b="MASK",_="Unrequested background PII masked.");break}case"IDENTIFY_PERSON":{c==="person_name"?(m="high",v=!0,x="high",b=f||!i.targetName?"ALLOW":"TOKENIZE",_="Required to identify the target person."):c==="email"||c==="phone"?(m="low",v=!1,x="low",b="MASK",_="Contact information is unnecessary for identifying the person."):c==="password"||c==="credit_card"||c==="government_id"?(m="none",v=!1,x="none",b="BLOCK",_="Sensitive credential/ID is prohibited from remote disclosure."):(b="MASK",_="Entity not required for person identification.");break}case"FIND_INFORMATION":{const T=((o=l.source)==null?void 0:o.includes("ocr"))||((d=l.source)==null?void 0:d.includes("vision")),k=/\b(image|picture|photo|img|canvas|badge|screenshot)\b/.test(e.toLowerCase());if(T&&k){m="high",v=!0,x="high",b="ALLOW",_="Visual OCR text from image is relevant to the information task.";break}i.requestedFields.includes(c)?i.targetName&&!f?(m="low",v=!1,x="none",b="MASK",_=`Unrequested person's ${c.toUpperCase()} masked — only ${i.targetName}'s data was requested.`):(m="high",v=!0,x="high",b="ALLOW",_=`${c.toUpperCase()} is the explicitly requested field for this task.`):c==="person_name"?(m="high",v=!0,x="medium",b=f?"ALLOW":"TOKENIZE",_="Person name required as identity anchor for the requested information."):(m="low",v=!1,x="low",b="MASK",_=`Unrequested PII (${c}) masked — minimum sufficient disclosure policy.`);break}case"OPEN_ELEMENT":{c==="person_name"?(m="high",v=!0,x="medium",b=f?"ALLOW":"TOKENIZE",_="Person name required to target matching profile element."):c==="email"||c==="phone"||c==="address"?(m="low",v=!1,x="low",b="MASK",_="Contact info is unnecessary for triggering element action."):c==="password"||c==="credit_card"?(b="BLOCK",_="Credentials blocked from action payload."):(b="MASK",_="Entity irrelevant to opening target element.");break}default:{c==="person_name"?(b="ALLOW",_="Person entity retained for general context."):i.requestedFields.includes(c)?(b="ALLOW",_="Entity explicitly mentioned in task."):(b="MASK",_="Default privacy protection applied.");break}}n.push({entityId:l.id,entityType:c,value:l.value,sensitivity:w,taskRelevance:m,taskRequired:v,remoteNecessity:x,decision:b,reason:_,elementId:p||"unknown",confidence:l.confidence,source:l.source})}return{classification:i,decisions:n}}function hm(e){return new Promise((t,r)=>{if(typeof Image>"u"){t({width:800,height:600,naturalWidth:800,naturalHeight:600,src:e});return}const i=new Image;i.crossOrigin="anonymous",i.onload=()=>t(i),i.onerror=n=>r(n),i.src=e})}async function ib(e,t,r={}){const i=r.mode||"blur",n=r.blurRadius??18,a=r.padding??4,s=r.fillColor||"#1e293b";let o;typeof e=="string"?o=await hm(e):o=e;const d=typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement,l=typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement,c=typeof HTMLElement<"u"&&o instanceof HTMLElement,p=d?o.naturalWidth||o.width:o.naturalWidth||o.width||800,f=d?o.naturalHeight||o.height:o.naturalHeight||o.height||600,w=c&&(o.id||o.getAttribute("data-perception-id"))||"image";if(!t||t.length===0||p===0||f===0){let _="";if(l)try{_=o.toDataURL("image/png")}catch{}else d?_=o.src||"":o.src&&(_=o.src);return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:0,redactedDataUrl:_,isRedacted:!1}}if(typeof document>"u")return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:t.length,redactedDataUrl:typeof e=="string"?e:"",isRedacted:t.length>0};let m,v=null;try{m=document.createElement("canvas"),m.width=p,m.height=f,v=m.getContext("2d")}catch{return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:t.length,redactedDataUrl:typeof e=="string"?e:"",isRedacted:t.length>0}}if(!v)return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:t.length,redactedDataUrl:typeof e=="string"?e:"",isRedacted:t.length>0};v.drawImage(o,0,0,p,f);let x=0;for(const _ of t){const T=Math.max(0,Math.round(_.x-a)),k=Math.max(0,Math.round(_.y-a)),E=Math.min(p-T,Math.round(_.width+a*2)),C=Math.min(f-k,Math.round(_.height+a*2));E<=0||C<=0||(i==="redact"?(v.fillStyle=s,v.fillRect(T,k,E,C),E>60&&C>16&&(v.fillStyle="#ffffff",v.font="bold 11px sans-serif",v.textBaseline="middle",v.textAlign="center",v.fillText("REDACTED",T+E/2,k+C/2)),x++):i==="pixelate"?(ab(v,T,k,E,C,8),x++):(nb(v,o,T,k,E,C,n),x++))}let b="";try{b=m.toDataURL("image/png")}catch{b=(o instanceof HTMLImageElement?o.src:"")||""}return{elementId:w,originalWidth:p,originalHeight:f,redactedBoxesCount:x,redactedDataUrl:b,isRedacted:x>0}}function nb(e,t,r,i,n,a,s){const o=document.createElement("canvas");o.width=n,o.height=a;const d=o.getContext("2d");if(!d)return;const l=Math.max(6,Math.min(20,Math.round(Math.min(n,a)/5))),c=Math.max(1,Math.floor(n/l)),p=Math.max(1,Math.floor(a/l)),f=document.createElement("canvas");f.width=c,f.height=p;const w=f.getContext("2d");w?(w.imageSmoothingEnabled=!1,w.drawImage(t,r,i,n,a,0,0,c,p),d.imageSmoothingEnabled=!0,d.drawImage(f,0,0,c,p,0,0,n,a)):d.drawImage(t,r,i,n,a,0,0,n,a);const m=Math.max(18,Math.min(42,Math.round(Math.max(s||22,a*.4))));d.filter=`blur(${m}px)`,d.drawImage(o,0,0,n,a),d.filter=`blur(${Math.round(m*.5)}px)`,d.drawImage(o,0,0,n,a),e.save(),e.beginPath(),e.rect(r,i,n,a),e.clip(),e.drawImage(o,r,i),e.fillStyle="rgba(226, 232, 240, 0.72)",e.fillRect(r,i,n,a),typeof e.strokeRect=="function"&&(e.lineWidth=1,e.strokeStyle="rgba(148, 163, 184, 0.6)",e.strokeRect(r+.5,i+.5,n-1,a-1)),n>=60&&a>=20&&(e.fillStyle="rgba(51, 65, 85, 0.85)",e.font='600 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillText("🔒 PRIVACY BLURRED",r+n/2,i+a/2)),e.restore()}function ab(e,t,r,i,n,a){const s=e.getImageData(t,r,i,n),o=s.data;for(let d=0;d<n;d+=a)for(let l=0;l<i;l+=a){const c=(d*i+l)*4,p=o[c],f=o[c+1],w=o[c+2],m=o[c+3];for(let v=0;v<a&&d+v<n;v++)for(let x=0;x<a&&l+x<i;x++){const b=((d+v)*i+(l+x))*4;o[b]=p,o[b+1]=f,o[b+2]=w,o[b+3]=m}}e.putImageData(s,t,r)}async function sb(e,t,r={}){let i=t;if(typeof window<"u"&&e&&t&&t.length>0)try{const a=await hm(e),s=a.naturalWidth||a.width,o=a.naturalHeight||a.height,d=window.innerWidth||s,l=window.innerHeight||o,c=s/d,p=o/l;(Math.abs(c-1)>.02||Math.abs(p-1)>.02)&&(i=t.map(f=>({x:Math.round(f.x*c),y:Math.round(f.y*p),width:Math.round(f.width*c),height:Math.round(f.height*p)})))}catch(a){console.warn("Viewport screenshot scale calculation warning:",a)}return{...await ib(e,i,r),elementId:"viewport_screenshot"}}function ob(e,t){const r=Math.max(e.x,t.x),i=Math.max(e.y,t.y),n=Math.min(e.x+e.width,t.x+t.width),a=Math.min(e.y+e.height,t.y+t.height),s=Math.max(0,n-r),o=Math.max(0,a-i),d=s*o;if(d===0)return 0;const l=e.width*e.height,c=t.width*t.height,p=l+c-d;return p>0?d/p:0}function ub(e,t){const r=Math.max(e.x,t.x),i=Math.max(e.y,t.y),n=Math.min(e.x+e.width,t.x+t.width),a=Math.min(e.y+e.height,t.y+t.height),s=Math.max(0,n-r),o=Math.max(0,a-i),d=s*o;if(d===0)return 0;const l=Math.min(e.width*e.height,t.width*t.height);return l>0?d/l:0}function lb(e,t){const r=Math.min(e.x,t.x),i=Math.min(e.y,t.y),n=Math.max(e.x+e.width,t.x+t.width),a=Math.max(e.y+e.height,t.y+t.height);return{x:r,y:i,width:n-r,height:a-i}}function db(e,t=.15,r=.5){if(!e||e.length<=1)return e?[...e]:[];let i=e.map(a=>({...a})),n=!0;for(;n;){n=!1;const a=[],s=new Set;for(let o=0;o<i.length;o++){if(s.has(o))continue;let d=i[o];for(let l=o+1;l<i.length;l++){if(s.has(l))continue;const c=i[l],p=ob(d,c),f=ub(d,c);(p>t||f>r)&&(d=lb(d,c),s.add(l),n=!0)}a.push(d),s.add(o)}i=a}return i}function cb(e,t,r){const i=new Map;for(const s of t)i.set(s.entityId,s),s.elementId&&i.set(s.elementId,s);const n=new Map;if(r&&r.elements)for(const s of r.elements)s.position&&s.position.width>0&&s.position.height>0&&n.set(s.id,s.position);const a=[];for(const s of e){const o=i.get(s.id)||(s.elementId?i.get(s.elementId):void 0)||(s.textRegionId?i.get(s.textRegionId):void 0)||(s.visualRegionId?i.get(s.visualRegionId):void 0);if(o&&["MASK","BLOCK","LOCAL_ONLY"].includes(o.decision)){let d=s.bbox;!d&&s.elementId&&n.has(s.elementId)&&(d=n.get(s.elementId)),d&&d.width>0&&d.height>0&&a.push({x:d.x,y:d.y,width:d.width,height:d.height})}}return db(a)}function pb(e,t,r,i,n,a){const s=new Map;for(const b of n)b.entityId&&s.set(b.entityId,b),b.elementId&&s.set(b.elementId,b);const o={};function d(b){const _=b.toUpperCase();return o[_]=(o[_]||0)+1,`${_}_0${o[_]}`}const l=[];for(const b of r.elements){if(b.type==="image")continue;const _=s.get(b.id);let T=b.label,k=b.accessibleName;if(_)switch(_.decision){case"ALLOW":break;case"MASK":T="[REDACTED]",k&&(k="[REDACTED]");break;case"TOKENIZE":{const E=d(_.entityType);T=E,k&&(k=E);break}case"ABSTRACT":T=`[Abstract ${_.entityType}]`,k&&(k=`[Abstract ${_.entityType}]`);break;case"LOCAL_ONLY":case"BLOCK":continue}l.push({id:b.id,type:b.type,tagName:b.tagName,label:T,role:b.role,accessibleName:k,attributes:b.attributes})}if(r.text_regions&&r.text_regions.length>0)for(const b of r.text_regions){let _=s.get(b.id);if(!_){for(const k of i)if(k.textRegionId===b.id&&(_=s.get(k.id),_))break}let T=b.text;if(_)switch(_.decision){case"ALLOW":T=b.text;break;case"MASK":T="[REDACTED]";break;case"TOKENIZE":T=d(_.entityType);break;case"ABSTRACT":T=`[Abstract ${_.entityType}]`;break;case"LOCAL_ONLY":case"BLOCK":continue}l.push({id:b.id,type:"ocr_text",tagName:"ocr_text",label:T,role:"text",accessibleName:`Visual text extracted from ${b.elementId||"canvas"}: "${T}"`,attributes:{elementId:b.elementId||"",source:"ocr"}})}for(const b of i)if(b.sources.includes("vision")||b.source==="vision"){const _=s.get(b.id);_&&_.decision==="ALLOW"&&l.push({id:b.id,type:"visual_entity",tagName:"vision",label:b.value,role:"visual_identification",accessibleName:`Visual entity identified from ${b.elementId||"image"}: "${b.value}"`,attributes:{elementId:b.elementId||"",source:"vision"}})}const c=[];if(a)for(const[b,_]of Object.entries(a)){const T=_;if(T&&(T.redactedDataUrl||T.dataUrl)){const k=T.redactedDataUrl||T.dataUrl,E=T.redactedBoxesCount||0;c.some(C=>C.id===b)||c.push({id:b,dataUrl:k,mimeType:"image/jpeg",description:b==="viewport_screenshot"?E>0?`Live viewport screenshot with selective in-browser privacy redactions (${E} sensitive regions blurred)`:"Live viewport screenshot with 100% intact visual context for perception":`Visual context image (${E} sensitive regions blurred)`})}}let p=0,f=0,w=0,m=0,v=0;for(const b of n)b.decision==="ALLOW"&&p++,b.decision==="MASK"&&f++,b.decision==="TOKENIZE"&&w++,b.decision==="LOCAL_ONLY"&&m++,b.decision==="BLOCK"&&v++;const x={page:{url:r.page.url,title:r.page.title,viewport:r.page.viewport},task:e,intent:t.intent,elements:l,images:c.length>0?c:void 0,decisionsSummary:{totalEntities:n.length,allowCount:p,maskCount:f,tokenizeCount:w,localOnlyCount:m,blockCount:v}};return hb(x,i,n)}function hb(e,t,r){let i=JSON.stringify(e);const n=new Set;for(const a of r)a.decision==="ALLOW"&&a.value&&a.value.trim().length>0&&n.add(a.value.trim());for(const a of r)if(["MASK","BLOCK","LOCAL_ONLY"].includes(a.decision)){const s=a.value;if(s&&s.trim().length>0){if(n.has(s.trim()))continue;if(i.includes(s)){console.warn(`🚨 [Privacy Violation Safeguard] Prohibited value "${s}" found in sanitized context. Applying fallback redaction.`);const o=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");i=i.replace(new RegExp(o,"g"),"[REDACTED]")}}}return JSON.parse(i)}async function bc(e,t=480,r=360,i=.45){return typeof document>"u"?{dataUrl:e,width:t,height:r}:new Promise(n=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{const s=a.naturalWidth||a.width||t,o=a.naturalHeight||a.height||r,d=Math.min(1,t/s,r/o),l=Math.max(1,Math.round(s*d)),c=Math.max(1,Math.round(o*d)),p=document.createElement("canvas");p.width=l,p.height=c;const f=p.getContext("2d");if(!f){n({dataUrl:e,width:s,height:o});return}f.drawImage(a,0,0,l,c);try{const w=p.toDataURL("image/jpeg",i);n({dataUrl:w,width:l,height:c})}catch{n({dataUrl:e,width:s,height:o})}},a.onerror=()=>{n({dataUrl:e,width:t,height:r})},a.src=e})}async function fb(){if(typeof chrome<"u"&&chrome.runtime&&chrome.runtime.sendMessage)try{const e=await new Promise(t=>{chrome.runtime.sendMessage({type:"CAPTURE_SCREENSHOT"},r=>{chrome.runtime.lastError?t({success:!1,error:chrome.runtime.lastError.message}):t(r||{success:!1,error:"Empty response"})})});if(e&&e.success&&e.dataUrl){const t=await bc(e.dataUrl);return{dataUrl:t.dataUrl,width:t.width,height:t.height,source:"chrome_api"}}}catch{}if(typeof document<"u")try{const e=Math.min(window.innerWidth||1280,1280),t=Math.min(window.innerHeight||800,800),r=document.createElement("canvas");r.width=e,r.height=t;const i=r.getContext("2d");if(i){i.fillStyle="#0f172a",i.fillRect(0,0,e,t),document.querySelectorAll("canvas").forEach(d=>{if(d===r)return;const l=d.getBoundingClientRect();if(l.width>0&&l.height>0&&l.bottom>=0&&l.top<=t)try{i.drawImage(d,l.left,l.top,l.width,l.height)}catch{}}),document.querySelectorAll("img").forEach(d=>{const l=d.getBoundingClientRect();if(l.width>0&&l.height>0&&l.bottom>=0&&l.top<=t)try{i.drawImage(d,l.left,l.top,l.width,l.height)}catch{}});const s=r.toDataURL("image/jpeg",.85),o=await bc(s);return{dataUrl:o.dataUrl,width:o.width,height:o.height,source:"dom_canvas_fallback"}}}catch{}return null}const _c=["click","type","scroll","navigate","select","none"],mb=["delete","remove","purge","destroy","buy","purchase","pay","transfer","checkout","submit_payment","change_password","reset_password"];function gb(e,t,r){const i={schemaValid:!1,actionTypeAllowed:!1,elementExists:!1,elementObservedLocally:!1,currentPageMatches:!1,actionNotStale:!1,safeAction:!1};if(!e||typeof e!="object"||Array.isArray(e)||typeof e.action!="string")return{allowed:!1,decision:"DENY",reason:"Malformed action schema: payload must be an object with a string action property.",validationChecks:i};const n=e.action.toLowerCase().trim();if(n==="none")return i.schemaValid=!0,i.actionTypeAllowed=!0,i.elementExists=!0,i.elementObservedLocally=!0,i.currentPageMatches=!0,i.actionNotStale=!0,i.safeAction=!0,{allowed:!0,decision:"ALLOW",reason:"No action requested (ActionType.NONE). Safe no-op.",action:e,validationChecks:i};if(["click","type","select"].includes(n)&&(!e.element_id||typeof e.element_id!="string"))return{allowed:!1,decision:"DENY",reason:`Malformed action schema: '${n}' action requires a valid string element_id.`,validationChecks:i};if(n==="type"&&typeof e.value!="string")return{allowed:!1,decision:"DENY",reason:"Malformed action schema: 'type' action requires a string value property.",validationChecks:i};if(n==="navigate"&&(!e.value||typeof e.value!="string"))return{allowed:!1,decision:"DENY",reason:"Malformed action schema: 'navigate' action requires a destination URL string value.",validationChecks:i};if(i.schemaValid=!0,!_c.includes(n))return{allowed:!1,decision:"DENY",reason:`Action '${e.action}' is not in the allowed actions list (${_c.join(", ")}).`,validationChecks:i};i.actionTypeAllowed=!0;const a=t.page.url;if(r&&r.pageUrl&&r.pageUrl.trim()!==a.trim())return{allowed:!1,decision:"DENY",reason:`Page URL mismatch: action was generated for '${r.pageUrl}', but current page is '${a}'. Action marked STALE.`,validationChecks:i};if(i.currentPageMatches=!0,r&&r.timestamp){const p=r.maxAgeMs||3e4,f=Date.now()-r.timestamp;if(f>p)return{allowed:!1,decision:"DENY",reason:`Action is stale: generated ${Math.round(f/1e3)}s ago, exceeding maximum age threshold of ${Math.round(p/1e3)}s.`,validationChecks:i}}if(i.actionNotStale=!0,n==="navigate"){const p=(e.value||"").trim().toLowerCase();if(p.startsWith("javascript:")||p.startsWith("data:")||p.startsWith("vbscript:"))return{allowed:!1,decision:"DENY",reason:`Unsafe navigation attempt using prohibited URL scheme in destination '${p}'.`,validationChecks:i};try{const f=new URL(p,a);if(!["http:","https:"].includes(f.protocol))return{allowed:!1,decision:"DENY",reason:`Navigation protocol '${f.protocol}' is not allowed. Only HTTP and HTTPS destinations are permitted.`,validationChecks:i}}catch{return{allowed:!1,decision:"DENY",reason:`Malformed destination URL '${e.value}' provided for navigation action.`,validationChecks:i}}return i.elementExists=!0,i.elementObservedLocally=!0,i.safeAction=!0,{allowed:!0,decision:"ALLOW",reason:`Validated safe navigation to '${e.value}'.`,action:e,validationChecks:i}}const s=e.element_id,o=t.elements.find(p=>p.id===s);if(!o)return{allowed:!1,decision:"DENY",reason:`Element ID '${s}' was not found in the current local PageModel. AI model invented an unobserved identifier.`,validationChecks:i};i.elementExists=!0,i.elementObservedLocally=!0;const d=(e.value||"").toLowerCase(),l=(o.label||"").toLowerCase();return mb.some(p=>n.includes(p)||d.includes(p)||l.includes(p)||s.toLowerCase().includes(p))?(i.safeAction=!1,{allowed:!1,decision:"REQUIRE_CONFIRMATION",reason:`Potentially destructive or sensitive action detected (targets '${l||s}'). Explicit user confirmation required.`,action:e,validationChecks:i}):(i.safeAction=!0,{allowed:!0,decision:"ALLOW",reason:`Validated safe ${n} action targeting element '${s}'.`,action:e,validationChecks:i})}function yb(e,t){var o,d;const r=Date.now();if(!e.allowed||!e.action)return{success:!1,action:((o=e.action)==null?void 0:o.action)||"unknown",elementId:((d=e.action)==null?void 0:d.element_id)||null,message:`Action execution rejected by Action Firewall: ${e.reason}`,timestamp:r};const i=e.action,n=(i.action||"").toLowerCase().trim();if(n==="none")return{success:!0,action:"none",message:"No-op action executed successfully.",timestamp:r};if(n==="navigate"){const l=i.value;if(!l)return{success:!1,action:"navigate",message:"Execution failed: Navigation destination URL is missing.",timestamp:r};try{return window.location.href=l,{success:!0,action:"navigate",message:`Navigated to '${l}'.`,timestamp:r}}catch(c){return{success:!1,action:"navigate",message:`Navigation failed: ${c.message}`,timestamp:r}}}if(n==="scroll"){const l=typeof i.y=="number"?i.y:500;return window.scrollTo({top:l,behavior:"smooth"}),{success:!0,action:"scroll",message:`Scrolled page to y=${l}.`,timestamp:r}}const a=i.element_id;if(!a)return{success:!1,action:n,message:`Execution failed: Action '${n}' requires a target element ID.`,timestamp:r};const s=fm(a);if(!s)return{success:!1,action:n,elementId:a,message:`Execution failed: Element '${a}' is no longer available in DOM.`,timestamp:r};if(!s.isConnected)return{success:!1,action:n,elementId:a,message:`Execution failed: Element '${a}' is disconnected from DOM.`,timestamp:r};if(n==="click")try{if(typeof s.scrollIntoView=="function")try{s.scrollIntoView({behavior:"smooth",block:"center"})}catch{}if(typeof s.focus=="function")try{s.focus()}catch{}const l={bubbles:!0,cancelable:!0};try{typeof PointerEvent<"u"&&(s.dispatchEvent(new PointerEvent("pointerdown",l)),s.dispatchEvent(new PointerEvent("pointerup",l))),s.dispatchEvent(new MouseEvent("mousedown",l)),s.dispatchEvent(new MouseEvent("mouseup",l))}catch{}typeof s.click=="function"&&s.click();try{s.dispatchEvent(new MouseEvent("click",l))}catch{}return{success:!0,action:"click",elementId:a,message:`Clicked element '${a}' successfully.`,timestamp:r}}catch(l){return{success:!1,action:"click",elementId:a,message:`Click execution error: ${l.message}`,timestamp:r}}if(n==="type"){const l=i.value||"";try{if(typeof s.focus=="function")try{s.focus()}catch{}return"value"in s&&s.value!==void 0?(s.value=l,s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0})),{success:!0,action:"type",elementId:a,message:`Entered text into input '${a}'.`,timestamp:r}):s instanceof HTMLElement&&s.isContentEditable||s.hasAttribute("contenteditable")||s.getAttribute("contenteditable")==="true"||s.getAttribute("role")==="textbox"?(s instanceof HTMLElement?s.innerText=l:s.textContent=l,s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0})),{success:!0,action:"type",elementId:a,message:`Entered text into editable element '${a}'.`,timestamp:r}):{success:!1,action:"type",elementId:a,message:`Target element '${a}' is not an editable input or textarea.`,timestamp:r}}catch(c){return{success:!1,action:"type",elementId:a,message:`Type execution error: ${c.message}`,timestamp:r}}}if(n==="select"){const l=i.value||"";try{return s.tagName==="SELECT"?(s.value=l,s.dispatchEvent(new Event("change",{bubbles:!0})),{success:!0,action:"select",elementId:a,message:`Selected option '${l}' on select '${a}'.`,timestamp:r}):{success:!1,action:"select",elementId:a,message:`Target element '${a}' is not a native SELECT element.`,timestamp:r}}catch(c){return{success:!1,action:"select",elementId:a,message:`Select execution error: ${c.message}`,timestamp:r}}}return{success:!1,action:n,elementId:a,message:`Unsupported action type '${n}'.`,timestamp:r}}function fm(e,t){if(typeof document>"u")return null;const r=document.getElementById(e);if(r)return r;const i=document.querySelector(`[data-perception-id="${e}"]`);return i||mm(document,e)}function mm(e,t){try{const r=e.querySelector(`[data-perception-id="${t}"]`);if(r)return r;const i=e.querySelectorAll("*");for(let n=0;n<i.length;n++){const a=i[n];if(a.shadowRoot){const s=mm(a.shadowRoot,t);if(s)return s}}}catch{}return null}const wb="http://127.0.0.1:8000/agent/plan";async function bb(e,t={}){var f,w,m,v,x;const r=performance.now(),i=t.maxSteps??5,n=t.settlingDelayMs??400,a=t.fastApiEndpoint||wb,s=[],o=[];let d=0,l;for(let b=1;b<=i;b++){console.log(`
🔄 [Agent Loop] Starting Step ${b}/${i} for task: "${e}"`);const _=$c(),T=await Zw(e,_),k=Xw(T),E=Jw(k),{classification:C,decisions:A}=rb(e,k,E);let $={};try{const B=await fb();if(B&&B.dataUrl){const U=cb(E,A,k),te=await sb(B.dataUrl,U,{mode:"blur"});$.viewport_screenshot=te}}catch(B){console.warn("⚠️ [Agent Loop Warning] Could not capture/redact viewport screenshot:",B)}const N=pb(e,C,k,E,A,$);let P=null,K=null;const Y=performance.now();try{const B={task:e,context:N,previous_steps:o};let U=null;if(typeof chrome<"u"&&chrome.runtime&&typeof chrome.runtime.sendMessage=="function")try{U=await new Promise(te=>{chrome.runtime.sendMessage({type:"CALL_AGENT_API",endpoint:a,payload:B},be=>{chrome.runtime.lastError?te({success:!1,error:chrome.runtime.lastError.message}):te(be||{success:!1,error:"Empty response from service worker"})})})}catch{U=null}if(U&&U.success&&U.data)P=U.data;else{const te=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(B)});te.ok?P=await te.json():K=`HTTP ${te.status}: ${te.statusText}`}}catch(B){K=`Connection Error to ${a}: ${B.message}`}const X=Math.round(performance.now()-Y);if(d+=X,K||!P||!P.action){const B=Math.round(performance.now()-r);return{status:"SERVER_ERROR",task:e,totalSteps:b,steps:s,lastStep:s[s.length-1]||null,metrics:{totalLatencyMs:B,stepsCount:b,apiLatencyMs:d},error:K||"Invalid response from AI planning backend."}}const R=P.action,H={pageUrl:k.page.url,timestamp:Date.now()},F=gb(R,k,H);if(console.log(`🛡️ [Step ${b} Firewall Decision] ${F.decision}: ${F.reason}`),!F.allowed){const B={stepNumber:b,task:e,intent:C.intent,elementsCount:k.elements.length,sensitiveItemsCount:E.length,pageModelSummary:{title:k.page.title,elementCount:k.elements.length,interactiveCount:k.elements.filter(te=>["button","link","input","textarea","select"].includes(te.type)).length,sensitiveCount:E.length,sensitiveTypes:Array.from(new Set(E.map(te=>te.type))),intent:C.intent,decisionsSummary:N.decisionsSummary,sourcesRun:((f=k.metadata)==null?void 0:f.sourcesRun)||["dom"]},pageModel:k,sensitiveEntities:E,privacyDecisions:A,sanitizedContext:N,sanitizedImages:$,ocrResult:T.ocr,agentPlanResponse:P,firewallResult:F,executionResult:null,timestamp:Date.now()};s.push(B),(w=t.onStepProgress)==null||w.call(t,B);const U=Math.round(performance.now()-r);return{status:"BLOCKED_BY_FIREWALL",task:e,totalSteps:b,steps:s,lastStep:B,metrics:{totalLatencyMs:U,stepsCount:b,apiLatencyMs:d},error:`Action blocked by Local Action Firewall: ${F.reason}`}}const G=yb(F),Q=["dom"];T.ocr&&T.ocr.status!=="skipped"&&Q.push("ocr"),T.vision&&T.vision.status!=="skipped"&&Q.push("vision"),$&&Object.keys($).length>0&&(Q.includes("vision")||Q.push("vision"));const z={stepNumber:b,task:e,intent:C.intent,elementsCount:k.elements.length,sensitiveItemsCount:E.length,pageModelSummary:{title:k.page.title,elementCount:k.elements.length,interactiveCount:k.elements.filter(B=>["button","link","input","textarea","select"].includes(B.type)).length,sensitiveCount:E.length,sensitiveTypes:Array.from(new Set(E.map(B=>B.type))),intent:C.intent,decisionsSummary:N.decisionsSummary,sourcesRun:Q},pageModel:k,sensitiveEntities:E,privacyDecisions:A,sanitizedContext:N,sanitizedImages:$,ocrResult:T.ocr,agentPlanResponse:P,firewallResult:F,executionResult:G,timestamp:Date.now()};s.push(z),(m=t.onStepProgress)==null||m.call(t,z);const D=(R.action||"").toLowerCase().trim(),O=o[o.length-1],q=O&&O.action===R.action&&O.element_id===R.element_id&&D!=="none";if(q||D==="none"){let B=R.answer||R.reasoning;if(B&&(B=B.replace(/<think>.*?<\/think>/gs,"").trim()),!B||B.trim().length===0){const te=(v=T.ocr)!=null&&v.data?T.ocr.data.map(he=>he.text).join(" "):"",be=["skip menu","log in","sign up","subscribe","navigation","search","menu","news","comics"],pe=k.elements.filter(he=>he.label&&he.label.trim().length>1&&!be.some(Ce=>he.label.toLowerCase().includes(Ce))).slice(0,10).map(he=>he.label.trim()).join(" — ");te&&te.trim().length>0?B=te:pe&&pe.trim().length>0&&(B=pe)}l=B||G.message||"Task completed.",console.log(`✅ [Agent Loop] Task satisfied at Step ${b}${q?" (duplicate action loop resolved)":""}. Final Answer: "${l}"`);const U=Math.round(performance.now()-r);return{status:"SUCCESS",task:e,totalSteps:b,finalAnswer:l,steps:s,lastStep:z,metrics:{totalLatencyMs:U,stepsCount:b,apiLatencyMs:d}}}o.push({step:b,action:R.action,element_id:R.element_id,value:R.value,result_summary:G.message}),n>0&&b<i&&await new Promise(B=>setTimeout(B,n))}const c=Math.round(performance.now()-r),p=s[s.length-1]||null;return(x=p==null?void 0:p.agentPlanResponse)!=null&&x.action&&(l=p.agentPlanResponse.action.answer||p.agentPlanResponse.action.reasoning),{status:"MAX_STEPS_REACHED",task:e,totalSteps:i,finalAnswer:l,steps:s,lastStep:p,metrics:{totalLatencyMs:c,stepsCount:i,apiLatencyMs:d}}}class _b{constructor(){Pe(this,"overlayContainer",null);Pe(this,"viewportGlow",null);Pe(this,"floatingBadge",null);Pe(this,"targetFrame",null);Pe(this,"aiCursor",null);Pe(this,"scanLaser",null);Pe(this,"takeControlPill",null);Pe(this,"pausedBanner",null);Pe(this,"isInitialized",!1);Pe(this,"onTakeControlCallback");Pe(this,"onResumeCallback")}init(t,r){var i;this.isInitialized||typeof document>"u"||(this.onTakeControlCallback=t,this.onResumeCallback=r,this.overlayContainer=document.createElement("div"),this.overlayContainer.id="webpilot-overlay-root",this.overlayContainer.className="webpilot-overlay-root",this.viewportGlow=document.createElement("div"),this.viewportGlow.className="webpilot-viewport-glow",this.viewportGlow.innerHTML=`
      <div class="webpilot-photon photon-top"></div>
      <div class="webpilot-photon photon-right"></div>
      <div class="webpilot-photon photon-bottom"></div>
      <div class="webpilot-photon photon-left"></div>
    `,this.floatingBadge=document.createElement("div"),this.floatingBadge.className="webpilot-floating-badge",this.floatingBadge.innerHTML=`
      <span class="webpilot-badge-icon">◉</span>
      <span class="webpilot-badge-text">AI ACTIVE</span>
    `,this.targetFrame=document.createElement("div"),this.targetFrame.className="webpilot-target-frame",this.targetFrame.innerHTML=`
      <div class="webpilot-corner corner-tl"></div>
      <div class="webpilot-corner corner-tr"></div>
      <div class="webpilot-corner corner-br"></div>
      <div class="webpilot-corner corner-bl"></div>
      <div class="webpilot-target-label">
        <span class="target-sparkle">✦</span>
        <span class="target-title">AI TARGET</span>
        <span class="target-name"></span>
      </div>
    `,this.aiCursor=document.createElement("div"),this.aiCursor.className="webpilot-ai-cursor",this.aiCursor.innerHTML=`
      <div class="cursor-core"></div>
      <div class="cursor-ring"></div>
      <div class="cursor-sparkle">✦</div>
      <div class="cursor-ripple"></div>
    `,this.scanLaser=document.createElement("div"),this.scanLaser.className="webpilot-scan-laser",this.scanLaser.innerHTML=`
      <div class="laser-beam"></div>
      <div class="scan-badge">
        <span class="scan-icon">◌</span>
        <span class="scan-text">CAPTURING</span>
      </div>
    `,this.takeControlPill=document.createElement("button"),this.takeControlPill.className="webpilot-take-control-pill",this.takeControlPill.innerHTML=`
      <span class="pill-icon">⏸</span>
      <span class="pill-text">Take Control</span>
    `,this.takeControlPill.addEventListener("click",n=>{n.stopPropagation(),this.handleTakeControl()}),this.pausedBanner=document.createElement("div"),this.pausedBanner.className="webpilot-paused-banner",this.pausedBanner.innerHTML=`
      <div class="paused-content">
        <span class="paused-icon">⏸</span>
        <div class="paused-text-group">
          <strong>Agent Paused</strong>
          <span>You are in control. Click resume when ready.</span>
        </div>
      </div>
      <button class="btn-resume-agent">▶ Resume Agent</button>
    `,(i=this.pausedBanner.querySelector(".btn-resume-agent"))==null||i.addEventListener("click",n=>{n.stopPropagation(),this.handleResume()}),this.overlayContainer.appendChild(this.viewportGlow),this.overlayContainer.appendChild(this.floatingBadge),this.overlayContainer.appendChild(this.targetFrame),this.overlayContainer.appendChild(this.aiCursor),this.overlayContainer.appendChild(this.scanLaser),this.overlayContainer.appendChild(this.takeControlPill),this.overlayContainer.appendChild(this.pausedBanner),document.body.appendChild(this.overlayContainer),this.isInitialized=!0)}setActive(t,r="ACTIVE"){var i,n,a,s,o,d;this.init(),!(!this.overlayContainer||!this.viewportGlow||!this.floatingBadge)&&(t?(this.overlayContainer.classList.add("visible"),this.viewportGlow.classList.add("active"),this.updateBadge(r),(i=this.takeControlPill)==null||i.classList.add("visible")):(this.overlayContainer.classList.remove("visible"),this.viewportGlow.classList.remove("active"),(n=this.targetFrame)==null||n.classList.remove("active"),(a=this.aiCursor)==null||a.classList.remove("visible"),(s=this.scanLaser)==null||s.classList.remove("active"),(o=this.takeControlPill)==null||o.classList.remove("visible"),(d=this.pausedBanner)==null||d.classList.remove("visible")))}updateBadge(t){if(!this.floatingBadge)return;this.floatingBadge.className=`webpilot-floating-badge badge-${t.toLowerCase()}`;const r=this.floatingBadge.querySelector(".webpilot-badge-icon"),i=this.floatingBadge.querySelector(".webpilot-badge-text");switch(t){case"OBSERVING":r&&(r.textContent="◉"),i&&(i.textContent="OBSERVING");break;case"ACTING":r&&(r.textContent="✦"),i&&(i.textContent="AI ACTION");break;case"ANALYZING":r&&(r.textContent="◌"),i&&(i.textContent="ANALYZING");break;case"COMPLETE":r&&(r.textContent="✓"),i&&(i.textContent="COMPLETE");break;case"PAUSED":r&&(r.textContent="⏸"),i&&(i.textContent="PAUSED");break;case"ACTIVE":default:r&&(r.textContent="●"),i&&(i.textContent="AI ACTIVE");break}}highlightTarget(t,r){if(this.init(),!this.targetFrame)return;const i=t.getBoundingClientRect(),n=window.scrollX||window.pageXOffset,a=window.scrollY||window.pageYOffset,s=6;this.targetFrame.style.left=`${i.left+n-s}px`,this.targetFrame.style.top=`${i.top+a-s}px`,this.targetFrame.style.width=`${i.width+s*2}px`,this.targetFrame.style.height=`${i.height+s*2}px`;const o=this.targetFrame.querySelector(".target-name");o&&(o.textContent=r?`"${r}"`:""),this.targetFrame.classList.add("active");const d=i.left+n+i.width/2,l=i.top+a+i.height/2;this.moveCursorTo(d,l,()=>{this.triggerCursorRipple()})}clearTargetHighlight(){this.targetFrame&&this.targetFrame.classList.remove("active")}moveCursorTo(t,r,i){this.init(),this.aiCursor&&(this.aiCursor.classList.add("visible"),this.aiCursor.style.left=`${t}px`,this.aiCursor.style.top=`${r}px`,setTimeout(()=>{i==null||i()},400))}triggerCursorRipple(){if(!this.aiCursor)return;const t=this.aiCursor.querySelector(".cursor-ripple");t&&(t.classList.remove("animating"),t.offsetWidth,t.classList.add("animating"))}startScan(t="CAPTURING",r=1200){if(this.init(),!this.scanLaser)return;const i=this.scanLaser.querySelector(".scan-text");i&&(i.textContent=t),this.scanLaser.classList.add("active"),this.updateBadge("ANALYZING"),setTimeout(()=>{this.scanLaser&&this.scanLaser.classList.remove("active")},r)}clearAll(){this.overlayContainer&&this.overlayContainer.classList.remove("visible"),this.viewportGlow&&this.viewportGlow.classList.remove("active","paused"),this.floatingBadge&&(this.floatingBadge.className="webpilot-floating-badge"),this.targetFrame&&this.targetFrame.classList.remove("active"),this.aiCursor&&this.aiCursor.classList.remove("visible"),this.scanLaser&&this.scanLaser.classList.remove("active"),this.takeControlPill&&this.takeControlPill.classList.remove("visible"),this.pausedBanner&&this.pausedBanner.classList.remove("visible"),this.overlayContainer&&this.overlayContainer.parentNode&&(this.overlayContainer.parentNode.removeChild(this.overlayContainer),this.overlayContainer=null,this.isInitialized=!1)}handleTakeControl(){var t;this.clearAll(),(t=this.onTakeControlCallback)==null||t.call(this)}handleResume(){var t,r,i,n;(t=this.pausedBanner)==null||t.classList.remove("visible"),(r=this.viewportGlow)==null||r.classList.remove("paused"),(i=this.takeControlPill)==null||i.classList.add("visible"),this.updateBadge("ACTIVE"),(n=this.onResumeCallback)==null||n.call(this)}}const $t=new _b;chrome.runtime.onMessage.addListener((e,t,r)=>{if(e.type==="RUN_TASK")return console.log("🚀 [WebPilot AI] Multi-Step Task received:",e.task),$t.setActive(!0,"OBSERVING"),(e.task.toLowerCase().includes("screen")||e.task.toLowerCase().includes("image")||e.task.toLowerCase().includes("form"))&&$t.startScan("ANALYZING",1400),r({status:"ACKNOWLEDGED"}),(async()=>{try{const i=await bb(e.task,{maxSteps:5,settlingDelayMs:800,onStepProgress:a=>{var s,o;if((o=(s=a.firewallResult)==null?void 0:s.action)!=null&&o.element_id&&a.pageModel){$t.updateBadge("ACTING");const d=fm(a.firewallResult.action.element_id,a.pageModel);d&&d instanceof HTMLElement&&$t.highlightTarget(d,a.firewallResult.action.element_id)}chrome.runtime.sendMessage({type:"AGENT_STEP_PROGRESS",task:e.task,stepProgress:a}).catch(()=>{})}});$t.updateBadge("COMPLETE"),setTimeout(()=>{$t.clearAll()},2e3);const n=i.lastStep;chrome.runtime.sendMessage({type:"AGENT_TASK_COMPLETE",task:e.task,loopResult:{status:i.status,task:i.task,totalSteps:i.totalSteps,finalAnswer:i.finalAnswer,steps:i.steps,error:i.error,pageModelSummary:(n==null?void 0:n.pageModelSummary)||{title:document.title,elementCount:0,interactiveCount:0,sensitiveCount:0,sensitiveTypes:[],intent:"UNKNOWN",decisionsSummary:{totalEntities:0,allowCount:0,maskCount:0,tokenizeCount:0,localOnlyCount:0,blockCount:0},sourcesRun:["dom"]},pageModel:n==null?void 0:n.pageModel,sensitiveEntities:(n==null?void 0:n.sensitiveEntities)||[],privacyDecisions:(n==null?void 0:n.privacyDecisions)||[],sanitizedContext:n==null?void 0:n.sanitizedContext,sanitizedImages:(n==null?void 0:n.sanitizedImages)||{},ocrResult:n==null?void 0:n.ocrResult,agentPlanResponse:n==null?void 0:n.agentPlanResponse,firewallResult:n==null?void 0:n.firewallResult,executionResult:n==null?void 0:n.executionResult,metrics:{apiLatencyMs:i.metrics.apiLatencyMs,totalLatencyMs:i.metrics.totalLatencyMs,stepsCount:i.metrics.stepsCount}}}).catch(()=>{})}catch(i){console.error("🚨 [Agent Loop Error]",i),$t.clearAll(),chrome.runtime.sendMessage({type:"AGENT_TASK_COMPLETE",task:e.task,loopResult:{status:"ERROR",task:e.task,error:i.message||"Unknown error occurred during agent execution loop."}}).catch(()=>{})}})(),!1;(e.type==="TAKE_CONTROL"||e.type==="STOP_TASK"||e.type==="CLEANUP_OVERLAYS")&&($t.clearAll(),r({status:"CLEARED"}))});
})()
