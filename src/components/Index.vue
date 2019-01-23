<template>

  <div>
    <font-header></font-header>
    <el-carousel :interval="4000" type="card" height="450px">
      <el-carousel-item v-for="img in imgList" :key="img.id">
        <img :src="img.path" :alt="img.name" class="carousel-img" >
      </el-carousel-item>
    </el-carousel>
    <font-footer></font-footer>
  </div>

</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        imgList: [
          {id: 1001, name: '风景', path: require('../assets/carousel/1001.jpg')},
          {id: 1002, name: '风景', path: require('../assets/carousel/1002.jpg')},
          {id: 1003, name: '风景', path: require('../assets/carousel/1003.jpg')},
          {id: 1004, name: '风景', path: require('../assets/carousel/1004.jpg')},
          {id: 1005, name: '风景', path: require('../assets/carousel/1005.jpg')},
          {id: 1006, name: '风景', path: require('../assets/carousel/1006.jpg')}
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
