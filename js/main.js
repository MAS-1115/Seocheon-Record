/* 플레이 링크: 크랙 URL로 바꿔 주세요 */
const PLAY_URL = "https://share.crack.wrtn.ai/m8xfj2x";

const playBtn=document.getElementById('playBtn');
if(PLAY_URL){playBtn.href=PLAY_URL}else{
  playBtn.removeAttribute('target');
  playBtn.addEventListener('click',e=>{e.preventDefault();document.querySelector('.play-note').textContent='플레이 링크를 준비하고 있습니다'});
}

/* ── 탭: <main class="page" data-tab> 를 읽어 자동 생성 ── */
const pageEls=[...document.querySelectorAll('main.page[data-tab]')];
const tabsEl=document.getElementById('tabs'),tabbar=document.getElementById('tabbar');
pageEls.forEach(pg=>{
  const a=document.createElement('a');
  a.href='#'+pg.dataset.tab;a.dataset.tab=pg.dataset.tab;
  a.innerHTML=`<small>${pg.dataset.kicker||''}</small><span>${pg.dataset.label}</span>`;
  tabsEl.appendChild(a);
});
const DEFAULT=pageEls[0].dataset.tab;
function tabOf(id){
  if(!id)return DEFAULT;
  if(pageEls.some(p=>p.dataset.tab===id))return id;
  const el=document.getElementById(id),pg=el&&el.closest('main.page[data-tab]');
  return pg?pg.dataset.tab:DEFAULT;
}
function show(id){
  const tab=tabOf(id);
  pageEls.forEach(p=>p.hidden=p.dataset.tab!==tab);
  let cur;
  tabsEl.querySelectorAll('a').forEach(a=>{if(a.dataset.tab===tab){a.setAttribute('aria-current','page');cur=a}else a.removeAttribute('aria-current')});
  if(cur){const l=cur.offsetLeft,r=l+cur.offsetWidth;if(l<tabsEl.scrollLeft||r>tabsEl.scrollLeft+tabsEl.clientWidth)tabsEl.scrollLeft=l-tabsEl.clientWidth/2+cur.offsetWidth/2}
  const pg=pageEls.find(p=>p.dataset.tab===tab);
  document.title=pg.dataset.title||pg.dataset.label;
  const target=id&&id!==tab?document.getElementById(id):null;
  if(target)target.scrollIntoView();else window.scrollTo(0,0);
  updateArrows();
}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(!a||a.id==='playBtn')return;
  const id=a.getAttribute('href').slice(1);
  if(!id)return;
  e.preventDefault();show(id);
  try{history.replaceState(null,'','#'+id)}catch(err){}
});
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));

/* 탭이 넘칠 때: 양끝 흐림 + 화살표 */
function updateArrows(){
  const ovf=tabsEl.scrollWidth>tabsEl.clientWidth+2;
  tabbar.classList.toggle('ovf',ovf);
  tabbar.classList.toggle('at-start',tabsEl.scrollLeft<=2);
  tabbar.classList.toggle('at-end',tabsEl.scrollLeft+tabsEl.clientWidth>=tabsEl.scrollWidth-2);
  tabbar.querySelector('.ta-prev').disabled=tabsEl.scrollLeft<=2;
  tabbar.querySelector('.ta-next').disabled=tabsEl.scrollLeft+tabsEl.clientWidth>=tabsEl.scrollWidth-2;
}
tabbar.querySelector('.ta-prev').addEventListener('click',()=>tabsEl.scrollBy({left:-tabsEl.clientWidth*.7}));
tabbar.querySelector('.ta-next').addEventListener('click',()=>tabsEl.scrollBy({left:tabsEl.clientWidth*.7}));
tabsEl.addEventListener('scroll',updateArrows,{passive:true});
window.addEventListener('resize',updateArrows);
tabsEl.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&tabsEl.scrollWidth>tabsEl.clientWidth){tabsEl.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
show(location.hash.slice(1));

/* ── 인물 ── */
const CAST=[
 {img:"https://i.postimg.cc/cH4t4WJ3/IMG-02.webp",pos:"",g:"順命敎團",gs:"수배 중",code:"낙성",sig:"落",real:"류재호",villain:true,meta:"남 · 33세 · 187cm",role:"순명교단 간부 · 前 재건국 1품 옥황차사 · 火",eye:"#d9a62e",
  look:"밝은 갈색 머리를 7:3 가르마로 넘겼다. 황금 같은 눈, 처진 눈매, 짙은 눈 밑 그늘, 군살 없이 단단한 체형의 어른스러운 인상. 제복의 흔적이 남은 검은 롱코트에 세 갈래 붉은 노리개를 찬다. 손목과 목에 빛의 균열이 번져 있다.",
  power:"서광(曙光). 새벽빛을 압축한 칼날과 눈을 멀게 하는 빛. 봉인을 거꾸로 푸는 술수.",
  mind:"겉은 다정하고 정중하지만 속은 그 누구보다 확고하다. 마음을 한 번 정하면 뒤돌아보지 않는다. 동정은 받지도 하지도 않으며, 목표가 뚜렷한 사람을 존중한다.",
  talk:"낮고 느린 존댓말. 격해지면 반말이 섞인다.",
  habit:"생각에 잠기면 엄지로 손목의 균열을 문지른다.",
  line:"지금은 낙성입니다, 신단. 그 이름은 버렸다고 했을 텐데요."},
 {img:"https://i.postimg.cc/Y2TN840k/IMG-03.webp",pos:"",g:"再建局 開門犯罪部 3팀",gs:"추적팀",code:"신단",sig:"神",real:"한현섭",meta:"남 · 31세 · 180cm",role:"3팀장 · 1품 옥황차사 · 木",eye:"#2a9d8f",
  look:"흑발을 한쪽으로 가르마 타 이마를 드러내고, 어깨까지 내려오는 머리를 꽁지로 묶었다. 청록빛 눈, 날카로운 눈매, 다부진 체형. 작은 키는 아니나, 팀원들끼리 있을 땐 제일 작다. 목까지 잠근 검은 제복, 양손에 검은 덩굴무늬 타투.",
  power:"초목을 키우고 다룬다. 낙성과 페어였을 땐 가장 든든한 조력자였으나, 지금은 그의 빛에 가장 먼저 타버리는 능력이 되었다.",
  mind:"본래 불같은 성미였지만 팀장이 된 뒤엔 책임이 무엇보다 먼저라는 것을 배워 어느정도 차분해졌다. 하지만 성격을 완전히 죽이진 못했는지, 마음에 안드는 상황이 생기면 행동이 날카로워진다.",
  talk:"공식 자리에서는 딱딱한 존댓말, 팀원에게는 짧은 반말.",
  habit:"화를 누를 때 머리끈을 풀었다 다시 묶는다.",
  line:"앉아. 브리핑은 한 번만 한다."},
 {img:"https://i.postimg.cc/ZYXPj9nb/IMG-04.webp",pos:"",g:"再建局 開門犯罪部 3팀",code:"명경",sig:"鏡",real:"백라온",meta:"남 · 27세 · 183cm",role:"3팀원 · 2품 염라차사 · 水",eye:"#8fa3b0",
  look:"살짝 흐트러진 백발 숏컷, 청회색 눈, 둥근 은테 안경, 흰 피부. 얼굴은 순한 동안이지만 키가 크고 탄탄한 체격으로 갭이 있다. 제복에 장갑. 능력을 쓰면 눈동자에 물결빛이 돈다.",
  power:"물을 거울처럼 펼쳐 혼백을 비춘다. 거짓과 기억을 읽고, 혼백을 묶어 진정시키는 힘에 특화되어 있다.",
  mind:"차분하고 지적이며 논리적이다. 감정보다 근거. 낙성은 생포해서 배후를 캐야 한다고 보며 이때문에 사사건건 반석과 충돌한다.",
  talk:"정중한 존댓말.",
  habit:"말하기 전에 안경을 밀어 올린다.",
  line:"생포가 우선입니다. 문조각의 행방을 아는 건 그뿐이니까요."},
 {img:"https://i.postimg.cc/sfbPKBxf/IMG-05.webp",pos:"",g:"再建局 開門犯罪部 3팀",code:"반석",sig:"磐",real:"권준혁",meta:"남 · 28세 · 188cm",role:"3팀원 · 3품 옥황차사 · 土",eye:"#f1e08a",
  look:"흑발, 밝고 옅은 노란 눈, 약간 어두운 피부. 팀 최장신에 웃으면 눈이 접히는 강아지상. 단추 하나 푼 제복, 걷은 소매.",
  power:"바위를 갑주처럼 두르고 대지로 방벽을 세운다. 봉인 결계의 기반을 다집니다. 낙성의 불을 받으면 오히려 더 단단해지는, 3팀의 유일한 방패다.",
  mind:"단순하고 직진적이다. 실적 욕심이 있어 행동주의적이지만 그렇다고 이기적으로 굴진 못하는 천성. 평소엔 생각을 덜어내고 있지만, 결정적인 순간에는 뇌가 빠르게 굴러간다.",
  talk:"반말이 섞이는 거침없는 존댓말. 명경에게는 반말, 팀장 앞에서는 아직 조심스럽다.",
  habit:"주머니에 사탕을 넣고 다니다 긴장하면 깨문다.",
  line:"그러니까 즉시 봉인하자고. 말 섞다 문 하나 더 열리면, 그땐 기자가 아니라 이형이 온다."},
 {img:"https://i.postimg.cc/XNtKxZq4/IMG-06.webp",pos:"",g:"現義그룹 神物開發部",gs:"협력자",code:"산예",sig:"狻",real:"사공선화",meta:"여 · 31세 · 172cm",role:"신물개발부장 · 2품 염라차사 · 金",eye:"#111111",
  look:"어깨까지 오는 베이지색 웨이브, 새카만 눈, 날카로운 눈매, 긴 다리. 하얀 정장 재킷을 어깨에 걸치고 셔츠 단추를 여럿 풀었다. 입에는 언제나 담배를 꼬나물고 있다.",
  power:"금속을 다루고 무기를 빚어 낸다. 문조각을 무기로 만들 수 있는 유일한 사람이며 덕분에 부장자리를 차지하고 있다.",
  mind:"건달 기질에 태도는 불량하지만 머리는 냉철하다. 험한 일도 남들 손을 빌리지 않고 직접 하며, 행동거지와 말투가 거친 편이다. 신단과는 동갑내기며 서로 기싸움을 하고 있다.",
  talk:"거침없고 투박한 반말. 때로는 적나라하고, 비꼴 때는 비릿하다.",
  habit:"담배를 손가락 사이에서 돌리다 그대로 상대를 가리킨다.",
  line:"왔네. 목에 건 그거, 오늘부터 목줄 찬 내 똥강아지가 됐다는 뜻이야."},
 {img:"https://i.postimg.cc/tCP3cXng/IMG-07.webp",pos:"",g:"現義그룹 神物開發部",code:"김서방",sig:"鬼",real:"정건",meta:"남 · 26세 · 184cm",role:"미등록 술사(도깨비 계약) · 火 · 영매",eye:"#1fa64a",
  look:"반묶음한 적갈색 머리, 강렬한 녹안, 올라간 눈꼬리, 탄탄한 체형에 넓은 어깨. 피어싱과 반지가 많고, 넥타이 없이 풀어헤친 하얀 정장. 능력을 쓰면 눈에 푸른 인광이 돈다.",
  power:"도깨비불로 환각을 일으키고 물건을 둔갑시키거나 빼돌린다. 태우지 않고 홀리는 불.",
  mind:"능글맞고 장난스럽다. 태도가 가벼워보이지만 사실은 은근하게 진짜 사랑을 원하는 순정파. 은근 헤프다. 미등록 영매로, 자신의 영매능력을 노리면 경계한다. 산예를 누님이라 부른다.",
  talk:"가벼운 반말. 누구에게나 멋대로 별명을 붙인다.",
  habit:"반지를 빼서 손가락 위로 굴린다.",
  line:"와, 이건 표 팔아야 되는데."}
];
const castEl=document.getElementById('cast');
let curG=null,grp;
CAST.forEach((c,i)=>{
  if(c.g!==curG){curG=c.g;grp=document.createElement('div');grp.className='cast-group';grp.innerHTML=`<p>${c.g}${c.gs?`<small>${c.gs}</small>`:''}</p>`;castEl.appendChild(grp)}
  const id='p'+i;
  const el=document.createElement('article');
  el.className='person'+(c.villain?' villain':'')+(c.img?' has-img':'');
  const head=c.img
    ?`<span class="pimg"><img src="${c.img}" alt="${c.code}" loading="lazy" style="object-position:${c.pos||'center'}"></span>
      <span class="ptext"><span><span class="nm">${c.villain?'31번 ':''}${c.code}<small>${c.real}</small></span><span class="rl">${c.role}</span><span class="meta">${c.meta}</span></span><span class="chev" aria-hidden="true"></span></span>`
    :`<span class="sig" aria-hidden="true">${c.sig}</span>
      <span><span class="nm">${c.villain?'31번 ':''}${c.code}<small>${c.real}</small></span><span class="rl">${c.role}</span></span>
      <span class="chev" aria-hidden="true"></span>`;
  el.innerHTML=`<button type="button" aria-expanded="false" aria-controls="${id}">${head}</button>
    <div class="detail" id="${id}" hidden>
      <dl>
        <dt>기본</dt><dd>${c.meta}</dd>
        <dt>외형</dt><dd><span class="eye" style="background:${c.eye}" aria-hidden="true"></span>${c.look}</dd>
        <dt>능력</dt><dd>${c.power}</dd>
        <dt>성격</dt><dd>${c.mind}</dd>
        <dt>말투</dt><dd>${c.talk}</dd>
        <dt>습관</dt><dd>${c.habit}</dd>
      </dl>
      <p class="quote">“${c.line}”</p>
    </div>`;
  const b=el.querySelector('button'),d=el.querySelector('.detail');
  b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));d.hidden=o});
  grp.appendChild(el);
});

/* ── 페르소나 압축 ── */
const $=id=>document.getElementById(id);
const form=$('pform'),out=$('result'),cnt=$('cnt');
const radio=n=>(form.querySelector(`input[name="${n}"]:checked`)||{}).value||'';
const v=id=>$(id).value.trim();
function build(){
  const name=v('f-name')||'{{user}}',alias=v('f-alias');
  const sex=radio('sex'),age=v('f-age'),h=v('f-height');
  const org=$('f-org').value,dept=v('f-dept'),type=$('f-type').value,rank=$('f-rank').value;
  const el=radio('el'),md=radio('md');
  const head=['## Ⓤ '+name];
  if(alias)head.push('이명 '+alias);
  const body=[sex,age].filter(Boolean).join(' ');
  if(body)head.push(body);
  if(h)head.push(h.replace(/cm$/i,'')+'cm');
  const lines=[head.join(' / ')];
  const aff=[org+(dept?' '+dept:'')];
  const pw=[type==='非能力者'?'非能力者':[rank,type].filter(Boolean).join(' ')];
  let a='소속: '+aff.join('')+', '+pw.join('');
  if(el&&type!=='非能力者')a+='. '+el;
  lines.push(a);
  if(md)lines.push('體質: 靈媒(鎭魂 가능)');
  const add=(k,id)=>{const t=v(id).replace(/\s*\n\s*/g,' ');if(t)lines.push(k+': '+t)};
  add('능력','f-power');
  const txt=lines.join('\n');
  out.textContent=txt;
  cnt.textContent=txt.length;
  cnt.classList.toggle('over',txt.length>500);
}
form.addEventListener('input',build);
form.addEventListener('change',build);
$('resetBtn').addEventListener('click',()=>{form.reset();build()});
$('copyBtn').addEventListener('click',async()=>{
  const btn=$('copyBtn');
  try{await navigator.clipboard.writeText(out.textContent)}catch(e){
    const r=document.createRange();r.selectNodeContents(out);const s=getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges();
  }
  btn.textContent='복사됨';btn.classList.add('done');
  setTimeout(()=>{btn.textContent='복사하기';btn.classList.remove('done')},1600);
});
build();

/* ── CCTV 시각 ── */
(function(){const el=document.getElementById('cctvTime');if(!el)return;let s=0;
setInterval(()=>{s++;const m=17+Math.floor(s/60),ss=s%60;el.textContent='開門 12.11.14 02:'+String(m%60).padStart(2,'0')+':'+String(ss).padStart(2,'0')},1000)})();
