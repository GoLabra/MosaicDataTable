(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{5833:(e,a,t)=>{Promise.resolve().then(t.bind(t,2822)),Promise.resolve().then(t.bind(t,8967))},8967:(e,a,t)=>{"use strict";t.d(a,{FullImplementationTable:()=>z});var r=t(54568),i=t(3721),n=t(98275),s=t(27494),l=t(18427),o=t(43271),d=t(48794),u=t(41398),c=t(46445),g=t(3528),h=t(2822),m=t(26709),p=t(29190),y=t(7620),f=t(78223),v=t(32680),w=t(89752);let x=e=>{let[a,t]=(0,w.ZA)("p",w.GJ.withDefault(1)),[r,i]=(0,w.ZA)("rpp",w.GJ.withDefault(e.initialRowsPerPage)),[n,s]=(0,w.ZA)("s",w.tU.withDefault(e.initialSortBy)),[l,o]=(0,w.ZA)("o",w.tU.withDefault(e.initialOrder)),[d,u]=(0,w.ZA)("f",(0,w.os)()),c=(0,y.useCallback)(e=>{t(e)},[t]),g=(0,y.useCallback)(e=>{i(e),t(1)},[i,t]),h=(0,y.useCallback)((e,a)=>{s(e),o(a)},[s,o]),m=(0,y.useCallback)(e=>{u(e),t(1)},[s,o]),p=(0,y.useMemo)(()=>({page:a,rowsPerPage:r,sortBy:n,order:l,filter:d}),[a,r,n,l,d]);return(0,y.useMemo)(()=>({handlePageChange:c,handleRowsPerPageChange:g,handleSortChange:h,handleFilterChange:m,state:p}),[c,g,h,m,p])};var C=t(87891);let k=e=>{let{searchState:a}=e,[t,r]=(0,y.useState)(A),[i,n]=(0,y.useState)(!1),s=(0,C.u)();(0,y.useEffect)(()=>{n(!0);let e=setTimeout(()=>{n(!1)},500);return()=>clearTimeout(e)},[a]);let l=(0,y.useMemo)(()=>a.filter?t.filter(e=>Object.entries(a.filter).every(a=>{let[t,r]=a;if(!r.value)return!0;let i=e[t],n=null==i?void 0:i.toString().toLowerCase(),l=r.value.toLowerCase();switch(r.operation){case"starts-with":return n.startsWith(l);case"ends-with":return n.endsWith(l);case"contains":default:return n.includes(l);case"equals":return n===l;case"less-than":if(/^\d+$/.test(l))return i<parseFloat(l);return i<s.utils.parse(l,"YYYY-MM-DD").toDate();case"less-or-equal-than":if(/^\d+$/.test(l))return parseFloat(i)<=parseFloat(l);return i<=s.utils.parse(l,"YYYY-MM-DD").toDate();case"bigger-than":if(/^\d+$/.test(l))return parseFloat(i)>parseFloat(l);return i>s.utils.parse(l,"YYYY-MM-DD").toDate();case"bigger-or-equal-than":if(/^\d+$/.test(l))return parseFloat(i)>=parseFloat(l);return i>=s.utils.parse(l,"YYYY-MM-DD").toDate()}})):t,[i]),o=l.length,d=(0,y.useMemo)(()=>e.searchState.sortBy?[...l].sort((t,r)=>{let i=t[e.searchState.sortBy],n=r[e.searchState.sortBy];return"asc"===a.order?i>n?1:-1:i<n?1:-1}):t,[i]),u=(0,y.useMemo)(()=>{let e=(a.page-1)*a.rowsPerPage,t=e+a.rowsPerPage;return d.slice(e,t)},[i]),c=(0,y.useMemo)(()=>Math.ceil(o/a.rowsPerPage),[o,a.rowsPerPage]);return(0,y.useMemo)(()=>({state:{data:u,dataLoading:i,pagesCount:c,totalItems:o}}),[i,u,c,o])},A=[{id:1,name:"Max Mustermann",email:"max.mustermann@mail.com",rating:3.5,age:30,gender:"male",phone:"+1 (123) 456-7890",address:"Vienna, Austria",progress:100,verified:!1,registrationDate:new Date(2019,1,1),status:"Active",role:"Admin",country:"Austria",countryCode:"at",city:"Vienna",language:"German",tokens:100},{id:2,name:"John Doe",email:"juan.perez@mail.com",rating:4.5,age:25,gender:"female",phone:"+1 (456) 456-7890",address:"Washington DC, USA",progress:100,verified:!0,registrationDate:new Date(2022,1,1),status:"Active",role:"Admin",country:"USA",countryCode:"us",city:"Washington DC",language:"English",tokens:72},{id:3,name:"Juan P\xe9rez",email:"juan.perez@mail.com",rating:2,age:22,gender:"male",phone:"+1 (789) 456-7890",address:"Madrid, Spain",progress:50,verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"Spain",countryCode:"es",city:"Madrid",language:"Spanish",tokens:12},{id:4,name:"Mario Rossi",email:"mario.rossi@mail.com",rating:0,age:22,gender:"male",phone:"+1 (101) 456-7890",address:"123 Main St, Anytown, USA",progress:25,verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"Italy",countryCode:"it",city:"Rome",language:"Italian",tokens:10},{id:5,name:"Andrei Vinca",email:"andrei.vinca@outlook.com",rating:1.5,age:37,gender:"male",phone:"+1 (112) 456-7890",progress:10,address:"Cluj-Napoca, Romania",verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"Romania",countryCode:"ro",city:"Bucharest",language:"Romanian",tokens:99},{id:6,name:"Jean Dupont",email:"jean.dupont@mail.com",rating:5,age:22,gender:"male",phone:"+1 (131) 456-7890",address:"Paris, France",progress:12,verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"France",countryCode:"fr",city:"Paris",language:"French",tokens:45},{id:7,name:"Nino Kalandadze",email:"giorgi.beridze@mail.com",rating:2.5,age:17,gender:"female",phone:"+1 (131) 456-7890",address:"Tbilisi, Georgia",progress:12,verified:!0,registrationDate:new Date(2017,10,1),status:"Active",role:"Admin",country:"Georgia",countryCode:null,city:"Tbilisi",language:"Georgian",tokens:92},{id:8,name:"Andreas Georgiou",email:"andreas.georgiou@mail.com",rating:3.5,age:18,gender:"male",phone:"+1 (131) 456-7890",address:"Nicosia, Cyprus",progress:12,verified:!0,registrationDate:new Date(2018,3,1),status:"Inactive",role:"User",country:"Cyprus",countryCode:null,city:"Nicosia",language:"Greek",tokens:33},{id:9,name:"Jo\xe3o da Silva",email:"giorgi.beridze@mail.com",rating:1.5,age:17,gender:"male",phone:"+1 (131) 456-7890",address:"Rio de Janeiro, Brazil",progress:21,verified:!0,registrationDate:new Date(2017,10,1),status:"Active",role:"User",country:"Brazil",countryCode:null,city:"Rio de Janeiro",language:"Portuguese",tokens:34},{id:10,name:"Naledi Khumalo",email:"naledi.khumalo@mail.com",rating:1,age:14,gender:"female",phone:"+1 (131) 456-7890",address:"Cape Town, South Africa",progress:75,verified:!0,registrationDate:new Date(2017,10,1),status:"Active",role:"User",country:"South Africa",countryCode:null,city:"Cape Town",language:"Afrikaans",tokens:51},{id:11,name:"Hanako Suzuki",email:"hanako.suzuki@mail.com",rating:2.5,age:17,gender:"male",phone:"+1 (131) 456-7890",address:"Tokyo, Japan",progress:12,verified:!0,registrationDate:new Date(2017,10,1),status:"Active",role:"User",country:"Japan",countryCode:null,city:"Tokyo",language:"Japanese",tokens:86}],D=e=>({storeIds:(0,y.useMemo)(()=>e.data?e.data.map(e=>e.id):[],[e]),getId:(0,y.useCallback)(e=>null==e?void 0:e.id,[])}),S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],[a,t]=(0,y.useState)([]);(0,y.useEffect)(()=>{t([])},[e]);let r=(0,y.useCallback)(()=>{t([...e])},[e]),i=(0,y.useCallback)(e=>{t(a=>[...a,e])},[]);return{handleDeselectAll:(0,y.useCallback)(()=>{t([])},[]),handleDeselectOne:(0,y.useCallback)(e=>{t(a=>a.filter(a=>a!==e))},[]),handleSelectAll:r,handleSelectOne:i,selected:a}};var j=t(93054),b=t(81623),F=t(29204);let I=(0,t(61993).default)(m.default)({display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px"}),M=e=>{let{page:a,pagesCount:t,totalItems:i,onChange:n}=e;return(0,r.jsx)(j.A,{count:t,page:a,onChange:(e,a)=>n(a),renderItem:e=>(0,r.jsxs)(r.Fragment,{children:["next"===e.type&&i>0&&(0,r.jsx)(b.A,{title:"Total Items Count",children:(0,r.jsx)(o.A,{label:i,sx:{minWidth:"40px",padding:"0 10px",borderRadius:1,margin:"0 10px"}})}),(0,r.jsx)(F.A,{...e})]})})};var Y=t(70576),P=t.n(Y);let z=()=>{let e=x({initialSortBy:"id",initialOrder:"asc",initialRowsPerPage:6}),a=k({searchState:e.state}),t=S(D(a.state).storeIds),w=(0,p.XN)({pin:"left",breakpoint:"sm",direction:"up"}),C=(0,p.XN)({pin:"left",breakpoint:"md",direction:"up"}),A=(0,p.XN)({pin:!0,breakpoint:"lg",direction:"up"}),j=(0,p.C3)({breakpoint:"md",direction:"up"}),b=(0,y.useMemo)(()=>[{id:"id",header:"ID",width:80,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.id})},{id:"name",header:"Name",width:200,hasSort:!0,cell:e=>(0,r.jsxs)(s.default,{direction:"row",alignItems:"center",gap:1,children:[(0,r.jsx)(l.A,{...(0,n.n)(e.name)}),e.name]}),pin:w,highlight:!0},{id:"email",header:"E-mail",width:200,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.email})},{id:"country",header:"Country",width:150,hasSort:!0,pin:C,cell:e=>(0,r.jsxs)(s.default,{direction:"row",alignItems:"center",gap:1,children:[(0,r.jsx)(i.I,{country:e.countryCode,sx:{fontSize:24,color:"primary.main"}}),e.country]})},{id:"city",header:()=>"City",width:150,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.city})},{id:"age",header:"Age",width:80,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.age})},{id:"gender",header:"Gender",width:100,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.gender})},{id:"address",header:"Address",width:200,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.address})},{id:"phone",header:"Phone",width:150,cell:e=>(0,r.jsx)(r.Fragment,{children:e.phone})},{id:"status",header:"Status",width:120,hasSort:!0,cell:e=>"Active"===e.status?(0,r.jsx)(o.A,{label:"Active",color:"primary",size:"small"}):(0,r.jsx)(o.A,{label:"Inactive",color:"secondary",size:"small"})},{id:"tokens",header:"Tokens",width:100,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.tokens}),pin:A},{id:"language",header:"Language",width:150,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.language})},{id:"progress",header:"Progress",width:100,cell:e=>(0,r.jsx)(d.A,{color:"success",value:e.progress,variant:"determinate"})},{id:"Verified",header:"verified",width:100,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.verified?"Yes":"No"})},{id:"registrationDate",header:"Registered On",width:210,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:P()(e.registrationDate).format("MMM DD, YYYY, hh:mm:ss A")}),visible:j},{id:"role",header:"Role",width:120,hasSort:!0,cell:e=>(0,r.jsx)(r.Fragment,{children:e.role})},{id:"rating",header:"Rating",width:180,cell:e=>(0,r.jsx)(u.A,{name:"half-rating",defaultValue:e.rating,precision:.5,readOnly:!0})}],[w,C,A,j]),F=(0,y.useCallback)(e=>"role"===e,[]),Y=[{id:"edit",render:e=>(0,r.jsxs)(c.A,{id:"edit-menu-item",children:[" ",(0,r.jsx)(g.A,{children:(0,r.jsx)(v.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,r.jsxs)(c.A,{id:"remove-menu-item",children:[" ",(0,r.jsx)(g.A,{children:(0,r.jsx)(f.A,{})})," Remove "]},"remove-".concat(e))}],z=(0,p.sJ)(p.K0,(0,p.Z_)(p.uV,{visible:!0,filter:e.state.filter,filterChanged:e.handleFilterChange,key:"filter_row",filterColumns:(0,y.useMemo)(()=>({name:"string",city:{type:"string",...p.ZG},email:{type:"string",operators:[{value:"contains",label:"Contains",iconText:"@"},{value:"starts-with",label:"Starts With",iconText:"@["}],defaultOperator:"contains"},country:{type:"select",selectOptions:[{value:"Austria",label:"Austria"},{value:"Brazil",label:"Brazil"},{value:"Cyprus",label:"Cyprus"},{value:"France",label:"France"},{value:"Italy",label:"Italy"},{value:"Japan",label:"Japan"},{value:"Romania",label:"Romania"},{value:"South Africa",label:"South Africa"},{value:"USA",label:"USA"}]},registrationDate:{type:"date",...p.zF,defaultOperator:"less-or-equal-than"},tokens:{type:"number",...p.zF}}),[])}),(0,p.Z_)(p.ki,{visible:!0,key:"symmary_row",summaryColumns:{name:e=>(0,r.jsx)(h.default,{fontWeight:700,children:"Total"}),tokens:e=>(0,r.jsx)(h.default,{fontWeight:700,children:a.state.data.reduce((e,a)=>e+a.tokens,0)})}}),(0,p.Z_)(p.kL,{}),(0,p.Z_)(p.Mz,{order:e.state.order,orderBy:e.state.sortBy,onSort:e.handleSortChange}),(0,p.Z_)(p.aY,{onGetRowId:e=>e.id,onSelectOne:t.handleSelectOne,onDeselectOne:t.handleDeselectOne,selectedIds:t.selected}),(0,p.Z_)(p.Jh,{showExpanderButton:!0,onGetRowId:e=>e.id,expanstionStore:(0,p.ah)(),getExpansionNode:(0,y.useCallback)((e,a)=>(0,r.jsxs)(p.wS,{sx:{p:5},children:["Hello ",e.name]}),[])}),p.U5,(0,p.Z_)(p.tC,{actions:Y}),(0,p.Z_)(p.mt,{isColumnHighlighted:F}),p.he,(0,p.Z_)(p.NO,{isLoading:a.state.dataLoading}),(0,p.Z_)(p.Vk,{content:"Wow, such empty!"}));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.default,{alignItems:"center",direction:"row",justifyContent:"flex-end"}),(0,r.jsx)(p.nk,{caption:"Keep it simple table",plugins:z,headCells:b,items:a.state.data}),(0,r.jsx)(I,{children:(0,r.jsx)(M,{page:e.state.page,pagesCount:a.state.pagesCount,totalItems:a.state.totalItems,onChange:e.handlePageChange})}),t.selected.length>0&&(0,r.jsxs)(m.default,{sx:{width:"100%",marginTop:"10px"},children:["Selected Ids: ",t.selected.join(", ")]})]})}}},e=>{var a=a=>e(e.s=a);e.O(0,[16,732,78,763,190,787,587,855,358],()=>a(5833)),_N_E=e.O()}]);