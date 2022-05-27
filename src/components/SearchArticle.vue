<template>
	<form @submit="onSubmit" class="add-form">
    <div class="form-control">
    <label>Naziv</label>
    <input type="text" v-model="naziv" name="naziv" placeholder="Pretraži članak po nazivu" />
    </div>
    <input type="submit" value="Pretraži" class="btn btn-block" />
  </form>
</template>

<script>
export default {
	name: 'SearchArticle',
	data() {
		return {
				naziv: ''
		}
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			
			if (this.naziv) {

				this.$emit('search-article', this.naziv)
				this.naziv = ''
			}

		}
	}
} 
</script>