<template>
    <div>
        <h1>Registrera konto</h1>

        <div>
            <form id="register-form" method="post" @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Epost</label>
                    <input type="text" name="email" id="email" v-model="user.email" />
                </div>

                <div class="form-group">
                    <label>Lösenord</label>
                    <input type="password" name="password" id="password" v-model="user.password" />
                </div>

                <div class="form-group">
                    <label>Bekräfta lösenord</label>
                    <input type="password" name="password2" id="password2" v-model="user.password2" />
                </div>

                <div class="form-group">
                    <button type="submit">Registrera konto</button>
                </div>
            </form>
        </div>

        <div>
            <p v-if="errors.length">
                <b>Var vänlig rätta till följande fel:</b>
                <ul class="error">
                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
            </p>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Register',

    created() {
        this.apiManager = new ApiManager();
    },

    data() {
        return {
            errors: [],
            user: {
                email : '',
                password: '',
                password2: ''
            }
        }
    },
    

    methods: {
        redirectToPanel(userId) {
            this.$store.dispatch('setUser', userId);
            this.$router.push('panel');
        },

        submitForm(e) {
            this.errors = [];
            var that = this;
            var success = true;
            
            if (!this.user.email) {
                this.errors.push('Fyll i epost');
                success = false;
            } 
            
            if (!this.user.password || !this.user.password2) {
                this.errors.push('Fyll i lösenord');
                success = false;
            }

            if (!this.validEmail(this.user.email)) {
                this.errors.push('Felaktigt format på epostadress');
                success = false;
            }

            if (success) {
                if (this.user.password !== this.user.password2) {
                    success = false;
                    this.errors.push('Lösenorden stämmer inte överens');
                }
            }

            if (success) {
                this.apiManager.registerUser(this.user.email, this.user.password, function(error, result) {
                    if (!error) {
                        //User skapades
                        that.redirectToPanel(result._id);
                    } else {
                        that.errors.push('E-postadressen är redan upptagen');
                    }
                });
            }

            e.preventDefault();
        },

        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return re.test(email);
        }
    }
}
</script>