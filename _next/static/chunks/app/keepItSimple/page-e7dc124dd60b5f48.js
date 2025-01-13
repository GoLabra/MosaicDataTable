(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6988:(e,r,a)=>{Promise.resolve().then(a.bind(a,2822)),Promise.resolve().then(a.bind(a,4463))},296:(e,r,a)=>{"use strict";a.d(r,{default:()=>c});var t=a(4568),n=a(5409),l=a(6709),i=a(47),s=a(1254),o=a(9556),d=a(2330);function c(){let{mode:e,setMode:r}=(0,n.useColorScheme)();return(0,t.jsx)(l.default,{sx:{display:"flex",justifyContent:"flex-end",mt:1,p:1},children:(0,t.jsxs)(i.A,{children:[(0,t.jsx)(s.A,{id:"mode-select-label",children:"Theme"}),(0,t.jsxs)(o.A,{labelId:"mode-select-label",id:"mode-select",value:e||"light",onChange:e=>r(e.target.value),label:"Theme",children:[(0,t.jsx)(d.A,{value:"system",children:"System"}),(0,t.jsx)(d.A,{value:"light",children:"Light"}),(0,t.jsx)(d.A,{value:"dark",children:"Dark"})]})]})})}},4463:(e,r,a)=>{"use strict";a.d(r,{KeepItSimpleTable:()=>T});var t=a(4568),n=a(3721),l=a(8275),i=a(7494),s=a(8427),o=a(3271),d=a(8794),c=a(1398),m=a(2330),h=a(3528),u=a(2822),g=a(7620),p=a(5928),x=a(7882),b=a(3461),y=a(1993),v=a(3695),j=a(2732),f=a(5504),A=a(6604),k=a(2456);function S(e){return(0,k.Ay)("MuiFormControlLabel",e)}let w=(0,A.A)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]);var C=a(1215),D=a(9088);let F=e=>{let{classes:r,disabled:a,labelPlacement:t,error:n,required:l}=e,i={root:["root",a&&"disabled","labelPlacement".concat((0,f.A)(t)),n&&"error",l&&"required"],label:["label",a&&"disabled"],asterisk:["asterisk",n&&"error"]};return(0,x.A)(i,S,r)},I=(0,y.default)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:a}=e;return[{["& .".concat(w.label)]:r.label},r.root,r["labelPlacement".concat((0,f.A)(a.labelPlacement))]]}})((0,v.A)(e=>{let{theme:r}=e;return{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,["&.".concat(w.disabled)]:{cursor:"default"},["& .".concat(w.label)]:{["&.".concat(w.disabled)]:{color:(r.vars||r).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:e=>{let{labelPlacement:r}=e;return"start"===r||"top"===r||"bottom"===r},style:{marginLeft:16}}]}})),R=(0,y.default)("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,r)=>r.asterisk})((0,v.A)(e=>{let{theme:r}=e;return{["&.".concat(w.error)]:{color:(r.vars||r).palette.error.main}}})),P=g.forwardRef(function(e,r){var a;let n=(0,j.b)({props:e,name:"MuiFormControlLabel"}),{checked:l,className:i,componentsProps:s={},control:o,disabled:d,disableTypography:c,inputRef:m,label:h,labelPlacement:x="end",name:y,onChange:v,required:f,slots:A={},slotProps:k={},value:S,...w}=n,P=(0,b.A)(),_=null!==(a=null!=d?d:o.props.disabled)&&void 0!==a?a:null==P?void 0:P.disabled,N=null!=f?f:o.props.required,L={disabled:_,required:N};["checked","name","onChange","value","inputRef"].forEach(e=>{void 0===o.props[e]&&void 0!==n[e]&&(L[e]=n[e])});let M=(0,C.A)({props:n,muiFormControl:P,states:["error"]}),E={...n,disabled:_,labelPlacement:x,required:N,error:M.error},O=F(E),T={slots:A,slotProps:{...s,...k}},[Z,U]=(0,D.A)("typography",{elementType:u.default,externalForwardedProps:T,ownerState:E}),z=h;return null==z||z.type===u.default||c||(z=(0,t.jsx)(Z,{component:"span",...U,className:(0,p.A)(O.label,null==U?void 0:U.className),children:z})),(0,t.jsxs)(I,{className:(0,p.A)(O.root,i),ownerState:E,ref:r,...w,children:[g.cloneElement(o,L),N?(0,t.jsxs)("div",{children:[z,(0,t.jsxs)(R,{ownerState:E,"aria-hidden":!0,className:O.asterisk,children:[" ","*"]})]}):z]})});var _=a(2970),N=a(9190),L=a(8223),M=a(2680),E=a(296);let O=()=>{let[e,r]=(0,g.useState)([]),a=(0,g.useCallback)(e=>{r(r=>[...r,e])},[r]);return{handleDeselectAll:(0,g.useCallback)(()=>{r([])},[r]),handleDeselectOne:(0,g.useCallback)(e=>{r(r=>r.filter(r=>r!==e))},[r]),handleSelectOne:a,selected:e}},T=()=>{let[e,r]=(0,g.useState)({order:"asc",sortBy:"name"}),a=O(),[p,x]=(0,g.useState)(!1),[b,y]=(0,g.useState)(!1),v=[{id:"id",header:"ID",width:100,cell:e=>(0,t.jsx)(t.Fragment,{children:e.id})},{id:"name",header:"Name",width:200,hasSort:!0,cell:e=>(0,t.jsxs)(i.default,{direction:"row",alignItems:"center",gap:1,children:[(0,t.jsx)(s.A,{...(0,l.n)(e.name)}),e.name]}),pin:(0,N.XN)({pin:"left",breakpoint:"sm",direction:"up"}),highlight:!0},{id:"mail",header:"E-mail",width:200,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.email})},{id:"country",header:"Country",width:150,hasSort:!0,pin:(0,N.XN)({pin:"left",breakpoint:"md",direction:"up"}),cell:e=>(0,t.jsxs)(i.default,{direction:"row",alignItems:"center",gap:1,children:[(0,t.jsx)(n.I,{country:e.countryCode,sx:{fontSize:24,color:"primary.main"}}),e.country]})},{id:"city",header:"City",width:150,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.city})},{id:"age",header:"Age",width:100,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.age})},{id:"gender",header:"Gender",width:100,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.gender})},{id:"address",header:"Address",width:200,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.address})},{id:"phone",header:"Phone",width:150,cell:e=>(0,t.jsx)(t.Fragment,{children:e.phone})},{id:"status",header:"Status",width:120,hasSort:!0,cell:e=>"Active"===e.status?(0,t.jsx)(o.A,{label:"Active",color:"primary",size:"small"}):(0,t.jsx)(o.A,{label:"Inactive",color:"secondary",size:"small"})},{id:"tokens",header:"Tokens",width:80,hasSort:!0,pin:(0,N.XN)({pin:!0,breakpoint:"lg",direction:"up"}),cell:e=>(0,t.jsx)(t.Fragment,{children:e.tokens})},{id:"language",header:"Language",width:150,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.language})},{id:"progress",header:"Progress",width:100,cell:e=>(0,t.jsx)(d.A,{color:"success",value:e.progress,variant:"determinate"})},{id:"Verified",header:"verified",width:100,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.verified?"Yes":"No"})},{id:"registrationDate",header:"Registered On",width:180,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:new Date(e.registrationDate).toISOString()}),visible:(0,N.C3)({breakpoint:"md",direction:"up"})},{id:"role",header:"Role",width:120,hasSort:!0,cell:e=>(0,t.jsx)(t.Fragment,{children:e.role})},{id:"rating",header:"Rating",width:180,cell:e=>(0,t.jsx)(c.A,{name:"half-rating",defaultValue:e.rating,precision:.5,readOnly:!0})}],j=b?[]:[{id:1,name:"Max Mustermann",email:"max.mustermann@mail.com",rating:3.5,age:30,gender:"male",phone:"+1 (123) 456-7890",address:"Vienna, Austria",progress:100,verified:!1,registrationDate:new Date(2019,1,1),status:"Active",role:"Admin",country:"Austria",countryCode:"at",city:"Vienna",language:"German",tokens:100},{id:2,name:"John Doe",email:"juan.perez@mail.com",rating:4.5,age:25,gender:"female",phone:"+1 (456) 456-7890",address:"Washington DC, USA",progress:100,verified:!0,registrationDate:new Date(2022,1,1),status:"Active",role:"Admin",country:"USA",countryCode:"us",city:"Washington DC",language:"English",tokens:72},{id:3,name:"Juan P\xe9rez",email:"juan.perez@mail.com",rating:2,age:22,gender:"male",phone:"+1 (789) 456-7890",address:"Madrid, Spain",progress:50,verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"Spain",countryCode:"es",city:"Madrid",language:"Spanish",tokens:12},{id:4,name:"Mario Rossi",email:"mario.rossi@mail.com",rating:0,age:22,gender:"male",phone:"+1 (101) 456-7890",address:"123 Main St, Anytown, USA",progress:25,verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"Italy",countryCode:"it",city:"Rome",language:"Italian",tokens:10},{id:5,name:"Andrei Vinca",email:"andrei.vinca@outlook.com",rating:1.5,age:37,gender:"male",phone:"+1 (112) 456-7890",progress:10,address:"Cluj-Napoca, Romania",verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"Romania",countryCode:"ro",city:"Bucharest",language:"Romanian",tokens:99},{id:6,name:"Jean Dupont",email:"jean.dupont@mail.com",rating:0,age:22,gender:"male",phone:"+1 (131) 456-7890",address:"Paris, France",progress:12,verified:!0,registrationDate:new Date(2021,1,1),status:"Inactive",role:"User",country:"France",countryCode:"fr",city:"Paris",language:"French",tokens:45}],f=(0,g.useCallback)(e=>"role"===e,[]),A=[{id:"edit",render:e=>(0,t.jsxs)(m.A,{id:"edit-menu-item",children:[" ",(0,t.jsx)(h.A,{children:(0,t.jsx)(M.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,t.jsxs)(m.A,{id:"remove-menu-item",children:[" ",(0,t.jsx)(h.A,{children:(0,t.jsx)(L.A,{})})," Remove "]},"remove-".concat(e))}],k=(0,N.sJ)(N.K0,(0,N.Z_)(N.ki,{visible:!0,key:"symmary_row",summaryColumns:{name:e=>(0,t.jsx)(u.default,{fontWeight:700,children:"Total"}),tokens:e=>(0,t.jsx)(u.default,{fontWeight:700,children:"338"})}}),(0,N.Z_)(N.kL,{}),(0,N.Z_)(N.Mz,{order:e.order,orderBy:e.sortBy,onSort:(e,a)=>{r({order:a,sortBy:e})}}),(0,N.Z_)(N.aY,{onGetRowId:e=>e.id,onSelectOne:a.handleSelectOne,onDeselectOne:a.handleDeselectOne,selectedIds:a.selected}),(0,N.Z_)(N.Jh,{showExpanderButton:!0,onGetRowId:e=>e.id,expanstionStore:(0,N.ah)(),getExpansionNode:(0,g.useCallback)((e,r)=>(0,t.jsxs)(N.wS,{sx:{p:5},children:["Hello ",e.name]}),[])}),N.U5,(0,N.Z_)(N.tC,{actions:A}),(0,N.Z_)(N.mt,{isColumnHighlighted:f}),N.he,(0,N.Z_)(N.NO,{isLoading:p}),(0,N.Z_)(N.Vk,{content:"Wow, such empty!"}));return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(i.default,{alignItems:"center",direction:"row",justifyContent:"flex-end",children:[(0,t.jsx)(P,{control:(0,t.jsx)(_.A,{checked:b,onChange:e=>y(e.target.checked)}),label:"Simulate Empty Table"}),(0,t.jsx)(P,{control:(0,t.jsx)(_.A,{checked:p,onChange:e=>x(e.target.checked)}),label:"Simulate Loading"}),(0,t.jsx)(E.default,{})]}),(0,t.jsx)(N.nk,{caption:"Keep it simple table",plugins:k,headCells:v,items:j})]})}}},e=>{var r=r=>e(e.s=r);e.O(0,[825,397,708,885,190,787,587,855,358],()=>r(6988)),_N_E=e.O()}]);