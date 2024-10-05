import { useMutation } from "@tanstack/react-query";
import ICompanyProfile from "../../entities/CompanyProfile";
import { queryClient } from "../../main";
import APIClient from "../../services/api-client";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { CompanyProfileSchemaType } from "../../validations/CompanyProfile";
import { CompanyProfileFiles } from "../../entities/CompanyProfile";

const createFormData = (
	data: CompanyProfileSchemaType,
	files: CompanyProfileFiles,
) => {
	const formData = new FormData();

	formData.append("company_name", data.company_name);
	formData.append("about", data.about);
	formData.append("story_description", data.story_description);
	formData.append("why_statement", data.why_statement);
	formData.append("phone_number", data.phone_number);
	formData.append("email", data.email);

	if (files.video?.[0]) {
		formData.append("video", files.video[0]);
	}
	if (files.story_image?.[0]) {
		formData.append("story_image", files.story_image[0]);
	}
	if (files.why_us_image?.[0]) {
		formData.append("why_us_image", files.why_us_image[0]);
	}

	return formData;
};

const apiClient = new APIClient<ICompanyProfile, FormData>("/company-profile");

const useAddCompanyProfile = () =>
	useMutation({
		mutationFn: ({
			data,
			files,
		}: {
			data: CompanyProfileSchemaType;
			files: CompanyProfileFiles;
		}) => {
			const formData = createFormData(data, files);
			return apiClient.post(formData);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["CompanyProfiles"],
			});
			toastSuccess(data.message);
		},
		onError: (error) => {
			toastError(error.message);
		},
	});

export default useAddCompanyProfile;
