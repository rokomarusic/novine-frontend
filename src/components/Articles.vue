<template>
	<div :key="article.id" v-for="article in articles">
		<Article :article="article" @delete-article="onDelete(article.id)" @edit-article="onEdit(article.id)" />
	</div>
</template>

<script>
import Article from './Article.vue'

export default {
	name: 'Articles',
	props: {
		articles: Array
	},
	components: {
		Article
	},
	methods: {
		onDelete(id) {
			this.$emit('delete-article', id)
		},
		onEdit(id) {
			this.$emit('edit-article', id)
		}
	},
	emits: ['delete-article', 'edit-article']

}
</script>