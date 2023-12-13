/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

// 发送请求，获取数据
// 封装函数

// 1.1 获取北京市天气数据
function getCityData(cityCode) {
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode
    }
  }).then(result => {
    console.log(result);
    const wObj = result.data
    // 1.2 数据展示到页面
    // 顶部
    const topStr = `<span class="dateShort">${wObj.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
        </span>`

    const topCity = `<span class="area">${wObj.area}</span>`
    // 插入到标签中
    document.querySelector('.title').innerHTML = topStr
    document.querySelector('.location').innerHTML = topCity

    // 当前天气
    const currentWeather = `
        <div class="tem-box">
            <span class="temp">
            <span class="temperature">${wObj.temperature}</span>
            <span>°</span>
            </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wObj.psPm25}</span>
          <span class="psPm25Level">${wObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${wObj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${wObj.weather}</span>
          </li>
          <li class="windDirection">${wObj.windDirection}</li>
          <li class="windPower">${wObj.windPower}</li>
        </ul>
      </div>
`
    // 插入到标签中
    document.querySelector('.weather-box').innerHTML = currentWeather

    // 今天天气
    const todayWeather = `
        <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${wObj.todayWeather.weather}</span>
          <span class="temNight">${wObj.todayWeather.temNight}</span>
          至
          <span class="temDay">${wObj.todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${wObj.todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${wObj.todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${wObj.todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${wObj.todayWeather.sunsetTime}</span>
        </li>
      </ul>
        `
    document.querySelector('.today-weather').innerHTML = todayWeather

    // 周天气预报
    // 遍历映射数组 map
    const dayForecast = wObj.dayForecast
    const weekLi = dayForecast.map(item => {
      return `
            <li class="item">
            <div class="date-box">
              <span class="dateFormat">今天</span>
              <span class="date">${item.date}</span>
            </div>
            <img src="${item.weatherImg}" alt="" class="weatherImg">
            <span class="weather">${item.weather}</span>
            <div class="temp">
              <span class="temNight">${item.temNight}</span> 至
              <span class="temDay">${item.temDay}</span>
              <span>℃</span>
            </div>
            <div class="wind">
              <span class="windDirection">${item.windDirection}</span>
              <span class="windPower">${item.windPower}</span>
            </div>
          </li>
          `
    }).join('<br>')
    // console.log(weekLi);
    document.querySelector('.week-wrap').innerHTML = weekLi

  }).catch(error => {
    console.log(error);
  })
}

// 城市编码 背景：'110100'
getCityData('110100')

/**
 * 目标2：搜索城市列表
 *  2.1 绑定input事件，获取关键字
 *  2.2 获取展示城市列表数据
 */

// 2.1 绑定input事件，获取关键字
document.querySelector('.search-city').addEventListener('input', e => {
  console.log(e.target.value);

  // 2.2 获取展示城市列表数据
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }
  }).then(result => {
    console.log(result);
    // 数组中的每一个对象映射成相应的结构
    const cityList = result.data.map(item => {
      // 关联城市对应的代码-自定义属性
      return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
    }).join("")
    // console.log(cityList);
    document.querySelector('.search-list').innerHTML = cityList
  }).catch(error => {
    console.log(error);
  })

})


/**
 * 目标3：切换城市天气
 *  3.1 绑定城市点击事件-事件委托，获取城市code值
 *  3.2 调用获取并展示天气的函数
 */

document.querySelector('.search-list').addEventListener('click',e => {
  // 点击了li
  if(e.target.classList.contains('city-item')){
    // 只有点击li才会走这里
    const cityCode = e.target.dataset.code

    console.log(cityCode);

    // 3.2 调用获取并展示天气的函数
    getCityData(cityCode)
  }
  
})