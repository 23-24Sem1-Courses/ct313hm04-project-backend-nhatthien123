const createComicsService = require('../services/comics.service');
const ApiError = require('../api-error');
async function createComic(req, res, next){
    if(!req.body?.name){
        return new(new ApiError(400,'Name can not be empty'));
    }
    try{
        const ComicsService = createComicsService();
        const comic = await ComicsService.create(req.body);
        return res.send(comic);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,'An error occured while creating the new comic')
        );
    }
};

async function getComicsByFilter(req,res, next){
    let comics = [];
    try{
        const comicsService = createComicsService();
        comics = await comicsService.getMany(req.query);
    }catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'An Error occured while retrieving comics')
        );
    }
    return res.send(comics);
   
}
async function getOne(req,res,next){
    try{
        const comicsService = createComicsService();
        const comic = await comicsService.getComicById(req.params.id);
        if(!comic){
            return next(new ApiError(484, 'Comic not found'));
        }
        return res.send(comic);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving comic with id=${req.params.id}`));
    };
    
}
async function update(req,res,next){
    if(Object.keys(req.body).length==0){
        return next(new ApiError(400,'data to update can not be empty'));
    }
    try {
        const comicsService = createComicsService();
        const updated = await comicsService.update(
            req.params.id,
            req.body
        );
        if(!updated){
            return next(new ApiError(404,'Comic not found'));
        }
        return res.send({message: 'Comic was updated successfully'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,`Error updating comic with id = ${req.params.id}`)
        );
    }
}
async function deleteOne(req,res,next){
    try{
        const comicsService = createComicsService();
        const deleted = await comicsService.deleteOne(req.params.id);
        if(!deleted){
            return next(new ApiError(404,'Comic not found'));
        }
        return res.send({message: 'Comic was deleted successfully'});
    }catch(error){
        console.log(error);
        return next(
            new ApiError(
                500,
                `cound not delete comic with id = ${req.params.id}`)
                
            );
        
    }
}
async function deleteAll(req,res,next){
    try {
        const comicsService = createComicsService();
        const deleted = await comicsService.deletaAll();
        return res.send({
            message: `${deleted} comics were deleted succsessfully`,
        });
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500,
                'An error occured while removing all comics')
        );
    }
};

module.exports={
    getComicsByFilter,
    deleteAll,
    getOne,
    createComic,
    update,
    deleteOne
};