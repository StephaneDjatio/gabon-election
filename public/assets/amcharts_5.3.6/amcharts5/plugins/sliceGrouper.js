"use strict";(self.webpackChunk_am5=self.webpackChunk_am5||[]).push([[476],{1790:function(t,e,i){i.r(e),i.d(e,{SliceGrouper:function(){return r}});var s=i(8054),a=i(1479),o=i(6331),n=i(5071);class r extends o.JH{constructor(){super(...arguments),Object.defineProperty(this,"zoomOutButton",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}_afterNew(){super._afterNew(),this._setRawDefault("threshold",5),this._setRawDefault("groupName","Other"),this._setRawDefault("clickBehavior","none"),this.initZoomButton(),this._root.addDisposer(this)}initZoomButton(){if("none"!==this.get("clickBehavior")){const t=this.root.tooltipContainer;this.zoomOutButton=t.children.push(s.z.new(this._root,{themeTags:["zoom"],icon:a.T.new(this._root,{themeTags:["button","icon"]})})),this.zoomOutButton.hide(),this.zoomOutButton.events.on("click",(()=>{this.zoomOut()}))}}handleData(){const t=this.get("series");if(t){let e=this.getPrivate("groupDataItem");if(!e){const i=this.get("legend"),s=t.get("categoryField","category"),a=t.get("valueField","value"),o={};o[s]=this.get("groupName",""),o[a]=0,t.data.push(o),e=t.dataItems[t.dataItems.length-1],e.get("slice").events.on("click",(()=>{this.handleClick()})),this.setPrivate("groupDataItem",e),i&&(i.data.push(e),e.on("visible",(t=>{t&&this.zoomOut()})))}const i=this.get("threshold",0),s=this.get("limit",1e3),a=[],o=[];let r=0;(i||s)&&(n.each(t.dataItems,((t,n)=>{const h=t.get("legendDataItem");(t.get("valuePercentTotal")<=i||n>s-1)&&e!==t?(r+=t.get("value",0),o.push(t),t.hide(0),h&&h.get("itemContainer").hide(0)):(a.push(t),h&&h.get("itemContainer").show(0))})),this.setPrivate("normalDataItems",a),this.setPrivate("smallDataItems",o),this.updateGroupDataItem(r))}}zoomOut(){const t=this.getPrivate("groupDataItem");if(t&&t.show(),"zoom"==this.get("clickBehavior")){const t=this.getPrivate("normalDataItems",[]);n.each(t,((t,e)=>{t.show()}))}const e=this.getPrivate("smallDataItems",[]);n.each(e,((t,e)=>{t.hide()})),this.zoomOutButton&&this.zoomOutButton.hide()}updateGroupDataItem(t){const e=this.get("series");if(e){const i={},s=e.get("categoryField","category"),a=e.get("valueField","value");i[s]=this.get("groupName",""),i[a]=t,e.data.setIndex(e.data.length-1,i);const o=this.getPrivate("groupDataItem");0==t?o.hide(0):o.isHidden()&&o.show(),"none"!=this.get("clickBehavior")&&o.get("slice").set("toggleKey","none")}}handleClick(){const t=this.get("clickBehavior"),e=this.getPrivate("smallDataItems");if("none"==t||e&&0==e.length)return;const i=this.get("series");this.getPrivate("groupDataItem").hide(),n.each(i.dataItems,(i=>{-1!==e.indexOf(i)?i.show():"zoom"==t&&i.hide()})),this.zoomOutButton.show()}_beforeChanged(){if(super._beforeChanged(),this.isDirty("series")){const t=this.get("series");t&&t.events.on("datavalidated",(t=>{this.handleData()}))}}}Object.defineProperty(r,"className",{enumerable:!0,configurable:!0,writable:!0,value:"SliceGrouper"}),Object.defineProperty(r,"classNames",{enumerable:!0,configurable:!0,writable:!0,value:o.JH.classNames.concat([r.className])})},9523:function(t,e,i){i.r(e),i.d(e,{am5plugins_sliceGrouper:function(){return s}});const s=i(1790)}},function(t){var e=(9523,t(t.s=9523)),i=window;for(var s in e)i[s]=e[s];e.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})}]);
//# sourceMappingURL=sliceGrouper.js.map