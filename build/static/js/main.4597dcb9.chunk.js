(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),l=t(13),c=t.n(l),u=t(2),r=t.n(u),i=(t(36),t(3)),m="/api/persons",s=function(){return r.a.get(m).then((function(e){return e.data}))},f=function(e){return r.a.post(m,e).then((function(e){return e.data}))},d=function(e,n){return r.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return console.log(e),console.log("".concat(m)/"".concat(e)),r.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.status}))},b=function(e){var n=e.person,t=e.handleDeletion;return o.a.createElement("li",null,n.name,": ",n.number,o.a.createElement("button",{onClick:t}," Delete"))},E=function(){var e=Object(a.useState)([{name:"Arto Hellas",number:"040-123456"},{name:"Ada Lovelace",number:"39-44-5323523"},{name:"Dan Abramov",number:"12-43-234345"},{name:"Mary Poppendieck",number:"39-23-6423122"}]),n=Object(i.a)(e,2),t=n[0],l=n[1],c=Object(a.useState)(""),u=Object(i.a)(c,2),r=u[0],m=u[1],E=Object(a.useState)(""),g=Object(i.a)(E,2),h=g[0],v=g[1],j=Object(a.useState)(""),O=Object(i.a)(j,2),S=O[0],y=O[1],k=Object(a.useState)(""),w=Object(i.a)(k,2),D=w[0],C=w[1],A=Object(a.useState)(""),N=Object(i.a)(A,2),P=N[0],F=N[1];Object(a.useEffect)((function(){s().then((function(e){console.log("promise fulfilled"),l(e)}))}),[]);var H=""===S?t:t.filter((function(e){return e.name.includes(S)})),J=function(e){var n=e.message,t=e.type;return null===n?null:o.a.createElement("div",{className:t},n)};return o.a.createElement("div",null,o.a.createElement("h3",null,"Filter"),"Filter:",o.a.createElement("input",{value:S,onChange:function(e){y(e.target.value),console.log(S)}}),o.a.createElement("h2",null,"Phonebook"),o.a.createElement(J,{type:P,message:D}),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log("button clicked",e.target);var n={name:r,number:h},a=t.find((function(e){return e.name===n.name}));if(console.log(a),null==a)console.log("it gets in"),f(n).then((function(e){C("Added "+e.name),F("success"),setTimeout((function(){C(""),F("")}),5e3),l(t.concat(e)),m(""),v("")}));else if(null!=a){!0===window.confirm("should update person ".concat(a.name," "))&&d(a.id,n).then((function(e){l(t.map((function(n){return n.id!==a.id?n:e}))),m(""),v("")}))}}},o.a.createElement("div",null,"name:",o.a.createElement("input",{value:r,onChange:function(e){console.log(e.target.value),m(e.target.value)}}),"number:",o.a.createElement("input",{value:h,onChange:function(e){v(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))),o.a.createElement("h2",null,"Numbers"),o.a.createElement("div",null,o.a.createElement("ul",null,H.map((function(e){return o.a.createElement(b,{person:e,handleDeletion:function(){return function(e){var n=window.confirm("Do you want to delete ".concat(e.name," ?"));console.log(n),!0===n&&p(e.id).then((function(n){console.log("success!"),l(t.filter((function(n){return n.id!==e.id})))})).catch((function(e){console.log("fail"),C("Some error happened, see message "+e),F("error"),setTimeout((function(){C(""),F("")}),5e3)}))}(e)}})})))))},g=function(){return o.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},o.a.createElement("br",null),o.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2020"))},h=function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Phonebook"),o.a.createElement(E,null),o.a.createElement(g,null))};c.a.render(o.a.createElement(h,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.4597dcb9.chunk.js.map