import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IMilestone } from "../../../entities/Milestone";
import useAddMilestone from "../../../hooks/milestones/useAddMilestone";
import useUpdateMilestone from "../../../hooks/milestones/useUpdateMilestone";
import {
	MilestoneSchema,
	MilestoneSchemaType,
} from "../../../validations/Milestone";
import FormButton from "../FormButton";
import FormField from "../FormField";
import SelectField from "../SelectField";
import TextAreaField from "../TextAreaField";
import IconLoader from "../../common/IconLoader";

interface Props {
	toggleModal: () => void;
	milestone?: IMilestone;
}

const MilestoneForm: FC<Props> = ({ toggleModal, milestone }) => {
	const addMilestone = useAddMilestone();
	const updateMilestone = useUpdateMilestone(milestone?.id as string);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<MilestoneSchemaType>({
		resolver: zodResolver(MilestoneSchema),
	});

	function generateYearsArray(startYear = 2010, count = 20) {
		const yearsArray = [];

		for (let year = startYear; year < startYear + count; year++) {
			yearsArray.push({
				value: year.toString(),
				label: year.toString(),
			});
		}

		return yearsArray;
	}

	const onSubmit = (formData: MilestoneSchemaType) => {
		const data = { ...formData, year: Number(formData.year) };
		if (milestone) {
			updateMilestone.mutate(data, {
				onSuccess: () => {
					reset();
					toggleModal();
				},
			});
		} else {
			addMilestone.mutate(data, {
				onSuccess: () => {
					reset();
					toggleModal();
				},
			});
		}
	};

	return (
		<form action="" onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Year" htmlFor="year">
				<SelectField
					id="year"
					name="year"
					register={register}
					error={errors.year}
					options={generateYearsArray(2018, 20)}
					value={String(milestone?.year)}
				/>
			</FormField>
			<FormField label="Description" htmlFor="description">
				<TextAreaField
					id="description"
					rows={4}
					name="description"
					register={register}
					error={errors.description}
					placeholder="Enter milestone description here"
					value={milestone?.description}
				/>
			</FormField>
			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={<FaPlus />}
					text={
						addMilestone.isPending || updateMilestone.isPending ? (
							<>
								<IconLoader className="animate-spin" /> {"loading"}
							</>
						) : milestone ? (
							"Update"
						) : (
							"Create"
						)
					}
					disabled={updateMilestone.isPending || addMilestone.isPending}
				/>
			</div>
		</form>
	);
};

export default MilestoneForm;
