export function scrollLock(bool) {
	if (bool) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}
}

//  Snippet for closing menus if clicked outside of element

// replace <container_ref> with useRef declaration,
// <booState> with state with a boolean value,
// <setBoolState> with set state func that accepts boolean

// useEffect(() => {
// 	const handleClickOutside = (event) => {
// 		if (!<container_ref>.current.contains(event.target)) {
// 			<setBoolState>(false);
// 		}
// 	};
//
// 	if (<boolState>) {
// 		document.addEventListener("mousedown", handleClickOutside);
// 	} else {
// 		document.removeEventListener("mousedown", handleClickOutside);
// 	}
// 	return () => {
// 		document.removeEventListener("mousedown", handleClickOutside);
// 	};
// }, [<boolState>]);
