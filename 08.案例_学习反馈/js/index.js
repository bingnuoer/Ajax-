/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

let pname = ''

// 1.1 设置省份下拉菜单数据
axios({
    url: 'http://hmajax.itheima.net/api/province'
}).then(result => {
    // 获取省份数据
    console.log(result.data.list);

    // 渲染页面标签
    const optionStr = result.data.list.map(pname => {
        return `<option value="${pname}">${pname}</option>`
    }).join('')

    // 插入到页面中
    document.querySelector('.province').innerHTML = `<option value="">省份</option>` + optionStr
})

// 1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单

document.querySelector('.province').addEventListener('change', async e => {
    console.log(e.target.value);
    // 省份数据
    pname = e.target.value

    // 发起请求获取城市数据
    const result = await axios({
        url: 'http://hmajax.itheima.net/api/city',
        params: { pname }
    })

    // 渲染城市标签
    const cnameStr = result.data.list.map(cname => {
        return `<option value="${cname}">${cname}</option>`
    }).join('')

    // 渲染城市数据
    document.querySelector('.city').innerHTML = `<option value="">城市</option>` + cnameStr

    // 清空地区列表
    document.querySelector('.area').innerHTML = `<option value="">地区</option>`
})

// 获取地区数据
document.querySelector('.city').addEventListener('change', async e => {
    console.log(e.target.value);
    // 城市数据
    const cname = e.target.value

    // 请求地区数据
    const result = await axios({
        url: 'http://hmajax.itheima.net/api/area',
        params: { pname, cname }
    })

    // 地区数据
    const aname = result.data.list
    console.log(aname);

    // 获取页面标签
    const aStr = aname.map(item => {
        return `<option value="${item}">${item}</option>`
    }).join('')

    // 渲染数据
    document.querySelector('.area').innerHTML = `<option value="">地区</option>` + aStr
})

// 点击提交按钮，上传数据
document.querySelector('.submit').addEventListener('click', async () => {
    // 获取表单数据
    const form = document.querySelector('.info-form')
    const data = serialize(form, { harsh: true, empty: true })
    console.log(data);

    // 提交表单数据
    // axios({
    //     url: 'http://hmajax.itheima.net/api/feedback',
    //     method:'POST',
    //     params: {
    //         province: data.province,
    //         city: data.city,
    //         area: data.area,
    //         nickname: data.nickname,
    //         feedback: data.feedback
    //     }
    // }).then(result => {
    //     console.log(result);
    //     alert(result.data.message)
    // })

    // 捕获异常
    try {
        // 请求成功
        const result = await axios({
            url: 'http://hmajax.itheima.net/api/feedback',
            method: 'POST',
            data: {
                province: data.province,
                city: data.city,
                area: data.area,
                nickname: data.nickname,
                feedback: data.feedback
            }
        })
        console.log(result);
        alert(result.data.message)
    } catch (error) {
        // 请求失败
        console.log(error.response.data.message);
        alert(error.response.data.message)
    }
})


