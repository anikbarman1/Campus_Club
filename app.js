const clubs=[
{name:"Computer Club",cat:"Technology",members:320,icon:"‹›",desc:"Learn programming, web development, software technologies, and explore new ideas with fellow students."},
{name:"Robotics Club",cat:"Engineering",members:185,icon:"⚙",desc:"Build innovative projects, learn robotics, electronics, automation, and participate in competitions."},
{name:"Photography Club",cat:"Creative Arts",members:240,icon:"◉",desc:"Improve your photography skills, share creative work, and participate in campus photography events."},
{name:"Business Club",cat:"Business",members:210,icon:"↗",desc:"Explore entrepreneurship, marketing, finance, and connect with future business leaders."},
{name:"Football Club",cat:"Sports",members:175,icon:"●",desc:"Train together, organize matches, and build friendships through university sports."},
{name:"Design & Media",cat:"Creative Arts",members:145,icon:"✎",desc:"Create visual stories, digital content, posters, videos, and social media campaigns."}];
const chats=[
{id:1,name:"Computer Club",sub:"320 members",avatar:"CC",type:"group",last:"Rafi: The workshop starts at 3 PM.",time:"2:18 PM",msgs:[["received","Rafi","Hey everyone! The web development workshop is tomorrow.","2:14 PM"],["received","Nadia","I’ll be there. Can someone share the room number?","2:16 PM"],["sent","You","Room 204, Computer Science Building. See you there!","2:18 PM"]]},
{id:2,name:"Robotics Club",sub:"185 members",avatar:"RC",type:"group",last:"Maya: Great prototype!",time:"1:42 PM",msgs:[["received","Maya","We finished testing the new line-following robot.","1:38 PM"],["received","Arif","Great prototype!","1:42 PM"]]},
{id:3,name:"Nadia Rahman",sub:"Computer Club · Online",avatar:"NR",type:"person",last:"Can you send the notes?",time:"12:30 PM",msgs:[["received","Nadia","Hi! Can you send the notes from yesterday’s meeting?","12:28 PM"],["sent","You","Sure, I’ll send them here.","12:30 PM"]]},
{id:4,name:"Campus Events",sub:"University community",avatar:"CE",type:"group",last:"Photography walk this Friday.",time:"Yesterday",msgs:[["received","Sam","Photography walk this Friday at 4 PM.","Yesterday"]]},
{id:5,name:"Tanvir Ahmed",sub:"Student · Online",avatar:"TA",type:"person",last:"Thanks!",time:"Yesterday",msgs:[["sent","You","Welcome to Campus Club!","Yesterday"],["received","Tanvir","Thanks!","Yesterday"]]}
];
const events=[
["SEP 28","Web Development Workshop","Computer Club","Room 204 · 3:00 PM"],
["OCT 02","Robotics Project Showcase","Robotics Club","Innovation Lab · 2:00 PM"],
["OCT 05","Campus Photography Walk","Photography Club","Main Gate · 4:00 PM"],
["OCT 09","Student Entrepreneurship Meetup","Business Club","Auditorium · 11:00 AM"],
["OCT 14","Inter-Club Football Match","Football Club","University Field · 4:30 PM"],
["OCT 18","Design & Media Night","Design & Media","Media Lab · 6:00 PM"]
];

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function showView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='chat'&&!window.chatInitialized)initChat();}
document.addEventListener('click',e=>{const btn=e.target.closest('[data-view]');if(btn)showView(btn.dataset.view);});
function clubCard(c){return `<article class="club-card"><div class="club-icon">${c.icon}</div><span class="tag">${c.cat}</span><h3>${c.name}</h3><p>${c.desc}</p><div class="club-bottom"><span>${c.members} Members</span><button onclick="openClub('${c.name}')">View Club</button></div></article>`}
function renderClubs(){const q=($('#clubSearch')?.value||'').toLowerCase(),cat=$('#clubCategory')?.value||'all';const list=clubs.filter(c=>(cat==='all'||c.cat===cat)&&(c.name.toLowerCase().includes(q)||c.cat.toLowerCase().includes(q)||c.desc.toLowerCase().includes(q)));$('#allClubs').innerHTML=list.map(clubCard).join('');}
$('#featuredClubs').innerHTML=clubs.slice(0,3).map(clubCard).join('');renderClubs();
$('#clubSearch')?.addEventListener('input',renderClubs);$('#clubCategory')?.addEventListener('change',renderClubs);
function openClub(name){showView('chat');setTimeout(()=>selectChat(chats.find(c=>c.name===name)||chats[0]),50)}
function renderConversations(filter=''){const list=chats.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase()));$('#conversationList').innerHTML=list.map(c=>`<div class="conversation" data-id="${c.id}"><div class="avatar avatar-blue">${c.avatar}</div><div class="conversation-main"><div class="conversation-top"><strong>${c.name}</strong><time>${c.time}</time></div><p>${c.last}</p></div></div>`).join('');$$('.conversation').forEach(el=>el.addEventListener('click',()=>selectChat(chats.find(c=>c.id==el.dataset.id))));}
function selectChat(c){window.currentChat=c;$$('.conversation').forEach(x=>x.classList.toggle('active',+x.dataset.id===c.id));$('#chatHeader').innerHTML=`<div class="avatar avatar-blue">${c.avatar}</div><div><h3>${c.name}</h3><span>${c.sub}</span></div><div class="chat-header-actions"><button>⌕</button><button>⋮</button></div>`;$('#messageArea').innerHTML=`<div class="day-divider">TODAY</div>`+c.msgs.map(m=>`<div class="bubble ${m[0]}">${m[1]!== 'You'?`<b>${m[1]}</b><br>`:''}${m[2]}<time>${m[3]}</time></div>`).join('');$('#messageArea').scrollTop=999999;}
function initChat(){window.chatInitialized=true;renderConversations();selectChat(chats[0]);}
$('#chatSearch')?.addEventListener('input',e=>renderConversations(e.target.value));
$('#messageForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#messageInput'),text=input.value.trim();if(!text||!window.currentChat)return;window.currentChat.msgs.push(['sent','You',text,new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})]);selectChat(window.currentChat);input.value='';});
$('#newChat').addEventListener('click',()=>toast('New conversation: choose a club from Explore Clubs.'));
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
$('#registrationForm').addEventListener('submit',e=>{e.preventDefault();const skills=$$('[name="skills"]:checked');if(!skills.length){toast('Please select at least one skill or interest.');return}const p=$('[name="password"]').value,c=$('[name="confirm"]').value;if(p!==c){toast('Passwords do not match.');return}toast('Registration submitted successfully! Welcome to Campus Club.');});
$('#notifyBtn').addEventListener('click',()=>toast('You have 3 new campus notifications.'));
$('#searchBtn').addEventListener('click',()=>toast('Tip: use Explore Clubs or Messages to search your campus.'));
$('#mobileMenu').addEventListener('click',()=>{$('.main-nav').style.display=$('.main-nav').style.display==='flex'?'none':'flex';});
$('#eventGrid').innerHTML=events.map(e=>`<article class="event"><span class="event-date">${e[0]}</span><h3>${e[1]}</h3><p>${e[2]} · ${e[3]}</p><button onclick="toast('Event saved to your campus calendar.')">Save Event</button></article>`).join('');
