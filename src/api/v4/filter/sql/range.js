const SQLBaseFilter = require('./sql-base-filter');
const _ = require('underscore');

const RANGE_COMPARISON_OPERATORS = {
  LT: 'lt',
  LTE: 'lte',
  GT: 'gt',
  GTE: 'gte',
  BETWEEN: 'between',
  NOT_BETWEEN: 'not_between',
  BETWEEN_SYMMETRIC: 'between_symmetric',
  NOT_BETWEEN_SYMMETRIC: 'not_between_symmetric'
};

const ALLOWED_FILTERS = Object.freeze(_.values(RANGE_COMPARISON_OPERATORS));

/**
 * Range Filter
 *
 * When including this filter into a {@link source.sql} or a {@link source.dataset}, the rows will be filtered by the conditions included within filters.
 *
 * @class carto.filter.Range
 * @extends carto.filter.SQLBaseFilter
 * @memberof carto.filter
 * @api
 */
class Range extends SQLBaseFilter {
  /**
   * Create a Range filter
   *
   * @param {string} column - The column to filter rows
   * @param {object} [filters] - The filters you want to apply to the column
   * @param {(number|Date)} [filters.lt] - Filter rows whose column value is less than the provided value
   * @param {(number|Date)} [filters.lte] - Filter rows whose column value is less than or equal to the provided value
   * @param {(number|Date)} [filters.gt] - Filter rows whose column value is greater than to the provided value
   * @param {(number|Date)} [filters.gte] - Filter rows whose column value is greater than or equal to the provided value
   * @param {(number|Date)} [filters.between] - Filter rows whose column value is between the provided values
   * @param {(number|Date)} [filters.between.min] - Lowest value of the comparison range
   * @param {(number|Date)} [filters.between.max] - Upper value of the comparison range
   * @param {(number|Date)} [filters.between_symmetric] - Filter rows whose column value is between the provided values after sorting them
   * @param {(number|Date)} [filters.between_symmetric.min] - Lowest value of the comparison range
   * @param {(number|Date)} [filters.between_symmetric.max] - Upper value of the comparison range
   * @param {object} [options]
   * @param {boolean} [options.includeNull] - The operation to apply to the data
   * @param {boolean} [options.reverseConditions] - The operation to apply to the data
   */
  constructor (column, filters, options) {
    super(column, options);

    this.ALLOWED_FILTERS = ALLOWED_FILTERS;

    this._checkFilters(filters);
    this._filters = filters;

    this.SQL_TEMPLATES = {
      [RANGE_COMPARISON_OPERATORS.LT]: '<%= column %> < <%= value %>',
      [RANGE_COMPARISON_OPERATORS.LTE]: '<%= column %> <= <%= value %>',
      [RANGE_COMPARISON_OPERATORS.GT]: '<%= column %> > <%= value %>',
      [RANGE_COMPARISON_OPERATORS.GTE]: '<%= column %> >= <%= value %>',
      [RANGE_COMPARISON_OPERATORS.BETWEEN]: '<%= column %> BETWEEN <%= value.min %> AND <%= value.max %>',
      [RANGE_COMPARISON_OPERATORS.NOT_BETWEEN]: '<%= column %> NOT BETWEEN <%= value.min %> AND <%= value.max %>',
      [RANGE_COMPARISON_OPERATORS.BETWEEN_SYMMETRIC]: '<%= column %> BETWEEN SYMMETRIC <%= value.min %> AND <%= value.max %>',
      [RANGE_COMPARISON_OPERATORS.NOT_BETWEEN_SYMMETRIC]: '<%= column %> NOT BETWEEN SYMMETRIC <%= value.min %> AND <%= value.max %>'
    };
  }
}

module.exports = Range;
