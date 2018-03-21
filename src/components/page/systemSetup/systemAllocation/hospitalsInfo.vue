<template>
    <div class="hospitalsInfo">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="医院名称" class="b-m10">
              <el-input size="mini" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="床位数量" class="b-m10">
            <el-input size="mini" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="医院地址" class="b-m10">
            <el-input size="mini" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="邮编" class="b-m10">
            <el-input size="mini" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" class="b-m10" style="margin-bottom: 13px;">
            <el-input size="mini" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="医院等级" size="mini">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院属性" size="mini">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院功能"  size="mini">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院性质" size="mini">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <!--<el-form-item style="text-align: center;margin-top: 50px;">-->
             <!--<el-button type="primary" @click="onSubmit" style="margin-right: 25px;">重置</el-button>-->
             <!--<el-button type="info" style="margin-left: 25px;">取消</el-button>-->
           <!--</el-form-item>-->

          <article class="action-btn">
            <section style="background: #e6a23c;border: 1px solid #e6a23c;">重置</section>
            <section style="background: #909399;border: 1px solid #909399;">取消</section>
          </article>
        </el-form>

    </div>
</template>

<script>
export default {
  name: "hospitalsInfo",
  data(){
      return {
          form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
          },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
  },
  methods: {
    onSubmit: function () {

    }
  },
}
</script>

<style >
    .hospitalsInfo{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 70%;
      min-width: 50%;
    }
    .hospitalsInfo .el-select{width: 100%;}
    .hospitalsInfo .el-button{padding: 12px 60px;}
    .hospitalsInfo .action-btn{
      display: flex;
      max-width: 400px;
      margin: auto;
      padding-top: 50px;
    }
    .hospitalsInfo .b-m10{margin-bottom: 6px;}
    .hospitalsInfo .action-btn section{
      flex:1;
      padding: 10px 40px;
      box-sizing: border-box;
      text-align: center;
      max-width: 150px;
      margin: auto;
      border-radius: 5px;
      color: white;
    }
    .hospitalsInfo .action-btn section:hover{opacity: 0.8;cursor: pointer;}
</style>
