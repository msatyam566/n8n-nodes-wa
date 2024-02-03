// import {
//   IExecuteFunctions,
//   INodeExecutionData,
// } from 'n8n-workflow';

// export async function name(
//   this: IExecuteFunctions,
//   url: string
// ): Promise<INodeExecutionData[][]> {
//  // Retrieve input parameters
// //  const operation = this.getNodeParameter('operation', 0) as string;
// //  const typeofData = this.getNodeParameter('typeofData', 0) as string;

// //  // Operation-specific parameters
// //  let crmKey = '';
// //  let startTime = '';
// //  let endTime = '';

// //  if (operation === 'get') {
// // 		 if (typeofData === 'queryParameter') {
// // 				 const crmTokenParameters = this.getNodeParameter('arguments', 0, {}) as { glusr_crm_key: string };
// // 				 crmKey = crmTokenParameters.glusr_crm_key;

// // 				 const startDateParameters = this.getNodeParameter('arguments', 0, {}) as { start_time: string };
// // 				 startTime = startDateParameters.start_time;

// // 				 const endDateParameters = this.getNodeParameter('arguments', 0, {}) as { end_time: string };
// // 				 endTime = endDateParameters.end_time;
// // 		 }
// //  }

//   let queryParams = {
//     glusr_crm_key: 'mRyzFL9s5XrFSPeq73GN7liPoFvHmTBq',
//     start_time: '06-Jan-2024',
//     end_time: '07-Jan-2024',
//   };
// // 	const queryParams = {
// // 		glusr_crm_key: crmKey,
// // 		start_time: startTime,
// // 		end_time: endTime,
// // };


//   const response = await this.helpers.request({
//     uri:url,
//     method: 'GET',
// 		qs: queryParams,
// 	  });

//   let responseData = JSON.parse(response)
//   let res = responseData.RESPONSE
//   console.log(res,"2222222")
// 	JSON.stringify(res)

// 	for (const entry of res) {
//     if (entry.SENDER_MOBILE && entry.SENDER_MOBILE.includes('+91-')) {
//       entry.SENDER_MOBILE = entry.SENDER_MOBILE.replace('+91-', '+91');
//     }
//   }

//   // Convert data back to the original format

//   // Output the modified data
//   return (responseData);

// }
