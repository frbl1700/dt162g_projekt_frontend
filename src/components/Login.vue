<template>
    <div>
        <h1>Logga in</h1>

        <div>
            <form id="login-form" method="post" @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Epost</label>
                    <input type="text" name="email" id="email" v-model="email" />
                </div>

                <div class="form-group">
                    <label>Lösenord</label>
                    <input type="password" name="password" id="password" v-model="password"/>
                </div>

                <div class="form-group">
                    <button typr="submit">Logga in</button>
                </div>
            </form>
        </div>

        <div>
            <p v-if="errors.length">
                <ul class="error">
                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
            </p>
        </div>

        <div>
            <p>
                Inte medlem? <a href="javascript:;" v-on:click="register">Registrera konto</a>
            </p>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Login',

    created() {
        this.apiManager = new ApiManager();
    },

    data() {
        return {
            errors : [],
            email: '',
            password: ''
        }
    },
    
    methods: {
        register() {
            this.$router.push('register');
        },

        signIn(userId) {
            this.$store.dispatch('setUser', userId);
            this.$router.push('panel');
        },

        submitForm(e) {
            this.errors = [];
            var that = this;

            if (this.email && this.password) {
                this.apiManager.validateUser(this.email, this.password, function(result) {
                    if (result.success && result.userId) {

                        /*
                        *  Anv + lösen korrekt
                        *  Logga in användaren och redirecta
                        */

                        that.signIn(result.userId);
                    } else {
                        that.errors.push('Felaktigt användarnamn eller lösenord');
                    }
                });
            }

            e.preventDefault();
        }
    }
}
</script>