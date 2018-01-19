<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/15 0015
 * Time: 下午 5:34
 */

namespace app\controllers;
use Yii;
use yii\web\Controller;
class LoginController extends Controller
{
    public function actionT()
    {
        echo Yii::$app->params['uploadImg'];
       $rs =  Yii::$app->db->createCommand('SELECT * FROM category')
            ->queryAll();
       echo '<pre>';
       print_r($rs);
    }

    public function actionLogin()
    {


        return json_encode(['rs' => true], JSON_UNESCAPED_UNICODE);
    }

    public function actionUp()
    {
        $this->enableCsrfValidation = false;
        return 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=444336547,2488503555&fm=15&gp=0.jpg';
        return json_encode(['url' => 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=444336547,2488503555&fm=15&gp=0.jpg','status'=>'finished','percentage'=>100], JSON_UNESCAPED_UNICODE);
         $rs = Yii::$app->request->post();
       //  return json_encode($_FILES, JSON_UNESCAPED_UNICODE);
        return json_encode('ssssssss',JSON_UNESCAPED_UNICODE);
    }

    public function actionEdit(){
        header("Access-Control-Allow-Origin:*");
        header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With');
        header("Access-Control-Allow-Methods:*");
        return json_encode(['rs' => true], JSON_UNESCAPED_UNICODE);
    }
}