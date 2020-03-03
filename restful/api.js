import Axios from 'axios'
import VueCookies from 'vue-cookies'

Axios.defaults.baseURL = 'https://www.luffycity.com/api/v1'

const categoryListUrl = '/course_sub/category/list/'
const courseListUrl = '/courses/?sub_category='
const courseDetailUrl ='/coursedetail/?courseid='
const user_shop_cart_url = '/user/shop_cart/create/'
// geetest接口
const captchaCheckUrl = '/captcha_check/'
const loginUrl = '/account/login/'
// 查看购物车
const shop_cart_list_url = '/user/shop_cart/list/'
// 删除购物车
const shop_cart_remove_url = '/user/shop_cart/remove/'
// 更新购物车
const shop_cart_update_url = '/user/shop_cart/update/'

//请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(VueCookies.isKey('access_token')){
        //有问题？
       config.headers.Authorization = VueCookies.get('access_token');
    }
    return config;
    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 菜单列表
export function categoryList(){
	return Axios.get(categoryListUrl).then(res=>res.data)
}

// 课程列表
export function courseList(categoryId){
    return  Axios.get(`${courseListUrl}${categoryId}`).then(res=>res.data)
}

// 课程详情
export function courseDetail(courseId){
    return  Axios.get(`${courseDetailUrl}${courseId}`).then(res=>res.data)
}

export function shopCart(params){
    return Axios.post(`${user_shop_cart_url}`,params).then(res=>res.data)
}

export function geetest(){
    return Axios.get(captchaCheckUrl).then(res=>res.data)
}

export function login(params){
    return Axios.post(`${loginUrl}`,params).then(res=>res.data)
}

//购物车列表的api
export function shopCartList(){
    return Axios.get(shop_cart_list_url).then(res=>res.data)
}

export function shopCartRemove(params){
    return Axios.delete(shop_cart_remove_url,{data:params}).then(res=>res.data)
}

export function shopCartUpdate(params){
    return Axios.put(shop_cart_update_url,params).then(res=>res.data)
}