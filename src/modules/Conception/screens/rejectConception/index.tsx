import {Button, FileUpLoader, HR, PageLayout, PageTitle, Restricted, Wrapper,} from "@app/components";
import {ROLE_LIST,} from "@app/shared";
import {useAppContext} from "@app/hooks";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@shared/component/ui/form';
import {Textarea} from "@shared/component/ui/textarea.tsx";
import {IFIle} from "@app/interfaces";
import {useConfirmConception, useEvolutionConception} from "@modules/conception/hooks";
import {ConfirmConceptionDTO, ConfirmConceptionDTOSchema} from "@entities/conception";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const Index = () => {


    const form = useForm<ConfirmConceptionDTO>({
        resolver: zodResolver(ConfirmConceptionDTOSchema),
        defaultValues: {
            reject: true
        }
    });


    // const navigate = useNavigate()
    const {user} = useAppContext();

    const {confirmConception} = useConfirmConception()
    const {evolutionConception} = useEvolutionConception()

    console.log(user, 'user')

    const handleFormSubmit = (data: ConfirmConceptionDTO) => {
        console.log(data, 'data')
        if(!user) return
        switch (user.role){
            case ROLE_LIST.BASIN_B_B:
                confirmConception({
                    ...data,
                    reject: true,
                })
                break
            case ROLE_LIST.BALANCE:
                evolutionConception({
                    ...data,
                    reject: true,
                })
                break
        }
    };

    console.log(form.formState.errors, 'errors')

    return (
        <PageLayout>
            <PageTitle title="Return"/>
            <Wrapper>
                <HR/>

                <Restricted permittedRole={[ROLE_LIST.BASIN_B_B, ROLE_LIST.BALANCE]}>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
                            <div className="grid grid-cols-12 mb-5">
                                <div className={'col-span-12 mb-5'}>
                                    <FormField
                                        control={form.control}
                                        name={'reject_text'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel required>Izoh</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                                <div className={'col-span-12 mb-5'}>
                                    <FormField
                                        control={form.control}
                                        name={'reject_file'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel required>File</FormLabel>
                                                    <FormControl>
                                                        <FileUpLoader
                                                            id="rejection_file"
                                                            ref={field.ref}
                                                            value={field.value as unknown as IFIle}
                                                            onBlur={field.onBlur}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Restricted>
            </Wrapper>
        </PageLayout>
    )
}

export default Index
