import { IDataObject } from "n8n-workflow";

export async function editDetails(this: any){
	const response = this.getResponseObject() as IDataObject
	console.log(response)
}
