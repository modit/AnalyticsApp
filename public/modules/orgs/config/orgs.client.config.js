'use strict';

// Configuring the Articles module
angular.module('orgs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('n', 'Orgs', 'orgs', 'dropdown', '/orgs(/create)?');
		Menus.addSubMenuItem('n', 'orgs', 'List Orgs', 'orgs');
		Menus.addSubMenuItem('n', 'orgs', 'New Org', 'orgs/create');
	}
]);