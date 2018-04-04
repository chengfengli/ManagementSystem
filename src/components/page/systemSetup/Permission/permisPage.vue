<template>
  <article class="tourist">
    <section class="tourist-tip">注：当用户以游客身份进入此事件， 且事件在勾选的状态下，允许进行的操作</section>
    <section class="tourist-table">
    <div class="tourist-title">
      <div v-for="title in tabTitle">{{ title }}</div>
    </div>
    <div class="tourist-checkbox">
      <aside class="action">
        <div v-for="item in tableData.rows">
          {{ item.PERMISSIONNAME }}
        </div>
      </aside>
      <aside class="chechBox" >
        <div class="select-ck" v-for="ck in tableData.rows">
          <div class="ck-btn">
            <el-checkbox v-model="ck.ABANDON" :label="ABANDON" @change="monitoRadio(ck.ABANDON, ABANDON,ck.PERMISSIONID)" ></el-checkbox>
          </div>
          <div class="ck-btn" >
            <el-checkbox v-model="ck.REJECTFILL" :label="REJECTFILL" @change="monitoRadio(ck.REJECTFILL, REJECTFILL,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div class="ck-btn" >
            <el-checkbox v-model="ck.WAITDEAL" :label="WAITDEAL" @change="monitoRadio(ck.WAITDEAL, WAITDEAL,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div class="ck-btn" >
            <el-checkbox v-model="ck.REJECTDEAL" :label="REJECTDEAL" @change="monitoRadio(ck.REJECTDEAL, REJECTDEAL,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div class="ck-btn" >
            <el-checkbox v-model="ck.WAITCLOSE" :label="WAITCLOSE" @change="monitoRadio(ck.WAITCLOSE, WAITCLOSE,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div class="ck-btn" >
            <el-checkbox v-model="ck.CLOSED" :label="CLOSED" @change="monitoRadio(ck.CLOSED, CLOSED,ck.PERMISSIONID)"></el-checkbox>
          </div>
        </div>
      </aside>
    </div>
    <div class="not-data" v-show="tableData.rows.length == 0">暂无数据</div>
  </section>
  </article>
</template>

<script>
  export default {
    name: "tourist",
    data() {
      return {
        ABANDON: "ABANDON",
        REJECTFILL: "REJECTFILL",
        WAITDEAL: "WAITDEAL",
        REJECTDEAL: "REJECTDEAL",
        WAITCLOSE: "WAITCLOSE",
        CLOSED: "CLOSED",
        tabTitle: ['功能', '废弃', '驳回填报', '等待处理', '驳回处理', '等待结案', '已结案'],
        tableData: []
      }
    },
    props: ["menuData"],
    mounted: function(){
      this.tableData = this.menuData;
      console.log(this.tableData.rows.length)
    },
    methods: {
      monitoRadio: function (ck,name, id) {
        console.log(ck + "-"+  name);
        if(ck == true){
          ck = 1;
        }else {ck = 0;}
        var data = {
          permissionid: id,
          ABANDON: null,
          REJECTFILL: null,
          WAITDEAL: null,
          REJECTDEAL: null,
          WAITCLOSE: null,
          CLOSED: null,
        }
        if(name == this.ABANDON){
          data.ABANDON = ck;
        }
        if(name == this.REJECTFILL){
          data.REJECTFILL = ck;
        }
        if(name == this.WAITDEAL){
          data.WAITDEAL = ck;
        }
        if(name == this.REJECTDEAL){
          data.REJECTDEAL = ck;
        }
        if(name == this.WAITCLOSE){
          data.WAITCLOSE = ck;
        }
        if(name == this.CLOSED){
          data.CLOSED = ck;
        }
        console.log(data)
        this.$http.post('permission/update/' + data.permissionid, data).then(res => {
          if (res.code == 10000) {
            this.$emit("refreshPermis");
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
    },
  }
</script>

<style>
  .tourist {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  .tourist .tourist-tip {
    padding: 13px 20px;
    box-sizing: border-box;
  }
  .tourist .tourist-title, .tourist .tourist-checkbox {
    display: flex;
    text-align: center;
  }
  .tourist .tourist-checkbox .action{flex: 1;}
  .tourist .tourist-checkbox .chechBox{flex: 6;}
  .tourist .tourist-checkbox .chechBox .select-ck{
    display: flex;
  }

  .tourist .tourist-title div{
    flex: 1;
    padding: 13px 0;
    border: 1px solid #EBEEF5;
  }
  .tourist .tourist-checkbox .action div{
    flex: 1;
    height: 43px;
    line-height: 43px;
    border: 1px solid #EBEEF5;
  }
  .select-ck div{
    flex: 1;
    height: 43px;
    border: 1px solid #EBEEF5;
    line-height: 43px;
  }
  .chechBox .el-checkbox__label{display: none;}
  .tourist .not-data{
    padding: 50px 0;
    text-align: center;
    font-size: 15px;
  }
</style>
