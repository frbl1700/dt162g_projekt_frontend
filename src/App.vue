<template>
	<div id="app">
		<div class="container">
			<div>
				<h2>Bildbank.com</h2>
			</div>

			<div>
				<nav>
					<div class="menu-container">
						<div class="left-menu">
							<ul class="menu">
								<li><router-link to="/">Start</router-link> </li>
								<li><router-link to="/about">Om</router-link></li>

								<li v-if="signedIn">
									<router-link to="/panel">Min sida</router-link>
								</li>
								<li v-else>
									<router-link to="/signin">Logga in</router-link>
								</li>
							</ul>
						</div>

						<div v-if="signedIn" class="right-menu">
							<a href="#" v-on:click="signOut">Logga ut</a>
						</div>
					</div>
				</nav>
			</div>

			<div>
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import { EventBus } from './assets/event-bus.js';

export default {
	name: 'App',

	mounted: function() {
		this.signedIn = this.isSignedIn();
		let that = this;

		EventBus.$on('sign-in', function() {
			that.signedIn = true;
		});
	},

	data: function() {
		return {
			signedIn: false
		}
	},
	
	methods: {
		isSignedIn: function() {
			let id = localStorage.getItem('userId');
			let ok = id && id != undefined && id != null && id.length > 0;

			return ok;
		},

		signOut: function() {
			localStorage.removeItem('userId');
			this.signedIn = false;
			this.$router.push('main');
		}
	}
}
</script>