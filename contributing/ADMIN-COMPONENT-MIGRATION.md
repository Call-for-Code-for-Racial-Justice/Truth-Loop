# Admin UI component migration from Vue to React

## Vue to React

The `<template></template>` portion of the vue component is the basically what will make up your JSX.  
- Tags will be different  
- The `class` attribute will be `className`
- There will be other tweaks necessary as JSX does not like hyphens (`-`) in attributes  
- The CarbonComponent design system will be used: https://react.carbondesignsystem.com/?path=/story/getting-started--welcome

The `data()` function will primarily be the props that you pass in or the state values that you set.  

In the `mounted()` function you'll find what needs to be executed immediately.

The `methods` object contains the functions that may be executed within this component or passed to a sub-component.

(TODO: Add the code excerpts of turning the Vue Publication* files into the corresponding React components. To include tests.)

## Route - [ReactRouter](https://reactrouter.com/)
#### Route.test.js
* Requests the data (hint: useEffect, useState, axios)
* Shows table component
* Shows add option


## Table - AdminTable.js and AdminTableToolbar.js (see PublicationTable.js for working example)
#### Table.test.js
* Handles empty data
* Shows correct # of lines
* Includes headers
* Filtering
* Searching
* Edit Option opens edit form
* Calls delete on delete confirmation
* Does not call delete on delete cancellation
* Hides dialog on cancel, confirmation, or clicking off


## Form - [react-hook-form](https://www.npmjs.com/package/react-hook-form)
#### Form.test.js
* Calls post on add
* Calls put on edit
* Populates form
* Handles errors
* Notifies via Toast messages (https://www.npmjs.com/package/react-toast-notifications)
