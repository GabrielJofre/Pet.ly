'use strict'

const Helpers = use('Helpers')
const Post = use('App/Models/Post')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
 
  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request }) {
    const post = await Post.findOrFail(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.moveAll()) {
      return images.errors
    }

    await Promise.all(
      images
        .movedList()
        .map(image => post.images().create({ path: image.fileName }))
    )
  }

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController
