// import { pipeline } from 'stream/promises';
// import { createWriteStream } from 'fs';
// import { stat } from 'fs/promises';
const { NodeApiError ,NodeOperationError} = require('n8n-core');
// import { BINARY_ENCODING, NodeOperationError, Node } from 'n8n-workflow';

// import { v4 as uuid } from 'uuid';
// import basicAuth from 'basic-auth';
// import bot from 'isbot';
// import { file as tmpFile } from 'tmp-promise';
import type {
	IWebhookFunctions,
	ICredentialDataDecryptedObject,
	IDataObject,
	INodeExecutionData,
	INodeTypeDescription,
	IWebhookResponseData,
	// MultiPartFormData,
	INodeType
} from 'n8n-workflow';


import {
	authenticationProperty,
	credentialsProperty,
	defaultWebhookDescription,
	httpMethodsProperty,
	optionsProperty,
	responseBinaryPropertyNameProperty,
	responseCodeProperty,
	responseDataProperty,
	responseModeProperty,
} from './description';


export class Justdial implements INodeType {
	authPropertyName = 'authentication';
	description: INodeTypeDescription = {
		displayName: 'Just Dial',
		name: 'Justdial',
		group: ['trigger'],
		version: [1, 1.1],
		description: 'Starts the workflow when a webhook is called',
		eventTriggerDescription: 'Waiting for you to call the Test URL',
		activationMessage: 'You can now make calls to your production webhook URL.',
		defaults: {
			name: 'Justdial',
		},
		// supportsCORS: true,
		triggerPanel: {
			header: '',
			executionsHelp: {
				inactive:
					'Webhooks have two modes: test and production. <br /> <br /> <b>Use test mode while you build your workflow</b>. Click the \'listen\' button, then make a request to the test URL. The executions will show up in the editor.<br /> <br /> <b>Use production mode to run your workflow automatically</b>. <a data-key="activate">Activate</a> the workflow, then make requests to the production URL. These executions will show up in the executions list, but not in the editor.',
				active:
					'Webhooks have two modes: test and production. <br /> <br /> <b>Use test mode while you build your workflow</b>. Click the \'listen\' button, then make a request to the test URL. The executions will show up in the editor.<br /> <br /> <b>Use production mode to run your workflow automatically</b>. Since the workflow is activated, you can make requests to the production URL. These executions will show up in the <a data-key="executions">executions list</a>, but not in the editor.',
			},
			activationHint:
				'Once you’ve finished building your workflow, run it without having to click this button by using the production webhook URL.',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		outputs: ['main'],
		credentials: credentialsProperty(this.authPropertyName),
		webhooks: [defaultWebhookDescription],
		properties: [
			authenticationProperty(this.authPropertyName),
			httpMethodsProperty,
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: 'alehhjkubj9SUUY4CHJwapwty',
				placeholder: 'webhook',
				required: true,
				description: 'The path to listen to',
			},
			responseModeProperty,
			{
				displayName:
					'Insert a \'Respond to Webhook\' node to control when and how you respond. <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/" target="_blank">More details</a>',
				name: 'webhookNotice',
				type: 'notice',
				displayOptions: {
					show: {
						responseMode: ['responseNode'],
					},
				},
				default: '',
			},
			responseCodeProperty,
			responseDataProperty,
			responseBinaryPropertyNameProperty,
			optionsProperty,
		],
	};

	async justdial(context: IWebhookFunctions): Promise<IWebhookResponseData> {
		const options = context.getNodeParameter('options', {}) as {
			binaryData: boolean;
			ignoreBots: boolean;
			rawBody: boolean;
			responseData?: string;
		};
		const req = context.getRequestObject();
		const resp = context.getResponseObject();

		try {
			if (options.ignoreBots)
				// throw new WebhookAuthorizationError(403);
			await this.validateAuth(context);
		} catch (error) {
			if (error instanceof NodeOperationError) {
				resp.writeHead(error.responseCode, { 'WWW-Authenticate': 'Basic realm="Webhook"' });
				resp.end(error.message);
				return { noWebhookResponse: true };
			}
			throw error;
		}

		// if (options.binaryData) {
		// 	return await this.handleBinaryData(context);
		// }







		const response: INodeExecutionData = {
			json: {
				headers: req.headers,
				params: req.params,
				query: req.query,
				body: req.body,
			},

		};

		return {
			webhookResponse: options.responseData,
			workflowData: [[response]],
		};
	}
	// handleBinaryData(context: IWebhookFunctions): IWebhookResponseData | PromiseLike<IWebhookResponseData> {
	// 	throw new NodeApiError('Method not implemented.');
	// }

	private async validateAuth(context: IWebhookFunctions) {
		const authentication = context.getNodeParameter(this.authPropertyName) as string;
		if (authentication === 'none') return;

		// const req = context.getRequestObject();
		const headers = context.getHeaderData();

		if (authentication === 'basicAuth') {
			// Basic authorization is needed to call webhook
			let expectedAuth: ICredentialDataDecryptedObject | undefined;
			try {
				expectedAuth = await context.getCredentials('httpBasicAuth');
			} catch {}

			if (expectedAuth === undefined || !expectedAuth.user || !expectedAuth.password) {
				// Data is not defined on node so can not authenticate
				throw new NodeApiError(500, 'No authentication data defined on node!');
			}


		} else if (authentication === 'headerAuth') {
			// Special header with value is needed to call webhook
			let expectedAuth: ICredentialDataDecryptedObject | undefined;
			try {
				expectedAuth = await context.getCredentials('httpHeaderAuth');
			} catch {}

			if (expectedAuth === undefined || !expectedAuth.name || !expectedAuth.value) {
				// Data is not defined on node so can not authenticate
				throw new NodeApiError(500, 'No authentication data defined on node!');
			}
			const headerName = (expectedAuth.name as string).toLowerCase();
			const expectedValue = expectedAuth.value as string;

			if (
				!headers.hasOwnProperty(headerName) ||
				(headers as IDataObject)[headerName] !== expectedValue
			) {
				// Provided authentication data is wrong
				throw new NodeApiError(403);
			}
		}
	}

	// private async handleFormData(context: IWebhookFunctions) {
	// 	const req = context.getRequestObject() as MultiPartFormData.Request;
	// 	const options = context.getNodeParameter('options', {}) as IDataObject;
	// 	const { data, files } = req.body;

	// 	const returnItem: INodeExecutionData = {
	// 		json: {
	// 			headers: req.headers,
	// 			params: req.params,
	// 			query: req.query,
	// 			body: data,
	// 		},
	// 	};

	// 	if (files && Object.keys(files).length) {
	// 		returnItem.binary = {};
	// 	}

	// 	let count = 0;

	// 	for (const key of Object.keys(files)) {
	// 		const processFiles: MultiPartFormData.File[] = [];
	// 		let multiFile = false;
	// 		if (Array.isArray(files[key])) {
	// 			processFiles.push(...(files[key] as MultiPartFormData.File[]));
	// 			multiFile = true;
	// 		} else {
	// 			processFiles.push(files[key] as MultiPartFormData.File);
	// 		}

	// 		let fileCount = 0;
	// 		for (const file of processFiles) {
	// 			let binaryPropertyName = key;
	// 			if (binaryPropertyName.endsWith('[]')) {
	// 				binaryPropertyName = binaryPropertyName.slice(0, -2);
	// 			}
	// 			if (multiFile) {
	// 				binaryPropertyName += fileCount++;
	// 			}
	// 			if (options.binaryPropertyName) {
	// 				binaryPropertyName = `${options.binaryPropertyName}${count}`;
	// 			}


	// 	}

	// 	return { workflowData: [[returnItem]] };
	// }
	// }
	// private async handleBinaryData(context: IWebhookFunctions): Promise<IWebhookResponseData> {
	// 	const req = context.getRequestObject();
	// 	const options = context.getNodeParameter('options', {}) as IDataObject;

	// 	// TODO: create empty binaryData placeholder, stream into that path, and then finalize the binaryData
	// 	const binaryFile = await tmpFile({ prefix: 'n8n-webhook-' });

	// 	try {
	// 		await pipeline(req, createWriteStream(binaryFile.path));

	// 		const returnItem: INodeExecutionData = {
	// 			json: {
	// 				headers: req.headers,
	// 				params: req.params,
	// 				query: req.query,
	// 				body: {},
	// 			},
	// 		};

	// 		const stats = await stat(binaryFile.path);
	// 		if (stats.size) {
	// 			const binaryPropertyName = (options.binaryPropertyName ?? 'data') as string;
	// 			const fileName = req.contentDisposition?.filename ?? uuid();
	// 			const binaryData = await context.nodeHelpers.copyBinaryFile(
	// 				binaryFile.path,
	// 				fileName,
	// 				req.contentType ?? 'application/octet-stream',
	// 			);
	// 			returnItem.binary = { [binaryPropertyName]: binaryData };
	// 		}

	// 		return { workflowData: [[returnItem]] };
	// 	} catch (error) {
	// 		throw new NodeOperationError(context.getNode(), error as Error);
	// 	} finally {
	// 		await binaryFile.cleanup();
	// 	}
	// }
}
