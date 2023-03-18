UPDATE holdmytableapi_restaurant
SET bio = 'Welcome to Audrey—the flagship restaurant of Chef Sean Brock. Inspired by his Appalachian roots, traditions of the rural South, and his maternal grandmother, Audrey is his most personal project to date.'
WHERE id = 1

UPDATE holdmytableapi_restaurant
SET instagram = 'audreynashville'
WHERE id = 1

UPDATE holdmytableapi_reservation
SET user_id = 2
WHERE id = 1

DELETE FROM holdmytableapi_restaurant
WHERE id = 23

DELETE FROM holdmytableapi_user
WHERE uid = 'CpdjGDG2VnPkEVRdd9vwRDAQIIo2'
