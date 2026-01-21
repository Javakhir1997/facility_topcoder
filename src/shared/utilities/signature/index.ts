import {showMessage} from '@app/shared'


function getFileBase64(fileUrl: string): void {
	fetch(fileUrl)
		.then((response: Response) => {
			if (!response.ok) {
				showMessage('Error downloading file', 'error')
			}
			return response.blob()
		})
		.then((blob: Blob) => {
			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader()
				reader.onloadend = () => {
					const dataUrl = reader.result
					if (typeof dataUrl === 'string') {
						const base64Data = dataUrl.split(',')[1]
						resolve(base64Data)
					} else {
						showMessage('The result of FileReader is not a string', 'error')
						reject(new Error('The result of FileReader is not a string'))
					}
				}
				reader.onerror = () => {
					showMessage('FileReader error:', 'error')
				}
				reader.readAsDataURL(blob)
			})
		})
		.then((base64Data: string) => {
			return base64Data
		})
		.catch((error: Error) => console.error(error))
}


export {
	getFileBase64
}