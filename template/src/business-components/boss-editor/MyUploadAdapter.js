import axios from "axios";
import {upload} from '@/api/file'
/**
 * 自定义上传图片插件
 */
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    data.append("file", await this.loader.file);
    const res = await axios({
      url:`${upload}`,
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      method: "post",
      data,
    });
    console.log(res.data);
    return {
      default:res.data.data,
    };
  }
}

export default MyUploadAdapter;
