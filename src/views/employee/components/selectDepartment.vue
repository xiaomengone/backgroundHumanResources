<template>
  <div class="selectDepartment">
    <el-cascader
      v-model="value"
      :options="departmentList"
      @change="handleChange"
      :props="props"
    >
    </el-cascader>
  </div>
</template>

<script>
import { apiGetDepartment } from "@/api/department";
import { transListToTree } from "@/utils";

export default {
  name: "SelectDepartment",
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      props: {
        children: "children",
        label: "name",
        value: "id",
      },
      departmentList: [],
    };
  },
  methods: {
    // 部门连级选择
    handleChange(val) {
      if (val) {
        this.$emit("input", ...val.slice(-1));
      } else this.$emit("input", null);
    },
  },
  mounted() {
    apiGetDepartment().then((res) => {
      this.departmentList = transListToTree(res, 0);
    });
  },
};
</script>
