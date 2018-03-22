<template>
  <article class="basicSetup">
    <div class="basicSetup-universalSet" >
      <div class="basicSetup-title">
        <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">通用设置</span>
      </div>
      <aside style="padding-left: 30px;padding-top: 8px;">
        <section>
          <label>关闭填报:</label>
          <el-checkbox v-model="checked">勾选后事件禁止填报</el-checkbox>
        </section>
        <section>
          <label>手机填报:</label>
          <el-checkbox v-model="checked">勾选后事件可在App填报</el-checkbox>
        </section>
        <section>
          <label>禁用:</label>
          <el-checkbox v-model="checked">勾选后事件停止处理</el-checkbox>
        </section>
        <section>
          <label>事件名称:</label>
          <input/>
        </section>
        <section>
          <label>事件描述:</label>
          <input/>
          <span>指导填报人填报事件</span>
        </section>
        <section>
          <label>排序号:</label>
          <input/>
          <span>数字越小显示越靠前</span>
        </section>
      </aside>
    </div>
    <div class="basicSetup-universalSet" >
      <div class="basicSetup-title">
        <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">事件设置</span>
      </div>
      <aside style="padding-left: 30px;padding-top: 8px;">
        <section>
          <label>事件填报:</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>事件填报方式</span>
        </section>
        <section>
          <label>事件类型:</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>二级事件所在模块和元素配置，提交报告后将默认设置二级事件</span>
        </section>
        <section>
          <label>事件处理:</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>指定事件处理方式及科室范围（不选择，默认为所有'业务'科室）</span>
        </section>
        <section>
          <label>事件管理:</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>指定此事件固定归口（管理）部门。（请确保此科室已设置"事件管理员"）</span>
        </section>
        <section>
          <label>分管领导:</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>指定此事件分管领导，设置分管领导后，事件处理人员和归口部门可选择是否上报事件到分管领导</span>
        </section>
        <section>
          <label>事件报告:</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>上报事件后，完善部门需重新编辑完善报告，若选择强制完善，未完善将不能继续上报（注：与角色权限配套使用</span>
        </section>
        <!---->
        <section>
          <label style="min-width: 70px;">处理方式（发现部门)</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>事件发现人，可选择继续上报对象</span>
        </section>
        <section>
          <label style="min-width: 70px;">处理方式（处理部门)</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>事件管理部门，可选择处理事件的方式</span>
        </section>
        <section>
          <label style="min-width: 70px;">处理方式（管理部门)</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>事件管理部门，可选择处理事件的方式</span>
        </section>
        <!---->
        <section>
          <label style="min-width: 70px;">事件详情显示模块</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>事件详情页，允许显示模块。注：三大报告受"模块设置"控制</span>
        </section>
        <section>
          <label style="min-width: 70px;">默认协助处理科室</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>配置后， 上报事件时将自动设置这些科室为协助处理部门</span>
        </section>
        <section>
          <label style="min-width: 70px;">默认协助管理部门</label>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>配置后， 上报事件时将自动设置这些科室为协助管理部门</span>
        </section>
      </aside>
    </div>
    <div class="basicSetup-universalSet" >
      <div class="basicSetup-title">
        <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">其他设置</span>
      </div>
      <aside style="padding-left: 30px;padding-top: 8px;">
        <section>
          <label>处理时限:</label>
          <input/>
          <span>单位:小时 0为无超期 ，发现人提交报告后，处理部门需在时限内完成处理。</span>
        </section>
        <section>
          <label>自动处理:</label>
          <input/>
          <span>单位:小时 0为不自动处理 ，对于"等待处理"状态的事件，处理部门在时限内未完成处理，系统将自动提交事件到管理部门</span>
        </section>
        <section>
          <label>结案时限:</label>
          <input/>
          <span>单位:小时 0为无超期 ，发现人提交报告后，管理部门需要在规定时限内完成结案处理</span>
        </section>
        <section>
          <label>自动结案:</label>
          <input/>
          <span>单位:小时 0为不自动结案 ，对于"待结案"状态事件，管理部门在时限内（填报日期起）未完成结案，系统将自动完成结案</span>
        </section>
      </aside>
    </div>
    <el-button type="danger" style="padding: 10px 40px;margin: 30px 0 50px 30px;">保存</el-button>
  </article>
</template>

<script>
  export default {
    name: "basicSetup",
    data(){
      return{
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
  .basicSetup{
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    overflow-y:auto;
  }
  .basicSetup .basicSetup-universalSet{width: 100%;}
  .basicSetup .basicSetup-title{padding-left: 20px;margin-top: 15px;}
  .basicSetup .basicSetup-universalSet label{
    min-width: 70px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
  .basicSetup .basicSetup-universalSet aside section{padding: 7px 0;}
</style>
