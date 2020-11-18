'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        table.string('nome', 254).notNullable()
        table.string('estado', 2).notNullable()
        table.string('cidade', 254).notNullable()
        table.string('especie', 254).notNullable()
        table.string('porte', 254).notNullable()
        table.text('descricao')
        table.enu('status', ['ativo', 'inativo'], {useNative: true, enumName: 'status'}).notNullable
        table.enu('genero', ['femea', 'macho'], {useNative: true, enumName: 'genero'}).notNullable
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
