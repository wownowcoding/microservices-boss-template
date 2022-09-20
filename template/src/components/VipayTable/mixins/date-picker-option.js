export default {
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
      const dateForm = this.getDateForm(this.currentTime);
      const threeDateForm = this.getDateForm(new Date(this.currentTime.valueOf() - 259200000));
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      const threeYmd = `${threeDateForm[0]}/${threeDateForm[1]}/${threeDateForm[2]}`;
      return this.getDateFormResult(new Date(`${threeYmd} 00:00:00`), this.currentTime);
    },
    oneWeekDateForm() {
      const dateForm = this.getDateForm(this.currentTime);
      const dayNum = (this.currentTime.getDay() === 0 && 6 || this.currentTime.getDay() - 1) * 86400000;
      const weekDateForm = this.getDateForm(new Date(this.currentTime.valueOf() - dayNum));
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      const weekYmd = `${weekDateForm[0]}/${weekDateForm[1]}/${weekDateForm[2]}`;
      return this.getDateFormResult(new Date(`${weekYmd} 00:00:00`), this.currentTime);
    },
    currentMonthDateForm() {
      const dateForm = this.getDateForm(this.currentTime);
      const ymd = `${dateForm[0]}/${dateForm[1]}/${dateForm[2]}`;
      const monthYmd = `${dateForm[0]}/${dateForm[1]}/01`;
      return this.getDateFormResult(new Date(`${monthYmd} 00:00:00`), this.currentTime);
    }
  },
  methods: {
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