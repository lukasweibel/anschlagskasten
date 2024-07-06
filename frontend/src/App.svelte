<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import { api } from "./services/api.js";
  import { onMount } from "svelte";
  import { accessToken } from "./stores/userstore";
  import { common } from "./services/common";

  onMount(async () => {
    api.getAnschlaege();
    if (common.getUrlParameter("stage") == "dev") {
      window.location.href =
        "http://localhost:8080?code=" + common.getUrlParameter("code");
    }
    if (common.getUrlParameter("code")) {
      api.getAccessToken(common.getUrlParameter("code")).then((response) => {
        common.removeQueryParam("code");
        $accessToken = response;
      });
    }
  });
</script>

<div id="container">
  <nav class="navbar">
    <div class="navbar-content">
      <a href="#/"
        ><img src="cevilogo.png" alt="background image" height="60px" /></a
      >
      <div class="nav-links">
        {#if $accessToken}
          <a href="#/anschlagform" class="navbar-button">Erstellen</a>
        {/if}
        {#if !$accessToken}
          <a
            href="https://db.cevi.ch/oauth/authorize?response_type=code&client_id=70AEhO3TpqcvA-9shANbACuhuBR4JZ3eTypJ8HpzaxE&redirect_uri=https://anschlagskasten-web-fd337ce2917a.herokuapp.com&scope=with_roles"
            >Login</a
          >
        {/if}
      </div>
      {#if common.getUrlParameter("mode") == "advanced"}
        <div class="nav-links">
          <a href="#/abonnieren" class="navbar-button">Abonnieren</a>
        </div>
      {/if}
    </div>
  </nav>

  <div id="content">
    <Router {routes} />
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .navbar {
    flex: 0 0 auto;
    min-height: 60px;
    border-bottom: black solid 2px;
    background-color: rgb(166, 40, 52);
    display: flex;
    justify-content: flex-start; /* Align content to the left */
    align-items: center;
  }

  .navbar-content {
    display: flex;
    align-items: center;
  }

  .nav-links {
    display: flex;
    align-items: center;
    margin-left: 10px; /* Add a small left margin */
  }

  a {
    color: black;
    font-size: 36px;
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: none;
  }

  #content {
    flex: 1 1 auto; /* Allow the content to grow and shrink as needed */
    overflow-y: auto; /* Enable vertical scrolling when necessary */
  }

  @media only screen and (max-width: 768px) {
    a {
      font-size: 30px;
    }

    #container {
      border: solid black 2px;
      display: flex;
      flex-direction: column;
      min-height: 600px;
    }
  }

  @media only screen and (min-width: 768px) {
    #container {
      border: solid black 2px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
