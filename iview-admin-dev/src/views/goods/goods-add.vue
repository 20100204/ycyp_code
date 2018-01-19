<style lang="less">
	@import '../../styles/common.less';
	@import './article-publish.less';
</style>
<template>
	<div>
		<Row>
			<Col span="24">
			<Card>
				<Form :label-width="80" :model="skuItem" :rules="ruleValidate" ref="skuItem">
					<FormItem label="商品标题" prop="title" :error="articleError">
						<Input :autofocus=true :value="skuItem.title" v-model="skuItem.title" placeholder="请输入商品标题" icon="android-list" style="width:600px;" />
					</FormItem>
					<FormItem label="箱包装数量" prop="sku_packing_qty" :error="articleError">
						<Input v-model="skuItem.sku_packing_qty" placeholder="请填箱包装数量" style="width: 200px" />
					</FormItem>
					<FormItem label="箱包装单位" prop="sku_packing_unity" :error="articleError">
						<Input v-model="skuItem.sku_packing_unity" placeholder="请填箱包装单位" style="width: 200px" />
					</FormItem>
					<FormItem label="最小销售包装单位" prop="unit" :error="articleError">
						<Input v-model="skuItem.unit" placeholder="请填最小销售包装单位" style="width: 200px" />
					</FormItem>
					<FormItem label="barcode" prop="barcode" :error="articleError">
						<Input v-model="skuItem.barcode" placeholder="请填barcode" style="width: 200px" />
					</FormItem>
					<FormItem label="MOQ" prop="sku_moq" :error="articleError">
						<Input v-model="skuItem.sku_moq" placeholder="请填最小起订量" style="width: 200px" />
					</FormItem>
					<FormItem label="价格" prop="price" :error="articleError">
						<InputNumber v-model="skuItem.price" placeholder="请填售价" :max="10000" :min="0.1" :step="0.1"></InputNumber>
					</FormItem>
					<FormItem label="是否散卖" prop="is_whole" :error="articleError">
						<RadioGroup v-model="skuItem.is_whole">
							<Radio label="是"></Radio>
							<Radio label="否"></Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="图片上传" :error="articleError" prop="pics">
						<pic-upload @uploadpic="uploadpic" :defaultList="skuItem.pics"></pic-upload>
					</FormItem>
					<FormItem label="产品详情" prop="detail">
						<txt-editor @ontextarea="handletextarea" :detail="skuItem.detail" name="detail"></txt-editor>
					</FormItem>
					<FormItem>
						<Button @click="handlePublish('skuItem')" icon="ios-checkmark" style="width:90px; " type="primary">
								    提交
							</Button>
						<Button type="ghost" @click="handleReset('skuItem')" style="margin-left: 8px">
							 	 重置
							 </Button>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import txtEditor from '../my-components/text-editor/text-editor.vue'
	import picUpload from './components/file-upload/file-upload.vue'
	import Axios from 'axios'
	export default {
		name: 'goods-edit',
		components: {
			txtEditor,
			picUpload
		},
		data() {
			return {
				articleError: '',
				skuItem: {
					detail: "",
					title: '',
					sku_packing_qty: '',
					sku_packing_unity: '',
					unit: '',
					barcode: '',
					sku_moq: '',
					price: 0,
					is_whole: '是',
					pics: [{
							'name': 'a42bdcc1178e62b4694c830f028db5c0',
							'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
						},
						{
							'name': 'bc7521e033abdd1e92222d733590f104',
							'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
						}
					],
				},
				uploadList: [],
				ruleValidate: {
					title: [{
						required: true,
						message: '请输入商品标题',
						trigger: 'blur'
					}],
					barcode: [{
						required: true,
						message: '请输入barcode',
						trigger: 'blur'
					}],
					sku_packing_qty: [{
						required: true,
						message: '请填箱包装数量',
						trigger: 'blur'
					}],
					sku_packing_unity: [{
						required: true,
						message: '请填箱包装单位',
						trigger: 'blur'
					}],
					unit: [{
						required: true,
						message: '请输入最小销售包装单位',
						trigger: 'blur'
					}, ],
					sku_moq: [{
						required: true,
						message: '请输入最小起订量',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						type: 'number',
						message: '请输入预售价格',
						trigger: 'blur'
					}],
					detial: [{
						required: true,
						message: 'Please enter a personal introduction',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			handletextarea(textarea) {
				//console.log('chj');
				//this.uploadList.push(textarea);
				this.skuItem.detail = textarea;
				//console.log(textarea);
				//console.log('pj');
			},
			uploadpic(e) {
				//console.log('aa');
				//console.log(e);
				//console.log(arg);
				//console.log('bb');
				this.uploadList = e;
			},
			handlePublish(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.skuItem.pics = this.uploadList;
						Axios.post('http://ycyp.yii/index.php?r=item/add', this.skuItem).then((res) => {
							//console.log(res);
							if(res.data.rs=="true"){
								this.$router.push('/goods/goodslist');
							}else{
								this.$Message.error(res.data.msg);
							}
						}).catch((error) => {

							console.log(error);
						});
						
					} else {
						this.$Message.error('请填入必填数据项');
					}
				})
			}
		},
		computed: {

		}
	};
</script>