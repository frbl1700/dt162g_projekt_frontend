<template>
    <div>
        <div>
            <h1>Ladda upp ny bild</h1>
            
            <p>
                <router-link to="/panel">Tillbaka</router-link>
            </p>
        </div>

        <hr />

        <div>
            <form method="post" enctype="multipart/form-data" @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Bildfil</label>
                    <input type="file" name="file" id="file" accept="image/*"/>
                </div>

                <div class="form-group">
                    <label>Info/text</label>
                    <textarea rows="4" name="info" id="info"></textarea>
                </div>

                <div class="form-group">
                    <label>Nyckelord (Separera med kommatecken)</label>
                    <input type="text" name="tags" id="tags"/>
                </div>

                <div class="form-group">
                    <button type="submit">Ladda upp bild</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Upload',

    created() {
        this.apiManager = new ApiManager();
        
        if (!this.$store.state.isSignedIn) {
            this.$router.push('/');
        }
    },

    methods: {
        submitForm(e) {
            let form = e.target;
            let that = this;

            if (form.file.value) {
                /* Bygg form-data för JSON */
                let formData = new FormData(form);

                /* Lägg på userid */
                formData.append('user', this.$store.state.userId);

                /* Ladda upp bild */
                this.apiManager.uploadImage(formData, function(success) {
                    if (success) {
                        form.reset();
                        that.$router.push('panel');
                    }
                });
            }

            e.preventDefault();
        }
    }
}
</script>
