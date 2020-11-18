'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.resource('posts', 'PostController')
  .apiOnly()
  .middleware('auth')

Route.post('posts/:id/images', 'ImageController.store').middleware('auth')
Route.get('images/:path', 'ImageController.show')