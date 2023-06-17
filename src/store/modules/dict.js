const state = {
  dict: new Array()
}
const mutations = {
  SET_DICT: (state, { key, value }) => {
    if (key !== null && key !== "") {
      state.dict.push({
        key: key,
        value: value
      })
    }
  },
  REMOVE_DICT: (state, key) => {
    try {
      for (let i = 0; i < state.dict.length; i++) {
        if (state.dict[i].key == key) {
          state.dict.splice(i, i)
          return true
        }
      }
    } catch (e) {
    }
  },
  CLEAN_DICT: (state) => {
    state.dict = new Array()
  }
}

const actions = {
  // 设置字典
  setDict({ commit }, data) {
    commit('SET_DICT', data)
  },
  // 删除字典
  removeDict({ commit }, key) {
    commit('REMOVE_DICT', key)
  },
  // 清空字典
  cleanDict({ commit }) {
    commit('CLEAN_DICT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
/**
 * 解释store/modules
 *  1、 modules 四要素 namespaced  state  mutations actions
 *  2、 namespaced:true, 开启命名空间
 *  3、 export default 最后返回的是个对象格式  state  mutations actions 这三个字段也都是对象格式
 *  4、 state 初始化获取值可以去cookies值，也可以取session值，但是页面关闭session就不存在了cookies还在
 *   存cookies的值都是基本对象格式 如 string number boolean 存 session里的多吧都 引用对象格式
 *
 * */
