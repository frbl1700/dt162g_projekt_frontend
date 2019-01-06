<template>
	<div id="app">
		<div class="container">
			<page-header />

			<div>
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import PageHeader from '@/components/PageHeader';

export default {
	name: 'App',

	components: {
		PageHeader
	}
}
</script>