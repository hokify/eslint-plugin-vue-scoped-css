(window.webpackJsonp=window.webpackJsonp||[]).push([[8,9],{1108:function(e,t,i){"use strict";i.r(t);var o={name:"ESLintCodeBlock",components:{EslintPluginEditor:i(194).default},props:{fix:{type:Boolean},rules:{type:Object,default:()=>({})}},computed:{code(){return this.computeCodeFromSlot(this.$slots.default).trim()+"\n"},height(){const e=this.code.split("\n").length;return Math.max(120,20*(1+e))+"px"}},methods:{computeCodeFromSlot(e){return Array.isArray(e)?e.map(e=>e.text||this.computeCodeFromSlot(e.children)).join(""):""}}},s=i(6),r=Object(s.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("eslint-plugin-editor",{ref:"editor",style:{height:this.height},attrs:{code:this.code,rules:this.rules,dark:"",fix:this.fix}})}),[],!1,null,null,null);t.default=r.exports},166:function(e,t,i){},168:function(e,t,i){},178:function(e,t,i){"use strict";i(166)},183:function(e,t,i){"use strict";i(168)},184:function(e,t,i){"use strict";const o={autoIndent:!0,automaticLayout:!0,find:{autoFindInSelection:!0,seedSearchStringFromSelection:!0},minimap:{enabled:!1},renderControlCharacters:!0,renderIndentGuides:!0,renderValidationDecorations:"on",renderWhitespace:"boundary",scrollBeyondLastLine:!1};function s(e,t){return Math.max(1,0|(void 0!==e?e:t))}function r(e,t){const i=e.getModel();null!=i&&t!==i.getValue()&&i.setValue(t)}function n(e){null!=e&&(e.getOriginalEditor&&n(e.getOriginalEditor()),e.getModifiedEditor&&n(e.getModifiedEditor()),e.getModel&&n(e.getModel()),e.dispose&&e.dispose())}function a(e){const t=("string"==typeof e.code?e.code:e.code&&e.code.value)||"";return`[${e.startLineNumber},${e.startColumn},${e.endLineNumber},${e.endColumn}]-${t}`}function d(e,t,i,o){const s=i.getPositionAt(o.range[0]),r=i.getPositionAt(o.range[1]),n={startLineNumber:s.lineNumber,startColumn:s.column,endLineNumber:r.lineNumber,endColumn:r.column};return{title:e,diagnostics:[t],kind:"quickfix",edit:{edits:[{resource:i.uri,edit:{range:n,text:o.text}}]}}}var l={name:"ESLintEditor",model:{prop:"code",event:"input"},props:{linter:{type:Object,default:null},code:{type:String,default:""},config:{type:Object,default:()=>({})},dark:{type:Boolean},filename:{type:String,default:"a.js"},preprocess:{type:Function,default:null,required:!1},postprocess:{type:Function,default:null,required:!1},fix:{type:Boolean},format:{type:Object,default:()=>({insertSpaces:!0,tabSize:4})},language:{type:String,default:"javascript"}},data(){return{monaco:null,monacoLoadingError:null,loadLanguage:null,editor:null,editing:!1,messages:[],fixedCode:this.code,fixedMessages:[],previewFix:!1,requestFix:!1,editorMessageMap:new Map,codeActionProviderDisposable:null}},computed:{codeEditor(){const e=this.editor;return null!=e?null!=e.getOriginalEditor?e.getOriginalEditor():e:null},fixedCodeEditor(){const e=this.editor;return null!=e&&null!=e.getModifiedEditor?e.getModifiedEditor():null},codeActionProvider(){return{provideCodeActions:(e,t,i)=>{const{editorMessageMap:o}=this,s=o.get(e.uri);if("quickfix"!==i.only||!s)return{actions:[],dispose(){}};const r=[];for(const t of i.markers){const i=s.get(a(t));if(i&&(i.fix&&r.push(d(`Fix this ${i.ruleId} problem`,t,e,i.fix)),i.suggestions))for(const o of i.suggestions)r.push(d(`${o.desc} (${i.ruleId})`,t,e,o.fix))}return{actions:r,dispose(){}}}}}},watch:{linter(){this.invalidate()},code(e){this.updateCode(e)},previewFix(){this.initialize()},config:{handler(){this.invalidate()},deep:!0},filename(){this.invalidate()},fix(){this.initialize()},fixedCode(e){const t=this.fixedCodeEditor;null!=t&&r(t,e)},fixedMessages(e){const t=this.fixedCodeEditor;null!=t&&this.updateMarkers(t,e)},format(e){const t=this.codeEditor;null!=t&&t.getModel().updateOptions(e)},messages(e){const t=this.codeEditor;null!=t&&this.updateMarkers(t,e,!0)},language(e){const{monaco:t,loadLanguage:i}=this;null!=t&&(async()=>{if(await i(e),e===this.language){for(const i of[this.codeEditor,this.fixedCodeEditor])null!=i&&t.editor.setModelLanguage(i.getModel(),e);n(this.codeActionProviderDisposable),this.codeActionProviderDisposable=this.monaco.languages.registerCodeActionProvider(this.language,this.codeActionProvider)}})().catch(t=>{console.error("Failed to set the language '%s':",e,t)})}},mounted(){(async()=>{const{monaco:e,loadLanguage:t}=await Promise.all([i.e(0),i.e(16)]).then(i.bind(null,1104));await t(this.language),this.monaco=e,this.loadLanguage=t,this.codeActionProviderDisposable=e.languages.registerCodeActionProvider(this.language,this.codeActionProvider)})().catch(e=>{console.error("Failed to load Monaco editor:",e),this.monacoLoadingError=e})},beforeDestroy(){n(this.editor),n(this.codeActionProviderDisposable),this.$refs.monaco.innerHTML="",this.editor=null},methods:{fadeIn(e){this.$refs.monaco&&this.$refs.monaco.parentNode===e&&this.initialize()},initialize(){null!=this.monaco&&(n(this.editor),this.$refs.monaco.innerHTML="",this.editor=this.previewFix?this.createTwoPaneEditor():this.createEditor(),this.lint())},createEditor(){const{code:e,dark:t,format:i,language:s,messages:r,monaco:n}=this,a=n.editor.createModel(e,s);a.updateOptions(i),a.onDidChangeContent(()=>{this.$emit("input",a.getValue()),this.invalidate()});const d=n.editor.create(this.$refs.monaco,{model:a,theme:t?"vs-dark":"vs",...o});return this.updateMarkers(d,r,!0),d},createTwoPaneEditor(){const{code:e,dark:t,fixedCode:i,fixedMessages:s,format:r,language:n,messages:a,monaco:d}=this,l=d.editor.createDiffEditor(this.$refs.monaco,{originalEditable:!0,theme:t?"vs-dark":"vs",...o}),c=d.editor.createModel(e,n),u=d.editor.createModel(i,n),p=l.getOriginalEditor(),h=l.getModifiedEditor();return h.updateOptions({readOnly:!0}),c.updateOptions(r),c.onDidChangeContent(()=>{const e=c.getValue();this.fixedCode=e,this.$emit("input",e),this.invalidate()}),l.setModel({original:c,modified:u}),this.updateMarkers(p,a,!0),this.updateMarkers(h,s),l},messageToMarker(e){const{monaco:t,linter:i}=this,o=e.ruleId&&i.getRules().get(e.ruleId),r=o&&o.meta&&o.meta.docs&&o.meta.docs.url,n=s(e.line,1),a=s(e.column,1),d=s(e.endLine,n),l=s(e.endColumn,a+1);return{code:r?{value:e.ruleId,link:r}:e.ruleId||"FATAL",severity:t.MarkerSeverity.Error,source:"ESLint",message:e.message,startLineNumber:n,startColumn:a,endLineNumber:d,endColumn:l}},updateMarkers(e,t,i){const{monaco:o,editorMessageMap:s}=this,r=e.getModel(),n=e.getId();s.delete(r.uri);const d=[];let l=null;i&&(l=new Map,s.set(r.uri,l));for(const e of t){const t=this.messageToMarker(e);d.push(t),i&&l.set(a(t),e)}o.editor.setModelMarkers(r,n,d)},updateCode(e){const t=this.codeEditor;null!=t&&r(t,e),this.invalidate()},invalidate(){null==this.editor||this.editing||(this.editing=!0,setTimeout(()=>{this.lint(),this.editing=!1},667))},lint(){const{codeEditor:e,config:t,filename:i,preprocess:o,postprocess:s,linter:r}=this;if(null==e||null==r)return;this.editorMessageMap.clear();const n=e.getModel().getValue();try{this.messages=r.verify(n,t,{filename:i,preprocess:o,postprocess:s})}catch(e){this.messages=[{fatal:!0,severity:2,message:e.message,line:1,column:0}]}try{const e=r.verifyAndFix(n,t,{filename:i});this.fixedCode=e.fixed?e.output:n,this.fixedMessages=e.messages}catch(e){this.fixedCode=n,this.fixedMessages=[{fatal:!0,severity:2,message:e.message,line:1,column:0}]}this.$emit("change",{code:n,messages:this.messages,fixedCode:this.fixedCode,fixedMessages:this.fixedMessages}),this.requestFix&&(this.requestFix=!1,this.fixedCode!==this.code&&(this.$emit("input",this.fixedCode),this.updateCode(this.fixedCode)))},applyAutofix(){const{code:e,fixedCode:t,editing:i}=this;i?this.requestFix=!0:t!==e&&(this.$emit("input",t),this.updateCode(t))}}},c=(i(178),i(6)),u=Object(c.a)(l,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"eslint-editor-root",class:{"eslint-editor-dark":e.dark}},[i("transition",{attrs:{name:"eslint-editor-fade"},on:{"before-enter":e.fadeIn}},[e.monaco?i("div",{key:"editor",staticClass:"eslint-editor-swap-container"},[i("div",{ref:"monaco",staticClass:"eslint-editor-monaco"}),e._v(" "),e.fix?i("div",{staticClass:"eslint-editor-actions"},[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.previewFix,expression:"previewFix"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.previewFix)?e._i(e.previewFix,null)>-1:e.previewFix},on:{change:function(t){var i=e.previewFix,o=t.target,s=!!o.checked;if(Array.isArray(i)){var r=e._i(i,null);o.checked?r<0&&(e.previewFix=i.concat([null])):r>-1&&(e.previewFix=i.slice(0,r).concat(i.slice(r+1)))}else e.previewFix=s}}}),e._v("\n                    Preview\n                ")]),e._v(" "),i("button",{on:{click:e.applyAutofix}},[e._v("\n                    Apply\n                ")])]):e._e()]):i("div",{key:"placeholder",staticClass:"eslint-editor-swap-container"},[i("code",{staticClass:"eslint-editor-placeholder-code"},[e._v(e._s(e.code))]),e._v(" "),i("transition",{attrs:{name:"eslint-editor-fade"}},[e.monacoLoadingError?i("div",{key:"error",staticClass:"eslint-editor-placeholder-error"},[e._v("\n                    Failed to load this editor\n                ")]):i("div",{key:"loading",staticClass:"eslint-editor-placeholder-loading"},[i("div",{staticClass:"eslint-editor-placeholder-loading-icon"},[i("div"),e._v(" "),i("div"),e._v(" "),i("div")]),e._v(" "),i("div",{staticClass:"eslint-editor-placeholder-loading-message"},[e._v("\n                        Now loading...\n                    ")])])])],1)])],1)}),[],!1,null,null,null);t.a=u.exports},194:function(e,t,i){"use strict";i.r(t);var o=i(184),s=i(179),r=i.n(s),n=i(193),a=i.n(n),d={name:"EslintPluginEditor",components:{EslintEditor:o.a},model:{prop:"code"},props:{code:{type:String,default:""},fix:{type:Boolean},rules:{type:Object,default:()=>({})},dark:{type:Boolean}},data:()=>({eslint4b:null,format:{insertSpaces:!0,tabSize:2}}),computed:{config(){return{globals:{ArrayBuffer:!1,DataView:!1,Float32Array:!1,Float64Array:!1,Int16Array:!1,Int32Array:!1,Int8Array:!1,Map:!1,Promise:!1,Proxy:!1,Reflect:!1,Set:!1,Symbol:!1,Uint16Array:!1,Uint32Array:!1,Uint8Array:!1,Uint8ClampedArray:!1,WeakMap:!1,WeakSet:!1,Atomics:!1,SharedArrayBuffer:!1},rules:this.rules,parser:"vue-eslint-parser",parserOptions:{sourceType:"module",ecmaVersion:2019}}},fileName:()=>"a.vue",language:()=>"html",preprocess:()=>a.a.processors[".vue"].preprocess,postprocess:()=>a.a.processors[".vue"].postprocess,linter(){if(!this.eslint4b)return null;const e=new(0,this.eslint4b);for(const t of Object.keys(r.a.rules)){const i=r.a.rules[t];e.defineRule(i.meta.docs.ruleId,i)}for(const t of Object.keys(a.a.rules)){const i=a.a.rules[t];e.defineRule("vue/"+t,i)}e.defineParser("vue-eslint-parser",i(167));const t=this,o=e.verifyAndFix.bind(e);return e.verifyAndFix=function(...e){return e[2].preprocess=t.preprocess,e[2].postprocess=t.postprocess,o(...e)},e}},async mounted(){const{default:e}=await Promise.resolve().then(i.t.bind(null,791,7));this.eslint4b=e;const t=this.$refs.editor;t.$watch("monaco",()=>{const{monaco:e}=t;e.languages.typescript.typescriptDefaults.setDiagnosticsOptions({validate:!1}),e.languages.typescript.javascriptDefaults.setDiagnosticsOptions({validate:!1})}),t.$watch("codeEditor",()=>{t.codeEditor&&t.codeEditor.onDidChangeModelDecorations(()=>this.onDidChangeModelDecorations(t.codeEditor))}),t.$watch("fixedCodeEditor",()=>{t.fixedCodeEditor&&t.fixedCodeEditor.onDidChangeModelDecorations(()=>this.onDidChangeModelDecorations(t.fixedCodeEditor))})},methods:{onDidChangeModelDecorations(e){const{monaco:t}=this.$refs.editor,i=e.getModel();t.editor.setModelMarkers(i,"javascript",[])}}},l=(i(183),i(6)),c=Object(l.a)(d,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("eslint-editor",{ref:"editor",staticClass:"eslint-code-block",attrs:{linter:e.linter,config:e.config,code:e.code,language:e.language,filename:e.fileName,preprocess:e.preprocess,postprocess:e.postprocess,dark:e.dark,format:e.format,fix:e.fix},on:{input:function(t){return e.$emit("input",t)},change:function(t){return e.$emit("change",t)}}})}),[],!1,null,"6e35fdb1",null);t.default=c.exports}}]);