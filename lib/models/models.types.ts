export type JobApplication = {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  columnId?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  tags?: string[];
  description?: string;
};

export type Column = {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplication[];
};

export type Board = {
  _id: string;
  name: string;
  columns: Column[];
};
