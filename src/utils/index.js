export const getParamArray = (path, divider= "/")  =>  path.split(divider);
export const getParamFind = (path, index, divider) => getParamArray(path, divider)[index];
export const getParamLength = (path, divider) => getParamArray(path, divider).length;