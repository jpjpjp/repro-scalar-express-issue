import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type RateLimited = Schemas.ErrorResponseObject;
        export type ServerError = Schemas.ErrorResponseObject;
        export type UnauthorizedToken = Schemas.ErrorResponseObject;
    }
    namespace Schemas {
        export interface CategoryGroupObject {
            /**
             * A system defined unique identifier for the category.
             */
            id: number; // int64
            /**
             * The name of the category.
             */
            name: string;
            /**
             * The description of the category or `null` if not set.
             */
            description: string | null;
            /**
             * If true, the transactions in this category will be treated as income.
             */
            is_income: boolean;
            /**
             * If true, the transactions in this category will be excluded from the budget.
             */
            exclude_from_budget: boolean;
            /**
             * If true, the transactions in this category will be excluded from totals.
             */
            exclude_from_totals: boolean;
            /**
             * The date and time of when the category was last updated (in the ISO 8601 extended format).
             */
            updated_at?: string; // date-time
            /**
             * The date and time of when the category was created (in the ISO 8601 extended format).
             */
            created_at?: string; // date-time
            /**
             * For categoryGroupObject, is_group is always true.
             */
            is_group: true;
            /**
             * The ID of the category group this category belongs to or `null` if the category doesn't belong to a group, or is itself a category group.
             */
            group_id: number | null; // int64
            /**
             * If true, the category is archived and not displayed in relevant areas of the Lunch Money app.
             */
            archived: boolean | null;
            /**
             * The date and time of when the category was last archived (in the ISO 8601 extended format).
             */
            archived_on: string | null; // date-time
            /**
             * An index specifying the position in which the category is displayed on the categories page in the Lunch Money GUI. For categories within a category group the order index is relative to the other categories within the group.
             */
            order: number;
            /**
             * For category groups, this will populate with the child category IDs.
             */
            children: number[];
            /**
             * For category groups, and when requested via the `hydrate_children` query parameter this attribute will include the full category object for each of the child categories that belong to this category group.
             */
            hydrated_children?: CategoryObject[] | null;
        }
        export interface CategoryObject {
            /**
             * A system defined unique identifier for the category.
             */
            id: number; // int64
            /**
             * The name of the category.
             */
            name: string;
            /**
             * The description of the category or `null` if not set.
             */
            description: string | null;
            /**
             * If true, the transactions in this category will be treated as income.
             */
            is_income: boolean;
            /**
             * If true, the transactions in this category will be excluded from the budget.
             */
            exclude_from_budget: boolean;
            /**
             * If true, the transactions in this category will be excluded from totals.
             */
            exclude_from_totals: boolean;
            /**
             * The date and time of when the category was last updated (in the ISO 8601 extended format).
             */
            updated_at?: string; // date-time
            /**
             * The date and time of when the category was created (in the ISO 8601 extended format).
             */
            created_at?: string; // date-time
            /**
             * For categoryObject, is_group is always false.
             */
            is_group: false;
            /**
             * The ID of the category group this category belongs to or `null` if the category doesn't belong to a group, or is itself a category group.
             */
            group_id: number | null; // int64
            /**
             * If true, the category is archived and not displayed in relevant areas of the Lunch Money app.
             */
            archived: boolean | null;
            /**
             * The date and time of when the category was last archived (in the ISO 8601 extended format).
             */
            archived_on: string | null; // date-time
            /**
             * An index specifying the position in which the category is displayed on the categories page in the Lunch Money GUI. For categories within a category group the order index is relative to the other categories within the group.
             */
            order: number;
            /**
             * For grouped categories, the name of the category group. If `is_group `is false, this attribute will not exist. If it is true, this attribute will contain the name of the category with the id specified in `group_id`
             */
            group_name?: string;
        }
        export interface CreateCategoryRequestObject {
            /**
             * The name of the new category. Must be between 1 and 100 characters.
             * Must not match the name of any existing categories or category groups.
             */
            name: string;
            /**
             * The description of the category. Must not exceed 200 characters.
             */
            description?: string | null;
            /**
             * If true, the transactions in this category will be treated as income.
             */
            is_income?: boolean;
            /**
             * If true, the transactions in this category will be excluded from the budget.
             */
            exclude_from_budget?: boolean;
            /**
             * If true, the transactions in this category will be excluded from totals.
             */
            exclude_from_totals?: boolean;
            /**
             * If true, the category is a group that can be a parent to other categories, but may not be assigned directly to transactions.
             */
            is_group?: boolean;
            /**
             * If set to the ID of an existing category group, this new category will be assigned to that group. Cannot be set if `is_group` is true.
             */
            group_id?: number; // int64
            /**
             * If true, the category is archived and not displayed in relevant areas of the Lunch Money app.
             */
            archived?: boolean | null;
            /**
             * An index specifying the position in which the category is displayed on the categories page in the Lunch Money GUI. For categories within a category group the order index is relative to the other categories within the group.
             */
            order?: number;
            /**
             * The list of category IDs to add to the new category group. This attribute should only be set if "group_id" is set to true.
             *
             * The ids specified must all belong to existing categories that are not already part of a category group or are themselves category groups
             */
            children?: number[];
        }
        export interface DeleteCategoryResponseWithDependencies {
            /**
             * The name of the category
             */
            category_name?: string;
            dependents?: {
                /**
                 * The number of budgets depending on the category
                 */
                budget?: number;
                /**
                 * The number of category rules depending on the category
                 */
                category_rules?: number;
                /**
                 * The number of transactions depending on the category
                 */
                transactions?: number;
                /**
                 * The number of child categories in the category group
                 */
                children?: number;
                /**
                 * The number of recurring transactions depending on the category
                 */
                recurring?: number;
                /**
                 * The number of Plaid categories depending on the category
                 */
                plaid_cats?: number;
            };
        }
        export interface ErrorResponseObject {
            /**
             * overall error message
             */
            message: string;
            errors: {
                [key: string]: any;
            }[];
        }
        /**
         * If the `hydrate_recurrances` query param was set to true, this attribute will be a Recurring Object for any  transactions that have a non null recurring_id
         *
         */
        export interface RecurrenceObject {
            /**
             * Payee name of the recurring item
             */
            payee?: string;
            /**
             * Description of associated recurring item
             */
            description?: string;
            /**
             * Cadence of associated recurring item
             */
            recurring_cadence?: "one of once a week" | "every 2 weeks" | "twice a month" | "monthly" | "every 2 months" | "every 3 months" | "every 4 months" | "twice a year" | "yearly";
            /**
             * Type of associated recurring?  Do we still need this?
             */
            type?: "cleared" | "suggested" | "dismissed";
            /**
             * Amount of associated recurring item
             */
            amount?: number; // double
            /**
             * Currency of associated recurring item
             */
            currency?: string;
        }
        /**
         * If the `hydrate_account` query parameter is set to true this field will contain the simplified account object for the account associated with this transaction.
         */
        export interface SimplifiedAccountObject {
            /**
             * The unique identifer of this account
             */
            id?: number; // int64
            /**
             * The source of this account. Do we need to add crypto to this enum?
             */
            source?: "plaid" | "manual";
            /**
             * Name of the account.  For plaid accounts this can be overridden by the user. Field is originally set by Plaid
             */
            name?: string;
            /**
             * Institution name of associated account.
             */
            institution_name?: string;
            /**
             * Display name of the account, if not set by the user this be a concatenated string of institution and account name.
             */
            display_name?: string;
            /**
             * The primary type of the account.  For plaid accounts this field is set by plaid and can only be one of `brokerage`, `cash`, `credit`, `depository`, `investment` or `loan`.
             */
            type?: "brokerage" | "cash" | "credit" | "cryptocurrency" | "depository" | "employee compensation" | "investment" | "loan" | "real estate" | "vehicle" | "other liability" | "other asset";
            /**
             * An optional subtype for the account. For plaid accounts this is set by plaid and cannot be changed.  For manual accounts it may be set to anything.
             */
            subtype?: string | null;
            /**
             * Current balance of the account in numeric format to 4 decimal places.
             */
            balance?: number; // double
            /**
             * Date balance was last updated in ISO 8601 extended format.
             */
            balance_as_of?: string; // date-time
            /**
             * Status of account.  All account types may be `active`. Only Manual Account may be `closed`.  All other statuses are specific to Plaid accounts.
             */
            status?: "active" | "closed" | "inactive" | "relink" | "syncing" | "error" | "not supported";
        }
        /**
         * When a transaction matches a recurring item, this object will be  returned as part of the transaction object.  The full details of the  recurring item can be queried by calling `GET /recurring_items/{id}`.
         *
         */
        export interface SimplifiedRecurringItemObject {
            /**
             * Unique identifier for the recurring item
             */
            id?: number; // int64
            /**
             * The type of recurring item.<br>
             * When this is `cleared` the related
             * fields in matching transactions are automatically updated based
             * on the values in the recurring item.<br>
             * Matching `suggested` recurring items are viewable in the GUI but are not
             * automatically applied to transactions.
             *
             */
            type?: "cleared" | "suggested";
            /**
             * The payee used to populate the `display_name` field in a transaction when the recurring item is matched.
             */
            payee?: string;
            /**
             * The notes used to populate the `display_notes` field in a transaction when the recurring item is matched.
             */
            notes?: string;
            /**
             * The category_id used to populate the `category_id` field in a transaction when the recurring item is matched.
             */
            category_id?: number; // int64
        }
        export interface TagObject {
            /**
             * Unique identifier for the tag.
             */
            id?: number; // int64
            /**
             * Name of the tag.
             */
            name?: string;
            /**
             * Description of the tag.
             */
            description?: string | null;
            /**
             * Status of the tag, whether it is archived or not.
             */
            archived?: boolean;
        }
        export interface TransactionObject {
            /**
             * System created unique identifier for transaction
             */
            id?: number; // int64
            /**
             * Date of transaction in ISO 8601 format
             */
            date?: string; // date
            /**
             * Amount of the transaction in numeric format to 4 decimal places
             */
            amount?: string;
            /**
             * Three-letter lowercase currency code of the transaction in ISO 4217 format
             */
            currency?: string;
            /**
             * The amount converted to the user's primary currency. If the multicurrency feature is not being used, to_base and amount will be the same.
             */
            to_base?: number; // double
            /**
             * Name of payee set by the user or bank. The value displayed in the
             * GUI is returned in the `display_name` attribute. This may differ
             * if the transaction is linked to a recurring item.
             *
             */
            payee?: string;
            /**
             * Unique identifier of associated category set by the user or by a matched and cleared recurring_item. Category details can be obtained by passing the value of this attribute to the [Get A Single Category](../operations/getCategoryById) API
             */
            category_id?: number | null; // int64
            /**
             * Status of the transaction:
             * - `cleared`: User has reviewed the transaction, or it was automatically marked as cleared due to cleared recurring_item logic
             * - `uncleared`: User has not reviewed the transaction and it does not match any cleared recurring_items.
             * - `delete_pending`: The synced account deleted this transaction after it was updated by the user.  Requires manual intervention.
             * - `pending`: Transaction is pending (not posted).
             *
             */
            status?: "cleared" | "uncleared" | "delete_pending" | "pending";
            /**
             * Denotes if the transaction is pending (not posted). Applies only to transactions in synced accounts and will always be false for transactions associated with manual accounts.
             */
            is_pending?: boolean;
            /**
             * Notes originally set by the user. The value displayed in the
             * GUI is returned in the `display_notes` attribute. This may differ
             * if the transaction is linked to a recurring item.
             *
             */
            notes?: string | null;
            /**
             * The date and time of when the transaction was created (in the ISO 8601 extended format).
             */
            created_at?: string; // date-time
            /**
             * The date and time of when the transaction was last updated (in the ISO 8601 extended format).
             */
            updated_at?: string; // date-time
            /**
             * The transactions original name before any payee name updates. For synced transactions, this is the raw original payee name from your bank.
             */
            original_name?: string;
            /**
             * The unique identifier of associated the associated recurring item that this transaction matched.  If this field is not null the transaction object will also include a simplified recurring_item object with details on how the recurring_item influenced this transaction
             */
            recurring_id?: number | null; // int64
            /**
             * When a transaction matches a recurring item, this simplified
             * representation of the matched item will be returned as part of the transaction object.
             * The full details of the recurring item can be queried by calling
             * `GET /recurring_items/{id}`.
             *
             */
            recurring_item?: {
                /**
                 * Unique identifier for the recurring item
                 */
                id?: number; // int64
                /**
                 * The type of recurring item.<br>
                 * When this is `cleared` the related
                 * fields in matching transactions are automatically updated based
                 * on the values in the recurring item.<br>
                 * Matching `suggested` recurring items are viewable in the GUI but are not
                 * automatically applied to transactions.
                 *
                 */
                type?: "cleared" | "suggested";
                /**
                 * The payee used to populate the `display_name` field in a transaction when the recurring item is matched.
                 */
                payee?: string;
                /**
                 * The notes used to populate the `display_notes` field in a transaction when the recurring item is matched.
                 */
                notes?: string;
                /**
                 * The category_id used to populate the `category_id` field in a transaction when the recurring item is matched.
                 */
                category_id?: number; // int64
            };
            /**
             * Exists if this is a split transaction. Denotes the transaction ID of the original, or parent, transaction.
             */
            parent_id?: number | null; // int64
            /**
             * Exists only for transactions which are the parent of a split transaction, and contains a list of ids for the associated transactions that it was split into. By default parent transactions are not returned in a `GET /transactions` API call, but can be examined via a subsequent call to `GET /transactions{id}`, where the value of `parent_id` field of a split transaction is the requested transaction.
             */
            children?: number[];
            /**
             * True if this transaction represents a group of transactions. If so, amount and currency represent the totalled amount of transactions bearing this transaction’s id as their group_id. Amount is calculated based on the user’s primary currency.
             */
            is_group?: boolean;
            /**
             * Is set if this transaction is part of a group. Denotes the ID of the grouped transaction this is now included in. By default the transactions that were grouped are not returned in a call to `GET /transactions` but they can be queried directly by calling the `GET /transactions/group/{id}`, where the id passed is associated with a transaction where the `is_group` attribute is true
             */
            group_id?: number | null; // int64
            /**
             * The unique identifier of the manual account associated with this transaction.  This will always be null if this transacation is associated with a synced account or if this transaction has no associated account and appears as a "Cash Transaction" in the Lunch Money GUI.
             */
            manual_account_id?: number | null; // int64
            /**
             * The unique identifier of the synced account associated with this transaction.  This will always be null if this transacation is associated with a manual account or if this transaction has no associated account and appears as a "Cash Transaction" in the Lunch Money GUI.
             */
            synced_account_id?: number | null; // int64
            /**
             * A list of tag_ids for the tags associated with this transaction.  If the transaction has no tags this will be an empty list.<br> Tag details can be obtained by passing the value of this attribute as the `ids` query parameter to the [List Tags](../operations/getTags) API
             */
            tag_ids?: number /* int64 */[];
            /**
             * The display name for the payee of the transaction. This is determined by whether the transaction is linked to a cleared recurring item or not. If it is linked, the value of the `payee` field in the `recuring_item` is returned. If not, the `payee` field is returned.
             */
            display_name?: string;
            /**
             * Display notes for transaction. If the transaction is linked to a cleared recurring item, the value of the `notes` attribute in the `recuring_item` is returned. Otherwise, returns the `notes` field.
             */
            display_notes?: string | null;
            /**
             * Pending updated list of values from Jen
             */
            source?: string;
            /**
             * A user-defined external ID for any transaction that was added vi\a csv import, `POST /transactions` API call, or manually added via the Lunch Money GUI.  No external ID exists for transactions associated with synced accounts, and they cannot be added. For transactions associated with manual accounts, the external ID must be unique as attempts to add a subsequent transaction with the same external_id and manual_account_id will be flagged as duplicates and fail.
             */
            external_id?: string | null;
        }
        export interface UpdateCategoryRequestObject {
            /**
             * If set the new name of the category. Must be between 1 and 100 characters.
             */
            name?: string;
            /**
             * If set the new description of the category. Must not exceed 200 characters.
             */
            description?: string | null;
            /**
             * If set will indicate if this category will be treated as income.
             */
            is_income?: boolean;
            /**
             * If set will indicate if this category will be excluded from budgets.
             */
            exclude_from_budget?: boolean;
            /**
             * If set will indicate if this category will be excluded from totals.
             */
            exclude_from_totals?: boolean;
            /**
             * If set will indicate if this category is archived.
             */
            archived?: boolean | null;
            /**
             * If set to the ID of an existing category group, and this category is not itself a category group, this category will be a child of the specified group.
             */
            group_id?: number; // int64
            /**
             * If set the index of the category's position in the Lunch Money GUI.
             */
            order?: number | null;
            /**
             * If set, this attribute may not be set to a value that is different than the current status of the category as a category group.
             */
            is_group?: boolean;
            /**
             * If set the list of category ids that are children of this category group. This attribute should only be set if the category is already a group. The ids specified must all belong to existing categories that are not already part of a category group or are themselves category groups.
             */
            children?: number[] | null;
            /**
             * System defined unique identifier for the category. Ignored if set.
             */
            id?: number; // int64
            /**
             * System set date and time of when the category was last archived (in the ISO 8601 extended format).  Ignored if set.
             */
            archived_on?: string | null;
            /**
             * System set date and time of when the category was last updated (in the ISO 8601 extended format). Ignored if set.
             */
            updated_at?: string | null;
            /**
             * System set date and time of when the category was created (in the ISO 8601 extended format).  Ignored if set.
             */
            created_at?: string | null;
            /**
             * For grouped categories, the defined name of the category group.  Ignored if set. Set `group_id` to modify the group that a category belongs to.
             */
            group_name?: string | null;
        }
        export interface UserObject {
            [name: string]: any;
            /**
             * User's name
             */
            user_name: string;
            /**
             * User's email
             */
            user_email: string;
            /**
             * Unique identifier for user
             */
            user_id: number; // int64
            /**
             * Unique identifier for the associated budgeting account
             */
            account_id: number; // int64
        }
    }
}
declare namespace Paths {
    namespace CreateCategory {
        export type RequestBody = Components.Schemas.CreateCategoryRequestObject;
        namespace Responses {
            export type $201 = Components.Schemas.CategoryObject | Components.Schemas.CategoryGroupObject;
            export type $400 = Components.Schemas.ErrorResponseObject;
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $429 = Components.Responses.RateLimited;
            export type $500 = Components.Responses.ServerError;
        }
    }
    namespace DeleteCategory {
        namespace Parameters {
            export type Force = boolean;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            force?: Parameters.Force;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $404 = Components.Schemas.ErrorResponseObject;
            export type $422 = Components.Schemas.DeleteCategoryResponseWithDependencies;
            export type $429 = Components.Responses.RateLimited;
            export type $5XX = Components.Responses.ServerError;
        }
    }
    namespace GetAllCategories {
        namespace Parameters {
            export type Format = "flattened" | "nested";
            export type HydrateChildren = boolean;
            export type Ids = number[];
        }
        export interface QueryParameters {
            format?: Parameters.Format;
            ids?: Parameters.Ids;
            hydrate_children?: Parameters.HydrateChildren;
        }
        namespace Responses {
            export interface $200 {
                categories?: (Components.Schemas.CategoryObject | Components.Schemas.CategoryGroupObject)[];
            }
            export type $400 = Components.Schemas.ErrorResponseObject;
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $429 = Components.Responses.RateLimited;
            export type $5XX = Components.Responses.ServerError;
        }
    }
    namespace GetAllTransactions {
        namespace Parameters {
            export type CategoryId = number; // int64
            export type EndDate = string; // date
            export type IncludePending = boolean;
            export type IsGroup = boolean;
            export type Limit = number;
            export type ManualAccountId = number; // int64
            export type Offset = number;
            export type RecurringId = number; // int64
            export type StartDate = string; // date
            export type Status = "cleared" | "uncleared" | "delete_pending" | "pending";
            export type SyncedAccountId = number; // int64
            export type TagId = number; // int64
        }
        export interface QueryParameters {
            start_date?: Parameters.StartDate /* date */;
            end_date?: Parameters.EndDate /* date */;
            manual_account_id?: Parameters.ManualAccountId /* int64 */;
            synced_account_id?: Parameters.SyncedAccountId /* int64 */;
            recurring_id?: Parameters.RecurringId /* int64 */;
            category_id?: Parameters.CategoryId /* int64 */;
            is_group?: Parameters.IsGroup;
            status?: Parameters.Status;
            tag_id?: Parameters.TagId /* int64 */;
            include_pending?: Parameters.IncludePending;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Set to true if more transactions are avaialalbe
                 */
                has_more?: boolean;
                transactions?: Components.Schemas.TransactionObject[];
                error?: string;
            }
            export type $400 = Components.Schemas.ErrorResponseObject;
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $429 = Components.Responses.RateLimited;
            export type $5XX = Components.Responses.ServerError;
        }
    }
    namespace GetCategoryById {
        namespace Parameters {
            export type HydrateChildren = boolean;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate_children?: Parameters.HydrateChildren;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CategoryObject | Components.Schemas.CategoryGroupObject;
            export type $400 = Components.Schemas.ErrorResponseObject;
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $404 = Components.Schemas.ErrorResponseObject;
            export type $429 = Components.Responses.RateLimited;
            export type $5XX = Components.Responses.ServerError;
        }
    }
    namespace GetMe {
        namespace Responses {
            export type $200 = Components.Schemas.UserObject;
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $429 = Components.Responses.RateLimited;
            export type $5XX = Components.Responses.ServerError;
        }
    }
    namespace UpdateCategory {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateCategoryRequestObject;
        namespace Responses {
            export type $200 = Components.Schemas.CategoryObject | Components.Schemas.CategoryGroupObject;
            export type $400 = Components.Schemas.ErrorResponseObject;
            export type $401 = Components.Responses.UnauthorizedToken;
            export type $404 = Components.Schemas.ErrorResponseObject;
            export type $429 = Components.Responses.RateLimited;
            export type $5XX = Components.Responses.ServerError;
        }
    }
}

export interface OperationMethods {
  /**
   * getMe - Get details about the user associated with the supplied authorization token.
   */
  'getMe'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMe.Responses.$200>
  /**
   * getAllCategories - Get all categories
   * 
   * Retrieve a list of all categories associated with the user's account.
   */
  'getAllCategories'(
    parameters?: Parameters<Paths.GetAllCategories.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllCategories.Responses.$200>
  /**
   * createCategory - Create a new category or category group
   * 
   * Creates a new category with the given name.
   * 
   * If the `is_group` attribute is set to true, a category group is created. In this case the `children` attribute may also be set to an array of existing category IDs to add to the newly created category group.
   */
  'createCategory'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCategory.Responses.$201>
  /**
   * getCategoryById - Get a single category
   * 
   * Retrieve details of a specific category or category group by its ID.
   */
  'getCategoryById'(
    parameters?: Parameters<Paths.GetCategoryById.QueryParameters & Paths.GetCategoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCategoryById.Responses.$200>
  /**
   * updateCategory - Update an existing category or category group
   * 
   * Updates an existing category or category group.
   * 
   * You may submit the response from a `GET /categories/{id}` as the request body which includes system created attributes such as `id` or `created_at`, however only the `name`, `description`, `is_income`, `exclude_from_budget`, `exclude_from_totals`, `archived`, `group_id`, `order` and `children` can be updated using this API.
   * 
   * It is also possible to provide only the attribute(s) to be updated in the request body, as long as the request includes at least one of the attributes listed above. For example a request body that contains only a `name` attribute is valid.
   * It is not possible to use this API to convert a category to a category group, or a vice versa, so while submitting a request body with the `is_group` attribute is tolerated, it will result in an error response if the value is changed.
   * 
   * It is possible to modify the children of an existing category group with this API by setting the `children` attribute.  If this is set it will replace the existing children with the newly specified children, so if the intention is to add or remove a single category, it is more straightforward to update the child category by specifying the new `group_id` attribute. If the goal is to add multiple new children or remove multiple existing children, it is reccomended to first call the `GET /categories/:id` endpoint to get the existing children and then modify the list as desired.
   */
  'updateCategory'(
    parameters?: Parameters<Paths.UpdateCategory.PathParameters> | null,
    data?: Paths.UpdateCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateCategory.Responses.$200>
  /**
   * deleteCategory - Deletes an existing category or category group
   * 
   * Attempts to delete the single category or category group specified on the path. By default his will only work if there are no dependencies, such as existing budgets for the category, categorized transactions, children categories for a category group, categorized recurring items, etc. If there are dependents, this endpoint will return and object that describes each of the possible dependencies are and how many there are.
   */
  'deleteCategory'(
    parameters?: Parameters<Paths.DeleteCategory.QueryParameters & Paths.DeleteCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteCategory.Responses.$204>
  /**
   * getAllTransactions - Get all transactions
   * 
   * Retrieve a list of all transactions associated with a user's account
   */
  'getAllTransactions'(
    parameters?: Parameters<Paths.GetAllTransactions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllTransactions.Responses.$200>
}

export interface PathsDictionary {
  ['/me']: {
    /**
     * getMe - Get details about the user associated with the supplied authorization token.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMe.Responses.$200>
  }
  ['/categories']: {
    /**
     * getAllCategories - Get all categories
     * 
     * Retrieve a list of all categories associated with the user's account.
     */
    'get'(
      parameters?: Parameters<Paths.GetAllCategories.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllCategories.Responses.$200>
    /**
     * createCategory - Create a new category or category group
     * 
     * Creates a new category with the given name.
     * 
     * If the `is_group` attribute is set to true, a category group is created. In this case the `children` attribute may also be set to an array of existing category IDs to add to the newly created category group.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCategory.Responses.$201>
  }
  ['/categories/{id}']: {
    /**
     * getCategoryById - Get a single category
     * 
     * Retrieve details of a specific category or category group by its ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetCategoryById.QueryParameters & Paths.GetCategoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCategoryById.Responses.$200>
    /**
     * updateCategory - Update an existing category or category group
     * 
     * Updates an existing category or category group.
     * 
     * You may submit the response from a `GET /categories/{id}` as the request body which includes system created attributes such as `id` or `created_at`, however only the `name`, `description`, `is_income`, `exclude_from_budget`, `exclude_from_totals`, `archived`, `group_id`, `order` and `children` can be updated using this API.
     * 
     * It is also possible to provide only the attribute(s) to be updated in the request body, as long as the request includes at least one of the attributes listed above. For example a request body that contains only a `name` attribute is valid.
     * It is not possible to use this API to convert a category to a category group, or a vice versa, so while submitting a request body with the `is_group` attribute is tolerated, it will result in an error response if the value is changed.
     * 
     * It is possible to modify the children of an existing category group with this API by setting the `children` attribute.  If this is set it will replace the existing children with the newly specified children, so if the intention is to add or remove a single category, it is more straightforward to update the child category by specifying the new `group_id` attribute. If the goal is to add multiple new children or remove multiple existing children, it is reccomended to first call the `GET /categories/:id` endpoint to get the existing children and then modify the list as desired.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateCategory.PathParameters> | null,
      data?: Paths.UpdateCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateCategory.Responses.$200>
    /**
     * deleteCategory - Deletes an existing category or category group
     * 
     * Attempts to delete the single category or category group specified on the path. By default his will only work if there are no dependencies, such as existing budgets for the category, categorized transactions, children categories for a category group, categorized recurring items, etc. If there are dependents, this endpoint will return and object that describes each of the possible dependencies are and how many there are.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCategory.QueryParameters & Paths.DeleteCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteCategory.Responses.$204>
  }
  ['/transactions']: {
    /**
     * getAllTransactions - Get all transactions
     * 
     * Retrieve a list of all transactions associated with a user's account
     */
    'get'(
      parameters?: Parameters<Paths.GetAllTransactions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllTransactions.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
