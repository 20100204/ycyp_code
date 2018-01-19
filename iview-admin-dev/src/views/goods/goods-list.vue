<style lang="less">
	@import '../../styles/common.less';
	@import './components/table.less';
</style>

<template>
	<div>
		<Row :gutter="10">
			<Col span="24">
			<Card>
				<Row :gutter="4">
					<Col span="16">
					<Input v-model="searchConName1" placeholder="请输入商品标题搜搜..." style="width: 200px" />
					<Input v-model="searchConName2" placeholder="请输入barcode搜搜..." style="width: 200px" />
					<Input v-model="searchConName3" placeholder="请输入bn搜搜..." style="width: 200px" />
					<span @click="handleSearch1" style="margin: 0 10px;">
						<Button type="primary" icon="search">搜索</Button>
					</span>
					</Col>
				</Row>
			</Card>
			<Card :padding="4">
				<Row>
					<Col span="4">
					<span @click="handleAdd" style="margin:0px margin-left:4px;">
							 <Button type="info" size="small" icon="android-add">添加</Button>
						</span>
					</Col>
					<Col span="4">
					<span @click="handleStatus" pull="4" style="margin:0 -104px ">
							 <Button type="info" size="small" icon="setting">上下架</Button>
						</span>
					</Col>
					<Col span="4">
					<span @click="handleDel" pull="4" style="margin:0 -208px ">
							 <Button type="warning" size="small" icon="android-delete">删除</Button>
						</span>
					</Col>
				</Row>
				<Modal v-show="tipDia" title="危险操作" @on-ok="ok" @on-cancel="cancel">
					<p>现在在进行危险操作，请慎重！</p> 
				</Modal>
			</Card>
			<Card>
				<Row class="margin-top-10 searchable-table-con1">
					<Table :columns="columns1" :data="data1" :loading="loadStatus" @on-select="handleSingleSelect" @on-select-cancel="handleSelectCancel" @on-select-all="handleSelectAll" @on-selection-change="handleSelectChange">

					</Table>
					<div style="margin: 10px;overflow: hidden" v-if="totalPage > 1">
						<div style="float: right;">
							<Page :total="totalPage" :current="currPage" :page-size="pageSize" @on-change="changePage"></Page>
						</div>
					</div>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import * as table from './data/goodslist';
	import Axios from 'axios';
	export default {
		name: 'searchable-table-goods-list',
		data() {
			return {
				loading: true,
				pageSize: 0,
				totalPage: 0,
				currPage: 1,
				searchConName1: '',
				searchConName2: '',
				searchConName3: '',
				rs: {},
				columns1: [],
				data1: [],
				initTable1: [],
				ids: [],
				tipDia: false
			};
		},
		computed: {
			loadStatus() {
				return this.loading;
			}
		},
		methods: {
			handleSingleSelect(selection, row) {
				selection.forEach((item) => {
					this.ids.push(item.id);
				});
				console.log(this.ids);
				console.log(selection);
				console.log(row);
			},
			handleSelectCancel(selection, row) {
				if(this.ids) {
					this.ids.forEach((item) => {
						if(item == row.id) {
							this.ids.pop(item);
						}
					})
				}
				console.log(this.ids);
				console.log(selection);
				console.log(row);
			},
			handleSelectAll(selection) {
				this.ids = [];
				selection.forEach((item) => {
					this.ids.push(item.id);
				})
				console.log(this.ids);
				console.log(selection);

			},
			handleSelectChange(selection) {
				this.ids = [];
				selection.forEach((item) => {
					this.ids.push(item.id);
				})
				console.log(this.ids);
				console.log(selection);

			},
			handleDel() {
				if(this.ids.length) {
					this.tipDia=true;
				} else {
					this.$Message.error('请选择要删除的数据');
				}
				/*this.$router.push({
					name: 'goodsadd'
				});*/
			},
			handleStatus() {
				this.$router.push({
					name: 'goodsadd'
				});
			},
			handleAdd() {
				this.$router.push({
					name: 'goodsadd'
				});
			},
			changePage(page) {
				this.currPage = page;
				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					bn: this.searchConName3
				};
				Axios.post('http://ycyp.yii/index.php?r=item/skus&curpage=' + page, this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = res.data.totalPage
						this.pageSize = res.data.pageSize
						//this.currPage.res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
				//console.log(page);

				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				//this.tableData1 = this.mockTableData1();
			},
			init() {
				Axios.get('http://ycyp.yii/index.php?r=item/skus').then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = res.data.totalPage
						console.log(this.totalPage);
						this.pageSize = res.data.pageSize
						this.currPage = res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}

						console.log(this.totalPage);
						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
			},
			handleSearch1() {

				this.rs = {
					title: this.searchConName1,
					barcode: this.searchConName2,
					bn: this.searchConName3
				};
				Axios.post('http://ycyp.yii/index.php?r=item/skus', this.rs).then(
					(res) => {
						this.loading = false;
						console.log(res.data);
						this.totalPage = res.data.totalPage
						this.pageSize = res.data.pageSize
						this.currPage = res.data.currpage
						if(res.data.search) {
							if(res.data.search.hasOwnProperty("title")) {
								this.searchConName1 = res.data.search.title;
							}
							if(res.data.search.hasOwnProperty("barcode")) {
								this.searchConName2 = res.data.search.barcode;
							}
							if(res.data.search.hasOwnProperty("bn")) {
								this.searchConName3 = res.data.search.bn;
							}
						}

						this.data1 = this.initTable1 = res.data.rs
					}
				).catch((err) => {
					console.log(err);
				});
				//this.data1 = this.initTable1;
			}
		},
		mounted() {

			this.init();
			//  this.handleSearch1();
			this.columns1 = [{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					key: 'barcode',
					title: 'barcode'
				},
				{
					key: 'bn',
					title: 'bn'
				},
				{
					key: 'title',
					title: '商品标题'
				},
				{
					key: 'item_id',
					title: 'item_id'
				},
				{
					key: 'id',
					title: 'sku_id'
				},
				{
					key: 'MOQ',
					title: '最小起订量'
				},
				{
					key: 'packing_qty',
					title: '箱包装数量'
				},
				{
					key: 'packing_unit',
					title: '箱包装单位'
				},
				{
					key: 'is_whole',
					title: '散卖'
				},
				{
					key: 'price',
					title: '价格'
				},
				{
					key: 'status',
					title: '上下架',
					render: (h, params) => {
						return h('a', {
							props: {
								type: 'text',
								size: 'small'
							},
							on: {
								click: () => {
									let query = {
										id: params.row.id,
										status: params.row.status
									};
									this.$router.push({
										name: 'skustatus',
										query: query
									});
								}
							}
						}, params.row.status == "1" ? "下架" : '上架');
					}

				},
				{
					key: 'supplier_id',
					title: '供应商'
				},
				{
					key: 'attr_id',
					title: '属性名称'
				},
				{
					key: 'attr_val',
					title: '属性值'
				},

				{
					key: 'operation',
					title: '操作',
					render: (h, params) => {
						return h('a', {
							props: {
								type: 'text',
								size: 'small'
							},
							on: {
								click: () => {
									let query = {
										id: params.row.id
									};
									this.$router.push({
										name: 'goodsedit',
										query: query
									});
								}
							}
						}, '编辑');
					}
				}
			];
		}
	};
</script>