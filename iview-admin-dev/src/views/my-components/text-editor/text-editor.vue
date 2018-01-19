<style lang="less">
    @import '../../../styles/loading.less';
</style>

<template>
    <div>
        <Card shadow>
            <textarea class='tinymce-textarea' id="tinymceEditer" v-model="detail"></textarea>
        </Card>
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载组件中...</div>
        </Spin>
    </div>
</template>

<script>
	
import tinymce from 'tinymce';
var  _thisycyp;
export default {
    name: 'text-editor',
    props:['detail'],
    data () {
        return {
            spinShow: true,
        };
    },
    watch:{
    	detail:function(val){
    		 
    		  tinymce.get('tinymceEditer').getBody().innerHTML=this.detail;
    	}
    },
    methods: {
        init () {
            this.$nextTick(() => {
            	 
                let vm = this;
                let height = document.body.offsetHeight - 300;
                tinymce.init({
                    selector: '#tinymceEditer',
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: 'zh_CN.GB2312',
                    menubar: 'edit insert view format table tools',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullpage',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: function (editor) {
                        editor.on('init', function (e) { 
                            vm.spinShow = false;
                            tinymce.get('tinymceEditer').getBody().innerHTML=_thisycyp.detail;
                            console.log("txt");
                            console.log(_thisycyp.detail);
                            console.log("txt");
                           // tinymce.get('tinymceEditer').setContent(_thisycyp.detail);
                            /*if (localStorage.editorContent) {
                                tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                            }*/
                        });
                        editor.on('keyup', function (e) { 
                        	// this.detail =  tinymce.get('tinymceEditer').getContent();  
                        	 _thisycyp.detail =  tinymce.get('tinymceEditer').getBody().innerHTML; 
                        	 _thisycyp.$emit("ontextarea",_thisycyp.detail);
                            //localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                        });
                    }
                });
            });
        }
    },
    mounted () { 
        this.init();
       _thisycyp = this;
    },
    destroyed () {
        tinymce.get('tinymceEditer').destroy();
    }
};
</script>

<style>

</style>
