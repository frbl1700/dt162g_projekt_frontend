<template>
    <div>
       <h1>Redigera bild</h1>
    </div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Edit',
    props: ['imageId'],

    created: function() {
        this.userId = localStorage.getItem('userId');
        this.apiManager = new ApiManager();

        if (!this.userId) {
            this.$router.push('signin');
            return;
        }
    },

    mounted: function() {

    }
}
</script>
