<template>
  <div class="eventProcessing">
    <eventHeader></eventHeader>
    <div class="current">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <header class="eventProcessing-search">
      <article class="select-search">
        <section class="flex1">
          <label>事件状态</label>
          <el-select v-model="eventSearch.QSTATUS" placeholder="请选择" size="mini"style="width: 120px;">
            <el-option
              v-for="item in eventStatusData"
              :key="item.VALUE"
              :label="item.DISPLAY"
              :value="item.VALUE">
            </el-option>
          </el-select>
        </section>
        <section class="flex1">
          <label>事件类型</label>
          <el-select v-model="eventSearch.QTYPE" placeholder="请选择" size="mini"style="width: 130px;">
            <el-option
              v-for="item in eventTypeData"
              :key="item.EVENTTYPEID"
              :label="item.TYPENAME"
              :value="item.EVENTTYPEID">
            </el-option>
          </el-select>
        </section>
        <section class="flex1" style="max-width: 165px">
          <label>事件等级</label>
          <el-select v-model="eventSearch.QLEVEL" placeholder="请选择" size="mini"style="width: 100px;">
            <el-option
              v-for="item in eventLevelData"
              :key="item.VALUE"
              :label="item.DISPLAY"
              :value="item.VALUE">
            </el-option>
          </el-select>
        </section>
        <section class="flex1" style="max-width: 165px">
          <label>事件标识</label>
          <el-select v-model="eventSearch.QFLAG" placeholder="请选择" size="mini"style="width: 100px;">
            <el-option
              v-for="item in eventIdentificationData"
              :key="item.VALUE"
              :label="item.DISPLAY"
              :value="item.VALUE">
            </el-option>
          </el-select>
        </section>
        <section class="flex3">
          <label>上报日期（起止）</label>
          <div style="display: inline-block;padding: 0" >
            <el-date-picker
              format="yyyy-MM-dd"
              style="width: 120px;"
              :clearable="false"
              size="mini"
              v-model="eventSearch.QSDATE"
              type="date"
              @change="stimeChange"
              placeholder="开始时间">
            </el-date-picker>
          </div>--
          <div style="display: inline-block;" >
            <el-date-picker
              format="yyyy-MM-dd"
              style="width: 120px"
              size="mini"
              :clearable="false"
              v-model="eventSearch.QEDATE"
              type="date"
              @change="etimeChange"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </section>
        <section class="flex1" style="max-width: 165px">
          <label>标题/序号</label>
          <el-input v-model="eventSearch.QTITLE" placeholder="请输入内容" size="mini" style="max-width: 90px"></el-input>
        </section>
        <section  style="max-width: 50px">
          <el-button style="padding: 3px 10px" type="danger" size="small" @click="eventQuery">查询</el-button>
        </section>
      </article>
      <article class="fast-search" >
        <div style="flex: 6;display: flex;text-align: center;">
         <!-- <section>
            <el-button type="danger"size="mini">删除</el-button>
          </section>
          <section>
            <el-button type="danger"size="mini">导出</el-button>
          </section>-->
          <section>快速筛选</section>
          <section @click="allEventSearch" style="cursor: pointer;">全部事件</section>
          <section @click="holdSearch" style="cursor: pointer;">暂存事件</section>
          <section @click="scrapSearch" style="cursor: pointer;">废弃事件</section>
          <section @click="closureSearch" style="cursor: pointer;">结案事件</section>
        </div>
        <div style="flex: 4"></div>
      </article>
    </header>
    <main class="table-data">
      <el-table @row-dblclick="skipDetails" :data="initTableData.TABLEDATA.rows" style="width: 100%; text-align: center;" :stripe="true"><!--item.DISPLAY--><!--v-for="item in initHeaderData"-->
        <el-table-column  :prop="item.KEY" :label="item.DISPLAY" width="auto" v-for="item in initTableData.HEADER"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <!--<el-button type="text" size="small">编辑</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer style="padding: 5px 0;margin-bottom: 30px">
      <div class="block">
        <el-pagination
          @size-change="changePageSize"
          @current-change="currentPage"
          :current-page="initTableData.TABLEDATA.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="initTableData.TABLEDATA.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="initTableData.TABLEDATA.totalSize">
        </el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  import eventHeader from  '../../common/Header.vue';
  export default {
    name: "eventProcessing",
    components: {
      eventHeader
    },
    data(){
      return{
        pageTitle: "事件处理",
        initHeaderData: [],
        initTableData: {
          HEADER: [
            {
              DISPLAY: "",
              KEY: "",
            }
          ],
          TABLEDATA: {
            hasNext: false,
            page: 1,
            pageSize: 10,
            rows: [],
          }
        },
        eventSearch: {
          entrance: "",
          QSTATUS: null,
          QTYPE: null,
          QLEVEL: null,
          QFLAG: null,
          QSDATE: null,
          QEDATE: null,
          QTITLE: "",
          page: 1,
          pageSize: 10,
        },
        eventStatusData: [],
        eventTypeData: [],
        eventLevelData: [],
        eventIdentificationData: [],
        input: "",
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      }
    },
    mounted: function() {
      if(this.$route.query.txt == "我的事件"){
        this.eventSearch.entrance = "myEvent";
        this.pageTitle = "我的事件"
      }
      if(this.$route.query.txt == "事件处理"){
        this.eventSearch.entrance = "eventDeal";
        this.pageTitle = "事件处理"
      }
      if(this.$route.query.txt == "事件管理"){
        this.eventSearch.entrance = "eventManage";
        this.pageTitle = "事件管理"
      }
      this.getEventQuery();
      //this.initTableHeaderData();
      this.initTableContentData();
    },
    methods: {
      skipDetails: function (row) {
        if(row.STATUS == "暂存"){
          this.$router.push({
            path: "/eventFill",
            query: {
              id: row.ID,
              eventDeal: "entrance"
            }
          })
          console.log("事件填报！")
        }else {
          this.$router.push({
            path: "/eventList",
            query: {eventID: row.ID}
          })
        }
      },
      handleClick: function (data) {
        let id = {
          eventid: data.ID
        }
        if(data.CANDEL == true){
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('event/del/' + data.ID, id).then(res => {
              if (res.code == 10000) {
                this.initTableContentData();
              } else {
                this.$message.error(res.msg);
              }
            }).catch(function (error) {//加上catch
              console.log(error);
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {

          });
        }else {
          this.$message({
            type: 'error',
            message: '不能删除!'
          });
        }

      },
      //结案事件
      closureSearch: function(){
        this.eventSearch.QSTATUS = 7;
        this.initTableContentData();
      },
      //废弃事件
      scrapSearch: function(){
        this.eventSearch.QSTATUS = 2;
        this.initTableContentData();
      },
      //暂存事件
      holdSearch: function(){
        this.eventSearch.QSTATUS = 1;
        this.initTableContentData();
      },
      //全部事
      allEventSearch: function(){
        this.eventSearch.QSTATUS = null;
        this.eventSearch.QTYPE = null,
        this.eventSearch.QLEVEL = null;
        this.eventSearch.QFLAG = null;
        this.eventSearch.QSDATE = null;
        this.eventSearch.QEDATE = null;
        this.eventSearch.QTITLE = "";
        this.initTableContentData();
      },
      stimeChange: function(val){
        var d = new Date(val);
        this.eventSearch.QSDATE = d.getFullYear() + '-' + (d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1) + '-' + (d.getDate() < 10 ? '0' + d.getDate(): d.getDate());
      },
      etimeChange: function(val){
        var d = new Date(val);
        this.eventSearch.QEDATE = d.getFullYear() + '-' + (d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1) + '-' + (d.getDate() < 10 ? '0' + d.getDate(): d.getDate());
      },
      initTableHeaderData: function() {

      },
      //初始化表数据
      initTableContentData: function () {
        let data = {
          entrance: this.eventSearch.entrance,
          QSTATUS: this.eventSearch.QSTATUS,
          QTYPE: this.eventSearch.QTYPE,
          QLEVEL: this.eventSearch.QLEVEL,
          QFLAG: this.eventSearch.QFLAG,
          QSDATE: this.eventSearch.QSDATE,
          QEDATE: this.eventSearch.QEDATE,
          QTITLE: this.eventSearch.QTITLE,
          page: this.eventSearch.page,
          pageSize: this.eventSearch.pageSize,
        }
        this.$http.post('/event/list/' + data.entrance, data).then(res => {
          if (res.code == 10000) {
            this.initTableData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //查询
      eventQuery: function () {
        this.initTableContentData();
      },
      //请求所有初始查询条件
      getEventQuery: function() {
        this.$http.post('/dic/getDicByKey/eventstatus').then(res => {
          if (res.code == 10000) {
            this.eventStatusData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });

        this.$http.post('event/rootType').then(res => {
          if (res.code == 10000) {
            this.eventTypeData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });

        this.$http.post('/dic/getDicByKey/eventlevel').then(res => {
          if (res.code == 10000) {
            this.eventLevelData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });

        this.$http.post('/dic/getDicByKey/eventflag').then(res => {
          if (res.code == 10000) {
            this.eventIdentificationData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      currentPage: function (currentPage) {    //页码数量
        this.initTableData.TABLEDATA.page = currentPage;
      },
      changePageSize: function (pageSize) {   //每页数量
        this.initTableData.TABLEDATA.pageSize = pageSize;
      },
    },
  }
</script>

<style>
  .eventProcessing{
    width: 100%;
    min-width: 1300px;
    height: 100%;
    overflow: auto;
  }
  .eventProcessing .select-search{
    padding: 10px 0 10px 0;
    display: flex;
    border-bottom: 1px solid #8F949A;
  }
  .eventProcessing .select-search .flex1{
    flex: 1;
    text-align: center;
    max-width: 185px;
  }
  .eventProcessing .select-search .flex3{
    flex: 2;
    text-align: center;
    max-width: 385px;
  }
  .eventProcessing .select-search .el-input--mini .el-input__icon{line-height: 0;}
  .eventProcessing .select-search .el-button--small{padding: 9px 30px; vertical-align: middle;}
  .eventProcessing .fast-search{
    display: flex;
    border-bottom: 1px solid #8F949A;
    padding: 13px 20px;
    box-sizing: border-box;
    width: 700px;
    cursor: pointer;
  }
  .eventProcessing .table-data{margin-bottom: 30px}
  .eventProcessing .fast-search section{flex: 1;}
  .fast-search .el-button--mini{padding: 5px 30px;}
  .eventProcessing .table-th{
    border-bottom: 1px solid #8F949A;
    padding: 5px 0;
    text-align: center;
  }
  .el-table th>.cell{background: #839964;color: white;padding: 5px 0;}
  .el-table thead{background: #839964;}
  .el-table th{background: #839964;color: white;width: 100%}
  .eventProcessing .el-table td, .el-table th{text-align: center!important;}
  .eventProcessing .el-input--mini .el-input__inner{padding: 3px 0;text-align: center;z-index: 50}
  .eventProcessing .el-icon-date:before{top: 0!important;}
  .eventProcessing .el-input--mini .el-input__inner{
    line-height: 0!important;
    -ms-line-height:  0!important;
  }
 .eventProcessing .el-input__inner{
   line-height: 0!important;
   -ms-line-height:  0!important;
 }
</style>
