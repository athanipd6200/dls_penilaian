<template>
  <!-- component -->
    <div class="bg-white rounded-2xl h-4/5 py-4 px-4 mx-4 shadow-lg grid grid-cols-2 gap-3">
      <div class="w-full rounded-lg  ">
        <img src="https://inacomp.net/wp-content/uploads/revslider/The7-fancy-title-business/rev-person-img.png" class="max-h-full px-15 py-8 relative z-10" alt="">
        <div class="border-4 border-yellow-200 w-full relative top-5 bottom-2 left-2 right-2 z-0 max-h-full"></div>
      </div>
      <div class="w-full rounded-lg ">
        <div class="w-full p-5 mt-10">
            <div class="mb-5">
              <h1 class="font-bold uppercase text-xl mb-5">Beri kami penilaian <br>untuk Meningkatkan Kualitas Pelayanan Kami</h1>
              <p class="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis... <a href="#" class="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i class="mdi mdi-arrow-right"></i></a></p>
            </div>
            <div>
              <div class="inline-block align-bottom">
                <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><router-link :to="{ name: 'penilaian', params: { userId: 123 }}">Beri Nilai</router-link></button>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name : "MainLayout",
        components: {
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