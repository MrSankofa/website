export type RequestBody = {
  location_id: string;
  entity_id: string;
  event_type: string;
};

export type MailchimpSubscribeParams = {
  name: string;
  email_address: string;
  status: string;
};
