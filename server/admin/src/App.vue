<template>
  <div id="app">
    <cv-header aria-label="Carbon header">
      <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
      <cv-skip-to-content href="#main-content">
        Skip to content
      </cv-skip-to-content>
      <cv-header-name href="javascript:void(0)">
        Policy Truth Admin UI
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

  .bx--content {
    margin-left: 2rem;
  }
  #app {
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    overflow: hidden
  }
</style>
