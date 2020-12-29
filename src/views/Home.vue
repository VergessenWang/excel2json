<template>
  <div class="main-container">
    <header class="page-name">
      <h1>Excel2Json</h1>
      <h2>一个excel文件转换为json文件的简单工具 ❤</h2>
    </header>
    <div
      class="input-excel d-flex align-items-center justify-content-center"
      @click.stop
    >
      <el-upload
        class="upload-excel"
        ref="upload"
        drag
        :multiple="false"
        accept=".xls, .xlsx"
        :file-list="fileList"
        :auto-upload="false"
        :http-request="httpRequest"
        action="#"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>

        <div class="el-upload__tip" slot="tip">
          只支持上传单个.xls或.xlsx文件
        </div>
      </el-upload>
      <el-button
        class="change-button"
        size="small"
        type="success"
        @click="submitUpload"
        >转换为json</el-button
      >
    </div>
    <div class="output-json">
      <json-viewer
        class="json-viewer"
        :value="createJson"
        :expand-depth="4"
        sort
        copyable
      ></json-viewer>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      fileList: [],
      selectFile: {},
      // 生成的json数据
      createJson: {},
      // 复制的json数据
      copyJson: "",
    };
  },
  methods: {
    httpRequest(param) {
      // this.$confirm("触发了submit");
      let file = param.file; // 文件信息
      // console.log("param: ", param);
      // console.log("file: ", file);

      if (!file) {
        // 没有文件
        this.$message.warning("请先上传文件");
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary", // 以字符编码的方式解析
          });
          console.log(workbook);
          // SheetNames 表名数组  Sheets对象 {表名：表数据}
          const exlname = workbook.SheetNames[0]; // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
          // console.log("生成的json", exl);

          this.createJson = { data: exl };
          this.copyJson = JSON.stringify(this.createJson);
        } catch (e) {
          console.log("转换出错了：：");
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style lang="scss">
.main-container {
  // overflow: scroll;
  height: 100vh;
  width: 100vw;
  margin: auto;
  background: #1a164f;
  .page-name {
    // border: #fbb100 double 7px;
    padding: 10px;
    text-align: center;
    h1 {
      color: #fbb100;
      font-size: 50px;
      font-weight: bolder;
      filter: drop-shadow(0px 0px 5px #ffac00);
      letter-spacing: 1px;
    }
    h2 {
      color: #797699;
      letter-spacing: 1px;
      filter: drop-shadow(0px 0px 5px #797699);
    }
  }
  .input-excel {
    // width: 50vw;
    margin-top: 50px;
    .upload-excel {
      .el-upload-dragger {
        background: #262159;
        border: rgb(255, 172, 0) !important;
      }
      .el-upload__text {
        color: #797699;
        em {
          color: #ffac00;
        }
      }
      .el-upload__tip {
        color: #797699;
      }
      a {
        // background: rgba(39, 34, 90, 1);
        &:hover {
          background: #1a164f;
        }
      }
    }
    .change-button {
      background: rgba(255, 172, 0, 0.8);
      border: rgba(255, 172, 0, 0.8);
      // border: solid rebeccapurple 3px;
      margin-left: 50px !important;
      // font-weight: bold;
    }
  }
  .output-json {
    overflow-y: auto;
    height: 50vh;
    width: 80vw;
    margin: auto;
    // padding: 10px;
    border: rgba(39, 34, 90, 1) solid 1px;
    border-radius: 8px;
    .json-viewer {
      background: rgba(39, 34, 90, 1);
      span {
        color: rgba(255, 172, 0, 0.65);
      }
      .jv-object,
      .jv-array {
        // border: yellow solid 3px;
        color: rgba(255, 172, 0, 0.65) !important;
      }
      .jv-ellipsis {
        background: rgba(39, 34, 90, 1);
      }
    }
  }
}
</style
>>
