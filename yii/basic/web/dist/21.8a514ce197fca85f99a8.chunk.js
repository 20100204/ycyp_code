webpackJsonp([21],{255:function(t,e,a){"use strict";function n(t){c||a(876)}Object.defineProperty(e,"__esModule",{value:!0});var i=a(492),o=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);var l=a(879),s=a.n(l),c=!1,d=a(1),p=n,h=d(o.a,s.a,!1,p,null,null);h.options.__file="src\\views\\goods\\goods-list.vue",e.default=h.exports},492:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(878),i=(function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);e.default=t}(n),a(31)),o=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default={name:"searchable-table-goods-list",data:function(){return{loading:!0,pageSize:0,totalPage:0,currPage:1,searchConName1:"",searchConName2:"",searchConName3:"",rs:{},columns1:[],data1:[],initTable1:[]}},computed:{loadStatus:function(){return this.loading}},methods:{handleSingleSelect:function(t,e){console.log(t),console.log(e)},handleDel:function(){this.$router.push({name:"goodsadd"})},handleStatus:function(){this.$router.push({name:"goodsadd"})},handleAdd:function(){this.$router.push({name:"goodsadd"})},changePage:function(t){var e=this;this.currPage=t,this.rs={title:this.searchConName1,barcode:this.searchConName2,bn:this.searchConName3},o.default.post("http://ycyp.yii/index.php?r=item/skus&curpage="+t,this.rs).then(function(t){e.loading=!1,console.log(t.data),e.totalPage=t.data.totalPage,e.pageSize=t.data.pageSize,t.data.search&&(t.data.search.hasOwnProperty("title")&&(e.searchConName1=t.data.search.title),t.data.search.hasOwnProperty("barcode")&&(e.searchConName2=t.data.search.barcode),t.data.search.hasOwnProperty("bn")&&(e.searchConName3=t.data.search.bn)),e.data1=e.initTable1=t.data.rs}).catch(function(t){console.log(t)})},init:function(){var t=this;o.default.get("http://ycyp.yii/index.php?r=item/skus").then(function(e){t.loading=!1,console.log(e.data),t.totalPage=e.data.totalPage,console.log(t.totalPage),t.pageSize=e.data.pageSize,t.currPage=e.data.currpage,e.data.search&&(e.data.search.hasOwnProperty("title")&&(t.searchConName1=e.data.search.title),e.data.search.hasOwnProperty("barcode")&&(t.searchConName2=e.data.search.barcode),e.data.search.hasOwnProperty("bn")&&(t.searchConName3=e.data.search.bn)),console.log(t.totalPage),t.data1=t.initTable1=e.data.rs}).catch(function(t){console.log(t)})},handleSearch1:function(){var t=this;this.rs={title:this.searchConName1,barcode:this.searchConName2,bn:this.searchConName3},o.default.post("http://ycyp.yii/index.php?r=item/skus",this.rs).then(function(e){t.loading=!1,console.log(e.data),t.totalPage=e.data.totalPage,t.pageSize=e.data.pageSize,t.currPage=e.data.currpage,e.data.search&&(e.data.search.hasOwnProperty("title")&&(t.searchConName1=e.data.search.title),e.data.search.hasOwnProperty("barcode")&&(t.searchConName2=e.data.search.barcode),e.data.search.hasOwnProperty("bn")&&(t.searchConName3=e.data.search.bn)),t.data1=t.initTable1=e.data.rs}).catch(function(t){console.log(t)})}},mounted:function(){var t=this;this.init(),this.columns1=[{type:"selection",width:60,align:"center"},{key:"barcode",title:"barcode"},{key:"bn",title:"bn"},{key:"title",title:"商品标题"},{key:"item_id",title:"item_id"},{key:"id",title:"sku_id"},{key:"MOQ",title:"最小起订量"},{key:"packing_qty",title:"箱包装数量"},{key:"packing_unit",title:"箱包装单位"},{key:"is_whole",title:"散卖"},{key:"price",title:"价格"},{key:"status",title:"上下架",render:function(e,a){return e("a",{props:{type:"text",size:"small"},on:{click:function(){var e={id:a.row.id,status:a.row.status};t.$router.push({name:"skustatus",query:e})}}},"1"==a.row.status?"下架":"上架")}},{key:"supplier_id",title:"供应商"},{key:"attr_id",title:"属性名称"},{key:"attr_val",title:"属性值"},{key:"operation",title:"操作",render:function(e,a){return e("a",{props:{type:"text",size:"small"},on:{click:function(){var e={id:a.row.id};t.$router.push({name:"goodsedit",query:e})}}},"编辑")}}]}}},876:function(t,e,a){var n=a(877);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(17)("8c6b5718",n,!1)},877:function(t,e,a){e=t.exports=a(16)(!1),e.push([t.i,"\n.margin-top-8 {\n  margin-top: 8px;\n}\n.margin-top-10 {\n  margin-top: 10px;\n}\n.margin-top-20 {\n  margin-top: 20px;\n}\n.margin-left-10 {\n  margin-left: 10px;\n}\n.margin-bottom-10 {\n  margin-bottom: 10px;\n}\n.margin-bottom-100 {\n  margin-bottom: 100px;\n}\n.margin-right-10 {\n  margin-right: 10px;\n}\n.padding-left-6 {\n  padding-left: 6px;\n}\n.padding-left-8 {\n  padding-left: 5px;\n}\n.padding-left-10 {\n  padding-left: 10px;\n}\n.padding-left-20 {\n  padding-left: 20px;\n}\n.height-100 {\n  height: 100%;\n}\n.height-120px {\n  height: 100px;\n}\n.height-200px {\n  height: 200px;\n}\n.height-492px {\n  height: 492px;\n}\n.height-460px {\n  height: 460px;\n}\n.line-gray {\n  height: 0;\n  border-bottom: 2px solid #dcdcdc;\n}\n.notwrap {\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.padding-left-5 {\n  padding-left: 10px;\n}\n[v-cloak] {\n  display: none;\n}\n.dragging-tip-enter-active {\n  opacity: 1;\n  transition: opacity .3s;\n}\n.dragging-tip-enter,\n.dragging-tip-leave-to {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.dragging-tip-con {\n  display: block;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n}\n.dragging-tip-con span {\n  font-size: 18px;\n}\n.record-tip-con {\n  display: block;\n  width: 100%;\n  height: 292px;\n  overflow: auto;\n}\n.record-item {\n  box-sizing: content-box;\n  display: block;\n  overflow: hidden;\n  height: 24px;\n  line-height: 24px;\n  padding: 8px 10px;\n  border-bottom: 1px dashed gainsboro;\n}\n.record-tip-con span {\n  font-size: 14px;\n}\n.edittable-test-con {\n  height: 160px;\n}\n.edittable-table-height-con {\n  height: 190px;\n}\n.edittable-con-1 {\n  box-sizing: content-box;\n  padding: 15px 0 0;\n  height: 196px;\n}\n.edittable-table-get-currentdata-con {\n  height: 190px !important;\n}\n.exportable-table-download-con1 {\n  padding: 16px 0 16px 20px;\n  border-bottom: 1px dashed #c3c3c3;\n  margin-bottom: 16px;\n}\n.exportable-table-download-con2 {\n  padding-left: 20px;\n}\n.show-image {\n  padding: 20px 0px;\n}\n.show-image img {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.searchable-table-con1 {\n  height: 230px !important;\n}\n",""])},878:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.searchTable1=[{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"},{barcode:"Aresn",bn:"122322323",title:"17712345678",item_id:"3412341234",MOQ:10,packing_qty:10,packing_unit:"箱",is_whole:"whole",price:12.12,supplier_id:"china",attr_id:"颜色",attr_val:"红色",operation:"编辑"}],e.searchTable2=[{name:"Aresn",tel:"17712345678"},{name:"Lison",tel:"17787654321"},{name:"Lili",tel:"12212345678"},{name:"Lucy",tel:"13312345678"}],e.searchTable3=[{name:"Aresn",tel:"17712345678"},{name:"Lison",tel:"17787654321"},{name:"Lili",tel:"12212345678"},{name:"Lucy",tel:"13312345678"}]},879:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",{attrs:{gutter:10}},[a("Col",{attrs:{span:"24"}},[a("Card",[a("Row",{attrs:{gutter:4}},[a("Col",{attrs:{span:"16"}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入商品标题搜搜..."},model:{value:t.searchConName1,callback:function(e){t.searchConName1=e},expression:"searchConName1"}}),t._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入barcode搜搜..."},model:{value:t.searchConName2,callback:function(e){t.searchConName2=e},expression:"searchConName2"}}),t._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入bn搜搜..."},model:{value:t.searchConName3,callback:function(e){t.searchConName3=e},expression:"searchConName3"}}),t._v(" "),a("span",{staticStyle:{margin:"0 10px"},on:{click:t.handleSearch1}},[a("Button",{attrs:{type:"primary",icon:"search"}},[t._v("搜索")])],1)],1)],1)],1),t._v(" "),a("Card",{attrs:{padding:4}},[a("Row",[a("Col",{attrs:{span:"4"}},[a("span",{staticStyle:{margin:"0px"},on:{click:t.handleAdd}},[a("Button",{attrs:{type:"info",size:"small",icon:"android-add"}},[t._v("添加")])],1)]),t._v(" "),a("Col",{attrs:{span:"4"}},[a("span",{staticStyle:{margin:"0 -104px"},attrs:{pull:"4"},on:{click:t.handleStatus}},[a("Button",{attrs:{type:"info",size:"small",icon:"setting"}},[t._v("上下架")])],1)]),t._v(" "),a("Col",{attrs:{span:"4"}},[a("span",{staticStyle:{margin:"0 -208px"},attrs:{pull:"4"},on:{click:t.handleDel}},[a("Button",{attrs:{type:"warning",size:"small",icon:"android-delete"}},[t._v("删除")])],1)])],1)],1),t._v(" "),a("Card",[a("Row",{staticClass:"margin-top-10 searchable-table-con1"},[a("Table",{attrs:{columns:t.columns1,data:t.data1,loading:t.loadStatus},on:{"on-select":t.handleSingleSelect}}),t._v(" "),t.totalPage>1?a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.totalPage,current:t.currPage,"page-size":t.pageSize},on:{"on-change":t.changePage}})],1)]):t._e()],1)],1)],1)],1)],1)},i=[];n._withStripped=!0;var o={render:n,staticRenderFns:i};e.default=o}});