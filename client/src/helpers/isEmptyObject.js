import isObject from './isObject';

export default value =>  isObject(value) && Object.values(value).length === 0;