<template>
  <div id="app">
    <cv-header aria-label="Carbon header">
      <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
      <cv-skip-to-content href="#main-content">
        Skip to content
      </cv-skip-to-content>
      <cv-header-name href="javascript:void(0)">
        TRUTH Admin UI
      </cv-header-name>
      <cv-header-nav aria-label="Carbon nav">
        <cv-header-menu-item href="#/artifactform">
          Add Legislative Artifact
        </cv-header-menu-item>
        <cv-header-menu-item href="javascript:void(0)">
          Add other thing
        </cv-header-menu-item>
        <cv-header-menu-item href="javascript:void(0)">
          And more
        </cv-header-menu-item>
        <cv-header-menu aria-label="Mores" title="Mores">
          <cv-header-menu-item href="javascript:void(0)">
            more
          </cv-header-menu-item>
          <cv-header-menu-item href="javascript:void(0)">
            mores
          </cv-header-menu-item>
          <cv-header-menu-item href="javascript:void(0)">
            smores
          </cv-header-menu-item>
        </cv-header-menu>
      </cv-header-nav>
      <template v-slot:left-panels>

        <cv-side-nav id="side-nav" rail>
          <cv-side-nav-items>
            <cv-header-side-nav-items divider>
              <cv-header-menu-item href="#/artifactform">
                Add Legislative Artifact
              </cv-header-menu-item>
              <cv-header-menu-item href="javascript:void(0)">
                Add other thing
              </cv-header-menu-item>
              <cv-header-menu-item href="javascript:void(0)">
                And more
              </cv-header-menu-item>
              <cv-header-menu aria-label="Link 4" title="Link 4" :hover-toggle="false">
                <cv-header-menu-item href="javascript:void(0)">
                  Submenu Link 1
                </cv-header-menu-item>
                <cv-header-menu-item href="javascript:void(0)">
                  Submenu Link 2
                </cv-header-menu-item>
                <cv-header-menu-item href="javascript:void(0)">
                  Submenu Link 3
                </cv-header-menu-item>
              </cv-header-menu>
            </cv-header-side-nav-items>

            <cv-side-nav-menu title="Legislative Artifacts">
              <cv-side-nav-menu-item href="#/artifactform" active>
                Add Artifact
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="#/artifacttable">
                List/Edit Artifacts
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)">
                Count
              </cv-side-nav-menu-item>
            </cv-side-nav-menu>
            <cv-side-nav-menu title="L1 menu">
              <cv-side-nav-menu-item href="javascript:void(0)">
                L2 menu item
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
                L2 menu item
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)">
                L2 menu item
              </cv-side-nav-menu-item>
            </cv-side-nav-menu>
            <cv-side-nav-link href="javascript:void(0)">
              L1 link
            </cv-side-nav-link>
            <cv-side-nav-link href="/api-docs/">
              API Docs
            </cv-side-nav-link>

          </cv-side-nav-items>
        </cv-side-nav>
      </template>
    </cv-header>
    <router-view/>
  </div>
</template>

<style>

  body {
  }

  #app {
    justify-content: center;
    align-items: center;
    margin: 5rem 1rem 0 5rem;
  }
</style>
