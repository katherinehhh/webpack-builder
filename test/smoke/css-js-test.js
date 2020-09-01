const glob=require('glob-all')

describe('Checking generated css js file',()=>{
    it('should generate css js files',(done)=>{
        const fields=glob.sync([
            './dist/index_*.js',
             './dist/index_*.css',
             './dist/search_*.js',
             './dist/search_*.css'   
        ]);
        if(fields.length>0){
            done()
        }else{
            throw new Error('no css js file genernted')
        }  

    })
})