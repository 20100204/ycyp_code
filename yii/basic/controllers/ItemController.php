<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/17 0017
 * Time: 下午 2:49
 */

namespace app\controllers;

use app\common\behavior\NoCsrs;
use app\models\Item;
use app\models\Sku;
use Yii;
use app\models\UploadPic;
use yii\web\Controller;
use yii\web\Response;
use yii\web\UploadedFile;

class ItemController extends Controller
{
    public function behaviors()
    {
        return [
            'csrf' => [
                'class' => NoCsrs::className(),
                'controller' => $this,
                'actions' => [
                    'uppic',
                    "add"
                ]
            ]
        ];
    }

    public $enableCsrfValidation = false;


    public function actionUppic()
    {
        if ($_FILES['upload']['tmp_name']) {
            if ($_FILES['upload']['tmp_name']) {
                $savePath = Yii::$app->params['uploadImg'];
                $baseName = $pathInfo = pathinfo('_' . $_FILES['upload']['name'], PATHINFO_FILENAME);
                $baseName = md5(date("YmdHIS") . $baseName);
                $filename = $baseName . '.' . strtolower(pathinfo($_FILES['upload']['name'], PATHINFO_EXTENSION));
                $desPath = $savePath . $filename;
                if (move_uploaded_file($_FILES['upload']['tmp_name'], $desPath)) {
                    return json_encode('./upload/imgs/' . $filename, JSON_UNESCAPED_UNICODE);
                }
            }
        }

        /*  $model = new UploadPic();
          if (Yii::$app->request->isPost) {
              $model->upload = UploadedFile::getInstance($model, 'upload');
              if ($rs = $model->upload()) {
                  // 文件上传成功
                  return json_encode($rs,JSON_UNESCAPED_UNICODE);
              }
          }*/
    }

    public function actionSkus()
    {
        Yii::$app->response->format = 'json';
        if (Yii::$app->request->isPost) {
            $search = Yii::$app->request->post();
            $where = [];
            foreach ($search as $k => $v) {
                if ($search[$k]) {

                    $where[] = $k . ' like "%' . $v . '%"';
                }
            }
            if ($where) {
                $where = implode(' and ', $where);
            }
            //return $where;
        }
        $url= parse_url(Yii::$app->request->url, PHP_URL_QUERY);
        if(strpos($url,'curpage=')){
            $curPage = explode('=', explode('&', $url)[1])[1];
        }
        $pageSize = 80;
        @$curPage = $curPage ? $curPage : 1;
        @$offset = $pageSize * ($curPage - 1);
        if (@$where) {
            $count = Yii::$app->db->createCommand('SELECT * FROM item_sku where  ' . $where)->queryAll();
            $count = count($count);
            $rs = Yii::$app->db->createCommand('SELECT * FROM item_sku where  ' . $where . 'limit ' . $offset . ', ' . $pageSize)->queryAll();

        } else {

            $rs = Yii::$app->db->createCommand('SELECT * FROM item_sku  limit ' . $offset . ', ' . $pageSize)->queryAll();
            $count = Yii::$app->db->createCommand('SELECT * FROM item_sku ')->queryAll();
            $count = count($count);
        }

        $totalPage = ceil($count / $pageSize);
        // if(@$search){
        return ['rs' => $rs, 'totalPage' => $totalPage, 'pageSize' => $pageSize, 'search' => @$search,'currpage'=>$curPage];
        // }else{
        //  return ['rs'=>$rs,'totalPage'=>$totalPage,'pageSize'=>1];
        // }

    }

    public function actionAdd()
    {

        Yii::$app->response->format = 'json';
        // return "aaa";
        if (Yii::$app->request->isPost) {

            $rs = Yii::$app->request->post();
            //return $rs;
            $itemData = Yii::$app->db->createCommand('SELECT * FROM item where barcode="' . $rs['barcode'] . '"')->queryOne();

            //return "aaa";
            //存在只在sku表插入数据，否则两个表都要插入
            $db = Yii::$app->db;
            $transaction = $db->beginTransaction();
            try {
                if ($itemData) {
                } else {
                    $pic = array_column($rs['pics'], 'url');
                    $pics = rtrim(implode('|', $pic), '|');
                    $itemMode = new Item();
                    $itemMode->title = $rs['title'];
                    $itemMode->barcode = $rs['barcode'];
                    $itemMode->cat_id = 1;
                    $itemMode->brand_id = 1;
                    $itemMode->pic = $pic[0];
                    $itemMode->pics = $pics;
                    $itemMode->unit = $rs['unit'];
                    $itemMode->description = $rs['title'];
                    $itemMode->created_at = time();
                    $itemMode->updated_at = time();
                    if (!$itemMode->save(false)) {
                        new \Exception("插入item表失败!");
                    }
                    $bn = 'aaa';
                    $skuData = [
                        'title' => $rs['title'],
                        'item_id' => $itemMode->attributes['id'],
                        'bn' => $bn,
                        'barcode' => $rs['barcode'],
                        'packing_qty' => $rs['sku_packing_qty'],
                        'packing_unit' => $rs['sku_packing_unity'],
                        'is_whole' => $rs['is_whole'] == '是' ? 0 : 1,
                        'MOQ' => $rs['sku_moq'],
                        'price' => $rs['price'],
                        'supplier_id' => 1,
                        'detail' => $rs['detail'],
                        'pic' => $pic[0],
                        'pics' => $pics,
                    ];
                    // return $skuData;
                    $db->createCommand()->insert('item_sku', $skuData)->execute();
                }
                $transaction->commit();
                return ['rs' => "true"];
            } catch (\Exception $e) {
                $transaction->rollBack();
                return ['rs' => "false", 'msg' => $e->getMessage()];
            }

        }

    }


    public function actionEdit()
    {
        Yii::$app->response->format = 'json';
        $id=Yii::$app->request->post('id');
        //return $id;
        $rs= Yii::$app->db->createCommand('SELECT * FROM item_sku where id="' . $id . '"')->queryOne();
        $rs['is_whole']=!$rs['is_whole']?"是":"否";
        $rs['moq'] = $rs['MOQ'];
        $rs['pics']=explode('|',$rs['pics']);
        foreach ($rs['pics'] as $k=>$v){
            $rs['pics'][]=[
                'name'=>$v,
                'url'=>$v,
                'status'=>'finished'
            ];
          unset($rs['pics'][$k]);
        }
        return $rs;

    }

    public function actionEditsave(){
        Yii::$app->response->format = 'json';
        $model = new Sku();
        $post=Yii::$app->request->post();
        return $post;
      //  return $model->load(Yii::$app->request->post());
    }
}