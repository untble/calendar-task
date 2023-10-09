export interface IHoliday {
  date: Date;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  countries: string[] | null;
  launchYear: number | null;
  types: string[]
}