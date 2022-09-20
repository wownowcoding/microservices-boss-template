<template>
  <div class="group-wrapper">
		<h3 class="title">{{$t('v3_1_1.chosen')}}</h3>
		<div class="selected-list-wrapper">
			<div v-if="!isMultiple && selectGroup" class="selected-item">
				<span>{{ getGroupName(selectGroup) }}</span>
				<Icon type="md-close" @click.stop="selectGroup = ''" />
			</div>
			<div v-else-if="selectGroup && selectGroup.length" class="selected-item" v-for="item in selectGroup" :key="item">
				<span>{{ getGroupName(item) }}</span>
				<Icon type="md-close" @click.stop="removeGroupItem(item)" />
			</div>
		</div>
		<h3 class="title">{{$t('v3_1_1.userGroupList')}}</h3>
		<div class="businessline-list-wrapper">
			<Button
				v-for="item in businessLineList"
				:type="businessLine === item.code ? 'primary' : 'default'"
				:key="item.code"
				class="business-btn"
				@click.stop="setBusinessLine(item.code)"
			>
				{{item.message}}
			</Button>
		</div>
		<Input v-model="groupName" key="userSearchInput" @on-change="onGroupNameChange" placeholder="请输入搜索内容">
			<Icon type="ios-search" slot="prefix" />
		</Input>
		<div class="group-list-wrapper" v-loading="loading">
			<div class="group-list-inner">
				<div class="group-item" v-if="!isMultiple">
					<RadioGroup v-model="selectGroup" vertical>
						<Radio v-for="(item) in groupList" :key="item.groupNo" :label="item.groupNo">{{item.groupName}}</Radio>
					</RadioGroup>
				</div>
				<div class="group-item" v-else>
					<CheckboxGroup v-model="selectGroup">
						<Checkbox style="display: block;" v-for="(item) in groupList" :key="item.groupNo" :label="item.groupNo">{{item.groupName}}</Checkbox>
					</CheckboxGroup>
				</div>
				<div v-if="groupList.length === 0" class="empty-tips">{{$t('v3_1_1.noData')}}</div>
			</div>
		</div>
  </div>
</template>

<script>
import { tagGroupList } from '@/api/customerCenter/tags';

export default {
	name: 'basic-group',
	props: {
		businessLineOps: {
			type: Array,
			default: () => []
		},
		userLabelNo: {
			type: String,
			default: ''
		},
		isMultiple: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			groupList: [],
			selectGroup: this.isMultiple ? [] : '',
			businessLine: '',
			groupName: '',
			loading: false,
			allGroupCache: []
		}
	},
	computed: {
		businessLineList() {
			return [...this.tagClassifyOps.filter(e => e.code === 'public'), ...this.businessLineOps];
		},
		...Vuex.mapState({
			tagClassifyOps: (state, getter) => getter.enumStateArr('warehouse', 'tagClassify')
		}),
	},
	watch: {
		userLabelNo: {
			immediate: true,
			handler(val) {
				if (this.isMultiple) {
					this.selectGroup = val ? [val] : []
				} else {
					this.selectGroup = val
				}
			}
		},
		selectGroup(val) {
			if (this.isMultiple) {
				this.$emit('change', val.map(e => {
					return {
						groupName: e && this.getGroupName(e) || undefined,
						groupNo: e || ''
					}
				}))
			} else {
        let newVal = val
        if (val.constructor === Array) newVal = newVal[0]
				this.$emit('change', {
					groupName: val && this.getGroupName(val) || undefined,
					groupNo: newVal || ''
				})
			}
		}
	},
	mounted() {
		tagGroupList({ pageSize: 10000 }, {
			success: (res) => {
				const { list } = res
				this.groupList = list.map(e => ({...e, groupName: e.total && `${e.groupName} (${e.total})` || e.groupName}))
				this.allGroupCache = [...list]
        this.$emit('getList', list)
        if (this.isMultiple) {
				  this.$set(this, 'selectGroup', [...this.selectGroup])
        } else {
				  this.$set(this, 'selectGroup', this.selectGroup)
        }
			}}
		)
	},
	methods: {
		removeGroupItem(no) {
			this.selectGroup = this.selectGroup.filter(e => e !== no)
		},
		getGroupName(no) {
      let groupNo = no
      if (groupNo && groupNo.constructor === Array) groupNo = groupNo[0]
			const item = this.allGroupCache.find(e => e.groupNo === groupNo) || {}
			return item.groupName
		},
		setBusinessLine(code) {
			if (this.businessLine === code) {
				this.businessLine = ''
			} else {
				this.businessLine = code
			}
			this.getGorupList()
		},
		setSelectList(list) {
			console.log('setSelectList')
			console.log(list)
			this.selectGroup = list.map(e => e && typeof e === 'object' ? e.groupNo : e)
		},
		onGroupNameChange() {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
			this.timer = setTimeout(() => {
				this.getGorupList()
			}, 300)
		},
		getGorupList() {
			let params = {
				groupName: this.groupName,
				businessLine: this.businessLine,
				pageNum: 1,
				pageSize: 10000
			}
			this.$set(this, 'loading', true)
			tagGroupList(params, {
				success: (res) => {
					const { list } = res
					this.groupList = list
          this.$emit('getList', list)
				}}
			).finally(() => {
				this.$set(this, 'loading', false)
			});
		}
	}
}
</script>

<style lang="stylus" scoped>
.group-list-wrapper {
	max-height: 200px;
	overflow: scroll;
}
.title {
	font-size: 14px;
	margin: 10px 0;
}
.group-wrapper {
	white-space: normal;
	max-width: 400px;
	min-width: 300px;
}
.selected-list-wrapper {
	display: flex;
	flex-wrap: wrap;
	padding: 6px 0;
	.selected-item {
		display: flex;
		padding: 5px 15px 6px;
		margin-bottom: 4px;
		margin-right: 4px;
		border-radius: 4px;
		border: 1px solid #dcdee2;
		font-size: 12px;

		>>> .ivu-icon {
			cursor pointer;
		}
	}
}

.businessline-list-wrapper {
	margin: 10px 0;
	.business-btn {
		margin-right: 4px;
		margin-bottom: 4px;
	}
}
.empty-tips {
	text-align: center;
	color: #555;
	padding: 5px 0;
}
</style>
