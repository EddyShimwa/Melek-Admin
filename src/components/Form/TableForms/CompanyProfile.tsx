import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit } from "react-icons/fa";
import useAddCompanyProfile from "../../../hooks/companyProfile/useAddCompanyProfile";
import useUpdateCompanyProfile from "../../../hooks/companyProfile/useUpdateCompanyProfile";
import {
	CompanyProfileSchema,
	CompanyProfileSchemaType,
} from "../../../validations/CompanyProfile";
import FormButton from "../FormButton";
import FormField from "../FormField";
import TextAreaField from "../TextAreaField";

interface Props {
	toggleModal: () => void;
	companyProfile?: CompanyProfileSchemaType; // Optional, pre-filled during update
}

const CompanyProfileForm: FC<Props> = ({ toggleModal, companyProfile }) => {
	const addCompanyProfile = useAddCompanyProfile();
	const updateCompanyProfile = useUpdateCompanyProfile(); // No profileId required

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CompanyProfileSchemaType>({
		resolver: zodResolver(CompanyProfileSchema),
		defaultValues: companyProfile || {}, // Use the existing profile data for editing
	});

	// State to manage file uploads
	const [files, setFiles] = useState<{
		video?: FileList;
		story_image?: FileList;
		why_us_image?: FileList;
	}>({});

	// Handle file changes
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files: selectedFiles } = e.target;
		setFiles((prev) => ({
			...prev,
			[name]: selectedFiles || undefined,
		}));
	};

	const onSubmit = (formData: CompanyProfileSchemaType) => {
		const payload = { data: formData, files };

		if (companyProfile) {
			// Update existing profile
			updateCompanyProfile.mutate(payload, {
				onSuccess: () => {
					reset();
					toggleModal();
				},
			});
		} else {
			// Create new profile
			addCompanyProfile.mutate(payload, {
				onSuccess: () => {
					reset();
					toggleModal();
				},
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Company Name" htmlFor="company_name">
				<input
					id="company_name"
					type="text"
					{...register("company_name")}
					className={`form-input ${errors.company_name && "form-error"}`}
					placeholder="Enter company name"
				/>
				{errors.company_name && (
					<p className="form-error-message">{errors.company_name.message}</p>
				)}
			</FormField>

			<FormField label="About" htmlFor="about">
				<TextAreaField
					id="about"
					rows={4}
					name="about"
					register={register}
					error={errors.about}
					placeholder="Enter about information"
				/>
			</FormField>

			<FormField label="Story Description" htmlFor="story_description">
				<TextAreaField
					id="story_description"
					rows={4}
					name="story_description"
					register={register}
					error={errors.story_description}
					placeholder="Describe your company story"
				/>
			</FormField>

			<FormField label="Why Statement" htmlFor="why_statement">
				<TextAreaField
					id="why_statement"
					rows={4}
					name="why_statement"
					register={register}
					error={errors.why_statement}
					placeholder="Why should clients choose you?"
				/>
			</FormField>

			{/* File Uploads */}
			<FormField label="Upload Video" htmlFor="video">
				<input
					id="video"
					type="file"
					name="video"
					accept="video/*"
					onChange={handleFileChange}
				/>
			</FormField>

			<FormField label="Upload Story Image" htmlFor="story_image">
				<input
					id="story_image"
					type="file"
					name="story_image"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</FormField>

			<FormField label="Upload Why Us Image" htmlFor="why_us_image">
				<input
					id="why_us_image"
					type="file"
					name="why_us_image"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</FormField>

			<FormField label="Phone Number" htmlFor="phone_number">
				<input
					id="phone_number"
					type="text"
					{...register("phone_number")}
					className={`form-input ${errors.phone_number && "form-error"}`}
					placeholder="Enter phone number"
				/>
				{errors.phone_number && (
					<p className="form-error-message">{errors.phone_number.message}</p>
				)}
			</FormField>

			<FormField label="Email" htmlFor="email">
				<input
					id="email"
					type="email"
					{...register("email")}
					className={`form-input ${errors.email && "form-error"}`}
					placeholder="Enter email address"
				/>
				{errors.email && (
					<p className="form-error-message">{errors.email.message}</p>
				)}
			</FormField>

			{/* Submit Button */}
			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={companyProfile ? <FaEdit /> : <FaPlus />}
					text={companyProfile ? "Update" : "Create"}
					disabled={
						updateCompanyProfile.isPending || addCompanyProfile.isPending
					}
				/>
			</div>
		</form>
	);
};

export default CompanyProfileForm;
