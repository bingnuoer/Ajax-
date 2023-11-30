/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
// 1.1 获取用户的数据
axios({
    url:'http://hmajax.itheima.net/api/settings',
    method:'GET',
    params:{
        creator:'波仔'
    }
}).then(result => {
    console.log(result.data.data);
    const userObj = result.data.data;
    // 对象转换成数组
    Object.keys(userObj).forEach(key => {
        // 头像
        if(key === 'avatar'){
            // 设置头像的src属性
            document.querySelector('.prew').src = userObj[key]
        }else if (key === 'gender'){
            // 获取性别单选框 [男radio元素, 女radio元素]
            const gRadioList = document.querySelectorAll('.gender')
            console.log(gRadioList);
            // 获取性别数字 0男1女
            const gNum = userObj[key]
            console.log(gNum);
            // 通过性别数字，作为下标，找到对应性别单选框，设置选中状态
            gRadioList[gNum].checked = true
        }else{
            // 赋予默认内容
            // 通过属性和类名的关系，设置数据回显
            document.querySelector(`.${key}`).value = userObj[key]
        }

    })
})