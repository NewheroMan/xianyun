<template>
  <section class="contianer">
    <el-row type="flex"
            justify="space-between">

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData"
                        @changeFlights="changeFlights" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item, index) in dataList"
                     :key="index"
                     :data="item" />

        <!-- size-change：切换条数时候触发 -->
        <!-- current-change: 页数切换时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size: 当前页面的条数 -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageIndex"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>

      </div>

      <!-- 侧边栏 -->
      <FlightsAside />

    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"
export default {
  data () {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      pageIndex: 1,
      pageSize: 5,
      totle: 0
    }
  },
  beforeRouteUpdate (to, from, next) {
    next();
    this.getData()
  },
  computed: {
    dataList () {
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
  },
  methods: {
    handleSizeChange (value) {
      this.pageSize = value;
      this.pageIndex = 1;
    },
    handleCurrentChange (value) {
      this.pageIndex = value;
    },
    changeFlights (arr) {
      this.flightsData.flights = arr;
      this.pageIndex = 1;
      this.total = this.flightsData.flights.length;
    },
    getData () {

      this.pageIndex = 1;

      // 请求机票列表
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // 总数据，（flights, info, options, total）
        this.flightsData = res.data;

        // 下面的值赋值之后不能被修改，展开得到新的对象
        this.cacheFlightsData = { ...res.data };

        // 总条数
        this.total = this.flightsData.flights.length;
      })
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted () {
    this.getData()
  }
}
</script>
<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>