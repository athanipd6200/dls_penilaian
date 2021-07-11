<template>
  <!-- component -->
    <div class="bg-white rounded-2xl dark:bg-gray-700 py-4 px-4 mx-4 shadow-lg">
      <p class="text-4xl mb-4">Bagaimana menurut saudara/saudari mengenai informasi pelayanan yang diberikan <a class="italic">seperti: persyaratan, alur/prosedur, jangka waktu, dan biaya</a></p>
      <star-rating 
        v-model:rating="rating_pertama" 
        :increment="0.5"
        :star-size="90"
        :animate="true" 
        :active-border-color="['#F6546A','#a8c3c0']" 
        :border-width="4" 
        :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" 
        :active-on-click="true" 
        :clearable="true" 
        :padding="3"
        :glow="10" 
        glow-color="#ffd055"
      ></star-rating>
    </div>
    <div class="bg-white rounded-2xl dark:bg-gray-700 py-4 px-4 mx-4 my-4 shadow-lg">
    <p class="text-4xl mb-4">Bagaimana menurut saudara/saudari mengenai fasilitas/sarana pendukung layanan <a class="italic">seperti: persyaratan, alur/prosedur, jangka waktu, dan biayaseperti : ruang tunggu, perpustakaan, tempat parkir, toilet, dan lainnya?</a></p>
      <star-rating 
          v-model:rating="rating_kedua" 
          :increment="0.5"
          :star-size="90"
          :animate="true" 
          :active-border-color="['#F6546A','#a8c3c0']" 
          :border-width="4" 
          :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" 
          :active-on-click="true" 
          :clearable="true" 
          :padding="3"
          :glow="10" 
          glow-color="#ffd055"
        ></star-rating>
    </div>
</template>
<script>
    import axios from 'axios'
    import StarRating from 'vue-star-rating'
    export default {
        name : "MainLayout",
        components: {
          StarRating,
        },
        data () {
            return {
                form: {
                    email: '',
                    password: '',
                    device_name: 'browser',
                },
                rating_pertama: 3,
                rating_kedua: 3,
                feedback: 1,

            }
            },
        methods: {
          getUser(){
            axios.get('/api/user').then(response => {
                this.currentUser = response.data;
                // this.$router.push('/dashboard');
            }).catch(errors => {
                console.log(errors);
            });
          },
          submit () {
            if (this.$refs.form.validate()) {
              this.isLoading = "white"
              // this.$refs.form.$el.submit()
              axios.post("/api/login", this.form).then(response => {
                console.log("Nama token "+response.data.data)
                this.$store.commit('updateToken', response.data.data)
                this.teksSnackbar= "Berhasil login ",
                localStorage.setItem('token', response.data.data)
                this.warnaSnackbar= "primary",
                this.snackbar = true
                this.clear()
                this.$router.push('/dashboard')
              }).catch(errors => {
                console.log(errors.response.data.errors)
                this.errors = errors.response.data.errors
                this.teksSnackbar= "Terjadi Kesalahan : "+JSON.stringify(this.errors),
                this.warnaSnackbar= "red",
                this.snackbar = true
              }).finally(() => {
                this.isLoading = false
              })
            }
          },
          clear () {
            this.$refs.form.reset()
          }
        },
        mounted() {
          // this.getUser();
          if(localStorage.getItem('token')){
            this.$router.push('/dashboard')
          }
        },
    }
</script>
<style scoped>
  #background{
    height: 100;
    color: #000;
  };
  .custom-text{
    font-weight: bold;
    font-size: 1.9em;
    border: 1px solid #cfcfcf;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    color: #999;
    background: #fff;
  };
</style>