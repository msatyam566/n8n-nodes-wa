import { INodeProperties } from 'n8n-workflow';


export const groupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [

			{
				name: 'POST',
				value: 'post_group',
				action: 'Send message',
				routing: {
					request: {
						method: 'POST',
						url: '/send_group',
					},
				},
			},
			{
				name: 'Post Audio',
				value: 'post_audio_group',
				action: 'Send audio',
				routing: {
					request: {
						method: 'POST',
						url: '/send_group',
					},
				},
			},

			{
				name: 'Post Document',
				value: 'post_document_group',
				action: 'Send document',
				routing: {
					request: {
						method: 'POST',
						url: '/send_group',
					},
				},
			},

			{
				name: 'Post Images',
				value: 'post_images_group',
				action: 'Send images',
				routing: {
					request: {
						method: 'POST',
						url: '/send_group',
					},
				},
			},
			{
				name: 'Post Video',
				value: 'post_video_group',
				action: 'Send video',
				routing: {
					request: {
						method: 'POST',
						url: '/send_group',
					},
				},
			},

		],
		default: 'post_group',
	},
];


const postGroupOperation: INodeProperties[] = [
	{
		displayName: 'Type of Data',
		name: 'typeofData',
		default: 'queryParameter',
		description: 'Select type of data to send [Query Parameters]',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['post_group','post_audio_group','post_document_group','post_images_group','post_video_group'],
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
				resource: ['group'],
				operation: ['post_group','post_audio_group','post_document_group','post_images_group','post_video_group'],
				typeofData: ['queryParameter'],
			},
		},
		options: [
				// access token
				{
					name: 'access token',
					displayName: 'Access Token',
					values: [
						{
							displayName: 'Access Token',
							name: 'access_token',
							type: 'string',
							default: 'access_token',
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
									property: '={{$parent.access_token}}',
									type: 'query',
								},
							},
							required: true,
							description: 'Value of query parameter',
						},
					],
				},

				// instanceId
				{
					name: 'instance ID',
					displayName: 'Instance ID',
					values: [
						{
							displayName: 'Instance ID',
							name: 'instance_id',
							type: 'string',
							default: 'instance_id',
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
									property: '={{$parent.instance_id}}',
									type: 'query',
								},
							},
							required: true,
							description: 'Value of query parameter',
						},
					],
				},
				//type
				{
					name: 'type',
					displayName: 'Type',
					values: [
						{
							displayName: 'Type',
							name: 'type',
							type: 'string',
							default: 'type',
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
									property: '={{$parent.type}}',
									type: 'query',
								},
							},
							required: true,
							description: 'Value of query parameter',
						},
					],
				},
				//Group ID
				{
					name: 'Group Id',
					displayName: 'Group ID',
					values: [
						{
							displayName: 'Group ID',
							name: 'group_id',
							type: 'string',
							default: 'group_id',
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
									property: '={{$parent.group_id}}',
									type: 'query',
								},
							},
							required: true,
							description: 'Value of query parameter',
						},
					],
				},

				// message
				{
					name: 'Message',
					displayName: 'Message',
					values: [
						{
							displayName: 'Message',
							name: 'message',
							type: 'string',
							default: 'message',
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
									property: '={{$parent.message}}',
									type: 'query',
								},
							},
							required: true,
							description: 'Value of query parameter',
						},
					],
				},
	// media url
				{
					name: 'Media Url',
					displayName: 'Media Url',
					values: [
						{
							displayName: 'Media Url',
							name: 'media_url',
							type: 'string',
							default: 'media_url',
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
									property: '={{$parent.media_url}}',
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




export const groupMessageFields: INodeProperties[]=[
	...postGroupOperation,

]
