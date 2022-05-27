<template>
  <div>
	<table>
		<thead>
		<tr>
          <th scope="col" :key="column" v-for="column in this.columnNames">{{column}}</th>
        </tr>
		</thead>
		<tbody>
			<tr :key="topic.id" v-for="topic in topics">
					<td>{{topic.id}}</td>
					<td>{{topic.name}}</td>
					<td>{{topic.shortName}}</td>
					<td><button @click="onEdit(topic.id)" class="btn">Uredi</button></td>
					<td><button @click="onDelete(topic.id)" class="btn">Obriši</button></td>
			</tr>
		</tbody>
	</table>

  </div>
  <br />
  <br />
</template>

<script>

  export default {
    name: 'Topics',
	props: {
		topics: Array
	},
	data() {
		return {
			columnNames: ['id', 'ime', 'oznaka', 'uredi', 'obriši']
		}
	},
	methods: {
		onDelete(id) {
			this.$emit('delete-topic', id)
		},
		onEdit(id) {
			this.$emit('edit-topic', id)
		}
	},
	emits: ['delete-topic', 'edit-topic']
  }
</script>
<style scoped>
	table,
	td {
		border: 1px solid #333;
	}

	thead,
	tfoot {
		background-color: #333;
		color: #fff;
	}
	.btn {
		background-color: #333;
		color: #fff;
	}
</style>