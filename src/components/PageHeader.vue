<template>
    <div>
        <div class="logo-container">
            <div class="logo-image">
                <img src="../assets/logo.png" alt="Logo" />
            </div>

            <div class="logo-text">bildbanken.com</div>
        </div>

        <div>
            <nav>
                <div class="menu-container">
                    <div class="left-menu">
                        <ul class="menu">
                            <li><router-link to="/">Start</router-link></li>
                            <li><router-link to="/about">Om</router-link></li>
                            <li><router-link to="/contact">Kontakt</router-link></li>
                        </ul>
                    </div>

                    <div class="right-menu">
                        <ul class="menu">
                            <li v-if="$store.state.isSignedIn">
                                <router-link to="/panel">Min sida</router-link>
                            </li>

                            <li v-if="$store.state.isSignedIn">
                                <a href="#" v-on:click="signOut">Logga ut</a>
                            </li>

                            <li v-if="!$store.state.isSignedIn">
                                <router-link to="/signin">Logga in</router-link>
                            </li>
                        </ul>
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
