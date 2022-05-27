<template>
  <div>
    <hr>
    <h1>Šifrarnik za kategorije</h1>
    <br>
    <div v-if="showTopicForm">
		<AddTopic :key="showTopicForm" @add-topic="addTopic" :topic="getTopic()" />
	</div>
	<Topics :topics="topics"  @delete-topic="deleteTopic" @edit-topic="editTopic"/>
  <button @click="showForm" class="btn">Kreiraj novu kategoriju</button>
  <br>
  <br>
    <router-link to="/">Go Back</router-link>
  </div>
</template>

<script>
import Topics from '../components/Topics.vue'
import AddTopic from '../components/AddTopic.vue'
import axios from 'axios'

export default {
  name: 'NotFound',
  components: {
    Topics,
    AddTopic
  },
  data() {
		return {
			topics: [],
      showTopicForm: false,
      topicId: null
		}
  },
  methods: {
		getTopic() {
			var res = this.topics.find(x => x.id == this.topicId)	
			console.log(res)
			if (res != undefined) {
				return res
			}
			return {"name": "",
				"shortName": "",
			}
		},
    editTopic(id) {
			this.showTopicForm = true
			this.topicId = id
			console.log(id)
		},
    async addTopic(id, name, shortName) {
			const data = {
        "id": id,
				"name": name,
				"shortName": shortName
      }
			if (id == undefined) {
				await axios.post('http://localhost:8080/topics', data).then(response => {console.log(response.data.id); data.id = response.data.id})
			} else {
				axios.put(`http://localhost:8080/topics/${id}`, data).then(response => {console.log(response)})
				this.topics = this.topics.filter((topic) => topic.id !== id)
			}

			this.topics = [...this.topics, data]
			this.showTopicForm = false
		},
    showForm() {
			this.showTopicForm = true
		},
    async deleteTopic(id) {
			console.log(id)
			axios.delete(`http://localhost:8080/topics/${id}`).then(response => {console.log(response)})
			this.topics = this.topics.filter((topic) => topic.id !== id)
		},


  },
	mounted() {
		console.log("******************")
		axios.get('http://localhost:8080/topics').then(response => {console.log(response); this.topics = response.data})
	}
  
}
</script>
