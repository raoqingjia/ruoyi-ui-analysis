import defaultSettings from '@/settings'

/**
 * defaultSettings   取项目默认配置
 * */
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || '';


/**
 * storageSetting   取本地默认配置
 * 下面state里就是  storageSetting本地默认配置与defaultSettings项目默认配置对比
 * 本地默认配置的判断依据是undefined
 * */
const state = {
  title: '',
  theme: storageSetting.theme || '#409EFF',
  sideTheme: storageSetting.sideTheme || sideTheme,
  showSettings: showSettings,
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
}

const mutations = {
  /**
   * 1、 CHANGE_SETTING第一个入参state，表示的是当前modules里的stats
   * 所以这里定义的key value的格式
   *
   * 2、 CHANGE_SETTING 中的第二个形参是走的对象解构的形式
   * { key, value } 替换 data.key  data.value  有点是简介明了，入参有什么字段
   * 缺点是，定义好了key, value字段就不能变了，万一后续再增加一个参数，这就不好改了
   * 而且函数的调用传参一定得带着key, value不然到这里就报错了这就是为什么hasOwnProperty判断了一下key是否存在
   * */
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

/**
 * 写在前面
 *
 * 1、 先说一下 action 中的 { commit } 写法
 * Vuex 中 使用 Action 处理异步请求时，常规写法如下   actions的方法中第一个参数其实是自带的context，而第二个是数据
 actions:{
   getMenuAction:(context) =>{
      context.commit('SET_MENU_LIST',['承保2','核保2'])
   }
 }
 我们也可以使用如下简化写法，如下
 actions:{
    getMenuAction:({commit}) =>{
        commit('SET_MENU_LIST',['承保2','核保2'])
    }
 }
 简化的写法可以理解为 ：  context.commit  使用变量解构赋值后=>  { commit } = context.commit
 * https://blog.csdn.net/JCzlh/article/details/114587369?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-114587369-blog-129508332.235^v38^pc_relevant_anti_t3_base&spm=1001.2101.3001.4242.1&utm_relevant_index=3
 *
 *
 *
 * 2、  vuex为什么不建议在action中修改state
 * 官方的“叮嘱”，谨记“一定不要在action中修改state，而是要在mutation中修改”
 * Vuex两个最核心的API：dispatch & commit，它们是分别用来提交action和mutation的
 * 我曾对vuex里的commit  dispatch 就很不理解
 * this.$store.state.settings.test = !this.$store.state.settings.test; 也能赋值，页面也是响应式的，为啥还用 actions  mutations
 * 直接修改state时，store中的state能够改变，并且是响应式的，并没有报错。跟commit提交mutation的方式没啥区别。
 * 官方文档的意思是：
 * 直接修改vuex的state确实是可行的，但我们约定不要这么干是为了收敛逻辑，避免某个功能的关注点被分散。
 * 也就是通过mutation函数，我们可以从函数名中读出来一定的功能意图，如果将修改state的操作分散到各个地方，那么当分析代码，或排查问题时，
 * 就需要全局搜索这个state在哪里修改的，打开多个文件，具体到某个区域分析，这就是关注点分散了。
 * 这里就涉及到了具体的源码问题了，不在这里写了网上搜吧
 *
 *
 * 3、 Vuex的确支持声明多个同名的mutation，不过前提是它们在不同的namespace下；action同理
 *  this.$store.commit("SET_SIDEBAR_ROUTERS", routes);
 *  this.$store.dispatch('app/toggleSideBar')   store.dispatch('LogOut').then(() => {})
 *  前一个定义了用的是app模块的，后一个LogOut没定义就直接引用后.then()了，单LogOut全是大写
 *
 *
 *
 * */
const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 设置网页标题
  setTitle({ commit }, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

