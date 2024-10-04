export interface IMilestone {
	id: string;
	year: number;
	month: string;
	description: string;
}

export interface IAddMilestone {
	id: string;
	year: number;
	description: string;
}

export default interface IMilestoneResponse {
	milestones: IMilestone[];
	total: number;
	current_page: number;
	hasNextPage: boolean;
	total_pages: number;
}
