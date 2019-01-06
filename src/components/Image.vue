<template>
    <div>
        <h1>Bild</h1> 

        <div>
            <div>
                <span>{{image.name}}</span>
            </div>

            <div>
                <img :src="image.url" :alt="image.info" class="single-image" />
            </div>

            <div>
                <span>{{image.info}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '../assets/service.js';

export default {
    name: 'Image',
    props: ['imageId'],

    data() {
        return {
            image : {
                imageId: '',
                url: '',
                info: '',
                tags: '',
                fileName: '',
                name: ''
            }
        }
    },

    created() {
        this.apiManager = new ApiManager();
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
        setImage(data) {
            this.image.imageId = data._id;
            this.image.url = data.url;
            this.image.info = data.info;
            this.image.tags = data.tags;
            this.image.fileName = data.fileName;
            this.image.name = data.name;
        },
    }
}
</script>