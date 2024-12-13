<template>
  <div class="container">
    <!-- Thanh công cụ -->
    <el-row :gutter="10" class="toolbar">
      <!-- Thanh Search căn trái -->
      <el-col :span="6" class="search-container">
        <el-input v-model="search" placeholder="Search Account ID" clearable>
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </el-col>

      <!-- Các công cụ căn phải -->
      <el-col :span="18" class="tools-container">
        <el-row :gutter="10" justify="end">
          <el-col :span="2">
            <el-button class="add_acc_btn" type="primary" @click="addAccount">
              <el-icon class="plus_icon"><Plus /></el-icon> Add Account
            </el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" plain class="Refresh_btn" @click="reload">
              <el-icon><Refresh /></el-icon>
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              :shortcuts="shortcuts"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            />
          </el-col>
          <el-col :span="2">
            <el-select v-model="filterStatus" placeholder="Filter" clearable>
              <template #prefix>
                <el-icon><Filter /></el-icon>
              </template>
              <el-option label="Active" value="Active"></el-option>
              <el-option label="Pending" value="Pending"></el-option>
              <el-option label="Recall" value="Recall"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="exportToCSV">
              <el-icon class="export_icon"><Download /></el-icon>Export To CSV
            </el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="text" class="Setting_btn">
              <el-icon><Setting /></el-icon>
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- Bảng dữ liệu -->
    <el-table
      :data="filteredData"
      style="width: auto; margin-top: 20px;"
      stripe
    >
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="id" label="STT" width="48"></el-table-column>
      <el-table-column prop="account" label="TÀI KHOẢN" width="100"></el-table-column>
      <el-table-column prop="note" label="NOTE" width="140"></el-table-column>
      <el-table-column prop="fee" label="FEE" width="47"></el-table-column>
      <el-table-column prop="status" label="TT HỆ THỐNG" width="115">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)" round>
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="SỐ DƯ" width="70"></el-table-column>
      <el-table-column prop="nguong" label="NGƯỠNG" width="100"></el-table-column>
      <el-table-column prop="nguongcl" label="NGƯỠNG CL" width="110"></el-table-column>
      <el-table-column prop="limit" label="LIMIT" width="90"></el-table-column>
      <el-table-column prop="total" label="TỔNG TIÊU" width="100"></el-table-column>
      <el-table-column prop="money" label="TIỀN TỆ" width="80"></el-table-column>
      <el-table-column prop="role" label="ROLE" width="120"></el-table-column>
      <el-table-column prop="limitset" label="LIMIT SET" width="100"></el-table-column>
      <el-table-column prop="pttt" label="PTTT" width="110"></el-table-column>
      <el-table-column prop="ngaylhd" label="NGÀY LHĐ" width="100"></el-table-column>
      <el-table-column prop="kyhan" label="KỲ HẠN" width="80"></el-table-column>
      <el-table-column prop="lydokhoa" label="LÝ DO KHÓA" width="170"></el-table-column>
      <el-table-column prop="loaitk" label="LOẠI TK" width="80"></el-table-column>
      <el-table-column prop="timezone" label="MÚI GIỜ" width="80"></el-table-column>
      <el-table-column prop="rootid" label="ID GỐC" width="180"></el-table-column>
      <el-table-column prop="country" label="QUỐC GIA" width="110"></el-table-column>
      <el-table-column prop="systemid" label="ID HỆ THỐNG" width="120"></el-table-column>
      <el-table-column label="Actions" width="100">
        <el-button type="primary" size="small" @click="action">
          Action
        </el-button>
      </el-table-column>
    </el-table>

    <!-- Phân trang -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="totalItems"
      style="margin-top: 20px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      filterStatus: null,
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      items: [
        {
          id: 1,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Active",
          balance: "70,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 2,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Pending",
          balance: "20,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"ADS INTEGRITY POLICY",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 3,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Recall",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 4,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Active",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 5,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Active",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 6,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Active",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 7,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Pending",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"ADS INTEGRITY POLICY",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 8,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Recall",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 9,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Active",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
        {
          id: 10,
          account: "Nolimitads",
          note: "Nolimit is the best",
          fee: "5%",
          status: "Active",
          balance: "10,000",
          nguong: "20,000,000",
          nguongcl: "500,000",
          limit: "125,000",
          total: "12,590,000",
          money: "VNĐ",
          role: "Nhà quảng cáo",
          limitset: "5,500,000",
          pttt: "Visa -3156",
          ngaylhd: "13-12-2024",
          kyhan:"21",
          lydokhoa:"",
          loaitk:"Business",
          timezone:"UTC+7",
          rootid:"8566252533115553",
          country:"Việt Nam",
          systemid:"114",
        },
      ],
    };
  },
  computed: {
    filteredData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      return this.items
        .filter(
          (item) =>
            (!this.search ||
              item.account.toLowerCase().includes(this.search.toLowerCase())) &&
            (!this.filterStatus || item.status === this.filterStatus)
        )
        .slice(start, end);
    },
  },
  methods: {
    addAccount() {
      console.log("Add Account");
    },
    ExportToCSV() {
      console.log("Export To CSV");
    },
    reload() {
      console.log("Reload");
    },
    action() {
      console.log("Edit Item");
    },
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    getStatusType(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Pending":
          return "warning";
        case "Recall":
          return "danger";
        default:
          return "";
      }
    },
  },
  mounted() {
    this.totalItems = this.items.length;
  },
};
</script>

<style scoped>

.toolbar {
  margin-bottom: 20px;
  flex-wrap: wrap; /* Cho phép các phần tử tự động xuống dòng */
  align-items: center;
  gap: 10px; /* Khoảng cách giữa các phần tử */
  margin-bottom: 20px;
}

.search-container {
  flex: 1 1 auto; /* Tự động chiếm khoảng trống, ưu tiên hiển thị */
  min-width: 200px; /* Đảm bảo tối thiểu chiều rộng */
}

.tools-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.tools-container > * {
  flex: 0 1 auto; /* Kích thước linh hoạt theo nội dung */
}

.container {
  max-width: 100%; /* Đảm bảo không vượt quá kích thước cửa sổ */
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.el-table {
  width: auto !important; /* Đảm bảo bảng tự điều chỉnh theo nội dung */
}
.el-row {
  flex-wrap: nowrap; /* Đảm bảo hàng không bị gãy dòng */
}
.Refresh_btn,
.Setting_btn {

  font-size: 25px;
  width: 30px;
}
.plus_icon,
.export_icon {
  font-size: 17px;
  margin-right: 5px;
}
.vertical-divider {
  display: inline-block;
  width: 1px;
  height: 32px;
  background-color: #dcdfe6;
  margin: 0 8px;
}
.el-button--primary:hover {
  background-color: #1354d4 !important; /* Màu khi hover */
  border-color: #1354d4 !important;    /* Màu viền khi hover */
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column; /* Đưa các phần tử xuống dòng khi màn hình hẹp */
    align-items: flex-start; /* Căn trái khi xuống dòng */
  }

  .search-container,
  .tools-container {
    width: 100%; /* Các phần tử chiếm toàn bộ chiều ngang */
  }

  .tools-container {
    justify-content: space-between; /* Chia đều không gian giữa các công cụ */
  }
}

@media (max-width: 480px) {
  .toolbar {
    gap: 5px; /* Giảm khoảng cách giữa các phần tử */
  }

  .tools-container > * {
    flex: 1 1 100%; /* Mỗi nút chiếm toàn bộ chiều ngang khi quá hẹp */
    text-align: center; /* Căn giữa nội dung */
  }
}
</style>
