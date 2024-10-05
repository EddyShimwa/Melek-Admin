import { useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import ICompanyProfile from "../../entities/CompanyProfile";
import useCompanyProfile from "../../hooks/companyProfile/useCompanyProfile";
import Dialog from "../common/Dialog";
import FormModal from "../common/FormModal";
import NoDataFound from "../common/NoDataFound";
import CompanyProfileForm from "../Form/TableForms/CompanyProfile";

const CompanyProfilePage = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { data, error, isLoading } = useCompanyProfile();
	const [selectedProfile, setSelectedProfile] =
		useState<ICompanyProfile | null>(null);

	if (error) throw new Error(error.message);

	const toggleDialog = () => {
		setIsDialogOpen((curr) => !curr);
	};

	const handleAddProfile = () => {
		setSelectedProfile(null);
		toggleDialog();
	};

	const handleEditProfile = (profile: ICompanyProfile) => {
		setSelectedProfile(profile);
		toggleDialog();
	};

	const profileExists = data && data.data;

	return (
		<main className="min-h-screen p-10 bg-gradient-to-b from-blue-100 to-white">
			<Dialog
				isOpen={isDialogOpen}
				toggleIsOpen={toggleDialog}
				className="bg-black/70"
			>
				<FormModal
					title={`${selectedProfile ? "Update" : "Create new"} Company Profile`}
				>
					<CompanyProfileForm
						companyProfile={selectedProfile as ICompanyProfile}
						toggleModal={toggleDialog}
					/>
				</FormModal>
			</Dialog>

			<div className="flex justify-between items-center mb-10">
				<h2 className="text-4xl font-extrabold text-app-green">
					Company Profile
				</h2>
				<button
					type="button"
					onClick={
						profileExists
							? () => handleEditProfile(data.data)
							: handleAddProfile
					}
					className="px-6 py-3 rounded-md flex items-center justify-center gap-3 text-white text-lg bg-app-green hover:bg-green-600 shadow-lg transition-all duration-300"
				>
					{profileExists ? (
						<>
							<FaEdit />
							<span>Update Profile</span>
						</>
					) : (
						<>
							<FaPlus />
							<span>Add Profile</span>
						</>
					)}
				</button>
			</div>

			{isLoading ? (
				<div className="animate-pulse p-10 bg-white rounded-lg shadow-lg">
					<div className="h-8 bg-gray-200 rounded mb-4"></div>
					<div className="h-4 bg-gray-200 rounded mb-2"></div>
					<div className="h-4 bg-gray-200 rounded mb-2"></div>
					<div className="h-4 bg-gray-200 rounded mb-2"></div>
				</div>
			) : profileExists ? (
				<div className="bg-white p-10 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
					<div className="space-y-4">
						<h3 className="text-5xl font-bold text-app-green mb-5">
							{data.data.company_name}
						</h3>
						<p className="text-lg text-gray-700">
							<strong className="text-gray-800">About:</strong>{" "}
							{data.data.about}
						</p>
						<p className="text-lg text-gray-700">
							<strong className="text-gray-800">Story Description:</strong>{" "}
							{data.data.story_description}
						</p>
						<p className="text-lg text-gray-700">
							<strong className="text-gray-800">Why Statement:</strong>{" "}
							{data.data.why_statement}
						</p>
						<p className="text-lg text-gray-700">
							<strong className="text-gray-800">Email:</strong>{" "}
							{data.data.email}
						</p>
						<p className="text-lg text-gray-700">
							<strong className="text-gray-800">Phone Number:</strong>{" "}
							{data.data.phone_number}
						</p>
						<div className="mt-5">
							<strong className="text-gray-800 text-lg">Images:</strong>
							<div className="flex gap-4 mt-2">
								<div>
									<p className="text-sm text-gray-500">Story Image:</p>
									<img
										src={data.data.story_image_url}
										alt="Story"
										className="h-24 w-24 object-cover rounded-lg shadow-lg"
									/>
								</div>
								<div>
									<p className="text-sm text-gray-500">Why Us Image:</p>
									<img
										src={data.data.why_us_image_url}
										alt="Why Us"
										className="h-24 w-24 object-cover rounded-lg shadow-lg"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="relative">
						<p className="text-lg text-app-green   mb-3 font-bold">
							Company Video:
						</p>
						{data.data.video_url ? (
							<video
								className="w-full h-80 object-cover rounded-lg shadow-lg"
								src={data.data.video_url}
								onMouseOver={(e) => e.currentTarget.play()}
							/>
						) : (
							<div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
								No video available
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="p-10 text-center bg-white rounded-lg shadow-lg">
					<NoDataFound
						title="No Company Profile Found!"
						description="Try adding one by tapping on Add Company Profile"
					/>
				</div>
			)}
		</main>
	);
};

export default CompanyProfilePage;
