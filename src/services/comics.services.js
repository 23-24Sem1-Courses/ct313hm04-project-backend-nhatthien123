const knex = require('../database/knex');
const Paginator = require('./paginator');
function createComicsService() {
    function read(payload){
        const comic = {
            name: payload.name,
            email: payload.link,
            address: payload.chapter,
            favorite: payload.favorite,
        };
        Object.keys(comic).forEach(
            (key) => comic[key]=== undefined &&delete comic[key]
        );
        return comic;
    };
    async function getMany(query) {
        const { name, favorite, page = 1, limit = 5 } = query;
        
        
        const paginator = new Paginator(page, limit);
        let results = await knex('comics')
            .where((builder) => {
            if (name) {
                builder.where('name', 'like', `%${name}%`);
            }
            if (favorite !== undefined) {
                builder.where('favorite', 1);
            }
            })
            .select(
                knex.raw('count(id) OVER() AS recordsCount'),
                    'id',
                    'name',
                    'link',
                    'chapter',
                    'favorite'
            )
            .limit(paginator.limit)
            .offset(paginator.offset);
        let totalRecords = 0;
        results = results.map((result) => {
            totalRecords = result.recordsCount;
            delete result.recordsCount;
            return result;
        });
        return {
            metadata: paginator.getMetadata(totalRecords),
            comics: results,
        };
    };
        
    async function create(payload){
        const comic = read(payload);
        const[id] = await knex('comics').insert(comic);
        return { id,...comic};
    }
    async function getComicById(id){
        return knex('comics').where('id', id ).select('*').first();
    };
    async function update(id,payload){
        const update = read(payload);
        return knex('comic').where('id'.id).update(update);
    };
    async function deleteOne(id){
        return knex('comic').where('id',id).del();
    };
    async function deleteAll(){
        return knex('comic').del();
    }
    return {
    create,
    getMany,
    getComicById,
    update,
    deleteOne,
    deleteAll
    };
}
module.exports = createComicsService;