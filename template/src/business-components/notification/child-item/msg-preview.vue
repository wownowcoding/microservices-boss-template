<template>
  <div class="msg-preview">
    <h4 class="msg-preview-title">{{ $t('v3_1_1.messageCenter') }}</h4>
    <div class="msg-preview-item">
      <div class="msg-item-content">
        <div class="msg-item-header">
          <img v-if="businessLine === 'YumNow'" src="./images/wm.png" class="msg-icon" />
          <img v-else-if="businessLine === 'TinhNow'" src="./images/ds.png" class="msg-icon" />
          <img v-else-if="businessLine === 'PhoneTopUp'" src="./images/hf.png" class="msg-icon" />
          <img v-else-if="businessLine === 'HotelChannel'" src="./images/jd.png" class="msg-icon" />
          <img v-else-if="businessLine === 'GameChannel'" src="./images/game.png" class="msg-icon" />
          <img v-else-if="businessLine === 'GroupBuy'" src="./images/dg.png" class="msg-icon" />
          <img v-else src="./images/icon.png" class="msg-icon" />
          <h4 class="msg-item-header-title">{{ title }}</h4>
          <span class="msg-time">18:30</span>
        </div>
        <div class="msg-item-text">{{ content }}</div>
        <div class="msg-item-footer">
          <span class="msg-item-footer-text">{{ $t('v3_1_1.seeMore') }}</span>
          <img src="./images/down.png" style="width: 11px; height: 12px" />
        </div>
      </div>
    </div>
    <h4 class="msg-preview-title" style="margin-top: 20px">{{ $t('v3_1_1.messageDetails') }}</h4>
    <div class="msg-preview-info">
      <img v-if="img" class="msg-preview-info-img" :src="img" />
      <div class="msg-preview-info-header">
        <h5 class="msg-preview-header-title">{{ title }}</h5>
        <div class="msg-preview-header-date" v-if="title">2021年7月31日 18:30</div>
      </div>
      <div class="msg-preview-info-content" v-if="content">{{ content }}</div>
      <div class="msg-preview-info-footer" v-if="buttonName">
        <div class="msg-preview-info-button">{{ buttonName }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    businessLine: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    buttonName: {
      type: String,
      default: ''
    },
  },
  methods: {
    selectItem(item) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.msg-preview {
  margin-top: -20px;
  margin-left: 20px;
  width: 375px;
}

.msg-preview-item {
  width: 375px;
  background: #F6F6F6;
  overflow: hidden;
  box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);

  .msg-item-content {
    margin: 10px auto;
    width: 358px;
    height: 154px;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  .msg-item-header {
    position: relative;
    width: 100%;
    height: 66px;

    .msg-icon {
      position: absolute;
      top: 17px;
      left: 13px;
      width: 30px;
      height: 30px;
    }

    .msg-time {
      position: absolute;
      top: 17px;
      right: 16px;
      color: #A3A3A3;
      font-size: 12px;
      line-height: 17px;
    }

    .msg-item-header-title {
      position: absolute;
      top: 50%;
      left: 53px;
      right: 71px;
      color: #5A5A5A;
      font-size: 13px;
      line-height: 19px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-all;
      transform: translateY(-50%);
    }
  }

  .msg-item-text {
    margin: 0 auto 10px auto;
    width: 319px;
    min-height: 45px;
    font-size: 11px;
    font-weight: 300;
    color: #808080;
    line-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .msg-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 330px;
    height: 31px;
    border-top: 1px solid #E6E6E6;
  }

  .msg-item-footer-text {
    font-size: 11px;
    font-weight: 500;
    color: #808080;
  }
}

.msg-preview-info {
  width: 375px;
  box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.msg-preview-title {
  padding: 10px 0;
  font-size: 14px;
  color: #333;
}

.msg-preview-info-header {
  padding: 0 15px;
}

.msg-preview-info-img {
  display: block;
  width: 375px;
  height: 250px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
}

.msg-preview-header-title {
  padding: 17px 0 8px 0;
  font-size: 15px;
  font-weight: 500;
  color: #5A5A5A;
}

.msg-preview-header-date {
  font-size: 12px;
  color: #A3A3A3;
}

.msg-preview-info-content {
  margin: 17px 0;
  padding: 0 15px;
  width: 100%;
  font-size: 13px;
  color: #808080;
  line-height: 19px;
  background-color: #fff;
  word-break: break-all;
}

.msg-preview-info-footer {
  margin-bottom: 10px;
  padding-right: 9px;
  padding: 0 15px;
  width: 100%;
  text-align: right;

  .msg-preview-info-button {
    display: inline-block;
    padding: 0 10px;
    min-width: 130px;
    max-width: 325px;
    height: 45px;
    line-height: 45px;
    background: #F46300;
    border-radius: 7px;
    font-size: 15px;
    color: #fff;
    overflow: hidden;
    text-align: center;
  }
}
</style>
