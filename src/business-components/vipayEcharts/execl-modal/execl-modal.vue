<template>
  <Modal v-model="isShow" :mask-closable="false" :closable="false" :title="$t('scriptv1.exportingFile')" class="user-select">
    <div slot="close" />
    <div slot="footer">
      <Button @click="cancel" type="primary">{{ $t('v2_1_1.stop') }}</Button>
    </div>
    <Progress :percent="percent" status="active" />
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
      startStatusEnum: {
        padding: 1,
        start: 2,
        stop: 3
      },
      startStatus: 1,
      params: JSON.parse(paramsStr),
      data: [],
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
    percent() {
      if (!(this?.data?.length && this?.params?.total)) {
        return 0;
      }
      let __percent = ((((this.data.length / this.params.total) * 100).toFixed(2) - 0).toFixed(1) - 0).toFixed(0) - 0;
      return __percent >= 100 && 100 || __percent;
    },
    pageSize() {
      if (this?.execl?.pageSize && this.table?.page?.pageSize && this?.execl?.pageSize < this.table?.page?.pageSize) {
        return this.table?.page?.pageSize;
      }
      return this.execl.pageSize || (this.table?.page?.pageSize ?? 100);
    }
  },
  watch: {
    isShow(val) {
      if (!val) {
        this.$nextTick(() => this.Util.timeout(() => {
          this.$set(this, 'params', JSON.parse(this.paramsStr));
          this.$set(this, 'execl', JSON.parse(this.execlStr));
          this.$set(this, 'percent', 0);
          this.$set(this, 'data', []);
          this.getDataFromResponse = null
        }, 1000));
      }
    }
  },
  methods: {
    cancel() {
      this.startStatus = this.startStatusEnum.padding;
      this.$set(this, 'isShow', false);
    },
    show(query = {}) {
      const { params = {}, execl} = query;
      if (execl && execl.url) {
        this.isShow = true;
        this.$nextTick(() => {
          this.$set(this, 'execl', Object.assign({}, this.execl, execl));
          this.$set(this, 'params', Object.assign({ pageSize: this.pageSize }, this.params, { ...Object.fromEntries(Object.entries(params).filter(e => e[0] !== 'pageNum' && e[0] !== 'pageSize')) }));
          this.$set(this, 'startStatus', this.startStatusEnum.start);
          // 由于有些导出接口并不是list结构，导致在setResult的时候获取list失败，所以要根据res来
          // set fund的时候会undefined
          this.getDataFromResponse = execl.getDataFromResponse || null
          this.getData();
        });
      }
    },
    setResult(data) {
      const { pages, total, list } = this.getDataFromResponse ? this.getDataFromResponse(data) : data;
      try {
        const dataList = list.map(e => this.titles.map(t => {
          try {
            return e && (t.render && t.render(e) || e[t.key] || '');
          } catch(er) {
            this.errorSay(er);
          }
          return '';
        }));
        this.$set(this, 'data', [...this.data, ...dataList]);
        this.$set(this, 'params', Object.assign({}, this.params, {
          pages,
          total
        }));
      } catch(err) {
        this.errorSay(err);
      }
    },
    errorSay(error) {
      console.log('error: ', error)
      this.cancel();
      this.Util.timeout(() => {
        this.$Modal.error({
          title: this.$t('scriptv1.aac5973aa03611e4109da7cad580203eb')
        });
      }, 500);
    },
    async getData() {
      const currentPage = await this.curlStart(this.params);
      if (currentPage) {
        const { pages, total, list, pageNum } = currentPage;
        this.setResult(currentPage);
        if (this?.excel?.maxTotal && total > this?.excel?.maxTotal) {
          this.cancel();
          this.Util.timeout(() => {
            this.$Modal.error({
              title: this.$t('scriptv1.af8208cd1104e781a2c640836c8820cd3')
            });
          }, 500);
        }
        let jobs = [];
        for (let i = pageNum + 1, len = pages; i <= len; i++) {
          if (this.startStatus !== this.startStatusEnum.start) {
            break;
          }
          jobs.push(i);
          if (jobs.length >= 10 || i === len) {
            const rets = await Promise.all(jobs.map(e => this.curlStart(Object.assign({}, this.params, {
              pageNum: e
            }))));
            rets.forEach(e => this.setResult(e));
            jobs.length = 0;
            jobs = [];
          }
          await this.setNextTick();
        }
        await this.setNextTick();
        await new Promise(resolve => this.Util.timeout(() => resolve(), 50));
      }
      if (this.startStatus === this.startStatusEnum.start) {
        import('@/utils/Export2Excel.js').then(excel => {
          excel.export_json_to_excel({
            filename: this.fileName,
            header: this.titles.map(e => e.title),
            data: this.data || [],
            autoWidth: true,
            bookType: "xlsx",
            tagName: this.execl.tagName || ''
          }).finally(() => {
            this.cancel();
          });
        });
      } else {
        this.cancel();
      }
    },
    setNextTick() {
      return new Promise(resolve => this.$nextTick(() => resolve()));
    },
    curlStart(params) {
      return new Promise(resolve => {
        if (this.startStatus === this.startStatusEnum.start) {
          const { pageNum } = params;
          curl(params, this.execl.url, {
            success: page => resolve(page),
            fail: () => {
              resolve();
              this.cancel();
            },
            error: () => {
              resolve();
              this.cancel();
            }
          });
        } else {
          resolve();
        }
      })
    }
  }
}
</script>
