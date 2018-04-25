<template>
  <div class="personAdvice">
    <article class="personAdvice-container">
      <header class="personAdvice-h">
        <el-button type="success"  @click="timeSort">发布时间排序</el-button>
        <el-button type="info" @click="tagsSort">点赞数量排序</el-button>
        <el-button type="warning" @click="deleteJy">删除建议</el-button>
        <el-button type="danger" @click="modifyJy">编辑建议</el-button>
        <!--<section @click="timeSort" style="cursor: pointer;">发布时间排序</section>
        <section @click="tagsSort" style="cursor: pointer;">点赞数量排序</section>
        <section>删除建议</section>
        <section>编辑建议</section>-->
      </header>
      <main class="personAdvice-m">
        <div class="m-content" :class="{activeAdvice: item.showActive}" v-for="item in PersonData" @click="monitorActive(item)">
          <section class="personAdvice-content clear-fix">
            <div class="content-title set-left">
              <div style="margin-bottom: 5px">发布人:{{ item.USERNAME }}-{{ item.DEPTNAME }}</div>
              <div style="margin-bottom: 5px">{{ item.PUBLISHDATE }}</div>
              <div class="title-font">
                <div :class="{ activeIocFont: item.HASTHUMB }">
                  <i class="proFont">&#xe62c;</i>
                </div>
              </div>
              <div class="title-Tags">{{ item.THUMBS }}</div>
              <div class="title-addPl" @click="addPl(item)">评论</div>
            </div>
            <div class="content-data set-right">
              <span>存在问题</span>
              <div class="data-aaa">
                <div style="padding: 0 10px">{{ item.PROBLEMS }}</div>
              </div>
              <span>改进措施</span>
              <div class="data-aaa">
                <div style="padding: 0 10px">{{ item.MEASURES }}</div>
              </div>
            </div>
          </section>
          <div class="comments">
            <div class="comments-font">
              <i class="proFont" v-if="item.showup" @click="queryComments(item)">&#xe68e;</i>
              <i class="proFont" v-if="item.showdown" @click="closeComments(item)">&#xe68d;</i>
              <div class="comments-content" v-show="item.showdown">
                <div class="comments-data" v-for="comments in commentsData" >
                  <span>{{ comments.USERNAME }}</span>
                  <span>{{ comments.PUBLISHDATE }}</span>
                  <span @click="getBackData(comments.ID)" style="cursor: pointer">编辑</span>
                  <span @click="deleteComments(comments.ID)" style="cursor: pointer">删除</span><br/>
                  <span style="display: inline-block;margin-top: 10px">{{ comments.CONTENT }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="PersonData.length <= 0" style="text-align: center;margin-top: 30px">暂无数据</div>
      </main>
    </article>
    <div class="addMenuWindow" v-if="showaddModify">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">匿名:</label><!---->
              <el-checkbox v-model="backData.ANONYMOUS"></el-checkbox>
            </section>
            <section>
              <label class="windowtitle">内容:</label>
              <el-input v-model="backData.CONTENT" type="textarea" placeholder="请输入批注内容" size="small " style="display: inline-block;width: 200px;vertical-align: middle"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 8px 26px" type="info" round @click="showaddModify = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 8px 26px" type="danger" round @click="editorComments">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="addMenuWindow" v-if="showaddAddPl">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">是否匿名:</label><!---->
              <el-checkbox v-model="proposal.ANONYMOUS"></el-checkbox>
            </section>
            <section>
              <label class="windowtitle">存在问题:</label>
              <el-input v-model="proposal.PROBLEMS" type="textarea" placeholder="请输入批注内容" size="small " style="display: inline-block;width: 200px;vertical-align: middle"></el-input>
            </section>
            <section>
              <label class="windowtitle">改进措施:</label>
              <el-input v-model="proposal.MEASURES" type="textarea" placeholder="请输入批注内容" size="small " style="display: inline-block;width: 200px;vertical-align: middle"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 8px 26px" type="info" round @click="showaddAddPl = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 8px 26px" type="danger" round @click="addPlSubmit">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="addMenuWindow" v-if="showModifyJy">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">是否匿名:</label><!---->
              <el-checkbox v-model="formerData.ANONYMOUS"></el-checkbox>
            </section>
            <section>
              <label class="windowtitle">存在问题:</label>
              <el-input v-model="formerData.PROBLEMS" type="textarea" placeholder="请输入批注内容" size="small " style="display: inline-block;width: 200px;vertical-align: middle"></el-input>
            </section>
            <section>
              <label class="windowtitle">改进措施:</label>
              <el-input v-model="formerData.MEASURES" type="textarea" placeholder="请输入批注内容" size="small " style="display: inline-block;width: 200px;vertical-align: middle"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 8px 26px" type="info" round @click="showModifyJy = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 8px 26px" type="danger" round @click="modifyJySubmit">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "personAdvice",
    props: ["dataId"],
    mounted: function(){
      this.initPersonData();
    },
    data: function(){
      return{
        formerData: {},
        showModifyJy: false,
        activeid: null,
        proposal: {
          ANONYMOUS: null,
          PROBLEMS: "",
          MEASURES: "",
          EVENTID: null
        },
        showaddAddPl: false,
        showaddModify: false,
        isActive: true,
        publishDate: "",
        thumbs: "",
        PersonData: [],
        commentsData: [],
        backData: {}
      }
    },
    methods: {
      //删除建议
      deleteJy: function(){
        if(this.activeid == null){
          return this.$message.error("选择要删除的文件！")
        }
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            commentid: this.activeid,
          }
          this.$http.post('/proposal/del/'+ data.commentid, data).then( res => {
            if(res.code == 10000){
              this.initPersonData();
              this.$message.success("删除成功！")
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }).catch(() => {

        });
      },
      //建议回现数据
      modifyJy: function(){
        if(this.activeid == null){
          return this.$message.error("选择要编辑的文件！")
        }
        let data = {proposalid: this.activeid}
        this.$http.post('/proposal/detail/'+ data.proposalid, data).then( res => {
          if(res.code == 10000){
            this.showModifyJy = true;
            this.formerData = res.data;
            if( this.formerData.ANONYMOUS == 1){
              this.formerData.ANONYMOUS = true;
            }else{
              this.formerData.ANONYMOUS = false;
            }
          }
        }).catch(function (error) {//加上catch
          this.$message.error(error);
        });
      },
      //编辑建议
      modifyJySubmit: function(){
        if( this.formerData.ANONYMOUS == true){
          this.formerData.ANONYMOUS = 1;
        }else{
          this.formerData.ANONYMOUS = 0;
        }
        let data = {
          proposalid: this.formerData.ID,
          ANONYMOUS:  this.formerData.ANONYMOUS,
          PROBLEMS:  this.formerData.PROBLEMS,
          MEASURES:  this.formerData.MEASURES
        }
        this.$http.post('/proposal/update/'+ data.proposalid, data).then( res => {
          if(res.code == 10000){
            this.initPersonData();
            this.$message.success("编辑成功！")
            this.showModifyJy = false;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      monitorActive: function(item){
        this.activeid = item.ID;
        for(let active of this.PersonData){
          if(active.ID == item.ID){
            active.showActive = true;
          }else{
            active.showActive = false;
          }
        }
      },
      //发布评论
      addPl: function(item){
        this.showaddAddPl = true;
        this.proposal.EVENTID = item.ID;
      },
      addPlSubmit: function(){
        if( this.proposal.ANONYMOUS == true){
          this.backData.ANONYMOUS = 1;
        }else{
          this.backData.ANONYMOUS = 0;
        }
        let data = {
            ANONYMOUS: this.proposal.ANONYMOUS,
            PROBLEMS: this.proposal.PROBLEMS,
            MEASURES: this.proposal.MEASURES,
            EVENTID: this.proposal.EVENTID
          }
        this.$http.post('/proposal/push', data).then( res => {
          if(res.code == 10000){
            this.initPersonData();
            this.$message.success("评论成功！")
            this.proposal = {}
            this.showaddAddPl = false;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //评论回现数据
      getBackData: function(ID){
        this.showaddModify = true;
        let data = {commentid: ID}
        this.$http.post('/comment/detail/'+ data.commentid, data).then( res => {
          if(res.code == 10000){
            this.backData = res.data;
            if( this.backData.ANONYMOUS == 1){
              this.backData.ANONYMOUS = true;
            }else{
              this.backData.ANONYMOUS = false;
            }
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //编辑评论
      editorComments: function(){
        if(this.backData.ANONYMOUS == true){
          this.backData.ANONYMOUS = 1;
        }else{
          this.backData.ANONYMOUS = 0;
        }
        let data = {
          commentid: this.backData.ID,
          ANONYMOUS: this.backData.ANONYMOUS,
          CONTENT: this.backData.CONTENT
        }
        this.$http.post('/comment/update/'+ data.commentid, data).then( res => {
          if(res.code == 10000){
            if( this.backData.ANONYMOUS == 1){
              this.backData.ANONYMOUS = true;
            }else{
              this.backData.ANONYMOUS = false;
            }
            this.initPersonData();
            this.$message.success("修改成功！")
            this.showaddModify = false;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //删除评论
      deleteComments: function(ID){
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            commentid: ID,
          }
          this.$http.post('/comment/del/'+ data.commentid, data).then( res => {
            if(res.code == 10000){
              this.initPersonData();
              this.$message.success("删除成功！")
              this.showaddModify = false;
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }).catch(() => {

        });
      },
      //事件排序
      timeSort: function(){
        this.publishDate = "publishDate";
        this.initPersonData();
      },
      //点赞排序
      tagsSort: function(){
        this.publishDate = "thumbs";
        this.initPersonData();
      },
      //初始化数据
      initPersonData: function(){
        let data = {
          id: this.dataId,
          name:"ORDERBY",
          publishDate: this.publishDate,
          thumbs: this.thumbs
        }
        this.$http.post('event/proposal/'+ data.id, data).then( res => {
          if(res.code == 10000){
            for(let item of res.data){
              item.showup = true;
              item.showdown = false;
              item.showActive = false;
            }
            this.PersonData = res.data;
            //console.log(this.PersonData)
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //查询个人建议对应的评论
      queryComments: function(item){
        this.commentsData = [];
        item.showup = false;
        item.showdown = true;
        setTimeout(() => {
          let data = {proposalid: item.ID}
          this.$http.post('/proposal/listComment/'+ data.proposalid, data).then( res => {
            if(res.code == 10000){
              this.commentsData = res.data;
              console.log(this.commentsData)
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        },10)
      },
      closeComments: function(item){
        this.commentsData = [];
        item.showup = true;
        item.showdown = false;
      }
    },
  }
</script>

<style>
  .personAdvice{
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
  }
  .personAdvice .activeAdvice{
    background: #ccc;
  }
  .personAdvice .personAdvice-container{
    border: 1px solid #797979;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .personAdvice-h{padding: 9px 20px;border-bottom: 1px solid #797979;}
  .personAdvice-h .el-button{
    padding: 8px 10px;
    box-sizing: border-box;
  }
  .personAdvice-h section{
    display: inline-block;
    padding: 4px 20px;
    border: 1px solid #797979;
    margin-right: 15px;
    cursor: pointer;
  }
  .personAdvice-m{
    padding: 9px 20px;
    box-sizing: border-box;
  }
  .personAdvice-m .personAdvice-content{
    width: 98%;
    display: flex;
    margin: auto;
    padding: 8px 0;
  }
  .personAdvice-content .content-title{
    position: relative;
    flex: 2;
    text-align: center;
    max-width: 160px;
    padding-top: 14px;
  }
  .personAdvice-content .content-data{flex: 8;}
  .personAdvice-content .content-data .data-aaa{
    border: 1px solid #797979;
    padding: 10px 0;
    text-align: left;
    margin-bottom: 15px;
  }
  .personAdvice .title-font{
    text-align: center;
  }
  .personAdvice .title-font .proFont{font-size: 40px;}
  .personAdvice .title-Tags{
    position: absolute;
    left: 78px;
    bottom: 45px;
  }
  .personAdvice .title-addPl{
    position: absolute;
    right: 25px;
    bottom: 45px;
    color: #7AB74A;
    cursor: pointer;
  }
  .personAdvice .activeIocFont .proFont{color: #7FBF4D;}
  .personAdvice .m-content{height: auto;}
  .personAdvice .m-content:hover{background: #ccc;cursor: pointer;}
  .personAdvice .comments{
    width: calc(100% - 185px);
    margin-left: 173px;
  }
  .personAdvice .comments .comments-font{text-align: center;}
  .comments-font .proFont{
    font-size: 24px;
    color: #7AB74A;
    cursor: pointer;
  }
 .comments-font .comments-content{
   text-align: left;
 }
  .comments-font .comments-data{padding: 10px 0}
  .comments-font .comments-data span{margin-right: 25px}

  .personAdvice .addMenuWindow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*border: 1px solid red;*/
    background: rgba(128, 128, 128, 0.5);
    z-index: 200;
  }
  .personAdvice .addMenuWindow .container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .personAdvice .addMenuWindow .content{
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 500px;
    height: auto;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px 20px 5px 20px;
    box-sizing: border-box;
    z-index: 1000;
    border-radius: 3px;
  }
  .personAdvice .addMenuWindow .windowtitle{
    display: inline-block;
    text-align: right;
    width: 65px;
    margin-right: 10px;
  }
  .personAdvice .addMenuWindow .content section{margin-bottom: 20px;}
  .personAdvice .addMenuWindow .windowBtn{flex: 1;text-align: center;margin-top: 5px;}
  .personAdvice .addMenuWindow .echo-data{ display: flex; text-align: center;}
  .personAdvice .addMenuWindow .echo-data div{ flex: 1;}
</style>
