<template>
  <div class="form log">
    <!-- first-menu -->
    <div class="first-menu">
      <h3>MENU</h3>
    </div>
    <!-- header -->
    <div class="header">
      <h3>HEADER</h3>
    </div>
    <!-- main-->
    <div class="main">
      <!-- operating -->
      <div class="operating">
        <el-button type="primary" plain @click="showData">保存</el-button>
      </div>
      <!-- log-template-->
      <div class="log-template">
        <!-- left -->
        <div class="left">
          <div class="box">
            <draggable :list="formList" :options="draggedOptions" :clone="cloneData">
              <transition-group>
                <log-template
                  v-for="formItem in formList"
                  :key="formItem.title"
                  :title="formItem.title"
                  :is-select="formItem.isSelect"
                  :is-text="formItem.isText"
                ></log-template>
              </transition-group>
            </draggable>
          </div>
        </div>
        <!-- middle -->
        <div class="middle">
          <div class="box">
            <draggable :list="cloneList" :options="droppedOptions" class="clone">
              <transition-group tag="div" class="clone">
                <clone-template
                  v-for="cloneItem in cloneList"
                  :key="cloneItem.numbering"
                  :title="cloneItem.title"
                  :is-select="cloneItem.isSelect"
                  :is-text="cloneItem.isText"
                  :numbering="cloneItem.numbering"
                  :placeholder="cloneItem.placeholder || ''"
                  @handleCode="getCode"
                ></clone-template>
              </transition-group>
            </draggable>
          </div>
        </div>
        <!-- right -->
        <div class="right">
          <div class="box">
            <el-form :model="configuration" ref="configuration">
              <el-form-item  v-if="configuration.title!==undefined">
                <el-input placeholder="标签名称" v-model="configuration.title"></el-input>
              </el-form-item>
              <el-form-item  v-if="configuration.placeholder!==undefined">
                <el-input placeholder="提示语" v-model="configuration.placeholder"></el-input>
              </el-form-item>
              <el-form-item v-if="configuration.values!==undefined">
                <template v-for="(item, index) in configuration.values">
                  <el-input :key="index" :placeholder="item.label" v-model="item.value" style="margin-bottom: 5px;">
                    <i slot="suffix" class="el-input__icon el-icon-circle-close-outline" @click="removeOptions(item)"></i>
                  </el-input>
                </template>
                <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="addOptions"></el-button>
              </el-form-item>
              <el-form-item v-if="configuration.format!==undefined">
                <el-select placeholder="选择时间格式" v-model="configuration.format">
                  <el-option v-for="(item, index) in formatList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  v-if="configuration.required!==undefined">
                <el-checkbox v-model="configuration.required">是否必填</el-checkbox>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {logTemplate, cloneTemplate} from "./control/render";
  import draggable from 'vuedraggable';
  import { form_list } from "./control/configuration";

  export default {
    name: "Form"
    , components: {
      logTemplate
      , cloneTemplate
      , draggable
    }
    , data() {
      return {
        formList: form_list
        , cloneList: []
        , configuration: {}
        , draggedOptions: {
          group: {
            name: 'shared'
            , pull: 'clone'
            , revertClone: false
          }
          , sort: false
          // , animation: 300
          , ghostClass: 'ghost'
          // , scroll: true
        }
        , droppedOptions: {
          group: {
            put: ['shared']
          }
          , animation: 300
          , ghostClass: 'ghost'
          , scroll: true
        }
        , futureIndex: ''
        , formatList: [
          { label: 'yyyy-MM-dd hh:mm:ss', value: 'yyyy-MM-dd hh:mm:ss' }
          , { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd' }
          , { label: 'yyyy 年 MM 月 dd 日', value: '年-月-日'}
        ]
      }
    }
    , methods: {
      // 随机数
      getRandom(num) {
        var n = 1;
        for (var i = 0; i < num; i++) {
          n *= 10;
        }
        return Math.round(Math.random() * n);
      }
      // 深度克隆 脱离原数据
      , cloneData(val) {
        return Object.assign({}, val, {numbering: this.getRandom(10)});
      }
      // $emit 获取点击对象numbering  子组件向父组件通信
      , getCode(val) {
        this.cloneList.forEach(item => item.numbering === val ? this.configuration=item : '');
      }
      // 添加选项
      , addOptions(){
        if(this.configuration.values===undefined) return false;
        this.configuration.values.push({
          label: '选项-'+ (this.configuration.values.length+1)
          , value: ''
        });
      }
      // 移除选项
      , removeOptions(item){
        if(this.configuration.values===undefined) return false;
        let index = this.configuration.values.indexOf(item);
        if(index!==-1) this.configuration.values.splice(index, 1);
      }
      // 发送数据
      , showData(){
        console.log(JSON.parse(JSON.stringify(this.cloneList)));
      }
    }
  }
</script>

<style scoped>
  .form {
    color: #333333;
  }

  .first-menu{
    position: fixed;
    bottom: 0;
    text-align: center;
  }

  .first-menu {
    left: 0;
    top: 0;
    width: 80px;
    background: #4A90E2;
    color: #ffffff;
    padding: 100px 0 0;
  }


  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 80px;
    height: 60px;
    background: #FAFAFA;
    border: 1px solid #E0E0E0;
    z-index: 11;
    line-height: 60px;
    text-indent: 45px;
  }

  .main {
    position: absolute;
    top: 60px;
    left: 80px;
    background: #F3F3F3;
    bottom: 0;
    right: 0;
    z-index: 10;
  }

  .operating {
    background: #F0F0F0;
    height: 60px;
    line-height: 60px;
    text-indent: 20px;
    margin: 8px 12px 20px;
  }

  .operating .el-button {
    width: 95px;
  }

  .log-template {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
  }

  .left, .middle, .right {
    background: #FAFAFA;
    width: 30%;
    margin-bottom: 70px;
    position: relative;
    overflow: hidden;
  }

  .box {
    overflow-y: scroll;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -17px;
    left: 0;
  }

  .control-item {
    height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border: 1px solid #DFE0E2;
    line-height: 40px;
    width: 90%;
    margin-left: 2.5%;
    margin-top: 10px;
    border-radius: 4px;
  }

  .control-item:last-child {
    margin-bottom: 0;
  }

  .text {
    height: 85px;
  }

  .left .control-item:not(:last-child) {
    margin-bottom: 20px;
  }

  .control-item [class*=" el-icon-"] {
    line-height: 40px;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .clone {
    height: 100%;
  }

  .middle .control-item:hover {
    cursor: pointer;
  }

  .el-form-item {
    margin-bottom: 15px;
    width: 95.5%;
  }
  .el-select {
    width: 100%;
  }
  .el-form {
    padding: 3% 2% 0;
  }
  .el-form .el-button {
    width: 100%;
    padding: 9px 20px;
  }
</style>
