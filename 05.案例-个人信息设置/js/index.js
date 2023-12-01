/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '播仔'
// 1.1 获取用户的数据
axios({
    url:'http://hmajax.itheima.net/api/settings',
    method:'GET',
    params:{
        creator
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

/**
 * 目标2：修改头像
 *  1.1 获取用户选择的头像信息
 *  1.2 发送请求获取头像url(图片文件转换成form文件)
 *  1.3 获取头像标签渲染url
 * */
// 1.1 获取用户的头像信息
// lable标签扩大选择器范围
document.querySelector('.upload').addEventListener('change',e => {
    console.log(e.target.files[0]);
    // 图片文件转换成form文件
    const fd = new FormData()
    // 请求携带的2个参数，添加到form文件中
    fd.append('avatar',e.target.files[0])
    fd.append('creator',creator)
    // 1.2 发送请求获取头像url(图片文件转换成form文件)
    axios({
        url:'http://hmajax.itheima.net/api/avatar',
        method:'PUT',
        data:fd
    }).then(result => {
        // console.log(result);
        // 1.3 获取头像标签渲染url
        const imgUrl = result.data.data.avatar
        document.querySelector('.prew').src = imgUrl
    })

})

