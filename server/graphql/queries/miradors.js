import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

// types
import miradorType from '../../types/models/mirador';

// bll
import Miradors from '../../bll/miradors';

// errors
import { AuthenticationError } from '../../errors';

/**
 * raphQL project query fileds
 * @type {Object}
 * @property {Object} miradorById 	Get mirador by _id
 */

const miradorQueryFields = {
  miradorById: {
    type: miradorType,
    description: 'Find mirador by _id',
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    async resolve(parent, {_id}) {
      try {
        return await Miradors.findById(_id);
      } catch (err) {
        throw err;
      }
    },
  }
};

export default miradorQueryFields;
