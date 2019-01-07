<template>
    <div>
        <h1>Min sida</h1>

        <div>
            <p>
                <router-link to="/upload" class="button">Ladda upp ny bild</router-link>
            </p>
        </div>

        <hr />

        <div>   
            <h3>Dina bilder</h3>

            <div class="images">
                <div v-for="image in images" :key="image._id">
                    <div>
                        <router-link :to="{ name: 'Edit', params: { imageId: image._id  }}">Redigera bild</router-link>
                    </div>
                    <div>
                        <img :src="image.url" :alt="image.info" :title="image.info" />
                    </div>
                </div>
            </div>

            <div>
                <p v-if="images.length == 0">
                    <em>Bilder saknas</em>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '@/service/api.js';

export default {
    name: 'Panel',

    created() {
        this.apiManager = new ApiManager();
        
        if (!this.$store.state.isSignedIn) {
            this.$router.push('/');
        }
    },

    mounted() {
        this.loadImages();
    },

    data() {
        return {
            images: []
        }
    },

    methods: {
        loadImages() {
            this.images = [];
            let that = this;

            this.apiManager.getImagesByUser(this.$store.state.userId, function(data) {
                if (data && data.length > 0) {
                    that.images = data;
                }
            });
        }
    }
}
</script>