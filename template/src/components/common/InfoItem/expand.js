/*
 * @Description:
 * @Author: Rico.刘一飞
 * @Date: 2019-01-10 10:00:35
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-07-23 11:38:44
 */


export default {
    name: 'InfoItem-expand',
    functional: true,
    props: {
        params: Object,
        render: Function
    },
    render: (h, ctx) => {
        const {params, render} = ctx.props;
        return render(h, params);
    }
};
