const BASE_URL = 'http://localhost:5001';

export const CATALOG_URL = BASE_URL +'/catalog';

export const ITEMS_URL = BASE_URL + '/api/items';

export const ITEMS_TAGS_URL = ITEMS_URL + '/tags';
export const ITEMS_BY_SEARCH_URL = ITEMS_URL + '/search/';
export const ITEMS_BY_TAG_URL = ITEMS_URL + '/tag/';
export const ITEM_BY_ID_URL = ITEMS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const TG_CREATE_URL = ORDERS_URL + '/telegram';

export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';


export const ITEMS_CATEGORIES_URL = ITEMS_URL + '/categories';

export const ORDERS_BY_USER_URL=ORDERS_URL+'/myorders';

export const READ_ITEMS_URL = BASE_URL + '/api/items';
export const READ_ITEM_BY_ID_URL = READ_ITEMS_URL + '/';
export const CREATE_ITEM_URL = READ_ITEMS_URL + '/';
export const UPDATE_ITEM_URL = READ_ITEMS_URL + '/';
export const DELETE_ITEM_URL = READ_ITEMS_URL + '/';

export const ORDERS_BY_STATUS_URL = ORDERS_URL + '/status/';
export const ORDERS_STATUS_URL = ORDERS_URL + '/statuses';

export const VARIANTS_URL = ITEMS_URL + '/variants';

