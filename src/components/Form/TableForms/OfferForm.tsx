import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IOffer } from "../../../entities/Offer";
import useAddOffer from "../../../hooks/offers/useAddOffer";
import useUpdateOffer from "../../../hooks/offers/useUpdateOffer";
import { OfferSchema, OfferSchemaType } from "../../../validations/Offer";
import FormButton from "../FormButton";
import FormField from "../FormField";
import InputField from "../InputField";
import IconLoader from "../../common/IconLoader";

interface Props {
	toggleModal: () => void;
	offer?: IOffer;
}

const OfferForm: FC<Props> = ({ toggleModal, offer }) => {
	const addOffer = useAddOffer();
	const updateOffer = useUpdateOffer(offer?.id);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OfferSchemaType>({
		resolver: zodResolver(OfferSchema),
	});

	const onSubmit = (formData: OfferSchemaType) => {
		if (offer) {
			updateOffer.mutate(formData, {
				onSuccess: () => {
					reset();
					toggleModal();
				},
			});
		} else {
			addOffer.mutate(formData, {
				onSuccess: () => {
					reset();
					toggleModal();
				},
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Offer title" htmlFor="title">
				<InputField
					type="text"
					placeholder="Enter offer title here"
					id="title"
					name="title"
					register={register}
					value={offer?.title}
					error={errors.title}
				/>
			</FormField>

			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={<FaPlus />}
					text={
						addOffer.isPending || updateOffer.isPending ? (
							<>
								<IconLoader className="animate-spin" /> {"loading"}
							</>
						) : offer ? (
							"Update"
						) : (
							"Create"
						)
					}
					disabled={
						addOffer.isPending || (offer ? updateOffer.isPending : false)
					}
				/>
			</div>
		</form>
	);
};

export default OfferForm;
