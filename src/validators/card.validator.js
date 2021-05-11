const { checkSchema, validationResult } = require('express-validator');

const errorFormatter = ({ msg }) => {
    return msg;
};

/**
 * Run validations against API request and throw error if any validation failed
 */
module.exports.validateCreateCatCard = async (req, res, next) => {
    try {
        await Promise.all(
            checkSchema({
                greeting: {
                    in: ['query'],
                    optional: { options: { nullable: false } }
                },
                who: {
                    in: ['query'],
                    optional: { options: { nullable: false } }
                },
                width: {
                    in: ['query'],
                    optional: { options: { nullable: false } },
                    isInt: {
                        errorMessage: 'Width should be numeric'
                    }
                },
                height: {
                    in: ['query'],
                    optional: { options: { nullable: false } },
                    isInt: {
                        errorMessage: 'Height should be numeric'
                    }
                },
                color: {
                    in: ['query'],
                    optional: { options: { nullable: false } }
                },
                size: {
                    in: ['query'],
                    optional: { options: { nullable: false } },
                    isInt: {
                        errorMessage: 'Size should be numeric'
                    }
                }
            }).map(validation => validation.run(req))
        );

        validationResult(req)
            .formatWith(errorFormatter)
            .throw();
        next();
    } catch (error) {
        return res.status(422).json({ 
            message: error.mapped && error.mapped()
        });
    }
};
