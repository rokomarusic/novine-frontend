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
	<label>Tekst</label>
    <textarea v-model="tekst" name="tekst" placeholder="Tekst" />
	<label>Ključne riječi</label>
	<input type="text" v-model="keywords" name="keywords" placeholder="Ključne riječi" />
	<label>Slika URL</label>
    <input type="text" v-model="slika" name="slika" placeholder="Slika" />
	<label>Datum</label>
    <input type="date" v-model="datum" name="datum" placeholder="Datum" />
	<label>Kategorija</label>
	<select v-model="kategorija" name="kategorija" placeholder="Kategorija">
		<option :key="kategorija.id" v-for="kategorija in kategorije" :value="kategorija.id">
			{{ kategorija.name }}
		</option>
	</select>
    </div>
    <input type="submit" value="Spremi" class="btn btn-block" />
  </form>
</template>

<script>
import moment from 'moment'

export default {
	name: 'AddArticle',
	props: ['kategorije', 'article'],
	data() {
		return {
				naziv: this.article.name,
				tekst: this.article.text,
				slika: this.article.image,
				datum: this.getDate(),
				kategorija: this.article.topicResponse == null ? null : this.article.topicResponse.id,
				keywords: this.article.keywords,
				errors: []
			
		}
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			console.log(this.article)
			
			this.errors = []

			var kwrds_error = false
			var kwrds = this.keywords.split(",")
			kwrds.forEach(e => {
				var spt = e.split("");
				for (let i = 0; i < spt.length; i++) {
					if (!((spt[i] >= '0' && spt[i] <= '9') || (spt[i] >= 'a' && spt[i] <= 'z') || (spt[i] >= 'A' && spt[i] <= 'Z'))) {
						kwrds_error = true
						break
					}
				}
			})

			if (kwrds_error) {
				this.errors.push("Ključne riječi mogu sadržavati sam slova i brojeve i moraju biti odvojene zarezom!")
			}

			if (!kwrds_error && this.naziv && this.tekst) {
				if (this.datum == "Invalid date") {
					this.datum = ''
				}
				this.$emit('add-article', this.article.id, this.naziv, this.tekst, this.slika, this.datum, 1, this.kategorija, this.keywords)
				this.naziv = ''
				this.tekst = ''
				this.slika = ''
				this.datum = ''
				this.kategorija = ''
				this.keywords = ''
			}


			if (!this.naziv) {
				this.errors.push("Molim unesite naziv!")
			}
			if (!this.tekst) {
				this.errors.push("Molim unesite tekst!")			
			}

		},
		getDate() {
			var x = moment(String(this.article.date)).format('YYYY-MM-DD')
			console.log(x)
			return x
		}
	}
} 
</script>