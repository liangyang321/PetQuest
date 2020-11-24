export class Animals {
  animals: [Animal];
  pagination: Pagination;
}

export class Animal {
  id: number;
  organization_id: string = null;
  url: string = null;
  type: string;
  species: string = null;
  breeds: Breeds;
  colors: Colors;
  age: string = null;
  gender: string = null;
  size: string = null;
  coat?: any = null;
  attributes: Attributes;
  environment: Environment;
  tags: any[];
  name: string;
  description: string = null;
  organization_animal_id: string;
  photos: Photo[];
  primary_photo_cropped: PrimaryPhotoCropped;
  videos: any[];
  status: string;
  status_changed_at: Date;
  published_at: Date;
  distance?: any;
  contact: Contact;
  _links: Links;
  // key: string = '';
  isEdit = false;
  organization_name: string = null;
}

export class Pagination {
  count_per_page: number;
  current_page: number;
  total_pages: number;
  total_count: number;
  _links: Links;
}

export class Links {
  previous: Previous;
  next: Next;

}

export class Previous {
  href: string;

}

export class Next {
  href: string;

}

export class Breeds {
  primary: string = '';
  secondary?: any = null;
  mixed: boolean = false;
  unknown: boolean = false;
}

export class Colors {
  primary?: any = '';
  secondary?: any = null;
  tertiary?: any = null;
}

export class Attributes {
  spayed_neutered = false;
  house_trained = false;
  declawed?: any = false;
  special_needs = false;
  shots_current = false;
}

export class Environment {
  children?: any = false;
  dogs?: any = false;
  cats?: any = false;
}

export class Photo {
  small: string = 'assets/images/notfound.png';
  medium: string = 'assets/images/notfound.png';
  large: string;
  full: string;
}

export interface PrimaryPhotoCropped {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export class Address {
  address1: string = null;
  address2?: any = null;
  city: string = null;
  state: string = null;
  postcode: string = null;
  country: string = null;
}

export class Contact {
  email: string;
  phone: string = null;
  address: Address = null;
}

export interface Self {
  href: string;
}

export interface Type {
  href: string;
}

export class Organization {
  href: string = null;
}

export interface Links {
  self: Self;
  type: Type;
  organization: Organization;
}


export class Types {
  types: [Type];
}

export class Type {
  name: string;
}

export class Geos {
  placeID: string;
  license: string;
  lat: string;
  lon: string;
  displayName: string;
  boundingBox: [];
  importance: number;
  address: {};
}

export interface Geo {
  geos: [Geo];
}



