<style lang="less">
    @import '../../../../styles/common.less';
    @import 'upload.less';
</style> 
<template>
    <div style="height:80px;">  
            <Col span="24" >
                 
                    <Card> 
                        <div class="height-492px" style="height:100px; ">
                            <Col span="6" >
                                <Card>
                                    <Upload
                                        ref="upload"
                                        name='upload'
                                        :show-upload-list="false"
                                        :default-file-list="defaultList"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload" 
                                        type="drag"
                                        action="http://ycyp.yii/index.php?r=item/uppic"
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="查看图片" v-model="visible">
                                        <img :src="src" v-if="visible" style="width: 100%">
                                    </Modal>
                                </Card>
                            </Col>
                            <Col span="18" class="padding-left-10">
                                <Card>
                                    <div class="height-460px" style="height:80px;">
                                        <div class="admin-upload-list" v-for="item in uploadList" :key="item.url">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="admin-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name,item.url)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </div>
                    </Card>
                
            </Col>
       
    </div>
</template>

<script>
export default {
    name: 'file-upload',
    props:['defaultlist'],
    data () {
        return {/*
        	 
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],*/
            src:'',
            imgName: '',
            visible: false,
            uploadList: [] 
        };
    },
    watch:{
    	defaultlist:function(val){
    		this.uploadList=val;
    	}
    },
    methods: {
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
            });
        },
        handleBeforeUpload (file) {
            this.$Notice.warning({
                title: '文件准备上传',
                desc: '文件 ' + file.name + ' 准备上传。'
            });
        },
        handleProgress (event, file) {
            this.$Notice.info({
                title: '文件正在上传',
                desc: '文件 ' + file.name + ' 正在上传。'
            });
        },
        handleSuccess (evnet, file,rs) {  
            this.$Notice.success({
                title: '文件上传成功',
                desc: '文件 ' + file.name + ' 上传成功。'
            });
            console.log(this.uploadList);
            this.uploadList[this.uploadList.length-1].url=file.response;
            this.$emit('uploadpic',this.uploadList);
            //this.$refs.upload.fileList.push({name:file.name,url:file.response.rs,status:"finished"});
             //this.uploadList.push({name:file.name,url:file.response.rs,status:"finished"});
             
            //console.log(this.uploadList);
        },
        handleError (event, file) { 
            this.$Notice.error({
                title: '文件上传成功',
               // desc: '文件 ' + file.name + ' 上传失败。'
            });
        },
        handleView (name,url) {
            this.imgName = name;
            this.visible = true;
            this.src=url;
        },
        handleRemove (file) { 
            // 从 upload 实例删除数据
          //  const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
           // this.uploadList.pop(file);
        }, 
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
       
    },
    created () {
    	console.log('ffff');
      //  this.uploadList = this.$refs.upload.fileList;
        this.uploadList=this.defaultlist;
        console.log('chj');
        console.log(this.defaultlist);
        console.log(this.uploadList);
        console.log('gggggg');
    }
};
</script>
