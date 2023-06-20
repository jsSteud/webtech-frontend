<!--
TODO: Base URLS in ENV VAR-->

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
                            <a class="nav-link" href="http://localhost:8080">Trainingplan</a>

                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:8080/getall">Alle Übungen</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:8080/createnew">Neue Übung</a>
                        </li>
                    </ul>
                    <!-- Left links -->
                </div>
                <!-- Collapsible wrapper -->


                    <!-- Avatar -->
<!--                    <div class="dropdown">-->
<!--                        <a-->
<!--                            class="dropdown-toggle d-flex align-items-center hidden-arrow"-->
<!--                            href="#"-->
<!--                            id="navbarDropdownMenuAvatar"-->
<!--                            role="button"-->
<!--                            data-mdb-toggle="dropdown"-->
<!--                            aria-expanded="false"-->
<!--                        >-->
<!--                            <img-->
<!--                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"-->
<!--                                class="rounded-circle"-->
<!--                                height="25"-->
<!--                                alt="Black and White Portrait of a Man"-->
<!--                                loading="lazy"-->
<!--                            />-->
<!--                        </a>-->
<!--                        <ul-->
<!--                            class="dropdown-menu dropdown-menu-end"-->
<!--                            aria-labelledby="navbarDropdownMenuAvatar"-->
<!--                        >-->
<!--                            <li>-->
<!--                                <a class="dropdown-item" href="#">My profile</a>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <a class="dropdown-item" href="#">Settings</a>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <a class="dropdown-item" href="#">Logout</a>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
                </div>
                <!-- Right elements -->
        </nav>
        <!-- Navbar -->
    </nav>
  <router-view/>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=League+Spartan&display=swap');


#app {
    font-family: 'League Spartan', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

body{
    margin: 0;
}

</style>
<script setup>
</script>