<template>

    <nav>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <!-- Container wrapper -->
            <div class="container-fluid">
                <!-- Toggle button -->
                <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <i class="fas fa-bars"></i>
                </button>

                <!-- Collapsible wrapper -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Navbar brand -->
                    <a class="navbar-brand mt-2 mt-lg-0" href="#">
                        <img
                                src="@/assets/logo.png"
                                height="40"
                                alt="MDB Logo"
                                loading="lazy"
                        />
                    </a>
                    <!-- Left links -->
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
<!--                            TODO: BASE_URL-->
                            <a class="nav-link" href="http://localhost:8080/plan">Trainingplan</a>

                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:8080/exercises">Alle Übungen</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:8080/createnew">Neue Übung</a>
                        </li>
                    </ul>
                </div>

            </div>
            <a style="margin-right: 5vw; color: cornflowerblue; text-decoration: underline; cursor: pointer" @click="logout()">ausloggen</a>
        </nav>
    </nav>

</template>

<script>
export  default {
    name: 'NavBar',
    components: {

    }, data(){
        return{

        }
    }, methods: {
         async logout(){
            await this.removeToken()
             localStorage.removeItem("gymToken")
            window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/login"
        }, async removeToken(){
            console.log(localStorage.gymToken)
            const requestOptions = {
                method: 'PUT',
                redirect: 'follow'
            }

            await fetch(process.env.VUE_APP_BASE_URL_BACKEND + "/removetoken" + "/" + localStorage.gymToken, requestOptions )
                .catch(error => console.log(error))
        }
    }
}
</script>