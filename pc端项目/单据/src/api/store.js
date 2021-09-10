import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        // userid:'WoBuShiDouHao',
        contextMenu: [
            "row_above",//上方插入一行
            "row_below",//下方插入一行
            "col_left",//左方插入列
            "col_right",//右方插入列
            "---------",
            "remove_row",//删除行
            // "remove_col",//删除列
            "clear_column",//删除列
            "undo",//撤销
            "redo",//恢复撤销
            
            "---------",
            "make_read_only",//只读
            "alignment",//对齐方式
            "copy",//复制
            "cut",//剪切
        ],
        rowHeights: [30,30,30,30,30,30,30,30],
    }
})

export default store