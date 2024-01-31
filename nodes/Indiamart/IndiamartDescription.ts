import { INodeProperties } from 'n8n-workflow';


export const fetchCrmOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['indiamart'],
			},
		},
		options: [
			{
				name: 'GET',
				value: 'get',
				action: 'Fetch leads',
				routing: {
					request: {
						method: 'GET',
						url: '/',
					},
				},
			},


		],
		default: 'get',
	},
];

const fetchOperation: INodeProperties[] = [
	{
		displayName: 'Type of Data',
		name: 'typeofData',
		default: 'queryParameter',
		description: 'Select type of data to send [Query Parameters]',
		displayOptions: {
			show: {
				resource: ['indiamart'],
				operation: ['get'],
			},
		},
		type: 'options',
		options: [
			{
				name: 'Query',
				value: 'queryParameter',
			},
		],
		required: true,
	},

	{
		displayName: 'Query Parameters',
		name: 'arguments',
		default: {},
		description: "The request's query parameters",
		displayOptions: {
			show: {
				resource: ['indiamart'],
				operation: ['get'],
				typeofData: ['queryParameter'],
			},
		},
		options: [
			{
				name: 'CRM token',
				displayName: 'CRM Token',
				values: [
					{
						displayName: 'CRM Token',
						name: 'glusr_crm_key',
						type: 'string',
						default: 'glusr_crm_key',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.glusr_crm_key}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},

			// start date
			{
				name: 'Start Date',
				displayName: 'Start Date',
				values: [
					{
						displayName: 'Start Date',
						name: 'start_time',
						type: 'string',
						default: 'start_time',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.start_time}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},

			// end date
			{
				name: 'End date',
				displayName: 'End Date',
				values: [
					{
						displayName: 'End Date',
						name: 'end_time',
						type: 'string',
						default: 'end_time',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.end_time}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},


		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
];







export const crmfields: INodeProperties[] = [

	...fetchOperation

];
