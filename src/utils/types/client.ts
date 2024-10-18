export enum Status {
  CONTACTED = "Contacted",
  NOT_CONTACTED = "Not contacted",
  CONTACT_IN_FUTURE = "Contact in future",
}

export type Client = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  notes: string;
  status: Status;
};

export type Clients = Client[];

export type ClientDto = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
};
