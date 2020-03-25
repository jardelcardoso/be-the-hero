
exports.up = function (knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').primary().notNullable();
        table.string('email').primary().notNullable();
        table.string('whatsapp').primary().notNullable();
        table.string('city').primary().notNullable();
        table.string('uf', 2).primary().notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('ongs')
};
