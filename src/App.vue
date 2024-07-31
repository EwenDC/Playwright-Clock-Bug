<template>
  <div id="app">
    <!-- Info button (triggers notification) -->
    <el-tooltip
      effect="dark"
      content="Info Button"
      placement="bottom"
      :open-delay="500"
    >
      <el-button @click="showInfo" data-testid="info">
        <i class="el-icon-info"></i>
      </el-button>
    </el-tooltip>

    <!-- Open dialog button -->
    <el-button @click="dialogVisible = true"
      >Click to open the Dialog</el-button
    >

    <!-- Dialog with select list -->
    <el-dialog title="Dialog" :visible.sync="dialogVisible" width="30%">
      <el-select
        v-model="value"
        placeholder="Select"
        clearable
        data-testid="select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",
    };
  },
  methods: {
    showInfo() {
      this.$notify({
        title: "Information",
        type: "success",
        message: "You clicked on the info button.",
        duration: 5000,
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
