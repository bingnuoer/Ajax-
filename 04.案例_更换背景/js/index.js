/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */

// 1. 选择图片上传，设置body背景
// 监听上传图片按钮的改变事件
document.querySelector('.bg-ipt').addEventListener('change',e => {
    // 选择图片文件
    // console.log(e.target.files[0]);
    // 上传到服务器
    // 修改图片格式位表单格式
    const fd = new FormData()
    // fd.append('img',图片文件对象)
    fd.append('img',e.target.files[0])

    axios({
        url:'http://hmajax.itheima.net/api/uploadimg',
        method:'POST',
        data:fd

    }).then(result => {
        // console.log(result);
        const imgUrl = result.data.data.url
        // 图片url填充网页背景图片样式上 显示
        document.body.style.backgroundImage = `url(${imgUrl})`

        // 图片url地址保存到本地
        // localStorage.设置值('给保存的数据起的名',要保存的数据)
        localStorage.setItem('bgImg',imgUrl)
    })
})
// 3. 网页运行后，"获取"本地图片url网址使用
const bgImg = localStorage.getItem('bgImg')
console.log(bgImg);

// 本地有图片url,把本地存的背景图设置给网页背景
// 本地没有图片url，就不执行这段代码
bgImg && (document.body.style.backgroundImage = `url(${bgImg})`)