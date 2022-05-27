import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage'
import NotFound from '../views/NotFound'
import Sifrarnik from '../views/Sifrarnik'

const routes = [
	{
		path: '/',
		name: 'Mainpage',
		component: MainPage
	},
	{
		path: '/sifrarnik',
		name: 'Sifrarnik',
		component: Sifrarnik
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL), routes
})

export default router;