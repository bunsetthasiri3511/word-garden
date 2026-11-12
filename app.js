
const LV=["","A1","A2","B1","B2"],INT=[0,1,3,7,14,30,60],ST=["ยังไม่เรียน","เมล็ด","ต้นอ่อน","โตขึ้น","แข็งแรง","ออกดอก","ฝังแน่น"];
const $=s=>document.querySelector(/^[a-z]+$/i.test(s)?"#"+s:s),app=$("#app");
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const day=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
let S={c:{},cfg:{nw:10,lv:[1,2,3,4]},st:{last:0,streak:0,xp:0},td:{d:0,nw:0},fl:{}},G=null;
try{const r=JSON.parse(localStorage.getItem("wg1")||"null");if(r)S=Object.assign(S,r)}catch(e){}
const save=()=>{try{localStorage.setItem("wg1",JSON.stringify(S))}catch(e){}};
const td=()=>{if(S.td.d!==day())S.td={d:day(),nw:0};return S.td};
const MUL=()=>({e:1,n:1.5,h:2.5})[S.cfg.df||"n"];
const stage=i=>S.c[i]?S.c[i][0]:0;
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
let _u=null,VO=null;
function pickVoice(){const v=speechSynthesis.getVoices(),en=x=>/^en[-_]US/i.test(x.lang);VO=v.find(x=>en(x)&&/google|samantha|natural|enhanced/i.test(x.name))||v.find(en)||v.find(x=>/^en/i.test(x.lang))||null}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
let SERR="",SOK=false;
const say=t=>{try{if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){SERR="no-api";return}SOK=false;const ss=speechSynthesis,was=ss.speaking||ss.pending,u=_u=new SpeechSynthesisUtterance(t);u.lang="en-US";if(VO)u.voice=VO;u.rate=.9;u.onerror=e=>{SERR=e.error||"error"};u.onstart=()=>{SOK=true;SERR=""};if(was)ss.cancel();const go=()=>{ss.resume();ss.speak(u)};was?setTimeout(go,80):go()}catch(e){SERR=String(e)}};
function unlock(){try{const u=new SpeechSynthesisUtterance(" ");u.volume=0;speechSynthesis.speak(u)}catch(e){}}
addEventListener("touchend",unlock,{once:true});addEventListener("click",unlock,{once:true});
function tst(b){const o=b.textContent;SERR="";say("Hello, this is a sound test.");b.textContent="กำลังทดสอบ...";setTimeout(()=>{b.textContent=!window.speechSynthesis?"❌ เบราว์เซอร์นี้ไม่รองรับเสียง ลองเปิดลิงก์ใน Safari/Chrome":SERR?"❌ เสียงมีปัญหา ("+SERR+")":SOK?"✅ ส่งเสียงแล้ว ถ้าไม่ได้ยิน เช็กระดับเสียงและปิดโหมดเงียบ":"⚠️ ไม่มีเสียงตอบกลับ (เครื่องอาจไม่มีเสียงอ่านภาษาอังกฤษ)";setTimeout(()=>b.textContent=o,7000)},1800)}
const ALT={"big": ["ขนาดใหญ่", "โต"], "large": ["ขนาดใหญ่", "กว้างขวาง"], "house": ["เรือน", "ที่พักอาศัย"], "home": ["ที่พัก", "บ้านเกิด"], "happy": ["ดีใจ", "สุขใจ"], "sad": ["ทุกข์ใจ", "เสียใจ"], "tired": ["อ่อนเพลีย", "เพลีย"], "hungry": ["ท้องร้อง", "อยากอาหาร"], "beautiful": ["งดงาม", "น่ามอง"], "pretty": ["น่ารัก", "สวยน่ารัก"], "fast": ["เร็ว", "ไว"], "quick": ["เร็ว", "ฉับไว"], "slow": ["เชื่องช้า"], "small": ["เล็กน้อย", "จิ๋ว"], "little": ["จิ๋ว", "นิดเดียว"], "start": ["เปิด", "ออกตัว"], "begin": ["เปิดฉาก", "ตั้งต้น"], "buy": ["จับจ่าย", "ซื้อหา"], "look": ["เหลียวมอง", "ดู"], "see": ["มองเห็น", "พบ"], "watch": ["ชม", "เฝ้าดู"], "talk": ["สนทนา", "คุย"], "speak": ["กล่าว", "พูดจา"], "say": ["กล่าว", "บอก"], "tell": ["เล่า", "แจ้ง"], "eat": ["รับประทาน", "ทาน"], "drink": ["ดื่มน้ำ", "กิน (ของเหลว)"], "child": ["ลูก", "เด็กน้อย"], "kid": ["เด็กน้อย", "ลูก"], "boy": ["เด็กหนุ่ม", "ลูกชาย"], "girl": ["เด็กสาว", "ลูกสาว"], "man": ["บุรุษ", "ชาย"], "woman": ["สตรี", "หญิง"], "car": ["รถ", "รถเก๋ง"], "bike": ["ปั่นจักรยาน", "จักรยานยนต์"], "money": ["ตังค์", "เงินทอง"], "job": ["อาชีพ", "การงาน"], "work": ["การงาน", "ทำการ"], "idea": ["ไอเดีย", "แนวคิด"], "hard": ["แข็ง", "ลำบาก"], "easy": ["สบาย", "ไม่ยาก"], "difficult": ["ลำบาก", "ไม่ง่าย"], "important": ["จำเป็น", "มีความหมาย"], "nice": ["น่าคบ", "ดีงาม"], "good": ["เยี่ยม", "เก่ง"], "great": ["เก่งมาก", "วิเศษ"], "hello": ["หวัดดี", "ทักทาย"], "goodbye": ["แล้วเจอกัน", "บ๊ายบาย"], "yes": ["ครับ/ค่ะ", "อื้อ"], "no": ["ไม่ใช่", "ห้าม"], "help": ["ช่วยเหลือ", "ให้ความช่วยเหลือ"], "ask": ["สอบถาม", "ขอ"], "answer": ["คำตอบ", "ตอบกลับ"], "stop": ["เลิก", "หยุดยั้ง"], "find": ["ค้นพบ", "เจอ"], "get": ["รับ", "เอามา"], "give": ["มอบ", "ส่งให้"], "make": ["สร้าง", "ผลิต"], "use": ["ใช้งาน", "นำมาใช้"], "want": ["อยากได้", "ปรารถนา"], "need": ["ขาดไม่ได้", "จำเป็น"], "like": ["ถูกใจ", "นิยม"], "love": ["หลงรัก", "ชอบมาก"], "hate": ["ชัง", "ไม่ชอบมาก"], "think": ["นึก", "ครุ่นคิด"], "know": ["ทราบ", "รู้จัก"], "understand": ["เข้าใจแจ่มแจ้ง", "รู้เรื่อง"], "remember": ["นึกออก", "จดจำ"], "forget": ["หลงลืม", "ลืมเลือน"], "road": ["เส้นทาง", "ถนนหนทาง"], "street": ["ซอย", "ถนนในเมือง"], "town": ["ตัวเมืองเล็ก ๆ", "เมืองเล็ก"], "city": ["นคร", "ตัวเมือง"], "father": ["บิดา", "คุณพ่อ"], "mother": ["มารดา", "คุณแม่"], "dad": ["ป๊า", "ป๋า"], "mom": ["มัม", "หม่าม้า"]};
const tp=d=>d.t.split(/\s*[;,]\s*|\s*\/\s*/).filter(Boolean);
function tm(d){const a=tp(d),x=(ALT[d.w]||[]).filter(v=>!a.includes(v));return `<div class="th">${a.map(E).join(' <span class="mu">·</span> ')}</div>`+(x.length?`<div class="mu" style="margin-top:4px">หรือ: ${x.map(E).join(" · ")}</div>`:"")}
function sibHtml(d){const l=D.filter(o=>o.t===d.t&&o.w!==d.w).map(o=>o.w);if(!l.length)return"";return `<br><span class="mu">${G&&G.alt?"✓ คำนี้ก็ถูก · ":""}คำแปลเดียวกันกับ: ${l.map(E).join(", ")}</span>`}
const nt=d=>`<div class="mu">${d.n?E(d.n)+" · ":""}${E(d.p)}<span class="ch">${LV[d.l]}</span></div>`;
const hl=d=>d.a<0?E(d.x):E(d.x.slice(0,d.a))+"<mark>"+E(d.x.slice(d.a,d.b))+"</mark>"+E(d.x.slice(d.b));
const flg=i=>`<button class="ghost" onclick="tf(${i},this)">${S.fl[i]?"⚑ ทำเครื่องหมายแล้ว":"⚐ คำแปลแปลกๆ"}</button>`;
function tf(i,b){if(S.fl[i])delete S.fl[i];else S.fl[i]=1;save();b.textContent=S.fl[i]?"⚑ ทำเครื่องหมายแล้ว":"⚐ คำแปลแปลกๆ"}

let EVT=-9e3,PV={},K,M,TAB=0,SH="h",T0=-9e3,LA=0,WK=0,EAT=-9e3,W={x:0,tx:0,sp:.02,next:0},pt=[];
const STN=["ไข่ดาว","ลูกแมว","แมววัยรุ่น","แมวโตเต็มวัย","แมวขั้นสูงสุด"],AUT={l:"แสง",s:"เงา",a:"ฟ้า",e:"ดิน"},RT=["","ธรรมดา","หายาก","มหากาพย์","ตำนาน"],NS=[1,150,600,1500];
const HINT={angel:"แสงนำ ฟ้าเด่นกว่าดิน",demon:"เงานำ ฟ้าเด่นกว่าดิน",forest:"แสงนำ ดินเด่นกว่าฟ้า",cerb:"เงานำ ดินเด่นกว่าฟ้า",cosmos:"ทั้ง 4 สไตล์สมดุลกัน",fallen:"ช่วงวัยรุ่นแสงนำ แต่หลังจากนั้นเงาแซง",poison:"ดินสูง แสงและเงาพอๆ กัน",storm:"ฟ้ามาก (เรียนคำใหม่เยอะ)",gaia:"ดินมาก (เล่นสม่ำเสมอ)"};
const stageOf=n=>{const t=TH();return n<t[0]?0:n<t[1]?1:n<t[2]?2:n<t[3]?3:4},lvl=v=>1+Math.floor(Math.sqrt((v||0)/40));
const XS=[30,8000,30000,75000],UNL={dog:{st:2,p:500},pig:{st:2,p:500},bear:{st:2,p:500},rabbit:{st:2,p:500},hamster:{st:2,p:450},fox:{st:2,p:600},tiger:{st:3,p:1200}};
const SPC={cat:{nm:"Cat",th:"แมว",e:"🐱",fur0:"#d9c9b0",base:"#d9c9b0",d:[0,0,0,0],ear:"cat",tn:6},dog:{nm:"Dog",th:"หมา",e:"🐶",fur0:"#d8b88a",base:"#c9a06a",d:[1,0,0,0],ear:"dog",tn:4},pig:{nm:"Pig",th:"หมู",e:"🐷",fur0:"#f4b6c2",base:"#f4a6b8",d:[3,2,1,0],ear:"pig",tn:0},bear:{nm:"Bear",th:"หมี",e:"🐻",fur0:"#a67c52",base:"#8a6040",d:[3,2,2,1],ear:"bear",tn:0},fox:{nm:"Fox",th:"จิ้งจอก",e:"🦊",fur0:"#f0a050",base:"#e8923a",d:[1,0,0,0],ear:"fox",tn:5},rabbit:{nm:"Rabbit",th:"กระต่าย",e:"🐰",fur0:"#f4f0ea",base:"#f2eee8",d:[0,0,0,0],ear:"rabbit",tn:0},hamster:{nm:"Hamster",th:"แฮมสเตอร์",e:"🐹",fur0:"#f0d6a8",base:"#e8c68a",d:[1,0,2,1],ear:"bear",tn:0},tiger:{nm:"Tiger",th:"เสือ",e:"🐯",fur0:"#e8c070",base:"#e8a23a",d:[2,1,1,1],ear:"tiger",tn:6},fox9:{nm:"Kitsune",th:"จิ้งจอกเก้าหาง",e:"🦊",fur0:"#f6efe2",base:"#f6efe2",d:[3,1,1,1],ear:"fox",tn:0,gm:1,form:"kitsune",bg:6},dgn:{nm:"Dragon",th:"มังกรเทพ",e:"🐉",fur0:"#e8b43a",base:"#e8b43a",d:[4,3,2,1],ear:"cat",tn:9,gm:1,form:"divdrag",bg:1}};
const isCat=()=>(K.sp||"cat")=="cat",TH=()=>isCat()?NS:XS,prog=()=>isCat()?Object.keys(S.c).length:(K.xp||0);
const mix=(a,b,k)=>{const p=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)),A=p(a),B=p(b);return"#"+A.map((v,i)=>("0"+Math.round(v*(1-k)+B[i]*k).toString(16)).slice(-2)).join("")};
const fn=(k,two,sp)=>{sp=sp||K.sp||"cat";const n=two?FORMS[k].n2:FORMS[k].n;if(sp=="cat"||SPC[sp].gm)return n;return/Cat/.test(n)?n.replace(/Cat/g,SPC[sp].nm):n+" ("+SPC[sp].nm+")"};
const stn=(i,sp)=>STN[i].replace("แมว",SPC[sp||"cat"].th);
const addXp=v=>{S.st.xp+=v;if(!isCat())K.xp=(K.xp||0)+v};
let PVB=null,PVS=null,PVC=null;
const BG=[["ทุ่งหญ้ายามเช้า",150,"#6ec3ff","#e4f6ff","#4f9a4a","#6fbf6a","sun"],["พระอาทิตย์ตก",250,"#ff7a5a","#ffd27a","#6a4a3a","#8a4a5a","set"],["ทุ่งหิมะ",250,"#9fb4d8","#e8f0ff","#f4f8ff","#cfd8ec","snow"],["ซากุระบาน",400,"#ffc8e0","#fff0f6","#8fc47a","#f6b6d0","sakura"],["ชายหาด",400,"#5bc8ff","#c8f0ff","#f0dca0","#3a9ad0","beach"],["เมืองยามค่ำ",600,"#0a0a2a","#3a2a6a","#1a1a2a","#15152e","city"],["ป่าเวทมนตร์",600,"#1a3a2a","#3a6a4a","#2a5a30","#1f4a2a","forest"],["อวกาศ",800,"#05030f","#1a1250","#2a2a4a","#3a3a5e","space"],
["สุสานฮาโลวีน",600,"#150a24","#6a2a4a","#1f1a28","#2a1f38","grave"],
["ทุ่งฟักทอง",500,"#2a1a3a","#ff8a3a","#3a2a1a","#4a3020","pumpkin"],
["คฤหาสน์ผีสิง",700,"#0e0a22","#4a2a6a","#16121e","#201a30","haunted"],
["เมืองซอมบี้",700,"#1e2a12","#a0b050","#3a3c30","#2a3220","apoc"],
["ทะเลทราย",400,"#ffb870","#ffe9b0","#e8c070","#f0cf88","desert"],
["ภูเขาไฟ",800,"#2a0808","#ff5a1a","#2a1a1a","#3a1a14","volcano"],
["ใต้ทะเล",600,"#0a4a8a","#4ac8e8","#e8d49a","#c8b072","ocean"],
["แสงเหนือ",700,"#05102a","#0a3a4a","#e8f0ff","#9fb4d8","aurora"],
["ใบไม้ร่วง",400,"#ffcf8a","#fff0d0","#7a4a20","#a0642a","autumn"],
["นีออนยามค่ำ",800,"#12063a","#ff2aa0","#0a0420","#2a0a5a","neon"],
["ทุ่งทานตะวัน",350,"#6ec3ff","#fff3b0","#4f9a4a","#6fbf6a","sunflower"],
["ถ้ำคริสตัล",650,"#0a0618","#2a1a5a","#1a1430","#241a44","cave"]];
const SKD={cat:{tabby:["แมวส้ม","#e8923a","#e8b070",250,"tabby"],black:["แมวดำ","#2a2a33","#3a3a44",250,null],calico:["แมวสามสี","#f4efe6","#f0e6d8",450,"calico"]},dog:{dal:["ดัลเมเชียน","#f2f2f2","#f4f4f4",350,"dal"],husky:["ฮัสกี้","#8a96a8","#a0aab8",450,"husky"],shiba:["ชิบะ","#d9893f","#e0a060",350,"shiba"]},pig:{black:["หมูดำ","#5a5058","#6a6068",250,null],spot:["หมูลายจุด","#f4b6c2","#f6c8d0",350,"pspot"]},bear:{panda:["แพนด้า","#f6f6f8","#f8f8fa",500,"panda",1],polar:["หมีขาว","#eef4fa","#f4f8fc",300,null],black:["หมีดำ","#3a3a40","#4a4a52",300,null],honey:["หมีน้ำผึ้ง","#d9a63a","#e8c070",250,null]},fox:{arctic:["จิ้งจอกขาว","#f4f4f6","#f6f6f8",350,null,1],silver:["จิ้งจอกเงิน","#9aa0ad","#b0b6c2",350,null,1],dark:["จิ้งจอกดำ","#3a3a44","#4a4a54",300,null,1]},rabbit:{brown:["กระต่ายน้ำตาล","#b08a5a","#c8a070",250,null,1],gray:["กระต่ายเทา","#9a9aa6","#b0b0bc",250,null,1],black:["กระต่ายดำ","#2a2a33","#3a3a44",300,null,1]},hamster:{white:["แฮมสเตอร์ขาว","#f4f0ea","#f6f2ec",250,null,1],gray:["แฮมสเตอร์เทา","#9a9aa6","#b0b0bc",250,null,1]},tiger:{white:["เสือขาว","#f2f0ec","#f4f2ee",450,null,1],black:["เสือดำ","#2a2a33","#3a3a44",450,null,1]}};
Object.assign(SKD.cat,{gray:["แมวเทา","#9a9aa6","#b0b0bc",250,null,1],white:["แมวขาว","#f4f2ee","#f6f4f0",250,null,1],cream:["แมวครีม","#efd9b0","#f2e2c0",300,null,1]});
Object.assign(SKD.dog,{gold:["โกลเด้น","#e8c070","#efd08c",300,null,1],choc:["ช็อกโกแลต","#6a4a38","#85624a",300,null,1],collie:["บอร์เดอร์คอลลี่","#2a2a33","#3a3a44",450,"husky",1]});
Object.assign(SKD.pig,{boar:["หมูป่า","#7a5a44","#8f6e56",300,null,1],cow:["หมูลายวัว","#f6f0f0","#f8f4f4",400,"pspot",1],gold:["หมูทอง","#e8c050","#f0d070",600,null,1]});
Object.assign(SKD.bear,{red:["หมีน้ำตาลแดง","#a0522d","#b8683e",250,null,1],pink:["หมีชมพู","#f4a6c0","#f8bcd0",350,null,1]});
Object.assign(SKD.fox,{gold:["จิ้งจอกทอง","#e8c060","#f0d080",350,null,1],violet:["จิ้งจอกม่วง","#8a6ad0","#a088e0",450,null,1]});
Object.assign(SKD.rabbit,{spot:["กระต่ายลายจุด","#f4f0ea","#f6f2ec",350,"pspot",1],pink:["กระต่ายชมพู","#f4b6c8","#f8c8d6",300,null,1],blue:["กระต่ายฟ้า","#9fd0f0","#b4def6",300,null,1]});
Object.assign(SKD.hamster,{gold:["แฮมสเตอร์ทอง","#e0a030","#ecb850",250,null,1],tri:["แฮมสเตอร์สามสี","#f4efe6","#f6f2ea",400,"calico",1],black:["แฮมสเตอร์ดำ","#3a3a44","#4a4a54",300,null,1]});
Object.assign(SKD.tiger,{gold:["เสือทอง","#f0c040","#f4d060",500,null,1],blue:["เสือน้ำเงิน","#6a8fd8","#86a6e4",550,null,1]});
Object.assign(SPC,{wolf:{nm:"Wolf",th:"หมาป่า",e:"🐺",fur0:"#c8ccd4",base:"#8a909c",d:[2,1,1,1],ear:"wolf",tn:7},lion:{nm:"Lion",th:"สิงโต",e:"🦁",fur0:"#e8c880",base:"#d9a441",d:[3,2,1,1],ear:"lion",tn:4},koala:{nm:"Koala",th:"โคอาลา",e:"🐨",fur0:"#c4c4cc",base:"#9a9aa6",d:[2,2,2,1],ear:"koala",tn:0}});
Object.assign(UNL,{wolf:{st:2,p:700},koala:{st:2,p:650},lion:{st:3,p:1500}});SKD.wolf={};SKD.lion={};SKD.koala={};
const AS=(sp,o)=>{for(const k in o){const v=o[k];SKD[sp][k]=[v[0],v[1],mix(v[1],'#ffffff',.2),v[2],v[3]||null,1]}};
AS('cat',{violet:['แมวม่วง','#8a6ad0',300],sky:['แมวฟ้า','#7fb8e8',300],mint:['แมวมินต์','#8fe0c0',300],dalm:['แมวลายด่าง','#f4f2ee',400,'dal']});
AS('dog',{pug:['ปั๊กเทา','#a0a0a8',300],poodle:['พุดเดิ้ลชมพู','#f4b6c8',350],rott:['ร็อตไวเลอร์','#3a2a26',400]});
AS('pig',{violet:['หมูม่วง','#b08ad0',300],sky:['หมูฟ้า','#9fd0f0',300],mint:['หมูมินต์','#9fe0c0',300]});
AS('bear',{violet:['หมีม่วง','#8a6ad0',300],sky:['หมีฟ้า','#7fb8e8',300],yellow:['หมีเหลือง','#f0d060',300]});
AS('fox',{crimson:['จิ้งจอกแดงเข้ม','#b02a1a',350],sky:['จิ้งจอกฟ้า','#7fb8e8',350],ice:['จิ้งจอกน้ำแข็ง','#cfe6f4',400]});
AS('rabbit',{violet:['กระต่ายม่วง','#b08ad0',300],yellow:['กระต่ายเหลือง','#f0d870',300],cocoa:['กระต่ายช็อก','#6a4a38',300]});
AS('hamster',{pink:['แฮมสเตอร์ชมพู','#f4b6c8',250],sky:['แฮมสเตอร์ฟ้า','#9fd0f0',250],pandah:['แฮมสเตอร์แพนด้า','#f6f6f8',450,'panda']});
AS('tiger',{violet:['เสือม่วง','#8a6ad0',500],green:['เสือเขียว','#6fbf6a',500],red:['เสือแดง','#d04a3a',500]});
AS('wolf',{white:['หมาป่าขาว','#f0f2f6',400],black:['หมาป่าดำ','#2a2a33',400],brown:['หมาป่าน้ำตาล','#7a5a44',350]});
AS('lion',{white:['สิงโตขาว','#f4efe6',600],dark:['สิงโตเงา','#3a3040',600],red:['สิงโตแดง','#c04a2a',500]});
AS('koala',{brown:['โคอาลาน้ำตาล','#8a6a50',300],white:['โคอาลาขาว','#f0eeee',350],sky:['โคอาลาฟ้า','#9fc0e8',300]});
for(const sp in SKD){SKD[sp].zombie=["ซอมบี้"+SPC[sp].th,"#8fae7a","#a4c08e",450,"zombie",1];SKD[sp].hallo=["ฮาโลวีน"+SPC[sp].th,"#2d2340","#3a2e50",500,"hallo",1]}
const curBg=()=>PVB!=null?PVB:(K.bg==null?-1:K.bg);
function skinData(k){const sp=k.sp||"cat";let id=k.sk;if(PVS!=null&&k===S.pets[S.pet])id=PVS;const r=id&&SKD[sp]&&SKD[sp][id];return r?{base:r[1],fur0:r[2],ov:r[4],fix:r[5]}:null}
function skOv(o,a){const{bx,by,bw,bh,hx,hy,hw,hh,ey,es,e1,e2}=a,B="#2f2f3a",hb=hh-(ey-hy)-es-1;
 if(o=="panda"){const G="#5a5a6a";R(hx-2,hy-3,6,5,B);R(hx+hw-4,hy-3,6,5,B);R(hx-1,hy-4,4,1,B);R(hx+hw-3,hy-4,4,1,B);R(hx,hy-2,2,2,G);R(hx+hw-2,hy-2,2,2,G);ell(rd(e1+es/2),rd(ey+es/2),3,4,B,1);ell(rd(e2+es/2),rd(ey+es/2),3,4,B,1);R(bx,by+2,3,bh-3,B);R(bx+bw-3,by+2,3,bh-3,B);R(bx+2,by+1,bw-4,2,B);R(bx+1,by+bh-3,5,3,B);R(bx+bw-6,by+bh-3,5,3,B);R(bx+2,by+bh,4,2,B);R(bx+bw-6,by+bh,4,2,B);R(bx+3,by+bh,2,1,G);R(bx+bw-5,by+bh,2,1,G)}
 else if(o=="dal"){for(const p of[[bx+3,by+3],[bx+bw-6,by+5],[hx+3,hy+2],[hx+hw-6,hy+4]])R(p[0],p[1],2,2,"#2a2a2a")}
 else if(o=="husky"){R(hx+2,ey+es,hw-4,hb,"#f0f0f0");R(bx+3,by+bh-5,bw-6,5,"#f0f0f0")}
 else if(o=="shiba"){R(bx+3,by+bh-4,bw-6,4,"#f6e8d0");R(hx+1,ey+es,3,hb,"#f6e8d0");R(hx+hw-4,ey+es,3,hb,"#f6e8d0")}
 else if(o=="zombie"){const S="#243020",BL="#8a1a1a",cx=bx+(bw>>1);
  R(bx+2,by+3,bw-4,1,S);for(let i=0;i<bw-5;i+=2)R(bx+3+i,by+2,1,3,S);
  R(bx+bw-7,by+bh-6,5,4,"#6e7a66");R(bx+bw-6,by+bh-5,2,1,"#a06a6a");R(bx+3,by+bh-5,3,2,"#5f6f58");
  R(hx+2,hy+2,5,4,"#5f6f58");R(hx+3,hy+3,2,1,BL);
  R(hx+hw-9,hy+hh-6,6,1,S);for(let i=0;i<3;i++)R(hx+hw-8+i*2,hy+hh-7,1,3,S);
  R(cx+2,hy+hh-2,1,3,BL);R(cx+2,hy+hh+1,1,1,"#c02a2a")}
 else if(o=="hallo"){const OR="#ff8a1a",K="#140c1c",cx=bx+(bw>>1),y=Math.max(by+3,by+bh-7);
  R(cx-4,y,8,6,OR);R(cx-5,y+1,10,4,OR);R(cx-1,y-2,2,2,"#3f9a45");R(cx-3,y+1,1,2,K);R(cx+2,y+1,1,2,K);R(cx-2,y+4,4,1,K);R(cx-3,y+3,1,1,K);R(cx+2,y+3,1,1,K);
  R(bx+2,by+2,3,2,OR);R(bx+bw-5,by+3,3,2,OR);
  R(hx+2,hy+1,2,3,OR);R(hx+hw-4,hy+1,2,3,OR);R(hx+(hw>>1)-1,hy+1,2,2,OR)}
 else if(o=="tabby"){for(let i=0;i<4;i++)R(bx+2+i*((bw-4)/3|0),by+1,1,3,"#b8601a");R(hx+(hw>>1)-1,hy+1,1,3,"#b8601a")}
 else if(o=="calico"){R(bx+2,by+2,5,4,"#e8923a");R(bx+bw-7,by+3,5,4,"#3a3a3a");R(hx+2,hy+1,5,4,"#e8923a");R(hx+hw-6,hy+2,4,3,"#3a3a3a")}
 else if(o=="pspot"){R(bx+2,by+2,5,4,"#4a4046");R(hx+hw-7,hy+1,5,4,"#4a4046")}}
function bgDraw(t,b){bgDraw0(t,b);bgB(t,b[6],b)}
function bgDraw0(t,b){const c1=b[2],c2=b[3],gd=b[4],hl=b[5],k=b[6];
 for(let i=0;i<8;i++)R(0,i*7,64,8,mix(c1,c2,i/7));
 if(k=="sun"){ell(50,12,6,6,"#fff3a0",1);for(let i=0;i<3;i++)ell(((i*31+t/500)%84)-10,9+i*7,7,3,"#fff",.9)}
 if(k=="set"){ell(32,GY-12,14,14,"#ffd27a",.3);ell(32,GY-12,10,10,"#fff0b0",1)}
 if(k=="beach"){ell(14,12,6,6,"#fff3a0",1)}
 if(k=="city"){ell(50,10,5,5,"#fff6c8",1);for(let i=0;i<9;i++){const h=14+(i*7)%16;R(i*7,GY-h,6,h,"#1a1a3a");for(let j=0;j<6;j++)R(i*7+1+(j%2)*3,GY-h+2+(j>>1)*4,2,2,(i*3+j)%3?"#ffe08a":"#2a2a50")}}
 if(k=="space"){for(let i=0;i<30;i++)if((Math.floor(t/300)+i)%4)R((i*37)%62+1,(i*23)%48+2,1,1,i%3?"#8a7fc0":"#fff");ell(46,16,7,7,"#c9a6ff",1);ell(44,14,3,3,"#e6d4ff",1);R(36,20,20,1,"#7a5ad0")}
 if(k=="forest")for(let i=0;i<7;i++){const x0=i*10-1;R(x0+3,GY-7,2,7,"#4a3a2a");ell(x0+4,GY-13,6,9,"#1f5a35",1)}
 if(k=="sakura")for(const x0 of[6,52]){R(x0,GY-14,3,14,"#6a4a3a");ell(x0+1,GY-18,9,7,"#f6a8c8",1);ell(x0-2,GY-14,5,4,"#ffc0d8",1)}
 bgA(t,k,b);
 for(let i=0;i<64;i+=2){const h=7+rd((Math.sin(i*.25+1)+Math.sin(i*.09))*3);R(i,GY-h,2,h,hl)}
 R(0,GY,64,8,gd);R(0,GY,64,1,mix(gd,"#ffffff",.25));
 if(k=="snow")for(let i=0;i<26;i++)R((i*37+Math.sin(t/900+i)*3+64)%64,(t/30+i*17)%GY,1,1,"#fff");
 if(k=="sakura")for(let i=0;i<14;i++)R((i*29+t/50)%64,(t/40+i*13)%GY,2,1,"#ffb3d1");
 if(k=="beach")for(let i=0;i<6;i++)R((i*13+t/60)%64,GY-5+(i%2),4,1,"#e8faff");
 if(k=="forest")for(let i=0;i<8;i++)R(32+Math.sin(t/700+i)*28,30+Math.cos(t/500+i*2)*14,1,1,(Math.floor(t/200)+i)%3<1?"#c8ff5a":"#7a9a3a")}

const RA=(a,b,w,h,c,al)=>{x.globalAlpha=al;R(a,b,w,h,c);x.globalAlpha=1};
function batp(bx,by,t,i){const f=(t/110+i|0)%2,c="#0a0610";R(bx,by,2,1,c);R(bx-2,by-f,2,1,c);R(bx+2,by-f,2,1,c);R(bx-3,by-f+1,1,1,c);R(bx+4,by-f+1,1,1,c)}
function bgA(t,k,b){const S=Math.sin,C=Math.cos;
 if(k=="grave"){ell(46,14,9,9,"#ffb86a",.22);ell(46,14,6,6,"#ffd89a",1);R(44,12,2,2,"#f0b070");R(48,16,2,1,"#f0b070");
  const T="#120a1a";R(8,GY-22,2,22,T);ln([9,GY-16],[3,GY-25],T);ln([9,GY-19],[17,GY-28],T);ln([9,GY-12],[16,GY-17],T);ln([3,GY-25],[1,GY-28],T);
  for(let i=0;i<3;i++)batp(((t/40+i*23)%72)-4,8+i*6+S(t/200+i)*2,t,i)}
 else if(k=="pumpkin"){ell(14,12,6,6,"#fff0c0",.25);ell(14,12,4,4,"#fff6d8",1);R(54,GY-20,2,20,"#120a1a");ln([55,GY-14],[49,GY-22],"#120a1a");ln([55,GY-17],[60,GY-25],"#120a1a");
  for(let i=0;i<2;i++)batp(((t/50+i*30)%72)-4,10+i*8+S(t/220+i)*2,t,i)}
 else if(k=="haunted"){ell(14,14,9,9,"#e8e0ff",.18);ell(14,14,6,6,"#f4f0ff",1);R(12,12,2,2,"#d0c8f0");R(16,16,2,1,"#d0c8f0");
  const H="#0d0816";R(34,GY-22,20,22,H);poly([[32,GY-22],[44,GY-33],[56,GY-22]],H);R(52,GY-31,5,12,H);poly([[51,GY-31],[54.5,GY-37],[58,GY-31]],H);R(37,GY-30,2,6,H);
  R(38,GY-16,3,4,(t/260|0)%9?"#ffc84a":"#3a2a10");R(46,GY-16,3,4,"#ffc84a");R(53,GY-26,2,3,(t/400|0)%3?"#ffc84a":"#3a2a10");R(42,GY-9,4,9,"#05030a");
  for(let i=0;i<3;i++)batp(((t/45+i*26)%72)-4,8+i*5+S(t/200+i)*2,t,i);
  if(t%7000<110)RA(0,0,64,GY,"#ffffff",.3)}
 else if(k=="apoc"){ell(48,16,9,9,"#d8e090",.2);ell(48,16,5,5,"#e8f0a0",1);
  for(let i=0;i<7;i++){const x0=i*9,h=14+(i*11)%18;R(x0,GY-h,8,h,"#1c2414");R(x0+2+(i%3),GY-h-2,3,2,"#1c2414");for(let j=0;j<6;j++)R(x0+1+(j%2)*3,GY-h+3+(j>>1)*4,2,2,(i+j)%5?"#0e140a":"#8aa040")}
  for(let i=0;i<3;i++)ell(18+i*17+S(t/900+i)*2,GY-28-((t/70+i*9)%18),5,3,"#4a5a30",.18)}
 else if(k=="desert"){ell(32,18,11,11,"#fff0a0",.3);ell(32,18,7,7,"#fffbe0",1);for(let i=0;i<2;i++)ell(((t/160+i*38)%92)-14,8+i*7,8,2,"#fff",.55)}
 else if(k=="volcano"){ell(32,GY-26,24,15,"#ff6a2b",.16);poly([[6,GY],[27,GY-27],[37,GY-27],[58,GY]],"#1a0a0a");R(28,GY-28,8,2,"#ffb02b");ln([30,GY-26],[25,GY-8],"#ff5a1a");ln([33,GY-26],[37,GY-9],"#ff7a2a");ln([32,GY-26],[32,GY-14],"#ff5a1a");
  for(let i=0;i<14;i++){const u=(t/25+i*13)%36;R(31+S(i*5.3)*u*.7,GY-28-u,1,1,i%2?"#ffb02b":"#ff5a1a")}}
 else if(k=="ocean"){for(let i=0;i<4;i++)RA(8+i*15+(t/300)%3,0,3,GY,"#ffffff",.07);
  for(let i=0;i<3;i++){const fx=((t/(30+i*12)+i*30)%80)-8,fy=14+i*11+S(t/300+i)*2,c=["#ffb13b","#ff7aa8","#7fe0ff"][i];R(fx,fy,4,2,c);R(fx-2,fy-1+(t/150+i|0)%2,2,3,c);R(fx+3,fy,1,1,"#111")}}
 else if(k=="aurora"){for(let i=0;i<24;i++)if((Math.floor(t/350)+i)%4)R((i*37)%62+1,(i*23)%30+2,1,1,i%3?"#8ab0d0":"#fff");
  const cl=["#3affb0","#5ab0ff","#c26bff"];for(let q=0;q<3;q++)for(let xx=0;xx<64;xx++){const y0=8+q*6+S(xx*.12+t/700+q*1.7)*5;RA(xx,y0,1,12,cl[q],.14);RA(xx,y0,1,2,cl[q],.45)}
  for(const x0 of[7,55]){poly([[x0-6,GY],[x0,GY-16],[x0+6,GY]],"#0e3a3a");poly([[x0-3,GY-9],[x0,GY-16],[x0+3,GY-9]],"#e8f0ff")}}
 else if(k=="autumn"){ell(48,20,6,6,"#ffe9b0",1);for(const x0 of[8,54]){R(x0,GY-14,3,14,"#5a3a1a");ell(x0+1,GY-20,9,8,"#e8761a",1);ell(x0-3,GY-17,5,4,"#c2451a",1);ell(x0+5,GY-18,5,4,"#ffb13b",1)}}
 else if(k=="neon"){ell(32,GY-10,14,14,"#ff5ac8",.25);ell(32,GY-10,12,12,"#ffd03a",1);for(let j=0;j<4;j++)R(19,GY-10+j*3,26,1+(j>>1),"#c81a9a");
  for(let i=0;i<16;i++)if((Math.floor(t/250)+i)%3)R((i*37)%62+1,(i*19)%30+2,1,1,i%2?"#2ad8ff":"#fff")}
 else if(k=="sunflower"){ell(50,10,7,7,"#fff3a0",1);for(let i=0;i<8;i++){const a=i*.785+t/3000;ln([50+C(a)*9,10+S(a)*9],[50+C(a)*12,10+S(a)*12],"#fff3a0")}for(let i=0;i<2;i++)ell(((t/150+i*40)%92)-14,10+i*9,8,3,"#fff",.9)}
 else if(k=="cave"){for(let i=0;i<9;i++){const x0=i*8+3,h=6+(i*5)%9;poly([[x0-4,0],[x0,h],[x0+4,0]],"#1a1030")}
  for(const[x0,c]of[[18,"#7fe0ff"],[46,"#c26bff"]]){const g=.12+.06*S(t/500+x0);ell(x0+2,GY-12,13,13,c,g);poly([[x0-1,GY],[x0+1,GY-24],[x0+3,GY-27],[x0+5,GY-23],[x0+6,GY]],c);R(x0+2,GY-22,1,14,"#fff")}}
}
function bgB(t,k,b){const S=Math.sin;
 if(k=="grave"){for(const[x0,h]of[[4,10],[14,7],[48,9],[56,12]]){R(x0,GY-h+4,6,h,"#3a3248");R(x0+1,GY-h+3,4,1,"#3a3248");R(x0+2,GY-h+6,2,5,"#241c30");R(x0+1,GY-h+8,4,1,"#241c30")}
  for(let i=0;i<4;i++)ell(((t/60+i*24)%90)-12,GY-1+i%2,11,2,"#9a8aaa",.16)}
 else if(k=="pumpkin"){for(const[px,r]of[[6,6],[15,4],[49,5],[57,7]]){const f=(t/180+px|0)%9?1:0;ell(px,GY+3,r,r-1,"#f08a1a",1);ell(px-r/3,GY+2,r/2,r-2,"#ff9a2a",1);R(px-1,GY+3-r,2,2,"#3f6a2a");
   ell(px,GY+3,r+3,r+2,"#ffb02b",f?.18:.08);const e=Math.max(1,r/3|0);R(px-r/2,GY+1,e+1,e+1,f?"#ffe066":"#5a2a0a");R(px+r/2-e-1,GY+1,e+1,e+1,f?"#ffe066":"#5a2a0a");R(px-r/2,GY+r/2+2,r,1,f?"#ffe066":"#5a2a0a")}}
 else if(k=="haunted"){R(0,GY-2,64,1,"#0a0610");for(let i=0;i<64;i+=5){R(i,GY-5,1,7,"#0a0610");R(i,GY-6,1,1,"#0a0610")}
  for(let i=0;i<3;i++)ell(((t/70+i*30)%90)-12,GY+1,11,2,"#8a7a9a",.14)}
 else if(k=="apoc"){R(8,GY+3,12,1,"#1a1a14");R(40,GY+5,10,1,"#1a1a14");
  for(const x0 of[6,56]){const h=3+Math.round((S(t/700+x0)+1)*1.5),g="#8fae7a";R(x0,GY-h+1,2,h+2,g);R(x0-1,GY-h-1,1,3,g);R(x0+2,GY-h-1,1,3,g);R(x0,GY-h-2,1,2,g);R(x0+1,GY-h-2,1,1,g);R(x0-3,GY+1,8,2,"#2a2c22")}}
 else if(k=="desert"){for(const[x0,h]of[[54,15],[7,9]]){const g="#3f8f4a";R(x0,GY-h,3,h+2,g);R(x0-3,GY-h*.55,3,2,g);R(x0-3,GY-h*.55-3,2,4,g);R(x0+3,GY-h*.7,3,2,g);R(x0+4,GY-h*.7-3,2,4,g);R(x0+1,GY-h,1,h,"#5fbf6a")}
  const tx=((t/40)%90)-12;ell(tx,GY,3,3,"#8a6a3a",.8);R(tx-1,GY-1,3,1,"#c8a060")}
 else if(k=="volcano"){for(let i=0;i<64;i++){const w=S(i*.4+t/200)>0?0:1;R(i,GY+4+w,1,4-w,i%3?"#e8401a":"#ff8a2b")}
  for(let i=0;i<4;i++){const u=(t/400+i*.27)%1;R(8+i*15,GY+4-u*5,1,1,"#ffb02b")}}
 else if(k=="ocean"){for(let i=0;i<9;i++)R((i*17+S(t/400+i)*2+62)%62,GY-((t/35+i*9)%GY),1,1,"#e8faff");
  for(const x0 of[4,10,54,60]){for(let j=0;j<8;j++)R(x0+S(t/400+j*.6+x0)*1.6,GY-j*2,2,2,j%2?"#2f9a5a":"#3fba6a")}
  R(46,GY+1,3,3,"#ff7aa8");R(47,GY-1,1,2,"#ff7aa8");R(12,GY+2,4,2,"#c26bff")}
 else if(k=="aurora"){for(let i=0;i<14;i++)R((i*37+S(t/900+i)*3+64)%64,(t/30+i*17)%GY,1,1,"#fff")}
 else if(k=="autumn"){for(let i=0;i<12;i++)R((i*23+t/45+S(t/300+i)*3)%64,(t/35+i*17)%GY,2,1,["#e8761a","#c2451a","#ffb13b"][i%3]);for(let i=0;i<14;i++)R((i*19)%64,GY+1+(i%5),2,1,"#e8761a")}
 else if(k=="neon"){for(let j=0;j<4;j++)R(0,GY+1+j*2,64,1,j%2?"#ff2aa0":"#2ad8ff");for(let i=-5;i<=5;i++)ln([32+i*4,GY],[32+i*10,63],"#8a2ad8")}
 else if(k=="sunflower"){for(const x0 of[4,11,52,59]){const sw=S(t/700+x0)*1.2;R(x0,GY-9,1,11,"#3f9a45");R(x0+1,GY-4,3,1,"#3f9a45");ell(x0+sw,GY-11,4,4,"#ffd23a",1);ell(x0+sw,GY-11,2,2,"#5a3a1a",1);R(x0+sw-4,GY-11,1,1,"#ffb13b");R(x0+sw+4,GY-11,1,1,"#ffb13b")}}
 else if(k=="cave"){for(const[x0,c]of[[3,"#7fe0a8"],[9,"#ff7ad9"],[52,"#7fd0ff"],[58,"#c26bff"]]){const g=.12+.06*S(t/450+x0);ell(x0+1,GY-4,6,6,c,g);poly([[x0-1,GY+1],[x0,GY-8],[x0+2,GY-10],[x0+3,GY-7],[x0+4,GY+1]],c);if((t/200+x0|0)%4<1)R(x0+1,GY-7,1,2,"#fff")}
  for(let i=0;i<12;i++)R((i*29+S(t/600+i)*4+64)%62,GY-((t/50+i*11)%GY),1,1,"#c9a6ff")}
}
const shTabs=()=>Object.keys(SL).map(k=>`<button class="ghost${k==SH?" on":""}" onclick="shSlot('${k}')">${SL[k]}</button>`).join("");
const SLN={h:"หมวก",n:"คอ",w:"ของถือ",f:"เพื่อน",g:"ปีก",t:"หาง",b:"พื้นหลัง",s:"สกิน",c:"ชุด"};
const shTop=sub=>`<div class="shh"><div><b style="font-size:20px">🛍️ ร้านค้า</b><div class="mu">${sub||""}</div></div><div class="coin">🪙 ${M.coins}</div></div><div class="stab">${Object.keys(SL).filter(k=>(k!="z"&&k!="y")||(K.sp||"cat")=="godzilla").map(k=>`<button class="${k==SH?"on":""}" onclick="shSlot('${k}')"><span>${SL[k]}</span>${SLN[k]}</button>`).join("")}</div>`;
const shHead=n=>shTop(n);
const ts=o=>Object.assign({species:K.sp||"cat",seed:K.seed|0,stage:3,form:K.form&&FORMS[K.form]?K.form:null,sk:K.sk||null,cs:K.cs||null,bc:K.bc||null,bm:K.bm||null,cy:4200,bg:-1,eq:{}},o);
function paintTh(){document.querySelectorAll("canvas.tc").forEach(cv=>{try{drawOther(cv,JSON.parse(cv.dataset.th),300)}catch(e){}})}
const shRow=(n,st,pv,pvFn,can,dis,lbl,buyFn,th,r)=>`<div class="ic" style="${r?"border-color:"+RC[r]:""}">${th?`<canvas class="tc" width="64" height="64" data-th="${E(JSON.stringify(th))}"></canvas>`:""}<b>${n}</b><span class="mu">${st}</span><div class="row2"><button class="bt${pv?" on":""}" onclick="${pvFn}">👁</button><button class="bt pri" ${can&&!dis?"":"disabled"} onclick="${buyFn}">${lbl}</button></div></div>`;
function bgShop(){const li=BG.map((b,i)=>{const own=M.bgs[i],on=K.bg===i,p=b[1],can=own||M.coins>=p;return shRow(b[0],on?"ใช้อยู่":own?"มีแล้ว":"🪙 "+p,PVB===i,"tryBg("+i+")",can,0,on?"เอาออก":own?"ใช้":M.coins>=p?"ซื้อ 🪙 "+p:"🪙 "+p,"buyBg("+i+")",ts({bg:i}))}).join("");
 app.innerHTML=shTop("พื้นหลังแยกตามสัตว์แต่ละตัว")+`<button class="ghost" onclick="buyBg(-1)">✖ ไม่ใช้พื้นหลัง</button><div class="sg" style="margin-top:8px">${li}</div>`;paintTh()}
function tryBg(i){PVB=PVB===i?null:i;shopPage()}
function buyBg(i){PVB=null;if(i<0)K.bg=-1;else{const b=BG[i];if(!M.bgs[i]){if(M.coins<b[1])return;M.coins-=b[1];M.bgs[i]=1}K.bg=K.bg===i?-1:i}save();sync();sinfo();shopPage()}
function skinShop(){const sp=K.sp||"cat",L=SKD[sp]||{},cur=K.sk||"";
 const row=(id,n,p,own)=>{const on=cur===id,can=own||M.coins>=p;return shRow(n,on?"ใช้อยู่":own?"มีแล้ว":"🪙 "+p,PVS===id,"trySkin('"+id+"')",can,on,on?"ใช้อยู่":own?"ใช้ลายนี้":M.coins>=p?"ซื้อ 🪙 "+p:"🪙 "+p,"buySkin('"+id+"')",ts({sk:id||null}))};
 app.innerHTML=shTop("สกินของ"+SPC[sp].th+" (แยกตามตัว)")+`<div class="sg">`+row("","ลายเดิม",0,1)+Object.keys(L).map(id=>row(id,L[id][0],L[id][3],M.skins[sp+":"+id])).join("")+`</div>`;paintTh()}
function trySkin(id){PVS=PVS===id?null:id;shopPage()}
function buySkin(id){PVS=null;const sp=K.sp||"cat";if(id){const L=SKD[sp][id],k=sp+":"+id;if(!M.skins[k]){if(M.coins<L[3])return;M.coins-=L[3];M.skins[k]=1}}K.sk=id||null;save();sync();sinfo();shopPage()}
function newPet(sp){return{sp,seed:Math.random()*1000|0,n:0,stage:0,l:0,s:0,a:0,e:0,snap:null,form:null,found:{},xp:0,eq:{h:-1,n:-1,w:-1,f:-1,g:-1,t:-1}}}
function setPet(sp){if(!S.pets[sp])return;S.pet=sp;K=S.pets[sp];M.eq=K.eq;PV={};W.x=W.tx=0;T0=LA=performance.now();evo();save();sync();home()}
function buyPet(sp){const U=UNL[sp];if(!U||S.pets[sp]||S.pets.cat.stage<U.st||M.coins<U.p)return;M.coins-=U.p;const p=newPet(sp);if(sp=="godzilla"){p.bs=3;p.xp=XS[2]}S.pets[sp]=p;setPet(sp)}
function normRk(p){let sp="cat",sk=null,f=p.form||null,bg=-1,pn="",cs=null,bc=null,bm=null;if(f&&f.indexOf("|")>=0){const a=f.split("|");sp=SPC[a[0]]?a[0]:"cat";if(a.length>=3){sk=a[1]||null;f=a[2]||null;if(a[3]!==undefined&&a[3]!=="")bg=+a[3];pn=a[4]||"";cs=CSD[a[5]]?a[5]:null;bc=BCD[a[6]]?a[6]:null;bm=BMD[a[7]]?a[7]:null}else f=a[1]||null}return Object.assign({},p,{species:sp,sk,cs,bc,bm,form:f,bg,pn})}
function petsUi(){const cvs=(o,l)=>`<canvas class="tc${l?" lkc":""}" width="64" height="64" data-th="${E(JSON.stringify(o))}"></canvas>`;
 return`<h2 onclick="gmTap()">สัตว์เลี้ยง</h2><div class="mu">ตัวใหม่เริ่มจากไข่ และโตตามแต้ม ⭐ ที่ได้ขณะเลี้ยงตัวนั้น</div><div class="sg" style="margin-top:8px">`+Object.keys(SPC).filter(k=>!SPC[k].gm||S.gm||S.pets[k]).map(sp=>{const C=SPC[sp],p=S.pets[sp],U=UNL[sp];
 if(!p&&C.gm)return`<div class="ic" style="border-color:#c26bff">${cvs({species:sp,seed:7,stage:3,form:C.form,bg:C.bg,eq:{}})}<b>${C.e} ${C.th}</b><span class="mu">GM</span><button class="bt pri" data-s="${sp}" onclick="gmGet(this.dataset.s)">รับฟรี</button></div>`;
 if(p){const on=S.pet===sp;return`<div class="ic" style="${on?"border-color:var(--ac)":""}">${cvs({species:sp,seed:p.seed|0,stage:p.stage,form:p.form,sk:p.sk||null,cs:p.cs||null,bg:p.bg==null?-1:p.bg,eq:p.eq||{},words:p.n||0})}<b>${C.e} ${p.nm?E(p.nm)+" ("+C.th+")":C.th}</b><span class="mu">${stn(p.stage,sp)}${p.stage>=3&&p.form?" · "+fn(p.form,p.stage==4,sp):""}</span>${on?`<span class="mu">กำลังเลี้ยงอยู่</span><button class="bt" onclick="rnPet()">✏️ เปลี่ยนชื่อ</button>`:`<button class="bt pri" onclick="setPet('${sp}')">เลี้ยงตัวนี้</button>`}</div>`}
 const lk=S.pets.cat.stage<U.st;
 return`<div class="ic">${cvs({species:sp,seed:7,stage:3,form:null,eq:{}},lk)}<b>${C.e} ${C.th}</b><span class="mu">🪙 ${U.p}</span>${lk?`<span class="mu">ปลดล็อกเมื่อแมวเป็น${STN[U.st]}</span>`:`<button class="bt pri" ${M.coins>=U.p?"":"disabled"} onclick="buyPet('${sp}')">${M.coins>=U.p?"ซื้อและเริ่มเลี้ยง":"ต้องการ 🪙 "+U.p}</button>`}</div>`}).join("")+`</div>`}
const AU={l:['Light','#ffd76a'],s:['Shadow','#a35bff'],a:['Sky','#7fd0ff'],e:['Earth','#6fbf6a']};
const FORMS={"angel":{"n":"Angel Cat","n2":"Seraph Cat","fur":"#f4efe6","acc":"#ffd76a","eye":"#5bb8ff","wing":"feather","halo":1,"tail":"light","pc":"#fff3b0","c":"Light > Shadow and Sky > Earth (main path)"},"demon":{"n":"Bat-Winged Demon Cat","n2":"Archdemon Cat","fur":"#3a2b4d","acc":"#d63a4a","eye":"#ff4040","wing":"bat","horn":"small","tail":"arrow","pc":"#b05cff","c":"Shadow > Light and Sky > Earth (main path)"},"forest":{"n":"Forest Cat","n2":"World-Tree Cat","fur":"#b9d98a","acc":"#ff8fb8","eye":"#ffe066","horn":"antler","vines":1,"tail":"normal","pc":"#ffb3d1","c":"Light > Shadow and Earth ≥ Sky (main path)"},"cerb":{"n":"Graveyard Three-Tail Cat","n2":"Cerberus Cat","fur":"#4a4a55","acc":"#c8c8b8","eye":"#ff8a3a","tail":"three","heads":1,"pc":"#7a7a90","c":"Shadow > Light and Earth ≥ Sky (main path)"},"cosmos":{"n":"Cosmos Cat","n2":"Cosmos Sovereign","fur":"#1c1f5a","acc":"#ffffff","eye":"#c9a6ff","stars":1,"halo":1,"tail":"light","pc":"#9fb4ff","c":"All 4 auras ≥ 15% and none above 35% of total aura"},"fallen":{"n":"Fallen Angel Cat","n2":"Twilight Seraph","fur":"#cfc8d8","acc":"#7a2fb0","eye":"#ff5aa0","wing":"half","halo":1,"tail":"arrow","pc":"#e0c4ff","c":"As a juvenile Light leads Shadow by ≥ 8, then Shadow outgrows Light by ≥ 6"},"poison":{"n":"Flower Venom Cat","n2":"Venom Empress","fur":"#5a8f4a","acc":"#d04fd0","eye":"#c8ff5a","horn":"antler","vines":1,"tail":"flame","pc":"#d04fd0","c":"Earth ≥ 30% and Light ≥ 20% and Shadow ≥ 20% (hybrid)"},"storm":{"n":"Storm Cat","n2":"Tempest Cat","fur":"#6fa8dc","acc":"#fff36a","eye":"#fff36a","wing":"cloud","tail":"arrow","pc":"#fff36a","c":"Sky ≥ 42% of total aura"},"gaia":{"n":"Crystal Stone Cat","n2":"Titan Crystal Cat","fur":"#8f8270","acc":"#7fe0a8","eye":"#7fe0a8","horn":"crystal","vines":1,"tail":"normal","pc":"#7fe0a8","c":"Earth ≥ 42% of total aura"}};
FORMS.kitsune={n:"Nine-Tailed Kitsune",n2:"Nine-Tailed Kitsune",fur:"#f6efe2",acc:"#e0302a",eye:"#ffd23a",tail:"normal",pc:"#7a8bff",c:"GM"};FORMS.divdrag={n:"Divine Dragon",n2:"Divine Dragon",fur:"#e8b43a",acc:"#ff3a2a",eye:"#ff3030",wing:"gold",horn:"curved",halo:1,tail:"flame",pc:"#ffd23a",c:"GM"};
const ORDER=["fallen","cosmos","storm","gaia","poison","angel","demon","forest","cerb"];
const ITEMS=[["Apprentice Hat","h",1,0,"cone","#5a3fb0","#ffd76a"],["Top Hat","h",1,0,"top","#2a2a3a","#c44"],["Ear Ribbon","h",1,0,"bow","#ff8fb8","#fff"],["Beret","h",1,0,"cap","#c0504d","#ffe9a0"],["Flower Crown","h",1,"e","wreath","#5fbf5a","#ff8fb8"],["Mushroom Cap","h",2,"e","shroom","#d04040","#fff"],["Moon Bunny Ears","h",2,"l","bunny","#f4efe6","#ffb3c8"],["Viking Helm","h",2,"s","viking","#8a8f9a","#f4efe6"],["Meteor Antennae","h",2,"a","ant","#7fd0ff","#fff36a"],["Golden Crown","h",3,"l","crown","#ffd76a","#ff5a5a"],["Shadowflame Crown","h",3,"s","flame","#a35bff","#ff5aa0"],["Cloud Crown","h",3,"a","crown","#dff3ff","#7fd0ff"],["Heaven Star Crown","h",4,"l","star","#fff3b0","#ffd76a"],["Red Scarf","n",1,0,"scarf","#d63a4a","#fff"],["Fancy Bow Tie","n",1,0,"tie","#2a2a5a","#ff5a5a"],["Bell Collar","n",1,0,"bell","#c44","#ffd76a"],["Clear Sky Scarf","n",2,"a","scarf","#7fd0ff","#dff3ff"],["Flower Lei","n",2,"e","lei","#ff8fb8","#ffe066"],["Shadow Spike Collar","n",2,"s","ruff","#4a3a6a","#a35bff"],["Fluffy Light Ruff","n",2,"l","fur","#f4efe6","#ffd76a"],["Velvet Cape","n",3,"s","cape","#6a2a8a","#d63a4a"],["Starry Cape","n",3,"a","capes","#1c1f5a","#fff"],["Hero Medal","n",3,"l","medal","#3a6ad0","#ffd76a"],["Aurora Scarf","n",4,"a","aurora","#fff","#fff"],["Old Staff","w",1,0,"staff","#8a6a3a","#7fd0ff"],["Hand Flower","w",1,0,"flower","#ff8fb8","#ffe066"],["Spellbook","w",1,0,"book","#6a3a8a","#ffd76a"],["Paper Umbrella","w",1,0,"umb","#e05a7a","#fff"],["Steel Sword","w",2,"l","sword","#cfd6e0","#8a6a3a"],["Shadow Lantern","w",2,"s","lantern","#3a3a5a","#a35bff"],["Sky Balloon","w",2,"a","balloon","#7fd0ff","#fff"],["Forest Torch","w",2,"e","torch","#ff9a2b","#ffdd55"],["Sparkle Wand","w",3,"l","wand","#fff3b0","#ffd76a"],["Fortune Orb","w",3,"a","orb","#9fb4ff","#fff"],["Forest Crystal Staff","w",3,"e","staff","#5a4a2a","#7fe0a8"],["Abyss Trident","w",4,"s","trident","#a35bff","#ffd76a"],["Light Butterfly","f",1,"l","fly","#ffd76a","#fff"],["Little Star","f",1,0,"star","#fff3b0","#fff"],["Floating Heart","f",1,0,"heart","#ff7aa8","#fff"],["Cloud Companion","f",2,"a","cloud","#fff","#9fd0f0"],["Forest Firefly","f",2,"e","fairy","#c8ff5a","#fff"],["Crescent Moon","f",2,"s","moon","#e0c4ff","#fff"],["Little Spirit","f",2,"s","ghost","#dfe6ff","#8a8fa8"],["Triple Element Orbs","f",3,"l","orbs","#ffd76a","#7fd0ff"],["Tiny Fairy","f",3,"l","fairy","#ffe9a0","#ff8fb8"],["Ringed Planet","f",3,"a","planet","#c9a6ff","#7fd0ff"],["Nameless Shadowflame","f",4,"s","wisp","#a35bff","#ff5aa0"],["Blue Beret","h",1,0,"cap","#3a6ad0","#fff"],["Pink Party Hat","h",1,0,"cone","#ff8fb8","#fff36a"],["Sunflower Crown","h",1,"e","wreath","#ffd76a","#8a5a1a"],["Sakura Crown","h",2,"e","wreath","#ffc0d8","#fff"],["Rainbow Top Hat","h",2,0,"top","#7a3fd0","#ffd76a"],["Snow Bunny Ears","h",2,"a","bunny","#dff3ff","#9fd0f0"],["Black Bunny Ears","h",2,"s","bunny","#2a2a3a","#a35bff"],["Dragon Helm","h",3,"s","viking","#c2452b","#ffdd55"],["Silver Crown","h",3,"a","crown","#cfd6e0","#7fd0ff"],["Emerald Crown","h",3,"e","crown","#3f9a45","#b8ffcf"],["Moonlight Star Crown","h",4,"s","star","#e0c4ff","#a35bff"],["Dawn Star Crown","h",4,"a","star","#9fd0f0","#fff"],["Green Scarf","n",1,"e","scarf","#3f9a45","#b8ffcf"],["Blue Bell Collar","n",1,0,"bell","#3a6ad0","#fff36a"],["Pink Bow Tie","n",1,0,"tie","#ff8fb8","#fff"],["Sunset Scarf","n",2,"l","scarf","#ff9a2b","#ffe9a0"],["Daisy Lei","n",2,"l","lei","#fff","#ffe066"],["Silver Medal","n",2,0,"medal","#9aa0ad","#fff"],["Wolf Fur Ruff","n",3,"s","fur","#4a4a55","#c8c8b8"],["Royal Cape","n",3,"l","cape","#c44","#ffd76a"],["Night Sky Cape","n",3,"s","capes","#2a1a5a","#e0c4ff"],["Emerald Cape","n",3,"e","cape","#2e7a44","#b8ffcf"],["Cosmic Mantle","n",4,"s","capes","#1c1f5a","#c9a6ff"],["Golden Hero Medal","n",4,"l","medal","#ffd76a","#fff"],["Candy Umbrella","w",1,0,"umb","#7fd0ff","#fff"],["Red Rose","w",1,"e","flower","#d63a4a","#ffe066"],["Red Spellbook","w",1,0,"book","#c44","#ffd76a"],["Wooden Sword","w",1,0,"sword","#b08a4a","#6a4a2a"],["Pink Balloon","w",1,0,"balloon","#ff8fb8","#fff"],["Ice Wand","w",2,"a","wand","#7fd0ff","#fff"],["Bone Staff","w",2,"s","staff","#e8e0c8","#a35bff"],["Sun Torch","w",2,"l","torch","#ffd76a","#fff"],["Pumpkin Lantern","w",2,0,"lantern","#c4541a","#ffdd55"],["Thunder Orb","w",3,"a","orb","#fff36a","#fff"],["Lava Trident","w",3,"s","trident","#ff6a2b","#ffdd55"],["Holy Sword","w",3,"l","sword","#fff3b0","#ffd76a"],["Cosmic Staff","w",4,"a","staff","#1c1f5a","#c9a6ff"],["World Tree Staff","w",4,"e","staff","#6b4a2a","#b8ffcf"],["Sun Wand","w",4,"l","wand","#ffd76a","#fff"],["Pink Butterfly","f",1,0,"fly","#ff8fb8","#fff"],["Yellow Star","f",1,0,"star","#ffd76a","#fff"],["Blue Heart","f",1,"a","heart","#5bb8ff","#fff"],["Ghost Friend","f",2,"s","ghost","#e0c4ff","#a35bff"],["Rain Cloud","f",2,"a","cloud","#8a9ab0","#5a6a80"],["Green Fairy","f",2,"e","fairy","#7fe0a8","#fff"],["Sun Spirit","f",3,"l","wisp","#ffd76a","#fff"],["Blue Planet","f",3,"e","planet","#5bb8ff","#6fbf6a"],["Rose Fairy","f",3,"e","fairy","#ff8fb8","#fff"],["Four Aura Orbs","f",4,"a","orbs","#6fbf6a","#a35bff"],["Galaxy Planet","f",4,"a","planet","#ff7ad9","#7fd0ff"],["Green Flame","f",4,"e","wisp","#6fbf6a","#c8ff5a"],["Mini Wings","g",1,0,"mini","#fff","#ffe9a0"],["Pink Fairy Wings","g",1,0,"fairy","#ffc0d8","#fff"],["Amber Butterfly Wings","g",2,0,"butterfly","#ffb13b","#ff7a3a"],["Feather Wings","g",2,"l","feather","#fff","#ffe9a0"],["Little Bat Wings","g",2,"s","bat","#5a2a6a","#7a3a8a"],["Cloud Wings","g",2,"a","cloud","#fff","#9fd0f0"],["Leaf Wings","g",2,"e","fairy","#7fe0a8","#3f9a45"],["Blue Morpho Wings","g",3,"a","butterfly","#5bb8ff","#3a6ad0"],["Dragon Wings","g",3,"s","dragon","#2e9a5a","#c2452b"],["Crystal Wings","g",3,"e","crystal","#7fe0a8","#b8ffcf"],["Golden Angel Wings","g",4,"l","feather","#ffd76a","#fff"],["Shadow Flame Wings","g",4,"s","flame","#a35bff","#ff5aa0"],["Thunder Wings","g",4,"a","feather","#f4f8ff","#fff36a"],["Ribbon Tail","t",1,0,"ribbon","#ff8fb8","#fff"],["Fluffy Tail","t",1,0,"fluffy","#f4efe6","#fff"],["Fox Tail","t",2,"e","fox","#ff9a2b","#fff"],["Rainbow Tail","t",2,0,"rainbow","#fff","#fff"],["Lightning Tail","t",2,"a","zig","#fff36a","#fff"],["Star Sparkle Tail","t",2,"l","sparkle","#ffd76a","#fff"],["Flame Tail","t",3,"s","flame","#ff9a2b","#ffdd55"],["Twin Tails","t",3,"e","twin","#b9a07a","#fff"],["Ghost Wisp Tail","t",3,"s","sparkle","#a35bff","#e0c4ff"],["Crystal Tail","t",3,"e","fox","#7fe0a8","#b8ffcf"],["Galaxy Tail","t",4,"a","sparkle","#9fb4ff","#fff"],["Golden Sun Tail","t",4,"l","twin","#ffd76a","#fff"],["Abyss Flame Tail","t",4,"s","flame","#a35bff","#ff5aa0"],["Witch Hat","h",2,"s","witch","#3a2a5a","#ffb13b"],["Starry Witch Hat","h",4,"a","witch","#1c1f5a","#fff36a"],["Chef Hat","h",1,0,"chef","#ffffff","#cfd6e0"],["Gamer Headphones","h",2,"a","phones","#2a2a3a","#ff5aa0"],["Pastel Headphones","h",1,0,"phones","#cfe6ff","#ff8fb8"],["Sprout","h",1,"e","sprout","#5fbf5a","#8fe08a"],["Pirate Hat","h",2,0,"pirate","#2a2a3a","#ffffff"],["Angel Ring","h",3,"l","halo","#ffd76a","#fff3b0"],["Dark Halo","h",3,"s","halo","#7a2fb0","#d63a4a"],["Phoenix Crown","h",4,"l","flame","#ff6a2b","#ffdd55"],["Ice Crown","h",3,"a","crown","#bfe8ff","#ffffff"],["Sakura Beret","h",1,"e","cap","#ffc0d8","#ffffff"],["Red Bandana","n",1,0,"bandana","#d63a4a","#ffffff"],["Blue Bandana","n",1,"a","bandana","#3a6ad0","#ffffff"],["Sun Bandana","n",2,"l","bandana","#ffb13b","#ffffff"],["Pearl Necklace","n",2,"l","pearl","#ffffff","#ff8fb8"],["Gold Chain","n",3,"l","pearl","#ffd76a","#ff5a5a"],["Dark Crystal Pendant","n",3,"s","pearl","#4a3a6a","#a35bff"],["Emerald Pendant","n",3,"e","pearl","#3f9a45","#7fe0a8"],["Moon Scarf","n",2,"s","scarf","#e0c4ff","#ffffff"],["Lollipop","w",1,0,"lolli","#ff8fb8","#8a6a3a"],["Rainbow Lollipop","w",2,0,"lolli","#7fd0ff","#ff8fb8"],["Hunting Bow","w",2,"e","bow","#8a6a3a","#e8e0c8"],["Light Bow","w",3,"l","bow","#ffd76a","#ffffff"],["Hammer","w",2,0,"hammer","#8a8f9a","#c44444"],["Thunder Hammer","w",3,"a","hammer","#fff36a","#7fd0ff"],["Magnifier","w",1,0,"lens","#cfd6e0","#8a6a3a"],["Moon Magnifier","w",3,"s","lens","#a35bff","#e0c4ff"],["Bee","f",1,"e","bee","#ffd23a","#ffffff"],["Bunny Friend","f",1,0,"bunny","#ffffff","#ff8fb8"],["Black Bunny","f",2,"s","bunny","#3a3a4a","#ff5aa0"],["Sparkle Star","f",2,"l","sparkle","#fff3b0","#ffd76a"],["Sky Sparkle","f",3,"a","sparkle","#7fd0ff","#ffffff"],["Fire Spirit","f",3,"s","wisp","#ff6a2b","#ffdd55"],["Frost Orbs","f",3,"a","orbs","#bfe8ff","#7fd0ff"],["Rose Wings","g",1,0,"fairy","#ff8fb8","#ffffff"],["Sunset Wings","g",2,"l","butterfly","#ff9a2b","#ff5a5a"],["Ice Wings","g",3,"a","crystal","#bfe8ff","#ffffff"],["Moon Butterfly Wings","g",3,"s","butterfly","#c9a6ff","#7a3fd0"],["Phoenix Wings","g",4,"l","phoenix","#ff6a2b","#ffdd55"],["Void Dragon Wings","g",4,"s","dragon","#2a1a4a","#a35bff"],["Pink Fluffy Tail","t",1,0,"fluffy","#ffc0d8","#ffffff"],["Leaf Tail","t",2,"e","ribbon","#5fbf5a","#b8ffcf"],["Ice Fox Tail","t",2,"a","fox","#bfe8ff","#ffffff"],["Black Flame Tail","t",3,"s","flame","#3a2a5a","#a35bff"],["Moon Sparkle Tail","t",3,"s","sparkle","#e0c4ff","#ffffff"],["Rose Feather Wings","g",1,0,"feather","#ffd0e0","#ff8fb8"],["Silver Feather Wings","g",2,"a","feather","#dfe6f0","#7fd0ff"],["Raven Wings","g",3,"s","raven","#2a2a3a","#a35bff"],["Seraph Wings","g",4,"l","feather","#ffffff","#ffd76a"],["Cowboy Hat", "h", 1, 0, "cowboy", "#8a5a2a", "#ffd76a"],["Shades", "h", 1, 0, "shades", "#1a1a22", "#7fd0ff"],["Neon Shades", "h", 2, "a", "shades", "#ff2aa0", "#ffffff"],["Gold Shades", "h", 3, "l", "shades", "#ffd76a", "#ffffff"],["Red Chef Hat", "h", 1, 0, "chef", "#d63a4a", "#ffffff"],["Green Witch Hat", "h", 2, "e", "witch", "#2e7a44", "#ffd76a"],["Lava Crown", "h", 3, "s", "flame", "#ff3a2a", "#ffdd55"],["Galaxy Top Hat", "h", 3, "a", "top", "#1c1f5a", "#c9a6ff"],["Lotus Crown", "h", 2, "e", "wreath", "#ffb3d1", "#ffffff"],["Sun Halo", "h", 4, "l", "halo", "#ffd23a", "#ffffff"],["Orange Bandana", "n", 1, 0, "bandana", "#ff9a2b", "#ffffff"],["Pearl Rose", "n", 2, "l", "pearl", "#ffc0d8", "#ffffff"],["Ice Scarf", "n", 2, "a", "scarf", "#bfe8ff", "#ffffff"],["Crimson Cape", "n", 3, "s", "cape", "#8a1020", "#ffd76a"],["Rainbow Scarf", "n", 3, 0, "aurora", "#ffffff", "#ffffff"],["Starlight Mantle", "n", 4, "l", "capes", "#ffd76a", "#ffffff"],["Thorn Collar", "n", 2, "e", "ruff", "#2e7a44", "#ff8fb8"],["Bronze Medal", "n", 1, 0, "medal", "#b87333", "#ffffff"],["Round Shield", "w", 1, 0, "shield", "#8a8f9a", "#cc4444"],["Dragon Shield", "w", 3, "s", "shield", "#2e9a5a", "#ffd23a"],["Holy Shield", "w", 3, "l", "shield", "#fff3b0", "#ffd76a"],["Ice Sword", "w", 2, "a", "sword", "#bfe8ff", "#7fd0ff"],["Flame Sword", "w", 3, "s", "sword", "#ff6a2b", "#ffdd55"],["Pink Wand", "w", 1, 0, "wand", "#ff8fb8", "#ffffff"],["Green Lantern", "w", 2, "e", "lantern", "#2e7a44", "#c8ff5a"],["Galaxy Balloon", "w", 2, "a", "balloon", "#c9a6ff", "#ffffff"],["Golden Hammer", "w", 4, "l", "hammer", "#ffd76a", "#fff3b0"],["Void Staff", "w", 4, "s", "staff", "#2a1a4a", "#a35bff"],["Goldfish", "f", 1, 0, "fish", "#ff9a2b", "#ffdd55"],["Blue Fish", "f", 2, "a", "fish", "#5bb8ff", "#ffffff"],["Pink Bee", "f", 1, 0, "bee", "#ff8fb8", "#ffffff"],["Golden Fairy", "f", 3, "l", "fairy", "#ffd76a", "#ffffff"],["Dark Fairy", "f", 3, "s", "fairy", "#a35bff", "#e0c4ff"],["Mini Sun", "f", 4, "l", "planet", "#ffd23a", "#ff8a2b"],["Mini Storm", "f", 4, "a", "cloud", "#4a5a80", "#fff36a"],["Rainbow Fairy Wings", "g", 3, 0, "fairy", "#ff8fb8", "#7fd0ff"],["Golden Butterfly Wings", "g", 3, "l", "butterfly", "#ffd76a", "#ff9a2b"],["Mint Leaf Wings", "g", 2, "e", "fairy", "#8fe0c0", "#3f9a45"],["Midnight Bat Wings", "g", 3, "s", "bat", "#1a1030", "#6a2a8a"],["Storm Feather Wings", "g", 3, "a", "feather", "#6fa8dc", "#fff36a"],["Emerald Dragon Wings", "g", 4, "e", "dragon", "#1e7a44", "#7fe0a8"],["Solar Phoenix Wings", "g", 4, "l", "phoenix", "#ffb02b", "#ff5a2a"],["Purple Fox Tail", "t", 2, "s", "fox", "#8a6ad0", "#ffffff"],["Pink Twin Tails", "t", 3, "l", "twin", "#ff8fb8", "#ffffff"],["Aqua Ribbon Tail", "t", 1, 0, "ribbon", "#7fd0ff", "#ffffff"],["Golden Flame Tail", "t", 4, "l", "flame", "#ffd23a", "#ff8a2b"],["Cloud Tail", "t", 2, "a", "fluffy", "#ffffff", "#9fd0f0"],["Emerald Sparkle Tail", "t", 3, "e", "sparkle", "#7fe0a8", "#ffffff"]];
const RN=['','Common','Rare','Epic','Legendary'],RC=['','#b8b0d0','#5bb8ff','#c26bff','#ffb13b'],PR=[0,20,60,150,400],SL={h:'🎩',n:'🧣',w:'🪄',f:'🧚',g:'🕊️',t:'🦊',b:'🖼️',s:'🎨',c:'🦖'};
const SIG={"poison":["f","#c8ff5a",32,44,0,0.5,1],"demon":["a","#ff4040",0,50,0,-0.5,1],"angel":["f","#fff",0,16,0,0.25,2],"fallen":["f","#7a2fb0",0,16,0,0.25,2],"forest":["f","#ffb3d1",0,14,0,0.2,2],"storm":["a","#fff36a",0,44,0,-0.6,1],"gaia":["a","#7fe0a8",0,50,0,-0.3,1]};
function spawn(k,c,x,y,vx,vy,sz){pt.push({x,y,vx,vy,l:1,c,k,sz})}
function emit(n,c,k,sp){for(let i=0;i<n;i++)pt.push({x:32+(Math.random()-.5)*(sp||14),y:38+Math.random()*8,vx:(Math.random()-.5)*1.4,vy:-.5-Math.random()*1.5,l:1,c,k})}
/* ---------- pixel renderer (64x64) ---------- */
let x=$('c').getContext('2d'),xb=null;const xm=x,rd=Math.round;
const R=(a,b,w,h,c)=>{x.fillStyle=c;x.fillRect(rd(a),rd(b),w,h)};
const dk=(c,f)=>{if(/^#[0-9a-f]{3}$/i.test(c))c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];const n=parseInt(c.slice(1),16),v=c[0]=='#'?[n>>16&255,n>>8&255,n&255]:c.match(/\d+/g).map(Number);return'rgb('+v.map(u=>Math.min(255,u*f|0))+')'};
function ell(cx,cy,rx,ry,c,a){x.globalAlpha=a;x.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=rd(rx*Math.sqrt(1-y*y/(ry*ry)));x.fillRect(cx-w,cy+y,2*w,1)}x.globalAlpha=1}
const GY=57;
function egg(t,c0){
 const tc=K.n?c0:'#ffe9a0',amp=K.n>=3?2:K.n>=1?1.2:.6;
 ell(32,38,21+Math.sin(t/500)*1.5,22,tc,.1);
 for(let y=21;y<=55;y++){
  const w=2*rd(11*Math.sqrt(Math.max(0,1-Math.pow((y-38)/17.5,2)))),sh=rd(Math.sin(t/260)*amp*(y-38)/17);
  if(w<4)continue;
  R(32-w/2+sh,y,w,1,'#efe6ff');R(32+w/2-3+sh,y,3,1,'#cdbff0');if(y<34)R(32-w/2+sh+1,y,2,1,'#fff')}
 for(let i=0;i<7;i++){R(26+(i*5)%12,26+i*4,2,2,tc)}
 for(let i=0;i<Math.min(K.n*3,12);i++)R(30+Math.abs(i%4-2),25+i*2,1,1,'#3a2a6a');
}
/* Ascended: extra parts per form (fr=0 back layer, 1 front layer) */
function asc(t,f,A,fr){
 const {bx,by,bw,bh,hx,hy,hw,hh}=A,k=K.form,fl=Math.sin(t/230)*2,fk=(t/70|0)%4,C=Math.cos,Sn=Math.sin;
 if(!fr){
  if(k=='angel'){x.globalAlpha=.1;for(let i=0;i<5;i++)R(12+i*10,0,3,GY,'#fff3b0');x.globalAlpha=1;}
  if(k=='forest'){R(30,by-12,4,12,'#6b4a2a');ell(32,by-18,12,8,'#3f9a45',1);ell(28,by-20,6,4,'#5fbf5a',1);for(let i=0;i<4;i++)R(24+i*5,by-19+(i%2)*4,2,2,fk==i?'#fff':'#ff8fb8')}
  if(k=='cosmos'){ell(32,36,26,22,'#6a4aff',.18);ell(30,38,18,14,'#ff7ad9',.12)}
  if(k=='kitsune'){const b0=by+bh-4;ell(32,b0-8,22,17,'#7a8bff',.12);for(let j=0;j<9;j++){const bs=-90+(j-4)*19;for(let i=0;i<10;i++){const a=(bs+Sn(t/420+j*.8+i*.35)*7)*Math.PI/180,r=4+i*2.9;R(32+C(a)*r,b0+Sn(a)*r,i>7?2:3,3,i>7?'#e8f0ff':(j%2?'#7a8bff':'#a06bff'))}}}
  if(k=='divdrag'){ell(32,36,28,26,'#ffb13b',.16);ell(32,36,18,17,'#fff0a0',.14);for(let i=0;i<14;i++){const a=i/14*6.283+t/2500;for(let r=22;r<34;r+=2)R(32+C(a)*r,36+Sn(a)*r*.9,1,1,i%2?'#ffd23a':'#fff7b0')}}
  if(k=='poison')for(const d of[-1,1])for(let j=0;j<8;j++)R(d<0?bx-2-j*2:bx+bw+j*2,by+bh-3-j+rd(Sn(t/200+j)*2),2,1,'#3f9a45');
  if(k=='storm'){ell(bx-6,by+2,8,5,'#dff3ff',.9);ell(bx+bw+6,by+2,8,5,'#dff3ff',.9);ell(bx-9,by+6,6,4,'#9fd0f0',.9);ell(bx+bw+9,by+6,6,4,'#9fd0f0',.9)}
  if(k=='gaia')for(let i=0;i<5;i++)R(bx+1+i*4,by-4-(i%3)*3,3,7+(i%3)*3,i%2?'#7fe0a8':'#b8ffcf');
 }else{
  if(k=='kitsune'){for(let i=0;i<5;i++){const a=t/500+i*1.257,ox=32+C(a)*24,oy=30+Sn(a)*11;R(ox,oy,3,3,'#9fb4ff');R(ox+1,oy-2-((t/80+i)%2|0),1,2,'#e8f0ff');R(ox+1,oy+1,1,1,'#fff');for(let q=1;q<4;q++)R(32+C(a-q*.18)*24,30+Sn(a-q*.18)*11,2,2,'rgba(160,180,255,'+(.5-q*.12)+')')}R(hx+2,hy-8,1,2,'#2a2030');R(hx+hw-3,hy-8,1,2,'#2a2030')}
  if(k=='divdrag'){for(let i=0;i<7;i++)R(hx+hw+i*3,hy+hh-6+rd(Sn(t/90+i)*2),3-(i>4?1:0),3,['#fff6a0','#ffd23a','#ff8a2b','#ff4a1a'][i>>1]);for(let i=0;i<10;i++){const cx=(i*13+7)%61,cy=(t/16+i*29)%60;R(cx,cy,2,2,'#ffd23a');if((t/120+i|0)%3)R(cx,cy,1,1,'#fff6b0')}if(t%2200<160){let px=10+((t/2200|0)*9)%44;for(let y=0;y<GY;y+=4){R(px,y,2,5,'#fff7a0');px+=((y*5)%7)-3}}}
  if(k=='angel')for(let i=0;i<10;i++)R(32+C(t/700+i*.63)*13,hy-6+Sn(t/700+i*.63)*3,1,1,'#ffd76a');
  if(k=='demon'){R(hx+2,hy-10,2,6,'#d63a4a');R(hx+hw-4,hy-10,2,6,'#d63a4a');for(let i=0;i<6;i++)R(bx+(i*4)%bw,by+bh-((t/70+i*5)%9|0),1,2,'#b05cff')}
  if(k=='cerb'){for(const d of[-1,0,1])R(32+d*14-1,hy-2-fk,2,3,['#7fd0ff','#a35bff','#6fbf6a'][d+1]);R(hx-1,hy+hh-1,hw+2,2,'#c8c8b8')}
  if(k=='cosmos'){for(let i=0;i<20;i++){const a=i*.5+t/500,r=i*.5;R(32+C(a)*r,by+bh/2+Sn(a)*r*.6,1,1,'#fff')}R(32+C(t/800)*28,40+Sn(t/800)*10,4,4,'#ffb13b');R(32+C(t/800+3.1)*28,40+Sn(t/800+3.1)*10,3,3,'#7fd0ff')}
  if(k=='dragon'){for(let i=0;i<5;i++){R(hx+2+i*4,hy-2-(i%2)*2,2,3,'#ffb13b');R(hx+hw+i*3,hy+hh-4-((t/60+i)%3|0),3,2,i%2?'#ff9a2b':'#ffdd55')}}
  if(k=='fallen'){R(hx+3,hy-9,4,1,'#e0c4ff');R(hx+9,hy-9,hw-12,1,'#e0c4ff')}
  if(k=='poison'){for(let i=0;i<8;i++){const a=i*.785+t/1500;R(32+C(a)*9-1,hy-8+Sn(a)*4-1,3,3,i%2?'#d04fd0':'#ff8fe0')}R(31,hy-9,3,3,'#ffe066')}
  if(k=='shade')for(let i=0;i<6;i++)R(32+Sn(t/700+i)*24,20+(i*8+t/40)%36,1,2,'rgba(200,200,255,.5)');
  if(k=='storm'&&t%1000<220)for(let i=0;i<9;i++)R(30+(i%2)*3,i*4,2,4,'#fff36a');
  if(k=='gaia'){R(32+C(t/900)*26,30+Sn(t/900)*8,4,3,'#8a7a66');R(32+C(t/900+3.1)*26,30+Sn(t/900+3.1)*8,3,3,'#8a7a66')}
 }
}
const SP={star:["...o...","..oao..","ooahaoo",".oaaao.","oaaoaao","oao.oao",".o...o."],heart:[".oo.oo.","oaaoaao","oahaaao",".oaaao.","..oao..","...o..."],moon:[".ooo..","oaaao.","oaao..","oao...","oao...","oaao..","oaaao.",".ooo.."],ghost:["..ooo..",".oaaao.","oaaaaao","oaeaeao","oaaaaao","oaaaaao","oaoaoao",".o.o.o."],cloud:["...ooo.....","..oaaaoo...",".oaaaaaaoo.","oaaaaaaaaao","obbbbbbbbbo",".ooooooooo."],planet:["...ooo...","..oaaao..","obbaaabbo",".oaaaaao.","obbaaabbo","..oaaao..","...ooo..."]};
function spr(r,x0,y0,c1,c2){const p={a:c1,b:c2,o:'#1d1630',h:'#fff',e:'#2a2040'};r.forEach((w,j)=>{for(let i=0;i<w.length;i++)if(w[i]!='.')R(x0+i,y0+j,1,1,p[w[i]])})}
function poly(Q,c){let a=1e9,b=-1e9;Q.forEach(p=>{a=Math.min(a,p[1]);b=Math.max(b,p[1])});x.fillStyle=c;
 for(let y=rd(a);y<=rd(b);y++){const xs=[];for(let i=0;i<Q.length;i++){const p=Q[i],q=Q[(i+1)%Q.length];if((p[1]<=y+.5)!=(q[1]<=y+.5))xs.push(p[0]+(y+.5-p[1])/(q[1]-p[1])*(q[0]-p[0]))}
  xs.sort((u,v)=>u-v);for(let i=0;i+1<xs.length;i+=2){const l=rd(xs[i]),r=rd(xs[i+1]);if(r>l)x.fillRect(l,y,r-l,1)}}}
function pol(Q,c,o){const O=o||dk(c,.3);for(const d of[[-1,0],[1,0],[0,-1],[0,1]])poly(Q.map(p=>[p[0]+d[0],p[1]+d[1]]),O);poly(Q,c)}
function ln(p,q,c){const n=Math.max(Math.abs(q[0]-p[0]),Math.abs(q[1]-p[1]))|0||1;for(let i=0;i<=n;i++)R(p[0]+(q[0]-p[0])*i/n,p[1]+(q[1]-p[1])*i/n,1,1,c)}
const ex3=c=>/^#[0-9a-f]{3}$/i.test(c)?"#"+c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c;
const dh=(c,f)=>{const n=parseInt(ex3(c).slice(1),16);return"#"+[16,8,0].map(s=>("0"+Math.min(255,(n>>s&255)*f|0).toString(16)).slice(-2)).join("")};
const mx3=(a,b,k)=>mix(ex3(a),ex3(b),k);
/* ขนนก 1 เส้น: แกนโค้ง ปลายมน มีขอบเข้ม แกนกลาง ไฮไลต์ และปลายขนสีที่สอง */
function plume(p,q,w,col,tc,bd,ol){
 const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux,n=8;
 const sp=(u,h)=>{const o=bd*L*u*u,c=u*L;return[p[0]+ux*c+nx*(o+h),p[1]+uy*c+ny*(o+h)]};
 const build=(wm,k0,ext)=>{const A=[],B=[];for(let i=k0;i<=n;i++){const u=i/n,h=wm*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(u,.8))),.55);A.push(sp(u,h));B.push(sp(u,-h))}return A.concat(ext?[sp(1+ext/L,0)]:[],B.reverse())};
 poly(build(w+1,0,1),ol||dh(col,.38));poly(build(w,0),col);
 if(tc)poly(build(w,5),tc);
 ln(sp(.04,0),sp(.9,0),dh(tc||col,.68));
 ln(sp(.2,w*.5),sp(.68,w*.55),mx3(col,"#ffffff",.5));
}
const FWC={feather:{a:7,b:5,c:4,w:2.3,bd:.1,tip:1},mini:{a:4,b:3,c:0,w:2,bd:.08,tip:1,s:.62},cloud:{a:6,b:4,c:3,w:2.9,bd:.05,tip:1},flame:{a:7,b:5,c:3,w:2.3,bd:.12,tip:1,flk:1},phoenix:{a:7,b:5,c:4,w:2.4,bd:.12,tip:1,flk:1,em:1},raven:{a:7,b:5,c:4,w:2.3,bd:.1,tip:1,ol:"#0a0710"}};
/* ปีกขนนก 3 ชั้น (ขนบิน/ขนกลาง/ขนคลุม) ปลายปีกหน่วงตามโคนตอนกระพือ */
function fw(t,k,S,A,m,c1,c2){c1=ex3(c1);c2=ex3(c2);
 const o=FWC[k]||FWC.feather,sc=S*(o.s||1),rx=m<0?A.bx+1:A.bx+A.bw-1,ry=A.by+3,d=Math.PI/180,
 T=(dx,dy)=>{const r=Math.hypot(dx,dy),a=.26*Math.sin(t/230-r*.045),c=Math.cos(a),s=Math.sin(a);return[rx+m*(dx*c-dy*s),ry-(dx*s+dy*c)]};
 const row=(n,a0,a1,Lb,La,b0,col,tcol,ph,wv)=>{for(let j=0;j<n;j++){const u=n>1?j/(n-1):.5,a=(a0+(a1-a0)*u)*d,L=sc*(Lb+La*Math.sin(Math.PI*(.12+.8*u)))*(o.flk?1+.07*Math.sin(t/70+j*2+ph):1),Bx=sc*(b0+u*3),By=sc*(2-u*2),tc=!tcol?null:o.flk?((t/100+j+ph|0)%2?tcol:mx3(tcol,"#ffffff",.55)):tcol;
  plume(T(Bx,By),T(Bx+Math.cos(a)*L,By+Math.sin(a)*L),Math.max(1.2,wv*(.55+.45*sc)),col,tc,o.bd*m,o.ol)}};
 row(o.a,86,-14,12,7,1,dh(c1,.84),o.tip&&c2,0,o.w);
 row(o.b,72,-22,8,4,1,dh(c1,.96),o.tip&&c2,3,o.w*.95);
 if(o.c)row(o.c,82,-8,5,2.2,0,dh(c1,1.12),null,6,o.w*1.05);
 if(o.em){const a0=x.globalAlpha;for(let i=0;i<4;i++){const u=(t/700+i*.25+(m>0?.12:0))%1,q=T(6+i*4,8+i*3);x.globalAlpha=a0*(1-u);R(q[0]+Math.sin(t/180+i*2)*2,q[1]-u*9,1,1,i%2?c2:"#fff6c0")}x.globalAlpha=a0}
}
/* ปีกเยื่อ (ปีศาจ/มังกร): กระดูกแขนโค้ง นิ้วปีก เยื่อขอบเว้า */
function mb(t,k,S,A,m,c1,c2){c1=ex3(c1);c2=ex3(c2);
 const dr=k=='dragon',sc=S*(dr?1.1:1),rx=m<0?A.bx+1:A.bx+A.bw-1,ry=A.by+3,d=Math.PI/180,bone=dh(c2,1.25),
 T=(dx,dy)=>{const r=Math.hypot(dx,dy),a=.26*Math.sin(t/230-r*.045),c=Math.cos(a),s=Math.sin(a);return[rx+m*(dx*c-dy*s),ry-(dx*s+dy*c)]};
 const Wr=[11*sc,12*sc],E=[5.5*sc,9.5*sc],Bt=[2*sc,-6*sc],angs=dr?[70,38,6,-26,-52]:[62,26,-8,-40],Ls=dr?[9,12,12.5,11.5,8]:[8,10.5,10.5,8],
 tips=angs.map((a,i)=>[Wr[0]+Math.cos(a*d)*Ls[i]*sc,Wr[1]+Math.sin(a*d)*Ls[i]*sc]),pts=[[0,0],E,Wr],sc2=[];
 tips.forEach((q,i)=>{pts.push(q);if(i<tips.length-1){const n2=tips[i+1],mx=(q[0]+n2[0])/2,my=(q[1]+n2[1])/2,v=[mx+(Wr[0]-mx)*.32,my+(Wr[1]-my)*.32];pts.push(v);sc2.push(v)}});
 pts.push(Bt);
 pol(pts.map(p=>T(p[0],p[1])),c1,dh(c1,.35));
 sc2.forEach(v=>ln(T(Bt[0],Bt[1]),T(v[0],v[1]),dh(c1,.7)));
 const a=T(0,0),e=T(E[0],E[1]),w=T(Wr[0],Wr[1]);
 ln(a,e,bone);ln([a[0],a[1]+1],[e[0],e[1]+1],bone);ln(e,w,bone);ln([e[0],e[1]+1],[w[0],w[1]+1],bone);
 tips.forEach((q,i)=>{const p=T(q[0],q[1]);ln(w,p,bone);if(dr){const r=angs[i]*d,s=T(q[0]+Math.cos(r)*3,q[1]+Math.sin(r)*3);ln(p,s,dh(c2,1.5))}});
 const wc=T(Wr[0]+Math.cos(95*d)*3,Wr[1]+Math.sin(95*d)*3);ln(w,wc,dh(c2,1.5));R(w[0],w[1],2,2,dh(c2,1.5))}
function fwForm(t,f,st,A){const S=st==2?.62:st==3?.92:1.08,W=f.wing;
 for(const m of[-1,1]){
  if(W=='feather')fw(t,'feather',S,A,m,'#ffffff','#ffe08a');
  else if(W=='half')m<0?fw(t,'feather',S,A,m,'#f4efe6','#e0c4ff'):fw(t,'raven',S,A,m,'#3a2b4d','#7a2fb0');
  else if(W=='cloud')fw(t,'cloud',S,A,m,'#f4faff','#9fd0f0');
  else if(W=='bat')mb(t,'bat',S,A,m,'#5a2a6a','#c0507a');
  else if(W=='gold')fw(t,'phoenix',S,A,m,'#ffd23a','#e8402a');
  else mb(t,'dragon',S,A,m,'#2e9a5a','#c2452b')}}
const WF={feather:1,mini:1,cloud:1,flame:1,phoenix:1,raven:1};
function wing(it,t,A){const [,,,,k,c1,c2]=it,{bx,by,bw}=A,fl=Math.sin(t/230),A0=x.globalAlpha;
 for(const m of[-1,1]){
  if(WF[k]){fw(t,k,1,A,m,c1,c2);continue}
  if(k=='bat'||k=='dragon'){mb(t,k,1,A,m,c1,c2);continue}
  const rx=m<0?bx+1:bx+bw-1,ry=by+3,P=(dx,dy)=>[rx+m*dx,ry+dy-fl*dx*.25];
  const fan=(n,len,a0,a1,w,cf,lf)=>{for(let j=n-1;j>=0;j--){const u=n>1?j/(n-1):0,a=(a0+(a1-a0)*u)*Math.PI/180,l=(lf?lf(j):len)*(1-Math.abs(u-.35)*.4),tx=Math.cos(a)*l,ty=-Math.sin(a)*l,s=Math.sin(a)*w,c=Math.cos(a)*w;pol([P(0,0),P(tx*.55+s,ty*.55+c),P(tx,ty),P(tx*.55-s,ty*.55-c)],cf(j))}};
  if(k=='crystal')fan(4,16,80,0,2.6,j=>j%2?c2:c1);
  else if(k=='fairy'){x.globalAlpha=A0*.8;pol([P(0,0),P(5,-9),P(12,-15),P(16,-13),P(14,-6),P(7,0)],c1,c2);pol([P(0,2),P(8,3),P(12,8),P(8,12),P(3,8)],c1,c2);ln(P(0,0),P(13,-12),c2);ln(P(1,3),P(10,8),c2);x.globalAlpha=A0}
  else if(k=='butterfly'){pol([P(0,0),P(6,-12),P(15,-15),P(19,-9),P(16,-1),P(5,2)],c1);pol([P(1,3),P(11,3),P(14,10),P(9,14),P(3,9)],c2);R(P(14,-9)[0],P(14,-9)[1],2,2,'#fff');R(P(9,9)[0],P(9,9)[1],2,2,'#fff')}
 }}
function gt(it,t,A){const [,sl,,,k,c1,c2]=it,{bx,by,bw,bh}=A,fl=Math.sin(t/230)*2.5,I=Math.round;
 if(sl=='g')return wing(it,t,A);
 const n=7,w=(k=='fluffy'||k=='fox'||k=='twin')?4:3,tipc=i=>i>=n-2?c2:c1;
 const F={ribbon:()=>c1,fluffy:tipc,fox:tipc,twin:tipc,rainbow:i=>`hsl(${(t/8+i*40)%360},80%,65%)`,zig:()=>c1,flame:i=>(t/80+i|0)%2?c1:c2,sparkle:()=>c1}[k];
 const seg=(sx,sy,d,ph)=>{let px=0,py=0;for(let i=0;i<n;i++){px=sx+d*i*1.3+Math.sin(t/320-i*.7+ph)*i*.8+(k=='zig'?(i%2?2:-2):0);py=sy-i*2.3;R(px,py,w,3,F(i))}
  if(k=='ribbon'){R(px-3,py-1,3,3,c2);R(px+4,py-1,3,3,c2);R(px+1,py,2,2,c1)}
  if(k=='sparkle'){if((t/150|0)%2){R(px+1,py-3,1,3,c2);R(px-1,py-1,5,1,c2)}for(let i=1;i<n;i+=2)if((t/200+i|0)%3==0)R(sx+i*2-3,sy-i*2,1,1,c2)}};
 seg(bx+bw-1,by+bh-3,1,0);if(k=='twin')seg(bx,by+bh-3,-1,1.5)}
function item(it,t,A){
 const [,sl,,,k,c1,c2]=it,{hx,hy,hw,hh,bx,by,bw,bh}=A,cx=32,o=rd(Math.sin(t/300)),fl=(t/90|0)%3,x0=bx+bw+2,ny=hy+hh,ang=t/700,fx=32+Math.cos(ang)*23,fy=30+Math.sin(ang*1.3)*9,w=Math.abs(Math.sin(t/120))*3|0;
 if(sl=='g')return;if(sl=='t')return gt(it,t,A);
 if(sl=='h'&&k=='cowboy'){R(cx-9,hy-3,18,2,c1);R(cx-5,hy-8,10,5,c1);R(cx-5,hy-4,10,1,c2);R(cx-9,hy-4,2,1,c1);R(cx+7,hy-4,2,1,c1)}
 if(sl=='h'&&k=='shades'){const e=hy+rd(hh*.38);R(hx+1,e-1,hw-2,1,c1);R(hx+2,e,5,4,c1);R(hx+hw-7,e,5,4,c1);R(hx+7,e,hw-14,1,c1);R(hx+3,e+1,1,1,c2);R(hx+hw-6,e+1,1,1,c2)}
 if(sl=='w'&&k=='shield'){R(x0-2,by+1,8,9,c1);R(x0-1,by+2,6,7,c2);R(x0+1,by+3,2,5,c1);R(x0,by+10,4,1,c1)}
 if(sl=='f'&&k=='fish'){const wg=(t/150|0)%2;R(fx,fy,5,3,c1);R(fx+5,fy-1+wg,1,2,c2);R(fx+5,fy+2-wg,1,2,c2);R(fx+1,fy+1,1,1,'#fff')}
 
 if(sl=='h'){
  if(k=='cone'){R(cx-7,hy-3,14,2,c1);R(cx-5,hy-6,10,3,c1);R(cx-3,hy-9,6,3,c1);R(cx-1+o,hy-12,3,3,c1);R(cx-5,hy-4,10,1,c2)}
  if(k=='top'){R(cx-7,hy-3,14,1,c1);R(cx-4,hy-10,8,7,c1);R(cx-4,hy-6,8,1,c2)}
  if(k=='bow'){R(hx+hw-7,hy-4,3,3,c1);R(hx+hw-3,hy-4,3,3,c1);R(hx+hw-4,hy-3,1,1,c2)}
  if(k=='cap'){R(cx-8,hy-2,16,2,c1);R(cx-6,hy-5,12,3,c1);R(cx-3,hy-7,6,2,c1);R(cx-1,hy-9,2,2,c2)}
  if(k=='wreath')for(let i=0;i<hw/2-1;i++)R(hx+2+i*2,hy-2-(i%2),2,2,i%3?c1:c2);
  if(k=='shroom'){R(cx-8,hy-4,16,3,c1);R(cx-5,hy-7,10,3,c1);R(cx-3,hy-5,2,2,c2);R(cx+2,hy-6,2,2,c2);R(cx+5,hy-4,2,1,c2)}
  if(k=='bunny')for(const d of[-1,1]){R(cx+d*5-1+rd(o*d*.7),hy-12,3,9,c1);R(cx+d*5+rd(o*d*.7),hy-10,1,6,c2)}
  if(k=='viking'){R(hx+1,hy-3,hw-2,3,c1);R(hx-1,hy-7,2,5,c2);R(hx+hw-1,hy-7,2,5,c2);R(cx-1,hy-5,2,2,c2)}
  if(k=='ant')for(const d of[-1,1]){R(cx+d*4,hy-8,1,5,c1);R(cx+d*4-1+o*d,hy-10,3,3,c2)}
  if(k=='crown'){R(cx-6,hy-4,12,3,c1);for(let i=0;i<4;i++){R(cx-6+i*4,hy-6,2,2,c1);R(cx-6+i*4,hy-7,2,1,c2)}R(cx-1,hy-3,2,1,c2)}
  if(k=='flame'){R(cx-6,hy-4,12,2,c1);for(let i=0;i<6;i++)R(cx-6+i*2,hy-6-((t/80+i*3)%4|0),2,2+i%2,i%2?c1:c2)}
  if(k=='star'){const b=o;R(cx-6,hy-3,12,1,c2);R(cx-2,hy-11+b,5,1,c1);R(cx,hy-13+b,1,5,c1);R(cx,hy-11+b,1,1,'#fff')}
  if(k=='witch'){R(cx-9,hy-3,18,2,c1);R(cx-5,hy-7,10,4,c1);R(cx-3,hy-10,6,3,c1);R(cx+1+o,hy-13,3,3,c1);R(cx-5,hy-5,10,1,c2)}
  if(k=='chef'){R(cx-6,hy-8,12,5,c1);R(cx-4,hy-10,8,2,c1);R(cx-6,hy-4,12,1,c2);R(cx-3,hy-7,1,3,c2)}
  if(k=='phones'){const m=hh/2|0;R(hx-1,hy-3,hw+2,1,c1);R(hx-1,hy-2,1,m,c1);R(hx+hw,hy-2,1,m,c1);R(hx-3,hy+m-2,3,5,c2);R(hx+hw,hy+m-2,3,5,c2)}
  if(k=='sprout'){R(cx-1,hy-5,2,5,'#3f9a45');R(cx-5,hy-8+o,5,3,c1);R(cx+1,hy-9-o,5,3,c2)}
  if(k=='pirate'){R(cx-8,hy-3,16,2,c1);R(cx-5,hy-7,10,4,c1);R(cx-2,hy-6,1,1,c2);R(cx+1,hy-6,1,1,c2);R(cx-1,hy-5,2,1,c2)}
  if(k=='halo'){const y=hy-8+o;R(cx-5,y,10,1,c1);R(cx-6,y+1,1,1,c1);R(cx+5,y+1,1,1,c1);R(cx-5,y+2,10,1,c2)}
 }
 if(sl=='n'){
  if(k=='scarf'){R(hx+1,ny-1,hw-2,2,c1);R(hx+hw-5,ny,3,5+o,c1);R(hx+hw-5,ny+2,3,1,c2)}
  if(k=='tie'){R(29,ny,2,3,c1);R(33,ny,2,3,c1);R(31,ny+1,2,2,c2)}
  if(k=='bell'){R(hx+2,ny,hw-4,1,c1);R(31,ny+1+o*.5,2,3,c2)}
  if(k=='lei')for(let i=0;i<hw/2-1;i++)R(hx+2+i*2,ny-1+(i%2),2,2,i%2?c1:c2);
  if(k=='ruff'){R(hx,ny-1,hw,2,c1);for(let i=0;i<hw/3;i++)R(hx+1+i*3,ny+1,1,1,c2)}
  if(k=='fur'){R(hx-1,ny-2,hw+2,3,c1);for(let i=0;i<hw/3;i++)R(hx+i*3,ny-2,1,1,c2)}
  if(k=='cape'||k=='capes'){R(hx+2,ny-1,hw-4,2,c1);R(bx-3,by+1,3,bh+1+o,c1);R(bx-2,by+1,1,bh,c2);R(bx+bw,by+1,3,bh+1-o,c1);R(bx+bw,by+1,1,bh,c2);
   if(k=='capes')for(let i=0;i<4;i++)if((t/200+i|0)%3<1)R(i%2?bx+bw+1:bx-2,by+2+i*2,1,1,'#fff')}
  if(k=='medal'){R(30,ny,1,3,c1);R(33,ny,1,3,c1);R(31,ny+3,2,2,c2)}
  if(k=='aurora'){for(let i=0;i<hw-2;i++)R(hx+1+i,ny-1,1,2,`hsl(${(t/8+i*12)%360},80%,65%)`);for(let j=0;j<6;j++)R(hx+hw-4+rd(Math.sin(t/200+j)*1.5),ny+j,2,1,`hsl(${(t/8+j*25)%360},80%,65%)`)}}
 if(sl=='n'){
  if(k=='bandana'){R(hx+1,ny-1,hw-2,2,c1);R(cx-3,ny+1,6,2,c1);R(cx-1,ny+3,2,2,c1);R(cx-2,ny+1,1,1,c2);R(cx+1,ny+1,1,1,c2)}
  if(k=='pearl'){const n=Math.max(4,hw/3|0);for(let i=0;i<n;i++){const u=i/(n-1)*2-1;R(hx+2+i*(hw-5)/(n-1),ny-1+Math.round((1-u*u)*2),2,2,c1)}R(cx-1,ny+2,3,3,c2)}}
 if(sl=='w'){
  if(k=='lolli'){R(x0+1,by+3,1,bh,c2);ell(x0+1,by+1,4,4,c1,1);R(x0-1,by,2,1,'#fff');R(x0,by+2,3,1,'#fff')}
  if(k=='bow'){R(x0,by-3,1,2,c1);R(x0+1,by-1,1,2,c1);R(x0+2,by+1,1,5,c1);R(x0+1,by+6,1,2,c1);R(x0,by+8,1,2,c1);R(x0+3,by-3,1,13,c2);R(x0-3,by+3,5,1,c2)}
  if(k=='hammer'){R(x0+1,by,1,bh+1,'#8a6a3a');R(x0-2,by-3,7,4,c1);R(x0-2,by-3,7,1,c2)}
  if(k=='lens'){R(x0-1,by-2,5,1,c1);R(x0-1,by+2,5,1,c1);R(x0-1,by-2,1,5,c1);R(x0+3,by-2,1,5,c1);R(x0,by-1,3,3,'rgba(200,230,255,.5)');R(x0+2,by+3,1,bh-4,c2)}
  if(k=='staff'){R(x0,by-8,1,bh+9,c1);R(x0-1,by-11,3,3,c2);R(x0,by-12,1,1,'#fff')}
  if(k=='wand'){for(let i=0;i<6;i++)R(x0+i,by+8-i,1,1,c1);R(x0+4,by+1,3,1,c2);R(x0+5,by,1,3,c2);if(fl)R(x0+5,by+1,1,1,'#fff')}
  if(k=='lantern'){R(x0+1,by,1,3,c1);R(x0,by+3,4,5,c1);R(x0+1,by+4,2,3,fl?c2:'#fff')}
  if(k=='sword'){R(x0+1,by-4,2,10,c1);R(x0-1,by+6,6,1,c2);R(x0+1,by+7,2,3,c2)}
  if(k=='flower'){R(x0+1,by+3,1,bh,'#3f9a45');R(x0,by,3,3,c1);R(x0+1,by+1,1,1,c2)}
  if(k=='umb'){R(x0-4,by-4,11,2,c1);R(x0-2,by-6,7,2,c1);R(x0,by-6,1,2,c2);R(x0+1,by-2,1,bh+3,c2)}
  if(k=='book'){R(x0,by+bh-6,6,5,c1);R(x0+1,by+bh-5,4,3,c2);if(fl==1)R(x0+3,by+bh-6,1,4,c1)}
  if(k=='balloon'){const b=rd(Math.sin(t/500)*2);R(x0+1,by-4,1,bh+4,c2);R(x0-2,by-12+b,6,7,c1);R(x0-1,by-13+b,4,1,c1);R(x0-1,by-11+b,1,2,'#fff')}
  if(k=='torch'){R(x0,by+2,2,bh,'#8a6a3a');R(x0-1,by-2-fl,4,4,c1);R(x0,by-1,2,2,c2)}
  if(k=='orb'){ell(x0+2,by+4,7,7,c1,.2);ell(x0+2,by+4,4,4,c1,.9);R(x0,by+2,1,1,'#fff')}
  if(k=='trident'){R(x0+1,by-6,1,bh+7,c2);R(x0-1,by-6,5,1,c1);for(let i=0;i<3;i++)R(x0-1+i*2,by-9,1,4,c1)}}
 if(sl=='f'){
  if(k=='fly'){R(fx-2-w,fy,2+w,2,c1);R(fx+1,fy,2+w,2,c1);R(fx,fy,1,2,c2)}
  if(k=='star')spr(SP.star,rd(fx)-3,rd(fy)-3,c1,c2);
  if(k=='heart')spr(SP.heart,rd(fx)-3,rd(fy)-3,c1,c2);
  if(k=='fairy'){R(fx,fy,2,2,c1);R(fx-2,fy-1,2,1,c2);R(fx+2,fy-1,2,1,c2);R(fx-3,fy+2,1,1,c1)}
  if(k=='moon')spr(SP.moon,rd(fx)-3,rd(fy)-4,c1,c2);
  if(k=='ghost')spr(SP.ghost,rd(fx)-3,rd(fy)-4,c1,c2);
  if(k=='cloud')spr(SP.cloud,rd(fx)-5,rd(fy)-3,c1,c2);
  if(k=='orbs')for(let j=0;j<3;j++){const a=ang*1.5+j*2.1;R(32+Math.cos(a)*20,34+Math.sin(a)*8,2,2,j?c2:c1)}
  if(k=='planet')spr(SP.planet,rd(fx)-4,rd(fy)-3,c1,c2);
  if(k=='wisp'){R(fx,fy+2,3,3,c1);R(fx+1,fy-fl,1,3,c2);R(fx,fy+1-fl,1,2,c1)}
  if(k=='bee'){R(fx-1,fy-2-(w%2),2,2,c2);R(fx+2,fy-2,2,2,c2);R(fx,fy,4,3,c1);R(fx+1,fy,1,3,'#222');R(fx+3,fy,1,3,'#222')}
  if(k=='bunny'){R(fx,fy,5,4,c1);R(fx,fy-3,1,3,c1);R(fx+3,fy-3,1,3,c1);R(fx+1,fy+1,1,1,c2);R(fx+3,fy+1,1,1,c2);R(fx+2,fy+2,1,1,c2)}
  if(k=='sparkle'){const q=fl+1;R(fx,fy-q-1,1,2*q+3,c1);R(fx-q-1,fy,2*q+3,1,c1);R(fx,fy,1,1,c2)}}
}

/* ===== GM dedicated art: Kitsune + Divine Dragon ===== */
function kitsune(t,pu){const C=Math.cos,Sn=Math.sin,W='#f6efe2',W2='#e6d9c2',RD='#e0302a',DK='#2e2430',BX=32,BY=47,fl=(t/150|0)%2;
 ell(32,34,27,24,'#7a8bff',.1+.06*pu);
 for(let i=0;i<60;i++){const a=i/60*6.283;R(32+C(a)*17,22+Sn(a)*17,1,1,i%5?'rgba(190,200,255,.5)':'#fff')}
 const tl=[0,1,2,3,4,5,6,7,8].sort((a,b)=>Math.abs(b-4)-Math.abs(a-4));
 for(const j of tl){const a0=-90+(j-4)*17,sw=Sn(t/520+j*.7)*9,L=27-Math.abs(j-4)*.9,n=7,E1=[],E2=[],P=[];
  for(let i=0;i<=n;i++){const u=i/n,an=(a0+sw*u*u+(j-4)*6*u)*Math.PI/180,r=u*L,w=(Sn(u*3.14)*.8+.25)*(j==4?5.5:4.8)*(1-u*.35),cx=BX+C(an)*r,cy=BY+Sn(an)*r,nx=-Sn(an),ny=C(an);E1.push([cx+nx*w,cy+ny*w]);E2.push([cx-nx*w,cy-ny*w]);P.push([cx,cy,nx,ny,w])}
  pol([...E1,...E2.reverse()],j%2?W:W2);const q=P[n-1],e=P[n];
  pol([[q[0]+q[2]*q[4],q[1]+q[3]*q[4]],[e[0],e[1]-1],[q[0]-q[2]*q[4],q[1]-q[3]*q[4]]],(fl+j)%2?'#9fb4ff':'#c9a6ff')}
 pol([[27,37],[37,37],[41,46],[42,55],[22,55],[23,46]],W);ell(25,52,5,4,W,1);ell(39,52,5,4,W,1);R(29,40,6,10,'#fff');
 for(const x0 of[27,34]){R(x0-1,48,5,9,'#1d1630');R(x0,49,3,7,W);R(x0,53,3,3,DK)}
 R(27,38,10,2,RD);R(31,40,2,2,'#ffd23a');R(30,42,1,3,RD);R(33,42,1,3,RD);
 for(const d of[-1,1]){pol([[32+d*6,15],[32+d*13,3],[32+d*15,21]],W);pol([[32+d*8,16],[32+d*13,7],[32+d*13.5,19]],'#e0605a');R(32+d*12.5-1,3,2,4,DK)}
 pol([[32,13],[39,14],[43,20],[44,26],[49,29],[42,32],[37,37],[32,39],[27,37],[22,32],[15,29],[20,26],[21,20],[25,14]],W);
 pol([[32,15],[34,18],[32,21],[30,18]],RD);R(29,30,6,5,'#fff');R(31,31,2,2,DK);R(30,34,1,1,DK);R(33,34,1,1,DK);
 for(const d of[-1,1]){const x0=d<0?18:40,ex=d<0?24:35;R(x0,27,5,1,RD);R(x0+(d<0?1:0),29,4,1,RD);R(ex,23,5,1,RD);
  if(t%3600<140)R(ex,25,5,1,DK);else{if(d<0){R(ex,24,2,2,'#ffd23a');R(ex+2,25,3,2,'#ffd23a')}else{R(ex+3,24,2,2,'#ffd23a');R(ex,25,3,2,'#ffd23a')}R(ex+(d<0?3:2),25,1,2,DK)}}
 for(let i=0;i<3;i++){const a=t/450+i*2.094,ox=32+C(a)*25,oy=30+Sn(a)*10;for(let q=1;q<4;q++)R(32+C(a-q*.2)*25,30+Sn(a-q*.2)*10,2,2,'rgba(160,180,255,'+(.5-q*.12)+')');
  ell(ox,oy,5,5,'#7a8bff',.25);ell(ox,oy,3,3,'#9fb4ff',1);ell(ox,oy+1,2,2,'#fff',1);R(ox,oy-4-((t/90+i)%2|0),2,3,'#7a8bff')}}
function drgn(t,pu){const C=Math.cos,Sn=Math.sin,G='#e8b43a',G2='#b8801c',G3='#ffe48a',RD='#d8302a',OR='#ff8a2b',DK='#3a1a10',IV='#fff4d0',fl=Sn(t/260)*3;
 ell(32,34,28,26,'#ffb13b',.12+.06*pu);
 for(let i=0;i<16;i++){const a=i/16*6.283+t/1800,r=17,r2=22+(i%2)*4;ln([32+C(a)*r,20+Sn(a)*r],[32+C(a)*r2,20+Sn(a)*r2],i%2?'#ffd23a':OR)}
 for(let i=0;i<48;i++){const a=i/48*6.283;R(32+C(a)*17,20+Sn(a)*17,1,1,'#fff0a0')}
 for(const d of[-1,1]){const S=[32+d*9,38],E=[32+d*22,23-fl],T1=[32+d*30,29-fl],T2=[32+d*29,39-fl*.5],T3=[32+d*22,48];
  pol([S,E,T1,[32+d*24,32],T2,[32+d*25,43],T3,[32+d*12,46]],RD,'#5a1408');[T1,T2,T3].forEach(q=>ln(E,q,G));ln(S,E,G3);ln(E,[32+d*30,29-fl],G)}
 const tp=[];for(let i=0;i<=14;i++){const u=i/14;tp.push([41+u*17,52-Sn(u*3.5+t/400)*3-u*8,4-u*2.6])}
 tp.forEach(q=>ell(q[0],q[1],q[2]+1,q[2]+1,DK,1));tp.forEach((q,i)=>ell(q[0],q[1],q[2],q[2],i%2?G:G2,1));const te=tp[14];pol([[te[0]-2,te[1]],[te[0]+3,te[1]-6-(t/90%2|0)],[te[0]+5,te[1]+1]],OR);
 pol([[26,34],[38,34],[43,44],[43,55],[21,55],[21,44]],G);
 for(let r=0;r<5;r++){R(27,38+r*3,10,2,G3);R(27,40+r*3,10,1,G2)}for(let i=0;i<8;i++)R(23+(i*5)%4,40+i*2,1,1,G2),R(40-(i*5)%4,41+i*2,1,1,G2);
 for(const x0 of[22,30]){pol([[x0,52],[x0+7,52],[x0+8,57],[x0-1,57]],G);R(x0-1,57,1,1,IV);R(x0+3,57,1,1,IV);R(x0+7,57,1,1,IV)}
 for(const d of[-1,1])pol([[32+d*9,40],[32+d*5,40],[32+d*3,47],[32+d*7,48]],G);
 ell(32,45,6,6,'#fff6c0',.22+.14*pu);ell(32,45,3,3,'#ffd23a',1);R(31,44,1,1,'#fff');
 for(const d of[-1,1]){const w=(t/110|0)%2;pol([[32+d*10,24],[32+d*18+w*d,20],[32+d*15,28],[32+d*19+w*d,32],[32+d*10,32]],RD)}
 for(const d of[-1,1]){pol([[32+d*7,13],[32+d*9,6],[32+d*16,1],[32+d*13,7],[32+d*17,8],[32+d*11,14]],IV)}
 for(let i=0;i<3;i++){const x0=28+i*4,h=7+(i==1?3:0)+((t/80+i*3)%3|0);pol([[x0,13],[x0+2,13-h],[x0+4,13]],i==1?OR:RD)}
 pol([[32,12],[39,13],[43,19],[44,25],[40,30],[36,32],[28,32],[24,30],[20,25],[21,19],[25,13]],G);pol([[27,24],[37,24],[38,29],[36,33],[28,33],[26,29]],G3);
 R(29,28,1,2,DK);R(34,28,1,2,DK);R(29,32,1,2,IV);R(34,32,1,2,IV);
 for(const d of[-1,1]){const ex=d<0?24:35;ell(ex+2,20,4,3,'#ff5a2b',.25);R(ex,19,5,3,'#ff3030');R(ex+2,19,1,3,'#2a0a00');R(ex+1,19,1,1,'#fff');R(ex+(d<0?0:1),17,4,1,DK);R(ex+(d<0?3:0),18,2,1,DK);
  for(let i=0;i<16;i++)R(32+d*(6+i),29+i*.35+Sn(t/300+i*.4)*2,1,1,G3),R(32+d*(5+i),31+i*.3+Sn(t/300+i*.4+1)*2,1,1,G3)}
 for(let i=0;i<8;i++)R(10+(i*7)%44,GY-((t/25+i*13)%55),1,1,i%2?'#ffd23a':'#ff6a2b')}
function gmArt(t,sp){const fk=sp=='fox9',A=fk?{hx:20,hy:13,hw:24,hh:25,bx:24,by:37,bw:16,bh:19}:{hx:21,hy:12,hw:22,hh:21,bx:21,by:32,bw:22,bh:23},E=EQ(),pu=.5+.5*Math.sin(t/500);
 x.globalAlpha=1;R(24,GY-1,16,2,'rgba(0,0,0,.4)');E.forEach(it=>{if(it[1]=='g')wing(it,t,A)});gmBack(t,sp,pu);({fox9:kitsune,voidk:voidk,solph:solarph}[sp]||drgn)(t,pu);gmFront(t,sp,pu);E.forEach(it=>{if(it[1]!='g')item(it,t,A)});x.globalAlpha=1}
function cat(t,f,st){
 const sp=K.sp||'cat',SC=SPC[sp];if(SC.gm&&st>=3)return gmArt(t,sp);const big=st>=3,SKN=skinData(K),CST=costume(K),HE=!!CST,SPX=sp,[bw,bh,hw,hh]=[0,[12,8,16,13],[16,11,18,14],[20,14,20,15],[22,16,22,16]][st].map((v,i)=>v+SC.d[i]+(SKN&&SKN.ov=='panda'&&i>1?1:0));
 const el=t-T0,idle=t-LA,slp=idle>25000&&el>700,cy=idle%16000,str=!slp&&cy>6000&&cy<7600,chs=!slp&&cy>11000&&cy<13500,jump=el<650?-rd(Math.sin(el/650*Math.PI)*8):chs?-rd(Math.abs(Math.sin(t/160))*3):WK?-((t/130|0)%2):0,br=rd(Math.sin(t/600)*.5+.5);
 const tv=[1,.88,1.1,.94,1.06][(K.seed>>3)%5],pat=K.seed%5,fur=big?dk(SKN&&SKN.fix?SKN.base:SKN?mix(f.fur,SKN.base,.65):sp=='cat'?f.fur:mix(f.fur,SC.base,.4),SKN&&SKN.fix?1:tv):(SKN?SKN.fur0:SC.fur0),acc=st>=2?f.acc:'#f0a0b0',eye=K.evil?'#ff2a2a':(SKN&&SKN.ov=='panda')?'#0a0710':(SKN&&SKN.ov=='zombie')?'#e8e070':(SKN&&SKN.ov=='hallo')?'#ffa020':big?f.eye:'#2a1a10',sd0=dk(fur,.7),lt=dk(fur,1.18),OUT=dk(fur,.22);
 const gh=(f.ghost||f.halo)&&big?rd(Math.sin(t/500)*2)-(f.halo?3:0):0;
 const by=GY-2-bh+jump+gh,bx=32-bw/2,hy=by-hh+4+br+(slp?2:0)+(str?3:0)+((t-EAT<1000)?rd(Math.abs(Math.sin(t/70))*2):0),hx=32-hw/2;
 if(st==4&&!f.ghost)ell(32,40,26+Math.sin(t/400)*2,24,f.pc,.13);
 const sw=bw+8+jump;R(32-sw/2,GY-1,sw,2,'rgba(0,0,0,.4)');
 x.globalAlpha=f.ghost&&big?.55+.15*Math.sin(t/300):1;
 const P=[],q=(a,b,w,h,c)=>P.push([a,b,w,h,c]);
 // tails
 const tt=f.tail=='flame'&&big?(t%300<150?'#ff9a2b':'#ffdd55'):f.tail=='arrow'?f.acc:f.tail=='light'?'#fff3b0':fur;
 const TC=(i,n)=>sp=='lion'&&i>=n-2?'#6a2a0a':sp=='tiger'?(i%2||i>=n-1?'#4a2a10':fur):sp=='fox'&&i>=n-2?'#ffffff':sp=='wolf'&&i>=n-1?'#3a3a44':i>=n-2?tt:fur,TWd=(sp=='fox'||sp=='wolf'||sp=='tiger')?4:3;const tail=(sx,sy,d,ph,n)=>{for(let i=0;i<n;i++)q(sx+d*i*1.3+Math.sin((chs?t*3:t)/320-i*.7+ph)*i*.8,sy-i*2.3,TWd,3,TC(i,n))};
 if(CST)csTail(q,CST,{bx,by,bw,bh},t);else if(SC.tn)tail(bx+bw-1,by+bh-3,1,0,SC.tn);else if(sp=='pig'){q(bx+bw,by+bh-5,2,2,fur);q(bx+bw+2,by+bh-7,2,2,fur);q(bx+bw,by+bh-9,3,2,fur)}else q(bx+bw-1,by+bh-4,3,3,fur);
 if(f.tail=='three'&&big&&SC.tn&&!CST){tail(bx,by+bh-3,-1,1.5,SC.tn);tail(bx+bw-1,by+bh-3,1,3,Math.min(4,SC.tn))}
 // extra heads
 if(f.heads&&big)for(const sd of[-1,1]){const sx=32+sd*14-4,yy=hy+5+rd(Math.sin(t/400+sd)*1);q(sx,yy,8,8,fur);q(sx,yy-2,2,2,fur);q(sx+6,yy-2,2,2,fur)}
 // body, paws
 q(bx,by+1,bw,bh-1,fur);q(bx+1,by,bw-2,1,fur);{const sp2=WK?(t/130|0)%2:0;q(bx+2,by+bh-sp2,4,2,lt);q(bx+bw-6,by+bh-(WK?1-sp2:0),4,2,lt)}
 // head
 if(sp=='lion'&&st>=2){const mc=dk(fur,.55);q(hx-6,hy+1,hw+12,hh+4,mc);q(hx-4,hy-3,hw+8,hh+8,mc);q(hx-2,hy+hh,hw+4,5,mc);q(hx-7,hy+5,2,3,mc);q(hx+hw+5,hy+5,2,3,mc)}if(sp=='wolf'||sp=='tiger'||sp=='fox'){q(hx-2,hy+hh-5,4,5,fur);q(hx+hw-2,hy+hh-5,4,5,fur)}q(hx,hy+1,hw,hh-1,fur);q(hx+1,hy,hw-2,hh,fur);if(big)q(hx-1,hy+hh-5,hw+2,3,fur);
 const tw=[t%4100<160?1:0,t%5300<160?1:0];
 [-1,1].forEach((sd,i)=>{if(HE)return;const ex=sd<0?hx:hx+hw-5,dy=tw[i];if(SC.ear=='dog')q(sd<0?hx-3:hx+hw-1,hy+1,4,9+dy,dk(fur,.78));else if(SC.ear=='pig'){q(ex,hy-1+dy,5,3,fur);q(ex+(sd<0?0:1),hy-2+dy,4,1,fur)}else if(SC.ear=='koala')q(sd<0?hx-5:hx+hw-4,hy-4+dy,9,8,fur);else if(SC.ear=='wolf'){q(ex,hy-2+dy,5,4,fur);q(ex+1,hy-6+dy,3,4,fur);q(ex+1,hy-9+dy,2,3,fur)}else if(SC.ear=='lion')q(sd<0?hx+1:hx+hw-5,hy-4+dy,4,4,fur);else if(SC.ear=='tiger')q(sd<0?hx-1:hx+hw-5,hy-3+dy,6,5,fur);else if(SC.ear=='bear')q(sd<0?hx-1:hx+hw-5,hy-3+dy,6,4,fur);else if(SC.ear=='rabbit'){q(ex,hy-10+dy,4,11,fur)}else if(SC.ear=='fox'){q(ex,hy-3+dy,5,5,fur);q(ex+1,hy-6+dy,3,3,fur);q(ex+2,hy-8+dy,1,2,fur)}else{q(ex,hy-1+dy,5,3,fur);q(ex+1,hy-3+dy,3,2,fur);q(ex+2,hy-4+dy,1,1,fur)}});
 if(CST)csTop(q,CST,{bx,by,bw,bh,hx,hy,hw,hh},t);// horns
 if(f.horn&&st>=2)for(const sd of[-1,1]){const ox=sd<0?hx+5:hx+hw-7,h2=st==2?0:1;
  if(f.horn=='small')q(ox,hy-4-h2*2,2,3+h2*2,f.acc);
  if(f.horn=='curved'){q(ox,hy-4,2,3,f.acc);if(big){q(ox+sd*2,hy-7,2,3,f.acc);q(ox+sd*4,hy-9,1,2,f.acc)}}
  if(f.horn=='crystal'){q(ox,hy-5,2,4,f.acc);if(big){q(ox+sd,hy-9,2,5,'#b8ffcf');q(ox-sd*2,hy-7,1,3,f.acc)}}
  if(f.horn=='antler'){q(ox,hy-6,1,5,'#8a6a3a');if(big){q(ox-sd,hy-9,1,3,'#8a6a3a');q(ox+sd*2,hy-7,2,1,'#8a6a3a');q(ox-sd*2,hy-7,2,1,'#8a6a3a')}}}
 if(st==4)asc(t,f,{bx,by,bw,bh,hx,hy,hw,hh},0);
 if(f.wing&&st>=2)fwForm(t,f,st,{bx,by,bw,bh,hx,hy,hw,hh});
 EQ().forEach(it=>{if(it[1]=='g')wing(it,t,{hx,hy,hw,hh,bx,by,bw,bh})});
 x.fillStyle=OUT;P.forEach(p=>x.fillRect(rd(p[0])-1,rd(p[1])-1,p[2]+2,p[3]+2));
 P.forEach(p=>R(p[0],p[1],p[2],p[3],p[4]));
 // body details
 R(bx+3,by+3,bw-6,bh-3,lt);
 R(bx+1,by+bh-2,bw-2,2,sd0);R(bx+2,by+1,bw-4,1,lt);R(hx+1,hy+hh-3,hw-2,2,sd0);R(hx+2,hy+1,hw-4,1,lt);
 if(st>=2&&!(SKN&&/panda|zombie|hallo/.test(SKN.ov))){const W='rgba(255,255,255,.8)';
  if(pat==0)for(let i=0;i<3;i++)R(bx+2+i*((bw-4)/2.5|0),by+1,1,3,sd0);
  if(pat==1)for(let i=0;i<5;i++)R(bx+2+(i*7)%(bw-4),by+1+(i*5)%(bh-3),2,2,sd0);
  if(pat==2){R(bx+2,by+bh,4,2,W);R(bx+bw-6,by+bh,4,2,W)}
  if(pat==3)R(29,by+1,6,bh-2,W);
  if(pat==4)R(hx+2,hy+2,hw-4,4,sd0)}
 R(bx+2,by+bh+1,1,1,sd0);R(bx+bw-5,by+bh+1,1,1,sd0);if(sp=='tiger'){for(let i=0;i<4;i++)R(bx+2+i*((bw-4)/3|0),by+1,2,bh-4,'#4a2a10');R(hx+2,hy+1,2,4,'#4a2a10');R(hx+hw-4,hy+1,2,4,'#4a2a10');R(31,hy+1,2,3,'#4a2a10')}
 if(f.vines&&st>=2){for(let i=0;i<bh;i+=2)R(bx+(i%4)+rd(Math.sin(t/500+i)*.6),by+i,2,1,'#3f9a45');R(bx+2,by+1,1,1,f.acc);R(bx+bw-3,by+bh-3,1,1,f.acc);R(hx+2,hy+hh-1,1,3+br,'#3f9a45')}
 if(f.stars&&big)for(let i=0;i<16;i++)if((Math.floor(t/260)+i)%3){const on=i<9;R(on?bx+(i*5)%bw:hx+(i*7)%hw,on?by+(i*3)%bh:hy+(i*3)%hh,1,1,i%4?'#fff':'#c9a6ff')}
 // ear inner
 {const sp=HE?'none':SPX;if(sp=='cat')[-1,1].forEach((sd,i)=>R((sd<0?hx:hx+hw-5)+2,hy-2+tw[i],1,2,'#f0a0b0'));else if(sp=='bear'||sp=='hamster')[-1,1].forEach((sd,i)=>R((sd<0?hx-1:hx+hw-5)+2,hy-2+tw[i],2,2,dk(fur,.7)));else if(sp=='rabbit')[-1,1].forEach((sd,i)=>R((sd<0?hx:hx+hw-5)+1,hy-8+tw[i],2,7,'#f0a0b0'));if(sp=='koala')[-1,1].forEach((sd,i)=>R(sd<0?hx-3:hx+hw-2,hy-2+tw[i],5,4,'#efe6ea'));if(sp=='tiger')[-1,1].forEach((sd,i)=>R(sd<0?hx+1:hx+hw-4,hy-2+tw[i],3,2,'#fff6ea'));if(sp=='wolf')[-1,1].forEach((sd,i)=>R((sd<0?hx:hx+hw-5)+2,hy-5+tw[i],1,3,'#2a2a33'));if(sp=='lion')[-1,1].forEach((sd,i)=>R(sd<0?hx+2:hx+hw-4,hy-3+tw[i],2,2,'#f0c0a0'));}
 // face
 if(st>=2&&!(SKN&&SKN.ov=='panda')){R(32-1,hy+1,2,3,sd0);R(28,hy+2,2,2,sd0);R(34,hy+2,2,2,sd0)}
 const ey=hy+rd(hh*.38),es=st==1?4:3,e1=hx+rd(hw*.2),e2=hx+hw-rd(hw*.2)-es,lk=rd(Math.sin(t/1700));if(CST)csFront(CST,{bx,by,bw,bh,hx,hy,hw,hh,ey,es,e1,e2},t);else if(SKN&&SKN.ov)skOv(SKN.ov,{bx,by,bw,bh,hx,hy,hw,hh,ey,es,e1,e2});
 if(slp||str||t%3200<130){R(e1,ey+1,es,1,'#111');R(e2,ey+1,es,1,'#111')}
 else for(const ex of[e1,e2]){R(ex,ey-1,es,1,OUT);R(ex,ey,es,es+1,eye);R(ex+1+(es>3?0:lk),ey+1,1,es-1,'#150d24');R(ex,ey,1,1,'#fff');R(ex+es-1,ey+es,1,1,'rgba(255,255,255,.55)')}
 if(K.evil&&!slp){const B='#120008';R(e1-1,ey-3,es+2,1,B);R(e1+es-1,ey-2,2,1,B);R(e2-1,ey-3,es+2,1,B);R(e2-1,ey-2,2,1,B)}const ny=ey+es+1,dm='#3a2030';
 if(pat==3&&st>=2)R(29,ny-1,6,4,'rgba(255,255,255,.75)');R(31,ny,2,1,'#f08a9a');R(30,ny+1,1,1,dm);R(31,ny+2,2,1,dm);R(33,ny+1,1,1,dm);
 R(e1-1,ny,2,1,'rgba(255,120,150,.5)');R(e2+es-1,ny,2,1,'rgba(255,120,150,.5)');if(sp=='dog'){R(28,ny,8,3,lt);R(31,ny,2,2,'#2a1a1a');R(30,ny+2,1,1,dm);R(33,ny+2,1,1,dm);if(t%2400<900)R(31,ny+2,2,2,'#ff7a8a')}else if(sp=='pig'){R(28,ny,8,3,'#f08aa0');R(30,ny,1,2,'#8a3a50');R(33,ny,1,2,'#8a3a50')}else if(sp=='bear'){R(28,ny,8,3,SKN&&SKN.ov=='panda'?'#fcfcfc':'#e8d4b0');R(31,ny,2,2,'#2a1a1a');R(31,ny+2,2,1,dm)}
 {const pd=SKN&&SKN.ov=='panda',BL='rgba(255,100,130,.55)';
 if(sp=='dog'){R(e1,ey-3,2,1,'#f6e8d0');R(e2+es-2,ey-3,2,1,'#f6e8d0');R(hx+1,hy+hh-1,hw-2,2,'#d63a4a');R(31,hy+hh+1,2,2,'#ffd76a');R(31,ny,1,1,'#7a7a8a');R(e1-3,ny+1,3,2,BL);R(e2+es,ny+1,3,2,BL)}
 else if(sp=='pig'){[hx,hx+hw-5].forEach((ex,i)=>R(ex+1,hy-1+tw[i],3,2,'#e58aa4'));R(e1-3,ny,3,2,BL);R(e2+es,ny,3,2,BL);R(29,ny,2,1,'#f8b8c8')}
 else if(sp=='bear'){R(31,ny,1,1,'#7a7a8a');R(30,ny+3,1,1,dm);R(33,ny+3,1,1,dm);if(pd){R(e1-3,ny+1,3,2,'rgba(255,130,160,.8)');R(e2+es,ny+1,3,2,'rgba(255,130,160,.8)')}else R(bx+4,by+3,bw-8,bh-5,mix(fur,'#ffffff',.3))}
 else if(sp=='koala'){R(bx+3,by+3,bw-6,bh-4,'#e2dde2');R(hx+1,hy+hh-3,hw-2,2,'#dcd6dc');R(29,ny-1,6,5,'#2a2a33');R(30,ny-1,2,1,'#888');R(e1-3,ny+1,3,2,BL);R(e2+es,ny+1,3,2,BL)}else if(sp=='fox9'){const RD='#e0302a',DK='#3a2a30';R(28,ny,8,3,'#fff');R(31,ny,2,1,'#2a2030');R(30,ny+3,1,1,dm);R(33,ny+3,1,1,dm);R(e1-3,ny,2,1,RD);R(e2+es+1,ny,2,1,RD);R(e1-3,ny+2,2,1,RD);R(e2+es+1,ny+2,2,1,RD);R(31,hy+1,2,3,RD);R(bx+2,by+bh-1,4,3,DK);R(bx+bw-6,by+bh-1,4,3,DK)}
 else if(sp=='dgn'){const wv=rd(Math.sin(t/250)*2),GD='#ffd23a';for(let i=0;i<bw-4;i+=3)for(let j=0;j<bh-3;j+=3)R(bx+2+i+(j%2?1:0),by+2+j,2,1,dk(fur,.72));R(bx+bw/2-3,by+2,6,bh-4,'#ffe48a');R(27,ny,10,4,dk(fur,1.12));R(29,ny,1,1,'#2a1a10');R(34,ny,1,1,'#2a1a10');R(29,ny+4,1,2,'#fff');R(34,ny+4,1,2,'#fff');R(hx-8,ny+wv,8,1,GD);R(hx-10,ny+1+wv,3,1,GD);R(hx+hw,ny-wv,8,1,GD);R(hx+hw+7,ny+1-wv,3,1,GD)}
 else if(sp=='fox'){R(bx+4,by+3,bw-8,bh-5,'#fff6ea');R(hx-1,hy+hh-5,3,4,'#fff6ea');R(hx+hw-2,hy+hh-5,3,4,'#fff6ea');R(28,ny,8,3,'#fff6ea');R(31,ny,2,1,'#2a2030');R(30,ny+3,1,1,dm);R(33,ny+3,1,1,dm);R(hx+2,hy-8,1,2,'#2a2030');R(hx+hw-3,hy-8,1,2,'#2a2030');R(bx+2,by+bh-1,4,3,'#3a2a2a');R(bx+bw-6,by+bh-1,4,3,'#3a2a2a')}else if(sp=='wolf'){const mh=Math.max(3,Math.min(6,hy+hh-ny+1));R(bx+3,by+1,bw-6,3,dk(fur,.55));R(bx+(bw>>1)-2,by+4,4,bh-6,'#e8eaf0');R(hx+3,hy+1,hw-6,2,dk(fur,.7));R(hx-1,hy+hh-5,3,4,'#e8eaf0');R(hx+hw-2,hy+hh-5,3,4,'#e8eaf0');R(27,ny-1,10,mh,'#e8eaf0');R(30,ny-1,4,2,'#1a1a22');R(31,ny+1,2,1,'#1a1a22');R(31,ny+2,1,2,dm);R(30,ny+4,4,1,dm)}else if(sp=='lion'){R(28,ny-1,8,5,'#f4dcae');R(30,ny-1,4,2,'#8a4a3a');R(31,ny+1,2,1,'#5a2a1a');R(30,ny+3,1,1,dm);R(33,ny+3,1,1,dm);R(29,ny+1,1,1,'#8a6a4a');R(34,ny+1,1,1,'#8a6a4a');R(e1,ey-2,es,1,'#6a2a0a');R(e2,ey-2,es,1,'#6a2a0a')}else if(sp=='tiger'){R(bx+4,by+bh-4,bw-8,3,'#fff6ea');R(27,ny,10,4,'#fff6ea');R(30,ny,4,2,'#e0707a');R(31,ny+2,2,1,dm);R(hx-1,hy+hh-5,3,4,'#fff6ea');R(hx+hw-2,hy+hh-5,3,4,'#fff6ea');R(hx-1,hy+hh-4,3,1,'#2a1a10');R(hx+hw-2,hy+hh-4,3,1,'#2a1a10');R(e1,ey-3,es,1,'#fff6ea');R(e2,ey-3,es,1,'#fff6ea')}else if(sp=='hamster'){R(e1-3,ny,3,3,'rgba(255,140,150,.6)');R(e2+es,ny,3,3,'rgba(255,140,150,.6)');R(30,by+3,4,Math.max(2,bh-6),'rgba(255,255,255,.5)');R(31,ny+2,2,1,dm)}else if(sp=='rabbit'){R(30,by+2,4,Math.max(2,bh-5),'rgba(255,255,255,.5)');R(30,ny+2,4,1,'#fff');R(31,ny+3,2,2,'#fff')}else{R(30,by+2,4,Math.max(2,bh-5),'rgba(255,255,255,.4)');R(30,ny+3,1,1,dm);R(33,ny+3,1,1,dm)}}
 if(CST)csFace(CST,{hx,hy,hw,ny},t);if(big&&sp=='cat'){const w=rd(Math.sin(t/700));for(const s of[-1,1]){const wx=s<0?hx-3:hx+hw;R(wx,ny+w,3,1,'rgba(255,255,255,.6)');R(wx+(s<0?1:0),ny+2-w,2,1,'rgba(255,255,255,.4)')}}
 if(f.heads&&big)for(const sd of[-1,1]){const sx=32+sd*14-4,yy=hy+5+rd(Math.sin(t/400+sd)*1);R(sx+2,yy+3,1,2,eye);R(sx+5,yy+3,1,2,eye)}
 if(f.halo&&st>=3){const y0=hy-9+rd(Math.sin(t/400)*1.2),g=t%1200<600?'#ffd76a':'#fff3b0';R(hx+5,y0,hw-10,1,g);R(hx+4,y0+1,1,1,g);R(hx+hw-5,y0+1,1,1,g);R(hx+5,y0+2,hw-10,1,g)}
 if(st==4)asc(t,f,{bx,by,bw,bh,hx,hy,hw,hh},1);
 EQ().forEach(it=>item(it,t,{hx,hy,hw,hh,bx,by,bw,bh}));
 x.globalAlpha=1;
 if(st==4&&!f.ghost)for(let i=0;i<5;i++)R(32+Math.cos(t/600+i*1.26)*24,38+Math.sin(t/600+i*1.26)*20,2,2,i%2?'#fff':f.pc);
}
let lt=0;
function draw(t){
 const dt=Math.min(50,t-lt||16);lt=t;
 x.globalAlpha=1;x.clearRect(0,0,64,64);
 const st=(!K.stage&&Object.keys(PV).length)?1:K.stage,c0=K.n?AU[topAura()][1]:'#7f6fd0';
 const BGI=curBg();if(BGI>=0)bgDraw(t,BG[BGI]);else{for(let i=0;i<14;i++)if((Math.floor(t/380)+i*7)%5)R((i*37)%62+1,(i*23)%36+2,1,1,i%3?'#8a7fc0':'#fff');
 for(let i=0;i<64;i+=2){const h=6+rd((Math.sin(i*.3)+Math.sin(i*.11+1))*3);R(i,GY-h,2,h,dk(c0,.16))}
 R(4,GY,56,1,dk(c0,.55));R(4,GY+1,56,7,dk(c0,.25));
 for(let i=0;i<8;i++)R(6+i*7,GY-1-(Math.sin(t/500+i)>.4?1:0),1,1,dk(c0,.6))}
 if(st>0)EQ().forEach(it=>{if(!it[3])return;if(it[2]>=3)ell(32,40,22+it[2]*2+Math.sin(t/300)*2,22,AU[it[3]][1],.07);if(Math.random()<.015*it[2]){emit(1,AU[it[3]][1],'a',34);const p=pt[pt.length-1];p.vx*=.3;p.vy*=.3;p.y=30+Math.random()*16}});
 if(st==0)egg(t,c0);else{const rg=st>=4?4:st>=3?8:14;
  if(t>W.next){W.tx=t-LA>25000?0:rd((Math.random()*2-1)*rg);W.sp=.02;W.next=t+4000+Math.random()*5000}
  const dx=W.tx-W.x;WK=Math.abs(dx)>.6?1:0;if(WK)W.x+=Math.sign(dx)*Math.min(Math.abs(dx),W.sp*dt);
  x.save();x.translate(rd(W.x),0);cat(t,st>=3?FORMS[K.form||decide()]:PLAIN,st);x.restore();if(SPC[K.sp||'cat'].gm&&t-GMT>=0&&t-GMT<1600)gmFx(t,t-GMT)}
 const eo=t-EVT;if(eo>=0&&eo<2500){const k=eo/2500,r=4+k*34;for(let i=0;i<48;i++){const a=i/48*6.283;R(32+Math.cos(a)*r,38+Math.sin(a)*r*.8,2,2,i%2?'#fff':'#ffd76a')}x.globalAlpha=(1-k)*.5;R(26,0,12,GY,'#fff');if(eo<400){x.globalAlpha=1-eo/400;R(0,0,64,64,'#fff')}x.globalAlpha=1}
 if(Math.random()<(st>=3?.14:.04)){const f=st>=3?FORMS[K.form]:null;emit(1,f?f.pc:c0,'a',38);const p=pt[pt.length-1];p.y=52;p.vx*=.3;p.vy=-.3-Math.random()*.5}
 const sg=st>=3&&SIG[K.form];if(sg&&Math.random()<.07)spawn(sg[0],K.form=='fallen'&&Math.random()<.5?'#fff':sg[1],sg[2]||16+Math.random()*32,sg[3]+(sg[2]?0:Math.random()*6),sg[4],sg[5],sg[6]);
 if(st>0&&t-LA>25000&&Math.random()<.012)spawn('z','#cfe0ff',37,30,.1,-.25);
 pt=pt.filter(p=>{p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;const sl=p.k=='a'||p.k=='f'||p.k=='z';p.vy+=(p.k=='a'?-.002:sl?0:.035)*dt/16;if(p.k=='f')p.x+=Math.sin(t/300+p.y)*.15;p.l-=dt/(sl?1400:900);
  if(p.l<=0)return false;x.globalAlpha=Math.min(1,p.l*1.5);
  if(p.k=='h'){R(p.x,p.y,1,1,'#ff7aa8');R(p.x+2,p.y,1,1,'#ff7aa8');R(p.x,p.y+1,3,1,'#ff7aa8');R(p.x+1,p.y+2,1,1,'#ff7aa8')}
  else if(p.k=='z'){R(p.x,p.y,3,1,p.c);R(p.x+2,p.y+1,1,1,p.c);R(p.x+1,p.y+2,1,1,p.c);R(p.x,p.y+3,3,1,p.c)}else R(p.x,p.y,p.sz||(p.k=='a'?1:2),p.sz||(p.k=='a'?1:2),p.c);
  return true});
 x.globalAlpha=1;
}

/* ===== ชุดแฟนซี (Costume): วาดทับตัวสัตว์ ซื้อแยกต่อสัตว์ (M.skins["สัตว์:c_id"]) ===== */
const CSD={
dino:{n:"ชุดไดโนเสาร์เขียว",p:500,c:"#4aa84a",c2:"#d8e8a0",sp:"#2e7a34",ear:"spk",tl:"dino",fc:"teeth",rd:1},
dlong:{n:"ชุดไดโนคอยาว",p:500,c:"#3fb0a0",c2:"#c8f0e0",sp:"#2a8a78",ear:"knob",tl:"long",fc:"nose",spots:1},
lava:{n:"ชุดไดโนลาวา",p:700,c:"#c8381e",c2:"#ff9a2b",sp:"#ffdd55",ear:"spk",tl:"lava",fc:"teeth",rd:1,fire:1},
bear:{n:"ชุดหมี",p:350,c:"#8a6040",c2:"#e8d4b0",sp:"#d9a0a0",ear:"round",tl:"ball",fc:"muzzle"},
panda:{n:"ชุดแพนด้า",p:500,c:"#f6f6f8",c2:"#2f2f3a",sp:"#5a5a6a",ear:"round",ec:"#2f2f3a",tl:"ball",fc:"panda",nb:1,limbs:1},
rabbit:{n:"ชุดกระต่าย",p:350,c:"#f4f0ea",c2:"#ffb3c8",sp:"#ffb3c8",bl:"#ffffff",ear:"tall",tl:"pom",fc:"bunny"},
fox:{n:"ชุดจิ้งจอก",p:500,c:"#e8923a",c2:"#fff6ea",sp:"#3a2a2a",ear:"point",tl:"fox",fc:"fox"},
tiger:{n:"ชุดเสือ",p:500,c:"#e8a23a",c2:"#fff6ea",sp:"#3a2010",ei:"#fff6ea",ear:"round",tl:"tiger",fc:"tiger",stripe:1},
dragon:{n:"ชุดมังกรน้อย",p:700,c:"#d8453a",c2:"#ffd76a",sp:"#8a1a10",ear:"horn",tl:"dragon",fc:"nostril",rd:1,wing:1},
unicorn:{n:"ชุดยูนิคอร์น",p:700,c:"#fdfbff",c2:"#ffc0e0",sp:"#ffd76a",bl:"#ffe8f4",ei:"#ffc0e0",ear:"uni",tl:"rainbow",fc:"uni",mane:1},
shark:{n:"ชุดฉลาม",p:500,c:"#7a8ca0",c2:"#e8f0f8",sp:"#5a6a7c",ear:"fin",tl:"shark",fc:"shark"},
frog:{n:"ชุดกบ",p:350,c:"#5fbf5a",c2:"#d8f0a0",sp:"#3f9a45",ear:"frog",tl:"none",fc:"frog",spots:1}};
function costume(k){let id=k.cs;if(PVC!=null&&k===S.pets[S.pet])id=PVC;return id&&CSD[id]?CSD[id]:null}
/* ชั้นหลัง/ในโครง P (มีขอบ): หู เขา ครีบ ปีก */
function csTop(q,C,A,t){const{bx,by,bw,bh,hx,hy,hw,hh}=A,c=C.c,c2=C.c2,sp=C.sp,e=C.ear,ec=C.ec||c,ei=C.ei||sp,cx=32,wd=Math.round(Math.sin(t/200)*1.5);
 for(const d of[-1,1]){const ex=d<0?hx:hx+hw-5;
  if(e=="round"){q(d<0?hx-2:hx+hw-3,hy-3,5,5,ec);q(d<0?hx-1:hx+hw-2,hy-2,3,3,ei)}
  else if(e=="tall"){const w=Math.round(Math.sin(t/600+d));q(ex+1+w,hy-12,3,12,ec);q(ex+2+w,hy-10,1,8,ei)}
  else if(e=="point"){q(ex,hy-3,5,4,ec);q(ex+1,hy-6,3,3,ec);q(ex+2,hy-8,1,2,sp);q(ex+2,hy-3,1,3,ei)}
  else if(e=="uni"){q(ex+1,hy-3,4,4,ec);q(ex+2,hy-5,2,2,ec);q(ex+2,hy-3,2,2,ei)}
  else if(e=="horn"){q(ex,hy-2,5,3,ec);q(ex+(d<0?1:2),hy-6,2,5,"#ffe9a0");q(ex+(d<0?0:3),hy-9,2,4,"#ffe9a0")}
  else if(e=="knob"){q(ex+2,hy-5,1,5,sp);q(ex+1,hy-8,3,3,c2)}
  else if(e=="frog"){const b2=d<0?hx+1:hx+hw-7;q(b2,hy-4,6,6,c);q(b2+1,hy-3,4,4,"#ffffff");q(b2+2,hy-2,2,3,"#111111")}}
 if(e=="spk"){const sc=C.fire?((t/100|0)%2?sp:c2):sp;for(let i=0;i<3;i++){const h=i==1?5:3;q(cx-5+i*4,hy-h,3,h+1,sc)}q(bx-2,by+2,2,3,sc);q(bx+bw,by+2,2,3,sc)}
 if(e=="fin"){q(cx-2,hy-4,5,5,c);q(cx-1,hy-8,3,5,c);q(cx,hy-10,1,3,c);q(bx-3,by+3,3,4,c);q(bx+bw,by+3,3,4,c)}
 if(e=="uni"){q(cx-1,hy-5,3,5,sp);q(cx,hy-9,2,4,sp);q(cx,hy-11,1,2,sp)}
 if(C.mane)for(let j=0;j<4;j++){const col="hsl("+((t/10+j*50)%360)+",80%,70%)";q(hx-3,hy+1+j*3,3,3,col);q(hx+hw,hy+1+j*3,3,3,col)}
 if(C.wing)for(const d of[-1,1]){const x0=d<0?bx-2:bx+bw;q(d<0?x0-5:x0,by-1+wd,5,2,c);q(d<0?x0-7:x0+2,by+1+wd,7,3,c);q(d<0?x0-6:x0+2,by+4+wd,4,2,sp)}}
/* หาง (แทนหางสัตว์) */
function csTail(q,C,A,t){const{bx,by,bw,bh}=A,k=C.tl,c=C.c,sp=C.sp,sx=bx+bw-1,sy=by+bh-3,sw=i=>Math.sin(t/320-i*.7),
 seg=(n,w,col,st,rs)=>{for(let i=0;i<n;i++)q(sx+i*(st||1.3)+sw(i)*i*.8,sy-i*(rs||2),w,3,col(i))};
 if(k=="none")return;
 if(k=="ball")q(sx,by+bh-5,4,4,c);
 else if(k=="pom")q(sx,by+bh-6,5,5,"#ffffff");
 else if(k=="dino"||k=="lava"){for(let i=0;i<8;i++){const px=sx+i*1.4+sw(i)*i*.7,py=sy-i*1.6,w=Math.max(2,5-(i>>1));q(px,py,w,3,k=="lava"?((t/90+i|0)%2?c:C.c2):c);if(i%2&&i<7)q(px+1,py-2,2,2,k=="lava"?((t/80+i|0)%2?sp:C.c2):sp)}}
 else if(k=="long")seg(10,3,()=>c,1.6,1.7);
 else if(k=="fox")seg(7,4,i=>i>=5?"#ffffff":c);
 else if(k=="tiger")seg(7,4,i=>i%2||i==6?sp:c);
 else if(k=="dragon"){seg(6,3,()=>c);const px=sx+5*1.3+sw(5)*4,py=sy-10;q(px-1,py-3,5,3,sp);q(px,py-5,3,2,sp)}
 else if(k=="rainbow")seg(8,4,i=>"hsl("+((t/8+i*40)%360)+",80%,65%)");
 else if(k=="shark"){q(sx,sy,3,3,c);q(sx+2,sy-5,3,5,c);q(sx+2,sy+3,3,3,c)}}
/* ชั้นหน้า (ไม่มีขอบ วาดทับลำตัว/หัว ก่อนวาดตา): ชุดคลุมตัว ฮู้ด ลาย */
function csFront(C,A,t){const{bx,by,bw,bh,hx,hy,hw,hh,ey,es,e1,e2}=A,c=C.c,c2=C.c2,sp=C.sp,cx=bx+(bw>>1),hi=mix(c,"#ffffff",.3),dd=dk(c,.72);
 R(bx,by+1,bw,bh-1,c);R(bx+1,by,bw-2,1,c);R(bx+1,by+bh-2,bw-2,2,dd);R(bx+2,by+1,bw-4,1,hi);
 if(!C.nb)R(bx+3,by+3,bw-6,bh-5,C.bl||c2);
 if(C.rd)for(let i=0;i<3;i++)R(cx-2,by+4+i*2,5,1,dk(C.bl||c2,.8));
 if(C.limbs){R(bx,by+2,3,bh-3,c2);R(bx+bw-3,by+2,3,bh-3,c2)}
 if(C.stripe)for(let j=0;j<Math.min(3,(bh-3)>>1);j++){R(bx+1,by+2+j*3,3,1,sp);R(bx+bw-4,by+2+j*3,3,1,sp)}
 if(C.spots){R(bx+1,by+2,2,2,sp);R(bx+bw-3,by+4,2,2,sp)}
 if(C.fire){const k=(t/120|0)%3;ln([bx+3,by+2],[bx+5,by+bh-3],k?c2:sp);ln([bx+bw-4,by+3],[bx+bw-6,by+bh-2],c2);R(cx,by+bh-4,1,1,sp)}
 /* ฮู้ดคลุมหัว */
 R(hx+1,hy,hw-2,1,c);R(hx,hy+1,hw,2,c);R(hx,hy+3,2,4,c);R(hx+hw-2,hy+3,2,4,c);R(hx+2,hy+3,hw-4,1,dk(c,.65));R(hx+2,hy,hw-4,1,hi);
 if(C.stripe){R(cx-1,hy,1,2,sp);R(cx-4,hy,1,2,sp);R(cx+3,hy,1,2,sp)}
 if(C.spots){R(hx+3,hy+1,2,1,sp);R(hx+hw-6,hy+1,2,1,sp)}
 if(C.fc=="panda"){ell(Math.round(e1+es/2),Math.round(ey+es/2),3,4,c2,1);ell(Math.round(e2+es/2),Math.round(ey+es/2),3,4,c2,1)}
 if(C.fire)for(let i=0;i<3;i++){const u=(t/700+i/3)%1;RA(cx-3+i*3+Math.round(Math.sin(t/200+i)),hy-8-u*10,2,2,"#8a8a96",(1-u)*.5)}}
/* ใบหน้า (หลังวาดจมูก/ปากเดิม) */
function csFace(C,A,t){const{hx,hy,hw,ny}=A,cx=32,f=C.fc,c=C.c,c2=C.c2,sp=C.sp,W="#ffffff";
 if(f=="teeth"){R(cx-3,ny+2,1,2,W);R(cx+2,ny+2,1,2,W)}
 else if(f=="nose"){R(cx-1,ny-1,1,1,sp);R(cx+1,ny-1,1,1,sp)}
 else if(f=="muzzle"){R(cx-4,ny-1,8,4,c2);R(cx-1,ny-1,3,2,"#2a1a1a");R(cx,ny+2,1,1,"#2a1a1a")}
 else if(f=="panda")R(cx-1,ny-1,3,2,"#2f2f3a");
 else if(f=="bunny"){R(cx-1,ny-1,2,1,"#ff8aa0");R(cx-1,ny+2,1,2,W);R(cx,ny+2,1,2,W)}
 else if(f=="fox"){R(hx,ny-1,3,4,c2);R(hx+hw-3,ny-1,3,4,c2);R(cx-1,ny-1,2,1,"#2a2030")}
 else if(f=="tiger"){R(cx-4,ny-1,8,4,c2);R(cx-1,ny-1,2,1,"#e0707a");R(hx,ny-2,2,1,sp);R(hx,ny,2,1,sp);R(hx+hw-2,ny-2,2,1,sp);R(hx+hw-2,ny,2,1,sp)}
 else if(f=="nostril"){R(cx-2,ny,1,1,sp);R(cx+1,ny,1,1,sp);if((t/1400|0)%3==0)RA(cx,ny-3-((t/90)%4|0),2,2,"#ffb02b",.7)}
 else if(f=="uni"){R(hx+1,ny,2,1,"#ffa0c8");R(hx+hw-3,ny,2,1,"#ffa0c8");if((t/400|0)%2)spk(Math.round(hx-4+Math.sin(t/300)*2),hy+4,1,"#ffffff")}
 else if(f=="shark"){for(let i=0;i<5;i++)R(cx-5+i*2,ny+2,1,2,W)}
 else if(f=="frog"){R(cx-6,ny+2,12,1,dk(c,.5));if(t%3000<300)R(cx,ny+3,2,4,"#ff6a8a")}}
/* ร้านค้า: แท็บ 🦖 ชุดแฟนซี */
function costumeShop(){const sp=K.sp||"cat",cur=K.cs||"";
 if(SPC[sp].gm){app.innerHTML=shTop("ชุดแฟนซีของ"+SPC[sp].th)+`<div class="mu">สัตว์พิเศษตัวนี้ไม่รองรับชุดแฟนซี</div>`;return}
 const li=Object.keys(CSD).map(id=>{const d=CSD[id],own=M.skins[sp+":c_"+id],on=cur===id,can=own||M.coins>=d.p,r=d.p>=700?3:d.p>=500?2:1;
  return shRow(d.n,on?"ใช้อยู่":own?"มีแล้ว":"🪙 "+d.p,PVC===id,"tryCs('"+id+"')",can,0,on?"ถอดชุด":own?"สวมใส่":can?"ซื้อ 🪙 "+d.p:"🪙 "+d.p,"buyCs('"+id+"')",ts({cs:id}),r)}).join("");
 app.innerHTML=shTop("ชุดแฟนซีของ"+SPC[sp].th+" (ซื้อแยกตามตัว)")+`<button class="ghost" onclick="buyCs('')">✖ ไม่ใส่ชุด</button><div class="sg" style="margin-top:8px">${li}</div>`;paintTh()}
function tryCs(id){PVC=PVC===id?null:id;shopPage()}
function buyCs(id){PVC=null;const sp=K.sp||"cat";if(id){const d=CSD[id],k=sp+":c_"+id;if(!M.skins[k]){if(M.coins<d.p)return;M.coins-=d.p;M.skins[k]=1}K.cs=K.cs===id?null:id}else K.cs=null;save();sync();sinfo();shopPage()}

const EQ=()=>Object.values(Object.assign({},M.eq,PV)).filter(i=>i>=0).map(i=>ITEMS[i]);
function bind(){const E0=()=>({h:-1,n:-1,w:-1,f:-1,g:-1,t:-1});if(!S.m)S.m={coins:0,own:{},eq:E0()};
 if(S.k){S.pets={cat:S.k};S.pet="cat";delete S.k}
 if(!S.pets){const n=Object.keys(S.c).length;S.pets={cat:{seed:Math.random()*1000|0,n:0,stage:0,l:n,s:0,a:Math.round(n/2),e:Math.round(n/4),snap:null,form:null,found:{}}};S.pet="cat"}
 const cp=S.pets.cat;if(!cp.sp)cp.sp="cat";if(!cp.eq)cp.eq=S.m.eq||E0();
 for(const k in S.pets){const p=S.pets[k];if(!p.sp)p.sp=k;if(!p.eq)p.eq=E0()}
 if(!S.pets[S.pet])S.pet="cat";K=S.pets[S.pet];M=S.m;M.eq=K.eq;if(!M.bgs)M.bgs={};if(!M.skins)M.skins={}}
function decide(){const {l,s,a,e,snap}=K,tot=Math.max(1,l+s+a+e),mx=Math.max(l,s,a,e),mn=Math.min(l,s,a,e);
 if(snap&&snap.l-snap.s>=8&&(s-snap.s)-(l-snap.l)>=6)return"fallen";
 if(mn/tot>=.15&&mx/tot<=.35)return"cosmos";if(a/tot>=.42)return"storm";if(e/tot>=.42)return"gaia";
 if(e/tot>=.3&&l/tot>=.2&&s/tot>=.2)return"poison";
 const top=a>=e;return l>=s?(top?"angel":"forest"):(top?"demon":"cerb")}
function topAura(){return["l","s","a","e"].reduce((p,k)=>K[k]>K[p]?k:p,"l")}
function evo(){const n=prog(),ns=Math.max(stageOf(n),K.bs||0);K.n=n;let msg="";
 if(ns>K.stage){K.stage=ns;if(ns>=2&&!K.snap)K.snap={l:K.l,s:K.s};
  if(ns>=3&&!K.form){K.form=decide();K.found[K.form]=1}
  if(ns==4)K.found[K.form+"_2"]=1;
  msg=ns>=3?(ns==4?"🌟 ขั้นสูงสุด! "+fn(K.form,1):"✨ สัตว์เลี้ยงของคุณเผยรูปแบบ: "+fn(K.form)):ns==1?"🐣 ไข่ฟักแล้ว! ลูกแมวลืมตาแล้ว":"🌱 มีบางอย่างงอกออกมาจากตัวแมว...";
  M.coins+=25;emit(40,ns>=3?FORMS[K.form].pc:"#fff","p",30)}
 return msg}
function stg(on,tb){$("stg").style.display=on?"":"none";$("tabs").style.display=on&&tb!==0?"flex":"none"}
function sinfo(){const f=K.stage>=3?" · "+fn(K.form,K.stage==4):"";$("sinfo").innerHTML=`${SPC[K.sp||"cat"].e} ${K.nm?E(K.nm)+" · ":""}Lv ${lvl(S.st.xp)} · ${stn(K.stage,K.sp)}${f} · 🪙 ${M.coins}`}
const qz=on=>document.body.classList.toggle('qz',on);
function home(){mgStop();PV={};PVB=PVS=PVC=PVBC=PVBM=null;G=null;qz(0);stg(1);$("stg").style.position=TAB==2?"sticky":"";sinfo();document.querySelectorAll("#tabs button").forEach((b,i)=>b.classList.toggle("on",i===TAB));[garden,catPage,shopPage,rankPage,towerPage][TAB]()}
$("tabs").onclick=e=>{const b=e.target.closest("button");if(!b)return;TAB=+b.dataset.t;home()};
let RTM=0,STM=0;function loop(t){if(x&&$("stg").style.display!=="none")draw(t);if(TAB==3&&RK.length&&t-RTM>70){RTM=t;document.querySelectorAll('.rc').forEach(cv=>drawOther(cv,RK[cv.dataset.i],t))}if(TAB==2&&t-STM>90){STM=t;document.querySelectorAll("canvas.tc").forEach(cv=>{const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;if(!cv._p){try{cv._p=JSON.parse(cv.dataset.th)}catch(e){cv._p={}}}if(cv._p.species==="godzilla")drawOther(cv,cv._p,t)})}requestAnimationFrame(loop)}
function catPage(){let m=0,n=0;for(const k in S.c){n++;if(S.c[k][0]>=4)m++}
 const st=K.stage,xp=S.st.xp||0,lv=lvl(xp),lo=40*(lv-1)**2,hi=40*lv*lv,acc=S.st.ta?Math.round(S.st.tc/S.st.ta*100):0,mx=Math.max(20,K.l,K.s,K.a,K.e);
 const pn=prog(),TT=TH(),un=isCat()?"คำ":"⭐";const sp=st<4?`<div class="mu">ระยะถัดไปเมื่อ${isCat()?"เรียนครบ":"ได้แต้มครบ"} ${TT[st]} ${un} (${pn} / ${TT[st]})</div><div class="bar"><i style="width:${Math.min(100,pn/TT[st]*100)}%;background:var(--ac)"></i></div>${boostUi(st,pn)}`:`<div class="mu">โตถึงขั้นสูงสุดแล้ว</div>`;
 const au=st>=3?`<h2>ออร่าของคุณ</h2>`+["l","s","a","e"].map(k=>`<div class="mu">${AUT[k]} ${K[k]}</div><div class="bar" style="margin:4px 0 10px"><i style="width:${K[k]/mx*100}%;background:${AU[k][1]}"></i></div>`).join(""):`<p class="mu">รูปแบบสุดท้ายของแมวยังเป็นความลับ จะเผยตอนโตเต็มวัย ขึ้นอยู่กับสไตล์การเรียนของคุณ</p>`;
 const cx=ORDER.map(k=>{const F=FORMS[k],ok=K.found[k];return `<div class="cd${ok?"":" lk"}"><b>${ok?fn(k):"???"}</b>${ok?" → "+(K.found[k+"_2"]?fn(k,1):"???"):""}<div class="mu">${ok?HINT[k]:"ยังไม่เจอ"}</div></div>`}).join("");
 app.innerHTML=petsUi()+`<div class="row"><b style="font-size:22px">Lv ${lv}</b><span class="mu">${xp-lo} / ${hi-lo} ⭐</span></div><div class="bar"><i style="width:${(xp-lo)/(hi-lo)*100}%;background:var(--ac)"></i></div>${sp}
 <div class="stats"><div><b>${m}</b><span class="mu">จำได้แล้ว</span></div><div><b>${n}</b><span class="mu">เรียนแล้ว</span></div><div><b>${acc}%</b><span class="mu">แม่นยำ</span></div><div><b>${S.st.streak}</b><span class="mu">วันต่อเนื่อง</span></div></div>${wkChart()}${au}<h2>สมุดรูปแบบ (${ORDER.filter(k=>K.found[k]).length} / ${ORDER.length})</h2>${cx}`;paintTh()}
const BC={2:300,3:1200,4:3000};
function boostUi(st,n){if(st<1)return"";const c=BC[st+1],need=Math.ceil(TH()[st]*.6),ok=n>=need&&M.coins>=c;
 return `<button class="go" style="margin:6px 0" ${ok?"":"disabled"} onclick="boost()">⚡ ใช้เหรียญวิวัฒนาการ · 🪙 ${c}</button><div class="mu">ต้องมีอย่างน้อย ${need} ${isCat()?"คำ":"⭐"} (ตอนนี้ ${n}) และมีเหรียญพอ</div>`}
function boost(){const st=K.stage,n=prog();if(st<1||st>=4)return;const c=BC[st+1];if(n<Math.ceil(TH()[st]*.6)||M.coins<c)return;M.coins-=c;K.bs=st+1;evo();save();sinfo();evoFx();home()}
const SB={url:"https://drtcdxlbahpcqesoudmb.supabase.co",key:"sb_publishable_2v2EjRLrQpCTNQDe2eod0g_l5ztQzDf"};
const sbOn=()=>SB.url&&SB.key;
async function sbF(path,opt){const r=await fetch(SB.url+"/rest/v1/"+path,Object.assign({headers:{apikey:SB.key,"Content-Type":"application/json"}},opt));if(!r.ok)throw new Error(r.status);const t=await r.text();return t?JSON.parse(t):null}
function pinfo(){let m=0,n=0;for(const k in S.c){n++;if(S.c[k][0]>=4)m++}const eq={};for(const s in M.eq)if(M.eq[s]>=0)eq[s]=M.eq[s];
 return{p_id:S.pid,p_token:S.ptk,p_name:S.pname,p_xp:S.st.xp||0,p_level:lvl(S.st.xp),p_words:n,p_mastered:m,p_streak:S.st.streak||0,p_stage:K.stage,p_form:(isCat()&&!K.sk&&!(K.bg!=null&&K.bg>=0)&&!K.nm&&!K.cs)?(K.form||null):K.sp+"|"+(K.sk||"")+"|"+(K.form||"")+"|"+(K.bg!=null&&K.bg>=0?K.bg:"")+"|"+(K.nm||"")+"|"+(K.cs||"")+"|"+(K.bc||"")+"|"+(K.bm||""),p_eq:eq,p_seed:K.seed|0}}
function snap(){const T=day();let m=0,n=0;for(const k in S.c){n++;if(S.c[k][0]>=4)m++}const h=S.hs=S.hs||{},o=h[T];if(!o||o[0]!==m||o[1]!==n){h[T]=[m,n];const ks=Object.keys(h).map(Number).sort((a,b)=>a-b);while(ks.length>180)delete h[ks.shift()];save()}}
function wkChart(){snap();const T=day(),W=wkN(),h=S.hs||{},ks=Object.keys(h).map(Number).sort((a,b)=>a-b);if(!ks.length)return"";
 const rows=[];for(let i=7;i>=0;i--){const w=W-i,end=Math.min(T,7*w+3),k=ks.filter(d=>d<=end).pop(),dt=new Date((7*w-3)*864e5);rows.push({w,v:k==null?null:h[k][0],lb:dt.getUTCDate()+"/"+(dt.getUTCMonth()+1)})}
 const mx=Math.max(1,...rows.map(r=>r.v||0)),cur=rows[7].v,pv=rows[6].v,gn=pv==null?null:cur-pv;
 return `<h2>จำได้แล้วสะสมต่อสัปดาห์</h2><div class="cd"><div style="display:flex;align-items:flex-end;gap:6px;height:112px">${rows.map(r=>`<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%"><span class="mu" style="font-size:11px">${r.v==null?"":r.v}</span><i style="display:block;width:100%;border-radius:4px 4px 0 0;background:${r.w==W?"var(--ac)":"#7a5a12"};height:${r.v==null?0:Math.max(3,r.v/mx*78)}px"></i></div>`).join("")}</div><div style="display:flex;gap:6px;margin-top:4px">${rows.map(r=>`<span class="mu" style="flex:1;text-align:center;font-size:10px">${r.lb}</span>`).join("")}</div><div class="mu" style="margin-top:8px">${gn==null?"เริ่มบันทึกสถิติแล้ว กราฟจะเต็มเมื่อเล่นต่อเนื่องหลายสัปดาห์":"สัปดาห์นี้ "+(gn>=0?"+":"")+gn+" คำ · วันที่ใต้แท่งคือวันจันทร์ต้นสัปดาห์"}</div></div>`}
async function sync(){snap();bup();if(!sbOn()||!S.pname)return;try{await sbF("rpc/save_player",{method:"POST",body:JSON.stringify(pinfo())})}catch(e){}try{if(TW().b>0)await sbF("rpc/save_tower",{method:"POST",body:JSON.stringify({p_id:S.pid,p_token:S.ptk,p_tower:TW().b})})}catch(e){}}
const rnd=n=>{const a=new Uint8Array(n);crypto.getRandomValues(a);return[...a].map(b=>b.toString(16).padStart(2,"0")).join("")};
function joinRk(){const v=$("#pn").value.trim().slice(0,16);if(!v)return;S.pid=rnd(8);S.ptk=rnd(16);S.pname=v;save();rankPage()}
let RK=[];
const PLAIN={fur:"#d9c9b0",acc:"#f0a0b0",eye:"#2a1a10",tail:"normal",pc:"#fff"};
function drawOther(cv,p,t){const sv=[K,M,PV,x,WK,LA,T0];try{K={seed:p.seed||0,form:p.form,stage:p.stage,n:p.words||0,sp:p.species,sk:p.sk,cs:p.cs,evil:p.evil,bc:p.bc,bm:p.bm,cy:p.cy,gz:!p.nb};M={eq:Object.assign({h:-1,n:-1,w:-1,f:-1,g:-1,t:-1},p.eq||{})};PV={};x=cv.getContext("2d");WK=0;LA=t;T0=-9e3;x.clearRect(0,0,64,64);if(p.bg>=0&&BG[p.bg])bgDraw(t,BG[p.bg]);
 if(p.stage==0)egg(t,"#7f6fd0");else cat(t,p.stage>=3&&FORMS[p.form]?FORMS[p.form]:PLAIN,p.stage);if(p.tint){x.globalCompositeOperation='source-atop';x.globalAlpha=.3;x.fillStyle=p.tint;x.fillRect(0,0,64,64);x.globalAlpha=1;x.globalCompositeOperation='source-over'}}catch(e){}finally{[K,M,PV,x,WK,LA,T0]=sv}}
async function rankPage(){
 if(!sbOn()){app.innerHTML=`<p class="mu">ยังไม่ได้ตั้งค่าฐานข้อมูล ใส่ค่า SB.url และ SB.key ในไฟล์ (ดูคู่มือ)</p>`;return}
 if(!S.pname){app.innerHTML=`<h2>ตั้งชื่อเล่นเพื่อเข้าร่วมอันดับ</h2><input type="text" id="pn" maxlength="16" placeholder="ชื่อเล่น (สูงสุด 16 ตัวอักษร)"><button class="go" onclick="joinRk()">เข้าร่วม</button>`;return}
 app.innerHTML=`<div class="mu">กำลังโหลด...</div>`;await sync();
 try{RK=await sbF(`players?select=id,name,xp,level,words,mastered,streak,stage,form,eq,seed${RKM?",tower":""}${RKM?"&tower=gt.0":""}&order=${RKM?"tower.desc,tower_at.asc":"xp.desc"}&limit=30`);RK=RK.map(normRk)}catch(e){const m=String(e.message),h={"400":"คอลัมน์ tower ยังไม่มี ให้รัน tower_rank.sql","401":"ไม่มีสิทธิ์อ่านตาราง/คอลัมน์ (RLS หรือ grant)","403":"ไม่มีสิทธิ์อ่านตาราง/คอลัมน์ (RLS หรือ grant)","404":"ไม่พบตาราง players","503":"เซิร์ฟเวอร์ Supabase ไม่ตอบ (โปรเจกต์อาจถูกพัก)"}[m]||(/fetch|network/i.test(m)?"เชื่อมต่ออินเทอร์เน็ตหรือเซิร์ฟเวอร์ไม่ได้ (โปรเจกต์ Supabase อาจถูกพัก)":"");app.innerHTML=`<div class="seg" style="grid-template-columns:1fr 1fr;margin-bottom:8px"><button class="${RKM?"":"on"}" onclick="rkm(0)">⭐ XP</button><button class="${RKM?"on":""}" onclick="rkm(1)">🗼 หอคอย</button></div><p class="mu">โหลดอันดับไม่ได้ · รหัส ${E(m)}<br>${E(h)}</p><button class="go" onclick="rankPage()">ลองใหม่</button>`;return}
 if(TAB!==3)return;
 app.innerHTML=`<div class="seg" style="grid-template-columns:1fr 1fr;margin-bottom:8px"><button class="${RKM?"":"on"}" onclick="rkm(0)">⭐ XP</button><button class="${RKM?"on":""}" onclick="rkm(1)">🗼 หอคอย</button></div><div class="row"><b>🏆 อันดับ · ${E(S.pname)}</b><span><button class="ghost" onclick="rnP()">✏️ ชื่อเล่น</button><button class="ghost" onclick="rankPage()">รีเฟรช</button></span></div>`+RK.map((p,i)=>{const me=p.id===S.pid,F=FORMS[p.form];const tp=i<3,sz=i==0?84:tp?72:64;return `<div class="cd${tp?" rk rk"+(i+1):""}" style="${me&&!tp?"border-color:var(--ac)":""}">${tp?'<span class="tw tw1"></span><span class="tw tw2"></span><span class="tw tw3"></span><span class="tw tw4"></span>':""}<div class="row" style="justify-content:flex-start;gap:12px"><b style="width:${tp?34:26}px;text-align:center"${tp?' class="rkm" ':" "}>${tp?'<span style="font-size:28px">'+["🥇","🥈","🥉"][i]+"</span>":i+1}</b><span class="cw">${i==0?'<span class="crn">👑</span>':""}<canvas class="rc" data-i="${i}" width="64" height="64" style="width:${sz}px;height:${sz}px;image-rendering:pixelated;background:#150d24;border-radius:8px"></canvas></span><div><b${tp?' class="rkn"':""}>${E(p.name)}</b>${me?" (คุณ)":""}${p.pn?` · 🐾 ${E(p.pn)}`:""}<div class="mu">${RKM?"🗼 ชั้น "+p.tower+" · ":""}Lv ${p.level} · ⭐ ${p.xp}</div><div class="mu">จำได้ ${p.mastered} · เรียน ${p.words} · 🔥 ${p.streak}${p.stage>=3&&F?" · "+E(fn(p.form,p.stage==4,p.species)):""}</div></div></div></div>`}).join("")}
function rnP(){const v=(prompt("ชื่อเล่นใหม่ในอันดับ (สูงสุด 16 ตัวอักษร)",S.pname||"")||"").trim().slice(0,16);if(!v)return;S.pname=v;save();rankPage()}
function rnPet(){const v=(prompt("ตั้งชื่อสัตว์เลี้ยง (สูงสุด 12 ตัวอักษร เว้นว่าง = ลบชื่อ)",K.nm||""));if(v===null)return;K.nm=v.trim().replace(/\|/g,"").slice(0,12);save();sync();sinfo();home()}
let GMT=-9e3,GN=0,GL=0;const GMH=3748503545,gmHash=q=>{let h=5381;for(const c of q)h=((h*33)^c.charCodeAt(0))>>>0;return h};
function gmTap(){const n=Date.now();GN=n-GL<1500?GN+1:1;GL=n;if(GN>=5){GN=0;const v=prompt("รหัสลับ GM");if(v==null)return;if(gmHash(v.trim())===GMH){S.gm=1;save();alert("🔓 ปลดล็อกโหมด GM แล้ว");catPage()}else alert("รหัสไม่ถูกต้อง")}}
function gmGet(sp){if(!S.gm||S.pets[sp])return;const p=newPet(sp),C=SPC[sp];p.stage=4;p.bs=4;p.form=C.form;p.found[C.form]=1;p.xp=99999;p.bg=C.bg;S.pets[sp]=p;setPet(sp)}
function gmFx(t,o){const k=o/1600,f=K.form,C=Math.cos,Sn=Math.sin;
 if(f=='divdrag'){x.globalAlpha=Math.max(0,.6-k*1.5);R(0,0,64,64,'#fff3a0');x.globalAlpha=1;if(o<900){const s=(o/90)|0;let px=8+(s*17)%48;for(let y=0;y<GY;y+=4){R(px,y,2,5,'#fff7a0');R(px-1,y,1,4,'#ffd23a');px+=((y*7+s*5)%9)-4}}for(let i=0;i<36;i++){const a=i/36*6.283,r=k*46;R(32+C(a)*r,36+Sn(a)*r*.8,2,2,i%2?'#ffd23a':'#ff6a2b')}}
 else if(f=='kitsune'){for(let j=0;j<2;j++){const kk=k*1.6-j*.3;if(kk<0||kk>1)continue;for(let i=0;i<30;i++){const a=i/30*6.283+j,r=kk*44;R(32+C(a)*r,36+Sn(a)*r*.8,3,3,i%3?'#7a8bff':'#c26bff')}}for(let i=0;i<9;i++){const a=t/200+i*.7,r=14+k*20;R(32+C(a)*r,30+Sn(a)*r*.5,3,3,'#e8f0ff')}}else{const c1=f=='voidk'?'#a35bff':'#ff8a2b',c2=f=='voidk'?'#fff':'#ffd23a';x.globalAlpha=Math.max(0,.5-k);R(0,0,64,64,c2);x.globalAlpha=1;for(let i=0;i<40;i++){const a=i/40*6.283,r=k*48;R(32+C(a)*r,34+Sn(a)*r*.8,2,2,i%2?c1:c2)}}}
$("c").onclick=()=>{if(SPC[K.sp||"cat"].gm){GMT=performance.now();sfx(true,true);try{navigator.vibrate&&navigator.vibrate([40,30,80])}catch(e){}}};
let SR=0;
function shRar(r){SR=r;shopPage()}
function shopPage(){if(SH=="b")return bgShop();if(SH=="z")return beamShop();if(SH=="y")return beamMoveShop();if(SH=="s")return skinShop();if(SH=="c")return costumeShop();
 const all=ITEMS.map((it,i)=>[it,i]).filter(([it])=>it[1]==SH),own=all.filter(([,i])=>M.own[i]).length;
 const list=all.filter(([it])=>!SR||it[2]==SR).sort((a,b)=>a[0][2]-b[0][2]||a[0][0].localeCompare(b[0][0]));
 const chips=[0,1,2,3,4].map(r=>`<button class="rf${SR==r?" on":""}" ${r?`style="color:${RC[r]}"`:""} onclick="shRar(${r})">${r?RT[r]:"ทั้งหมด"}</button>`).join("");
 const cards=list.map(([it,i])=>{const o=M.own[i],eq=M.eq[it[1]]==i,p=PR[it[2]],can=M.coins>=p,pv=PV[it[1]]==i,r=it[2],au=it[3]?`<span style="color:${AU[it[3]][1]};font-size:12px">● ${AUT[it[3]]}</span>`:"";
  return `<div class="ic r${r}" style="border-color:${RC[r]}"><div class="tcw"><canvas class="tc" width="64" height="64" data-th="${E(JSON.stringify(ts({eq:{[it[1]]:i}})))}"></canvas>${eq?`<span class="bdg">ใส่อยู่</span>`:o?`<span class="bdg g">มีแล้ว</span>`:""}</div><b>${E(it[0])}</b><div class="row" style="gap:4px"><span style="color:${RC[r]};font-size:12px">${RT[r]}</span>${au}</div><div class="row2"><button class="bt${pv?" on":""}" onclick="tryOn(${i})">👁</button><button class="bt pri" ${o||can?"":"disabled"} onclick="buy(${i})">${eq?"ถอด":o?"สวมใส่":can?"ซื้อ 🪙 "+p:"🪙 "+p}</button></div></div>`}).join("");
 app.innerHTML=shTop(`สะสมแล้ว ${own} / ${all.length} ชิ้น`)+`<div class="row" style="margin-bottom:6px"><div>${chips}</div></div><button class="ghost" style="margin:0 0 10px" onclick="unq()">✖ ถอดทั้งหมด</button><div class="sg">${cards||`<div class="mu">ไม่มีไอเทมในระดับนี้</div>`}</div>`;paintTh()}
function shSlot(k){SH=k;shopPage()}
function tryOn(i){const s=ITEMS[i][1];if(PV[s]==i)delete PV[s];else PV[s]=i;T0=LA=performance.now();shopPage()}
function buy(i){const it=ITEMS[i];delete PV[it[1]];if(!M.own[i]){if(M.coins<PR[it[2]])return;M.coins-=PR[it[2]];M.own[i]=1}M.eq[it[1]]=M.eq[it[1]]==i?-1:i;T0=LA=performance.now();save();sync();sinfo();shopPage()}
function unq(){PV={};K.eq=M.eq={h:-1,n:-1,w:-1,f:-1,g:-1,t:-1};save();sync();shopPage()}

let GT=0;
function gtab(i){GT=i;garden();scrollTo(0,0)}
function frc(k){freeReview(k,+$("#frc").value)}
function garden(){const T=day(),n=D.length;let m=0,l=0,due=0;
 for(const k in S.c){const c=S.c[k];if(c[0]>=4)m++;else l++;if(c[1]<=T)due++}
 const avail=D.filter((d,i)=>!S.c[i]&&S.cfg.lv.includes(d.l)).length,nw=Math.min(Math.max(0,S.cfg.nw-td().nw),avail),df=S.cfg.df||"n",acc=S.st.ta?Math.round(S.st.tc/S.st.ta*100):0;
 const tabs=[["🌱","วันนี้"],["🏋️","ฝึก"],["🎁","ภารกิจ"],["🌼","สวนคำ"],["⚙️","ตั้งค่า"]];
 let h=`<div class="row"><span class="mu">Word Garden · Oxford 3000</span><span class="chips"><span class="chip">🔥 ${S.st.streak}</span><span class="chip">⭐ ${S.st.xp}</span></span></div><div class="stab five">${tabs.map((t,i)=>`<button class="${i==GT?"on":""}" onclick="gtab(${i})"><span>${t[0]}</span>${t[1]}${(i==2&&qready())||(i==0&&evReady())?'<i class="dotr"></i>':""}</button>`).join("")}</div>`;
 if(GT==0){const a=Math.max(m/n*100,m?1.5:0),b=Math.min(100,a+l/n*100+(l?1.5:0));
  h+=`<div class="hero"><div class="ring" style="--a:${a}%;--b:${b}%"><div><b>${m}</b><span class="mu">จำได้แล้ว</span></div></div><div><div class="mu">จากทั้งหมด ${n} คำ</div><div style="font-size:19px;font-weight:600;margin:4px 0">กำลังเรียน ${l} คำ</div><div class="mu">${due?"มี "+due+" คำรอทบทวน":"ไม่มีคำค้างทบทวน"}</div></div></div>
  <div class="mini"><div><b>${due}</b><span class="mu">ถึงเวลาทบทวน</span></div><div><b>${nw}</b><span class="mu">คำใหม่วันนี้</span></div><div><b>${acc}%</b><span class="mu">แม่นยำ</span></div></div>
  <button class="cta" onclick="start(0)" ${due+nw?"":"disabled"}>${due+nw?`▶ เริ่มภารกิจวันนี้<small>ทบทวน ${due} · คำใหม่ ${nw}</small>`:"วันนี้ครบแล้ว 🎉"}</button>
  ${qready()?`<button class="o" style="text-align:center;border-color:var(--ac);margin-top:10px" onclick="gtab(2)">🎁 มีหีบรางวัลรอเปิด!</button>`:""}
  ${evHtml()}<button class="ghost" style="margin-top:8px" onclick="start(1)">+ เรียนเพิ่มอีก 10 คำ</button>${wodHtml()}
  <h2>ระดับที่เรียน</h2><div>${[1,2,3,4].map(v=>{const on=S.cfg.lv.includes(v);return `<button class="rf${on?" on":""}" onclick="lvc(${v},${!on})">${LV[v]} ${LVN[v]}</button>`}).join("")}</div>
  <h2>ความยาก</h2><div class="seg">${[["e","ง่าย","×1"],["n","ปกติ","×1.5"],["h","ยาก","×2.5"]].map(([k,a2,x2])=>`<button class="${df==k?"on":""}" onclick="setdf('${k}')">${a2} <span style="font-size:11px">${x2}</span></button>`).join("")}</div><div class="mu" style="margin-top:6px">${{e:"เลือกคำตอบ",n:"ปรับตามความแม่นของแต่ละคำ",h:"พิมพ์คำตอบเอง"}[df]}</div>
  <button class="ghost${S.cfg.ls?" on":""}" style="margin-top:8px" onclick="tls()">🎧 โหมดฟังเสียง: ${S.cfg.ls?"เปิด":"ปิด"}</button>`}
 else if(GT==1){h+=`<div class="cd" style="border-color:var(--ac);margin-top:12px"><b>🧠 ทวนคำศัพท์ได้ทุกเมื่อ</b><div class="mu">ไม่กระทบกำหนดทบทวนหลัก</div><div class="row" style="justify-content:flex-start;margin:10px 0"><span class="mu">จำนวน</span><select id="frc"><option value="5">5 คำ</option><option value="10" selected>10 คำ</option><option value="20">20 คำ</option><option value="0">ทั้งหมด</option></select></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px"><button class="o" style="margin:0;text-align:center;font-size:15px" onclick="frc('all')">📘<br>ทุกคำ</button><button class="o" style="margin:0;text-align:center;font-size:15px" onclick="frc('due')">⏰<br>ถึงเวลา</button><button class="o" style="margin:0;text-align:center;font-size:15px" onclick="frc('missed')">🎯<br>เคยผิด</button></div></div>${mgMenu()}`}
 else if(GT==2)h+=qhtml();
 else if(GT==3){const tot=[0,0,0,0,0],lr=[0,0,0,0,0];D.forEach((d,i)=>{tot[d.l]++;if(S.c[i])lr[d.l]++});let g="",pl=0;
  D.forEach((d,i)=>{if(d.l!==pl){if(pl)g+=`</div></details>`;pl=d.l;g+=`<details><summary>${LV[pl]} · เรียนแล้ว ${lr[pl]} / ${tot[pl]} คำ</summary><div class="g" style="margin-top:8px">`}const c=S.c[i];g+=`<i class="s${c?c[0]:0}${c&&c[1]<T?" dw":""}" data-i="${i}"></i>`});g+=`</div></details>`;
  h+=lvUi()+`<h2>แตะจุดเพื่อดูคำ</h2><div id="inf" class="mu">เทา = ยังไม่เรียน · เหลืองเข้มขึ้น = จำแน่นขึ้น · แดง = ใกล้ลืม</div><div id="gd">${g}</div>`}
 else h+=`<div class="cd" style="margin-top:12px"><div class="row"><span>คำใหม่ต่อวัน</span><select onchange="S.cfg.nw=+this.value;save();home()">${[5,10,20,30].map(v=>`<option ${S.cfg.nw===v?"selected":""}>${v}</option>`).join("")}</select></div></div>
  <button class="ghost" onclick="tst(this)">🔊 ทดสอบเสียง</button><button class="ghost" onclick="trd()">ลำดับคำใหม่: ${S.cfg.rd===false?"เรียงตามลำดับ":"สุ่ม"}</button><button class="ghost" onclick="tfx()">เอฟเฟกต์และเสียง: ${S.cfg.fx===false?"ปิด":"เปิด"}</button><button class="ghost" onclick="tpt()">🎲 เดาก่อนเรียนคำใหม่: ${S.cfg.pt===false?"ปิด":"เปิด"}</button><button class="ghost" onclick="guide()">📖 คู่มือเกม</button><button class="ghost" onclick="onboard()">👋 แนะนำมือใหม่</button>
  <h2 onclick="gaTap()">ข้อมูล</h2><button class="ghost" onclick="rcUi()">🔑 รหัสกู้คืน</button><button class="ghost" onclick="bk(0)">สำรองความคืบหน้า</button><button class="ghost" onclick="bk(1)">กู้คืน</button><button class="ghost" onclick="bk(2)">คำแปลแปลกๆ (${Object.keys(S.fl).length})</button><button class="ghost" onclick="if(confirm('ล้างความคืบหน้าทั้งหมด?')){localStorage.removeItem('wg1');location.reload()}">รีเซ็ต</button>
  <textarea id="bk" placeholder="ข้อมูลสำรองจะขึ้นที่นี่ วางข้อมูลที่นี่เพื่อกู้คืน"></textarea>`;
 app.innerHTML=h;
 if(GT==3)$("#gd").onclick=e=>{const i=e.target.dataset.i;if(i==null)return;const d=D[i],c=S.c[i];say(d.w);
  $("#inf").innerHTML=`<b style="font-size:19px">${E(d.w)}</b> ${E(d.n||"")} — ${E(d.t)}<br><span class="mu">${LV[d.l]} · ${ST[c?c[0]:0]}${c?" · ทบทวนครั้งถัดไป "+(c[1]<=T?"วันนี้":"อีก "+(c[1]-T)+" วัน"):""}</span><div id="mnb">${mnHtml(+i)}</div>`}
}
function setdf(k){S.cfg.df=k;save();home()}
const QE=[{k:"ok",n:15,t:"ตอบถูก 15 ข้อ"},{k:"ok",n:25,t:"ตอบถูก 25 ข้อ"},{k:"nw",n:5,t:"เรียนคำใหม่ 5 คำ"},{k:"mg",n:1,t:"เล่นโหมดฝึกพิเศษ 1 รอบ"},{k:"rv",n:8,t:"ทบทวนคำเก่าถูก 8 ข้อ"}];
const QM=[{k:"ok",n:40,t:"ตอบถูก 40 ข้อ"},{k:"cb",n:5,t:"ทำคอมโบ 5 ข้อติด"},{k:"nw",n:10,t:"เรียนคำใหม่ 10 คำ"},{k:"mg",n:2,t:"เล่นโหมดฝึกพิเศษ 2 รอบ"},{k:"hd",n:8,t:"ตอบถูกข้อพิมพ์ 8 ข้อ"},{k:"rv",n:20,t:"ทบทวนคำเก่าถูก 20 ข้อ"}];
const QH=[{k:"ok",n:70,t:"ตอบถูก 70 ข้อ"},{k:"cb",n:10,t:"ทำคอมโบ 10 ข้อติด"},{k:"bw",n:1,t:"ชนะด่านบอส 1 ครั้ง"},{k:"hd",n:15,t:"ตอบถูกข้อพิมพ์ 15 ข้อ"},{k:"ev",n:1,t:"ทวนตอนเย็นให้เสร็จ"},{k:"mg",n:4,t:"เล่นโหมดฝึกพิเศษ 4 รอบ"}];
const WL=[{k:"nw",n:40,t:"เรียนคำใหม่ 40 คำ"},{k:"ok",n:250,t:"ตอบถูก 250 ข้อ"},{k:"mg",n:10,t:"เล่นโหมดฝึกพิเศษ 10 รอบ"},{k:"bw",n:3,t:"ชนะด่านบอส 3 ครั้ง"}];
function CM(){const c=G.combo||0;return c>=10?2:c>=5?1.5:c>=3?1.2:1}
function Q(){const T=day();if(!S.qs||S.qs.d!==T)S.qs={d:T,p:{},c:{}};return S.qs}
const hdOk=()=>{const df=S.cfg.df||"n";if(df==="h")return 1;if(df==="e")return 0;let m=0;for(const k in S.c)if(S.c[k][0]>=4)m++;return m>=8};
const fixQ=l=>l.k==="hd"&&!hdOk()?{k:"ok",n:l.n*2,t:"ตอบถูก "+l.n*2+" ข้อ"}:l;
const qlist=()=>{const d=day(),pk=(a,o)=>a[(d*3+o)%a.length];return[pk(QE,0),pk(QE,2),pk(QM,1),pk(QM,3),pk(QH,2)].map(fixQ)};
function qadd(k,v,mx){const q=Q();q.p[k]=mx?Math.max(q.p[k]||0,v):(q.p[k]||0)+v}
function qready(){const q=Q();return qlist().some((L,j)=>!q.c[j]&&(q.p[L.k]||0)>=L.n)}
function qhtml(){const q=Q();return "<h2>ภารกิจประจำวัน 🎁</h2>"+qlist().map((L,j)=>{const p=Math.min(L.n,q.p[L.k]||0),done=p>=L.n;return `<div class="cd"><div class="row"><b>${L.t}</b><span class="mu">${p} / ${L.n}</span></div><div class="bar" style="margin:8px 0"><i style="width:${p/L.n*100}%;background:${done?"var(--ok)":"var(--ac)"}"></i></div>${q.c[j]?`<span class="mu">✓ รับรางวัลแล้ว</span>`:done?`<button class="go" style="margin:4px 0 0;padding:10px" onclick="claim(${j})">🎁 เปิดหีบ</button>`:`<span class="mu">ทำให้ครบเพื่อรับหีบรางวัล</span>`}</div>`}).join("")}
function claim(j){const q=Q(),L=qlist()[j];if(q.c[j]||(q.p[L.k]||0)<L.n)return;q.c[j]=1;let msg;const un=ITEMS.map((it,i)=>i).filter(i=>!M.own[i]);
 if(Math.random()<.35&&un.length){const w=un.map(i=>[i,[0,50,30,15,5][ITEMS[i][2]]]),tot=w.reduce((a,b)=>a+b[1],0);let r=Math.random()*tot,pk=w[0][0];for(const a of w){r-=a[1];if(r<=0){pk=a[0];break}}M.own[pk]=1;msg=`ได้ไอเทม <b style="color:${RC[ITEMS[pk][2]]}">${ITEMS[pk][0]}</b> (${RT[ITEMS[pk][2]]})!<br><span class="mu">ไปลองใส่ที่ร้านได้เลย</span>`}
 else{const c=20+(Math.random()*41|0);M.coins+=c;msg=`ได้เหรียญ 🪙 ${c}`}
 save();chestFx(msg)}
function chestFx(m){const d=document.createElement("div");d.id="chm";d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:10;display:flex;align-items:center;justify-content:center";d.innerHTML=`<div class="q" style="background:var(--sf);margin:16px;max-width:360px;width:100%"><div style="font-size:54px">🎁</div><div style="margin:10px 0;font-size:18px">${m}</div><button class="go" onclick="document.getElementById('chm').remove();home()">เยี่ยม!</button></div>`;document.body.appendChild(d);if(S.cfg.fx!==false){confetti(innerWidth/2,innerHeight/2,90);sfx(true,true)}}
function tls(){S.cfg.ls=!S.cfg.ls;save();home()}
function lvc(v,on){const s=new Set(S.cfg.lv);on?s.add(v):s.delete(v);if(!s.size){home();return}S.cfg.lv=[...s];save();home()}
const LVN=["","เริ่มต้น","พื้นฐาน","กลาง","กลาง–สูง"],LVB=[0,1,1.15,1.3,1.5];
function lvOnly(v){S.cfg.lv=[v];save();home()}
function lvUi(){let h=`<h2>ระดับคำศัพท์ที่จะเรียน</h2><div class="sg">`;
 for(let v=1;v<=4;v++){let t=0,l=0,m=0;D.forEach((d,i)=>{if(d.l===v){t++;const c=S.c[i];if(c){l++;if(c[0]>=4)m++}}});const on=S.cfg.lv.includes(v);
  h+=`<div class="ic" style="${on?"border-color:var(--ac)":""}"><div class="row"><b>${LV[v]} · ${LVN[v]}</b><span class="mu">${LVB[v]>1?"โบนัส ×"+LVB[v]:""}</span></div><div class="mu">เรียนแล้ว ${l} / ${t} · จำได้ ${m}</div><div class="bar" style="margin:4px 0"><i style="width:${m/t*100}%;background:var(--ac)"></i><i style="width:${(l-m)/t*100}%;background:#5a4410"></i></div><div class="row2"><button class="bt${on?" on":""}" onclick="lvc(${v},${!on})">${on?"✓ เปิดอยู่":"เปิด"}</button><button class="bt" onclick="lvOnly(${v})">🎯 เฉพาะนี้</button></div></div>`}
 return h+`</div><div class="mu" style="margin-top:6px">ตอบถูกคำระดับสูงได้ ⭐ และ 🪙 โบนัส · คำใหม่เรียงจากระดับต่ำไปสูงตามที่เปิดไว้ ส่วนคำเก่าที่ถึงกำหนดทบทวนยังมาตามปกติ</div>`}
function bk(k){const t=$("#bk");if(k===0)t.value=JSON.stringify(S);else if(k===2)t.value=Object.keys(S.fl).map(i=>D[i].w+" — "+D[i].t).join("\n");
 else try{S=Object.assign(S,JSON.parse(t.value));bind();evo();save();home()}catch(e){alert("ข้อมูลสำรองไม่ถูกต้อง")}}

function order(){const T=day();if(!S.sd||S.sd.d!==T)S.sd={d:T,s:Math.random()*2147483647|0};let a=S.sd.s;const r=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
 const ids=[];[...S.cfg.lv].sort().forEach(l=>{const g=[];D.forEach((d,i)=>{if(d.l===l)g.push(i)});for(let i=g.length-1;i>0;i--){const j=r()*(i+1)|0;[g[i],g[j]]=[g[j],g[i]]}ids.push(...g)});return ids}
function trd(){S.cfg.rd=S.cfg.rd===false;save();home()}
function freeReview(kind="all",count=10,onlyIds=null){
 const learned=Object.keys(S.c).map(Number);
 let ids=onlyIds?onlyIds.slice():kind==="due"?learned.filter(i=>S.c[i][1]<=day()):kind==="missed"?learned.filter(i=>(S.c[i][2]||0)>0):learned.slice();
 if(!ids.length){app.innerHTML=`<div class="q"><div style="font-size:32px">🌱</div><h2>ยังไม่มีคำศัพท์ในชุดนี้</h2><div class="mu">ลองเรียนคำศัพท์ก่อน แล้วกลับมาทวนได้ทุกเมื่อ</div></div><button class="go" onclick="home()">กลับหน้าหลัก</button>`;return}
 ids=shuf([...new Set(ids)]);if(count>0)ids=ids.slice(0,count);
 G={q:ids.map(id=>({id,free:1})),tot0:ids.length,ok:0,tot:0,nw:0,xp:0,miss:{},co:0,hd:0,free:1,ev:kind==="ev",freeMiss:[],freeKind:kind==="ev"?"all":kind};qz(1);stg(1,0);nxt();
}
function start(extra){
 const T=day(),rev=Object.keys(S.c).map(Number).filter(i=>S.c[i][1]<=T).sort((a,b)=>S.c[a][1]-S.c[b][1]).slice(0,30);
 const n=extra?10:Math.max(0,S.cfg.nw-td().nw);
 const base=S.cfg.rd===false?D.map((d,i)=>i).filter(i=>S.cfg.lv.includes(D[i].l)):order(),nw=base.filter(i=>!S.c[i]).slice(0,n);save();
 if(!rev.length&&!nw.length)return home();
 const bn=shuf([...nw,...shuf(rev).slice(0,5)]).map(id=>({id,bn:1}));G={q:[...shuf(rev).map(id=>({id})),...nw.map(id=>({id,nw:1})),...bn],tot0:rev.length+nw.length+bn.length,nwIds:nw.slice(),ok:0,tot:0,nw:0,xp:0,miss:{},co:0,hd:0};qz(1);stg(1,0);nxt();
}
function hud(){return `<div class="hud"><span>เหลือ ${G.q.length+1} ข้อ${G.cur&&G.cur.bn?" · ไทย → อังกฤษ":""}${G.cur&&G.cur.rv?" · 🔁 ทบทวนคำที่พลาด":""}${G.cur&&G.cur.lr?" · 🪜 ย้ำคำใหม่ "+G.cur.lr+"/2":""}${G.ev?" · 🌙 ทวนตอนเย็น":""}</span><span>${G.combo>1?"🔥 x"+G.combo+(CM()>1?" (แต้ม ×"+CM()+")":"")+" ":""}⭐ ${G.xp}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${Math.min(100,G.tot/(G.tot+G.q.length+1)*100)}%"></i></div>`}
function nxt(){if(!G.q.length)return fin();G.cur=G.q.shift();const id=G.cur.id;if(G.cur.nw&&!S.c[id]&&!G.miss[id])return S.cfg.pt===false?learn(id):guess(id);ask(id)}
function learn(id){const d=D[id];say(d.w);
 app.innerHTML=hud()+`<div class="q"><div class="mu">คำใหม่ · ขั้น 1/3 ดูและฟัง</div><div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}${sylHtml(d)}<div class="th" style="margin-top:14px">${E(d.t)}</div>${autoTip(d)}</div>
 <div class="fb">${hl(d)} <button class="sp" style="font-size:16px" onclick="say(D[${id}].x)">🔊</button><br><span class="mu">${E(d.y)}</span></div>${flg(id)}<div id="mnb">${mnHtml(id)}</div><button class="go" id="go" onclick="cty(${id})">ต่อไป: พิมพ์ตาม ✍️</button><button class="ghost" onclick="ask(${id})">ข้ามไปทดสอบเลย</button>`}
function mode(id){const d=D[id],s=stage(id),z=clz(d);if(G.cur&&G.cur.bn)return"th2en";if(G.cur&&G.cur.lr)return G.cur.lr==1?"th2en":((S.cfg.df||"n")=="e"?"th2en":"spell");if(G.ev){const dg=S.cfg.df||"n";return dg=="e"?"th2en":dg=="h"?"spell":(Math.random()<.5?"th2en":"spell")}const df=S.cfg.df||"n";if(S.cfg.ls&&Math.random()<.4)return df=="h"?"listenT":"listen";if(df=="e")return s<=1?"en2th":(z&&s>=3?"cloze":"th2en");if(df=="h")return z&&Math.random()<.5?"clozeT":"spell";if(s<=1)return"en2th";if(s==2)return"th2en";if(s==3)return z?"cloze":"th2en";if(s==4)return"spell";return z?"clozeT":"spell"}
function opts(id,key){const c=D[id],seen=new Set([c[key]]),pool=[];let k=0;
 while(pool.length<3&&k++<500){const o=D[Math.random()*D.length|0],v=o[key];if(seen.has(v)||(key==="w"&&o.t===c.t))continue;if(k<200&&o.p.split(/[ ,.]/)[0]!==c.p.split(/[ ,.]/)[0])continue;seen.add(v);pool.push(v)}
 return shuf([c[key],...pool])}
const clz=d=>d.a>=0&&tagOf(d)!==null;
const blank=(d,h)=>E(d.x.slice(0,d.a))+"<b>_____</b>"+(h&&S.cfg.df!=="h"?fmHint(d):"")+E(d.x.slice(d.b));
function ask(id){const d=D[id],m=G.m=mode(id);G.ans=false;G.o=null;G.hn=0;G.alt="";let q,b;
 if(m==="en2th"){q=`<div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}`;G.o=opts(id,"t");G.k=d.t}
 else if(m==="th2en"){q=`${tm(d)}${nt(d)}`;G.o=opts(id,"w");G.k=d.w}
 else if(m==="cloze"){q=`<div style="font-size:21px">${blank(d)}</div><div class="mu" style="margin-top:8px">${E(d.y)}</div>`;G.o=fitL(d,opts(id,"w"));G.k=fitW(d,d.w)}
 else if(m==="listen"||m==="listenT"){q=`<div class="mu">ฟังแล้ว${m==="listen"?"เลือก":"พิมพ์"}คำที่ได้ยิน</div><button class="sp" style="font-size:52px" onclick="say(D[${id}].w)">🔊</button>${m==="listenT"?`<div class="mu">${d.w.replace(/[^a-z]/gi,"").length} ตัวอักษร</div>`:""}`;if(m==="listen"){G.o=opts(id,"w");G.k=d.w}}else if(m==="clozeT"){q=`<div style="font-size:21px">${blank(d,1)}</div><div class="mu" style="margin-top:8px">${E(d.y)}</div>`}
 else{q=`${tm(d)}${nt(d)}<div class="mu" style="margin-top:8px">${S.cfg.df=="h"?"":"ขึ้นต้นด้วย “"+E(d.w[0])+"” · "}${d.w.replace(/[^a-z]/gi,"").length} ตัวอักษร</div>`}
 b=G.o?G.o.map((o,i)=>`<button class="o" onclick="pick(${i})">${E(o)}</button>`).join(""):`<input type="text" id="inp" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="พิมพ์คำภาษาอังกฤษ"><button class="go" id="go" onclick="sub()">ตรวจคำตอบ</button>`;
 const hb=(m==="cloze"||m==="clozeT"||!(m==="en2th"||d.a>=0))?"":`<button class="ghost" id="hb" onclick="hint()">💡 ดูประโยคตัวอย่าง + คำแปล (แต้มลดครึ่ง)</button><div id="hn"></div>`;
 app.innerHTML=hud()+`<div class="q">${q}</div>${hb}${b}<div id="fb"></div>`;if(m==="listen"||m==="listenT")say(d.w);if(!G.o)$("#inp").focus()}
let AC;
function hint(){if(!G||G.ans||!G.cur)return;const d=D[G.cur.id];G.hn=1;
 $("hn").innerHTML=`<div class="fb"><span style="font-size:16px">${G.m==="en2th"?hl(d):blank(d)}</span><br><span class="mu">${E(d.y)}</span></div>`;$("hb").style.display="none"}
function sfx(ok,big){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=AC.currentTime;(ok?(big?[[523,0],[659,.08],[784,.16],[1047,.24]]:[[660,0],[880,.09]]):[[200,0],[150,.12]]).forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=ok?"triangle":"sawtooth";o.frequency.value=f;g.gain.setValueAtTime(.12,n+d);g.gain.exponentialRampToValueAtTime(.001,n+d+.18);o.connect(g);g.connect(AC.destination);o.start(n+d);o.stop(n+d+.2)})}catch(e){}}
function confetti(cx,cy,n=30){const c=document.createElement("canvas");c.width=innerWidth;c.height=innerHeight;c.style.cssText="position:fixed;left:0;top:0;pointer-events:none;z-index:9";document.body.appendChild(c);const g=c.getContext("2d"),P=[...Array(n)].map(()=>({x:cx,y:cy,vx:(Math.random()-.5)*10,vy:-Math.random()*9-2,c:["#ffb020","#3ddc97","#7fd0ff","#ff8fb8","#fff"][Math.random()*5|0],s:3+Math.random()*3})),t0=performance.now();
 (function f(t){const k=t-t0;g.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.4;g.globalAlpha=Math.max(0,1-k/900);g.fillStyle=p.c;g.fillRect(p.x,p.y,p.s,p.s)});k<900?requestAnimationFrame(f):c.remove()})(t0)}
function fxr(ok,xp,cb){if(S.cfg.fx===false)return;const q=document.querySelector(".q"),i=document.getElementById("inp");
 if(q)q.classList.add(ok?"okf":"nof",ok?"pop":"shk");if(i)i.style.borderColor=ok?"var(--ok)":"var(--no)";
 try{navigator.vibrate&&navigator.vibrate(ok?30:[60,40,60])}catch(e){}const big=ok&&cb>=3&&(cb==3||cb==5||cb==7||cb%5==0);sfx(ok,big);
 const r=q?q.getBoundingClientRect():{left:innerWidth/2,top:innerHeight/3,width:0},d=document.createElement("div");d.className="fx";d.textContent=ok?"+"+xp+" ⭐":"✗";d.style.left=(r.left+r.width/2-30)+"px";d.style.top=(r.top+10)+"px";d.style.color=ok?"var(--ok)":"var(--no)";document.body.appendChild(d);setTimeout(()=>d.remove(),900);
 if(ok)confetti(r.left+r.width/2,r.top+40,big?90:30);if(big){const b=document.createElement("div");b.className="fx";b.style.cssText="left:0;right:0;text-align:center;top:30%;font-size:36px;color:var(--ac)";b.textContent="🔥 คอมโบ x"+cb+"!";document.body.appendChild(b);const l=document.createElement("div");l.className="flsh";document.body.appendChild(l);setTimeout(()=>{b.remove();l.remove()},900)}}
function evoFx(){if(S.cfg.fx===false)return;EVT=performance.now();const l=document.createElement("div");l.style.cssText="position:fixed;inset:0;background:#fff;pointer-events:none;z-index:9;transition:opacity 1.2s";document.body.appendChild(l);requestAnimationFrame(()=>requestAnimationFrame(()=>l.style.opacity=0));setTimeout(()=>l.remove(),1300);
 const r=$("stbox").getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,140);try{navigator.vibrate&&navigator.vibrate([80,50,80,50,200])}catch(e){}
 try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=AC.currentTime;[392,523,659,784,1047,1319].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(.14,n+i*.12);g.gain.exponentialRampToValueAtTime(.001,n+i*.12+.5);o.connect(g);g.connect(AC.destination);o.start(n+i*.12);o.stop(n+i*.12+.55)})}catch(e){}}
function tfx(){S.cfg.fx=S.cfg.fx===false;save();document.body.classList.toggle("nofx",S.cfg.fx===false);home()}
function pick(i){if(G.ans)return;const ok=G.o[i]===G.k;document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(G.o[j]===G.k)b.classList.add("ok");else if(j===i)b.classList.add("no")});res(ok)}
const nrm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");
/* รูปผันคำ: inf=สร้างรูปตาม tag, grade=2 ถูกเต็ม(รากหรือรูปในประโยค) 1 ถูกคำแต่รูปผันอื่น(ครึ่งคะแนน) 0 ผิด */
const FT=["ing","ed","s","er","est","ly"];
const inf=(w,t)=>{const l=w.slice(-1),e=/e$/.test(w),y=/[^aeiou]y$/.test(w),dbl=(w.length<=4||/(admit|commit|permit|submit|omit|begin|regret|refer|prefer|forget|upset)$/.test(w))&&/[^aeiou][aeiou][^aeiouwxy]$/.test(w),b=w.slice(0,-1);
 if(t=="s")return y?b+"ies":/(s|x|z|ch|sh|o)$/.test(w)?w+"es":w+"s";
 if(t=="ed")return y?b+"ied":e?w+"d":dbl?w+l+"ed":w+"ed";
 if(t=="ing")return/ie$/.test(w)?w.slice(0,-2)+"ying":e&&!/ee$/.test(w)?b+"ing":dbl?w+l+"ing":w+"ing";
 if(t=="er")return y?b+"ier":e?w+"r":dbl?w+l+"er":w+"er";
 if(t=="est")return y?b+"iest":e?w+"st":dbl?w+l+"est":w+"est";
 return y?b+"ily":w+"ly"};
const INF=w=>{w=w.toLowerCase().replace(/[^a-z]/g,"");const s=new Set();if(w.length<2)return s;s.add(w);FT.forEach(t=>s.add(inf(w,t)));[w+"es",w+"ed",w+"d",w+"s",w+"ing"].forEach(f=>s.add(f));return s};
const surf=d=>d.a>=0?d.x.slice(d.a,d.b):"";
function grade(d,v){const nm=d.w.split(/[,\/]/).map(nrm);if(nm.includes(v))return 2;const sf=nrm(surf(d));if(sf&&sf===v)return 2;
 const f=new Set();d.w.split(/[,\/]/).forEach(p=>INF(p).forEach(z=>f.add(z)));return f.has(v)?1:0}
function tagOf(d){const b=d.w.toLowerCase();if(d.a<0||!/^[a-z]+$/.test(b))return null;const s=surf(d).toLowerCase();if(s===b)return"";for(const t of FT)if(inf(b,t)===s)return t;return null}
const fitW=(d,w)=>{const t=tagOf(d);return t&&/^[a-z]+$/i.test(w)?inf(w.toLowerCase(),t):w};
const fitL=(d,l)=>l.map(w=>fitW(d,w));
const HT={ing:"-ing",ed:"-ed / อดีต",s:"-s / -es",er:"-er",est:"-est",ly:"-ly"};
const fmHint=d=>{const t=tagOf(d);return t?`<span class="mu" style="font-size:13px"> (เติมรูป ${HT[t]})</span>`:""};
function sub(){if(G.ans)return;const i=$("#inp"),v=nrm(i.value);if(!v)return;i.disabled=true;const d0=D[G.cur.id],nm=o=>o.w.split(/[,\/]/).map(nrm);const gr=grade(d0,v);let ok=gr>0;G.alt="";G.fm=G.m==="clozeT"&&d0.a>=0?surf(d0):d0.w;if(!ok&&G.m==="spell"){const o=D.find(o=>o.t===d0.t&&o.w!==d0.w&&nm(o).includes(v));if(o){ok=true;G.alt=o.w}}res(ok,gr==1)}
function res(ok,hf){const xp0=G.xp,id=G.cur.id,d=D[id],T=day(),first=G.cur.nw&&!S.c[id],c=S.c[id]||[0,0,0];G.ans=true;G.tot++;
 if(G.free){if(ok)G.ok++;else if(!G.freeMiss.includes(id))G.freeMiss.push(id)}
 else if(G.cur.bn||G.cur.rv||G.cur.lr){if(ok){G.ok++;G.xp+=Math.round((G.cur.rv?8:5)*MUL()*CM()*(hf?.5:1))}else if(G.cur.lr&&(G.cur.t||0)<2){G.q.splice(Math.min(G.q.length,3),0,{id,lr:G.cur.lr,t:(G.cur.t||0)+1})}}else{S.st.ta=(S.st.ta||0)+1;if(ok)S.st.tc=(S.st.tc||0)+1;if(/cloze|spell|listenT/.test(G.m))G.hd++;
 if(ok){const hm=(G.hn?.5:1)*(hf?.5:1)*([0,1,1.15,1.3,1.5][d.l]||1),cc=Math.max(1,Math.round((first?3:1)*MUL()*CM()*hm));M.coins+=cc;G.co+=cc;G.ok++;G.xp+=Math.round((first?15:10)*MUL()*CM()*hm);qadd("ok",1);if(!first)qadd("rv",1);if(/spell|clozeT|listenT/.test(G.m))qadd("hd",1);if(hf){c[0]=Math.max(1,c[0]);c[1]=T+1}else if(G.miss[id]){c[0]=Math.max(1,c[0]);c[1]=T+1}else{c[0]=Math.min(6,c[0]+1);c[1]=T+INT[c[0]]}}
 else{c[0]=G.miss[id]?c[0]:Math.max(1,c[0]-2);c[1]=T;c[2]++;G.miss[id]=(G.miss[id]||0)+1;if(G.miss[id]<=2)G.q.splice(Math.min(G.q.length,3),0,{id})}
 if(first){G.nw++;td().nw++;qadd("nw",1)}if(G.cur.nw){G.q.splice(Math.min(G.q.length,4),0,{id,lr:1});G.q.splice(Math.min(G.q.length,10),0,{id,lr:2})}S.c[id]=c;save()}
 G.combo=ok?(G.combo||0)+1:0;if(!G.free){qadd("cb",G.combo,1);save();fxr(ok,G.xp-xp0,G.combo)}else{sfx(ok,false)}say(d.w);LA=performance.now();if(ok)T0=LA;const g=$("#fb");g.innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${hf?"ถูกคำ แต่รูปคำไม่ตรงประโยค · ที่ถูกคือ "+E(G.fm||d.w)+" (ได้ครึ่งคะแนน)":ok?"ถูกต้อง":"คำตอบ: "+E(d.w)}</b> · ${E(d.t)} <button class="sp" style="font-size:16px" onclick="say(D[${id}].w)">🔊</button>${sibHtml(d)}<br>${hl(d)}<br><span class="mu">${E(d.y)}</span></div>${flg(id)}${ok&&!(S.mn&&S.mn[id])?"":`<div id="mnb">${mnHtml(id)}</div>`}<button class="go" id="go" onclick="nxt()">ต่อไป</button>`;
 if(G.m==="spell"||G.m==="clozeT"||G.m==="listenT"){const b=document.querySelector("#go");if(b&&b!==g.querySelector("#go"))b.remove()}}
function fin(){if(G.free){const g=G,miss=[...g.freeMiss],pct=Math.round(g.ok/Math.max(1,g.tot)*100);let evm="";if(g.ev&&S.ev&&!S.ev.done){S.ev.done=1;S.evd=day();const ea=S.ev.early,ec=ea?10:25,exp=ea?15:40;M.coins+=ec;addXp(exp);K.e+=2;qadd("ev",1);evm=`<div style="margin-top:8px;color:var(--ac)">🌙 รางวัลทวนตอนเย็น ⭐ +${exp} · 🪙 +${ec}</div>`;save();sync()}app.innerHTML=`<div class="q"><div style="font-size:34px">${pct>=80?"🌟":"💪"}</div><div class="big">${g.ok}<small> / ${g.tot} ข้อ</small></div><div class="mu">ความแม่นยำ ${pct}% · ${g.ev?"ทวนตอนเย็น":"โหมดทวนอิสระ"}</div>${evm}<div class="bar"><i style="width:${pct}%;background:var(--ac)"></i></div><div style="margin-top:14px">${miss.length?`ยังไม่แม่น ${miss.length} คำ — ลองทวนอีกครั้งได้เลย`:`เยี่ยมมาก! ตอบถูกทุกข้อ 🎉`}</div></div>${miss.length?`<h2>คำที่ควรทวนอีก</h2>${miss.map(i=>`<div class="cd"><b>${E(D[i].w)}</b> — ${E(D[i].t)}<div class="mu">${E(D[i].x)}<br>${E(D[i].y)}</div></div>`).join("")}<button class="go" onclick='freeReview("all",0,${JSON.stringify(miss)})'>🔁 ทวนคำที่ตอบผิด (${miss.length})</button>`:""}<button class="ghost" onclick='freeReview("${g.freeKind||"all"}",${g.tot})'>ทำชุดเดิมอีกครั้ง</button><button class="go" onclick="home()">กลับหน้าหลัก</button>`;qz(0);stg(1,0);sinfo();return}if(!G.rv&&Object.keys(G.miss).length){G.rv=1;G.q=Object.keys(G.miss).map(k=>({id:+k,rv:1}));return nxt()}if(G.nwIds&&G.nwIds.length&&!G.sm){G.sm=1;return recap()}const T=day();for(const k in G.miss){const c=S.c[k];if(c&&c[1]<=T)c[1]=T+1}addXp(G.xp);evAdd();const fd=S.st.last!==T;K.l+=Math.round(10*G.ok/Math.max(1,G.tot));K.s+=Math.round(10*G.hd/Math.max(1,G.tot));K.a+=Math.round(10*G.nw/Math.max(1,G.tot0));K.e+=fd?5:1;const cb=Math.round(10*MUL());M.coins+=cb;G.co+=cb;const ev=evo();T0=LA=performance.now();if(S.st.last!==T){S.st.streak=S.st.last===T-1?S.st.streak+1:1;if(S.st.streak===1)S.sc={};S.st.last=T}save();sync();
 app.innerHTML=`<div class="q"><div class="big">${G.ok}<small> / ${G.tot}</small></div><div class="mu">ตอบถูก · คำใหม่ ${G.nw} คำ · ⭐ +${G.xp} · 🪙 +${G.co}</div><div style="margin-top:12px">🔥 ต่อเนื่อง ${S.st.streak} วัน</div>${ev?`<div style="margin-top:12px;color:var(--ac)">${ev}</div>`:""}</div>${evState()?`<div class="fb">🌙 อีกประมาณ 3 ชั่วโมง กลับมาทวนสั้น ๆ ที่หน้าสวนอีกครั้ง คำใหม่จะติดแน่นขึ้น</div>`:""}${qready()?`<div class="fb ok">🎁 มีหีบรางวัลรอเปิดที่หน้าสวน!</div>`:""}<button class="go" onclick="home()">กลับหน้าหลัก</button>`;qz(0);stg(1,0);sinfo();if(ev)evoFx()}
/* ===== โหมดฝึกพิเศษ + รหัสกู้คืน ===== */
let MGT=0,MG=null;
function mgStop(){if(MGT){clearInterval(MGT);MGT=0}MG=null}
const mgIds=()=>Object.keys(S.c).map(Number);
const BE=()=>["👾","🐲","🧌","🦑","👹","🦖","🐙"][day()%7];
function mgMenu(){const ok=mgIds().length>=6;
 const b=(k,e,t,s)=>`<button class="o" style="text-align:center;margin:0;padding:12px 6px" ${ok?"":"disabled"} onclick="mg('${k}')"><span style="font-size:26px">${e}</span><br><b>${t}</b><br><span class="mu">${s}</span></button>`;
 return `<h2>โหมดฝึกพิเศษ <button class="ghost" style="margin:0 0 0 6px;padding:2px 10px;font-size:12px" onclick="guide('sp')">วิธีเล่น</button></h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${b("sp","⚡","Speed Round","60 วินาที")}${b("mt","🧩","จับคู่คำ","15 คำ 3 รอบ")}${b("od","🔤","เรียงประโยค","5 ประโยค")}${b("bs",BE(),"ด่านบอส","สู้กับคำที่พลาดบ่อย")}${b("wb","🧬","แยกร่างคำ","ต่อตัวอักษร 8 คำ")}${b("cp","⚖️","คู่สับสน","8 ข้อ")}</div>${ok?"":`<div class="mu" style="margin-top:6px">เรียนให้ครบ 6 คำก่อน จึงจะเล่นโหมดพิเศษได้</div>`}`}
function mg(k){const ids=mgIds();if(ids.length<6)return;mgStop();qz(1);stg(1,0);({sp:spStart,mt:mtStart,od:odStart,bs:bsStart,wb:wbStart,cp:cpStart})[k](ids)}
function mgMg(){const T=day();if(!S.mg||S.mg.d!==T)S.mg={d:T,n:{}};return S.mg}
function mgPay(k,coins,xp,aura,lim){const m=mgMg(),first=(m.n[k]||0)<lim;m.n[k]=(m.n[k]||0)+1;const c=first?coins:0;M.coins+=c;addXp(xp);if(first&&aura)K[aura]+=2;T0=LA=performance.now();save();sync();return{c,first}}
function mgRes(title,line,miss,p,xp,lim){qz(0);stg(1,0);sinfo();
 app.innerHTML=`<div class="q"><div style="font-size:20px"><b>${title}</b></div>${line}<div class="mu" style="margin-top:10px">⭐ +${xp} · 🪙 +${p.c}${p.first?"":" (รับเหรียญได้วันละ "+lim+" รอบต่อโหมด)"}</div></div>${miss.length?`<h2>คำที่พลาด</h2>`+miss.map(i=>`<div class="cd"><b>${E(D[i].w)}</b> <button class="sp" style="font-size:16px" onclick="say(D[${i}].w)">🔊</button> — ${E(D[i].t)}</div>`).join(""):""}<button class="go" onclick="home()">กลับหน้าหลัก</button>`}
const sfxOn=ok=>{if(S.cfg.fx!==false)sfx(ok)};

/* ⚡ Speed Round */
function spStart(ids){MG={m:"sp",ok:0,bad:0,t:60,combo:0,mx:0,miss:[],ids,end:0};spQ();
 MGT=setInterval(()=>{if(!MG||MG.m!=="sp")return;MG.t=Math.max(0,MG.t-.1);const e=$("tm"),b=$("tbar");if(e)e.textContent=Math.ceil(MG.t)+" วิ";if(b)b.style.width=MG.t/60*100+"%";if(MG.t<=0)spEnd()},100)}
function spQ(){const g=MG,id=g.ids[Math.random()*g.ids.length|0],d=D[id],th=Math.random()<.5;g.id=id;g.k=th?d.w:d.t;g.o=opts(id,th?"w":"t");g.lock=0;
 app.innerHTML=`<div class="hud"><span>✅ ${g.ok} · 🔥 ${g.combo}</span><b id="tm" style="font-size:20px;color:var(--ac)">${Math.ceil(g.t)} วิ</b><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i id="tbar" style="width:${g.t/60*100}%"></i></div><div class="q">${th?`<div class="th">${E(d.t)}</div>`:`<div class="w">${E(d.w)}</div>`}</div>`+g.o.map((o,i)=>`<button class="o" onclick="spPick(${i})">${E(o)}</button>`).join("")+`<div class="mu" style="text-align:center">ตอบผิดเสียเวลา 3 วิ · คอมโบ 5 ข้อได้เวลาคืน 2 วิ</div>`}
function spPick(i){const g=MG;if(!g||g.m!=="sp"||g.lock||g.t<=0)return;g.lock=1;const ok=g.o[i]===g.k;
 document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(g.o[j]===g.k)b.classList.add("ok");else if(j===i)b.classList.add("no")});
 if(ok){g.ok++;g.combo++;g.mx=Math.max(g.mx,g.combo);if(g.combo%5==0)g.t=Math.min(60,g.t+2)}else{g.bad++;g.combo=0;g.t=Math.max(0,g.t-3);g.miss.push(g.id)}
 sfxOn(ok);setTimeout(()=>{if(MG===g&&g.t>0)spQ()},ok?220:650)}
function spEnd(){const g=MG;if(!g||g.end)return;g.end=1;clearInterval(MGT);MGT=0;const xp=g.ok*3,p=mgPay("sp",Math.min(60,Math.round(g.ok*1.5)),xp,"a",3);
 mgRes("⚡ หมดเวลา!",`<div class="big" style="margin:10px 0">${g.ok}<small> ข้อถูก</small></div><div class="mu">พลาด ${g.bad} ข้อ · คอมโบสูงสุด ${g.mx}</div>`,[...new Set(g.miss)],p,xp,3);MG=null}

/* 🧩 จับคู่คำ */
function mtStart(ids){const pool=[...shuf(ids),...shuf(D.map((_,i)=>i))],used=new Set(),pick=[];
 for(const i of pool){const d=D[i];if(used.has(d.t)||used.has(d.w))continue;used.add(d.t);used.add(d.w);pick.push(i);if(pick.length>=15)break}
 MG={m:"mt",rounds:[pick.slice(0,5),pick.slice(5,10),pick.slice(10,15)].filter(a=>a.length>=3),r:0,err:0,miss:[],left:null,lock:0};mtRound()}
function mtRound(){const g=MG,r=g.rounds[g.r],L=shuf(r),Rr=shuf(r);g.left=null;g.rem=r.length;
 app.innerHTML=`<div class="hud"><span>รอบ ${g.r+1}/${g.rounds.length} · ✗ ${g.err}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.r/g.rounds.length*100}%"></i></div><div class="mu" style="text-align:center;margin-bottom:6px">แตะคำอังกฤษ แล้วแตะคำแปลที่ตรงกัน</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div>${L.map(i=>`<button class="o" data-s="e" data-i="${i}" onclick="mtTap(this)">${E(D[i].w)}</button>`).join("")}</div><div>${Rr.map(i=>`<button class="o" data-s="t" data-i="${i}" style="font-size:15px" onclick="mtTap(this)">${E(D[i].t)}</button>`).join("")}</div></div>`}
function mtTap(b){const g=MG;if(!g||g.m!=="mt"||g.lock||b.disabled)return;const s=b.dataset.s,i=+b.dataset.i;
 if(s==="e"){say(D[i].w);document.querySelectorAll('[data-s="e"]').forEach(x=>x.style.borderColor="");b.style.borderColor="var(--ac)";g.left=i;return}
 if(g.left==null)return;const le=document.querySelector(`[data-s="e"][data-i="${g.left}"]`);
 if(g.left===i){[le,b].forEach(x=>{x.disabled=true;x.classList.add("ok");x.style.borderColor=""});g.left=null;sfxOn(true);
  if(--g.rem==0){g.lock=1;setTimeout(()=>{if(MG!==g)return;g.r++;g.lock=0;g.r>=g.rounds.length?mtEnd():mtRound()},500)}}
 else{g.err++;g.miss.push(g.left,i);[le,b].forEach(x=>x.classList.add("no"));g.lock=1;sfxOn(false);setTimeout(()=>{if(MG!==g)return;[le,b].forEach(x=>{x.classList.remove("no");x.style.borderColor=""});g.left=null;g.lock=0},450)}}
function mtEnd(){const g=MG,e=g.err,xp=Math.max(10,45-e*3),p=mgPay("mt",Math.max(5,22-e*2),xp,"l",3);
 mgRes("🧩 จับคู่ครบแล้ว!",`<div class="big" style="margin:10px 0">${e}<small> ครั้งที่ผิด</small></div><div class="mu">${e==0?"สมบูรณ์แบบ! 🎉":"จับคู่ได้ทุกคำ"}</div>`,[...new Set(g.miss)],p,xp,3);MG=null}

/* 🔤 เรียงประโยค */
function odStart(ids){const okf=i=>{const n=D[i].x.split(" ").length;return n>=4&&n<=9};
 const qs=[...new Set([...shuf(ids.filter(okf)),...shuf(D.map((_,i)=>i).filter(okf))])].slice(0,5);MG={m:"od",qs,n:0,ok:0,miss:[]};odQ()}
function odQ(){const g=MG,id=g.qs[g.n],d=D[id],w=d.x.split(" ");let t=shuf(w.map((_,i)=>i)),k=0;while(k++<6&&t.map(i=>w[i]).join(" ")===d.x)t=shuf(t);g.id=id;g.w=w;g.t=t;g.a=[];g.done=0;odDraw()}
function odDraw(){const g=MG,d=D[g.id],dis=g.done?"disabled":"";
 app.innerHTML=`<div class="hud"><span>ข้อ ${g.n+1}/${g.qs.length} · ✅ ${g.ok}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.n/g.qs.length*100}%"></i></div><div class="q"><div class="mu">เรียงคำให้เป็นประโยคภาษาอังกฤษ</div><div class="th" style="font-size:20px;margin-top:6px">${E(d.y)}</div></div><div style="min-height:56px;border:1px dashed var(--bd);border-radius:12px;padding:8px;display:flex;flex-wrap:wrap;gap:6px">${g.a.map(i=>`<button class="ghost" style="margin:0;font-size:17px" ${dis} onclick="odRm(${i})">${E(g.w[i])}</button>`).join("")}</div><div style="margin:12px 0;display:flex;flex-wrap:wrap;gap:6px">${g.t.filter(i=>!g.a.includes(i)).map(i=>`<button class="ghost" style="margin:0;font-size:17px" ${dis} onclick="odAdd(${i})">${E(g.w[i])}</button>`).join("")}</div><div id="fb"></div>${g.done?"":`<button class="go" id="go" ${g.a.length==g.w.length?"":"disabled"} onclick="odChk()">ตรวจคำตอบ</button>`}`}
function odAdd(i){if(MG.done)return;MG.a.push(i);odDraw()}
function odRm(i){if(MG.done)return;MG.a=MG.a.filter(v=>v!==i);odDraw()}
function odChk(){const g=MG,d=D[g.id],ok=g.a.map(i=>g.w[i]).join(" ")===d.x;g.done=1;ok?g.ok++:g.miss.push(g.id);sfxOn(ok);say(d.x);odDraw();
 $("fb").innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"ถูกต้อง":"ประโยคที่ถูกคือ"}</b> · ${E(d.x)}<br><span class="mu">${E(d.y)}</span></div>`;
 const b=document.createElement("button");b.className="go";b.id="go";b.textContent=g.n+1>=g.qs.length?"ดูผล":"ต่อไป";b.onclick=()=>{g.n++;g.n>=g.qs.length?odEnd():odQ()};$("fb").after(b)}
function odEnd(){const g=MG,xp=g.ok*8,p=mgPay("od",g.ok*3,xp,"s",3);
 mgRes("🔤 เรียงประโยคเสร็จแล้ว!",`<div class="big" style="margin:10px 0">${g.ok}<small> / ${g.qs.length}</small></div>`,[...new Set(g.miss)],p,xp,3);MG=null}

/* 👹 ด่านบอส: กินคำที่พลาดบ่อย ตอบถูกแล้วบอสเสียเลือด คำนั้นก็ "อ่อนแอ" ลง */
function bsStart(ids){const w=ids.slice().sort((a,b)=>(S.c[b][2]-S.c[a][2])||(S.c[a][0]-S.c[b][0])).slice(0,12),q=shuf(w).slice(0,Math.min(10,w.length));
 MG={m:"bs",q,hpM:q.length,me:3,miss:[]};bsQ()}
function bsQ(){const g=MG,id=g.q[0],d=D[id],r=Math.random(),m=clz(d)&&r<.34?"c":r<.67?"t":"w";let q,key;g.id=id;g.lock=0;
 if(m=="c"){q=`<div style="font-size:21px">${blank(d)}</div><div class="mu" style="margin-top:8px">${E(d.y)}</div>`;key="w"}
 else if(m=="t"){q=`${tm(d)}${nt(d)}`;key="w"}
 else{q=`<div class="w">${E(d.w)}</div>${nt(d)}`;key="t"}
 g.k=d[key];g.o=opts(id,key);if(m=="c"){g.k=fitW(d,g.k);g.o=fitL(d,g.o)}
 app.innerHTML=`<div class="hud"><span>${"❤️".repeat(g.me)}${"🖤".repeat(3-g.me)}</span><span>บอสเหลือ ${g.q.length} คำ</span><button class="ghost" onclick="home()">ออก</button></div><div id="bsb" style="text-align:center;font-size:56px;line-height:1.3">${BE()}</div><div class="bar" style="height:10px;margin:2px 0 8px"><i style="width:${g.q.length/g.hpM*100}%;background:var(--no)"></i></div><div class="q" style="padding:18px 14px">${q}</div>`+g.o.map((o,i)=>`<button class="o" onclick="bsPick(${i})">${E(o)}</button>`).join("")}
function bsPick(i){const g=MG;if(!g||g.m!=="bs"||g.lock)return;g.lock=1;const ok=g.o[i]===g.k,id=g.id,c=S.c[id],bb=$("bsb");
 document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(g.o[j]===g.k)b.classList.add("ok");else if(j===i)b.classList.add("no")});
 if(ok){g.q.shift();if(c&&c[2]>0)c[2]--}else{g.me--;g.miss.push(id);g.q.push(g.q.shift());if(c)c[2]++}
 if(bb&&S.cfg.fx!==false)bb.classList.add(ok?"shk":"pop");save();sfxOn(ok);say(D[id].w);
 setTimeout(()=>{if(MG!==g)return;!g.q.length?bsEnd(1):g.me<=0?bsEnd(0):bsQ()},ok?600:1100)}
function bsEnd(win){const g=MG;let p={c:0,first:1},xp=win?60:10,msg="";
 if(win){qadd("bw",1);p=mgPay("bsw",50,xp,"e",1);
  if(p.first){const un=ITEMS.map((_,i)=>i).filter(i=>!M.own[i]&&ITEMS[i][2]>=2&&ITEMS[i][2]<=3);
   if(un.length&&Math.random()<.6){const pk=un[Math.random()*un.length|0];M.own[pk]=1;msg=`<div style="margin-top:8px">🎁 บอสทิ้งไอเทม <b style="color:${RC[ITEMS[pk][2]]}">${ITEMS[pk][0]}</b> (${RT[ITEMS[pk][2]]})</div>`;save()}}}
 else{addXp(xp);save()}
 mgRes(win?"🏆 ชนะบอส!":"💀 แพ้บอส",`<div style="font-size:54px;margin:6px 0">${win?"🏆":"💀"}</div><div class="mu">${win?"คำที่เคยพลาดอ่อนแอลงแล้ว":"ลองใหม่ได้เลย บอสยังอยู่"}</div>${msg}`,[...new Set(g.miss)],p,xp,1);MG=null}

/* 📖 คู่มือเกม */
const GD=[
["start","🌱","เริ่มต้นที่นี่",`<p>Word Garden ช่วยให้คุณจำคำศัพท์ Oxford 3000 ได้ระยะยาว ยิ่งตอบถูก คำยิ่งแข็งแรง และแมวของคุณยิ่งโต</p><ol><li>กด <b>เริ่มภารกิจวันนี้</b> เพื่อเรียนคำใหม่และทบทวนคำที่ถึงเวลา</li><li>ตอบถูกเพื่อรับ ⭐ แต้มประสบการณ์ และ 🪙 เหรียญ</li><li>เอาเหรียญไปซื้อของแต่งแมวที่แท็บ 🛍️ ร้าน</li><li>กลับมาเล่นทุกวัน เพื่อรักษา 🔥 วันต่อเนื่อง</li></ol><div class="tp">วันละ 10–15 นาทีดีกว่าเล่นยาวทีเดียวสัปดาห์ละครั้ง</div><button class="ghost" onclick="document.getElementById('gdm').remove();onboard()">ดูแนะนำมือใหม่อีกครั้ง</button>`],
["daily","🎯","ภารกิจวันนี้",`<p>แต่ละรอบมี 3 ส่วน</p><ul><li><b>คำใหม่</b> เห็นการ์ดคำ ความหมาย และประโยคตัวอย่าง (แตะ 🔊 เพื่อฟังเสียง) แล้วกด “ทดสอบเลย”</li><li><b>ทบทวน</b> คำที่ถึงเวลาทบทวนตามตารางความจำ</li><li><b>โบนัส</b> ข้อไทย → อังกฤษ ท้ายรอบ และรอบ 🔁 ทบทวนคำที่พลาด</li></ul><p>ตอบผิดแล้วคำนั้นจะวนกลับมาถามอีกในรอบเดียวกัน ให้ลองจำจากเฉลย</p><p>กด “เรียนเพิ่มอีก 10 คำ” ได้ตลอดทั้งวัน (นับเป็นภารกิจเรียนคำใหม่และตอบถูกด้วย) เลือกระดับคำศัพท์ A1–B2 ได้ที่หน้าสวน (ตอบถูกคำระดับสูงได้โบนัส) และตั้งจำนวนคำใหม่ต่อวันได้ที่ ตั้งค่าและสำรองข้อมูล</p>`],
["diff","🎚️","ระดับความยากและประเภทคำถาม",`<ul><li><b>ง่าย (×1)</b> เลือกคำตอบเท่านั้น</li><li><b>ปกติ (×1.5)</b> คำถามปรับตามความแม่นของแต่ละคำ เช่น อังกฤษ → ไทย, ไทย → อังกฤษ, เติมคำในประโยค, พิมพ์สะกด</li><li><b>ยาก (×2.5)</b> พิมพ์คำตอบเองทั้งหมด</li></ul><p>ตัวคูณมีผลกับ ⭐ และ 🪙 ที่ได้รับ</p><p><b>💡 คำใบ้</b> ข้อที่ไม่มีประโยคให้ดู จะมีปุ่มดูประโยคตัวอย่างพร้อมคำแปลภาษาไทย ใช้แล้วแต้มและเหรียญข้อนั้นลดลงครึ่งหนึ่ง ส่วนข้อเติมคำในประโยคแสดงคำแปลประโยคอยู่แล้ว และหลังตอบทุกข้อจะเห็นประโยคพร้อมคำแปลเสมอ</p><p><b>🎧 โหมดฟังเสียง</b> เมื่อเปิด จะสุ่มแทรกข้อฟังเสียง 40% ของคำถาม ให้ฟังแล้วเลือกหรือพิมพ์คำที่ได้ยิน</p><p><b>รูปคำ (-s -es -ed -ing)</b> ข้อเติมคำในประโยคจะบอกว่าต้องเติมรูปไหน พิมพ์รากคำหรือรูปที่ตรงประโยคได้เต็มคะแนน ถ้าพิมพ์คำถูกแต่ใช้รูปผันอื่น (เช่น ประโยคเป็น walked แต่พิมพ์ walking) จะได้ครึ่งคะแนนและไม่รีเซ็ตความจำ ส่วนข้อเลือกตอบ ตัวเลือกจะผันตามช่องว่างให้</p><div class="tp">ถ้าไม่ได้ยินเสียง ไปที่ ตั้งค่า แล้วกด 🔊 ทดสอบเสียง และเช็กว่าปิดโหมดเงียบอยู่หรือไม่</div>`],
["learn","🏷️","เดาก่อนเรียน และเคล็ดลับจำ",`<p><b>🎲 เดาก่อนเรียน</b> ก่อนเห็นความหมายของคำใหม่ จะมีให้ลองเดาจากประโยคตัวอย่างก่อน ผิดก็ไม่เป็นไร สมองจะจำเฉลยได้แม่นขึ้น ปิดได้ที่ตั้งค่า</p><p><b>🏷️ เคล็ดลับจำ</b> เขียนวิธีจำของตัวเองได้ที่การ์ดคำใหม่ หลังตอบผิด หรือแตะคำในสวนคำ เคล็ดลับจะโผล่ให้เห็นทุกครั้งที่ตอบพลาด</p><div class="tp">เคล็ดลับที่ดีเชื่อมกับเสียง ภาพ หรือเรื่องของคุณเอง</div>`],
["combo","🔥","คอมโบ",`<p>ตอบถูกติดกันจะได้ตัวคูณแต้ม</p><ul><li>3 ข้อติด ×1.2</li><li>5 ข้อติด ×1.5</li><li>10 ข้อติด ×2</li></ul><p>ตอบผิดคอมโบจะกลับเป็น 0 ลองอ่านเฉลยก่อนกด “ต่อไป”</p>`],
["memory","🧠","ตารางความจำ และสีในสวน",`<p>ทุกคำมีระดับความจำ 0–6 ตอบถูกแล้วระดับขึ้น คำจะกลับมาถามห่างขึ้นเรื่อย ๆ คือ 1, 3, 7, 14, 30 และ 60 วัน</p><p>ตอบผิดระดับจะลดลง 2 ขั้น (ต่ำสุดคือ 1) แล้วคำจะกลับมาถามใหม่ทันที คำที่เคยแน่นแล้วจึงไม่ต้องเริ่มนับใหม่ทั้งหมด</p><ul><li>ในสวน สีเหลืองเข้มขึ้น = จำแน่นขึ้น</li><li>จุด <span style="color:#e55">แดง</span> = เลยกำหนดทบทวนแล้ว ใกล้ลืม</li><li>“จำได้แล้ว” = ระดับ 4 ขึ้นไป (ทบทวนผ่านอย่างน้อย 4 รอบ)</li></ul><p>แตะจุดในสวนเพื่อดูคำ ฟังเสียง และวันทบทวนครั้งถัดไป</p>`],
["mgi","🎮","โหมดฝึกพิเศษ (ภาพรวม)",`<p>ปลดล็อกเมื่อเรียนครบ <b>6 คำ</b> ใช้คำที่คุณเคยเรียนแล้วเท่านั้น เล่นกี่รอบก็ได้ แต่ 🪙 เหรียญมีโควตาต่อวัน (⭐ ได้เสมอ) และแต่ละโหมดเพิ่มออร่าให้แมวคนละแบบ</p><ul><li>⚡ Speed Round เพิ่มออร่าฟ้า</li><li>🧩 จับคู่คำ เพิ่มออร่าแสง</li><li>🔤 เรียงประโยค เพิ่มออร่าเงา</li><li>👾 ด่านบอส เพิ่มออร่าดิน</li><li>🧬 แยกร่างคำ เพิ่มออร่าเงา</li><li>⚖️ คู่สับสน เพิ่มออร่าแสง</li></ul>`],
["sp","⚡","Speed Round · 60 วินาที",`<p>ตอบให้ได้มากที่สุดภายใน 60 วินาที โจทย์คือคำอังกฤษให้เลือกคำแปล หรือคำแปลให้เลือกคำอังกฤษ สลับกันแบบสุ่ม</p><ul><li>ตอบผิด เสียเวลา <b>3 วินาที</b></li><li>ตอบถูกติดกันทุก 5 ข้อ ได้เวลาคืน <b>2 วินาที</b> (สูงสุด 60)</li><li>รางวัล ⭐ 3 ต่อข้อถูก และ 🪙 ประมาณ 1.5 ต่อข้อ (สูงสุด 60)</li><li>รับเหรียญได้ 3 รอบต่อวัน</li></ul><div class="tp">อย่าเดามั่ว ตอบผิดเสียเวลามากกว่าตอบช้า</div>`],
["mt","🧩","จับคู่คำ · 3 รอบ",`<p>มี 3 รอบ รอบละ 5 คู่ รวม 15 คำ</p><ol><li>แตะคำอังกฤษทางซ้าย (จะมีเสียงอ่านและกรอบสีเหลือง)</li><li>แตะคำแปลที่ตรงกันทางขวา</li><li>ถูก = ทั้งคู่เป็นสีเขียว ผิด = สั่นแล้วเลือกใหม่</li></ol><p>จับคู่ผิดน้อยที่สุดได้แต้มมากที่สุด ถ้าผิด 0 ครั้งคือสมบูรณ์แบบ คำที่พลาดจะสรุปให้ตอนจบ รับเหรียญได้ 3 รอบต่อวัน</p>`],
["od","🔤","เรียงประโยค · 5 ข้อ",`<p>เห็นคำแปลภาษาไทยของประโยค แล้วเรียงคำภาษาอังกฤษให้ถูกต้อง</p><ol><li>แตะคำด้านล่างตามลำดับ คำจะขึ้นไปอยู่ในช่องบน</li><li>แตะคำในช่องบนอีกครั้งเพื่อเอาออก</li><li>เมื่อวางครบทุกคำ กด “ตรวจคำตอบ”</li></ol><p>ได้ ⭐ 8 และ 🪙 3 ต่อข้อที่ถูก รับเหรียญได้ 3 รอบต่อวัน</p><div class="tp">หาประธานและกริยาก่อน แล้วค่อยเติมส่วนที่เหลือ</div>`],
["bs","👾","ด่านบอส",`<p>บอสคือ <b>คำที่คุณพลาดบ่อยที่สุด</b> (สูงสุด 10 คำ) คุณมีหัวใจ 3 ดวง</p><ul><li>ตอบถูก บอสเสียเลือด 1 หน่วย และคำนั้นอ่อนแอลง (จำนวนครั้งที่พลาดลดลง)</li><li>ตอบผิด เสียหัวใจ 1 ดวง และคำนั้นวนกลับมาถามอีกที่ท้ายคิว</li><li>ล้างทุกคำก่อนหัวใจหมด = ชนะ</li></ul><p>ชนะได้ ⭐ 60 และ 🪙 50 (เหรียญรับได้วันละครั้ง) และมีโอกาสได้ไอเทมหายาก/มหากาพย์ ถ้าแพ้ยังได้ ⭐ 10 และลองใหม่ได้ทันที</p><div class="tp">บอสเปลี่ยนตามวัน ยิ่งเรียนผิดเยอะ ยิ่งเป็นโอกาสที่ดีในการกำจัดคำอ่อน</div>`],
["wb","🧬","แยกร่างคำ",`<p>เห็นคำแปลไทย แล้วแตะตัวอักษรต่อเป็นคำอังกฤษ 8 คำ</p><ul><li>3 ข้อแรกหาย 2 ตัว ข้อกลางหายครึ่งคำ ข้อท้ายต้องต่อทั้งคำ</li><li>มีตัวอักษรหลอก ต่อทีละตัวจากซ้ายไปขวา</li><li>แตะผิดได้ แต่ข้อนั้นไม่นับว่าถูก</li></ul><p>ได้ ⭐ 6 และ 🪙 2 ต่อข้อ (เหรียญ 3 รอบต่อวัน) คำที่ยังอ่อนจะถูกเลือกก่อน</p>`],
["cp","⚖️","คู่สับสน",`<p>คู่คำที่คนไทยมักสลับ เช่น borrow/lend, say/tell, since/for เติมคำให้ถูกในประโยค 8 ข้อ เฉลยมีกฎสั้น ๆ ทุกข้อ และคู่ที่พลาดบ่อยจะโผล่มาบ่อยขึ้น</p><p>ได้ ⭐ 8 และ 🪙 3 ต่อข้อ (เหรียญ 3 รอบต่อวัน)</p>`],
["ladder","🪜","บันไดเรียนคำใหม่ และทวนตอนเย็น",`<p>คำใหม่แต่ละคำผ่าน 3 ขั้นก่อนทดสอบ</p><ol><li>ดูการ์ด ฟังเสียง ดูการแบ่งพยางค์และเคล็ดลับ</li><li>พิมพ์ตามคำที่เห็น (ตัวที่พิมพ์ผิดจะถูกไฮไลต์สีแดง)</li><li>แตะตัวอักษรที่หายไปต่อให้ครบ</li></ol><p>จากนั้นทดสอบ แล้วคำนั้นจะวนกลับมาย้ำอีก 2 ครั้งในรอบเดียวกัน (ไทย → อังกฤษ แล้วพิมพ์สะกด) ท้ายรอบมีสรุปคำใหม่ให้ลองทายอีกที</p><p><b>🌙 ทวนตอนเย็น</b> ปลดล็อกประมาณ 3 ชั่วโมงหลังจบรอบแรก ถามคำใหม่และคำที่พลาดของวันนี้อีกครั้ง ได้ ⭐ 40 และ 🪙 25 (ทวนก่อนเวลาได้ แต่รางวัลครึ่งเดียว) วันละครั้ง</p><p><b>📅 คำประจำวัน</b> ที่หน้าสวน อ่านแล้วรับโบนัสเล็กน้อยทุกวัน</p><p>โหมดฝึกใหม่: ✍️ ฟังแล้วเขียนประโยค · 🎯 ทายจากบริบท · 🔁 ด่านกู้คำใกล้ลืม (คำที่มีจุดแดง)</p>`],
["quest","🎁","ภารกิจ หีบ และสตรีค",`<p>ทุกวันมี 5 ภารกิจ (ง่าย 2 · กลาง 2 · ท้าทาย 1) ทำครบทั้ง 5 ได้ <b>หีบใหญ่</b> เพิ่ม และมี <b>ภารกิจรายสัปดาห์</b> (รีเซ็ตวันจันทร์) กับ <b>หีบสตรีค</b> เมื่อเล่นต่อเนื่อง 7/14/30/60 วัน</p><p>ภารกิจแต่ละอัน ทำครบแล้วกด <b>เปิดหีบ</b> ที่แท็บ 🎁 ภารกิจ</p><p>ในหีบมี 🪙 20–60 เหรียญ หรือมีโอกาส 35% ได้ไอเทมใหม่ (ไอเทมระดับสูงออกยากกว่า) ภารกิจจะรีเซ็ตทุกวัน</p><p>ภารกิจ “ตอบถูกข้อพิมพ์” ต้องเล่นโหมดยาก (หรือโหมดปกติที่มีคำระดับ 4 ขึ้นไปอย่างน้อย 8 คำ) ถ้าโหมดที่เลือกทำไม่ได้ ระบบจะเปลี่ยนเป็น “ตอบถูก 15 ข้อ” ให้แทน</p>`],
["cat","🐱","เลี้ยงแมว และออร่า",`<p>แมวโตตามจำนวนคำที่เรียน</p><ul><li>1 คำ ไข่ฟักเป็นลูกแมว</li><li>150 คำ แมววัยรุ่น</li><li>600 คำ แมวโตเต็มวัย (เผยรูปแบบ)</li><li>1,500 คำ ขั้นสูงสุด</li></ul><p>รูปแบบสุดท้ายขึ้นกับ <b>ออร่า 4 ชนิด</b> ที่สะสมจากสไตล์การเล่น</p><ul><li><b>แสง</b> มาจากความแม่นยำ</li><li><b>เงา</b> มาจากข้อพิมพ์เอง (สะกด ฟังแล้วพิมพ์ เติมประโยค)</li><li><b>ฟ้า</b> มาจากการเรียนคำใหม่</li><li><b>ดิน</b> มาจากการเล่นสม่ำเสมอทุกวัน</li></ul><p>แท็บ 🐱 แมว แสดงเลเวล ระยะถัดไป และ <b>สมุดรูปแบบ</b> ที่มี 9 แบบให้ค้นหา เมื่อเจอแล้วจะมีคำใบ้ว่าสไตล์ไหนนำไปสู่แบบนั้น</p><p><b>⚡ เหรียญวิวัฒนาการ</b> ใช้เหรียญข้ามขั้นได้ เมื่อเรียนไปแล้วอย่างน้อย 60% ของเกณฑ์ขั้นนั้น</p>`],
["pets","🐾","สัตว์เลี้ยงหลายตัว",`<p>ที่แท็บ 🐾 สัตว์ ซื้อสัตว์เลี้ยงเพิ่มได้ด้วย 🪙 และสลับตัวได้ฟรีตลอด</p><ul><li>🐶 หมา 🐷 หมู และ 🐻 หมี ราคา 500 เหรียญ ปลดล็อกเมื่อแมวเป็นวัยรุ่น</li></ul><p>ตัวใหม่เริ่มจากไข่ และโตตามแต้ม ⭐ ที่ได้ขณะเลี้ยงตัวนั้น ออร่า รูปแบบสุดท้าย และสมุดรูปแบบแยกกันทุกตัว ไอเทมที่ซื้อแล้วใช้ร่วมกัน และแต่ละตัวจำชุดที่สวมของตัวเอง</p>`],
["shop","🛍️","ร้านค้า",`<p>ซื้อของแต่งแมวด้วย 🪙 มี 6 ช่อง คือ หมวก ผ้าพันคอ ของถือ ตัวช่วยลอยรอบตัว ปีก และหาง ราคาขึ้นกับความหายาก และมีแท็บ 🖼️ พื้นหลัง กับ 🎨 สกิน และ 🦖 ชุดแฟนซี (สวมทับตัวสัตว์ ไดโนเสาร์ หมี แพนด้า มังกร ฯลฯ ซื้อแยกตามสัตว์แต่ละตัว) ซึ่งจำแยกตามสัตว์แต่ละตัว</p><ul><li>กด <b>ลองใส่</b> เพื่อดูบนแมวฟรี ก่อนซื้อ</li><li>ไอเทมที่มีสีออร่า จะเปล่งอนุภาคของออร่านั้นรอบแมว</li><li>กด <b>ถอดทั้งหมด</b> เพื่อรีเซ็ตการแต่ง</li></ul>`],
["rank","🏆","อันดับ",`<p>ตั้งชื่อเล่นครั้งแรก แล้วจะเห็นผู้เล่นอันดับต้น ๆ จัดตาม ⭐ รวม พร้อมแมวของแต่ละคน การเล่นจบรอบจะซิงก์คะแนนให้อัตโนมัติ ต้องต่ออินเทอร์เน็ต</p>`],
["tower","🗼","หอคอยคำศัพท์",`<p>ปีนทีละชั้น 1–400 ชั้น คำสุ่มจากระดับของชั้น: 1–100 = A1, 101–200 = A2, 201–300 = B1, 301–400 = B2 ไม่ต้องเรียนคำมาก่อน</p><ul><li>ชั้นปกติ 10 ข้อ ชั้นบอส (ทุก 10 ชั้น) 20 ข้อ</li><li>ผิดเสียหัวใจ 1 ดวง (เริ่มที่ 3) ข้อที่ผิดวนกลับมาถามอีกจนกว่าจะถูก หัวใจหมดแล้วลองชั้นเดิมใหม่ด้วยคำชุดใหม่ ไม่เสียอะไร</li><li>ชั้นสูงมีข้อพิมพ์มากขึ้น</li><li>เจอคำใหม่จะโชว์ความหมายก่อน คำที่เคยเรียนอัปเดตตารางทบทวนเหมือนปกติ</li><li>เหรียญได้เฉพาะชั้นที่ผ่านครั้งแรก วันละ 10 ชั้น ชั้นสมบูรณ์แบบได้โบนัส บอสมีโอกาสทิ้งไอเทม</li><li>สัตว์แต่ละชนิดมีโบนัสต่างกัน เลือกก่อนปีนได้ ออกกลางชั้นแล้วเล่นต่อได้</li></ul>`],
["tips","💡","เคล็ดลับและการสำรองข้อมูล",`<ul><li>เล่นทุกวัน แม้แค่ 5 นาที เพื่อไม่ให้จุดแดงสะสม</li><li>ถ้าคำแปลดูแปลก กด ⚐ <b>คำแปลแปลกๆ</b> เพื่อทำเครื่องหมายไว้ ดูรายการได้ในตั้งค่า</li><li>กด <b>🔑 รหัสกู้คืน</b> เพื่อสร้างรหัส 16 ตัวอักษร ใช้ย้ายเครื่องหรือกู้ข้อมูลที่หาย อย่าแชร์รหัสนี้</li><li>ตั้งค่าให้ปิดเอฟเฟกต์และเสียงได้ ถ้าเครื่องช้าหรืออยู่ในที่เงียบ</li></ul>`]
];
function guide(k){const old=document.getElementById("gdm");if(old)old.remove();
 const d=document.createElement("div");d.id="gdm";d.className="gdm";d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:10;overflow:auto;padding:16px";
 d.innerHTML=`<div style="max-width:560px;margin:0 auto;padding-bottom:40px"><div class="row" style="position:sticky;top:0;background:#000;padding:6px 0;z-index:1"><b style="font-size:20px">📖 คู่มือเกม</b><button class="ghost" style="margin:0" onclick="document.getElementById('gdm').remove()">ปิด</button></div>`+GD.map(g=>`<details id="gd_${g[0]}" ${g[0]===(k||"start")?"open":""}><summary>${g[1]} ${g[2]}</summary>${g[3]}</details>`).join("")+`</div>`;
 document.body.appendChild(d);if(k){const e=document.getElementById("gd_"+k);if(e)setTimeout(()=>e.scrollIntoView({block:"start"}),50)}}
/* 👋 แนะนำมือใหม่ */
const OB=[["🌱","เรียนคำใหม่ทุกวัน","กด “เริ่มภารกิจวันนี้” จะเห็นการ์ดคำ ความหมาย และประโยคตัวอย่าง แล้วทดสอบทันที ตอบผิดไม่เป็นไร คำจะวนกลับมาถามอีกในรอบเดียวกัน"],["🧠","ระบบทบทวนก่อนลืม","ตอบถูกแล้วคำจะกลับมาถามห่างขึ้นเรื่อย ๆ (1, 3, 7, 14 วัน...) จุดแดงในสวนคือคำที่ใกล้ลืม เข้ามาวันละนิดก็พอ"],["🐱","ตอบถูกแล้วแมวโต","ตอบถูกได้ ⭐ และ 🪙 เอาเหรียญไปซื้อของแต่งแมวที่แท็บร้าน เรียนครบ 6 คำจะปลดล็อกโหมดฝึกพิเศษ และเปิดคู่มือเต็มได้ตลอดที่ปุ่ม 📖 หน้าสวน"]];
function obClose(){S.ob=1;save();const m=document.getElementById("obm");if(m)m.remove();setTimeout(rcNotice,400)}
function onboard(i){i=i||0;const old=document.getElementById("obm");if(old)old.remove();const o=OB[i],last=i===OB.length-1,d=document.createElement("div");d.id="obm";
 d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:10;display:flex;align-items:center;justify-content:center;padding:16px";
 d.innerHTML=`<div class="q" style="background:var(--sf);max-width:380px;width:100%;margin:0"><div class="mu">${i+1} / ${OB.length}</div><div style="font-size:54px;margin:6px 0">${o[0]}</div><div class="th" style="font-size:22px">${o[1]}</div><p class="mu" style="font-size:15px;text-align:left;margin:12px 0">${o[2]}</p>${last?`<button class="go" onclick="obClose()">เริ่มเรียนเลย</button><button class="ghost" onclick="obClose();guide()">อ่านคู่มือเต็ม</button>`:`<button class="go" onclick="onboard(${i+1})">ถัดไป</button><button class="ghost" onclick="obClose()">ข้าม</button>`}</div>`;
 document.body.appendChild(d)}
/* 🔑 รหัสกู้คืน */
const fmtRc=c=>c.match(/.{4}/g).join("-");
function genRc(){const A="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",a=new Uint8Array(16);crypto.getRandomValues(a);return[...a].map(b=>A[b%32]).join("")}
let _bt=0;
async function bup(force){if(!S.rc||!sbOn())return 0;const n=Date.now();if(!force&&n-_bt<20000)return 0;_bt=n;
 const pl=Object.assign({},S);delete pl.rc;
 try{const ok=await sbF("rpc/save_backup2",{method:"POST",body:JSON.stringify({p_code:S.rc,p_pid:S.pid||null,p_nick:S.pname||null,p_data:pl})});return ok===false?0:1}
 catch(e){if(String(e.message)==="404"){try{await sbF("rpc/save_backup",{method:"POST",body:JSON.stringify({p_code:S.rc,p_data:pl})});return 1}catch(e2){return 0}}return 0}}
function rcUi(){if(!sbOn()){alert("ยังไม่ได้ตั้งค่าฐานข้อมูล");return}
 const d=document.createElement("div");d.id="rcm";d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:10;display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow:auto";
 d.innerHTML=`<div class="q" style="background:var(--sf);max-width:380px;width:100%;margin:auto;text-align:left"><b style="font-size:18px">🔑 รหัสกู้คืน</b><p class="mu">รหัสนี้สร้างให้อัตโนมัติและสำรองข้อมูลให้เองหลังเล่นจบรอบ จดไว้ใช้ย้ายเครื่องหรือกู้ข้อมูลที่หาย ใครมีรหัสนี้จะเปิดข้อมูลของคุณได้ จึงไม่ควรแชร์ ถ้าลืมรหัสให้แจ้งผู้ดูแลพร้อมชื่อเล่นในหน้าอันดับ</p><div id="rcc" style="font-size:22px;font-weight:700;letter-spacing:2px;text-align:center;margin:10px 0;user-select:all">${S.rc?fmtRc(S.rc):"ยังไม่มีรหัส"}</div><button class="ghost" onclick="rcCopy()">📋 คัดลอกรหัส</button><button class="go" style="margin:0 0 6px" onclick="rcMake()">${S.rc?"สำรองข้อมูลตอนนี้":"สร้างรหัสและสำรองข้อมูล"}</button><div id="rcs" class="mu" style="min-height:22px"></div><h2>กู้คืนด้วยรหัส</h2><input type="text" id="rci" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="XXXX-XXXX-XXXX-XXXX"><button class="go" style="background:var(--sf);color:var(--tx);border:1px solid var(--bd)" onclick="rcRestore()">กู้คืนข้อมูล</button><button class="ghost" onclick="document.getElementById('rcm').remove()">ปิด</button></div>`;document.body.appendChild(d)}
async function rcMake(){if(!S.rc){S.rc=genRc();save()}$("rcc").textContent=fmtRc(S.rc);$("rcs").textContent="กำลังบันทึก...";
 const ok=await bup(1);$("rcs").textContent=ok?"✅ สำรองแล้ว จดรหัสไว้ได้เลย ต่อไปจะสำรองอัตโนมัติหลังเล่นจบ":"❌ บันทึกไม่ได้ (เช็กอินเทอร์เน็ต หรือยังไม่ได้รัน SQL ใน Supabase)"}
async function rcRestore(){const c=$("rci").value.toUpperCase().replace(/[^A-Z0-9]/g,""),s=$("rcs");
 if(c.length!==16){s.textContent="รหัสต้องมี 16 ตัวอักษร";return}
 s.textContent="กำลังค้นหา...";let r=null;
 try{r=await sbF("rpc/load_backup2",{method:"POST",body:JSON.stringify({p_code:c})})}catch(e){if(String(e.message)!=="404"){s.textContent="เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง";return}}
 if(r&&r.revoked){s.textContent="รหัสนี้ถูกยกเลิกแล้ว ให้ใช้รหัสใหม่ที่ผู้ดูแลออกให้";return}
 if(!r||!r.c){try{r=await sbF("rpc/load_backup",{method:"POST",body:JSON.stringify({p_code:c})})}catch(e){s.textContent="เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง";return}}
 if(!r||!r.c){s.textContent="ไม่พบรหัสนี้";return}
 if(!confirm("ข้อมูลในเครื่องนี้จะถูกแทนที่ด้วยข้อมูลจากรหัส ดำเนินการต่อ?"))return;
 S=Object.assign({c:{},cfg:{nw:10,lv:[1,2,3,4]},st:{last:0,streak:0,xp:0},td:{d:0,nw:0},fl:{}},r);S.rc=c;S.rcs=1;bind();evo();save();document.body.classList.toggle("nofx",S.cfg.fx===false);$("rcm").remove();TAB=0;home();bup(1)}
/* ===== v2: เดาก่อนเรียน · เคล็ดลับจำ · แยกร่างคำ · คู่สับสน · GM ใหม่ ===== */
function tpt(){S.cfg.pt=S.cfg.pt===false;save();home()}
function guess(id){const d=D[id],o=opts(id,"t");G.ans=false;G.go=o;G.gk=d.t;say(d.w);
 app.innerHTML=hud()+`<div class="q"><div class="mu">🎲 คำใหม่ · ลองเดาความหมายก่อน (ผิดก็ไม่เป็นไร)</div><div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}<div class="fb" style="text-align:left">${hl(d)}</div></div>`+o.map((v,i)=>`<button class="o" onclick="gpk(${i},${id})">${E(v)}</button>`).join("")}
function gpk(i,id){if(!G||G.ans)return;G.ans=1;document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(G.go[j]===G.gk)b.classList.add("ok");else if(j===i)b.classList.add("no")});sfxOn(G.go[i]===G.gk);const g=G;setTimeout(()=>{if(G===g&&g.cur&&g.cur.id===id)learn(id)},1000)}
const mnHtml=i=>{const t=(S.mn||{})[i];return t?`<div class="fb">🏷️ ${E(t)}</div><button class="ghost" onclick="mnEdit(${i})">✏️ แก้เคล็ดลับ</button>`:`<button class="ghost" onclick="mnEdit(${i})">🏷️ เขียนเคล็ดลับจำของคุณ</button>`};
function mnEdit(i){const v=prompt("เคล็ดลับจำคำว่า “"+D[i].w+"” (เว้นว่าง = ลบ)\nเช่น eye = ตา มี e สองข้างเหมือนตาสองดวง",(S.mn||{})[i]||"");if(v===null)return;S.mn=S.mn||{};const t=v.trim().slice(0,120);t?S.mn[i]=t:delete S.mn[i];save();const e=$("mnb");if(e)e.innerHTML=mnHtml(i)}

/* 🧬 แยกร่างคำ */
function wbStart(ids){const p=shuf(ids.filter(i=>/^[a-z]{3,11}$/i.test(D[i].w))).sort((a,b)=>S.c[a][0]-S.c[b][0]).slice(0,8);if(p.length<3){alert("ต้องเรียนคำที่เป็นตัวอักษรล้วนอย่างน้อย 3 คำ");return home()}MG={m:"wb",qs:shuf(p),n:0,ok:0,err:0,miss:[]};wbQ()}
function wbQ(){const g=MG,id=g.qs[g.n],w=D[id].w.toLowerCase(),n=w.length,r=g.n,k=Math.min(n,r<3?2:r<6?Math.ceil(n/2):n),h=shuf([...Array(n).keys()]).slice(0,k).sort((a,b)=>a-b),dc=shuf([..."abcdefghijklmnopqrstuvwxyz"].filter(c=>!w.includes(c))).slice(0,r<3?2:3);g.id=id;g.w=w;g.h=h;g.p=0;g.bad=0;g.t=shuf([...h.map(i=>({c:w[i],u:0})),...dc.map(c=>({c,u:0}))]);wbDraw()}
function wbDraw(){const g=MG,d=D[g.id],sl=[...g.w].map((c,i)=>{const j=g.h.indexOf(i),f=j<0||j<g.p;return `<span style="display:inline-block;min-width:26px;margin:2px;border-bottom:3px solid ${f?(j<0?"var(--bd)":"var(--ok)"):i===g.h[g.p]?"var(--ac)":"var(--bd)"};font-size:30px;font-weight:700">${f?E(c):"&nbsp;"}</span>`}).join("");
 app.innerHTML=`<div class="hud"><span>ข้อ ${g.n+1}/${g.qs.length} · ✅ ${g.ok} · ✗ ${g.err}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.n/g.qs.length*100}%"></i></div><div class="q"><div class="mu">แตะตัวอักษรต่อให้เป็นคำ</div>${tm(d)}${nt(d)}<div style="margin-top:12px">${sl}</div></div><div style="text-align:center">${g.t.map((t,i)=>`<button class="o" style="display:inline-block;width:56px;margin:4px;text-align:center;font-size:24px;padding:10px 0" ${t.u?"disabled":""} onclick="wbTap(${i},this)">${E(t.c)}</button>`).join("")}</div><div id="fb"></div>`}
function wbTap(i,b){const g=MG;if(!g||g.m!=="wb"||g.p>=g.h.length)return;const t=g.t[i];
 if(t.c===g.w[g.h[g.p]]){t.u=1;g.p++;g.p>=g.h.length?wbDone():wbDraw()}
 else{g.bad++;g.err++;sfxOn(false);b.classList.add("no");setTimeout(()=>b.classList.remove("no"),400)}}
function wbDone(){const g=MG,d=D[g.id];g.bad?g.miss.push(g.id):g.ok++;sfxOn(!g.bad);say(d.w);wbDraw();$("fb").innerHTML=`<div class="fb ${g.bad?"no":"ok"}"><b>${E(d.w)}</b> · ${E(d.t)}<br>${hl(d)}<br><span class="mu">${E(d.y)}</span></div><button class="go" id="go" onclick="wbNext()">${g.n+1>=g.qs.length?"ดูผล":"ต่อไป"}</button>`}
function wbNext(){const g=MG;g.n++;g.n>=g.qs.length?wbEnd():wbQ()}
function wbEnd(){const g=MG,xp=g.ok*6,p=mgPay("wb",g.ok*2,xp,"s",3);mgRes("🧬 แยกร่างคำเสร็จแล้ว!",`<div class="big" style="margin:10px 0">${g.ok}<small> / ${g.qs.length} คำไม่พลาด</small></div><div class="mu">ต่อผิด ${g.err} ครั้ง</div>`,[...new Set(g.miss)],p,xp,3);MG=null}

/* ⚖️ คู่สับสน: [a,b,กฎ, ประโยค1,ตอบ,แปล, ประโยค2,ตอบ,แปล] */
const CP=[["borrow","lend","borrow = ยืมของเขามา · lend = ให้คนอื่นยืม","Can I ___ your pen?",0,"ฉันขอยืมปากกาคุณได้ไหม","Can you ___ me some money?",1,"คุณให้ฉันยืมเงินหน่อยได้ไหม"],
["bring","take","bring = นำมาหาผู้พูด · take = นำไปที่อื่น","Can you ___ me a glass of water?",0,"ช่วยเอาน้ำมาให้ฉันหนึ่งแก้วได้ไหม","I am leaving now, so I will ___ my bag with me.",1,"ฉันกำลังจะไป เลยจะเอากระเป๋าไปด้วย"],
["hear","listen","hear = ได้ยินเอง · listen = ตั้งใจฟัง","I can ___ birds outside.",0,"ฉันได้ยินเสียงนกข้างนอก","Please ___ to the teacher.",1,"โปรดตั้งใจฟังครู"],
["see","watch","see = เห็น · watch = ดู/จ้องมอง (สิ่งที่เคลื่อนไหว)","I can ___ the mountain from here.",0,"ฉันมองเห็นภูเขาจากที่นี่","We ___ a movie after dinner.",1,"เราดูภาพยนตร์หลังอาหารเย็น"],
["say","tell","say + คำพูด · tell + คน (+เรื่อง)","Please ___ your name clearly.",0,"กรุณาพูดชื่อของคุณให้ชัดเจน","Can you ___ me the time?",1,"คุณบอกเวลาฉันได้ไหม"],
["quiet","quite","quiet = เงียบ · quite = ค่อนข้าง","The library is very ___.",0,"ห้องสมุดเงียบมาก","The test was ___ easy.",1,"ข้อสอบค่อนข้างง่าย"],
["rise","raise","rise = ขึ้นเอง (ไม่มีกรรม) · raise = ยก/ทำให้สูงขึ้น (มีกรรม)","The sun will ___ at six.",0,"พระอาทิตย์จะขึ้นตอนหกโมง","Please ___ your hand.",1,"โปรดยกมือขึ้น"],
["lose","loose","lose = ทำหาย/แพ้ (กริยา) · loose = หลวม (คุณศัพท์)","Do not ___ your ticket.",0,"อย่าทำตั๋วหาย","My shoe feels ___.",1,"รองเท้าฉันรู้สึกหลวม"],
["bored","boring","bored = เรารู้สึกเบื่อ · boring = สิ่งที่น่าเบื่อ","I felt ___ during the lecture.",0,"ฉันรู้สึกเบื่อระหว่างการบรรยาย","The film was ___.",1,"ภาพยนตร์เรื่องนั้นน่าเบื่อ"],
["interested","interesting","interested = เราสนใจ · interesting = น่าสนใจ","She is ___ in art.",0,"เธอสนใจศิลปะ","The lesson was ___.",1,"บทเรียนน่าสนใจ"],
["fun","funny","fun = สนุก · funny = ตลก ขำ","We had a lot of ___ at the beach.",0,"เราสนุกมากที่ชายหาด","That joke is very ___.",1,"มุกนั้นตลกมาก"],
["since","for","since = ตั้งแต่ (จุดเวลา) · for = เป็นเวลา (ช่วงเวลา)","I have lived here ___ 2020.",0,"ฉันอยู่ที่นี่ตั้งแต่ปี 2020","I have lived here ___ three years.",1,"ฉันอยู่ที่นี่มาสามปี"],
["already","yet","already = แล้ว (ประโยคบอกเล่า) · yet = หรือยัง/ยังไม่ (คำถาม/ปฏิเสธ)","I have ___ eaten lunch.",0,"ฉันกินข้าวกลางวันแล้ว","Have you finished ___?",1,"คุณทำเสร็จหรือยัง"],
["than","then","than = กว่า (เปรียบเทียบ) · then = แล้วจึง/จากนั้น","My bag is heavier ___ yours.",0,"กระเป๋าฉันหนักกว่าของคุณ","Finish your work, ___ take a break.",1,"ทำงานให้เสร็จ แล้วค่อยพัก"]];
function cpStart(){const c=S.cp||{},o=CP.map((_,i)=>i).sort((a,b)=>(c[b]||0)-(c[a]||0)+Math.random()*3-1.5).slice(0,8);MG={m:"cp",qs:o.map(pi=>({pi,s:Math.random()<.5?0:1,f:Math.random()<.5})),n:0,ok:0,bad:[]};cpQ()}
function cpQ(){const g=MG,q=g.qs[g.n],P=CP[q.pi],b=3+q.s*3,o=q.f?[1,0]:[0,1];g.lock=0;
 app.innerHTML=`<div class="hud"><span>ข้อ ${g.n+1}/${g.qs.length} · ✅ ${g.ok}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.n/g.qs.length*100}%"></i></div><div class="q"><div class="mu">เลือกคำที่ถูกต้อง</div><div style="font-size:21px;margin-top:8px">${E(P[b]).replace("___","<b>_____</b>")}</div><div class="mu" style="margin-top:8px">${E(P[b+2])}</div></div>`+o.map(k=>`<button class="o" data-k="${k}" onclick="cpPick(${k})">${E(P[k])}</button>`).join("")+`<div id="fb"></div>`}
function cpPick(k){const g=MG;if(!g||g.m!=="cp"||g.lock)return;g.lock=1;const q=g.qs[g.n],P=CP[q.pi],b=3+q.s*3,a=P[b+1],ok=k===a,c=S.cp=S.cp||{};
 document.querySelectorAll(".o").forEach(e=>{e.disabled=true;if(+e.dataset.k===a)e.classList.add("ok");else if(+e.dataset.k===k)e.classList.add("no")});
 if(ok){g.ok++;if(c[q.pi])c[q.pi]--}else{g.bad.push(q.pi);c[q.pi]=(c[q.pi]||0)+1}save();sfxOn(ok);const s=P[b].replace("___",P[a]);say(s);
 $("fb").innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"ถูกต้อง":"คำตอบ: "+E(P[a])}</b><br>${E(s)}<br><span class="mu">${E(P[2])}</span></div><button class="go" id="go" onclick="cpNext()">${g.n+1>=g.qs.length?"ดูผล":"ต่อไป"}</button>`}
function cpNext(){const g=MG;g.n++;g.n>=g.qs.length?cpEnd():cpQ()}
function cpEnd(){const g=MG,xp=g.ok*8,p=mgPay("cp",g.ok*3,xp,"l",3),u=[...new Set(g.bad)];mgRes("⚖️ คู่สับสนเสร็จแล้ว!",`<div class="big" style="margin:10px 0">${g.ok}<small> / ${g.qs.length}</small></div>`+(u.length?`<div class="mu" style="margin-top:10px">คู่ที่ควรทวน</div>`+u.map(i=>`<div class="fb" style="text-align:left"><b>${CP[i][0]} / ${CP[i][1]}</b><br><span class="mu">${E(CP[i][2])}</span></div>`).join(""):`<div class="mu">แม่นทุกคู่! 🎉</div>`),[],p,xp,3);MG=null}

/* ===== GM ใหม่ (ไม่ใช่สัตว์): Void Sovereign + Solar Phoenix ===== */
const spk=(a,b,s,c)=>{R(a,b-s,1,2*s+1,c);R(a-s,b,2*s+1,1,c);R(a,b,1,1,'#fff')};
function rays(cx,cy,r0,r1,n,rot,c,al){x.globalAlpha=al;for(let i=0;i<n;i++){const a=rot+i/n*6.283,k=Math.cos(a),s=Math.sin(a);ln([cx+k*r0,cy+s*r0],[cx+k*r1,cy+s*r1],c)}x.globalAlpha=1}
const GMP={fox9:['#7a8bff','#e8f0ff'],dgn:['#ffb13b','#fff0a0'],voidk:['#a35bff','#ff9be8'],solph:['#ff8a2b','#ffe48a']};
function gmBack(t,sp,pu){const C=Math.cos,Sn=Math.sin,P=GMP[sp];rays(32,32,12,38,14,t/4000,P[1],.1+.06*pu);ell(32,GY,27,4,P[0],.2);
 for(let i=0;i<52;i++){const a=i/52*6.283+t/1500;R(32+C(a)*26,GY+Sn(a)*3.6,1,1,i%4?P[0]:P[1])}
 for(let i=0;i<6;i++){const a=-t/900+i*1.047;R(32+C(a)*16,GY+Sn(a)*2.3,2,1,P[1])}
 if(sp=='dgn')for(let i=0;i<8;i++){const p=Sn(t/700+i)*.8;ell(6+i*7,57+p,5,3,'#fff3d0',.9);ell(6+i*7,59+p,5,2,'#ffd88a',.6)}}
function gmFront(t,sp,pu){const C=Math.cos,Sn=Math.sin,P=GMP[sp];
 if(sp=='fox9'){for(let i=-4;i<=4;i++)pol([[32+i*2.6-2,39],[32+i*2.6,45-(i%2?0:2)],[32+i*2.6+2,39]],'#fff');R(27,40,10,1,'#e0302a');ell(32,43,2,2,'#ffd23a',1);R(31,42,1,1,'#fff');
  for(let i=0;i<7;i++)R((i*23+t/45)%64,(t/32+i*19)%58,2,1,i%2?'#ffc0d8':'#ffe0ec')}
 else if(sp=='dgn'){for(const d of[-1,1]){pol([[32+d*11,35],[32+d*5,34],[32+d*4,41],[32+d*11,42]],'#ffd23a');R(32+d*8-1,37,2,2,'#ff3a2a');R(32+d*7,35,1,1,'#fff')}
  for(let i=0;i<10;i++)if((t/140+i)%4<1)R(23+(i*7)%18,36+(i*5)%18,1,1,'#fffbd0')}
 else if(sp=='voidk'){x.globalAlpha=.22+.12*pu;R(2,33,60,1,'#c9a6ff');x.globalAlpha=1}
 else for(let i=0;i<6;i++){const a=i/6*6.283+t/500;spk(rd(32+C(a)*25),rd(30+Sn(a)*19),1,'#fff0a0')}
 for(let i=0;i<7;i++){const ph=(t/500+i*.9)%3;if(ph<1)spk((i*47)%58+3,(i*31)%46+4,ph<.5?1:2,P[1])}}
function voidk(t,pu){const C=Math.cos,Sn=Math.sin,X=32,Y=33,a0=t/900,lk=rd(Sn(t/1200)*3);
 ell(X+Sn(t/3000)*3,24,20,10,'#6a2aff',.12);ell(X-Sn(t/2500)*3,42,22,9,'#ff3a9a',.09);ell(X,Y,29,27,'#3a1a9a',.18+.08*pu);
 for(let i=0;i<20;i++)R((i*37)%62+1,(i*23)%52+2,1,1,(Math.floor(t/250)+i)%3?(i%4?'#c9a6ff':'#9fd0ff'):'#fff');
 for(let i=0;i<12;i++){const a=i*.52+t/700,r=30-((t/40+i*7)%28);R(X+C(a)*r,Y+Sn(a)*r*.6,1,1,i%3?'#fff':'#ffd76a')}
 const ring=f=>{for(const[rr,c1,c2]of[[17,'#fff3c8','#ffd76a'],[21,'#ffb13b','#ff8a3a'],[25,'#ff5aa0','#d03a8a'],[29,'#7a3aff','#5a2ad0']]){const n=rr*5,s2=rr<22?2:1;for(let i=0;i<n;i++){const a=i/n*6.283+a0*(17/rr),s=Sn(a);if((s>0)!==f)continue;R(X+C(a)*rr,Y+s*rr*(s<0?.5:.2),s2,s2,C(a-.8)>.2?c1:c2)}}};
 ell(X,Y,17,17,'#a35bff',.14);ell(X,Y,13,13,'#05030f',1);
 for(let i=0;i<60;i++){const a=i/60*6.283;R(X+C(a)*13.5,Y+Sn(a)*13.5,1,1,i%2?'#fff':'#c9a6ff')}
 ring(false);ring(true);
 for(let i=0;i<14;i++){const a=i/14*6.283+t/3000,l=4+3*Sn(t/180+i*2);ln([X+C(a)*15,Y+Sn(a)*15],[X+C(a)*(15+l),Y+Sn(a)*(15+l)],'#a35bff')}
 if(t%3400<130)R(X-10,Y,20,1,'#c9a6ff');else{ell(X,Y,10,6,'#f4eaff',1);ell(X+lk,Y,5,6,'#6a2aff',1);ell(X+lk,Y,3,5,'#c9a6ff',1);R(X+lk-1,Y-6,2,12,'#05030f');R(X+lk-3,Y-4,2,2,'#fff');R(X+lk+2,Y+2,1,1,'#fff');for(let i=-9;i<=9;i+=3)R(X+i,Y-6+Math.abs(i)/4,1,1,'#a35bff')}
 for(let j=0;j<9;j++){x.globalAlpha=1-j/10;const w=j<4?3:1,c=j%2?'#c9a6ff':'#fff';R(X-(w>>1),Y-17-j*3,w,3,c);R(X-(w>>1),Y+17+j*3,w,3,c)}x.globalAlpha=1;
 for(let i=0;i<4;i++){const a=t/600+i*1.571,ox=X+C(a)*21,oy=Y+Sn(a)*10;pol([[ox,oy-4],[ox+2,oy],[ox,oy+4],[ox-2,oy]],i%2?'#7a8bff':'#ff7ad9');R(ox,oy-2,1,1,'#fff')}
 for(let i=0;i<3;i++){const a=-t/800+i*2.09;spk(rd(X+C(a)*24),rd(Y+Sn(a)*13),2,'#ff9be8')}}
function solarph(t,pu){const C=Math.cos,Sn=Math.sin,fl=Sn(t/230)*3,O='#ff7a1a',Y='#ffd23a',CL=['#fff0a0',Y,'#ffb02b',O,'#f0501a','#e8301a','#b8201a'];
 ell(32,30,19,19,'#ff8a2b',.2+.1*pu);ell(32,30,13,13,'#ffe48a',.3);
 for(let i=0;i<28;i++){const a=i/28*6.283+t/1200;R(32+C(a)*21,30+Sn(a)*21,1,1,i%2?Y:O)}
 for(let j=0;j<5;j++)for(let k=0;k<11;k++){const w=Math.max(1,3-k*.25|0);R(32+(j-2)*4+Sn(t/240+k*.6+j)*k*.5-w/2,44+k*1.7,w,2,['#ffd23a','#ffb02b','#ff7a1a','#f0501a','#e8301a','#b8201a'][k>>1])}
 for(const d of[-1,1])for(const m of[[1,0],[.55,2]])for(let i=6;i>=0;i--){const a=(-75+i*15)*Math.PI/180,L=(27-i*1.2)*m[0],ux=d*C(a),uy=Sn(a),sx=32+d*5,sy=31,mx=sx+ux*L*.5,my=sy+uy*L*.5-fl*.4,w=3.2*(m[0]<1?.7:1),tx=sx+ux*L,ty=sy+uy*L-fl*(1-i/9);
  pol([[sx,sy],[mx-uy*w,my+ux*w],[tx,ty],[mx+uy*w,my-ux*w]],CL[Math.max(0,i-m[1])]);if(m[0]==1){R(tx-1,ty-1,2,2,'#fff6c0');if(i%2)R(tx+ux*2,ty+uy*2-((t/70+i)%3|0),1,2,Y)}}
 pol([[27,28],[37,28],[39,40],[32,49],[25,40]],O);ell(32,38,4,7,Y,1);ell(32,40,2,4,'#fff6c0',1);
 for(let r=0;r<5;r++)for(let c=0;c<3;c++)R(29+c*3+(r%2)*1.5,31+r*3.4,2,1,r%2?'#ffe48a':'#ffb02b');
 for(const d of[-2,-1,0,1,2])pol([[32+d*2-1.5,17],[32+d*3.5,6+Math.abs(d)*2.5-((t/90+d+4)%3|0)],[32+d*2+1.5,17]],Math.abs(d)%2?O:Y);
 ell(32,22,6,6,O,1);pol([[30,22],[34,22],[32,28]],Y);
 for(const e of[27,33]){R(e,18,4,3,Y);R(e+1,19,2,2,'#2a0a00');R(e+1,19,1,1,'#fff')}
 for(const d of[-1,1])for(let k=0;k<9;k++)R(32+d*(6+k*1.7),20+k*.9+Sn(t/200+k*.5)*2,2,1,k>6?'#fff0a0':k%2?O:Y);
 for(let i=0;i<24;i++){const a=i/24*6.283+t/700;R(32+C(a)*9,11+Sn(a)*2.5,1,1,i%2?Y:'#fff6c0')}
 for(let i=0;i<10;i++)R((i*13+7)%60,60-((t/20+i*17)%58),1,2,i%2?Y:'#e8301a')}
Object.assign(SPC,{voidk:{nm:"Void",th:"ราชันย์แห่งความว่าง",e:"🕳️",fur0:"#a35bff",base:"#a35bff",d:[4,3,2,1],ear:"cat",tn:0,gm:1,form:"voidk",bg:7},solph:{nm:"Phoenix",th:"ฟีนิกซ์สุริยะ",e:"🔥",fur0:"#ff8a2b",base:"#ff8a2b",d:[4,3,2,1],ear:"cat",tn:0,gm:1,form:"solph",bg:1}});
FORMS.voidk={n:"Void Sovereign",n2:"Void Sovereign",fur:"#a35bff",acc:"#ff5aa0",eye:"#c9a6ff",tail:"normal",pc:"#a35bff",c:"GM"};
FORMS.solph={n:"Solar Phoenix",n2:"Solar Phoenix",fur:"#ff7a1a",acc:"#ffd23a",eye:"#2a0a00",tail:"normal",pc:"#ffd23a",c:"GM"};
/* ===== รหัสกู้คืนอัตโนมัติ + หน้า GM (ตรวจรหัสที่เซิร์ฟเวอร์ ไม่มีรหัส/แฮชในไฟล์นี้) ===== */
function cpy(t,b,ok,bad){try{navigator.clipboard.writeText(t).then(()=>{if(b)b.textContent=ok},()=>{if(b)b.textContent=bad})}catch(e){if(b)b.textContent=bad}}
function rcCopy(){const s=$("rcs");cpy(fmtRc(S.rc),null,"","");if(s)s.textContent="คัดลอกแล้ว"}
function rcNotice(){if(S.rcs||!sbOn()||!S.rc||document.getElementById("rcn")||document.getElementById("obm"))return;
 const d=document.createElement("div");d.id="rcn";d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:10;display:flex;align-items:center;justify-content:center;padding:16px";
 d.innerHTML=`<div class="q" style="background:var(--sf);max-width:380px;width:100%;margin:0"><div style="font-size:44px">🔑</div><b style="font-size:18px">รหัสกู้คืนของคุณ</b><div style="font-size:22px;font-weight:700;letter-spacing:2px;margin:12px 0;user-select:all">${fmtRc(S.rc)}</div><p class="mu" style="text-align:left;font-size:14px">เราสร้างรหัสนี้ให้อัตโนมัติและสำรองความคืบหน้าของคุณไว้แล้ว จดหรือคัดลอกเก็บไว้ ใช้กู้ข้อมูลเมื่อเปลี่ยนเครื่อง ห้ามแชร์ให้ใคร<br>ถ้าลืมรหัส ให้แจ้งผู้ดูแลพร้อมชื่อเล่น ตั้งชื่อเล่นไว้ที่แท็บ 🏆 อันดับ เพื่อให้ผู้ดูแลหาข้อมูลของคุณเจอ</p><button class="go" onclick="rcnCopy(this)">📋 คัดลอกรหัส</button><button class="ghost" onclick="rcnOk()">จดแล้ว ปิด</button></div>`;document.body.appendChild(d)}
function rcnCopy(b){cpy(fmtRc(S.rc),b,"✅ คัดลอกแล้ว","คัดลอกไม่ได้ ให้จดเอง")}
function rcnOk(){S.rcs=1;save();const d=document.getElementById("rcn");if(d)d.remove()}

let GA=null,GAN=0,GAL=0,GAR=[];
function gaTap(){const n=Date.now();GAN=n-GAL<1500?GAN+1:1;GAL=n;if(GAN>=7){GAN=0;gaOpen()}}
async function gaRpc(fn,a){const r=await fetch(SB.url+"/rest/v1/rpc/"+fn,{method:"POST",headers:{apikey:SB.key,"Content-Type":"application/json"},body:JSON.stringify(a)}),t=await r.text();let j=null;try{j=t?JSON.parse(t):null}catch(e){}
 if(!r.ok)throw new Error(r.status===404?"nofn":(j&&j.message)||String(r.status));return j}
function gaOpen(){if(!sbOn())return;let d=document.getElementById("gam");if(!d){d=document.createElement("div");d.id="gam";d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.94);z-index:10;overflow:auto;padding:16px";document.body.appendChild(d)}GA?gaMain():gaLogin()}
function gaClose(){if(GA){gaRpc("gm_logout",{p_token:GA}).catch(()=>{});GA=null}const d=document.getElementById("gam");if(d)d.remove()}
function gaLogin(){$("gam").innerHTML=`<div style="max-width:420px;margin:40px auto 0"><div class="row"><b style="font-size:20px">🛡️ GM</b><button class="ghost" style="margin:0" onclick="gaClose()">ปิด</button></div><p class="mu">ตรวจรหัสที่เซิร์ฟเวอร์ ล็อกอินอยู่ได้ 15 นาทีหลังใช้งานล่าสุด</p><input type="password" id="gap" autocomplete="off" placeholder="รหัส GM" onkeydown="if(event.key==='Enter')gaGo()"><button class="go" onclick="gaGo()">เข้าสู่ระบบ</button><div id="gas" class="mu"></div></div>`;$("gap").focus()}
async function gaGo(){const v=$("gap").value,s=$("gas");if(!v)return;s.textContent="กำลังตรวจสอบ...";
 try{const t=await gaRpc("gm_login",{p_pw:v});if(!t){s.textContent="รหัสไม่ถูกต้อง";return}GA=t;gaMain()}
 catch(e){s.textContent=e.message==="GM_LOCKED"?"ลองผิดหลายครั้ง ถูกล็อกชั่วคราว รอ 15 นาที":e.message==="nofn"?"ยังไม่ได้รัน SQL ใน Supabase":"เกิดข้อผิดพลาด: "+e.message}}
function gaMain(){$("gam").innerHTML=`<div style="max-width:560px;margin:0 auto 40px"><div class="row"><b style="font-size:20px">🛡️ GM · ข้อมูลผู้เล่น</b><button class="ghost" style="margin:0" onclick="gaClose()">ออก</button></div><input type="text" id="gaq" maxlength="32" placeholder="ค้นหาชื่อเล่น (เว้นว่าง = ล่าสุด)" onkeydown="if(event.key==='Enter')gaSearch()" style="margin-top:10px"><button class="go" onclick="gaSearch()">🔍 ค้นหา</button><button class="ghost" onclick="gaLogs()">📜 ประวัติ GM</button><div id="gan"></div><div id="gar"></div></div>`;gaSearch()}
function gaErr(e){if(e.message==="GM_AUTH"){GA=null;gaLogin();$("gas").textContent="หมดเวลา ล็อกอินใหม่อีกครั้ง";return}alert("ผิดพลาด: "+e.message)}
async function gaSearch(){const q=$("gaq").value.trim();$("gar").innerHTML='<div class="mu" style="margin-top:10px">กำลังค้นหา...</div>';
 try{gaShow(await gaRpc("gm_search",{p_token:GA,p_q:q}))}catch(e){gaErr(e)}}
function gaShow(r){GAR=r;$("gar").innerHTML=r.length?r.map(p=>`<div class="cd"><div class="row"><b>${p.nick?E(p.nick):"(ไม่มีชื่อเล่น)"}</b><span class="mu">#${p.id}</span></div><div class="mu">Lv ${p.level} · ⭐ ${p.xp} · 🪙 ${p.coins} · 🔥 ${p.streak}</div><div class="mu">เรียน ${p.words} · จำได้ ${p.mastered} · สัตว์: ${E(p.pets||"-")}</div><div class="mu">สำรองล่าสุด ${E(new Date(p.updated_at).toLocaleString("th-TH"))}</div><button class="ghost" onclick="gaRe(${p.id})">🔑 ออกรหัสใหม่</button></div>`).join(""):`<div class="mu" style="margin-top:10px">ไม่พบข้อมูล ผู้เล่นจะอยู่ในรายการหลังเปิดเกมเวอร์ชันใหม่อย่างน้อย 1 ครั้ง</div>`}
async function gaRe(id){const p=GAR.find(x=>x.id===id);if(!p||!confirm("ออกรหัสใหม่ให้ «"+(p.nick||"#"+id)+"» ?\nรหัสเก่าจะใช้ไม่ได้ทันที"))return;
 try{const c=await gaRpc("gm_reissue",{p_token:GA,p_id:id});$("gan").innerHTML=`<div class="cd" style="border-color:var(--ok)"><div class="mu">รหัสใหม่ของ ${E(p.nick||"#"+id)} (แสดงครั้งนี้ครั้งเดียว)</div><div style="font-size:22px;font-weight:700;letter-spacing:2px;text-align:center;margin:10px 0;user-select:all">${fmtRc(c)}</div><button class="ghost" onclick="cpy('${c}',this,'✅ คัดลอกแล้ว','คัดลอกไม่ได้ ให้จดเอง')">📋 คัดลอก</button></div>`;$("gam").scrollTo(0,0)}catch(e){gaErr(e)}}
async function gaLogs(){try{const r=await gaRpc("gm_logs",{p_token:GA});$("gar").innerHTML=r.length?r.map(l=>`<div class="cd"><b>${E(l.action==="reissue"?"ออกรหัสใหม่":l.action==="login"?"ล็อกอิน":l.action)}</b>${l.nick?" · "+E(l.nick):""}${l.target_id?` <span class="mu">#${l.target_id}</span>`:""}<div class="mu">${E(new Date(l.at).toLocaleString("th-TH"))}</div></div>`).join(""):`<div class="mu">ยังไม่มีประวัติ</div>`}catch(e){gaErr(e)}}
/* ===== v3: บันไดเรียนคำใหม่ · ทวนตอนเย็น · ภารกิจเพิ่ม · โหมดฝึกใหม่ ===== */
function syl(w){if(!/^[a-z]{4,}$/i.test(w))return null;const m=w.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouyrlh]))?/gi);return m&&m.length>1&&m.join("")===w?m:null}
const sylHtml=d=>{const s=syl(d.w);return s?`<div style="font-size:22px;margin-top:6px;letter-spacing:1px">${s.map(E).join('<span class="mu">·</span>')}</div><div class="mu" style="font-size:12px">แบ่งพยางค์โดยประมาณ</div>`:""};
function autoTip(d){const w=d.w.toLowerCase(),t=[],db=/^[a-z]+$/.test(w)&&w.match(/([a-z])\1/);if(db)t.push(`มีตัวอักษรซ้ำ “${db[0]}”`);
 const SF=[["tion","-tion อ่านว่า “ชั่น”"],["ight","-ight อ่านว่า “ไอท์” (gh ไม่ออกเสียง)"],["ture","-ture อ่านว่า “เชอร์”"],["ment","-ment มักเป็นคำนาม"],["ness","-ness เป็นคำนาม"],["ful","-ful แปลว่า “เต็มไปด้วย”"],["less","-less แปลว่า “ไม่มี”"],["ly","-ly มักเป็นกริยาวิเศษณ์"]];
 for(const[sf,m]of SF)if(w.length>sf.length+2&&w.endsWith(sf)){t.push(m);break}
 return t.length?`<div class="mu" style="margin-top:8px">💡 ${t.join(" · ")}</div>`:""}
/* ขั้น 2: พิมพ์ตามคำที่เห็น */
function cty(id){const d=D[id];G.ans=false;G.cty=0;say(d.w);
 app.innerHTML=hud()+`<div class="q"><div class="mu">คำใหม่ · ขั้น 2/3 พิมพ์ตามคำที่เห็น</div><div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${sylHtml(d)}<div class="th" style="margin-top:10px">${E(d.t)}</div></div><input type="text" id="inp" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="พิมพ์ตามคำข้างบน"><button class="go" id="go" onclick="ctyChk(${id})">ตรวจ</button><div id="fb"></div>`;$("#inp").focus()}
function ctyChk(id){const i=$("#inp"),d=D[id],v=nrm(i.value);if(!v)return;const nm=d.w.split(/[,\/]/).map(nrm);
 if(nm.includes(v)){i.disabled=true;say(d.w);return lt1(id)}
 G.cty=(G.cty||0)+1;const w=nm[0];let h="";for(let k=0;k<w.length;k++)h+=v[k]===w[k]?E(w[k]):`<b style="color:var(--no)">${E(w[k])}</b>`;
 $("fb").innerHTML=`<div class="fb no">ยังไม่ตรง · ดูตัวสีแดงดี ๆ: <span style="font-size:20px">${h}</span></div>`+(G.cty>=3?`<button class="ghost" onclick="lt1(${id})">ข้ามไปขั้นต่อไป</button>`:"");i.select()}
/* ขั้น 3: แตะตัวอักษรที่หายไป */
function lt1(id){const d=D[id],w=d.w.toLowerCase();if(!/^[a-z]{3,11}$/.test(w))return ask(id);const n=w.length,k=Math.min(n-1,2),h=shuf([...Array(n).keys()]).slice(0,k).sort((a,b)=>a-b),dc=shuf([..."abcdefghijklmnopqrstuvwxyz"].filter(c=>!w.includes(c))).slice(0,2);
 G.lt={id,w,h,p:0,t:shuf([...h.map(i=>({c:w[i],u:0})),...dc.map(c=>({c,u:0}))])};ltDraw()}
function ltDraw(){const l=G.lt,d=D[l.id],sl=[...l.w].map((c,i)=>{const j=l.h.indexOf(i),f=j<0||j<l.p;return `<span style="display:inline-block;min-width:26px;margin:2px;border-bottom:3px solid ${f?(j<0?"var(--bd)":"var(--ok)"):i===l.h[l.p]?"var(--ac)":"var(--bd)"};font-size:30px;font-weight:700">${f?E(c):"&nbsp;"}</span>`}).join("");
 app.innerHTML=hud()+`<div class="q"><div class="mu">คำใหม่ · ขั้น 3/3 แตะตัวอักษรที่หายไป</div>${tm(d)}${nt(d)}<div style="margin-top:12px">${sl}</div><button class="sp" onclick="say(D[${l.id}].w)">🔊</button></div><div style="text-align:center">${l.t.map((t,i)=>`<button class="o" style="display:inline-block;width:56px;margin:4px;text-align:center;font-size:24px;padding:10px 0" ${t.u?"disabled":""} onclick="ltTap(${i},this)">${E(t.c)}</button>`).join("")}</div>`}
function ltTap(i,b){const l=G.lt;if(!l||l.p>=l.h.length)return;const t=l.t[i];
 if(t.c===l.w[l.h[l.p]]){t.u=1;l.p++;if(l.p>=l.h.length){say(D[l.id].w);ask(l.id)}else ltDraw()}
 else{sfxOn(false);b.classList.add("no");setTimeout(()=>b.classList.remove("no"),400)}}
/* สรุปคำใหม่ท้ายรอบ */
function recap(){const ids=[...new Set(G.nwIds)].filter(i=>S.c[i]);if(!ids.length)return fin();
 app.innerHTML=`<div class="q"><div class="mu">สรุปคำใหม่วันนี้</div><div style="font-size:19px;margin-top:6px">ลองนึกความหมายในใจก่อน แล้วแตะเพื่อเช็ก</div></div>`+ids.map(i=>`<button class="o" id="rq${i}" onclick="rcFlip(${i})"><b>${E(D[i].w)}</b> <span class="mu">แตะเพื่อดูความหมาย</span></button>`).join("")+`<button class="go" onclick="fin()">จบรอบ</button>`}
function rcFlip(i){const b=document.getElementById("rq"+i),d=D[i];say(d.w);b.innerHTML=`<b>${E(d.w)}</b> — ${E(d.t)}<div class="mu">${E(d.x)}</div>`}
/* 🌙 ทวนตอนเย็น */
function evAdd(){const T=day(),ids=[...(G.nwIds||[]),...Object.keys(G.miss).map(Number)];if(S.evd===T||!ids.length)return;
 if(!S.ev||S.ev.done||Date.now()-S.ev.t>20*36e5)S.ev={d:T,t:Date.now(),ids:[],done:0,early:0};
 ids.forEach(i=>{if(!S.ev.ids.includes(i))S.ev.ids.push(i)})}
function evState(){const e=S.ev;if(S.evd===day()||!e||e.done||!e.ids.length||Date.now()-e.t>20*36e5)return null;const ids=e.ids.filter(i=>S.c[i]);if(!ids.length)return null;return{ids,w:e.t+3*36e5-Date.now()}}
const evReady=()=>{const s=evState();return !!s&&s.w<=0};
function evHtml(){if(S.evd===day()&&S.ev&&S.ev.done)return`<div class="cd" style="margin-top:10px"><b>🌙 ทวนตอนเย็น</b> <span class="mu">✓ เสร็จแล้ววันนี้</span></div>`;const s=evState();if(!s)return"";
 if(s.w<=0)return`<button class="o" style="text-align:center;border-color:var(--ac);margin-top:10px" onclick="evStart()">🌙 ทวนสั้น 3 นาที · ${s.ids.length} คำ<br><span class="mu">+🪙 25 · ⭐ 40 · ช่วยให้จำข้ามคืนได้ดีขึ้น</span></button>`;
 const m=Math.ceil(s.w/6e4),h=m/60|0;return`<div class="cd" style="margin-top:10px"><b>🌙 ทวนตอนเย็น</b><div class="mu">ปลดล็อกในอีก ${h?h+" ชม. ":""}${m%60} นาที · รออีกนิดแล้วทวนจะได้ผลกว่า (${s.ids.length} คำ)</div><button class="ghost" onclick="evStart()">ทวนเลย (รางวัลครึ่งเดียว)</button></div>`}
function evStart(){const s=evState();if(!s)return;S.ev.early=s.w>0?1:0;save();freeReview("ev",0,s.ids)}
/* 📅 คำประจำวัน */
function wodId(){const p=[];D.forEach((d,i)=>{if(S.cfg.lv.includes(d.l))p.push(i)});return p.length?p[(day()*7919)%p.length]:0}
function wodHtml(){const id=wodId(),d=D[id],got=S.wd===day();return `<div class="cd" style="margin-top:14px"><div class="row"><b>📅 คำประจำวัน</b><span class="mu">${LV[d.l]}</span></div><div class="w" style="font-size:28px;margin-top:6px">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}<div style="margin-top:4px">${E(d.t)}</div><div class="fb">${hl(d)}<br><span class="mu">${E(d.y)}</span></div>${got?`<span class="mu">✓ รับโบนัสแล้ววันนี้</span>`:`<button class="ghost" onclick="wodGet()">✅ อ่านแล้ว รับ 🪙 5 · ⭐ 5</button>`}</div>`}
function wodGet(){if(S.wd===day())return;S.wd=day();M.coins+=5;addXp(5);save();sync();sinfo();home()}
/* 🎁 ภารกิจ: รายวัน 5 + หีบใหญ่ + รายสัปดาห์ + สตรีค */
function Q(){const T=day();if(!S.qs||S.qs.d!==T||S.qs.v!==2)S.qs={d:T,v:2,p:{},c:{}};return S.qs}
const wkN=()=>Math.floor((day()+3)/7);
function WQ(){const w=wkN();if(!S.wq||S.wq.w!==w)S.wq={w,p:{},c:{}};return S.wq}
function qadd(k,v,mx){const q=Q();q.p[k]=mx?Math.max(q.p[k]||0,v):(q.p[k]||0)+v;if(!mx){const w=WQ();w.p[k]=(w.p[k]||0)+v}}
function qready(){const q=Q(),w=WQ(),L=qlist();return L.some((l,j)=>!q.c[j]&&(q.p[l.k]||0)>=l.n)||(L.every((_,j)=>q.c[j])&&!q.c.b)||WL.some((l,j)=>!w.c[j]&&(w.p[l.k]||0)>=l.n)||[7,14,30,60].some(m=>(S.st.streak||0)>=m&&!(S.sc||{})[m])}
function qcard(t,n,p,c,onc){const pp=Math.min(n,p),dn=pp>=n;return `<div class="cd"><div class="row"><b>${t}</b><span class="mu">${pp} / ${n}</span></div><div class="bar" style="margin:8px 0"><i style="width:${pp/n*100}%;background:${dn?"var(--ok)":"var(--ac)"}"></i></div>${c?`<span class="mu">✓ รับรางวัลแล้ว</span>`:dn?`<button class="go" style="margin:4px 0 0;padding:10px" onclick="${onc}">🎁 เปิดหีบ</button>`:`<span class="mu">ทำให้ครบเพื่อรับหีบรางวัล</span>`}</div>`}
function qhtml(){const q=Q(),w=WQ(),L=qlist(),TG=["ง่าย","ง่าย","กลาง","กลาง","ท้าทาย"],n=L.filter((_,j)=>q.c[j]).length,all=n===L.length,sm=[7,14,30,60],sc=S.sc||{},st=S.st.streak||0;
 return `<h2>ภารกิจประจำวัน 🎁 (${n}/${L.length})</h2>`+L.map((l,j)=>qcard(`<span class="chip" style="font-size:11px;margin-right:6px">${TG[j]}</span>${l.t}`,l.n,q.p[l.k]||0,q.c[j],"claim("+j+")")).join("")
 +`<div class="cd" style="border-color:${all&&!q.c.b?"var(--ac)":"var(--bd)"}"><div class="row"><b>🏆 หีบใหญ่ · ครบทั้ง ${L.length} ภารกิจ</b><span class="mu">${n} / ${L.length}</span></div><div class="mu">🪙 100 + ไอเทมหายาก/มหากาพย์</div>${q.c.b?`<span class="mu">✓ รับแล้ว</span>`:all?`<button class="go" style="margin:6px 0 0;padding:10px" onclick="claimB()">🏆 เปิดหีบใหญ่</button>`:""}</div>`
 +`<h2>ภารกิจรายสัปดาห์ 📅 <span class="mu" style="font-weight:400">รีเซ็ตทุกวันจันทร์</span></h2>`+WL.map((l,j)=>qcard(l.t,l.n,w.p[l.k]||0,w.c[j],"wclaim("+j+")")).join("")
 +`<h2>🔥 หีบสตรีค</h2>`+sm.map(m=>qcard(`ต่อเนื่อง ${m} วัน`,m,st,sc[m],"sclaim("+m+")")).join("")}
function rareDrop(a,b){const un=ITEMS.map((_,i)=>i).filter(i=>!M.own[i]&&ITEMS[i][2]>=a&&ITEMS[i][2]<=b);return un.length?un[Math.random()*un.length|0]:-1}
const itMsg=pk=>`<br>ได้ไอเทม <b style="color:${RC[ITEMS[pk][2]]}">${E(ITEMS[pk][0])}</b> (${RT[ITEMS[pk][2]]})`;
function claimB(){const q=Q();if(q.c.b||!qlist().every((_,j)=>q.c[j]))return;q.c.b=1;const pk=rareDrop(2,4);let msg="🎉 ครบทุกภารกิจ!<br>🪙 +100";M.coins+=100;if(pk>=0){M.own[pk]=1;msg+=itMsg(pk)}else{M.coins+=100;msg="🎉 ครบทุกภารกิจ!<br>🪙 +200"}save();sync();chestFx(msg)}
function wclaim(j){const w=WQ(),l=WL[j];if(!l||w.c[j]||(w.p[l.k]||0)<l.n)return;w.c[j]=1;const pk=rareDrop(2,3);M.coins+=50;let msg="ภารกิจรายสัปดาห์สำเร็จ!<br>🪙 +50";if(pk>=0){M.own[pk]=1;msg+=itMsg(pk)}else{M.coins+=50;msg="ภารกิจรายสัปดาห์สำเร็จ!<br>🪙 +100"}save();sync();chestFx(msg)}
function sclaim(m){const sc=S.sc=S.sc||{};if(sc[m]||(S.st.streak||0)<m)return;sc[m]=1;const pk=rareDrop(m>=30?3:2,m>=30?4:3);M.coins+=m*10;let msg=`🔥 ต่อเนื่อง ${m} วัน!<br>🪙 +${m*10}`;if(pk>=0){M.own[pk]=1;msg+=itMsg(pk)}save();sync();chestFx(msg)}
/* โหมดฝึกพิเศษ: เพิ่ม ✍️ ฟังแล้วเขียน · 🎯 ทายจากบริบท · 🔁 กู้คำใกล้ลืม */
function mgPay(k,coins,xp,aura,lim){const m=mgMg(),first=(m.n[k]||0)<lim;m.n[k]=(m.n[k]||0)+1;const c=first?coins:0;M.coins+=c;addXp(xp);if(first&&aura)K[aura]+=2;qadd("mg",1);T0=LA=performance.now();save();sync();return{c,first}}
function mgMenu(){const ids=mgIds(),ok=ids.length>=6,T=day(),od=ids.filter(i=>S.c[i][1]<T).length;
 const b=(k,e,t,s)=>`<button class="o" style="text-align:center;margin:0;padding:12px 6px" ${ok?"":"disabled"} onclick="mg('${k}')"><span style="font-size:26px">${e}</span><br><b>${t}</b><br><span class="mu">${s}</span></button>`;
 return `<h2>โหมดฝึกพิเศษ <button class="ghost" style="margin:0 0 0 6px;padding:2px 10px;font-size:12px" onclick="guide('sp')">วิธีเล่น</button></h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${b("sp","⚡","Speed Round","60 วินาที")}${b("mt","🧩","จับคู่คำ","15 คำ 3 รอบ")}${b("od","🔤","เรียงประโยค","5 ประโยค")}${b("bs",BE(),"ด่านบอส","สู้กับคำที่พลาดบ่อย")}${b("wb","🧬","แยกร่างคำ","ต่อตัวอักษร 8 คำ")}${b("cp","⚖️","คู่สับสน","8 ข้อ")}${b("dc","✍️","ฟังแล้วเขียน","5 ประโยค")}${b("cx","🎯","ทายจากบริบท","8 ข้อ")}</div><button class="o" style="text-align:center;margin-top:8px;border-color:${od?"var(--no)":"var(--bd)"}" ${ok&&od?"":"disabled"} onclick="mg('rs')">🔁 <b>ด่านกู้คำใกล้ลืม</b><br><span class="mu">${od?od+" คำเลยกำหนด · ได้โบนัสเมื่อกู้คืนได้":"ยังไม่มีคำค้าง เยี่ยมมาก"}</span></button>${ok?"":`<div class="mu" style="margin-top:6px">เรียนให้ครบ 6 คำก่อน จึงจะเล่นโหมดพิเศษได้</div>`}`}
function mg(k){const ids=mgIds();if(ids.length<6)return;mgStop();qz(1);stg(1,0);({sp:spStart,mt:mtStart,od:odStart,bs:bsStart,wb:wbStart,cp:cpStart,dc:dcStart,cx:cxStart,rs:rsStart})[k](ids)}
/* ✍️ ฟังแล้วเขียน */
function dcStart(ids){const qs=shuf(ids.filter(i=>D[i].x.split(" ").length<=9)).slice(0,5);if(qs.length<3){alert("ต้องเรียนคำที่มีประโยคตัวอย่างสั้นอย่างน้อย 3 คำ");return home()}MG={m:"dc",qs,n:0,ok:0,miss:[]};dcQ()}
function dcQ(){const g=MG,id=g.qs[g.n],d=D[id];g.id=id;g.done=0;
 app.innerHTML=`<div class="hud"><span>ข้อ ${g.n+1}/${g.qs.length} · ✅ ${g.ok}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.n/g.qs.length*100}%"></i></div><div class="q"><div class="mu">ฟังประโยคแล้วพิมพ์ให้ถูก</div><button class="sp" style="font-size:52px" onclick="say(D[${id}].x)">🔊</button><div class="mu" style="margin-top:6px">${E(d.y)}</div></div><input type="text" id="inp" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="พิมพ์ประโยคที่ได้ยิน"><button class="go" id="go" onclick="dcChk()">ตรวจคำตอบ</button><div id="fb"></div>`;say(d.x);$("#inp").focus()}
function dcChk(){const g=MG;if(!g||g.m!=="dc"||g.done)return;const i=$("#inp"),d=D[g.id],v=i.value.trim();if(!v)return;g.done=1;i.disabled=true;const ok=nrm(v)===nrm(d.x),tk=v.split(/\s+/).map(nrm);ok?g.ok++:g.miss.push(g.id);sfxOn(ok);
 const h=d.x.split(" ").map(w=>tk.includes(nrm(w))?E(w):`<b style="color:var(--no)">${E(w)}</b>`).join(" ");
 $("fb").innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"ถูกต้อง":"ประโยคที่ถูกคือ"}</b> · ${h}<br><span class="mu">${E(d.y)}</span></div>`;
 const b=$("go");b.textContent=g.n+1>=g.qs.length?"ดูผล":"ต่อไป";b.onclick=()=>{g.n++;g.n>=g.qs.length?dcEnd():dcQ()}}
function dcEnd(){const g=MG,xp=g.ok*8,p=mgPay("dc",g.ok*3,xp,"s",3);mgRes("✍️ ฟังแล้วเขียนเสร็จแล้ว!",`<div class="big" style="margin:10px 0">${g.ok}<small> / ${g.qs.length}</small></div>`,[...new Set(g.miss)],p,xp,3);MG=null}
/* 🎯 ทายจากบริบท */
function cxStart(ids){const c=shuf(ids.filter(i=>clz(D[i]))).sort((a,b)=>S.c[a][0]-S.c[b][0]).slice(0,8);if(c.length<4){alert("ต้องเรียนคำที่ใช้เติมประโยคได้อย่างน้อย 4 คำ");return home()}MG={m:"cx",qs:c,pool:ids.filter(i=>clz(D[i])),n:0,ok:0,miss:[]};cxQ()}
function cxQ(){const g=MG,id=g.qs[g.n],d=D[id],pos=d.p.split(/[ ,.]/)[0],bad=i=>i===id||D[i].w===d.w||D[i].t===d.t;
 let pl=shuf(g.pool.filter(i=>!bad(i)&&D[i].p.split(/[ ,.]/)[0]===pos)).slice(0,3);if(pl.length<3)pl=pl.concat(shuf(g.pool.filter(i=>!bad(i)&&!pl.includes(i))).slice(0,3-pl.length));
 g.o=fitL(d,shuf([d.w,...pl.map(i=>D[i].w)]));g.k=fitW(d,d.w);g.id=id;g.lock=0;
 app.innerHTML=`<div class="hud"><span>ข้อ ${g.n+1}/${g.qs.length} · ✅ ${g.ok}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.n/g.qs.length*100}%"></i></div><div class="q"><div class="mu">เลือกคำที่เติมในประโยค</div><div style="font-size:21px;margin-top:8px">${blank(d)}</div><div class="mu" style="margin-top:8px">${E(d.y)}</div></div>`+g.o.map((o,i)=>`<button class="o" onclick="cxPick(${i})">${E(o)}</button>`).join("")}
function cxPick(i){const g=MG;if(!g||g.m!=="cx"||g.lock)return;g.lock=1;const ok=g.o[i]===g.k,d=D[g.id];
 document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(g.o[j]===g.k)b.classList.add("ok");else if(j===i)b.classList.add("no")});
 ok?g.ok++:g.miss.push(g.id);sfxOn(ok);say(d.x);
 setTimeout(()=>{if(MG!==g)return;g.n++;g.n>=g.qs.length?cxEnd():cxQ()},ok?900:1500)}
function cxEnd(){const g=MG,xp=g.ok*7,p=mgPay("cx",g.ok*3,xp,"a",3);mgRes("🎯 ทายจากบริบทเสร็จแล้ว!",`<div class="big" style="margin:10px 0">${g.ok}<small> / ${g.qs.length}</small></div>`,[...new Set(g.miss)],p,xp,3);MG=null}
/* 🔁 กู้คำใกล้ลืม */
function rsStart(){const T=day(),q=mgIds().filter(i=>S.c[i][1]<T).sort((a,b)=>S.c[a][1]-S.c[b][1]).slice(0,10);if(!q.length){alert("ยังไม่มีคำค้างทบทวน");return home()}MG={m:"rs",q:shuf(q),n:0,ok:0,miss:[]};rsQ()}
function rsQ(){const g=MG,id=g.q[g.n],d=D[id],th=Math.random()<.5;g.id=id;g.k=th?d.w:d.t;g.o=opts(id,th?"w":"t");g.lock=0;
 app.innerHTML=`<div class="hud"><span>กู้แล้ว ${g.ok} / ${g.q.length}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.n/g.q.length*100}%"></i></div><div class="q">${th?`<div class="mu">เลือกคำอังกฤษ</div>${tm(d)}${nt(d)}`:`<div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}`}</div>`+g.o.map((o,i)=>`<button class="o" onclick="rsPick(${i})">${E(o)}</button>`).join("")}
function rsPick(i){const g=MG;if(!g||g.m!=="rs"||g.lock)return;g.lock=1;const ok=g.o[i]===g.k,id=g.id,c=S.c[id],T=day();
 document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(g.o[j]===g.k)b.classList.add("ok");else if(j===i)b.classList.add("no")});
 if(ok){g.ok++;c[0]=Math.min(6,c[0]+1);c[1]=T+INT[c[0]]}else{g.miss.push(id);c[0]=Math.max(1,c[0]-2);c[1]=T;c[2]=(c[2]||0)+1}
 save();sfxOn(ok);say(D[id].w);setTimeout(()=>{if(MG!==g)return;g.n++;g.n>=g.q.length?rsEnd():rsQ()},ok?600:1200)}
function rsEnd(){const g=MG,xp=g.ok*6,p=mgPay("rs",g.ok*2,xp,"e",3);mgRes("🔁 กู้คำเสร็จแล้ว!",`<div class="big" style="margin:10px 0">${g.ok}<small> / ${g.q.length} คำ</small></div><div class="mu">คำที่กู้ได้ถูกนัดทบทวนห่างออกไปแล้ว</div>`,[...new Set(g.miss)],p,xp,3);MG=null}

/* 🗼 หอคอยคำศัพท์ 400 ชั้น */
const TW=()=>S.tw||(S.tw={b:0,pf:{},rd:{d:0,n:0},run:null});
const TWB={cat:{t:"XP ×1.25",xm:1.25},dog:{t:"โล่กันพลาดข้อแรกของชั้น",sh:1},pig:{t:"หัวใจ +1",h:1},bear:{t:"หัวใจ +1",h:1},fox:{t:"เหรียญ ×1.25",cm:1.25},rabbit:{t:"ฟื้นหัวใจ 1 ดวงทุกคอมโบ 5",rg:1},hamster:{t:"เหรียญ ×1.25",cm:1.25},tiger:{t:"XP ×1.5",xm:1.5},gm:{t:"หัวใจ +1 และโล่",h:1,sh:1}};TWB.wolf={t:"XP ×1.25",xm:1.25};TWB.koala={t:"หัวใจ +1",h:1};TWB.lion={t:"XP ×1.5",xm:1.5};
const twB=()=>TWB[K.sp||"cat"]||TWB.gm,twL=f=>Math.min(4,Math.ceil(f/100)),twBoss=f=>f%10==0;
const TWE=["👾","🦇","🕷️","🐍","🦂","👻","🧟","🐺"],TWBE=["👹","🐉","🦖","🐙","👿"];
function twPick(f,N){const l=twL(f),T=day(),pool=[];D.forEach((d,i)=>{if(d.l===l)pool.push(i)});
 const pr=shuf(pool.filter(i=>S.c[i]&&(S.c[i][1]<=T||S.c[i][2]>0))).slice(0,Math.round(N*.3)),s=new Set(pr);
 return shuf([...pr,...shuf(pool.filter(i=>!s.has(i))).slice(0,N-pr.length)])}
function twMode(id,f){const d=D[id];if(!S.c[id])return"th2en";const ff=(f-1)%100+1;let p=ff<=30?0:ff<=70?.3:.6;if(twBoss(f))p=Math.min(.85,p+.2);
 if(Math.random()<p)return"spell";if(clz(d)&&ff>30&&Math.random()<.35)return"cloze";return Math.random()<.5?"en2th":"th2en"}
function twStart(f){const b=twB(),N=twBoss(f)?20:10,hm=3+(b.h||0);mgStop();qz(1);stg(0,0);BT={fx:[],pt:[],in:performance.now()};
 MG={m:"tw",f,N,ok:0,w:0,hp:hm,hm,sh:b.sh||0,combo:0,q:twPick(f,N),seen:{},bad:[]};TW().run=null;twQ()}
function twResume(){const r=TW().run;if(!r)return;mgStop();qz(1);stg(0,0);BT={fx:[],pt:[],in:performance.now()};MG=Object.assign({m:"tw"},JSON.parse(JSON.stringify(r)));twQ()}
function twSave(){const{f,N,ok,w,hp,hm,sh,combo,q,seen,bad}=MG;TW().run={f,N,ok,w,hp,hm,sh,combo,q,seen,bad};save()}
function twHud(g){const boss=twBoss(g.f),fd=twFoe(g.f),pn=K.nm||SPC[K.sp||"cat"].th,fnm=boss?fd.nm:(fd.stage>=3?fn(fd.form,fd.stage==4,fd.species):(SPC[fd.species]||SPC.cat).th+"ตัวร้าย");
 return `<div class="hud"><span>🗼 ชั้น ${g.f}${boss?" · 👿 "+E(twBossDef(g.f).nm):""} · ${LV[twL(g.f)]}</span><span>${"❤️".repeat(g.hp)}${"🖤".repeat(g.hm-g.hp)}${g.combo>1?" 🔥"+g.combo:""}</span><button class="ghost" onclick="home()">ออก</button></div><div class="pg"><i style="width:${g.ok/g.N*100}%"></i></div><div style="display:flex;justify-content:space-between;gap:12px;margin:4px 0 6px;font-size:17px;font-weight:700;line-height:1.3"><span style="color:#7fd0ff;flex:1;min-width:0;overflow-wrap:anywhere">🐾 ${E(pn)}</span><span style="color:${boss?"#ffb13b":"#ff8a8a"};flex:1;min-width:0;text-align:right;overflow-wrap:anywhere">${boss?"👑":"👾"} ${E(fnm)}</span></div><canvas id="bt" width="160" height="96" style="width:100%;display:block;image-rendering:pixelated;border:3px solid #2a2150;border-radius:12px;background:#000"></canvas><div class="mu" style="text-align:center">${g.ok} / ${g.N}</div>`}
function twQ(){const g=MG;if(!g||g.m!=="tw")return;if(g.ok>=g.N)return twWin();const id=g.q[0],d=D[id];
 if(false){g.seen[id]=1;say(d.w);app.innerHTML=twHud(g)+`<div class="q"><div class="mu">คำใหม่ · จำไว้แล้วลุยต่อ</div><div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}<div class="th" style="margin-top:10px">${E(d.t)}</div></div><div class="fb">${hl(d)}<br><span class="mu">${E(d.y)}</span></div><button class="go" id="go" onclick="twQ2()">ต่อไป: ทดสอบ</button>`;return}
 twQ2()}
function twQ2(){const g=MG;if(!g||g.m!=="tw")return;const id=g.q[0],d=D[id],m=g.md=twMode(id,g.f);let q,key=null;g.id=id;g.o=null;g.lock=0;
 if(m=="en2th"){q=`<div class="w">${E(d.w)} <button class="sp" onclick="say(D[${id}].w)">🔊</button></div>${nt(d)}`;key="t"}
 else if(m=="th2en"){q=`${tm(d)}${nt(d)}`;key="w"}
 else if(m=="cloze"){q=`<div style="font-size:21px">${blank(d)}</div><div class="mu" style="margin-top:8px">${E(d.y)}</div>`;key="w"}
 else q=`${tm(d)}${nt(d)}<div class="mu" style="margin-top:8px">ขึ้นต้นด้วย “${E(d.w[0])}” · ${d.w.replace(/[^a-z]/gi,"").length} ตัวอักษร</div>`;
 if(key){g.k=d[key];g.o=opts(id,key);if(m=="cloze"){g.k=fitW(d,g.k);g.o=fitL(d,g.o)}}
 app.innerHTML=twHud(g)+`<div class="q">${q}</div>`+(g.o?g.o.map((o,i)=>`<button class="o" onclick="twAns(${i})">${E(o)}</button>`).join(""):`<input type="text" id="inp" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="พิมพ์คำภาษาอังกฤษ"><button class="go" id="go" onclick="twSub()">ตรวจคำตอบ</button>`)+`<div id="fb"></div>`;
 if(!g.o)$("#inp").focus()}
function twAns(i){const g=MG;if(!g||g.m!=="tw"||g.lock)return;const ok=g.o[i]===g.k;
 document.querySelectorAll(".o").forEach((b,j)=>{b.disabled=true;if(g.o[j]===g.k)b.classList.add("ok");else if(j===i)b.classList.add("no")});twRes(ok)}
function twSub(){const g=MG;if(!g||g.m!=="tw"||g.lock)return;const i=$("#inp"),v=nrm(i.value);if(!v)return;i.disabled=true;
 const d=D[g.id],nm=o=>o.w.split(/[,\/]/).map(nrm),gr=grade(d,v);let ok=gr>0;
 if(!ok&&D.some(o=>o.t===d.t&&o.w!==d.w&&nm(o).includes(v)))ok=true;twRes(ok,gr==1)}
function twRes(ok,hf){const g=MG;if(!g||g.lock)return;g.lock=1;const id=g.id,d=D[id],c=S.c[id],T=day(),b=twB(),old=document.querySelector("#go");if(old)old.remove();
 if(c){if(hf){c[1]=Math.min(c[1],T+1)}else if(ok){c[0]=Math.min(6,c[0]+1);c[1]=T+INT[c[0]]}else{c[0]=g.bad.includes(id)?c[0]:Math.max(1,c[0]-2);c[1]=T;c[2]=(c[2]||0)+1}}
 g.q.shift();
 if(ok){g.ok++;g.combo++;qadd("ok",1);if(g.md=="spell")qadd("hd",1);if(c)qadd("rv",1);if(b.rg&&g.combo%5==0&&g.hp<g.hm)g.hp++}
 else{g.combo=0;g.w++;if(!g.bad.includes(id))g.bad.push(id);g.q.push(id);if(g.sh){g.sh=0;BT.blk=1}else{g.hp--;BT.blk=0}}
 sfxOn(ok);say(d.w);twSave();
 {const n=performance.now();if(ok){BT.pa=n;BT.h1=0;BT.crit=g.combo%5==0;if(g.ok>=g.N){BT.ko=n+420;BT.kf=0}}else{BT.ba=n;BT.h2=0;if(g.hp<=0)BT.pko=n+500}}
 const fb=$("fb");
 if(ok){fb.innerHTML=hf?`<div class="fb ok"><b>ถูกคำ แต่รูปคำไม่ตรงประโยค</b> · ที่ถูกคือ ${E(d.w)}</div>`:g.md=="spell"?`<div class="fb ok"><b>ถูกต้อง</b> · ${E(d.w)} · ${E(d.t)}</div>`:"";setTimeout(()=>{if(MG===g)twQ()},g.ok>=g.N?1700:hf?1700:g.md=="spell"?1150:850)}
 else fb.innerHTML=`<div class="fb no"><b>คำตอบ: ${E(d.w)}</b> · ${E(d.t)}<br>${hl(d)}<br><span class="mu">${E(d.y)}</span></div>${g.hp<=0?`<div class="mu">หัวใจหมดแล้ว</div>`:`<div class="mu">คำนี้จะวนกลับมาถามอีก</div>`}<button class="go" id="go" onclick="twNext()">ต่อไป</button>`}
function twNext(){const g=MG;if(!g||g.m!=="tw")return;g.hp<=0?twFail():twQ()}
function twWin(){const g=MG,f=g.f,tw=TW(),b=twB(),boss=twBoss(f),l=twL(f),T=day();let c=0,xp=0,msg="",cap=0;
 if(f>tw.b){tw.b=f;const rd=tw.rd.d===T?tw.rd:(tw.rd={d:T,n:0});
  if(rd.n<10){rd.n++;c=Math.round((boss?40:6)*LVB[l]*(b.cm||1))}else cap=1;
  if(!g.w&&!tw.pf[f]){tw.pf[f]=1;c+=3;msg+=`<div style="margin-top:8px">⭐ ชั้นสมบูรณ์แบบ +🪙 3</div>`}
  xp=Math.round(g.N*2*(b.xm||1));
  if(boss){qadd("bw",1);const pk=rareDrop(f%100==0?3:2,f%100==0?4:3);if(pk>=0){M.own[pk]=1;msg+=`<div style="margin-top:8px">🎁 บอสทิ้งไอเทม${itMsg(pk)}</div>`}}}
 M.coins+=c;addXp(xp);K.a+=boss?3:1;tw.run=null;T0=LA=performance.now();const ev=evo();save();sync();
 qz(0);stg(1,0);sinfo();
 app.innerHTML=`<div class="q"><div style="font-size:48px">${boss?"🏆":"🗼"}</div><div style="font-size:20px"><b>ผ่านชั้น ${f}!</b></div><div class="mu" style="margin-top:6px">พลาด ${g.w} ครั้ง · ⭐ +${xp} · 🪙 +${c}</div>${cap?`<div class="mu">วันนี้รับเหรียญครบ 10 ชั้นแล้ว (ยังได้ ⭐ ตามปกติ)</div>`:""}${msg}${ev?`<div style="margin-top:8px;color:var(--ac)">${ev}</div>`:""}</div>${f<400?`<button class="go" onclick="twStart(${f+1})">ปีนชั้น ${f+1}${twBoss(f+1)?" (บอส)":""}</button>`:`<div class="fb ok">🎉 พิชิตครบ 400 ชั้นแล้ว!</div>`}<button class="ghost" onclick="home()">กลับหอคอย</button>`;MG=null;if(ev)evoFx()}
function twFail(){const g=MG,f=g.f;TW().run=null;save();qz(0);stg(1,0);sinfo();
 app.innerHTML=`<div class="q"><div style="font-size:48px">💀</div><div style="font-size:20px"><b>หัวใจหมดที่ชั้น ${f}</b></div><div class="mu" style="margin-top:6px">ไม่เสียอะไร ลองใหม่ด้วยชุดคำใหม่ได้เลย ถูกแล้ว ${g.ok} / ${g.N}</div></div>${g.bad.length?`<h2>คำที่พลาด</h2>`+g.bad.map(i=>`<div class="cd"><b>${E(D[i].w)}</b> <button class="sp" style="font-size:16px" onclick="say(D[${i}].w)">🔊</button> — ${E(D[i].t)}</div>`).join(""):""}<button class="go" onclick="twStart(${f})">🔁 ลองชั้น ${f} ใหม่</button><button class="ghost" onclick="home()">กลับหอคอย</button>`;MG=null}
function towerPage(){const tw=TW(),b=tw.b,f=Math.min(400,b+1),done=b>=400,boss=twBoss(f),l=twL(f),B=twB(),run=tw.run,rd=tw.rd.d===day()?tw.rd.n:0;
 const bars=[1,2,3,4].map(v=>{const n=Math.max(0,Math.min(100,b-(v-1)*100));return `<div class="mu">${LV[v]} · ${LVN[v]} <span style="float:right">${n} / 100</span></div><div class="bar" style="margin:4px 0 10px"><i style="width:${n}%;background:var(--ac)"></i></div>`}).join("");
 const pets=Object.keys(S.pets).map(sp=>{const C=SPC[sp],p=S.pets[sp],on=S.pet===sp,bb=TWB[sp]||TWB.gm;return `<button class="o" style="${on?"border-color:var(--ac)":""}" ${on?"":`onclick="setPet('${sp}')"`}>${C.e} ${p.nm?E(p.nm):C.th} <span class="mu">· ${bb.t}${on?" · ใช้อยู่":""}</span></button>`}).join("");
 app.innerHTML=`<div class="hero"><div style="font-size:54px">🗼</div><div><div class="mu">หอคอยคำศัพท์</div><div style="font-size:24px;font-weight:700">${done?"พิชิตครบ 400 ชั้น!":"ผ่านแล้ว "+b+" ชั้น"}</div><div class="mu">เหรียญชั้นใหม่วันนี้ ${Math.min(10,rd)} / 10</div></div></div>`
 +(done?"":`<button class="cta" onclick="twStart(${f})">▶ ปีนชั้น ${f}${boss?" (บอส)":""}<small>${LV[l]} · ${boss?20:10} ข้อ · ผิดได้ ${3+(B.h||0)} ครั้ง</small></button>`)
 +(run?`<button class="o" style="text-align:center;border-color:var(--ac);margin-top:10px" onclick="twResume()">⏯ เล่นต่อชั้น ${run.f} (ถูก ${run.ok} / ${run.N})</button>`:"")
 +`<div class="mu" style="margin:10px 0">คำสุ่มจากระดับของชั้นนั้น ผิดแล้วคำวนกลับมาถามอีก ชั้นสูงมีข้อพิมพ์มากขึ้น คำที่เคยเรียนจะอัปเดตตารางทบทวนด้วย</div><button class="ghost" onclick="TAB=3;RKM=1;home()">🏆 อันดับหอคอย</button><h2>ความคืบหน้า</h2>${bars}<h2>เลือกสัตว์ที่จะปีน</h2>${pets}`}


const IT=n=>ITEMS.findIndex(i=>i[0]==n);
const BPOOL={h:["Witch Hat","Pirate Hat","Viking Helm","Dragon Helm","Dark Halo","Shadowflame Crown"],g:["Little Bat Wings","Raven Wings","Dragon Wings","Shadow Flame Wings","Void Dragon Wings"],t:["Black Flame Tail","Flame Tail","Ghost Wisp Tail","Abyss Flame Tail"],w:["Bone Staff","Hammer","Shadow Lantern","Lava Trident","Abyss Trident"],n:["Wolf Fur Ruff","Shadow Spike Collar","Velvet Cape","Dark Crystal Pendant"],f:["Little Spirit","Fire Spirit","Nameless Shadowflame"]};
function twBossDef(f){const i=f/10,l=twL(f),big=f%100==0,r=n=>{let a=Math.imul(f*7919+n*104729,2246822519)>>>0;a=Math.imul(a^a>>>15,3266489917)>>>0;return((a^a>>>13)>>>0)%1000/1000};
 const sps=["pig","dog","bear","fox","cat","rabbit","hamster","tiger"],sp=f==400?"dgn":sps[(i*3+(i>>3))%8],sks=Object.keys(SKD[sp]||{}),dk2=["zombie","hallo"],
 sk=sp=="dgn"?null:(r(1)<.6?dk2[i%2]:sks[(i*5)%sks.length]),forms=["demon","cerb","fallen","poison","storm","gaia"],form=f==400?"divdrag":forms[(i*7+l)%6],eq={};
 Object.keys(BPOOL).forEach((sl,j)=>{if(j<2+l||big){const a=BPOOL[sl];eq[sl]=IT(a[Math.min(a.length-1,Math.floor(r(j+3)*a.length)+(l>2?1:0))])}});
 return{species:sp,sk,form,stage:4,seed:f,words:2000,eq,evil:1,tint:["#2a8a2a","#6a1aa0","#b01020","#101018"][l-1],bg:-1,nm:fn(form,1,sp),s:big?1.55:1.3+l*.03}}
function btBoss(cx,gy,s,k,t,fl){const B=BT;if(!B.bd||B.bf!==MG.f){B.bd=twFoe(MG.f);B.bf=MG.f;B.bc=Object.assign(document.createElement("canvas"),{width:64,height:64})}
 const d=B.bd,sc=d.s*(1+.025*Math.sin(t/330)),w=64*sc,a=x.globalAlpha,X=Math.round(cx-w/2),Y=Math.round(gy-57*sc),W=Math.round(w);drawOther(B.bc,d,t);
 ell(cx,gy-w*.4,w*.42,w*.45,d.tint,.16+.06*Math.sin(t/250));x.globalAlpha=a;x.drawImage(B.bc,X,Y,W,W);
 if(fl){x.globalAlpha=.5*a;x.globalCompositeOperation="lighter";x.drawImage(B.bc,X,Y,W,W);x.globalCompositeOperation="source-over"}
 for(let i=0;i<6;i++){const u=(t/900+i/6)%1;x.globalAlpha=(1-u)*.6*a;R(cx-w*.35+i*w*.14+Math.sin(t/200+i)*2,gy-20-u*w*.8,2,3,i%2?"#ff2a2a":d.tint)}x.globalAlpha=a}

function twMonDef(f){const l=twL(f),r=n=>{let a=Math.imul(f*6151+n*130363,2246822519)>>>0;a=Math.imul(a^a>>>15,3266489917)>>>0;return((a^a>>>13)>>>0)%1000/1000};
 const sps=["pig","dog","bear","fox","cat","rabbit","hamster","tiger"],sp=sps[Math.floor(r(1)*8)],sks=Object.keys(SKD[sp]),
 sk=r(2)<.45?["zombie","hallo"][Math.floor(r(3)*2)]:r(4)<.7?sks[Math.floor(r(5)*sks.length)]:null,
 stage=l==1?2:l==2?3:(r(6)<.5?3:4),forms=["demon","cerb","fallen","poison","storm","gaia"],form=forms[Math.floor(r(7)*6)],eq={},
 cols=["#2a8a2a","#6a1aa0","#b01020","#1a5aa8","#a86a10","#10808a","#a01a70","#404048"],n=l==1?0:Math.min(3,Math.floor(r(8)*(l+1))),sl=Object.keys(BPOOL);
 for(let j=0;j<n;j++){const k=sl[Math.floor(r(9+j)*6)],a=BPOOL[k];eq[k]=IT(a[Math.min(a.length-1,Math.floor(r(20+j)*(l+1)))])}
 return{species:sp,sk,form,stage,seed:f*13,words:2000,eq,evil:1,tint:cols[Math.floor(r(10)*8)],bg:-1,nm:"",s:1.05+l*.04+r(11)*.1}}
const twFoe=f=>twBoss(f)?twBossDef(f):twMonDef(f);
let RKM=0;function rkm(v){RKM=v;rankPage()}
/* 🎬 ฉากต่อสู้พิกเซล: สัตว์เลี้ยง vs บอส */
let BT={fx:[],pt:[]};
const BM=[["#4fd36a","#ffe066",""],["#8a5ad0","#ffe066","wF"],["#3a3a4a","#ff4040","l"],["#e8eefc","#334466","gF"],["#7a9a5a","#ffe066","ea"],["#8a8f9a","#ffd23a","eft"],["#c2452b","#ffffff","kt"],["#ff8a2b","#ffffff","hw"],["#b8322a","#ffe066","haf"],["#2e9a5a","#ffe066","hwtf"],["#8f8270","#7fe0a8","ba"],["#7a3aa8","#ffd23a","u"],["#2a1a3a","#ff3a3a","hwcf"]];
function btMon(cx,gy,s,k,t,fl){const m=BM[k],f=m[2],h=ch=>f.includes(ch),C=c=>fl?"#ffffff":c,r=Math.round,bd=C(m[0]),o=C(dk(m[0],.55)),
 fy=h("F")?9+Math.sin(t/300)*3:h("u")?7:0,rx=r(13*s),ry=r((h("g")?12:h("b")?11:9)*s),X=r(cx),Y=r(gy-ry-fy-Math.sin(t/260)*1.2),sg=Math.sin(t/110);
 if(h("l"))for(let i=0;i<4;i++)for(const d of[-1,1])ln([X+d*rx*.5,Y+2],[X+d*(rx+7+i*2),Y+ry+1-i*2+(i%2?sg:-sg)*2],o);
 if(h("w")){const fp=Math.sin(t/90)*5;for(const d of[-1,1])pol([[X+d*rx*.5,Y-2],[X+d*(rx+15*s),Y-13*s+fp],[X+d*(rx+9*s),Y+4*s],[X+d*rx*.5,Y+4]],C(dk(m[0],.8)))}
 if(h("t"))for(let i=0;i<9;i++)R(X+rx-2+i*1.3,Y+ry-3-i*1.7+Math.sin(t/200+i)*1.5,3,3,i>6&&h("k")?C("#ffd23a"):bd);
 if(h("u"))for(let i=0;i<5;i++)for(let j=0;j<8;j++)R(X-rx+3+i*(rx*2-8)/4+Math.sin(t/170+i+j*.5)*2,Y+ry-3+j*1.6,3,2,j%2?bd:o);
 if(h("g"))x.globalAlpha=.85;
 if(h("b")){R(X-rx-1,Y-ry-1,2*rx+2,2*ry+2,o);R(X-rx,Y-ry,2*rx,2*ry,bd);ln([X-3,Y-ry+2],[X+2,Y],o);ln([X+2,Y],[X-1,Y+ry-3],o);R(X-rx,Y-ry,2*rx,3,C(mix(m[0],"#ffffff",.3)))}
 else{ell(X,Y,rx+1,ry+1,o,1);ell(X,Y,rx,ry,bd,1);ell(X-r(rx*.3),Y-r(ry*.45),r(rx*.35),r(ry*.22),C(mix(m[0],"#ffffff",.3)),1);
  if(h("g"))for(let i=-rx;i<rx;i+=4)R(X+i,Y+ry-1,3,2+(((i>>2)+(t/180|0))&1)*3,bd)}
 if(h("e"))for(const d of[-1,1])pol([[X+d*rx*.75,Y-ry+4],[X+d*rx,Y-ry-8*s],[X+d*rx*.3,Y-ry+1]],bd);
 if(h("h"))for(const d of[-1,1])pol([[X+d*rx*.55,Y-ry+3],[X+d*rx*.95,Y-ry-9*s],[X+d*rx*.2,Y-ry]],C("#f4efe6"));
 if(h("c")){R(X-7,Y-ry-5,14,4,C("#ffd23a"));for(let i=0;i<4;i++)R(X-7+i*4,Y-ry-8,2,3,C("#ffd23a"))}
 const ey=Y-r(ry*.2),ex=r(rx*.42);
 for(const d of[-1,1]){const px=X+d*ex;R(px-2,ey-2,5,4,C("#ffffff"));R(px-d,ey-1,2,3,C(m[1]=="#ffffff"?"#aa2222":m[1]));ln([px+d*3,ey-4],[px-d*2,ey-2],o)}
 R(X-4,Y+r(ry*.4),8,2,C("#2a0a12"));if(h("f")){R(X-3,Y+r(ry*.4),2,3,C("#ffffff"));R(X+2,Y+r(ry*.4),2,3,C("#ffffff"))}
 if(h("a"))for(const d of[-1,1]){R(X+d*(rx+1)-2,r(Y+ry*.1+sg*d),4,r(8*s),bd);R(X+d*(rx+1)-3,r(Y+ry*.1+8*s+sg*d),6,5,o)}
 if(h("k"))for(const d of[-1,1]){R(X+d*(rx+3)-3,Y-1,6,5,bd);R(X+d*(rx+5),Y,3,1,o)}
 x.globalAlpha=1}
function btSpark(n,px,py,cl){for(let i=0;i<n;i++)BT.pt.push({x:px,y:py,vx:(Math.random()-.5)*5,vy:-Math.random()*3-.5,l:1,c:cl[i%cl.length]})}
function btDraw(cv,t){const g=MG,c=cv.getContext("2d"),now=performance.now(),sv=x,B=BT,r=Math.round;c.imageSmoothingEnabled=false;x=c;
 try{const f=g.f,boss=twBoss(f),l=twL(f),s=boss?1.55:1,k=boss?8+((f/10-1)%5):f%8,BX=boss?112:118,GR=88,dt=Math.min(50,now-(B.lt||now));B.lt=now;c.clearRect(0,0,160,112);if(boss&&!B.bi){B.bi=1;B.fx.push({x:80,y:44,t:'BOSS!',c:'#ff5d5d',l:1.5})}
  const wc=["","#2a3a5a","#3a2a5a","#5a2a3a","#1a2a2a"][l],wb=boss?mix(wc,"#40100a",.45):wc;
  R(0,0,160,GR,wb);for(let y=0;y<GR;y+=8){R(0,y,160,1,dk(wb,.7));for(let xx=(y/8&1)*8;xx<160;xx+=16)R(xx,y,1,8,dk(wb,.7))}
  R(0,0,160,12,"rgba(0,0,0,.25)");
  for(const xx of[20,80,140]){ell(xx+1,22,13,13,"#ff9a2b",.08);R(xx,22,2,8,"#6a4a2a");ell(xx+1,20-((now/90+xx)%3|0),3,4,"#ff9a2b",1);ell(xx+1,21,1,2,"#ffe066",1)}
  R(0,GR,160,8,dk(wb,.5));R(0,GR,160,1,mix(wc,"#ffffff",.3));for(let xx=0;xx<160;xx+=20)R(xx,GR+1,1,7,dk(wb,.35));
  const att=a=>a<0||a>700?0:a<250?(a/250)**2:a<360?1:1-(a-360)/340,pa=now-(B.pa||-1e5),ba=now-(B.ba||-1e5),pu=att(pa),bu=att(ba),
   ko=B.ko?now-B.ko:-1,pko=B.pko?now-B.pko:-1,tx=BX-14*s-40,bxs=BX+Math.max(0,1-(now-(B.in||0))/450)*70,bX=bxs-(BX-(56+14*s))*bu;
  if(pa>=250&&!B.h1){B.h1=1;btSpark(14,BX-14*s,GR-14,["#ffffff","#ffe066","#ff9a2b"]);B.fx.push({x:BX-8,y:GR-32*s,t:B.crit?"CRITICAL!":"HIT!",c:B.crit?"#ff9a2b":"#ffe066",l:1})}
  if(ba>=250&&!B.h2){B.h2=1;btSpark(12,58,GR-16,["#ffffff","#ff5d5d"]);B.fx.push({x:36,y:GR-44,t:B.blk?"BLOCK":"-1",c:B.blk?"#7fd0ff":"#ff5d5d",l:1})}
  if(ko>=0&&!B.kf){B.kf=1;btSpark(46,BX,GR-18,["#ffffff","#ffe066","#ff9a2b","#ff5d5d"])}
  if(ko<0||ko<800){ell(r(bX),GR,r(14*s),2,"#000",.4);if(boss)ell(r(bX),GR-14,24,22,["","#7fd0ff","#c26bff","#ff5d5d","#ff9a2b"][l],.1+.05*Math.sin(now/300));
   x.globalAlpha=ko>=0?1-ko/800:1;btBoss(bX+(pa>=250&&pa<450?(now%50<25?-2:2):0),GR,s,k,now,(pa>=250&&pa<400)||(ko>=0&&((ko/70|0)&1)==0));x.globalAlpha=1}
  const PD={seed:K.seed|0,form:K.form,stage:K.stage,words:K.n||0,species:K.sp||"cat",sk:K.sk,cs:K.cs,eq:M.eq,bg:-1,nb:1,bc:K.bc};
  B.pc=B.pc||Object.assign(document.createElement("canvas"),{width:64,height:64});drawOther(B.pc,PD,now);
  const dsh=pu>0&&pu<1,ox=(tx-6)*pu,oy=(B.crit&&dsh?-Math.sin(Math.min(1,pa/250)*Math.PI)*10:0)-(dsh?Math.abs(Math.sin(now/45))*2:0),kb=ba>=250&&ba<450?4:0,pxp=r(6+ox-kb),py=GR-57+r(oy);
  ell(pxp+32,GR,16,2,"#000",.4);
  if(pko>=0){c.save();c.globalAlpha=.65;c.translate(pxp+40,GR-2);c.rotate(-Math.min(1,pko/350)*1.45);c.drawImage(B.pc,-40,py-GR+2);c.restore()}
  else{c.globalAlpha=(ba>=250&&ba<450&&((now/60|0)&1))?.35:1;c.drawImage(B.pc,pxp,py);c.globalAlpha=1}
  B.pt=B.pt.filter(p=>{p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.vy+=.15*dt/16;p.l-=dt/600;if(p.l<=0)return false;x.globalAlpha=p.l;R(p.x,p.y,2,2,p.c);x.globalAlpha=1;return true});
  c.font="bold 9px sans-serif";c.textAlign="center";c.lineWidth=2;c.strokeStyle="#000";
  B.fx=B.fx.filter(e=>{e.y-=.03*dt;e.l-=dt/900;if(e.l<=0)return false;c.globalAlpha=e.l;c.strokeText(e.t,e.x,e.y);c.fillStyle=e.c;c.fillText(e.t,e.x,e.y);c.globalAlpha=1;return true});

  if(ko>=700){c.font="bold 15px sans-serif";c.strokeText("CLEAR!",80,34);c.fillStyle="#ffd23a";c.fillText("CLEAR!",80,34)}
  if(pko>=500){c.font="bold 15px sans-serif";c.strokeText("KO",80,34);c.fillStyle="#ff5d5d";c.fillText("KO",80,34)}
  const tg=(g.N-g.ok)/g.N;B.hpv=B.hpv==null?tg:B.hpv+(tg-B.hpv)*Math.min(1,dt/120);
  if(ko<800){R(78,3,78,8,"#000");R(79,4,76,6,"#401010");R(79,4,r(76*B.hpv),6,boss?"#ffb13b":"#ff5d5d")}
 }finally{x=sv}}
function btLoop(){requestAnimationFrame(btLoop);try{const cv=document.getElementById("bt");if(cv&&MG&&MG.m==="tw")btDraw(cv,0)}catch(e){}}
requestAnimationFrame(btLoop);

addEventListener("keydown",e=>{if(e.key!=="Enter")return;const b=$("#go");if(b&&!b.disabled)b.click()});
/* ===== v4: พื้นหลังใหม่ · ก๊อตซีล่า · คอสตูมใหม่ · สกินใหม่ ===== */
BG.push(["ทุ่งลาเวนเดอร์",450,"#ffb8d8","#fff0e0","#6a4a9a","#9a7ac8","lav"],["สายฝน",400,"#4a5a70","#8a9ab0","#2a3a3a","#3a4a50","rain"],["ป่าไผ่",450,"#bfe8c0","#f0ffe0","#3a6a3a","#4f8a4f","bamboo"],["ปราสาทเทพนิยาย",650,"#7ab8ff","#e8f4ff","#4f9a4a","#6fbf6a","castle"],["โตเกียวยามค่ำ",700,"#1a1038","#ff7a9a","#1a1a2a","#241a3a","tokyo"],["ดาวอังคาร",700,"#3a1414","#e8704a","#a04a2a","#7a3a22","mars"],["แดนขนม",550,"#ffc8f0","#fff0b0","#ff8ac8","#ffb0d8","candy"],["วัดไทย",600,"#ffb060","#fff0c0","#6a5a3a","#8a7a4a","temple"],["ตลาดกลางคืน",600,"#1a0a2a","#ff8a3a","#2a1a1a","#3a2418","nmk"],["ธารน้ำแข็ง",550,"#7ac8ff","#e8faff","#e8f4ff","#a8d0f0","glacier"],["ฝนดาวตก",600,"#02061a","#2a1a5a","#14122a","#1c1a38","meteor"],["ทุ่งดอกไม้",350,"#9ad8ff","#fff8d8","#5aa850","#7ac870","meadow"]);
const _bgA=bgA,_bgB=bgB;
bgA=function(t,k,b){_bgA(t,k,b);const S=Math.sin;
 if(k=="lav"){ell(46,12,9,9,"#ffd0e8",.3);ell(46,12,6,6,"#fff3d0",1);ell(((t/200)%90)-14,10,8,2,"#fff",.7)}
 else if(k=="rain"){for(let i=0;i<5;i++)ell(6+i*14,6,10,5,"#3a4658",1);if(t%6000<120)RA(0,0,64,GY,"#fff",.4)}
 else if(k=="bamboo")for(let i=0;i<8;i++){const x0=i*8+2;R(x0,0,2,GY,"#3a8a46");for(let j=0;j<6;j++)R(x0,j*10+4,2,1,"#2a6a34");R(x0+2,12+(i*7)%30,5,1,"#5fbf6a")}
 else if(k=="castle"){R(18,GY-30,10,30,"#9a9ab8");R(36,GY-26,10,26,"#9a9ab8");R(26,GY-20,12,20,"#a8a8c8");poly([[16,GY-30],[23,GY-42],[30,GY-30]],"#c04a6a");poly([[34,GY-26],[41,GY-36],[48,GY-26]],"#c04a6a");R(23,GY-48,1,7,"#444");R(24,GY-48,4+(S(t/200)>0?1:0),2,"#ff5a5a");R(22,GY-22,2,3,"#ffe08a");R(40,GY-18,2,3,"#ffe08a");for(let i=0;i<3;i++)R(27+i*4,GY-22,2,2,"#a8a8c8");R(30,GY-12,4,12,"#4a3a5a")}
 else if(k=="tokyo"){ell(52,10,4,4,"#fff6c8",1);for(let i=0;i<14;i++)if((Math.floor(t/300)+i)%3)R((i*37)%62+1,(i*19)%24+2,1,1,"#fff");for(let i=0;i<8;i++){const h=12+(i*9)%18;R(i*8+3,GY-h,7,h,"#15102a");for(let j=0;j<5;j++)R(i*8+4+(j%2)*3,GY-h+2+(j>>1)*4,2,2,(i+j)%3?"#ffd88a":"#2a2050")}poly([[6,GY],[14,GY-44],[22,GY]],"#ff5a3a");R(11,GY-30,6,2,"#fff");R(12,GY-18,4,2,"#fff");if((t/400|0)%2)R(14,GY-47,1,3,"#ff2a2a")}
 else if(k=="mars"){ell(14,10,4,4,"#ffd0b0",1);ell(50,18,2,2,"#cfc0b0",1);for(let i=0;i<10;i++)R((i*37)%62+1,(i*23)%30+2,1,1,"#ffe0c0");ell(10,GY-4,6,4,"#5a2a1a",1);ell(54,GY-3,8,3,"#6a3220",1)}
 else if(k=="candy"){ell(((t/220)%90)-14,10,9,3,"#fff",.8);[[8,"#ff5a9a"],[24,"#7fd0ff"],[44,"#ffd23a"],[56,"#a35bff"]].forEach(([x0,c])=>{R(x0,GY-18,1,18,"#fff");ell(x0,GY-20,5,5,c,1);R(x0-2,GY-20,4,1,"#fff")})}
 else if(k=="temple"){ell(50,14,6,6,"#fff0a0",1);poly([[22,GY],[32,GY-40],[42,GY]],"#e8b43a");R(28,GY-14,8,2,"#fff3b0");R(29,GY-24,6,2,"#fff3b0");R(31,GY-44,2,6,"#ffd23a");for(const x0 of[8,52])poly([[x0-5,GY],[x0,GY-16],[x0+5,GY]],"#d8a02a")}
 else if(k=="nmk"){for(let i=0;i<12;i++)R((i*37)%62+1,(i*19)%10+1,1,1,"#c9a6ff");ln([0,10],[63,10],"#3a2a2a");for(let i=0;i<8;i++){const sw=S(t/500+i);R(4+i*8+sw,11,1,1,"#666");ell(4+i*8+sw,15,3,4,i%2?"#ff3a2a":"#ffb02b",1)}R(4,GY-16,20,3,"#c42a2a");R(6,GY-13,16,13,"#3a2a40");R(40,GY-16,20,3,"#c4802a");R(42,GY-13,16,13,"#3a2a40")}
 else if(k=="glacier"){ell(52,10,5,5,"#fff",1);poly([[0,GY],[12,GY-28],[24,GY]],"#cfe8ff");poly([[16,GY],[36,GY-36],[56,GY]],"#e8f6ff");poly([[36,GY-36],[56,GY],[36,GY]],"#b8d8f0")}
 else if(k=="meteor"){for(let i=0;i<24;i++)if((Math.floor(t/300)+i)%4)R((i*37)%62+1,(i*23)%40+2,1,1,"#fff");ell(12,12,5,5,"#f4f0d0",1);for(let i=0;i<3;i++){const u=(t/900+i*.33)%1,sx=60-u*60+i*8,sy=u*38+i*5;ln([sx,sy],[sx+7,sy-3],"#fff");R(sx,sy,2,2,"#ffe066")}}
 else if(k=="meadow"){ell(50,10,6,6,"#fff3a0",1);for(let i=0;i<2;i++)ell(((t/160+i*40)%92)-14,10+i*8,8,3,"#fff",.9)}};
bgB=function(t,k,b){_bgB(t,k,b);const S=Math.sin;
 if(k=="lav")for(let i=0;i<14;i++){const x0=(i*5)%64,h=4+(i*3)%4,sw=Math.round(S(t/600+i));R(x0+sw,GY-h+2,1,h,"#8a5ad0");R(x0-1+sw,GY-h+2,3,2,"#b08ae8")}
 else if(k=="rain"){for(let i=0;i<36;i++)RA((i*37)%64,(t/8+i*13)%GY,1,3,"#bfe0ff",.7);ell(14,GY+3,6,1,"#8ab0d0",.6)}
 else if(k=="bamboo")for(let i=0;i<8;i++)R((i*23+t/40)%64,(t/50+i*11)%GY,2,1,"#7fd08a");
 else if(k=="castle")for(let i=0;i<8;i++)R(i*9,GY+2+(i%3),2,2,["#ff8fb8","#ffe066"][i%2]);
 else if(k=="tokyo"){RA(0,GY+3,64,1,"#ff7a9a",.5);const tx=((t/30)%80)-8;R(tx,GY+5,5,2,"#ff5a3a");R(tx+1,GY+4,3,1,"#ffd23a")}
 else if(k=="mars"){ell(18,GY+4,5,1,"#7a3a22",1);ell(48,GY+5,6,1,"#7a3a22",1);for(let i=0;i<10;i++)RA((i*29+t/30)%64,GY-((t/60+i*7)%12),1,1,"#e8a070",.5)}
 else if(k=="candy")for(let i=0;i<14;i++)R((i*19)%64,GY+1+(i%5),2,1,["#ffd23a","#7fd0ff","#fff","#a35bff"][i%4]);
 else if(k=="temple")for(let i=0;i<5;i++)R((i*13+7)%60,GY-((t/60+i*14)%50),2,2,"#ffd23a");
 else if(k=="nmk"){RA(0,GY+1,64,1,"#ff8a3a",.3);ell(14+S(t/400)*2,GY-((t/40)%14),2,2,"#cfcfcf",.3)}
 else if(k=="glacier")for(let i=0;i<14;i++)R((i*37+S(t/900+i)*3+64)%64,(t/30+i*17)%GY,1,1,"#fff");
 else if(k=="meteor")for(let i=0;i<9;i++)R(i*7,GY-1,1,2,"#2a2a4a");
 else if(k=="meadow"){for(let i=0;i<16;i++){const x0=(i*4+2)%64,y0=GY+1+(i%5);R(x0,y0-3,1,3,"#3f9a45");R(x0-1,y0-4,3,2,["#ff8fb8","#ffd23a","#fff","#c26bff"][i%4])}R(((t/50)%70)-4,20+S(t/300)*5,2,1,"#ff8fb8")}};
/* ----- ก๊อตซีล่า ----- */
SPC.godzilla={nm:"Godzilla",th:"ก๊อตซีล่า",e:"🦖",fur0:"#6a8a74",base:"#4f7a62",d:[1,0,0,0],ear:"cat",tn:0};
UNL.godzilla={st:3,p:1800};for(const k in UNL)UNL[k].st=0;TWB.godzilla={t:"XP ×1.5 และโล่",xm:1.5,sh:1};SKD.godzilla={};
const _cat0=cat;
cat=function(t,f,st){if((K.sp||"cat")==="godzilla"&&st>=1)return godz(t,f,st);return _cat0(t,f,st)};
let GZT=-9e9;
function godz(t,f,st){
 const s=[0,.55,.72,.9,1][st]||1,SK=skinData(K),BC=beamCol(t),CY=K.cy||9000,el=t-T0,gp=(st<3||(x!==xm&&!K.gz))?-1:(x===xm&&t-GZT>=0&&t-GZT<3800)?t-GZT:(t%CY<3800?t%CY:-1),sh=gp<0?0:gp<1800?Math.round(Math.sin(t/22)*gp/1800*1.6):gp<2100?-2:gp<3400?Math.round(Math.sin(t/30)):0,jy=(el<650?-Math.round(Math.sin(el/650*Math.PI)*8):WK?-((t/130|0)%2):0)+Math.round(Math.sin(t/500)*.6),
 body=SK?SK.base:"#46705a",lt=mix(body,"#ffffff",.16),dc=dk(body,.58),bel=mix(body,"#d8cfa8",.5),pl=st>=4?((t/250|0)%2?BC.m:BC.l):"#c4d2d8",pd=dk(pl,.7),
 X=v=>32+(v-32)*s+sh,Y=v=>GY-(GY-v-jy)*s,P=q=>q.map(p=>[X(p[0]),Y(p[1])]),Rr=(a,b,w,h,c)=>R(X(a),Y(b),Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)),c),wv=Math.sin(t/300)*3,
 A={bx:X(21),by:Y(32),bw:22*s,bh:24*s,hx:X(23),hy:Y(13),hw:19*s,hh:24*s},ec=(st>=4||(gp>=0&&gp<3400))?"#ff5a1a":"#ffd23a";
 if(gp>=0&&x===xm){LA=t;pt=pt.filter(p=>p.k!="z")}
 x.globalAlpha=1;if(st>=4)ell(32,36,26,24,K.bc?BC.m:(f.pc||"#7fd0ff"),.13);ell(32,GY,Math.round(17*s)+2,2,"#000",.4);if(gp>=0&&gp<3400)ell(32,36,22+Math.min(1,gp/1800)*8,22,BC.m,.1+Math.min(1,gp/1800)*.15);
 EQ().forEach(it=>{if(it[1]=="g")wing(it,t,A)});
 [[15,38,10],[19,28,13],[25,17,14],[32,8,16],[39,17,14],[45,28,13],[49,38,10]].forEach((p,i)=>{pol(P([[p[0]-4,p[1]+10],[p[0]+(i<3?-1:i>3?1:0),p[1]-p[2]+10],[p[0]+4,p[1]+10]]),gp>=0&&gp<3400&&gp/1800*7>i?BC.l:i%2?pl:pd)});
 pol(P([[40,46],[47,43+wv],[56,45+wv*1.6],[63,39+wv*2],[57,52+wv],[47,55],[40,57]]),body);
 for(let i=0;i<4;i++){const w2=wv*(.4+i*.3);pol(P([[44+i*5,44+w2],[47+i*5,37+w2],[49+i*5,45+w2]]),i%2?pl:pd)}
 pol(P([[21,47],[31,47],[32,56],[19,57]]),dk(body,.85));pol(P([[33,47],[43,47],[45,57],[32,56]]),dk(body,.85));
 for(const a of[19,22,25,35,38,41])pol(P([[a,56],[a+2,56],[a+1,59]]),"#f4efe6");
 pol(P([[22,57],[18,44],[20,34],[27,30],[37,30],[44,34],[46,44],[42,57]]),body);
 pol(P([[19,33],[24,28],[27,32],[22,36]]),dk(body,.8));pol(P([[45,33],[40,28],[37,32],[42,36]]),dk(body,.8));
 for(let r=0;r<6;r++)for(let c=0;c<4;c++)Rr(21+c*5+(r%2)*2,36+r*3,2,1,dc);
 ell(Math.round(X(32)),Math.round(Y(46)),Math.round(5*s),Math.round(8*s),bel,1);for(let i=0;i<4;i++)Rr(28,41+i*3,8,1,dk(bel,.75));
 for(const d of[-1,1]){pol(P([[32+d*11,36],[32+d*17,41],[32+d*16,47],[32+d*10,43]]),body);for(let i=0;i<3;i++)Rr(32+d*17-(d<0?1:0)+(i-1)*d,47,1,2,"#f4efe6")}
 pol(P([[25,30],[39,30],[41,36],[32,39],[23,36]]),dk(lt,.88));
 pol(P([[22,22],[25,14],[32,11],[39,14],[42,22],[42,29],[39,33],[25,33],[22,29]]),lt);
 pol(P([[27,13],[29,7],[31,13]]),pd);pol(P([[33,13],[35,7],[37,13]]),pd);
 pol(P([[22,24],[19,22],[22,29]]),dk(lt,.8));pol(P([[42,24],[45,22],[42,29]]),dk(lt,.8));
 Rr(22,26,2,2,dc);Rr(40,26,2,2,dc);
 if(SK&&SK.ov)skOv(SK.ov,Object.assign({ey:A.hy+9*s,es:3,e1:X(26),e2:X(35)},A));
 pol(P([[23,18],[32,23],[32,25],[23,22]]),dc);pol(P([[41,18],[32,23],[32,25],[41,22]]),dc);
 if(t%3500<130){Rr(26,25,5,1,"#111");Rr(34,25,5,1,"#111")}else{ell(Math.round(X(28)),Math.round(Y(26)),4,2,ec,.25);ell(Math.round(X(37)),Math.round(Y(26)),4,2,ec,.25);Rr(26,25,5,3,ec);Rr(34,25,5,3,ec);Rr(28,25,1,3,"#1a0800");Rr(36,25,1,3,"#1a0800");Rr(26,25,2,1,"#fff6c0");Rr(37,25,2,1,"#fff6c0")}
 Rr(29,29,2,1,dc);Rr(34,29,2,1,dc);Rr(25,32,15,3,"#2a0a10");
 for(let i=0;i<7;i++)Rr(25+i*2,32,1,2,"#fff6e8");for(let i=0;i<6;i++)Rr(26+i*2,34,1,2,"#fff6e8");
 if(gp>=0&&gp<3800){const mx=Math.round(X(40)),my=Math.round(Y(33)),ch=Math.min(1,gp/1800);
  if(gp<1800){
   for(let i=0;i<22;i++){const u=(gp/500+i/22)%1,a=i*2.4+gp/160,r=(1-u)*(18+ch*10)*s+2;R(mx+Math.cos(a)*r,my+Math.sin(a)*r*.8,u>.6?2:1,u>.6?2:1,i%3?BC.l:BC.m)}
   ell(32,GY,Math.round(14+ch*10),2,BC.m,.15+ch*.2);
   const rr=Math.round(1+ch*6),bl=ch>.85&&(t/50|0)%2;
   ell(mx,my,rr+3,rr+3,BC.m,.25+ch*.2);ell(mx,my,rr+1,rr+1,bl?"#ffffff":BC.m,.6);ell(mx,my,rr,rr,"#ffffff",.95);
   if(ch>.5)for(let i=0;i<4;i++){const a=i*1.57+gp/90;R(mx+Math.cos(a)*(rr+3),my+Math.sin(a)*(rr+3),1,1,"#ffffff")}}
  else if(gp<3400)gzBeam(t,gp,mx,my,BC)}
 EQ().forEach(it=>{if(it[1]!="g")item(it,t,A)});x.globalAlpha=1}
{const _oc=$("c").onclick;$("c").onclick=function(){if((K.sp||"cat")=="godzilla"&&K.stage>=3&&performance.now()-GZT>3800){GZT=performance.now();sfx(true,true)}if(_oc)_oc()}}
const _cs0=costumeShop;
costumeShop=function(){if((K.sp||"cat")=="godzilla"){app.innerHTML=shTop("ชุดแฟนซี")+`<div class="mu">ก๊อตซีล่าตัวใหญ่เกินกว่าจะใส่ชุดแฟนซี แต่ใช้สกิน พื้นหลัง และไอเทมได้</div>`;return}_cs0()};
AS("godzilla",{shin:["ชิน ก๊อตซีล่า","#8a3a30",450],old:["ก๊อตซีล่ายุคเก่า","#7a8088",350],ice:["ก๊อตซีล่าน้ำแข็ง","#6a9ad0",450],mecha:["เมก้า ก๊อตซีล่า","#b8c4d0",600,"stripe"],pink:["ก๊อตซีล่าชมพู","#f4b6c8",350],gold:["ก๊อตซีล่าทอง","#e8c060",700,"gold"],black:["ก๊อตซีล่ามืด","#2a2a33",500],burn:["ก๊อตซีล่าเดือด","#c8381e",650,"lava"]});
BG.push(["เมืองถูกทำลาย",700,"#2a1410","#ff7a2a","#2a2420","#3a2c26","ruins"]);
const _bgA2=bgA,_bgB2=bgB;
bgA=function(t,k,b){_bgA2(t,k,b);if(k!="ruins")return;const S=Math.sin;ell(32,GY-6,34,18,"#ff5a1a",.15+.05*S(t/300));ell(50,8,4,4,"#ff9a6a",1);
 [[0,9,26],[8,8,38],[17,10,20],[27,7,32],[34,9,44],[43,8,24],[51,6,36],[57,8,28]].forEach((q,i)=>{const[x0,w,h]=q;R(x0,GY-h,w,h,"#1a1212");for(let j=0;j<w;j+=2){const jg=(j*7+i*3)%4;R(x0+j,GY-h-jg,2,jg+1,"#1a1212")}
  for(let r=0;r<(h-6)/4;r++)for(let j=0;j<2;j++)R(x0+1+j*3,GY-h+4+r*4,2,2,(i+r+j)%4==0?((t/150+i+r|0)%5?"#ff8a2a":"#3a1a10"):"#2a1c1a");
  if(i%3==1)ell(x0+3,GY-h+3,3,4+((t/90+i|0)%2),"#ff7a1a",.8)});
 ln([30,GY],[33,GY-52],"#120c0c");ln([31,GY],[34,GY-52],"#120c0c");ln([33,GY-52],[40,GY-50],"#120c0c");
 for(let m=0;m<3;m++)for(let i=0;i<8;i++){const u=(t/60+i*6+m*20)%50;ell(12+m*20+S(t/700+i)*3+u*.1,GY-20-u,3+u*.15,3+u*.1,"#3a3030",.25*(1-u/50))}};
bgB=function(t,k,b){_bgB2(t,k,b);if(k!="ruins")return;const S=Math.sin;
 for(let i=0;i<9;i++){R(i*7+2,GY+1+(i%3),4,2,"#3a3030");R(i*7+3,GY,2,1,"#5a4a44")}ln([0,GY+3],[20,GY+4],"#14100e");ln([20,GY+4],[26,GY+7],"#14100e");R(40,GY+2,6,3,"#4a2a2a");R(41,GY+1,4,1,"#5a3a3a");
 [8,30,52].forEach((x0,i)=>{const fl=(t/80+i*3|0)%3;ell(x0,GY-2-fl,3,4,"#ff5a1a",.9);ell(x0,GY-1,2,2,"#ffd23a",1)});
 for(let i=0;i<12;i++)R((i*23+S(t/300+i)*3+64)%64,GY-((t/40+i*9)%45),1,1,i%2?"#ffb02b":"#ff5a1a");
 for(let i=0;i<14;i++)R((i*37+t/30)%64,(t/25+i*13)%GY,1,1,"#6a5a5a")};
/* ----- คอสตูมใหม่ ----- */
Object.assign(CSD,{
cow:{n:"ชุดวัว",p:350,c:"#f6f2f0",c2:"#f4b6c2",sp:"#2a2a2a",ear:"horn",tl:"ball",fc:"muzzle",spots:1},
penguin:{n:"ชุดเพนกวิน",p:350,c:"#2a3a5a",c2:"#ffffff",sp:"#ff9a2b",ear:"none",tl:"ball",fc:"nose"},
chick:{n:"ชุดลูกเจี๊ยบ",p:350,c:"#ffe45a",c2:"#fff3b0",sp:"#ff9a2b",ear:"none",tl:"ball",fc:"nose"},
cat:{n:"ชุดแมวส้ม",p:350,c:"#e8923a",c2:"#fff6ea",sp:"#3a2a2a",ear:"point",tl:"fox",fc:"fox",stripe:1},
ghost:{n:"ชุดผีน้อย",p:500,c:"#f4f4ff",c2:"#dfe6ff",sp:"#aab4cc",ear:"none",tl:"none",fc:"none",nb:1},
robot:{n:"ชุดหุ่นยนต์",p:500,c:"#9aa8b8",c2:"#5a6a7a",sp:"#ff5a5a",ear:"knob",tl:"none",fc:"none",rd:1},
alien:{n:"ชุดมนุษย์ต่างดาว",p:500,c:"#7fe08a",c2:"#c8f8c8",sp:"#3a8a4a",ear:"knob",tl:"none",fc:"none"},
ninja:{n:"ชุดนินจา",p:500,c:"#1a1a2a",c2:"#2a2a3a",sp:"#d63a4a",ear:"none",tl:"ball",fc:"none",nb:1},
astro:{n:"ชุดนักบินอวกาศ",p:700,c:"#f4f4f8",c2:"#cfd6e0",sp:"#3a6ad0",ear:"none",tl:"ball",fc:"none",limbs:1},
monkey:{n:"ชุดลิง",p:350,c:"#8a5a3a",c2:"#e8c890",sp:"#5a3a22",ear:"round",tl:"long",fc:"muzzle"},
fairy:{n:"ชุดนางฟ้า",p:700,c:"#ffd0e8",c2:"#ffffff",sp:"#ff8fb8",ear:"point",tl:"rainbow",fc:"uni",wing:1},
devil:{n:"ชุดปีศาจน้อย",p:700,c:"#c8201a",c2:"#ff5a4a",sp:"#3a0a0a",ear:"horn",tl:"dragon",fc:"teeth",wing:1},
snowman:{n:"ชุดมนุษย์หิมะ",p:350,c:"#ffffff",c2:"#dfeaff",sp:"#ff9a2b",ear:"none",tl:"ball",fc:"nose"},
santa:{n:"ชุดซานตาคลอส",p:500,c:"#d63a3a",c2:"#ffffff",sp:"#ffffff",ear:"none",tl:"pom",fc:"muzzle"}});
/* ----- สกินใหม่ (ลายพิเศษ) ----- */
const _skOv=skOv;
skOv=function(o,a){_skOv(o,a);const{bx,by,bw,bh,hx,hy,hw,hh}=a,T=performance.now();
 if(o=="stripe"){for(let i=0;i<4;i++)R(bx+2+i*((bw-4)/3|0),by+1,2,bh-3,"rgba(0,0,0,.3)");R(hx+2,hy+1,2,4,"rgba(0,0,0,.3)");R(hx+hw-4,hy+1,2,4,"rgba(0,0,0,.3)")}
 else if(o=="dots"){for(const p of[[2,3],[bw-5,4],[5,bh-5],[bw-8,bh-4]])R(bx+p[0],by+p[1],2,2,"#fff");R(hx+3,hy+2,2,2,"#fff");R(hx+hw-6,hy+3,2,2,"#fff")}
 else if(o=="star"){for(const p of[[bx+4,by+4],[bx+bw-5,by+bh-5],[hx+hw-5,hy+3]]){R(p[0],p[1],1,1,"#ffe066");R(p[0]-1,p[1],3,1,"#ffe066");R(p[0],p[1]-1,1,3,"#ffe066")}}
 else if(o=="heart"){for(const p of[[bx+3,by+3],[bx+bw-8,by+bh-6],[hx+hw-7,hy+2]]){const c="#ff4a7a";R(p[0],p[1],2,1,c);R(p[0]+3,p[1],2,1,c);R(p[0],p[1]+1,5,1,c);R(p[0]+1,p[1]+2,3,1,c);R(p[0]+2,p[1]+3,1,1,c)}}
 else if(o=="galaxy"){R(bx+2,by+2,6,3,"rgba(160,90,255,.35)");for(let i=0;i<10;i++){if((T/300+i)%3<2)R(bx+(i*7)%bw,by+(i*5)%bh,1,1,i%3?"#fff":"#ffd76a");if((T/300+i)%3<2)R(hx+(i*5)%hw,hy+(i*3)%hh,1,1,"#c9a6ff")}}
 else if(o=="rainbow"){for(let j=0;j<5;j++)R(bx+1,by+2+j*Math.max(1,bh/6|0),bw-2,1,"hsl("+j*60+",80%,65%)")}
 else if(o=="gold"){R(bx+1,by+1,bw-2,2,"rgba(255,245,180,.5)");R(hx+1,hy+1,hw-2,2,"rgba(255,245,180,.5)");for(let i=0;i<4;i++)if((T/200+i*3)%5<1)R(bx+(i*5+2)%bw,by+(i*3)%bh,1,1,"#fff")}
 else if(o=="frost"){R(bx+1,by,bw-2,2,"#fff");R(hx+1,hy,hw-2,2,"#fff");for(let i=0;i<4;i++)R(bx+2+i*4,by+2,1,2+i%2,"#dff3ff")}
 else if(o=="lava"){const c=(T/200|0)%2?"#ff8a2b":"#ffd23a";ln([bx+3,by+2],[bx+6,by+bh-3],c);ln([bx+bw-4,by+3],[bx+bw-7,by+bh-2],c);ln([hx+4,hy+1],[hx+6,hy+6],c)}};
Object.keys(SKD).forEach(sp=>[["stripe","ลายทาง","#c8a070",300],["dots","ลายจุดขาว","#f4a6b8",350],["star","ลายดาว","#7fb8e8",400],["heart","ลายหัวใจ","#ffc8d8",400],["galaxy","กาแล็กซี","#1c1f5a",600],["rainbow","สายรุ้ง","#f8f4ff",550],["gold","ทองอร่าม","#e8c050",700],["frost","น้ำแข็ง","#cfe6f4",500],["lava","ลาวา","#3a1a1a",650]].forEach(g=>{SKD[sp]["n_"+g[0]]=[SPC[sp].th+g[1],g[2],mix(g[2],"#ffffff",.2),g[3],g[0],1]}));
/* ===== สีลำแสงก๊อตซีล่า ===== */
let PVBC=null;
const BCD={blue:["ฟ้าน้ำแข็ง (ปกติ)",0,"#7fd0ff","#c8f0ff"],red:["แดงเพลิง",300,"#ff4a3a","#ffc0b0"],orange:["ส้มลาวา",300,"#ff9a2b","#ffe0a0"],green:["เขียวพิษ",300,"#4fe07a","#c8ffd8"],pink:["ชมพูหวาน",350,"#ff7ad9","#ffd0f0"],purple:["ม่วงอเบส",400,"#b05cff","#e6cfff"],white:["ขาวบริสุทธิ์",500,"#ffffff","#dfe8ff"],gold:["ทองสุริยะ",600,"#ffd23a","#fff6c0"],rainbow:["สายรุ้ง",800,null,null]};
const hsx=(h,s,l)=>{s/=100;l/=100;const a=s*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1))))};return"#"+[f(0),f(8),f(4)].map(v=>("0"+v.toString(16)).slice(-2)).join("")};
function beamCol(t){let id=K.bc;if(PVBC!=null&&K===S.pets[S.pet])id=PVBC;const d=BCD[id];if(d&&!d[2]){const h=(t/6)%360;return{m:hsx(h,95,60),l:hsx(h,95,85)}}return d?{m:d[2],l:d[3]}:{m:"#7fd0ff",l:"#c8f0ff"}}
SL.z="🔦";SLN.z="สีลำแสง";
function beamShop(){if((K.sp||"cat")!=="godzilla"){app.innerHTML=shTop("สีลำแสง")+`<div class="mu">ใช้ได้กับก๊อตซีล่าเท่านั้น</div>`;return}
 const cur=K.bc||"blue",li=Object.keys(BCD).map(id=>{const d=BCD[id],own=!d[1]||M.skins["godzilla:bc_"+id],on=cur===id,can=own||M.coins>=d[1],r=d[1]>=600?4:d[1]>=400?3:d[1]>=300?2:1;
  return shRow(d[0],on?"ใช้อยู่":own?"มีแล้ว":"🪙 "+d[1],PVBC===id,"tryBc('"+id+"')",can,on,on?"ใช้อยู่":own?"ใช้สีนี้":can?"ซื้อ 🪙 "+d[1]:"🪙 "+d[1],"buyBc('"+id+"')",ts({bc:id}),r)}).join("");
 app.innerHTML=shTop("สีลำแสงของก๊อตซีล่า (กด 👁 เพื่อให้ตัวหลักพ่นให้ดูทันที)")+`<div class="sg">${li}</div>`;paintTh()}
function tryBc(id){PVBC=PVBC===id?null:id;if(PVBC)GZT=performance.now();shopPage()}
function buyBc(id){PVBC=null;if(id!=="blue"){const d=BCD[id],k="godzilla:bc_"+id;if(!M.skins[k]){if(M.coins<d[1])return;M.coins-=d[1];M.skins[k]=1}}K.bc=id==="blue"?null:id;GZT=performance.now();save();sync();sinfo();shopPage()}

/* ===== ท่าพ่นลำแสงก๊อตซีล่า (ซื้อเปลี่ยนในร้าน แท็บ 💥) ===== */
const BMD={line:["ลำตรง (ปกติ)",0],fan:["พัดกระจาย",400],sky:["พ่นขึ้นฟ้า",500],spiral:["เกลียวคู่",600]};
let PVBM=null;SL.y="💥";SLN.y="ท่าลำแสง";
function beamMove(){let id=K.bm;if(PVBM!=null&&K===S.pets[S.pet])id=PVBM;return BMD[id]?id:"line"}
function gzBeam(t,gp,mx,my,BC){const k=gp-1800,fd=gp>3100?(3400-gp)/300:1,gr=Math.min(1,k/150),m=beamMove(),Sn=Math.sin,Cs=Math.cos;
 x.globalAlpha=Math.min(1,fd);
 if(k<130)RA(0,0,64,64,"#ffffff",.35);
 ell(mx,my,8,8,BC.m,.45);ell(mx,my,5,5,"#ffffff",.8);
 if(m=="fan"){const n=7,sw=Sn(t/170)*.16,sp=.5+.1*Sn(t/260),L=Math.round(gr*46),a0=x.globalAlpha;
  x.globalAlpha=a0*.16;poly([[mx,my],[mx+Cs(-sp+sw)*L,my+Sn(-sp+sw)*L],[mx+Cs(sp+sw)*L,my+Sn(sp+sw)*L]],BC.m);x.globalAlpha=a0;
  for(let i=0;i<n;i++){const a=(i-3)/3*sp+sw,ex=mx+Cs(a)*L,ey=my+Sn(a)*L,mid=i==3;
   for(let d=-1;d<=1;d++)ln([mx,my+d],[ex,ey+d],BC.m);
   ln([mx,my],[ex,ey],mid?"#ffffff":BC.l);
   for(let j=0;j<L;j+=5){const u=j+((t/18+i*3)%5);R(mx+Cs(a)*u,my+Sn(a)*u,1,1,"#ffffff")}
   if(gr>.8)ell(ex,ey,mid?3:2,mid?3:2,"#ffffff",.6)}}
 else if(m=="sky"){const ca=.5,sa=-.866,Lt=(my+4)/.866,L=gr*Lt,w=Math.max(1.5,2.6+Sn(t/40)*.8),nx=.866,ny=.5,
   qd=(w2,e)=>[[mx+nx*w2,my+ny*w2],[mx+ca*L+nx*w2*e,my+sa*L+ny*w2*e],[mx+ca*L-nx*w2*e,my+sa*L-ny*w2*e],[mx-nx*w2,my-ny*w2]],a0=x.globalAlpha;
  x.globalAlpha=a0*.3;poly(qd(w+2.5,1.7),BC.m);x.globalAlpha=a0;poly(qd(w,1.5),BC.m);poly(qd(w*.5,1.4),"#ffffff");
  for(let i=0;i<14;i++){const u=((t/70)+i*.37)%1,o=Sn(t/50+i*2)*(2+u*3);R(mx+ca*L*u+nx*o,my+sa*L*u+ny*o,1,1,i%2?"#ffffff":BC.l)}
  if(gr>.9){const bx=mx+ca*Lt,rr=((t/45)%10)+3;ell(bx,1,7,5,BC.m,.5);ell(bx,1,3,3,"#ffffff",.9);
   for(let i=0;i<10;i++){const a=i/10*3.1416,r2=i%2?6:10;ln([bx,1],[bx+Cs(a)*r2*1.2,1+Sn(a)*r2*.6],i%2?BC.l:"#ffffff")}
   for(let i=-5;i<=5;i++)RA(bx+i*rr/5*1.6,3+Math.abs(i)*.4,2,1,"#ffffff",.5)}}
 else if(m=="spiral"){const len=Math.round(gr*(66-mx)),th=Math.max(1,Math.round(2*fd)),bk=dk(BC.m,.7);
  RA(mx,my-7,len,14,BC.m,.12);
  for(let i=0;i<len;i++){const amp=1.5+Math.min(1,i/14)*5,ph=i/2.6-t/45,y1=my+Sn(ph)*amp,y2=my-Sn(ph)*amp,fr=Cs(ph)>0;
   R(mx+i,(fr?y2:y1)-1,2,3,bk);R(mx+i,(fr?y1:y2)-1,2,3,BC.l);R(mx+i,(fr?y1:y2),1,1,"#ffffff");
   if(Math.abs(Sn(ph))<.18&&i%2==0)R(mx+i,my-1,1,3,BC.m)}
  R(mx,my-1,len,2,"#ffffff");
  for(let i=0;i<8;i++){const u=((t/90)+i*.31)%1;R(63-u*9,my-8+(i*5)%17+Sn(t/60+i)*2,2,1,i%2?"#ffffff":BC.l)}
  ell(62,my,3+Math.round(Sn(t/35)),th+3,"#ffffff",.6)}
 else{const len=Math.round(gr*(66-mx)),th=Math.max(1,Math.round((3+Sn(t/40)+(k<300?2:0))*fd));
  RA(mx,my-th-2,len,2*th+4,BC.m,.3);R(mx,my-th,len,2*th,BC.m);R(mx,my-Math.max(1,th>>1),len,Math.max(2,th),"#ffffff");
  for(let i=0;i<len;i+=4)R(mx+i,my-th-1+((i+t/20)%3|0),2,1,BC.l);
  for(let i=0;i<10;i++){const u=((t/90)+i*.31)%1;R(63-u*9,my-6+(i*5)%13+Sn(t/60+i)*2,2,1,i%2?"#ffffff":BC.l)}
  ell(62,my,3+Math.round(Sn(t/35)),th+3,"#ffffff",.6)}
 x.globalAlpha=1}
function beamMoveShop(){if((K.sp||"cat")!=="godzilla"){app.innerHTML=shTop("ท่าลำแสง")+`<div class="mu">ใช้ได้กับก๊อตซีล่าเท่านั้น</div>`;return}
 const cur=K.bm||"line",li=Object.keys(BMD).map(id=>{const d=BMD[id],own=!d[1]||M.skins["godzilla:bm_"+id],on=cur===id,can=own||M.coins>=d[1],r=d[1]>=600?4:d[1]>=500?3:d[1]>=400?2:1;
  return shRow(d[0],on?"ใช้อยู่":own?"มีแล้ว":"🪙 "+d[1],PVBM===id,"tryBm('"+id+"')",can,on,on?"ใช้อยู่":own?"ใช้ท่านี้":can?"ซื้อ 🪙 "+d[1]:"🪙 "+d[1],"buyBm('"+id+"')",ts({bm:id==="line"?null:id}),r)}).join("");
 app.innerHTML=shTop("ท่าพ่นลำแสงของก๊อตซีล่า (กด 👁 เพื่อให้ตัวหลักพ่นให้ดูทันที · ใช้ร่วมกับสีลำแสงได้)")+`<div class="sg">${li}</div>`;paintTh()}
function tryBm(id){PVBM=PVBM===id?null:id;if(PVBM)GZT=performance.now();shopPage()}
function buyBm(id){PVBM=null;if(id!=="line"){const d=BMD[id],k="godzilla:bm_"+id;if(!M.skins[k]){if(M.coins<d[1])return;M.coins-=d[1];M.skins[k]=1}}K.bm=id==="line"?null:id;GZT=performance.now();save();sync();sinfo();shopPage()}
if(S.pets&&S.pets.godzilla&&!S.pets.godzilla.bs){S.pets.godzilla.bs=3;S.pets.godzilla.xp=Math.max(S.pets.godzilla.xp||0,XS[2])}
bind();evo();if(!S.rc){S.rc=genRc();save()}document.body.classList.toggle("nofx",S.cfg.fx===false);requestAnimationFrame(loop);home();
if(!S.ob){if(Object.keys(S.c).length)S.ob=1;else setTimeout(onboard,400)}
if(S.ob&&!S.rcs)setTimeout(rcNotice,1500);
if(sbOn()&&Object.keys(S.c).length)setTimeout(()=>bup(1),2500);
document.addEventListener("visibilitychange",()=>{if(document.hidden&&Object.keys(S.c).length)bup()});
/* ===== GZ-PATCH: ก๊อตซีล่า v5 (คำราม · ระเบิดปลายลำแสง · Burning Mode · ฝุ่น/สั่น · Mini Godzilla · เสียง) ===== */
let RRT=-9e9,HIT=-9e9,BRNT=-9e9,GP2=[],GLT=0,LPH=0,LRR=-1,BAv=0;
const gzOn=()=>(K.sp||"cat")==="godzilla"&&K.stage>=3;
const gzGp=t=>{const CY=K.cy||9000;return(t-GZT>=0&&t-GZT<3800)?t-GZT:(t%CY<3800?t%CY:-1)};
const gp2=(a,b,vx,vy,c,l,g)=>{if(GP2.length<220)GP2.push({x:a,y:b,vx,vy,c,l,g})};
function gAu(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();return AC}catch(e){return null}}
function gNoise(a,d){const b=a.createBuffer(1,a.sampleRate*d|0,a.sampleRate),c=b.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()*2-1;const s=a.createBufferSource();s.buffer=b;return s}
function groar(v){if(S.cfg.fx===false)return;const a=gAu();if(!a)return;const n=a.currentTime,d=1.1,g=a.createGain(),lp=a.createBiquadFilter();
 lp.type="lowpass";lp.frequency.setValueAtTime(900,n);lp.frequency.exponentialRampToValueAtTime(180,n+d);
 g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.35*v,n+.12);g.gain.exponentialRampToValueAtTime(.0001,n+d);
 for(const[ty,f0,f1]of[["sawtooth",130,48],["square",64,32]]){const o=a.createOscillator();o.type=ty;o.frequency.setValueAtTime(f0,n);o.frequency.exponentialRampToValueAtTime(f1,n+d);o.connect(lp);o.start(n);o.stop(n+d+.05)}
 const ns=gNoise(a,d);ns.connect(lp);ns.start(n);lp.connect(g);g.connect(a.destination)}
function gbeamSnd(){if(S.cfg.fx===false)return;const a=gAu();if(!a)return;const n=a.currentTime,g=a.createGain(),lp=a.createBiquadFilter();
 lp.type="lowpass";lp.frequency.value=2200;g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.12,n+1.6);g.gain.setValueAtTime(.3,n+1.8);g.gain.exponentialRampToValueAtTime(.0001,n+3.4);
 const w=a.createOscillator();w.type="sawtooth";w.frequency.setValueAtTime(180,n);w.frequency.exponentialRampToValueAtTime(1100,n+1.8);w.frequency.exponentialRampToValueAtTime(70,n+3.3);w.connect(lp);w.start(n);w.stop(n+3.4);
 const r=a.createOscillator();r.type="square";r.frequency.value=46;r.connect(lp);r.start(n+1.8);r.stop(n+3.4);
 const ns=gNoise(a,1.6);ns.connect(lp);ns.start(n+1.8);lp.connect(g);g.connect(a.destination)}
/* แตะ = คำราม · แตะ 3 ครั้ง/กดค้าง = พ่นลำแสง */
{const cv=$("c"),oc=cv.onclick;let LPT=0,LPF=0,TC=0,TL=0;
 const fire=()=>{const n=performance.now();if(n-GZT<3800)return;GZT=n;LA=n;gbeamSnd();try{navigator.vibrate&&navigator.vibrate([60,40,120,40,200])}catch(e){}};
 cv.addEventListener("pointerdown",()=>{LPF=0;clearTimeout(LPT);LPT=setTimeout(()=>{if(gzOn()){LPF=1;fire()}},450)});
 ["pointerup","pointerleave","pointercancel"].forEach(e=>cv.addEventListener(e,()=>clearTimeout(LPT)));
 cv.onclick=function(){if(!gzOn()){oc&&oc.call(this);return}if(LPF){LPF=0;return}
  const n=performance.now();TC=n-TL<1200?TC+1:1;TL=n;if(TC>=3){TC=0;fire();return}
  RRT=n;LA=n;groar(1);try{navigator.vibrate&&navigator.vibrate([50,30,50])}catch(e){}}}
/* เอฟเฟกต์รอบตัว (เฉพาะแคนวาสหลัก) */
const _cat2=cat;
cat=function(t,f,st){if((K.sp||"cat")!=="godzilla"||st<1||x!==xm)return _cat2(t,f,st);
 const b=!!((G&&G.combo>=10)||(MG&&MG.m==="tw"&&(MG.combo>=10||twBoss(MG.f))));
 if(b){if(t-BRNT>3000){RRT=t;groar(.7)}BRNT=t}BAv=Math.max(0,1-(t-BRNT)/1500);
 if(BAv>0)ell(32,38,26,24,"#ff2a1a",(.1+.08*Math.sin(t/200))*BAv);
 _cat2(t,f,st);gzFx(t,st)};
function gzFx(t,st){const s=[0,.55,.72,.9,1][st]||1,X=v=>32+(v-32)*s,Y=v=>GY-(GY-v)*s,r=t-RRT,dt=Math.min(50,t-GLT||16),BA=BAv;GLT=t;
 if(r>=0&&r<900){const k=r/900,op=k<.15?k/.15:k<.7?1:(1-k)/.3,top=Y(31),hh=Math.round((3+op*5)*s),th=Math.max(1,Math.round(2*s));
  R(X(24),top,Math.round(17*s),hh,"#2a0a10");R(X(28),top+hh-th,Math.round(7*s),th,"#c04a5a");
  for(let i=0;i<7;i++){R(X(25+i*2),top,1,th,"#fff6e8");R(X(25+i*2),top+hh-1,1,1,"#fff6e8")}
  const mx=X(41),my=Y(33);for(let j=0;j<3;j++){const rr=((r/5)+j*10)%32+3;for(let a=-.9;a<=.9;a+=.12)RA(mx+Math.cos(a)*rr,my+Math.sin(a)*rr*.9,1,1,"#e8f4ff",(1-k)*.8)}
  const rg=k*38;for(let i=0;i<48;i++){const a=i/48*6.283;RA(32+Math.cos(a)*rg,GY+Math.sin(a)*rg*.12,2,1,"#cfe8ff",(1-k)*.9)}
  if(LRR!==RRT){LRR=RRT;for(let i=0;i<16;i++)gp2(32+(Math.random()*2-1)*14*s,GY-1,(Math.random()-.5)*2.6,-Math.random()*1.2,"#9a9aa2",.9,0)}}
 if(WK){const ph=t/260|0;if(ph!==LPH){LPH=ph;for(let i=0;i<3;i++)gp2(32+(ph%2?7:-7)*s,GY-1,Math.random()-.5,-.3,"#8a8a90",.7,0)}}
 const gp=gzGp(t);
 if(st>=3&&gp>=1800&&gp<3400){const k=(gp-1800)/1600,ey=Y(33),pl=Math.sin(t/60);
  if(beamMove()=="sky"){const bx=Math.min(60,X(40)+Y(33)*.575),bc=beamCol(t);ell(bx,1,8+k*4+pl,5+k*3,bc.m,.35);ell(bx,1,4+k*2,3+k*2,"#ffffff",.8);
   if(Math.random()<.8)gp2(bx+(Math.random()-.5)*10,3,(Math.random()-.5)*2.6,Math.random()*1.5,Math.random()<.5?bc.l:"#ffffff",1,.12)}
  else{HIT=t;
  ell(62,ey,5+k*5+pl,6+k*7,"#ff7a1a",.55);ell(62,ey,3+k*3,4+k*5,"#ffd23a",.8);ell(63,ey,2,3,"#ffffff",.95);
  if(Math.random()<.7)gp2(60,ey+(Math.random()-.5)*10,-Math.random()*2.2,-Math.random()*3,Math.random()<.5?"#ff9a2b":"#5a4a44",1,.15)}}
 const fa=1-(t-HIT)/5000;
 if(fa>0){for(let i=0;i<4;i++){const fl=(t/70+i*3|0)%3;ell(54+i*3,GY-1-fl,2,3+fl,"#ff7a1a",fa*.9);ell(54+i*3,GY,1,2,"#ffd23a",fa)}if(Math.random()<.3)gp2(55+Math.random()*8,GY-3,0,-.6,"#6a5a5a",.8,0)}
 if(BA>.02){[[15,38,10],[19,28,13],[25,17,14],[32,8,16],[39,17,14],[45,28,13],[49,38,10]].forEach((p,i)=>{const px=X(p[0]+(i<3?-1:i>3?1:0)),py=Y(p[1]-p[2]+10),c=(t/120+i|0)%2?"#ffd23a":"#ff5a1a";ell(px,py,3,3,"#ff3a1a",.35*BA);RA(px-1,py-1,3,3,c,BA);RA(px,py,1,1,"#ffffff",BA)});
  if(Math.random()<.6*BA)gp2(32+(Math.random()*2-1)*10*s,Y(20),(Math.random()-.5)*.6,-.7-Math.random()*.6,Math.random()<.5?"#ffb02b":"#ff5a1a",.9,0);
  if(Math.random()<.25*BA)gp2(X(28),Y(30),.3,-.5,"#c8c8d0",.9,0)}
 GP2=GP2.filter(p=>{p.x+=p.vx*dt/16;p.y+=p.vy*dt/16;p.vy+=p.g*dt/16;p.l-=dt/850;if(p.l<=0)return false;RA(p.x,p.y,2,2,p.c,Math.min(1,p.l));return true})}
/* ฉากหอคอย: ตอบถูกคริติคอล (คอมโบ 5) พ่นลำแสงใส่บอสจริง */
const _btDraw=btDraw;
btDraw=function(cv,t){_btDraw(cv,t);try{if((K.sp||"cat")!=="godzilla"||K.stage<2||!MG||MG.m!=="tw")return;const B=BT,now=performance.now(),pa=now-(B.pa||-1e5);if(!B.crit||pa<250||pa>750)return;
 const boss=twBoss(MG.f),s=boss?1.55:1,BX=boss?112:118,c=cv.getContext("2d"),BC=beamCol(now),att=a=>a<250?(a/250)**2:a<360?1:Math.max(0,1-(a-360)/340),
 sx=Math.round(6+(BX-14*s-46)*att(pa)+41),sy=88-57+33,ex=Math.round(BX-12*s),ey=70;c.globalAlpha=pa<650?1:(750-pa)/100;
 for(let i=0;i<=40;i++){const u=i/40,px=sx+(ex-sx)*u,py=sy+(ey-sy)*u;c.fillStyle=BC.m;c.fillRect(px-2,py-2,5,5);c.fillStyle="#fff";c.fillRect(px-1,py-1,3,3)}
 c.fillStyle=BC.l;c.fillRect(ex-5,ey-5,10,10);c.globalAlpha=1}catch(e){}};
/* เพื่อนคู่หู: Mini Godzilla */
ITEMS.push(["Mini Godzilla","f",3,0,"minizilla","#6a8a74","#ffd23a"],["Mini Mecha","f",3,0,"minizilla","#b8c4d0","#ff5a5a"],["Mini Kaiju Blue","f",2,"a","minizilla","#5a8ad0","#fff36a"]);
function minizilla(t,A,c1,c2){const f=(t/140|0)%2,px=Math.round(A.bx-17+Math.sin(t/1100)*2),py=GY-10,o=dk(c1,.5);
 ell(px+4,GY,7,1,"#000",.3);R(px-5,py+6+f,5,3,o);R(px-4,py+7+f,4,1,c1);R(px-1,py+2,10,8,o);R(px,py+3,8,6,c1);R(px+4,py+6,3,3,mix(c1,"#ffffff",.4));
 R(px+6,py-1,6,6,o);R(px+7,py,4,4,c1);R(px+9,py+1,1,1,"#ff4a2a");R(px+1,py+1,2,2,c2);R(px+4,py,2,2,c2);
 R(px+1,py+9,2,2-f+1,o);R(px+6,py+9,2,1+f+1,o);if(t%6000<400)RA(px+12,py+2,3+((t%6000)/50|0),2,c2,.8)}
const _item=item;item=function(it,t,A){if(it[4]=="minizilla")return minizilla(t,A,it[5],it[6]);_item(it,t,A)};
/* สกินเพิ่ม */
AS("godzilla",{gal:["ก๊อตซีล่ากาแล็กซี","#1c1f5a",700,"galaxy"],rbw:["ก๊อตซีล่าสายรุ้ง","#f8f4ff",800,"rainbow"],hrt:["ก๊อตซีล่าหัวใจ","#f4a6c0",450,"heart"]});
GD.push(["gz","🦖","ก๊อตซีล่า",`<ul><li><b>แตะ</b> = คำราม (จอสั่น มีคลื่นกระแทก)</li><li><b>แตะ 3 ครั้งติด หรือกดค้าง</b> = พ่นลำแสง ปลายลำแสงระเบิดและไฟลุกค้าง</li><li><b>Burning Mode</b> คอมโบ 10 ข้อติด (หรือชั้นบอสในหอคอย) หนามเรืองไฟ มีควันและประกาย</li><li>ชั้นหอคอย ตอบถูกคริติคอล (คอมโบ 5) พ่นลำแสงใส่บอส</li><li>ร้านค้า ช่องเพื่อน มี Mini Godzilla วิ่งตามข้างเท้า</li><li>ร้านค้า แท็บ 💥 ท่าลำแสง ซื้อท่าพ่นได้ 4 แบบ: ลำตรง · พัดกระจาย · พ่นขึ้นฟ้า · เกลียวคู่ (กด 👁 เพื่อให้ตัวหลักพ่นให้ดู) ใช้ร่วมกับสีลำแสงได้</li></ul>`]);
