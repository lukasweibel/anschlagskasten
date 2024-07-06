<script>
  import {
    activeAnschlaege,
    currentAnschlag,
  } from "../stores/anschlagstore.js";
  import AnschlagDetail from "../components/AnschlagDetail.svelte";
  import AnschlagItem from "../components/AnschlagItem.svelte";
  import { slide } from "svelte/transition";
  import CommentSection from "../components/CommentSection.svelte";

  let anschlaege = [];

  let anschlag = null;

  activeAnschlaege.subscribe((value) => {
    anschlaege = value;
  });

  currentAnschlag.subscribe((value) => {
    anschlag = value;
  });

  function choose(params) {
    currentAnschlag.set(anschlaege.find((item) => item._id === params));
  }
</script>

<div id="content">
  <div id="sidebar" class="col-3 col-s-12">
    {#if anschlaege.length > 0}
      {#each anschlaege as anschlag}
        <div transition:slide|local>
          <AnschlagItem
            title={anschlag.title}
            id={anschlag._id}
            on:click={() => choose(anschlag._id)}
          />
        </div>
      {/each}
    {:else}
      <div>Keine Anschläge vorhanden</div>
    {/if}
  </div>
  {#if anschlag != null}
    <div id="details" class="col-6 col-s-12">
      <AnschlagDetail />
    </div>
    <div id="commentSection" class="col-3 col-s-12">
      <CommentSection />
    </div>
  {/if}
</div>

<style>
  #content {
    display: flex;
    height: 100%;
  }

  #sidebar {
    border-right: solid black 2px;
    overflow-y: scroll;
    flex-direction: column;
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    /* For tablets: */
    .col-s-1 {
      width: 8.33%;
    }
    .col-s-2 {
      width: 16.66%;
    }
    .col-s-3 {
      width: 25%;
    }
    .col-s-4 {
      width: 33.33%;
    }
    .col-s-5 {
      width: 41.66%;
    }
    .col-s-6 {
      width: 50%;
    }
    .col-s-7 {
      width: 58.33%;
    }
    .col-s-8 {
      width: 66.66%;
    }
    .col-s-9 {
      width: 75%;
    }
    .col-s-10 {
      width: 83.33%;
    }
    .col-s-11 {
      width: 91.66%;
    }
    .col-s-12 {
      width: 100%;
    }

    #sidebar {
      border-right: none;
      overflow-x: scroll;
    }
    #content {
      display: block;
      height: auto;
    }

    #commentSection {
      border-top: black solid 2px;
      overflow-y: scroll;
    }
  }

  @media only screen and (min-width: 768px) {
    /* For desktop: */
    .col-1 {
      width: 8.33%;
    }
    .col-2 {
      width: 16.66%;
    }
    .col-3 {
      width: 25%;
    }
    .col-4 {
      width: 33.33%;
    }
    .col-5 {
      width: 41.66%;
    }
    .col-6 {
      width: 50%;
    }
    .col-7 {
      width: 58.33%;
    }
    .col-8 {
      width: 66.66%;
    }
    .col-9 {
      width: 75%;
    }
    .col-10 {
      width: 83.33%;
    }
    .col-11 {
      width: 91.66%;
    }
    .col-12 {
      width: 100%;
    }

    #sidebar {
      border-right: solid black 2px;
      overflow-y: scroll;
    }

    #commentSection {
      border-left: black solid 2px;
      overflow-y: scroll;
    }
  }
</style>
