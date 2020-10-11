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
      <template v-slot:left-panels>
        <cv-side-nav id="side-nav" rail>
          <cv-side-nav-link href="/api-docs/">
            API Docs
          </cv-side-nav-link>
          <cv-side-nav-menu title="Legislative Artifacts">
            <cv-side-nav-menu-item href="#/artifactsform" active>
              Add Artifacts
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/artifacts">
              List/Edit/Delete Artifacts
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Categories">
            <cv-side-nav-menu-item href="#/categories/form" active>
              Add Categories
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/categories">
              List/Edit/Delete Categories
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
          <cv-side-nav-menu title="Publications">
            <cv-side-nav-menu-item href="#/publications/form" active>
              Add Publications
            </cv-side-nav-menu-item>
            <cv-side-nav-menu-item href="#/publications">
              List/Edit/Delete Publications
            </cv-side-nav-menu-item>
          </cv-side-nav-menu>
        </cv-side-nav>
      </template>
    </cv-header>
    <router-view/>
  </div>
</template>

<style>

  #app {
    justify-content: center;
    align-items: center;
    margin: 5rem 1rem 0 5rem;
  }
</style>
