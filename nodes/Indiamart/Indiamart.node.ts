import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { fetchCrmOperations, crmfields } from './IndiamartDescription';
// import { name } from './Indiamartfunction';

export class Indiamart implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IndiaMart',
		name: 'Indiamart',
		icon: 'file:indiamart-logo.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'You are interacting to India mart ',
		defaults: {
			name: 'Indiamart',
		},
		inputs: ['main'],

		outputs: ['main'],

		requestDefaults: {
			baseURL: `https://mapi.indiamart.com/wservce/crm/crmListing/v2`,

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
						name: 'Indiamart',
						value: 'indiamart',
					},
				],
				default: 'indiamart',
			},

			...fetchCrmOperations,
			...crmfields,
		],

	};

  // async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  //   const baseURL = 'https://mapi.indiamart.com/wservce/crm/crmListing/v2';
  //     return name.call(this, `${baseURL}`);
  // }

}



