import Loader from "../../components/common/Loader";
import CompanyProfileForm from "../../components/Form/TableForms/CompanyProfileForm";
import TableContainer from "../../components/tables/tableComponents/TableContainer";
import useCompanyProfile from "../../hooks/companyProfile/useCompanyProfile";

const CompanyProfile = () => {
	const { data, error, isLoading } = useCompanyProfile();

	if (error) throw new Error(error.message);

	return (
		<TableContainer className="min-h-screen">
			<div className="p-5">
				<h2 className="text-2xl font-semibold">Company Offers</h2>
			</div>
			{isLoading || !data ? (
				<Loader />
			) : (
				<CompanyProfileForm companyProfile={data.data} />
			)}
		</TableContainer>
	);
};

export default CompanyProfile;
