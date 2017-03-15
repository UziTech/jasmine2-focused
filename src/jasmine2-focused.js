;
(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine2-focused");
	}

	var __realIt = global.it;
	var __realDescribe = global.describe;

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
					prioritySpecs[i][j].disable();
				}
				delete prioritySpecs[i];
			}
		}
	}

	function createSuite(description, specDefinitions, priority) {
		var parentSuitePriority = currentSuitePriority;
		setGlobalFocusPriority(priority);
		if (priority > currentSuitePriority) {
			currentSuitePriority = priority;
		}
		disableNonPrioritySpecs();
		var suite = __realDescribe(description, specDefinitions);
		suite.priority = currentSuitePriority;
		currentSuitePriority = parentSuitePriority;
		return suite;
	}

	function createSpec(description, specDefinition, timeout, priority) {
		setGlobalFocusPriority(priority);
		var spec = __realIt(description, specDefinition, timeout);
		addPrioritySpec(spec, priority);
		disableNonPrioritySpecs();
		return spec;
	}

	var focusMethods = {
		describe: function (description, specDefinitions) {
			return createSuite(description, specDefinitions, 0);
		},

		fdescribe: function (description, specDefinitions) {
			return createSuite(description, specDefinitions, 1);
		},

		ffdescribe: function (description, specDefinitions) {
			return createSuite(description, specDefinitions, 2);
		},

		fffdescribe: function (description, specDefinitions) {
			return createSuite(description, specDefinitions, 3);
		},

		it: function (description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 0);
		},

		fit: function (description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 1);
		},

		ffit: function (description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 2);
		},

		fffit: function (description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 3);
		}
	};

	for (var methodName in focusMethods) {
		global[methodName] = focusMethods[methodName];
	}

})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
