/* eslint-disable n8n-nodes-base/cred-filename-against-convention */
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WasniperApi implements ICredentialType {
	name = 'wasniperApi';
	displayName = 'WaSniper API';
	properties: INodeProperties[] = [
			{
					displayName: 'Instance id',
					name: 'instance_id',
					type: 'string',
					default: '',
			},
			{
					displayName: 'Access token',
					name: 'access_token',
					type: 'string',
					default: 'https://dash.wasniper.com',
			},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
			type: 'generic',
			properties: {
					headers: {
							Authorization: '={{ $credentials.token }}',
					},
			},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
			request: {
					baseURL: '={{ $credentials?.domain }}',
					url: '/access_token',
					method: 'GET', // Specify the HTTP method for the test request
			},
	};
}
