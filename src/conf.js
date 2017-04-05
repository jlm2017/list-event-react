import {hashHistory} from 'react-router'

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
export const API_ENDPOINT = "https://api.jlm2017.fr";

/**
 * The base location of the zipcode API
 */
export const ZIPCODE_ENDPOINT = "https://api-adresse.data.gouv.fr";

/**
 * The specific history handler to use with React Router
 *
 * Right now, we use hashHistory to allow compatibility with github pages.
 * browserHistory would be prettier and more standard, but requires specific
 * configuration of the web server, which cannot be done with gh-pages.
 */
export const HISTORY_HANDLER = hashHistory;

export const NB_ITEMS_PER_PAGE = 5;