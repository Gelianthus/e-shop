export function scrollLock(bool) {
	if (bool) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}
}

export function outsideClick(setBoolState, boolState) {
	const handleClickOutside = (event) => {
		if (!navContainerRef.current.contains(event.target)) {
			setBoolState(false);
		}
	};

	if (boolState) {
		document.addEventListener("mousedown", handleClickOutside);
	} else {
		document.removeEventListener("mousedown", handleClickOutside);
	}
	return () => {
		document.removeEventListener("mousedown", handleClickOutside);
	};
}
