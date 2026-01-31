import { PageLayout, PageTitle } from "@app/components";
import { Form, FormField, FormItem, FormMessage } from '@shared/component/ui/form';
import { Input } from "@shared/component/ui/input";
import { Button } from "@shared/component/ui/button.tsx";
import { useAttachRegisterCodeMinistryDeal } from "@modules/deals/hooks";

const Index = () => {
    // 1. Hookdan formni olib kelamiz
    const { form, attachRegisterCode } = useAttachRegisterCodeMinistryDeal();

    const handleFormSubmit = (data: any) => {
        attachRegisterCode(data);
    };

    return (
        <PageLayout>
            <PageTitle title="Register Code" />
            
            {/* 2. Shadcn Form komponentiga butun formni beramiz */}
            <Form {...form}>
                <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>

                    <div className="w-full max-w-md">
                        <FormField
                            // 👇 3. CONTROL shu yerda ishlatiladi
                            control={form.control} 
                            name="register_code"
                            render={({ field }) => (
                                <FormItem>
                                    <Input
                                        {...field}
                                        placeholder="Register code kiritish"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className={'mt-5'}>
                        <Button variant={'default'} type="submit">
                            Saqlash
                        </Button>
                    </div>

                </form>
            </Form>
        </PageLayout>
    )
}

export default Index;