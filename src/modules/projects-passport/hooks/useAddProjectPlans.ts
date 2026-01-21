import {  IProjectPlanFormFlat } from "@interfaces/projectsPassport.interface"
import { ProjectPasswordService } from "@services/projects-passport.service"
import { useMutation } from "@tanstack/react-query"

export default function useAddProjectPlans() {
    const {isPending,mutateAsync:addProjectPlan}=useMutation({
        mutationFn:(data:IProjectPlanFormFlat)=>ProjectPasswordService.addProjectPlans(data),

    })
  return ({isPending,addProjectPlan})
}
