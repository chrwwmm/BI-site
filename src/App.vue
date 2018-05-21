<template>
  <div id="app">
    <h1>客服查件量</h1>
    <div class="date">{{date}}</div>
    <div class="userlist">    
      <el-table :data="site" style="width: 100%; border-right: 2px solid #212C49;" :row-class-name="tableRowClassName" ref="multipleTable">
        <el-table-column label="客服" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="指标" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_target}}</span>
          </template>
        </el-table-column>
        <el-table-column label="前日" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_lastday}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当日" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <transition name="changeSize">
              <span :class="changeColor(scope.row)">{{ scope.row.cnt_today}}</span>
            </transition>
          </template>
        </el-table-column>
        <el-table-column label="进行中" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_doing}}</span>
          </template>
        </el-table-column>
        <el-table-column label="完结" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_finished}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.score}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <!-- 使用三元运算符 -->
            <span>{{scope.row.status === true?'在线':'离线'}}</span>
          </template>
        </el-table-column>
			</el-table>
      <el-table :data="site" style="width: 100%;" :row-class-name="tableRowClassName" ref="multipleTable">
        <el-table-column label="客服" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="指标" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_target}}</span>
          </template>
        </el-table-column>
        <el-table-column label="前日" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_lastday}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当日" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <transition name="changeSize">
              <span :class="changeColor(scope.row)">{{ scope.row.cnt_today}}</span>
            </transition>
          </template>
        </el-table-column>
        <el-table-column label="进行中" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_doing}}</span>
          </template>
        </el-table-column>
        <el-table-column label="完结" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.cnt_finished}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <span>{{ scope.row.score}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="110" align="center" label-class-name="table-column">
          <template slot-scope="scope">
            <!-- 使用v-if和v-else -->
            <span v-if="scope.row.status === true">在线</span>
            <span v-else>离线</span>
          </template>
        </el-table-column>
			</el-table>
    </div>
  </div>
</template>

<script>
import { siteMock } from '@/api/api'
export default {
  name: 'App',
  data() {
    return {
      site: [],
      date: ''
    }
  },
  created(){
    this.getSite();
    this.showTime();
  },
  methods: {
    showTime: function(){
      setInterval(() => {
        let d = new Date();
        let str='';
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let second = d.getSeconds();
        if(month < 10){
          month = String(String(0) + String(month));
        }
        if(day < 10){
          day = String(String(0) + String(day));
        }
        if(hour < 10){
          hour = String(String(0) + String(hour));
        }
        if(minute < 10){
          minute = String(String(0) + String(minute));
        }
        if(second < 10){
          second = String(String(0) + String(second));
        }
        str+=year+'-'; 
        str+=month+'-'; 
        str+=day+' '; 
        str+=hour+':'; 
        str+=minute+':';
        str+=second; 
        this.date = str
      }, 1000);
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        if (row.status === 1) {
          if (row.cnt_today > 60){
            return 'double-warning-row';
          } else {
            return 'double-success-row';
          } 
        }
        return 'double-row';
      }else if(rowIndex%2 === 0) {
        if (row.status === 1) {
          if (row.cnt_today > 60){
            return 'warning-row';
          } else {
            return 'success-row';
          } 
        }
        return 'common-row';
      }
    },
    // 以‘cnt_today’降序排序
    desc(x,y) {
      let colId = 'cnt_today'
      return(x[colId]<y[colId]) ? 1:-1
    },
     // 以‘name’升序排序
    asc(x,y) {
      let colId = 'name'
      return(x[colId]>y[colId]) ? 1:-1
    },
  
    getSite() {
      let mid = 'abc'
      let type = 2
      let from = 'daping'
      let access_token = 'def'
      // 第一次请求数据，先对在线离线进行过滤
      let para = {mid:mid,type:type,from:from,access_token:access_token}
      siteMock(para).then((res) => {
        // let handleData1 = res.data.data
        let handleData1 = res.data.articles

        this.data3 = handleData1
        console.log(this.data3)

        let statusOn = handleData1.filter(function (e) { return e.status === true; })
        let statusOff = handleData1.filter(function (e) { return e.status === false; })

        // 然后根据当日查件量将在线客服进行降序排序
        statusOn.sort(this.desc)

        // 拼接数据，将离线置于最下面
        let data = statusOn.concat(statusOff)
        this.site = data.slice(0,3)
        
        this.site[1] 

        // 然后进行分页,每3条为一页，每5秒切换一次页面        
        let data1 = []
        for (let i = 0; i < parseInt(data.length/3); i++) {
          let data2 = data.slice(3*(i+1),3*(i+1)+3)       
          // this.$set(data1, data2)
          data1.push(data2)
        }
        
        let timer = 10000;//时间间隔
        next();
        let self = this
        function next(){
          setTimeout(function(){
            self.site = data1.shift()
            // console.log(self.site)
            if(data1.length>0){
              next();
            }
            else if(data1.length===0){
              setTimeout(() => {
                self.getSite();
              }, timer)
            }
          },timer)
        }
      })
    },
    changeColor(row) {
      if(row.cnt_today>60 && row.status === true) {return 'warning'}
      return ''
    }
  }
}
</script>

<style lang="less">
*{margin:0;padding:0;}
html,body,#app{width:100%;height:100%;}
#app{
  background-image: url(./assets/site-bg.png);
  background-size: 100% 100%;
  position: relative;
}
.userlist {
  display: flex;
  flex-direction: row;
  /* background-color: rgba(255,255,255,0); */
  padding: 100px 40px 0 40px;
}
h1{
  text-align: center;
  padding-top: 36px;
  color: #DCEBFF;
}
.date{
  position: absolute;
  top: 15px;
  right: 50px;
  color: #DCEBFF;
  font-size: 27px;
}
.el-table__body {
  background:rgba(0,0,0,0);
}
.el-table {
  font-size: 23px;
  color: #C1C1C1;
  background: rgba(0,0,0,0);
}
.el-table::before {
  background: rgba(0,0,0,0);
}
.el-table thead {
    color: #B9BABE;
}
.el-table th {
  // background: rgba(0,0,0,0);
  background-color: transparent;
}
.el-table td {
  padding: 20px 0;
}
.el-table tr {
  background: rgba(0,0,0,0);
}
.el-table th.is-leaf, .el-table td {
  border-bottom: none;
}
.el-table .common-row {
  color: #E94262;
  background: rgba(0,0,0,0);
}
.el-table .warning-row {
  color: #E94262;
}
.el-table .success-row {
  color: #6AD175;
}
.el-table .double-row {
  background: rgba(0,0,0,.08);
}
.el-table .double-warning-row {
  background: rgba(0,0,0,.08);
  color: #E94262;
}
.el-table .double-success-row {
  background: rgba(0,0,0,.08);
  color: #6AD175;
}
.warning {
  display: inline-block;
  animation: shake 1s, changeWarningSize 1s;
}
@keyframes changeWarningSize {
  0% {
    font-size: 23px;
  }
  100% {
    font-size: 36px;
  }
}
@keyframes shake {
  0% {
    transform: translate(2px, 2px);
  }
  50% {
    transform: translate(2px, 2px);
  }
  62.5% {
    transform: translate(-2px, -2px);
  }
  75% {
    transform: translate(0px, 0px);
  }
  87.5% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(-2px, 2px);
  }
}
.el-table .cell {
  max-height: 23px;
  overflow: visible;
}
</style>