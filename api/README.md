Endpoints:

/vehicles

- [x] GET
- [x] POST

/vehicles/{id}

- [x] GET
- [x] PATCH
- [x] DELETE

/vehicles/login/{id}

- [ ] POST

/vehicles/register

- [ ] POST

/partners

- [x] GET
- [x] POST
- [x] Use a geo-coder to convert addresses into latitude and longitude
- [ ] Change geo-coder to Google Geocoding API for better accuracy

/partners/closest

- [x] Use Distance Matrix API to compute travel time from cars current address to partner
- [x] Implement partners_get_closest in ./api/controllers/partners to return closest partner
- [ ] Make it so that the search is limited to the serviceTypes and partners availability
- [ ] Return multiple options and make sure there are all available

/partners/{id}

- [x] GET
- [x] PATCH
- [x] DELETE

/partners/{id}/appointments

- [ ] GET
- [ ] POST

/classifications

- [x] GET
- [x] POST

/classifications/{id}

- [x] GET
- [x] DELETE

/classify

- [x] Add multer to store image in folder named uploads
- [x] Render image in response.html

/appointments

- [x] Add Appointment schema as a model
- [x] GET -> returns all appointments

/appointments/book

- [x] POST -> add a new appointment between partner a partner and a vehicle
  - [ ] validate partner_id in body to ensure partner exists
  - [ ] validate vehicle_id in body to ensure it is valid

/appointments/{id}

- [ ] GET -> returns an appointment given its id
- [ ] PATCH
- [ ] DELETE

General todos:

- [ ] Add authentication middleware to secure endpoints.
- [ ] Add login for response app.
- [ ] Add validation to schema fields.
- [ ] Instead of return clean or dirty return a scale of clean though dirty that is defined by a criterion.
- [ ] Write tests for each endpoint
