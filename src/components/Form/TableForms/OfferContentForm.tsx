import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { OfferContent } from "../../../entities/Offer";
import useAddOfferContent, {
	OfferContentData,
} from "../../../hooks/offers/useAddOfferContent";
import useUpdateOfferContent from "../../../hooks/offers/useUpdateOfferContent";
import {
	OfferContentSchema,
	OfferContentSchemaType,
} from "../../../validations/OfferContent";
import FormButton from "../FormButton";
import FormField from "../FormField";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import IconLoader from "../../common/IconLoader";

interface Props {
	id: string;
	toggleModal: () => void;
	offerContent?: OfferContent;
}

const OfferContentForm: FC<Props> = ({ id, toggleModal, offerContent }) => {
	const addOfferContent = useAddOfferContent();
	const updateOfferContent = useUpdateOfferContent(offerContent?.id);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OfferContentSchemaType>({
		resolver: zodResolver(OfferContentSchema),
	});

	const onSubmit = (formData: OfferContentSchemaType) => {
		const data: OfferContentData = { ...formData, offerId: id };
		if (offerContent) {
			updateOfferContent.mutate(data, {
				onSuccess: () => {
					toggleModal();
					reset();
				},
			});
		} else {
			addOfferContent.mutate(data, {
				onSuccess: () => {
					toggleModal();
					reset();
				},
			});
		}
	};
	return (
		<form action="" onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Content title" htmlFor="title">
				<InputField
					name="title"
					id="title"
					placeholder="Enter Offer content title"
					type="text"
					register={register}
					error={errors.title}
					value={offerContent?.title}
				/>
			</FormField>
			<FormField label="Content description" htmlFor="description">
				<TextAreaField
					name="content"
					id="description"
					rows={4}
					placeholder="Enter offer content description"
					register={register}
					error={errors.content}
					value={offerContent?.content}
				/>
			</FormField>
			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={<FaPlus />}
					text={
						addOfferContent.isPending || updateOfferContent.isPending ? (
							<>
								<IconLoader className="animate-spin" /> {"loading"}
							</>
						) : offerContent ? (
							"Update"
						) : (
							"Create"
						)
					}
					disabled={updateOfferContent.isPending || addOfferContent.isPending}
				/>
			</div>
		</form>
	);
};

export default OfferContentForm;
