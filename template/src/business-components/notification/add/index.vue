<template>
  <div class="notification_box">
    <Form ref="form" :model="formCustom" :rules="ruleCustom" :label-width="160" class="form-data">
      <Card class="add_card" :title='$t("v1.notificationMessage")'>
        <div>
          <!-- 通知类型 -->
          <FormItem :label='`${$t("v2_1_1.notificationType")}：`' prop='messageType' class="input_width">
            <Select v-model="formCustom.messageType">
              <Option :value="item.code" v-for="item in messageType" :key="item.code">{{item.message}}</Option>
            </Select>
          </FormItem>
          <!-- 发送对象 -->
          <FormItem :label='`${$t("v2_1_1.sendTheObject")}：`' prop='recipientType'>
            <CheckboxGroup v-model="formCustom.recipientType">
              <!-- <Checkbox label="all">全部</Checkbox> -->
              <Checkbox :label="item.message" v-for="item in recipientType" :key="item.code"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <!-- 发送时间 -->
          <FormItem :label='`${$t("v2_1_1.sendTime")}：`'>
            时间
          </FormItem>
          <!-- 发送标题 -->
          <FormItem :label='`${$t("v2_1_1.notificationTitle")}：`'>
            <Input v-model="formCustom.zhName" type="textarea" :autosize="{minRows: 3}" :maxlength='titleLen' placeholder="ZH" />
          </FormItem>
          <FormItem>
            <Input v-model="formCustom.enName" type="textarea" :autosize="{minRows: 3}" :maxlength='titleLen' placeholder="EN" />
          </FormItem>
          <FormItem>
            <Input v-model="formCustom.cbName" type="textarea" :autosize="{minRows: 3}" :maxlength='titleLen' placeholder="KH" />
          </FormItem>
          <!-- 发送内容 -->
          <FormItem :label='`${$t("v2_1_1.notificationContent")}：`'>
            <Input v-model="formCustom.zhContent" type="textarea" :autosize="{minRows: 3}" :maxlength='titleLen' placeholder="ZH" />
          </FormItem>
          <FormItem>
            <Input v-model="formCustom.enContent" type="textarea" :autosize="{minRows: 3}" :maxlength='titleLen' placeholder="EN" />
          </FormItem>
          <FormItem>
            <Input v-model="formCustom.cbContent" type="textarea" :autosize="{minRows: 3}" :maxlength='titleLen' placeholder="KH" />
          </FormItem>
        </div>
      </Card>
    </Form>
    <div class="btns">
      <VButton class="btn margin-right-gutter" type="primary" @click="saveAction">{{$t("v2_1_1.submit")}}</VButton>
      <VButton class="btn margin-right-gutter" type="default" @click="$router.back(-1)">{{$t("v2_1_1.return")}}</VButton>
    </div>
  </div>
</template>

<script>
import index from './mixins/index'
export default {
  mixins: [index]
}
</script>

<style lang="stylus" scoped>
.notification_box{
  .input_width{
    width 350px;
  }
  .mini_wid{
    width 100px;
  }
  .btns{
    margin-top 30px;
    text-align center;
    >button{
      padding 8px 0;
    }
  }
}
</style>
