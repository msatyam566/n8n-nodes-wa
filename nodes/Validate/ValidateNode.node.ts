import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ValidateNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ValidateNode',
		name: 'ValidateNode',
		group: ['transform'],
		version: 1,
		description: 'To Validate Number',
		defaults: {
			name: 'ValidateNode',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		// Manipulate the input data
		const manipulatedItems = items.map(item => {
			if (item.json && item.json.RESPONSE && Array.isArray(item.json.RESPONSE)) {
				item.json.RESPONSE.forEach((response: any) => {
					if (response && typeof response === 'object' && response.SENDER_MOBILE) {
						response.SENDER_MOBILE = response.SENDER_MOBILE.replace(/-/g, '');
					}
				});
			}
			return item;
		});

		return this.prepareOutputData(manipulatedItems);
	}
}
