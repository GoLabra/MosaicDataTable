(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[310],{90518:(e,n,i)=>{Promise.resolve().then(i.bind(i,27494)),Promise.resolve().then(i.bind(i,2822)),Promise.resolve().then(i.bind(i,80544)),Promise.resolve().then(i.bind(i,9079)),Promise.resolve().then(i.bind(i,68134)),Promise.resolve().then(i.bind(i,37959)),Promise.resolve().then(i.bind(i,38843))},80544:(e,n,i)=>{"use strict";i.d(n,{CustomPluginTable:()=>u});var l=i(54568),d=i(46445),t=i(3528),o=i(26709),a=i(2822),r=i(29190),s=i(78223),c=i(32680);let m={scope:"body-cell-style",getBodyCellStyle:(e,n,i)=>({backgroundColor:"#ff000070 !important"})},h={scope:["body-cell-content-render","head-cell-content-render"],renderBodyCellContent:(e,n,i,d)=>(0,l.jsx)(o.default,{sx:{border:"5px solid #028d00 !important;"},children:d}),renderHeadCellContent:(e,n,i,d)=>d?(0,l.jsx)(o.default,{sx:{border:"5px solid #028d00 !important;"},children:d}):null},u=()=>{let e=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name}],n=[{id:"edit",render:e=>(0,l.jsxs)(d.A,{id:"edit-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(c.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,l.jsxs)(d.A,{id:"remove-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(s.A,{})})," Remove "]},"remove-".concat(e))}],i=(0,r.sJ)(r.K0,(0,r.Z_)(r.kL,{}),(0,r.Z_)(r.tC,{actions:n}),m,h);return(0,l.jsxs)(o.default,{children:[(0,l.jsx)(a.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Custom Plugin"}),(0,l.jsx)(r.nk,{caption:"Custom Plugin table",plugins:i,headCells:e,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}},9079:(e,n,i)=>{"use strict";i.d(n,{EventsTable:()=>m});var l=i(54568),d=i(46445),t=i(3528),o=i(26709),a=i(2822),r=i(29190),s=i(78223),c=i(32680);let m=()=>{let e=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name}],n=[{id:"edit",render:e=>(0,l.jsxs)(d.A,{id:"edit-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(c.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,l.jsxs)(d.A,{id:"remove-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(s.A,{})})," Remove "]},"remove-".concat(e))}],i=(0,r.sJ)(r.K0,(0,r.Z_)(r.kL,{}),(0,r.Z_)(r.tC,{actions:n}),(0,r.Z_)(r.nC,{tableOnClick:e=>{console.log("Clicked on table")},headOnClick:e=>{console.log("Clicked on table->head")},headRowOnClick:e=>{console.log("Clicked on table->head->row")},headRowCellOnClick:e=>{console.log("Clicked on table->head->row->cell: columnId: ".concat(e.currentTarget.columnDef.id))},bodyOnClick:e=>{console.log("Clicked on table->body")},bodyRowOnClick:e=>{console.log("Clicked on table->body->row. rowData:",e.currentTarget.row)},bodyRowCellOnClick:e=>{console.log("Clicked on table->body->row->cell. columnId: ".concat(e.currentTarget.columnDef.id,"  rowData:"),e.currentTarget.row)}}));return(0,l.jsxs)(o.default,{children:[(0,l.jsx)(a.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Events handle"}),(0,l.jsx)(a.default,{sx:{mb:2},children:"Open the DevTools Console in your browser to monitor and view the logged events"}),(0,l.jsx)(r.nk,{caption:"Row Highlight table",plugins:i,headCells:e,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}},68134:(e,n,i)=>{"use strict";i.d(n,{InlineEditTable:()=>x});var l=i(54568),d=i(46445),t=i(3528),o=i(26709),a=i(2822),r=i(29190),s=i(78223),c=i(32680),m=i(7620);let h=()=>{let[e,n]=(0,m.useState)(null),i=(0,m.useCallback)((e,i,l,d)=>{n({columnId:e,rowId:i,originalValue:l})},[n]),l=(0,m.useCallback)((n,i)=>!!e&&(null==e?void 0:e.columnId)==n.id&&e.rowId==i,[e]),d=(0,m.useCallback)((e,i)=>{n(n=>(null==n?void 0:n.columnId)==e.id&&n.rowId==i?null:n)},[n]);return(0,m.useMemo)(()=>({editableCell:e,enterCellInEditMode:i,isCellInEditMode:l,clearEditableCell:d}),[e,l,i,d])},u=e=>({scope:["body-cell-content-render","body-row-cell-on-click"],renderBodyCellContent:(n,i,d,t)=>{let o=e.onGetRowId(i);return!1==e.inlineEditStore.isCellInEditMode(n,o)?t:(0,l.jsx)("input",{type:"text",autoFocus:!0,defaultValue:n.cell(i),onBlur:i=>{e.onCellValueChanged(o,n.id,i.target.value),e.inlineEditStore.clearEditableCell(n,o)},style:{width:"100%",height:"100%",paddingLeft:"8px"}},"inline-edit-".concat(n.id,"-").concat(o))},bodyRowCellOnClick:(n,i,l,d)=>{"sys_actions"!=i.id&&"id"!=i.id&&e.inlineEditStore.enterCellInEditMode(i.id,e.onGetRowId(l),i.cell(l))}}),x=()=>{let e=[{id:"id",header:"ID",cell:e=>e.id,width:100},{id:"name",header:"Name",cell:e=>e.name}],[n,i]=(0,m.useState)([{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]),x=[{id:"edit",render:e=>(0,l.jsxs)(d.A,{id:"edit-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(c.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,l.jsxs)(d.A,{id:"remove-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(s.A,{})})," Remove "]},"remove-".concat(e))}],C=(0,r.sJ)(r.K0,(0,r.Z_)(r.kL,{}),(0,r.Z_)(r.tC,{actions:x}),(0,r.Z_)(u,{onGetRowId:e=>e.id,onCellValueChanged:(e,n,l)=>{i(i=>[...i.map(i=>i.id!=e?i:{...i,[n]:l})])},inlineEditStore:h()}));return(0,l.jsxs)(o.default,{children:[(0,l.jsx)(a.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Inline Edit"}),(0,l.jsx)(r.nk,{caption:"Custom Plugin table",plugins:C,headCells:e,items:n})]})}},37959:(e,n,i)=>{"use strict";i.d(n,{RowExpansionTable:()=>u});var l=i(54568),d=i(58927),t=i(46445),o=i(3528),a=i(26709),r=i(2822),s=i(29190),c=i(78223),m=i(32680),h=i(7620);let u=()=>{let e=(0,s.ah)(),n=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name},{id:"expand",header:"",cell:n=>(0,l.jsx)(d.A,{onClick:()=>e.toggle(n.id),size:"small",sx:{m:0},"aria-label":"Actions","aria-haspopup":"menu",id:"user-menu-btn",children:"Custom Toggle        "})},{id:"expand_with_params",header:"",cell:n=>(0,l.jsx)(d.A,{onClick:()=>e.setParams({rowId:n.id,params:{param1:!0},openImmediately:!0}),size:"small",sx:{m:0},"aria-label":"Actions","aria-haspopup":"menu",id:"user-menu-btn",children:"With Params        "})}],i=[{id:"edit",render:e=>(0,l.jsxs)(t.A,{id:"edit-menu-item",children:[" ",(0,l.jsx)(o.A,{children:(0,l.jsx)(m.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,l.jsxs)(t.A,{id:"remove-menu-item",children:[" ",(0,l.jsx)(o.A,{children:(0,l.jsx)(c.A,{})})," Remove "]},"remove-".concat(e))}],u=(0,s.sJ)(s.K0,(0,s.Z_)(s.kL,{}),(0,s.Z_)(s.tC,{actions:i}),(0,s.Z_)(s.Jh,{showExpanderButton:!0,onGetRowId:e=>e.id,expanstionStore:e,getExpansionNode:(0,h.useCallback)((e,n)=>(0,l.jsxs)(s.wS,{sx:{p:5},children:["Hello ",e.name,"!",(null==n?void 0:n.param1)&&(0,l.jsx)("div",{children:"Param1 is true"})]}),[])}));return(0,l.jsxs)(a.default,{children:[(0,l.jsx)(r.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Row Expansion"}),(0,l.jsx)(s.nk,{caption:"Row Expansion table",plugins:u,headCells:n,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}},38843:(e,n,i)=>{"use strict";i.d(n,{RowHighlightTable:()=>m});var l=i(54568),d=i(46445),t=i(3528),o=i(26709),a=i(2822),r=i(29190),s=i(78223),c=i(32680);let m=()=>{let e=[{id:"id",header:"ID",cell:e=>e.id},{id:"name",header:"Name",cell:e=>e.name}],n=[{id:"edit",render:e=>(0,l.jsxs)(d.A,{id:"edit-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(c.A,{})})," Edit "]},"edit-".concat(e))},{id:"remove",render:e=>(0,l.jsxs)(d.A,{id:"remove-menu-item",children:[" ",(0,l.jsx)(t.A,{children:(0,l.jsx)(s.A,{})})," Remove "]},"remove-".concat(e))}],i=(0,r.sJ)(r.K0,(0,r.Z_)(r.kL,{}),(0,r.Z_)(r.tC,{actions:n}),(0,r.Z_)(r.e$,{isRowHighlighted:e=>1==e.id}));return(0,l.jsxs)(o.default,{children:[(0,l.jsx)(a.default,{variant:"h5",component:"h5",sx:{mb:2},children:"Row Highlight"}),(0,l.jsx)(r.nk,{caption:"Row Highlight table",plugins:i,headCells:e,items:[{id:1,name:"John Doe"},{id:2,name:"Jane Doe"},{id:3,name:"Max Mustermann"}]})]})}}},e=>{var n=n=>e(e.s=n);e.O(0,[16,732,190,587,855,358],()=>n(90518)),_N_E=e.O()}]);