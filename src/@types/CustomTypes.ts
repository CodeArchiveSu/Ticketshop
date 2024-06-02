export declare type Events = {
  id: string;
  name: string;
  images: Image[];
  dates: Dates;
  promoter: Promoter;
  _embedded: _embedded;
  priceRanges: priceRanges[];
};

export declare interface priceRanges {
  max: number;
}

export declare interface _embedded {
  venues: venues[];
}

export declare interface venues {
  name: string;
}

export declare interface Promoter {
  id: number;
}
export declare interface Image {
  url: string;
  width: number;
}
export declare interface Dates {
  start: Start;
}

export declare interface Start {
  localDate: string;
}
