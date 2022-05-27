<template>
	<SearchArticle @search-article="searchArticle"/>
	<div v-if="showArticleForm">
		<AddArticle :key="showArticleForm" @add-article="addArticle" :kategorije="topics" :article="getArticle()" />
	</div>
    <Articles :key="showArticleForm" :articles="articles" @delete-article="deleteArticle" @edit-article="editArticle"/>
	<button @click="showForm" class="btn">Kreiraj novi članak</button>
	<br />
	<br />
	<br />

	<a href="/sifrarnik">Sifrarnik</a>
</template>

<script>
import Articles from '../components/Articles.vue'
import AddArticle from '../components/AddArticle.vue'
import SearchArticle from '../components/SearchArticle.vue'
import axios from 'axios'

export default {
	name: 'Mainpage',
	components: {
		Articles,
		AddArticle,
		SearchArticle
	},
	data() {
		return {
			articles: [],
			topics: [],
			showArticleForm: false,
			articleId: null
		}
	},
	methods: {
		getArticle() {
			var res = this.articles.find(x => x.id == this.articleId)	
			console.log(res)
			if (res != undefined) {
				return res
			}
			return {"date": "",
				"employeeId": "",
				"image": "",
				"keywords": "",
				"name": "",
				"text": "",
				"topicResponse": {"id": ""}
			}
		},
		async deleteArticle(id) {
			console.log(id)
			axios.delete(`http://localhost:8080/articles/${id}`).then(response => {console.log(response)})
			this.articles = this.articles.filter((article) => article.id !== id)
		},

		async searchArticle(name) {
			console.log(name)
			var matching = []
			await axios.get(`http://localhost:8080/articles/like/${name}`).then(response => {console.log(response); response.data.forEach(x => matching.push(x.id))})
			this.articles = this.articles.filter((article) => matching.indexOf(article.id) !== -1)
		},

		editArticle(id) {
			this.showArticleForm = true
			this.articleId = id
			console.log(id)
		},
		showForm() {
			this.showArticleForm = true
		},

		async addArticle(id, naziv, tekst, slika, datum, zaposlenik, kategorija, keywords) {
			const data = {
				"keywords": keywords,
				"name": naziv,
				"text": tekst,
				"image": slika,
				"date": datum,
				"employeeId": zaposlenik,
				"topicId": kategorija}
			if (id == undefined) {
				axios.post('http://localhost:8080/articles', data).then(response => {console.log(response)})

			} else {
				axios.put(`http://localhost:8080/articles/${id}`, data).then(response => {console.log(response)})
				this.articles = this.articles.filter((article) => article.id !== id)
			}

			this.articles = [...this.articles, data]
			this.showArticleForm = false
		},
	},

	mounted() {
		axios.get('http://localhost:8080/articles').then(response => {console.log(response); this.articles = response.data})
		axios.get('http://localhost:8080/topics').then(response => {console.log(response); this.topics = response.data})
	}
}
</script>