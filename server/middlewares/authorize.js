const routes = [
  // Advocacy Groups routes
  ['GET', /^\/api\/v1\/advocacyGroups$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/advocacyGroups$/, ['admin']],
  ['PUT', /^\/api\/v1\/advocacyGroups$/, ['peasant','admin']],
  ['GET', /^\/api\/v1\/advocacyGroups\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/advocacyGroups\/[0-9]+$/, ['peasant','admin']],
  // Category routes
  ['GET', /^\/api\/v1\/categories$/, ['peasant','admin']],
  ['POST', /^\/api\/v1\/categories$/, ['admin']],
  ['PUT', /^\/api\/v1\/categories$/, ['admin']],
  ['GET', /^\/api\/v1\/categories\/[0-9]+$/, ['peasant','admin']],
  ['DELETE', /^\/api\/v1\/categories\/[0-9]+$/, ['admin']],
  ['GET', /^\/api\/v1\/categories\/name\/[A-Za-z0-9]+$/, ['peasant','admin']]
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

const authorize = (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req._parsedOriginalUrl.pathname);
  next();
}

console.log(/^\/api\/v1\/categories\/[0-9]+$/.test('/api/v1/categories/'));

module.exports = {
  authorize
}