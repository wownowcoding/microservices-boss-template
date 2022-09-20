import { _import } from '@/router/routerUtils'
import Main from '@/page/layout/index'

/**
 *Created by guanmingzhao on 2019/5/16
 **/
export default [
	{
		path: '/',
		redirect: '/home',
		name: 'mainPageRouter',
		component: Main,
		children: [
			{
				path: '/home',
				title: 'home',
				meta: { title: '工作台' },
				name: 'home',
				component: process.env.NODE_ENV == 'production' ? _import('home/index') : _import('home/dev')
			},
			{
				path: '/403',
				meta: { title: '403-权限不足' },
				name: 'main-error-403',
				component: _import('error/403')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: _import('home/login/index'),
	},
	{
		path: '/upload-static-resources',
		name: 'upload-static-resources',
		component: _import('home/upload-static-resources/index')
	},
	{
		path: '/change-password',
		name: 'change-passwords',
		component: _import('home/change-password/index'),
	},
	{
		path: '/403',
		name: 'error-403',
		component: _import('error/403'),
	},
	{
		path: '/500',
		name: 'error-500',
		component: _import('error/500'),
	},
	{
		path: '/*',
		name: 'error-404',
		component: _import('error/404'),
	},
	{
		// TODO 无效路由要求转发到404
		path: '*',
		redirect: '/',
	}
]