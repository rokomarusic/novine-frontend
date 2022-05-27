<template>
	<div class="article" v-on:dblclick="onDoubleClick(article.id)">
			<img :src="article.image" alt="" contain style="width: 100px;"/>
			<h3>{{ article.name }}</h3>
			{{ article.text }}
			<br/>
			<button @click="onEdit(article.id)" class="btn">Uredi</button>
			<button @click="onDelete(article.id)" class="btn">Obriši</button>
	</div>
</template>

<script>
export default {
	name: 'Article',
	props: {
		article: Object
	},
	methods: {
		onDelete(id) {
			this.$emit('delete-article', id)
		},
		onEdit(id) {
			this.$emit('edit-article', id)
		}
	}
}
</script>

<style scope>

</style>