Endpoints:

/vehicles

- [x] GET
- [x] POST
- [x] PATCH
- [x] DELETE

/partners

- [x] GET
- [x] POST
- [x] PATCH
- [x] DELETE
- [ ] Use a geo-coder to convert addresses into latitude and longitude (Google Geocode API)
- [ ] Use Distance Matrix API to compute travel time from cars current address to partner

/classifications

- [x] GET
- [x] POST
- [x] DELETE

/classify

- [x] Add multer to store image in folder named uploads
- [x] Render image in response.html

/appointments

- [ ] GET
- [ ] POST
- [ ] PATCH
- [ ] DELETE

General todos:

- [ ] Add authentication middleware to secure endpoints.
- [ ] Add loginpage.html for public folder using authentication middleware and cookies to save jwt.
- [ ] Add validation to schema fields.
- [ ] Instead of return clean or dirty return a scale of clean though dirty that is defined by a criterion.

Questions:

- How will self-driving cars communicate to the network?
