
<template>
    <div>
        <div>Du är inloggad</div>
        
        <div>
            <form method="post" enctype="multipart/form-data" @submit.prevent="submitForm">

                <div class="form-group">
                    <button type="submit">Ladda upp bild</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Panel',

    created: function() {
        let id = localStorage.getItem('userId');

        if (!id) {
            this.$router.push('signin');
            return;
        }
    },

    data: function() {
        return {
            
        }
    },

    methods: {
        submitForm: function(e) {
            

            e.preventDefault();
        }
    }
}
</script>