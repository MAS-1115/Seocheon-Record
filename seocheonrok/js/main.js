/* 플레이 링크: 크랙 URL로 바꿔 주세요 */
const PLAY_URL = "";

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
 {g:"順命敎團",gs:"수배 중",code:"낙성",sig:"落",real:"류채호",villain:true,meta:"남 · 33세 · 187cm",role:"순명교단 간부 · 前 재건국 1품 옥황차사 · 火",eye:"#d9a62e",
  look:"밝은 갈색 머리를 7:3 가르마로 넘겼습니다. 황금 같은 눈, 처진 눈매, 짙은 눈 밑 그늘. 제복의 흔적이 남은 검은 롱코트에 세 갈래 붉은 노리개를 찹니다. 손목과 목에 빛의 균열이 번져 있습니다.",
  power:"서광(曙光). 새벽빛을 압축한 칼날과 눈을 멀게 하는 빛. 해봉(解封). 봉인을 거꾸로 푸는 술수.",
  mind:"겉은 다정하고 정중합니다. 속은 지쳐 있고, 신념 앞에서는 가차없습니다.",
  talk:"낮고 느린 존댓말. 격해지면 반말이 섞입니다.",
  habit:"생각에 잠기면 엄지로 손목의 균열을 문지릅니다.",
  line:"지금은 낙성입니다, 신단. 그 이름은 버렸다고 했을 텐데요."},
 {g:"再建局 開門犯罪部 3팀",gs:"추적팀",code:"신단",sig:"神",real:"한송현",meta:"남 · 31세 · 180cm",role:"3팀장 · 1품 옥황차사 · 木",eye:"#2a9d8f",
  look:"흑발 픽시컷에 어깨뼈까지 오는 꽁지머리, 청록빛 눈, 날카로운 눈매. 목까지 잠근 검은 제복, 양손에 덩굴무늬 타투.",
  power:"초목을 키우고 다룹니다. 낙성과 페어였을 때는 나무가 불의 길을 열었지만, 지금은 그 불에 타는 연료가 됩니다.",
  mind:"본래 불같은 성미였지만 팀장이 된 뒤 차분해졌습니다. 책임이 무엇보다 먼저입니다. 공식 자리가 끝나면 본성이 나옵니다.",
  talk:"공식 자리에서는 딱딱한 존댓말, 팀원에게는 짧은 반말.",
  habit:"화를 누를 때 꽁지머리를 풀었다 다시 묶습니다.",
  line:"앉아. 브리핑은 한 번만 한다."},
 {g:"再建局 開門犯罪部 3팀",code:"명경",sig:"鏡",real:"백이현",meta:"남 · 27세 · 183cm",role:"3팀원 · 2품 염라차사 · 水",eye:"#8fa3b0",
  look:"백발 픽시컷, 청회색 눈, 은테 안경, 흰 피부. 제복에 장갑. 능력을 쓰면 눈동자에 물결빛이 돕니다.",
  power:"물을 거울처럼 펼쳐 혼백을 비춥니다. 거짓과 기억을 읽고, 혼백을 묶습니다.",
  mind:"차분하고 지적이며 논리적입니다. 감정보다 근거. 낙성은 생포해서 배후를 캐야 한다고 봅니다.",
  talk:"정중한 존댓말. 짧고 정확합니다.",
  habit:"말하기 전에 안경을 밀어 올립니다.",
  line:"생포가 우선입니다. 문조각의 행방을 아는 건 그뿐이니까요."},
 {g:"再建局 開門犯罪部 3팀",code:"반석",sig:"磐",real:"권준혁",meta:"남 · 28세 · 188cm",role:"3팀원 · 3품 옥황차사 · 金",eye:"#f1e08a",
  look:"흑발, 밝고 옅은 노란 눈, 약간 어두운 피부. 팀 최장신에 웃으면 눈이 접히는 강아지상. 단추 하나 푼 제복, 걷은 소매.",
  power:"쇠를 두르고 방벽을 세웁니다. 봉인 결계의 틀을 잡습니다. 힘을 쓰면 손바닥이 회색으로 변합니다.",
  mind:"단순하고 직진적입니다. 실적 욕심이 있지만 팀원은 절대 버리지 못합니다. 결정적인 순간에는 단단해집니다.",
  talk:"밝고 툭툭 던지는 존댓말.",
  habit:"주머니에 사탕을 넣고 다니다 긴장하면 깨뭅니다.",
  line:"즉시 봉인해야죠. 배신자랑 말 섞을 시간에 문이 하나 더 열려요."},
 {g:"現義그룹 神物開發部",gs:"협력자",code:"산예",sig:"狻",real:"사공선화",meta:"여 · 31세 · 172cm",role:"신물개발부장 · 2품 염라차사 · 土",eye:"#111111",
  look:"어깨까지 오는 베이지색 웨이브, 새카만 눈, 날카로운 눈매, 긴 다리. 하얀 정장 재킷을 어깨에 걸치고, 셔츠 단추를 여럿 풀었습니다. 입에는 담배.",
  power:"땅과 광물을 다루고 금속을 빚어 무기를 만듭니다. 문조각을 무기로 만들 수 있는 유일한 사람입니다.",
  mind:"건들거리고 태도는 불량하지만 머리는 냉철합니다. 한 약속은 지킵니다. 신단과는 동갑 기싸움 중.",
  talk:"느긋한 반말. 부하에게는 짧은 명령.",
  habit:"담배를 손가락 사이에서 돌리다 그대로 상대를 가리킵니다.",
  line:"협력은 해 줘. 대신 문조각은 우리가 먼저 줍는다."},
 {g:"現義그룹 神物開發部",code:"김서방",sig:"鬼",real:"정건",meta:"남 · 26세 · 184cm",role:"미등록 술사(도깨비 계약) · 火 · 영매",eye:"#1fa64a",
  look:"반묶음한 적갈색 머리, 강렬한 녹안, 올라간 눈꼬리. 피어싱과 반지가 많고, 넥타이 없이 풀어헤친 하얀 정장. 능력을 쓰면 눈에 푸른 인광이 돕니다.",
  power:"도깨비불로 환각을 일으키고 물건을 둔갑시키거나 빼돌립니다. 태우지 않고 홀리는 불입니다.",
  mind:"능글맞고 장난스럽습니다. 작중 유일한 영매라 모두가 그를 필요로 합니다. 산예를 누님이라 부릅니다.",
  talk:"가벼운 존댓말에 농담을 섞습니다.",
  habit:"반지를 빼서 손가락 위로 굴립니다.",
  line:"와, 이건 표 팔아야 되는데."}
];
const castEl=document.getElementById('cast');
let curG=null,grp;
CAST.forEach((c,i)=>{
  if(c.g!==curG){curG=c.g;grp=document.createElement('div');grp.className='cast-group';grp.innerHTML=`<p>${c.g}${c.gs?`<small>${c.gs}</small>`:''}</p>`;castEl.appendChild(grp)}
  const id='p'+i;
  const el=document.createElement('article');
  el.className='person'+(c.villain?' villain':'');
  el.innerHTML=`<button type="button" aria-expanded="false" aria-controls="${id}">
      <span class="sig" aria-hidden="true">${c.sig}</span>
      <span><span class="nm">${c.villain?'31번 ':''}${c.code}<small>${c.real}</small></span><span class="rl">${c.role}</span></span>
      <span class="chev" aria-hidden="true"></span>
    </button>
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
  add('외형','f-look');add('능력','f-power');
  const mind=v('f-mind');if(mind)lines.push('성격: '+mind.split(/[,，]/).map(s=>s.trim()).filter(Boolean).join(' / '));
  add('말투','f-talk');add('습관','f-habit');add('과거','f-past');add('관계','f-rel');
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
