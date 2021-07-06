const findNextIdentity =(identityPropertyName:string,collection:any[]):number=>{
   if(collection && collection!=null && collection.length>0){
      return collection[collection.length-1][identityPropertyName] +1;
   }else{
      return 1;
   }
   
};

export {findNextIdentity};