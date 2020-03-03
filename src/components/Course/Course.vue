<template>
	<div class="course">
		<div class="container clearfix">
			<ul class="coursebox">
				<li v-if='!item.belong' v-for='(item,index) in categoryList' :key='item.id' :class='{active:index===currentIndex}' @click='categoryHandler(index,item.id)'>{{item.name}}</li>
			</ul>
			<div class="courseList">
				<!-- 课程列表 -->
				<div class="detail" v-for='course in courseList' :key='course.id' @click='courseHandler(course.id)'>
					<div class="head">
						<img :src="course.course_img" class="backImg">
					</div>
					<div class="content">
						<p>{{ course.name }}</p>
						<p>{{ course.teacher_description }}</p>
						<div class="content-detail">
							<div>
								<span>学习人数 {{ course.learn_number}}</span>
								<span>
									{{ course.promotion_name }}
								</span>
								<span>￥{{course.promotion_price}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Course',
	data(){
		return {
			categoryList: [],  // 分类列表
			currentIndex: 0,
			categoryId: 0,
			courseList:[]  // 课程列表
		}
	},
	methods:{
		//获取分类列表
		getCategoryList(){
			this.$http.categoryList()
			.then(res=>{
				if (res.error_no === 0) {
					this.categoryList = res.data;
					let firstCategory = {
						id: 0,
						name: '全部',
						category: 0,
						belong: 0
					};
					this.categoryList.unshift(firstCategory)
				}
			})
			.catch(err=>{
				console.log(err)
			})
		},
		//分类列表事件处理
		categoryHandler(val,categoryId){
			this.currentIndex = val;
			this.categoryId = categoryId;
			this.getCourseList();
		},
		//获取课程列表
		getCourseList(){
			this.$http.courseList(this.categoryId)
			.then(res=>{
				if (res.error_no === 0) {
					this.courseList = res.data;

				}
			})
			.catch(err=>{
				console.log(err)
			})
		},
		//课程列表点击事件操作
		courseHandler(id){
			//跳转路由   编程式导航
			this.$router.push({
				name: 'course_detail',
				params:{
					courseId:id
				}
			})
		}
	},
	created(){
		this.getCategoryList();
		this.getCourseList();
	}
}
</script>

<style lang="css" scoped>
.course {
  width: 100%;
  height: 1000px;
  background: #f3f3f3;
}
.coursebox {
  padding: 24px 0;
  font-size: 15px;
  color: #666;
  letter-spacing: 0.41px;
  font-family: PingFangSC-Regular;
  overflow: hidden;
}
ul li {
  float: left;
  margin-right: 20px;
  cursor: pointer;
}

ul li.active {
  color: #00b4e4;
}
.courseList {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.detail {
  float: left;
  width: 248px;
  height: auto;
  margin-right: 16px;
  margin-bottom: 30px;
  position: relative;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 6px 0 #e8e8e8;
  transition: all 0.2s linear;
  cursor: pointer;
}
.detail:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transform: translate3d(0, -3px, 0);
}
.detail:nth-of-type(4n) {
  margin-right: 0;
}
.head {
  width: 100%;

  height: 144px;
}
.detail .head img {
  width: 100%;
  height: 144px;
  position: absolute;
  left: 0;
  top: 0;
}
.detail .head b {
  width: 100%;
  height: 144px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.9;
  background: #56cbc4;
}
.detail .head p {
  position: absolute;
  width: 248px;
  height: 144px;
  left: 0;
  top: 0;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-around;
}
.content {
  width: 248px;

  height: 118px;
  padding-top: 30px;
}
.content p {
  width: 100%;
  height: 39px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  letter-spacing: 0.6px;
  font-family: PingFangSC-Regular;
  overflow: hidden;
}
.content-detail {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.content-detail .span3 {
  position: absolute;
  right: 0;
}
.content-detail .span3 .s {
  text-decoration: line-through;
}
.content-detail .span4 {
  /*margin-left: 100px;*/
  position: absolute;
  right: 0;
  color: #fc0107;
}
.content-detail .span3 .t {
  color: #000;
  margin-left: 5px;
  text-decoration: none !important;
  color: #fc0107;
}
</style>