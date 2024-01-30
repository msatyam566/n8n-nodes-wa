import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { messageOperations, messageFields } from './MessageDescription';
import { groupDescription,groupMessageFields } from './GroupMessageDescription';



export class WaSniper implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wa Sniper',
		name: 'WaSniper',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with WA Sniper API',
		defaults: {
			name: 'Wa Sniper',
		},
		inputs: ['main'],
		outputs: ['main'],
		requestDefaults: {
			baseURL: `https://dash.wasniper.com/api/`,

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},




		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name:'Group',
						value:'group',
					}

				],
				default: 'message',
			},


			...messageOperations,
			...messageFields,
			...groupDescription,
			...groupMessageFields

		],
	};

}


