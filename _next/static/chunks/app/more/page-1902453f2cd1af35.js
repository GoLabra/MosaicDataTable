(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[310],{89406:(e,n,i)=>{Promise.resolve().then(i.bind(i,27494)),Promise.resolve().then(i.bind(i,2822)),Promise.resolve().then(i.bind(i,80544)),Promise.resolve().then(i.bind(i,37959)),Promise.resolve().then(i.bind(i,38843))},80544:(e,n,i)=>{"use strict";i.d(n,{CustomPluginTable:()=>x});var d=i(54568),a=i(46445),s=i(3528),l=i(26709),t=i(2822),r=i(29190),o=i(78223),m=i(32680);let c={scope:"body-cell-style",getBodyCellStyle:(e,n,i)=>({backgroundColor:"#ff000070 !important"})},h={scope:["body-cell-content-render","head-cell-content-render"],renderBodyCellContent:(e,n,i,a)=>(0,d.jsx)(l.default,{sx:{border:"5px solid #028d00 !important;"},children:a}),renderHeadCellContent:(e,n,i,a)=>a?(0,d.jsx)(l.default,{sx:{border:"5px solid #028d00 !important;"},children:a}):null},x=()=>{let e=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name}],n=[{id:"edit",render:e=>(0,d.jsxs)(a.A,{id:"edit-menu-item",children:[" ",(0,d.jsx)(s.A,{children:(0,d.jsx)(m.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,d.jsxs)(a.A,{id:"remove-menu-item",children:[" ",(0,d.jsx)(s.A,{children:(0,d.jsx)(o.A,{})})," Remove "]},"remove-".concat(e))}],i=(0,r.sJ)(r.K0,(0,r.Z_)(r.kL,{}),(0,r.Z_)(r.tC,{actions:n}),c,h);return(0,d.jsxs)(l.default,{children:[(0,d.jsx)(t.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Custom Plugin"}),(0,d.jsx)(r.nk,{caption:"Custom Plugin table",plugins:i,headCells:e,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}},37959:(e,n,i)=>{"use strict";i.d(n,{RowExpansionTable:()=>x});var d=i(54568),a=i(58927),s=i(46445),l=i(3528),t=i(26709),r=i(2822),o=i(29190),m=i(78223),c=i(32680),h=i(7620);let x=()=>{let e=(0,o.ah)(),n=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name},{id:"expand",header:"",cell:n=>(0,d.jsx)(a.A,{onClick:()=>e.toggle(n.id),size:"small",sx:{m:0},"aria-label":"Actions","aria-haspopup":"menu",id:"user-menu-btn",children:"Custom Toggle        "})},{id:"expand_with_params",header:"",cell:n=>(0,d.jsx)(a.A,{onClick:()=>e.setParams({rowId:n.id,params:{param1:!0},openImmediately:!0}),size:"small",sx:{m:0},"aria-label":"Actions","aria-haspopup":"menu",id:"user-menu-btn",children:"With Params        "})}],i=[{id:"edit",render:e=>(0,d.jsxs)(s.A,{id:"edit-menu-item",children:[" ",(0,d.jsx)(l.A,{children:(0,d.jsx)(c.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,d.jsxs)(s.A,{id:"remove-menu-item",children:[" ",(0,d.jsx)(l.A,{children:(0,d.jsx)(m.A,{})})," Remove "]},"remove-".concat(e))}],x=(0,o.sJ)(o.K0,(0,o.Z_)(o.kL,{}),(0,o.Z_)(o.tC,{actions:i}),(0,o.Z_)(o.Jh,{showExpanderButton:!0,onGetRowId:e=>e.id,expanstionStore:e,getExpansionNode:(0,h.useCallback)((e,n)=>(0,d.jsxs)(o.wS,{sx:{p:5},children:["Hello ",e.name,"!",(null==n?void 0:n.param1)&&(0,d.jsx)("div",{children:"Param1 is true"})]}),[])}));return(0,d.jsxs)(t.default,{children:[(0,d.jsx)(r.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Row Expansion"}),(0,d.jsx)(o.nk,{caption:"Row Expansion table",plugins:x,headCells:n,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}},38843:(e,n,i)=>{"use strict";i.d(n,{RowHighlightTable:()=>c});var d=i(54568),a=i(46445),s=i(3528),l=i(26709),t=i(2822),r=i(29190),o=i(78223),m=i(32680);let c=()=>{let e=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name}],n=[{id:"edit",render:e=>(0,d.jsxs)(a.A,{id:"edit-menu-item",children:[" ",(0,d.jsx)(s.A,{children:(0,d.jsx)(m.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,d.jsxs)(a.A,{id:"remove-menu-item",children:[" ",(0,d.jsx)(s.A,{children:(0,d.jsx)(o.A,{})})," Remove "]},"remove-".concat(e))}],i=(0,r.sJ)(r.K0,(0,r.Z_)(r.kL,{}),(0,r.Z_)(r.tC,{actions:n}),(0,r.Z_)(r.e$,{isRowHighlighted:e=>1==e.id}));return(0,d.jsxs)(l.default,{children:[(0,d.jsx)(t.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Row Highlight"}),(0,d.jsx)(r.nk,{caption:"Row Highlight table",plugins:i,headCells:e,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}}},e=>{var n=n=>e(e.s=n);e.O(0,[16,732,190,587,855,358],()=>n(89406)),_N_E=e.O()}]);