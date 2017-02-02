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
  {value: "groupes", label: "Groupes d'appui", apiName: 'groups'},
  {value: "evenements", label: "Événements locaux", apiName: 'events'}
];

/**
 * The base location of the API
 * @type {string}
 */
export const API_ENDPOINT = "https://api.jlm2017.fr/";

/**
 * The specific history handler to use with React Router
 *
 * Right now, we use hashHistory to allow compatibility with github pages.
 * browserHistory would be prettier and more standard, but requires specific
 * configuration of the web server, which cannot be done with gh-pages.
 */
export const HISTORY_HANDLER = hashHistory;
