<template>
    <div>
        <div>
            <h1>Redigera bild</h1>

            <p>
                <router-link to="/panel">Tillbaka</router-link>
            </p>
        </div>

        <hr />

        <div>
            <div class="row"> 
                <div>
                    <img :src="image.url" :alt="image.info" class="single-image" />

                    <p>
                        <a href="javascript:;" v-on:click="deleteImage">Ta bort bild</a>
                    </p>
                </div>

                <div>
                    <form method="post" @submit.prevent="submitForm">
                        <div class="form-group">
                            <label>Info/Text</label>
                            <textarea rows="3" v-model="image.info"></textarea>
                        </div>

                        <div class="form-group">
                            <label>Nyckelord (Separera med kommatecken)</label>
                            <input type="text" v-model="image.tags" />
                        </div>

                        <div class="form-group">
                            <button type="submit">Spara ändringar</button>
                        </div>

                        <div class="form-group">
                            <span v-show="showSaveInfo" id="save-info">Informationen uppdaterades</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Edit',
    props: ['imageId'],

    data() {
        return {
            image : {
                imageId: '',
                url: '',
                info: '',
                tags: ''
            },

            showSaveInfo: false
        }
    },

    created() {
        this.apiManager = new ApiManager();

        if (!this.$store.state.isSignedIn) {
            this.$router.push('/');
        }
    },

    mounted() {
        var that = this;

        this.apiManager.getImage(this.imageId, function(result) {
            if (result && result._id) {
                that.setImage(result);
            }
        });
    },

    methods: {
        redirectToPanel() {
            this.$router.push('/panel');
        },

        setImage(data) {
            this.image.imageId = data._id;
            this.image.url = data.url;
            this.image.info = data.info;
            this.image.tags = data.tags;
        },

        deleteImage() {
            var that = this;
            var conf = confirm('Ta bort bild?');

            if (conf) {
                this.apiManager.deleteImage(this.imageId, this.$store.state.userId, function(success) {
                    if (success) {
                        that.redirectToPanel();
                    }
                });
            }
        },

        submitForm() {
            var that = this;

            this.apiManager.updateImage(this.imageId, this.$store.state.userId, this.image.info, this.image.tags, function(success) {
                if (success) {
                    that.showSaveInfo = true;
                }
            });
        }
    }
}
</script>