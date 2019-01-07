<template>
    <div>
        <h1>Bild</h1> 

        <div>
            <div>
                <img :src="image.url" :alt="image.info" class="single-image" />
            </div>

            <div>
                <table>
                    <tr>
                        <td>Namn:</td>
                        <td>{{image.name}}</td>
                    </tr>
                    <tr>
                        <td>Info:</td>
                        <td>{{image.info}}</td>
                    </tr>
                    <tr>
                        <td>URL:</td>
                        <td>
                            <a :href="image.url">{{image.url}}</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiManager } from '@/service/api.js';

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