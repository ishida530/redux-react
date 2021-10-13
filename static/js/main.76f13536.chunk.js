(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{49:function(e,t,n){},50:function(e,t,n){},98:function(e,t,n){"use strict";n.r(t);var c,r,i,a=n(0),o=n.n(a),s=n(15),u=n.n(s),l=(n(49),n(50),n(14)),b=n(4),j=n(1),d=function(){return Object(j.jsx)("div",{children:"home"})},p=n(13),x=n(17),O=n(6),f=n(18),h=n(19),m=n(29),g=n.n(m),k=n(5),y=n(36),v=function(e,t){return e.title<t.title?-1:e.title>t.title?1:0},w={basket:[],request:{request:{pending:!1,error:!1,success:!1}}},S=[{value:"by Name",label:"a-z",filter:v},{value:"by Name z-a",label:"z-a",filter:function(e,t){return e.title>t.title?-1:e.title<t.title?1:0}},{value:"od najmniejszej",label:"min-max cena",filter:function(e,t){return e.price-t.price}},{value:"od nawiekszej",label:"max-min cena",filter:function(e,t){return t.price-e.price}}],C=[{value:5,label:"5"},{value:10,label:"10"},{value:15,label:"15"},{value:20,label:"20"},{value:25,label:"25"},{value:50,label:"50"},{value:100,label:"100"},{value:"all",label:"wszystkie"}],_=n(37),L=n.n(_),N=0,E=function(e){return e.books},T=function(e){var t;return N=0,0!==e.basket.length&&(t=e.basket,Object.values(t).forEach((function(e){return isNaN(e.count)?void 0:N+=e.count}))),N},z=function(e){return"app/books/".concat(e)},B=z("UPDATE_BOOKS"),F=z("ADD_BOOK_TO_BASKET"),A=z("REMOVE_BOOK_FROM_BASKET"),D=z("REMOVE_ALL_BOOK_FROM_BASKET"),I=z("START_REQUEST"),R=z("FINISH_REQUEST_WITH_ERROR"),K=z("FINISH_REQUEST_WITH_SUCCESS"),M=z("SET_AMOUNT_BOOK"),P=function(e,t){return function(t){0===e.count?t({type:A,payload:e}):t(function(e){return{type:F,payload:e}}(e))}},U=0,q=n(32),H=n(38),Q=n.n(H),W=f.a.div(c||(c=Object(x.a)(["\n    margin: 0 auto;\n    width: 90%;\n    h2{\n        text-align: center;\n    }\n    >div{\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n    ul.tiles{  \n        display:flex;\n        flex-wrap: wrap;  \n        justify-content:center;\n        li{list-style:none;\n            max-width: 150px;\n            display: flex;\n            flex-direction: column;\n            padding: 20px;\n            margin: 10px;\n            border-radius: 5%;\n            width: 120px;\n            background-color: rgba(222, 222, 222, 0.5);\n            box-shadow: 5px 5px 5px #888888;\n            text-decoration: none;\n            color: #000;\n            flex-grow: 1;\n            img{\n                max-height: 220px;\n                width:auto;\n            }\n            h4{\n                display:flex;\n                align-items: center;\n                justify-content: center;\n                text-align:center ;\n                align-items: center;height:100%;\n            }\n            a{text-align:center;\n                text-decoration:none;\n                padding:10px 20px;\n                background-color: #fff;\n                border: 2px solid rgba(1,1,1,0.5);\n                border-radius: 5px;\n                color: #000;\n                text-transform: uppercase;\n                font-weight: 500;\n            }\n            span{\n                text-align:center;margin-bottom:10px\n            }\n    }\n}\n    ul.list{\n        li{list-style:none;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            flex-direction: row;\n            padding: 20px;\n            margin: 15px;\n            border-radius: 5px;\n            background-color: rgba(222, 222, 222, 0.5);\n            box-shadow: 5px 5px 5px #888888;\n            text-decoration: none;\n            color: #000;\n            flex-grow: 1;\n            img{\n                max-height: 120px;\n                width:auto;\n            }\n        }\n\n    }\n    .paginationBtns{\n        width: 100%;\n        height: 40px;\n        list-style: none;\n        display: flex;\n        justify-content: center;\n    }\n    .paginationBtns a{\n        padding: 5px 10px;\n        margin: 10px;\n        border-radius: 5px;\n        border:2px solid #ddd;\n        color:black;\n        cursor: pointer;\n        transition: .3s;\n    }\n    .paginationBtns a:hover{\n        color: white;\n        background-color:#ddd\n    }\n    .paginationActive a{\n        color: white;\n        background-color:#ddd;\n    }\n"]))),J=function(){var e=Object(O.d)((function(e){return E(e)})),t=Object(O.c)(),n=Object(a.useState)(!1),c=Object(p.a)(n,2),r=c[0],i=c[1],o=Object(a.useState)(!0),s=Object(p.a)(o,2),u=(s[0],s[1]),b=Object(a.useState)(""),d=Object(p.a)(b,2),x=d[0],f=d[1],h=Object(a.useState)(e),m=Object(p.a)(h,2),g=m[0],k=m[1],y=Object(a.useState)(0),v=Object(p.a)(y,2),w=v[0],_=v[1],L=Object(a.useState)(15),N=Object(p.a)(L,2),T=N[0],z=N[1],B=Object(a.useState)(0),F=Object(p.a)(B,2),A=(F[0],F[1]),D=w*T,I=Math.ceil(g.length/T),R=g.slice(D,D+T).map((function(e){return Object(j.jsxs)("li",{children:[Object(j.jsx)("img",{src:e.simple_thumb,alt:"Logo"}),Object(j.jsx)("h4",{children:e.title}),Object(j.jsxs)("span",{children:[e.price," PLN"]}),Object(j.jsx)(l.b,{to:"/product/".concat(e.key),children:"Zobacz"}),Object(j.jsx)("button",{onClick:function(t){return K(t,e)},children:" Dodaj do koszyka"})]},e.key)})),K=function(e,n){return e.preventDefault(),function(e){return t(P(e))}({key:n.key,img:n.simple_thumb,title:n.title,count:1,price:n.price})},M=function(e){var t=e.selected;A(t)},U=function(e){var t=e.selected;_(t)};return Object(j.jsxs)(W,{children:[Object(j.jsx)("h2",{children:"Lista produkt\xf3w"}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("label",{children:["Szukaj:",Object(j.jsx)("input",{value:x,onChange:function(t){M({selected:0}),f(t.target.value),U({selected:0}),k(e.filter((function(e){return e.title.toLocaleLowerCase().includes(t.target.value.toLocaleLowerCase())})))}}),Object(j.jsx)("button",{onClick:function(){return f(""),k(e)},children:"X"})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){i(!0),u(!1)},children:"LISTA"}),Object(j.jsx)("button",{onClick:function(){i(!1),u(!0)},children:"KAFELKI"})]}),Object(j.jsx)(q.a,{options:C,onChange:function(e){"all"===e.value?z(g.length):z(e.value)}}),Object(j.jsx)(q.a,{options:S,onChange:function(t){M({selected:0}),U({selected:0}),k(e.sort(t.filter).filter((function(e){return e.title.toLocaleLowerCase().includes(x.toLocaleLowerCase())})))}})]}),Object(j.jsx)("ul",{className:"".concat(r?"list":"tiles"),children:R}),Object(j.jsx)(Q.a,{previousLabel:"Previous",nextLabel:"Next",pageCount:I,onPageChange:U,containerClassName:"paginationBtns",previousLinkClassName:"previousBtn",nextLinkClassName:"nextBtn",disabledClassName:"paginationDisabled",activeClassName:"paginationActive",pageRangeDisplayed:5,initialPage:0,onPageActive:M})]})},V=function(){return Object(j.jsx)("div",{children:"ContactForm"})},X=f.a.div(r||(r=Object(x.a)(["\npadding: 15px 20px;\n    ol{\n        padding:0;\n        display: flex;\n        flex-direction: column;\n        li{\n        display:flex;\n        justify-content: space-between;\n        margin: 15px;\n        &>span{\n            width: 50%;\n        }\n        input{\n            width: 20%;\n        }\n        label{\n            width: 20%;\n        }\n        li:nth-last-child(1){\n            width: 10%;\n        }\n    }\n    }\n    .sum{margin: 15px;\n\n        font-size: 24px;\n    }\n"]))),Z=function(){var e=Object(O.d)((function(e){return function(e){return e.basket}(e)})),t=Object(O.d)((function(e){return T(e)})),n=Object(O.d)((function(e){return function(e){var t=0;return e.basket.forEach((function(e){isNaN(e.count)||(t+=e.price*e.count)})),t}(e)})),c=Object(O.c)(),r=function(e){return c(P(e))},i=function(e){return c({type:D,payload:e})},a=function(e){return c({type:M,payload:e})},o=function(e){return Object(j.jsxs)("li",{children:[Object(j.jsxs)("span",{children:[Object(j.jsx)("b",{children:"Tytu\u0142: "}),e.title,"."]}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("label",{children:[Object(j.jsx)("b",{children:" Ilo\u015bc sztuk:"})," ",Object(j.jsx)("input",{min:0,max:100,type:"number",value:e.count,onChange:function(t){return function(e,t){a({key:t.key,img:t.simple_thumb,title:t.title,count:parseInt(e.target.value),price:t.price})}(t,e)},onBlur:function(t){return function(e,t){0!==e.target.value.length&&0!=e.target.value||setTimeout((function(){window.confirm("usuna\u0107?")?i({key:t.key}):(a({key:t.key,img:t.simple_thumb,title:t.title,count:1,price:t.price}),e.target.focus())}),500)}(t,e)}})]}),Object(j.jsx)("button",{onClick:function(t){return function(e,t){e.preventDefault(),r({key:t.key,img:t.simple_thumb,title:t.title,count:1,price:t.price})}(t,e)},children:"+"}),Object(j.jsx)("button",{onClick:function(t){return function(e,t){e.preventDefault(),t.count>1?r({key:t.key,img:t.simple_thumb,title:t.title,count:0,price:t.price}):i({key:t.key})}(t,e)},children:"-"})]}),Object(j.jsxs)("label",{children:[Object(j.jsx)("b",{children:" Cena:"}),Object(j.jsxs)("span",{children:[e.price," PLN"]})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{onClick:function(t){return function(e,t){e.preventDefault(),i({key:t.key})}(t,e)},children:"Usu\u0144 "})})]},e.key)};return Object(j.jsxs)(X,{children:[Object(j.jsx)("ol",{children:0===t?Object(j.jsx)("h1",{children:"Koszyk jest pusty"}):e.map((function(e){return o(e)}))}),Object(j.jsxs)("p",{className:"sum",children:[Object(j.jsx)("b",{children:"SUMA:"})," ",Object(j.jsxs)("span",{children:[n.toFixed(2),"PLN"]})]})]})},G=function(){var e=Object(O.d)((function(e){return E(e)})),t=Object(O.c)(),n=Object(a.useState)(1),c=Object(p.a)(n,2),r=c[0],i=c[1],o=Object(a.useState)(!1),s=Object(p.a)(o,2),u=s[0],l=s[1],d=Object(b.f)(),x=function(e,n){e.preventDefault(),l(!0),i(1);var c=n.key,a=n.simple_thumb,o=n.title,s=n.price;return function(e){return t(P(e))}({key:c,img:a,title:o,count:parseInt(r),price:s})},f=e.filter((function(e){return e.key===d.id})).map((function(e){var t=e.id,n=e.simple_thumb,c=e.title;return Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:t}),Object(j.jsx)("img",{src:n,alt:"Logo"}),Object(j.jsx)("h4",{children:c}),Object(j.jsxs)("form",{onSubmit:function(t){return x(t,e)&&i(1)},children:[Object(j.jsx)("input",{type:"number",min:1,value:r,onChange:function(e){return function(e){var t=e.target.value;0===parseInt(t)||0===t.length||t<0?l(!0):l(!1),i(t)}(e)}}),Object(j.jsx)("button",{disabled:u,type:"submit",children:"Dodaj do koszyka"})]})]},d)}));return Object(j.jsx)(j.Fragment,{children:f})},Y=function(e){var t=e.match;e.props;return Object(j.jsxs)("div",{children:[Object(j.jsx)("h3",{children:"Strona produktu"}),Object(j.jsx)(G,{id:t.params.id}),Object(j.jsx)(l.b,{to:"/products",children:"pworot do listy produktow "})]})},$=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)(b.c,{children:[Object(j.jsx)(b.a,{exact:!0,path:"/",component:d}),Object(j.jsx)(b.a,{exact:!0,path:"/redux-react",component:d}),Object(j.jsx)(b.a,{path:"/products",component:J}),Object(j.jsx)(b.a,{path:"/product/:id",component:Y}),Object(j.jsx)(b.a,{path:"/contact",component:V}),Object(j.jsx)(b.a,{path:"/basket",component:Z}),Object(j.jsx)(b.a,{render:function(){return Object(j.jsx)("h1",{children:"Strona nie istnieje"})}})]})})},ee=f.a.header(i||(i=Object(x.a)(["\nheight: 10%;\nbackground-color: #ddd;\n ul{\n     display: flex;\n     justify-content: center;\n     list-style: none;\n     height: 80px;\n     margin: 0;\n     li{display:flex;\n        justify-content: center;\n        align-items: center;\n         margin: 0 20px;\n         text-transform: uppercase;\n        \n         a{\n            color: #000;\n         text-decoration: none;font-weight:500;\n         font-size:18px;\n         span{\n             color:red;\n         }\n         }\n     }\n }\n"]))),te=[{name:"start",path:"/",exact:!0},{name:"produkty",path:"/products"},{name:"kontakt",path:"/contact"},{name:"koszyk",path:"/basket"}],ne=Object(O.b)((function(e){return{basket:T(e)}}))((function(e){var t=e.basket,n=te.map((function(e){return Object(j.jsx)("li",{children:Object(j.jsx)(l.c,{exact:!!e.exact&&e.exact,to:e.path,children:"koszyk"===e.name?Object(j.jsxs)(j.Fragment,{children:[e.name," ",Object(j.jsx)("span",{children:isNaN(t)?"aa":t})]}):"".concat(e.name)})},e.name)}));return Object(j.jsx)(ee,{className:"main",children:Object(j.jsx)("ul",{children:n})})})),ce=n(42),re=n.n(ce),ie=function(){var e=Object(O.d)((function(e){return function(e){return e.request}(e)})),t=Object(O.c)(),n=function(){return t(function(){var e=Object(y.a)(g.a.mark((function e(t){var n,c,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:I}),e.next=4,fetch("https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/books/");case 4:return n=e.sent,e.next=7,n.json();case 7:c=e.sent,r=c.map((function(e){return Object(k.a)(Object(k.a)({},e),{},{key:L()().toString(),price:(100*Math.random()).toFixed(2)})})),t({type:B,payload:r}),t({type:K}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.error(e.t0),t({type:R});case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}())};return Object(a.useEffect)((function(){n()}),[]),Object(j.jsxs)(l.a,{children:[Object(j.jsx)(ne,{}),e.pending&&Object(j.jsx)(re.a,{type:"Rings",color:"red",height:80,width:80}),e.error&&console.warn("warrning"),e.success&&Object(j.jsx)($,{})]})},ae=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))},oe=n(26),se=n(43),ue=n(44),le=Object(ue.composeWithDevTools)({})(Object(oe.applyMiddleware)(se.a)),be=Object(oe.createStore)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0,n=t.type,c=t.payload;switch(n){case B:return Object(k.a)(Object(k.a)({},e),{},{books:Object(h.a)(c)});case F:return Object(k.a)(Object(k.a)({},e),{},{basket:[].concat(Object(h.a)(e.basket.filter((function(e){if(U=0,e.key===c.key&&(U=e.count,c.count+=U),e.key!==c.key)return e}))),[c]).sort(v)});case A:return Object(k.a)(Object(k.a)({},e),{},{basket:[].concat(Object(h.a)(e.basket.filter((function(e){if(e.key===c.key&&(U=e.count,c.count=--U),e.key!==c.key)return e}))),[c]).sort(v)});case D:return Object(k.a)(Object(k.a)({},e),{},{basket:Object(h.a)(e.basket.filter((function(e){return e.key!==c.key}))).sort(v)});case I:return Object(k.a)(Object(k.a)({},e),{},{request:{pending:!0,error:!1,success:!1}});case K:return Object(k.a)(Object(k.a)({},e),{},{request:{pending:!1,error:!1,success:!0}});case R:return Object(k.a)(Object(k.a)({},e),{},{request:{pending:!1,error:!0,success:!1}});case M:return Object(k.a)(Object(k.a)({},e),{},{basket:[].concat(Object(h.a)(e.basket.filter((function(e){if(U=0,e.key!==c.key)return e}))),[c]).sort(v)});default:return e}}),w,le),je=be;u.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(O.a,{store:je,children:Object(j.jsx)(ie,{})})}),document.getElementById("root")),ae()}},[[98,1,2]]]);
//# sourceMappingURL=main.76f13536.chunk.js.map