<template>
  <article id="tourist">
    <section class="tourist-tip">注：当用户以 <span style="color: red;">{{ noticeTitle }}</span> 身份进入此事件， 且事件在勾选的状态下，允许进行的操作</section>
    <section class="tourist-table">
    <div class="touristTitle">
      <div v-for="title in tabTitle">{{ title }}</div>
    </div>
    <div class="touristCheckbox">
      <aside class="action">
        <div v-for="item in tableData.rows">
          {{ item.PERMISSIONNAME }}
        </div>
      </aside>
      <aside class="chechBox" >
        <div class="select-ck" v-for="ck in tableData.rows">
          <div>
            <el-checkbox class="ck-btn" v-model="ck.ABANDON" :label="ABANDON" @change="monitoRadio(ck.ABANDON, ABANDON,ck.PERMISSIONID)" ></el-checkbox>
          </div>
          <div >
            <el-checkbox class="ck-btn"  v-model="ck.REJECTFILL" :label="REJECTFILL" @change="monitoRadio(ck.REJECTFILL, REJECTFILL,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div>
            <el-checkbox class="ck-btn" v-model="ck.WAITDEAL" :label="WAITDEAL" @change="monitoRadio(ck.WAITDEAL, WAITDEAL,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div>
            <el-checkbox class="ck-btn" v-model="ck.REJECTDEAL" :label="REJECTDEAL" @change="monitoRadio(ck.REJECTDEAL, REJECTDEAL,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div>
            <el-checkbox class="ck-btn" v-model="ck.WAITCLOSE" :label="WAITCLOSE" @change="monitoRadio(ck.WAITCLOSE, WAITCLOSE,ck.PERMISSIONID)"></el-checkbox>
          </div>
          <div>
            <el-checkbox class="ck-btn" v-model="ck.CLOSED" :label="CLOSED" @change="monitoRadio(ck.CLOSED, CLOSED,ck.PERMISSIONID)"></el-checkbox>
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
    props: ["menuData", "noticeTitle"],
    mounted: function(){
      this.tableData = this.menuData;
    },
    methods: {
      monitoRadio: function (ck,name, id) {
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
        this.$http.post('permission/update/' + data.permissionid, data).then(res => {
          if (res.code == 10000) {
            this.$emit("refreshPermis");
         /*   this.$message({
              type: 'success',
              message: '修改成功!'
            });*/
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
  #tourist {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  #tourist .tourist-tip {
    padding: 13px 20px;
    box-sizing: border-box;
  }
  #tourist .touristTitle, #tourist .touristCheckbox {
    display: flex;
    text-align: center;
  }
  #tourist .touristCheckbox .action{flex: 1;}
  #tourist .touristCheckbox .chechBox{flex: 6;}
  #tourist .touristCheckbox .chechBox .select-ck{
    display: flex;
  }

  #tourist .touristTitle div{
    flex: 1;
    height: 43px!important;
    line-height: 43px!important;
    border: 1px solid #EBEEF5;
  }
  #tourist .touristCheckbox .action div{
    flex: 1;
    height: 43px!important;
    line-height: 43px!important;
    border: 1px solid #EBEEF5;
  }
  .select-ck div{
    flex: 1;
    height: 43px!important;
    line-height: 43px!important;
    border: 1px solid #EBEEF5;
  }
  .select-ck div .ck-btn{padding:0!important;}
  .chechBox .el-checkbox__label{display: none;}
  #tourist .not-data{
    padding: 50px 0;
    text-align: center;
    font-size: 15px;
  }
</style>
