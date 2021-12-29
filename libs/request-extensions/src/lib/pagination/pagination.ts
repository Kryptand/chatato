import { ObjectLiteral, PaginationMeta } from './models/pagination-meta';
import { PaginationLinks } from './models/pagination-links';

export class Pagination<
  PaginationObject,
  T extends ObjectLiteral = PaginationMeta
> {
  constructor(
    /**
     * a list of items to be returned
     */
    public readonly items: PaginationObject[],
    /**
     * associated meta information (e.g., counts)
     */
    public readonly meta: T,
    /**
     * associated links
     */
    public readonly links?: PaginationLinks
  ) {}
}
