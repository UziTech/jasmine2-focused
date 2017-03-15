;
(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine2-focused");
	}

	const __realIt = global.it;
	const __realDescribe = global.describe;

	let focusPriority = 0;
	let currentSuitePriority = 0;
	let prioritySpecs = {};

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
		for (let i = 0; i < focusPriority; i++) {
			if (Array.isArray(prioritySpecs[i])) {
				prioritySpecs[i].forEach(spec => { spec.disable(); });
				delete prioritySpecs[i];
			}
		}
	}

	function createSuite(description, specDefinitions, priority) {
		const parentSuitePriority = currentSuitePriority;
		setGlobalFocusPriority(priority);
		if (priority > currentSuitePriority) {
			currentSuitePriority = priority;
		}
		disableNonPrioritySpecs();
		const suite = __realDescribe(description, specDefinitions);
		suite.priority = currentSuitePriority;
		currentSuitePriority = parentSuitePriority;
		return suite;
	}

	function createSpec(description, specDefinition, timeout, priority) {
		setGlobalFocusPriority(priority);
		let spec = __realIt(description, specDefinition, timeout);
		addPrioritySpec(spec, priority);
		disableNonPrioritySpecs();
		return spec;
	}

	const focusMethods = {
		describe(description, specDefinitions) {
			return createSuite(description, specDefinitions, 0);
		},

		fdescribe(description, specDefinitions) {
			return createSuite(description, specDefinitions, 1);
		},

		ffdescribe(description, specDefinitions) {
			return createSuite(description, specDefinitions, 2);
		},

		fffdescribe(description, specDefinitions) {
			return createSuite(description, specDefinitions, 3);
		},

		it(description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 0);
		},

		fit(description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 1);
		},

		ffit(description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 2);
		},

		fffit(description, specDefinition, timeout) {
			return createSpec(description, specDefinition, timeout, 3);
		}
	};

	for (let methodName in focusMethods) {
		global[methodName] = focusMethods[methodName];
	}

})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
