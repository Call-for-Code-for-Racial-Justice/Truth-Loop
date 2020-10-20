<template>
  <div id="app">
    <cv-header aria-label="Carbon header">
      <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
      <cv-skip-to-content href="#main-content">
        Skip to content
      </cv-skip-to-content>
      <cv-header-name href="javascript:void(0)">
        Truth Loop Admin UI
      </cv-header-name>
      <cv-header-nav aria-label="Carbon nav">
        <cv-header-menu-item href="/api-docs">
          API Docs
        </cv-header-menu-item>
      </cv-header-nav>
      <template v-slot:left-panels>
        <cv-side-nav id="side-nav" rail>
          <cv-side-nav-menu title="Legislative Artifacts">
            <cv-side-nav-menu-item href="#/artifacts/form">
              Add Artifacts
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/artifacts">
              List/Edit/Delete Artifacts
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Advocacy Groups">
            <cv-side-nav-menu-item href="#/advocacy_groups/form">
              Add Advocacy Groups
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/advocacy_groups">
              List/Edit/Delete Advocacy Groups
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Categories">
            <cv-side-nav-menu-item href="#/categories/form">
              Add Categories
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/categories">
              List/Edit/Delete Categories
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Levels">
            <cv-side-nav-menu-item href="#/levels/form">
              Add Levels
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/levels">
              List/Edit/Delete Levels
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Geographies">
            <cv-side-nav-menu-item href="#/geographies/form">
              Add Geographies
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/geographies">
              List/Edit/Delete Geographies
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Officials">
            <cv-side-nav-menu-item href="#/officials/form">
              Add Officials
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/officials">
              List/Edit/Delete Officials
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Publications">
            <cv-side-nav-menu-item href="#/publications/form">
              Add Publications
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/publications">
              List/Edit/Delete Publications
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Video Testimonials">
            <cv-side-nav-menu-item href="#/video_testimonials/form">
              Add Video Testimonials
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/video_testimonials">
              List/Edit/Delete Video Testimonials
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="API Docs">
            <cv-side-nav-menu-item href="/api-docs">
              REST API Docs
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
        </cv-side-nav>
      </template>
    </cv-header>
    <router-view/>
  </div>
</template>

<style>

  .maincard {
    max-height: calc(100vh - 4rem);
    margin-top: 0.5rem;
  }
  .v-card {
    overflow: scroll;
  }
  .cv-form {
    padding: 1rem;
    overflow: scroll;
  }
  .bx--content {
    margin-left: 2rem;
    padding-left: 1.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .cv-button {
    margin: 1rem 0 0 0;
    color: antiquewhite !important;
  }
  .bx--label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
  }

  #app {
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    overflow: hidden
  }
</style>
