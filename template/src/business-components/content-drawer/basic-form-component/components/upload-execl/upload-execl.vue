<template>
  <div class="upload-execl">
    <Upload
      ref="upload"
      action=""
      :max-size="1024"
      :before-upload="handleUpload"
      class="display-middle upload-execl-component"
      accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
      <Button v-show="ifImport" :loading="execlLoading || loading" icon="ios-cloud-upload-outline">{{ buttonName || $t('utils.batchImport') }}</Button>
      <span v-if="!!documentFile && showTemplate" class="upload-file-name">{{ documentFile.name }}</span>
    </Upload>
    <a v-if="showTemplate" class="upload-template-download display-middle" :href="templateUrl" target="_blank" :download="downloadName">{{ $t('v2_1_1.downloadTemplate') }}</a>
  </div>
</template>

<script>
import xlsx from 'xlsx';
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    },
      ifImport: {
      type: Boolean,
      default: () => true
    },
    buttonName: {
      type: String,
      default: () => ''
    },
    value: {
      type: Object,
      default: () => undefined
    },
    templateUrl: {
      type: String,
      default: () => ''
    },
    fileType: {
      type: String,
      default: () => 'execl'
    },
    fileFilterKeys: {
      type: [Array, String],
      default: () => []
    },
    showTemplate: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    downloadName() {
      if (this.templateUrl) {
        const urls = this.templateUrl.split('/');
        return urls[urls.length - 1];
      }
      return '';
    }
  },
  data() {
    return {
      file: this.value,
      fileKeys: ['name', 'type', 'size'],
      documentFile: undefined,
      execlLoading: false
    };
  },
  watch: {
    file: {
      deep: true,
      handler(val) {
        this.$nextTick(() => this.$set(this, 'execlLoading', false));
        if (!this.value) {
          this.$emit('input', val);
          return;
        }
        const currentVal = [];
        const valueVal = [];
        this.fileKeys.forEach(e => {
          if (val[e]) {
            currentVal.push([e, val[e]]);
          }
          if (this.value[e]) {
            valueVal.push([e, this.value[e]]);
          }
        });
        if (JSON.stringify(currentVal) !== JSON.stringify(valueVal)) {
          this.$emit('input', val);
        }
      }
    },
    value(val) {
      if (!this.file) {
        this.$set(this, 'file', val);
        return;
      }
      const currentVal = [];
      const valueVal = [];
      this.fileKeys.forEach(e => {
        if (this.file[e]) {
          currentVal.push([e, this.file[e]]);
        }
        if (val[e]) {
          valueVal.push([e, val[e]]);
        }
      });
      if (JSON.stringify(currentVal) !== JSON.stringify(valueVal)) {
        this.$set(this, 'file', val);
      }
    }
  },
  methods: {
    clearFiles() {
      this.$refs.upload.clearFiles();
      this.$set(this, 'documentFile', undefined);
    },
    handleUpload(file) {
      const _this = this
      if (!this.loading && !this.execlLoading) {
        this.execlLoading = true;
        this.$set(this, 'documentFile', file);
        if (this.fileType === 'execl') {
          try {
            const reader = new FileReader();
            reader.onload = e => {
              try {
                const data = new Uint8Array(e.target.result);
                const workbook = xlsx.read(data, {type: 'array'});
                if (workbook.Sheets) {
                  const execlDatasource = {};
                  const titles = {};
                  const rows = {};
                  const fileterCols = ['!margins', '!ref'];
                  Object.keys(workbook.Sheets).forEach(sheet => {
                    if (!execlDatasource[sheet]) {
                      execlDatasource[sheet] = [];
                    }
                    Object.keys(workbook.Sheets[sheet]).forEach(colName => {
                      if (fileterCols.indexOf(colName) === -1) {
                        const rowList = [];
                        const colList = [];
                        colName.split('').forEach(f => /\d/.test(f) && rowList.push(f) || colList.push(f));
                        const rowStr = rowList.join('');
                        const colStr = colList.join('');
                        if (rowStr - 0 === 1) {
                          titles[colStr] = workbook.Sheets[sheet][colName].v;
                        } else {
                          if (!rows[rowStr]) {
                            rows[rowStr] = {};
                          }
                          rows[rowStr][titles[colStr]] = String(workbook.Sheets[sheet][colName].v).replace(/\u200b/g, '');
                        }
                      }
                    });
                    Object.keys(rows).forEach(rowKey => execlDatasource[sheet].push(rows[rowKey]));
                  });
                  if (this.fileFilterKeys && (this.fileFilterKeys.length || typeof this.fileFilterKeys === 'string')) {
                    const datas = [];
                    Object.keys(execlDatasource).forEach(d => {
                      if (Array.isArray(execlDatasource[d])) {
                        execlDatasource[d].forEach(__row => {
                          let obj;
                          if (Array.isArray(this.fileFilterKeys)) {
                            Object.keys(__row).forEach(rowfield => {
                              if (this.fileFilterKeys.indexOf(rowfield) !== -1) {
                                if (!obj) {
                                  obj = {};
                                }
                                obj[rowfield] = __row[rowfield];
                              }
                            });
                          } else {
                            obj = __row[this.fileFilterKeys];
                          }
                          if (obj) {
                            datas.push(obj);
                          }
                        });
                      }
                    });
                    this.$set(this, 'file', datas);
                    return;
                  }
                  this.$set(this, 'file', execlDatasource);
                  _this.$emit('handleUpload', execlDatasource);
                  return;
                }
                this.clearFiles();
              } catch(err) {
                console.log('err: ', err);
                this.clearFiles();
              }
            };
            reader.readAsArrayBuffer(file);
          } catch(err) {
            console.log('err: ', err);
            this.clearFiles();
          }
        } else {
          this.$set(this, 'file', file);
        }
      }
      return false;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .upload-execl {
    width: 100%;
    transition: all .3s;
  }
  .upload-template-download {
    padding-bottom: 10px;
    padding-left: 10px;
  }
  .upload-file-name {
    cursor: pointer;
    padding-left: 20px;
    transition: all .3s;
  }
  .upload-file-name:hover {
    color: #f39322;
    color: var(--md-theme-default-primary-on-background, #f39322);
  }
</style>
<style lang="stylus">
  .ivu-form-item-error {
    .upload-execl {
      padding: 6px 10px 5px 10px;
      border: 0.5px solid #ed4014;
    }
    .upload-execl-component {
      margin-left: 0px;
    }
  }
</style>
