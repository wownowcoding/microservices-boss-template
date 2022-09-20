/*
 * @Description:
 * @Author: 黄博方
 * @Date: 2019-08-08 13:57:02
 * @LastEditors: Rico.刘一飞
 * @LastEditTime: 2019-11-27 14:18:29
 */
export default {
    monthsEnum: {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    },
    weekdayEnum: {
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday",
        "7": "Sunday"
    },
    // 操作
    operation: {
        login: "Login",
        edit: "Edit",
        look_up: "Detail",
        delete: "Delete",
        restart_pass: "Reset password",
        use: "Activated",
        stop: "Deactivate",
        disable: "Disable",
        add: "Add",
        change: "Edit",
        query: "Search",
        change_rule: "Edit rule",
        cancel: "Cancel",
        confirm: "Confirm",
        sure: "Sure",
        audit: "Audit",
        pass: "Approve",
        refuse: "Reject",
        refuse_reason: "Reject reason",
        remove: "Remove",
        process: "Process",
        management: 'Management',
        untie: 'Untie',
        top: 'Top',
        stat: "Statistics"
    },
    // 按钮
    btn: {
        query: "Search",
        back: "Back",
        save: "Save",
        submit: "Submit",
        add: "Add",
        cancel: "Cancel",
        generate: "Generate",
        upload_file: "Upload File",
        upload_img: "Upload Photo",
        output: "Export",
        download: "Download",
        bat_download: "Batch Download",
        search: "search",
        downloadTep: "Download the template",
        reset: "Reaset",
        select_all: "Select All",
        select_all_cancel: "Unselect All",
        select: 'Select',
        close: 'Close',
        prev_step:'Prev Step',
        next_step:'Next Step',
        output_account_list: "Export Sebill",
        output_order_list: "Export Order",
        output_all_order_list: "Export All Order",
        output_dayly_account_list: "Export Bill",
        settle:"Settle",
        exportReport: "Export report",
        setUp: "Set up"
    },
    // 公共
    utils: {
        process_hangUp: "Hang Up",
        process_processed: "Processed",
        process_pending: "Pending",
        audit_result: "Audit Result",
        fee: "merchant service fee",
        query: "Inquiry Condition",
        all: "All",
        preview: "Preview",
        preview_pic: "Preview",
        back: "Back",
        tip: "Notice",
        confirm: "Confirm",
        cancel: "Cancel",
        select_date: "Select Date",
        select_month: "Select Month",
        query_result: "Results",
        query_result_item: "",
        download: "Download",
        operate: "Operation",
        yes: "Yes",
        no: "No",
        record: "Operation Record",
        user: "User",
        result: "Result",
        remarks: "Remarks",
        history: "Operate History",
        reason: "Reason",
        create_time: "Create Time",
        last_update_time: "Last Update Time",
        edit: "Edit",
        delete: "Delete",
        per_deals: "Transaction",
        tips: "Notice",
        boss: "Operation Management System",
        normal: "Normal",
        exception: "Fail",
        none: "None",
        yes: "Yes",
        no: "No",
        time: "Time",
        type: "Type",
        measure_word_pen: "",
        back_home: "Back Home Page",
        last_page: "Previous page",
        send: "Send Verification Code",
        get_again: "Get Data Again",
        chang_lang: "Change Language",
        operate_info: "Operation Information",
        detail: "Details",
        audit: "Audit",
        to: "to",
        tag_option: "Tag Option",
        close_all: "Close All",
        close_other: "Close Other",
        continue: "Continue",
        batchImport: " Batch Import",
        and: "And",
        allStatus: "Full State",
        setting: "Setting",
        selection: "Select",
        latitude: "Latitude",
        longitude: "Longitude",
        logs: "Logs",
        status: "Status",
        image: "Image",
        isp: "Operator",
        amt_stats: "Sum Amount",
        amt_rate: "Fee Rate",
        month: "Month",
        amt: "Amount",
        week_prefix: "",
        year: "years",
        reset_password: "Reset password",
        all_apply: "All",
        apply_time: "Request Time",
        apply_type: "Request Type",
        audit_status: "Review Status",
        pending_audit: "Pending Review",
        receive_qrcode: "QR Code",
        recheck: "Review Again",
        createTime: "Added Time",
        add: "Add",
        upload_success: "Uploaded",
        export_query_result: "Export Results",
        start_date: "Start Date",
        end_date: "End Date",
        tips_delete: "Do you want to delete?",
        selected: "Selected",
        select_all: "Select All",
        loading: "Loading...",
        map_load_failed: "Google Map load failed,Please refresh and try again.",
        operateTime: "Operate Time",
        operatorName: "Operator Name",
        operator_account: "Operator Account",
        operateItem: "Operate Item",
        success: 'Success',
        notification_push: 'Notification Push'
    },
    // 提示
    tips: {
        pass_aypism: "Re-input passwords are different",
        successful_operation: "Successful",
        failed_operation: "Failed",
        chose_role: "Please choose role",
        login_success: "Login Successful",
        upload_fail: "Upload failed",
        invalid_file_type: "File format failed",
        over_limit: "Over limit",
        over_limit_size: "File over limit size",
        remove_confirm:
            "Do you confirm to delete this record? After delete it can not recover.",
        required: "required",
        required_field: "Required fields are not filled",
        length_limit: "No more than {limit} characters",
        upload_img:
            "Support to upload jpg、jpeg、png type photo, each within 5MB",
        upload_type: "Support to upload {type} type file, each within {size}",
        upload_type_img: "Support images of type {type}, each not exceeding {size}",
        upload_type_limit: "Resources of type {type} are supported, and the size of resources does not exceed {size}.",
        comma_split: 'User ";" to add more',
        sms_success: "SMS has been sent out",
        file_required: "Please choose file",
        invalid_vipay: "Please input legal phone number",
        valid_fail: "Verification failed",
        format_unmatched: "Incorrect Format",
        restart_account: "Do you confirm to reset account password?",
        enable: "Do you sure to enable?",
        disable: "Do you sure to disable?",
        discontinuation: " Do you sure to disconnect?",
        sure_delete: "Do you sure to delete?",
        enter_role_name: "Please input role name",
        enter_comp: "Please input complete",
        enter_num_between: "Please input number between {arg0} and {arg1}",
        enter_num_int: "Please input integer number ",
        please_must: 'Please complete all "*" information',
        pleace_enter_reason: "Please input reason",
        please_audit: "Please approve",
        please_refuse_reason: "Please write failed reason",
        areyou_mult_settle: "Do you sure select batch merchant settlement?",
        areyou_mult_settle_audit:
            "Do you sure to batch submit merchant approval?",
        areyou_audit_again: "Do you sure to re-submit approval ?",
        areyou_fund_merhcant:
            "Please confirm this merchant is payment merchant or not?",
        areyou_fund_mult: "Do you sure to submit batch payment?",
        support_type: "Please input English, space and numeric",
        support_type_regular:
            "Please input English, numeric and Half Angle punctuation(·.,-_~ *())",
        support_type_num: "Number ONLY",
        bigger_than: "{arg0} must be bigger than {arg1}",
        less_than: "{arg0} must be less than {arg1}",
        file: "File",
        file_fomat_refuse: "File format is not correct",
        file_fomat_refuse_tips:
            "File format is not correct, Please choose jpg or png",
        file_over: "File size exceeded limit",
        file_over_tips: "The file is too large, Do not exceed 2M.",
        over_limit: "Over Limit",
        no_authority: "You No Authority",
        complete_rules_modification: "Complete rules modification",
        timeout: "Input time can not be less than the current time.",
        handleDisabled:
            "The outage rule takes effect immediately. Users cannot conduct business operations on ViPay APP. Is it deactivated?",
        handleEnabled:
            "The enabling rule takes effect immediately. Users can conduct business operations of ViPay APP. Is it enabled?",
        loadWait: "File not uploaded, please wait",
        email: "Please enter a valid email address.",
        please_confirm_your_operation: "Please confirm your operation?",
        selection_required: "Select at least one​ field",
        coordinate_range:
            "Latitude range -90~90, Longitude​ range -180~180, Up to 6 decimal places",
        time_range_required: "Start time and end time are required",
        time_range_same: "Start time and end time must not be the same",
        time_range_limit: "End time should be later than start time",
        network_error: "Network error",
        result_error: "Response Error",

        confirm_delete_store: "Do you want to delete this outlet information?",
        format_incorrect: "Incorrect Format",
        merchant_store_name_unique: "The outlet name already exists.",
        num_and_limit_six_digit: "Enter number up to 6 digit",
        please_select_store_name: "Select a merchant name",
        store_disabled: "This merchant is disabled.",
        store_in_blacklist: "This merchant is blacklisted.",
        channel_order_no_required: "Channel No is required.",
        merchant_no_in_pay_channel_unique:
            "Each pay channel can has ONLY one Channel No.",
        confirm_operate: 'Do you want to {operateText} "{storeName}"？',
        fill_in_operate_reason: "Provide reason to {operateText}",
        please_enter_package_path: "Enter the path",
        confirm_submit: "This will take effect immediately. Are you sure?",
        currency_unique: "One currency must contain only ONE account.",
        email_unique: "The email already exists",
        phone_unique: "The phone number already exists",
        error: "内容填写有误，请检查",
        submit_enable: "Effective immediately upon successful submission.",
        disable_member : "Are you sure you want to disable【{modal_phoneNumber}】？",
        enable_member: "Are you sure you want to enable【{modal_phoneNumber}】？",
        endDateError: "Only the end time can be edited and is greater than the original time and today.",
        startDateError: "Start time is not allowed to be modified.",
        selectLanguageTip: "Please select the language display switch",
        maximumLengthExceeded: "Maximum length exceeded"
    },
    // 查询
    query: {
        trade_time: "Transaction time",
        trade_fin_time: "Transaction Finish time",
        currency: "Currency",
        payer: "Payer",
        payer_: "Payer",
        payee: "Payee",
        payeeType: "Payee type",
        orderType: "Transaction type",
        tradeType: "Service type",
        trade_status: "Transaction Status",
        tradeNo: "Bill number",
        merchant_tradeNo: "Merchant Order No.",
        trade_way: "Payment type",
        order_status: "Bill status",
        trade_totalAmt: "Transaction amount",
        discountAmt: "Discount amount",
        realAmt: "Final amount",
        serviceAmt: "Fee",
        tmFinished: "Transaction time",
        count: "Total",
        platform_trade_no: "Vipay Order No.",
        pay_status: "Payment Status",
        pay_channel: "Payment Channel",
        Refundchanter: "Refund operator"
    },
    // 表单
    form: {
        update_reason: "Update Reason",
        add_reason: "Add Reason"
    },
    // 记数单位
    unit: {
        items_tiao: "items",
        items_ge: "items",
        items_zhang: "items",
        items_xiang: "items",
        items_bi: "",
    }
};