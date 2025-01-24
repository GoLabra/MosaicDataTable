"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[190],{29190:(e,l,r)=>{r.d(l,{C3:()=>V,Jh:()=>eC,K0:()=>es,Mz:()=>eo,NO:()=>ek,U5:()=>ei,Vk:()=>eu,XN:()=>ev,ZG:()=>eS,Z_:()=>G,aY:()=>ey,ah:()=>ef,e$:()=>ec,he:()=>eh,kL:()=>eg,ki:()=>ej,mt:()=>ed,nC:()=>eE,nk:()=>en,sJ:()=>U,tC:()=>ex,uV:()=>eA,wS:()=>et,zF:()=>eB});var n=r(7620),t=r(909),a=r(38278),o=r(47995),i=r(39018),s=r(29530),u=r(35200),d=r(61993),c=r(26709),p=r(41394),g=r(35896),h=r(54568),m=r(8901),v=r(43395),x=r(34134),b=r(33767),f=r(58007),C=r(93989),y=r(47133),k=r(92970),w=r(21773),j=r(27494),A=r(21574),M=r(65008),D=r(46445),O=r(3528),T=r(82088),S=r(60372),B=r(74181),R=r(85226),_=r(75906),E=r(87891),H=Object.defineProperty,P=Object.defineProperties,z=Object.getOwnPropertyDescriptors,Y=Object.getOwnPropertySymbols,F=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,N=(e,l,r)=>l in e?H(e,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[l]=r,q=(e,l)=>{for(var r in l||(l={}))F.call(l,r)&&N(e,r,l[r]);if(Y)for(var r of Y(l))I.call(l,r)&&N(e,r,l[r]);return e},W=(e,l)=>P(e,z(l)),L=(e,l)=>{var r={};for(var n in e)F.call(e,n)&&0>l.indexOf(n)&&(r[n]=e[n]);if(null!=e&&Y)for(var n of Y(e))0>l.indexOf(n)&&I.call(e,n)&&(r[n]=e[n]);return r},U=function(){for(var e=arguments.length,l=Array(e),r=0;r<e;r++)l[r]=arguments[r];return(0,n.useMemo)(()=>l,[l])};function G(e,l){return(0,n.useMemo)(()=>e(l),[...Object.values(l)])}var V=e=>{let{breakpoint:l,direction:r="up"}=e;return!!(0,t.A)(e=>e.breakpoints[r](l))};function J(e,l){return e?e.filter(e=>"string"==typeof e.scope?e.scope===l:e.scope.includes(l)):[]}var K=(0,d.default)(c.default,{name:"MosaicDataTable",slot:"root"})(e=>{let{theme:l}=e;return{position:"relative",width:"100%",caption:{display:"none"},backgroundColor:"var(--mui-palette-MosaicDataTable-background)"}}),X=(0,d.default)(u.A,{name:"MosaicDataTableRow",slot:"root"})(e=>{let{theme:l}=e;return[{borderBottomWidth:0,backgroundColor:"var(--mui-palette-MosaicDataTable-background)",["&.".concat(g.A.root)]:{td:{backgroundColor:"var(--mui-palette-MosaicDataTable-background)"}},["&.".concat(g.A.hover)]:{"&:hover":{backgroundColor:"var(--mui-palette-MosaicDataTable-rowHover)",td:{backgroundColor:"var(--mui-palette-MosaicDataTable-rowHover)"}}}}]}),Z=(0,d.default)(p.A,{name:"MosaicDataTableCell",slot:"root"})(e=>{let{theme:l}=e;return{padding:0,height:"100%",backgroundColor:"var(--mui-palette-MosaicDataTable-background)",borderBottomWidth:1,borderBottomStyle:"dashed",borderBottomColor:l.palette.divider}}),$=(0,d.default)(c.default)(e=>{let{theme:l}=e;return{height:"100%",width:"100%",position:"relative",display:"flex",flexDirection:"row",flexWrap:"nowrap",alignContent:"flex-start",justifyContent:"flex-start",alignItems:"center"}}),Q=e=>{let{headCells:l}=e,r=(0,n.useMemo)(()=>J(e.plugins,"head-cell-render"),[e.plugins]),t=(0,n.useCallback)(l=>{var n,t;let a=o();for(let t of r){var i=null==(n=t.renderHeadRow)?void 0:n.call(t,e.gridApi,e.caller,a,l.children,{onClick:v});if(i)return i}let s=q(q({},null!=(t=e.sx)?t:{}),a);return(0,h.jsx)(u.A,{sx:s,onClick:v,children:l.children},"head-row")},[...r,e.headCells,e.gridApi]),a=(0,n.useMemo)(()=>J(e.plugins,"head-row-style"),[e.plugins]),o=(0,n.useCallback)(()=>a.reduce((l,r)=>{var n;let t=null==(n=r.getHeadRowStyle)?void 0:n.call(r,e.gridApi,e.caller);return q(q({},l),t)},{}),[...a,e.caller]),i=(0,n.useMemo)(()=>J(e.plugins,"head-cell-render"),[e.plugins]),s=(0,n.useCallback)(l=>{var r;let n=c({columnDef:l.columnDef});for(let a of i){var t=null==(r=a.renderHeadCell)?void 0:r.call(a,l.columnDef,e.gridApi,e.caller,n,l.children,{onClick:b});if(t)return t}return(0,h.jsx)(Z,{align:"left",padding:"normal",onClick:e=>b(e,l.columnDef),sx:q({minWidth:l.columnDef.width,width:l.columnDef.width},n),children:l.children},l.columnDef.id)},[...i,e.caller,e.headCells,e.gridApi]),d=(0,n.useMemo)(()=>J(e.plugins,"head-cell-render"),[e.plugins]),c=(0,n.useCallback)(l=>d.reduce((r,n)=>{var t;let a=null==(t=n.getHeadCellStyle)?void 0:t.call(n,l.columnDef,e.gridApi,e.caller);return q(q({},r),a)},{}),[...d,e.caller]),p=(0,n.useMemo)(()=>J(e.plugins,"head-cell-content-render"),[e.plugins]),g=(0,n.useCallback)(l=>{let r="mosaic-data-table"==e.caller?"function"==typeof l.header?l.header():l.header:"";return p.reduce((r,n)=>{var t;return null==(t=n.renderHeadCellContent)?void 0:t.call(n,l,e.gridApi,e.caller,r)},r)},[...p,e.caller]),m=(0,n.useMemo)(()=>J(e.plugins,"head-row-on-click"),[e.plugins]),v=(0,n.useCallback)(l=>{for(let r of m)r.headRowOnClick(l,e.gridApi)},[...m]),x=(0,n.useMemo)(()=>J(e.plugins,"head-row-cell-on-click"),[e.plugins]),b=(0,n.useCallback)((l,r)=>{for(let n of x)n.headRowCellOnClick(l,r,e.gridApi)},[...x]);return t({children:(0,h.jsx)(h.Fragment,{children:l.map(e=>s({columnDef:e,children:(0,h.jsx)(h.Fragment,{children:g(e)})}))})})},ee=e=>{let{headCells:l}=e,r=(0,n.useMemo)(()=>J(e.plugins,"head-extra-row-start"),[e.plugins]),t=(0,n.useMemo)(()=>r.map(l=>{var r;return null==(r=l.getHeadExtraRowStart)?void 0:r.call(l,e.headCells,e.gridApi)}),[...r,e.headCells,e.gridApi]),a=(0,n.useMemo)(()=>J(e.plugins,"head-extra-row-end"),[e.plugins]),o=(0,n.useMemo)(()=>a.map(l=>{var r;return null==(r=l.getHeadExtraRowEnd)?void 0:r.call(l,e.headCells,e.gridApi)}),[...a,e.headCells,e.gridApi]),i=(0,n.useMemo)(()=>J(e.plugins,"on-click"),[e.plugins]),u=(0,n.useCallback)(l=>{for(let r of i)r.headOnClick(l,e.gridApi)},[...i]);return(0,h.jsxs)(s.A,{onClick:u,children:[t,(0,h.jsx)(Q,{headCells:e.headCells,plugins:e.plugins,gridApi:e.gridApi,caller:"mosaic-data-table"}),o]})};function el(e){let{row:l,headCells:r}=e,t=(0,n.useMemo)(()=>J(e.plugins,"body-row-style"),[e.plugins]),a=(0,n.useMemo)(()=>t.reduce((r,n)=>{var t;let a=null==(t=n.getBodyRowStyle)?void 0:t.call(n,l,e.gridApi);return q(q({},r),a)},{}),[...t]),o=(0,n.useMemo)(()=>J(e.plugins,"body-cell-style"),[e.plugins]),i=(0,n.useCallback)(r=>o.reduce((n,t)=>{var a;let o=null==(a=t.getBodyCellStyle)?void 0:a.call(t,r.columnDef,l,e.gridApi);return q(q({},n),o)},{}),[o]),s=(0,n.useMemo)(()=>J(e.plugins,"body-row-render"),[e.plugins]),u=(0,n.useCallback)(r=>{var n;for(let o of s){var t=null==(n=o.renderBodyRow)?void 0:n.call(o,l,e.gridApi,a,r.children,{onClick:e=>v(e,r.row)});if(t)return t}return(0,h.jsx)(X,{hover:!0,tabIndex:-1,sx:a,onClick:e=>v(e,r.row),children:r.children},l)},[...s,a]),d=(0,n.useMemo)(()=>J(e.plugins,"body-cell-render"),[e.plugins]),c=(0,n.useCallback)(l=>{var r;let n=i({columnDef:l.columnDef,row:l.row});for(let a of d){var t=null==(r=a.renderBodyCell)?void 0:r.call(a,l.columnDef,l.row,e.gridApi,n,l.children,{onClick:e=>b(e,l.columnDef,l.row)});if(t)return t}return(0,h.jsx)(Z,{align:"left",sx:n,onClick:e=>b(e,l.columnDef,l.row),children:l.children},l.columnDef.id)},[d,i]),p=(0,n.useMemo)(()=>J(e.plugins,"body-cell-content-render"),[e.plugins]),g=(0,n.useCallback)((l,r)=>p.reduce((n,t)=>{var a;return null==(a=t.renderBodyCellContent)?void 0:a.call(t,l,r,e.gridApi,n)},null),[p]),m=(0,n.useMemo)(()=>J(e.plugins,"body-row-on-click"),[e.plugins]),v=(0,n.useCallback)((l,r)=>{for(let n of m)n.bodyRowOnClick(l,r,e.gridApi)},[...m]),x=(0,n.useMemo)(()=>J(e.plugins,"body-row-cell-on-click"),[e.plugins]),b=(0,n.useCallback)((l,r,n)=>{for(let t of x)t.bodyRowCellOnClick(l,r,n,e.gridApi)},[...x]);return(0,h.jsx)(n.Fragment,{children:u({row:l,children:(0,h.jsx)(h.Fragment,{children:r.map(e=>c({columnDef:e,row:l,children:(0,h.jsx)(h.Fragment,{children:g(e,l)})}))})})})}function er(e){var l;let r=(0,n.useMemo)(()=>J(e.plugins,"body-render"),[e.plugins]),t=(0,n.useCallback)(l=>{var n;for(let a of r){var t=null==(n=a.renderBody)?void 0:n.call(a,e.columns,e.items,e.gridApi,l.children,{onClick:d});if(t)return t}return(0,h.jsx)(m.A,{onClick:d,children:l.children})},[...r,e.items,e.columns,e.gridApi]),a=(0,n.useMemo)(()=>J(e.plugins,"body-extra-row-start"),[e.plugins]),o=(0,n.useMemo)(()=>a.map(l=>{var r;return null==(r=l.getBodyExtraRowStart)?void 0:r.call(l,e.columns,e.items,e.gridApi)}),[...a,e.items,e.columns,e.gridApi]),i=(0,n.useMemo)(()=>J(e.plugins,"body-extra-row-end"),[e.plugins]),s=(0,n.useMemo)(()=>i.map(l=>{var r;return null==(r=l.getBodyExtraRowEnd)?void 0:r.call(l,e.columns,e.items,e.gridApi)}),[...i,e.items,e.columns,e.gridApi]),u=(0,n.useMemo)(()=>J(e.plugins,"on-click"),[e.plugins]),d=(0,n.useCallback)(l=>{for(let r of u)r.bodyOnClick(l,e.gridApi)},[...u]);return(0,h.jsx)(n.Fragment,{children:t({children:(0,h.jsxs)(h.Fragment,{children:[o,(null!=(l=e.items)?l:[]).map(l=>(0,h.jsx)(el,{row:l,headCells:e.columns,plugins:e.plugins,gridApi:e.gridApi},JSON.stringify(l))),s]})})})}var en=e=>{var l;(0,n.useEffect)(()=>{var l;null==(l=e.plugins)||l.forEach(e=>{var l;null==(l=e.onInit)||l.call(e,c)})},[e.plugins]);let r=(0,n.useMemo)(()=>e.headCells.filter(e=>{var l;return null==(l=e.visible)||l}),[e.headCells]),t=(0,n.useMemo)(()=>J(e.plugins,"grid-columns"),[e.plugins]),s=(0,n.useMemo)(()=>t.reduce((e,l)=>{var r;let n=null==(r=l.getColumns)?void 0:r.call(l,e);return null!=n?n:[]},r),[...t,r]),u=(0,n.useMemo)(()=>J(e.plugins,"on-click"),[e.plugins]),d=(0,n.useCallback)(e=>{for(let l of u)l.onClick(e,c)},[...u]),c=(0,n.useMemo)(()=>({getData:()=>e.items,getColumns:()=>s,getPlugins:()=>e.plugins||[]}),[e.items,s,...null!=(l=e.plugins)?l:[]]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a.A,{styles:{html:{"--mui-palette-MosaicDataTable-background":"var(--mui-palette-background-paper)","--mui-palette-MosaicDataTable-highlight":"color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), transparent 70%)","--mui-palette-MosaicDataTable-rowHover":"color-mix(in srgb, rgb(var(--mui-palette-background-paperChannel)), var(--mui-palette-common-onBackground) 7%)","--mui-palette-MosaicDataTable-extraRow":"color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), var(--mui-palette-background-paper) 90%)"}}}),(0,h.jsx)(K,W(q({},e.root),{children:(0,h.jsx)(o.A,{children:(0,h.jsxs)(i.A,{sx:{height:"100%"},"aria-labelledby":"tableTitle",size:"medium",onClick:d,children:[(0,h.jsx)("caption",{children:e.caption}),(0,h.jsx)(ee,{headCells:s,plugins:e.plugins,gridApi:c}),(0,h.jsx)(er,{columns:s,plugins:e.plugins,gridApi:c,items:e.items})]})})}))]})},et=e=>{let{children:l,sx:r}=e,t=(0,n.useRef)(null),a=(0,n.useRef)(null),[o,i]=(0,n.useState)(0),s=()=>{if(a.current){let{offsetHeight:e}=a.current;i(e)}};return(0,n.useEffect)(()=>{let e=new ResizeObserver(()=>{s()});return a.current&&e.observe(a.current),()=>{a.current&&e.unobserve(a.current)}},[]),(0,n.useEffect)(()=>{s()},[l]),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.default,{ref:a,sx:W(q({},r),{position:"absolute"}),children:l}),(0,h.jsx)(c.default,{ref:t,sx:{height:o}})]})},ea={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},eo=e=>{let l=l=>{var r;let n=e.orderBy===l&&"asc"===e.order;null==(r=e.onSort)||r.call(e,l,n?"desc":"asc")};return{scope:"head-cell-content-render",renderHeadCellContent:(r,n,t,a)=>"mosaic-data-table"!=t?a:!0==r.hasSort?(0,h.jsxs)(v.A,{active:e.orderBy===r.id,direction:e.orderBy===r.id?e.order:"asc",onClick:()=>l(r.id),children:[a,e.orderBy===r.id?(0,h.jsx)(c.default,{component:"span",sx:ea,children:"desc"===e.order?"sorted descending":"sorted ascending"}):null]}):a}},ei={scope:["grid-columns","body-cell-content-render"],getColumns:e=>[...e,{id:"columns-fill-row-space",label:""}],renderBodyCellContent:(e,l,r,n)=>"columns-fill-row-space"==e.id?(0,h.jsx)(h.Fragment,{children:n}):n},es={scope:"body-cell-content-render",renderBodyCellContent:(e,l,r,n)=>{var t;return l&&l.sys_extra_row?null:null==(t=e.cell)?void 0:t.call(e,l)}},eu=e=>{let{content:l="No data"}=e;return{scope:"body-render",renderBody:(e,r,n,t,a)=>(null==r?void 0:r.length)?null:(0,h.jsx)(m.A,{children:(0,h.jsx)(u.A,{children:(0,h.jsx)(p.A,{children:(0,h.jsx)(c.default,{sx:{height:"150px",pointerEvents:"none"},children:(0,h.jsx)(c.default,{sx:{padding:"60px",position:"absolute",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"},children:l})})})})})}},ed=e=>({scope:["head-cell-content-render","body-cell-content-render"],renderHeadCellContent:(l,r,n,t)=>{var a;return l.highlight||(null==(a=e.isColumnHighlighted)?void 0:a.call(e,l.id))?(0,h.jsxs)($,{className:"MuiTableCellDockedDiv-root",sx:{backgroundColor:"var(--mui-palette-MosaicDataTable-highlight)"},children:[" ",t," "]}):t},renderBodyCellContent:(l,r,n,t)=>{var a;return l.highlight||(null==(a=e.isColumnHighlighted)?void 0:a.call(e,l.id))?(0,h.jsxs)($,{className:"MuiTableCellDockedDiv-root",sx:{backgroundColor:"var(--mui-palette-MosaicDataTable-highlight)"},children:[" ",t," "]}):t}}),ec=e=>({scope:"body-cell-content-render",renderBodyCellContent:(l,r,n,t)=>{var a;return(null==(a=e.isRowHighlighted)?void 0:a.call(e,r))?(0,h.jsxs)($,{sx:{backgroundColor:"var(--mui-palette-MosaicDataTable-highlight)"},children:[" ",t," "]}):t}}),ep=(0,d.default)(c.default)({padding:8}),eg=e=>{let{skipCellHeads:l=["sys_expansion","sys_selection","sys_actions"]}=e;return{scope:["head-cell-content-render","body-cell-content-render"],renderHeadCellContent:(e,r,n,t)=>"mosaic-data-table"!=n||(null==l?void 0:l.includes(e.id))?t:(0,h.jsxs)(ep,{children:[" ",t," "]}),renderBodyCellContent:(e,r,n,t)=>(null==l?void 0:l.includes(e.id))?t:(0,h.jsxs)(ep,{children:[" ",t," "]})}},eh={scope:["body-cell-render","head-cell-render"],renderBodyCell:(e,l,r,n,t,a)=>em(e,r,"",n,t,a),renderHeadCell:(e,l,r,n,t,a)=>em(e,l,r,n,t,a)},em=(e,l,r,n,t,a)=>{var o,i;let s,u;if(!e.pin)return null;if("left"===e.pin||!0===e.pin){let r=l.getColumns().filter(e=>"left"===e.pin||!0===e.pin);s=r.slice(0,r.findIndex(l=>l.id===e.id)).reduce((e,l)=>e+l.width,0)}if("right"==e.pin||!0===e.pin){let r=l.getColumns().filter(e=>"right"===e.pin||!0===e.pin);u=r.slice(r.findIndex(l=>l.id===e.id)+1).reverse().reduce((e,l)=>e+l.width,0)}return(0,h.jsx)(Z,W(q({},a),{sx:q({position:"sticky",left:s,right:u,backgroundColor:"var(--mui-palette-MosaicDataTable-background)",width:null!=(o=e.width)?o:"40px",minWidth:null!=(i=e.width)?i:"40px",zIndex:1},n),children:t}),e.id)},ev=e=>{let{pin:l,breakpoint:r,direction:n="up"}=e;if((0,t.A)(e=>e.breakpoints[n](r)))return l},ex=e=>({scope:["grid-columns","body-cell-content-render"],getColumns:e=>[...e,{id:"sys_actions",label:"",width:40,pin:"right"}],renderBodyCellContent:(l,r,n,t)=>r&&r.sys_extra_row?t:"sys_actions"==l.id?(0,h.jsx)(c.default,{sx:{textAlign:"center"},children:(0,h.jsx)(eb,{actions:e.actions,row:r})}):t}),eb=e=>{let[l,r]=(0,n.useState)(null),[t,a]=(0,n.useState)(),o=!!l,i=(e,l)=>{r(e.currentTarget),a(l)},s=()=>{r(null),a(void 0)};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(b.default,{onClick:l=>i(l,e.row),size:"medium",sx:{m:0},"aria-label":"Actions","aria-controls":o?"account-menu":void 0,"aria-haspopup":"menu","aria-expanded":o?"true":void 0,id:"user-menu-btn",children:(0,h.jsx)(x.A,{})}),(0,h.jsx)(f.A,{anchorEl:l,id:"user-menu",open:o,onClose:s,onClick:s,PaperProps:{elevation:0,sx:{overflow:"visible",filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",mt:1.5,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1},"&:before":{content:'""',display:"block",position:"absolute",top:0,right:14,width:10,height:10,bgcolor:"background.paper",transform:"translateY(-50%) rotate(45deg)",zIndex:0}}},transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:e.actions.filter(l=>{var r,n;return null==(n=null==(r=l.isVisible)?void 0:r.call(l,e.row))||n}).map(l=>l.render(t||e.row))})]})},ef=()=>{let[e,l]=(0,n.useState)({}),r=(0,n.useCallback)(l=>{var r;let n=e[l];return null!=(r=null==n?void 0:n.isOpen)&&r},[e]),t=(0,n.useCallback)(l=>{var r;return null!=(r=e[l])?r:{isOpen:!1,params:null}},[e]),a=(0,n.useCallback)(e=>{l(l=>W(q({},l),{[e]:W(q({},l[e]),{isOpen:!0})}))},[l]),o=(0,n.useCallback)(e=>{l(l=>W(q({},l),{[e]:W(q({},l[e]),{isOpen:!1})}))},[l]),i=(0,n.useCallback)(e=>{l(l=>{var r,n;return W(q({},l),{[e]:W(q({},l[e]),{isOpen:!(null!=(n=null==(r=l[e])?void 0:r.isOpen)&&n)})})})},[l]),s=(0,n.useCallback)(e=>{let{rowId:r,params:n,openImmediately:t=!0}=e;l(e=>{var l,a,o;return W(q({},e),{[r]:W(q({},e[r]),{isOpen:null!=(a=null!=t?t:null==(l=e[r])?void 0:l.isOpen)&&a,params:q(q({},null==(o=e[r])?void 0:o.params),n)})})})},[l]);return(0,n.useMemo)(()=>({expansionState:e,isExpanded:r,getExpansionInfo:t,expand:a,collapse:o,toggle:i,setParams:s}),[e,r,a,o,i,s])},eC=e=>({scope:["grid-columns","body-cell-content-render","body-row-render"],getColumns:l=>{var r;return!1==(null==(r=e.showExpanderButton)||r)?l:[{id:"sys_expansion",label:"",width:40,pin:"left"},...l]},renderBodyCellContent:(l,r,n,t)=>{var a,o;if(r&&r.sys_extra_row)return t;if("sys_expansion"==l.id){let l=null!=(o=null==(a=e.onGetRowId)?void 0:a.call(e,r))?o:null,n=e.expanstionStore.isExpanded(l);return(0,h.jsx)(c.default,{sx:{textAlign:"center"},children:(0,h.jsx)(b.default,{onClick:()=>e.expanstionStore.toggle(l),size:"medium",sx:{m:0},"aria-label":"Actions","aria-haspopup":"menu",id:"user-menu-btn",children:n?(0,h.jsx)(y.A,{}):(0,h.jsx)(C.A,{})})})}return t},renderBodyRow:(l,r,n,t,a)=>{var o,i;let s=null!=(i=null==(o=e.onGetRowId)?void 0:o.call(e,l))?i:null,u=e.expanstionStore.getExpansionInfo(s);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(X,W(q({hover:!0,tabIndex:-1,sx:n},a),{children:t}),s),(null==u?void 0:u.isOpen)&&(0,h.jsx)(X,{tabIndex:-1,children:(0,h.jsx)(Z,{colSpan:100,children:e.getExpansionNode(l,u.params)})},"".concat(s,"-expansion"))]})}}),ey=e=>({scope:["grid-columns","body-cell-content-render"],getColumns:l=>{var r;return null==(r=e.visible)||r?[{id:"sys_selection",label:"",width:40,pin:"left"},...l]:l},renderBodyCellContent:(l,r,n,t)=>{var a,o;if(r&&r.sys_extra_row)return t;if("sys_selection"==l.id){let l=null!=(o=null==(a=e.onGetRowId)?void 0:a.call(e,r))?o:null,n=!!e.selectedIds.find(e=>e==l,[l]);return(0,h.jsx)(c.default,{sx:{textAlign:"center"},children:(0,h.jsx)(k.A,{checked:n,onChange:r=>{var n,t;r.target.checked?null==(n=e.onSelectOne)||n.call(e,l):null==(t=e.onDeselectOne)||t.call(e,l)},sx:{margin:0,padding:"0 5px"},inputProps:{"aria-label":"Select row"}})})}return t}}),ek=e=>{let{isLoading:l,rowsWhenEmpty:r=5}=e;return{scope:["body-render","grid-columns"],getColumns:e=>l?e.map(e=>W(q({},e),{pin:void 0})):e,renderBody:(e,n,t,a,o)=>l?(0,h.jsx)(m.A,{children:l&&(0,h.jsx)(ew,{columns:e.length,rows:(null==n?void 0:n.length)||r})}):null}},ew=e=>{let{columns:l,rows:r,cellHeight:n}=e;return Array.from({length:r}).map((e,r)=>(0,h.jsx)(u.A,{children:Array.from({length:l}).map((e,l)=>(0,h.jsx)(Z,{sx:q({},!!n&&{height:n}),children:(0,h.jsx)($,{className:"MuiTableCellDockedDiv-root",sx:{padding:"5px 10px"},children:(0,h.jsx)(w.A,{variant:"text",sx:{fontSize:"1rem",flexGrow:1}})})},"cell-".concat(r,"-").concat(l)))},"row-".concat(r)))},ej=e=>{let{visible:l=!0,summaryColumns:r,key:n}=e;return{scope:["body-extra-row-end","body-cell-content-render"],getBodyExtraRowEnd:(e,r,t)=>l?(0,h.jsx)(el,{row:{sys_extra_row:!0,sys_summary_row:!0,key:n},headCells:e,plugins:t.getPlugins(),gridApi:t},"sys_extra_row_".concat(n)):null,renderBodyCellContent:(e,l,t,a)=>{if(l&&l.sys_summary_row&&l.key==n){let l=r[e.id];return"function"==typeof l?l(e):l}return a}}},eA=e=>{let{visible:l=!0,filter:r,filterChanged:n,filterColumns:t,key:a}=e;return{scope:["head-extra-row-end","head-cell-content-render"],getHeadExtraRowEnd:(e,r)=>l?(0,h.jsx)(Q,{headCells:e,plugins:r.getPlugins(),gridApi:r,caller:a,sx:{"> th":{"&:first-child>.MosaicDataTable-filter-row-docked":{borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px"},"&:last-child>.MosaicDataTable-filter-row-docked":{borderTopRightRadius:"5px",borderBottomRightRadius:"5px"}}}},"sys_extra_row_".concat(a)):null,renderHeadCellContent:(e,l,o,i)=>{if(o==a){let l=t[e.id];if(!l)return(0,h.jsx)(eR,{className:"MosaicDataTable-filter-row-docked",children:i},e.id);let a="string"==typeof l?l:l.type,o="string"!=typeof l&&"select"==l.type?l.selectOptions:void 0,s="string"!=typeof l?l.defaultOperator:void 0,u="string"!=typeof l?l.operators:void 0,d=null==r?void 0:r[e.id];return(0,h.jsx)(eR,{className:"MosaicDataTable-filter-row-docked",children:(0,h.jsx)(c.default,{sx:{width:"100%",margin:"3px",padding:"3px",borderRadius:"3px",backgroundColor:"var(--mui-palette-background-paper)"},children:(0,h.jsx)(eM,{type:a,selectOptions:o,options:u,defaultOperator:s,value:d,onChange:l=>{if(!l){let l=q({},r);delete l[e.id],n(l);return}n(W(q({},r),{[e.id]:l}))}},"columnFilter-".concat(e.id))},e.id)},e.id)}return i}}},eM=e=>{var l,r,t,a;let{value:o,options:i}=e,[s,u]=(0,n.useState)({operator:null!=(a=null!=(t=null!=(l=null==o?void 0:o.operator)?l:e.defaultOperator)?t:null==(r=null==i?void 0:i[0])?void 0:r.value)?a:"",value:null==o?void 0:o.value}),d=(0,n.useCallback)(l=>{(null==l?void 0:l.value)?e.onChange(l):e.onChange(null),u(l)},[e.onChange]);return(0,n.useEffect)(()=>{if(!o){u(W(q({},s),{value:null}));return}u(o)},[o]),(0,h.jsxs)(j.default,{direction:"row",alignItems:"center",children:[i&&(0,h.jsx)(eT,{value:s.operator,defaultOperator:e.defaultOperator,operators:i,onChange:e=>{d({operator:e,value:s.value})}},"column-def-filter-button-options-".concat(e.type)),(0,h.jsx)(eD,{type:e.type,value:null==s?void 0:s.value,selectOptions:e.selectOptions,onChange:e=>{d({operator:s.operator,value:e})}},"free-input-".concat(e.type))]})},eD=e=>{let l=e_[e.type],[r,t]=(0,n.useState)(e.value),a=(0,n.useMemo)(()=>(0,A.A)(l=>e.onChange(l),300),[e.onChange]);return((0,n.useEffect)(()=>{t(e.value)},[e.value]),l)?(0,h.jsx)(c.default,{sx:{width:"100%",padding:"0 5px"},children:(0,h.jsx)(l,{selectOptions:e.selectOptions,value:r,onChange:e=>{t(e.target.value),a(e.target.value)}},"input-".concat(e.type))}):(console.log("No input component for type ".concat(e.type)),null)},eO=e=>{let{Picker:l}=e;if(!(0,E.u)())return console.warn("No LocalizationProvider found. DatePicker requires LocalizationProvider to function."),null;let r=(0,n.useCallback)(l=>{if(!l||!l.isValid()){e.onChange({target:{value:null}});return}e.onChange({target:{value:e.format(l)}})},[e.onChange]),t=(0,n.useMemo)(()=>e.value&&e.value?e.parse(e.value):null,[e.value]);return(0,h.jsx)(l,{value:t,onChange:r,slotProps:{textField:{InputProps:{disableUnderline:!0},variant:"standard"},popper:{placement:"bottom-end",popperOptions:{modifiers:[{name:"preventOverflow",enabled:!0,options:{altAxis:!0,altBoundary:!1,tether:!1,rootBoundary:"viewport",padding:0}}]}}}})},eT=e=>{let[l,r]=(0,n.useState)(null),t=()=>{r(null)},a=(0,n.useMemo)(()=>(0,A.A)(l=>e.onChange(l),0),[e.onChange]),o=(0,n.useCallback)(e=>{t(),a(e.value)},[e.onChange]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(b.default,{"aria-label":"delete",size:"small",onClick:e=>{r(e.currentTarget)},children:(0,h.jsx)(x.A,{fontSize:"inherit"})}),(0,h.jsx)(f.A,{id:"basic-menu",anchorEl:l,open:!!l,onClose:t,MenuListProps:{"aria-labelledby":"basic-button"},children:e.operators.map((l,r)=>(0,h.jsxs)(D.A,{value:l.value,onClick:()=>o(l),children:[(0,h.jsx)(O.A,{children:l.value==e.value&&(0,h.jsx)(S.A,{fontSize:"small"})}),(0,h.jsx)(T.A,{children:l.label})]},r))})]})},eS={operators:[{value:"contains",label:"Contains",iconText:"∗"},{value:"starts-with",label:"Starts With",iconText:"∗["},{value:"ends-with",label:"Ends With",iconText:"]∗"},{value:"equals",label:"Equals",iconText:"="}],defaultOperator:"contains"},eB={operators:[{value:"less-than",label:"Less Than",iconText:"<"},{value:"less-or-equal-than",label:"Less or Equal Than",iconText:"<="},{value:"bigger-than",label:"Bigger Than",iconText:">"},{value:"bigger-or-equal-than",label:"Bigger or Equal Than",iconText:">="},{value:"equals",label:"Equals",iconText:"="}],defaultOperator:"less-or-equal-than"},eR=(0,d.default)($)(e=>{let{theme:l}=e;return{backgroundColor:"var(--mui-palette-MosaicDataTable-extraRow)"}}),e_={string:e=>{var l;let{selectOptions:r}=e,n=L(e,["selectOptions"]);return(0,h.jsx)(M.A,W(q({id:"outlined-basic",variant:"standard",fullWidth:!0,slotProps:{input:{disableUnderline:!0}}},n),{value:null!=(l=e.value)?l:""}))},select:e=>{var l;let{selectOptions:r}=e,n=L(e,["selectOptions"]);return(0,h.jsxs)(M.A,W(q({id:"outlined-basic",variant:"standard",fullWidth:!0,select:!0,slotProps:{input:{disableUnderline:!0}}},n),{value:null!=(l=e.value)?l:"",children:[(0,h.jsx)(D.A,{value:"",sx:{height:"36px"}}),e.selectOptions.map((e,l)=>(0,h.jsx)(D.A,{value:e.value,children:e.label},l))]}))},number:e=>{var l;let{selectOptions:r}=e,n=L(e,["selectOptions"]);return(0,h.jsx)(M.A,W(q({type:"number",id:"outlined-basic",variant:"standard",fullWidth:!0,slotProps:{input:{disableUnderline:!0}}},n),{value:null!=(l=e.value)?l:"",onChange:l=>{e.onChange(W(q({},l),{target:W(q({},l.target),{value:""===l.target.value?null:Number(l.target.value)})}))}}))},boolean:e=>{var l;let{selectOptions:r}=e,n=L(e,["selectOptions"]);return(0,h.jsxs)(M.A,W(q({id:"outlined-basic",variant:"standard",fullWidth:!0,select:!0,slotProps:{input:{disableUnderline:!0}}},n),{value:null!=(l=e.value)?l:"",children:[(0,h.jsx)(D.A,{value:"",sx:{height:"36px"}}),(0,h.jsx)(D.A,{value:"true",children:"True"}),(0,h.jsx)(D.A,{value:"false",children:"False"})]}))},date:e=>{let l=(0,E.u)();return l?(0,h.jsx)(eO,W(q({},e),{format:e=>l.utils.formatByString(e,"YYYY-MM-DD"),parse:r=>l.utils.parse(e.value,"YYYY-MM-DD"),Picker:B.l})):(console.warn("No LocalizationProvider found. DatePicker requires LocalizationProvider to function."),null)},time:e=>{let l=(0,E.u)();return(0,h.jsx)(eO,W(q({},e),{format:e=>l.utils.formatByString(e,"HH:mm:ss.SSS"),parse:r=>l.utils.parse(e.value,"HH:mm:ss.SSS"),Picker:R.A}))},datetime:e=>{let l=(0,E.u)();return(0,h.jsx)(eO,W(q({},e),{format:e=>l.utils.formatByString(e,"YYYY-MM-DDTHH:mm:ss.SSS"),parse:r=>l.utils.parse(e.value,"YYYY-MM-DDTHH:mm:ss.SSS"),Picker:_.K}))}},eE=e=>{let{tableOnClick:l,bodyOnClick:r,bodyRowOnClick:n,bodyRowCellOnClick:t,headOnClick:a,headRowOnClick:o,headRowCellOnClick:i}=e;return{scope:["on-click","body-on-click","body-row-on-click","body-row-cell-on-click","head-on-click","head-row-on-click","head-row-cell-on-click"],onClick:(e,r)=>{null==l||l(e)},bodyOnClick:(e,l)=>{null==r||r(e)},bodyRowOnClick:(e,l,r)=>{null==n||n(W(q({},e),{currentTarget:W(q({},e.currentTarget),{row:l})}))},bodyRowCellOnClick:(e,l,r,n)=>{null==t||t(W(q({},e),{currentTarget:W(q({},e.currentTarget),{columnDef:l,row:r})}))},headOnClick:(e,l)=>{null==a||a(e)},headRowOnClick:(e,l)=>{null==o||o(e)},headRowCellOnClick:(e,l,r)=>{null==i||i(W(q({},e),{currentTarget:W(q({},e.currentTarget),{columnDef:l})}))}}}}}]);