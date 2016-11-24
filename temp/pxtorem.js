if (blacklistedSelector(opts.selectorWhiteList, decl.parent.selector)) {
    var value = decl.value.replace(pxRegex, pxReplace);

    // if rem unit already exists, do not add or replace
    if (declarationExists(decl.parent, decl.prop, value)) return;

    if (opts.replace) {
        decl.value = value;
    } else {
        decl.parent.insertAfter(i, decl.clone({ value: value }));
    }
}