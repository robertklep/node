/**
 * @fileoverview Rule to flag duplicate arguments
 * @author Jamund Ferguson
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow duplicate arguments in `function` definitions",
            category: "Possible Errors",
            recommended: true
        },

        schema: []
    },

    create: function(context) {

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        /**
         * Checks whether or not a given definition is a parameter's.
         * @param {escope.DefEntry} def - A definition to check.
         * @returns {boolean} `true` if the definition is a parameter's.
         */
        function isParameter(def) {
            return def.type === "Parameter";
        }

        /**
         * Determines if a given node has duplicate parameters.
         * @param {ASTNode} node The node to check.
         * @returns {void}
         * @private
         */
        function checkParams(node) {
            var variables = context.getDeclaredVariables(node);

            for (var i = 0; i < variables.length; ++i) {
                var variable = variables[i];

                // Checks and reports duplications.
                var defs = variable.defs.filter(isParameter);

                if (defs.length >= 2) {
                    context.report({
                        node: node,
                        message: "Duplicate param '{{name}}'.",
                        data: {name: variable.name}
                    });
                }
            }
        }

        //--------------------------------------------------------------------------
        // Public API
        //--------------------------------------------------------------------------

        return {
            FunctionDeclaration: checkParams,
            FunctionExpression: checkParams
        };

    }
};
