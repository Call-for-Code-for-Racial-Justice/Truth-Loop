import React, { useState, useEffect } from 'react'
import SideNavTab from './SideNavTab'
import './sidenav.scss'
const SideNav = () => {
	return(
		<nav id="side-nav">
		<ul id="nav-list">
			<li><SideNavTab label="Legislative Artifacts" link="legislativeArtifacts" component="Artifacts" /></li>
			<li><SideNavTab label="Advocacy Groups" link="advocacyGroups" component="Groups" /></li>
			<li><SideNavTab label="Categories" link="categories" component="Categories" /></li>
			<li><SideNavTab label="Levels" link="levels" component="Levels" /></li>
			<li><SideNavTab label="Geographies" link="geospatialDefinitions" component="Geographies"/></li>
			<li><SideNavTab label="Officials" link="officials" component="Officials" /></li>
			<li><SideNavTab label="Publications" link="publications" component="Publications" /></li>
			<li><SideNavTab label="Video Testimonials" link="videoTestimonials" component="Video Testimonial" /></li>
			<li><SideNavTab label="Legislative Artifacts" link="legislativeArtifacts" /></li>
			<li><SideNavTab label="API Docs" link="api-docs" /></li>
		</ul>
		</nav>
	)
}
export default SideNav