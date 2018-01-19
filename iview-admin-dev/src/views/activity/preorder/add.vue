<style lang="less">
	@import '../../../styles/common.less';
	@import './article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="100">
			<Card>
				<Form :label-width="80">
					<FormItem label="活动简介" :error="articleError">
						<Input v-model="description" @on-blur="handleArticletitleBlur" icon="android-list" style="width:600px;" />
					</FormItem>
					<FormItem label="选择商品">
						<Button type="primary" shape="circle" ico="ico-search" @click="modal1=true"> 选择预售商品</Button>
						<Modal v-model="modal1" title="请选择预售产品" width="620">
							<Table :columns="columns1" :data="data1" :width="width" highlight-row ref="currentRowTable"></Table>
						</Modal>
					</FormItem>
					<FormItem label="预售价格" :error="articleError">
						<InputNumber v-model="price" placeholder="请填售价" :max="10000" :min="0.1" :step="0.1"></InputNumber>
					</FormItem>
					<FormItem label="店东分润百分比" :error="articleError">
						<InputNumber v-model="profit_rate" placeholder="请填店东分润百分比" :max="20" :min="5" :step="0.1"></InputNumber>
					</FormItem>
					<FormItem label="总部分润百分比" :error="articleError">
						<InputNumber v-model="parentcompany_profit_rate" placeholder="请填总部分润百分比" :max="20" :min="5" :step="0.1"></InputNumber>
					</FormItem>
					<FormItem label="预告时间" :error="articleError">
						<DatePicker v-model="notice_time" type="datetime" placeholder="请选择预告时间" style="width: 200px"></DatePicker>
					</FormItem>
					<FormItem label="预售时间" :error="articleError">
						<DatePicker type="datetimerange" placeholder="请选择预售开始和结束时间" style="width: 300px"></DatePicker>
					</FormItem>
					<FormItem label="自提时间" :error="articleError">
						<DatePicker type="datetimerange" placeholder="请选择自提开始和结束时间" style="width: 300px"></DatePicker>
					</FormItem>
					<FormItem label="活动详情">
						<txt-editor></txt-editor>
					</FormItem>
					<FormItem>
						<span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">提交</Button></span>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import txtEditor from '../../my-components/text-editor/text-editor.vue'
	export default {
		name: 'preorder-add',
		 
		components: {
			txtEditor
		},
		data() {
			return {
				width:'600',
				columns1: [{
						key: 'barcode',
						title: 'barcode'
					},
					 
					{
						key: 'title',
						title: '商品标题'
					},
					{
						key: 'unit',
						title: 'item_id'
					},
					{
						key: 'producing_area',
						title: '产地'
					},
					{
						key: 'created_at',
						title: '最小起订量'
					},
					{
						key: 'updated_at',
						title: '箱包装数量'
					} 
				],
				data1:[{
					barcode: 'Aresn',
					title: '17712345678',
					unit: '个',
					producing_area: 'china',
					created_at: '12244444',
					updated_at: '342341234321' 
				},
				{
					barcode: 'Aresn',
					title: '17712345678',
					unit: '个',
					producing_area: 'china',
					created_at: '12244444',
					updated_at: '342341234321' 
				}],
			    modal1: false,
				notice_time: '',
				profit_rate: 5,
				parentcompany_profit_rate: 5,
				articleError: '',
				description: '',
				sku_packing_qty: '',
				sku_packing_unity: '',
				unit: '',
				barcode: '',
				sku_moq: '',
				price: 0.2,
				is_whole: '是',
				publishLoading: false,
		};
	},
	methods: {
			handlePublish() {
				this.publishLoading = true;
				setTimeout(() => {
					this.publishLoading = false;
					this.$Notice.success({
						title: '保存成功',
						desc: '文章《' + this.title + '》保存成功'
					});
				}, 1000);

			},
			handleArticletitleBlur() {
				if(this.description.length !== 0) {
					// this.articleError = '';
					localStorage.description = this.description; // 本地存储文章标题
					if(!this.articlePathHasEdited) {
						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();
						this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
						this.articlePath = this.description;
						this.articlePathHasEdited = true;
						this.showLink = true;
					}
				} else {
					// this.articleError = '文章标题不可为空哦';
					this.$Message.error('文章标题不可为空哦');
				}
			},
		},

		computed: {

		}
	};
</script>