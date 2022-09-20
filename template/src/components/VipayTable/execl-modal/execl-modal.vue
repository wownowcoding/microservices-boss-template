<template>
  <Modal v-model="isShow" :mask-closable="false" :closable="false" :title="$t('scriptv1.exportingFile')" class="user-select">
    <div slot="close" />
    <Progress :percent="percent" status="active" />
    <div slot="footer">
      <Button @click="cancel" type="primary">{{ $t('v2_1_1.stop') }}</Button>
    </div>
  </Modal>
</template>

<script>
import { curl } from '@/api/bizApiUtils';
export default {
  props: {
    table: {
      type: Object
    }
  },
  data() {
    const paramsStr = JSON.stringify({
      pageNum: 1,
      pages: 0,
      total: 0
    });
    const execlStr = JSON.stringify({
      fileName: '',
      url: '',
      pageSize: 0,
      tagName: '',
      maxTotal: 0
    });
    return {
      execlStr,
      paramsStr,
      isShow: false,
      params: JSON.parse(paramsStr),
      data: [],
      percent: 0,
      execl: JSON.parse(execlStr)
    };
  },
  computed: {
    titleKeys() {
      return ['title', 'key', 'render'];
    },
    titles() {
      let __titles = [];
      if (this?.execl?.titles) {
        __titles = this.execl.titles.filter(e => e.title && (e.key || e.render));
      }
      if (!__titles.length) {
        const cols = this?.table?.cols ?? [];
        __titles = cols.filter(e => e.title && e.key);
      }
      return __titles.map(e => Object.fromEntries(Object.entries(e).filter(t => this.titleKeys.indexOf(t[0]) !== -1)));
    },
    fileName() {
      if (this.execl?.fileName) {
        return this.execl.fileName;
      }
      const routers = this.$route.name.split(':');
      return routers[routers.length - 1];
    },
    pageSize() {
      if (this?.execl?.pageSize && this.table?.page?.pageSize && this?.execl?.pageSize < this.table?.page?.pageSize) {
        return this.table?.page?.pageSize;
      }
      return this.execl.pageSize || (this.table?.page?.pageSize ?? 100);
    },
  },
  watch: {
    isShow(val) {
      if (!val) {
        this.$nextTick(() => this.Util.timeout(() => {
          this.$set(this, 'params', JSON.parse(this.paramsStr));
          this.$set(this, 'execl', JSON.parse(this.execlStr));
          this.$set(this, 'percent', 0);
          this.$set(this, 'data', []);
        }, 1000));
      }
    }
  },
  methods: {
    cancel() {
      this.$set(this, 'isShow', false);
    },
    show(query = {}) {
      const { params = {}, execl, beforeCheck = null } = query;
      if (execl && execl.url) {
        const queries = Object.assign({ pageSize: this.pageSize }, this.params, { ...Object.fromEntries(Object.entries(params).filter(e => e[0] !== 'pageNum' && e[0] !== 'pageSize')) })
        if (beforeCheck && typeof beforeCheck === 'function' && !beforeCheck(params)) {
          return
        }
        this.isShow = true;
        this.$nextTick(() => {
          this.$set(this, 'execl', Object.assign({}, this.execl, execl));
          this.$set(this, 'params', queries);
          this.getDataExcel();
        });
      }
    },
    setResult(data) {
      let { pages, total, list } = data;
      if (!list) {
        list = []
        console.error('导出list为空，请检查是否有误')
      }
      try {
        let index = 0
        const dataList = list.map(e => {
          index += 1
          return this.titles.map(t => {
            try {
              let val = ''
              if (e) {
                if (t.render) {
                  val = t.render(e)
                } else if (t.key === '$tableIndex') {
                  val = index
                } else {
                  val = e[t.key]
                }
              }
              if (val === 0) val = '0'
              return val
            } catch (er) {
              this.errorSay(er);
            }
            return '';
          })
        });
        this.$set(this, 'data', [...this.data, ...dataList]);
        this.$set(this, 'params', Object.assign({}, this.params, {
          pages,
          total
        }));
      } catch (err) {
        this.errorSay(err);
      }
    },
    errorSay(error) {
      console.log('error: ', error)
      if (this.percent === 0) {
        this.cancel();
      }
      this.Util.timeout(() => {
        this.$Modal.error({
          title: this.$t('scriptv1.aac5973aa03611e4109da7cad580203eb')
        });
      }, 500);
    },
    async getDataExcel() {
      let params = { ...this.params, pageSize: 200, pageNum: 1, total: 0 }
      this.data = []
      this.params.total = 0
      this.percent = 0
      const firstData = await curl(params, this.execl.url)
      if (firstData.rspCd === "00000") {
        params.pageNum += 1
        this.data = [...this.data, ...this.getExcelFormatData(firstData.data.list)]
        this.params.total = firstData.data.total
        this.percent = Math.floor(Math.min(100, 100 * (this.data.length / this.params.total)))
        if (this.params.total > this.data.length) {
          this.getLoopDataExcel(params, { ...this.execl })
        } else {
          this.exportData()
        }
      } else {
        this.$Modal.error({
          title: this.$t('scriptv1.aac5973aa03611e4109da7cad580203eb')
        });
        this.cancel();
      }
    },
    async getLoopDataExcel(params, execl, isThree = 1) {
      curl(params, execl.url).then(res => {
        if (res.rspCd === "00000") {
          this.data = [...this.data, ...this.getExcelFormatData(res.data.list)]
          this.percent = Math.floor(Math.min(100, 100 * (this.data.length / this.params.total)))
          if (this.params.total > this.data.length) {
            params.pageNum += 1
            this.getLoopDataExcel(params, execl)
          } else {
            this.exportData()
          }
        } else {
          if (isThree == 3) {
            this.$Modal.confirm({
              title: this.$t('utils.tip'),
              content: this.$t('服务器开小差，是否导出当前的数据？'),
              okText: this.$t('utils.confirm'),
              cancelText: this.$t('utils.cancel'),
              loading: true,
              onOk: () => {
                this.exportData()
              },
              onCancel() {
                this.cancel();
              }
            })
          } else {
            isThree += 1
            this.getLoopDataExcel(params, execl, isThree)
          }
        }
      })
    },
    getExcelFormatData(list) {
      let index = 0
      const dataList = list.map(e => {
        index += 1
        return this.titles.map(t => {
          try {
            let val = ''
            if (e) {
              if (t.render) {
                val = t.render(e)
              } else if (t.key === '$tableIndex') {
                val = index
              } else {
                val = e[t.key]
              }
            }
            if (val === 0) val = '0'
            return val
          } catch (er) {
            this.errorSay(er);
          }
          return '';
        })
      })
      return dataList
    },
    exportData() {
      import('@/utils/Export2Excel.js').then(excel => {
        excel.export_json_to_excel({
          filename: this.fileName,
          header: this.titles.map(e => e.title),
          data: this.data || [],
          autoWidth: true,
          bookType: this.execl.bookType || 'xlsx',
          tagName: this.execl.tagName || ''
        }).finally(() => {
          this.cancel();
        });
      });
    },
  }
}
</script>
