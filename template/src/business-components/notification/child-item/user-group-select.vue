<template>
  <div class="group-wrapper">
		<h3 class="title">{{$t('v3_1_1.chosen')}}</h3>
		<div v-if="selectGroupName" class="selected-list-wrapper">
			<div class="selected-item">
				<span>{{selectGroupName}}</span>
				<Icon type="md-close" @click.stop="selectGroup = ''" />
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
				<div class="group-item">
					<RadioGroup v-model="selectGroup" vertical>
						<Radio v-for="(item) in groupList" :key="item.groupNo" :label="item.groupNo">{{item.groupName}}</Radio>
					</RadioGroup>
				</div>
				<div v-if="groupList.length === 0" class="empty-tips">{{$t('v3_1_1.noData')}}</div>
			</div>
		</div>
  </div>
</template>

<script>
import { tagGroupList } from '@/api/customerCenter/tags';
export default {
	props: {
		businessLineOps: {
			type: Array,
			default: () => []
		},
		userLabelNo: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			groupList: [],
			selectGroup: '',
			businessLine: '',
			groupName: '',
			loading: false,
			allGroupCache: []
		}
	},
	computed: {
		selectGroupName() {
			return (this.allGroupCache.find(e => e.groupNo === this.selectGroup) || {}).groupName
		},
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
				this.selectGroup = val
			}
		},
		selectGroup(val) {
			this.$emit('change', {
				groupName: this.selectGroupName || '',
				groupNo: val || ''
			})
		}
	},
	mounted() {
		tagGroupList({ pageSize: 10000 }, {
			success: (res) => {
				const { list } = res
				this.groupList = list.map(e => ({...e, groupName: e.total && `${e.groupName} (${e.total})` || e.groupName}))
				this.allGroupCache = [...list]
			}}
		)
	},
	methods: {
		setBusinessLine(code) {
			if (this.businessLine === code) {
				this.businessLine = ''
			} else {
				this.businessLine = code
			}
			this.getGorupList()
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
	padding: 6px 0;
	.selected-item {
		display: flex;
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