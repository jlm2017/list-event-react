/**
 * Array of searchable item types.
 * Every object in this array must have the following attributes:
 *
 * - value: the identifying name that is notably used in url fragments
 * - label: the readable label that is shown to the user in the body of the page
 * - apiName: the name identifying the corresponding API resource
 *
 * @type {[*]}
 */
export const ITEM_TYPES = [
  {
    value: 'groupes',
    label: 'groupe d\'appui',
    labelPlural: "groupes d'appui",
    demonstrativeForm: "Ce groupe d'appui",
    apiName: 'groups',
    searchOptions: {}
  },
  {
    value: 'evenements',
    label: 'événement local',
    labelPlural: 'événements locaux',
    demonstrativeForm: "Cet événement",
    apiName: 'events',
    searchOptions: {agenda: 'evenements_locaux'}
  }
];

/**
 * The same information as in ITEM_TYPES above, but organised as a mapping with field value as a key
 * It allows to more easily get all the config information associated with an item type
 *
 * @type {*}
 */
export const ITEM_TYPES_MAP = ITEM_TYPES.reduce(function(map, it) {
  map[it.value] = it;
  return map;
}, {});

/**
 * The base location of the API
 * @type {string}
 */
export const API_ENDPOINT = "https://api.lafranceinsoumise.fr/legacy";

/**
 * The information for OAuth2
 */
export const OAUTH = {
  clientId: 'react_app',
  clientSecret: 'thohrahShe1Taengegoomeganei8ook9',
  authorizationUri: 'https://auth.lafranceinsoumise.fr/autoriser',
  accessTokenUri: 'https://auth.lafranceinsoumise.fr/token',
}
/**
 * The base location of the zipcode API
 */
export const ZIPCODE_ENDPOINT = "https://api-adresse.data.gouv.fr";

export const NB_ITEMS_PER_PAGE = 5;
