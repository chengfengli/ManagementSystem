<template>
  <div class="eventProcessing">
    <header class="eventProcessing-search">
      <article class="select-search">
        <section class="flex1">
          <label>事件状态</label>
          <el-select v-model="value" placeholder="请选择" size="mini"style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <section class="flex1">
          <label>事件类型</label>
          <el-select v-model="value" placeholder="请选择" size="mini"style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <section class="flex1">
          <label>事件等级</label>
          <el-select v-model="value" placeholder="请选择" size="mini"style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <section class="flex1">
          <label>事件标识</label>
          <el-select v-model="value" placeholder="请选择" size="mini"style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <section class="flex3">
          <label>上报日期（起止）</label>
          <div style="display: inline-block;" >
            <el-date-picker
              style="width: 135px"
              size="mini"
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>--
          <div style="display: inline-block;" >
            <el-date-picker
              style="width: 135px"
              size="mini"
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </section>
        <section class="flex1">
          <el-button type="danger" size="small">查寻</el-button>
        </section>
      </article>
      <article class="fast-search" >
        <div style="flex: 6;display: flex;text-align: center;">
          <section>
            <el-button type="danger"size="mini">删除</el-button>
          </section>
          <section>
            <el-button type="danger"size="mini">导出</el-button>
          </section>
          <section>快速筛选</section>
          <section>全部事件</section>
          <section>暂存事件</section>
          <section>废弃事件</section>
          <section>结案事件</section>
        </div>
        <div style="flex: 4"></div>
      </article>
    </header>
    <main class="table-data">
      <section class="table-th">表头</section>
      <section class="table-content" style="height: 400px;border-bottom: 1px solid #8F949A;"></section>
    </main>
    <footer style="padding: 5px 0;border-bottom: 1px solid #8F949A;">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "eventProcessing",
    data(){
      return{
        options: [
          {
          value: '选项1',
          label: '暂存'
        }, {
          value: '选项2',
          label: '废弃'
        }, {
          value: '选项3',
          label: '驳回处理'
        }
        ],
        value: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1: '',
        value2: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style>
  .eventProcessing{
    width: 100%;
    height: 100%;
    border: 1px solid #8F949A;
  }
  .eventProcessing .select-search{
    padding: 30px 0 10px 0;
    display: flex;
    border-bottom: 1px solid #8F949A;
  }
  .eventProcessing .select-search .flex1{flex: 1;text-align: center;}
  .eventProcessing .select-search .flex3{flex: 3;text-align: center;}
  .eventProcessing .select-search .el-input--mini .el-input__icon{line-height: 0;}
  .eventProcessing .select-search .el-button--small{padding: 9px 30px; vertical-align: middle;}
  .eventProcessing .fast-search{
    display: flex;
    border-bottom: 1px solid #8F949A;
    padding: 8px 0;
  }

  .eventProcessing .fast-search section{flex: 1;}
  .fast-search .el-button--mini{padding: 5px 30px;}
  .eventProcessing .table-th{
    border-bottom: 1px solid #8F949A;
    padding: 5px 0;
    text-align: center;
  }
</style>
