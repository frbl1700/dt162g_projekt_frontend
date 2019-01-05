<template>
    <div>
        <div>
            <form id="login-form" method="post" @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Epost</label>
                    <input type="text" name="Email" id="email" v-model="email" />
                </div>

                <div class="form-group">
                    <label>Lösenord</label>
                    <input type="password" name="Password" id="password" v-model="password"/>
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
                Inte medlem? 
            </p>

            <p> 
                <a href="javascript:;" v-on:click="register">Registrera konto</a>
            </p>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Login',

    created: function() {
        this.apiManager = new ApiManager();
    },

    data: function() {
        return {
            errors : [],
            email: '',
            password: ''
        }
    },
    
    methods: {
        register: function(e) {
            this.$router.push('register');
        },

        signIn: function(userId) {
            localStorage.setItem('userId', userId);
            this.$router.push('panel');
        },

        submitForm: function(e) {
            this.errors = [];
            var that = this;

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
            
            e.preventDefault();
        }
    }
}
</script>