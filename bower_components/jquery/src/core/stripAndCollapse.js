define( [
	"../var/rnothtmlwhite"
], function( rnothtmlwhite ) {
	"use strict";

	// Strip and collapse whitespace according to templates spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}

	return stripAndCollapse;
} );
