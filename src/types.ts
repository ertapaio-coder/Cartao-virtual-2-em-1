export interface Testimonial {
  name: string;
  location: string;
  text: string;
}

export interface Proof {
  src: string;
  name: string;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
}

export interface Benefit {
  icon: any;
  title: string;
  desc: string;
}

export interface Bonus {
  icon: any;
  title: string;
  desc: string;
}

export interface Buyer {
  name: string;
  city: string;
  time?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
