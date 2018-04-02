<template>
  <div class="hospitalsInfo">
    <el-form label-width="80px">
      <el-form-item label="医院名称" class="b-m10">
        <el-input size="mini" v-model="hospitalInfo.hospitalname"></el-input>
      </el-form-item>
      <el-form-item label="床位数量" class="b-m10">
        <el-input type="number" size="mini" v-model="hospitalInfo.bedsnum"></el-input>
      </el-form-item>
      <el-form-item label="医院地址" class="b-m10">
        <el-input size="mini" v-model="hospitalInfo.hospitaladdress"></el-input>
      </el-form-item>
      <el-form-item label="邮编" class="b-m10">
        <el-input size="mini" v-model="hospitalInfo.zipcode"></el-input>
      </el-form-item>
      <el-form-item type="number" label="电话" class="b-m10" style="margin-bottom: 13px;">
        <el-input size="mini" v-model="hospitalInfo.contactphone"></el-input>
      </el-form-item>
      <el-form-item label="医院等级" size="mini">
        <el-select v-model="hospitalSelect.levelValue" placeholder="请选择">
          <el-option
            v-for="Level in hospitalLevel"
            :key="Level.VALUE"
            :label="Level.DISPLAY"
            :value="Level.VALUE">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院属性" size="mini">
        <el-select v-model="hospitalSelect.attrValue" placeholder="请选择">
          <el-option
            v-for="Attr in hospitalAttr"
            :key="Attr.VALUE"
            :label="Attr.DISPLAY"
            :value="Attr.VALUE">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院功能" size="mini">
        <el-select v-model="hospitalSelect.availValue" placeholder="请选择">
          <el-option
            v-for="Avail in hospitalAvail"
            :key="Avail.VALUE"
            :label="Avail.DISPLAY"
            :value="Avail.VALUE">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院性质" size="mini">
        <el-select v-model="hospitalSelect.atureValue" placeholder="请选择">
          <el-option
            v-for="ature in hospitalNature"
            :key="ature.VALUE"
            :label="ature.DISPLAY"
            :value="ature.VALUE">
          </el-option>
        </el-select>
      </el-form-item>
      <article class="action-btn">
        <section @click="resetSubmit" style="background: #e6a23c;border: 1px solid #e6a23c;">提交</section>
      </article>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "hospitalsInfo",
    data() {
      return {
        hospitalInfo: {
          hospitalname: "",
          bedsnum: null,
          hospitaladdress: "",
          zipcode:null,
          contactphone: null,
        },
        hospitalSelect: {
         levelValue: null,
         attrValue: null,
         availValue: null,
         atureValue: null,
       },
        hospitalLevel: [],
        hospitalAttr: [],
        hospitalAvail: [],
        hospitalNature: [],
      }
    },
    mounted() {
      this.initData();
      this.selectInitData();
    },
    methods: {
      initData: function () {
        this.$http.post('/cfg/hospital').then(res => {
          if (res.code == 10000) {
            console.log(res.data);
            if (res && res != undefined && res != null) {
              this.hospitalInfo.hospitalname = res.data.hospitalname;
              this.hospitalInfo.bedsnum = res.data.bedsnum;
              this.hospitalInfo.hospitaladdress = res.data.hospitaladdress;
              this.hospitalInfo.zipcode = res.data.zipcode;
              this.hospitalInfo.contactphone = res.data.contactphone;
              if (res.data.level != "" && res.data.level != null) {
                this.hospitalSelect.levelValue = parseInt(res.data.level);
              }
              if (res.data.attr != "" && res.data.attr != null) {
                this.hospitalSelect.attrValue = parseInt(res.data.attr);
              }
              if (res.data.avail != "" && res.data.avail != null) {
                this.hospitalSelect.availValue = parseInt(res.data.avail);
              }
              if (res.data.nature != "" && res.data.nature != null) {
                this.hospitalSelect.atureValue = parseInt(res.data.nature);
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      selectInitData: function () {
        //医院等级
        this.$http.post('/dic/getDicByKey/hospitallevel').then(res => {
          if (res.code == 10000) {
            this.hospitalLevel = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //医院属性
        this.$http.post('/dic/getDicByKey/hospitalattr').then(res => {
          if (res.code == 10000) {
            this.hospitalAttr = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //医院功能
        this.$http.post('/dic/getDicByKey/hospitalavail').then(res => {
          if (res.code == 10000) {
            this.hospitalAvail = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //医院性质
        this.$http.post('/dic/getDicByKey/hospitalnature').then(res => {
          if (res.code == 10000) {
            this.hospitalNature = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      resetSubmit: function () {
        var resetData = {
            hospitalname: this.hospitalInfo.hospitalname,
            bedsnum: this.hospitalInfo.bedsnum,
            hospitaladdress: this.hospitalInfo.hospitaladdress,
            zipcode: this.hospitalInfo.zipcode,
            contactphone: this.hospitalInfo.contactphone,
            level: this.hospitalSelect.levelValue,
            attr: this.hospitalSelect.attrValue,
            avail: this.hospitalSelect.availValue,
            nature: this.hospitalSelect.atureValue,
          }
        if(!resetData.hospitalname || resetData.hospitalname == "") return this.$message.error("医院名称不能为空！");
        if(!resetData.bedsnum || resetData.bedsnum == null) return this.$message.error("床位数量不能为空！");
        if(!resetData.hospitaladdress || resetData.hospitaladdress == "") return this.$message.error("医院地址不能为空！");
        if(!resetData.zipcode || resetData.zipcode == "") return this.$message.error("邮编不能为空！");
        if(!resetData.contactphone || resetData.contactphone == "") return this.$message.error("电话不能为空！");
        this.$http.post('/cfg/updateHospital', resetData).then(res => {
          if (res.code == 10000) {
            this.$message.success("提交成功！");
            this.initData();
            this.selectInitData();
          }else {
            this.$message.error("操作失败！");
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      }
    },
  }
</script>

<style>
  .hospitalsInfo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 70%;
    min-width: 50%;
  }
  .hospitalsInfo .el-select {
    width: 100%;
  }
  .hospitalsInfo .el-button {
    padding: 12px 60px;
  }
  .hospitalsInfo .action-btn {
    display: flex;
    max-width: 400px;
    text-align: left;
    padding-top: 50px;
  }
  .hospitalsInfo .b-m10 {
    margin-bottom: 6px;
  }
  .hospitalsInfo .action-btn section {
    flex: 1;
    padding: 10px 40px;
    box-sizing: border-box;
    text-align: center;
    max-width: 150px;
    border-radius: 5px;
    color: white;
  }
  .hospitalsInfo .action-btn section:hover {
    opacity: 0.8;
    cursor: pointer;
  }
</style>
