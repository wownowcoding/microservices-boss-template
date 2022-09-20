import api from '@/api/apiUtil';

// 获取秘钥
const url = `usercenter-boss/password/encryption/factor.do`;
const getKey = async () => {
    const {data} = await api({}, url);
    return data;
}

export default getKey



