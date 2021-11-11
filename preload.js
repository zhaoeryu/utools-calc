Number.prototype.toFixed = function toFixed(s) {
    let times = Math.pow(10, s)
    let des = this * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
}

window.exports = {
    "calc": {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                if (action.type !== 'regex') {
                    return
                }
                let num = eval(action.payload).toFixed(4)
                callbackSetList([{
                    title: num,
                    description: action.payload + " = " + num
                }])
            },
            // 选择了某个列表项
            select: (action, itemData, callbackSetList) => {
                utools.copyText(itemData.title)
                window.utools.hideMainWindow()
                window.utools.outPlugin()
            },
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            search: (action, searchWord, callbackSetList) => {
                if (!searchWord) {
                    return
                }
                let result = eval(searchWord).toFixed(4)
                callbackSetList([{
                    title: result,
                    description: searchWord + '=' + result
                }])
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "请输入"
        }
    }
}