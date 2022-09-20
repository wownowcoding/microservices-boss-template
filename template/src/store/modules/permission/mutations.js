/*
 * @Description: 
 * @Author: 管铭钊
 * @Date: 2019/11/11
 */
import { buryPerformance } from "@/plugins/Statistics";

export default {
    SET_MAIN_MENU(state, data) {
        state.mainMenu = data
    },
    SET_SUB_MENU(state, data) {
        state.subMenu = data
        buryPerformance()
    },
    GET_USER_AUTH(state, data) {
        state.userAuth = data
    }
}
