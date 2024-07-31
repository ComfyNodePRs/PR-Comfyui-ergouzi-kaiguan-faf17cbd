import{app}from"/scripts/app.js";import{ComfyWidgets}from"/scripts/widgets.js";function toggleGroupNodes(e){var t=e.outputs.flatMap(e=>e.links||[]).map(e=>{e=app.graph.links[e];return e&&app.graph.getNodeById(e.target_id)||null}).filter(e=>null!==e);let i=e.properties.smooth_edge_switch;t.forEach(t=>{let o;i?"hulue"===t.type.toLowerCase()?o="bypass":"jinyong"===t.type.toLowerCase()&&(o="disable"):o="enable",app.graph._groups.filter(e=>(e.recomputeInsideNodes(),e._nodes.some(e=>e===t))).forEach(e=>{e._nodes.forEach(e=>{e&&("enable"===o?e.mode=LiteGraph.ALWAYS:"bypass"===o?e.mode=4:"disable"===o&&(e.mode=LiteGraph.NEVER))})})}),app.graph.setDirtyCanvas(!0,!0)}function monitorNodeConnections(r){r.onConnectionsChange=(e,t,o,i,s,n,p)=>{toggleGroupNodes(r)}}function showSwitchSettings(t){let e=document.createElement("div");e.style.position="fixed",e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.padding="20px",e.style.backgroundColor="#333",e.style.color="#fff",e.style.border="1px solid #ccc",e.style.zIndex=1e3,e.style.maxHeight="80%",e.style.overflowY="auto",e.style.width="400px";var o=document.createElement("h3"),o=(o.textContent="2🐕开关设置【set up】",e.appendChild(o),document.createElement("label"));o.textContent="开关名称【Switch name】:",e.appendChild(o);let i=document.createElement("input");i.type="text",i.value=t.properties.switchName||"smooth_edge_switch",i.addEventListener("input",()=>{var e=i.value;t.properties.switchName=e,updateSwitchWidgetName(t,e)}),e.appendChild(i);o=document.createElement("button"),o.textContent="灵仙儿和二狗子",o.style.position="absolute",o.style.top="10px",o.style.right="10px",o.style.backgroundColor="#ff69b4",o.style.color="#fff",o.style.border="none",o.style.padding="5px 10px",o.style.borderRadius="5px",o.style.cursor="pointer",o.addEventListener("click",()=>{window.open("https://space.bilibili.com/19723588?spm_id_from=333.1350.jump_directly","_blank")}),e.appendChild(o),o=document.createElement("button");o.textContent="关闭【close】",o.style.marginTop="10px",o.addEventListener("click",()=>{document.body.removeChild(e)}),e.appendChild(o),document.body.appendChild(e)}function updateSwitchWidgetName(e,t){e=e.widgets.find(e=>"switchNameWidget"===e.name);e&&(e.label=t),app.graph.setDirtyCanvas(!0,!0)}let originalGetNodeMenuOptions=LGraphCanvas.prototype.getNodeMenuOptions;LGraphCanvas.prototype.getNodeMenuOptions=function(e){var t=originalGetNodeMenuOptions.apply(this,arguments);return"GroupSwitchNodeee"===e.type&&t.push({content:"2🐕开关设置【set up】",callback:()=>showSwitchSettings(e)}),t},app.registerExtension({name:"Comfy.GroupSwitchNewUpdated",async beforeRegisterNodeDef(e,t,o){"GroupSwitchNodeee"===t.name&&(e.prototype.onNodeCreated=function(){var e;this._initialized||(this._initialized=!0,this.properties={switchName:"smooth_edge_switch",smooth_edge_switch:!1},(e=ComfyWidgets.BOOLEAN(this,"switchNameWidget",{default:!1,label_on:"True",label_off:"False"})).widget.callback=e=>{this.properties.smooth_edge_switch=e,toggleGroupNodes(this)},this.widgets=[e.widget],monitorNodeConnections(this))},e.prototype.onSerialize=function(e){e.properties=this.properties},e.prototype.onConfigure=function(e){this.properties=e.properties||{switchName:"smooth_edge_switch",smooth_edge_switch:!1},updateSwitchWidgetName(this,this.properties.switchName),toggleGroupNodes(this,this.properties.smooth_edge_switch)})}});