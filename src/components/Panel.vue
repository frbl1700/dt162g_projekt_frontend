<template>
    <div>
        <h1>Min sida</h1>

        <div>
            <p>
                <router-link to="/upload">Ladda upp ny bild</router-link>
            </p>
        </div>

        <div>   
            <h3>Dina bilder</h3>

            <div class="images">
                <div v-for="image in images" :key="image.id">
                    <div>
                        <router-link :to="{ name: 'Edit', params: { imageId: image._id  }}">Redigera bild</router-link>
                    </div>

                    <img :src="image.url" :alt="image.info" :title="image.info" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Panel',

    created: function() {
        this.userId = localStorage.getItem('userId');
        this.apiManager = new ApiManager();

        if (!this.userId) {
            this.$router.push('signin');
            return;
        }
    },

    mounted: function() {
        this.loadImages();
    },

    data: function() {
        return {
            images: []
        }
    },

    methods: {
        loadImages: function() {
            this.images = [];
            let that = this;

            this.apiManager.getImagesByUser(this.userId, function(data) {
                if (data && data.length > 0) {
                    that.images = data;
                }
            });
        }
    }
}
</script>