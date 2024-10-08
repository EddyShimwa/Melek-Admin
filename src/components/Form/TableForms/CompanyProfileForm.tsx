import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { FC, useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import useAddCompanyProfile from "../../../hooks/companyProfile/useAddCompanyProfile";
import useUpdateCompanyProfile from "../../../hooks/companyProfile/useUpdateCompanyProfile";
import {
	CompanyProfileSchema,
	CompanyProfileSchemaType,
} from "../../../validations/CompanyProfile";
import FileInputField from "../FileInputField";
import FormButton from "../FormButton";
import FormField from "../FormField";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import IconLoader from "../../common/IconLoader";

interface Props {
	companyProfile?: CompanyProfileSchemaType;
}

const CompanyProfileForm: FC<Props> = ({ companyProfile }) => {
	const addCompanyProfile = useAddCompanyProfile();
	const updateCompanyProfile = useUpdateCompanyProfile();
	const [whyStatement, setWhyStatement] = useState<string>("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<CompanyProfileSchemaType>({
		resolver: zodResolver(CompanyProfileSchema),
	});

	// State to manage file uploads
	const [files, setFiles] = useState<{
		video?: FileList;
		story_image?: FileList;
		why_us_image?: FileList;
	}>({});

	useEffect(() => {
		if (whyStatement || companyProfile) {
			setValue(
				"why_statement",
				whyStatement || (companyProfile?.why_statement as string),
			);
			trigger("why_statement");
		}
	}, [whyStatement, setValue, trigger, companyProfile]);

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
			updateCompanyProfile.mutate(payload, {
				onSuccess: () => {
					reset();
				},
			});
		} else {
			addCompanyProfile.mutate(payload, {
				onSuccess: () => {
					reset();
				},
			});
		}
	};

	return (
		<form action="" className="p-7" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4 mb-4 sm:grid-cols-2">
				<FormField label="Company Title" htmlFor="company_name">
					<InputField
						id="company_name"
						type="text"
						name="company_name"
						register={register}
						placeholder="Enter company name here"
						error={errors.company_name}
						value={companyProfile?.company_name}
					/>
				</FormField>
				<FormField label="Company Email" htmlFor="email">
					<InputField
						id="email"
						type="email"
						name="email"
						register={register}
						placeholder="Enter email address here"
						error={errors.email}
						value={companyProfile?.email}
					/>
				</FormField>
				<FormField label="Phone number" htmlFor="phone_number">
					<InputField
						id="phone_number"
						type="text"
						name="phone_number"
						register={register}
						placeholder="Enter company phone number here"
						error={errors.phone_number}
						value={companyProfile?.phone_number}
					/>
				</FormField>
				<FormField label="Video" htmlFor="video">
					<FileInputField
						id="video"
						name="video"
						error={errors.video as FieldError}
						onChange={handleFileChange}
					/>
				</FormField>
				<FormField label="About" htmlFor="about">
					<TextAreaField
						id="about"
						rows={6}
						name="about"
						register={register}
						placeholder="Enter company about here"
						error={errors.about}
						value={companyProfile?.about}
					/>
				</FormField>
				<FormField label="Story Description" htmlFor="story_description">
					<TextAreaField
						id="story_description"
						rows={6}
						name="story_description"
						register={register}
						placeholder="Enter company story description here"
						error={errors.story_description}
						value={companyProfile?.story_description}
					/>
				</FormField>
				<FormField label="Why Statement" htmlFor="message">
					<Editor
						apiKey="oy3f0667dm8vv681slskj4lk254o1jhliecbm63vyl9ks6e9"
						init={{
							height: 250,
							plugins:
								"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
							toolbar:
								"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
							skin: "oxide",
							content_css: "light",
							body_class: "light-mode",
						}}
						onEditorChange={(newContent) => setWhyStatement(newContent)}
						initialValue={companyProfile?.why_statement}
					/>
					<p className="text-xs text-red-600 my-1 min-h-4">
						{errors.why_statement && errors.why_statement.message}
					</p>
				</FormField>
				<div className="flex flex-col justify-center">
					<FormField label="Story Image" htmlFor="story_image">
						<FileInputField
							id="story_image"
							name="story_image"
							error={errors.story_image as FieldError}
							onChange={handleFileChange}
						/>
					</FormField>
					<FormField label="Why Us Image" htmlFor="why_us_image">
						<FileInputField
							id="why_us_image"
							name="why_us_image"
							error={errors.why_us_image as FieldError}
							onChange={handleFileChange}
						/>
					</FormField>
				</div>
			</div>
			<div className="w-full flex items-center justify-end pt-5">
				<FormButton
					type="submit"
					icon={<FaPlus />}
					text={
						addCompanyProfile.isPending || updateCompanyProfile.isPending ? (
							<>
								<IconLoader className="animate-spin" /> {"loading"}
							</>
						) : companyProfile ? (
							"Update"
						) : (
							"Create"
						)
					}
					disabled={
						addCompanyProfile.isPending || updateCompanyProfile.isPending
					}
				/>
			</div>
		</form>
	);
};

export default CompanyProfileForm;
