// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {    
            name: Random.string('number', 1),
            cnt_target: 200,
            cnt_lastday: Random.string('number', 2),
            cnt_today: Random.string('number', 2),
            cnt_doing: Random.string('number', 2),
            cnt_finished: Random.string('number', 2),
            score: Random.string('number', 1),
            status: Random.string('number', 1)
            // name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            // title: Random.csentence(5, 30), //  Random.csentence( min, max )
            // thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码 
            // date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}

const data = function() {
    let articles = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {    
            // name: Random.increment(),
            name: Random.string('number', 1),
            cnt_target: 200,
            cnt_lastday: Random.string('number', 2),
            cnt_today: Random.string('number', 2),
            cnt_doing: Random.string('number', 2),
            cnt_finished: Random.string('number', 2),
            score: Random.string('number', 1),
            status: Random.boolean()
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}

// const setIntervalFnc = function() {
//     setInterval(() => { 
//         this.produceNewsData();
//     }, 5000)
// }

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/data', 'post', data);