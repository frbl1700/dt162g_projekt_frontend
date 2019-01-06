<template>
    <div>
        <div>
            <h2>Bildbanken.com</h2>
        </div>

        <div>
            <nav>
                <div class="menu-container">
                    <div class="left-menu">
                        <ul class="menu">
                            <li><router-link to="/">Bildbanken</router-link></li>
                            <li><router-link to="/about">Om</router-link></li>

                            <li v-if="$store.state.isSignedIn">
                                <router-link to="/panel">Min sida</router-link>
                            </li>
                            <li v-else>
                                <router-link to="/signin">Logga in</router-link>
                            </li>
                        </ul>
                    </div>

                    <div v-if="$store.state.isSignedIn" class="right-menu">
                        <a href="#" v-on:click="signOut">Logga ut</a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
	
	methods: {
		signOut() {
            this.$store.dispatch('unsetUser');
			this.$router.push('/');
		}
	}
}
</script>
