import { DataPaymentProps } from "@/types";
import { useForm } from "@inertiajs/react";

const checkout = (data_payment: DataPaymentProps) => {
    const { post, data, processing } = useForm<DataPaymentProps>(data_payment);
    console.log(data);

    // post(route("payment.checkout"));

    return { data, processing };
};

export { checkout };
