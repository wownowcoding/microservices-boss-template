<template>
  <!-- 单日期选择 -->
  <DatePicker
    @on-change="(value)=>{ datePickerChange(value) }"
    :start-date="item.startDate"
    :options="getDatePickerOptions(item)"
    v-model="datePickerValue"
    :format="item.format"
    :disabled="!!item.disabled"
    :type="item.type || 'date'"
    :placeholder="$t('v3_1_1.pleaseSelectADate')"
  />
</template>

<script>
export default {
  name: 'form-date-picker',
  props: {
    value: {
      type: [Array, String],
      default: () => ''
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      datePickerValue: this.value
    }
  },
  watch: {
    datePickerValue(val) {
      const datePickerValueType = typeof val;
      const valueType = typeof this.value;
      if (typeof val === 'string' && val !== this.value || datePickerValueType !== valueType) {
        return this.$emit('input', val);
      }
      
      if (Array.isArray(val)) {
        if (!Array.isArray(this.value)) {
          return this.$emit('input', val);
        }
      }
      if (JSON.stringify(val) !== JSON.stringify(this.value)) {
        return this.$emit('input', val);
      }
    },
    value(val) {
      const datePickerValueType = typeof this.datePickerValue;
      const valueType = typeof val;
      if (typeof val === 'string' && val !== this.datePickerValue || datePickerValueType !== valueType) {
        return this.$set(this, 'datePickerValue', val);
      }
      
      if (Array.isArray(val)) {
        if (!Array.isArray(this.datePickerValue)) {
          return this.$set(this, 'datePickerValue', val);
        }
      }
      if (JSON.stringify(val) !== JSON.stringify(this.datePickerValue)) {
        return this.$set(this, 'datePickerValue', val);
      }
    }
  },
  computed: {
    currentTime() {
      return new Date();
    },
    dateOption() {
      return {
        shortcuts: [{
          text: this.$t('v3_1_1.nowadays'),
          value: () => this.todayDateForm[1]
        }, {
          text: this.$t('v3_1_1.yesterday'),
          value: () => this.yesterdayDateForm[1]
        }, {
          text: this.$t('v3_1_1.theDayBeforeYesterday'),
          value: () => {
            const dateForm = this.getDateForm(new Date(this.currentTime.valueOf() - (86400000 * 2)));
            const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
            return new Date(`${ymd} 00:00:00`);
          }
        }]
      };
    },
    datePickerOption() {
      // return {
      //   今天: this.todayDateForm,
      //   昨天: this.yesterdayDateForm,
      //   三天: this.threeDayDateForm,
      //   本周: this.oneWeekDateForm,
      //   本月: this.currentMonthDateForm
      // };
      return {
        shortcuts: [{
          text: this.$t('v3_1_1.nowadays'),
          value: () => this.todayDateForm
        }, {
          text: this.$t('v3_1_1.yesterday'),
          value: () => this.yesterdayDateForm
        }, {
          text: this.$t('v3_1_1.nearlyThreeDays'),
          value: () => this.threeDayDateForm
        }, {
          text: this.$t('v3_1_1.thisWeek'),
          value: () => this.oneWeekDateForm
        }, {
          text: this.$t('v3_1_1.thisMonth'),
          value: () => this.currentMonthDateForm
        }]
      };
    },
    todayDateForm() {
      const dateForm = this.getDateForm(this.currentTime);
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      return this.getDateFormResult(new Date(`${ymd} 00:00:00`), this.currentTime);
    },
    yesterdayDateForm() {
      const dateForm = this.getDateForm(new Date(this.currentTime.valueOf() - 86400000));
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      return this.getDateFormResult(new Date(`${ymd} 00:00:00`), new Date(`${ymd} 23:59:59`));
    },
    threeDayDateForm() {
      const threeDateForm = this.getDateForm(new Date(this.currentTime.valueOf() - 259200000));
      const threeYmd = `${threeDateForm[0]}/${threeDateForm[1]}/${threeDateForm[2]}`;
      return this.getDateFormResult(new Date(`${threeYmd} 00:00:00`), this.currentTime);
    },
    oneWeekDateForm() {
      const dayNum = (this.currentTime.getDay() === 0 && 6 || this.currentTime.getDay() - 1) * 86400000;
      const weekDateForm = this.getDateForm(new Date(this.currentTime.valueOf() - dayNum));
      const weekYmd = `${weekDateForm[0]}/${weekDateForm[1]}/${weekDateForm[2]}`;
      return this.getDateFormResult(new Date(`${weekYmd} 00:00:00`), this.currentTime);
    },
    currentMonthDateForm() {
      const dateForm = this.getDateForm(this.currentTime);
      const monthYmd = `${dateForm[0]}/${dateForm[1]}/01`;
      return this.getDateFormResult(new Date(`${monthYmd} 00:00:00`), this.currentTime);
    }
  },
  methods: {
    datePickerChange(val) {
      this.datePickerValue = val;
    },
    getDatePickerOptions(e = {}) {
      if (e?.options?.hotKey) {
        return Object.assign({}, e.options, {...(e.type === 'date' && this.dateOption || this.datePickerOption )});
      }
      return e?.options ?? undefined;
    },
    getDateFormResult(start, end) {
      return [start, end];
    },
    getDateForm(currentTime) {
      //  [0: 年, 1: 月, 2: 日, 3: 时, 4: 分, 5: 秒, 6: 毫秒, 7: 季度]
      return [
        currentTime.getFullYear(),
        currentTime.getMonth() + 1,
        currentTime.getDate(),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        currentTime.getMilliseconds()
      ];
    }
  }
}
</script>