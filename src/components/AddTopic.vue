<template>
	<form @submit="onSubmit" class="add-form">
    <div class="form-control">
		<p v-if="errors.length">
			<ul>
				<li :key="error" v-for="error in errors">{{ error }}</li>
			</ul>
		</p>
    <label>Naziv</label>
    <input type="text" v-model="naziv" name="naziv" placeholder="Naziv" />
	<label>Oznaka</label>
	<input type="text" v-model="oznaka" name="oznaka" placeholder="Oznaka" />
    </div>
    <input type="submit" value="Spremi" class="btn btn-block" />
  </form>
</template>

<script>
export default {
	name: 'AddTopic',
	props: ['topic'],
	data() {
		return {
				naziv: this.topic.name,
				oznaka: this.topic.shortName,
				errors: []

		}
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			console.log(this.topic)
			
			if (this.naziv && this.oznaka) {

				this.$emit('add-topic', this.topic.id, this.naziv, this.oznaka)
				this.naziv = ''
				this.oznaka = ''

			}
			this.errors = []

			if (!this.naziv) {
				this.errors.push("Molim unesite naziv!")
			}
			if (!this.oznaka) {
				this.errors.push("Molim unesite oznaku!")			
			}

		}
	}
} 
</script>