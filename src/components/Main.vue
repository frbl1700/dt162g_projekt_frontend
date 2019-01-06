<template>
	<div>
		<h1>Sök i bildbanken</h1>

		<div> 
			<form method="get" @submit.prevent="submitForm">
				<div class="form-group">
					<label>Söktext</label>
					<input type="text" v-model="query" />
				</div>

				<div class="form-group">
					<button type="submit">Sök</button>
				</div>
			</form>
		</div>

		<hr />

		<div v-if="queryImages.length > 0">
			<h2>Sökresultat</h2>

			<div v-for="image in queryImages" :key="image._id">
				<img :src="image.url" :alt="image.info" />
			</div>
		</div>

		<div>
			<h2>Senaste bilderna</h2>

			<div v-for="image in allImages" :key="image._id">
				<img :src="image.url" :alt="image.info" />
			</div>

			<div v-if="allImages.length == 0">
				<p>Bilder saknas</p>
			</div>
		</div>
	</div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
	name: 'Main',

	data: function() {
		return {
			allImages: [],
			queryImages: [],
			query: ''
		}
	},

	created: function() {
		this.apiManager = new ApiManager();
	},

	mounted: function() {
		this.loadRecent();
	},

	methods: {
		loadRecent: function() {
			let that = this;
			this.allImages = [];

			this.apiManager.getImages(function(result) {
				that.allImages = result;
			});
		},

		submitForm: function(e) {
			let that = this;
			this.queryImages = [];

			if (this.query) {
				this.apiManager.getImagesByQuery(that.query, function(error, result) {
					if (!error) {
						that.queryImages = result;
					}
				});
			}
	
			e.preventDefault();
		}
	}
}
</script>