(function(){var g,i=Object.prototype.hasOwnProperty;typeof window!=="undefined"?(g=window,g.exports=g.CSON={}):g=global;CSON.parse=function(){throw"An optimized CSON.parse is not yet implemented. Use CoffeeScript's compiler itself for now.";};CSON.stringify=function(d,a){var e,b,c,h,f,g;a==null&&(a={});if(a.arrayLines==null)a.arrayLines=!0;if(a.indentLevel==null)a.indentLevel=0;if(a.indentWith==null)a.indentWith="  ";if(a.useCurlyBrackets==null)a.useCurlyBrackets=!0;e="";c=0;for(f=a.indentLevel;0<=
f?c<f:c>f;0<=f?c++:c--)e+=a.indentWith;switch(CSON._type(d)){case "array":return f=function(){var b,e,c;c=[];b=0;for(e=d.length;b<e;b++)h=d[b],c.push(CSON.stringify(h,{indentLevel:a.indentLevel+1,indentWith:a.indentWith,useCurlyBrackets:!1}));return c}(),b=a.arrayLines?"\n"+e+a.indentWith:", ",c=a.arrayLines?"\n"+e+a.indentWith:"",e=a.arrayLines?"\n"+e:"","["+c+f.join(b)+e+"]";case "string":return'"'+d+'"';case "object":c=[];for(b in d)i.call(d,b)&&(g=d[b],b!=null&&(f=""+e+a.indentWith,f+=CSON.stringify(b,
{indentLevel:a.indentLevel+1,indentWith:a.indentWith,useCurlyBrackets:!1}),f+=": ",f+=CSON.stringify(g,{indentLevel:a.indentLevel+1,indentWith:a.indentWith,useCurlyBrackets:!1}),c.push(f)));b="";b+="{";b+="\n";b+=c.join("\n");b+="\n"+e+"}";return b;default:return""+String(d)}};CSON._type=function(d){var a,e,b,c,g;if(d===void 0||d===null)return String(d);a={};g="Boolean Number String Function Array Date RegExp".split(" ");b=0;for(c=g.length;b<c;b++)e=g[b],a["[object "+e+"]"]=e.toLowerCase();d=Object.prototype.toString.call(d);
if(d in a)return a[d];return"object"}}).call(this);
