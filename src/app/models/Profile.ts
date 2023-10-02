export class Profile {
  _id?: number;
  name_pro: string;
  contentType_pro: string;
  state_pro: string = 'Active';
  fk_id_use: number;

  constructor(
    name_pro: string,
    contentType_pro: string,
    state_pro: string = 'Active',
    fk_id_use: number
  ) {
    this.name_pro = name_pro;
    this.contentType_pro = contentType_pro;
    this.state_pro = state_pro;
    this.fk_id_use = fk_id_use;
  }
}
