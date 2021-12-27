import { mapActions } from "vuex";
// 删除当前页并清空缓存
export default {
	inject: {
		appMainTheme: {
			//函数式组件取值不一样
			default: () => ({})
		}
	},
	methods: {
		...mapActions([
			"delVisitedTabsView"
		]),
		goBackDataPage(routeConfig) {
			/* 删除当前页 */
			const { name, path, fullPath, params, query, meta } = this.$route
			const tag = {
				name, path, fullPath, params, query,
				label: meta.title
			}
			this.appMainTheme.removeCache(tag.fullPath)
			this.delVisitedTabsView(tag).then(() => {
				this.$router.push(routeConfig)
			});
			/* 删除当前页 */
		}
	}
}
