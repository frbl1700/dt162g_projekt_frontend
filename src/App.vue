<template>
	<div id="app">
		<nav>
			<router-link to="/">Start</router-link> |
			<router-link to="/about">Om</router-link> |
		</nav>

		<router-view />
	</div>
</template>

<script>
import Main from './components/Main';

export default {
	name: 'app',
	components: {
		Main
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
