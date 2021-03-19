const routes = [
  // Advocacy Groups routes
  ['GET', /^\/api\/v1\/advocacyGroups$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/advocacyGroups$/, ['peasant','admin']],
  ['PUT', /^\/api\/v1\/advocacyGroups$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/advocacyGroups\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/advocacyGroups\/[0-9]+$/, ['peasant','admin']],
  // Category routes
  ['GET', /^\/api\/v1\/categories$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/categories$/, ['peasant','admin']],
  ['PUT', /^\/api\/v1\/categories$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/categories\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/categories\/[0-9]+$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/categories\/name\/[A-Za-z0-9]+$/, ['peasant','admin']],
  // Geospatial Definitions routes
  ['GET', /^\/api\/v1\/geospatialDefinitions$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/geospatialDefinitions$/, ['peasant','admin']],
  ['PUT', /^\/api\/v1\/geospatialDefinitions$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/geospatialDefinitions\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/geospatialDefinitions\/[0-9]+$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/geospatialDefinitions\/name\/[A-Za-z-0-9]+$/, ['peasant','admin']],
  // Legislative Artifacts
  ['GET', /^\/api\/v1\/legislativeArtifacts$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/legislativeArtifacts$/, ['peasant','admin']],
  ['PUT', /^\/api\/v1\/legislativeArtifacts$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/legislativeArtifacts\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/legislativeArtifacts\/[0-9]+$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/legislativeArtifacts\/list\/minDetail$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/legislativeArtifacts\/fullDetail\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/legislativeArtifacts\/fullDetail\/[0-9]+$/, ['peasant','admin']],
  // Levels routes
  ['GET', /^\/api\/v1\/levels$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/levels$/, ['peasant','admin']],
  ['PUT', /^\/api\/v1\/levels$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/levels\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/levels\/[0-9]+$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/levels\/name\/[A-Za-z0-9]+$/, ['peasant','admin']],
  // Officials routes
  ['GET', /^\/api\/v1\/officials$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/officials$/, ['peasant','admin']],
  ['PUT', /^\/api\/v1\/officials$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/officials\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/officials\/[0-9]+$/, ['peasant','admin']],
  // Publications routes
  ['GET', /^\/api\/v1\/publications$/, ['peasant','admin']],  
  ['POST', /^\/api\/v1\/publications$/, ['peasant','admin']],  
  ['PUT', /^\/api\/v1\/publications$/, ['peasant','admin']],  
  ['GET', /^\/api\/v1\/publications\/[0-9]+$/, ['peasant','admin']],  
  ['DELETE', /^\/api\/v1\/publications\/[0-9]+$/, ['peasant','admin']],
  // Videos Routes
  ['GET', /^\/api\/v1\/videos\/channel\/[0-9]+$/, ['peasant','admin']], 
  ['GET', /^\/api\/v1\/videos\/[0-9]+$/, ['peasant','admin']], 
  // Video Testimonial Routes
  ['GET', /^\/api\/v1\/videoTestimonials$/, ['peasant','admin']], 
  ['POST', /^\/api\/v1\/videoTestimonials$/, ['peasant','admin']], 
  ['PUT', /^\/api\/v1\/videoTestimonials$/, ['peasant','admin']], 
  ['GET', /^\/api\/v1\/videoTestimonials\/[0-9]+$/, ['peasant','admin']], 
  ['DELETE', /^\/api\/v1\/videoTestimonials\/[0-9]+$/, ['peasant','admin']], 
];

const isAuthorized = (method, request, role) => {
  for(i=0;i<routes.length;i++){
    if(routes[i][0].toLowerCase()==method.toLowerCase()){
      if(routes[i][1].test(request)){
        if(routes[i][2].includes(role)){
          return true;
        }
      }
    }
  }
  return false;
}

const authorize = (req, res, next) => {
  if(!isAuthorized(req.method, req._parsedOriginalUrl.pathname, req.user.role)){
    res.status(301).send("You are not authorized to perform this action.");
  } else {
    next();
  }
}

module.exports = {
  authorize
}