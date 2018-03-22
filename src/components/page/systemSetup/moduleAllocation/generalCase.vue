<template>
  <article class="generalCase">
    <aside class="generalCase-select">
      <section v-for="module in moduleCollocate">{{ module }}</section>
    </aside>
    <aside class="generalCase-content">
      <div class="all-content">
        <section>
          <label>处理时限</label>
          <el-select v-model="value" placeholder="请选择" size="small" style="width: 170px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>单位:小时 0为无超期 ，发现人提交报告后，处理部门需在时限内完成处理。</span>
        </section>
        <section>
          <label>元素名称</label>
          <input style="width: 166px;"/>
          <span>单位:小时 0为无超期 ，发现人提交报告后，处理部门需在时限内完成处理。</span>
        </section>
        <section>
          <label>禁用</label>
          <el-checkbox v-model="checked">禁用后停止使用</el-checkbox>
        </section>
        <section>
          <label>必填</label>
          <el-checkbox v-model="checked">禁用后停止使用</el-checkbox>
        </section>
        <section>
          <label>摘要元素</label>
          <el-checkbox v-model="checked">勾选后进入摘要</el-checkbox>
        </section>
        <section>
          <label>分析元素</label>
          <el-checkbox v-model="checked">禁用后停止使用</el-checkbox>
        </section>

        <section>
          <label>排序号</label>
          <input style="width: 166px;"/>
          <span>越小的排在前面</span>
        </section>
        <section>
          <label>元素长度</label>
          <input style="width: 166px;"/>
        </section>
        <section>
          <label>提示信息</label>
          <input style="width: 166px;"/>
        </section>
        <section>
          <label>必填提示</label>
          <input style="width: 166px;"/>
        </section>
        <section>
          <label>错误提示</label>
          <input style="width: 166px;"/>
        </section>
        <section>
          <label>验证正则</label>
          <input style="width: 166px;"/>
        </section>
        <section>
          <label>默认值</label>
          <input style="width: 166px;"/>
          <span>?</span>
        </section>
        <section>
          <label>可选值数据源</label>
          <el-select v-model="value" placeholder="请选择" size="small" style="width: 170px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
      </div>
      <el-button type="danger" style="padding: 10px 40px;margin: 30px 0 50px 45px;">保存</el-button>
    </aside>
  </article>
</template>

<script>
  export default {
    name: "generalCase",
    data(){
      return{
        moduleCollocate: ["患者姓名","患者体重","性别","出生日期","年龄阶段","体重","民族"],
        checked: false,
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
    }
  }
</script>

<style>
  .generalCase{
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x:hidden;
    overflow-y:auto;
  }
  .generalCase .generalCase-select{flex: 1;border-right: 1px solid #E6E6E6;}
  .generalCase .generalCase-select section{
    padding: 8px 0;
    text-align: center;
    cursor: pointer;
  }
  .generalCase .generalCase-select section:hover{background: #666666;}
  .generalCase .generalCase-content{flex: 9;}
  .generalCase .generalCase-content .all-content{padding: 15px 0 0 45px;}
  .generalCase .generalCase-content section{padding: 5px 0;box-sizing: border-box;}
  .generalCase .generalCase-content label:first-child{
    display: inline-block;
    width: 85px;
    text-align: left;
  }
</style>
