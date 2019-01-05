<template>
	<div id="app">
		<nav>
			<router-link to="/">Start</router-link> |
			<router-link to="/signin">Logga in</router-link> |
			<router-link to="/about">Om</router-link>
		</nav>

		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>