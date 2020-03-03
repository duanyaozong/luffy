import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Course from '@/components/Course/Course'
import LightCourse from '@/components/LightCourse/LightCourse'
import Micro from '@/components/Micro/Micro'
import CourseDetail from '@/components/Course/CourseDetail'
import Login from '@/components/Login/Login'
import ShopCart from '@/components/Cart/ShopCart'
// @ 绝对路径 检索到 .....src/
// 如果我们Router当做局部模块使用 一定要Vue.use(Router)
// 以后在组件中  可以通过this.$router  获取Router实例化对象
// 路由信息对象 this.$routes
Vue.use(Router)

export default new Router({
	//1.创建匹配路由组件  2、配置路由信息  3.在router-link中使用
	linkActiveClass:'is-active',
    mode:'history',
	routes: [
		{
			path: '/',
			redirect: {name: 'Home'}
		},
		{
		    path: '/home',
		    name: 'Home',
		    component: Home
		},
		{
			path: '/course',
			name: 'Course',
			component: Course
		},
		{
	      path:'/home/light-course',
	      name:'LightCourse',
	      component:LightCourse
	    },
	    {
	      path:'/micro',
	      name:'Micro',
	      component:Micro
	    },
	    // 课程详情
	    {
	      path:'/course/detail/web/:courseId',
	      name:'course_detail',
	      component:CourseDetail
	    },
	    {
	      path:'/login',
	      name:'Login',
	      component:Login
	    },
	    // 购物车的页面
	    {
	    	path:'/purchase/shopping_cart',
	    	name:'shop_cart',
	    	component:ShopCart
	    }
	]
})
