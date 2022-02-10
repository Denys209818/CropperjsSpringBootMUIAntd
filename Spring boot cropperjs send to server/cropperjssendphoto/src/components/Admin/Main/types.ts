export interface FileObj
{
    uid: string,
    originFileObj: File
}
export interface FileInfo 
{
    code: string,
    uid?:string
}

export interface FileData 
{
    file: FileObj,
    fileList: FileList,
}

export interface CarData 
{
    Model: string,
    Brand: string,
    Price: Number,
    Files: string
}

export interface CarDataForm
{
    Model: string,
    Brand: string,
    Price: Number
}