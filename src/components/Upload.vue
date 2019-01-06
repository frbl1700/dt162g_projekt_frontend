<template>
    <div>
        <h3>Ladda upp ny bild</h3>

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

    created: function() {
        this.userId = localStorage.getItem('userId');
        this.apiManager = new ApiManager();

        if (!this.userId) {
            this.$router.push('signin');
            return;
        }
    },

    methods: {
        submitForm: function(e) {
            let form = e.target;
            let formData = new FormData(form);
            let that = this;

            /* Lägg på userid */
            formData.append('user', this.userId);

            /* Ladda upp bild */
            this.apiManager.uploadImage(formData, function(success) {
                if (success) {
                    form.reset();
                    that.$router.push('panel');
                }
            });

            e.preventDefault();
        }
    }
}
</script>
