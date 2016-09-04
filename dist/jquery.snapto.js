/*
 *  jquery-snapto - v1.0
 *  Array snap to values.
 *  http://mapo-dev.com
 *
 *  Made by Marcin Poholski
 *  Under MIT License
 */
;
(function($) {
	var getSmallestPair = function getSmallestPair(arr) {
			var min1 = {
					diff: arr[0][1],
					val: arr[0][0]
				},
				min2 = {
					diff: arr[1][1],
					val: arr[1][0]
				};

			if (min2.diff < min1.diff) {
				min1 = {
					diff: arr[1][1],
					val: arr[1][0]
				};
				min2 = {
					diff: arr[0][1],
					val: arr[0][0]
				};
			}

			for (var i = 2; i < arr.length - 1; i++) {
				if (arr[i][1] < min1.diff) {
					min2.diff = min1.diff;
					min2.val = min1.val;
					min1 = {
						diff: arr[i][1],
						val: arr[i][0]
					};
				} else {
					min2 = {
						diff: arr[i][1],
						val: arr[i][0]
					};
				}
			}
			return {
				min1: min1,
				min2: min2
			}
		},
		checkTie = function checkTie(arr, tie) {
			var result = false;
			if (Object.keys(arr).length == 2 && arr.min1.diff == arr.min2.diff) {
				if (tie === 'up') {
					result = arr.min1.val > arr.min2.val ? arr.min1.val : arr.min2.val;
				} else {
					result = arr.min1.val < arr.min2.val ? arr.min1.val : arr.min2.val;
				}
			}

			return result;
		},
		snapToNumber = function snapToNumber(value, target, limit) {
			if (!$.isNumeric(value) || !$.isNumeric(target) || !$.isNumeric(limit)) {
				return false;
			}

			if (Math.abs(value - target) > limit) {
				return false;
			}

			return Math.abs(value - target);
		},
		snapToArray = function snapToArray(value, arr, limit, tie) {
			var i = 0,
				smallestDifference = limit,
				currentDifference = 0,
				results = [],
				result = false,
				twoSmallest;

			if (!$.isArray(arr)) {
				return false;
			}

			for (; i < arr.length; i++) {
				currentDifference = snapToNumber(value, arr[i], limit);

				if (currentDifference === false) {
					continue;
				}

				if (currentDifference <= smallestDifference) {
					smallestDifference = currentDifference;
					result = arr[i];
					results.push([result, smallestDifference]);
				}
			}

			if (results.length > 1) {
				twoSmallest = getSmallestPair(results);
				result = checkTie(twoSmallest, tie) || result;
			}

			return result;
		};

	$.fn.snapTo = function(value, options) {
		var settings = $.extend({
				limit: 10,
				tie: 'up'
			}, options),
			self = this;

		// abort if invalid input was passed to snapTo
		if (!$.isArray(value) && !$.isNumeric(value)) {
			return this;
		}

		// if we only have one value, change it to number
		if (typeof this.length !== "undefined" &&
			this.length === 1) {
			self = this[0];
		}

		if ($.isArray(self)) {
			return self.each(function(index) {
				if (!$.isNumeric(this[index])) {
					return this[index];
				}

				// go ahead
			});
		} else if ($.isNumeric(self)) {
			// if both are numeric, check if limit
			// avoids case, otherwise set it to target
			if ($.isNumeric(value)) { // Number to Number
				var difference = snapToNumber(self, value, settings.limit);

				if (difference !== false) {
					return value;
				}
				return self;
			} else if ($.isArray(value)) { // Number to Array
				// return only number if comparing to array
				return snapToArray(self, value, settings.limit, settings.tie);
			}
		}

		return self;
	};

}(jQuery));