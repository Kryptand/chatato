import { PaginationMeta } from './pagination-meta';
export interface PaginationOptionsRoutingLabels {
  /**
   * the limit text to append in router string
   */
  limitLabel?: string;

  /**
   * the page text to append in router string
   */
  pageLabel?: string;
}
export interface PaginationOptions<CustomMetaType = PaginationMeta> {
  /**
   * @default 10
   * the amount of items to be requested per page
   */
  limit: number | string;

  /**
   * @default 1
   * the page that is requested
   */
  page: number | string;

  /**
   * a basic route for generating links (i.e., WITHOUT query params)
   */
  route?: string;

  /**
   * For transforming the default meta data to a custom type
   */
  metaTransformer?: (meta: PaginationMeta) => CustomMetaType;

  /**
   * @default true
   * Turn off pagination count total queries. itemCount, totalItems, itemsPerPage and totalPages will be undefined
   */
  countQueries?: boolean;

  routingLabels?: PaginationOptionsRoutingLabels;
}
