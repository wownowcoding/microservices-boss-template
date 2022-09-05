/**
 * 使用开源的第三方库，再自己进行包装
 * 因为这个库本身要侵入 dom，太恶心了，使用起来也各种难用
 */
import ClipboardClass from 'clipboard';
import { Message } from 'iview';

export const copyString = (copyString, options = {}) => {
  const $mockBtn = document.createElement('button');
  $mockBtn.style = 'display: none';
  const clipboard = new ClipboardClass($mockBtn, {
    text: () => copyString
  });

  const {
    successMsg = window.vm.$t('v3_1_1.copySuccessfully'),
    errorMsg = window.vm.$t('v3_1_1.copyFailed'),
    successTipsContent
  } = options;

  clipboard.on('success', () => {
    Message.success(`${successMsg}: ${successTipsContent || copyString}`)
    clipboard.destroy();
  });

  clipboard.on('error', () => {
    Message.success(errorMsg)
    clipboard.destroy();
  });

  // 模拟点击一下，触发 clipboard
  $mockBtn.click();
  // 移除掉这个 mock dom
  $mockBtn.remove();
};

export const Clipboard = ClipboardClass;