/**
 * TSFunq v.1.2.4 - Funq Dependency injection container port for TypeScript
 * Copyright (c) 2016 Sagi Fogel
 * MS-PL License
 * https://github.com/sagifogel/TSFunq#readme
 */
!function(){var d,g=this&&this.O||function(a,b){function c(){this.constructor=a}for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},h={a:0,external:1};function k(a){for(var b=a.length-1;0<=b&&!a[b];b--);return a.slice(0,++b)}function n(){}function u(a,b,c){a[b.m()]=c}function v(a,b,c){return(a=a[b.m()])?(c.L=a,!0):!1}var w={a:0,P:1,T:2};
function x(a){var b;if("string"===typeof a)b=a;else{var c;if(!((c=a.name)||(c=a.toString().match(y),c=c&&0<c.length&&c[1]))){c=[];a=a.prototype;for(b in a)c.push(b);c=c.join("")}b=c}return b}var y=/function ([^\(]+)/;function z(a){this.value=a}z.prototype.m=function(){for(var a=this.value,b=0,c=0,f=a.length;c<f;)b=(b<<5)-b+a.charCodeAt(c++)<<0;return b};function A(a,b){void 0===b&&(b="0");var c=x(a);this.b=(new z(c)).m()^(new z(b)).m()}A.prototype.m=function(){return this.b};function B(){}
B.prototype.g=function(a){this.f=a};B.prototype.h=function(a){this.c=a;return this};function C(a){this.i=a}g(C,B);C.prototype.b=function(a){2!==this.c&&(this.o=a);0===this.f&&a.dispose&&this.a.D(a);this.j&&this.j(this.a,a)};C.prototype.l=function(a){this.j=a;return this};C.prototype.v=function(a){return D({c:this.c,f:this.f,i:this.i,a:a,j:this.j})};function D(a){var b=new C(a.i);b.f=a.f;b.c=a.c;b.o=a.o;b.a=a.a;b.j=a.j;return b}
function E(){this.h=0;this.s=[];this.g=[];this.l=0;this.b=new n;var a=D({o:this,i:function(a){return a},a:this,f:1,c:0});u(this.b,new A(E),a)}Object.defineProperty(E.prototype,"defaultOwner",{get:function(){return this.h},set:function(a){this.h=a},enumerable:!0,configurable:!0});Object.defineProperty(E.prototype,"defaultReuse",{get:function(){return this.l},set:function(a){this.l=a},enumerable:!0,configurable:!0});d=E.prototype;d.I=function(){var a=new E;a.w=this;this.g.push(a);return a};
d.J=function(){for(;0<this.s.length;)this.s.shift().dispose();for(;0<this.g.length;)this.g.shift().dispose()};d.G=function(a,b){return this.B(a,null,b)};d.M=function(a){this.C(null,a)};d.C=function(a,b){var c=F(this,Object.getPrototypeOf(b).constructor,a,null);c.h(1).g(1);c.b(b)};d.B=function(a,b,c){return F(this,a,b,c)};function F(a,b,c,f){c=""+(c||"")+a.arity(f);if(b===E)throw Error("Container service is built-in and read-only.");f=D({a:a,i:f,c:a.l,f:a.h});b=new A(b,c);u(a.b,b,f);return f}
d.H=function(a,b,c,f,e,l,m,p,q,r,t){return this.u(a,null,b,c,f,e,l,m,p,q,r,t)};d.u=function(a,b,c,f,e,l,m,p,q,r,t,K){return G(this,a,b,!0,Array.prototype.slice.call(arguments,2))};d.N=function(a,b,c,f,e,l,m,p,q,r,t){return this.F(a,null,b,c,f,e,l,m,p,q,r,t)};d.F=function(a,b,c,f,e,l,m,p,q,r,t,K){return G(this,a,b,!1,Array.prototype.slice.call(arguments,2))};d.K=function(a){return this.A(a,null)};
d.A=function(a,b){return function(){var c=Array.prototype.slice.call(arguments);H(this,a,""+(b||"")+k(c).length.toString(),!0);return this.u.apply(this,[a,b].concat(c))}.bind(this)};function G(a,b,c,f,e){b=H(a,b,""+(c||"")+k(e).length.toString(),f);if(!b)return null;a=b.o;a||(e=e||[],e.splice(0,0,b.a),a=b.i.apply(null,e),b.b(a));return a}
function H(a,b,c,f){for(var e=a,l=new A(b,c),m={};!v(e.b,l,m)&&e.w;)e=e.w;if(e=m.L)0===e.c&&e.a!==a&&(e=e.v(a),u(a.b,l,e));else if(f)throw a=["Required dependency of type "+x(b)],c&&a.push(" named "+c),a.push(" could not be resolved."),Error(a.join(""));return e}d.arity=function(a){var b=0;a&&(b=a.length-1);return b.toString()};d.D=function(a){this.s.push(a)};h.external=1;w.none=2;h.container=0;w.hierarchy=1;w.container=0;C.build=D;E.prototype.dispose=E.prototype.J;E.prototype.resolve=E.prototype.H;
E.prototype.register=E.prototype.G;B.prototype.reuse=B.prototype.c;B.prototype.owner=B.prototype.f;E.prototype.tryResolve=E.prototype.N;B.prototype.ownedBy=B.prototype.g;E.prototype.lazyResolve=E.prototype.K;E.prototype.resolveNamed=E.prototype.u;E.prototype.defaultReuse=E.prototype.S;E.prototype.defaultOwner=E.prototype.R;B.prototype.container=B.prototype.a;E.prototype.registerNamed=E.prototype.B;B.prototype.reusedWithin=B.prototype.h;E.prototype.trackDisposable=E.prototype.D;
E.prototype.tryResolveNamed=E.prototype.F;E.prototype.registerInstance=E.prototype.M;E.prototype.lazyResolveNamed=E.prototype.A;C.prototype.cloneFor=C.prototype.v;C.prototype.instance=C.prototype.o;E.prototype.createChildContainer=E.prototype.I;E.prototype.registerNamedInstance=E.prototype.C;C.prototype.initializedBy=C.prototype.l;C.prototype.initializeInstance=C.prototype.b;var I="object"===typeof module&&"object"===typeof module.exports,J=(I?module.exports.TSFunq:self.TSFunq)||{};J.Owner=h;
J.Container=E;J.ReuseScope=w;J.ServiceEntry=B;J.GenericServiceEntry=C;I?module.exports=J:self.TSFunq=J;}();