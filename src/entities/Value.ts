interface IValue {
	id: string;
	title: string;
	description: string;
}

export default interface IValueResponse {
	values: IValue[];
	total: number;
	current_page: number;
	hasNextPage: boolean;
	total_pages: number;
}
