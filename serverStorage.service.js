const {
	CreateDir,
	ReadFile,
	ReadJsonFile,
	WriteFile,
}=globals.functions;

this.start=()=>{
	this.index=[];
	this.serverStorage=[];
	// serverStorage;
	const path="data/serverStorage";
	const indexFilePath=path+"/index.json";
	const serverStorageStatic="data/serverStorage/static";
	
	CreateDir("data");
	CreateDir(path);

	loadIndex:{
		const indexFile=ReadJsonFile(indexFilePath);
		if(indexFile){
			this.index=indexFile;
		}else{
			this.index=[];
			WriteFile(indexFilePath,"[]");
		}
	}
	let i;
	for(i of this.index){
		let data;
		i.filePath=i.filePath
			.split("[serverStorageStatic]")
			.join(serverStorageStatic);

		if(i.fileType=="json"){
			data=ReadJsonFile(i.filePath);
		}else{
			data=ReadFile(i.filePath);
		}
		if(!data){continue;}
		i.data=data;
		this.serverStorage[i.name]=i;
	}
}
this.readStorage=item=>{
	const i=this.serverStorage[item];
	if(!i){
		log("ITEM: "+item+" not in serverStorage!");
		return false;
	}
	return i.data;
}