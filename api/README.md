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
- [x] Use a geo-coder to convert addresses into latitude and longitude
- [ ] Change geo-coder to

/partners/closest

- [x] Use Distance Matrix API to compute travel time from cars current address to partner
- [x] Implement partners_get_closest in ./api/controllers/partners to return closest partner
- [ ] Make it so that the search is limited to the serviceTypes

/classifications

- [x] GET
- [x] POST
- [x] DELETE

/classify

- [x] Add multer to store image in folder named uploads
- [x] Render image in response.html

/appointments

- [ ] Add Appointment schema as a model
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
