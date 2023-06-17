const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  dict: state => state.dict.dict,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
}
export default getters

/**
 * 1、返回的getters是个对象
 * 2、 sidebar: state => state.app.sidebar,    state 返回的事Vuex中的全部模块下的state
 * 这个语句可以理解是  sidebar: (state) => {  console.log('这里可以执行逻辑')   return state.app.sidebar }
 * 3、使用方式  this.$store.getters.sidebar
 * * */
