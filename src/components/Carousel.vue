<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item  in imgList" :key="item .id">
      <img v-bind:src="item.path" alt="item.name"/>
    </el-carousel-item>
  </el-carousel>
</template>


<script>
  export default {
    data() {
      return {
        imgList: [
          {id: 1001, name: '风景', path: require('../assets/fengjing/1001.jpg')},
          {id: 1002, name: '风景', path: require('../assets/fengjing/1002.jpg')},
          {id: 1003, name: '风景', path: require('../assets/fengjing/1003.jpg')},
          {id: 1004, name: '风景', path: require('../assets/fengjing/1004.jpg')},
          {id: 1005, name: '风景', path: require('../assets/fengjing/1005.jpg')},
          {id: 1006, name: '风景', path: require('../assets/fengjing/1006.jpg')},
          {id: 1007, name: '风景', path: require('../assets/fengjing/1007.jpg')}
        ]
      }
    }
  }

</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
