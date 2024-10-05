import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IValue } from "../../../entities/Value";
import useAddValue from "../../../hooks/values/useAddValue";
import useUpdateValue from "../../../hooks/values/useUpdateValue";
import { ValueSchema, ValueSchemaType } from "../../../validations/values";
import FormButton from "../FormButton";
import FormField from "../FormField";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import IconLoader from "../../common/IconLoader";

interface Props {
	toggleModal: () => void;
	value?: IValue;
}

const ValueForm: FC<Props> = ({ toggleModal, value }) => {
	const addValue = useAddValue();
	const updateValue = useUpdateValue(value?.id);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ValueSchemaType>({
		resolver: zodResolver(ValueSchema),
	});

	const onSubmit = (formData: ValueSchemaType) => {
		if (value) {
			updateValue.mutate(formData, {
				onSuccess: () => {
					toggleModal();
					reset();
				},
			});
		} else {
			addValue.mutate(formData, {
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
					placeholder="Enter value title here"
					value={value?.title}
				/>
			</FormField>
			<FormField label="Description" htmlFor="description">
				<TextAreaField
					id="description"
					rows={4}
					name="description"
					register={register}
					error={errors.description}
					placeholder="Enter value description here"
					value={value?.description}
				/>
			</FormField>
			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={<FaPlus />}
					text={
						addValue.isPending || updateValue.isPending ? (
							<>
								<IconLoader className="animate-spin" /> {"loading"}
							</>
						) : value ? (
							"Update"
						) : (
							"Create"
						)
					}
					disabled={addValue.isPending || updateValue.isPending}
				/>
			</div>
		</form>
	);
};

export default ValueForm;
