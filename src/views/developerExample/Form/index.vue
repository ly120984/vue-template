<template>
  <div class="form-container">
    <div class="header">
      <h1>高级表单页面</h1>
      <span class="desc">高级表单常见于一次性输入和提交大批量数据的场景。</span>

      <div class="submit">
        <el-button type="primary" icon="el-icon-check" @click="submitForm">提交</el-button>
        <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
      </div>
    </div>
    <div class="content">

        <el-form ref="ruleForm" :inline="true" :model="form" :rules="rules" class="full form" label-width="100px">
          <div class="item">
            <h1>出差信息</h1>
            <div class="form">
              
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="出差事由：" prop="reason">
                      <el-input v-model="form.reason" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同编号：" prop="no">
                      <el-input v-model="form.no" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="出差时间：" prop="date">
                     <el-date-picker
                      v-model="form.date"
                      type="date"
                      placeholder="请选择">
                    </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审批人：" prop="user">
                      <el-select v-model="form.user" placeholder="请选择">
                        <el-option
                          v-for="item in users"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="紧急程度：" prop="urgency">
                       <el-radio v-model="form.urgency" label="1">紧急</el-radio>
                       <el-radio v-model="form.urgency" label="2">急</el-radio>
                       <el-radio v-model="form.urgency" label="3">一般</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>

          </div>

          <div class="item">
            <h1>行程信息</h1>
            <div class="form">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="出发地址：">
                      <el-input v-model="form.startAddress" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="出发时间：">
                      <el-input v-model="form.startDate" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="返程时间：">
                      <el-input v-model="form.endDate" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="交通类型：">
                      <el-input v-model="form.type" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
          </div>

          <div class="item">
            <h1>定位信息</h1>
            <div class="form map">
              <!-- 地图 -->
              <div id="mapContainer"></div>
              <div class="tip">
                <input type="text" id="addressId" v-model="form.address" placeholder="请输入..."/>
                <el-button type="primary" @click="geoCode()">搜索</el-button>
              </div>
            </div>
          </div>

        </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
let that;
let map;
let geocoder = new AMap.Geocoder();
let marker;
let lnglatPositon = {};
export default {
  data(){
    return{
      users:[{label:'张三',value:1},{label:'李四',value:2},{label:'王五',value:3}],
      form:{
        reason:'',
        no:'',
        date:'',
        user:'',
        urgency:'',
        startAddress:'',
        startDate:'',
        endDate:'',
        type:'',
        address:''
      },
      rules: {
        reason: [
          { required: true, message: '请填写出差事由', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        no:[
          { required: true, message: '请填写合同编号', trigger: 'blur' }
        ],
        date:[
          { required: true, message: '请选择出差时间', trigger: 'change' }
        ],
        user:[
          { required: true, message: '请选择审批人', trigger: 'change' }
        ],
        urgency:[
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ]
      },
      addInfo:{
        address:'',
        longitude:0,
        latitude:0
      }
    }
  },
  mounted(){
    
    that = this;

    let container = document.querySelector(".form-container");
    console.log(container,'container');


    // 初始化地图
    this.initMap();

    // 模拟请求延迟调用
    setTimeout(() => {
      
      let longitude=113.41415253280637, latitude=23.171532116483053;
      //设置地图中心点
      map.setCenter([longitude, latitude]); 
      marker.setPosition(new AMap.LngLat(longitude,latitude));
      
      // 逆向解析地址
      that.addRessGeocoder(longitude,latitude);
    }, 1000);
  },
  methods: {

    // 初始化地图
    initMap(){
      
      AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
        map = new AMap.Map('mapContainer', {
          zoom: 15,
          resizeEnable: true
        });

        map.plugin(['AMap.Autocomplete','AMap.PlaceSearch','AMap.Geolocation', 'AMap.ToolBar','AMap.Geocoder'], function () {
          var toolbar = new AMap.ToolBar();
          map.addControl(toolbar);

          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 500,          // 超过5秒后停止定位，默认：无穷大
            maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
            convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false,        // 显示定位按钮，默认：true
            buttonPosition: 'RB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 10), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          map.addControl(geolocation);
          // geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);      // 返回定位出错信息
        });

        marker = new AMap.Marker({
        	map: map,
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [0, 0]
        });

        var placeSearch = new AMap.PlaceSearch({
          map: map
        });

        //构造地点查询类
        //输入提示
        var autoOption={
          input : "addressId",
          // city :_currentCoord.pos,
        }

        var auto = new AMap.Autocomplete(autoOption);
        AMap.event.addListener(auto, "select", function(e){
          if(e.poi.adcode!=""){
            placeSearch.setCity(e.poi.adcode);
            //关键字查询查询
            placeSearch.search(e.poi.name);
          }
        });
        
        // 搜索出来的关键点，点击事件
        placeSearch.on('markerClick',function(e){

          // 逆向解析地址
          that.addRessGeocoder(e.marker.getPosition().getLng(),e.marker.getPosition().getLat());
          console.log('getPosition',e.marker.getPosition());
        });


        function onComplete(obj) {
          console.log("成功");
        }

        function onError(obj) {
          console.log(obj, "失败");
        }

        map.panBy(0, 1);
        map.addControl(new AMap.ToolBar({
          liteStyle: true
        }))

        // 地图点击事件
        map.on('click', function(e) {
          
          console.log('getLng---',e.lnglat.getLng(),'getLat---',e.lnglat.getLat());

          marker.setPosition(new AMap.LngLat(e.lnglat.getLng(),e.lnglat.getLat()));
          //地图平移至中心点
          map.panTo([e.lnglat.getLng(), e.lnglat.getLat()]);

          // 逆向解析地址
          that.addRessGeocoder(e.lnglat.getLng(),e.lnglat.getLat());
        });
      });
    },

    // 逆向解析地址
    addRessGeocoder(longitude,latitude){
        
        geocoder.getAddress([longitude,latitude], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
              // result为对应的地理位置详细信息
              let reg = result.regeocode;
              let address = reg.formattedAddress;
              address = address.replace(reg.addressComponent.province,'');
              address = address.replace(reg.addressComponent.city,'');

              // 设置数据
              that.form.address = address;
              console.log('mapClick',that.form.address);
              
              // 定位数据
              that.addInfo.address = address;
              that.addInfo.longitude = longitude;
              that.addInfo.latitude = latitude;
          }
        })
    },

    // 定位
    geoCode() {
        if(!this.form.address){
          return;
        }
        geocoder.getLocation(this.form.address, function(status, result) {
          if (status === 'complete'&&result.geocodes.length) {
            let lnglat = result.geocodes[0].location
            lnglatPositon = lnglat;
            console.log(lnglatPositon);

            marker.setPosition(lnglat);
            map.add(marker);
            map.setFitView(marker);
          }else{
            this.message("error", "定位失败!");
          }
        });
    },

    
    // 提交表单
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 重置表单
    resetForm(){
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>

<style lang="scss">
.section{
  padding: 0px !important;
}
.form-container{
  width: 100%;
  height: 100%;

  .header{
    height: 86px;
    width: 100%;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    background: white;
    display: inline-block;
    padding: 16px 24px;
    box-sizing: border-box;
    position: relative;

    h1{
      height: 28px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      margin: 0px;
    }

    .desc{
      margin-top: 4px;
      display: inline-block;
    }

    .submit{
      position: absolute;
      right: 16px;
      top: 24px;
    }
  }

  .content{
    background: #F0F2F5;
    padding: 1px 16px 16px 16px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 86px);

    .item{
      background: white;
      border-radius: 2px;
      margin-top: 16px;

      h1{
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        border-bottom: 1px solid #F0F0F0;
        padding: 12px 24px;
        box-sizing: border-box;
        margin: 0px;
      }

      .form{
        padding: 10px 24px 24px 24px;
        box-sizing: border-box;
      }

      .map{
        position: relative;

        #mapContainer{
          display: inline-block;
          width: 100%;
          height: 282px;
          margin-top: 14px;
          position: relative;
        }
        .tip{
          left: 120px;
          top: 36px;
          position: absolute;
          z-index: 9999;

          input{
            width: 200px;
            height: 30px;
            border-radius: 4px;
            border: 1px solid #ccc;
            padding: 0px 5px;
          }
          button{
            padding: 7px 10px;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>