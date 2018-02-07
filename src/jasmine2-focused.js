"use strict";

(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine2-focused");
	}

	var originalIt = global.it;
	var originalDescribe = global.describe;

	var highestPriority = global.JASMINE2_FOCUSED_HIGHEST_PRIORITY || 3;

	if (isNaN(highestPriority) || highestPriority < 0) {
		throw new Error("JASMINE2_FOCUSED_HIGHEST_PRIORITY must be >= 0");
	}

	var focusPriority = 0;
	var currentSuitePriority = 0;
	var prioritySpecs = {};

	function setGlobalFocusPriority(priority) {
		if (priority > focusPriority) {
			focusPriority = priority;
		}
	};

	function addPrioritySpec(spec, priority) {
		if (currentSuitePriority > priority) {
			priority = currentSuitePriority;
		}
		spec.priority = priority;
		if (!prioritySpecs[priority]) {
			prioritySpecs[priority] = [spec];
		} else {
			prioritySpecs[priority].push(spec);
		}
	}

	function disableNonPrioritySpecs() {
		for (var i = 0; i < focusPriority; i++) {
			if (prioritySpecs[i]) {
				for (var j = 0; j < prioritySpecs[i].length; j++) {
					var spec = prioritySpecs[i][j];
					if (!spec.markedPending) {
						spec.pend("Not focused");
					}
				}
				delete prioritySpecs[i];
			}
		}
	}

	function createDescribe(priority) {
		return function () {
			var parentSuitePriority = currentSuitePriority;
			setGlobalFocusPriority(priority);
			if (priority > currentSuitePriority) {
				currentSuitePriority = priority;
			}
			disableNonPrioritySpecs();
			var suite = originalDescribe.apply(this, arguments);
			suite.priority = currentSuitePriority;
			currentSuitePriority = parentSuitePriority;
			return suite;
		};
	}

	function createIt(priority) {
		return function () {
			setGlobalFocusPriority(priority);
			var spec = originalIt.apply(this, arguments);
			addPrioritySpec(spec, priority);
			disableNonPrioritySpecs();
			return spec;
		};
	}

	for (var i = 0; i <= highestPriority; i++) {
		var prefix = Array(i + 1).join("f");
		global[prefix + "it"] = createIt(i);
		global[prefix + "describe"] = createDescribe(i);
	}

})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
