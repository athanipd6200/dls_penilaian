<template>
    <div class="container w-80 mx-auto my-20 px-6 py-6 shadow">
        <h1 class="text-pink-600 font-bold font-sans text-4xl text-center">Login</h1>
        <div class="h-0.5 bg-gray-200 w-36 mx-auto mt-2.5"></div>
        <form action="" method="post">
            <div class="flex flex-col my-5">
                <label class="my-2" for="uname">Username</label>
                <input type="text" id="uname" name="uname" class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100 text-pink-500" />
                <label class="my-2" for="psw">Password</label>
                <input type="password" id="psw" name="psw" class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100 text-pink-500" />
            </div>
            <div class="text-center mt-3">
                <button type="reset" class="px-7 py-2 mx-2 font-semibold text-gray-800 bg-gray-100 rounded">Reset</button>
                <button type="submit" class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded ">Submit</button>
            </div>
        </form>
    </div>
 </template>

<script>
    import axios from 'axios';
    export default {
        name : "LoginLayout",
        data () {
            return {
                form: {
                  email: '',
                  password: '',
                  device_name: 'browser',
                },
                multiLine: true,
                snackbar: false,
                isLoading: false,
                teksSnackbar: "",
                warnaSnackbar: "",
                valid: false,
                e1: false,
                passwordRules: [
                  (v) => !!v || 'Password is required',
                ],
                emailRules: [
                  (v) => !!v || 'E-mail is required',
                ],
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