import { createWebHistory, createRouter } from 'vue-router'

import LoginLayout from '../components/layouts/Login'
import MainLayout from '../components/layouts/Main'
import Dashboard from '../components/mains/Dashboard'
import Intro from '../components/mains/Intro'
import NotFound from '../components/mains/NotFound'

const routes = [
		{
			path: "/login",
			name: "Login",
			component: LoginLayout,
			// meta: { auth : false, },
		},
		{
			path: "/",
			name: "Main",
			component: MainLayout,
			// meta: { auth : true },
			children: [
				{
					path: '/dashboard',
					name: 'dashboard',
					// meta: { auth : true },
					component:  Dashboard
					
				},
				{
					path: '/intro',
					name: 'intro',
					// meta: { auth : true },
					component:  Intro
					
				},
				
			]
		},
		{
			path: "/:catchAll(.*)",
			component: NotFound,
		},
		
    ]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router;