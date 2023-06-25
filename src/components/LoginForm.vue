
<template>
    <section class="vh-100">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6 text-black">

                    <div class="px-5 ms-xl-4">
                        <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
                        <span class="h1 fw-bold mb-0"><img src="@/assets/logo.png" style="height: 10vh; margin-top: 5vh"></span>
                    </div>

                    <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                        <form style="width: 23rem;">
                            <h3 v-if="!register" class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>
                            <h3 v-if="register" class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Registrieren</h3>

                            <div class="form-outline mb-4">
                                <input type="email" id="form2Example18" class="form-control form-control-lg" @keyup.enter="login()" />
                                <label class="form-label" for="form2Example18">Username</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" id="form2Example28" class="form-control form-control-lg" @keyup.enter="login()"/>
                                <label class="form-label" for="form2Example28">Password</label>
                            </div>

                            <div class="pt-1 mb-4">
                                <button v-if="!register" class="btn btn-info btn-lg btn-block" type="button" style="background-color: #b71009; border: none" @click="login()" >Login</button>
                                <button v-if="register" class="btn btn-info btn-lg btn-block" type="button" style="background-color: #b71009; border: none; cursor:pointer;" @click="registerFunc()">Registrieren</button>
                            </div>

                            <p v-if="!register">Don't have an account? <a class="link-info" @click="register = true" style="cursor: pointer" id="register">Register here</a></p>
                            <p v-if="register">Log in instead? <a class="link-info" @click="register = false" style="cursor: pointer" >Log In</a></p>

                        </form>

                    </div>

                </div>
                <div class="col-sm-6 px-0 d-none d-sm-block">
                    <img src="@/assets/side-pic.webp"
                         alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'LoginForm',
    components: {

    }, data(){
        return{
            token: [],
            register: false
        }
    }, methods: {
         async login() {

             let username = document.getElementById("form2Example18").value
             let password = document.getElementById("form2Example28").value


             const requestOptions = {
                 method: 'GET',
                 redirect: 'follow',
                 headers: {
                     'Content-Type': 'application/json',
                     'username': username,
                     'password': password
                 }
             }

             await fetch("http://localhost:8081/login", requestOptions)
                 .then(response => response.text())
                 .then(result => {
                     localStorage.gymToken = result;
                 })
                 .catch(error => console.log('error', error))

                window.location.href =  process.env.VUE_APP_BASE_URL_FRONTEND +  "/exercises"
         }, async registerFunc(){
            let username = document.getElementById("form2Example18").value
            let password = document.getElementById("form2Example28").value

            let data = {
                username: username,
                password: password
            }


            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }

            await fetch(process.env.VUE_APP_BASE_URL_BACKEND + "/account", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.log('error', error))


        }
    }
}

</script>


<style>

@media (min-width: 1025px) {
    .h-custom-2 {
        height: 100%;
    }
}

</style>