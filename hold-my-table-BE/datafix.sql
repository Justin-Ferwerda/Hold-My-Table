UPDATE holdmytableapi_restaurant
SET bio = 'Welcome to Audrey—the flagship restaurant of Chef Sean Brock. Inspired by his Appalachian roots, traditions of the rural South, and his maternal grandmother, Audrey is his most personal project to date.'
WHERE id = 1

UPDATE holdmytableapi_restaurant
SET instagram = 'audreynashville'
WHERE id = 1

UPDATE holdmytableapi_restaurant
SET style_id = 11
WHERE id = 4

DELETE FROM holdmytableapi_review
WHERE table_id = 1
