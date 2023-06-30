import { Advertisement } from "../entities";
interface Ipagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Array<Advertisement>;
}

interface IpaginationParams {
  page: number;
  perPage: number;
  prevPage: string | null;
  nextPage: string | null;
}

export { Ipagination, IpaginationParams };
