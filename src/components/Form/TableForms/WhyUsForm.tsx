import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IWhyUs } from "../../../entities/WhyUs";
import useAddWhyUs from "../../../hooks/whyUs/useAddWhyUs";
import { WhyUsSchema, WhyUsSchemaType } from "../../../validations/whyus";
import FormButton from "../FormButton";
import FormField from "../FormField";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import useUpdateWhyUs from "../../../hooks/whyUs/useUpdateWhyUs";
import IconLoader from "../../common/IconLoader";

interface Props {
	toggleModal: () => void;
	whyUs?: IWhyUs;
}

const WhyUsForm: FC<Props> = ({ toggleModal, whyUs }) => {
	const addWhyUs = useAddWhyUs();
	const updateWhyus = useUpdateWhyUs(whyUs?.id as string);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<WhyUsSchemaType>({
		resolver: zodResolver(WhyUsSchema),
	});

	const onSubmit = (formData: WhyUsSchemaType) => {
		if (whyUs) {
			updateWhyus.mutate(formData, {
				onSuccess: () => {
					toggleModal();
					reset();
				},
			});
		} else {
			addWhyUs.mutate(formData, {
				onSuccess: () => {
					toggleModal();
					reset();
				},
			});
		}
	};

	return (
		<form action="" onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Title" htmlFor="title">
				<InputField
					id="title"
					type="text"
					name="title"
					register={register}
					error={errors.title}
					placeholder="Enter title here"
					value={whyUs?.title}
				/>
			</FormField>
			<FormField label="Description" htmlFor="description">
				<TextAreaField
					id="description"
					rows={4}
					name="description"
					register={register}
					error={errors.description}
					placeholder="Enter description here"
					value={whyUs?.description}
				/>
			</FormField>
			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={<FaPlus />}
					text={
						addWhyUs.isPending || updateWhyus.isPending ? (
							<>
								<IconLoader className="animate-spin" /> {"loading"}
							</>
						) : whyUs ? (
							"Update"
						) : (
							"Create"
						)
					}
					disabled={addWhyUs.isPending || updateWhyus.isPending}
				/>
			</div>
		</form>
	);
};

export default WhyUsForm;
