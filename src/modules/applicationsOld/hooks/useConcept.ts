import {IApplicationForm} from '@app/interfaces'
import {ApplicationService} from '@app/services'
import {useMutation} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'


const useConcept = () => {
	const {id = ''} = useParams()

	const {isPending, mutateAsync: generateFile} = useMutation({
		mutationFn: (data: IApplicationForm) => ApplicationService.conceptFileGenerate(data, id)
	})

	return {isPending, generateFile}
}

export default useConcept
