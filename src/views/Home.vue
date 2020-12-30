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
          只支持上传单个.xls或.xlsx文件，但支持单文件中有多个sheet
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
    <div class="option-container">
      <span>Json展开级数： </span>
      <el-radio-group v-model="jsonDeep" @change="deepChange">
        <el-radio :label="0">0级</el-radio>
        <el-radio :label="1">1级</el-radio>
        <el-radio :label="2">2级</el-radio>
        <el-radio :label="3">3级</el-radio>
        <el-radio :label="4">4级</el-radio>
      </el-radio-group>
    </div>
    <div class="output-json">
      <template v-for="item in resultArr">
        <header
          :key="item.sheetName + '_header'"
          class="d-flex align-items-center justify-content-between"
        >
          <h3 :key="item.sheetName">{{ item.sheetName }}</h3>
          <el-button
            class="suggest-button"
            size="small"
            type="success"
            @click="suggest(item)"
            >生成api建议</el-button
          >
        </header>
        <json-viewer
          :key="item.sheetName + '_data'"
          class="json-viewer"
          :value="item.sheetData"
          :expand-depth="jsonDeep"
          sort
          copyable
        ></json-viewer>
      </template>
    </div>
    <span class="author">author@lian.wang</span>
    <el-dialog
      title="生成api建议"
      :visible.sync="isShowSuggest"
      top="40vh"
      width="30%"
      center
    >
      <el-form class="">
        <el-form-item label="API - Name">
          <el-input v-model="api.name"></el-input>
        </el-form-item>
        <el-form-item label="API - URL (由name翻译生成英文url，需联网)">
          <el-input v-model="api.url"></el-input>
        </el-form-item>
        <el-form-item label="API - Response">
          <el-input v-model="api.response"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="success" @click="isShowSuggest = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import md5 from "blueimp-md5";
import $ from "jquery";
export default {
  data() {
    return {
      fileList: [],
      // 生成的json数据
      resultArr: [],
      // json数据层数
      jsonDeep: 3,
      // 是否显示suggest弹窗
      isShowSuggest: false,
      // 生成的api建议
      api: {
        name: "",
        url: "22",
        response: "33",
      },
      // 百度翻译api的token
      appid: "20201230000659839",
      key: "RSjQTGUnoJgaxpQ1fbcQ",
      salt: new Date().getTime(),
    };
  },
  methods: {
    httpRequest(param) {
      // this.$confirm("触发了吗");
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
          // console.log(workbook);
          // SheetNames 表名数组  Sheets对象 {表名：表数据}
          let result = [];

          workbook.SheetNames.forEach((sheetName) => {
            let exl = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            result.push({
              sheetName: sheetName,
              sheetData: { data: exl },
            });
          });

          this.resultArr = JSON.parse(JSON.stringify(result));
        } catch (e) {
          console.log("转换出错了：：");
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
      this.resultArr = [];
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 更改深度
    deepChange(val) {
      // this.$confirm(val);
      this.submitUpload();
    },
    suggest(val) {
      console.log(val);
      this.api.name = val.sheetName;
      this.translateUrl(this.api.name);
      this.isShowSuggest = true;
    },
    translateUrl(zhText) {
      let vm = this;
      $.ajax({
        url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
        type: "post",
        dataType: "jsonp",
        data: {
          q: zhText,
          appid: this.appid,
          salt: this.salt,
          from: "auto",
          to: "en",
          sign: md5(this.appid + zhText + this.salt + this.key),
        },
        success: function (data) {
          // console.log("翻译返回", data);
          let transResult = data.trans_result[0].dst;
          if (transResult === "undefined") {
            vm.$message.warning("无法获取翻译结果，请自行定义URL");
          }
          vm.api.url = "/" + transResult.split(" ").join("-");
          // console.log("url", vm.api.url);
          // vm.$set(vm.$data, "translatedText", data.translation[0]);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.main-container {
  line-height: 1.5;
  height: 100vh;
  width: 100vw;
  margin: auto;
  background: $body-bg;
  .page-name {
    padding: 10px;
    text-align: center;
    h1 {
      color: $title-yellow;
      font-size: 50px;
      font-weight: bolder;
      filter: drop-shadow(0px 0px 5px $title-filter);
      letter-spacing: 1px;
    }
    h2 {
      color: $main-gray;
      letter-spacing: 1px;
      filter: drop-shadow(0px 0px 5px $main-gray);
    }
  }
  .input-excel {
    margin-top: 50px;
    .upload-excel {
      .el-upload-dragger {
        background: #262159;
        border: $light-yellow !important;
      }
      .el-upload__text {
        color: #797699;
        em {
          color: $title-filter;
        }
      }
      .el-upload__tip {
        color: $main-gray;
      }
      li {
        background: $gray-back;
      }
    }
    .change-button {
      background: $yellow-opc8;
      border: $yellow-opc8;
      margin-left: 50px !important;
      transition: 0.6s;
      &:hover {
        background: $light-green;
      }
    }
  }
  .option-container {
    // border: khaki solid 3px;
    width: 78vw;
    margin: auto;
    margin-top: 10px;
    text-align: right;
    span {
      // vertical-align: center;
      font-size: 12px !important;
      color: $light-yellow;
    }
  }
  .output-json {
    overflow-y: auto;
    height: 50vh;
    width: 80vw;
    margin: auto;
    margin-top: 10px;
    border: $gray-back solid 1px;
    border-radius: 8px;
    header {
      margin: auto 20px;
      margin-right: 0px;
      h3 {
        color: $yellow-opc8;
        text-align: center;
        padding: 10px 0;
      }
      .suggest-button {
        background: $body-bg;
        border: none;
        color: $light-green;
      }
    }

    .json-viewer {
      background: $gray-back;
      span {
        color: $yellow-opc6;
      }
      .jv-object,
      .jv-array {
        color: $yellow-opc6 !important;
      }
      .jv-ellipsis {
        background: $gray-back;
      }
    }
  }
  .author {
    position: fixed;
    right: 10px;
    bottom: 10px;
    color: $yellow-opc8;
    font-size: 12px;
  }
}
</style
>>
