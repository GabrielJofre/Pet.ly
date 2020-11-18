'use strict'

const Post = use('App/Models/Post')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const posts = Post.query()
      .with('images')
      .fetch()
      
    return posts
  }

 

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const {id} = auth.user
    const data = request.only (['nome', 'estado', 'cidade', 'especie', 'porte', 'descricao', 'status', 'genero'])


    const post = await Post.create({ ...data, user_id: id })
    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.load('images')

    return post
  }

 

  /**r
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)

    const data = request.only (['nome', 'estado', 'cidade', 'especie', 'porte', 'descricao', 'status', 'genero'])

    post.merge(data)

    await post.save()

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await post.delete()
  }
}

module.exports = PostController
